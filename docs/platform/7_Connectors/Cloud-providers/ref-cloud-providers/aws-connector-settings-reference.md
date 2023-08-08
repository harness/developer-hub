---
title: AWS connector settings reference
description: This topic provides settings and permissions for Harness AWS connectors.
# sidebar_position: 2
helpdocs_topic_id: m5vkql35ca
helpdocs_category_id: 1ehb4tcksy
helpdocs_is_private: false
helpdocs_is_published: true
---

Harness uses AWS connectors for activities such as obtaining artifacts, building and deploying services, and verifying deployments.

This topic describes settings and permissions for AWS connectors.

## AWS permissions and policies

The AWS role policy requirements depend on what AWS services you are using for your artifacts and target infrastructure.

Consider the following user and access type requirements:

* **User:** Harness requires that the IAM user can make API requests to AWS. For more information, go to [Creating an IAM User in Your AWS Account](http://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html).
* **User Access Type: Programmatic access:** This enables an access key ID and secret access key for the AWS API, CLI, SDK, and other development tools.
* **DescribeRegions:** Required for all AWS Cloud Provider connections.

:::caution

The [DescribeRegions](https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_DescribeRegions.html) action is required for all AWS connectors regardless of what AWS service you are using for your target or build infrastructure.

Harness needs a policy with the `DescribeRegions` action so that it can list the available regions when you define your target architecture.

To do this, create a [Customer Managed Policy](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_managed-vs-inline.html#customer-managed-policies), add the `DescribeRegions` action to list those regions, and add that to any role used by the connector.

For example:

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

:::

:::tip

The AWS [IAM Policy Simulator](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_testing-policies.html) is useful for evaluating policies and access.

:::

## AWS S3 policies and permissions

Several policies are required to read from AWS S3, write to AWS S3, or both read and write to AWS S3.

:::tip

If you want to use an S3 bucket that is in a separate account than the account used to set up the AWS Cloud Provider, you can grant cross-account bucket access. For more information, go to the AWS documentation on [Bucket Owner Granting Cross-Account Bucket Permissions](https://docs.aws.amazon.com/AmazonS3/latest/dev/example-walkthroughs-managing-access-example2.html).

:::

### Read from AWS S3

There are two required policies to read from AWS S3:

* `AmazonS3ReadOnlyAccess` managed policy
* A [Customer Managed Policy](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_managed-vs-inline.html#customer-managed-policies) you create using `ec2:DescribeRegions`

<details>
<summary>AmazonS3ReadOnlyAccess managed policy</summary>

* **Policy Name:** `AmazonS3ReadOnlyAccess`
* **Policy ARN:** `arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess`
* **Description:** `Provides read-only access to all buckets via the AWS Management Console`
* **Policy JSON:**

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

</details>

<details>
<summary>ec2:DescribeRegions customer managed policy</summary>

* **Policy Name:** Any name, such as `HarnessS3`
* **Description:** `Harness S3 policy that uses EC2 permissions.`
* **Policy JSON:**

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

</details>

### Write to AWS S3

There are two [Customer Managed Policies](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_managed-vs-inline.html#customer-managed-policies) required to write to AWS S3.

<details>
<summary>S3 write customer managed policy</summary>

* **Policy Name:** `HarnessS3Write`
* **Description:** `Custom policy for pushing to S3.`
* **Policy JSON:**

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

</details>

<details>
<summary>ec2:DescribeRegions customer managed policy</summary>

* **Policy Name:** Any name, such as `HarnessS3`
* **Description:** `Harness S3 policy that uses EC2 permissions.`
* **Policy JSON:**

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

</details>

### Read and Write to AWS S3

You can have a single policy that reads and writes to an S3 bucket.

<details>
<summary>S3 read and write policy JSON example</summary>

Here is a JSON example of a policy that includes AWS console access:

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

</details>

For more information, go to the following AWS documentation:
* [Allow read and write access to objects in an S3 Bucket](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_examples_s3_rw-bucket.html)
* [Allow read and write access to objects in an S3 Bucket, programmatically and in the console](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_examples_s3_rw-bucket-console.html).

## AWS Elastic Container Registry (ECR) policies and permissions

Use these policies to pull or push to ECR. For more information, go to the AWS documentation about [AWS managed policies for Amazon Elastic Container Registry](https://docs.aws.amazon.com/AmazonECR/latest/userguide/security-iam-awsmanpol.html).

<details>
<summary>Pull from ECR policy</summary>

* **Policy Name:** `AmazonEC2ContainerRegistryReadOnly`
* **Policy ARN:** `arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly`
* **Description:** `Provides read-only access to Amazon EC2 Container Registry repositories.`
* **Policy JSON:**

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

</details>

<details>
<summary>Push to ECR</summary>

* **Policy Name:** `AmazonEC2ContainerRegistryFullAccess`
* **Policy ARN:** `arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryFullAccess`
* **Policy JSON:**

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

</details>

## AWS CloudFormation policies

The required policies depend on what you are provisioning. Here are some examples:

<details>
<summary>Example: Create and manage EKS clusters</summary>

This example policy gives full access to create and manage EKS clusters.

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

</details>

<details>
<summary>Example: Limited permissions for EKS clusters</summary>

This example policy gives limited permission to EKS clusters.

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

</details>

## Connect to EKS

To connect Harness to Elastic Kubernetes Service (Amazon EKS), you can use the platform-agnostic [Kubernetes cluster connector](kubernetes-cluster-connector-settings-reference.md) or Elastic Kubernetes Service (EKS) cloud connector.

Make sure you've met the following requirements to connect to the EKS cloud connector.

* You have enabled the `NG_CDS_NATIVE_EKS_SUPPORT` feature flag.
* The IAM role of the worker nodes for the EKS cluster have the [required permissions](https://docs.aws.amazon.com/eks/latest/userguide/create-node-role.html).
    * Your IAM role has the permission to access the AWS EKS cluster. You can edit the `configmap/aws-auth` entry in the EKS cluster to enable the required permissions. For more information, go to [add user role](https://docs.aws.amazon.com/eks/latest/userguide/add-user-role.html). You can also assume the IAM role used to create the AWS EKS cluster which has the required `configmap/aws-auth` entries by default.
    * Your IAM role has the basic policies to access the AWS EKS cluster. For more information, go to [Amazon EKS identity-based policy examples](https://docs.aws.amazon.com/eks/latest/userguide/security_iam_id-based-policy-examples.html).
* You have installed the `aws-iam-authenticator` plugin, which is used for `kubectl` authentication. For more information, go to [Create `kubeconfig` file manually](https://docs.aws.amazon.com/eks/latest/userguide/create-kubeconfig.html#create-kubeconfig-manually).
  
  Here's a sample `kubeconfig`:
  
  ```
  apiVersion: v1
  clusters:
  - cluster:
      server: $cluster_endpoint
      certificate-authority-data: $certificate_data
    name: arn:aws:eks:$region_code:$account_id:cluster/$cluster_name
  contexts:
  - context:
      cluster: arn:aws:eks:$region_code:$account_id:cluster/$cluster_name
      user: arn:aws:eks:$region_code:$account_id:cluster/$cluster_name
    name: arn:aws:eks:$region_code:$account_id:cluster/$cluster_name
  current-context: arn:aws:eks:$region_code:$account_id:cluster/$cluster_name
  kind: Config
  preferences: {}
  users:
  - name: arn:aws:eks:$region_code:$account_id:cluster/$cluster_name
    user:
      exec:
        apiVersion: client.authentication.k8s.io/v1beta1
        command: aws-iam-authenticator
        args:
          - "token"
          - "-i"
          - "$cluster_name"
  ```
  
  
  :::note
  `aws-iam-authenticator` supports the role to be assumed and external ID as arguments. If the connector is configured with a cross-account access and external ID, `kubeconfig` can be modified accordingly.
  ::: 
  
* You have created a delegate with an immutable image and installed the `aws-iam-authenticator` in the delegate.
    1. Open the `delegate.yaml` in a text editor.
    2. Locate the environment variable `INIT_SCRIPT` in the `Deployment` object.
    3. Replace `value: ""` with the following script to install `aws-iam-authenticator`. For more information, go to [install AWS IAM authenticator](https://docs.aws.amazon.com/eks/latest/userguide/install-aws-iam-authenticator.html).
      
      ```
      // Download aws-iam-authenticator
      curl -Lo aws-iam-authenticator https://github.com/kubernetes-sigs/aws-iam-authenticator/releases/download/v0.5.9/aws-iam-authenticator_0.5.9_linux_amd64
      chmod +x ./aws-iam-authenticator
      // Add the binary to PATH
      mv ./aws-iam-authenticator /usr/local/bin
      // Verify the binary
      aws-iam-authenticator help
      ```
      
* You're using Kubernetes version 1.22 or later. Harness uses a [client-go credential plugin](https://kubernetes.io/docs/reference/access-authn-authz/authentication/#client-go-credential-plugins) to authenticate the connection to the EKS cluster. Support for EKS is deprecated for Kubernetes 1.21 and earlier versions.

Here's a quick video demonstrating Native EKS authentication support for Kubernetes:

<!-- Video:
https://www.loom.com/share/2f02907ff84247acaf3e617c05acab34-->
<docvideo src="https://www.loom.com/share/2f02907ff84247acaf3e617c05acab34" />

## AWS Serverless Lambda

There are three authentication options for the AWS connector when used for AWS ECS images for AWS Serverless Lambda deployments:

* [AWS Access Key](#aws-access-key)
* [Assume IAM Role on Delegate](#assume-iam-role-on-delegate)
* [Use IRSA](#use-irsa-iam-roles-for-service-accounts)

You can also use STS roles with Serverless Lambda deployments. For details about this, go to [Serverless cross-account access (STS Role)](#serverless-cross-account-access-sts-role).

For instructions for Serverless Lambda deployments, go to [Serverless Lambda CD quickstart](/docs/continuous-delivery/deploy-srv-diff-platforms/serverless-lambda-cd-quickstart).

### Permissions

All authentication methods for Serverless deployments require an AWS User with specific AWS permissions, as described in the Serverless documentation on [AWS Credentials](https://www.serverless.com/framework/docs/providers/aws/guide/credentials).

To create the AWS user, do the following:

1. Log into your AWS account, and go to the Identity & Access Management (IAM) page.
2. Select **Users**, and then **Add user**. Enter a name, enable **Programmatic access**, and then select **Next**.
3. On the **Permissions** page, do one of the following:
	* **Full Admin Access:** Select **Attach existing policies directly**, search for and select **AdministratorAccess**, and then select **Next: Review**. Review the configuration and select **Create user**.
	* **Limited Access:** Select **Create policy**, select the **JSON** tab, and add the following [Serverless gist](https://gist.github.com/ServerlessBot/7618156b8671840a539f405dea2704c8) JSON code:

<details>
<summary>IAMCredentials.json</summary>

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

</details>

4. View and copy the API Key and Secret to a safe place. You'll need them to set up the Harness AWS connector.

### Installing Serverless on the delegate

The delegate(s) used by the Harness AWS connector must have Serverless installed.

To install Serverless on a Kubernetes delegate, edit the delegate YAML to install Serverless when the delegate pods are created.

1. Open the delegate YAML in a text editor.
2. Locate the environment variable `INIT_SCRIPT` in the `StatefulSet`.

```
...
        - name: INIT_SCRIPT
          value: ""
...
```

3. Replace the `value` with the follow Serverless installation script:

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

In rare cases when the delegate OS does not support `apt`, such as Red Hat Linux, you must edit this script to install `npm`. The rest of the code should remain the same.

:::

4. Save the YAML file as `harness-delegate.yml`.
5. Apply the delegate YAML: `kubectl apply -f harness-delegate.yml`

### Serverless cross-account access (STS Role)

If you use the **Enable cross-account access (STS Role)** option in the AWS connector for a Serverless Lambda deployment, the delegate that is used by the connector must have the AWS CLI installed. The AWS CLI is not required for the other authentication methods.

For more information about installing software with the delegate, go to [Build custom delegate images with third-party tools](../../../2_Delegates/install-delegates/build-custom-delegate-images-with-third-party-tools.md).

## Harness AWS connector settings

The AWS connector settings include:
* **Name:** The name for the connector.
* **Id:** Go to [Entity Identifier reference](../../../20_References/entity-identifier-reference.md).
* **Description:** Text string.
* **Tags**: Go to [Tags reference](../../../20_References/tags-reference.md).
* **Credentials**: Credentials that enable Harness to connect your AWS account. There are three primary options:
  * **Assume IAM Role on Delegate:** This assumes the SA of the Delegate. Ensure the IAM roles attached to the nodes have the right access. This is often the simplest method for connecting Harness to your AWS account and services. Once you select this option, you can select a delegate in the next step of AWS connector creation. Typically, the delegate runs in the target infrastructure.
  * **AWS Access Key:** The [Access Key and Secret Access Key](https://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html#access-keys-and-secret-access-keys) of the IAM Role to use for the AWS account. You can use [Harness Text Secrets](../../../Secrets/2-add-use-text-secrets.md) for both.
  * **Use IRSA:** Allows the Harness Kubernetes delegate in AWS EKS to use a specific IAM role when making authenticated requests to resources. By default, the Harness Kubernetes delegate uses a ClusterRoleBinding to the **default** service account; whereas, with this option, you can use AWS [IAM roles for service accounts (IRSA)](https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html) to associate a specific IAM role with the service account used by the Harness Kubernetes delegate.
* **AWS Backoff Strategy:** Go to [AWS Backoff Strategy](#aws-backoff-strategy) below.

<details>
<summary>Configure IRSA credentials for AWS connectors</summary>

Setting up IRSA credentials requires a few more steps than other methods, but it is a simple process.

:::tip

The following steps assume this is a new delegate installation and a new AWS connector. If you are updating an existing delegate and AWS connector, you only need to edit the delegate YAML for your existing delegate, as described below, and select the **Use IRSA** option in your AWS connector's **Credentials** settings.

:::

1. Create the IAM role with the policies that you want the Delegate to use. The policies you select depend on what AWS resources you are deploying via the delegate. For details, go to the [AWS permissions and policies](#aws-permissions-and-policies) section.
2. In the cluster where the delegate will be installed, create a service account and attach the IAM role to it.
   Here is an example of how to create a new service account in the cluster where you will install the delegate and attach the IAM policy to it:

   ```
   eksctl create iamserviceaccount \
       --name=cdp-admin \
       --namespace=default \
       --cluster=test-eks \
       --attach-policy-arn=<policy-arn> \
       --approve \
       --override-existing-serviceaccounts —region=us-east-1
   ```

3. In Harness, download the Harness Kubernetes delegate YAML file. For instructions, go to [Install a Kubernetes delegate](../../../2_Delegates/install-delegates/overview.md).
4. Open the delegate YAML file in text editor.
5. Add the service account with access to IAM role to the delegate YAML. There are two sections in the Delegate YAML that you must update:
   1. Update the `ClusterRoleBinding` by replacing the subject name `default` with the name of the service account with the attached IAM role, for example:

      ```
      ---
      apiVersion: rbac.authorization.k8s.io/v1beta1
      kind: ClusterRoleBinding
      metadata:
        name: harness-delegate-cluster-admin
      subjects:
        - kind: ServiceAccount
          name: default           // Change to relevant service account name, such as myserviceaccount
          namespace: harness-delegate-ng
      roleRef:
        kind: ClusterRole
        name: cluster-admin
        apiGroup: rbac.authorization.k8s.io
      ---
      ```

    2. Add `serviceAccountName` to the `StatefulSet` spec. For example:

      ```
      ...
          spec:
            serviceAccountName: myserviceaccount  // New line. Use the same service account name you used in the ClusterRole Binding.
            containers:
            - image: harness/delegate:latest
              imagePullPolicy: Always
              name: harness-delegate-instance
              ports:
               - containerPort: 8080
      ...
      ```

6. Save the delegate YAML file.
7. [Install the Kubernetes delegate](../../../2_Delegates/install-delegates/overview.md) in your EKS cluster and register the delegate with Harness. When you install the delegate in the cluster, the SA you added is used, and the environment variables `AWS_ROLE_ARN` and `AWS_WEB_IDENTITY_TOKEN_FILE` are added automatically by EKS.
8. In Harness, create a new AWS connector.
9. For **Credentials**, select **Use IRSA**.
10. For **Select Connectivity Mode**, select **Connect through a Harness Delegate**, and then select the delegate you just installed.
11. Select **Save and Continue** to verify the delegate credentials and test the connection.

</details>

:::caution

Ensure that the AWS IAM roles applied to the credentials you use (the Harness delegate or the access key) includes the policies needed by Harness to deploy to the target AWS service.

If the IAM role used by your AWS connector does not have the policies required by the AWS service you want to access, you can modify or switch the role. This entails changing the role assigned to the AWS account or Harness delegate that your AWS connector is using. When you switch or modify the IAM role used by the connector, it might take up to 5 minutes to take effect.

Additionally, the [DescribeRegions](https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_DescribeRegions.html) action is required for all AWS connectors regardless of what AWS service you are using for your target infrastructure.

The AWS [IAM Policy Simulator](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_testing-policies.html) is a useful tool for evaluating policies and access.

:::

### Enable cross-account access (STS Role)

If you want to use a certain AWS account for the connection and then deploy in a different AWS account, select **Enable cross-account access (STS Role)** in your AWS connector's **Credentials** settings. The STS role is supported for EC2 and ECS. It is supported for EKS if you use the IRSA credentials option.

This option uses the [AWS Security Token Service](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_temp.html) (STS) feature. The AWS account used for AWS access in the connector's **Credentials** settings assumes the IAM role you specify in the **Cross account role ARN** field. However, the Harness delegate always runs in the account you specify in the connector's **Credentials** through **AWS Access Key** or **Assume IAM Role on Delegate**.

In the **Cross account role ARN** field, input the Amazon Resource Name (ARN) of the role that you want the connector to assume. This is an IAM role in the target deployment AWS account.

The assumed ARN role must have all the IAM policies required to perform your Harness deployment, such as Amazon S3, ECS (Existing Cluster), and AWS EC2 policies. For more information, go to the AWS documentation on [Assuming an IAM Role in the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-role.html).

To assume the role specified in the **Cross account role ARN** field, the AWS account in **Credentials** must be trusted by the role. The trust relationship is defined in the ARN role's trust policy when the role is created. That trust policy states which accounts are allowed to give that access to users in the account. You can use an STS role to establish trust between roles in the same account, but cross-account trust is more common.

If the administrator of the account to which the role belongs provided you with an external ID, you can input this value in the **External Id** field. For more information, go to the AWS documentation about [How to Use an External ID When Granting Access to Your AWS Resources to a Third Party](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-user_externalid.html).

### Test Region and AWS GovCloud Support

By default, Harness uses the `us-east-1` region to test the credentials for AWS connectors.

If you want to use an AWS GovCloud account for this connector, select it in the **Test Region** field. GovCloud is used by organizations such as government agencies at the federal, state, and local level, as well as contractors, educational institutions. It is also used for regulatory compliance with these organizations.

You can access AWS GovCloud with AWS GovCloud credentials (AWS GovCloud account access key and AWS GovCloud IAM user credentials). You can't access AWS GovCloud with standard AWS credentials. Likewise, you can't access standard AWS regions using AWS GovCloud credentials.

### AWS backoff strategy

:::note

Currently, this functionality is behind the feature flag `CDS_AWS_BACKOFF_STRATEGY`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

:::

In some Harness CloudFormation and ECS deployments you might get failures with `ThrottlingException` or `Rate exceeded` errors for CloudFormation and ECS API calls.

This can happen when CloudFormation and ECS API calls exceed the maximum allowed API request rate per AWS account and region. Requests are throttled for each AWS account on a per-region basis to help service performance. Go to [Service endpoints and quotas](https://docs.aws.amazon.com/general/latest/gr/aws-service-information.html) from AWS.

The AWS Backoff Strategy settings remedy this situation by setting Amazon SDK default backoff strategy params for CloudFormation and ECS.


#### Fixed delay, equal jitter, and full jitter strategies

The Amazon SDK Default backoff strategy is the combination of fixed backoff, equal jitter, and full jitter backoff strategies. 

Fixed backoff is a simple backoff strategy that always uses a fixed delay for the delay before the next retry attempt.

Typically, the SDK default strategy uses the full jitter strategy for non-throttled exceptions and the equal jitter strategy for throttled exceptions.

Here's the list of non-throttled error and status codes where full jitter strategy is applied: 


```
"TransactionInProgressException",  
"RequestTimeout",  
"RequestTimeoutException",  
"IDPCommunicationError",  
500,  
502,  
503,  
504,  
"RequestTimeTooSkewed",  
"RequestExpired",  
"InvalidSignatureException",  
"SignatureDoesNotMatch",  
"AuthFailure",  
"RequestInTheFuture",  
"IOException"
```

Here's list of throttled error codes where equal jitter strategy is applied:


```
"Throttling",  
"ThrottlingException",  
"ThrottledException",  
"ProvisionedThroughputExceededException",  
"SlowDown",  
"TooManyRequestsException",  
"RequestLimitExceeded",  
"BandwidthLimitExceeded",  
"RequestThrottled",  
"RequestThrottledException",  
"EC2ThrottledException",  
"PriorRequestNotComplete",  
"429 Too Many Requests"
```

For more strategies, go to [Exponential Backoff And Jitter](https://aws.amazon.com/blogs/architecture/exponential-backoff-and-jitter/) from AWS.

#### Setting the AWS backoff strategy

When you create a Harness AWS connector, you can use the backoff strategy settings to configure the AWS backoff strategy.

These options are part of the AWS [software.amazon.awssdk.core.retry.backoff](https://sdk.amazonaws.com/java/api/latest/software/amazon/awssdk/core/retry/backoff/package-summary.html) package.

The settings are:

- **Fixed Delay:** This is a simple backoff strategy that always uses a [fixed delay](https://sdk.amazonaws.com/java/api/latest/software/amazon/awssdk/core/retry/backoff/FixedDelayBackoffStrategy.html) before the next retry attempt.
- **Equal Jitter:** This strategy uses [equal jitter](https://sdk.amazonaws.com/java/api/latest/software/amazon/awssdk/core/retry/backoff/EqualJitterBackoffStrategy.html) for computing the delay before the next retry.
- **Full Jitter:** This strategy uses a [full jitter](https://sdk.amazonaws.com/java/api/latest/software/amazon/awssdk/core/retry/backoff/FullJitterBackoffStrategy.html) strategy for computing the next backoff delay.  



## See also

* [Troubleshooting Harness](../../../../troubleshooting/troubleshooting-nextgen.md)
* [Google Cloud Platform (GCP) connector settings reference](gcs-connector-settings-reference.md)
* [Kubernetes cluster connector settings reference](kubernetes-cluster-connector-settings-reference.md)
