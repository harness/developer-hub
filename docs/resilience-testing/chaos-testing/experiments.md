---
title: Chaos Experiments
sidebar_position: 1
description: Advanced chaos experiments with dynamic content selection
---

import DynamicMarkdownSelector from '@site/src/components/DynamicMarkdownSelector/DynamicMarkdownSelector';

<DynamicMarkdownSelector
  options={{
    "Chaos Studio": {
      path: "/resilience-testing/content/experiments/new-chaos-studio.md"
    },
    "Legacy Chaos Studio (deprecated)": {
      path: "/resilience-testing/content/experiments/old-chaos-studio.md"
    }
  }}
  toc = {toc}
/>

## Next Steps

- [Learn about Probes](./probes) - Validate system health and behavior during experiments
- [Explore Actions](./actions) - Execute custom operations, delays, and scripts during experiments  
- [Browse Chaos Faults](/docs/chaos-engineering/faults/chaos-faults) - Discover available fault types for your experiments


