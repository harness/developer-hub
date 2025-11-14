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

## Log size limits

The following table shows the log size limits for different Harness modules:

| Limit Type | CI Module | Other Modules (CD, CCM, etc.) |
|------------|-----------|-------------------------------|
| **Total log size per step** | 5MB | 25MB |
| **Maximum size per log line** | 70KB | 25KB |

### Log truncation behavior

* When logs exceed the size limit, Harness truncates the oldest log lines and retains the newest ones.
* You can export full CI logs to an external cache. For information about CI log limits and exporting CI logs, go to [Truncated execution logs](/docs/continuous-integration/ci-articles-faqs/continuous-integration-faqs#truncated-execution-logs).

## Viewing limits

* **Line limit**: The Harness log service has a limit of 5000 lines. Logs rendered in the Harness UI are truncated from the top if the logs exceed the 5000 line limit.

:::note
If you need logs more than 5000 lines, contact [Harness Support](mailto:support@harness.io)
:::

* **Step runtime limit**: Steps exceeding a 5-hour runtime may experience log visibility issues. We are working to address this limitation.
