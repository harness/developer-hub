---
title: Default pipelines
description: Learn how to use Harness IaCM default pipelines
sidebar_position: 10
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The IaCM Default Pipelines feature simplifies the process of provisioning, destroying, and managing infrastructure workspaces by providing out-of-the-box (OOTB) pipelines. These pipelines are automatically created for each project and can be customized or overridden at the workspace level. The goal is to streamline workflows while maintaining flexibility and control.

### Prerequisites

Before you can use the IaCM Default Pipelines, ensure that:

1. You have the necessary permissions to view and execute pipelines in your project. `e.g. RBAC via the API`
2. The project has IaCM enabled.
3. The Default Pipelines have been configured or generated for your project. `How is this done`

### Configuring Default Pipelines `Interactive guide`

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


### Using Default Pipelines in Workspaces `interactive guide`

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

### Overriding Default Pipelines

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
In cases where a workspace requires a different pipeline:

1. **Go to Workspace Configuration:** Within the workspace, navigate to the 'Configuration' section.
2. **Override the Default Pipeline:** Select a different pipeline for each operation (Provision, Destroy, Detect Drift, Plan).
3. **Revert to Default:** If needed, revert to the default pipeline settings defined at the project level.
</TabItem>
</Tabs>
