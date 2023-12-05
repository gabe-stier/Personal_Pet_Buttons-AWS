import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";

const client = new S3Client({});

let bucket_name = process.env.BUCKET_NAME;
// let log_id = aws.util.uuid.v4();

export const SettingsPut = async (event) => {
  return { statusCode: 200, body: {} };
};
export const SettingsGet = async (event) => {
  console.log(event);
  const cmd = new GetObjectCommand({
    Bucket: bucket_name,
    Key: "settings.conf",
  });

  try {
    return { statusCode: 200, body: {} };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: {
        error_message:
          "Something wrong has happend. Please consult your error logs.",
        log_id: "",
      },
    };
  }

  return { statusCode: 200, body: {} };
};
