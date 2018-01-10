let AWS = require('aws-sdk');
let config = require('./config');


AWS.config.update({accessKeyId: config.accessKey, secretAccessKey: config.secretAccessKey, region: config.region});

// Create the IAM service object
var iam = new AWS.IAM({apiVersion: '2010-05-08'});

var params = {
  UserName: process.argv[2]
};

var params = {
    AssumeRolePolicyDocument: JSON.stringify(config.myPolicy), /* required */
    RoleName: process.argv[2], /* required */
    Description: 'STRING_VALUE',
    Path: '/'
  };
  iam.createRole(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
  });