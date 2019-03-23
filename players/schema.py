import graphene
from django.contrib.auth import get_user_model
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField

from services.authentication import GraphqlAuthentication

from .models import Player


class UserNode(DjangoObjectType):
    class Meta:
        model = get_user_model()
        only_fields = ('id', 'username')


class PlayerNode(DjangoObjectType):
    user = graphene.Field(UserNode)

    class Meta:
        model = Player
        interfaces = (graphene.relay.Node,)
        filter_fields = {
            'created_at': ['exact'],
        }


class Query(graphene.ObjectType):
    player = graphene.relay.Node.Field(PlayerNode)
    players = DjangoFilterConnectionField(PlayerNode)


class MeQuery(graphene.ObjectType):
    me = graphene.Field(PlayerNode)

    def resolve_me(self, info, **kwargs):
        user = GraphqlAuthentication.get_user(self, info, **kwargs)

        return user.player


class CreatePlayer(graphene.relay.ClientIDMutation):
    player = graphene.Field(PlayerNode)

    class Input:
        username = graphene.String()
        password = graphene.String()

    def mutate_and_get_payload(self, info, **input):
        user = get_user_model()(
            username=input.get('username'),
            email=input.get('username'),
        )
        user.set_password(input.get('password'))
        user.save()

        player = Player.objects.create(
            user=user,
        )

        return CreatePlayer(player=player)


class Mutation(graphene.AbstractType):
    create_player = CreatePlayer.Field()
