---
title: Create a dashboard
description: Create, edit, and manage dashboards in Harness.
sidebar_position: 3
keywords:
  - dashboards
  - create dashboard
  - edit dashboard
  - AI dashboard
  - Harness dashboards
tags:
  - Dashboards
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocImage from '@site/src/components/DocImage';

## Overview

Harness Dashboards let you build custom views to track deployments, costs, builds, and other platform data in one place. You can create dashboards manually or use the [AI chat assistant](./ai-assisted-dashboard.md) to generate them from a natural language description.

## Navigate to Dashboards

1. In the left sidebar, click the module selector (grid icon) next to the Harness logo.
2. Select **Dashboards**.

The Dashboard page shows two sections:

   **1. AI chat window:** An AI chat panel on the left side of the page. You can type a plain-language request such as "Create a dashboard showing deployment failure rates for the last 30 days" and the assistant generates a dashboard for you. The panel also offers quick-action buttons like **List pipelines**, **Ask a support question**, and **Analyze Pipeline Errors** to help you get started quickly.
   **2. All Dashboards:** A searchable, filterable list of every dashboard in the account, including ones you or your team have created. Use the **Search** bar, **Add filter**, or the sort dropdown (for example, **Recently Updated**) to find a specific dashboard.

## All Dashboards

The **All Dashboards** section lists every dashboard available in your account, including dashboards created by you, your team members, and Harness. Each dashboard is displayed as a row in a table.

<div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
  <iframe
    src="https://app.tango.us/app/embed/video/f6969645-6f59-4f3e-a9b6-ae3240c26e45?narrationType=voice1"
    title="About All Dashboard"
    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
    frameBorder="0"
    allow="autoplay; fullscreen"
    allowFullScreen
    sandbox="allow-scripts allow-same-origin allow-popups"
  />
</div> <br> </br>

### Search and pin dashboards

- **Search:** Use the search bar at the top of the list to find dashboards by name or description. The search is not case-sensitive.
- **Pin:** Select the pin icon next to the search bar to show only your pinned dashboards. Select the icon again to return to the full list. Pinning a dashboard does not affect other users.

### Filter dashboards

Select **+ Add filter** to narrow the dashboard list. You can filter by:

- **Tags:** Select one or more tags. Only dashboards that match all selected tags are shown.
- **Owner:** Select an owner to show only their dashboards.

After applying a filter, a **Tags** dropdown and **+ Filter** option appear below the search bar. Select **Reset** to clear all active filters and return to the full list.

### Sort dashboards

Use the sort dropdown on the right side of the search bar to change the order of the list. The following sort options are available:

- **Recently Updated** (default)
- **Recently Created**
- **Name (A-Z)**
- **Name (Z-A)**

### Dashboard list columns

Each row in the dashboard list displays the following information:

| Column      | Description                                                                      |
|-------------|----------------------------------------------------------------------------------|
| **Name**    | The dashboard name and a short description, if one was provided during creation. |
| **Tags**    | Labels assigned to the dashboard for filtering and organization.                 |
| **Owner**   | The user who created or manages the dashboard.                                   |
| **Created** | The date and time when the dashboard was created.                                |
| **Updated** | The date and time when the dashboard was last modified.                          |

### Dashboard actions

Each row has a three-dot menu (**...**) at the end. Select it to access the following actions:

- **Pin:** Pin the dashboard to the top of your list for quick access. To unpin, open the same menu and select **Unpin**.
- **Update Tags:** Add or remove tags on the dashboard to keep it organized.
- **Clone:** Create a copy of the dashboard. This is useful when you want to reuse an existing layout or set of widgets as a starting point.
- **Delete:** Permanently remove the dashboard. This action cannot be undone.

## Create a dashboard

There are two ways to create a dashboard: manually through the UI, or with the AI chat assistant.

<Tabs>
<TabItem value="Manual" label="Manual">

