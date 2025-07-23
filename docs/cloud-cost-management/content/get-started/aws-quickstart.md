import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import RedirectIfStandalone from '@site/src/components/DynamicMarkdownSelector/RedirectIfStandalone';

<RedirectIfStandalone label="AWS" targetPage="/docs/cloud-cost-management/get-started/dynamic-get-started" />

## Before You Start
To ensure a smooth and error-free setup experience, complete the following steps in your **AWS console** before launching the Harness wizard. This will allow you to progress through the setup without delays or missing prerequisites.

| Required Info                     | Where to Find It | Why It’s Needed |
|----------------------------------|------------------|-----------------|
| **AWS Account ID** (12-digit number) | AWS Console → Account Settings | Used to associate your cloud costs with your Harness project. |
| **Cost and Usage Report (CUR)**  | AWS Console → Billing → Cost & Usage Reports | Harness uses this to ingest detailed billing data. |
| **S3 Bucket Name**               | AWS Console → S3 | Stores the CUR files for Harness to access. |

---

### Set Up the Cost and Usage Report
1. Go to **AWS Billing → Cost & Usage Reports**.
2. Click **Create report**.
3. Enter a name for the report (e.g., `ccm-harness-report`).
4. Check the following options:
   - ✅ **Include resource IDs**
   - 🕒 **Time granularity**: `Hourly`
   - ♻️ **Report versioning**: `Overwrite existing report`
5. Choose or create an **S3 bucket** as the report destination.
6. Complete the setup.

---

:::caution time for data delivery
It may take up to **24 hours** for AWS to begin delivering cost and usage data. You can still proceed through the wizard, but the connection test may fail if data isn’t yet available.

In the meantime, explore the optional requirements and feature integrations available in Harness CCM, these will be available to select in your **Choose Requirements** step of the connection wizard:

  - [Resource Inventory Management](/docs/cloud-cost-management/use-ccm-cost-reporting/use-ccm-dashboards/view-aws-ec-2-inventory-cost-dashboard/).
  - [Optimization by AutoStopping](/docs/cloud-cost-management/use-ccm-cost-optimization/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/getting-started).
  - [Cloud Governance](/docs/cloud-cost-management/use-ccm-cost-governance/asset-governance/asset-governance).
  - [Commitment Orchestration](/docs/category/commitment-orchestrator).
:::

---

## Cloud Connector Wizard
Once you've gathered the required AWS details, follow these steps in the Harness setup wizard to connect your AWS account and enable cost visibility.

<Tabs>
<TabItem value="Interactive Guide" label="Interactive Guide">
<DocVideo src="https://app.tango.us/app/embed/f48937b7-996f-45f1-9fd9-b387d2570561?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" title="Add AWS Cloud Cost Connector in Harness" />
</TabItem>
<TabItem value="Step-by-Step" label="Step-by-Step">

### Step 1: Add AWS Account Details
1. In the wizard, enter a name for your connector (e.g., `ccm-aws-prod`).
2. Enter your **12-digit AWS Account ID**.
3. (Optional) Add a description and tags to help identify this connector later.
4. If you're using a GovCloud account, select **Yes**; otherwise, leave the default.
5. Click **Continue**.

---

