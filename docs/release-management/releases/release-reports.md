---
title: Release Reports
slug: /release-orchestration/releases/release-reports
description: Learn how to generate and download Excel reports for releases and release groups
sidebar_position: 6
---

import DocImage from '@site/src/components/DocImage';

Release Orchestration generates comprehensive Excel reports that capture execution details across your releases. You can generate reports for a single release or for all releases in a release group within a specified time window.

Reports provide detailed insights into release execution, including phase timelines, subprocess activity, and manual task completion metrics. This helps teams analyze release performance, identify bottlenecks, and maintain audit trails for compliance.

:::info report format

Current releases generate Excel (.xlsx) reports with four detailed sheets. Legacy reports may be in CSV format containing only the Release Summary data. Excel is the standard format going forward.

:::

## Report Contents

Each report is generated as an Excel (.xlsx) file with four sheets providing different levels of detail:

### Release Group Report

The Release Group Report sheet provides a high-level summary when generating reports from a release group. This sheet appears only for release group reports, not single release reports.

The report includes columns for Release Name, Release Identifier, Release Group Name, Release Group Identifier, Status, Version, Release ID, Tags, End At, Started At, Expected Start Time, Expected End Time, Actual Start Time, Actual End Time, Total Duration, Process Identifier, and Total Subprocesses.

This overview helps stakeholders compare performance across multiple releases in a group and identify trends without digging into individual release details.

### Manual Task Execution Details

The Manual Task Execution Details sheet documents every manual activity and its associated tasks across all releases in the report.

For each release, the sheet shows a summary row with the release name, version, status, and total manual activities count. Below each release summary, the report lists individual manual activities grouped by phase. For each activity, you see the activity name, phase name, and activity status.

Under each activity, individual tasks are listed in a table with columns for Task Name, Task Identifier, Expected Duration, Actual Duration, and Status. The status column is color-coded (green for Success) to make it easy to identify task completion states.

This detailed view helps teams track manual approval steps, identify bottlenecks in human-dependent processes, and maintain audit trails for compliance.

### Subprocess Execution Details

The Subprocess Execution Details sheet tracks nested subprocess executions within your releases. For each release in the report, this sheet shows a summary row with the release name, version, and total subprocess count.

When a release contains subprocesses, the report shows "Subprocesses: 0" or the actual count. If subprocesses executed, additional details would appear showing the subprocess identifiers, trigger types, execution status, and timing information.

This view helps teams understand complex release workflows where subprocesses handle specialized deployment scenarios or rollback procedures. Trigger types indicate whether the subprocess was configured as part of the release, triggered from a task, or initiated as a failed activity retry.

### Phase Execution Details

The Phase Execution Details sheet breaks down each release into its constituent phases. For each release, the sheet shows a summary row with the release name, version, status, and total duration.

Below each release summary, phases are listed in a table with columns for Phase Name, Phase Identifier, Status, Start Time, End Time, and Duration. The status column uses color coding (green for Success) to highlight successful, failed, and aborted phases.

Phases are grouped by release for easy navigation. The detailed timestamps help teams reconstruct the execution timeline, understand dependencies between phases, and identify which phases consumed the most time during release execution.

## Generate a report

You can generate reports from two locations in the UI: from a single release page or from a release group overview.

### From a Single Release

Open the release you want to report on. Click the **Generate Report** button in the top right corner of the release details page.

<DocImage path={require('../static/release-report-button.png')} title="Click to view full size image" />

A dialog appears where you select the time period for the report. Choose a start time and end time that covers the release execution window you want to analyze. The maximum time period is 90 days.

<DocImage path={require('../static/generate-report-modal.png')} title="Click to view full size image" />

Click **Generate Report** to start the generation process.

The system creates the report synchronously. The Excel file downloads immediately with a filename that includes the report ID for easy identification.

### From a Release Group

Navigate to the release group overview page. Click **Generate Report** to create a report covering all releases in the group. Select your desired time window in the dialog—this filters which releases from the group are included based on their execution times.

For release groups with many releases, report generation may take longer. The system processes all releases within the time window and consolidates them into a single Excel file.

## Download a report

The Excel file downloads immediately with a filename that includes the report ID for easy identification.

Open the downloaded file in Excel, Google Sheets, or any spreadsheet application. Each sheet has formatted headers, color-coded status cells, and properly sized columns for readability. You can filter, sort, and analyze the data using standard spreadsheet functions.

## Report Time Windows

Reports are scoped to a specific time period to keep file sizes manageable and generation times reasonable. The time window you select determines which releases and execution data appear in the report.

For single releases, the time window filters the release's execution timeline. If the release executed entirely outside your selected window, the report will be empty. Choose a window that covers the release's actual start and end times.

For release groups, the time window filters which releases from the group are included. Only releases that started or were active during the selected period appear in the report. This lets you generate monthly or quarterly reports showing all release activity within specific timeframes.

The maximum time window is 90 days. For longer historical analysis, generate multiple reports covering different time periods and consolidate them externally if needed.

## Use Cases

### Release Retrospectives

Generate a report covering your last sprint or release cycle. Review the Phase Details sheet to identify which phases took longer than expected. Check the Manual Task Details to see if manual approvals caused delays.

Share the report with the team during retrospective meetings. The detailed timing data helps the team have fact-based discussions about what worked and what needs improvement.

### Compliance Audits

When auditors request evidence of release governance, generate reports showing your complete release history. The Release Summary sheet provides the high-level audit trail, while Phase and Subprocess Details document that all required steps executed.

Manual Task Details proves that required approvals and sign-offs happened. The report timestamps serve as evidence of when changes were deployed and who approved them.

### Performance Analysis

Compare multiple releases by generating a report for the entire release group. Sort the Release Summary sheet by duration to identify releases that took significantly longer than average. Investigate those releases to understand what caused the delays.

Look for patterns across releases. If certain phases consistently take longer, those might be candidates for optimization or automation. The subprocess data shows whether retry logic is triggering frequently, which might indicate flaky infrastructure or processes.

### Process Improvement

Use the variance metrics in Manual Task Details to find manual steps that consistently take longer than planned. These are prime candidates for automation or process refinement.

Phase duration trends across multiple releases reveal whether your process improvements are actually reducing cycle time. Generate monthly reports and track phase durations over time to measure the impact of your optimizations.

## Related Topics

- [Releases Overview](./overview.md)
- [Release Groups](./release-groups.md)
- [Release Lifecycle](./release-lifecycle.md)
- [Executing a Release](../execution/executing-a-release.md)
