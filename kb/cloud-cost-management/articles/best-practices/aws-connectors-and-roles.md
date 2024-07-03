---
title: Connectors + Roles For AWS CCM
description: Automatically create Harness connectors for accounts and IAM roles in each AWS account
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

provider "aws" {}

provider "harness" {}
```

## Create Roles In Each AWS Account

First we can use the AWS provider to get all accounts. In this example, we are applying account-wide read only access as the role permission for all services. In the event we need to be able to do autostopping and asset governance enforcements, elevated permissions for EC2 and any other service you want to enforce must be granted. You can do this by setting `enable_optimization = true` for autostopping and for governance, attach any additional policies under `governance_policy_arn` based on the actions you want to take.

```
data "aws_organizations_organization" "this" {}

module "ccm-member" {
  for_each = { for account in data.aws_organizations_organization.this.accounts : "${trimspace(account.name)}" => account }
  source                = "harness-community/harness-ccm/aws"
  version               = "0.1.4"
  
  external_id             = "harness:891928451355:<your harness account id>"

  enable_events           = true

  governance_policy_arn = [
    "arn:aws:iam::aws:policy/ReadOnlyAccess"
  ]
}
```

## Create A CCM Connector For Each AWS Account

Use the Harness provider to create a CCM connector for each AWS account. In this example, we are enabling recommendations (VISIBILITY), governance (GOVERNANCE), and autostopping (OPTIMIZATION)

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
    external_id = "harness:891928451355:<your harness account id>"
  }
}
```

## Conclusion

This is a general example of providing read only access for each connector inside of an AWS organization. Policies will have to be added based on what other CCM features you want to use. This example doesn't include setting up the connector for the billing account. This guide assumes there already exists a connector into the master AWS account sthat has the billing export and an existing connector for the billing data.