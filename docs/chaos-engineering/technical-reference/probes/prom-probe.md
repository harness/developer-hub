---
title: Prometheus Probe
sidebar_position: 6
---

The Prometheus Probe allows users to run Prometheus queries and match the resulting output against specific conditions. The intent behind this probe is to allow users to define metrics-based SLOs in a declarative way and determine the experiment verdict based on its success. The probe runs the query on a Prometheus server defined by the endpoint, and checks whether the output satisfies the specified criteria. A PromQL query needs to be provided, whose outcome is then used for the probe validation.

:::info YAML Only Feature
In case of complex queries that span multiple lines, the `queryPath` attribute can be used to provide the link to a file consisting of the query. This file can be made available in the experiment pod via a ConfigMap resource, with the ConfigMap being passed in the [ChaosEngine](https://docs.litmuschaos.io/docs/concepts/chaos-engine) or the [ChaosExperiment](https://docs.litmuschaos.io/docs/concepts/chaos-experiment) CR. Also, `query` and `queryPath` attributes are mutually exclusive. Refer to the probe schema [here](https://docs.litmuschaos.io/docs/concepts/probes#promprobe).
:::
