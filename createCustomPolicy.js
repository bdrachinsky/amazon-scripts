let AWS = require('aws-sdk');
let config = require('./config');


AWS.config.update({accessKeyId: config.accessKey, secretAccessKey: config.secretAccessKey, region: config.region});

// Create the IAM service object
let iam = new AWS.IAM({apiVersion: '2010-05-08'});

let myManagedPolicy = {
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "elasticloadbalancing:ConfigureHealthCheck",
                "elasticloadbalancing:DescribeLoadBalancers",
                "iam:ListRoles",
                "iam:PassRole",
                "ec2:DescribeRegions",
                "ec2:DescribeInstances",
                "ecs:DescribeClusters",
                "ecs:ListClusters",
                "ecs:RegisterTaskDefinition",
                "ecs:DeregisterTaskDefinition",
                "ecs:ListTaskDefinitions",
                "ecs:DescribeServices",
                "ecs:UpdateService",
                "ecs:DeleteService",
                "ecs:CreateService",
                "ecs:ListTasks",
                "ecs:ListContainerInstances",
                "ecs:DescribeContainerInstances"
            ],
            "Resource": "*"
        }
    ]
};

let params = {
    PolicyDocument: JSON.stringify(myManagedPolicy),
    PolicyName: 'ShippablePolicies',
  };
  
  iam.createPolicy(params, function(err, data) {
    if (err) {
      console.log("Error ", err);
      throw err;
    } else {
      console.log("New Policy: ", data);
    }
  });