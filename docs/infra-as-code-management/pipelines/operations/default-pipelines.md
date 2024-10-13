---
title: Default pipelines
description: Learn how to use Harness IaCM default pipelines
sidebar_position: 10
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

IaCM Default Pipelines simplify the process of provisioning, destroying, and managing infrastructure workspaces by providing quick access to your pre-configured pipelines. These pipelines can be created in the normal fashion, assigned as defaults at the project level and  triggered within any of that project's workspaces. This provides a much more streamlined experience and helps to ensure consistency across all of your workspaces.

In addition, as some workspaces may require specialized pipelines, you can overwrite the defaults at the workspace level. This will not disrupt any other workspace using the project level defaults.

:::warning danger zone
A pipeline containing the `destroy` command will remove all saved infrastructure managed by your Harness workspace.
:::

### Prerequisites

- You have created pipelines to Provision, Plan, Destroy and Check for drift to be assigned as defaults. 

<iframe 
    src="https://www.youtube.com/embed/KvdzUWs8urE" 
    title="Harness IaCM: Default Pipelines" 
    style={{ minHeight: '540px' }}
    width="100%" 
    height="100%"
    referrerpolicy="strict-origin-when-cross-origin"
    frameborder="0"
    webkitallowfullscreen="true"
    mozallowfullscreen="true"
    allowfullscreen="true"
></iframe>

### Configure and run default pipelines

<Tabs>
<TabItem value="Interactive guide">
<iframe 
    src="https://app.tango.us/app/embed/82d2b223-b468-4cdf-a311-be4fdf59ce6c" 
    title="Harness IaCM: Default Pipelines" 
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

### Set your project-level default pipelines
1. In your IaCM module, select **Project settings**, then select **IaCM Defaults**.
2. Select the appropriate pipelines for your default categories and frameworks (OpenTofu / Terraform):
   - **Plan:** Pipeline for running the plan only.
   - **Provision:** Pipeline for initializing, planning, approving, and applying changes.
   - **Detect Drift:** Pipeline for detecting drift between your configuration and provider state. 
   - **Destroy:** Pipeline for initializing, planning, approving, and destroying infrastructure.

### Review your default pipelines in your workspace
3. Select **Workspaces**, then select one of your workspaces to run your default pipelines.
4. Select the **Configuration** tab and scroll down to **Default pipelines** to inspect or override your default pipelines at the selected workspace-level (this will not effect your project level settings).

### Run your default pipelines in your workspace
5. While in your workspace, run your default pipelines against it with the `Plan`, `Provision` and `Check for Drift` buttons.

:::note execute the destroy pipeline
To prevent accidental execution, the Destroy pipeline is in your workspace’s **Configuration** tab, under **Danger Zone**.

To run it, select **Destroy workspace**.
:::

</TabItem>
</Tabs>

Review previously run pipelines by selecting your workspace and reviewing the **Execution History** tab.
