---
title: Schedule pipelines using triggers
description: Use cron triggers to schedule pipeline executions.
sidebar_position: 2
helpdocs_topic_id: 4z9mf24m1b
helpdocs_category_id: oya6qhmmaw
helpdocs_is_private: false
helpdocs_is_published: true
canonical_url: https://www.harness.io/blog/automate-your-ci-cd-pipeline-using-triggers
---

You can use cron triggers to schedule pipeline executions. For example, to schedule a pipeline run every Monday at 1AM, Harness uses the cron expression `0 1 * * MON`. For information about other trigger types and triggers in general, go to the [Triggers overview](./triggers-overview).

:::note
The cron expression will be evaluated in UTC time. Only UTC timezone is supported. It does not automatically adjust for daylight saving time (DST) and must be explicitly configured with the correct date and time in UTC.
:::

This topic assumes you're familiar with [Harness' key concepts](/docs/platform/get-started/key-concepts.md) and that you have created a Harness CI or CD pipeline.

import Variables from '/docs/platform/shared/variables-not-supported.md'

<Variables />

### Add a trigger to a pipeline

Open your Harness pipeline in Pipeline Studio.

1. Select **Triggers**.
2. Select **New Trigger**.
3. Select **Cron**.
   For Git-based trigger types or CodeCommit, go to [Trigger Pipelines using Git Events](triggering-pipelines.md).
4. In **Trigger Overview**, enter a name, description, and tags for the trigger.

### Schedule the trigger

In **Schedule**, use the settings to schedule the trigger.

**Timezone**: Select the timezone in which the cron expression should be evaluated. Harness supports the [IANA Time Zone convention](https://timeapi.io/documentation/iana-timezones#), such as `America/New_York`, `Asia/Kolkata`, or `Europe/London`. The default timezone is `UTC`.


<details>
<summary>Sample YAML with timezone</summary>

Here is a sample YAML for a cron trigger with a timezone setting, with timezone set to `America/New_York`:

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
Currently, the timezone setting is behind the feature flag `PIPE_SUPPORT_MULTIPLE_TIMEZONES_IN_CRON_TRIGGERS`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.
:::

If the feature flag is not enabled, the cron expression will always be evaluated against `UTC` time.

When you edit a Cron trigger later, you can type or paste in a Cron expression.

There are two types of supported cron expressions, QUARTZ and UNIX.

Following are the QUARTZ and UNIX expression formatting samples:

QUARTZ Expression
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

UNIX Expression

```
5 0 * * 5
| | | | |
| | | | \-------DAY_OF_WEEK (Friday)
| | | \---------MONTH (Any month)
| | \-----------DAY_OF_MONTH (Any day of the month)
| \-------------HOUR(0- MIDNIGHT LOCAL TIME)
\---------------MINUTE(5)
```

### Set pipeline input

Pipelines often have [Runtime inputs](../variables-and-expressions/runtime-inputs.md) like codebase branch names or artifact versions and tags.

Provide values for the inputs. You can also use [Input sets](../pipelines/input-sets.md).

Select **Create Trigger**.

The Trigger is now added to the **Triggers** page.

### Enable or disable trigger

Use the enable setting to turn the trigger on and off.

![](./static/schedule-pipelines-using-cron-triggers-20.png)

Your pipeline will run when the Cron expression equals the current time.

### Run once

To specify a run-once schedule, specify a fully qualified date and time.

Enter the time, day of month, month, and then allow for any day of the week.

The below example runs on **At 1:45 PM, on day 13 of the month, and on Tuesday, only in September**

`45 13 13 09 Tue`

![](./static/schedule-pipelines-using-cron-triggers-21.png)
