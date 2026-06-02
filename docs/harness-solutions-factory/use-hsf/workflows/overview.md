---
title: Overview
description: Start using HSF by understanding and executing workflows in IDP.
sidebar_position: 1
redirect_from: 
    - /kb/reference-architectures/hsf/hsf-workflows
---
# How workflows work

Workflows are the primary way teams interact with HSF. Each workflow is a self-service form in IDP that, when submitted, provisions and manages Harness resources on your behalf using IaCM workspaces under the hood.

## What happens when you run a workflow

When a workflow is submitted, HSF:

1. Creates an **IaCM workspace** mapped to a single Terraform state file to
   manage the lifecycle of the requested resources.
2. Routes the request through two **approval gates** before any changes are
   applied (see Approvals below).
3. Provisions the resources defined by the workflow.
4. Pushes the outputs directly into the **IDP catalog** entry for that
   workspace, so the resource is immediately visible and discoverable.

:::note
Workspaces for platform-level resources (creating orgs, projects, connectors) live inside the **Solutions Factory** project. Workspaces for other resources live inside the project they were provisioned into.
:::

### Create and Manage IaCM Workspaces Pipeline

Every workflow triggers the Create and Manage IaCM Workspaces pipeline which creates and manages an IaCM workspace. Think of a workspace as the ongoing record of a resource — it holds the Terraform state, the input variables, and the history of every change made to that resource.

Because workspaces maintain ongoing state, you can go back into a workspace at any time, change an input variable, and re-execute to apply the update. You don't need to re-run the workflow from IDP to make changes to an existing resource.

**Ephemeral workspaces**

If you don't want to maintain ongoing state for a resource — for example, for short-lived environments — you can choose to create an ephemeral workspace when submitting the workflow. Ephemeral workspaces are torn down automatically after execution completes. This can be done by going into the YAML of the workflow and setting the variable `is_ephemeral` to true.

**Approvals**

Via the Create and Manage IaCM pipeline, every workflow goes through two approval gates before resources are created or modified:

| Gate | When it occurs | What the approver sees |
|---|---|---|
| Entity creation approval | Before any resources are created | Approval or rejection screen to notify that you have eyes on the changes that are coming |
| Terraform plan approval | Before the IaCM plan is applied | The full resource diff — exactly what will change |

By default, approval notifications are sent by email to members of the **HSF Admins** group. If your team uses Microsoft Teams or Slack, this can be reconfigured in the notification settings on the HSF Admins user group.

If you want to add an approval to a workflow you can do so by going into the YAML of the workflow and setting the variable `requires_approval` to true.

:::tip
The Terraform plan approval shows the full resource diff. Approvers should review this carefully before confirming — this is the last checkpoint before changes are applied to your account.
:::

## Default workflows

HSF deploys the following workflows into your account automatically. They are
defined in the `harness-template-library` repository and registered into IDP
via the **Register Custom IDP Templates** pipeline.

| Workflow | What it provisions | Persona |
|---|---|---|
| Harness Organization Setup | A Harness organization | Platform Engineering / Developer |
| Harness Project Setup | A project with environments, user groups, and roles | Platform Engineering / Developer |
| [Harness Central Build Farm Setup](../workflows/central-build-farm-workflow.md) | CI connectors, secrets, and build infrastructure | Platform Engineering |
| [Deploy Harness SAST & SCA Templates](../workflows/sast-sca-workflow.md) | Security scanning templates and config manager | Platform Engineering |
| Harness CI Image Factory | A pipeline to mirror and manage CI module images | Developers |
| Deploy Harness CI Golden Standard Templates | A best-practice CI pipeline template | Platform Engineering |
| [Harness Delegate Image Factory](../workflows/delegate-image-factory-workflow.md) | A custom delegate build pipeline and repository | Platform Engineering |

Additional workflows are available in the `harness-template-library` repository
but are not loaded into IDP by default.

## Add workflows

The seven default workflows above are deployed regardless of which Harness
modules your account has licensed. Additional workflows are available in the
`harness-template-library` repository for specific use cases and modules.

To load additional workflows into IDP:

1. Run the **Mirror Harness Official Solutions Factory Repository** pipeline to
   pull the latest version of `harness-template-library`.
2. Run **Register Custom IDP Templates**. To load only specific workflows,
   add the workflow ID to the `filter_template` input.

For details on what each additional workflow does, refer to the README files
in the `harness-template-library` repository.