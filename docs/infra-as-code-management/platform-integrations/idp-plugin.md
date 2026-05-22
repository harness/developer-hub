---
title: IaCM Plugin for Internal Developer Portal
description: Connect IaCM workspaces to your IDP service catalog for unified infrastructure visibility
sidebar_label: Internal Developer Portal (IDP)
sidebar_position: 30
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The Harness IaCM plugin for Internal Developer Portal (IDP) enables developers to view and manage infrastructure workspaces directly from the IDP service catalog. By connecting your IaCM workspaces to Backstage services, teams gain unified visibility into **provisioned resources**, **data sources**, **outputs**, workspace status, and infrastructure context without leaving their developer portal.

:::info Open Source Plugin
The IaCM plugin is available as an open-source plugin in the [Backstage Plugin Directory](https://backstage.io/plugins/) and hosted at [github.com/harness/backstage-plugins](https://github.com/harness/backstage-plugins/tree/main/plugins/harness-iacm#harness-iacm-plugin). It's natively integrated into Harness IDP and requires no additional installation.
:::

For detailed plugin configuration, layout setup, and advanced options, see the [IaCM Plugin documentation in the IDP section](/docs/internal-developer-portal/plugins/available-plugins/harness-native-plugins/harness-iacm).

## Prerequisites

Before connecting IaCM workspaces to IDP, ensure you have:

- **IDP Module Access**: Harness Internal Developer Portal must be enabled in your account. [Learn how to set up IDP](/docs/internal-developer-portal/get-started)
- **IaCM Workspaces**: At least one active IaCM workspace with provisioned resources. [Learn how to create workspaces](/docs/infra-as-code-management/get-started/overview)
- **Service Catalog**: Services registered in your IDP catalog where you want to display infrastructure information. [Learn how to register services](/docs/internal-developer-portal/catalog/create-entity/create-manually)
- **Workspace Access**: Appropriate permissions to view IaCM workspaces and resources. [Learn about IDP RBAC](/docs/internal-developer-portal/rbac) and [IaCM permissions](/docs/platform/role-based-access-control/rbac-in-harness)
- **Workspace URL**: The full URL to your IaCM workspace (found in the Harness platform)


---

## Quick Start

### Add Workspace Annotation to Your Service

Connect your IaCM workspace to an IDP service by adding the `harness.io/workspace-url` annotation to your service's `catalog-info.yaml` file:

```yaml
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: payment-service
  annotations:
    harness.io/workspace-url: https://app.harness.io/ng/account/<ACCOUNT_ID>/module/iacm/orgs/<ORGANIZATION_ID>/projects/<PROJECT_ID>/workspaces/<WORKSPACE_ID>/resources
spec:
  type: service
  lifecycle: production
  owner: team-platform
```

**To get your workspace URL:**
1. Navigate to your IaCM workspace in Harness
2. Copy the full URL from your browser's address bar (must end with `/resources`)

:::note
Each service connects to one IaCM workspace. For multi-environment services, create separate catalog entries (e.g., `payment-service-dev`, `payment-service-prod`) or use a single workspace managing all environments.
:::

Access infrastructure information directly from the service catalog:

<Tabs>
<TabItem value="pipeline" label="Interactive guide">
<DocVideo src="https://app.tango.us/app/embed/093b16a4-72d1-4771-900b-3740709a4f27?skipCover=true&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" title="Access IACM Workspace in Harness" />
</TabItem>
<TabItem value="step-by-step" label="Step-by-step">

1. Navigate to **Internal Developer Portal** > **Catalog**
2. Select a service with the `harness.io/workspace-url` annotation
3. Click the **IACM** tab to view:
   - **Resources** (17): All provisioned infrastructure (VMs, databases, networks, storage, etc.)
   - **Data Sources** (0): External data referenced by the workspace
   - **Outputs** (6): Exported values from the workspace state
   - **Workspace Details**: Current state, last execution status, and quick actions

:::info Enhanced Features
Recent enhancements to the IaCM plugin include:
- **Rich Resource Context**: Detailed metadata and configuration for each resource
- **Drill-Down Navigation**: Click through to specific resources and execution details
- **High-Level Overview**: Summary cards showing resource counts, workspace health, and recent activity
:::

</TabItem>
</Tabs>

---

## Use IaCM Plugin

The IaCM plugin enables several common workflows for developers working in the IDP:

### View Infrastructure Context

- **Resources**: See all provisioned infrastructure including compute, storage, networking, and databases
- **Data Sources**: View external data being referenced (API calls, external state, etc.)
- **Outputs**: Access exported values like IP addresses, URLs, connection strings, and resource identifiers
- **Workspace Status**: Check if the workspace is healthy, has pending changes, or requires attention
- **Track Changes**: View recent provisioning activity and execution history

### Navigate to Full Workspace

Click **View in IaCM** or the workspace label to open the full workspace in the IaCM module, where you can:
- Execute plan and apply operations
- Review detailed execution logs
- Manage workspace configuration
- Approve policy violations
- Analyze cost estimates

---

## Troubleshooting

<details>
<summary>IACM tab not appearing in service catalog</summary>

Verify that:
1. The `harness.io/workspace-url` annotation is present in the service's `catalog-info.yaml`
2. The workspace URL is complete and properly formatted (see format example below)
3. The IACM layout is configured for the Service entity type (see Step 3)

</details>

<details>
<summary>"Access Denied" or "401 Unauthorized" error</summary>

Ensure that:
1. Your Harness user account has permission to view the workspace in IaCM
2. The workspace exists and is not deleted
3. The workspace URL points to the correct account, org, and project
4. You are logged into both IDP and IaCM with the same Harness account

</details>

<details>
<summary>Workspace shows "No Resources Found"</summary>

This may occur when:
1. The workspace has never been successfully provisioned
2. All resources have been destroyed
3. The workspace is in an error state
4. The workspace URL points to the wrong workspace ID

Navigate to the workspace in IaCM to verify its state and recent execution history.

</details>

<details>
<summary>Workspace URL format issues</summary>

Ensure the workspace URL:
1. Is a complete, fully-qualified URL from your browser's address bar
2. Ends with `/resources` to display the resources view
3. Contains the correct account, org, project, and workspace identifiers
4. Uses `https://app.harness.io` as the base domain

Example format:
```
https://app.harness.io/ng/account/<ACCOUNT_ID>/module/iacm/orgs/<ORGANIZATION_ID>/projects/<PROJECT_ID>/workspaces/<WORKSPACE_ID>/resources
```

</details>

## Next Steps

You've successfully connected your IaCM workspaces to the IDP service catalog. Enhance your IDP setup further:

- [IDP scorecards](/docs/internal-developer-portal/scorecards/scorecard) - Track infrastructure compliance and standards
- [IDP workflows](/docs/internal-developer-portal/flows/overview) - Automate workspace provisioning with self-service actions
- [Module registry](/docs/infra-as-code-management/registry/module-registry) - Share reusable infrastructure modules across services
- [IaCM pipeline operations](/docs/infra-as-code-management/pipelines/operations-overview) - Automate infrastructure provisioning and updates