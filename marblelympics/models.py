from django.conf import settings
from django.db import models
from django.db.models.signals import post_delete
from django.dispatch import receiver

from players.models import Player


class Marblelympics(models.Model):
    year = models.CharField(max_length=4, unique=True)
    total_players = models.IntegerField(default=0)


class Team(models.Model):
    name = models.CharField(max_length=100, unique=True)
    participation = models.ForeignKey(Marblelympics, related_name='teams', on_delete=models.PROTECT)
    host = models.BooleanField(default=False)

    class Meta:
        indexes = [
            models.Index(fields=['participation'], name='team_ml_index'),
        ]


class FantasyPlayer(models.Model):
    player = models.ForeignKey(Player, on_delete=models.CASCADE, related_name='marblelympics')
    marblelympics = models.ForeignKey(Marblelympics, on_delete=models.PROTECT, related_name='players')

    class Meta:
        unique_together = ('player', 'marblelympics')
        indexes = [
            models.Index(fields=['marblelympics', 'player'], name='participant_index'),
            models.Index(fields=['player'], name='player_index'),
        ]
