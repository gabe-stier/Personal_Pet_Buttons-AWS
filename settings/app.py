import json
import boto3

# client = boto3.client("dynamodb")


def lambda_handler(event, context):
    """Sample pure Lambda function

    Parameters
    ----------
    event: dict, required
        API Gateway Lambda Proxy Input Format

        Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format

    context: object, required
        Lambda Context runtime methods and attributes

        Context doc: https://docs.aws.amazon.com/lambda/latest/dg/python-context-object.html

    Returns
    ------
    API Gateway Lambda Proxy Output Format: dict

        Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
    """

    print(event)

    response_code = 200

    return_body = {
        "method": event['httpMethod'],
        "event": event,
        "body": json.loads(event['body'])
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
