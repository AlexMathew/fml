from django.conf import settings
from django.db import models
from django.db.models.signals import post_delete, post_save
from django.dispatch import receiver


class Player(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __repr__(self):
        return self.user.username

    def __str__(self):
        return self.user.username


@receiver(post_delete, sender=Player)
def delete_user_of_profile(sender, instance, **kwargs):
    """
    """
    instance.user.delete()


@receiver(post_save, sender=Player)
def create_fantasy_player(sender, instance, created, **kwargs):
    """
    """
    if created:
        from marblelympics.models import FantasyPlayer, Marblelympics
        marblelympics = Marblelympics.objects.filter(active=True).first()

        if not marblelympics:
            raise Exception("No active ML")

        FantasyPlayer.objects.create(
            player=instance, marblelympics=marblelympics
        )
