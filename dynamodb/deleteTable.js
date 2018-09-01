const AWS_SYDNEY_REGION = 'ap-southeast-2';

// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');
// Set the region
AWS.config.update({ region: AWS_SYDNEY_REGION });

if (!process.argv || !process.argv[2]) {
  console.log('Error: Table not found');
  process.exit();
}

// Create the DynamoDB service object
const ddb = new AWS.DynamoDB({ apiVersion: '2012-10-08' });

const params = {
  TableName: process.argv[2],
};

// Call DynamoDB to delete the specified table
ddb.deleteTable(params, (err, data) => {
  if (err && err.code === 'ResourceNotFoundException') {
    console.log('Error: Table not found');
  } else if (err && err.code === 'ResourceInUseException') {
    console.log('Error: Table in use');
  } else {
    console.log('Success', data);
  }
});
