export const PingGet = async (event) => {
  console.log(event);
  return {
    isBase64Encoded: false,
    statusCode: 200,
    body: JSON.stringify(event),
    headers: {
      "content-type": "application/json",
    },
  };
};
