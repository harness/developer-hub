---
title: Connect to CloudWatch
description: Connect Harness to AWS CloudWatch and verify the success of your deployments and live microservices.
sidebar_position: 20
helpdocs_topic_id: huoann4npq
helpdocs_category_id: wyuv3zocfk
helpdocs_is_private: false
helpdocs_is_published: true
---

A Harness Cloud Provider is a connection to AWS and its monitoring tools, such as CloudWatch. Once Harness is connected, you can use Harness 24/7 Service Guard and Deployment Verification with your CloudWatch data and analysis.

### Before You Begin

* See the [CloudWatch Verification Overview](../continuous-verification-overview/concepts-cv/cloud-watch-verification-overview.md).


### Step 1: Assign the Required AWS Permissions

Harness requires the IAM user to be able to make API requests to AWS. The **User Access Type** required is **Programmatic access**. This enables an access key ID and secret access key for the AWS API, CLI, SDK, and other development tools. For more information, see [Creating an IAM User in Your AWS Account](http://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html) from AWS.

Here is the CloudWatch policy used for this guide:


```
{  
    "Version": "2012-10-17",  
    "Statement": [  
        {  
            "Sid": "VisualEditor0",  
            "Effect": "Allow",  
            "Action": [  
                "cloudwatch:*",  
                "cloudtrail:*",  
                "logs:*",  
                "events:*"  
            ],  
            "Resource": "*"  
        }  
    ]  
}
```

### Step 2: Add AWS Cloud Provider for CloudWatch

To perform verification with CloudWatch, you must create a Harness Cloud Provider that can read from CloudWatch using your access key ID and secret access key. This Cloud Provider should have the permissions listed above in [AWS Permissions Required](#aws_permissions_required).

You might have already set up a Workflow using a Harness Delegate installed in your AWS VPC. (For AWS, the Shell Script Delegate and ECS Delegate are most commonly used.) In this case, to add CloudWatch verification, you must now add a Cloud Provider with the above credentials.

For more information on setting up an AWS Cloud Provider in Harness, see Installation [Example: Amazon Web Services and ECS](https://docs.harness.io/article/h9tkwmkrm7-delegate-installation#installation_example_amazon_web_services_and_ecs) and [Amazon Web Services (AWS) Cloud](https://docs.harness.io/article/whwnovprrb-infrastructure-providers#amazon_web_services_aws_cloud).

Here is a summary of the steps to set up an AWS Cloud Provider in Harness:

1. Click **Setup**, and then click **Cloud Providers**.
2. Click **Add Cloud Provider**., and then select **Amazon Web Services**.
3. Choose a name for this provider. This is to differentiate AWS providers in Harness. It is not the actual AWS account name.
4. Select **Assume IAM Role on Delegate** (recommended), or **Enter AWS Access Keys manually**.
	1. If you selected **Assume IAM Role on Delegate**, in **Delegate Selector**, enter the Selector of the Delegate that this Cloud Provider will use for all connections. For information about Selectors, see [Delegate Selectors](https://docs.harness.io/article/h9tkwmkrm7-delegate-installation#delegate_selectors).
	2. If you selected **Enter AWS Access Keys manually**, enter your Access Key and select/create a [Harness Encrypted Text secret](https://docs.harness.io/article/ygyvp998mu-use-encrypted-text-secrets) in **Secret Key**. For more information, see [Access Keys (Access Key ID and Secret Access Key)](https://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html#access-keys-and-secret-access-keys) from AWS.

The AWS [IAM Policy Simulator](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_testing-policies.html) is a useful tool for evaluating policies and access.For more details, see [Amazon Web Services (AWS) Cloud](https://docs.harness.io/article/whwnovprrb-infrastructure-providers#amazon_web_services_aws_cloud).


### Next Steps

* [Monitor Applications 24/7 with CloudWatch](2-24-7-service-guard-for-cloud-watch.md)
* [Verify Deployments with CloudWatch](3-verify-deployments-with-cloud-watch.md)

