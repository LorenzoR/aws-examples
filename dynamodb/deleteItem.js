const AWS_SYDNEY_REGION = 'ap-southeast-2';
const TABLE_NAME = 'CUSTOMER_LIST';

// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');
// Set the region
AWS.config.update({ region: AWS_SYDNEY_REGION });

// Create the DynamoDB service object
const ddb = new AWS.DynamoDB({ apiVersion: '2012-10-08' });

const params = {
  TableName: TABLE_NAME,
  Key: {
    CUSTOMER_ID: { N: '1535183519117' },
    CUSTOMER_NAME: { S: 'Richard Roe' },
  },
};

// Call DynamoDB to delete the item from the table
ddb.deleteItem(params, (err, data) => {
  if (err) {
    console.log('Error', err);
  } else {
    console.log('Success', data);
  }
});
