---
title: Deployment Logging Limitations
description: This content is for Harness FirstGen. Switch to NextGen. This topic lists the deployment log size, export, and viewing limits. Limitations. Harness deployment logging has the following limitations --  A…
sidebar_position: 90
helpdocs_topic_id: h3b4wttuk5
helpdocs_category_id: cwefyz0jos
helpdocs_is_private: false
helpdocs_is_published: true
---

This content is for Harness [FirstGen](../../../../getting-started/harness-first-gen-vs-harness-next-gen.md). Switch to [NextGen](https://docs.harness.io/article/n06yruxm0d).This topic lists the deployment log size, export, and viewing limits.

### Limitations

Harness deployment logging has the following limitations:

* A hard limit of 25MB for logs produced by 1 Workflow step. Logs beyond this limit will be skipped and not available for download as well.
* Harness always saves the final log line that contains the status (Success, Failure, etc) even if logs go beyond the limit.
* In cases where the final log line is itself very large and logs are already beyond max limit (25MB), Harness shows a limited portion of the line from the end (10KB of data for the log line).

### Viewing Large Logs

For any completed Workflow displayed in **Deployments**, you can expand the log section. The most recent log information is displayed first. You can scroll to see older logs information.

### See Also

[Export Deployment Logs](export-deployment-logs.md)

