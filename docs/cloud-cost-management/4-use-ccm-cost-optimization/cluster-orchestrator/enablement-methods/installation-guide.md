---
title: Installation Guide
description: Learn how to set up and configure Harness Cluster Orchestrator for AWS EKS using Terraform and Helm
sidebar_position: 2
helpdocs_topic_id: 
helpdocs_category_id: 
helpdocs_is_private: false
helpdocs_is_published: true
redirect_from: 
    - /docs/cloud-cost-management/use-ccm-cost-optimization/cluster-orchestrator/setting-up-co
---


# Harness Cluster Orchestrator Installation Guide

This guide covers the installation and setup of Harness Cluster Orchestrator for AWS EKS clusters using the enablement script.

## Prerequisites

### Required Tools

| Tool | Minimum Version | Purpose |
|------|-----------------|---------|
| **AWS CLI** | 2.15.10 | AWS service interaction and IAM configuration |
| **Helm** | v3.x | Kubernetes package management (recommended) |
| **kubectl** | 1.20+ | Kubernetes cluster management |

### AWS Permissions

Your AWS credentials must have permissions for:

- **EKS**: Describe clusters, update cluster configuration
- **IAM**: Create/update roles, policies, and instance profiles
- **EC2**: Create/modify tags, describe instances and security groups
- **STS**: Assume roles for OIDC provider integration

### Kubernetes Permissions

Your kubectl context must have cluster-admin permissions or equivalent to:

- Create namespaces, deployments, and services
- Create and modify CRDs (Custom Resource Definitions)
- Create service accounts and RBAC resources
- Install Helm charts

### Harness Prerequisites

1. **Active Harness Account** with CCM module enabled
2. **Kubernetes Connector** configured for your cluster
3. **API Token** with CCM permissions

---

## Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `CLUSTER_NAME` | EKS cluster name as it appears in AWS | `production-eks-cluster` |
| `REGION` | AWS region where your cluster is deployed | `us-west-2` |
| `CCM_K8S_CONNECTOR_ID` | Harness CCM Kubernetes connector ID | `prod_eks_connector` |
| `TOKEN` | Harness API token for authentication | `sat.myaccount.abc123...` |

---

## Installation Methods

### Helm Installation 

Helm provides:

- **Lifecycle Management** - Easy upgrades, rollbacks, and uninstallation
- **Configuration Management** - Centralized values.yaml for all settings
- **Version Control** - Track installed versions and changes
- **Atomic Operations** - All-or-nothing deployments with automatic rollback

To see detailed instructions for Helm installation, refer to the [Helm Installation Guide](/docs/cloud-cost-management/use-ccm-cost-optimization/cluster-orchestrator/enablement-methods/setting-up-co-helm).

### kubectl Installation

Direct kubectl installation using YAML manifests is supported for backward compatibility.

To see detailed instructions for kubectl installation, refer to the [kubectl Installation Guide](/docs/cloud-cost-management/use-ccm-cost-optimization/cluster-orchestrator/enablement-methods/kubectl).

### Migration from kubectl to Helm

If you have an existing kubectl-based installation, the script provides automated migration:

1. **Run the enablement script** as you normally would
2. **Script detects** existing kubectl-managed deployments
3. **Prompt appears:**
   ```
   Legacy kubectl deployment detected.
   Migrate to Helm? (upgrades, rollbacks, history - ~1-2 min downtime)
   Migrate to Helm? (y/n):
   ```
4. **Enter `y`** to proceed with migration

The script will:
- Scale down existing deployments to 0 replicas
- Delete old kubectl-managed resources
- Label existing CRDs for Helm adoption
- Install fresh via Helm with same configuration

> **Expected Downtime:** 1-2 minutes during migration

---

## Autoscaler Management

Cluster Orchestrator replaces traditional Kubernetes autoscalers. The script automatically detects and manages existing autoscalers.

### Automatic Detection

The script checks for existing autoscalers in:

- **Karpenter**: `karpenter-system` and `kube-system` namespaces
- **Cluster Autoscaler**: `kube-system` namespace
- **Custom locations**: Interactive mode allows specifying custom namespaces

### Scale-Down Process

**Interactive Mode:**
1. Script displays detected autoscaler details
2. Prompts for confirmation to scale down
3. Scales deployment to 0 replicas (does not delete)
4. Continues with installation

**Non-Interactive Mode (`AUTO_APPROVE=true`):**
- Automatically scales down detected autoscalers
- No user confirmation required
- All actions logged for audit trail

### Legacy Karpenter Detection

If legacy Karpenter v1alpha5 provisioners are detected, the script will:

1. Display a warning message
2. Exit with instructions to upgrade Karpenter first
3. Provide a link to the [Karpenter upgrade guide](https://karpenter.sh/docs/upgrading/upgrade-guide/)

> **Note:** You must upgrade to Karpenter v1beta1 or later before enabling Cluster Orchestrator.

---

## Installation Steps

### Step 1: Set Environment Variables

```bash
# Required
export CLUSTER_NAME="your-cluster-name"
export REGION="us-west-2"
export CCM_K8S_CONNECTOR_ID="your_connector_id"
export TOKEN="your-harness-api-token"

# Optional
export INSTALL_NAMESPACE="kube-system"
export VPA_ENABLED=false
export CLUSTER_ORCH_CHANNEL="stable"
```

### Step 2: Configure kubectl Context

```bash
# Update kubeconfig for your EKS cluster
aws eks update-kubeconfig --name $CLUSTER_NAME --region $REGION

# Verify connection
kubectl cluster-info
kubectl get nodes
```

### Step 3: Run the Enablement Script

Get the enablement script from the Harness UI:

1. Navigate to **Cloud Costs > Cluster Orchestrator**
2. Click **Enable Cluster Orchestrator**
3. Select your cluster and click **Generate Script**
4. Run the generated command

```bash
curl -fsSL https://app.harness.io/gateway/ccm/api/cluster-orchestrator/enable-script?accountIdentifier=YOUR_ACCOUNT_ID | bash
```

### Step 4: Verify Installation

```bash
# Check Cluster Orchestrator pods
kubectl get pods -n $INSTALL_NAMESPACE | grep -E "cluster-orch|harness"

# Check Helm release (if installed via Helm)
helm list -n $INSTALL_NAMESPACE

# Verify in Harness UI
# Navigate to Cloud Costs > Cluster Orchestrator
# Your cluster should show "Connected" status
```

---

