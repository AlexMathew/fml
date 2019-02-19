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
        }


class MLNode(DjangoObjectType):
    host = graphene.Field(TeamNode)

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

        }


class Query(graphene.ObjectType):
    team = graphene.relay.Node.Field(TeamNode)
    teams = DjangoFilterConnectionField(TeamNode)
    marblelympics = DjangoFilterConnectionField(MLNode)
    event = graphene.relay.Node.Field(EventNode)
    events = DjangoFilterConnectionField(EventNode)
