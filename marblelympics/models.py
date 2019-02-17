from django.conf import settings
from django.core.exceptions import ValidationError
from django.db import models
from django.db.models.signals import pre_save
from django.dispatch import receiver

from players.models import Player


class Team(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __repr__(self):
        return self.name

    def __str__(self):
        return self.name


class Marblelympics(models.Model):
    year = models.CharField(max_length=4, primary_key=True)
    host = models.ForeignKey(Team, related_name='ml_hosted', on_delete=models.PROTECT, null=True)
    team_count = models.IntegerField(default=0)
    teams = models.ManyToManyField(Team, related_name='marblelympics')
    total_players = models.IntegerField(default=0)

    def __repr__(self):
        return f'ML{self.year}'

    def __str__(self):
        return f'ML{self.year}'


class FantasyPlayer(models.Model):
    player = models.ForeignKey(Player, on_delete=models.CASCADE, related_name='marblelympics')
    marblelympics = models.ForeignKey(Marblelympics, on_delete=models.PROTECT, related_name='players')

    class Meta:
        unique_together = ('player', 'marblelympics')
        indexes = [
            models.Index(fields=['marblelympics', 'player'], name='participant_index'),
            models.Index(fields=['player'], name='player_index'),
        ]


@receiver(pre_save, sender=Marblelympics)
def check_number_of_teams(sender, instance, **kwargs):
    """
    """
    if instance.teams.count() > instance.team_count:
        raise ValidationError(f"ML{instance.year} can only have {instance.team_count} teams")
