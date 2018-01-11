let AWS = require('aws-sdk');
let config = require('./config');


AWS.config.update({accessKeyId: config.accessKey, secretAccessKey: config.secretAccessKey, region: config.region});

// Create the IAM service object
let iam = new AWS.IAM({apiVersion: '2010-05-08'});

let myManagedPolicy = {
	"Version": "2012-10-17",
	"Statement": [{
		"Effect": "Allow",
		"Principal": {
			"Service": ["ec2.amazonaws.com"]
		},
		"Action": ["sts:AssumeRole"]
	}]
}

let params = {
    AssumeRolePolicyDocument: JSON.stringify(myManagedPolicy), /* required */
    RoleName: process.argv[2], /* required */
    Description: 'For EC2 Instance',
    Path: '/'
  };
  iam.createRole(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
  });