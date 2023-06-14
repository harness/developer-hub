---
title: What's supported?
description: Health and change sources supported by Harness SRM
sidebar_position: 10
---

A Health Source monitors changes in health trends of the service using metrics and logs collected from Application Performance Monitoring (APM) or log providers respectively.


### APM providers

Harness supports the following APM providers:


| Metrics provider          | Metric pack                  | Deployment verification      |
| :----------------------------- | :--------------------------- | :--------------------------- |
| AppDynamics                    |                              |                              |
| Business Transactions          | Yes                          |                              |
| AppDynamics                    |                              |                              |
| JVM and Infra Metrics          | Supported via Custom Metrics |                              |
| Datadog                        |                              |                              |
| Docker Infra Metrics           | Yes                          |                              |
| Dynatrace                      |                              |                              |
| Performance                    | Yes                          |                              |
| Google Cloud Operations (GCP)  |                              |                              |
| Infrastructure Metrics         | Yes                          |                              |
| Google Cloud Operations (GCP)  | Custom metrics from explorer | No                           |
| New Relic                      |                              |                              |
| Business Transactions          | Yes                          |                              |
| New Relic                      | Insights                     | Supported via custom metrics |
| Prometheus                     |                              |                              |
| Custom metrics from Prometheus | Yes                          |                              |


### Log providers

Harness supports the following log providers:

| Log provider | Deployment verification |
| ------------ | ----------------------- |
| Splunk       | Yes                     |
| Google Cloud Operations (GCP)             |            Yes             |


### Custom health sources

Harness offers support for all major APM vendors and log providers, but there are cases where a customized APM or log provider is needed. The Custom Health Source lets you customize APMs and log providers of your choice.

Harness also supports customized APMs. To know more about using customized APMs of your choice, go to [Custom health source](../verify/configure-cv/verify-deployments-with-custom-health-metrics.md).


For information about what's supported for other Harness modules and the Harness Platform overall, go to [Supported platforms and technologies](/docs/getting-started/supported-platforms-and-technologies.md).



