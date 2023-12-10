import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { configureResponse, readS3File } from "./util.mjs";
const client = new S3Client({});

let bucket_name = process.env.CONFIGBUCKET_BUCKET_NAME;
let settings_filename = process.env.SETTINGS_FILE_NAME;

export const SettingsPut = async (event) => {
  return configureResponse(200, {});
};
export const SettingsGet = async (event) => {
  console.log(event);
  let log_id = event.requestContext.requestId;

  return readS3File(bucket_name, settings_filename, log_id);
};
