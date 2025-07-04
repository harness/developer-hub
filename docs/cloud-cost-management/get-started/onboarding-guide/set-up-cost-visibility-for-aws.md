---
title: AWS
description: This topic describes how to set up cost visibility for AWS.
# sidebar_position: 2
helpdocs_topic_id: 80vbt5jv0q
helpdocs_category_id: 7vy86n7cws
helpdocs_is_private: false
helpdocs_is_published: true
redirect_from:
  - /docs/cloud-cost-management/getting-started-ccm/set-up-cloud-cost-management/set-up-cost-visibility-for-aws
---

# Set up CCM for AWS

## Overview

Harness Cloud Cost Management (CCM) offers comprehensive solutions to manage and optimize the cloud costs of your Amazon Web Services (AWS) infrastructure. CCM provides visibility, governance, and optimization of AWS services such as EC2, S3, RDS, Lambda, and others. CCM provides recommendations to effectively right-size your cloud resources to match the workload demands and optimizes the auto-scaling groups (ASGs), and EKS clusters using intelligent cloud AutoStopping rules.

:::info
After enabling CCM, it takes about 24 hours for the data to be available for viewing and analysis.
:::

## Prerequisites

### AWS Connector requirements

- For CCM, AWS connectors are available only at the Account level in Harness.
- If you have multiple AWS accounts, you may need to create multiple AWS connectors depending on desired functionality:
  - **Cost Visibility**: You may need to create one or multiple AWS connectors depending on the availability of consolidated billing. Go to **Cost and Usage Reports (CUR)** for more information.
  - **Resource Inventory Management**: You need to create an AWS connector for each account.
  - **Optimization by AutoStopping**: You need to create an AWS connector for each account.

### Required- Cost and Usage Reports (CUR)

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs queryString="tab-number">
<TabItem value="1" label="Multiple Accounts with Consolidated Billing">

- If you have [consolidated billing process](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/useconsolidatedbilling-procedure.html) enabled, then you need to create only a single CUR for the management account. This provides cost data for all member accounts in the organization.

- For the Cost Visibility feature alone, you will only need a single AWS connector configured with the management account CUR.

- In order to take advantage of other features such as Inventory Management and AutoStopping, you need to create a connector for each member account:
  - If you are using the UI to create the additional connectors, configure all connectors with the same management account CUR.
  - If you are using the API to create the additional connectors, you can omit billing information altogether.

</TabItem>

<TabItem value="2" label="Multiple Accounts">

- If you do not have [consolidated billing process](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/useconsolidatedbilling-procedure.html) enabled, then you need to create a CUR for each linked account.

- Create an AWS connector for each AWS account, configured with the CUR for that account.

</TabItem>
<TabItem value="3" label="Single Account">

- Create a single CUR for your AWS account.

- Create a single AWS connector configured with the CUR for your account.

</TabItem>
</Tabs>

## Implementation Guide

### Connect CCM to your AWS account

To enable CCM for your AWS services (such as EC2, S3, RDS, Lambda, and so on), you simply need to connect Harness to your AWS accounts.

1. Create a new AWS connector using one of the two options below:

<Tabs queryString="tab-number">
<TabItem value="4" label="From Account Settings">

2. Go to **Account Settings** > **Connectors**.
3. Select **+ New Connector**.
4. Under **Cloud Costs**, select **AWS**.

</TabItem>
<TabItem value="5" label="From Cloud Costs">

2. Go to **Setup** > **Cloud Integration**.
3. Select **New Cluster/Cloud account**.
4. Select **AWS**.

</TabItem>
</Tabs>

5. Perform the following tasks in the **AWS Connector** wizard.

### Step 1: Configure Connector Overview


<DocImage path={require('./static/aws-connector-one.png')} width="100%" height="100%" title="Click to view full size image" />

#### Connector Details

