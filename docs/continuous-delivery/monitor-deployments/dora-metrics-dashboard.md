---
title: DORA metrics dashboard
description: Set baseline for team performance and measure improvements by tracking DORA metrics.
sidebar_position: 4
---

<CTABanner
  buttonText="Explore SEI DORA Dashboard"
  title="Get a more accurate picture of your entire SDLC with the SEI DORA Dashboard"
  link="/docs/software-engineering-insights/propelo-sei/analytics-and-reporting/efficiency/dora-metrics/"
  closable={true}
  target="_self"
/>



DevOps Research and Assessment (DORA) metrics is a standard measure of DevOps performance. By understanding these metrics, you can make informed decisions and implement improvements that can help your business grow.

## Create queries to pull data into your DORA dashboard

After you [create a DORA metrics dashboard](https://developer.harness.io/docs/platform/dashboards/create-dashboards/), you can [add tiles](https://developer.harness.io/docs/platform/dashboards/create-dashboards/#step-2-add-tiles-to-a-dashboard) to the dashboard. 

You can edit, delete, resize, move positions, or download data of the tiles. 

Using the DORA metrics dashboard, you can view the following metrics.

* **Deployments Frequency** tells you how many deployments happened in a particular duration. This metric helps measure the consistency of software delivery and delivery performance. 
* **Mean Time to Restore (MTTR)** tells you the time taken to restore an issue found in the production environment.  
* **Change Failure Rate** is the percentage of failure rate across all services in a given time period.
* **Lead Time to Production** shows the median duration of deployments.

![picture 1](static/2ab6c57ffae6974916e7d6c40878bf83bcbcd8734376c1a682bc79d6f18b0d60.png)  


To gain deeper insights, you can create queries in the dashboard to capture data. Harness captures metrics for each service-environment combination within a pipeline. If you have a multi-service pipeline, metrics for each service-environment combination will be captured and reported separately.

## Deployment frequency

1. Enter a name your query. For example, Deployment Frequency. 
2. Select the following filters.
    * In **Deployments**, select **Custom Aggregation Period**, then select the time period.
    * In **Deployments**, select **Total Deployments**.
3. Configure your visualization options. For more information, go to [create visualization and graphs](/docs/platform/dashboards/create-visualizations-and-graphs).
4. Select **Run**.
5. Select **Save** to save the query as a tile on your dashboard.

![](../cd-dashboards/static/deployment-frequency.png)

## Mean time to restore

1. Enter a name your query. For example, Mean Time to Restore. 
2. Select the following filters.
    * In **Deployments**, select **Custom Aggregation Period**, then select the time period.
    * In **Reverted Deployments**, select **Mean Time to Restore**.
3. Configure your visualization options. For more information, go to [create visualization and graphs](/docs/platform/dashboards/create-visualizations-and-graphs).
4. Select **Run**.
5. Select **Save** to save the query as a tile on your dashboard.

![](../cd-dashboards/static/mean-time-to-restore.png)

### Use reverted executions to capture mean time to restore

:::note

1. This only works for executions reverted using post production rollback feature.

:::

Currently, Harness does not measure regressions or failures that occur after a production deployment is complete. 
 
During the pipeline deployment, if there is an issue that causes downtime, a reverted pipeline execution can restore the service.

You can mark a pipeline execution as a restored/reverted pipeline and link it to the pipeline execution that introduced the issue.

You can then use the difference between the end time of the parent execution and the end time of the reverted execution to capture mean time to restore.

In the pipeline YAML, you can add the following sample expression as a tag:  

```
  tags:
    reverted_execution_id: <+pipeline.originalExecution.executionId>
```

Below is an example of a pipeline execution. The `reverted_execution_id` tag represents the execution Id of the pipeline that was reverted.

```
pipeline:
  identifier: "DOra_pipeline"
  tags:
    reverted_execution_id: "Q0bizp0QTM6xtB1FZsR0zQ"
  stages:
  - stage:
      identifier: "stage1"
      type: "Deployment"
      spec:
        service:
          serviceRef: "Ser2"
        environment:
          environmentRef: "Env2"
          infrastructureDefinitions:
          - identifier: "Infra_2"
```

## Change failure rate

1. Enter a name your query. For example, Change Failure Rate. 
2. In **Deployments**, select **Custom Aggregation Period**, then select the time period.
    * In **Deployments**, select **Change Failure Rate**.
3. Configure your visualization options. For more information, go to [create visualization and graphs](/docs/platform/dashboards/create-visualizations-and-graphs).
4. Select **Run**.
5. Select **Save** to save the query as a tile on your dashboard.

![](../cd-dashboards/static/change-failure-rate.png)

## Lead time to production

Lead Time to Production shows the median duration of deployments.

1. Enter a name for your query. For example, Lead Time to Production. 
2. In **Deployments**, select **Custom Aggregation Period**, then select the time period.
3. In **Deployments**, select **Median Duration**.
4. Configure your visualization options. For more information, go to [create visualization and graphs](/docs/platform/dashboards/create-visualizations-and-graphs).
5. Select **Run**.
6. Select **Save** to save the query as a tile on your dashboard.

![picture 0](static/0d658c5d680e7d165ec15ece8f89d73bb206e23d5c7a70304456b09abcfacdd0.png)  


## Improve DORA reporting with Harness Software Engineering Insights

While the DORA metrics dashboard in Harness CD provides visibility into deployment frequency, lead time, failure rates, and recovery times, it focuses primarily on deployment activity within Harness pipelines.

This view may not fully capture bottlenecks or inefficiencies in upstream stages of the software delivery lifecycle (SDLC), such as hygiene in the issue management systems, code review delays, testing gaps, or build tool inefficiencies.

For a holistic view of software delivery performance across your entire toolchain (e.g., Jira, Jenkins, GitHub, Harness CD), use the DORA dashboard in [Harness Software Engineering Insights (SEI)](/docs/software-engineering-insights/propelo-sei/get-started/overview).

![](./static/sei-dora-dashboard-gif.gif)

This dashboard is powered by:

* **[DORA profile](/docs/software-engineering-insights/propelo-sei/setup-sei/sei-profiles/workflow-profiles/dora-profile)**: Allows you to define the software delivery lifecycle with customizable thresholds and higher granularity for measuring DORA metrics.
* **[Correlation engine](/docs/software-engineering-insights/propelo-sei/analytics-and-reporting/efficiency/dora-metrics/)**: Analyzes data from all integrated tools (Issue management system, CI, CD, SCM, incident management, etc.) to identify root causes of bottlenecks. For example:
  * Long lead times caused by code review delays in GitHub
  * High failure rates linked to flaky tests in Jenkins pipelines
  * Recovery time outliers correlated with specific service architectures

Use the CD DORA dashboard for pipeline-level metrics, and Software Engineering Insights for organization-wide optimization.

### Related resources

* [Harness Software Engineering Insights Overview](/docs/software-engineering-insights/propelo-sei/get-started/overview)
* [Set up the DORA profile](/docs/software-engineering-insights/propelo-sei/setup-sei/sei-profiles/workflow-profiles/dora-profile)
* [Set up the DORA dashboard](/docs/software-engineering-insights/propelo-sei/setup-sei/create-and-manage-dashboards/insight-tutorials/dora-insight)














