let AWS = require('aws-sdk');
let config = require('./config');
let fs = require('fs');
let bs = require('js-base64');


AWS.config.update({accessKeyId: config.accessKey, secretAccessKey: config.secretAccessKey, region: config.region});

// Create EC2 service object
let ec2 = new AWS.EC2({apiVersion: '2016-11-15'});

let ecs = new AWS.ECS({apiVersion: '2016-11-15'});

let clusterName = process.argv[2];

let userDataStr = bs.Base64.encode('#!/bin/bash\necho ECS_CLUSTER=' + clusterName + ' >> /etc/ecs/ecs.config');

let clusterToCreate = {
    clusterName: clusterName
   };

let params = {
    // 	ami-74262414 -- ес2 instance
    ImageId: 'ami-93eec2e9', // Free tier
    InstanceType: 't2.micro', //t2.micro
    MinCount: 1,
    MaxCount: 1,
    SecurityGroups:[
        'default' //'default' the name of security group
    ],
    
    UserData: userDataStr,
    IamInstanceProfile: {
        //Arn: 'arn:aws:iam::024808532830:instance-profile/tsprofile',
        Name: 'tsprofile' //'tsprofile' InstanceProfileName to attach
      },
      KeyName: 'tskeys' //'myKeys' Keys to attach
};

ecs.createCluster(clusterToCreate, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else { // successful response
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
    }           
   });

