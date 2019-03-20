import json
import os
from hashlib import md5
from urllib.request import urlretrieve

from django.conf import settings
from django.core.exceptions import ValidationError
from django.db import models
from django.db.models.signals import pre_save
from django.dispatch import receiver

from helpers import constants
from helpers.instances import redis, s3
from helpers.utils import enum_to_choices
from players.models import Player


class Team(models.Model):
    name = models.CharField(max_length=100, unique=True)
    image = models.CharField(max_length=500, blank=True)
    cdn_image = models.CharField(max_length=500, blank=True, null=True)

    def __repr__(self):
        return self.name

    def __str__(self):
        return self.name

    @property
    def cdn_image_url(self):
        return md5(f"fml{'prod' if os.getenv('IS_SERVER') == 'true' else 'dev'}_{self.image or ''}".encode('utf-8')).hexdigest()


class Marblelympics(models.Model):
    year = models.CharField(max_length=4, primary_key=True)
    active = models.BooleanField(default=False)
    host = models.ForeignKey(
        Team, related_name='ml_hosted', on_delete=models.PROTECT, null=True
    )
    team_count = models.IntegerField(default=0)
    teams = models.ManyToManyField(Team, related_name='ml_participated')

    class Meta:
        verbose_name = 'Marblelympics'
        verbose_name_plural = 'Marblelympics'
        ordering = ['year']

    def __repr__(self):
        return f"ML{self.year}{' (ACTIVE)' if self.active else ''}"

    def __str__(self):
        return f"ML{self.year}{' (ACTIVE)' if self.active else ''}"

    @property
    def cache_key(self):
        return md5(f'ML{self.year}'.encode('utf-8')).hexdigest()

    @property
    def player_count(self):
        count = redis.get(self.cache_key)
        if not count:
            count = self.players_participating.count()
            redis.set(
                self.cache_key, count,
                ex=constants.PLAYER_COUNT_CACHE_DURATION
            )

        return count


class Event(models.Model):
    ml = models.ForeignKey(
        Marblelympics, on_delete=models.CASCADE, related_name='events'
    )
    number = models.IntegerField(null=False, blank=False)
    name = models.CharField(max_length=256, null=False, blank=False)
    status = models.IntegerField(
        choices=enum_to_choices(constants.EventStatus), default=1
    )

    class Meta:
        verbose_name = 'Marblelympics Event'
        verbose_name_plural = 'Marblelympics Events'
        unique_together = ('ml', 'number')
        ordering = ['ml', 'number']

    def __repr__(self):
        return f"{self.ml} #{self.number} - {self.name}{' (LOCKED)' if self.status == 4 else ''}"

    def __str__(self):
        return f"{self.ml} #{self.number} - {self.name}{' (LOCKED)' if self.status == 4 else ''}"

    @property
    def cache_key(self):
        return md5(f'{self.ml} #{self.number} - {self.name}'.encode('utf-8')).hexdigest()

    @property
    def entry_count(self):
        count = redis.get(self.cache_key)
        if not count:
            count = self.player_entries.count()
            redis.set(
                self.cache_key, count,
                ex=constants.EVENT_ENTRY_COUNT_CACHE_DURATION
            )

        return count


class FantasyPlayer(models.Model):
    player = models.ForeignKey(
        Player, on_delete=models.CASCADE, related_name='marblelympics_participated'
    )
    marblelympics = models.ForeignKey(
        Marblelympics, on_delete=models.PROTECT, related_name='players_participating'
    )
    points = models.IntegerField(default=0)
    rank = models.IntegerField(default=-1)

    class Meta:
        verbose_name = 'Fantasy Player'
        verbose_name_plural = 'Fantasy Players'
        unique_together = ('player', 'marblelympics')
        indexes = [
            models.Index(
                fields=['marblelympics', 'player'],
                name='participant_index'
            ),
            models.Index(fields=['player'], name='player_index'),
        ]

    def __repr__(self):
        return f'{self.marblelympics} - {self.player} - Points: {self.points} - Rank: {self.rank}'

    def __str__(self):
        return f'{self.marblelympics} - {self.player} - Points: {self.points} - Rank: {self.rank}'


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
        verbose_name = 'Player Event Entry'
        verbose_name_plural = 'Player Event Entries'
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


@receiver(pre_save, sender=Team)
def update_cdn_image(sender, instance, **kwargs):
    """
    """
    original = Team.objects.filter(id=instance.id).first()
    if (original.image if original else None) != instance.image:
        image_format = instance.image.split('.')[-1] if '.' in instance.image else 'jpg'
        image_location = f'/tmp/{instance.cdn_image_url}.{image_format}'
        urlretrieve(instance.image, image_location)
        s3.upload_file(
            bucket_name=os.getenv('TEAM_LOGO_BUCKET_NAME'),
            destination=f'{instance.cdn_image_url}.{image_format}',
            source_file=image_location,
            content_type=f"image/{'jpeg' if image_format == 'jpg' else image_format}",
        )
        instance.cdn_image = f"http://{os.getenv('CLOUDFRONT_URL')}/{instance.cdn_image_url}.{image_format}"


@receiver(pre_save, sender=PlayerEntry)
def validate_selections(sender, instance, **kwargs):
    """
    """
    original = PlayerEntry.objects.filter(id=instance.id).first()
    if (original.selections if original else None) != instance.selections:
        if instance.event.locked:
            raise Exception("Event is locked")

        selections = json.loads(instance.selections)
        if len(selections) != 3:
            raise ValidationError("3 team selections should be made per entry")

        if len(set(selections.values())) != 3:
            raise ValidationError(
                "3 unique teams should be selected per entry")

        if list(selections.keys()) != ['1', '2', '3']:
            raise ValidationError(
                "Keys for the selection should be the position (1/2/3)"
            )

        for name in selections.values():
            team = Team.objects.filter(name=name).first()

            if not team:
                raise ValidationError(f"No team named {name}")

            if team not in instance.event.ml.teams.all():
                raise ValidationError(
                    f"{name} is not a part of ML{instance.event.ml.year}"
                )
