"# amazon-scripts" 

*WITHOUT ELB*

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

7. Execute "node .\createKeyPairEC2.js KEY_NAME" -- this will generate an EC2 instance keys and create the 'KEY_NAME.pem' and 'KEY_NAME.txt' in root directory

8. Navigate to Elastic Container Service and create the Cluster

8.1 Open "createECSInstance.js" and change "ImageId", "InstanceType", "IamInstanceProfile => Name", "KeyName" to what's best for you (I can do it via command line if you want)

8.2 Execute "node .\createECSInstance.js CLUSTER_NAME" -- this will create an EC2 instance

