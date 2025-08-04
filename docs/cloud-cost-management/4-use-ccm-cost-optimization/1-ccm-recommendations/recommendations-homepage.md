---
title: Recommendations in Harness CCM
description: Learn how to get started with CCM with your chosen cloud provider.
sidebar_position: 20
sidebar_label: Recommendations 
redirect_from: 
- /docs/cloud-cost-management/use-ccm-cost-optimization/ccm-recommendations/azure-vm
- /docs/cloud-cost-management/use-ccm-cost-optimization/ccm-recommendations/ec2-recommendations
- /docs/cloud-cost-management/use-ccm-cost-optimization/ccm-recommendations/ecs-recommendations
- /docs/cloud-cost-management/use-ccm-cost-optimization/ccm-recommendations/governance
- /docs/cloud-cost-management/use-ccm-cost-optimization/ccm-recommendations/node-pool-recommendations
- /docs/cloud-cost-management/use-ccm-cost-optimization/ccm-recommendations/workload-recommendations
---

import DynamicMarkdownSelector from '@site/src/components/DynamicMarkdownSelector/DynamicMarkdownSelector';

<DynamicMarkdownSelector
  options={{
    Kubernetes: {
      path: "/cloud-cost-management/content/recommendations/kubernetes-rec.md",
      logo: "/cloud-providers/kubernetes-logo.svg",
      logoSize: 32
    },
    AWS: {
      path: "/cloud-cost-management/content/recommendations/aws-rec.md",
      logo: "/cloud-providers/aws-logo.svg",
      iconOnly: true,
      logoSize: 40
    },
    GCP: {
      path: "/cloud-cost-management/content/recommendations/gcp-rec.md",
      logo: "/cloud-providers/gcp-logo.svg",
      logoSize: 32
    },
    Azure: {
      path: "/cloud-cost-management/content/recommendations/azure-rec.md",
      logo: "/cloud-providers/azure-logo.svg",
      logoSize: 32
    }
  }}
  toc = {toc}
/>