import { configureResponse, readS3File, basicSetup } from "./util.mjs";

let bucket_name = process.env.CONFIGBUCKET_BUCKET_NAME;
let settings_filename = process.env.SETTINGS_FILE_NAME;

export const SettingsPut = async (event) => {
  let log_id = basicSetup(event);
  return configureResponse(200, {});
};
export const SettingsGet = async (event) => {
  let log_id = basicSetup(event);
  let fileData = readS3File(bucket_name, settings_filename, log_id);
  if (fileData == null)
    return configureResponse(500, {
      errorMessage:
        "Something wrong has happend. Please consult your error logs.",
      logId: log_id,
    });
  return configureResponse(200, fileData);
};
