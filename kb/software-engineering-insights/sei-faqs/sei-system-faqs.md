---
title: SEI System FAQs
description: Frequently asked questions related to SEI System
sidebar_position: 50
---

This page includes FAQs and troubleshooting information for SEI System.

### How long does SEI store data and for what time period can we go back in history in the widgets?

SEI stores data for different time periods depending on the tool. For SCM (Software Configuration Management) tools, SEI typically fetches data for the last 30 days. In the case of Jira, SEI can provide information about tickets that have been updated in the last year and more.

### Can we track on how long was an issue open before it got delivered (Ticket, Story, Epic, etc.)?

Yes. We can track the time a ticket, story, or epic was open before it got delivered. This is often referred to as lead time or velocity.

### Can we show what was delivered in Production?

Yes. We can show what was delivered in Production, but it depends on how the user has defined their delivery workflow.

### Can we show if a task was in the commitment of the week or was it creep?

Yes. We can show whether a task was part of the commitment for the week or if it was added later, often referred to as "creep" tickets.

### Can we track improvement in developer productivity over time?

Yes. SEI can display trends that show whether the team or project is improving over time.

### Can I customize the Trellis Score Visualization for Kanban metrics and comparisons?

Customization options may depend on your specific tools and access rights. If you have editing rights you should be able to modify the Trellis Dashboard to suit your requirements, including adding comparisons or adjusting views.

### Do we have widgets for Kanban?

Yes. The key Kanban metrics are -

* **Lead Time:** Lead time measures the time it takes for a software development task to move from the moment it's added to the Kanban board until it's marked as complete. It reflects the total time a task spends in the Kanban workflow.
* **Cycle Time:** Cycle time focuses on the "active work" phase in Kanban, measuring the duration between when a team member starts a task and when they finish it. Cycle time begins when a task enters the active workflow.
* **Work-in-progress:** Work-in-progress also often referred to as WIP represents the number of tasks currently in the "active" or "in-progress" stages within the Kanban system. It provides a snapshot of ongoing work at any given time.
* **Throughput:** Throughput quantifies the number of tasks or work items your team successfully completes within a specific time frame, like a day or a week. It measures your team's productivity during that period.

### Can I associate a Business Alignment profile to a report?

Business Alignment profiles are applied at the Report level.

To begin with this you can create a new BA profile with the necessary details. After creating the profile, return to the insight where you want to use it and access the BA report settings.

Now you can switch between existing BA profiles from the profile selection option.

### What is the idle session timeout, and is there a non-idle session timeout?

The idle session timeout is currently set to 3 hours. This means that when a user is inactive for 3 hours, the user interface (UI) will automatically log them out and terminate their session.


### How can I control access to Software Engineering Insights (SEI) at the project level?
You can control access to SEI at the project level using Role-Based Access Control (RBAC). SEI supports restrictions for collections and Insights within specific projects.

### Is it possible to restrict SEI permissions to avoid granting account-wide access to all users?
Yes, SEI allows you to restrict permissions at the project level to prevent granting access across all projects. This ensures alignment with your organization’s access policies.

### What is the recommended approach for mapping infrastructure IDs with workflow stages in SEI 1.0?
In SEI 1.0, we recommend continuing to use the existing configuration to map infrastructure IDs with the appropriate workflow stage when working with profiles.

### Are there any planned improvements in SEI 2.0 related to mapping infrastructure IDs?
Yes, in SEI 2.0, we plan to bring asset definitions entirely into the team settings. This change aligns directly with the use case of mapping infrastructure IDs and should significantly simplify the setup process moving forward.

### How can I change the permissions for product groups so they can only manage specific collections in Harness?
To limit product groups' access to specific collections, create a resource group at the project level and add the required collections to it. Then, assign this resource group to the user group. Ensure that you do not provide view access at the account level, but only at the project level for the resource group.

### Why doesn't the project-level permission setup for collections and insights work for Workflows in SEI?
Currently, only collections, insights, and configuration are supported for RBAC in SEI at the project level. Workflows fall under configuration and are managed at the account level, so the project-level permission does not apply to workflows.
