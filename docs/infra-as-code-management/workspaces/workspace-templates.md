---
title: Workspace templates
description: Create workspace templates to standardize configurations, and learn how template-locked fields behave when you update a linked workspace.
sidebar_position: 60
sidebar_label: Workspace Templates
keywords:
  - workspace template
  - locked fields
  - template version
  - standardize workspace
  - IaCM
tags:
  - infra-as-code-management
  - workspaces
  - templates
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

With workspace templates, you standardize workspace configurations across your projects by predefining variables, settings, and other workspace options. Templates streamline setup, keep workspaces consistent, and let platform teams lock specific settings so they cannot drift after a workspace is linked.

<iframe
   src="https://www.youtube.com/embed/ss_ea7cjnFs"
   title="Workspace Templates overview"
   style={{ minHeight: '540px' }}
   width="100%"
   height="100%"
   referrerpolicy="strict-origin-when-cross-origin"
   frameborder="0"
   webkitallowfullscreen="true"
   mozallowfullscreen="true"
   allowfullscreen="true"
></iframe>

## What you will learn

- How to create, edit, and apply a workspace template.
- The difference between linking a workspace to a template and copying a template.
- Which workspace settings a template can lock.
- How Harness behaves when you update a locked field on a linked workspace.
- How to change the template version a workspace uses.

---

## Before you begin

- **Template permissions:** Permission to create and edit account-level or project-level templates. Go to [RBAC in Harness](/docs/platform/role-based-access-control/rbac-in-harness) to configure roles.
- **Target scope:** Access to an account or project where you apply the template.
- **Workspace basics:** Familiarity with workspace setup. Go to the [IaCM get started guide](/docs/infra-as-code-management/get-started) to review the workspace creation flow.

---

## Use a template or copy a template

When you apply a workspace template, you choose how the new workspace relates to the template.

- **Use Template:** The workspace stays linked to the template and reflects future template changes. Settings the template locks are enforced on the workspace.
- **Copy Template:** Harness creates a one-time copy of the template as it exists at that moment. The workspace is independent, no settings are locked, and later template changes do not apply.

:::tip
Choose **Use Template** when you want central control and ongoing consistency. Choose **Copy Template** when you want a starting point that teams can edit freely.
:::

---

## Configure workspace templates

To configure workspace templates and standardize your workspace setups, follow this interactive guide.

<Tabs groupId="step" queryString>
<TabItem value="1. Create workspace templates">
<DocVideo src="https://app.tango.us/app/embed/6686c1ea-fb9b-4a94-ad1e-021c34b8a19f?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" title="Creating an IaCM workspace template in Harness" />
</TabItem>
<TabItem value="2. Add variables & edit templates">
<DocVideo src="https://app.tango.us/app/embed/ceb4cbae-aae8-40d5-8b68-70e72cd4a7cf?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" title="Adding variables to your Harness IaCM workspace template" />
</TabItem>
<TabItem value="3. Apply templates">
<DocVideo src="https://app.tango.us/app/embed/fb4819c2-3985-48da-90f4-1db8ae839fc5?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" title="Apply Harness IaCM workspace templates to your new workspace." />
</TabItem>
<TabItem value="Full step-by-step">

Use these steps to create a template, edit an existing template, and apply a template to a new workspace.

#### Create a new workspace template

1. In **Account Settings**, select **Templates** from the Account-level resources section.
2. Select the **New Template** dropdown, then select **Infra Workspace**.
3. Name the template and provide a version label.
4. Select **Start**.

Harness opens the template **General** tab, which contains a standard workspace setup form. Go to the [IaCM get started guide](/docs/infra-as-code-management/get-started) to review each field.

5. Complete the workspace setup.
6. Select the **Variables** tab and add workspace variables (optional).
7. Select **Save**.
8. Select **YAML** from the Visual/YAML toggle to preview or edit the generated configuration.

#### Review and edit an existing workspace template

