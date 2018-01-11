let AWS = require('aws-sdk');
let config = require('./config');
let fs = require('fs');

AWS.config.update({accessKeyId: config.accessKey, secretAccessKey: config.secretAccessKey, region: config.region});

// Create the IAM service object
let iam = new AWS.IAM({apiVersion: '2010-05-08'});

let params = {
    UserName: process.argv[2]
};

iam.createAccessKey(params, function(err, data) {
    if (err) {
      throw err;
    } else {
        // fs.appendFile('accessKeys.txt', "\n Keys " + JSON.stringify(data) + " created successfully", function (err) {
        //     if (err) throw err;
        //   });
      console.log("Success", data);
    }
  });
