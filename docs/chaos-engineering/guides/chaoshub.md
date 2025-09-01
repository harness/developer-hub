---
title: ChaosHub
sidebar_position: 2
description: Centralized repository for chaos experiment templates and faults with dynamic content selection
---

:::info Chaos Studio Versions
This guide covers ChaosHub for both **Old Chaos Studio** and **New Chaos Studio**. Use the selector below to choose your version:
- **Old Chaos Studio**: For existing customers using the current version
- **New Chaos Studio**: Enhanced experience with new features and improved UI

If you're an existing customer interested in accessing New Chaos Studio features, contact your Harness support representative. For more details, see [New Chaos Studio Features](/docs/chaos-engineering#new-chaos-studio-features).
:::

import DynamicMarkdownSelector from '@site/src/components/DynamicMarkdownSelector/DynamicMarkdownSelector';

<DynamicMarkdownSelector
  options={{
    "Old Chaos Studio": {
      path: "/chaos-engineering/content/chaoshub/old-chaos-studio.md"
    },
    "New Chaos Studio": {
      path: "/chaos-engineering/content/chaoshub/new-chaos-studio.md"
    }
  }}
  toc = {toc}
/>

## Related Topics

- [Connect to ChaosHub](/docs/chaos-engineering/guides/chaoshubs/add-chaos-hub) - Learn how to add custom ChaosHubs
- [Manage ChaosHub](/docs/chaos-engineering/guides/chaoshubs/manage-hub) - Discover how to manage your ChaosHubs  
- [Chaos Hub Scopes](/docs/chaos-engineering/guides/chaoshubs/chaos-hub-scopes) - Understand different scopes for ChaosHubs
- [Chaos Experiments](/docs/chaos-engineering/guides/experiments) - Create and run chaos experiments using ChaosHub templates
