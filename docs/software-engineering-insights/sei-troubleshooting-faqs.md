---
title: Troubleshooting & FAQs
description: SEI troubleshooting and FAQs
sidebar_position: 90
---

This page includes FAQs and troubleshooting information for SEI and the Harness Platform. 

# FAQs & Troubleshooting Guides

## Integrations

### Can the data ingestion cadence be adjusted?

Yes, the data ingestion cadence can be configured on the backend, but this functionality is not exposed in the UI. Adjusting the cadence will be considered only if there is a specific reason to do so.

### How do rate limits work?

Rate limits for most applications are per API key. This means that SEI only consumes the API quota allocated to the keys generated. It does not affect the global rate limit quota and their associated accounts/keys.

### Is it possible to customize data sent to SEI from Jira or other integrations?

Yes, SEI offers the flexibility to customize data sent from Jira and other integrations. Users can opt-out of sharing specific data elements, such as descriptions, based on their preferences.

### Why are metrics missing for few reports across teams/projects?

The absence of metrics for certain reports and teams/projects is by design. SEI filters data as a whole, which means that even if a particular issue matches the Jira filters, it may not appear in the report due to the way it's correlated with Source Code Management (SCM) integration IDs.

To ensure that the desired data is visible in the reports, you need to modify the widget or profile configuration. If you want specific data to be shown in the reports, ensure that the integration id associated with that data is added to the profile or widget.

### What is the maximum time range for importing existing data from Jira and GitHub

The maximum time range for importing existing data from Jira and GitHub can vary due to different limitations:

* **For Jira:**

    **Default Range:** Jira typically allows importing data for a standard time frame, but the exact duration may depend on your specific Jira setup.

    **Manual Override:** If needed, you can manually override the default time frame to go back further in time.

    **General Range:** In general, you can expect to import data from Jira going back 2-3 years, though this can vary based on your specific configuration.

* For GitHub:

    **Default Range:** GitHub's data import capabilities are limited by strict API rate limits.

    **Default Duration:** GitHub usually allows you to import data from the last 30 days by default.

    **Limitation:** Going back further in time on GitHub may require special considerations and potentially dealing with these rate limits.

### How often does SEI query Jira for new metadata?

SEI triggers two types of scans: 

* Backward scans
* Forward scans. For Forward scans, we only ingest the updated data. 
The frequency for this jobs by default is once per day but can be customized based on the requirement.

## Reports

### What is the usage of OU UNIT OVERRIDES field in the report settings?

The OU UNIT OVERRIDES field in the report settings allows you to override filters defined at the Collections scope. This means that the report will display data based solely on the report filters, ignoring the Collection filter.

For example, suppose the Collection filter specifies that the Assignee must equal a certain value (e.g., a specific user). If you select "Assignee" in the "OU UNIT OVERRIDES" field, it will override the Collection filter. As a result, the report will display data for all users, not just the user specified in the Collection filter.

## Platform

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

### Can I attach a investment profile to a widget?

Investment profiles are applied at the Insight level, not at the widget level. 

To begin with this you can create a new investment profile with the necessary details. After creating the profile, return to the insight where you want to use it and access the widget settings. Inside the widget settings, look for the option to select the "Effort Investment Profile." Choose the profile you've created and save your widget settings. Verify that the widget now displays the information according to your chosen profile.

### What is the idle session timeout, and is there a non-idle session timeout?

The idle session timeout is currently set to 3 hours. This means that when a user is inactive for 3 hours, the user interface (UI) will automatically log them out and terminate their session.

## Ingestion Satellite

For FAQs & Troubleshooting guide on the Ingestion Satellite, go to the [Ingestion Satellite FAQs & Troubleshooting](/docs/software-engineering-insights/sei-ingestion-satellite/satellite-troubleshooting-and-faqs).

## Propels and Tables

### How can I delete all rows in a table?

To delete all rows in a table within SEI, you can follow these steps:

* Upload an Empty CSV:
    Upload an empty CSV file to the table where you want to delete all rows. This will essentially replace the existing data with no data.

* Save Changes:
    After uploading the empty CSV, be sure to save the changes to confirm the deletion of all rows.

### Is there a way to quickly drop and recreate a table?

Yes, you can quickly drop and recreate a table in SEI using the following steps:

* Upload an Empty CSV:
    Upload an empty CSV file to the table you want to drop and recreate. This will effectively delete all existing data in the table.

* Save Changes:
    After uploading the empty CSV, save the changes to remove all rows from the table.

* Recreate the Table:
    Create a new table with the same name or the desired name.

* Upload Data:
    If you wish to populate the recreated table with data, upload the CSV or data file containing the information you want in the new table.
  
* Save Changes Again:
    Once you've uploaded the new data and set up the table as needed, be sure to save the changes.

### How can I access previous versions of data in SEI after making changes?

SEI maintains version history, allowing you to access previous versions of data. 

### What should I do if I need to update data using Propel in SEI?

To update data using Propel in SEI, follow these steps:

* Upload an Empty CSV:
    Begin by uploading an empty CSV file to the table you intend to update.

* Save Changes:
    After uploading the empty CSV, save the changes to clear the table.

* Run Propel:
    Once the table is empty, execute the Propel operation to update the data as needed.

## Other 

For FAQs about the Harness Platform or other Harness modules, go to the [Harness FAQs](/docs/faqs).

For general Harness troubleshooting guidance, go to [Troubleshooting Harness](/docs/troubleshooting/troubleshooting-nextgen).

For further assistance, please contact [Harness Support](mailto:support@harness.io) or visit the [Harness Community Forum](https://developer.harness.io/community).
