---
title: Deployment logs and limitations
description: This topic lists the deployment log size and export and viewing limits.
sidebar_position: 6
helpdocs_topic_id: n06yruxm0d
helpdocs_category_id: etz0u5kujd
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic lists the deployment log size and export and viewing limits.

## Limitations

Harness deployment logging has the following limitations:

* A hard limit of 25MB for an entire step's logs. Logs beyond this limit are skipped and not available for download.
* The limit for a single line in a log is 25KB.
* Harness always saves the final log line that contains the status (Success, Failure, and so on), even if the log exceeds the limit.
* If the final log line is large and the log already exceeds the limit of 25MB, Harness shows a limited portion of the end of the final line (10KB of data for the line).
* Harness has a limit of 5000 lines at log service, so logs rendered in the UI console are truncated from the top if the logs exceed this value of 5000 lines.
