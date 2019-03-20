import json

import boto3


class S3(object):
    """
    """

    def __init__(
        self,
        aws_region='',
        aws_access_key='',
        aws_secret_key=''
    ):
        """
        """
        self.s3 = boto3.client(
            's3',
            region_name=aws_region,
            aws_access_key_id=aws_access_key,
            aws_secret_access_key=aws_secret_key
        )

    def upload_file(
        self, bucket_name, destination, source_file=None, content_type='text/plain',
    ):
        """
        """
        if source_file:
            return self.s3.upload_file(
                Bucket=bucket_name,
                Filename=source_file,
                Key=destination,
                ExtraArgs={'ContentType': content_type},
            )

    def download_file(
        self, bucket_name, key, filename=None
    ):
        """
        """
        if filename:
            return self.s3.download_file(
                Bucket=bucket_name,
                Key=key,
                Filename=filename
            )

    def delete_files(
        self, bucket_name, keys
    ):
        """
        """
        return self.s3.delete_objects(
            Bucket=bucket_name,
            Delete={
                'Objects': [
                    {'Key': key}
                    for key in keys
                ]
            }
        )

    def generate_presigned_url(
        self, bucket_name, key, expiry=60*60*24
    ):
        """
        """
        return self.s3.generate_presigned_url(
            ClientMethod='get_object',
            Params={
                'Bucket': bucket_name,
                'Key': key
            }, ExpiresIn=expiry
        )
