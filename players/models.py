from django.conf import settings
from django.db import models
from django.db.models.signals import post_delete
from django.dispatch import receiver


class Player(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True)


@receiver(post_delete, sender=Player)
def delete_user_of_profile(sender, instance, **kwargs):
    """
    """
    instance.user.delete()
