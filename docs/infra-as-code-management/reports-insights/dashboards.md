---
title: "Dashboards"
description: "Learn how to use the IaCM Dashboard to gain insights into workspace usage, visualize data, and customize your dashboard for better decision-making."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Harness IaCM Dashboard provides a comprehensive view of your workspaces, offering metrics and details that aren't typically exposed elsewhere in the platform. By gathering workspace data and presenting it in an interactive format, the dashboard enables you to gain valuable insights into workspace usage, helping you make informed decisions.

## Use Cases
The IaCM Dashboard is designed to help you:

- Visualize the **count of workspaces** by organization and project.
- List **modules in use** and identify how many workspaces are using them. [Learn more about modules →](/docs/infra-as-code-management/modules/overview)
- Create visualizations based on **workspace tags** (e.g., "team:europe") to better understand resource allocation.
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

## Dashboard Tabs and Settings
The IaCM Dashboard includes several tabs and settings to customize your experience. Here's an overview:

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