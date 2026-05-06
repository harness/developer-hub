---
title: Configure On-Call Schedules
description: Build and manage on-call rotation schedules in Harness AI SRE, including rotation patterns, overrides, and external imports.
sidebar_label: Configure On-Call Schedules
sidebar_position: 3
---

import DocVideo from '@site/src/components/DocVideo';

# Configure On-Call Schedules

On-call schedules define who is responsible for responding to incidents at any given time. 

As an administrator, you'll create rotation schedules for your teams, manage overrides for temporary coverage changes, and optionally import configurations from external tools.

## Create a Schedule

<DocVideo src="https://app.tango.us/app/embed/bc9db76e-c622-457e-95b1-45aa0ff06906?skipCover=true&defaultListView=false&skipBranding=false&makeViewOnly=false&hideAuthorAndDetails=true" title="Create On-Call Schedule" />

1. Navigate to **On-Call** → **Schedules**.
2. Click **Create Schedule**.
3. Configure the schedule:
   - **Name** — A descriptive name (e.g., "Payments Team — Weekly Rotation").
   - **Rotation pattern** — Set the rotation type (e.g., weekly) with a customizable start time and day.
   - **Time zone** — Select the appropriate time zone for the team.
   - **Participants** — Add team members to the rotation.
4. Review the schedule preview to verify coverage.
5. Click **Save**.

### Schedule Options

- **Weekly rotations** with customizable handoff times and days.
- **24/7 coverage** for always-on services.
- **Follow-the-sun** patterns for globally distributed teams.
- **Holiday calendars** to account for planned time off.
- **Edit YAML** for programmatic schedule setup and bulk configuration.

## Create Schedule Overrides

Overrides let you temporarily change who's on call — for example, when someone is out sick, on vacation, or swapping shifts.

<DocVideo src="https://app.tango.us/app/embed/2fe2c6c2-d4ed-40ce-80da-369a005c9259?skipCover=true&defaultListView=false&skipBranding=false&makeViewOnly=false&hideAuthorAndDetails=true" title="Create an Override Schedule" />

1. Navigate to the schedule you want to override.
2. Click **Add Override**.
3. Specify:
   - The **person** covering the shift.
   - The **start and end time** for the override.
4. Save the override. The schedule view will reflect the temporary change.

## Import from External Sources

If your organization is migrating from another on-call tool, you can import schedule configurations:

<DocVideo src="https://app.tango.us/app/embed/81ad2a7e-07f5-4a1a-813e-45f8fea4ab7c?skipCover=true&defaultListView=false&skipBranding=false&makeViewOnly=false&hideAuthorAndDetails=true" title="Setting On-Call from external source" />

<!-- CHANGED (comment #9): The previous callout said PagerDuty import was "planned for a future release." The PagerDuty and OpsGenie syncers are shipped — full syncers exist in the codebase and the related Jira tickets (IR-2455, IR-2370, IR-2361) are marked done. Updated to reflect live status for both. The xMatters syncer remains in development and is noted as coming in a future release. -->
:::info Migrating from another on-call tool
Syncers for importing users, escalation policies, and schedules are available for **PagerDuty** and **OpsGenie**. An xMatters syncer is planned for a future release.
:::

## Best Practices

- **Ensure full coverage** — Review the schedule preview for gaps. Every hour should have a designated responder.
- **Set reasonable rotation lengths** — Weekly rotations are a common default. Shorter rotations reduce fatigue; longer ones reduce handoff overhead. Adjust based on team feedback.
- **Use overrides instead of editing the schedule** — Overrides preserve the base rotation and create a clear audit trail of coverage changes.
- **Leverage YAML for large teams** — The Edit YAML feature makes it easier to manage complex or multi-team schedules programmatically.
- **Account for time zones** — For distributed teams, verify that handoff times make sense in each participant's local time zone.