---
title: Schedule pipelines using triggers
description: Use cron triggers to schedule pipeline executions.
sidebar_position: 2
keywords:
  - cron trigger
  - scheduled trigger
  - cron expression
  - pipeline schedule
  - QUARTZ
  - UNIX
  - timezone
  - AND semantics
  - run once
helpdocs_topic_id: 4z9mf24m1b
helpdocs_category_id: oya6qhmmaw
helpdocs_is_private: false
helpdocs_is_published: true
canonical_url: https://www.harness.io/blog/automate-your-ci-cd-pipeline-using-triggers
tags:
  - triggers
  - pipelines
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Variables from '/docs/platform/shared/variables-not-supported.md'

Use cron triggers to run pipelines on a schedule instead of in response to an event. For example, to run a pipeline every Monday at 1:00 AM, Harness uses the cron expression `0 1 * * MON`. Go to the [Triggers overview](/docs/platform/triggers/triggers-overview) to review other trigger types.

:::note
The cron expression is evaluated in UTC time. Only the UTC timezone is supported. It does not automatically adjust for daylight saving time (DST) and must be configured explicitly with the correct date and time in UTC.
:::

<Variables />

---

## What will you learn in this topic?

By the end of this topic, you will be able to:

- <a href="#step-1-add-a-cron-trigger">Add a cron trigger</a> to a pipeline.
- <a href="#step-2-schedule-the-trigger">Schedule the trigger</a> with a cron expression and timezone.
- <a href="#step-3-set-the-pipeline-input">Set pipeline inputs</a> for the trigger.
- Use <a href="#complex-cron-expressions-with-date-and-day-constraints">complex cron expressions</a> with AND semantics.
- <a href="#edit-a-scheduled-trigger">Edit a scheduled trigger</a>.
- <a href="#enable-or-disable-a-trigger">Enable, disable</a>, or <a href="#run-once">run</a> the trigger once.

---

## Before you begin

Before you schedule a pipeline with a cron trigger, ensure you have the following:

- **A Harness pipeline**: An existing Harness CI or CD pipeline.
- **Key concepts familiarity**: Familiarity with Harness key concepts. Go to [Harness key concepts](/docs/platform/get-started/key-concepts) to review core platform concepts.

---

## Schedule a pipeline using a cron trigger

Complete these three steps to add a cron trigger, define its schedule, and provide any pipeline inputs.

### Step 1: Add a cron trigger

Add a cron trigger to the pipeline you want to run on a schedule.

1. Open your Harness pipeline in Pipeline Studio.
2. Select **Triggers**.
3. Click **New Trigger**.
4. Select **Cron**.\
For Git-based trigger types or CodeCommit, go to [Trigger pipelines using Git events](/docs/platform/triggers/triggering-pipelines) to configure Git-based triggers.
5. In **Trigger Overview**, configure the trigger:
   1. In **Name**, enter a name for the trigger. Harness generates the **Id** from the name.
   2. (Optional) In **Description**, add a description for the trigger.
   3. (Optional) In **Tags**, add tags for the trigger.
6. Click **Continue**.

### Step 2: Schedule the trigger

Configure when the trigger fires by setting a timezone and a cron expression. The **Schedule** page shows the current time in the selected timezone and your local time for reference.

In **Schedule**, configure when the trigger fires:

1. In **Timezone**, select the timezone in which the cron expression is evaluated. The default timezone is `UTC`.
2. Select how to define the schedule:
   - Use the **Minutes**, **Hourly**, **Daily**, **Weekly**, **Monthly**, or **Yearly** tabs to build a schedule from presets.
   - Use the **Custom** tab to enter a cron expression directly.
3. In the **Custom** tab, select the expression type and enter your cron expression. The fields shown depend on the expression type you select.

<Tabs>
<TabItem value="unix" label="UNIX Expression" default>

1. Select **UNIX Expression**.
2. In **Enter a custom cron expression**, type or paste a UNIX cron expression, for example `0/5 * * * *`.
3. Review the parsed values:
   - **Expression Breakdown**: A table that shows the parsed **Minutes**, **Hours**, **Day of month**, **Month**, and **Day of week** values.
   - **Cron Expression**: The final expression Harness evaluates.