### Step 2: Select or Create a Cost and Usage Report
1. If your Cost and Usage Report (CUR) already exists, select it from the list.
2. If not, return to AWS and follow the steps in the [Before You Start](#before-you-start) section to create one.
3. Once the CUR appears in the list, select it and click **Continue**.

---

### Step 3: Choose Requirements
1. **Cost Visibility** is selected by default and is required, leave it checked.
2. Optionally, you can enable any of the following features (they can also be added later):
   - Resource Inventory Management
   - Optimization by AutoStopping
   - Cloud Governance
   - Commitment Orchestration
3. Click **Continue**.

:::tip
Not sure which options to choose? [Learn more about each feature](#before-you-start).
:::

---

### Step 4: Enter Cross Account Role Details
1. Paste the **Cross Account Role ARN** you created via the CloudFormation stack.
   - You can find this under **CloudFormation → Stacks → Outputs tab** in AWS.
2. The **External ID** will be pre-filled — leave it as is.
3. Click **Save and Continue**.

---

### Step 5: Verify the Connection
1. Harness will attempt to validate the connection using your inputs.
2. If this step fails, it's usually because AWS has not yet delivered the first CUR file.
   - Wait up to **24 hours** after setting up the CUR before trying again.
3. Once validated, click **Finish Setup**.

---

🎉 You’ve now connected your AWS account and enabled cost visibility in Harness.
</TabItem>
</Tabs>

---

## After Connector Setup

Within about 24 hours of linking your AWS account, billing data begins to flow into Harness. Harness automatically creates default **Perspectives** so you can immediately understand where your cloud spend is going. You can also build custom Perspectives that match your teams, environments, or applications.

Next, head to **Budgets** to set spending thresholds and receive alerts.

As your data flows, Harness will start flagging **Anomalies** and you can configure notification preferences to stay on top of unexpected spikes.

---

## Individual Feature Permissions

### Cost Visibility
The cost visibility policy grants the following permissions:

- List CUR reports and gain visibility into the organization's structure.
- Get objects from the S3 bucket configured in the CUR.
- Put objects into the Harness S3 bucket.
<details>
<summary><b>Cost Visibility IAM Policy</b></summary>

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


### Resource Inventory Management Permissions
The Resource Inventory Management feature provides visibility into your AWS resources including EC2 instances, EBS volumes, and ECS clusters. This feature helps finance teams understand resource utilization across the organization.

Required Permissions
The inventory management policy performs the following actions:

ECS Visibility - For Granular Cluster Cost Breakdown
EC2, EBS, RDS Visibility - Inventory Management

<details>
<summary><b>Inventory Management IAM Policy</b></summary>

```yaml
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

#### AutoStopping Rules Permissions

Autostopping supports Granular Permissions
On this screen, you can select specific features and services for AutoStopping:

**EC2 Instances**

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

**Auto Scaling Groups**
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

**RDS Databases**
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

**ECS Instances**
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


### Cloud Asset Governance Permissions

For Cloud Asset Governance, add the [`ReadOnlyAccess`](https://docs.aws.amazon.com/aws-managed-policy/latest/reference/ReadOnlyAccess.html) policy to the IAM role or user used by Harness. This policy supplies the baseline read-only permissions needed.

:::info

- This is not an exhaustive list; you may require additional permissions to support custom rules.
- A yellow underline in a custom policy indicates that you need permission to support the underlined filters and/or actions.
:::

### Commitment Orchestrator Permissions

Step 1: Visibility

To enable visibility, in the master account connector, you need to add the following permissions.

<details>
<summary><b>Visibility IAM Permissions</b></summary>

```json
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
</details>


Step 2: Setup flow (to enable actual orchestration)

<details>
<summary><b>Orchestration Setup IAM Permissions</b></summary>

```json
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
</details>


## Next Steps
Once your **AWS billing data** is flowing into Harness, explore these features to enhance your cloud cost management:

- Create [Budgets and Alerts](/docs/cloud-cost-management/use-ccm-cost-governance/ccm-budgets/create-a-budget) to monitor spend thresholds.
- Use [BI Dashboards](/docs/cloud-cost-management/use-ccm-cost-reporting/use-ccm-dashboards/access-ccm-dashboards) to visualize cloud usage and trends.
- Revisit optional integrations you skipped earlier:
  - [Resource Inventory Management](/docs/cloud-cost-management/use-ccm-cost-reporting/use-ccm-dashboards/view-aws-ec-2-inventory-cost-dashboard/).
  - [Optimization by AutoStopping](/docs/cloud-cost-management/use-ccm-cost-optimization/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/getting-started).
  - [Cloud Governance](/docs/cloud-cost-management/use-ccm-cost-governance/asset-governance/asset-governance).
  - [Commitment Orchestration](/docs/category/commitment-orchestrator).

Take the next step in your cloud cost management journey and turn visibility into action.