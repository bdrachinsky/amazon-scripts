let AWS = require('aws-sdk');
let config = require('./config');
let fs = require('fs');

AWS.config.update({accessKeyId: config.accessKey, secretAccessKey: config.secretAccessKey, region: config.region});

// Create the IAM service object
let iam = new AWS.IAM({apiVersion: '2010-05-08'});

let paramsRoleList = {
    RoleName: process.argv[2]
  };
  
  let policyName = process.argv[3];
  let policyArn = process.argv[4];
  // AmazonEC2ContainerServiceforEC2Role
  // arn:aws:iam::aws:policy/service-role/AmazonEC2ContainerServiceforEC2Role
  
  iam.listAttachedRolePolicies(paramsRoleList).eachPage(function(err, data) {
    if (err) {
      throw err;
    }
    if (data && data.AttachedPolicies) {
      data.AttachedPolicies.forEach(function(rolePolicy) {
        if (rolePolicy.PolicyName === policyName) {
          console.log(policyName + ' is already attached to this role.');
          process.exit();
        }
      });
    } else {
      // there are no more results when data is null
      let params = {
        PolicyArn: policyArn,
        RoleName: process.argv[2]
      };
      iam.attachRolePolicy(params, function(err, data) {
        if (err) {
          console.error('Unable to attach policy to role.');
          throw err;
        } else {
            fs.appendFile('attachRolePolicies.txt', "\nRole " + JSON.stringify(data) + " attached successfully", function (err) {
                if (err) throw err;
              });
          console.log('Role attached successfully.');
        }
      });
    }
  });
