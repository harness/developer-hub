---
title: AWS Connector Settings Reference
description: This topic provides settings and permissions for the AWS Connector.
# sidebar_position: 2
helpdocs_topic_id: m5vkql35ca
helpdocs_category_id: 1ehb4tcksy
helpdocs_is_private: false
helpdocs_is_published: true
---

AWS is used as a Harness Connector for activities such as obtaining artifacts, building and deploying services, and verifying deployments.

This topic provides settings and permissions for the AWS Connector.


:::warning
The [DescribeRegions](https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_DescribeRegions.html) action is required for all AWS Connectors regardless of what AWS service you are using for your target or build infrastructures.

:::

### AWS Permissions


:::note
The [DescribeRegions](https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_DescribeRegions.html) action is required for all AWS Connectors regardless of what AWS service you are using for your target or build infrastructure.

:::

The AWS role policy requirements depend on what AWS services you are using for your artifacts and target infrastructure.

Here are the user and access type requirements that you need to consider.

**User:** Harness requires the IAM user be able to make API requests to AWS. For more information, see [Creating an IAM User in Your AWS Account](http://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html) from AWS.

**User Access Type:** **Programmatic access**. This enables an access key ID and secret access key for the AWS API, CLI, SDK, and other development tools.

As described below, `DescribeRegions` is required for all AWS Cloud Provider connections.

### All AWS Connectors: DescribeRegions Required


:::warning
The [DescribeRegions](https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_DescribeRegions.html) action is required for all AWS Connectors regardless of what AWS service you are using for your target or build infrastructure.

:::

Harness needs a policy with the `DescribeRegions` action so that it can list the available regions for you when you define your target architecture.

Create a [Customer Managed Policy](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_managed-vs-inline.html#customer-managed-policies), add the `DescribeRegions` action to list those regions, and add that to any role used by the Connector.


```
{  
    "Version": "2012-10-17",  
    "Statement": [  
        {  
            "Sid": "VisualEditor0",  
            "Effect": "Allow",  
            "Action": "ec2:DescribeRegions",  
            "Resource": "*"  
        }  
    ]  
}
```
### AWS Policies Required


:::warning
The [DescribeRegions](https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_DescribeRegions.html) action is required for all AWS Connectors regardless of what AWS service you are using for your target or build infrastructure.

:::

### AWS S3

#### Reading from AWS S3

There are two policies required:

* The Managed Policy **AmazonS3ReadOnlyAccess**.
* The [Customer Managed Policy](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_managed-vs-inline.html#customer-managed-policies) you create using `ec2:DescribeRegions`.


:::warning
The AWS [IAM Policy Simulator](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_testing-policies.html) is a useful tool for evaluating policies and access.

:::

**Policy Name**: `AmazonS3ReadOnlyAccess`.

**Policy ARN:** `arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess`.

**Description:** Provides read-only access to all buckets via the AWS Management Console.

**Policy JSON:**


```
{  
  "Version": "2012-10-17",  
  "Statement": [  
    {  
      "Effect": "Allow",  
      "Action": [  
        "s3:Get*",  
        "s3:List*"  
      ],  
      "Resource": "*"  
    }  
  ]  
}
```
**Policy Name:** `HarnessS3`.

**Description:** Harness S3 policy that uses EC2 permissions. This is a customer-managed policy you must create. In this example we have named it `HarnessS3`.

**Policy JSON:**


```
{  
    "Version": "2012-10-17",  
    "Statement": [  
        {  
            "Sid": "VisualEditor0",  
            "Effect": "Allow",  
            "Action": "ec2:DescribeRegions",  
            "Resource": "*"  
        }  
    ]  
}
```

:::note
If you want to use an S3 bucket that is in a separate account than the account used to set up the AWS Cloud Provider, you can grant cross-account bucket access. For more information, see [Bucket Owner Granting Cross-Account Bucket Permissions](https://docs.aws.amazon.com/AmazonS3/latest/dev/example-walkthroughs-managing-access-example2.html) from AWS.

:::

#### Writing to AWS S3

There are two policies required:

* The [Customer Managed Policy](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_managed-vs-inline.html#customer-managed-policies) you create, for example **HarnessS3Write**.
* The Customer Managed Policy you create using `ec2:DescribeRegions`.

**Policy Name**:`HarnessS3Write`.

**Description:** Custom policy for pushing to S3.

**Policy JSON:**


```
{  
    "Version": "2012-10-17",  
    "Statement": [  
        {  
            "Sid": "AllObjectActions",  
            "Effect": "Allow",  
            "Action": "s3:*Object",  
            "Resource": ["arn:aws:s3:::bucket-name/*"]  
        }  
    ]  
}
```
**Policy Name:** `HarnessS3`.

**Description:** Harness S3 policy that uses EC2 permissions. This is a customer-managed policy you must create. In this example we have named it `HarnessS3`.

**Policy JSON:**


```
{  
    "Version": "2012-10-17",  
    "Statement": [  
        {  
            "Sid": "VisualEditor0",  
            "Effect": "Allow",  
            "Action": "ec2:DescribeRegions",  
            "Resource": "*"  
        }  
    ]  
}
```

:::note
If you want to use an S3 bucket that is in a separate account than the account used to set up the AWS Cloud Provider, you can grant cross-account bucket access. For more information, see [Bucket Owner Granting Cross-Account Bucket Permissions](https://docs.aws.amazon.com/AmazonS3/latest/dev/example-walkthroughs-managing-access-example2.html) from AWS.

:::

#### Read and Write to AWS S3

You can have a single policy that reads and writes with an S3 bucket.

See [Allows read and write access to objects in an S3 Bucket](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_examples_s3_rw-bucket.html) and [Allows read and write access to objects in an S3 Bucket, programmatically and in the console](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_examples_s3_rw-bucket-console.html) from AWS.

Here is an example that includes AWS console access:


```
{  
    "Version": "2012-10-17",  
    "Statement": [  
        {  
            "Sid": "ConsoleAccess",  
            "Effect": "Allow",  
            "Action": [  
                "s3:GetAccountPublicAccessBlock",  
                "s3:GetBucketAcl",  
                "s3:GetBucketLocation",  
                "s3:GetBucketPolicyStatus",  
                "s3:GetBucketPublicAccessBlock",  
                "s3:ListAllMyBuckets"  
            ],  
            "Resource": "*"  
        },  
        {  
            "Sid": "ListObjectsInBucket",  
            "Effect": "Allow",  
            "Action": "s3:ListBucket",  
            "Resource": ["arn:aws:s3:::bucket-name"]  
        },  
        {  
            "Sid": "AllObjectActions",  
            "Effect": "Allow",  
            "Action": "s3:*Object",  
            "Resource": ["arn:aws:s3:::bucket-name/*"]  
        }  
    ]  
}
```
### AWS Elastic Container Registry (ECR)

#### Pulling from ECR

**Policy Name**:`AmazonEC2ContainerRegistryReadOnly`.

**Policy ARN:** `arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly`.

**Description:** Provides read-only access to Amazon EC2 Container Registry repositories.

**Policy JSON:**


```
{  
  "Version": "2012-10-17",  
  "Statement": [  
      {  
              "Effect": "Allow",  
              "Action": [  
                  "ecr:GetAuthorizationToken",  
                  "ecr:BatchCheckLayerAvailability",  
                  "ecr:GetDownloadUrlForLayer",  
                  "ecr:GetRepositoryPolicy",  
                  "ecr:DescribeRepositories",  
                  "ecr:ListImages",  
                  "ecr:DescribeImages",  
                  "ecr:BatchGetImage"  
              ],  
              "Resource": "*"  
      }  
  ]  
}
```
#### Pushing to ECR

**Policy Name**: `AmazonEC2ContainerRegistryFullAccess`.

**Policy ARN:** `arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryFullAccess`. See [AWS managed policies for Amazon Elastic Container Registry](https://docs.aws.amazon.com/AmazonECR/latest/userguide/security-iam-awsmanpol.html) from AWS.

**Policy JSON Example:**


```
{  
    "Version": "2012-10-17",  
    "Statement": [  
        {  
            "Effect": "Allow",  
            "Action": [  
                "ecr:*",  
                "cloudtrail:LookupEvents"  
            ],  
            "Resource": "*"  
        },  
        {  
            "Effect": "Allow",  
            "Action": [  
                "iam:CreateServiceLinkedRole"  
            ],  
            "Resource": "*",  
            "Condition": {  
                "StringEquals": {  
                    "iam:AWSServiceName": [  
                        "replication.ecr.amazonaws.com"  
                    ]  
                }  
            }  
        }  
    ]  
}
```
### AWS CloudFormation

The credentials required for provisioning depend on what you are provisioning.

For example, if you wanted to give full access to create and manage EKS clusters, you could use a policy like this:


```
{  
     "Version": "2012-10-17",  
     "Statement": [  
         {  
             "Effect": "Allow",  
             "Action": [  
                 "autoscaling:*",  
                 "cloudformation:*",  
                 "ec2:*",  
                 "eks:*",  
                 "iam:*",  
                 "ssm:*"  
             ],  
             "Resource": "*"  
         }  
     ]  
 }
```
If you wanted to provide limited permissions for EKS clusters, you might use a policy like this:


```
 {  
     "Version": "2012-10-17",  
     "Statement": [  
         {  
             "Effect": "Allow",  
             "Action": [  
                 "autoscaling:CreateAutoScalingGroup",  
                 "autoscaling:DescribeAutoScalingGroups",  
                 "autoscaling:DescribeScalingActivities",  
                 "autoscaling:UpdateAutoScalingGroup",  
                 "autoscaling:CreateLaunchConfiguration",  
                 "autoscaling:DescribeLaunchConfigurations",  
                 "cloudformation:CreateStack",  
                 "cloudformation:DescribeStacks",  
                 "ec2:AuthorizeSecurityGroupEgress",  
                 "ec2:AuthorizeSecurityGroupIngress",  
                 "ec2:RevokeSecurityGroupEgress",  
                 "ec2:RevokeSecurityGroupIngress",  
                 "ec2:CreateSecurityGroup",  
                 "ec2:createTags",  
                 "ec2:DescribeImages",  
                 "ec2:DescribeKeyPairs",  
                 "ec2:DescribeRegions",  
                 "ec2:DescribeSecurityGroups",  
                 "ec2:DescribeSubnets",  
                 "ec2:DescribeVpcs",  
                 "eks:CreateCluster",  
                 "eks:DescribeCluster",  
                 "iam:AddRoleToInstanceProfile",  
                 "iam:AttachRolePolicy",  
                 "iam:CreateRole",  
                 "iam:CreateInstanceProfile",  
                 "iam:CreateServiceLinkedRole",  
                 "iam:GetRole",  
                 "iam:ListRoles",  
                 "iam:PassRole",  
                 "ssm:GetParameters"  
             ],  
             "Resource": "*"  
         }  
     ]  
 }
```
### Use Kubernetes Cluster Connector for EKS

If you want to connect Harness to Elastic Kubernetes Service (Amazon EKS), use the platform-agnostic [Kubernetes Cluster Connector](kubernetes-cluster-connector-settings-reference.md).

### AWS Serverless Lambda

There are three authentication options for the AWS Connector when used for AWS ECS images for AWS Serverless Lambda deployments:

* [AWS Access Key](#aws-access-key)
* [Assume IAM Role on Delegate](#assume-iam-role-on-delegate)
* [Use IRSA](#use-irsa-iam-roles-for-service-accounts)
* [Enable cross-account access (STS Role)](#enable-cross-account-access-sts-role)
	+ Requires that the AWS CLI is installed on the Delegate. See [Serverless and ​Enable cross-account access (STS Role)](#serverless-and-​enable-cross-account-access-sts-role).

For steps on Serverless Lambda deployments, see [Serverless Lambda CD Quickstart](https://docs.harness.io/article/5fnx4hgwsa-serverless-lambda-cd-quickstart).


:::warning
The [DescribeRegions](https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_DescribeRegions.html) action is required for all AWS Connectors regardless of what AWS service you are using for your target or build infrastructure.

:::

#### Permissions

All authentication methods for Serverless deployments require an AWS User with specific AWS permissions, as described in [AWS Credentials](https://www.serverless.com/framework/docs/providers/aws/guide/credentials) from Serverless. To create the AWS User, do the following:

* Log into your AWS account and go to the Identity & Access Management (IAM) page.
* Click **Users**, and then **Add user**. Enter a name. Enable **Programmatic access** by clicking the checkbox. Click **Next** to go to the **Permissions** page. Do one of the following:
	+ **Full Admin Access:** click on **Attach existing policies directly**. Search for and select **AdministratorAccess** then click **Next: Review**. Check to make sure everything looks good and click **Create user**.
	+ **Limited Access:** click on **Create policy**. Select the **JSON** tab, and add the JSON using the following code from the [Serverless gist](https://gist.github.com/ServerlessBot/7618156b8671840a539f405dea2704c8):

IAMCredentials.json
```
{  
    "Statement": [  
        {  
            "Action": [  
                "apigateway:*",  
                "cloudformation:CancelUpdateStack",  
                "cloudformation:ContinueUpdateRollback",  
                "cloudformation:CreateChangeSet",  
                "cloudformation:CreateStack",  
                "cloudformation:CreateUploadBucket",  
                "cloudformation:DeleteStack",  
                "cloudformation:Describe*",  
                "cloudformation:EstimateTemplateCost",  
                "cloudformation:ExecuteChangeSet",  
                "cloudformation:Get*",  
                "cloudformation:List*",  
                "cloudformation:UpdateStack",  
                "cloudformation:UpdateTerminationProtection",  
                "cloudformation:ValidateTemplate",  
                "dynamodb:CreateTable",  
                "dynamodb:DeleteTable",  
                "dynamodb:DescribeTable",  
                "dynamodb:DescribeTimeToLive",  
                "dynamodb:UpdateTimeToLive",  
                "ec2:AttachInternetGateway",  
                "ec2:AuthorizeSecurityGroupIngress",  
                "ec2:CreateInternetGateway",  
                "ec2:CreateNetworkAcl",  
                "ec2:CreateNetworkAclEntry",  
                "ec2:CreateRouteTable",  
                "ec2:CreateSecurityGroup",  
                "ec2:CreateSubnet",  
                "ec2:CreateTags",  
                "ec2:CreateVpc",  
                "ec2:DeleteInternetGateway",  
                "ec2:DeleteNetworkAcl",  
                "ec2:DeleteNetworkAclEntry",  
                "ec2:DeleteRouteTable",  
                "ec2:DeleteSecurityGroup",  
                "ec2:DeleteSubnet",  
                "ec2:DeleteVpc",  
                "ec2:Describe*",  
                "ec2:DetachInternetGateway",  
                "ec2:ModifyVpcAttribute",  
                "events:DeleteRule",  
                "events:DescribeRule",  
                "events:ListRuleNamesByTarget",  
                "events:ListRules",  
                "events:ListTargetsByRule",  
                "events:PutRule",  
                "events:PutTargets",  
                "events:RemoveTargets",  
                "iam:AttachRolePolicy",  
                "iam:CreateRole",  
                "iam:DeleteRole",  
                "iam:DeleteRolePolicy",  
                "iam:DetachRolePolicy",  
                "iam:GetRole",  
                "iam:PassRole",  
                "iam:PutRolePolicy",  
                "iot:CreateTopicRule",  
                "iot:DeleteTopicRule",  
                "iot:DisableTopicRule",  
                "iot:EnableTopicRule",  
                "iot:ReplaceTopicRule",  
                "kinesis:CreateStream",  
                "kinesis:DeleteStream",  
                "kinesis:DescribeStream",  
                "lambda:*",  
                "logs:CreateLogGroup",  
                "logs:DeleteLogGroup",  
                "logs:DescribeLogGroups",  
                "logs:DescribeLogStreams",  
                "logs:FilterLogEvents",  
                "logs:GetLogEvents",  
                "logs:PutSubscriptionFilter",  
                "s3:CreateBucket",  
                "s3:DeleteBucket",  
                "s3:DeleteBucketPolicy",  
                "s3:DeleteObject",  
                "s3:DeleteObjectVersion",  
                "s3:GetObject",  
                "s3:GetObjectVersion",  
                "s3:ListAllMyBuckets",  
                "s3:ListBucket",  
                "s3:PutBucketNotification",  
                "s3:PutBucketPolicy",  
                "s3:PutBucketTagging",  
                "s3:PutBucketWebsite",  
                "s3:PutEncryptionConfiguration",  
                "s3:PutObject",  
                "sns:CreateTopic",  
                "sns:DeleteTopic",  
                "sns:GetSubscriptionAttributes",  
                "sns:GetTopicAttributes",  
                "sns:ListSubscriptions",  
                "sns:ListSubscriptionsByTopic",  
                "sns:ListTopics",  
                "sns:SetSubscriptionAttributes",  
                "sns:SetTopicAttributes",  
                "sns:Subscribe",  
                "sns:Unsubscribe",  
                "states:CreateStateMachine",  
                "states:DeleteStateMachine"  
            ],  
            "Effect": "Allow",  
            "Resource": "*"  
        }  
    ],  
    "Version": "2012-10-17"  
}
```
* View and copy the API Key and Secret to a temporary place. You'll need them when setting up the Harness AWS Connector later in this quickstart.

#### Installing Serverless on the Delegate

The Delegate(s) used by the AWS Connector must have Serverless installed.

To install Serverless on a Kubernetes Delegate, edit the Delegate YAML to install Serverless when the Delegate pods are created.

Open the Delegate YAML in a text editor.

Locate the Environment variable `INIT_SCRIPT` in the `StatefulSet`.


```
...  
        - name: INIT_SCRIPT  
          value: ""  
...
```
Replace the value with the follow Serverless installation script.


```
...  
        - name: INIT_SCRIPT  
          value: |-  
            #!/bin/bash  
            echo "Start"  
            export DEBIAN_FRONTEND=noninteractive  
            echo "non-inte"  
            apt-get update  
            echo "updagte"  
            apt install -yq npm  
            echo "npm"  
            npm install -g serverless@v2.50.0  
            echo "Done"  
...
```

:::note
In rare cases when the Delegate OS does not support `apt` (like Red Hat Linux), you can can edit this script to install `npm`. The rest of the code should remain the same.Save the YAML file as **harness-delegate.yml**.

:::

You can now apply the Delegate YAML: `kubectl apply -f harness-delegate.yml`.

#### Serverless and ​Enable cross-account access (STS Role)

If you use the ​**Enable cross-account access (STS Role)** option in the AWS Connector for a Serverless Lambda deployment, the Delegate that is used by the Connector must have the AWS CLI installed.

The AWS CLI is not required for the other authentication methods.

For steps on installing software with the Delegate, see [Run Initialization Scripts on Delegates](../../2_Delegates/delegate-guide/run-scripts-on-delegates.md).

### Switching Policies

If the IAM role used by your AWS Connector does not have the policies required by the AWS service you want to access, you can modify or switch the role.

This entails changing the role assigned to the AWS account or Harness Delegate your AWS Connector is using.

When you switch or modify the IAM role used by the Connector, it might take up to 5 minutes to take effect.

### AWS Connector Settings

The AWS Connector settings are described below.

#### Name

The unique name for this Connector.

#### ID

See [Entity Identifier Reference](https://newdocs.helpdocs.io/article/li0my8tcz3-entity-identifier-reference).

#### Description

Text string.

#### Tags

See [Tags Reference](https://newdocs.helpdocs.io/article/i8t053o0sq-tags-reference).

#### Credentials


:::note
Ensure that the AWS IAM roles applied to the credentials you use (the Harness Delegate or the access key) includes the policies needed by Harness to deploy to the target AWS service.

:::


:::warning
The [DescribeRegions](https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_DescribeRegions.html) action is required for all AWS Connectors regardless of what AWS service you are using for your target infrastructure.

:::

Credentials that enable Harness to connect your AWS account.

There are three options:

* Assume IAM Role on Delegate
* AWS Access Keys manually
* Use IRSA

The settings for each option are described below.

### Assume IAM Role on Delegate


:::warning
The [DescribeRegions](https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_DescribeRegions.html) action is required for all AWS Connectors regardless of what AWS service you are using for your target infrastructure.

:::

This is often the simplest method for connecting Harness to your AWS account and services.

Once you select this option, you can select a Delegate in the next step of the AWS Connector.

Typically, the Delegate(s) is running in the target infrastructure.

### AWS Access Key

The access key and your secret key of the IAM Role to use for the AWS account.

You can use Harness secrets for both. See [Add Text Secrets](../../6_Security/2-add-use-text-secrets.md).

#### Access and Secret Keys

See [Access Keys (Access Key ID and Secret Access Key)](https://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html#access-keys-and-secret-access-keys) from AWS.

### Use IRSA (IAM roles for service accounts)

Select **Use IRSA** if you want to have the Harness Kubernetes Delegate in AWS EKS use a specific IAM role when making authenticated requests to resources.

By default, the Harness Kubernetes Delegate uses a ClusterRoleBinding to the **default** service account. Instead, you can use AWS IAM roles for service accounts (IRSA) to associate a specific IAM role with the service account used by the Harness Kubernetes Delegate.


:::note
See [IAM roles for service accounts](https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html) from AWS.

:::

Setting up this feature requires a few more steps than other methods, but it is a simple process.


:::note
The following steps are for a new Delegate installation and new AWS Connector. If you updating an existing Delegate and AWS Connector, you can simply edit the Delegate YAML for your existing Delegate as described below, and select the **Use IRSA** option in your AWS Connector.

:::

Create the IAM role with the policies you want the Delegate to use. The policies you select with depend on what AWS resources you are deploying via the Delegate. See the different [AWS Policies Required](#aws-policies-required) sections in this document.

In the cluster where the Delegate will be installed, create a service account and attach the IAM role to it.

Here is an example of how to create a new service account in the cluster where you will install the Delegate and attach the IAM policy to it:


```
eksctl create iamserviceaccount \  
    --name=cdp-admin \  
    --namespace=default \  
    --cluster=test-eks \  
    --attach-policy-arn=<policy-arn> \  
    --approve \  
    --override-existing-serviceaccounts —region=us-east-1
```
In Harness, download the Harness Kubernetes Delegate YAML file. See [Install a Kubernetes Delegate](../../2_Delegates/delegate-guide/install-a-kubernetes-delegate.md).

Open the Delegate YAML file in text editor.

Add service account with access to IAM role to Delegate YAML.

There are two sections in the Delegate YAML that you must update.

First, update the `ClusterRoleBinding` by adding replacing the subject name `default` with the name of the service account with the attached IAM role.



|  |  |
| --- | --- |
| Old `ClusterRoleBinding`: | New `ClusterRoleBinding` (for example, using the name `iamserviceaccount`): |
| --- <br/> apiVersion: rbac.authorization.k8s.io/v1beta1 <br/> kind: ClusterRoleBinding <br/>metadata:  <br/> &nbsp;name: harness-delegate-cluster-admin <br/>subjects:  <br/> &nbsp;- kind: ServiceAccount    <br/>name: default    <br/>namespace: harness-delegate-ng <br/>roleRef: <br/> &nbsp; kind: ClusterRole  <br/>name: cluster-admin  <br/>apiGroup: rbac.authorization.k8s.io <br/>--- | ---<br/>apiVersion: rbac.authorization.k8s.io/v1beta1 <br/>kind: ClusterRoleBinding <br/>metadata:  <br/>&nbsp;name: harness-delegate-cluster-admin <br/>subjects:  - kind: ServiceAccount    <br/>name: iamserviceaccount   <br/> namespace: harness-delegate-ng<br/>roleRef:  <br/>kind: ClusterRole  <br/>name: cluster-admin  <br/>apiGroup: rbac.authorization.k8s.io <br/>---|

Next, update StatefulSet spec with the new `serviceAccountName`.



|  |  |
| --- | --- |
| Old StatefulSet spec `serviceAccountName`: | New StatefulSet spec serviceAccountName (for example, using the name `iamserviceaccount`): |
| 
```
...    spec:      containers:      - image: harness/delegate:latest        imagePullPolicy: Always        name: harness-delegate-instance        ports:          - containerPort: 8080...
```
 | 
```
...    spec:      serviceAccountName: iamserviceaccount      containers:      - image: harness/delegate:latest        imagePullPolicy: Always        name: harness-delegate-instance        ports:          - containerPort: 8080...
```
 |

Save the Delegate YAML file.

Install the Delegate in your EKS cluster and register the Delegate with Harness. See [Install a Kubernetes Delegate](../../2_Delegates/delegate-guide/install-a-kubernetes-delegate.md).


:::note
When you install the Delegate in the cluster, the serviceAccount you added is used and the environment variables `AWS_ROLE_ARN` and `AWS_WEB_IDENTITY_TOKEN_FILE` are added automatically by EKS.Create a new AWS Connector.

:::

In **Credentials**, select **Use IRSA**.

In **Set up** **Delegates**, select the Delegate you used.

Click **Save and Continue** to verify the Delegate credentials.

### Enable cross-account access (STS Role)


:::note
Assume STS Role is supported for EC2 and ECS. It is supported for EKS if you use the IRSA option, described above.

:::


:::warning
The [DescribeRegions](https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_DescribeRegions.html) action is required for all AWS Connectors regardless of what AWS service you are using for your target infrastructure.

:::

If you want to use one AWS account for the connection, but you want to deploy in a different AWS account, use the **Assume STS Role** option.

This option uses the [AWS Security Token Service](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_temp.html) (STS) feature.

In this scenario, the AWS account used for AWS access in **Credentials** will assume the IAM role you specify in **Role ARN** setting.


:::note
The Harness Delegate(s) always runs in the account you specify in **Credentials** via **Access/Secret Key** or **Assume IAM Role on Delegate**.

:::

To assume the role in **Role ARN**, the AWS account in **Credentials** must be trusted by the role. The trust relationship is defined in the **Role ARN** role's trust policy when the role is created. That trust policy states which accounts are allowed to give that access to users in the account.


:::note
You can use **Assume STS Role** to establish trust between roles in the same account, but cross-account trust is more common.

:::

#### Role ARN

The Amazon Resource Name (ARN) of the role that you want to assume. This is an IAM role in the target deployment AWS account.

The assumed role in **Role ARN** must have all the IAM policies required to perform your Harness deployment, such as Amazon S3, ECS (Existing Cluster), and AWS EC2 policies. For more information, see [Assuming an IAM Role in the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-role.html) from AWS.

#### External ID

If the administrator of the account to which the role belongs provided you with an external ID, then enter that value.

For more information, see [How to Use an External ID When Granting Access to Your AWS Resources to a Third Party](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-user_externalid.html) from AWS.


:::note
The AWS [IAM Policy Simulator](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_testing-policies.html) is a useful tool for evaluating policies and access.

:::

### Test Region and AWS GovCloud Support

By default, Harness uses the **us-east-1** region to test the credentials for this Connector.

If you want to use an AWS GovCloud account for this Connector, select it in **Test Region**.

GovCloud is used by organizations such as government agencies at the federal, state, and local level, as well as contractors, educational institutions. It is also used for regulatory compliance with these organizations.

#### Restrictions

You can access AWS GovCloud with AWS GovCloud credentials (AWS GovCloud account access key and AWS GovCloud IAM user credentials).

You cannot access AWS GovCloud with standard AWS credentials. Likewise, you cannot access standard AWS regions using AWS GovCloud credentials.

### Troubleshooting

See [Troubleshooting Harness](https://docs.harness.io/article/jzklic4y2j-troubleshooting).


:::warning
The [DescribeRegions](https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_DescribeRegions.html) action is required for all AWS Connectors regardless of what AWS service you are using for your target infrastructure.

:::

### See also

* [Google Cloud Platform (GCP) Connector Settings Reference](gcs-connector-settings-reference.md)
* [Kubernetes Cluster Connector Settings Reference](kubernetes-cluster-connector-settings-reference.md)

