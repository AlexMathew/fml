from django.conf import settings
from django.core.exceptions import ValidationError
from django.db import models
from django.db.models.signals import m2m_changed, post_delete
from django.dispatch import receiver

from players.models import Player


class Team(models.Model):
    name = models.CharField(max_length=100, unique=True)
    host = models.BooleanField(default=False)


class Marblelympics(models.Model):
    year = models.CharField(max_length=4, unique=True)
    total_players = models.IntegerField(default=0)
    team_count = models.IntegerField(default=0)
    teams = models.ManyToManyField(Team, related_name='marblelympics')


class FantasyPlayer(models.Model):
    player = models.ForeignKey(Player, on_delete=models.CASCADE, related_name='marblelympics')
    marblelympics = models.ForeignKey(Marblelympics, on_delete=models.PROTECT, related_name='players')

    class Meta:
        unique_together = ('player', 'marblelympics')
        indexes = [
            models.Index(fields=['marblelympics', 'player'], name='participant_index'),
            models.Index(fields=['player'], name='player_index'),
        ]


@receiver(m2m_changed, sender=Marblelympics)
def check_number_of_teams(sender, instance, **kwargs):
    """
    """
    if instance.teams.count() > instance.team_count:
        raise ValidationError(f"ML{instance.year} can only have {instance.team_count} teams")
