const AWS_SYDNEY_REGION = 'ap-southeast-2';

// Load the SDK for JavaScript
const AWS = require('aws-sdk');
// Set the region
AWS.config.update({ region: AWS_SYDNEY_REGION });

// Create the DynamoDB service object
const dynamodb = new AWS.DynamoDB({ apiVersion: '2012-10-08' });

const params = {};

dynamodb.listTables(params, (err, data) => {
  if (err) {
    console.log(err, err.stack); // an error occurred
  } else {
    console.log(data); // successful response
  }
  /*
   data = {
    TableNames: [
       "Forum",
       "ProductCatalog",
       "Reply",
       "Thread"
    ]
   }
   */
});
