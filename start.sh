#!/bin/sh

echo "START"
source ops/prod.sh
python manage.py create_db
python manage.py migrate
python manage.py create_admin_user
python manage.py runserver 0.0.0.0:8800
exec "$@"