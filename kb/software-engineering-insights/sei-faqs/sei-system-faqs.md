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