1. Select **Templates** to open the workspace template overview page, either from the breadcrumb menu or from **Account Settings**, then **Templates**.
2. Select the workspace template to review.
3. To edit, select **Open in Template Studio**.
4. Update the workspace settings, then select **Save**.

#### Apply a workspace template

1. In one of your projects, create a new workspace.
2. When prompted, select **Start with Template**.
3. Name the new workspace, then select **Start**.
4. Search for the template you want, then select it.
5. Select **Use Template** or **Copy Template**.
6. Review the applied configuration and variables.

</TabItem>
</Tabs>

---

## Locked fields

When you build a template, you can lock individual settings. A locked setting is enforced on every workspace that links to the template through **Use Template**. Locking keeps critical configuration consistent and prevents workspace owners from changing values your platform team controls.

Locked settings apply only to linked workspaces. A workspace created with **Copy Template** has no locked settings, because it is an independent copy with no ongoing association.

You can lock the following template settings.

- **Provisioner:** Provisioner type, provisioner version, and the provider connector.
- **Repository:** Repository name, connector, path, and the Git fetch type with its branch, commit, or tag value.
- **Cost estimation:** Whether cost estimation is enabled, and the budget.
- **Terraform and environment variables:** The value of any locked variable. Template-provided variables also cannot be removed from a linked workspace.
- **Terraform variable files:** Locked variable files cannot be removed.
- **Provider connectors:** Locked provider connectors cannot be removed.
- **Default pipelines:** The plan, apply, destroy, and drift pipelines, for project-level templates.
- **Required tags:** Tags the template requires must remain on the workspace.

Settings that the template does not lock remain editable on each linked workspace.

---

## Update a linked workspace

Harness validates every update to a linked workspace against the template version the workspace currently uses. When an update keeps the locked values, the update succeeds. When an update changes a locked value, removes a locked variable file or provider connector, removes a template-provided variable, or drops a required tag, Harness rejects the entire update and returns a validation error that lists the conflicting fields. Harness does not silently strip or ignore the change, so the workspace always matches the template.

To change a locked value, update the value in the template, or move the workspace to a template version that allows the change. To change a value the template does not lock, edit the workspace as usual.

:::info
Changing the workspace fields and changing the template version are separate operations. The workspace update request does not carry a template version, so you cannot edit field values and move to a new template version in the same request. Update the fields first, or change the template version first, then make the other change.
:::

---

## Change the template version

A linked workspace points to a specific template version. When you move the workspace to a different version, Harness reconciles the workspace against the new version and overwrites any locked settings with the values from that version. Fields the new version does not lock are left as they are.

Review the changes before you apply them so you know which locked settings will change. Go to [Workspace statuses](/docs/infra-as-code-management/workspaces/workspace-statuses) to confirm the workspace returns to an active state after reconciliation.

---

## Troubleshooting

<Troubleshoot
  issue="Updating an IaCM workspace fails with a validation error that lists locked fields from the associated workspace template"
  mode="general"
  fallback="The workspace is linked to a template that locks one or more of the fields you changed. Revert the locked fields to the template values, or update the value in the template, then retry the workspace update."
/>

<Troubleshoot
  issue="A change made to an IaCM workspace template is not reflected on a workspace created from that template"
  mode="general"
  fallback="The workspace was created with Copy Template, which is a one-time copy with no ongoing link. Recreate the workspace with Use Template, or apply the change to the workspace directly."
/>

---

## Next steps

Workspace templates standardize setup, enforce locked settings, and reduce the risk of misconfiguration across projects.

- Go to [Connectors and variables](/docs/infra-as-code-management/configuration/connectors-and-variables/connectors-variables) to manage connectors and variables on a workspace.
- Go to [Cost estimation](/docs/infra-as-code-management/workspaces/cost-estimation) to configure cost estimation and budgets.
- Go to [Workspace tabs](/docs/infra-as-code-management/workspaces/workspace-tabs) to review the settings available on a workspace.
