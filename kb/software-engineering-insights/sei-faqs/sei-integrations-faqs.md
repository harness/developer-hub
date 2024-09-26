---
title: Integration FAQs
description: Frequently asked questions related to SEI integrations
sidebar_position: 50
---

This page includes FAQs and troubleshooting information for SEI integrations.

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