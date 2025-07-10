---
title: AWS OIDC Role and Connector with OpenTofu
description: How to create an AWS role that leverage OIDC for authentication from Harness
---

# AWS OIDC Role and Connector

Leveraging an OpenID Connect (OIDC) identity provider in AWS IAM let's you enable authentication to AWS from the Harness platform without having to store access keys or run a Delegate with inherited permissions.

By leveraging OpenTofu we can create the AWS and Harness components necessary to configure this authentication scheme and easily deploy it to multiple AWS Account or Harness scopes.


## Provider Configuration

Refer to the [AWS](https://registry.terraform.io/providers/hashicorp/aws/latest/docs) and [Harness](https://registry.terraform.io/providers/harness/harness/latest/docs) provider documentation for configuration details.

```
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    harness = {
      source = "harness/harness"
      version = "~> 0.37"
    }
  }
}
```

## Data Sources

We can pull in the AWS and Harness context needed using data resources from the relivant providers:

```hcl
data "aws_caller_identity" "this" {}
data "harness_platform_current_account" "this" {}
```

## Identity Provider

Next we create an OpenId Connector provider in your account for the Harness SaaS.

```hcl
resource "aws_iam_openid_connect_provider" "this" {
  url = "https://app.harness.io/ng/api/oidc/account/${data.harness_platform_current_account.this.id}"

  client_id_list = [
    "sts.amazonaws.com",
  ]

  # this should be the same for all harness accounts
  thumbprint_list = ["df3c24f9bfd666761b268073fe06d1cc8d4f82a4"]
}
```

# IAM Role

Then we create a role that trusts our provider, and has some level of access.

```hcl
data "aws_iam_policy_document" "this" {
  statement {
    actions = ["sts:AssumeRoleWithWebIdentity"]

    principals {
      type = "Federated"
      identifiers = [
        aws_iam_openid_connect_provider.this.arn
      ]
    }

    condition {
      test     = "StringEquals"
      variable = "app.harness.io/ng/api/oidc/account/${data.harness_platform_current_account.this.id}:aud"
      values = [
        "sts.amazonaws.com"
      ]
    }
  }
}

resource "aws_iam_role" "this" {
  name                 = "harness_oidc"
  assume_role_policy   = data.aws_iam_policy_document.this.json
  max_session_duration = 28800
}

resource "aws_iam_role_policy_attachment" "this" {
  role       = aws_iam_role.this.name
  policy_arn = "arn:aws:iam::aws:policy/AdministratorAccess"
}
```

# Harness Connector

Finally we create a Harness AWS connector that leverages the role we have created.

```hcl
resource "harness_platform_connector_aws" "oidc" {
  identifier = "oidc${data.aws_caller_identity.this.account_id}"
  name       = "oidc${data.aws_caller_identity.this.account_id}"

  oidc_authentication {
    iam_role_arn       = aws_iam_role.this.arn
    region             = "us-east-1"
    delegate_selectors = []
  }
}
```
