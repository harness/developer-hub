---
title: AWS
description: This topic describes how to set up cost visibility for AWS.
# sidebar_position: 2
helpdocs_topic_id: 80vbt5jv0q
helpdocs_category_id: 7vy86n7cws
helpdocs_is_private: false
helpdocs_is_published: true
---

Harness Cloud Cost Management (CCM) offers comprehensive solutions to manage and optimize the cloud costs of your Amazon Web Services (AWS) infrastructure. CCM provides visibility, governance, and optimization of AWS services such as EC2, S3, RDS, Lambda, and others. CCM provides recommendations to effectively right-size your cloud resources to match the workload demands and optimizes the auto-scaling groups (ASGs), and EKS clusters using intelligent cloud AutoStopping rules.

> **☆ NOTE —** After enabling CCM, it takes about 24 hours for the data to be available for viewing and analysis.

## AWS Connector Requirements

* The same connector cannot be used in NextGen and FirstGen. 
* For CCM, AWS connectors are available only at the Account level in Harness.
* If you have multiple AWS accounts, you may need to create multiple AWS connectors depending on desired functionality:
	+ **Cost Visibility**: You may need to create one or multiple AWS connectors depending on the availability of consolidated billing. Go to **Cost and Usage Reports (CUR)** for more information. 
	+ **Resource Inventory Management**: You need to create an AWS connector for each account.
	+ **Optimization by AutoStopping**: You need to create an AWS connector for each account.

## Cost and Usage Reports (CUR)

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

```mdx-code-block
<Tabs queryString="tab-number">
<TabItem value="1" label="Multiple Accounts with Consolidated Billing">
```
* If you have [consolidated billing process](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/useconsolidatedbilling-procedure.html) enabled, then you need to create only a single CUR for the management account. This provides cost data for all member accounts in the organization.

* For the Cost Visibility feature alone, you will only need a single AWS connector configured with the management account CUR.

* In order to take advantage of other features such as Inventory Management and AutoStopping, you need to create a connector for each member account:
  * If using the UI to create the additional connectors, configure all connectors with the same management account CUR.
  * If using the API to create the additional connectors, you can omit billing information altogether.

```mdx-code-block
</TabItem>

<TabItem value="2" label="Multiple Accounts">
```
* If you do NOT have [consolidated billing process](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/useconsolidatedbilling-procedure.html) enabled, then you will need to create a CUR for each linked account.

* Create an AWS connector for each AWS account, configured with the CUR for that account.

```mdx-code-block
</TabItem>
<TabItem value="3" label="Single Account">
```
* Create a single CUR for your AWS account.

* Create a single AWS connector configured with the CUR for your account.

```mdx-code-block
</TabItem>
</Tabs>
```

## Connect CCM to your AWS Account

To enable CCM for your AWS services (such as EC2, S3, RDS, Lambda, and so on), you simply need to connect Harness to your AWS accounts.

Perform the following steps to connect CCM to the AWS account.

1. Create a new AWS connector using one of the two options below:

```mdx-code-block
<Tabs queryString="tab-number">
<TabItem value="4" label="From Account Settings">
```
- Go to **Account Resources** | **Connectors**.
- Click on **+ New Connector**.
- Under **Cloud Costs**, select **AWS**.
```mdx-code-block
</TabItem>
<TabItem value="5" label="From Cloud Costs">
```
- Go to **Setup** | **Cloud Integration**.  
- Click on **New Cluster/Cloud account**.
- Select **AWS**.
```mdx-code-block
</TabItem>
</Tabs>
```

### Overview

1. Enter the following values and click **Continue**

