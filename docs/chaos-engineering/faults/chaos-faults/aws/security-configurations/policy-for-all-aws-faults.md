---
title: Policy for all AWS faults
sidebar_position: 3
description: AWS superset policy to execute all AWS faults
redirect_from:
    - /docs/chaos-engineering/technical-reference/chaos-faults/aws/security-configurations/policy-for-all-aws-faults
---

This section describes the AWS managed policy and how you can use a superset policy to execute all AWS faults.

Identity-based policies are JSON permissions policy documents that control:
1. What actions an identity (users, groups of users, and roles) can perform;
2. On which resources; and
3. Under what conditions.

Identity-based policies are further categorized into:
    1. **Managed policies**: A standalone identity-based policy to which you can attach multiple users, groups, and roles in your AWS account.

HCE provides a custom AWS policy for chaos that has been created based on your requirements. This policy is attached with a role and is used for authentication purposes.

## Permissions required to execute AWS faults

Here is an example AWS superset policy to execute all AWS faults.

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "ec2:StartInstances",
                "ec2:StopInstances",
                "ec2:AttachVolume",
                "ec2:DetachVolume",
                "ec2:DescribeVolumes",
                "ec2:DescribeSubnets",
                "ec2:DescribeInstanceStatus",
                "ec2:DescribeInstances",
                "ec2messages:AcknowledgeMessage",
                "ec2messages:DeleteMessage",
                "ec2messages:FailMessage",
                "ec2messages:GetEndpoint",
                "ec2messages:GetMessages",
                "ec2messages:SendReply"
            ],
            "Resource": "*"
        },
        {
            "Effect": "Allow",
            "Action": [
              "ec2:AuthorizeSecurityGroupEgress",
              "ec2:RevokeSecurityGroupEgress",
              "ec2:RevokeSecurityGroupIngress",
              "ec2:DescribeSecurityGroups"
            ],
            "Resource": "*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "autoscaling:DescribeAutoScalingInstances"
            ],
            "Resource": "*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "ssm:GetDocument",
                "ssm:DescribeDocument",
                "ssm:GetParameter",
                "ssm:GetParameters",
                "ssm:SendCommand",
                "ssm:CancelCommand",
                "ssm:CreateDocument",
                "ssm:DeleteDocument",
                "ssm:GetCommandInvocation",          
                "ssm:UpdateInstanceInformation",
                "ssm:DescribeInstanceInformation"
            ],
            "Resource": "*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "ecs:UpdateContainerInstancesState",
                "ecs:RegisterContainerInstance",
                "ecs:ListContainerInstances",
                "ecs:DeregisterContainerInstance",
                "ecs:DescribeContainerInstances",
                "ecs:ListTasks",
                "ecs:DescribeClusters",
                "ecs:ListServices",
                "ecs:StopTask",
                "ecs:DescribeServices",
                "ecs:DescribeTaskDefinition",
                "ecs:RegisterTaskDefinition",
                "ecs:DeregisterTaskDefinition",
                "ecs:UpdateService",
                "ecs:DescribeTasks"
            ],
            "Resource": "*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "elasticloadbalancing:DetachLoadBalancerFromSubnets",
                "elasticloadbalancing:AttachLoadBalancerToSubnets",
                "elasticloadbalancing:DescribeLoadBalancers"
            ],
            "Resource": "*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "lambda:ListEventSourceMappings",
                "lambda:DeleteEventSourceMapping",
                "lambda:UpdateEventSourceMapping",
                "lambda:CreateEventSourceMapping",
                "lambda:UpdateFunctionConfiguration",
                "lambda:GetFunctionConcurrency",
                "lambda:GetFunction",
                "lambda:DeleteFunctionConcurrency",
                "lambda:PutFunctionConcurrency",
                "lambda:DeleteLayerVersion",
                "lambda:GetLayerVersion",
                "lambda:ListLayerVersions",
                "iam:ListAttachedRolePolicies",
                "iam:DetachRolePolicy",
                "iam:AttachRolePolicy"
             ],
            "Resource": "*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "iam:PassRole",
                "iam:ListAttachedRolePolicies",
                "iam:DetachRolePolicy",
                "iam:AttachRolePolicy",
                "iam:GetRolePolicy"
            ],
            "Resource": "*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "rds:DescribeDBClusters",
                "rds:DescribeDBInstances",
                "rds:DeleteDBInstance",
                "rds:RebootDBInstance"
            ],
            "Resource": "*"
        }
    ]
}
```

:::note
PassRole With Star In Resource: Using the iam:PassRole action with wildcards (*) in the resource can be overly permissive because it allows iam:PassRole permissions on multiple resources. We recommend that you specify resource ARNs or add the iam:PassedToService condition key to your statement.
:::