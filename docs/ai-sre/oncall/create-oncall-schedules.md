---
title: Configure On-Call Schedules
description: Build rotation patterns, overrides, and external schedule imports.
sidebar_label: Configure On-Call Schedules
sidebar_position: 3
---

import DocVideo from '@site/src/components/DocVideo';

On-call schedules define who is responsible for responding to incidents at any given time.

As an administrator, you create rotation schedules for your teams, manage overrides for temporary coverage changes, and optionally import configurations from external tools.

## Create a schedule

<DocVideo src="https://app.tango.us/app/embed/bc9db76e-c622-457e-95b1-45aa0ff06906?skipCover=true&defaultListView=false&skipBranding=false&makeViewOnly=false&hideAuthorAndDetails=true" title="Create On-Call Schedule" />

1. Go to **On-Call** → **Schedules**.
2. Click **Create Schedule**.
3. Configure the schedule:
   - **Name:** A descriptive name (for example, "Payments Team: Weekly Rotation").
   - **Rotation pattern:** Set the rotation type (for example, weekly) with a customizable start time and day.
   - **Time zone:** Select the appropriate time zone for the team.
   - **Participants:** Add team members to the rotation.
4. Review the schedule preview to verify coverage.
5. Click **Save**.

### Schedule options

- **Weekly rotations** with customizable handoff times and days.
- **24/7 coverage** for always-on services.
- **Follow-the-sun** patterns for globally distributed teams.
- **Holiday calendars** to account for planned time off.
- **Edit YAML** for programmatic schedule setup and bulk configuration.

---

## Create schedule overrides

Overrides let you temporarily change who is on call: for example, when someone is out sick, on vacation, or swapping shifts.

<DocVideo src="https://app.tango.us/app/embed/2fe2c6c2-d4ed-40ce-80da-369a005c9259?skipCover=true&defaultListView=false&skipBranding=false&makeViewOnly=false&hideAuthorAndDetails=true" title="Create an Override Schedule" />

1. Go to the schedule you want to override.
2. Click **Add Override**.
3. Specify:
   - The **person** covering the shift.
   - The **start and end time** for the override.
4. Save the override. The schedule view reflects the temporary change.

---

## Import from external sources

If your organization is migrating from another on-call tool, you can import schedule configurations, escalation policies, and users. Syncers are available for **PagerDuty**, **OpsGenie**, and **xMatters**.

<DocVideo src="https://app.tango.us/app/embed/81ad2a7e-07f5-4a1a-813e-45f8fea4ab7c?skipCover=true&defaultListView=false&skipBranding=false&makeViewOnly=false&hideAuthorAndDetails=true" title="Setting On-Call from external source" />

When you sync with an external on-call tool, AI SRE imports users and their contact information, rotation schedules, escalation policies, and team structure. Go to the [on-call integrations](/docs/ai-sre/oncall/integrations/overview) to configure the connector, select entities, and monitor sync progress for each tool:

- Go to the [PagerDuty integration](/docs/ai-sre/oncall/integrations/pagerduty) to sync PagerDuty schedules and escalation policies.
- Go to the [OpsGenie integration](/docs/ai-sre/oncall/integrations/opsgenie) to sync OpsGenie schedules and escalation policies.
- Go to the [xMatters integration](/docs/ai-sre/oncall/integrations/xmatters) to sync xMatters schedules and on-call groups.

---

## Best practices

- **Ensure full coverage:** Review the schedule preview for gaps. Every hour should have a designated responder.
- **Set reasonable rotation lengths:** Weekly rotations are a common default. Shorter rotations reduce fatigue; longer ones reduce handoff overhead. Adjust based on team feedback.
- **Use overrides instead of editing the schedule:** Overrides preserve the base rotation and create a clear audit trail of coverage changes.
- **Leverage YAML for large teams:** The Edit YAML feature makes it easier to manage complex or multi-team schedules programmatically.
- **Account for time zones:** For distributed teams, verify that handoff times make sense in each participant's local time zone.

---

## Next steps

With schedules in place, connect them to escalation and alert routing.

- Go to [Configure Escalation Policies](/docs/ai-sre/oncall/define-escalation-policies) to attach schedules to multi-level escalation chains.
- Go to [Route Alerts](/docs/ai-sre/oncall/configure-alert-rules) to page the on-call responder when monitoring alerts fire.
