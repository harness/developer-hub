---
title: "Feature Permissions for CCM"
description: "A comprehensive guide to Harness Cloud Cost Management (CCM) licensing plans, feature limitations, and what happens when your license expires."
sidebar_position: 7
helpdocs_is_private: false
helpdocs_is_published: true
---

Harness Cloud Cost Management (CCM) supports multiple features across AWS, Azure, GCP, and Kubernetes. Each feature requires a specific set of cloud-provider permissions so that CCM can ingest data, surface insights, and (optionally) take cost-saving actions on your behalf.

Use this page to:

- Understand the minimum IAM roles or policies needed for every CCM feature.
- Apply the principle of least privilege when setting up connectors.
- Troubleshoot connector validation errors that report missing permissions.

---

## AWS

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


## Azure

### Governance Permissions

- Assign the [**Reader** role](https://docs.azure.cn/en-us/role-based-access-control/built-in-roles/general#reader) to let Harness view resources for governance analysis.
- If you want Harness to execute automated governance actions, also assign the [**Contributor** role](https://docs.azure.cn/en-us/role-based-access-control/built-in-roles/privileged#contributor).

### Granular Permissions for AutoStopping

On this screen, you can select specific features and services for AutoStopping:

### Virtual Machines

<details>
<summary><b>Schedules only</b></summary>

```
// List resource groups
Microsoft.Resources/subscriptions/resourcegroups/read

// List VMs
Microsoft.Compute/virtualMachines/read

// Start VMs
Microsoft.Compute/virtualMachines/start/action

// Stop VMs
Microsoft.Compute/virtualMachines/deallocate/action
```

</details>

<details>
<summary><b>with App Gateway</b></summary>

```
// List virtual networks
Microsoft.Network/virtualNetworks/read

// List subnets
Microsoft.Network/virtualNetworks/subnets/read

// List public IP addresses
Microsoft.Network/publicIPAddresses/read

// List app gateways
Microsoft.Network/applicationGateways/read

// For traffic detection using access logs
Microsoft.Storage/storageAccounts/write

// For traffic detection using access logs
Microsoft.Storage/storageAccounts/read

// For traffic detection using access logs
Microsoft.Storage/storageAccounts/listKeys/action

// Create Azure function for initial warm up
Microsoft.Web/sites/write

// Create Azure function for initial warm up
Microsoft.Web/sites/read

// Create Azure function for initial warm up
Microsoft.Web/sites/config/write

// Create Azure function for initial warm up
Microsoft.Web/sites/functions/write

// Create Azure function for initial warm up
Microsoft.Web/sites/functions/read

// Permissions to create application gateway
Microsoft.Network/applicationGateways/write

// Permissions to create application gateway
Microsoft.Network/virtualNetworks/subnets/join/action

// Permissions to create application gateway
Microsoft.Network/publicIPAddresses/join/action

// Permissions to create application gateway
microsoft.insights/diagnosticSettings/write

// Permissions to create application gateway
Microsoft.Network/networkInterfaces/read

// Needed during warmup
Microsoft.Network/applicationGateways/backendhealth/action
```

</details>

<details>
<summary><b>with AutoStopping Proxy</b></summary>

```
// List virtual networks
Microsoft.Network/virtualNetworks/read

// List subnets
Microsoft.Network/virtualNetworks/subnets/read

// List network security groups
Microsoft.Network/networkSecurityGroups/read

// List security rules
Microsoft.Network/networkSecurityGroups/securityRules/read

// List SSH Keys
Microsoft.Compute/sshPublicKeys/read

// create static IP
Microsoft.Network/publicIPAddresses/write

// Read IP address
Microsoft.Network/publicIPAddresses/read

// Basic permissions to setup VM
Microsoft.Network/networkInterfaces/write

// Basic permissions to setup VM
Microsoft.Network/networkSecurityGroups/join/action

// Basic permissions to setup VM
Microsoft.Network/virtualNetworks/subnets/join/action

// Basic permissions to setup VM
Microsoft.Network/networkInterfaces/read

// Basic permissions to setup VM
Microsoft.Network/networkInterfaces/join/action

// Create VM
Microsoft.Compute/virtualMachines/write

// Delete proxy VM
Microsoft.Compute/virtualMachines/delete

// Delete public IP allocated for proxy
Microsoft.Network/publicIPAddresses/delete

// Delete proxy network interface
Microsoft.Network/networkInterfaces/delete

// Delete OS disk of proxy
Microsoft.Compute/disks/delete
```

</details>
------

## GCP

### Governance Permissions

To configure permissions for Cloud Governance features:

1. Navigate to **IAM & Admin** in the GCP console.
2. If authentication is done via service account:
   - Search for your service account in the principals list
   - Click **Edit Principal**
   - Add the [**Viewer** role](https://cloud.google.com/iam/docs/understanding-roles#basic) (`roles/viewer`) from the Basic category
   - For automated actions, grant additional permissions as required by your governance policies
3. Click **Save** to apply the changes.

#### Enable required Google Cloud APIs for Governance

Governance Recommendations rely on the following Google Cloud services. Make sure they are **enabled in every project** you want to monitor:

- [**Cloud Run Admin API**](https://cloud.google.com/run/docs/reference/rest)
- [**Cloud Memorystore for Redis API**](https://cloud.google.com/memorystore/docs/redis/reference/rest)
- [**Cloud Functions API**](https://cloud.google.com/functions/docs/reference/rest)
- [**Kubernetes Engine API**](https://cloud.google.com/kubernetes-engine/docs/reference/rest)

You can enable the APIs via Google Cloud console:
1. Open **[APIs & Services](https://console.cloud.google.com/apis/library)** for your project (https://console.cloud.google.com/apis/library).  
2. Search for each API above and click **Enable**.

For enabling through console, see the [GCP documentation](https://cloud.google.com/endpoints/docs/openapi/enable-api#enabling_an_api).

### Granular Permissions for AutoStopping

#### Compute Engine Virtual Machines

<details>
<summary><b>Schedules only</b></summary>

```
// List VMs
compute.instances.list

// Tag VM
compute.instances.setLabels

// Get region information to list zones
compute.regions.get

// List regions
compute.regions.list

// Required while waiting to complete VM operations, for example stop operation
compute.zoneOperations.get

// Stop VM
compute.instances.stop

// Start VM
compute.instances.start
```

</details>

<details>
<summary><b>with AutoStopping Proxy</b></summary>

```
// List networks
compute.networks.list

// List machine types
compute.machineTypes.list

// List subnets
compute.subnetworks.list

// List security groups
compute.firewalls.list

// Create address
compute.addresses.create

// Get address
compute.addresses.get

// create disk
compute.disks.create

// Use sub network
compute.subnetworks.use

// Create proxy VM
compute.instances.create

// use static IP
compute.subnetworks.useExternalIp

// Use address
compute.addresses.use

// Set VM metadata
compute.instances.setMetadata

// Set tags
compute.instances.setTags

// Delete address
compute.addresses.delete

// Delete proxy VM
compute.instances.delete
```

</details>

#### Instance Groups

<details>
<summary><b>Schedules only</b></summary>

```
// Get region information to list zones
compute.regions.get

// List regions
compute.regions.list

// list instance groups
compute.instanceGroups.list

// list managed instance groups
compute.instanceGroupManagers.list

// get instance groups details
compute.instanceGroups.get

// Get instances in instance groups
compute.instances.get

// List autoscalers
compute.autoscalers.list

// Get autoscaler details
compute.autoscalers.get

// For updating autoscaler configurations. This is needed during warm up and cool down
compute.autoscalers.update

// List VMS in instance group
compute.instances.list

// Deleting VMs from managed instance groups during cool down
compute.instances.delete

// Get status of operations
compute.globalOperations.get

// Get status of operations
compute.regionOperations.get

// Get status of operations
compute.zoneOperations.get
```

</details>

<details>
<summary><b>with AutoStopping Proxy</b></summary>

```
// List networks
compute.networks.list

// List machine types
compute.machineTypes.list

// List subnets
compute.subnetworks.list

// List security groups
compute.firewalls.list

// Create address
compute.addresses.create

// Get address
compute.addresses.get

// create disk
compute.disks.create

// Use sub network
compute.subnetworks.use

// Create proxy VM
compute.instances.create

// use static IP
compute.subnetworks.useExternalIp

// Use address
compute.addresses.use

// Set VM metadata
compute.instances.setMetadata

// Set tags
compute.instances.setTags

// Delete address
compute.addresses.delete

// Delete proxy VM
compute.instances.delete
```

</details>
------
