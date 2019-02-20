import graphene
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField

from .models import Event, FantasyPlayer, Marblelympics, PlayerEntry, Team


class TeamNode(DjangoObjectType):
    class Meta:
        model = Team
        interfaces = (graphene.relay.Node,)
        filter_fields = {
            'name': ['exact', 'icontains', 'istartswith'],
            'ml_participated': ['exact'],
        }


class MLNode(DjangoObjectType):
    class Meta:
        model = Marblelympics
        interfaces = (graphene.relay.Node,)
        filter_fields = {
            'active': ['exact'],
        }


class EventNode(DjangoObjectType):
    class Meta:
        model = Event
        interfaces = (graphene.relay.Node,)
        filter_fields = {
            'ml': ['exact'],
        }


class FantasyPlayerNode(DjangoObjectType):
    class Meta:
        model = FantasyPlayer
        interfaces = (graphene.relay.Node,)
        filter_fields = {

        }

class PlayerEntryNode(DjangoObjectType):
    class Meta:
        model = PlayerEntry
        interfaces = (graphene.relay.Node,)
        filter_fields = {

        }

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
