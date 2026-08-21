---
title: Workspaces overview
sidebar_label: Workspaces Overview
description: Understand what a workspace is in Harness IaCM, including the overview tab, cost visibility cards, workspace tabs, and statuses.
keywords:
  - workspace
  - iacm workspace
  - workspace overview
  - cloud cost management
  - ccm integration
  - infrastructure as code
tags:
  - iacm
  - workspaces
sidebar_position: 10
---

:::warning Pending release
The new workspace overview is currently **pending release**. Contact [Harness Support](mailto:support@harness.io) to request access.
:::

A workspace is the core unit in Infrastructure as Code Management (IaCM). It brings together your IaC source repository, cloud provider connector, provisioner configuration, and infrastructure state into a single named environment. Each workspace maps to one state file and has its own independent lifecycle.

You can create multiple workspaces from the same IaC configuration to manage separate environments, such as development, staging, and production. Each workspace maintains its own state, variables, and execution history. Pipelines run operations against a workspace (plan, apply, destroy, and drift detection) to provision and manage the infrastructure it defines.

---

## What you will learn

- **Workspace concept:** What a workspace is and how it relates to your infrastructure state and pipeline operations.
- **Overview tab cards:** What each card shows and when data appears on the workspace Overview tab.
- **Cost visibility:** How Harness surfaces cost estimates from Infracost and actual costs from Harness Cloud Cost Management (CCM).
- **Workspace tabs:** How to navigate the workspace tabs and what each one contains.
- **Workspace statuses:** What each workspace status means and when it is applied.

---

## Workspace overview tab

The **Overview** tab gives you a snapshot of the infrastructure managed by a workspace, including resource counts, live cost data, cost optimization opportunities, provisioner details, and recent activity.

<img src={require('./static/workspace-overview-ccm.png').default} alt="Workspace Overview tab showing Resources, Current Monthly Cost, and Optimization Opportunity cards alongside provisioner details and latest activity" style={{border: '1px solid #555', display: 'block', margin: '16px 0'}} />

The overview displays the following cards:

- **Resources:** Total count of infrastructure resources in the current workspace state.
- **Current Monthly Cost:** Actual monthly cloud spend for resources in this workspace, pulled from Harness Cloud Cost Management (CCM). Requires Cloud Cost Management Integration to be enabled in the workspace configuration.
- **Optimization Opportunity:** Estimated monthly savings from CCM recommendations, along with a count of available recommendations for this workspace. Requires Cloud Cost Management Integration to be enabled.
- **Provisioner and version:** The IaC provisioner (Terraform, OpenTofu, or AWS CDK) and the version configured for this workspace.
- **Providers:** Cloud providers used by the resources in this workspace.
- **Modules:** Registry modules referenced by this workspace.

The **Latest activity** section shows the most recent pipeline execution, including its action (plan, apply, destroy), status, resource changes, and cost change estimation (the Infracost estimated cost delta from the most recent plan run). Go to [Cost estimation](/docs/infra-as-code-management/workspaces/cost-estimation) to enable cost change estimation. The **Cost breakdown variation over time** chart displays historical monthly cost data for the workspace.

---

## Cost visibility

Harness IaCM surfaces two types of cost data in a workspace. You enable each one independently in the workspace **Configuration** tab.

### Cloud Cost Estimation

Cloud Cost Estimation uses [Infracost](https://www.infracost.io/) to calculate estimated monthly cost changes based on a Terraform or OpenTofu plan. Estimates appear in the approval step before apply, and in the **Cost Change Estimation** tab of each pipeline execution. Infracost uses standard public cloud pricing. Estimates do not reflect enterprise agreements, reserved instances, or usage-based charges.

### Cloud Cost Management Integration

Cloud Cost Management (CCM) Integration connects the workspace to the Harness CCM module to display **actual** infrastructure costs and cost optimization recommendations. When enabled, Harness syncs cost and recommendation data from CCM for the cloud resources in this workspace and displays the results in the **Current Monthly Cost** and **Optimization Opportunity** cards on the Overview tab.

CCM Integration requires the Harness CCM module to be active on your account and provisioned cloud resources on AWS, Azure, or GCP. Cost data refreshes approximately every 12 hours. Go to [Cloud Cost Management](/docs/cloud-cost-management) to set up the CCM module.

Go to [Cost estimation](/docs/infra-as-code-management/workspaces/cost-estimation) to enable and configure both cost features.

---

## Workspace tabs

To reach a workspace, go to **IaCM** and select **Workspaces**, then select a workspace from the list. The following tabs are available:

- **Overview:** Snapshot of resource counts, live cost data, provisioner details, and latest pipeline activity.
- **Resources:** All infrastructure resources, data sources, and outputs from the current state. Go to [Workspace settings](/docs/infra-as-code-management/workspaces/workspace-tabs) for details.
- **Connectors and Variables:** Connectors and input variables applied during pipeline execution. Go to [Connectors and variables](/docs/infra-as-code-management/configuration/connectors-and-variables/connectors-variables) to configure them.
- **Execution History:** Log of pipeline operations (plan, apply, destroy, drift detection) for this workspace.
- **State:** The complete state file with version history and rollback capability. Go to [Roll back workspace state](/docs/infra-as-code-management/workspaces/state-rollback) to restore a previous version.
- **Configuration:** Workspace settings including repository details, provisioner, and cloud cost integration options.
- **CLI Integration:** Instructions for using the Harness CLI with this workspace as a remote backend.

Go to [Workspace settings](/docs/infra-as-code-management/workspaces/workspace-tabs) to explore each tab in detail.

---

## Workspace statuses

A workspace displays one of the following statuses:

- **Active:** Successfully provisioned and running.
- **Inactive:** Successfully destroyed or never provisioned.
- **Drifted:** Drift was detected between the workspace state and the actual cloud infrastructure.
- **Provisioning:** Currently being provisioned.
- **Destroying:** Currently being destroyed.
- **Failed:** Errors were encountered during provisioning or destroying.
- **Apply_Needed:** An apply operation is required to bring the cloud infrastructure in sync with the workspace configuration.
- **Unknown:** Changes were made to the cloud infrastructure outside of IaCM.

Go to [Workspace statuses](/docs/infra-as-code-management/workspaces/workspace-statuses) to filter and interpret workspace statuses.

---

## Related concepts

- Go to [Create a workspace](/docs/infra-as-code-management/workspaces/create-workspace) to set up a new workspace from scratch, clone an existing one, or use a template.
- Go to [Cost estimation](/docs/infra-as-code-management/workspaces/cost-estimation) to enable Infracost estimates and Cloud Cost Management Integration.
- Go to [Workspace settings](/docs/infra-as-code-management/workspaces/workspace-tabs) to understand each workspace tab and its settings.
- Go to [Provision a workspace](/docs/infra-as-code-management/workspaces/provision-workspace) to run plan, apply, and destroy operations.
- Go to [Workspace RBAC](/docs/infra-as-code-management/workspaces/workspace-rbac) to configure access permissions.
