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

When you install Cluster Orchestrator, the following components are deployed in your Kubernetes cluster:

### Core Resources

| Resource Type | Name | Description |
|--------------|------|-------------|
| **Namespace** | `kube-system` | Default namespace where CCM orchestrator is installed |
| **Secret** | `harness-api-key` | Stores Harness API token for cluster components |

### Cluster Orchestrator Components

| Component Type | Name | Description |
|---------------|------|-------------|
| **Deployment** | `cluster-orch-operator` (harness-ccm) | Main controller managing CCM orchestration inside cluster |
| **Deployment** | `cluster-telemetry-collector` (kube-system) | Collects cluster cost/usage data and sends it to Harness |
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

