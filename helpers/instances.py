import os

from .redis import Redis
from .s3 import S3
from .sqs import SQS

redis = Redis(host=os.getenv('FML_REDIS_HOST'), port=os.getenv('FML_REDIS_PORT'))
s3 = S3(
    aws_region=os.getenv('FML_AWS_REGION'),
    aws_access_key=os.getenv('FML_AWS_ACCESS_KEY'),
    aws_secret_key=os.getenv('FML_AWS_SECRET_KEY'),
)
sqs = SQS(
    aws_region=os.getenv('FML_AWS_REGION'),
    aws_access_key=os.getenv('FML_AWS_ACCESS_KEY'),
    aws_secret_key=os.getenv('FML_AWS_SECRET_KEY'),
    aws_account_number=os.getenv('FML_AWS_ACCOUNT_NUMBER'),
)
