let AWS = require('aws-sdk');
let config = require('./config');
let fs = require('fs');

AWS.config.update({accessKeyId: config.accessKey, secretAccessKey: config.secretAccessKey, region: config.region});

// Create the IAM service object
let iam = new AWS.IAM({apiVersion: '2010-05-08'});

var paramsCreate = {
    InstanceProfileName: process.argv[2]
   };
   iam.createInstanceProfile(paramsCreate, function(err, data) {
     if (err) console.log(err, err.stack); // an error occurred
     else     console.log(data);           // successful response
   });