---
sidebar_position: 5
title: Variable Expressions
description: Create and manae variable expressions in Harness
---

<CTABanner
  buttonText="Learn More"
  title="Continue your learning journey."
  tagline="Take a Continuous Delivery & GitOps Certification today!"
  link="/certifications/continuous-delivery"
  closable={true}
  target="_self"
/>

This tutorial will walk you through creating and using variables in Harness CD.

:::info

This tutorial builds upon [Deploy using Kubernetes Manifest - CD Pipeline](https://developer.harness.io/tutorials/cd-pipelines/kubernetes/manifest?pipeline=cd-pipeline). Make sure you have successfully deployed the Guestbook app from that tutorial before proceeding further.

:::

## What are variable expressions?

Variable expressions help you paramaterize data and configuration settings in Harness. The types of variables and their scopes are summarized below.

| Variable Types   |     | Scopes                            |     | Supported Values |
| ---------------- | --- | --------------------------------- | --- | ---------------- |
| Harness built-in | ::  | Organization                      | ::  | Fixed value      |
| User-created     | ::  | Account                           | ::  | Runtime input    |
|                  | ::  | Project                           | ::  | Expression       |
|                  | ::  | Entities (e.g. pipeline, service) | ::  |                  |

Variables are renderd by Harness using an expression language called [JEXL](http://commons.apache.org/proper/commons-jexl/).

## Before you begin

Verify you have the following:

- A Harness CD account. You can [sign up for free](https://app.harness.io/auth/#/signup/?module=cd&utm_source=website&utm_medium=harness-developer-hub&utm_campaign=cd-plg&utm_content=tutorials-cd-variables) if you don't have one.
- A successfull [Guestbook app](https://github.com/harness-community/harnesscd-example-apps/tree/master/guestbook) deployment from the [Kubernetes Manifest - CD Pipeline tutorial](https://developer.harness.io/tutorials/cd-pipelines/kubernetes/manifest?pipeline=cd-pipeline).

## Reference built-in variables

1. Log into [app.harness.io](https://app.harness.io/) if you have not already done so.
2. Navigate to **Deployments > Pipelines**, and click into your **guestbook_canary_pipeline**.
3. Select **Edit Pipeline** from the top of the page to enter the Pipeline Studio.
4. Select the **deploy-guestbook** stage tile, then select **Execution**.
5. Select **Add Step > Add Step**.
6. Scroll to the **Utilities** section, then select **Shell Script**.
7. In the **Name** field, type `Successful Deployment Message`.
8. In the **Script** field, paste the following:

```
echo "<+pipeline.triggeredBy.name> successfully deployed <+service.name> to <+env.name>."
```

9. Select **Apply Changes**, then **Save**.
10. Select **Run** and then **Run Pipeline**
11. Wait for the pipeline to complete, then select the **Successful Deployment Message** step.
12. Expand **Step Details** if needed, and verify the step log shows the script message with the variable names appropriately rendered.

## Create an account-level variable

1. Navigate to **Account Settings > Account Resources**. Select **Variables**.
2. Select **New Variable**.
3. Name the variable **account_alias** and set its Fixed Value to your first name or nickname.
4. Click **Save**.

:::info

You'll notice that variables created at the account, org, or project level support fixed values only. Variables created at the entity level (such as pipelines, stages, and services), support dynamic runtime inputs and expressions.

:::

5. Navigate to **Deployments > Pipelines > guestbook_canary_pipeline**. Select **YAML > Edit YAML**.
6. In the **Successful Deployment Message** step, on the **script:** line, replace `<+pipeline.triggeredBy.name>` with `<+variable.account.account_alias>`.
7. Select **Save** and then **Run > Run Pipeline**.
8. After the pipeline completes, verify that the step log message references the value you set for your account level variable.

## Create a project entity-level variable as a runtime input

1. In **Deployments > Pipelines**, select your **guestbook_canary_pipeline**.
2. Select **Edit Pipeline**, then select **Variables** from the right sidebar.
3. Under **Pipeline > Custom Variables**, select **Add Variable**.
4. Name the variable **region**, leave the value blank, then select **Set variable as required during runtime**.
5. Select **Save**, then **Apply Changes**.
6. In the Pipeline Studio, select **YAML**.
7. At the bottom of the YAML, in the **variables** block, replace `value: ""` with `value: <+input>`.
8. In the **Successful Deployment Message** step, modify the **script** line to include the new variable:

```
echo "<+variable.account.account_alias> successfully deployed <+service.name> to <+env.name> in <+pipeline.variables.region>."
```

9. Select **Save**.
10. Select **Run**. Note the prompt for a value for the **region** variable. Enter a value of your choosing (e.g. eu, india, usa, etc.).
11. Select **Run Pipeline**.
12. After the pipeline completes, verify that the step log message references the value you set for your account level variable.

### Congratulations!🎉

You've just learned how to create and reference variables in a CD pipeline.

#### What's Next?

- Learn about [pipeline triggers](/tutorials/cd-pipelines/trigger).
- Visit the [Harness Developer Hub](https://developer.harness.io/) for more tutorials and resources.
