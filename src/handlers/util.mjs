import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";

const client = new S3Client({});

export function configureResponse(statusCode, data, dataType = Object) {
  let body_data = {};

  if (dataType == Object) body_data = JSON.stringify(data);
  else body_data = data;
  let rtnData = {
    isBase64Encoded: false,
    statusCode: statusCode,
    body: body_data,
    headers: {
      "content-type": "application/json",
    },
  };
  return rtnData;
}

export async function readS3File(bucket, key, log_id = null) {
  const cmd = new GetObjectCommand({
    Bucket: bucket,
    Key: key,
  });
  try {
    const file = await client.send(cmd);
    console.log(file);
    const file_data = await file.Body.transformToString();
    console.log(file_data);
    return configureResponse(200, file_data, String);
  } catch (err) {
    console.error({ error: err, logId: log_id });
    return configureResponse(500, {
      errorMessage:
        "Something wrong has happend. Please consult your error logs.",
      logId: log_id,
    });
  }
}
