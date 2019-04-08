import logging
import os
import sys

import MySQLdb
from django.conf import settings
from django.core.management.base import BaseCommand, CommandError

rds_host = os.getenv('FML_MYSQL_HOST')
db_name = os.getenv('FML_MYSQL_DATABASE')
user_name = os.getenv('FML_MYSQL_USER')
password = os.getenv('FML_MYSQL_PASSWORD')
port = os.getenv('FML_MYSQL_PORT')

logger = logging.getLogger()
logger.setLevel(logging.INFO)


class Command(BaseCommand):
    help = 'Creates the initial database'

    def handle(self, *args, **options):
        print('STARTING.')
        try:
            db = MySQLdb.connect(
                host=rds_host,
                user=user_name,
                password=password,
                db="mysql",
                connect_timeout=5
            )
            c = db.cursor()
            print("CONNECTED.")
            c.execute("""CREATE DATABASE %s;""", (db_name,))
            c.execute(
                """GRANT ALL PRIVILEGES ON db_name.* TO '%s' IDENTIFIED BY '%s';""",
                (user_name, password,))
            c.close()
            print("CLOSED.")
        except:
            logger.error(
                "ERROR: Unexpected error: Could not connect to MySql instance.")
            sys.exit()
