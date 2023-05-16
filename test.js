var params = [
  {
    TableName: "event.ResourceProperties.DynamoTableName",
    Item: {
      id: "quietTime",
      value: [],
    },
  },
  {
    TableName: "event.ResourceProperties.DynamoTableName",
    Item: {
      id: "quietButtons",
      value: {},
    },
  },
  {
    TableName: "event.ResourceProperties.DynamoTableName",
    Item: {
      id: "sendNotificatios",
      value: true,
    },
  },
  {
    TableName: "event.ResourceProperties.DynamoTableName",
    Item: {
      id: "sendAudio",
      value: true,
    },
  },
];
for (var param in params) {
  console.log(params[param]);
}
