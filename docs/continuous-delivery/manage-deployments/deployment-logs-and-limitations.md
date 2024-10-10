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
   * The log limit for Harness CI steps is set to 5MB, where each line is limited to 25KB. Depending on the size of each line, the total log size could be less than the overall limit of 5MB, and you can export full CI logs to an external cache. For information about CI log limits and exporting CI logs, go to [Truncated execution logs](/kb/continuous-integration/continuous-integration-faqs/#truncated-execution-logs).
* The maximum size for a single log line across all modules is 25KB.
* Harness always saves the final log line that contains the status (Success, Failure, and so on), even if the log exceeds the limit.
* If the final log line is large and the log already exceeds the limit of 25MB, Harness shows a limited portion of the end of the final line (10KB of data for the line).
* The Harness log service has a limit of 5000 lines. Logs rendered in the Harness UI are truncated from the top if the logs exceed the 5000 line limit.

:::note
If you need logs more than 5000 lines, contact [Harness Support](mailto:support@harness.io)
:::

* Steps exceeding a 5-hour runtime may experience log visibility issues. We are working to address this limitation.
