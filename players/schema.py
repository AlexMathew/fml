import django_filters
import graphene
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
from django.contrib.auth.models import User

from .models import Player


class UserNode(DjangoObjectType):
    class Meta:
        model = User


class PlayerFilter(django_filters.FilterSet):
    class Meta:
        model = Player
        fields = ['created_at']


class PlayerNode(DjangoObjectType):
    user = graphene.Field(UserNode)

    class Meta:
        model = Player
        interfaces = (graphene.relay.Node,)


class Query(graphene.ObjectType):
    player = graphene.relay.Node.Field(PlayerNode)
    players = DjangoFilterConnectionField(PlayerNode, filterset_class=PlayerFilter)


class CreatePlayer(graphene.relay.ClientIDMutation):
    player = graphene.Field(PlayerNode)

    class Input:
        username = graphene.String()
        email = graphene.String()

    def mutate_and_get_payload(self, info, **input):
        user = User(
            username=input.get('username'),
            email=input.get('email'),
        )
        user.save()
        player = Player(
            user=user,
        )
        player.save()

        return CreatePlayer(player=player)


class Mutation(graphene.AbstractType):
    create_player = CreatePlayer.Field()
