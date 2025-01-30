---
title: AWS onboarding path
description: Step-by-step instructions to get started with CCM for AWS
sidebar_position: 1
---

# AWS

Accounts in AWS are usually structured via organizations. In this case you will have a single master/payer account where all account cost is rolled into. If you do not use organizations then you will need to repeat this process for every account with billing information that you want ingested into Harness.

Whenever you add a new payer account to Harness it may take up to 24 hours for cost data to appear.

## Overview

![](./static/aws.png)

## Payer Account

The first step is to create a CUR (Cost Usage Report) in the payer account. Once the CUR is created, we will need to create a role that has access to the S3 bucket that the CUR resides in. This role will have a trust policy that allows Harness to assume the role and copy the CUR data to an S3 bucket in Harness' AWS account for data ingestion.

![](./static/aws_cur.png)

There is a CloudFormation template or Terraform module to provision this role. [The CloudFormation stack is located here](https://github.com/harness/harness-core/blob/develop/ce-nextgen/awstemplate/prod/HarnessAWSTemplate.yaml), and the [Terraform module here](https://github.com/harness-community/terraform-aws-harness-ccm).

For both the template and the module there are inputs you must specify for your setup:

- S3 Bucket: This is the bucket in your payer account where your CUR resides
- External ID: This is extra information used when Harness assumes your AWS role to further verify the identity
  - The recommended format for the external id is `harness:<harness' aws account id>:<your harness account id>`
  - Harness' AWS account id is `891928451355`
  - You can retrieve your Harness account id from the account settings page in Harness, you can optionally use any random string
- Role name: The name of the AWS IAM role provisioned that will be granted access to the S3 bucket, and allow assumption from Harness
- Enable billing: This provisions a policy that allows the role to access the S3 bucket given for the CUR data
  - See the `HarnessBillingMonitoringPolicy` in the template for the exact permissions included and modify as necessary.
- (beta) Enable commitment read: (required for commitment orchestrator) This provisions a policy that gives access to read RI and savings plan data
  - See the `HarnessCommitmentReadPolicy` in the template for the exact permissions included and modify as necessary.
- (beta) Enable commitment write: (required for commitment orchestrator to make purchases) This provisions a policy that gives access to purchase RI and savings plans
  - See the `HarnessCommitmentWritePolicy` in the template for the exact permissions included and modify as necessary.

For the rest of the feature enablement inputs you should set these as false (disabled) in your payer account, because it is unlikely that you will have workloads running inside the payer account.

```terraform
module "ccm" {
  source  = "harness-community/harness-ccm/aws"
  version = "0.1.1"

  s3_bucket_arn           = "arn:aws:s3:::harness-ccm"
  external_id             = "harness:012345678901:wlgELJ0TTre5aZhzpt8gVA"
  enable_billing          = true
  enable_commitment_read  = true
  enable_commitment_write = true
}
```

Enabling EC2 recommendations for all accounts at once is possible by navigating to Compute Optimizer and opting in member accounts.  [Opt in member accounts for Compute Optimizer](https://docs.aws.amazon.com/compute-optimizer/latest/ug/viewing-accounts.html). 

**You may need to adjust the S3 bucket policy to allow the newly created Harness IAM role to read objects in the bucket.**

### Harness CCM AWS Connector

Now that the CUR and role have been created in the payer account we need to create a corresponding CCM AWS connector in your Harness account to start billing data ingestion.

You can create this connector through the UI or via the API with a tool like Terraform. Using Terraform is the recommended approach and there is a [Harness Terraform provider here](https://registry.terraform.io/providers/harness/harness/latest/docs).

To configure the connector you will need the following information:

- Account ID: The AWS account id for your payer account
- Cross account role ARN: The ARN for the IAM role that was created in your payer account via the template/module that has access to read the S3 bucket
- Cross account role external ID: This is the same external ID you specified in the template/module when you created the role.
- S3 bucket: The name (not ARN) of the S3 bucket where the CUR is located
- Report name: The name (not ARN) of the CUR in the payer account
- Features enabled: The CCM features that you want to use in this account
  - At minimum this should be `BILLING` for the payer account

```terraform
resource "harness_platform_connector_awscc" "payer" {
  identifier = "payer"
  name       = "payer"

  account_id  = "012345678901"
  report_name = "harnessccm"
  s3_bucket   = "harnessccm"
  features_enabled = [
    "BILLING",
  ]
  cross_account_access {
    role_arn    = "arn:aws:iam::012345678901:role/HarnessCERole"
    external_id = "harness:867530900000:myharnessaccountid"
  }
}
```

## Member Accounts

Enabling CCM for your payer account gets your cost data into Harness and enabled you to start creating perspectives, budgets, alerts, and dashboards. To leverage the other features like auto stopping and asset governance, we need to create roles and connectors in each account where you want to use these other features.

You should leverage the same template/module that you did for the payer account but with different inputs for the features you want to enable. You will be deploying the template/role into every non-payer account where you want to utilize the other CCM features.

[The CloudFormation stack is located here](https://github.com/harness/harness-core/blob/develop/ce-nextgen/awstemplate/prod/HarnessAWSTemplate.yaml), and the [Terraform module here](https://github.com/harness-community/terraform-aws-harness-ccm).

For both the template and the module there are inputs you must specify for your setup:

- S3 Bucket: Leave this input blank for non-payer accounts
- External ID: This is extra information used when Harness assumes your AWS role to further verify the identity
  - The recommended format for the external id is `harness:<harness' aws account id>:<your harness account id>`
  - Harness' AWS account id is `891928451355`
  - You can retrieve your Harness account id from the account settings page in Harness, you can optionally use any random string
- Role name: The name of the AWS IAM role provisioned that will be granted access to the S3 bucket, and allow assumption from Harness
  - You should use the same role name in every non-payer account
- Enable billing: This should be set to false for non-payer accounts
- (beta) Enable commitment read: This should be set to false for non-payer accounts
- (beta) Enable commitment write: This should be set to false for non-payer accounts
- Enable events: This enables read access in the account for inventory management
  - This will enable EC2 and ECS recommendation gathering as well as compute metadata around EC2, ECS, and RDS
    - Skip this for all member acounts that are opt in for Compute Optimizer.  [Opt in member accounts for Compute Optimizer](https://docs.aws.amazon.com/compute-optimizer/latest/ug/viewing-accounts.html). 
  - See the `HarnessEventsMonitoringPolicy` in the template for the exact permissions included and modify as necessary
- Enable optimization: This enables access that is necessary to auto stop workloads in your account
  - See the `HarnessOptimisationPolicy` and `HarnessOptimsationLambdaPolicy` in the template for the exact permissions included and modify as necessary
  - There is also an input for the `LambdaExecutionRoleName` which is a role used for the lambda function that is used when auto stopping using an ALB, unless you have specific naming schemes this can be left as the default
- Enable governance: This provisions a policy that has some read and write access to resource types that are used in asset governance example rules in your Harness account
  - When you create a custom asset governance role, you may need to attach additional policies to the role to allow you to do the actions your policy is attempting to make

```terraform
module "ccm" {
  source  = "harness-community/harness-ccm/aws"
  version = "0.1.1"

  external_id             = "harness:012345678901:wlgELJ0TTre5aZhzpt8gVA"
  enable_events           = true
  enable_optimization     = true
  enable_governance       = true

  governance_policy_arns = [
    "arn:aws:iam::aws:policy/AmazonEC2FullAccess"
  ]
}
```

### Harness CCM AWS Connector

Now that the role has been created in the member accounts we need to create corresponding CCM AWS connectors in your Harness account to allow you to use the account for the other Harness features.

You can create these connectors through the UI or via the API with a tool like Terraform. Using Terraform is the recommended approach and there is a [Harness Terraform provider here](https://registry.terraform.io/providers/harness/harness/latest/docs).

To configure the connector you will need the following information:

- Account ID: The AWS account id for your payer account
- Cross account role ARN: The ARN for the IAM role that was created in your payer account via the template/module that has access to read the S3 bucket
- Cross account role external ID: This is the same external ID you specified in the template/module when you created the role.
- Features enabled: The CCM features that you want to use in this account
  - You should not set `BILLING` for non-payer accounts
  - You should set the other features based on what you enabled in the template/module
    - `OPTIMIZATION`, `VISIBILITY`

```terraform
resource "harness_platform_connector_awscc" "member" {
  identifier = "member"
  name       = "member"

  account_id  = "012345678902"
  features_enabled = [
    "OPTIMIZATION",
    "VISIBILITY"
  ]
  cross_account_access {
    role_arn    = "arn:aws:iam::012345678902:role/HarnessCERole"
    external_id = "harness:867530900000:myharnessaccountid"
  }
}
```

## EC2 Recommendations

To enable EC2 recommendations you must have [Rightsizing Recommendations](https://docs.aws.amazon.com/cost-management/latest/userguide/ce-rightsizing.html) turned on in the account with EC2 that you want recommendations for. Harness does not compute recommendations but pulls them from compute optimizer across your accounts and centralizes them in CCM.

In addition, you must have the `Events` policy provisioned in the account as well, specifically the Harness-AWS role in your account must have the `ce:GetRightsizingRecommendation` permission.

## Connectors and Roles for AWS CCM

The process below defines how to provision Harness connectors and AWS IAM roles using Terraform. 

### Permissions

You will need access to provision IAM roles in AWS and create CCM connectors in Harness.

### Setup Providers

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

provider "aws" {
  region = "us-east-1"
}

provider "harness" {}

data "harness_platform_current_account" "current" {}
```

### Get Accounts And Create Connectors

There are two options to retrieve the accounts we want to create connectors for.  We'll use the Harness provider to create a CCM connector for each AWS account after we retrieve them. We are enabling recommendations (VISIBILITY), governance (GOVERNANCE), and autostopping (OPTIMIZATION).

#### Use The AWS Provider To Get All Accounts In The Organization

```
data "aws_organizations_organization" "this" {}

resource "harness_platform_connector_awscc" "this" {
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
    external_id = "harness:891928451355:${data.harness_platform_current_account.current.id}"
  }
}
```

#### Use The Built In Locals Value To Define The Accounts Statically
This is useful when you don't have a solid naming convention and you want to apply certain features to different accounts.  For example, you want to only apply autostopping in non-prod accounts.  This is also useful when you can't authenticate to the AWS master account.

```
locals {
  aws-non-prod = ["000000000001", "000000000002"]
  aws-prod = ["000000000004", "000000000003"]
}

resource "harness_platform_connector_awscc" "data" {
  for_each = toset(concat(local.aws-non-prod, local.aws-prod))

  identifier = "aws${each.key}"
  name       = "aws${each.key}"

  account_id = trimspace(each.key)

  features_enabled = [
    "OPTIMIZATION",
    "VISIBILITY",
    "GOVERNANCE",
  ]
  cross_account_access {
    role_arn    = "arn:aws:iam::${each.key}:role/HarnessCERole"
    external_id = "harness:891928451355:${data.harness_platform_current_account.current.id}"
  }
}
```

### Create Roles In Each AWS Account
Your organization probably already has a process to do this.  When this is the case, defer to that process.  Below are two alternatives.

#### Create Roles In Each AWS Account via Terraform

If you have the ability to provision roles into every AWS account using Terraform, you can use this module to simplify provisioning of the role.  In this example, we are applying account-wide read only access as the role permission for all services. For what can be enabled using this module please refer to [this guide](https://github.com/harness-community/terraform-aws-harness-ccm).

```
module "ccm-member" {
  source                = "harness-community/harness-ccm/aws"
  version               = "0.1.4"
  
  external_id             = "harness:891928451355:<your harness account id>"

  enable_events           = true

  governance_policy_arn = [
    "arn:aws:iam::aws:policy/ReadOnlyAccess"
  ]
}
```

#### Create Roles In Each AWS Account via a CloudFormation StackSet

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

:::info 
This is a general example of providing read only access for each connector inside of an AWS organization. Policies will have to be added based on what other CCM features you want to use. This example doesn't include setting up the connector for the billing account. 
:::

## Supplemental Information

[Here](https://registry.terraform.io/providers/harness/harness/latest/docs) is the Terraform documentation for the Harness provider.

[Here](https://registry.terraform.io/providers/hashicorp/aws/latest/docs) is the Terraform documentation for the AWS provider.

[Here](https://docs.aws.amazon.com/) is the AWS API documentation.
