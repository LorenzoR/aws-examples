const AWS_SYDNEY_REGION = 'ap-southeast-2';
const TABLE_NAME = 'CUSTOMER_LIST';

// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');
// Set the region
AWS.config.update({ region: AWS_SYDNEY_REGION });

if (!process.argv || !process.argv[2]) {
  console.log('Error: No key name');
  process.exit();
}

// Create the DynamoDB service object
const ddb = new AWS.DynamoDB({ apiVersion: '2012-10-08' });

const params = {
  TableName: TABLE_NAME,
  Key: {
    CUSTOMER_ID: { N: '001' },
    CUSTOMER_NAME: { S: 'Richard Roe' },
  },
  ProjectionExpression: 'CUSTOMER_NAME',
};

// Call DynamoDB to read the item from the table
ddb.getItem(params, (err, data) => {
  if (err) {
    console.log('Error', err);
  } else if (data && data.Item) {
    console.log('Success', data.Item);
  } else {
    console.log('Item not found', params);
  }
});
