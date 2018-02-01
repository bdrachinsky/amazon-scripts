let AWS = require('aws-sdk');
let config = require('./config');
let fs = require('fs');

AWS.config.update({accessKeyId: config.accessKey, secretAccessKey: config.secretAccessKey, region: config.region});

// Create the EC2 service object
let ec2 = new AWS.EC2({apiVersion: '2016-11-15'});

// Variable to hold a ID of a VPC
var vpc = null;

// Retrieve the ID of a VPC
ec2.describeVpcs(function(err, data) {
    if (err) {
      console.log("Cannot retrieve a VPC", err);
    } else {
      vpc = data.Vpcs[0].VpcId;
      var paramsSecurityGroup = {
         Description: 'DESCRIPTION',
         GroupName: process.argv[2],
         VpcId: vpc
      };
      // Create the instance
      ec2.createSecurityGroup(paramsSecurityGroup, function(err, data) {
         if (err) {
            console.log("Error", err);
         } else {
            var SecurityGroupId = data.GroupId;
            console.log("Success", SecurityGroupId);
            var paramsIngress = {
              GroupName: process.argv[2],
              IpPermissions:[
                 {
                    IpProtocol: "-1",
                    FromPort: -1,
                    ToPort: -1,
                    IpRanges: [{"CidrIp":"::/0"}]
                }
              ]
            };
            ec2.authorizeSecurityGroupIngress(paramsIngress, function(err, data) {
              if (err) {
                console.log("Error", err);
              } else {
                fs.appendFile('createSecyrityGroup.txt', "\nUser " + JSON.stringify(data) + " created successfully", function (err) {
                    if (err) throw err;
                    console.log('Saved!');
                  });
                console.log("Ingress Successfully Set", data);
              }
           });
         }
      });
    }
 });
