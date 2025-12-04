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

## Real-time log display behavior

When running pipelines, you may notice differences between real-time log display and the complete logs available after step completion:

### Initial display limitation

* During step execution, the initial log display shows approximately 10,000 lines in real-time
* The complete log becomes visible after refreshing the page once the step is complete
* This behavior is by design and does not affect the execution of your steps

### Log batching optimization

The log system uses batching to optimize log storage and display:

* The 5,000 line limit applies at the step level per request
* Log batching allows multiple log lines within each message, effectively increasing the total number of lines stored
* Logs are flushed every second from the delegate to the log service
* The batch size depends on how many logs the step produces within that flush interval
* If a task produces more log lines than the configured limit within 100ms, older logs from that batch may be truncated

### Expected behavior

* **Real-time monitoring**: During execution, you might see fewer lines than actually generated, or notice a mismatch between log line numbers and displayed content
* **Post-execution**: The full log output becomes available after step completion and page refresh
* **Log line count**: The total number of visible log lines can vary depending on the log generation rate and batching behavior

### Best practices

To work effectively with log display behavior:

* For critical log analysis, wait for step completion and refresh the page to view complete logs
* Consider breaking down steps that generate excessive logs into smaller tasks
* Add identifiers or markers to log lines to make them easily searchable
* If you notice missing logs during real-time monitoring, refresh the page after step completion to view the full output
