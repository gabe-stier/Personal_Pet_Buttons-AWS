import { configureResponse } from "./util.mjs";
export const PingGet = async (event) => {
  console.log(event);
  return configureResponse(200, event);
};
