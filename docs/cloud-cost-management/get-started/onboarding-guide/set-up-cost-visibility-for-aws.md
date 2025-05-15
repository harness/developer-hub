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


:::note 

After enabling CCM, it takes about 24 hours for the data to be available for viewing and analysis.

:::

## AWS Connector requirements

- For CCM, AWS connectors are available only at the Account level in Harness.
- If you have multiple AWS accounts, you may need to create multiple AWS connectors depending on desired functionality:
  - **Cost Visibility**: You may need to create one or multiple AWS connectors depending on the availability of consolidated billing. Go to **Cost and Usage Reports (CUR)** for more information.
  - **Resource Inventory Management**: You need to create an AWS connector for each account.
  - **Optimization by AutoStopping**: You need to create an AWS connector for each account.

## Cost and Usage Reports (CUR)

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

## Quick Start Guide

### Step 1: Determine Your AWS Account Structure

Choose the scenario that matches your AWS environment:

**Single AWS Account**
- You'll need to create one Cost and Usage Report (CUR) and one AWS connector.

**Multiple Accounts with Consolidated Billing**
- Create one CUR for the management account
- Create one AWS connector for cost visibility
- Create additional connectors for each member account if you need inventory management or AutoStopping

**Multiple Accounts without Consolidated Billing**
- Create a CUR for each AWS account
- Create an AWS connector for each account


### Step 2: Create AWS Connector in Harness

<Tabs queryString="setup-step">
<TabItem value="1" label="Step 1: Access">

In Harness, go to:
- **Account Resources > Connectors > + New Connector > AWS** (from Account Settings)

OR

- **Setup > Cloud Integration > New Cluster/Cloud account > AWS** (from Cloud Costs)

</TabItem>

<TabItem value="2" label="Step 2: Overview">