<div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
  <iframe
    src="https://app.tango.us/app/embed/video/dbd9fe8d-d788-462a-82e5-c646a6dbebaf?narrationType=voice1"
    title="Create Dashboard Manually"
    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
    frameBorder="0"
    allow="autoplay; fullscreen"
    allowFullScreen
    sandbox="allow-scripts allow-same-origin allow-popups"
  />
</div> <br> </br>

1. On the Dashboards landing page, click **+ Create Dashboard** in the top-right corner.

2. In the **Create New Dashboard** panel:
   - Enter a **Name**.
   - (Optional) Add a **Description**.
   - (Optional) Add **Tags** to help organize and filter dashboards.

3. Click **Submit**.

Your new dashboard opens in edit mode with a blank canvas. You are ready to add widgets. Go to [Create widgets](./create-widgets.md) to configure your first widget.

</TabItem>
<TabItem value="AI Chat assistant" label="AI Chat assistant">

The AI chat assistant is available on the left side of the Dashboards landing page. It provides quick actions and lets you describe dashboards in natural language.

<div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
  <iframe
    src="https://app.tango.us/app/embed/video/435c5d21-3a79-4094-99c7-b5bb006c1403?narrationType=voice1"
    title="Create Pipeline Dashboard with AI"
    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
    frameBorder="0"
    allow="autoplay; fullscreen"
    allowFullScreen
    sandbox="allow-scripts allow-same-origin allow-popups"
  />
</div> <br> </br>

1. On the Dashboards landing page, locate the **AI chat** panel on the left. You will see the prompt "How can I help today?" along with quick-action buttons such as **List pipelines**, **Ask a support question**, and **Analyze Pipeline Errors**.

2. In the text field at the bottom, describe the dashboard you want. For example: "Show me a dashboard with daily deployment counts and failure rates for the last 30 days."

3. The AI generates a complete dashboard with widgets, queries, and layout.

4. Review the result and make adjustments as needed.

For more details on supported query types, visualization options, and best practices, go to [AI-assisted dashboards](./ai-assisted-dashboard.md).

</TabItem>
</Tabs>

## Edit a dashboard

To modify a dashboard, click the **Edit** button in the header. This switches the dashboard to edit mode.

<div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
  <iframe
    src="https://app.tango.us/app/embed/video/e45e48c2-abce-4958-8172-285bd455f032?narrationType=voice1"
    title="Edit Dashboard"
    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
    frameBorder="0"
    allow="autoplay; fullscreen"
    allowFullScreen
    sandbox="allow-scripts allow-same-origin allow-popups"
  />
</div> <br> </br>

In edit mode, you can:

- **Change the title or subtitle:** Click directly on the title or subtitle text at the top of the dashboard. Type a new name and click outside the text area to apply it.
- **Add a new widget:** Click the **New Widget** button. This opens the widget configuration panel. Go to [Create widgets](./create-widgets.md) to learn how to configure each widget type.
- **Move a widget:** Click and hold a widget, then drag it to a new position on the grid. The widget snaps to the nearest grid position.
- **Resize a widget:** Hover over the bottom-right corner of a widget until you see a resize handle. Click and drag to make the widget larger or smaller.
- **Edit an existing widget:** Click the edit icon (pencil) on any widget to open its configuration panel.
- **Clone a widget:** Click the clone option on a widget to create an exact copy with the same query and display settings.
- **Delete a widget:** Click the delete option on a widget to remove it from the dashboard.

### Save or discard your changes

- **Save:** Click the **Save** button to keep all your changes. The dashboard returns to view mode.
- **Cancel:** Click the **Cancel** button to discard all changes. If you have unsaved changes, a confirmation dialog appears.
- **Navigate away:** If you try to leave the page with unsaved changes, a warning dialog appears. You can choose to stay and save, or leave and lose your changes.

   :::note
   Save your work frequently. There is no auto-save feature, so unsaved changes are lost if you navigate away without saving.
   :::

## Next steps

- [Create widgets](./create-widgets.md) — Add and configure widgets on your dashboard.
- [AI-assisted dashboards](./ai-assisted-dashboard.md) — Generate dashboards from natural language descriptions.
