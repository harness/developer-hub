---
title: ChaosHubs
sidebar_position: 2
description: Centralized repository for chaos experiment templates and faults with dynamic content selection
redirect_from:
- /docs/chaos-engineering/features/chaos-hubs/introduction
- /docs/chaos-engineering/configure-chaos-experiments/chaos-hubs/introduction
- /docs/category/chaoshub
- /docs/category/chaos-hubs
- /docs/chaos-engineering/guides/chaoshubs/chaoshubs
- /docs/chaos-engineering/guides/chaoshubs/add-chaos-hub
- /docs/chaos-engineering/guides/chaoshubs/manage-hub
- /docs/chaos-engineering/guides/chaoshubs/chaoshub-scopes
---

:::warning Git-based ChaosHubs deprecated
Git-based ChaosHubs have been removed as part of the chaos NG experience GA. The ChaosHubs list page, hub detail pages, Connect/Edit/Sync hub wizards, and all "Add to ChaosHub" and "Push to ChaosHub" actions are no longer available.

Use [Templates](/docs/resilience-testing/chaos-testing/templates) and the [Resilience Probes](/docs/resilience-testing/chaos-testing/probes) flow to manage reusable chaos artifacts instead.
:::

import DynamicMarkdownSelector from '@site/src/components/DynamicMarkdownSelector/DynamicMarkdownSelector';

<DynamicMarkdownSelector
  options={{
    "ChaosHub": {
      path: "/resilience-testing/content/chaoshub/new-chaos-studio.md"
    },
    "Git-based ChaosHub (deprecated)": {
      path: "/resilience-testing/content/chaoshub/old-chaos-studio.md"
    }
  }}
  toc = {toc}
/>
