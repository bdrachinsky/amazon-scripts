let AWS = require('aws-sdk');
let config = require('./config');


AWS.config.update({accessKeyId: config.accessKey, secretAccessKey: config.secretAccessKey, region: config.region});

// Create the IAM service object
let iam = new AWS.IAM({apiVersion: '2010-05-08'});

let params = {
  UserName: process.argv[2],
  MaxItems: 20
};

iam.listAttachedUserPolicies(params, function(err, data) {
  if (err) {
    console.log("Error", err);
    throw err;
  } else {
    let policies = data.AttachedPolicies || [];
    policies.forEach(function(policy) {
      console.log("PolicyName " + policy.PolicyName + " PolicyArn", policy.PolicyArn);
    });
  }
});

