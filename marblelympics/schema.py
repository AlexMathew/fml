import json

import graphene
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField

from helpers.constants import EventStatus
from helpers.utils import enum_to_dict
from services.authentication import GraphqlAuthentication

from .models import Event, FantasyPlayer, Marblelympics, PlayerEntry, Team


class TeamNode(DjangoObjectType):
    class Meta:
        model = Team
        interfaces = (graphene.relay.Node,)
        exclude_fields = ('image')
        filter_fields = {
            'name': ['exact', 'icontains', 'istartswith'],
            'ml_participated': ['exact'],
        }


class MLNode(DjangoObjectType):
    player_count = graphene.Int()

    class Meta:
        model = Marblelympics
        interfaces = (graphene.relay.Node,)
        filter_fields = {
            'active': ['exact'],
        }

    def resolve_player_count(self, info, **kwargs):
        return self.player_count


class SelectionNode(graphene.ObjectType):
    position = graphene.Int()
    team = graphene.Field(TeamNode)


class EventNode(DjangoObjectType):
    status = graphene.Int()
    entry_count = graphene.Int()
    results = graphene.List(SelectionNode)

    class Meta:
        model = Event
        interfaces = (graphene.relay.Node,)
        exclude_fields = ('scoring_status')
        filter_fields = {
            'ml__active': ['exact'],
        }

    def resolve_entry_count(self, info, **kwargs):
        return self.entry_count

    def resolve_results(self, info, **kwargs):
        results = json.loads(self.results)
        return [
            SelectionNode(
                position=int(position),
                team=Team.objects.get(name=name),
            )
            for position, name in results.items()
        ]


class FantasyPlayerNode(DjangoObjectType):
    class Meta:
        model = FantasyPlayer
        interfaces = (graphene.relay.Node,)
        filter_fields = {
            'marblelympics__active': ['exact'],
        }


class PlayerEntryNode(DjangoObjectType):
    selections = graphene.List(SelectionNode)

    class Meta:
        model = PlayerEntry
        interfaces = (graphene.relay.Node,)
        filter_fields = {
            'player__marblelympics__active': ['exact'],
        }

    def resolve_selections(self, info, **kwargs):
        selections = json.loads(self.selections)
        return [
            SelectionNode(
                position=int(position),
                team=Team.objects.get(name=name),
            )
            for position, name in selections.items()
        ]


class Query(graphene.ObjectType):
    team = graphene.relay.Node.Field(TeamNode)
    teams = DjangoFilterConnectionField(TeamNode)
    marblelympics = DjangoFilterConnectionField(MLNode)
    event = graphene.relay.Node.Field(EventNode)
    events = DjangoFilterConnectionField(EventNode)
    fplayer = graphene.relay.Node.Field(FantasyPlayerNode)
    fplayers = DjangoFilterConnectionField(FantasyPlayerNode)
    fplayer_entry = graphene.relay.Node.Field(PlayerEntryNode)
    fplayer_entries = DjangoFilterConnectionField(PlayerEntryNode)


class UpsertPlayerEntry(graphene.relay.ClientIDMutation):
    entry = graphene.Field(PlayerEntryNode)

    class Input:
        event_number = graphene.Int()
        team_1 = graphene.String()
        team_2 = graphene.String()
        team_3 = graphene.String()

    def mutate_and_get_payload(self, info, **input):
        user = GraphqlAuthentication.get_user(self, info, **input)
        player = user.player

        ml = Marblelympics.objects.filter(active=True).first()
        if not ml:
            raise Exception("No active ML")

        event = Event.objects.filter(
            ml=ml,
            number=input.get('event_number'),
        ).first()
        if not event:
            raise Exception(f"No event #{input.get('event_number')} in {ml}")
        if enum_to_dict(EventStatus).get(event.status, 1) == 'LOCKED':
            raise Exception(f"Event is locked")

        fplayer = FantasyPlayer.objects.filter(
            player=player,
            marblelympics=ml,
        ).first()
        if not fplayer:
            fplayer = FantasyPlayer.objects.create(
                player=player,
                marblelympics=ml,
            )

        entry = PlayerEntry.objects.filter(
            event=event, player=fplayer
        ).first() or PlayerEntry()

        entry.event = event
        entry.player = fplayer
        entry.selections = json.dumps(
            {
                '1': input.get('team_1') or '',
                '2': input.get('team_2') or '',
                '3': input.get('team_3') or '',
            }
        )
        entry.save()

        return UpsertPlayerEntry(entry=entry)


class Mutation(graphene.AbstractType):
    upsert_player_entry = UpsertPlayerEntry.Field()
