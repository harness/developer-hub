---
title: Via Terraform and Helm 
description: Learn how to set up and configure Harness Cluster Orchestrator for AWS EKS using Terraform and Helm
sidebar_position: 5
helpdocs_topic_id: 
helpdocs_category_id: 
helpdocs_is_private: false
helpdocs_is_published: true
redirect_from: 
    - /docs/cloud-cost-management/use-ccm-cost-optimization/cluster-orchestrator/setting-up-co
---

## Before You Begin
Make sure you have the following prerequisites in place:

- **AWS Account** with permissions to create IAM roles and policies
- **EKS Cluster** running and accessible via kubectl
- **Helm 3.x or later** installed on your local machine
- **Terraform 1.2.0 or later** installed on your local machine
- **Harness Account** with CCM module enabled
- **Kubernetes Connector** configured in your Harness account

## Implementation Steps

### Step 1: Set Up Required Infrastructure with Terraform

First, we'll use Terraform to set up the required infrastructure components:
- AWS IAM roles and policies with proper permissions
- Resource tagging for subnets, security groups, and AMIs
- Harness service accounts and API tokens

<details>
<summary><b>Click to expand the Terraform template</b></summary>

```hcl
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.86"
    }
    harness = {
      source  = "harness/harness"
      version = "0.35.3"
    }
  }

  required_version = ">= 1.2.0"
}

provider "aws" {
  region = "us-east-2"
}

variable "cluster" {
  type = object({
    name                     = string
    oidc_arn                 = string
    subnets                  = list(string)
    security_groups          = list(string)
    ami                      = string
    k8s_connector_id         = string
    existing_node_role       = string
    eks_pod_identity_enabled = bool
  })

  default = {
    name                     = "cluster-xxx-xxx"                                                   // Replace with your EKS cluster Name
    oidc_arn                 = "arn:aws:iam::xxx:oidc-provider/oidc.eks.xxx.amazonaws.com/id/xxxx" // Replace with your OIDC Provder ARN for the cluster
    subnets                  = ["eksctl-xxx"]                                                      // Replace with the names of subnets used in your EKS cluster
    security_groups          = ["eks-cluster-sg-xxx"]                                              // Replace with the names of security groups used in your EKS cluster
    ami                      = "ami-i0xxxxxxxxx"                                                   // Replace with the id of AMI used in your EKS cluster
    k8s_connector_id         = "xxx"                                                               // Replace with the ID of harness ccm kubernetes connector for the cluster
    existing_node_role       = "RoleNameXXXX"
    eks_pod_identity_enabled = false                                                               // Set to true if eks pod identity is enabled in the cluster   
  }

}

variable "harness" {
  type = object({
    endpoint                          = string
    account_id                        = string
    platform_api_key                  = string
    cluster_orch_service_account_name = string
    cluster_orch_namespace            = string
  })

  default = {
    endpoint                          = "https://app.harness.io/gateway"
    account_id                        = "xxx"                                                   // Replace with your Harness Account ID
    platform_api_key                  = "pat.xxx.xxx.xxx"                                       // Replace with your Harness API key
    cluster_orch_service_account_name = "ccm-clusterorchestrator"                               // Name of the service account used by cluster orchestrator
    cluster_orch_namespace            = "kube-system"                                           // Namespace where the cluster orchestrator will be deployed
  }
}

provider "harness" {
  endpoint         = var.harness.endpoint
  account_id       = var.harness.account_id
  platform_api_key = var.harness.platform_api_key

}


data "aws_eks_cluster" "cluster" {
  name = var.cluster.name
}

data "aws_iam_openid_connect_provider" "cluster_oidc" {
  count = var.cluster.eks_pod_identity_enabled ? 0 : 1
  arn   = var.cluster.oidc_arn
}

data "aws_subnets" "cluster_subnets" {
  filter {
    name   = "tag:Name"
    values = var.cluster.subnets
  }
}
data "aws_security_groups" "cluster_security_groups" {
  filter {
    name   = "group-name"
    values = var.cluster.security_groups
  }
}


resource "aws_ec2_tag" "cluster_subnet_tag" {
  for_each    = toset(data.aws_subnets.cluster_subnets.ids)
  resource_id = each.value
  key         = format("harness.io/%s", substr(data.aws_eks_cluster.cluster.name, 0, 40))
  value       = "owned"
}

resource "aws_ec2_tag" "cluster_security_group_tag" {
  for_each    = toset(data.aws_security_groups.cluster_security_groups.ids)
  resource_id = each.value
  key         = format("harness.io/%s", substr(data.aws_eks_cluster.cluster.name, 0, 40))
  value       = "owned"
}

resource "aws_ec2_tag" "cluster_ami_tag" {
  resource_id = var.cluster.ami
  key         = format("harness.io/%s", substr(data.aws_eks_cluster.cluster.name, 0, 40))
  value       = "owned"
}

data "aws_iam_policy_document" "assume_inline_policy" {
  statement {
    actions = ["sts:AssumeRole"]
    principals {
      type        = "Service"
      identifiers = ["ec2.amazonaws.com"]
    }
    effect = "Allow"
  }
}

resource "aws_iam_role" "node_role" {
  name                = format("%s-%s-%s", "harness-ccm", substr(data.aws_eks_cluster.cluster.name, 0, 40), "node")
  assume_role_policy  = data.aws_iam_policy_document.assume_inline_policy.json
  description         = format("%s %s %s", "Role to manage", data.aws_eks_cluster.cluster.name, "EKS cluster used by Harness CCM")
  managed_policy_arns = ["arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly", "arn:aws:iam::aws:policy/AmazonEKS_CNI_Policy", "arn:aws:iam::aws:policy/AmazonEKSClusterPolicy", "arn:aws:iam::aws:policy/AmazonEKSWorkerNodePolicy", "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"]
}

resource "aws_eks_access_entry" "node_role_entry" {
  cluster_name  = var.cluster.name
  principal_arn = aws_iam_role.node_role.arn
  type          = "EC2_LINUX"
}

resource "aws_iam_instance_profile" "instance_profile" {
  name = format("%s-%s-%s", "harness-ccm", substr(data.aws_eks_cluster.cluster.name, 0, 40), "inst-prof")
  role = aws_iam_role.node_role.name
}

resource "aws_iam_policy" "controller_role_policy" {
  name_prefix = "ClusterOrchestratorControllerPolicy"
  policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Action" : [
          "ec2:CreateLaunchTemplate",
          "ec2:CreateFleet",
          "ec2:RunInstances",
          "ec2:CreateTags",
          "iam:PassRole",
          "ec2:TerminateInstances",
          "ec2:DeleteLaunchTemplate",
          "ec2:DescribeLaunchTemplates",
          "ec2:DescribeInstances",
          "ec2:DescribeSecurityGroups",
          "ec2:DescribeSubnets",
          "ec2:DescribeInstanceTypes",
          "ec2:DescribeInstanceTypeOfferings",
          "ec2:DescribeAvailabilityZones",
          "ssm:GetParameter",
          "pricing:GetProducts",
          "ec2:DescribeSpotPriceHistory",
          "ec2:DescribeImages"
          "ec2:GetSpotPlacementScores"
        ],
        "Resource" : "*",
        "Effect" : "Allow"
      }
    ]
  })
}

data "aws_iam_policy_document" "oidc_controller_trust_policy" {
  statement {
    actions = ["sts:AssumeRole", "sts:AssumeRoleWithWebIdentity"]
    principals {
      type        = "Federated"
      identifiers = var.cluster.eks_pod_identity_enabled ? [] : [data.aws_iam_openid_connect_provider.cluster_oidc[0].arn]
    }
    effect = "Allow"
  }
}

data "aws_iam_policy_document" "pod_identity_controller_trust_policy" {
  statement {
    sid    = "AllowEksAuthToAssumeRoleForPodIdentity"
    effect = "Allow"
    principals {
      type        = "Service"
      identifiers = ["pods.eks.amazonaws.com"]
    }
    actions = ["sts:AssumeRole", "sts:TagSession"]
  }
}


resource "aws_iam_role" "controller_role" {
  name                = format("%s-%s-%s", "harness-ccm", substr(data.aws_eks_cluster.cluster.name, 0, 40), "controller")
  assume_role_policy  = var.cluster.eks_pod_identity_enabled ? data.aws_iam_policy_document.pod_identity_controller_trust_policy.json : data.aws_iam_policy_document.oidc_controller_trust_policy.json
  description         = format("%s %s %s", "Role to manage", data.aws_eks_cluster.cluster.name, "EKS cluster controller used by Harness CCM")
  managed_policy_arns = [aws_iam_policy.controller_role_policy.arn]
}

/*
uncomment to create eks addon for pod identity agent, if "eks-pod-identity-agent" is not present as addon in the cluster

resource "aws_eks_addon" "pod-identity-agent" {
  count        = var.cluster.eks_pod_identity_enabled ? 1 : 0
  cluster_name = var.cluster.name
  addon_name   = "eks-pod-identity-agent"
}
*/

resource "aws_eks_pod_identity_association" "pod_identity_association" {
  count           = var.cluster.eks_pod_identity_enabled ? 1 : 0
  cluster_name    = data.aws_eks_cluster.cluster.name
  namespace       = var.harness.cluster_orch_namespace
  service_account = var.harness.cluster_orch_service_account_name
  role_arn        = aws_iam_role.controller_role.arn
}

resource "aws_iam_role_policy" "harness_describe_permissions" {
  name = "HarnessDescribePermissions"
  role = var.cluster.existing_node_role

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "ec2:DescribeImages",
          "ec2:DescribeInstanceTypeOfferings",
          "ec2:DescribeInstanceTypes",
          "ec2:DescribeAvailabilityZones",
          "ec2:DescribeLaunchTemplates",
          "ec2:CreateLaunchTemplate",
          "ec2:CreateTags",
          "pricing:GetProducts",
		   "ec2:DescribeSpotPriceHistory",
		   "ec2:CreateFleet",
		   "iam:PassRole",
		   "ec2:RunInstances",
		   "ec2:DeleteLaunchTemplate",
           "ec2:TerminateInstances"
        ]
        Effect   = "Allow"
        Resource = "*"
      },
    ]
  })
}

resource "harness_cluster_orchestrator" "cluster_orchestrator" {
  name             = substr(data.aws_eks_cluster.cluster.name, 0, 40)
  cluster_endpoint = data.aws_eks_cluster.cluster.endpoint
  k8s_connector_id = var.cluster.k8s_connector_id
}

resource "harness_platform_service_account" "cluster_orch_service_account" {
  identifier  = replace(substr(data.aws_eks_cluster.cluster.name, 0, 40), "-", "_")
  name        = substr(data.aws_eks_cluster.cluster.name, 0, 40)
  email       = "email@service.harness.io"
  description = "service account for cluster orchestrator"
  account_id  = var.harness.account_id
}

resource "harness_platform_role_assignments" "cluster_orch_role" {
  resource_group_identifier = "_all_account_level_resources"
  role_identifier           = "_account_admin"
  principal {
    identifier = harness_platform_service_account.cluster_orch_service_account.id
    type       = "SERVICE_ACCOUNT"
  }
}

resource "harness_platform_apikey" "api_key" {
  identifier  = replace(substr(data.aws_eks_cluster.cluster.name, 0, 40), "-", "_")
  name        = substr(data.aws_eks_cluster.cluster.name, 0, 40)
  parent_id   = harness_platform_service_account.cluster_orch_service_account.id
  apikey_type = "SERVICE_ACCOUNT"
  account_id  = var.harness.account_id
}

resource "harness_platform_token" "api_token" {
  identifier  = "token"
  name        = replace(substr(data.aws_eks_cluster.cluster.name, 0, 40), "-", "_")
  parent_id   = harness_platform_service_account.cluster_orch_service_account.id
  account_id  = var.harness.account_id
  apikey_type = "SERVICE_ACCOUNT"
  apikey_id   = harness_platform_apikey.api_key.id
}

output "harness_ccm_token" {
  value     = harness_platform_token.api_token.value
  sensitive = true
}

output "eks_cluster_controller_role_arn" {
  value = aws_iam_role.controller_role.arn
}

output "eks_cluster_default_instance_profile" {
  value = aws_iam_instance_profile.instance_profile.name
}

output "eks_cluster_node_role_arn" {
  value = aws_iam_role.node_role.arn
}

output "harness_cluster_orchestrator_id" {
  value = harness_cluster_orchestrator.cluster_orchestrator.id
}

```
</details>

