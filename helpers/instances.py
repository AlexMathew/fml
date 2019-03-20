import os

from .redis import Redis
from .s3 import S3

redis = Redis(host=os.getenv('REDIS_HOST'), port=os.getenv('REDIS_PORT'))
s3 = S3(
    aws_region=os.getenv('AWS_REGION'),
    aws_access_key=os.getenv('AWS_ACCESS_KEY'),
    aws_secret_key=os.getenv('AWS_SECRET_KEY'),
)
