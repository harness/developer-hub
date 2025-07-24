---
title: Get Started
description: Learn how to get started with CCM with your chosen cloud provider.
sidebar_position: 20
sidebar_label: Get Started
redirect_from: 
- /docs/cloud-cost-management/get-started/onboarding-guide/set-up-cost-visibility-for-aws
- /docs/cloud-cost-management/get-started/onboarding-guide/set-up-cost-visibility-for-azure
- /docs/cloud-cost-management/get-started/onboarding-guide/set-up-cost-visibility-for-gcp
- /docs/cloud-cost-management/get-started/onboarding-guide/set-up-cost-visibility-for-kubernetes
- /docs/cloud-cost-management/get-started/onboarding-guide/use-quick-create-k8s
---

import DynamicMarkdownSelector from '@site/src/components/DynamicMarkdownSelector/DynamicMarkdownSelector';

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
  toc = {toc}
/>