| **Field**                            | **Description**                                                                                                                                                                                                |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Connector Name**                   | Enter any name for the connector. This name will appear throughout the product to identify this AWS account.                                                                                                   |
| **Specify the AWS account ID**       | The Account ID of the AWS account to connect to. To find your AWS account ID, see [Finding your AWS account ID](https://docs.aws.amazon.com/IAM/latest/UserGuide/console_account-alias.html#FindingYourAWSId). |
| **Is this an AWS GovCloud account?** | Select **Yes** if connecting to a GovCloud account.                                                                                                                                                            |

### Step 2: Set Up Cost and Usage Report

Launch the AWS console and perform the following steps:

1. Log into your AWS account if not already logged in.
2. Select **Create Report**.
3. In the **Specify report details** step, enter the following values, and then select **Next**.

#### Report Details

| **Field**                      | **Description**                                                                                                                                 |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| **Report Name**                | Enter a name for the report. Make sure to copy this name, as you will need it to continue configuring the Harness connector in the steps below. |
| **Include resource IDs**       | Make sure this option is selected.                                                                                                              |
| **Split cost allocation data** | Make sure this option is unchecked.                                                                                                             |
| **Refresh automatically**      | Make sure this option is selected.                                                                                                              |

5. In the **Set delivery options** step, enter the following values, and then select **Next**.

| **Field**                        | **Description**                                                                                                                                                   |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Configure S3 Bucket**          | Select an existing bucket or create a new one. Make sure to copy this name, as you will need it to continue configuring the Harness connector in the steps below. |
| **S3 path prefix - required**    | Enter any path prefix. Harness will automatically scan and find this prefix.                                                                                      |
| **Report data time granularity** | Select **Hourly**.                                                                                                                                                |
| **Report versioning**            | Select **Overwrite existing report**.                                                                                                                             |
| **Amazon Athena**                | Make sure this option is unchecked.                                                                                                                               |
| **Amazon Redshift**              | Make sure this option is unchecked.                                                                                                                               |
| **Amazon QuickSight**            | Make sure this option is unchecked.                                                                                                                               |
| **Compression type**             | Select **GZIP**.                                                                                                                                                  |

6. In the **Review and create** step, select **Create Report**.

7. In the Harness connector dialog, enter the following values, and then select **Continue**.

<DocImage path={require('./static/aws-connector-two.png')} width="100%" height="100%" title="Click to view full size image" />

| **Field**                         | **Description**                              |
| --------------------------------- | -------------------------------------------- |
| **Cost and Usage Report Name**    | Enter the report name you copied earlier.    |
| **Cost and Usage S3 Bucket Name** | Enter the bucket name you specified earlier. |

### Step 3: Choose Requirements

Select the Cloud Cost Management features that you would like to enable, and then select **Continue**.

> **☆ NOTE —** Selecting features will add the necessary permissions to the IAM role in the next step. Cost Visibility permissions are required by default.

<DocImage path={require('./static/aws-connector-features.png')} width="100%" height="100%" title="Click to view full size image" />

Details about each feature are provided below:

| **Feature** | **Status** | **Permissions Involved** | **Permissions** |
|------------|------------|-------------------------|----------------|
| **Cost Visibility** | Required | • AWS costs by services, accounts, etc.<br/>• Cost perspective by various constructs<br/>• Cost anomaly detection<br/>• Budgets and forecasts<br/>• Email and Slack alerts<br/>• Savings plans coverage & utilization details<br/>• RI coverage & utilization details | Default from the Cost and Usage Report created in the previous step. This cannot be deselected. Please see [required permissions](/docs/cloud-cost-management/get-started/onboarding-guide/set-up-cost-visibility-for-aws?tab-number=4#1-cost-visibility-permissions) |
| **Resource Inventory Management** | Optional | • Breakdown by ECS cluster cost, Service, Task, and Launch Type (EC2, Fargate)<br/>• Insight into EC2 instances and their utilization<br/>• Access to AWS EC2 Inventory Cost, EBS Volumes and Snapshots inventory dashboards | Adding [these permissions](/docs/cloud-cost-management/get-started/onboarding-guide/set-up-cost-visibility-for-aws?tab-number=4#2-resource-inventory-management-permissions) to an IAM role in the next step. |
| **Optimization by AutoStopping** | Optional | • Orchestrate VMs and ASGs based on idleness<br/>• Run on fully orchestrated spot instances<br/>• Set dependencies between VMs<br/>• Granular savings visibility<br/>• Simple one-time setup | Adding [these permissions](/docs/cloud-cost-management/get-started/onboarding-guide/set-up-cost-visibility-for-aws?tab-number=4#4-autostopping-rules-permissions) to an IAM role in the next step. Also, if this option is selected, you can set up **Granular AutoStopping Permissions** in the next step. Please see [details here](/docs/cloud-cost-management/get-started/onboarding-guide/set-up-cost-visibility-for-aws#granular-permissions-for-autostopping). |
| **Cloud Governance** | Optional | • Asset Management (EC2, EBS, RDS, S3)<br/>• Automated Actions | Adding [these permissions](/docs/cloud-cost-management/get-started/onboarding-guide/set-up-cost-visibility-for-aws?tab-number=4#5-cloud-asset-governance-permissions) to an IAM role in the next step. |
| **Commitment Orchestration** | Optional | • Purchase Reserved Instances offering<br/>• Get Reserved Instances Exchange Quote<br/>• Describe Instance type offerings<br/>• Accept RI exchange quote<br/>• Describe RI modifications<br/>• Modify Reserved Instances | Adding [these permissions](/docs/cloud-cost-management/get-started/onboarding-guide/set-up-cost-visibility-for-aws#6-commitment-orchestrator-permissions) to an IAM role in the next step. |


### Step 4: Authentication (Conditional)

If you have selected **Optimization by AutoStopping**, **Cloud Governance** or **Commitment Orchestration**, in previous step, you can set up Authentication using OIDC. If not selected, this step will not be prompted.

You can enable authentication for your AWS account via

- Cross Account Role: Created with custom permissions
- OIDC Authentication: Federated access with no stored credentials

#### OIDC Authentication

:::info 
This feature is behind a Feature Flag `CCM_ENABLE_OIDC_AUTH_AWS`. Contact [Harness Support](mailto:support@harness.io) to enable it.
:::

<DocImage path={require('./static/oidc-aws.png')} width="100%" height="100%" title="Click to view full size image" />

OIDC authentication allows secure access your billing data and perform cost optimization without storing credentials. 

To use OIDC, you need to create an [OIDC identity provider in AWS](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_oidc.html). 

Use the following Harness OIDC provider endpoint and OIDC audience settings to create your OIDC identity provider:

- Harness OIDC provider endpoint: `https://app.harness.io/ng/api/oidc/account/<ACCOUNT_ID>`
- OIDC audience: `sts.amazonaws.com`

Follow the steps on the **Authentication** page to complete OIDC authentication:

- Launch the CloudFormation Template on the AWS console. You can also preview the template [here](https://continuous-efficiency.s3.us-east-2.amazonaws.com/setup/v1/ng/HarnessAWSOidcTemplate.yaml).
- Login to your AWS account if not logged in already.
- Follow [the instructions to create the Cross Account Role](https://docs.harness.io/article/80vbt5jv0q-set-up-cost-visibility-for-aws#step_4_create_cross_account_role)
- Enter Cross Account Role ARN and Region in the input boxes on the UI.

### Step 5: Create Cross Account Role

Harness uses the secure cross-account role to access your AWS account. The role includes a restricted policy based on the features selected above.

1. In **Create Cross Account Role**, select **Launch Template on AWS console**.

Perform the following steps in the AWS Console.

2. In **Quick create stack**, in **Capabilities**, select the acknowledgment, and then select **Create stack**.
   > **☆ NOTE** - The values on this page are based on your previous selections. Do not modify any values before creating the stack.
3. In the stack's page, go to the **Outputs** tab and copy the **Value** of **CrossAccountRoleArn Key**.

   ![](./static/set-up-cost-visibility-for-aws-36.png)

4. In the Harness connector dialog, enter the following values, and then select **Save and Continue**.

<DocImage path={require('./static/aws-connector-four.png')} width="100%" height="100%" title="Click to view full size image" />

| **Field**                  | **Description**                                                                                                                            |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **Cross Account Role ARN** | Enter the value that you copied in step 3.                                                                                                 |
| **External ID**            | Do not modify. If you intend to create multiple AWS connectors via API, be sure to copy this value as you will need to reference it later. |

### Step 5: Connection Test

The connection is validated, and verified in this step. After successful validation, select **Finish**.

:::important
Creating a new CUR (Cost and Usage Report) in AWS typically takes 6-8 hours. During this period, you might encounter an error message stating that Harness CCM is unable to find a CUR file.
:::

## Advanced Configuration

### Create Connectors for multiple AWS accounts

Harness CCM also provides the ability to create connectors via API using a StackSet configured at the management account. It involves the following steps:

- Create a Service Account and API Key in Harness
- Create a StackSet in AWS
- Create an AWS Connector via API (performed once for each AWS account)

> **☆ NOTE —** You should manually create a connector via the UI for the management account before using the API method described here to create connectors for the member accounts.

<Tabs>
<TabItem value="step1" label="Step 1: Create a Service Account">

### Create a Service Account and API key in Harness

1. At the Account level, [create a service account](/docs/platform/role-based-access-control/add-and-manage-service-account) with the **Admin** role for **All Account Level Resources** or **All Resources Including Child Scopes**.
2. [Create a service account token](/docs/platform/automation/api/add-and-manage-api-keys#create-service-account-api-keys-and-tokens). Save the API Key, which will be used when creating AWS connectors via the API below.

</TabItem>
<TabItem value="step2" label="Step 2: Create a StackSet in AWS">

### Create a StackSet in AWS

Perform the following steps to create a StackSet in AWS:

1. Select the following link to start creating the StackSet:  
   [https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacksets/create](https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacksets/create)
2. In the **Choose a template** step, enter the following values, and then select **Next**.

| **Field**                           | **Description**                                                                                          |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------- |
| **Permissions**                     | Optional, configure if necessary based on your AWS policies.                                             |
| **Prerequisite - Prepare template** | Select **Template is ready**.                                                                            |
| **Specify template**                | Select **Amazon S3 URL**.                                                                                |
| **Amazon S3 URL**                   | Enter `https://continuous-efficiency-prod.s3.us-east-2.amazonaws.com/setup/ngv1/HarnessAWSTemplate.yaml` |

3. In the **Specify StackSet details** step, enter the following values, and then select **Next**.

| **Field**                   | **Description**                                                                                    |
| --------------------------- | -------------------------------------------------------------------------------------------------- |
| **StackSet name**           | Enter any name. For example, `harness-ce-iam-stackset` .                                           |
| **BillingEnabled**          | Select **false**.                                                                                  |
| **BucketName**              | Leave empty.                                                                                       |
| **EventsEnabled**           | Select **true**.                                                                                   |
| **ExternalId**              | The External ID value copied in step 4 of [Create Cross Account Role](#create-cross-account-role). |
| **GovernanceEnabled**       | Select **true** to enable Governance. Otherwise, select **false**.                                 |
| **LambdaExecutionRoleName** | Leave as is unless your AWS policies required a different naming convention.                       |
| **OptimizationEnabled**     | Select **true** to enable AutoStopping. Otherwise, select **false**.                               |
| **PrincipalBilling**        | Do not modify.                                                                                     |
| **RoleName**                | Leave as is unless your AWS policies required a different naming convention.                       |

4. In the **Configure StackSet options** step, enter the following values and select **Next**

| **Field**             | **Description**    |
| --------------------- | ------------------ |
| **Managed execution** | Select **Active**. |

5. In the **Set deployment options** step, enter the following values, and then select **Next**.

| **Field**                  | **Description**                                                          |
| -------------------------- | ------------------------------------------------------------------------ |
| **Add stacks to StackSet** | Select **Deploy new stacks**.                                            |
| **Deployment locations**   | Configure the accounts or organization units that you want to deploy to. |
| **Specify regions**        | Configure the regions that you want to deploy to.                        |
| **Region Concurrency**     | Select **Sequential**.                                                   |

6. In the **Review** step, select the acknowledgment, and then select **Submit**.

</TabItem>
<TabItem value="step3" label="Step 3: Create AWS Connector via API">

### Create an AWS Connector via API

Use the Harness API's [Create a Connector](https://apidocs.harness.io/tag/Connectors#operation/createConnector) endpoint to create an AWS connector for each member account. Below is a sample cURL command to create an AWS connector. Replace the following placeholders with your values:

| **Placeholder**            | **Description**                                                                                                                                                |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **API TOKEN**              | The API Key created in the [Create a Service Account and API Key in Harness](#create-a-service-account-and-api-key-in-harness) section.                        |
| **CONNECTOR NAME**         | Enter any name. This will be visible in the UI, perspectives, dashboards, etc.                                                                                 |
| **CONNECTOR ID**           | Enter a unique ID for the connector. The ID must meet the [Entity Identifier Reference](/docs/platform/references/entity-identifier-reference/) specification. |
| **CROSS ACCOUNT ROLE ARN** | The ARN value copied in step 3 of [Create Cross Account Role](#create-cross-account-role).                                                                     |
| **EXTERNAL ID**            | The External ID value copied in step 4 of [Create Cross Account Role](#create-cross-account-role).                                                             |
| **AWS ACCOUNT ID**         | The ID of the AWS member account.                                                                                                                              |
| **FEATURES**               | A comma separated list of features to enable. Enter `"VISIBILITY", "OPTIMIZATION", "GOVERNANCE"` removing any features that you do not want to enable.         |

```
curl -i -X POST 'https://app.harness.io/gateway/ng/api/connectors' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: <API TOKEN>' \
  -d '{
  "connector":{
    "name":"<CONNECTOR NAME>",
    "identifier":"<CONNECTOR ID>",
    "type":"CEAws",
    "spec":{
      "crossAccountAccess":{
        "crossAccountRoleArn":"<CROSS ACCOUNT ROLE ARN>",
        "externalId":"<EXTERNAL ID>"
      },
      "awsAccountId":"<AWS ACCOUNT ID>",
      "curAttributes":{
        "reportName":"",
        "s3BucketName":""
      },
      "featuresEnabled":[
        <FEATURES>
      ]
    }
  }
}'
```

</TabItem>
</Tabs>

### Enable EC2 recommendations

:::note
If you are an existing customer, you need to:

- Edit the IAM role used by the Harness AWS Connector corresponding to the AWS account.
- In the IAM role, add the `ce:GetRightsizingRecommendation` permission to the **HarnessEventsMonitoringPolicy**.
:::

Once you have the `ce:GetRightsizingRecommendation` permission added to the **HarnessEventsMonitoringPolicy** in the IAM role, perform the following tasks on your AWS console to enable recommendations.

1. On your AWS console, go to the **Cost Explorer** service.

<DocImage path={require('./static/ec2-recom-aws-screen-1.png')} width="50%" height="50%" title="Click to view full size image" />

2. Click **Preferences** on the left pane.
3. Enable the following recommendations:

- Receive Amazon EC2 resource recommendations
- Recommendations for linked accounts

<DocImage path={require('./static/ec2-recom-aws-screen-2.png')} width="50%" height="50%" title="Click to view full size image" />

4. Verify that you have enabled these recommendations correctly.

Open AWS CloudShell and run the following command:

```
  aws ce get-rightsizing-recommendation --service AmazonEC2
```

If the recommendations are not enabled, the following error message is displayed:

"An error occurred (AccessDeniedException) when calling the GetRightsizingRecommendation operation: Rightsizing EC2 recommendation is an opt-in only feature. You can enable this feature from the PAYER account’s Cost Explorer Preferences page. Normally it may take up to 24 hours in order to generate your rightsizing recommendations."

5. You must install the Amazon CloudWatch agent on your EC2 instance to enable memory metrics.

## Reference Information

## AWS access permissions

CCM requires the following permissions which are automatically created via a StackSet based on the features you select during configuration.

> **☆ NOTE —** If you don't have access to create a cost and usage report or run a CloudFormation template, contact your IT or security teams to provide the required permissions.

## Individual Feature Permissions

This section details the specific AWS permissions required for each CCM feature:

- [Cost Visibility Permissions](#1-cost-visibility-permissions)
- [Resource Inventory Management Permissions](#2-resource-inventory-management-permissions)
- [RDS Instance Visibility Permissions](#3-rds-instance-visibility-permissions)
- [AutoStopping Rules Permissions](#4-autostopping-rules-permissions)
- [Cloud Asset Governance Permissions](#5-cloud-asset-governance-permissions)
- [Commitment Orchestrator Permissions](#6-commitment-orchestrator-permissions)

## 1. Cost Visibility Permissions

The Cost Visibility feature provides insights into AWS costs by services, accounts, and other dimensions. It enables root cost analysis, anomaly detection, budgeting, and notifications.

#### Required Permissions

The cost visibility policy grants the following permissions:

- List CUR reports and visibility into the organization's Structure
- Get objects from the S3 bucket configured in the CUR
- Put objects into the Harness S3 bucket

<details>
<summary><b>Click to view Cost Visibility Policy</b></summary>

```yaml
  HarnessBillingMonitoringPolicy:
    "Type": "AWS::IAM::ManagedPolicy"
    "Condition": "CreatingHarnessBillingMonitoringPolicy"
    "Properties":
      "Description": "Policy granting Harness Access to Collect Billing Data"
      "PolicyDocument":
        "Version": "2012-10-17"
        "Statement":
          - "Effect": "Allow"
            "Action":
              - "s3:GetBucketLocation"
              - "s3:ListBucket"
              - "s3:GetObject"
            Resource:
              - !Join
                - ''
                - - 'arn:aws:s3:::'
                  - !Ref BucketName
              - !Join
                - /
                - - !Join
                    - ''
                    - - "arn:aws:s3:::"
                      - !Ref BucketName
                  - '*'
          - "Effect": "Allow"
            "Action":
              - "s3:ListBucket"
              - "s3:PutObject"
              - "s3:PutObjectAcl"
            "Resource":
              - "arn:aws:s3:::ce-customer-billing-data-prod*"
              - "arn:aws:s3:::ce-customer-billing-data-prod*/*"
          - "Effect": "Allow"
            "Action":
              - "cur:DescribeReportDefinitions"
              - "organizations:Describe*"
              - "organizations:List*"
            "Resource": "*"
      "Roles":
        - "!Ref HarnessCloudFormationRole"
```

</details>

If the `cur:DescribeReportDefinitions`, `organizations:Describe`, and `organizations:List*` permissions are too wide, you can modify these to the following:

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "organizations:ListAccounts",
                "organizations:ListTagsForResource"
            ],
            "Resource": "*"
        }
    ]
}
```

- `organizations:ListAccounts`: fetches a list of all the accounts present in the organization, and also fetches the accountID to Account Name mapping.
- `organizations:ListTagsForResource`: fetches the AWS Account level tags. Harness supports account tags within CCM that can be used for reporting and analysis.

## 2. Resource Inventory Management Permissions

The Resource Inventory Management feature provides visibility into your AWS resources including EC2 instances, EBS volumes, and ECS clusters. This feature helps finance teams understand resource utilization across the organization.

#### Required Permissions

The inventory management policy performs the following actions:

- ECS Visibility - For Granular Cluster Cost Breakdown
- EC2, EBS, RDS Visibility - Inventory Management

```
HarnessEventsMonitoringPolicy:
  "Type": "AWS::IAM::ManagedPolicy"
  "Condition": "CreateHarnessEventsMonitoringPolicy"
  "Properties":
    "Description": "Policy granting Harness Access to Enable Event Collection"
    "PolicyDocument":
      "Version": "2012-10-17"
      "Statement":
        - "Effect": "Allow"
          "Action":
              - "ecs:ListClusters*"
              - "ecs:DescribeClusters"
              - "ecs:ListServices"
              - "ecs:DescribeServices"
              - "ecs:DescribeContainerInstances"
              - "ecs:ListTasks"
              - "ecs:ListContainerInstances"
              - "ecs:DescribeTasks"
              - "ec2:DescribeInstances*"
              - "ec2:DescribeRegions"
              - "cloudwatch:GetMetricData"
              - "ec2:DescribeVolumes"
              - "ec2:DescribeSnapshots"
              - "rds:DescribeDBSnapshots"
              - "rds:DescribeDBInstances"
              - "rds:DescribeDBClusters"
              - "rds:DescribeDBSnapshotAttributes"
          "Resource": "*"
    "Roles":
      - "!Ref HarnessCloudFormationRole"
```

## 3. RDS Instance Visibility Permissions

This feature provides detailed visibility into your RDS instances and related resources, allowing for better cost management and optimization of database resources.

#### Feature Capabilities

- Detailed breakdown of RDS instance costs and utilization
- Insight into database clusters and snapshots
- Integration with EC2, EBS volumes, and ECS cost data

#### Dashboard Access

This feature enables access to several dashboards:
- Breakdown by ECS cluster cost, Service, Task, and Launch Type (EC2, Fargate)
- Insight into EC2 instances and their utilization
- Access to AWS EC2 Inventory Cost and EBS Volumes and Snapshots inventory dashboards

For more information, see:
- [View AWS EC2 Inventory Cost Dashboard](../../3-use-ccm-cost-reporting/6-use-ccm-dashboards/view-aws-ec-2-inventory-cost-dashboard.md)
- [Orphaned EBS Volumes and Snapshots Dashboard](../../3-use-ccm-cost-reporting/6-use-ccm-dashboards/orphaned-ebs-volumes-and-snapshots-dashboard.md)
- [View AWS EC2 Instance Metrics Dashboard](../../3-use-ccm-cost-reporting/6-use-ccm-dashboards/view-aws-ec-2-instance-metrics.md)

## 4. AutoStopping Rules Permissions

The AutoStopping feature allows you to enable Intelligent Cloud AutoStopping for your AWS instances and auto-scaling groups, helping to reduce costs by automatically stopping idle resources.

#### Feature Capabilities

- Orchestrate VMs and ASGs based on idleness
- Run workloads on fully orchestrated spot instances
- Gain granular savings visibility

#### Required Permissions

The AutoStopping policy performs the following actions:

- Create an IAM role for optimization
- Permissions for creating and managing AutoStopping Rules

The following template illustrates the relevant permissions needed for AutoStopping to work seamlessly. 

```
 HarnessOptimizationLambdaExecutionRole:
    Type: "AWS::IAM::Role"
    Condition: CreateHarnessOptimisationPolicy
    Properties:
      RoleName: !Ref LambdaExecutionRoleName
      AssumeRolePolicyDocument:
        Version: 2012-10-17
        Statement:
          - Effect: Allow
            Principal:
              Service: "lambda.amazonaws.com"
            Action: 'sts:AssumeRole'
      Path: /ce-optimization-service-role/
```

```
HarnessOptimsationLambdaPolicy:
    Type: 'AWS::IAM::ManagedPolicy'
    Condition: CreateHarnessOptimisationPolicy
    Properties:
      Description: Policy granting Harness Access to Enable Cost Optimisation
      PolicyDocument:
        Version: 2012-10-17
        Statement:
          - Effect: Allow
            Action:
              - 'ec2:CreateNetworkInterface'
              - 'ec2:CreateNetworkInsightsPath'
              - 'ec2:CreateNetworkInterfacePermission'
              - 'ec2:CreateNetworkAcl'
              - 'ec2:*'
              - 'ec2:CreateNetworkAclEntry'
              - 'logs:CreateLogGroup'
              - 'logs:CreateLogStream'
              - 'logs:PutLogEvents'
            Resource: "*"
      Roles:
        - !Ref HarnessOptimizationLambdaExecutionRole
```

```
  HarnessOptimisationPolicy:
    Type: 'AWS::IAM::ManagedPolicy'
    Condition: CreateHarnessOptimisationPolicy
    Properties:
      Description: Policy granting Harness Access to Enable Cost Optimisation
      PolicyDocument:
        Version: 2012-10-17
        Statement:
              - Effect: Allow
                Action:
                  - elasticloadbalancing:*
                  - ec2:StopInstances
                  - autoscaling:*
                  - ec2:Describe*
                  - iam:CreateServiceLinkedRole
                  - iam:ListInstanceProfiles
                  - iam:ListInstanceProfilesForRole
                  - iam:AddRoleToInstanceProfile
                  - iam:PassRole
                  - ec2:StartInstances
                  - ec2:*
                  - iam:GetUser
                  - ec2:ModifyInstanceAttribute
                  - iam:ListRoles
                  - acm:ListCertificates
                  - lambda:*
                  - cloudwatch:ListMetrics
                  - cloudwatch:GetMetricData
                  - route53:GetHostedZone
                  - route53:ListHostedZones
                  - route53:ListHostedZonesByName
                  - route53:ChangeResourceRecordSets
                  - route53:ListResourceRecordSets
                  - route53:GetHealthCheck
                  - route53:GetHealthCheckStatus
                  - cloudwatch:GetMetricStatistics
                  - ecs:ListClusters
                  - ecs:ListContainerInstances
                  - ecs:ListServices
                  - ecs:ListTaskDefinitions
                  - ecs:ListTasks
                  - ecs:DescribeCapacityProviders
                  - ecs:DescribeClusters
                  - ecs:DescribeContainerInstances
                  - ecs:DescribeServices
                  - ecs:DescribeTaskDefinition
                  - ecs:DescribeTasks
                  - ecs:DescribeTaskSets
                  - ecs:RunTask
                  - ecs:StopTask
                  - ecs:StartTask
                  - ecs:UpdateService
                  - rds:DescribeDBClusters
                  - rds:DescribeDBInstances
                  - rds:ListTagsForResource
                  - rds:AddTagsToResource
                  - rds:RemoveTagsFromResource
                  - rds:ModifyDBInstance
                  - rds:StartDBCluster
                  - rds:StartDBInstance
                  - rds:StopDBCluster
                  - rds:StopDBInstance
                  - s3:ListBucket
                  - s3:GetObject
                  - s3:ListAllMyBuckets
                  - s3:GetBucketLocation
                  - secretsmanager:GetSecretValue
                Resource: "*"
      Roles:
        - !Ref HarnessCloudFormationRole
```

### Granular Permissions for AutoStopping

On this screen, you can select specific features and services for AutoStopping:

<DocImage path={require('./static/granular-permissions.gif.gif')} width="100%" height="100%" title="Click to view full size image" />

### EC2 Instances

<details>
<summary><b>Schedules only</b></summary>

```
# List VMs in Harness UI for rule creation and in rule details page
ec2:DescribeInstances

# Create tags on the EC2 while creating an AutoStopping rule
ec2:CreateTags

# Start EC2
ec2:StartInstances

# Stop EC2
ec2:StopInstances
```
</details>


<details>
<summary><b>Spot Orchestration</b></summary>

```
# Creating Snapshot for Spot VM
ec2:DescribeVolumes
ec2:CreateImage
ec2:DescribeImages

# Spot VMs are terminated during cool down instead of stopping
ec2:TerminateInstances

# Delete snapshot after deleting AutoStopping rule
ec2:DeregisterImage
ec2:DeleteSnapshot

# Create spot VM during warm up
ec2:RequestSpotInstances
ec2:DescribeSpotInstanceRequests
ec2:DescribeAddresses

# Create on demand instance in case spot VM creation fails
ec2:RunInstances
```
</details>

<details>
<summary><b>with AWS ALB</b></summary>

```
# Describe certificates in create ALB flow
acm:ListCertificates

# List VPCs in create ALB flow
ec2:DescribeVpcs

# List security groups in create ALB flow
ec2:DescribeSecurityGroups

# Describe load balancers in create ALB flow
elasticloadbalancing:DescribeLoadBalancers

# Lambda requires a role to execute and push the logs to cloud watch
iam:ListRoles

# List subnets for the selected VPC while creating ALB
ec2:DescribeSubnets

# Create ALB (only if customer wants to create ALB from Harness)
elasticloadbalancing:CreateLoadBalancer

# Attach security groups to ALB
elasticloadbalancing:SetSecurityGroups

# Describe target group for lambda and EC2 target groups
elasticloadbalancing:DescribeTargetGroups

# Create lambda target group and health check target group
elasticloadbalancing:CreateTargetGroup

# Add tags to Harness created target groups
elasticloadbalancing:AddTags

# Get lambda function details
lambda:GetFunction

# Create lambda function
lambda:CreateFunction

# Pass role to lambda
iam:PassRole

# Allow lambda Target Group to execute the lambda
lambda:AddPermission

# Add lambda to target group
elasticloadbalancing:RegisterTargets

# Delete lambda while deleting the load balancer
lambda:DeleteFunction

# Delete load balancer (only if triggered from Harness UI)
elasticloadbalancing:DeleteLoadBalancer

# Get target group health check details
elasticloadbalancing:DescribeTargetHealth

# Get listeners of ALB
elasticloadbalancing:DescribeListeners

# Create new listener in ALB if doesn't exist
elasticloadbalancing:CreateListener

# Check existing rules and modify priority if required
elasticloadbalancing:DescribeRules

# Create ALB rule
elasticloadbalancing:CreateRule

# Get tags of rules
elasticloadbalancing:DescribeTags

# Delete target groups
elasticloadbalancing:DeleteTargetGroup

# Delete ALB rule while editing/deleting AutoStopping rules
elasticloadbalancing:DeleteRule

# Modify existing rules priorities
elasticloadbalancing:SetRulePriorities

# Modify target group
elasticloadbalancing:ModifyTargetGroup

# Modify ALB rule
elasticloadbalancing:ModifyRule

# Read cloud watch metrics for traffic detection
cloudwatch:GetMetricStatistics

# Read access log from S3 (only for custom exclusion)
s3:ListBucket
s3:GetObject
s3:ListAllMyBuckets
s3:GetBucketLocation

# Get access logs details from ALB (only for custom exclusion)
elasticloadbalancing:DescribeLoadBalancerAttributes

# Push logs while running the lambda
logs:CreateLogGroup
logs:CreateLogStream
logs:PutLogEvents
```
</details>

<details>
<summary><b>with AutoStopping Proxy</b></summary>

```
//List machine types available for Proxy
ec2:DescribeInstanceTypeOfferings

//List key pairs for Proxy
ec2:DescribeKeyPairs

//Create Proxy VM
ec2:RunInstances

//Permission to read TLS certificate and secret. Needed only if TLS is used.
secretsmanager:GetSecretValue

//Allocate static IP
ec2:AllocateAddress

//List VPCs in create proxy flow
ec2:DescribeVpcs

//List security groups in create proxy flow
ec2:DescribeSecurityGroups

//List subnets for the selected VPC while creating ALB.
ec2:DescribeSubnets

//Delete the Proxy VM while deleting proxy

//Scope of this permission can be reduced to only proxy VMs.
ec2:TerminateInstances

//Describe the image for proxy
ec2:DescribeImages

//Associating address with VM
ec2:AssociateAddress

//Disassociate address while deleting proxy
ec2:DisassociateAddress

//Release address while deleting proxy
ec2:ReleaseAddress

//Modify security group of proxy VM if needed
ec2:ModifyInstanceAttribute
```
</details>

### Auto Scaling Groups
<details>
<summary><b>Schedules Only</b></summary>

```
//List ASG
autoscaling:DescribeAutoScalingGroups

//Set the desired capacity of ASG during warm up and cool down operations
autoscaling:UpdateAutoScalingGroup

//List ASG Policies
autoscaling:DescribePolicies

//Suspend ASG policies during cool down
autoscaling:SuspendProcesses

//Resume ASG policies during warm up
autoscaling:ResumeProcesses
```
</details>

<details>
<summary><b>with AWS ALB</b></summary>

```
//Describe certificates in create ALB flow
acm:ListCertificates

//List VPCs in create ALB flow
ec2:DescribeVpcs

//List security groups in create ALB flow
ec2:DescribeSecurityGroups

//Describe load balancers in create ALB flow
elasticloadbalancing:DescribeLoadBalancers

//Lambda requires a role to execute and push the logs to cloud watch. We have a separate role for that. iam:ListRoles is used in code to list roles and identify the role created for lambda.
iam:ListRoles

//List subnets for the selected VPC while creating ALB.
ec2:DescribeSubnets

//Create ALB. Needed only if customer wants to create ALB from Harness
elasticloadbalancing:CreateLoadBalancer

//Attach security groups to ALB. Needed only if customer wants to create ALB from Harness.
elasticloadbalancing:SetSecurityGroups

//Describe target group. This is used to get details of lambda target group and EC2 target group
elasticloadbalancing:DescribeTargetGroups

//Create lambda target group and health check target group
elasticloadbalancing:CreateTargetGroup

//Add tags to Harness created target groups
elasticloadbalancing:AddTags

//Get lambda function details
lambda:GetFunction

//Create lambda function
lambda:CreateFunction

//We specify the lambda role when we try to create lambda. Create lambda with role in request will succeed only if this permission is present
iam:PassRole

//This is needed to allow the lambda Target Group to execute the lambda.
lambda:AddPermission

//Required to add lambda to target group
elasticloadbalancing:RegisterTargets

//Delete lambda while deleting the load balancer
lambda:DeleteFunction

//Only required if user trigger delete load balancer from Harness UI
elasticloadbalancing:DeleteLoadBalancer

//Get the target group health check details during warm up and to populate health check details in UI while creating rule.
elasticloadbalancing:DescribeTargetHealth

//Get listeners of ALB
elasticloadbalancing:DescribeListeners

//Create new listener in ALB if doesn't exist
elasticloadbalancing:CreateListener

//Needed while creating new rule. We check existing rules and modify priority if required.
elasticloadbalancing:DescribeRules

//Create ALB rule
elasticloadbalancing:CreateRule

//Get tags of rules. ALB rules created by Harness will have Harness specific tags
elasticloadbalancing:DescribeTags

//Delete target groups
elasticloadbalancing:DeleteTargetGroup

//Delete ALB rule while editing/deleting Autostopping rules
elasticloadbalancing:DeleteRule

//Modify existing rules priorities to make sure the ALB rules created by Harness get more priority
elasticloadbalancing:SetRulePriorities

//Modify target group
elasticloadbalancing:ModifyTargetGroup

//Modify ALB rule
elasticloadbalancing:ModifyRule

//Traffic detection read cloud watch metrics to check the usage on a target group.
cloudwatch:GetMetricStatistics

//Need only if custom exclusion is used. This is to read the access log from S3
s3:ListBucket
s3:GetObject
s3:ListAllMyBuckets
s3:GetBucketLocation

//Need only if custom exclusion is used.Needed to get the access logs details from ALB.
elasticloadbalancing:DescribeLoadBalancerAttributes

//Permission assigned to the Lambda. This is to push the logs while running the lambda.
logs:CreateLogGroup
logs:CreateLogStream
logs:PutLogEvents
```
</details>

### RDS Databases
<details>

<summary><b>Schedules only</b></summary>

```
//List RDS instances
rds:DescribeDBInstances

//List RDS clusters
rds:DescribeDBClusters

//List tags associated with RDS
rds:ListTagsForResource

//Start RDS Instance
rds:StartDBInstance

//Start RDS Cluster
rds:StartDBCluster

//Stop RDS Instance
rds:StopDBInstance

//Stop RDS Cluster
rds:StopDBCluster
```
</details>

<details>
<summary><b>with AutoStopping Proxy</b></summary>

```
//List machine types available for Proxy
ec2:DescribeInstanceTypeOfferings

//List key pairs for Proxy
ec2:DescribeKeyPairs

//Create Proxy VM
ec2:RunInstances

//Permission to read TLS certificate and secret. Needed only if TLS is used.
secretsmanager:GetSecretValue

//Allocate static IP
ec2:AllocateAddress

//List VPCs in create proxy flow
ec2:DescribeVpcs

//List security groups in create proxy flow
ec2:DescribeSecurityGroups

//List subnets for the selected VPC while creating ALB.
ec2:DescribeSubnets

//Delete the Proxy VM while deleting proxy

//Scope of this permission can be reduced to only proxy VMs.
ec2:TerminateInstances

//Describe the image for proxy
ec2:DescribeImages

//Associating address with VM
ec2:AssociateAddress

//Disassociate address while deleting proxy
ec2:DisassociateAddress

//Release address while deleting proxy
ec2:ReleaseAddress

//Modify security group of proxy VM if needed
ec2:ModifyInstanceAttribute
```
</details>

### ECS Instances
<details>
<summary><b>Schedules only</b></summary>

```
//List ECS clusters
ecs:ListClusters

//List tags for selecting ECS service by tag
tag:GetResources

//List ECS services
ecs:ListServices

//List tasks for ECS service
ecs:ListTasks

//Describe ECS services
ecs:DescribeServices

//Needed set the desired task count while warming and cooling down
ecs:UpdateService

//Describe ECS Task
ecs:DescribeTaskDefinition

//Describe ECS Tasks
ecs:DescribeTasks
```
</details>

<details>
<summary><b>with AWS ALB</b></summary>

```
//Describe certificates in create ALB flow
acm:ListCertificates

//List VPCs in create ALB flow
ec2:DescribeVpcs

//List security groups in create ALB flow
ec2:DescribeSecurityGroups

//Describe load balancers in create ALB flow
elasticloadbalancing:DescribeLoadBalancers

//Lambda requires a role to execute and push the logs to cloud watch. We have a separate role for that. iam:ListRoles is used in code to list roles and identify the role created for lambda.
iam:ListRoles

//List subnets for the selected VPC while creating ALB.
ec2:DescribeSubnets

//Create ALB. Needed only if customer wants to create ALB from Harness
elasticloadbalancing:CreateLoadBalancer

//Attach security groups to ALB. Needed only if customer wants to create ALB from Harness.
elasticloadbalancing:SetSecurityGroups

//Describe target group. This is used to get details of lambda target group and EC2 target group
elasticloadbalancing:DescribeTargetGroups

//Create lambda target group and health check target group
elasticloadbalancing:CreateTargetGroup

//Add tags to Harness created target groups
elasticloadbalancing:AddTags

//Get lambda function details
lambda:GetFunction

//Create lambda function
lambda:CreateFunction

//We specify the lambda role when we try to create lambda. Create lambda with role in request will succeed only if this permission is present
iam:PassRole

//This is needed to allow the lambda Target Group to execute the lambda.
lambda:AddPermission

//Required to add lambda to target group
elasticloadbalancing:RegisterTargets

//Delete lambda while deleting the load balancer
lambda:DeleteFunction

//Only required if user trigger delete load balancer from Harness UI
elasticloadbalancing:DeleteLoadBalancer

//Get the target group health check details during warm up and to populate health check details in UI while creating rule.
elasticloadbalancing:DescribeTargetHealth

//Get listeners of ALB
elasticloadbalancing:DescribeListeners

//Create new listener in ALB if doesn't exist
elasticloadbalancing:CreateListener

//Needed while creating new rule. We check existing rules and modify priority if required.
elasticloadbalancing:DescribeRules

//Create ALB rule
elasticloadbalancing:CreateRule

//Get tags of rules. ALB rules created by Harness will have Harness specific tags
elasticloadbalancing:DescribeTags

//Delete target groups
elasticloadbalancing:DeleteTargetGroup

//Delete ALB rule while editing/deleting Autostopping rules
elasticloadbalancing:DeleteRule

//Modify existing rules priorities to make sure the ALB rules created by Harness get more priority
elasticloadbalancing:SetRulePriorities

//Modify target group
elasticloadbalancing:ModifyTargetGroup

//Modify ALB rule
elasticloadbalancing:ModifyRule

//Traffic detection read cloud watch metrics to check the usage on a target group.
cloudwatch:GetMetricStatistics

//Need only if custom exclusion is used. This is to read the access log from S3
s3:ListBucket
s3:GetObject
s3:ListAllMyBuckets
s3:GetBucketLocation

//Need only if custom exclusion is used.Needed to get the access logs details from ALB.
elasticloadbalancing:DescribeLoadBalancerAttributes

//Permission assigned to the Lambda. This is to push the logs while running the lambda.
logs:CreateLogGroup
logs:CreateLogStream
logs:PutLogEvents
```
</details>

## 5. Cloud Asset Governance Permissions

The Cloud Asset Governance feature allows you to optimize your cloud spend and avoid unnecessary costs by rightsizing resources and decommissioning unused instances. This feature provides asset management for EC2, EBS, RDS, S3 resources and enables automated actions.

#### Required Permissions

Enable the following permissions in AWS to execute cloud governance rules:


<details>
<summary><b>Click to view Cloud Asset Governance Policy</b></summary>

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Action": [
                "ec2:Describe*",
                "ec2:DeleteSnapshot",
                "ec2:DeleteVolume",
                "ec2:Get*",
                "ec2:ListImagesInRecycleBin",
                "ec2:ListSnapshotsInRecycleBin",
                "elasticbeanstalk:Check*",
                "elasticbeanstalk:Describe*",
                "elasticbeanstalk:List*",
                "elasticbeanstalk:Request*",
                "elasticbeanstalk:Retrieve*",
                "elasticbeanstalk:Validate*",
                "elasticloadbalancing:Describe*",
                "rds:Describe*",
                "rds:List*",
                "autoscaling-plans:Describe*",
                "autoscaling-plans:GetScalingPlanResourceForecastData",
                "autoscaling:Describe*",
                "autoscaling:GetPredictiveScalingForecast",
                "s3:DescribeJob",
                "s3:Get*",
                "s3:List*"
            ],
            "Resource": "*",
            "Effect": "Allow"
        }
    ]
}
```

</details>

:::info

- This is not an exhaustive list; you may require additional permissions to support custom rules.
- A yellow underline in a custom policy indicates that you need permission to support the underlined filters and/or actions.
  :::

## 6. Commitment Orchestrator Permissions

Step 1: Visibility

To enable visibility, in the master account connector, you need to add the following permissions.

```
"ec2:DescribeReservedInstancesOfferings",
"ce:GetSavingsPlansUtilization",
"ce:GetReservationUtilization",
"ec2:DescribeInstanceTypeOfferings",
"ce:GetDimensionValues",
"ce:GetSavingsPlansUtilizationDetails",
"ec2:DescribeReservedInstances",
"ce:GetReservationCoverage",
"ce:GetSavingsPlansCoverage",
"savingsplans:DescribeSavingsPlans",
"organizations:DescribeOrganization"
"ce:GetCostAndUsage"
```


Step 2: Setup flow (to enable actual orchestration)

```
"ec2:PurchaseReservedInstancesOffering",
"ec2:GetReservedInstancesExchangeQuote",
"ec2:DescribeInstanceTypeOfferings",
"ec2:AcceptReservedInstancesExchangeQuote",
"ec2:DescribeReservedInstancesModifications",
"ec2:ModifyReservedInstances"
"ce:GetCostAndUsage"
savingsplans:DescribeSavingsPlansOfferings
savingsplans:CreateSavingsPlan

```


## Troubleshooting

If you come across an error message indicating missing permissions, as displayed in the following screenshot, you need to add the missing permission [here](https://us-east-1.console.aws.amazon.com/iamv2/home#/roles).

<DocImage path={require('./static/asset-governance-test-output-error.png')} width="50%" height="50%" title="Click to view full size image" />

1. Copy the role specified in the error message that requires permission to execute the rule.
2. Enter the role in IAM > Roles search box to filter the roles. The policies are displayed.

<DocImage path={require('./static/aws-missing-permission-role.png')} width="50%" height="50%" title="Click to view full size image" />

3. In the list of policies, select the policy to edit.
   <DocImage path={require('./static/aws-select-policy.png')} width="50%" height="50%" title="Click to view full size image" />

4. In the **Permissions** tab, select **Edit policy**, and then go to the **JSON** tab.

   <DocImage path={require('./static/aws-edit-json.png')} width="50%" height="50%" title="Click to view full size image" />

5. Add the missing permissions. You can use a wildcard (asterisk) to grant multiple permissions. For example, `s3:Get*` permission would allow multiple S3 actions that start with "Get".
6. Save changes.

For more information, go to [Editing IAM policies](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_manage-edit.html).

:::info 
- If you are using permission boundaries to enforce restrictions, ensure that Harness permissions are explicitly allowed to enable the connectors and functionalities to operate correctly.
:::
