const AWS_SYDNEY_REGION = 'ap-southeast-2';

// Load the SDK for JavaScript
const AWS = require('aws-sdk');
// Set the region
AWS.config.update({ region: AWS_SYDNEY_REGION });

// List tables
const listTables = function listTables() {
  return new Promise((resolve, reject) => {
    // Create the DynamoDB service object
    const dynamodb = new AWS.DynamoDB({ apiVersion: '2012-10-08' });

    const params = {};

    dynamodb.listTables(params, (err, data) => {
      if (err) {
        reject(Error(err)); // an error occurred
      } else {
        resolve(data); // successful response
      }
    });
  });
};

const deleteTable = function deleteTable(tableName) {
  // Create the DynamoDB service object
  const ddb = new AWS.DynamoDB({ apiVersion: '2012-10-08' });

  const params = {
    TableName: tableName,
  };

  // Call DynamoDB to delete the specified table
  return new Promise((resolve, reject) => {
    ddb.deleteTable(params, (err, data) => {
      if (err && err.code === 'ResourceNotFoundException') {
        reject(Error('Error: Table not found'));
      } else if (err && err.code === 'ResourceInUseException') {
        reject(Error('Error: Table in use'));
      } else {
        resolve(data);
      }
    });
  });
};

listTables().then((data) => {
  if (!data || !data.TableNames || data.TableNames.length <= 0) {
    console.log('No tables to delete.');
  } else {
    for (let i = 0; i < data.TableNames.length; i += 1) {
      const tableName = data.TableNames[i];
      console.log('Table', tableName);
      deleteTable(tableName).then((deleteTableData) => {
        console.log(`${tableName} succesfully deleted.`, deleteTableData);
      }).catch((error) => {
        console.log('Error deleting table', error);
      });
    }
  }
}).catch((error) => {
  console.log('ERROR', error);
});
