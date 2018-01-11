let AWS = require('aws-sdk');
let config = require('./config');
let fs = require('fs');


AWS.config.update({accessKeyId: config.accessKey, secretAccessKey: config.secretAccessKey, region: config.region});

// Create EC2 service object
let ec2 = new AWS.EC2({apiVersion: '2016-11-15'});

let params = {
    ImageId: 'ami-2f99984f', // Free tier
    InstanceType: 't2.micro',
    MinCount: 1,
    MaxCount: 1,
    IamInstanceProfile: {
        //Arn: 'arn:aws:iam::024808532830:instance-profile/TestRole',
        Name: 'TestRole'
      },
      KeyName: 'myKeys'
};

// Create the instance
ec2.runInstances(params, function(err, data) {
    if (err) {
       console.log("Could not create instance", err);
       return;
    }
    let instanceId = data.Instances[0].InstanceId;
    console.log("Created instance", instanceId);
    // Add tags to the instance
    params = {Resources: [instanceId], Tags: [
       {
          Key: 'inst',
          Value: 'ShipInstance'
       }
    ]};
    ec2.createTags(params, function(err) {
       console.log("Tagging instance", err ? "failure" : "success");
    });
 });