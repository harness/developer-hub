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

- **User:** Harness requires that the IAM user can make API requests to AWS. For more information, go to [Creating an IAM User in Your AWS Account](http://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html).
- **User Access Type: Programmatic access:** This enables an access key ID and secret access key for the AWS API, CLI, SDK, and other development tools.
- **DescribeRegions:** Required for all AWS Cloud Provider connections.

The AWS [IAM Policy Simulator](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_testing-policies.html) is useful for evaluating policies and access.

### DescribeRegions always required

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

### AWS S3 permissions and policies

Harness requires several policies to [read from AWS S3](#read-from-aws-s3), [write to AWS S3](#write-to-aws-s3), or both [read and write to AWS S3](#read-and-write-to-aws-s3). The policies you need depend on how you plan to use the connector in Harness.

Make sure your policy declarations allow the necessary `Resource` access for the capacity in which you plan to use the connector. Be mindful of object-level and bucket-level access for [Amazon S3 resources](https://docs.aws.amazon.com/AmazonS3/latest/userguide/s3-arn-format.html) in your policy declarations.

Declarations like `"Resource": "*"` or `"Resource": "arn:aws:s3:::your-s3-bucket"` allow access to bucket-level data that is required for functions like `"Action": "s3:ListBucket"`.

Declarations like `"Resource": "arn:aws:s3:::bucket-name/*"` limit access to object-level data, such as the contents of the bucket, and prevent access to higher-level data.

You can either use a single expression, like `"Resource": "*"`, or create separate declarations for different actions, for example:

```json
{
      "Effect": "Allow",
      "Action": "s3:ListBucket",
      "Resource": "arn:aws:s3:::your-s3-bucket"
},
{
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:PutObject",
        "s3:DeleteObject"
      ],
      "Resource": "arn:aws:s3:::your-s3-bucket/*"
}
```

#### Read from AWS S3

There are two required policies to read from AWS S3:

- `AmazonS3ReadOnlyAccess` managed policy
- A [Customer Managed Policy](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_managed-vs-inline.html#customer-managed-policies) you create using `ec2:DescribeRegions`

<details>
<summary>AmazonS3ReadOnlyAccess managed policy</summary>

- **Policy Name:** `AmazonS3ReadOnlyAccess`
- **Policy ARN:** `arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess`
- **Description:** `Provides read-only access to all buckets via the AWS Management Console`
- **Policy JSON:**

```json
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

- **Policy Name:** Any name, such as `HarnessS3`
- **Description:** `Harness S3 policy that uses EC2 permissions.`
- **Policy JSON:**

```json
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

#### Write to AWS S3

There are two [Customer Managed Policies](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_managed-vs-inline.html#customer-managed-policies) required to write to AWS S3.

<details>
<summary>S3 write customer managed policy</summary>

- **Policy Name:** `HarnessS3Write`
- **Description:** `Custom policy for pushing to S3.`
- **Policy JSON:**

```json
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

- **Policy Name:** Any name, such as `HarnessS3`
- **Description:** `Harness S3 policy that uses EC2 permissions.`
- **Policy JSON:**

```json
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

#### Read and Write to AWS S3

You can have a single policy that reads and writes to an S3 bucket.

For more information, go to the following AWS documentation:

- [Allow read and write access to objects in an S3 Bucket](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_examples_s3_rw-bucket.html)
- [Allow read and write access to objects in an S3 Bucket, programmatically and in the console](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_examples_s3_rw-bucket-console.html).

<details>
<summary>JSON example: S3 read and write policy</summary>

Here is an example of an S3 read and write policy declaration that includes AWS console access:

```json
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

#### Cross-account bucket access

If you want to use an S3 bucket that is in a separate account than the account provided in your [Harness AWS connector settings](#harness-aws-connector-settings), you can grant cross-account bucket access. For more information, go to the AWS documentation on [Bucket Owner Granting Cross-Account Bucket Permissions](https://docs.aws.amazon.com/AmazonS3/latest/dev/example-walkthroughs-managing-access-example2.html).

### AWS Elastic Container Registry (ECR) permissions and policies

Use these policies to pull or push to ECR. For more information, go to the AWS documentation about [AWS managed policies for Amazon Elastic Container Registry](https://docs.aws.amazon.com/AmazonECR/latest/userguide/security-iam-awsmanpol.html).

<details>
<summary>Pull from ECR policy</summary>

- **Policy Name:** `AmazonEC2ContainerRegistryReadOnly`
- **Policy ARN:** `arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly`
- **Description:** `Provides read-only access to Amazon EC2 Container Registry repositories.`
- **Policy JSON:**

```json
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

- **Policy Name:** `AmazonEC2ContainerRegistryFullAccess`
- **Policy ARN:** `arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryFullAccess`
- **Policy JSON:**

```json
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

### AWS CloudFormation policies

The required policies depend on what you are provisioning. Here are some examples:

<details>
<summary>Example: Create and manage EKS clusters</summary>

This example policy gives full access to create and manage EKS clusters.

```json
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

```json
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

### Fargate

Amazon requires the Amazon EKS Pod execution role to run pods on the AWS Fargate infrastructure. For more information, go to [Amazon EKS Pod execution IAM role](https://docs.aws.amazon.com/eks/latest/userguide/pod-execution-role.html) in the AWS documentation.

If you deploy pods to Fargate nodes in an EKS cluster, and your nodes needs IAM credentials, you must configure IRSA in your AWS EKS configuration (and then select the **Use IRSA** option for your connector credentials in Harness). This is due to [Fargate limitations](https://docs.aws.amazon.com/eks/latest/userguide/fargate.html#:~:text=The%20Amazon%20EC2%20instance%20metadata%20service%20(IMDS)%20isn%27t%20available%20to%20Pods%20that%20are%20deployed%20to%20Fargate%20nodes.).

## Harness AWS connector settings

The AWS connector has the following settings.

### Basic settings

- **Name:** The name for the connector.
- **Id:** [Entity Identifier.](../../../references/entity-identifier-reference.md)
- **Description:** Optional text string.
- **Tags**: Optional [tags](../../../references/tags-reference.md).

### Credentials

Specify the credentials that enable Harness to connect your AWS account. There are four primary options.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="iam" label="Assume IAM Role on Delegate" default>

The **Assume IAM Role on Delegate** option assumes the SA of the delegate.

This is often the simplest method for connecting Harness to your AWS account and services. Make sure the IAM roles attached to the nodes have the right access.

Once you select this option, you can select a delegate in the next step of AWS connector creation. Typically, the delegate runs in the target infrastructure (such as in an EKS cluster).

#### Assume IAM Role vs Use IRSA

There are some instances where you need to use the **Use IRSA** option instead of the **Assume IAM Role on Delegate** option:

* The **Assume IAM Role on Delegate** option isn't valid for IAM roles for service accounts (IRSA).
* If your Harness Delegate is in an EKS cluster that uses IRSA, you must select **Use IRSA**.
* If you deploy pods to Fargate nodes in an EKS cluster, and your nodes needs IAM credentials, you must configure IRSA in your AWS EKS configuration and select the **Use IRSA** option for your connector credentials. This is due to [Fargate limitations](https://docs.aws.amazon.com/eks/latest/userguide/fargate.html#:~:text=The%20Amazon%20EC2%20instance%20metadata%20service%20(IMDS)%20isn%27t%20available%20to%20Pods%20that%20are%20deployed%20to%20Fargate%20nodes.).

</TabItem>
<TabItem value="access" label="AWS Access Key">

With the **AWS Access Key** option, you provide the [Access Key and Secret Access Key](https://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html#access-keys-and-secret-access-keys) of the IAM Role to use for the AWS account. You can use [Harness Text Secrets](/docs/platform/secrets/add-use-text-secrets.md) for both.

We also support JET (JWT-based Enterprise Token) identity tokens for authentication and authorization across the following AWS services:

- Amazon EKS (Elastic Kubernetes Service)
- Amazon ASG (Auto Scaling Groups)
- WinRM (Windows Remote Management)
- SSH (Secure Shell)
- Amazon ECS (Elastic Container Service)
- AWS CloudFormation
- AWS SAM (Serverless Application Model)

Currently, support JET identity tokens for authentication for AWS connectors is behind the feature flag `CDS_AWS_SESSION_TOKEN_SUPPORT`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

Additionally, this option requires Harness Delegate version 24.09.84100 or later.

</TabItem>
<TabItem value="irsa" label="Use IRSA">

The **Use IRSA** option allows the Harness Kubernetes delegate in AWS EKS to use a specific IAM role when making authenticated requests to resources.

By default, the Harness Kubernetes delegate uses a ClusterRoleBinding to the **default** service account; whereas, with this option, you can use AWS [IAM roles for service accounts (IRSA)](https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html) to associate a specific IAM role with the service account used by the Harness Kubernetes delegate.

For instructions, go to [Use IRSA](/docs/platform/connectors/cloud-providers/add-aws-connector/#use-irsa).

</TabItem>
<TabItem value="oidc" label="Use OIDC">

:::info

Currently, OIDC authentication for AWS connectors is behind the feature flag `CDS_AWS_OIDC_AUTHENTICATION`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

Additionally, this option requires Harness Delegate version 24.03.82603 or later.

:::

Select **Use OIDC** to connect to AWS with OIDC.

To do this, you need to create an [OIDC identity provider](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_oidc.html) in AWS. Then you need to add it in a trust relationship with an IAM role you create that Harness will use to operate in AWS.

Use the following Harness OIDC provider endpoint and OIDC audience settings to create your OIDC identity provider:

* Harness OIDC provider endpoint: `https://app.harness.io/ng/api/oidc/account/<ACCOUNT_ID>`
* OIDC audience: `sts.amazonaws.com`

### Supported Swimlanes

These are the current supported deployment swimlanes for AWS OIDC:

- ECS
- Kubernetes
- Terraform
- CloudFormation

### Enhanced Subject

:::info

Currently, extra scope information included with the JWT in the **sub** field is behind the feature flag, `PL_OIDC_ENHANCED_SUBJECT_FIELD`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

:::

- **sub**: What is issuing the JWT.
  This value will change depending on the scope of the OIDC connector.
  - **At project scope**: `account/<account_id>:org/{organization_id}:project/<project_id>`
  - **At organization scope**: `account/<account_id>:org/<organization_id>:project/`
  - **At account scope**: `account/<account_id>:org/:project/`

#### Examples

- For Project level resources - `"sub":"account/Hue1lBsaSx2APlXjzVEPIg:org/default:project/OIDC_Test"`
- For Organization level resources - `"sub":"account/Hue1lBsaSx2APlXjzVEPIg:org/default:project/"`
- For Account level resources - `"sub":"account/Hue1lBsaSx2APlXjzVEPIg:org/:project/"`

### Custom Parameters 

Here are the custom parameters for the Harness AWS OIDC JWT:

- **account_id**: The account id of your Harness account.
- **organization_id**: The organization id of your Harness organization.
- **project_id**: The project id of your Harness project. 
- **connector_id**: The id of the OIDC-enabled AWS connector that sent this token.
- **connector_name**: The name of the OIDC-enabled AWS connector that sent this token.
- **context**: This specifies the Harness context from when this OIDC token is generated. Possible values for this field are:
  - `CONNECTOR_VALIDATION` - This context is sent when the connector is being setup.
  - `PIPELINE_CONFIGURATION` - This context is sent when a pipeline configuration is being completed.
  - `PIPELINE_EXECUTION` - This context is sent when a pipeline configuration is being executed.
  - `PERPETUAL_TASK` - This context is sent when a perpetual task is executing.


#### Examples

<details>
<summary> JWT sent by a connector at the project scope </summary>

```
{
  "header":{
     "typ":"JWT"
     "alg":"RS256"
     "kid":"2xk__q7dWlb0c8qM5iYR_J-Ro9eYd0yOb_J5ooSk94g"
  }
"payload":{
     "sub":"account/Hue1lBsaSx2APlXjzVEPIg:org/default:project/OIDC_Test"
     "iss":"https://app.harness.io/ng/api/oidc/account/Hue1lBsaSx2APlXjzVEPIg"
     "aud":"sts.amazonaws.com"
     "exp":1718132139
     "iat":1718128539
     "account_id":"Hue1lBsaSx2APlXjzVEPIg"
     "organization_id":"default"
     "project_id":"OIDC_Test"
     "connector_id":"AWS_OIDC"
     "connector_name":"AWS_OIDC"
     "context":"CONNECTOR_VALIDATION"
   }
}
```
</details>

<details>
<summary> JWT sent by a connector at the organization scope </summary> 

```
{
   "header":{
      "typ":"JWT"
      "alg":"RS256"
      "kid":"2xk__q7dWlb0c8qM5iYR_J-Ro9eYd0yOb_J5ooSk94g"
    }
    "payload":{
       "sub":"account/Hue1lBsaSx2APlXjzVEPIg:org/default:project/"
        "iss":"https://app.harness.io/ng/api/oidc/account/Hue1lBsaSx2APlXjzVEPIg"
        "aud":"sts.amazonaws.com"
        "exp":1718133015
        "iat":1718129415
        "account_id":"Hue1lBsaSx2APlXjzVEPIg"
        "organization_id":"default"
        "connector_id":"AWS_OIDC_Org"
        "connector_name":"AWS_OIDC_Org"
        "context":"CONNECTOR_VALIDATION"
    }
}
```

</details>

<details>
<summary> Sample IAM policy scoped to a specific project or organization </summary>

This example policy enables scoping to a specific project or organization for authentication through an OIDC provider.

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "Federated": "arn:aws:iam::156272853481:oidc-provider/app.harness.io/ng/api/oidc/account/Hue1lBsaSx2APlXjzVEPIg"
            },
            "Action": "sts:AssumeRoleWithWebIdentity",
            "Condition": {
                "StringEquals": {
                    "app.harness.io/ng/api/oidc/account/Hue1lBsaSx2APlXjzVEPIg:aud": "sts.amazonaws.com",
                    "app.harness.io/ng/api/oidc/account/Hue1lBsaSx2APlXjzVEPIg:sub": "account/Hue1lBsaSx2APlXjzVEPIg:org/default:project/OIDC_Test"
                }
            }
        }
    ]
}
```
You can match only the aud or sub. To map to a particular organization and project, you must enable the feature flag `PL_OIDC_ENHANCED_SUBJECT_FIELD` . The subject value will follow the format shown above: `account/Hue1lBsaSx2APlXjzVEPIg:org/default:project/OIDC_Test`.

</details>

</TabItem>
</Tabs>

:::warning

Ensure that the AWS IAM roles applied to the credentials you use (the Harness Delegate or the access key) include the policies needed by Harness to deploy to the target AWS service.

If the IAM role used by your AWS connector does not have the policies required by the AWS service you want to access, you can modify or switch the role. This entails changing the role assigned to the AWS account or Harness Delegate that your AWS connector is using. When you switch or modify the IAM role used by the connector, it might take up to 5 minutes to take effect.

Additionally, the [DescribeRegions](https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_DescribeRegions.html) action is required for all AWS connectors regardless of what AWS service you are using for your target infrastructure.

The AWS [IAM Policy Simulator](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_testing-policies.html) is a useful tool for evaluating policies and access.

Finally, it is possible to create a connector with a non-existent delegate. This behavior is intended. This design allows you to replace a delegate with a new one that has the same name or tag.

:::

*End of Credentials* 

### Enable cross-account access (STS Role)

If you want to use a certain AWS account for the connection and then deploy in a different AWS account, select **Enable cross-account access (STS Role)** in your AWS connector's **Credentials** settings. The STS role is supported for EC2 and ECS. It is supported for EKS if you use the IRSA credentials option.

This option uses the [AWS Security Token Service](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_temp.html) (STS) feature. The AWS account used for AWS access in the connector's **Credentials** settings assumes the IAM role you specify in the **Cross account role ARN** field. However, the Harness Delegate always runs in the account you specify in the connector's **Credentials** through **AWS Access Key** or **Assume IAM Role on Delegate**.

In the **Cross account role ARN** field, input the Amazon Resource Name (ARN) of the role that you want the connector to assume. This is an IAM role in the target deployment AWS account.

The assumed ARN role must have all the IAM policies required to perform your Harness deployment, such as Amazon S3, ECS (Existing Cluster), and AWS EC2 policies. For more information, go to the AWS documentation on [Assuming an IAM Role in the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-role.html).

To assume the role specified in the **Cross account role ARN** field, the AWS account in **Credentials** must be trusted by the role. The trust relationship is defined in the ARN role's trust policy when the role is created. That trust policy states which accounts are allowed to give that access to users in the account. You can use an STS role to establish trust between roles in the same account, but cross-account trust is more common.

If the administrator of the account to which the role belongs provided you with an external ID, you can input this value in the **External Id** field. For more information, go to the AWS documentation about [How to Use an External ID When Granting Access to Your AWS Resources to a Third Party](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-user_externalid.html).

### Test Region and AWS GovCloud Support

By default, Harness uses the `us-east-1` region to test the credentials for AWS connectors.

If you want to use an AWS GovCloud account for this connector, select it in the **Test Region** field. GovCloud is used by organizations such as government agencies at the federal, state, and local levels, as well as contractors, and educational institutions. It is also used for regulatory compliance with these organizations.

You can access AWS GovCloud with AWS GovCloud credentials (AWS GovCloud account access key and AWS GovCloud IAM user credentials). You can't access AWS GovCloud with standard AWS credentials. Likewise, you can't access standard AWS regions using AWS GovCloud credentials.

### AWS backoff strategy

In some Harness CloudFormation and ECS deployments you might get failures with `ThrottlingException` or `Rate exceeded` errors for CloudFormation and ECS API calls.

This can happen when CloudFormation and ECS API calls exceed the maximum allowed API request rate per AWS account and region. Requests are throttled for each AWS account on a per-region basis to help service performance. Go to [Service endpoints and quotas](https://docs.aws.amazon.com/general/latest/gr/aws-service-information.html) from AWS.

The **AWS Backoff Strategy** settings remedy this situation by setting Amazon SDK default backoff strategy params for CloudFormation and ECS. In your Harness AWS connector settings, you can use the backoff strategy settings to configure the AWS backoff strategy:

- **Fixed Delay:** This is a simple backoff strategy that always uses a [fixed delay](https://sdk.amazonaws.com/java/api/latest/software/amazon/awssdk/core/retry/backoff/FixedDelayBackoffStrategy.html) before the next retry attempt.
- **Equal Jitter:** This strategy uses [equal jitter](https://sdk.amazonaws.com/java/api/latest/software/amazon/awssdk/core/retry/backoff/EqualJitterBackoffStrategy.html) for computing the delay before the next retry.
- **Full Jitter:** This strategy uses a [full jitter](https://sdk.amazonaws.com/java/api/latest/software/amazon/awssdk/core/retry/backoff/FullJitterBackoffStrategy.html) strategy for computing the next backoff delay.

These options are part of the AWS [software.amazon.awssdk.core.retry.backoff](https://sdk.amazonaws.com/java/api/latest/software/amazon/awssdk/core/retry/backoff/package-summary.html) package.

The Amazon SDK Default backoff strategy is the combination of fixed backoff, equal jitter, and full jitter backoff strategies.

Fixed backoff is a simple backoff strategy that always uses a fixed delay for the delay before the next retry attempt.

:::info

Backoff strategy parameter settings are in milliseconds.

:::

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

## Connect to Elastic Kubernetes Service (EKS)

To connect Harness to Elastic Kubernetes Service (Amazon EKS), you can use the [platform-agnostic Kubernetes cluster connector](./kubernetes-cluster-connector-settings-reference.md) or an AWS connector configured for EKS.

### Configure EKS for use with Harness

Make sure your EKS cluster meets the following requirements for the Harness AWS connector.

1. You have created an EKS cluster.

  ```
  eksctl create cluster CLUSTER_NAME
  ```

2. You have created a Fargate profile. For more information, go to [Getting started with AWS Fargate using Amazon EKS](https://docs.aws.amazon.com/eks/latest/userguide/fargate-getting-started.html) in the AWS documentation.

   You can run the following to list Fargate profiles in an EKS cluster.

   ```
   aws eks list-fargate-profiles --cluster-name cdp-eks-cluster
   ```

   If you don't have a Fargate profile, use the commands below to create one.

<details>
<summary>Commands to create a Fargate profile</summary>

```bash
aws eks create-fargate-profile --fargate-profile-name test-fargate-profile --cluster-name cdp-eks-cluster --pod-execution-role-arn arn:aws:iam::XXXXX:role/AmazonEKSFargatePodExecutionRole --selectors "namespace=sainath-test, labels={infra=fargate}"
```

```bash
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" unzip awscliv2.zip
./aws/install
```

```bash
eksctl create iamserviceaccount --cluster=cdp-eks-cluster --name=<cluster-name> --namespace=harness-delegate --attach-policy-arn=
```

```bash
kubectl apply -f ~/Desktop/new/harness-delegate-kubernetes/harness-delegate.yaml
```

```bash
aws sts get-caller-identity
```

```bash
apt-get update && apt-get install -yy less
```

```bash
eksctl get nodegroups --cluster=cdp-eks-cluster
```

```bash
eksctl create iamserviceaccount --cluster=<clusterName> --name=<serviceAccountName> --tags "Owner=Owner_Name,Team=Team_Name" --override-existing-serviceaccounts
```

```bash
kubectl describe pod test-new-xicobc-0 -n harness-delegate | grep AWS_WEB_IDENTITY_TOKEN_FILE:
```

</details>

3. The IAM role of the EKS cluster's worker nodes have the [required permissions](https://docs.aws.amazon.com/eks/latest/userguide/create-node-role.html).

   - Your IAM role needs permission to access the AWS EKS cluster. You can edit the `configmap/aws-auth` entry in the EKS cluster to enable the required permissions. For more information, go to the EKS documentation on [adding user roles](https://docs.aws.amazon.com/eks/latest/userguide/add-user-role.html). You can also assume the IAM role used to create the AWS EKS cluster, which has the required `configmap/aws-auth` entries by default.
   - Your IAM role needs the basic policies to access the AWS EKS cluster. For more information, go to [Amazon EKS identity-based policy examples](https://docs.aws.amazon.com/eks/latest/userguide/security_iam_id-based-policy-examples.html).
   - If you deploy pods to Fargate nodes in an EKS cluster, and your nodes needs IAM credentials, you must configure IRSA in your AWS EKS configuration (and then select the **Use IRSA** option for your connector credentials in Harness). This is due to [Fargate limitations](https://docs.aws.amazon.com/eks/latest/userguide/fargate.html#:~:text=The%20Amazon%20EC2%20instance%20metadata%20service%20(IMDS)%20isn%27t%20available%20to%20Pods%20that%20are%20deployed%20to%20Fargate%20nodes.).

4. You have installed the `aws-iam-authenticator` plugin, which is used for `kubectl` authentication. For more information, go to [Create kubeconfig file manually](https://docs.aws.amazon.com/eks/latest/userguide/create-kubeconfig.html#create-kubeconfig-manually).

   The `aws-iam-authenticator` supports the role to be assumed and external ID as arguments. If you configure your AWS connector with a cross-account access and external ID, modify `kubeconfig` accordingly.

<details>
<summary>Example kubeconfig with aws-iam-authenticator</summary>

```yaml
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

</details>

5. You have [installed a Harness Delegate](/docs/platform/delegates/delegate-concepts/delegate-overview.md) with an [immutable image type](/docs/platform/delegates/delegate-concepts/delegate-image-types) and installed the `aws-iam-authenticator` on the delegate. To add `aws-iam-authenticator` to the delegate:
   1. Open the `delegate.yaml` file in a text editor.
   2. Locate the environment variable `INIT_SCRIPT` in the `Deployment` object.
   3. Replace `value: ""` with the following script to install `aws-iam-authenticator`.

      ```
      // Download aws-iam-authenticator
      curl -Lo aws-iam-authenticator https://github.com/kubernetes-sigs/aws-iam-authenticator/releases/download/v0.5.9/aws-iam-authenticator_0.5.9_linux_amd64
      chmod +x ./aws-iam-authenticator
      // Add the binary to PATH
      mv ./aws-iam-authenticator /usr/local/bin
      // Verify the binary
      aws-iam-authenticator help
      ```

      For more information, go to [install AWS IAM authenticator](https://docs.aws.amazon.com/eks/latest/userguide/install-aws-iam-authenticator.html).

<details>
<summary>Sample delegate YAML file</summary>

Here's an example of a Harness Delegate YAML file configured for EKS.

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: harness-delegate

---

apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: harness-delegate-cluster-admin
subjects:
  - kind: ServiceAccount
#    name: default
    name: cdp-delegate
    namespace: harness-delegate
roleRef:
  kind: ClusterRole
  name: cluster-admin
  apiGroup: rbac.authorization.k8s.io

---

apiVersion: v1
kind: Secret
metadata:
  name: eks-test-new-proxy
  namespace: harness-delegate
type: Opaque
data:
  # Enter base64 encoded username and password, if needed
  PROXY_USER: ""
  PROXY_PASSWORD: ""

---

apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    harness.io/name: eks-test-new
  name: eks-test-new
  namespace: harness-delegate-ng
spec:
  replicas: 1
  minReadySeconds: 120
  selector:
    matchLabels:
      harness.io/name: eks-test-new
  template:
    metadata:
      labels:
        harness.io/name: eks-test-new
      annotations:
        prometheus.io/scrape: "true"
        prometheus.io/port: "3460"
        prometheus.io/path: "/api/metrics"
    spec:
      terminationGracePeriodSeconds: 600
      restartPolicy: Always
      containers:
      - image: docker.io/harness/delegate:23.10.81202
        imagePullPolicy: Always
        name: delegate
        securityContext:
          allowPrivilegeEscalation: false
          runAsUser: 0
        ports:
          - containerPort: 8080
        resources:
          limits:
            memory: "2048Mi"
          requests:
            cpu: "0.5"
            memory: "2048Mi"
        livenessProbe:
          httpGet:
            path: /api/health
            port: 3460
            scheme: HTTP
          initialDelaySeconds: 10
          periodSeconds: 10
          failureThreshold: 3
        startupProbe:
          httpGet:
            path: /api/health
            port: 3460
            scheme: HTTP
          initialDelaySeconds: 30
          periodSeconds: 10
          failureThreshold: 15
        envFrom:
        - secretRef:
            name: newdel-account-token
        env:
        - name: JAVA_OPTS
          value: "-Xms64M"
        - name: ACCOUNT_ID
          value: YOUR_ACCOUNT_ID
        - name: MANAGER_HOST_AND_PORT
          value: https://app.harness.io
        - name: DEPLOY_MODE
          value: KUBERNETES_ONPREM
        - name: DELEGATE_NAME
          value: eks-test-new
        - name: DELEGATE_TYPE
          value: "KUBERNETES"
        - name: DELEGATE_NAMESPACE
          valueFrom:
            fieldRef:
              fieldPath: metadata.namespace
        - name: INIT_SCRIPT
          value: ""
        - name: DELEGATE_DESCRIPTION
          value: ""
        - name: DELEGATE_TAGS
          value: ""
        - name: NEXT_GEN
          value: "true"
        - name: CLIENT_TOOLS_DOWNLOAD_DISABLED
          value: "true"
        - name: LOG_STREAMING_SERVICE_URL
          value: "https://app.harness.io/log-service/"
        - name: DELEGATE_CPU_THRESHOLD
          value: "80"

---

apiVersion: autoscaling/v1
kind: HorizontalPodAutoscaler
metadata:
   name: eks-test-new-hpa
   namespace: harness-delegate-ng
   labels:
       harness.io/name: eks-test-new
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: newdel
  minReplicas: 1
  maxReplicas: 1
  targetCPUUtilizationPercentage: 99

---

kind: Role
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: upgrader-cronjob
  namespace: harness-delegate-ng
rules:
  - apiGroups: ["batch", "apps", "extensions"]
    resources: ["cronjobs"]
    verbs: ["get", "list", "watch", "update", "patch"]
  - apiGroups: ["extensions", "apps"]
    resources: ["deployments"]
    verbs: ["get", "list", "watch", "create", "update", "patch"]

---

kind: RoleBinding
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: newdel-upgrader-cronjob
  namespace: harness-delegate-ng
subjects:
  - kind: ServiceAccount
    name: upgrader-cronjob-sa
    namespace: harness-delegate-ng
roleRef:
  kind: Role
  name: upgrader-cronjob
  apiGroup: ""

---

apiVersion: v1
kind: ServiceAccount
metadata:
  name: upgrader-cronjob-sa
  namespace: harness-delegate-ng

---

apiVersion: v1
kind: Secret
metadata:
  name: newdel-upgrader-token
  namespace: harness-delegate-ng
type: Opaque
data:
  UPGRADER_TOKEN: "YOUR_UPGRADER_TOKEN"

---

apiVersion: v1
kind: ConfigMap
metadata:
  name: newdel-upgrader-config
  namespace: harness-delegate-ng
data:
  config.yaml: |
    mode: Delegate
    dryRun: false
    workloadName: newdel
    namespace: harness-delegate-ng
    containerName: delegate
    delegateConfig:
      accountId: YOUR_ACCOUNT_ID
      managerHost: https://app.harness.io

---

apiVersion: batch/v1
kind: CronJob
metadata:
  labels:
    harness.io/name: newdel-upgrader-job
  name: newdel-upgrader-job
  namespace: harness-delegate-ng
spec:
  schedule: "0 */1 * * *"
  concurrencyPolicy: Forbid
  startingDeadlineSeconds: 20
  jobTemplate:
    spec:
      template:
        spec:
          serviceAccountName: upgrader-cronjob-sa
          restartPolicy: Never
          containers:
          - image: docker.io/harness/upgrader:latest
            name: upgrader
            imagePullPolicy: Always
            envFrom:
            - secretRef:
                name: newdel-upgrader-token
            volumeMounts:
              - name: config-volume
                mountPath: /etc/config
          volumes:
            - name: config-volume
              configMap:
                name: newdel-upgrader-config
```

</details>

6. You're using Kubernetes version 1.22 or later. Harness uses a [client-go credential plugin](https://kubernetes.io/docs/reference/access-authn-authz/authentication/#client-go-credential-plugins) to authenticate the connection to the EKS cluster. Support for EKS is deprecated for Kubernetes 1.21 and earlier versions.

### Use EKS for builds (Harness CI)

To use an EKS cluster for Kubernetes cluster build infrastructure in Harness CI, you must create a [platform-agnostic Kubernetes cluster connector](./kubernetes-cluster-connector-settings-reference.md) for the stage's build infrastructure, and then you can use either type of connector in individual steps in the stage.

However, for individual steps in a build stage, if your EKS clusters use IRSA (IAM roles for the delegate's service account or with OIDC Provider) or Fargate nodes in EKS clusters, use an AWS connector configured for EKS. Follow the steps in [Add an AWS connector](../add-aws-connector.md) to create the AWS connector.

### Use EKS for deployments (Harness CD)

To connect to EKS for deployments, do the following:

1. On the **Environments** page for your project, select **Infrastructure Definition**, and then proceed to create or update an infrastructure definition.

2. Enter a name and, optionally, a description and any tags that you want to associate with the infrastructure definition.

3. In **How do you want to setup your infrastructure?** select one of the following options:

- **Inline**. Stores the infrastructure definition in Harness.
- **Remote**. Stores the infrastructure definition in a Git repository. If you select this option, do the following:

  1. In **Git Connector**, create or select a Git connector.

  2. In **Repository** and **Branch**, specify the repository and branch, respectively, on which to store the infrastructure definition.

  Harness populates **YAML Path** with a path it generates based on the name of the infrastructure definition. If you edit the infrastructure definition's name after Harness populates this field, Harness does not update the name of the file to match the infrastructure definition's new name. If you want them to match, also edit the file name in the YAML path field manually.

4. In **Deployment Type**, select **Kubernetes** or **Native Helm**.

5. In **Select Infrastructure Type** > **Via Cloud Provider**, select **Elastic Kubernetes Service**.

6. Select **Map Dynamically Provisioned Infrastructure** if you want to map the provisioned infrastructure dynamically.

A **Provisioner** setting is added and configured as a runtime input.

7. Configure the following fields to connect to a cluster:
   * In **Connector**, create or select an AWS connector.
   * (Optional) In **Region**, specify an AWS Region if you want the next field (**Cluster**) to show clusters from only that AWS Region.
      The Cluster field, by default, fetches all the clusters in all the AWS Regions associated with the AWS account. The credentials that the AWS connector uses, on the other hand, might limit the connector to only certain AWS Regions. In such a scenario, specifying the AWS Region ensures that the Cluster field is populated with a usable list of clusters.
   * In **Cluster**, select the Kubernetes cluster that you want to use.
   * In **Namespace**, select a namespace to use on the Kubernetes cluster.
   * In **Release name**, specify a release name.

   :::tip

   These fields can use [fixed values, runtime inputs, or expressions](/docs/platform/variables-and-expressions/runtime-inputs).

   :::

8. (Optional) Select **Allow simultaneous deployments on the same infrastructure**.

9. (Optional) Select **Scope to Specific Services** if you want to limit the infrastructure definition to specific services only, and then select or create the services you want in the infrastructure definition.

10. Select **Save**.

### Set up EKS Authentication in AWS and Harness

To set up EKS Authentication in AWS and Harness, you need:

* A [Harness AWS connector](../add-aws-connector.md) configured for EKS.
* AWS IAM Authenticator installed via `INIT_SCRIPT` on your EKS cluster's Harness Delegate and an IAM role in your AWS account with the necessary permissions. For details, refer to [Configure EKS for use with Harness](#configure-eks-for-use-with-harness).
* A Kubernetes Service Account configured in the EKS cluster.

<details>
<summary>Video: Native EKS authentication support</summary>

Here's a quick video demonstrating Native EKS authentication support for Kubernetes:

<!-- Video:
https://www.loom.com/share/2f02907ff84247acaf3e617c05acab34-->
<DocVideo src="https://www.loom.com/share/2f02907ff84247acaf3e617c05acab34" />

</details>

## AWS Serverless Lambda

When used for AWS ECS images for AWS Serverless Lambda deployments, your [AWS connector](#harness-aws-connector-settings) can use **AWS Access Key**, **Assume IAM Role on Delegate**, or **Use IRSA** authentication.

Additional configuration is required in your ECS cluster and delegate, as explained below.

For instructions on executing Serverless Lambda deployments, go to [Serverless Lambda CD quickstart](/docs/continuous-delivery/deploy-srv-diff-platforms/serverless/serverless-lambda-cd-quickstart).

### Permissions

All authentication methods for Serverless deployments require an AWS User with specific AWS permissions, as described in the Serverless documentation on [AWS Credentials](https://www.serverless.com/framework/docs/providers/aws/guide/credentials).

To create the AWS user, do the following:

1. Log into your AWS account, and go to the Identity & Access Management (IAM) page.
2. Select **Users**, and then **Add user**. Enter a name, enable **Programmatic access**, and then select **Next**.
3. On the **Permissions** page, do one of the following:
   - **Full Admin Access:** Select **Attach existing policies directly**, search for and select **AdministratorAccess**, and then select **Next: Review**. Review the configuration and select **Create user**.
   - **Limited Access:** Select **Create policy**, select the **JSON** tab, and add the following [Serverless gist](https://gist.github.com/ServerlessBot/7618156b8671840a539f405dea2704c8) JSON code:

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

### Install Serverless on the delegate

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

   :::info note
   In rare cases when the delegate OS does not support `apt`, such as Red Hat Linux, you must edit this script to install `npm`. The rest of the code should remain the same.
   :::

4. Save the YAML file as `harness-delegate.yml`.
5. Apply the delegate YAML: `kubectl apply -f harness-delegate.yml`.

### Serverless cross-account access (STS Role)

You can also use STS roles with Serverless Lambda deployments.

If you **Enable cross-account access (STS Role)** for an AWS connector for a Serverless Lambda deployment, the delegate used by the connector must have the AWS CLI installed. The AWS CLI is not required for the other authentication methods.

For more information about installing software with the delegate, go to [Build custom delegate images with third-party tools](../../../delegates/install-delegates/build-custom-delegate-images-with-third-party-tools.md).

## See also

- [Troubleshooting Harness](../../../../troubleshooting/troubleshooting-nextgen.md)
- [Google Cloud Platform (GCP) connector settings reference](gcs-connector-settings-reference.md)
- [Kubernetes cluster connector settings reference](kubernetes-cluster-connector-settings-reference.md)
