from fml.celery import app
from helpers import constants
from helpers.instances import redis
from marblelympics.models import Event, Marblelympics


@app.task(name="cache_ml_player_count")
def cache_ml_player_count(*args, **kwargs):
    for ml in Marblelympics.objects.all():
        print('CACHE ML PLAYER COUNT - ', ml)
        count = ml.players_participating.count()
        redis.set(
            ml.cache_key, count,
            ex=constants.PLAYER_COUNT_CACHE_DURATION
        )


@app.task(name="cache_event_player_count")
def cache_event_player_count(*args, **kwargs):
    for event in Event.objects.all():
        print('CACHE EVENT PLAYER COUNT - ', event)
        count = event.player_entries.count()
        redis.set(
            event.cache_key, count,
            ex=constants.EVENT_ENTRY_COUNT_CACHE_DURATION
        )
