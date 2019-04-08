import logging
import os
import sys

from django.conf import settings
from django.contrib.auth.models import User
from django.core.management.base import BaseCommand, CommandError

admin_user = os.getenv('FML_ADMIN_USER')
admin_password = os.getenv('FML_ADMIN_PASSWORD')

logger = logging.getLogger()
logger.setLevel(logging.INFO)


class Command(BaseCommand):
    help = 'Creates the initial admin user'

    def handle(self, *args, **options):
        if User.objects.filter(username=admin_user).exists():
            print("ADMIN EXISTS.")
        else:
            u = User(username=admin_user)
            u.set_password(admin_password)
            u.is_superuser = True
            u.is_staff = True
            u.save()
            print("ADMIN CREATED.")
        sys.exit()
