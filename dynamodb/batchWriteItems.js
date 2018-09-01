const AWS_SYDNEY_REGION = 'ap-southeast-2';
const TABLE_NAME = 'CUSTOMER_LIST';

// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');
// Set the region
AWS.config.update({ region: AWS_SYDNEY_REGION });

// Default 100 new items
const numberOfItems = (process.argv || process.argv[2]) ? process.argv[2] : 100;

// Create the DynamoDB service object
const ddb = new AWS.DynamoDB({ apiVersion: '2012-10-08' });

const newItems = [];

for (let i = 0; i < numberOfItems; i += 1) {
  const newItem = {
    PutRequest: {
      Item: {
        CUSTOMER_ID: { N: (i + 10).toString() },
        CUSTOMER_NAME: { S: `Richard Roe ${(i + 10)}` },
      },
    },
  };

  newItems.push(newItem);
}

const params = {
  RequestItems: {
    CUSTOMER_LIST: newItems,
  },
};

ddb.batchWriteItem(params, (err, data) => {
  if (err) {
    console.log('Error', err);
  } else {
    console.log('Success', data);
  }
});
