---
title: Create Custom Dashboards using Harness SCS
sidebar_label: Create Custom Dashboards
description: Create Custom Dashboards using Harness SCS
sidebar_position: 1
---

Harness provides a powerful dashboard feature, allows you to visualize key metrics and data. You can fully customize your dashboards to display specific metrics relevant to your needs, all from one centralized location. Additionally, you can automate the delivery of your license reports to executives and stakeholders.

Currently Harness SCS supports 4 dashboards 
1) License Report - Artifacts
2) License Report - Code Repositories
3) Compliance Report - Code Repositories
4) Compliance Report - Organisation

## Steps to Clone a Dashboard

Follow the below steps to clone an existing dashboard and customize it according to your requirements:

1) Click on the ellipsis in the top-left menu. Select **Dashboards** from the dropdown, then choose **Supply Chain**.

<DocImage path={require('./static/dashboard.png')} width="80%" height="100%" title="Click to view full size image" />

2) Select a dashboard that aligns with your use case. Click on the ellipsis in the top-right corner of the dashboard card and select Clone. (Cloning is recommended for easier customization.)

<DocImage path={require('./static/clone.png')} width="80%" height="100%" title="Click to view full size image" />


3) To create a clone of the dashboard, Provide the following details

  * **Folder:** Select the Organization Shared Folder.

  * **Name:** Enter a name for your dashboard (e.g., License Report - Artifacts).

  * **Tags(Optional)**: Add any relevant tags.

  * Click Continue.

  <DocImage path={require('./static/new-dashboard-card.png')} width="80%" height="100%" title="Click to view full size image" />

4) After you clone the dashboard, you will see your new dashboard listed on the dashboards screen. Click on it for the overview.

<DocImage path={require('./static/new-dashboard.png')} width="80%" height="100%" title="Click to view full size image" />

5) Click on ellipsis which is on the top right corner of your new dashboard for more actions

* **Clear Cache & Refresh:** This action performs a hard refresh, clears the cache, and updates the dashboard with the latest changes.
* **Edit Dashboard:** Customize your dashboard based on your usecase. Add filters, change visualizations, and adjust settings to fit your use case.
* **Download:** Download the license report in any of the format ( PDF,CSV )to easily share with stakeholders.
* **Schedule Delivery:** Set up automatic delivery of your license report—daily, weekly, or monthly—so you never have to manually check the dashboard again.

<DocImage path={require('./static/filters.png')} width="80%" height="100%" title="Click to view full size image" />