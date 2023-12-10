import { configureResponse, readS3File, basicSetup } from "./util.mjs";

let bucket_name = process.env.CONFIGBUCKET_BUCKET_NAME;
let settings_filename = process.env.SETTINGS_FILE_NAME;
let buttons_filename = process.env.BUTTONS_FILE_NAME;

export const PingGet = async (event) => {
  let log_id = basicSetup(event);
  let settings_data = readS3File(bucket_name, settings_filename, log_id);
  let buttons_data = readS3File(bucket_name, buttons_filename, log_id);
  let return_data = {
    buttons: { disabledButtons: [] },
    settings: {
      quietTime: settings_data.globalQuietTime.enabled,
    },
  };

  if (return_data.settings.quietTime) {
    return_data.settings.quietStart = settings_data.quietTime.quietStart;
    return_data.settings.quietStop = settings_data.quietTime.quietStop;
  }

  for (let [key, val] of Object.entries(buttons_data)) {
    if (val.disabled) {
      return_data.buttons.disabledButtons.push({
        name: key,
        uuid: val.uuid,
      });
    }
  }

  return configureResponse(200, return_data);
};
