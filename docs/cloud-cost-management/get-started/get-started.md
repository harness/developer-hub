---
title: Get Started
description: Learn how to get started with CCM with your chosen cloud provider.
sidebar_position: 20
sidebar_label: Get Started
---

import DynamicMarkdownSelector from '@site/src/components/DynamicMarkdownSelector/DynamicMarkdownSelector';

## Get Started intro heading

### Get Started intro subheading {#get-started-intro-subheading}

Harness Cloud Cost Management (CCM) is a comprehensive solution designed to help your gain visibility and control over your cloud spending. By integrating seamlessly with major cloud providers, Harness CCM enables teams to **monitor, analyse, and optimize cloud costs across multiple environments**. 

With features like **automated cost allocation, real-time reporting, and actionable insights**, CCM empowers engineering, finance, and DevOps teams to make data-driven decisions, reduce waste, and maximize the value of their cloud investments.

---

Select your cloud provider below to get started. You’ll connect your account, review your associated resource costs, and begin your journey to effective cloud cost management with Harness CCM.

<DynamicMarkdownSelector
  options={{
    Kubernetes: {
      path: "/cloud-cost-management/content/get-started/kubernetes-quickstart.md",
      logo: "/cloud-providers/kubernetes-logo.svg",
      logoSize: 32
    },
    AWS: {
      path: "/cloud-cost-management/content/get-started/aws-quickstart.md",
      logo: "/cloud-providers/aws-logo.svg",
      iconOnly: true,
      logoSize: 40
    },
    GCP: {
      path: "/cloud-cost-management/content/get-started/gcp-quickstart.md",
      logo: "/cloud-providers/gcp-logo.svg",
      logoSize: 32
    },
    Azure: {
      path: "/cloud-cost-management/content/get-started/azure-quickstart.md",
      logo: "/cloud-providers/azure-logo.svg",
      logoSize: 32
    }
  }}
  toc={toc}
  precedingHeadingID='get-started-intro-subheading'
  nextHeadingID='get-started-concluding-heading'
/>



## Get Started concluding heading {#get-started-concluding-heading}

### Something else

## Last heading at the end {#last-heading-at-the-end}