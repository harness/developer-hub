---
title: Schedule pipelines using triggers
description: Schedule Pipeline executions using Cron-based Triggers.
sidebar_position: 1
helpdocs_topic_id: 4z9mf24m1b
helpdocs_category_id: oya6qhmmaw
helpdocs_is_private: false
helpdocs_is_published: true
---

You can schedule Pipeline executions using Cron-based Triggers.

For example, you can have a Pipeline run every Monday at 1AM. Harness will generate the Cron expression (`0 1 * * MON`).

For general triggers reference, go to [Triggers reference](../8_Pipelines/w_pipeline-steps-reference/triggers-reference.md).

import Variables from '/docs/platform/11_Triggers/shared/variables-not-supported.md'

<Variables />

### Before you begin

* [Learn Harness' Key Concepts](../../getting-started/learn-harness-key-concepts.md)
* [Kubernetes CD Quickstart](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-cd-quickstart)
* [CI pipeline tutorials](../../continuous-integration/ci-quickstarts/ci-pipeline-quickstart.md)

### Add a trigger to a pipeline

Open your Harness pipeline in Pipeline Studio.

1. Select **Triggers**.
2. Select **New Trigger**.
3. Select **Cron**.
   
   For Git-based trigger types or CodeCommit, go to [Trigger Pipelines using Git Events](triggering-pipelines.md).
4. In **Trigger Overview**, enter a name, description, and tags for the trigger.

### Schedule the trigger

In **Schedule**, use the settings to schedule the trigger.

When you edit a Cron trigger later, you can type or paste in a Cron expression.

The Cron expression will be evaluated against UTC time.

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

Pipelines often have [Runtime inputs](../20_References/runtime-inputs.md) like codebase branch names or artifact versions and tags.

Provide values for the inputs. You can also use [Input sets](../8_Pipelines/input-sets.md).

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

### See also

* [Triggers reference](../8_Pipelines/w_pipeline-steps-reference/triggers-reference.md)

