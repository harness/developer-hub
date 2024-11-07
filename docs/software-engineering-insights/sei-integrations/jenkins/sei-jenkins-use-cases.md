---
title: Jenkins Use Cases
description: Recommended widgets and metrics for the Jenkins integration
sidebar_position: 15
sidebar_label: Jenkins Use Cases
---

This topic provides use cases for some of the most popular widgets available with the Jenkins integration, which help teams measure metrics such as job frequency, success rate, duration, and lead time, supporting continuous improvement in delivery workflows.

## Key widgets

### Measure deployment frequency and change failure rate

For teams working on DevOps, DORA metrics like Deployment Frequency and Change Failure Rate are important. If your team uses Jenkins as the CI and CD tool, the following widgets can help you identify delays in delivery and monitor the effectiveness of your recovery from issues.

* [Create a DORA profile](/docs/software-engineering-insights/sei-profiles/workflow-profile#dora-profile)
* [Deployment Frequency](/docs/software-engineering-insights/sei-metrics-and-reports/dora-metrics/dora-metrics#deployment-frequency)
* [Change Failure Rate](/docs/software-engineering-insights/sei-metrics-and-reports/dora-metrics/dora-metrics#change-failure-rate)

### Measure lead time

The Jenkins integration can be used to configure the Workflow profile for measuring the lead time metric. Tracking lead time for changes is essential to understanding how quickly new code reaches production. The CI/CD stages in Lead Time can highlights areas in the CI/CD pipeline that may require optimization to improve the build time or delivery speed.

* [Lead Time for Changes (DORA widget)](/docs/software-engineering-insights/sei-metrics-and-reports/dora-metrics/dora-metrics#lead-time-for-changes)
* [Lead Time reports (Velocity Lead Time widgets)](/docs/software-engineering-insights/sei-metrics-and-reports/velocity-metrics-reports/lead-time-reports)

### Job and pipeline run frequency

Use these widgets to track the frequency of job and pipeline executions and observe success or failure trends over time. Tracking CI/CD job counts can help identify periods of high activity, recurring failures, and any anomalies in job runs.

* [CICD Job Count widget](/docs/software-engineering-insights/sei-metrics-and-reports/velocity-metrics-reports/ci-cd-reports#cicd-job-count-report)
* [CICD Job Count Trend widget](/docs/software-engineering-insights/sei-metrics-and-reports/velocity-metrics-reports/ci-cd-reports#cicd-job-count-trend-report)
* [CICD Jobs Count Single Stat](/docs/software-engineering-insights/sei-metrics-and-reports/velocity-metrics-reports/ci-cd-reports#cicd-jobs-count-single-stat)

### Job/pipeline duration

Analyzing job duration can help to optimize build times and streamline CI/CD workflows. Duration widgets provide insights into the time taken for jobs to run, allowing teams to pinpoint jobs that could benefit from optimization.

* [CI/CD Job Duration Report](/docs/software-engineering-insights/sei-metrics-and-reports/velocity-metrics-reports/ci-cd-reports#cicd-job-duration-report)
* [CI/CD Job Duration Single Stat](/docs/software-engineering-insights/sei-metrics-and-reports/velocity-metrics-reports/ci-cd-reports#cicd-job-duration-single-stat)
* [CI/CD Job Duration Trend Report](/docs/software-engineering-insights/sei-metrics-and-reports/velocity-metrics-reports/ci-cd-reports#cicd-job-duration-trend-report)

:::info

The Jenkins integration in SEI supports numerous other widgets. For more recommendations or to explore additional widgets, contact [Harness Support](/docs/software-engineering-insights/sei-support) for guidance.

:::