#### How to Run the Terraform Script

1. Save the above template to a file named `cluster-orchestrator.tf`
2. Update the placeholder values in the `default` blocks with your actual EKS cluster and Harness account information
3. Initialize and apply the Terraform configuration:

```bash
terraform init
terraform apply
```

#### Important Terraform Outputs

After successful execution, Terraform will generate several outputs required for the Helm installation:

| Output | Description |
|--------|-------------|
| `harness_ccm_token` | The Harness CCM token (sensitive value) |
| `eks_cluster_controller_role_arn` | The ARN for the EKS cluster controller role |
| `eks_cluster_default_instance_profile` | The name of the default EC2 instance profile |
| `eks_cluster_node_role_arn` | The ARN for the node IAM role |
| `harness_cluster_orchestrator_id` | The Cluster Orchestrator ID |

### Step 2: Configure Helm for Cluster Orchestrator Installation

#### 1. Add the Harness CCM Cluster Orchestrator Helm Repository

```bash
helm repo add harness-ccm-cluster-orchestrator https://lightwing-downloads.s3.ap-southeast-1.amazonaws.com/cluster-orchestrator-helm-chart
```

#### 2. Update the Helm Repository

```bash
helm repo update harness-ccm-cluster-orchestrator
```

### Step 3: Install the Cluster Orchestrator

