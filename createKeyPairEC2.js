let AWS = require('aws-sdk');
let config = require('./config');
let fs = require('fs');

AWS.config.update({accessKeyId: config.accessKey, secretAccessKey: config.secretAccessKey, region: config.region});

// Create EC2 service object
let ec2 = new AWS.EC2({apiVersion: '2016-11-15'});

let params = {
    KeyName: process.argv[2]
};

// Create the key pair
ec2.createKeyPair(params, function(err, data) {
    if (err) {
       console.log("Error", err);
    } else {
        fs.writeFile(params.KeyName + '.pem', JSON.stringify(data, null, 4), function (err) {
            if (err) throw err;
          });
        fs.writeFile(params.KeyName + '.txt', data.KeyMaterial, function (err) {
            if (err) throw err;
          });
       console.log(JSON.stringify(data));
    }
 });