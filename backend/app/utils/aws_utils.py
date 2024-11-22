import boto3
from io import BytesIO

s3_client = boto3.client('s3', region_name='us-east-1')

def upload_to_s3(file, filename):
    s3_client.upload_fileobj(file, 'your-bucket-name', filename)

def download_from_s3(filename):
    obj = s3_client.get_object(Bucket='your-bucket-name', Key=filename)
    return obj['Body'].read()
