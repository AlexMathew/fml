from functools import wraps


class GraphqlAuthentication:
    @classmethod
    def get_user(cls, request, info, *args, **kwargs):
        user = info.context.user
        if user.is_anonymous:
            raise Exception("Not logged in")

        return user
