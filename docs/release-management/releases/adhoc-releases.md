---
title: Ad Hoc Releases
slug: /release-orchestration/releases/adhoc-releases
description: Learn how to create and execute releases on-demand outside of release groups
sidebar_position: 4
---

import DocImage from '@site/src/components/DocImage';

Ad hoc releases let you create and execute a release on-demand, outside any release group or recurring cadence. You can run them immediately or schedule them for a one-time execution. This is useful for customer-specific releases, testing new processes, or one-off deployments that don't fit into your standard release schedule.

Unlike releases created through release groups, ad hoc releases operate independently. You select a process, configure the execution window, provide inputs, and optionally run the release immediately—all through a guided workflow.

## When to Use Ad Hoc Releases

Ad hoc releases work well for scenarios that don't fit into your regular release cadence.

### Customer-Specific Deployments

Some customers may require custom releases on their own timelines. Ad hoc releases let you deploy customer-specific changes without disrupting your standard release calendar or creating dedicated release groups for one-time deployments.

You can reuse your existing processes while customizing inputs for each customer's environment and requirements.

### Testing Release Processes

Before adding a new process to a recurring release group, you might want to test it in isolation. Create an ad hoc release to validate the process works correctly without affecting scheduled releases.

This helps teams verify new processes, test configuration changes, or train team members on release workflows without risking production release groups.

### Unscheduled Maintenance

Infrastructure upgrades, security patches, or configuration changes often need to happen outside normal release windows. Ad hoc releases let you orchestrate these activities using your standard release processes while tracking them alongside regular releases.

## Create an Ad Hoc Release

Click **New Release** from the releases page and select **Create Release On-the-Go** to open the creation wizard. The wizard guides you through four steps to configure and optionally execute your release.

<DocImage path={require('../static/adhoc-release-create.png')} title="Click to view full size image" />

### Step 1: Release Overview

Start by defining the basic details of your release.

Enter a **Name** for the release. The system automatically generates an identifier based on the name, but you can customize it if needed. Add optional **Tags** to categorize the release for filtering and reporting.

Provide a **Description** that explains why you're creating this ad hoc release—this helps teammates understand the context when they review execution history. Specify a **Version** using numbers and periods (like 1.0.0 or 2.1.3).

Choose a **Color** to visually distinguish this release on the calendar and in lists. Colors help teams quickly identify different types of releases when scanning the release overview.

Click **Next: Process & Date/Time** to continue.

### Step 2: Process and Date/Time

Select the process that defines what this release will execute. Choose a **Process** from your library of orchestration processes. The process you select determines what phases and activities will execute when the release runs.

If the process requires inputs, optionally select a **Process Input Set**. Input sets provide predefined values for the process's global variables and activity inputs. You can also leave this blank and provide runtime inputs in step 4.

Set the **Expected Start** and **Expected End** times. These define the window during which the release is expected to run. The expected end time defaults to one week from the expected start time, but you can adjust it to match your deployment timeline.

These timestamps help with scheduling and reporting, but they don't prevent the release from running outside this window—they're guidance for tracking and planning purposes.

Click **Next: Summary** to review your configuration.

### Step 3: Summary

Review all your release configuration before creating it. The summary shows all the details you configured: release overview information, schedule window, and the linked process and input set. Verify everything is correct—once you create the release, you can't change the linked process or input set.

If you need to make changes, click **Back** to return to previous steps. When everything looks correct, proceed to the configuration step.

### Step 4: Configure and Run

The final step determines whether to create the release for later execution or run it immediately.

You have two options at the bottom of this screen:

**Create**: Saves the release in a Scheduled state. The release won't execute until someone manually triggers it later. Use this when you want to prepare a release in advance or need additional approvals before execution.

**Create & Run**: Creates the release and immediately starts execution. The system navigates you to the release execution page where you can monitor progress in real time. Use this for urgent deployments or when you've already obtained necessary approvals.

Before choosing, review the process details and execution configuration displayed on this screen. This is your last chance to verify the setup before the release goes live.

## After Creation

Once you create the release, it appears in the releases list alongside releases from release groups. Ad hoc releases are marked with their source type to distinguish them from scheduled releases.

### Scheduled Releases

If you chose **Create**, the release enters a Scheduled state. You can find it in the releases list and execute it when ready by opening the release and clicking **Execute**.

The release remains in the Scheduled state until someone manually triggers execution or the expected end time passes without execution.

### Running Releases

If you chose **Create & Run**, the release immediately begins executing. The system takes you to the execution page where you can watch phase and activity progress.

The release follows the same execution flow as scheduled releases—progressing through phases, waiting for approvals at manual activities, and tracking all execution details for audit purposes.

## Managing Ad Hoc Releases

Ad hoc releases appear in all the same views as regular releases. You can filter releases by source type if you want to see only ad hoc releases or exclude them from your view.

### Viewing Ad Hoc Releases

The releases calendar shows ad hoc releases alongside scheduled releases from release groups. The calendar uses the color you assigned during creation to visually distinguish the release.

You can also find ad hoc releases in the releases list view, where they're marked with their creation source. This helps you understand whether a release was created manually or generated by a release group.

### Execution Tracking

Once an ad hoc release executes, tracking works exactly the same as for scheduled releases. You can monitor real-time progress, view execution history, complete manual activities, and generate reports covering the execution.

All the same error handling, retry options, and remediation capabilities apply to ad hoc releases. The execution engine treats them identically to releases from release groups.

### Audit Trail

Ad hoc releases maintain complete audit trails showing who created them, when they executed, what activities ran, and who approved manual steps. These audit records appear in reports alongside scheduled releases.

This ensures compliance requirements are met even for emergency or unscheduled deployments—you have the same visibility and accountability as with planned releases.

## Differences from Scheduled Releases

While ad hoc releases execute the same way as releases from release groups, there are some key differences in how they're created and managed.

### No Release Group Association

Ad hoc releases don't belong to a release group. They're standalone entities created outside the normal release cadence. This means they won't appear in release group views and don't follow recurring schedules.

You can still use the same processes and input sets as your scheduled releases—ad hoc releases just bypass the release group structure.

### Manual Creation Only

Ad hoc releases are always created manually through the UI. The system never generates them automatically on a schedule. This gives you complete control over when and why ad hoc releases are created.

If you find yourself creating the same ad hoc release repeatedly, consider creating a release group with an appropriate cadence instead.

### Flexible Timing

Ad hoc releases let you set any execution window without coordinating with existing release groups. You're not constrained by release group schedules or blackout windows—though you should still consider operational constraints and team availability.

The expected start and end times are purely for tracking purposes. The release can execute immediately after creation regardless of these timestamps.

## Related Topics

- [Releases Overview](./overview.md)
- [Release Groups](./release-groups.md)
- [Modeling Releases](./modeling-releases.md)
- [Executing a Release](../execution/executing-a-release.md)
- [Processes Overview](../processes/overview.md)
