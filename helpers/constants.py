from enum import Enum

PLAYER_COUNT_CACHE_DURATION = 60 * 60
EVENT_ENTRY_COUNT_CACHE_DURATION = 30 * 60


class EventStatus(Enum):
    OPEN = 1
    POINTS_UPDATING = 2
    RANK_UPDATING = 3
    LOCKED = 4


class EventScoringStatus(Enum):
    OPEN = 1
    ONGOING = 2
    COMPLETED = 3
