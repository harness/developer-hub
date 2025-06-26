---
title: Get Started
description: Learn about supported formats in your workspace tabs. 
sidebar_position: 10
sidebar_label: Get Started (Dynamic)
---

import DynamicMarkdownSelector from '@site/src/components/DynamicMarkdownSelector/DynamicMarkdownSelector';

Harness Cloud Cost Management (CCM) is a comprehensive solution designed to help your gain visibility and control over your cloud spending. By integrating seamlessly with major cloud providers, Harness CCM enables teams to **monitor, analyse, and optimize cloud costs across multiple environments**. 

With features like **automated cost allocation, real-time reporting, and actionable insights**, CCM empowers engineering, finance, and DevOps teams to make data-driven decisions, reduce waste, and maximize the value of their cloud investments.

---

Select your cloud provider below to get started. You’ll connect your account, review your associated resource costs, and begin your journey to effective cloud cost management with Harness CCM.

<DynamicMarkdownSelector
  options={{
    Kubernetes: {
      path: "/cloud-cost-management/content/get-started/kubernetes-quickstart.md",
      logo: "kubernetes-logo.svg",
      logoSize: 32
    },
    AWS: {
      path: "/cloud-cost-management/content/get-started/aws-quickstart.md",
      logo: "aws-logo.svg",
      iconOnly: true,
      logoSize: 40
    },
    GCP: {
      path: "/cloud-cost-management/content/get-started/gcp-quickstart.md",
      logo: "gcp-logo.svg",
      logoSize: 32
    },
    Azure: {
      path: "/cloud-cost-management/content/get-started/azure-quickstart.md",
      logo: "azure-logo.svg",
      logoSize: 32
    }
  }}
/>

