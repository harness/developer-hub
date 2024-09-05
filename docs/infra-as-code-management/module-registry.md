---
title: Module Registry
description: Learn how to register a module in Harness IaCM
sidebar_position: 70
sidebar_label: Module registry
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

 
With Harness **Module Registry**, you can speed up and simplify your infrastructure management by reusing pre-built modules. This helps you avoid reinventing the wheel every time you need to set up common components, such as virtual machines, databases, or networks.

### Prerequisites

Before you being configuring module registry, ensure that you have:

- Access to your OpenTofu or Terraform environment via [Harness connectors](https://developer.harness.io/docs/infra-as-code-management/get-started/onboarding-guide#add-connectors).
- Access to module registry within your workspace

:::tip
insert tip about the feature
:::

## Configure module registry

To configure module registry and begin enhancing x,y & z, see the following interactive guide:

<Tabs>
<TabItem value="Interactive guide">
<iframe 
    src="<TangoURL>" 
    title="<Tango Title>" 
    style={{ minHeight: '640px' }}
    width="100%" 
    height="100%"
    referrerpolicy="strict-origin-when-cross-origin"
    frameborder="0"
    webkitallowfullscreen="true"
    mozallowfullscreen="true"
    allowfullscreen="true"
></iframe>
</TabItem>
<TabItem value="Step-by-step">
### Configure your module registry
1. In your IaCM module, select **X**, then select **Y**.
2. Select the appropriate option for registries:
   - **Plan:** Pipeline for running the plan phase only.
   - **Provision:** Pipeline for initializing, planning, approving, and applying changes.
   - **Detect Drift:** Pipeline for detecting configuration drifts.
   - **Destroy:** Pipeline for initializing, planning, approving, and destroying infrastructure.
   
### Review your module registry in your workspace
3. Select **X**, then select **Y**.
4. Select the **Configuration** tab and scroll down to **module registry** to inspect or override your default pipelines at the selected workspace-level (this will not override the project-level default pipelines).

### Run your module registry in your workspace
5. While in your workspace, run your default pipelines against it with the `Plan`, `Provision` and `Check for Drift` buttons.
</TabItem>
</Tabs>

