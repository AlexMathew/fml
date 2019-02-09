import graphene

import players.schema


class Query(
    players.schema.Query,
    graphene.ObjectType,
):
    pass


schema = graphene.Schema(query=Query)
