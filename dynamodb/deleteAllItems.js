const AWS_SYDNEY_REGION = 'ap-southeast-2';
const TABLE_NAME = 'CUSTOMER_LIST';

// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');
// Set the region
AWS.config.update({ region: AWS_SYDNEY_REGION });

const getAllItems = function getAllItems() {
  return new Promise((resolve, reject) => {
    // Create the DynamoDB service object
    const ddb = new AWS.DynamoDB({ apiVersion: '2012-10-08' });

    const params = {
      TableName: TABLE_NAME,
    };

    ddb.scan(params, (err, data) => {
      if (err) {
        reject(Error(err));
      } else {
        resolve(data);
      }
    });
  });
};

getAllItems().then((data) => {
  const items = data.Items;
  const ddb = new AWS.DynamoDB({ apiVersion: '2012-10-08' });
  const itemsLength = items.length;
  for (let i = 0; i < itemsLength; i += 1) {
    const params = {
      TableName: TABLE_NAME,
      Key: {
        CUSTOMER_ID: items[i].CUSTOMER_ID,
        CUSTOMER_NAME: items[i].CUSTOMER_NAME,
      },
    };

    // Call DynamoDB to delete the item from the table
    ddb.deleteItem(params, (err, dataDeleteItem) => {
      if (err) {
        console.log('Error', err);
      } else {
        console.log('Success deleted item', dataDeleteItem);
      }
    });
  }
});
