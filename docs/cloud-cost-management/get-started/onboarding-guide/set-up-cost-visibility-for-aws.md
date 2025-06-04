---
title: Set Up AWS for Cloud Cost Management
description: Learn how to connect your AWS account to Harness Cloud Cost Management for complete cost visibility, governance, and optimization.
# sidebar_position: 2
helpdocs_topic_id: 80vbt5jv0q
helpdocs_category_id: 7vy86n7cws
helpdocs_is_private: false
helpdocs_is_published: true
redirect_from:
  - /docs/cloud-cost-management/getting-started-ccm/set-up-cloud-cost-management/set-up-cost-visibility-for-aws
---

# Getting Started with AWS Cost Management

![AWS Cost Management Overview](./static/aws-ccm-overview.png)

## What You'll Learn

This guide will help you connect your AWS account to Harness Cloud Cost Management (CCM) to gain complete visibility into your cloud costs and unlock powerful optimization features. By the end of this guide, you'll be able to:

- **Monitor and analyze** costs across all your AWS services (EC2, S3, RDS, Lambda, and more)
- **Optimize resources** with intelligent recommendations and AutoStopping rules
- **Govern cloud spending** with budgets and automated policies
- **Detect anomalies** in your cloud spending patterns

:::tip Time to Value
After completing the setup, it takes approximately 24 hours for your AWS cost data to be processed and available for analysis in Harness CCM.
:::

## Before You Begin

### AWS Account Structure

Before setting up Harness CCM, it's important to understand your AWS account structure. Your setup will differ depending on whether you have a single AWS account or multiple accounts with or without consolidated billing.

![AWS Account Structure](./static/aws-account-structure.png)

### Connector Requirements

Harness uses AWS connectors to securely access your AWS resources and cost data. Here's what you need to know:

| Account Structure | Cost Visibility | Resource Inventory & AutoStopping |
|-------------------|----------------|----------------------------------|
| **Single Account** | One connector | Same connector |
| **Multiple Accounts with Consolidated Billing** | One connector for the management account | One additional connector for each member account |
| **Multiple Accounts without Consolidated Billing** | One connector per account | Same connectors |

:::note Important
- AWS connectors in Harness CCM are created at the Account level only
- The same connector cannot be used in both NextGen and FirstGen Harness
:::

## Understanding AWS Cost and Usage Reports (CUR)

AWS Cost and Usage Reports (CUR) are the foundation of cost visibility in Harness CCM. These reports provide detailed data about your AWS usage and costs, which Harness processes to give you comprehensive insights.

![AWS CUR Overview](./static/aws-cur-overview.png)

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

### CUR Setup Based on Your AWS Account Structure

<Tabs queryString="tab-number">
<TabItem value="1" label="Single AWS Account">

#### What You Need

✅ One Cost and Usage Report (CUR) for your AWS account

✅ One AWS connector in Harness configured with your CUR

![Single Account Setup](./static/aws-single-account.png)

</TabItem>

<TabItem value="2" label="Multiple Accounts with Consolidated Billing">

#### What You Need

✅ One Cost and Usage Report (CUR) for your management account only

✅ For Cost Visibility: One AWS connector for your management account

✅ For Inventory Management & AutoStopping: Additional connectors for each member account

![Consolidated Billing Setup](./static/aws-consolidated-billing.png)

:::tip
When creating additional connectors for member accounts:
- **Using UI**: Configure all connectors with the same management account CUR
- **Using API**: You can omit billing information altogether
:::

**Learn more about [AWS consolidated billing](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/useconsolidatedbilling-procedure.html)**

</TabItem>

<TabItem value="3" label="Multiple Accounts without Consolidated Billing">

#### What You Need

✅ One Cost and Usage Report (CUR) for each AWS account

✅ One AWS connector for each AWS account, configured with its respective CUR

![Multiple Accounts Setup](./static/aws-multiple-accounts.png)

</TabItem>
</Tabs>

## Step-by-Step Setup Guide

### Step 1: Create an AWS Connector

The first step is to create a connector between Harness and your AWS account. This secure connection allows Harness to access your cost data and resources.

![AWS Connector Setup](./static/aws-connector-setup.png)

<Tabs queryString="tab-number">
<TabItem value="4" label="Option 1: From Account Settings">

1. Navigate to **Account Resources** > **Connectors**
2. Click **+ New Connector**
3. Under **Cloud Costs**, select **AWS**

</TabItem>
<TabItem value="5" label="Option 2: From Cloud Costs Module">

