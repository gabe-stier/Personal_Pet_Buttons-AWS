import json
import boto3
from botocore.exceptions import ClientError
import logging
import os
import pprint
import time

client = boto3.resource("dynamodb")

settings_keys = {'quietTime', 'quietButtons', "sendAudio", "sendNotifications"}

def get_settings(retrieved):
    tries = 0
    max_tries = 5
    sleepy_time = 1 
    while tries < max_tries:
        response = client.batch_get_item(RequestItems=settings_keys)
        # Collect any retrieved items and retry unprocessed keys.
        for key in response.get('Responses', []):
            retrieved[key] += response['Responses'][key]
        unprocessed = response['UnprocessedKeys']
        if len(unprocessed) > 0:
            batch_keys = unprocessed
            unprocessed_count = sum(
                [len(batch_key['Keys']) for batch_key in batch_keys.values()])
            logger.info(
                "%s unprocessed keys returned. Sleep, then retry.",
                unprocessed_count)
            tries += 1
            if tries < max_tries:
                logger.info("Sleeping for %s seconds.", sleepy_time)
                time.sleep(sleepy_time)
                sleepy_time = min(sleepy_time * 2, 32)
        else:
            break
    return retrieved

def lambda_handler(event, context):

    response_code = 200

    retrieved = {key: [] for key in settings_keys}
    retrieved = get_settings(retrieved)
    return_body = {
        "method": event['httpMethod'],
        "event": event,
        "body": json.loads(event['body']),
        "data": retrieved
    }

    if event['httpMethod'] == "PUT":
        pass
        return_body['test'] = 'test'
    elif event['httpMethod'] == "GET":
        pass
    else:
        response_code = 405
        return_body = {"Method Not Supported!": ""}

    return {
        "statusCode": 200,
        "body": json.dumps(return_body)
    }
