### APM tools

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
- Sumo Logic

Harness supports most of the popular APM tools, but there may be instances where Harness don't have a native connector. Using the **Harness Custom Health Source** feature, you can integrate such APM tools with Harness.


### Log management tools

Harness CV supports the following log management tools:

- Datadog
- Elasticsearch
- Google Cloud Operations (formerly Stackdriver)
- Grafana Loki
- Splunk Observability
- Sumo Logic

Harness supports most of the popular log management tools, but there may be instances where Harness don't have a native connector. Using the **Harness Custom Health Source** feature, you can integrate such log management tools with Harness.

:::info note
When configuring an APM tool or a log management tool in Harness CV and constructing a query, consider the following:

- The query result should be below 100 logs per minute. If the logs exceed this limit, Harness performs random sampling for processing.

- The query response should be a single time series.
:::



