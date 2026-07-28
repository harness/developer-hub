---
title: Variable Sets
sidebar_label: Variable Sets
description: Learn how Variable Sets let you define reusable environment variables, Terraform variables, and secrets once, then apply them across multiple IaCM workspaces.
keywords:
  - variable sets
  - IaCM
  - workspace variables
  - variable priority
  - environment variables
  - OpenTofu
  - Terraform
tags:
  - IaCM
sidebar_position: 20
---

A Variable Set is a reusable collection of connectors, environment variables, OpenTofu or Terraform variables, and secrets. You define a Variable Set once at the account, org, or project level and attach it to multiple workspaces, reducing repeated variable definitions across your infrastructure configuration.

When multiple Variable Sets are attached to a workspace, Harness evaluates them in priority order. Variables from a higher-priority set override those from lower-priority sets, giving you fine-grained control over which values take effect when the same variable name appears in more than one set.

---

## What you will learn

- **Variable Set scopes:** The account, org, and project levels at which Variable Sets can be created and managed.
- **CRUD operations:** How to create, update, and delete Variable Sets.
- **Workspace attachment:** How to attach a Variable Set to a workspace via the Connectors and Variables tab.
- **Priority control:** How to reorder Variable Sets in a workspace to determine which values take precedence when conflicts occur.
- **Downstream impact:** How to use the Referenced By tab to identify all workspaces affected by a Variable Set change.

---

## Create, update, or delete a Variable Set

Variable Sets are managed from Harness Account Settings.

1. Navigate to **Account Settings**, then select **IaCM Settings**.
2. Select **Variable Sets**.
3. To create a Variable Set, click **Create a new Variable Set** and configure your variables.
4. To update a Variable Set, click its tile to open and edit it.
5. To delete a Variable Set, click the **More** icon on the tile, then select **Delete**.

---

## Attach a Variable Set to a workspace

After you create a Variable Set, attach it to one or more workspaces from the workspace configuration.

1. Open the workspace, then select the **Connectors and Variables** tab.
2. In the **Variable Sets** section, click **Add Variable Set**.

    <img src={require('./static/add-variable-set.png').default} alt="Connectors and Variables tab showing the Variable Sets section with the Add Variable Set button" style={{border: '1px solid #555', display: 'block', margin: '16px 0', maxWidth: '60%'}} />

3. Select the Variable Set from the list to attach it to the workspace, then click **Apply**.

    <img src={require('./static/select-variable-set-apply.png').default} alt="Select a Variable Set panel showing available Variable Sets organized by project, organization, and account scope, with Apply button" style={{border: '1px solid #555', display: 'block', margin: '16px 0', maxWidth: '60%'}} />

Go to [Connectors and Variable Sources](/docs/infra-as-code-management/configuration/connectors-and-variables/connectors-variables) to review how Variable Sets interact with other variable sources and to understand the full order of precedence.

---

## Set Variable Set priority

When more than one Variable Set is attached to a workspace, Harness uses priority order to resolve conflicts. Variables from the highest-priority set override those from lower-priority sets when the same variable name exists in multiple sets. The workspace shows which Variable Set provides the value used during execution.

To set Variable Set priority:

1. Open the workspace and select the **Connectors and Variables** tab.
2. Click **Priority Settings**.

    <img src={require('./static/variable-priority-settings.png').default} alt="Connectors and Variables tab showing two attached Variable Sets with Priority 1 and Priority 2 labels and the Priority Settings button" style={{border: '1px solid #555', display: 'block', margin: '16px 0', maxWidth: '80%'}} />

3. In the panel, drag the Variable Sets into your preferred order: highest priority at the top, lowest at the bottom.

    <img src={require('./static/variable-priority.png').default} alt="Variable sets priority settings panel showing two Variable Sets in drag-and-drop order with Apply button" style={{border: '1px solid #555', display: 'block', margin: '16px 0', maxWidth: '60%'}} />

Priority 1 is the highest priority. Priority 2 is lower than Priority 1, and so on.

---

## Identify downstream impact

When you modify a Variable Set, every workspace that uses it is affected. Use the **Referenced By** tab on a Variable Set to see all workspaces where it is applied before you make changes.

To view downstream workspaces:

1. Navigate to **Account Settings**, then select **IaCM Settings**.
2. Select **Variable Sets**, then open the Variable Set.
3. Select the **Referenced By** tab.

The tab lists every workspace that has this Variable Set attached, so you can assess the impact of your changes before saving them.

---

## Input sources and runtime behavior

Each variable in a workspace shows its source:

- `TEMPLATE`: inherited from the workspace template.
- `CUSTOM`: defined directly in the workspace or Variable Set.

Use `<+input>` as a variable value to prompt the pipeline executor for a value at runtime. Go to [Fixed values, runtime inputs, and expressions](/docs/platform/variables-and-expressions/runtime-inputs) to understand how runtime inputs work. Go to [Connectors and Variable Sources](/docs/infra-as-code-management/configuration/connectors-and-variables/connectors-variables) to review all variable input sources and their order of precedence.

---

## Next steps

After creating or updating a Variable Set:

- Go to [Connectors and Variable Sources](/docs/infra-as-code-management/configuration/connectors-and-variables/connectors-variables) to attach the Variable Set to a workspace and review the full variable precedence order.
- Go to [Provision a workspace](/docs/infra-as-code-management/workspaces/provision-workspace) to run a pipeline that uses your Variable Set configuration.
- Go to [Workspace Templates](/docs/infra-as-code-management/workspaces/workspace-templates) to apply Variable Sets consistently across multiple workspaces through a template.
