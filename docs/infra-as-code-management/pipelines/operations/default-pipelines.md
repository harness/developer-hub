---
title: Default pipelines
description: Learn how to use Harness IaCM default pipelines
sidebar_position: 10
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The IaCM Default Pipelines feature simplifies the process of provisioning, destroying, and managing infrastructure workspaces by providing quick access to your pre-configured pipelines. These pipelines can be created in the normal fashion, and assigned as default at your project level, and can be triggered within any of that projects workspaces. This provides a much more streamlined experience and help to ensure consistency across all of your workspace.

In addition, as some workspace may require alternative approaches, overwrite your default pipelines at the workspace level without disrupting those at or parented by the project level default pipelines.

:::warning danger zone
A pipeline containing the `destroy` command will remove all saved infrastructure state from your Harness workspace.
:::

:::note permissions
Only administrators can assign default pipelines, and all users can run them. 
:::

### Prerequisites

Before you can use the IaCM Default Pipelines, ensure that:

1. You have the necessary permissions to view and execute pipelines in your project. `e.g. RBAC via the API`
2. The project has IaCM enabled.
3. You have created pipelines to Provision, Plan and Destroy and Check for drift to be assigned as defaults.

### Configuring Default Pipelines

<Tabs>
<TabItem value="Interactive guide">
<iframe 
    src="<Tango-URL>" 
    title="<Tango-Title>" 
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
1. **Access the Default Settings:** Navigate to the 'Default Settings' section under IaCM in your project.
2. **Define Default Pipelines:** You can either select existing pipelines or generate OOTB default pipelines for the following operations:
    - **Provision:** Pipeline for initializing, planning, approving, and applying changes.
    - **Destroy:** Pipeline for initializing, planning, approving, and destroying infrastructure.
    - **Detect Drift:** Pipeline for detecting configuration drifts.
    - **Plan:** Pipeline for running the plan phase only.
3. **Validate Pipelines:** Ensure the selected or generated pipelines meet the criteria:
    - Contains at least one IaCM stage.
    - Workspace is set as a runtime input.
</TabItem>
</Tabs>


### Run default pipelines from your workspace

<Tabs>
<TabItem value="Interactive guide">
<iframe 
    src="<Tango-URL>" 
    title="<Tango-Title>" 
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
- **Provisioning and Destroying:** From within the workspace, use the 'Provision' and 'Destroy' buttons to trigger the respective default pipelines.
- **Drift Detection and Planning:** Use the respective buttons to run drift detection and plan operations.
- **Monitor Execution:** The progress of the pipeline execution can be viewed directly from the workspace. `where?`
</TabItem>
</Tabs>
