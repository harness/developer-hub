---
title: Connectors + Roles for AWS CCM
description: Automatically Create Harness connectors for accounts and IAM roles in each AWS account
---

# Overview

The process below defines how to provision Harness connectors and AWS IAM roles using Terraform.

## Permissions

You will need access to provision IAM roles in AWS and create CCM connectors in Harness.

## Setup Providers

We need to leverage the AWS and Harness Terraform providers. We will use these to create IAM roles and CCM connectors.

```
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    harness = {
      source = "harness/harness"
    }
  }
}

```

## Create roles in each AWS Account

First we can use the AWS provider to get all accounts. In this example, we are applying account-wide read only access as the role permission for all services. In the event we need to be able to do autostopping and asset governance enforcements, elevated permissions for EC2 and any other service you want to enforce must be granted.

```
data "aws_organizations_organization" "this" {}

module "ccm-member" {
  for_each = { for account in data.aws_organizations_organization.this.accounts : "${trimspace(account.name)}" => account }
  source                = "harness-community/harness-ccm/aws"
  version               = "0.1.4"
  
  external_id             = "harness:891928451355:<your harness account id>"

  enable_events           = true
  enable_optimization     = true
  enable_governance       = true

  governance_policy_arn = [
    "arn:aws:iam::aws:policy/ReadOnlyAccess"
  ]
}
```

## Create a CCM connector for each AWS Account

Use the Harness provider to create a CCM connector for each AWS account.  In this example, we are enabling recommendations (VISIBILITY), governance (GOVERNANCE), and autostopping (OPTIMIZATION)

```
resource "harness_platform_connector_awscc" "data" {
  for_each = { for account in data.aws_organizations_organization.this.accounts : "${trimspace(account.name)}" => account }

  identifier = replace(replace(trimspace(each.value.name), "-", "_"), " ", "_")
  name       = replace(replace(trimspace(each.value.name), "-", "_"), " ", "_")

  account_id = trimspace(each.value.id)
  features_enabled = [
    "OPTIMIZATION",
    "VISIBILITY",
    "GOVERNANCE",
  ]
  cross_account_access {
    role_arn    = "arn:aws:iam::${trimspace(each.value.id)}:role/HarnessCERole"
    external_id = "harness:891928451355:qwerty"
  }
}
```

## Conclusion

This is a general example of providing read only access for each connector inside of an AWS organization.  Policies will have to be added based on what other CCM features you want to use.  This example doesn't include setting up the connector for the billing account.