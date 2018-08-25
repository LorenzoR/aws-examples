const AWS_SYDNEY_REGION = 'ap-southeast-2';

// Load the SDK for JavaScript
const AWS = require('aws-sdk');
// Set the region
AWS.config.update({ region: AWS_SYDNEY_REGION });

const TABLE_NAME = 'CUSTOMER_LIST';

// Create the DynamoDB service object
const ddb = new AWS.DynamoDB({ apiVersion: '2012-10-08' });

const params = {
  AttributeDefinitions: [
    {
      AttributeName: 'CUSTOMER_ID',
      AttributeType: 'N',
    },
    {
      AttributeName: 'CUSTOMER_NAME',
      AttributeType: 'S',
    },
  ],
  KeySchema: [
    {
      AttributeName: 'CUSTOMER_ID',
      KeyType: 'HASH',
    },
    {
      AttributeName: 'CUSTOMER_NAME',
      KeyType: 'RANGE',
    },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1,
  },
  TableName: TABLE_NAME,
  StreamSpecification: {
    StreamEnabled: false,
  },
};

// Call DynamoDB to create the table
ddb.createTable(params, (err, data) => {
  if (err) {
    console.log('Error', err);
  } else {
    console.log('Success', data);
  }
});
