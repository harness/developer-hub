---
title: What's supported in Harness CV
description: Health and change sources supported by Harness CV.
sidebar_label: What's supported
sidebar_position: 10
---

Harness Continuous Verification (CV) supports the following health and change monitoring tools:


## Health sources

A health source monitors health trends in a service by analyzing metrics from APM tools and logs from log management tools.

### APM

Harness CV supports the following APM tools:

- AppDynamics
- Amazon CloudWatch
- Custom health source
- Datadog
- Dynatrace
- Google Cloud Operations (formerly Stackdriver)
- New Relic
- Prometheus (includes support for AWS Prometheus)
- SignalFx
- Splunk Observability
- Sumologic

Harness supports most of the popular APM tools, but there may be an instance where Harness does not have a native connector. Using the **Harness Custom Health Source** feature, you can integrate such APM tools with Harness.


### Log management

Harness CV supports the following log management tools:

- Datadog
- Elasticsearch
- Google Cloud Operations (formerly Stackdriver)
- Grafana Loki
- Splunk Observability
- Sumologic

Harness supports most of the popular log management tools, but there may be an instance where Harness does not have a native connector. Using the **Harness Custom Health Source** feature, you can integrate such log management tools with Harness.


### Queries

Consider the following when configuring a health source and constructing a query in Harness CV:

- The query result should be below 100 logs per minute. If the logs exceed this limit, Harness performs random sampling for processing.

- The query response should be a single time-series.


To learn how to add a health source, go to [Configure CV](/docs/category/configure-cv).

For information about what's supported for other Harness modules and the Harness Platform overall, go to [Supported platforms and technologies](/docs/getting-started/supported-platforms-and-technologies.md).



