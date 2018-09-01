const AWS_SYDNEY_REGION = 'ap-southeast-2';
const TABLE_NAME = 'CUSTOMER_LIST';

// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');
// Set the region
AWS.config.update({ region: AWS_SYDNEY_REGION });

if (!process.argv || !process.argv[2]) {
  // console.log('Error: No key name');
  // process.exit();
}

// Create the DynamoDB service object
const ddb = new AWS.DynamoDB({ apiVersion: '2012-10-08' });

const params2 = {
  ExpressionAttributeNames: {
    '#CUSTOMER_ID': 'CUSTOMER_ID',
    '#CUSTOMER_NAME': 'CUSTOMER_NAME',
  },
  ExpressionAttributeValues: {
    ':a': {
      N: '001',
    },
  },
  FilterExpression: 'CUSTOMER_ID = :a',
  ProjectionExpression: '#CUSTOMER_ID, #CUSTOMER_NAME',
  TableName: TABLE_NAME,
};

const params = {
  TableName: TABLE_NAME,
};

ddb.scan(params, (err, data) => {
  if (err) {
    console.log(err, err.stack); // an error occurred
  } else {
    console.log('data', data); // successful response
    console.log('data.items', data.Items);
  }
});
