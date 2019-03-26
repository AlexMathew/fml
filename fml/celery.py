from __future__ import absolute_import

import os

from celery import Celery
from celery.schedules import crontab

from fml import settings

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'fml.settings')

REDIS_URL = f"redis://{os.getenv('REDIS_HOST')}:{os.getenv('REDIS_PORT')}/0"

app = Celery('fml')

app.conf.update(
    BROKER_URL=REDIS_URL,
    CELERY_TASK_RESULT_EXPIRES=3600,
    CELERY_TIMEZONE=settings.TIME_ZONE,
    CELERY_IMPORTS=(

    ),
)

app.autodiscover_tasks()

CELERY_BEAT_SCHEDULE = {
    'cache_ml_player_count': {
        'task': 'fml.functions.cache.cache_ml_player_count',
        'schedule': crontab(minute='*/60'),
    },
    'cache_event_player_count': {
        'task': 'fml.functions.cache.cache_event_player_count',
        'schedule': crontab(minute='*/30'),
    },
}
