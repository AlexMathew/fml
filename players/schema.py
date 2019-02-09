import django_filters
import graphene
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField

from .models import Player


class PlayerFilter(django_filters.FilterSet):
    class Meta:
        model = Player
        fields = ['created_at']


class PlayerNode(DjangoObjectType):
    class Meta:
        model = Player
        interfaces = (graphene.relay.Node,)


class Query(graphene.ObjectType):
    player = graphene.relay.Node.Field(PlayerNode)
    players = DjangoFilterConnectionField(PlayerNode, filterset_class=PlayerFilter)
