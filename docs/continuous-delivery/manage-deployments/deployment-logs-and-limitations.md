---
title: Deployment logs and limitations
description: This topic lists the deployment log size and export and viewing limits.
sidebar_position: 6
helpdocs_topic_id: n06yruxm0d
helpdocs_category_id: etz0u5kujd
helpdocs_is_private: false
helpdocs_is_published: true
---

Harness deployment logging has the following limitations:

* A hard limit of 25MB for an entire step's logs. Deployment logs beyond this limit are skipped and not available for download.
   * The log limit for Harness CI steps is 5MB, and you can export full CI logs to an external cache. For information about CI log limits and exporting CI logs, go to [Truncated execution logs](/kb/continuous-integration/continuous-integration-faqs/#truncated-execution-logs).
* The limit for a single line in a log is 25KB.
* Harness always saves the final log line that contains the status (Success, Failure, and so on), even if the log exceeds the limit.
* If the final log line is large and the log already exceeds the limit of 25MB, Harness shows a limited portion of the end of the final line (10KB of data for the line).
* The Harness log service has a limit of 5000 lines. Logs rendered in the Harness UI are truncated from the top if the logs exceed the 5000 line limit.
