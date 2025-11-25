---
title: Variable Sets
description: Learn how to configure Variable Sets and use them to standardize configuration across multiple workspaces.
sidebar_position: 20
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";


A Variable Set is a reusable collection of environment variables, OpenTofu/Terraform variables, and secrets. They allow you to standardize configuration across multiple workspaces.

Variable Sets are supported at the account, org, and project level:

- Navigate to **Account Settings** > **IaCM Settings** > **Variable Sets**.
- **Create:** Click **Create a new Variable Set**.
- **Update:** Click an existing Variable Set tile.
- **Delete:** Use the ellipsis menu on a Variable Set tile and select **Delete**.

When applied to a workspace, Variable Sets can be prioritized. Variables from a higher-priority set will override those from lower-priority sets.

### Referenced By Tab
When viewing a Variable Set, you can use the **Referenced By** tab to see all workspaces where the variable set is being used. This helps you identify the downstream impact when making changes to a variable set, ensuring you understand which workspaces might be affected by any modifications.

:::info Variable Set Priority
When multiple Variable Sets are applied to a workspace, you can control their priority to determine which values take precedence when conflicts occur:

1. In the Connectors and Variables tab of a workspace, you can view all attached Variable Sets.
2. Variable Sets can be reordered using drag-and-drop functionality to change their priority.
3. The system will clearly indicate when variables conflict between sets, showing which one takes precedence.
4. Priority order is: Priority 1 > Priority 2 > Priority 3, etc.
:::

When variables with the same name exist in multiple Variable Sets, the value from the highest priority set will be used. The interface will show which Variable Set is providing the value that will actually be used during execution.

---

## Input Sources and Runtime Behavior
Each variable shows its **source**, such as:

- `TEMPLATE`: inherited from the selected Template.
- `CUSTOM`: defined directly in the workspace.

You can use **`<+input>`** to prompt users to supply values at runtime.

---

Go to [Connectors and Variables](/docs/infra-as-code-management/configuration/connectors-and-variables/connectors-variables.md) for more information on how Variable Sets are used in workspaces and to understand the order of precedence compared to other variable sources.