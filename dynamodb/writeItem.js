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
  Item: {
    CUSTOMER_ID: { N: new Date().getTime().toString() },
    CUSTOMER_NAME: { S: 'Richard Roe' },
    CUSTOMER_EMAIL: { S: 'email@mail.com' },
  },
};

// Call DynamoDB to add the item to the table
ddb.putItem(params, (err, data) => {
  if (err) {
    console.log('Error', err);
  } else {
    console.log('Success', data);
  }
});