4. Click **Continue**.

</TabItem>
<TabItem value="quartz" label="Quartz Expression">

1. Select **Quartz Expression**.
2. In **Enter a custom cron expression**, type or paste a Quartz cron expression, for example `0 0 4 7 ? 2026`.
3. Click **Continue**.

</TabItem>
</Tabs>

**Timezone**: Harness supports the [IANA Time Zone convention](https://timeapi.io/documentation/iana-timezones), such as `America/New_York`, `Asia/Kolkata`, or `Europe/London`. The default timezone is `UTC`.

<details>
<summary>Sample YAML with timezone</summary>

The following is a sample YAML for a cron trigger with the timezone set to `America/New_York`:

```yaml
  source:
    type: Scheduled
    spec:
      type: Cron
      spec:
        expression: 0/5 * * * *
        type: UNIX
        timezone: America/New_York
```

</details>

:::note
Currently, the timezone setting is behind the feature flag `PIPE_SUPPORT_MULTIPLE_TIMEZONES_IN_CRON_TRIGGERS`. Contact [Harness Support](mailto:support@harness.io) to enable it.
:::

If the feature flag is not enabled, the cron expression is always evaluated against `UTC` time.

<details>
<summary>Quartz and UNIX field reference</summary>

QUARTZ expression:

```
0 0 4 7 ? 2014
| | | |   | |
| | | |   | \------- YEAR (2014)
| | | |   \--------- DAY_OF_WEEK (NOT_SPECIFIED)
| | | \------------- MONTH (JULY)
| | \--------------- DAY_OF_MONTH (4th)
| \----------------- HOUR (0- MIDNIGHT LOCAL TIME)
\------------------- MINUTE (0)
```

UNIX expression:

```
5 0 * * 5
| | | | |
| | | | \-------DAY_OF_WEEK (Friday)
| | | \---------MONTH (Any month)
| | \-----------DAY_OF_MONTH (Any day of the month)
| \-------------HOUR(0- MIDNIGHT LOCAL TIME)
\---------------MINUTE(5)
```

</details>

### Step 3: Set the pipeline input

Provide values for any runtime inputs the pipeline requires, so the scheduled execution has everything it needs to run.

Pipelines often have [runtime inputs](/docs/platform/variables-and-expressions/runtime-inputs), such as codebase branch names or artifact versions and tags. You can also use [input sets](/docs/platform/pipelines/input-sets).

In **Pipeline Input**, provide the values the trigger uses when it runs the pipeline:

1. In **Pipeline Stages**, select the stages to run. The default is **All Stages**.
2. Under **Pipeline Input**, provide values for the runtime inputs. If the pipeline has no runtime inputs, this section shows **No Runtime Inputs**.
3. Click **Create Trigger**. The trigger is now added to the **Triggers** page.

:::tip
You can reference trigger event payload values in the pipeline input section with the expression `<+eventPayload.[path-to-key-name]>`. For trigger header values, use `<+trigger.header[key name]>`.
:::

---

## Complex cron expressions with date and day constraints

Use complex cron expressions when you need executions on specific days within specific date ranges.

:::note
Currently, this feature is behind the feature flag `PIPE_CRON_TRIGGER_AND_SEMANTICS`. Contact [Harness Support](mailto:support@harness.io) to enable it.
:::

Harness supports complex cron trigger expressions that execute pipelines only when both the date range and the day-of-week conditions are satisfied simultaneously. This enables more precise scheduling for scenarios where you need executions on specific days within specific date ranges.

Standard cron behavior uses OR semantics when both day-of-month and day-of-week are specified. For example, a cron expression like `0 3 16-22 * 1` triggers at 3:00 AM UTC on **every Monday** OR **any day between the 16th and 22nd**. With AND semantics enabled, the pipeline executes only when it is a Monday **and** the date falls between the 16th and 22nd of the month.

### Use cases

Complex cron expressions with AND semantics are useful for:

- Running monthly maintenance tasks on specific weekdays within a date window (for example, the third Monday of each month).
- Scheduling deployments during defined change windows that must occur on particular days.
- Executing compliance or reporting pipelines that must run on business days within a specific week of the month.
- Coordinating batch jobs that need to align with both calendar dates and weekly schedules.

<details>
<summary>Example: Monthly maintenance on the third Monday</summary>

To schedule a pipeline at 3:00 AM UTC only on Mondays that fall between the 16th and 22nd of any month:

**UNIX cron expression:**

```
0 3 16-22 * 1
```

**Field breakdown:**

- `0` - Minute (0)
- `3` - Hour (3 AM UTC)
- `16-22` - Day of month (16th through 22nd)
- `*` - Month (any month)
- `1` - Day of week (Monday, where 0=Sunday, 1=Monday, and so on)

**How it works:**

- **Without AND semantics** (standard behavior): The trigger fires at 3:00 AM UTC on **every Monday** OR **any day from the 16th to 22nd**, which causes multiple unwanted executions.
- **With AND semantics** (feature flag enabled): The trigger fires at 3:00 AM UTC only on Mondays that fall between the 16th and 22nd. This targets the third Monday in most months, though the result varies when the month starts on a Monday.

This ensures your pipeline runs precisely once per month during the intended maintenance window, and eliminates unnecessary executions on other Mondays or non-Monday dates within the range.

</details>

<details>
<summary>Additional examples</summary>

**Quarterly reviews on the second Tuesday:**

```
0 9 8-14 1,4,7,10 2
```

Executes at 9:00 AM UTC on Tuesdays (day 2) between the 8th and 14th of January, April, July, and October. This targets the second Tuesday of those months.

**End-of-month Friday deployments:**

```
0 18 25-31 * 5
```

Executes at 6:00 PM UTC on Fridays (day 5) between the 25th and 31st of every month. This targets the last Friday of each month.

**Mid-week maintenance in the first week:**

```
0 2 1-7 * 3
```

Executes at 2:00 AM UTC on Wednesdays (day 3) between the 1st and 7th of every month. This targets the first Wednesday of the month for maintenance.

</details>

### Expression evaluation behavior

When both day-of-month and day-of-week are specified (neither is `*` or `?`):

- **Standard cron semantics** (feature flag disabled): The expression matches if **either** condition is true (OR logic).
- **AND semantics** (feature flag enabled): The expression matches only when **both** conditions are true (AND logic).

This feature provides more precise control over pipeline schedules, which reduces unnecessary executions and improves resource utilization for scenarios that require specific date and day combinations.

---

## Edit a scheduled trigger

Edit an existing cron trigger to change its schedule, timezone, or pipeline inputs.

1. Open your Harness pipeline in Pipeline Studio.
2. Select **Triggers**.
3. In the list of triggers, select the cron trigger you want to edit.
4. Update the trigger:
   1. In **Overview**, update the name, description, or tags.
   2. In **Schedule**, update the timezone or cron expression.
   3. In **Pipeline Input**, update the pipeline stages or runtime inputs.
5. Click **Update Trigger** to save your changes.

---

## Enable or disable a trigger

Use the enable setting to turn the trigger on and off.

Your pipeline runs when the cron expression equals the current time.

<div style={{textAlign: 'center'}}>
   <DocImage path={require('./static/schedule-pipelines-using-cron-triggers-20.png')} width="80%" height="40%" title="Click to view full size image" />
</div>

---

## Run once

Configure a run-once schedule when you need the pipeline to run at a single, fully qualified date and time.

Enter the time, day of month, and month, and then allow for any day of the week.

The following example runs at 1:45 PM, on day 13 of the month, and on Tuesday, only in September:

`45 13 13 09 Tue`

<div style={{textAlign: 'center'}}>
   <DocImage path={require('./static/schedule-pipelines-using-cron-triggers-21.png')} width="80%" height="40%" title="Click to view full size image" />
</div>