| **Field** | **Value/Notes** |
| --- | --- |
| **Connector Name** | Enter any name for the connector. This name will appear throughout the product to identify this AWS account. |
| **Specify the AWS account ID** | The Account ID of the AWS account to connect to. To find your AWS account ID, see [Finding your AWS account ID](https://docs.aws.amazon.com/IAM/latest/UserGuide/console_account-alias.html#FindingYourAWSId). |
| **Is this an AWS GovCloud account?** | Select **Yes** if connecting to a GovCloud account |


### Cost and Usage Report

1. Click **Launch AWS console**. 

> *In the AWS Console perform the following steps*

2. Log into your AWS account if not already logged in.
3. Click **Create Report**.   
4. In the **Specify report details** step, enter the following values and click **Next**

| **Field** | **Value/Notes** |
| --- | --- |
| **Report Name** | Enter any name as the report name. Copy this name as you will need it to continue configure the Harness connector in steps below |
| **Include resource IDs** | Make sure this option is checked |
| **Refresh automatically** | Make sure this option is checked |

5. In the **Set delivery options** step, enter the following values and click **Next**

| **Field** | **Value/Notes** |
| --- | --- |
| **Configure S3 Bucket** | Select an existing bucket or create a new one. Copy this name as you will need it to continue configure the Harness connector in steps below |
| **S3 path prefix - required** | Enter any path prefix. Harness will automatically scan and find this prefix. |
| **Report data time granularity** | Select **Hourly** |
| **Report versioning** | Select **Overwrite existing report** |
| **Amazon Athena** | Make sure this option is unchecked |
| **Amazon Redshift** | Make sure this option is unchecked |
| **Amazon QuickSight** | Make sure this option is unchecked |
| **Compression type** | Select **GZIP** |

6. In the **Review and create** step, click **Create Report**

> *In the Harness connector dialog perform the following steps*

7. Enter the following values and click **Continue**

| **Field** | **Value/Notes** |
| --- | --- |
| **Cost and Usage Report Name** | Enter the report name you specified in step 5 |
| **Cost and Usage S3 Bucket Name** | Enter the bucket name you specified in step 5 |


### Choose Requirements

1. Select your desired features and click **Continue**. Details about the features are listed below. Note that the permissions required as part of the AWS cross-account role will be based on your selections. Those permissions are listed out in the **Reference - AWS Access Permission** section below.

| **Features**  | **Capabilities** | 
| --- | --- | 
| **Cost Visibility** (Required)| This feature is available by default and requires access to the CUR report. Provides the following capabilities:<ul><li>Insights into AWS costs by services, accounts, etc. </li><li>Root cost analysis using cost perspectives</li><li>Cost anomaly detection</li><li>Governance using budgets and forecasts</li><li>Alert users using Email and Slack notification</li></ul> This feature will give you cost insights that are derived from the CUR. For deep Kubernetes visibility and rightsizing recommendations based on the historical utilization and usage metrics, set up Kubernetes connectors. See [Set Up Cloud Cost Management for Kubernetes](set-up-cost-visibility-for-kubernetes.md). |
| **Resource Inventory Management** (Optional)| This feature provides visibility into your EC2, EBS volumes, and ECS costs. The insights provided by inventory management can be consumed by Finance teams to understand resource utilization across the board. <ul><li>Breakdown by ECS cluster cost, Service, Task, and Launch Type (EC2, Fargate) </li><li>Insight into EC2 instances and their utilization</li><li>Access to AWS EC2 Inventory Cost and EBS Volumes and Snapshots inventory dashboards. For more information, see View AWS EC2 Inventory Cost Dashboard, Orphaned EBS Volumes and Snapshots Dashboard, and View AWS EC2 Instance Metrics Dashboard.</li></ul> |
| **Optimization by AutoStopping** (Optional)| This feature allows you to enable Intelligent Cloud AutoStopping for your AWS instances and auto-scaling groups. For more information, see Create AutoStopping Rules for AWS. <ul><li>Orchestrate VMs and ASGs based on idleness</li><li>Run your workloads on fully orchestrated spot instances</li><li>Granular savings visibility</li></ul> |


### Create Cross Account Role

Harness uses the secure cross-account role to access your AWS account. The role includes a restricted policy based on the features selected above.

1. In **Create Cross Account Role**, click **Launch Template on AWS console**.

> *In the AWS Console perform the following steps*

2. In **Quick create stack**, in **Capabilities**, select the acknowledgment, and click **Create stack**.
  > **☆ NOTE** - The values on this page are based on your previous selections. Do not modify any values before creating the stack.  
    
3. In the stack's page, go to the **Outputs** tab  and copy the **Value** of **CrossAccountRoleArn Key**.
   
     ![](./static/set-up-cost-visibility-for-aws-36.png)

> *In the Harness connector dialog perform the following steps*

4. Enter the following values and click **Save and Continue**

| **Field** | **Value/Notes** |
| --- | --- |
| **Cross Account Role ARN** | Enter the value that you copied in step 3 |
| **External ID** | Do not modify. If you will be creating multiple AWS connectors via API, copy this value as you will need to reference it. |

### Connection Test

The connection is validated, and verified in this step. After successful validation, click **Finish**.

## Create Connectors for Multiple AWS Accounts

Harness CCM also provides the ability to create connectors via API using a StackSet configured at the management account. It involves the following steps:

* Create a Service Account and API Key in Harness
* Create a StackSet in AWS
* Create an AWS Connector via API (performed once for each AWS account)

> **☆ NOTE —** You should manually create a connector via the UI for the management account before using the API method described here to create connectors for the member accounts.

### Create a Service Account and API Key in Harness

1. At the Account level, [create a Service Account](/docs/platform/User-Management/add-and-manage-service-account#create-a-service-account) with the **Admin** role for **All Account Level Resources** or **All Resources Including Child Scopes**.
2. [Create a Service Account Token](/docs/platform/User-Management/add-and-manage-service-account#create-a-service-account). Save the API Key, which will be used when creating AWS connectors via the API below.

### Create a StackSet in AWS

Perform the following steps to create a StackSet in AWS:

1. Click on the following link to start creating the StackSet:  
<https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacksets/create>
2. In the **Choose a template** step, enter the following values and click **Next**

| **Field** | **Value/Notes** |
| --- | --- |
| **Permissions** | Optional, configure if necessary based on your AWS policies |
| **Prerequisite - Prepare template** | Select **Template is ready** |
| **Specify template** | Select **Amazon S3 URL** |
| **Amazon S3 URL** | Enter `https://continuous-efficiency-prod.s3.us-east-2.amazonaws.com/setup/ngv1/HarnessAWSTemplate.yaml` |

3. In the **Specify StackSet details** step, enter the following values and click **Next**

| **Field** | **Value/Notes** |
| --- | --- |
| **StackSet name** | Enter any name. For example, `harness-ce-iam-stackset` |
| **BillingEnabled** | Select **false** |
| **BucketName** | Leave empty |
| **EventsEnabled** | Select **true** |
| **ExternalId** | The External ID value copied in step 4 of [Create Cross Account Role](#create-cross-account-role) |
| **GovernanceEnabled** | Select **true** to enable Governance, **false** otherwise |
| **LambdaExecutionRoleName** | Leave as is unless your AWS policies required a different naming convention |
| **OptimizationEnabled** | Select **true** to enable AutoStopping, **false** otherwise |
| **PrincipalBilling** | Do not modify |
| **RoleName** | Leave as is unless your AWS policies required a different naming convention |
   
4. In the **Configure StackSet options** step, enter the following values and click **Next**

| **Field** | **Value/Notes** |
| --- | --- |
| **Managed execution** | Select **Active** |
    
5. In the **Set deployment options** step, enter the following values and click **Next**

| **Field** | **Value/Notes** |
| --- | --- |
| **Add stacks to StackSet** | Select **Deploy new stacks** |
| **Deployment locations** | Configure the accounts or organization units that you want to deploy to |
| **Specify regions** | Configure the regions that you want to deploy to |
| **Region Concurrency** | Select **Sequential** |

6. In the **Review** step, select the acknowledgment, and click **Submit**.

### Create an AWS Connector via API

Use the Harness API's [Create a Connector](https://apidocs.harness.io/tag/Connectors#operation/createConnector) endpoint to create an AWS connector for each member account. Below is a sample cURL command to create an AWS connector. Replace the following placeholders with your values:

| **Placeholder** | **Value/Notes** |
| --- | --- |
| **API TOKEN** | The API Key created in the [Create a Service Account and API Key in Harness](#create-a-service-account-and-api-key-in-harness) section |
| **CONNECTOR NAME** | Enter any name. This will be visible in the UI, perspectives, dashboards, etc. |
| **CONNECTOR ID** | Enter a unique ID for the connector. The ID must meet the [Entity Identifier Reference](/docs/platform/references/entity-identifier-reference/) specification. |
| **CROSS ACCOUNT ROLE ARN** | The ARN value copied in step 3 of [Create Cross Account Role](#create-cross-account-role) |
| **EXTERNAL ID** | The External ID value copied in step 4 of [Create Cross Account Role](#create-cross-account-role) |
| **AWS ACCOUNT ID** | The ID of the AWS member account |
| **FEATURES** | A comma separated list of features to enable. Enter `"VISIBILITY", "OPTIMIZATION", "GOVERNANCE"` removing any features that you do not want to enable. |


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

## Reference - AWS Access Permissions

CCM requires the following permissions which are automatically created via a StackSet based on the features you select during configuration.

> **☆ NOTE —** If you don't have access to create a cost and usage report or run a CloudFormation template, contact your IT or security teams to provide the required permissions.

### Cost Visibility

The cost visibility policy grants the following permissions:

* List CUR reports and visibility into the organization's Structure
* Get objects from the S3 bucket configured in the CUR
* Put objects into the Harness S3 bucket
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
* `organizations:ListAccounts`: fetches a list of all the accounts present in the organization, and also fetches the accountID to Account Name mapping.
* `organizations:ListTagsForResource`: fetches the AWS Account level tags. Harness supports account tags within CCM that can be used for reporting and analysis.

### Resource Inventory Management

The inventory management policy performs the following actions:

* ECS Visibility - For Granular Cluster Cost Breakdown
* EC2, EBS, RDS Visibility - Inventory Management  

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

* Breakdown by ECS cluster cost, Service, Task, and Launch Type (EC2, Fargate).
* Insight into EC2 instances and their utilization.
* Access to AWS EC2 Inventory Cost and EBS Volumes and Snapshots inventory dashboards. For more information, see [View AWS EC2 Inventory Cost Dashboard](../../3-use-ccm-cost-reporting/6-use-ccm-dashboards/view-aws-ec-2-inventory-cost-dashboard.md), [Orphaned EBS Volumes and Snapshots Dashboard](../../3-use-ccm-cost-reporting/6-use-ccm-dashboards/orphaned-ebs-volumes-and-snapshots-dashboard.md), and [View AWS EC2 Instance Metrics Dashboard](../../3-use-ccm-cost-reporting/6-use-ccm-dashboards/view-aws-ec-2-instance-metrics.md).

### Optimization by AutoStopping

The AutoStopping policy performs the following actions:

* Create an IAM role for optimization
* Permissions for creating AutoStopping Rules
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
    "Type": "AWS::IAM::ManagedPolicy" 
    "Condition": "CreateHarnessOptimisationPolicy"  
    "Properties":  
      "Description": "Policy granting Harness Access to Enable Cost Optimisation"  
      "PolicyDocument":  
        "Version": "2012-10-17"  
        "Statement":  
          - "Effect": "Allow"  
            "Action":  
              - "ec2:CreateNetworkInterface"
              - "ec2:CreateNetworkInsightsPath" 
              - "ec2:CreateNetworkInterfacePermission"  
              - "ec2:CreateNetworkAcl"
              - "ec2:*"
              - "ec2:CreateNetworkAclEntry"  
              - "logs:CreateLogGroup"
              - "logs:CreateLogStream"  
              - "logs:PutLogEvents"
            "Resource": "*"  
      "Roles":  
        - "!Ref HarnessOptimizationLambdaExecutionRole"
```

```
HarnessOptimisationPolicy:  
    "Type": "AWS::IAM::ManagedPolicy"
    "Condition": "CreateHarnessOptimisationPolicy"  
    "Properties":  
      "Description": "Policy granting Harness Access to Enable Cost Optimisation"  
      "PolicyDocument":  
        "Version": "2012-10-17"  
        "Statement":  
              - "Effect": "Allow"  
                "Action":  
                  - "elasticloadbalancing:*"  
                  - "ec2:StopInstances"  
                  - "autoscaling:*"  
                  - "ec2:Describe*"  
                  - "iam:CreateServiceLinkedRole"  
                  - "iam:ListInstanceProfiles"  
                  - "iam:ListInstanceProfilesForRole"  
                  - "iam:AddRoleToInstanceProfile"  
                  - "iam:PassRole"  
                  - "ec2:StartInstances"  
                  - "ec2:*"  
                  - "iam:GetUser"  
                  - "ec2:ModifyInstanceAttribute"  
                  - "iam:ListRoles"  
                  - "acm:ListCertificates"  
                  - "lambda:*"  
                  - "cloudwatch:ListMetrics"  
                  - "cloudwatch:GetMetricData"  
                  - "route53:GetHostedZone"  
                  - "route53:ListHostedZones"  
                  - route53:ListHostedZonesByName"  
                  - "route53:ChangeResourceRecordSets"  
                  - "route53:ListResourceRecordSets"  
                  - "route53:GetHealthCheck"  
                  - "route53:GetHealthCheckStatus"  
                  - "cloudwatch:GetMetricStatistics"  
                "Resource": "*"  
      "Roles":  
        - !Ref HarnessCloudFormationRole 
```

## Next Steps

* [Create Cost Perspectives](../../3-use-ccm-cost-reporting/1-ccm-perspectives/1-create-cost-perspectives.md)
* [Analyze Cost for AWS Using Perspectives](../../3-use-ccm-cost-reporting/3-root-cost-analysis/analyze-cost-for-aws.md)