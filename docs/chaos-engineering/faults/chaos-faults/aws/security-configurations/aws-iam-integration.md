---
id: aws-iam-integration
title: Use IAM roles for authentication
sidebar_position: 4
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/aws/aws-iam-integration
---

## Authentication methods

There are three methods available for HCE to authenticate itself with AWS and obtain the necessary permissions that are specific to the targeted services:

* **IAM Roles for Service Accounts (IRSA) - OIDC method**

  IRSA leverages an OpenID Connect (OIDC) provider for authentication. This method is applicable when the execution plane is installed on an Amazon EKS cluster. It provides least-privilege access and credential isolation. This method requires setting up an OIDC provider in your EKS cluster and (for cross-account access) in each target account.

* **AWS Assume Role method**

  The Assume Role method uses [chained AssumeRole operations](https://docs.aws.amazon.com/eks/latest/userguide/cross-account-access.html) to enable cross-account access. It requires IRSA/OIDC only in the source account (where your EKS cluster is installed), and **does not require OIDC providers in any target account**, only standard IAM role trust relationships. This provides a simpler setup for cross-account chaos experiments.

* **Kubernetes Secret**

  This approach involves providing the necessary credentials through Kubernetes secrets. The advantage of this method is its compatibility with any cluster and platform. It is explained in the "notes" section of the experiment documentation.

Use the selector below to choose your preferred IAM role-based authentication method and follow the complete setup instructions.

import DynamicMarkdownSelector from '@site/src/components/DynamicMarkdownSelector/DynamicMarkdownSelector';

<DynamicMarkdownSelector
  options={{
    "IRSA (OIDC Method)": {
      path: "/chaos-engineering/faults/chaos-faults/aws/security-configurations/content/aws-iam-integration/oidc-method.md"
    },
    "AWS Assume Role Method": {
      path: "/chaos-engineering/faults/chaos-faults/aws/security-configurations/content/aws-iam-integration/assume-role-method.md"
    }
  }}
  toc = {toc}
/>