1. Navigate to **Cloud Costs** > **Setup** > **Cloud Integration**
2. Click **New Cluster/Cloud account**
3. Select **AWS**

</TabItem>
</Tabs>

### Step 2: Complete the AWS Connector Setup Wizard

The AWS Connector setup wizard will guide you through four simple steps:

#### 1. Overview

![AWS Connector Overview](./static/aws-connector-overview.png)

In this first step, you'll provide basic information about your AWS account:

| Field | What to Enter | Why It's Important |
|-------|---------------|--------------------|
| **Connector Name** | A descriptive name for this connection | This name will appear throughout Harness to identify this AWS account |
| **AWS Account ID** | Your 12-digit AWS account ID | Identifies which AWS account to connect to |
| **Is this an AWS GovCloud account?** | Select Yes only if using AWS GovCloud | GovCloud requires special configuration |

:::tip Finding Your AWS Account ID
Not sure where to find your AWS account ID? You can find it in the AWS Management Console under your account name or by following [AWS's guide](https://docs.aws.amazon.com/IAM/latest/UserGuide/console_account-alias.html#FindingYourAWSId).
:::

After completing these fields, click **Continue** to proceed to the next step.

#### 2. Cost and Usage Report Setup

![AWS CUR Setup](./static/aws-cur-setup.png)

This step involves two parts:

##### Part A: Create a Cost and Usage Report in AWS

1. Click the **Launch AWS Console** button in the Harness UI
2. In the AWS console that opens, follow these steps:

   a. Click **Create Report**
   
   b. In **Specify report details**:
   * **Report name**: Enter a descriptive name (copy this for later use)
   * **Additional report details**: 
     * ✅ **Include resource IDs** (required)
     * ❌ **Split cost allocation data** (leave unchecked)
     * ✅ **Refresh automatically** (required)
   * Click **Next**
   
   c. In **Set delivery options**:
   * **S3 bucket**: Select existing or create new (copy bucket name for later use)
   * **Path prefix**: Enter any prefix (e.g., "harness-ccm")
   * **Time granularity**: Select **Hourly**
   * **Report versioning**: Select **Overwrite existing report**
   * **Compression**: Select **GZIP**
   * Leave all data integration options unchecked (Athena, Redshift, QuickSight)
   * Click **Next**
   
   d. Review your settings and click **Create Report**

##### Part B: Connect the Report to Harness

Return to the Harness UI and enter:

| Field | What to Enter |
|-------|---------------|
| **Cost and Usage Report Name** | The exact report name you created in AWS |
| **Cost and Usage S3 Bucket Name** | The S3 bucket name where the report is stored |

Click **Continue** to proceed to the next step.

:::note
Creating a new CUR in AWS typically takes 6-8 hours to generate data. During this period, Harness may display a message that it cannot find a CUR file.
:::

#### 3. Choose Your CCM Features

![AWS CCM Features](./static/aws-ccm-features.png)

In this step, you'll select which Cloud Cost Management features you want to enable. Each feature provides different capabilities and requires specific AWS permissions.

:::tip
The permissions required for your AWS cross-account role will be automatically configured based on your selections here.
:::

##### Available Features

<Tabs>
<TabItem value="cost-visibility" label="Cost Visibility (Required)">

![Cost Visibility](./static/aws-cost-visibility.png)

**What it does:**
- Provides detailed insights into your AWS costs by services, accounts, regions, and more
- Enables root cost analysis using customizable perspectives
- Detects cost anomalies and alerts you to unusual spending patterns
- Helps establish budgets and forecasts for better governance
- Sends notifications via email and Slack when thresholds are exceeded

**Requirements:**
- Access to your AWS Cost and Usage Report (CUR)

**Learn more:**
- For Kubernetes cost visibility, see [Set Up Cloud Cost Management for Kubernetes](set-up-cost-visibility-for-kubernetes.md)

</TabItem>

<TabItem value="inventory" label="Resource Inventory Management (Optional)">

![Resource Inventory](./static/aws-resource-inventory.png)

**What it does:**
- Provides detailed visibility into your EC2, EBS volumes, and ECS costs
- Breaks down costs by ECS cluster, service, task, and launch type (EC2, Fargate)
- Shows EC2 instance utilization metrics for optimization opportunities
- Provides specialized dashboards for EC2 inventory costs, orphaned EBS volumes, and snapshots

**Perfect for:**
- Finance teams needing to understand resource utilization across the organization
- Engineers looking to identify underutilized resources

</TabItem>

<TabItem value="autostopping" label="Optimization by AutoStopping (Optional)">

![AutoStopping](./static/aws-autostopping.png)

**What it does:**
- Automatically stops idle AWS instances and auto-scaling groups to reduce costs
- Orchestrates VMs and ASGs based on usage patterns
- Runs workloads on fully orchestrated spot instances for maximum savings
- Provides detailed savings visibility and reporting

**Learn more:**
- [Create AutoStopping Rules for AWS](/docs/cloud-cost-management/use-ccm-cost-optimization/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/create-auto-stopping-rules/autostopping-dashboard)

</TabItem>

<TabItem value="governance" label="Cloud Governance (Optional)">

![Cloud Governance](./static/aws-governance.png)

**What it does:**
- Optimizes cloud spend by identifying rightsizing opportunities
- Helps decommission unused or underutilized resources
- Provides comprehensive asset management for EC2, EBS, RDS, and S3
- Enables automated actions based on governance policies

**Learn more:**
- [Asset Governance](../../5-use-ccm-cost-governance/asset-governance/1-asset-governance.md)

</TabItem>
</Tabs>

After selecting your desired features, click **Continue** to proceed to the next step.

#### 4. Create Cross Account Role

![AWS Cross Account Role](./static/aws-cross-account-role.png)

In this step, you'll create a secure cross-account role that allows Harness to access your AWS account with the minimum required permissions based on the features you selected.

##### Step-by-Step Instructions

1. In the Harness UI, click the **Launch Template on AWS console** button

2. In the AWS CloudFormation console that opens:
   * Review the stack information (pre-filled based on your selections)
   * At the bottom of the page, check the acknowledgment box that says "I acknowledge that AWS CloudFormation might create IAM resources"
   * Click **Create stack**
   
   :::caution
   Do not modify any values on this page as they are specifically configured based on your feature selections.
   :::

3. Wait for the stack creation to complete (status will change to "CREATE_COMPLETE")

4. Navigate to the **Outputs** tab of your stack

5. Find and copy the **Value** of the **CrossAccountRoleArn** key
   
   ![Cross Account Role ARN](./static/aws-role-arn.png)

6. Return to the Harness UI and enter:

   | Field | What to Enter | Notes |
   |-------|---------------|-------|
   | **Cross Account Role ARN** | The ARN value you copied from AWS | This connects Harness to your AWS account |
   | **External ID** | Leave as is | If creating multiple connectors via API later, copy this value |

7. Click **Save and Continue**

#### 5. Connection Test

![Connection Test](./static/aws-connection-test.png)

In this final step, Harness will verify that it can successfully connect to your AWS account using the provided credentials.

* If the connection is successful, you'll see green checkmarks next to each verification item
* Click **Finish** to complete the setup

:::note
If you just created your Cost and Usage Report, Harness may display a message that it cannot find a CUR file. This is normal, as it typically takes 6-8 hours for AWS to generate the first CUR data.
:::

## Advanced: Setting Up Multiple AWS Accounts at Scale

![Multiple AWS Accounts Setup](./static/aws-multiple-accounts-setup.png)

If you manage multiple AWS accounts, Harness provides an efficient way to set up CCM across your entire organization using APIs and AWS StackSets. This approach is especially useful for large AWS organizations with many member accounts.

:::tip
Before using this method, first create a connector manually through the UI for your management account as described in the previous sections.
:::

### Three-Step Process for Multi-Account Setup

<Tabs>
<TabItem value="step1" label="Step 1: Create a Harness Service Account">

#### Create API Access in Harness

![Harness Service Account](./static/aws-service-account.png)

1. In Harness, navigate to **Account Settings** > **Access Control** > **Service Accounts**

2. Click **+ New Service Account** and configure:
   * **Name**: A descriptive name like "CCM AWS Connector Creator"
   * **Description**: Purpose of this service account
   * **Role Assignment**: Select **Admin** role for either:
     * **All Account Level Resources**, or
     * **All Resources Including Child Scopes**

3. Click **Save**

4. Create an API key for this service account:
   * Navigate to the service account you just created
   * Click **API Keys** tab
   * Click **+ New API Key**
   * Provide a name and expiration date
   * Copy and securely store the generated API key

**Learn more:** [Managing Service Accounts](/docs/platform/role-based-access-control/add-and-manage-service-account) | [Creating API Keys](/docs/platform/automation/api/add-and-manage-api-keys#create-service-account-api-keys-and-tokens)

</TabItem>

<TabItem value="step2" label="Step 2: Create AWS StackSet">

#### Deploy IAM Roles Across Your AWS Organization

![AWS StackSet](./static/aws-stackset.png)

1. In your AWS management account, open the [CloudFormation StackSets console](https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacksets/create)

2. In the **Choose a template** step:
   * **Permissions**: Configure as needed for your AWS policies
   * **Prerequisite**: Select **Template is ready**
   * **Specify template**: Select **Amazon S3 URL**
   * **Amazon S3 URL**: Enter:
     ```
     https://continuous-efficiency-prod.s3.us-east-2.amazonaws.com/setup/ngv1/HarnessAWSTemplate.yaml
     ```
   * Click **Next**

3. In the **Specify StackSet details** step:

   | Setting | Value | Description |
   |---------|-------|-------------|
   | **StackSet name** | `harness-ce-iam-stackset` | Or another descriptive name |
   | **BillingEnabled** | `false` | Set to true only if needed |
   | **BucketName** | Leave empty | No need to specify |
   | **EventsEnabled** | `true` | Required for inventory management |
   | **ExternalId** | Copy from Harness | The External ID from your AWS connector |
   | **GovernanceEnabled** | `true` or `false` | Enable if using Cloud Governance |
   | **OptimizationEnabled** | `true` or `false` | Enable if using AutoStopping |
   | **RoleName** & **LambdaExecutionRoleName** | Leave as default | Unless your policies require specific names |

   * Click **Next**

4. In **Configure StackSet options**:
   * Set **Managed execution** to **Active**
   * Click **Next**

5. In **Set deployment options**:
   * **Add stacks to StackSet**: Select **Deploy new stacks**
   * **Deployment locations**: Configure target accounts/OUs
   * **Specify regions**: Select regions to deploy to
   * **Region Concurrency**: Select **Sequential**
   * Click **Next**

6. Review your settings, check the acknowledgment box, and click **Submit**

</TabItem>

<TabItem value="step3" label="Step 3: Create AWS Connectors via API">

#### Automate Connector Creation for Member Accounts

![API Connector Creation](./static/aws-api-connector.png)

Use the Harness API to create AWS connectors for each member account. Here's a sample cURL command:

```bash
curl -i -X POST 'https://app.harness.io/gateway/ng/api/connectors' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: <API_TOKEN>' \
  -d '{
  "connector":{
    "name":"<CONNECTOR_NAME>",
    "identifier":"<CONNECTOR_ID>",
    "type":"CEAws",
    "spec":{
      "crossAccountAccess":{
        "crossAccountRoleArn":"<CROSS_ACCOUNT_ROLE_ARN>",
        "externalId":"<EXTERNAL_ID>"
      },
      "awsAccountId":"<AWS_ACCOUNT_ID>",
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

#### Required Values

| Placeholder | Description | Example |
|-------------|-------------|----------|
| `<API_TOKEN>` | Your Harness service account API key | `harness_api_key_12345...` |
| `<CONNECTOR_NAME>` | Descriptive name for the connector | `AWS Production Account` |
| `<CONNECTOR_ID>` | Unique ID following [naming rules](/docs/platform/references/entity-identifier-reference/) | `aws_prod_account` |
| `<CROSS_ACCOUNT_ROLE_ARN>` | ARN of the IAM role created by StackSet | `arn:aws:iam::123456789012:role/HarnessRole` |
| `<EXTERNAL_ID>` | External ID from your first connector | `harness:123456` |
| `<AWS_ACCOUNT_ID>` | 12-digit AWS account ID | `123456789012` |
| `<FEATURES>` | Comma-separated list of features | `"VISIBILITY", "OPTIMIZATION", "GOVERNANCE"` |

**Learn more:** [Harness API Documentation](https://apidocs.harness.io/tag/Connectors#operation/createConnector)

</TabItem>
</Tabs>

:::tip Automation Opportunity
For organizations with many AWS accounts, consider creating a script to automate the API calls for each member account.
:::

## Enabling EC2 Optimization Recommendations

![EC2 Recommendations](./static/aws-ec2-recommendations.png)

To maximize your cost savings, Harness CCM can leverage AWS EC2 rightsizing recommendations. This feature helps you identify over-provisioned instances and provides specific recommendations to optimize your EC2 fleet.

### Prerequisites

- AWS Cost Explorer must be enabled in your account
- EC2 recommendations must be enabled in AWS Cost Explorer preferences
- The IAM role used by Harness must have the required permissions

### Step-by-Step Setup Guide

<Tabs>
<TabItem value="new" label="New Customers">

If you're setting up a new AWS connector, the required permissions are automatically included when you select the **Resource Inventory Management** feature during connector setup.

</TabItem>

<TabItem value="existing" label="Existing Customers">

If you already have an AWS connector set up, you'll need to add the required permission:

1. In the AWS console, navigate to **IAM** > **Roles**
2. Find and select the IAM role used by your Harness AWS connector
3. Locate the **HarnessEventsMonitoringPolicy** attached to this role
4. Edit the policy and add the following permission:
   ```json
   "ce:GetRightsizingRecommendation"
   ```
5. Save your changes

</TabItem>
</Tabs>

### Enabling Recommendations in AWS

1. In your AWS console, navigate to the **Cost Explorer** service

   <DocImage path={require('./static/ec2-recom-aws-screen-1.png')} width="60%" height="60%" title="AWS Cost Explorer" />

2. Click **Preferences** in the left navigation panel

3. In the **Recommendations** section, enable:
   * ✅ **Receive Amazon EC2 resource recommendations**
   * ✅ **Recommendations for linked accounts** (if you have multiple AWS accounts)

   <DocImage path={require('./static/ec2-recom-aws-screen-2.png')} width="60%" height="60%" title="EC2 Recommendations Settings" />

4. Click **Save preferences**

### Verifying Your Setup

To confirm that recommendations are properly enabled:

1. Open AWS CloudShell (or use the AWS CLI locally)

2. Run the following command:
   ```bash
   aws ce get-rightsizing-recommendation --service AmazonEC2
   ```

3. If successful, you'll see recommendation data in the response

4. If recommendations aren't enabled, you'll see this error:
   ```
   An error occurred (AccessDeniedException) when calling the GetRightsizingRecommendation operation: 
   Rightsizing EC2 recommendation is an opt-in only feature. You can enable this feature from 
   the PAYER account's Cost Explorer Preferences page. Normally it may take up to 24 hours 
   in order to generate your rightsizing recommendations.
   ```

:::tip For Complete Recommendations
Install the Amazon CloudWatch agent on your EC2 instances to enable memory metrics. This provides more accurate rightsizing recommendations based on both CPU and memory utilization.
:::

## Reference - AWS access permissions

CCM requires the following permissions which are automatically created via a StackSet based on the features you select during configuration.

> **☆ NOTE —** If you don't have access to create a cost and usage report or run a CloudFormation template, contact your IT or security teams to provide the required permissions.

### Cost visibility

The cost visibility policy grants the following permissions:

- List CUR reports and visibility into the organization's Structure
- Get objects from the S3 bucket configured in the CUR
- Put objects into the Harness S3 bucket

```
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

### Resource inventory management

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

### Insight into RDS instances

This feature provides visibility into your EC2, EBS volumes, and ECS costs. The insights provided by inventory management can be consumed by finance teams to understand resource utilization across the board.

- Breakdown by ECS cluster cost, Service, Task, and Launch Type (EC2, Fargate).
- Insight into EC2 instances and their utilization.
- Access to AWS EC2 Inventory Cost and EBS Volumes and Snapshots inventory dashboards. For more information, see [View AWS EC2 Inventory Cost Dashboard](../../3-use-ccm-cost-reporting/6-use-ccm-dashboards/view-aws-ec-2-inventory-cost-dashboard.md), [Orphaned EBS Volumes and Snapshots Dashboard](../../3-use-ccm-cost-reporting/6-use-ccm-dashboards/orphaned-ebs-volumes-and-snapshots-dashboard.md), and [View AWS EC2 Instance Metrics Dashboard](../../3-use-ccm-cost-reporting/6-use-ccm-dashboards/view-aws-ec-2-instance-metrics.md).

### AutoStopping rules

The AutoStopping policy performs the following actions:

- Create an IAM role for optimization
- Permissions for creating AutoStopping Rules

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

### Cloud asset governance rules

Enable the following permissions in AWS to execute cloud governance rules:

```
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

:::info

- This is not an exhaustive list; you may require additional permissions to support custom rules.
- A yellow underline in a custom policy indicates that you need permission to support the underlined filters and/or actions.
  :::

#### Add permissions

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

## Next steps

- [Create Cost Perspectives](../../3-use-ccm-cost-reporting/1-ccm-perspectives/1-create-cost-perspectives.md)
- [Analyze Cost for AWS Using Perspectives](../../3-use-ccm-cost-reporting/3-root-cost-analysis/analyze-cost-for-aws.md)
