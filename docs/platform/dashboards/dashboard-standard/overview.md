---
title: Overview
description: Build, customize, and share real-time dashboards to monitor your data across the Harness platform.
sidebar_position: 1
keywords:
  - dashboards
  - overview
  - widgets
  - HQL
  - monitoring
  - DORA
  - AI dashboard
tags:
  - Dashboards
---

Harness Dashboards give you a single place to track what matters most across your projects — deployments, builds, costs, services, and more. Each dashboard is made up of widgets that pull in your data and display it as charts, tables, numbers, or gauges. 

You can build dashboards yourself, or let the AI assistant create them for you.

## What you can do with Dashboards

- **Visualize data your way:** Display information as metric, tables, donut charts, or time-series charts (line, bar, area, scatter).
- **Use AI to get started faster:** Describe what you want to see in natural language, and the AI assistant creates the dashboard or widget for you. Navigate to [AI-assisted dashboards](https://69ef85f3d49eb49b95c748c7--harness-developer.netlify.app/docs/platform/dashboards/dashboard-standard/ai-assisted-dashboard) for more details.
- **Build queries visually or in code:** Use a form-based builder for common queries, or write HQL directly for full control.
- **Query your data:** Use Harness Query Language (HQL) to query data from views associated with Pipeline, CD, CI etc.
- **Dashboard and Widget level filter:** Apply filters at the dashboard or widget level to focus on specific data.

## Dashboards

When you open **Dashboards**, the landing page shows two sections:

- **AI chat panel:** A chat assistant on the left side of the page where you can type requests in plain language, use quick actions like List pipelines or Analyze Pipeline Errors, and access your chat history and settings. Go to [AI-assisted dashboards](https://69ef85f3d49eb49b95c748c7--harness-developer.netlify.app/docs/platform/dashboards/dashboard-standard/ai-assisted-dashboard) for details.
- **Dashboards list view:** A searchable, filterable list of every dashboard in your account. You can search by name, filter by tags or owner, pin your favorites, sort the list, and manage dashboards using the three-dot menu (pin, update tags, clone, or delete). Go to [Create a dashboard](https://69ef85f3d49eb49b95c748c7--harness-developer.netlify.app/docs/platform/dashboards/dashboard-standard/create-dashboard#all-dashboards) for details.

## View a dashboard

Select a dashboard name from the list to open it. The dashboard opens in view mode, where you can see live data but cannot make changes.

In view mode:

- **Widgets load automatically:** Each widget runs its query and shows the latest results.
- **Header information:** The top of the dashboard displays the title, subtitle, creation date, and last updated date.
- **Refresh data:** To reload all widget data without leaving the page, open the actions dropdown in the header and select **Refresh**.

To make changes, select **Edit** to switch to edit mode. Go to [Create a dashboard](./create-dashboard.md#edit-a-dashboard) for details on editing.
 
## Widgets

Each widget displays data in a specific way. Choose the type that fits the information you want to show.

| Widget type | What it shows | When to use it |
|-------------|--------------|----------------|
| **Metric** | A single number, with an optional label (for example, "1,234 deployments") | Show a count, total, or summary value at a glance |
| **Table** | Rows and columns of data with pagination | Display detailed records or individual entries |
| **Donut** | A circular chart divided into segments | Show how a total breaks down into categories (for example, success vs. failure) |
| **Cartesian** | A chart with X and Y axes (line, bar, column, area, or scatter) | Show trends over time or compare values across categories |

Go to [Create widgets](./create-widgets.md) to learn how to configure each type, write queries, and customize display settings.


## Tips for effective dashboards

- **Keep each dashboard focused.** Build each dashboard around a single topic or question. "Service Health" or "Weekly Build Metrics" is more useful than one dashboard that tries to cover everything.
- **Use descriptive names.** Name dashboards and widgets so anyone can understand what they show at a glance. "Pipeline Failures (Last 7 Days)" is better than "Dashboard 1."
- **Aim for 6 to 12 widgets.** Too many widgets make the page slow and hard to read.
- **Group related widgets together.** Place widgets about the same topic next to each other on the grid.
- **Tag your dashboards.** Use tags like "CI", "production", or "platform-team" to organize dashboards by team, service, or environment.
- **Pin dashboards you check often.** Pinned dashboards appear at the top of the list when you select the pin icon.
- **Clone instead of starting from scratch.** If a dashboard already exists that is close to what you need, clone it and adjust.

## Next steps

- [Create a dashboard](./create-dashboard.md) — Build your first dashboard or explore pre-built ones.
- [Create widgets](./create-widgets.md) — Configure widget types, write queries, and set up filters.
- [AI-assisted dashboards](./ai-assisted-dashboard.md) — Generate dashboards and widgets using plain language.
- [Harness Query Language (HQL)](./harness-query-language.md) — Learn the full query syntax.
