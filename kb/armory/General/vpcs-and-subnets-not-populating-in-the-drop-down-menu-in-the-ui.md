---
title:  VPCs and subnets not populating in the drop down menu in the UI
---

## Issue
A Role for Spinnaker is created to assume with ```PowerUserAccess``` permission and ```iam:ListServerCertificates``` & ```iam:PassRole``` actions in AWS.
In the account that Spinnaker resides in (i.e., the AWS account that owns the EKS cluster where Spinnaker is installed), an IAM Policy is created with permissions to assume all of the Managed Roles. An example of the role arn that is created in the Target Account has the following permissions
```
{
    "Version": "2012-10-18",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "elasticloadbalancing:...",
                "iam:PassRole",
                "ec2:*"
            ],
            "Resource": "*"
        }
    ]
}
```
An AWS user is created that Spinnaker would use authenticate with the AWS Account. The trust relationships are edited to allow the created user entity to assume the role.
It is confirmed that the IAM Roles and Policies have been configured correctly. The trusted relationship is given to the Spinnaker role arn. However, despite this, the Spinnaker UI does not display the VPC subnets and other drop down entries of the AWS Account. 

## Cause
The accounts are being picked up by Spinnaker but, the VPCs and subnets aren't populating in the drop down menu in the UI due to the VPC and Subnets not being tagged correctly. 
The following Github issue explains the reason for tagging in more detail: [https://github.com/spinnaker/spinnaker/issues/5768](https://github.com/spinnaker/spinnaker/issues/5768)