#### 1. Retrieve the Terraform Output Values

To get the sensitive token value, run:

```bash
terraform output harness_ccm_token
```

For other values, you can run:

```bash
terraform output
```

#### 2. Install the Helm Chart

Use the following command to install the Cluster Orchestrator, replacing the placeholders with values from your Terraform outputs:

```bash
helm install harness-ccm-cluster-orchestrator --namespace kube-system \
  harness-ccm-cluster-orchestrator/harness-ccm-cluster-orchestrator \
  --set harness.accountID="<harness_account_id>" \
  --set harness.k8sConnectorID="<k8s_connector_id>" \
  --set harness.ccm.secret.token="<harness_ccm_token>" \
  --set eksCluster.name="<eks_cluster_name>" \
  --set eksCluster.region="<eks_cluster_region>" \
  --set eksCluster.controllerRoleARN="<eks_cluster_controller_role_arn>" \
  --set eksCluster.endpoint="<eks_cluster_endpoint>" \
  --set eksCluster.defaultInstanceProfile.name="<eks_cluster_default_instance_profile>" \
  --set eksCluster.nodeRole.arn="<eks_cluster_node_role_arn>" \
  --set clusterOrchestrator.id="<cluster_orchestrator_id>"
```

## Troubleshooting

### Missing OIDC Provider

If your cluster doesn't have an OIDC provider ARN configured, you can create one with the following command:

```bash
eksctl utils associate-iam-oidc-provider --region <your_cluster_region> --cluster <your_cluster> --approve
```

### Verifying Installation

Check if the Cluster Orchestrator pods are running correctly:

```bash
kubectl get pods -n kube-system | grep cluster-orchestrator
```

## Next Steps

After successful installation:

1. Navigate to the Harness CCM module to verify the Cluster Orchestrator is connected
2. Configure optimization policies in the Harness CCM UI
3. Monitor your cluster for cost optimizations in the Harness dashboard
