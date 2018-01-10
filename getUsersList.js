let AWS = require('aws-sdk');
let config = require('./config');


AWS.config.update({accessKeyId: config.accessKey, secretAccessKey: config.secretAccessKey, region: config.region});

// Create the IAM service object
let iam = new AWS.IAM({apiVersion: '2010-05-08'});

let params = {
  MaxItems: 10
};

iam.listUsers(params, function(err, data) {
  if (err) {
    console.log("Error", err);
    throw err;
  } else {
    var users = data.Users || [];
    users.forEach(function(user) {
      console.log("User " + user.UserName + " created", user.CreateDate);
    });
  }
});

