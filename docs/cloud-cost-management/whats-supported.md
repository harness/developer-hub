---
title: What's supported in Harness CACM
description: Supported platforms and feature support matrix for Harness CACM.
sidebar_label: What's supported
sidebar_position: 1
---



import Ccm from '/docs/cloud-cost-management/shared/ccm-supported-platforms.md';

<Ccm />

---

## Supported Environments
Harness CACM supports the following platforms and orchestration systems:

### Cloud Platforms
- AWS
- GCP
- Azure

### Container Orchestration
- Kubernetes: EKS (AWS), GKE (GCP), AKS (Azure)
- ECS Clusters

### Deployment Model
- Harness SaaS

---

### Supported Kubernetes Management Platform
The following section lists the support for Kubernetes management platform for CACM:

| **Technology**               | **Supported Platform** | **Pricing**      |
| ---------------------------- | ---------------------- | ---------------- |
| OpenShift 3.11               | GCP                    | GCP              |
| OpenShift 4.3                | AWSOn-Prem             | AWSCustom-rate\* |
| Rancher                      | AWS                    | Custom-rate\*\*  |
| Kops (Kubernetes Operations) | AWS                    | AWS              |

- Cost data is supported for On-Prem OpenShift 4.3. This uses a custom rate.
- Cost data is supported for K8s workloads on AWS managed by Rancher, but the cost falls back to the custom rate.

