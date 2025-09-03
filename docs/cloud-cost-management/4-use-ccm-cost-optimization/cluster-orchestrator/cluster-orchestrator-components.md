---
title: Cluster Orchestrator Components
description: Compare Harness Cluster Orchestrator with AWS Karpenter and discover unique advantages
sidebar_position: 5
helpdocs_topic_id: 
helpdocs_category_id: 
helpdocs_is_private: false
helpdocs_is_published: true
---

Cluster Orchestrator deploys several Kubernetes resources to manage and optimize your cluster infrastructure. This document provides a comprehensive overview of all components installed during deployment.

Cluster Orchestrator installation creates a comprehensive set of infrastructure components across both AWS and Kubernetes environments:

## Roles

### AWS 

| Resource | Name | Description |
|----------|------|-------------|
| **IAM Role** | `harness-ccm-<cluster>-node` | IAM role for EKS worker nodes with CCM-required policies |
| **Access Entry** | - | Newer EKS "Access Entries" system to bind IAM role into Kubernetes (system:nodes) |
| **Instance Profile** | `harness-ccm-<cluster>-inst-prof` | Allows EC2 nodes to assume the node IAM role |
| **OIDC Provider** | - | Enables IRSA (IAM Roles for Service Accounts) for secure AWS IAM usage |
| **IAM Policy Update** | - | Adds extra describe/EC2 permissions required for CCM |
| **Resource Tagging** | `harness.io/<cluster>` | Marks infrastructure (SGs, Subnets, AMIs) for CCM resource discovery |

### Harness 

| Resource | Name | Description |
|----------|------|-------------|
| **Service Account** | - | Created via API to represent the cluster orchestrator |
| **API Key + Token** | - | Issued and stored in K8s as a secret for cluster-to-Harness communication |
| **Cluster Registration** | - | Registers your EKS cluster with Harness CCM |

## Components

### Core Resources

| Resource Type | Name | Description |
|--------------|------|-------------|
| **Namespace** | `kube-system` | Default namespace where CCM orchestrator is installed |
| **Secret** | `harness-api-key` | Stores Harness API token for cluster components |

### Cluster Orchestrator Components

| Component Type | Name | Description |
|---------------|------|-------------|
| **Deployment** | `cluster-orch-operator` (harness-ccm) | Main controller managing CCM orchestration inside cluster. Limits: CPU: 1, Memory: 1Gi |
| **Deployment** | `cluster-telemetry-collector` (kube-system) | Collects cluster cost/usage data and sends it to Harness. Limits: CPU: 1, Memory: 1Gi |
| **Service** | `cluster-orch-operator` | Cluster Orchestrator operator service |
| **DaemonSet** | `cluster-orch-interrupt-listener` | Listens for spot preemption events and reports to Harness |

### Service Accounts & RBAC

Each of these components gets a ServiceAccount, ClusterRole, and ClusterRoleBinding:

| Service Account | Purpose |
|----------------|--------|
| `ccm-cluster-orchestrator-operator` | Permissions for the orchestrator operator deployment |
| `ccm-cluster-orchestrator-metrics` | Handles metrics collection for observability |
| `ccm-cluster-orchestrator-interruption` | Manages pod eviction/node interruption handling |

### Custom Resource Definitions (CRDs)

| CRD Name | Purpose |
|----------|--------|
| `nodepools.karpenter.sh` | Defines node pools for Karpenter provisioning |
| `nodeclaims.karpenter.sh` | Manages node claims for Karpenter |
| `ec2nodeclasses.karpenter.k8s.aws` | Defines EC2 node class templates for Karpenter provisioning |
| `workloaddistributionrules.ccm.harness.io` | Harness CCM custom CRD to control workload placement and distribution |

