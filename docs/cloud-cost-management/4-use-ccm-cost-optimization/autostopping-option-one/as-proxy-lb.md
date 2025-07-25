---
title: AutoStopping Proxy and Load Balancer
description: Learn how to get started with CCM with your chosen cloud provider.
sidebar_position: 20
sidebar_label: Get Started
-----

import DynamicMarkdownSelector from '@site/src/components/DynamicMarkdownSelector/DynamicMarkdownSelector';

Select your cloud provider below to get started. You’ll connect your account, review your associated resource costs, and begin your journey to effective cloud cost management with Harness CCM.

<DynamicMarkdownSelector
  options={{
    Kubernetes: {
      path: "/cloud-cost-management/autostopping-option-one/content/aws-proxy-lb.md",
      logo: "/cloud-providers/kubernetes-logo.svg",
      logoSize: 32
    },
    AWS: {
      path: "/cloud-cost-management/autostopping-option-one/content/aws-proxy-lb.md",
      logo: "/cloud-providers/aws-logo.svg",
      iconOnly: true,
      logoSize: 40
    },
    GCP: {
      path: "/cloud-cost-management/autostopping-option-one/content/gcp-proxy-lb.md",
      logo: "/cloud-providers/gcp-logo.svg",
      logoSize: 32
    },
    Azure: {
      path: "/cloud-cost-management/autostopping-option-one/content/azure-proxy-lb.md",
      logo: "/cloud-providers/azure-logo.svg",
      logoSize: 32
    }
  }}
/>