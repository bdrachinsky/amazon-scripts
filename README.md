"# amazon-scripts" 

*WITH ELB*

1. Open "config.js" and fill it with your credentials

2. Open command line(terminal) and navigate to the root folder

3. Execute "node .\createUser.js USER_NAME" this will create you a IAM user

3.1 Execute "node .\attachUserInlinePolicies.js USER_NAME" -- this will attach policies to your user

3.2 Execute "node .\createAccessKeysForUser.js USER_NAME" -- this will create keys for your user and accessKeys.txt in the root.

4. Open browser and navigate to the app.shippable.command

4.1 Click on "Integrations" tab

4.2 Click on "+" sign

4.3 Select "AWS KEYS" INTEGRATION TYPE

4.4 Copy your user's Access and Secret keys and paste them.

4.5 I will provide my ymls that you need to modify a bit.

5. Execute "node .\createCustomPolicy.js" -- this will create a custom role named ShippablePolicies

6 Execute "node .\createRole.js ROLE_NAME" -- this will create a ROLE_NAME

6.1 Execute "node .\attachRolePolicies.js ROLE_NAME AmazonEC2ContainerServiceforEC2Role arn:aws:iam::aws:policy/service-role/AmazonEC2ContainerServiceforEC2Role" -- this will attach policy to your ROLE for interaction with EC2 instance

6.2 Execute "node .\attachRolePolicies.js ROLE_NAME ShippablePolicies ShippablePolicies_ARN" -- this will attach custom policy to your ROLE

6.3 Execute "node .\createInstanceProfile.js INSTANCE_PROFILE_NAME" -- this will create instance profile

6.4 Execute "node .\attachRoleToInstanceProfile.js INSTANCE_PROFILE_NAME ROLE_NAME" -- this attach role to the instance profile

7. Execute "node .\createKeyPairEC2.js KEY_NAME" -- this will generate an EC2 instance keys and create the 'KEY_NAME.pem' and 'KEY_NAME.txt' in root directory

8 Open "createECSInstance.js" and change "ImageId", "InstanceType", "IamInstanceProfile => Name", "KeyName" to what's best for you (I can do it via command line if you want)

8.1 Execute "node .\createECSInstance.js CLUSTER_NAME" -- this will create an EC2 instance

8.2 Adjust desirable services in cluster

9 Change in YMLs cluster name\repository\ports

10 Navigate to "Load Balancers"

10.1 Click on "Create Load Balancer"

10.2 Pick Application Load Balancer (ALB)

10.3 Fill the name, leave listener on 80 port and add if another one on 443 port necessary. Pick 2+ available zones

10.4 Add SSL certificates if necessary

10.5 Pick default security group (ALL outbound and inbound connections)

10.6 You need to create target group. If your primary root going to be https -- you need to create https target group

10.7 skip step "Register targets" we will do it with shippable

11 Navigate to IAM role and check whether you have "AWSServiceRoleForECS" role. If you don't such role -- go to 11.1 otherwise go to 12

11.1 Click on "Create Role"

11.2 Click on "ECS"

11.3 Select role "AWSServiceRoleForECS"

12 Go to app.shippable.com  

12.1 Navigate to integrations

12.2 Add AWS IAM integration with the role. Like this "arn:aws:iam::024808532830:role/aws-service-role/ecs.amazonaws.com/AWSServiceRoleForECS"

13 Change ALB name, add dynamic port forwarding (in docker option you should have something like 0:3000) in shippable ymls


