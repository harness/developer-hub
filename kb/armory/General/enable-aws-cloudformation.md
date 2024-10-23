---
title: Enable AWS CloudFormation
---

## Introduction
This document will show you how to enable the CloudFormation stage. This document also assumes that you have configured an AWS account. If you need more instructions on configuring your AWS account please refer to either [Deploying to AWS from Spinnaker (using IAM instance roles)](https://docs.armory.io/spinnaker-install-admin-guides/add-aws-account-iam/) or [Deploying to AWS from Spinnaker (using IAM credentials)](https://docs.armory.io/spinnaker-install-admin-guides/add-aws-account/)

## Prerequisites
N/A

## Instructions
First, we need to enable CloudDriver by adding a ```clouddriver-local.yml``` file to your hal config profiles directory
e.g. ```.hal/default/profiles/clouddriver-local.yml```.
```
aws:
  features:
    cloudFormation:
      enabled: true
```
### Halconfig
Make sure to enable the aws provider, (if you don’t have the provider enable please refer to the background section to find the links).
Also you need to have setted up at least one region. To add a region you can use this instruction:
```
export AWS_ACCOUNT_NAME=aws-1
hal config provider aws account edit ${AWS_ACCOUNT_NAME} --regions us-east-1,us-west-2
```

This is an example how should looks your hal config.
```
aws:
  enabled: true
  accounts:
  - name: aws-1
    requiredGroupMembership: []
    providerVersion: V1
    permissions: {}
    accountId: '123456789123'
    regions:
    - name: us-east-1
    - name: us-west-2
    assumeRole: role/SpinnakerManagedRole
  primaryAccount: aws-1
  bakeryDefaults:
    templateFile: aws-ebs-shared.json
    baseImages: []
    awsAssociatePublicIpAddress: true
    defaultVirtualizationType: hvm
  defaultKeyPairTemplate: '-keypair'
  defaultRegions:
  - name: us-west-2
  defaults:
    iamRole: BaseIAMRole
```
You can check your configuration by running ```hal deploy apply```.

### CloudFormation Permissions in Policy
Another thing to check is in the AWS Console the ```cloudformation:*``` permission in the ```Action``` section inside your **Policy**, like in the following example.
```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": "sts:AssumeRole",
            "Resource": "arn:aws:iam::123456789123:role/SpinnakerManagedRole"
        },
        {
            "Effect": "Allow",
            "Action": [
                "ec2:*",
                "cloudformation:*"
            ],
            "Resource": "*"
        }
    ]
}
```
*for more details please refer to [Creating a Managing Account IAM Policy in your primary AWS Account](https://docs.armory.io/spinnaker-install-admin-guides/add-aws-account/#iam-user-part-3-creating-a-managing-account-iam-policy-in-your-primary-aws-account)* Part 3.

### Creating your Pipeline
After you’ve deployed your changes, you should now be able to see the new stages when configuring your pipeline. Simply select the stage, and provide the values: example below:
**Note:** *The “Stack name” is a unique value so if you run a second time you will need to change it.*
In this example we are going to deploy a simple s3 bucket with the follow template, (Copy and paste in the **Text Source** section)
```
{
  "AWSTemplateFormatVersion": "2010-09-09",
  "Outputs": {
    "BucketName": {
      "Description": "S3 Bucket",
      "Value": {
        "Ref": "S3Bucket"
      }
    }
  },
  "Resources": {
    "S3Bucket": {
      "Properties": {
        "BucketName": "cf-example-s3"
      },
      "Type": "AWS::S3::Bucket"
    }
  }
}
```
**Note:** *You can test changing the Cloud Formation JSON Template “Resources” > “S3Bucket” > “Properties” > “BucketName” property “cf-example-s3” by another unique name.*

### Run the Pipeline
Now you can run the pipeline and this will be conclude **SUCCEEDED** 
At the meanwhile you can see the execution details if you go to your *AWS CloudFormation console* 
**Note:** *You can execute the pipeline by generating an embedded-artifact. Deploy (CloudFormation Stack) > Source: Artifact > Expected Artifact: Artifact from execution context > Account: Embedded-artifact > Contents: “Input the CloudFormation JSON/YAML Template”.*

### Validate
In this particular example we created an S3 bucket so in order to validate you need to go to your aws console and check in the S3 bucket section.


