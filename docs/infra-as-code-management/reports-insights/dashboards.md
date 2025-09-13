---
title: "Dashboards"
description: "Learn how to use the IaCM Dashboard to gain insights into workspace usage, visualize data, and customize your dashboard for better decision-making."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Harness Custom Dashboards provide a fully integrated BI experience powered by IaCM data, offering deep visibility into workspace metrics and insights not typically surfaced elsewhere in the platform.

## Use Cases
The IaCM Dashboard is designed to help you:

- Visualize the **count of workspaces** by organization and project.
- List **modules in use** and identify how many workspaces are using them. [Learn more about Harness module registry](/docs/infra-as-code-management/registry/module-registry/module-registry-code-structure)
- Create visualizations based on **workspace tags** (e.g., "team:europe") to better understand resource allocation.
- **Monitor provider compliance** across your infrastructure:
  - Track what percentage of workspaces are using [**OpenTofu**](https://opentofu.org/) or Terraform.
  - Identify projects using outdated or non-compliant provider versions
  - Ensure standardization across cloud providers and tools

:::tip OpenTofu migration
Harness supports all OpenTofu versions, and Terraform MPL versions up to 1.5.x, any BSL versions (from 1.6.0) are not supported. 
Follow this [**OpenTofu migration guide**](https://opentofu.org/docs/intro/migration/) to transition from Terraform to OpenTofu and leverage the benefits of this open-source alternative.
:::
---

<Tabs>
<TabItem value="Create a Dashboard">
Create a new IaCM dashboard to visualize your workspace data, from the count of workspaces by organization and project to modules in use and workspace tags.
<DocVideo src="https://app.tango.us/app/embed/a3d70367-96a8-4047-865d-05084dedb47b?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" title="Add Dashboards in Harness" />
</TabItem>
<TabItem value="Add Visualizations">
Learn how to add visualizations to measure workspace counts by organization and project with this guide:

<DocVideo src="https://app.tango.us/app/embed/1072b10f-b9a9-45f8-b83f-c42884300cc3?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" title="Add Visualization in IaCM Dashboard" />
</TabItem>
<TabItem value="Download Reports">
Follow these steps to download and share your reports:

<DocVideo src="https://app.tango.us/app/embed/bc2589cb-951a-43ae-b570-6ed205bdd3f3?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" title="Download Workspace Dashboard Reports" />
</TabItem>
</Tabs>
---

## Dashboard Customization
Harness Dashboards provide flexible customization options to tailor your analytics experience. Here's an overview of available features:

:::tip Advanced Dashboard Features
For comprehensive information on advanced dashboards capabilities, filters, and best practices, see the [Harness Dashboards documentation](/docs/category/harness-dashboards).
:::

### Add
- Options to add:
  - **Visualization**: Create visualizations to display key metrics.
  - **Text**: Add textual explanations or notes.
  - **Markdown**: Include formatted content for better readability.
  - **Button**: Add interactive buttons for quick actions.

### Filters
- Add new filters to refine your dashboard view:
  - By **modules**.
  - By **workspace tags**.
  - By **workspaces**.

:::tip module usage metrics
Displays modules in use by your workspaces, regardless of their origin (e.g., OpenTofu, Harness, RDS).
:::

### Settings
- Customize dashboard behavior:
  - **Timezone options**: Adjust to your preferred timezone.
  - **Run on load**: Automatically load data when the dashboard opens.
  - **Allow full screen mode**: Enable full-screen viewing for visualizations.
  - **Automatic refresh**: Set a refresh frequency for real-time updates.

### Quick Layout
- Quickly adjust your dashboard layout with predefined tile sizes:
  - **XL**: 1 Tile across.
  - **S**: 4 Tiles across.

---
Review your [workspace settings](/docs/infra-as-code-management/workspaces/workspace-tabs) and [IaCM best practices](/docs/infra-as-code-management/iacm-best-practices) for more information on how to get the most out of Harness IaCM.