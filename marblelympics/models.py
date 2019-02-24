import json

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
    active = models.BooleanField(default=False)
    host = models.ForeignKey(
        Team, related_name='ml_hosted', on_delete=models.PROTECT, null=True
    )
    team_count = models.IntegerField(default=0)
    teams = models.ManyToManyField(Team, related_name='ml_participated')
    total_players = models.IntegerField(default=0)

    class Meta:
        ordering = ['year']

    def __repr__(self):
        return f"ML{self.year}{' - ACTIVE' if self.active else ''}"

    def __str__(self):
        return f"ML{self.year}{' - ACTIVE' if self.active else ''}"


class Event(models.Model):
    ml = models.ForeignKey(
        Marblelympics, on_delete=models.CASCADE, related_name='events'
    )
    number = models.IntegerField(null=False, blank=False)
    name = models.CharField(max_length=256, null=False, blank=False)

    class Meta:
        unique_together = ('ml', 'number')
        ordering = ['ml', 'number']

    def __repr__(self):
        return f'{self.ml} #{self.number} - {self.name}'

    def __str__(self):
        return f'{self.ml} #{self.number} - {self.name}'


class FantasyPlayer(models.Model):
    player = models.ForeignKey(
        Player, on_delete=models.CASCADE, related_name='marblelympics_participated'
    )
    marblelympics = models.ForeignKey(
        Marblelympics, on_delete=models.PROTECT, related_name='players_participating'
    )

    class Meta:
        unique_together = ('player', 'marblelympics')
        indexes = [
            models.Index(
                fields=['marblelympics', 'player'],
                name='participant_index'
            ),
            models.Index(fields=['player'], name='player_index'),
        ]

    def __repr__(self):
        return f'{self.marblelympics} - {self.player}'

    def __str__(self):
        return f'{self.marblelympics} - {self.player}'


def validate_entry_selections_string(value):
    try:
        _ = json.loads(value)

    except json.JSONDecodeError:
        raise ValidationError(f'Selections should be a valid JSON string')


class PlayerEntry(models.Model):
    player = models.ForeignKey(
        FantasyPlayer, on_delete=models.CASCADE, related_name='event_entries'
    )
    event = models.ForeignKey(
        Event, on_delete=models.PROTECT, related_name='player_entries'
    )
    points = models.IntegerField(default=0)
    rank = models.IntegerField(default=-1)
    selections = models.CharField(
        max_length=2000,
        null=False,
        default='{}',
        validators=[validate_entry_selections_string]
    )

    class Meta:
        unique_together = ('player', 'event')
        indexes = [
            models.Index(fields=['event', 'player'], name='entry_index'),
            models.Index(fields=['player'], name='player_entry_index'),
        ]
        ordering = ['event', 'rank']

    def __repr__(self):
        return f'{self.event} - {self.player} - Points: {self.points} - Rank: {self.rank}'

    def __str__(self):
        return f'{self.event} - {self.player} - Points: {self.points} - Rank: {self.rank}'


@receiver(pre_save, sender=Marblelympics)
def check_number_of_teams(sender, instance, **kwargs):
    """
    """
    active_ml = Marblelympics.objects.filter(active=True)
    if instance.active and (active_ml.count() > 0 and active_ml.first() != instance):
        raise ValidationError("Only 1 active ML is allowed")

    if instance.teams.count() > instance.team_count:
        raise ValidationError(
            f"ML{instance.year} can only have {instance.team_count} teams"
        )


@receiver(pre_save, sender=PlayerEntry)
def validate_selections(sender, instance, **kwargs):
    """
    """
    pass
