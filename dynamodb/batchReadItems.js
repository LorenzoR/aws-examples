const AWS_SYDNEY_REGION = 'ap-southeast-2';
const TABLE_NAME = 'CUSTOMER_LIST';

// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');
// Set the region
AWS.config.update({ region: AWS_SYDNEY_REGION });

// Create the DynamoDB service object
const ddb = new AWS.DynamoDB({ apiVersion: '2012-10-08' });

const params = {
  RequestItems: {
    CUSTOMER_LIST: {
      Keys: [
        { CUSTOMER_ID: { N: '1' }, CUSTOMER_NAME: { S: 'Richard Roe 1' } },
        { CUSTOMER_ID: { N: '2' }, CUSTOMER_NAME: { S: 'Richard Roe 2' } },
        { CUSTOMER_ID: { N: '3' }, CUSTOMER_NAME: { S: 'Richard Roe 3' } },
      ],
      ProjectionExpression: 'CUSTOMER_ID, CUSTOMER_NAME',
    },
  },
};

ddb.batchGetItem(params, (err, data) => {
  if (err) {
    console.log('Error', err);
  } else {
    console.log('data', data)
    data.Responses.CUSTOMER_LIST.forEach((element, index, array) => {
      console.log(element);
    });
  }
});
