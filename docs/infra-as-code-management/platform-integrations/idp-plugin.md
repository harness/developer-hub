---
title: IaCM Plugin for Internal Developer Portal
description: Connect IaCM workspaces to your IDP service catalog so developers can review provisioned resources, data sources, and outputs without leaving the developer portal.
sidebar_label: Internal Developer Portal (IDP)
sidebar_position: 30
keywords:
  - IaCM
  - IDP
  - Internal Developer Portal
  - Backstage
  - service catalog
  - catalog-info.yaml
  - annotation
  - workspace
tags:
  - IaCM
  - IDP
  - integrations
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

The Harness IaCM plugin for Internal Developer Portal (IDP) surfaces infrastructure workspaces inside the IDP service catalog. Developers reviewing a service see the **provisioned resources**, **data sources**, and **outputs** for its workspace alongside the rest of that service's context, without switching to the IaCM module.

You connect a workspace to a catalog entity by adding one annotation to the entity's `catalog-info.yaml` definition. Harness reads that annotation, renders an **IACM** tab on the entity page, and links back to the full workspace for anyone who needs to run a plan or apply. The tab is read only, so opening it never changes infrastructure.

:::info Open source plugin

The IaCM plugin is published in the [Backstage Plugin Directory](https://backstage.io/plugins/) and maintained at [harness/backstage-plugins](https://github.com/harness/backstage-plugins/tree/main/plugins/harness-iacm#harness-iacm-plugin). It is natively integrated into Harness IDP, so the backend proxy and the **Service** layout are configured by default and no installation is required.

Go to the [IaCM plugin reference in the IDP docs](/docs/internal-developer-portal/plugins/available-plugins/harness-native-plugins/harness-iacm) to review the proxy configuration, the layout YAML, and the `isHarnessIacmAvailable` conditional that hides the tab on entities without the annotation.

:::

---

## Before you begin

- **Harness account with IDP enabled:** You need **Internal Developer Portal** in the module list. Go to [Get started with IDP](/docs/internal-developer-portal/get-started) to set up the module.

    :::info Contact Harness support:

    If IDP does not appear, contact your account administrator or [Harness Support](mailto:support@harness.io).

    :::

- **A provisioned IaCM workspace:** The workspace must have completed at least one successful apply, otherwise the tab renders empty. Go to [Get started with IaCM](/docs/infra-as-code-management/get-started/overview) to create and provision a workspace.
- **A registered catalog entity:** You need an existing IDP catalog entity to attach the workspace to. Go to [Register a software component](/docs/internal-developer-portal/catalog/create-entity/create-manually) to add one.
- **IaCM workspace permissions:** You need **View** on Workspaces, and **Access State** if you want the state details to render. Go to the [permissions reference](/docs/platform/role-based-access-control/permissions-reference#infrastructure-as-code) to review these, and ask an administrator to assign a role that includes them using [Manage roles](/docs/platform/role-based-access-control/add-manage-roles).
- **Catalog entity permissions:** You need edit access to the entity definition, whether it lives in Git or in the catalog. Go to [IDP RBAC](/docs/internal-developer-portal/rbac) to review catalog permissions.

---

## Connect a workspace to a service

Adding the `harness.io/workspace-url` annotation to a catalog entity is the only step required to render the **IACM** tab.

### Get your workspace URL

The plugin reads the workspace identifiers out of the URL, so copy the URL rather than assembling it by hand:

1. Navigate to **Infrastructure** > **Infrastructure as Code Management** and open your workspace.
2. Select the **Resources** tab.
3. Copy the full URL from your browser address bar. It must end in `/resources`.

The URL follows this shape:

```
https://app.harness.io/ng/account/<ACCOUNT_ID>/module/iacm/orgs/<ORGANIZATION_ID>/projects/<PROJECT_ID>/workspaces/<WORKSPACE_ID>/resources
```

The base domain is the domain you use to reach Harness. On Harness SaaS this is your cluster domain, for example `https://app.harness.io`. On [Self-Managed Enterprise Edition](/docs/self-managed-enterprise-edition) it is your own Harness hostname.

### Add the workspace annotation

The annotation value is a block scalar holding a label and the workspace URL. The label is the name shown for the workspace in the **IACM** tab, so use something a developer recognizes:

```yaml
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: payment-service
  description: Payment processing service
  annotations:
    harness.io/workspace-url: |
      <WORKSPACE_NAME>: https://app.harness.io/ng/account/<ACCOUNT_ID>/module/iacm/orgs/<ORGANIZATION_ID>/projects/<PROJECT_ID>/workspaces/<WORKSPACE_ID>/resources
spec:
  type: service
  lifecycle: production
  owner: team-platform
```

:::warning Keep the block scalar and the label

The `|` block indicator and the `<WORKSPACE_NAME>:` label are both part of the annotation format. A bare URL with no label does not match the format the plugin expects. Go to the [plugin annotation reference](/docs/internal-developer-portal/plugins/available-plugins/harness-native-plugins/harness-iacm) to compare against the canonical example.

:::

Where the entity definition lives determines how you apply the change:

- **Git-managed entities:** Commit the edited `catalog-info.yaml` to the tracked branch. The tab appears after the catalog ingests the change on its next sync, not at commit time.
- **Entities created in the catalog UI:** Edit the definition in place and save. The tab appears on the next entity refresh.

For a service that spans several environments, name each workspace clearly in the annotation label so developers can tell production from staging at a glance. If you prefer full separation, register one catalog entity per environment, for example `payment-service-dev` and `payment-service-prod`.

### View infrastructure in the catalog

Once the annotation is ingested, the workspace is visible from the entity page. Follow the interactive walkthrough or the written steps:

<Tabs>
<TabItem value="interactive" label="Interactive guide" default>

The following walkthrough shows how to open an IaCM workspace from an IDP catalog entity.

<DocVideo src="https://app.tango.us/app/embed/093b16a4-72d1-4771-900b-3740709a4f27?skipCover=true&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" title="Access IACM Workspace in Harness" />

</TabItem>
<TabItem value="step-by-step" label="Step-by-step">

To open the workspace from the catalog, do the following:

1. Navigate to **Internal Developer Portal** > **Catalog**.
2. Select the entity that carries the `harness.io/workspace-url` annotation.
3. Select the **IACM** tab.

The tab is labeled **IACM** in uppercase in the product, and it contains four groups:

- **Resources:** Every resource the workspace has provisioned, such as compute instances, databases, networks, and storage. Each entry carries its metadata and configuration, and drills down to the resource detail.
- **Data sources:** External data the workspace configuration reads without managing.
- **Outputs:** Values the workspace configuration exports, such as IP addresses, endpoints, and resource identifiers.
- **Workspace details:** The current workspace state, the status of the most recent execution, and a link into IaCM.

Each group shows its own item count. A count of zero means the workspace configuration declares nothing of that kind, which is common for data sources.

</TabItem>
</Tabs>

---

## What you can do from the IACM tab

The tab is a read-only view onto the workspace. Everything that changes infrastructure happens in the IaCM module.

### Review infrastructure context

Use the tab to answer questions about a service's infrastructure without leaving the catalog:

- **Resources:** Confirm what compute, storage, networking, and database resources back the service.
- **Data sources:** Identify the external state and lookups the configuration depends on.
- **Outputs:** Retrieve exported values such as endpoints and connection details.
- **Workspace state:** Check whether the workspace is current, has pending changes, or ended its last run in an error state.
- **Recent activity:** Review the most recent provisioning executions.

Go to [Workspace tabs](/docs/infra-as-code-management/workspaces/workspace-tabs) to understand what resources, state, and activity history mean in IaCM, and [Workspace statuses](/docs/infra-as-code-management/workspaces/workspace-statuses) to interpret a workspace state.

### Open the full workspace

Select **View in IaCM** or the workspace label to open the workspace in the IaCM module, where you can:

- Run plan, apply, and destroy operations.
- Review execution logs in detail.
- Edit workspace variables, connectors, and configuration.
- Review cost estimates produced by the plan.
- Inspect state, including historical revisions.

---

## Limitations

Keep the following in mind when you plan a rollout:

- **The tab is read only.** No plan, apply, or destroy operation can be triggered from IDP. Developers who need to change infrastructure must open the workspace in IaCM.
- **The annotation must point at the `/resources` view.** A URL ending anywhere else in the workspace does not resolve to the resources the tab renders.
- **The tab reflects the last successful apply.** A workspace that has never applied, or whose resources were destroyed, renders an empty tab rather than an error.
- **Viewers need IaCM permissions of their own.** The plugin calls Harness with the signed-in user's identity, so a developer without **View** on the workspace sees an access error even when the annotation is correct.

---

## Troubleshooting

<Troubleshoot
  issue="IACM tab does not appear on a Harness IDP catalog entity after adding the harness.io/workspace-url annotation"
  mode="docs"
  fallback="Confirm the annotation is present in the entity's catalog-info.yaml, uses the block scalar format with a workspace label, and that the catalog has re-ingested the definition since the change."
/>

<Troubleshoot
  issue="Harness IDP catalog entity still shows the old definition after committing a catalog-info.yaml change"
  mode="docs"
  fallback="Git-managed entities update only when the catalog ingests the commit. Trigger a manual refresh on the entity, or wait for the next scheduled sync, then reload the entity page."
/>

<Troubleshoot
  issue="Access Denied or 401 Unauthorized error on the IACM tab in Harness IDP"
  mode="docs"
  fallback="Confirm your Harness user has View on the workspace in IaCM, that the workspace still exists, and that the annotation URL points at the account, org, and project you have access to."
/>

<Troubleshoot
  issue="IaCM workspace shows No Resources Found in the Harness IDP IACM tab"
  mode="docs"
  fallback="The workspace has no resources in state. Open the workspace in IaCM and check whether it has ever applied successfully, whether its resources were destroyed, and whether the annotation points at the intended workspace ID."
/>

<Troubleshoot
  issue="harness.io/workspace-url annotation format is rejected or renders an empty IACM tab"
  mode="fallback-only"
  fallback="The annotation value must be a block scalar containing a workspace label and a full workspace URL ending in /resources, for example: harness.io/workspace-url: | followed by an indented line reading MY_WORKSPACE: https://app.harness.io/ng/account/<ACCOUNT_ID>/module/iacm/orgs/<ORGANIZATION_ID>/projects/<PROJECT_ID>/workspaces/<WORKSPACE_ID>/resources"
/>

---

## Next steps

Your IaCM workspaces now surface in the IDP service catalog, giving developers infrastructure context on the entity pages they already use. Build on that with the following:

- [IDP scorecards](/docs/internal-developer-portal/scorecards/scorecard): Track infrastructure compliance and standards across catalog entities.
- [IDP workflows](/docs/internal-developer-portal/flows/overview): Let developers provision workspaces through self-service actions.
- [Module registry overview](/docs/infra-as-code-management/registry/module-registry/module-registry-overview): Share reusable infrastructure modules across services.
- [IaCM pipeline operations](/docs/infra-as-code-management/pipelines/operations-overview): Automate provisioning and updates for the workspaces you connected.
