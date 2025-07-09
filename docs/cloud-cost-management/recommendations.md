---
title: Recommendations (Dynamic)
description: Learn how to reduce and manage your cloud costs with recommendations.
sidebar_position: 10
---

import DynamicMarkdownSelector from '@site/src/components/DynamicMarkdownSelector/DynamicMarkdownSelector';

Harness Cloud Cost Management (CCM) offers actionable recommendations to help you optimize cloud resource usage and reduce waste. These recommendations are tailored to specific cloud providers and Kubernetes workloads.

Below are the available recommendation types and what they represent:

- **Azure VM Recommendations**: Identify underutilized virtual machines in your Azure environment and suggest rightsizing or termination to reduce spend.
- **AWS EC2 Recommendations**: Analyze EC2 usage to detect idle or oversized instances, offering guidance to optimize instance types or stop them altogether.
- **AWS ECR Recommendations**: Highlight unused container images in Amazon Elastic Container Registry and recommend cleanup actions.
- **Governance Recommendations**: Provide cost governance insights based on tagging, business units, and spending patterns across AWS, GCP, and Azure.
- **Node Pool Recommendations**: Recommend better node pool configurations for your Kubernetes clusters to balance cost and performance, with cloud-specific requirements.
- **Workload Recommendations**: Target inefficient Kubernetes workloads by analyzing CPU/memory utilization and proposing updated resource requests/limits.

---

## Platform Coverage

| Cloud Platform | Azure VM | AWS EC2 | AWS ECR | Governance | Node Pool | Workload |
|----------------|----------|---------|---------|------------|------------|----------|
| **AWS**        | ❌       | ✅      | ✅      | ✅         | ✅         | ❌       |
| **Azure**      | ✅       | ❌      | ❌      | ✅         | ✅         | ❌       |
| **GCP**        | ❌       | ❌      | ❌      | ✅         | ✅         | ❌       |
| **Kubernetes** | ❌       | ❌      | ❌      | ❌         | ✅         | ✅       |

---

Select your cloud provider or Kubernetes to view relevant recommendations:

<DynamicMarkdownSelector
  options={{
    AWS: {
      path: "/cloud-cost-management/content/recommendations/aws-recommendations.md",
      logo: "aws-logo.svg",
      logoSize: 24
    },
    Azure: {
      path: "/cloud-cost-management/content/recommendations/azure-vm.md",
      logo: "azure-logo.svg",
      logoSize: 24
    },
    GCP: {
      path: "/cloud-cost-management/content/recommendations/gcp-recommendations.md",
      logo: "gcp-logo.svg",
      logoSize: 24
    },
    Kubernetes: {
      path: "/cloud-cost-management/content/recommendations/workload-recommendations.md",
      logo: "kubernetes-logo.svg",
      logoSize: 24
    },
  }}
/>