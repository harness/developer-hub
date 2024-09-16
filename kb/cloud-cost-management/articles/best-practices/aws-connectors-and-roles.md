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


## Get Account List

We two options to get the account list.  Option 1 is to use the AWS provider to get all accounts in the organization.

```
data "aws_organizations_organization" "this" {}
```

Option 2 is to use the `locals` value to define statically.  This is useful when you don't have a solid naming convention to filter results from option 1.

```
locals {
  aws-non-prod = ['account-1', 'account-2']
  aws-prod = ['account-3', 'account-4']
}
```

We need to leverage the AWS and Harness Terraform providers. We will use these to create IAM roles and CCM connectors.

## Create Roles In Each AWS Account via Terraform

If you have the ability to provision roles into every AWS account using Terraform, you can use this module to simplify provisioning of the role.  In this example, we are applying account-wide read only access as the role permission for all services. For what can be enabled using this module please refer to [this guide](https://github.com/harness-community/terraform-aws-harness-ccm).

```
module "ccm-member" {
  source                = "harness-community/harness-ccm/aws"
  version               = "0.1.4"
  
  external_id             = "harness:891928451355:<your harness account id>"

  enable_events           = true

  governance_policy_arn = [
    "arn:aws:iam::aws:policy/ViewOnlyAccess"
  ]
}
```

## Create Roles In Each AWS Account via a CloudFormation StackSet

If you want deploy a role in each account via a CloudFormation StackSet, [here](https://continuous-efficiency-prod.s3.us-east-2.amazonaws.com/setup/ngv1/HarnessAWSTemplate.yaml) is the StackSet that provides the necessary permissions for Recommendations, AutoStopping, Asset Governance, and Commitment Orchestration.

You will have to modify parameters in the StackSet in order for it to execute correctly.

- PrincipalBilling: Leave this as default `arn:aws:iam::891928451355:root`
- ExternalId: `harness:891928451355:<your harness account id>`
- BucketName: Leave this field blank.  Used for the payer account in which the CUR resides
- RoleName: `HarnessCERole`
- LambdaExecutionRoleName: `HarnessCELambdaExecutionRole`
- BillingEnabled: `false`
- EventsEnabled: `true` if you want recommendations and inventory data for various services for this account, `false` otherwise
- OptimizationEnabled: `true` if you want to do autostopping in this account, `false` otherwise
- GovernanceEnabled: `true` will enable read-only access for all services within the account to have the ability to run evaluations in dry-run mode.  If you want to enforce rules on various services, you will need to add additional policies to this StackSet
- CommitmentOrchestratorEnabled: `false` (turning on commitment orchestrator for a non-payer account doesn't make sense)

## Create A CCM Connector For Each AWS Account

Use the Harness provider to create a CCM connector for each AWS account. In this example, we are enabling recommendations (VISIBILITY), governance (GOVERNANCE), and autostopping (OPTIMIZATION).

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

## Supplemental Information

[Here](https://registry.terraform.io/providers/harness/harness/latest/docs) is the Terraform documentation for the Harness provider.

[Here](https://registry.terraform.io/providers/hashicorp/aws/latest/docs) is the Terraform documentation for the AWS provider.

[Here](https://docs.aws.amazon.com/) is the AWS API documentation.