---
title: Schedule Pipelines using Triggers
description: Schedule Pipeline executions using Cron-based Triggers.
# sidebar_position: 2
helpdocs_topic_id: 4z9mf24m1b
helpdocs_category_id: oya6qhmmaw
helpdocs_is_private: false
helpdocs_is_published: true
---

You can schedule Pipeline executions using Cron-based Triggers.

For example, you can have a Pipeline run every Monday at 1AM. Harness will generate the Cron expression (`0 1 * * MON`).

For general Triggers reference, see [Triggers Reference](https://ngdocs.harness.io/article/rset0jry8q-triggers-reference).### ​Before You Begin

* [Learn Harness' Key Concepts](/article/hv2758ro4e-learn-harness-key-concepts)
* [Kubernetes CD Quickstart](/article/knunou9j30-kubernetes-cd-quickstart)
* [CI Pipeline Quickstart](/article/x0d77ktjw8-ci-pipeline-quickstart)

### ​Step 1: Add a Trigger to a Pipeline​

Open your Harness Pipeline in Pipeline Studio.

Click **Triggers**.

Click **New Trigger**.

Click **Cron**.

For Git-based Trigger types or CodeCommit, see [Trigger Pipelines using Git Events](/article/hndnde8usz-triggering-pipelines).

In **Trigger Overview**, enter a name, description, and Tags for the Trigger.

### ​Step 2: Schedule the Trigger​

In **Schedule**, use the settings to schedule the Trigger.

When you edit a Cron Trigger later, you can type or paste in a Cron expression.

The Cron expression will be evaluated against UTC time.

Here's a reminder of Cron expression formatting:


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
### ​Step 3: Set Pipeline Input

Pipelines often have [Runtime Inputs](/article/f6yobn7iq0-runtime-inputs) like codebase branch names or artifact versions and tags.

Provide values for the inputs. You can also use [Input Sets](/article/3fqwa8et3d-input-sets).

Click **Create Trigger**.

The Trigger is now added to the Triggers page.

### Step 4: Enable or Disable Trigger

Use the Enable setting to turn the Trigger on and off.

![](https://files.helpdocs.io/i5nl071jo5/articles/4z9mf24m1b/1620080269663/image.png)That's it. Your Pipeline will run when the Cron expression equals the current time.

### Option: Run Once

To specify a run-once schedule, specify a fully qualified date and time.

Simply enter the time, day of month, month, and then allow for any day of the week.

The below example runs on **At 1:45 PM, on day 13 of the month, and on Tuesday, only in September**

`45 13 13 09 Tue`

![](https://files.helpdocs.io/kw8ldg1itf/articles/4z9mf24m1b/1663109151847/clean-shot-2022-09-13-at-15-45-35-2-x.png)### See Also

* [Triggers Reference](/article/rset0jry8q-triggers-reference)