Complete the **Overview** section:
- Enter a connector name
- Enter your AWS account ID. To find your AWS account ID, see [Finding your AWS account ID](https://docs.aws.amazon.com/IAM/latest/UserGuide/console_account-alias.html#FindingYourAWSId).
- Indicate if it's a GovCloud account
- Click **Continue**

</TabItem>

<TabItem value="3" label="Step 3: Cost and Usage Report">

Launch the AWS console and perform the following steps:

1. Log into your AWS account if not already logged in.
2. Select **Create Report**.
3. In the **Specify report details** step, enter the following values, and then select **Next**.

| **Field**                      | **Description**                                                                                                                                 |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| **Report Name**                | Enter a name for the report. Make sure to copy this name, as you will need it to continue configuring the Harness connector in the steps below. |
| **Include resource IDs**       | Make sure this option is selected.                                                                                                              |
| **Split cost allocation data** | Make sure this option is unchecked.                                                                                                             |
| **Refresh automatically**      | Make sure this option is selected.                                                                                                              |

4. In the **Set delivery options** step, enter the following values, and then select **Next**.

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

5. In the **Review and create** step, select **Create Report**.

6. In the Harness connector dialog, enter the following values, and then select **Continue**.

| **Field**                         | **Description**                              |
| --------------------------------- | -------------------------------------------- |
| **Cost and Usage Report Name**    | Enter the report name you copied earlier.    |
| **Cost and Usage S3 Bucket Name** | Enter the bucket name you specified earlier. |

</TabItem>

<TabItem value="4" label="Step 4: Choose Requirements">

- **Cost Visibility** is set by default for non-GovCloud accounts. For GovCloud accounts, **AutoStopping** is set by default.
- Select other features as needed and then click on **Continue**:
  - Resource Inventory Management
  - Optimization by AutoStopping
  - Cloud Governance
  - Commitment Orchestrator

Details about the features are listed below. Note that the permissions required as part of the AWS cross-account role will be based on your selections. Those permissions are listed out in the **Reference - AWS Access Permission** section below.

| **Features** | **Capabilities** | **Required Permissions** | **Documentation** |
|-------------|----------------|------------------------|------------------|
| **Cost Visibility** <br/>(Required) | • Insights into AWS costs by services, accounts, etc.<br/>• Root cost analysis using cost perspectives<br/>• Cost anomaly detection<br/>• Governance using budgets and forecasts<br/>• Alert users using Email and Slack notification<br/><br/>*This feature provides cost insights derived from the CUR.* | *See Reference section below* | • [Create Cost Perspectives](../../3-use-ccm-cost-reporting/1-ccm-perspectives/1-create-cost-perspectives.md)<br/>• [Analyze Cost for AWS](../../3-use-ccm-cost-reporting/3-root-cost-analysis/analyze-cost-for-aws.md)<br/>• [Set Up Budgets](../../4-use-ccm-budget-and-forecasting/1-ccm-budgets/1-create-budget.md)<br/>• [Set Up Forecasts](../../4-use-ccm-budget-and-forecasting/2-ccm-forecasting/1-create-forecast.md) |
| **Resource Inventory Management** <br/>(Optional) | • Breakdown by ECS cluster cost, Service, Task, and Launch Type<br/>• Insight into EC2 instances and their utilization<br/>• Access to AWS EC2 Inventory Cost and EBS Volumes dashboards<br/><br/>*Helps Finance teams understand resource utilization.* | *See Reference section below* | • [View AWS EC2 Inventory Cost Dashboard](../../3-use-ccm-cost-reporting/6-use-ccm-dashboards/view-aws-ec-2-inventory-cost-dashboard.md)<br/>• [Orphaned EBS Volumes Dashboard](../../3-use-ccm-cost-reporting/6-use-ccm-dashboards/orphaned-ebs-volumes-and-snapshots-dashboard.md)<br/>• [View AWS EC2 Instance Metrics](../../3-use-ccm-cost-reporting/6-use-ccm-dashboards/view-aws-ec-2-instance-metrics.md) |
| **Optimization by AutoStopping** <br/>(Optional) | • Orchestrate VMs and ASGs based on idleness<br/>• Run workloads on fully orchestrated spot instances<br/>• Granular savings visibility | *See Reference section below* | • [Create AutoStopping Rules for AWS](/docs/cloud-cost-management/use-ccm-cost-optimization/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/create-auto-stopping-rules/autostopping-dashboard)<br/>• [AutoStopping Dashboard](/docs/cloud-cost-management/use-ccm-cost-optimization/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/view-auto-stopping-dashboard) |
| **Cloud Governance** <br/>(Optional) | • Asset Management (EC2, EBS, RDS, S3)<br/>• Automated Actions<br/><br/>*Helps optimize cloud spend and avoid unnecessary costs.* | *See Reference section below* | • [Asset Governance](../../5-use-ccm-cost-governance/asset-governance/1-asset-governance.md)<br/>• [Create Governance Rules](../../5-use-ccm-cost-governance/asset-governance/2-create-governance-rules.md) |

</TabItem>

<TabItem value="5" label="Step 5: AutoStopping Granular Permissions">

If **AutoStopping** is selected, you will be prompted to select the services and features for enabling AutoStopping:

- Select which AWS services you want to enable AutoStopping for
- Configure default settings for your AutoStopping rules
- Review estimated savings potential

</TabItem>

<TabItem value="6" label="Step 6: Cross Account Role">

Harness uses the secure cross-account role to access your AWS account. The role includes a restricted policy based on the features selected above.

1. In **Create Cross Account Role**, select **Launch Template on AWS console**.

Perform the following steps in the AWS Console.

2. In **Quick create stack**, in **Capabilities**, select the acknowledgment, and then select **Create stack**.
   > **☆ NOTE** - The values on this page are based on your previous selections. Do not modify any values before creating the stack.
3. In the stack's page, go to the **Outputs** tab and copy the **Value** of **CrossAccountRoleArn Key**.

   ![](./static/set-up-cost-visibility-for-aws-36.png)

4. In the Harness connector dialog, enter the following values, and then select **Save and Continue**.

| **Field**                  | **Description**                                                                                                                            |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **Cross Account Role ARN** | Enter the value that you copied in step 3.                                                                                                 |
| **External ID**            | Do not modify. If you intend to create multiple AWS connectors via API, be sure to copy this value as you will need to reference it later. |

</TabItem>

<TabItem value="7" label="Step 7: Connection Test">

The connection is validated and verified in this step. After successful validation, select **Finish**.

:::important
Creating a new CUR (Cost and Usage Report) in AWS typically takes 6-8 hours. During this period, you might encounter an error message stating that Harness CCM is unable to find a CUR file.
:::

</TabItem>
</Tabs>

## Create Connectors for multiple AWS accounts

Harness CCM also provides the ability to create connectors via API using a StackSet configured at the management account. It involves the following steps:

- Create a Service Account and API Key in Harness
- Create a StackSet in AWS
- Create an AWS Connector via API (performed once for each AWS account)

> **☆ NOTE —** You should manually create a connector via the UI for the management account before using the API method described here to create connectors for the member accounts.

### Create a Service Account and API key in Harness

1. At the Account level, [create a service account](/docs/platform/role-based-access-control/add-and-manage-service-account) with the **Admin** role for **All Account Level Resources** or **All Resources Including Child Scopes**.
2. [Create a service account token](/docs/platform/automation/api/add-and-manage-api-keys#create-service-account-api-keys-and-tokens). Save the API Key, which will be used when creating AWS connectors via the API below.

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
| **Region Concurrency**     | Select **Sequential**.                                                   |

6. In the **Review** step, select the acknowledgment, and then select **Submit**.

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

:::note
## Enable EC2 recommendations

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
:::


## Reference - AWS Access Permissions

CCM requires the following permissions which are automatically created via a StackSet based on the features you select during configuration.

> **☆ NOTE —** If you don't have access to create a cost and usage report or run a CloudFormation template, contact your IT or security teams to provide the required permissions.

### Cost Visibility

The cost visibility policy grants the following permissions:

- List CUR reports and visibility into the organization's Structure
- Get objects from the S3 bucket configured in the CUR
- Put objects into the Harness S3 bucket

<details>
<summary>Click to view required permissions</summary>

```json
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
</details>

### Resource Inventory Management

The inventory management policy performs the following actions:

- ECS Visibility - For Granular Cluster Cost Breakdown
- EC2, EBS, RDS Visibility - Inventory Management

<details>
<summary>Click to view required permissions</summary>

```json
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

</details>

### AutoStopping rules

The AutoStopping policy performs the following actions:

- Create an IAM role for optimization
- Permissions for creating AutoStopping Rules

:::note
Starting April 2025, for new connectors, **AutoStopping Granular Permissions** are required to be set up.
For older connectors, you will have an option to set up granular permissions or not.
:::

#### For connectors older than April 2025
<details>
<summary>Required Permissions</summary>


```json
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

```json
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

```json
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

</details>

#### For connectors newer than April 2025

<details>
<summary>EC2 Instances</summary>

**schedules only**

| Description | Permission |
|-------------|------------|
| List VMs in Harness UI for rule creation and in rule details page. This will be used in other operations while starting and stopping the VM. | ec2:DescribeInstances |
| Create tags on the EC2 while creating an Autostopping rule. | ec2:CreateTags |
| Start EC2 | ec2:StartInstances |
| Stop EC2 | ec2:StopInstances |

**Spot Orchestration**

<table>
<tr>
<th>Operation</th>
<th>Required Permissions</th>
</tr>
<tr>
<td>Creating Snapshot for Spot VM</td>
<td>

- `ec2:DescribeVolumes`
- `ec2:CreateImage`
- `ec2:DescribeImages`

</td>
</tr>
<tr>
<td>Terminating Spot VMs during cool down</td>
<td>

- `ec2:TerminateInstances`

</td>
</tr>
<tr>
<td>Deleting snapshots after removing AutoStopping rule</td>
<td>

- `ec2:DeregisterImage`
- `ec2:DeleteSnapshot`

</td>
</tr>
<tr>
<td>Creating spot VM during warm up</td>
<td>

- `ec2:RequestSpotInstances`
- `ec2:DescribeSpotInstanceRequests`
- `ec2:DescribeAddresses`

</td>
</tr>
<tr>
<td>Creating on-demand instance as fallback</td>
<td>

- `ec2:RunInstances`

</td>
</tr>
</table>

**With AWS ALB**

<table>
<tr>
<th>Description</th>
<th>Required Permissions</th>
</tr>
<tr>
<td>Describe certificates in create ALB flow</td>
<td><code>acm:ListCertificates</code></td>
</tr>
<tr>
<td>List VPCs in create ALB flow</td>
<td><code>ec2:DescribeVpcs</code></td>
</tr>
<tr>
<td>List security groups in create ALB flow</td>
<td><code>ec2:DescribeSecurityGroups</code></td>
</tr>
<tr>
<td>Describe load balancers in create ALB flow</td>
<td><code>elasticloadbalancing:DescribeLoadBalancers</code></td>
</tr>
<tr>
<td>Lambda requires a role to execute and push logs to CloudWatch. Used to list roles and identify the role created for lambda.</td>
<td><code>iam:ListRoles</code></td>
</tr>
<tr>
<td>List subnets for the selected VPC while creating ALB</td>
<td><code>ec2:DescribeSubnets</code></td>
</tr>
<tr>
<td>Create ALB (only if customer wants to create ALB from Harness)</td>
<td><code>elasticloadbalancing:CreateLoadBalancer</code></td>
</tr>
<tr>
<td>Attach security groups to ALB</td>
<td><code>elasticloadbalancing:SetSecurityGroups</code></td>
</tr>
<tr>
<td>Get details of lambda target group and EC2 target group</td>
<td><code>elasticloadbalancing:DescribeTargetGroups</code></td>
</tr>
<tr>
<td>Create lambda target group and health check target group</td>
<td><code>elasticloadbalancing:CreateTargetGroup</code></td>
</tr>
<tr>
<td>Add tags to Harness created target groups</td>
<td><code>elasticloadbalancing:AddTags</code></td>
</tr>
<tr>
<td>Get lambda function details</td>
<td><code>lambda:GetFunction</code></td>
</tr>
<tr>
<td>Create lambda function</td>
<td><code>lambda:CreateFunction</code></td>
</tr>
<tr>
<td>Pass role when creating lambda with role in request</td>
<td><code>iam:PassRole</code></td>
</tr>
<tr>
<td>Allow the lambda Target Group to execute the lambda</td>
<td><code>lambda:AddPermission</code></td>
</tr>
<tr>
<td>Add lambda to target group</td>
<td><code>elasticloadbalancing:RegisterTargets</code></td>
</tr>
<tr>
<td>Delete lambda while deleting the load balancer</td>
<td><code>lambda:DeleteFunction</code></td>
</tr>
<tr>
<td>Delete load balancer (only required if user triggers delete from Harness UI)</td>
<td><code>elasticloadbalancing:DeleteLoadBalancer</code></td>
</tr>
<tr>
<td>Get target group health check details during warm up and for UI</td>
<td><code>elasticloadbalancing:DescribeTargetHealth</code></td>
</tr>
<tr>
<td>Get listeners of ALB</td>
<td><code>elasticloadbalancing:DescribeListeners</code></td>
</tr>
<tr>
<td>Create new listener in ALB if doesn't exist</td>
<td><code>elasticloadbalancing:CreateListener</code></td>
</tr>
<tr>
<td>Check existing rules for priority management</td>
<td><code>elasticloadbalancing:DescribeRules</code></td>
</tr>
<tr>
<td>Create ALB rule</td>
<td><code>elasticloadbalancing:CreateRule</code></td>
</tr>
<tr>
<td>Get tags of rules (Harness-created ALB rules have specific tags)</td>
<td><code>elasticloadbalancing:DescribeTags</code></td>
</tr>
<tr>
<td>Delete target groups</td>
<td><code>elasticloadbalancing:DeleteTargetGroup</code></td>
</tr>
<tr>
<td>Delete ALB rule when editing/deleting AutoStopping rules</td>
<td><code>elasticloadbalancing:DeleteRule</code></td>
</tr>
<tr>
<td>Modify rule priorities for Harness-created ALB rules</td>
<td><code>elasticloadbalancing:SetRulePriorities</code></td>
</tr>
<tr>
<td>Modify target group</td>
<td><code>elasticloadbalancing:ModifyTargetGroup</code></td>
</tr>
<tr>
<td>Modify ALB rule</td>
<td><code>elasticloadbalancing:ModifyRule</code></td>
</tr>
<tr>
<td>Read metrics to check usage on target groups</td>
<td><code>cloudwatch:GetMetricStatistics</code></td>
</tr>
<tr>
<td>Read access logs from S3 (for custom exclusion)</td>
<td><code>s3:ListBucket s3:GetObject s3:ListAllMyBuckets s3:GetBucketLocation</code></td>
</tr>
<tr>
<td>Get access logs details from ALB (for custom exclusion)</td>
<td><code>elasticloadbalancing:DescribeLoadBalancerAttributes</code></td>
</tr>
<tr>
<td>Push lambda logs to CloudWatch</td>
<td><code>logs:CreateLogGroup logs:CreateLogStream logs:PutLogEvents</code></td>
</tr>
</table>


**with AutoStopping Proxy**

| Description | Permission |
|-------------|------------|
| List machine types available for Proxy | ec2:DescribeInstanceTypeOfferings |
| List key pairs for Proxy | ec2:DescribeKeyPairs |
| Create Proxy VM | ec2:RunInstances |
| Permission to read TLS certificate and secret. Needed only if TLS is used. | secretsmanager:GetSecretValue |
| Allocate static IP | ec2:AllocateAddress |
| List VPCs in create proxy flow | ec2:DescribeVpcs |
| List security groups in create proxy flow | ec2:DescribeSecurityGroups |
| List subnets for the selected VPC while creating ALB. | ec2:DescribeSubnets |
| Delete the Proxy VM while deleting proxy (Scope of this permission can be reduced to only proxy VMs) | ec2:TerminateInstances |
| Describe the image for proxy | ec2:DescribeImages |
| Associating address with VM | ec2:AssociateAddress |
| Disassociate address while deleting proxy | ec2:DisassociateAddress |
| Release address while deleting proxy | ec2:ReleaseAddress |
| Modify security group of proxy VM if needed | ec2:ModifyInstanceAttribute |

</details>

<details>
<summary>Auto Scaling Groups</summary>

**Schedules only**

| Description | Permission |
|-------------|------------|
| List ASG | autoscaling:DescribeAutoScalingGroups |
| Set the desired capacity of ASG during warm up and cool down operations | autoscaling:UpdateAutoScalingGroup |
| List ASG Policies | autoscaling:DescribePolicies |
| Suspend ASG policies during cool down | autoscaling:SuspendProcesses |
| Resume ASG policies during warm up | autoscaling:ResumeProcesses |

**with AWS ALB**

| Description | Permission |
|-------------|------------|
| Describe certificates in create ALB flow | acm:ListCertificates |
| List VPCs in create ALB flow | ec2:DescribeVpcs |
| List security groups in create ALB flow | ec2:DescribeSecurityGroups |
| Describe load balancers in create ALB flow | elasticloadbalancing:DescribeLoadBalancers |
| Lambda requires a role to execute and push the logs to cloud watch. We have a separate role for that. iam:ListRoles is used in code to list roles and identify the role created for lambda. | iam:ListRoles |
| List subnets for the selected VPC while creating ALB. | ec2:DescribeSubnets |
| Create ALB. Needed only if customer wants to create ALB from Harness | elasticloadbalancing:CreateLoadBalancer |
| Attach security groups to ALB. Needed only if customer wants to create ALB from Harness. | elasticloadbalancing:SetSecurityGroups |
| Describe target group. This is used to get details of lambda target group and EC2 target group | elasticloadbalancing:DescribeTargetGroups |
| Create lambda target group and health check target group | elasticloadbalancing:CreateTargetGroup |
| Add tags to Harness created target groups | elasticloadbalancing:AddTags |
| Get lambda function details | lambda:GetFunction |
| Create lambda function | lambda:CreateFunction |
| We specify the lambda role when we try to create lambda. Create lambda with role in request will succeed only if this permission is present | iam:PassRole |
| This is needed to allow the lambda Target Group to execute the lambda. | lambda:AddPermission |
| Required to add lambda to target group | elasticloadbalancing:RegisterTargets |
| Delete lambda while deleting the load balancer | lambda:DeleteFunction |
| Only required if user trigger delete load balancer from Harness UI | elasticloadbalancing:DeleteLoadBalancer |
| Get the target group health check details during warm up and to populate health check details in UI while creating rule. | elasticloadbalancing:DescribeTargetHealth |
| Get listeners of ALB | elasticloadbalancing:DescribeListeners |
| Create new listener in ALB if doesn't exist | elasticloadbalancing:CreateListener |
| Needed while creating new rule. We check existing rules and modify priority if required. | elasticloadbalancing:DescribeRules |
| Create ALB rule | elasticloadbalancing:CreateRule |
| Get tags of rules. ALB rules created by Harness will have Harness specific tags | elasticloadbalancing:DescribeTags |
| Delete target groups | elasticloadbalancing:DeleteTargetGroup |
| Delete ALB rule while editing/deleting Autostopping rules | elasticloadbalancing:DeleteRule |
| Modify existing rules priorities to make sure the ALB rules created by Harness get more priority | elasticloadbalancing:SetRulePriorities |
| Modify target group | elasticloadbalancing:ModifyTargetGroup |
| Modify ALB rule | elasticloadbalancing:ModifyRule |
| Traffic detection read cloud watch metrics to check the usage on a target group. | cloudwatch:GetMetricStatistics |
| Need only if custom exclusion is used. This is to read the access log from S3 | s3:ListBucket s3:GetObject s3:ListAllMyBuckets s3:GetBucketLocation |
| Need only if custom exclusion is used. Needed to get the access logs details from ALB. | elasticloadbalancing:DescribeLoadBalancerAttributes |
| Permission assigned to the Lambda. This is to push the logs while running the lambda. | logs:CreateLogGroup logs:CreateLogStream logs:PutLogEvents |

</details>

<details>
<summary>RDS Databases </summary>

**Schedules only**

| Description | Permission |
|-------------|------------|
| List RDS instances | rds:DescribeDBInstances |
| List RDS clusters | rds:DescribeDBClusters |
| List tags associated with RDS | rds:ListTagsForResource |
| Start RDS Instance | rds:StartDBInstance |
| Start RDS Cluster | rds:StartDBCluster |
| Stop RDS Instance | rds:StopDBInstance |
| Stop RDS Cluster | rds:StopDBCluster |


**with AutoStopping Proxy**

| Description | Permission |
|-------------|------------|
| List machine types available for Proxy | ec2:DescribeInstanceTypeOfferings |
| List key pairs for Proxy | ec2:DescribeKeyPairs |
| Create Proxy VM | ec2:RunInstances |
| Permission to read TLS certificate and secret. Needed only if TLS is used. | secretsmanager:GetSecretValue |
| Allocate static IP | ec2:AllocateAddress |
| List VPCs in create proxy flow | ec2:DescribeVpcs |
| List security groups in create proxy flow | ec2:DescribeSecurityGroups |
| List subnets for the selected VPC while creating ALB. | ec2:DescribeSubnets |
| Delete the Proxy VM while deleting proxy (Scope of this permission can be reduced to only proxy VMs) | ec2:TerminateInstances |
| Describe the image for proxy | ec2:DescribeImages |
| Associating address with VM | ec2:AssociateAddress |
| Disassociate address while deleting proxy | ec2:DisassociateAddress |
| Release address while deleting proxy | ec2:ReleaseAddress |
| Modify security group of proxy VM if needed | ec2:ModifyInstanceAttribute |


</details>

<details>
<summary> ECS Instances</summary>

**Schedules only**

| Description | Permission |
|-------------|------------|
| List ECS clusters | ecs:ListClusters |
| List tags for selecting ECS service by tag | tag:GetResources |
| List ECS services | ecs:ListServices |
| List tasks for ECS service | ecs:ListTasks |
| Describe ECS services | ecs:DescribeServices |
| Needed set the desired task count while warming and cooling down | ecs:UpdateService |
| Describe ECS Task | ecs:DescribeTaskDefinition |
| Describe ECS Tasks | ecs:DescribeTasks |

**with AWS ALB**

| Description | Permission |
|-------------|------------|
| Describe certificates in create ALB flow | acm:ListCertificates |
| List VPCs in create ALB flow | ec2:DescribeVpcs |
| List security groups in create ALB flow | ec2:DescribeSecurityGroups |
| Describe load balancers in create ALB flow | elasticloadbalancing:DescribeLoadBalancers |
| Lambda requires a role to execute and push the logs to cloud watch. We have a separate role for that. iam:ListRoles is used in code to list roles and identify the role created for lambda. | iam:ListRoles |
| List subnets for the selected VPC while creating ALB. | ec2:DescribeSubnets |
| Create ALB. Needed only if customer wants to create ALB from Harness | elasticloadbalancing:CreateLoadBalancer |
| Attach security groups to ALB. Needed only if customer wants to create ALB from Harness. | elasticloadbalancing:SetSecurityGroups |
| Describe target group. This is used to get details of lambda target group and EC2 target group | elasticloadbalancing:DescribeTargetGroups |
| Create lambda target group and health check target group | elasticloadbalancing:CreateTargetGroup |
| Add tags to Harness created target groups | elasticloadbalancing:AddTags |
| Get lambda function details | lambda:GetFunction |
| Create lambda function | lambda:CreateFunction |
| We specify the lambda role when we try to create lambda. Create lambda with role in request will succeed only if this permission is present | iam:PassRole |
| This is needed to allow the lambda Target Group to execute the lambda. | lambda:AddPermission |
| Required to add lambda to target group | elasticloadbalancing:RegisterTargets |
| Delete lambda while deleting the load balancer | lambda:DeleteFunction |
| Only required if user trigger delete load balancer from Harness UI | elasticloadbalancing:DeleteLoadBalancer |
| Get the target group health check details during warm up and to populate health check details in UI while creating rule. | elasticloadbalancing:DescribeTargetHealth |
| Get listeners of ALB | elasticloadbalancing:DescribeListeners |
| Create new listener in ALB if doesn't exist | elasticloadbalancing:CreateListener |
| Needed while creating new rule. We check existing rules and modify priority if required. | elasticloadbalancing:DescribeRules |
| Create ALB rule | elasticloadbalancing:CreateRule |
| Get tags of rules. ALB rules created by Harness will have Harness specific tags | elasticloadbalancing:DescribeTags |
| Delete target groups | elasticloadbalancing:DeleteTargetGroup |
| Delete ALB rule while editing/deleting Autostopping rules | elasticloadbalancing:DeleteRule |
| Modify existing rules priorities to make sure the ALB rules created by Harness get more priority | elasticloadbalancing:SetRulePriorities |
| Modify target group | elasticloadbalancing:ModifyTargetGroup |
| Modify ALB rule | elasticloadbalancing:ModifyRule |
| Traffic detection read cloud watch metrics to check the usage on a target group. | cloudwatch:GetMetricStatistics |
| Need only if custom exclusion is used. This is to read the access log from S3 | s3:ListBucket s3:GetObject s3:ListAllMyBuckets s3:GetBucketLocation |
| Need only if custom exclusion is used. Needed to get the access logs details from ALB. | elasticloadbalancing:DescribeLoadBalancerAttributes |
| Permission assigned to the Lambda. This is to push the logs while running the lambda. | logs:CreateLogGroup logs:CreateLogStream logs:PutLogEvents |

</details> 


### Cloud Asset Governance

Enable the following permissions in AWS to execute cloud governance rules:

<details>
<summary>Click to view required permissions</summary>

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
