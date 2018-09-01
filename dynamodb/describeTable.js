const AWS_SYDNEY_REGION = 'ap-southeast-2';

// Load the SDK for JavaScript
const AWS = require('aws-sdk');
// Set the region
AWS.config.update({ region: AWS_SYDNEY_REGION });

const TABLE_NAME = 'CUSTOMER_LIST';

// Create the DynamoDB service object
const dynamodb = new AWS.DynamoDB({ apiVersion: '2012-10-08' });

const params = {
  TableName: TABLE_NAME,
};

dynamodb.describeTable(params, (err, data) => {
  if (err) {
    console.log(err, err.stack); // an error occurred
  } else {
    console.log(data); // successful response
  }
});
