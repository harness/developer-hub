---
title: Enable Redis Stream Monitors
description: Deploy and configure Redis stream monitors to track event framework metrics in Harness Self-Managed Enterprise Edition.
sidebar_position: 6
---

## Overview

To set up end-to-end monitoring for Redis, you need to gather metrics from two sources: the **redis-exporter** and **redis-stream-monitor**. The redis-exporter provides basic functional metrics, while the stream-monitor publishes more descriptive metrics as a separate service.

This guide focuses on deploying the redis-stream-monitor to capture detailed event framework metrics that are useful for monitoring entire events activity under Harness.

---

## Part 1: Deploy Redis Stream Monitor Chart

The redis stream monitor chart provides descriptive and meaningful metrics about Redis streams used by the Harness event framework.

### Pull the Chart

```bash
helm pull oci://us-west1-docker.pkg.dev/gcr-prod/harness-helm-artifacts/redis-stream-monitor --version 1.6.0 --untar
```

### Configure Override Values

Create a file named `override.yaml` with the following content:

```yaml
global:
  monitoring:
    enabled: true
    port: 8889
    path: /metrics
    managedPlatform: "oss"
resources:
  limits:
    memory: 4096Mi
  requests:
    cpu: 1
    memory: 4096Mi
config:
  EVENTS_FRAMEWORK_ENV_NAMESPACE: ""
  STACK_DRIVER_METRICS_PUSH_ENABLED: "true"
  ENV: "SMP"
```

### Install the Chart

```bash
helm install redis-stream-monitor redis-stream-monitor -n <namespace> -f override.yaml
```

---

## Available Metrics

The following metrics are captured and made available through this service:

- `redis_streams_length` - Number of messages in the stream
- `redis_streams_memory_usage` - Memory used by the stream
- `redis_streams_average_message_size` - Average size of messages in the stream
- `redis_streams_events_framework_deadletter_queue_size` - Size of the dead letter queue
- `redis_streams_consumer_group_pending_count` - Number of pending messages in consumer group
- `redis_streams_consumer_group_behind_by_count` - How far behind the consumer group is

---

## PromQL Dashboard Queries

### Single Stream Dashboards

Use these queries to monitor a specific use case by setting the `$usecase` variable:

```promql
avg by(usecaseName) (redis_streams_memory_usage{usecaseName="$usecase"})
avg by(usecaseName) (redis_streams_length{usecaseName="$usecase"})
avg by(usecaseName) (redis_streams_average_message_size{usecaseName="$usecase"})
avg by(usecaseName, consumergroupName) (redis_streams_consumer_group_behind_by_count{usecaseName="$usecase"})
avg by(usecaseName, consumergroupName) (redis_streams_consumer_group_pending_count{usecaseName="$usecase"})
avg by(exported_namespace, usecaseName) (redis_streams_events_framework_deadletter_queue_size{usecaseName="$usecase"})
```

### Multiple Stream Dashboards

Use these queries to monitor all streams across all use cases:

```promql
avg by(usecaseName) (redis_streams_memory_usage{})
avg by(usecaseName) (redis_streams_length{})
avg by(usecaseName) (redis_streams_average_message_size{})
avg by(usecaseName, consumergroupName) (redis_streams_consumer_group_behind_by_count{})
avg by(usecaseName, consumergroupName) (redis_streams_consumer_group_pending_count{})
avg by(exported_namespace, usecaseName) (redis_streams_events_framework_deadletter_queue_size{})
```

### Available Use Cases

The `usecaseName` label can be one of the following values:

<details>
<summary>Expand to view all use cases</summary>

- `DEBEZIUM_gitOpsMongo.harness-gitops.applications`
- `DEBEZIUM_gitOpsMongo.harness-gitops.utilization_snapshot`
- `DEBEZIUM_harnessMongo.harness.applications`
- `DEBEZIUM_ng-harness.ng-harness.moduleLicenses`
- `DEBEZIUM_ngMongo.ng-harness.moduleLicenses`
- `DEBEZIUM_pms-harness.pms-harness.planExecutionsSummary`
- `DEBEZIUM_pmsMongo.pms-harness.planExecutionsSummary`
- `DEBEZIUM_sscaMongo.ng-harness.instanceNG`
- `LICENSES_USAGE_REDIS_EVENT_CONSUMER`
- `async_filter_creation`
- `cache_refresh`
- `cd_deployment_event`
- `cf_archive_ff_activation_audit`
- `cf_archive_ff_audit`
- `cf_create_env`
- `cf_create_ff_activation_audit`
- `cf_create_ff_audit`
- `cf_create_seg_audit`
- `cf_delete_env`
- `cf_delete_ff_activation_audit`
- `cf_delete_ff_audit`
- `cf_delete_seg_audit`
- `cf_dismiss_anomaly`
- `cf_feature_metrics_data`
- `cf_git_sync`
- `cf_git_sync_now_events`
- `cf_patch_ff_activation_audit`
- `cf_patch_ff_audit`
- `cf_patch_seg_audit`
- `cf_proxy_key`
- `cf_restore_ff_activation_audit`
- `cf_restore_ff_audit`
- `cf_svc_updates`
- `cf_target_metrics`
- `cg_general_event`
- `cg_notify_event`
- `chaos_change_events`
- `ci_orchestration_notify_event`
- `entity_activity`
- `entity_crud`
- `full_sync_stream`
- `git_branch_hook_event_stream`
- `git_config_stream`
- `git_pr_event_stream`
- `git_push_event_stream`
- `iacm_orchestration_notify_event`
- `instance_stats`
- `ldap_group_sync`
- `modulelicense`
- `observer_event_channel`
- `orchestration_log`
- `pipeline_initiate_node`
- `pipeline_interrupt`
- `pipeline_interrupt_cd`
- `pipeline_interrupt_ci`
- `pipeline_interrupt_cv`
- `pipeline_interrupt_iacm`
- `pipeline_interrupt_pms`
- `pipeline_interrupt_sto`
- `pipeline_node_advise`
- `pipeline_node_advise_cd`
- `pipeline_node_advise_ci`
- `pipeline_node_advise_cv`
- `pipeline_node_advise_iacm`
- `pipeline_node_advise_pms`
- `pipeline_node_advise_sto`
- `pipeline_node_facilitation`
- `pipeline_node_facilitation_cd`
- `pipeline_node_facilitation_ci`
- `pipeline_node_facilitation_cv`
- `pipeline_node_facilitation_iacm`
- `pipeline_node_facilitation_pms`
- `pipeline_node_facilitation_sto`
- `pipeline_node_progress`
- `pipeline_node_progress_cd`
- `pipeline_node_progress_ci`
- `pipeline_node_progress_cv`
- `pipeline_node_progress_iacm`
- `pipeline_node_progress_pms`
- `pipeline_node_progress_sto`
- `pipeline_node_resume`
- `pipeline_node_resume_cd`
- `pipeline_node_resume_ci`
- `pipeline_node_resume_cv`
- `pipeline_node_resume_iacm`
- `pipeline_node_resume_pms`
- `pipeline_node_resume_sto`
- `pipeline_node_start`
- `pipeline_node_start_cd`
- `pipeline_node_start_ci`
- `pipeline_node_start_cv`
- `pipeline_node_start_iacm`
- `pipeline_node_start_pms`
- `pipeline_node_start_sto`
- `pipeline_orchestration`
- `pipeline_partial_plan_response`
- `pipeline_sdk_response`
- `pipeline_sdk_spawn`
- `pipeline_sdk_step_response`
- `pipeline_start_plan`
- `plan_notify_event`
- `pms_orchestration_notify_event`
- `polling_events_stream`
- `saml_authorization_assertion`
- `setup_usage`
- `srm_custom_change`
- `srm_statemachine_event`
- `sto_orchestration_notify_event`
- `trigger_execution_events_stream`
- `usermembership`
- `webhook_events_stream`
- `webhook_request_payload_data`

</details>

---

## Part 2: Configure Metric Scraping

### Option 1: Using Prometheus Operator (monitoring.coreos.com/v1)

If you are using the Prometheus Operator with `monitoring.coreos.com/v1` CRDs, create a `PodMonitor` resource to scrape metrics from the redis-stream-monitor pods.

:::info note
If you encounter an error that the CRD is not present, ensure that you install the necessary CRDs when deploying your Prometheus instance. This resource is critical for Prometheus to scrape the metrics.
:::

Create a file named `podmonitor.yaml`:

```yaml
apiVersion: monitoring.coreos.com/v1
kind: PodMonitor
metadata:
  name: redis-stream-monitor
  namespace: <namespace>
spec:
  selector:
    matchLabels:
      app.kubernetes.io/name: redis-stream-monitor
  podMetricsEndpoints:
    - port: "8889"
      interval: 120s
      path: "/metrics"
```

Apply the PodMonitor:

```bash
helm install redis-stream-monitor redis-stream-monitor -n <namespace> -f override.yaml
```

:::info note
The PodMonitor resource will be automatically created by the Helm chart when `managedPlatform: "oss"` is configured.
:::

### Option 2: Using Other Observability Tools

For other observability platforms, configure your scraper to:

- **Target port:** `8889`
- **Metrics path:** `/metrics`
- **Pod selector:** `app.kubernetes.io/name: redis-stream-monitor`

---

## Summary

You have now deployed the redis-stream-monitor to capture detailed Redis stream metrics. These metrics provide valuable insights into the Harness event framework, including stream length, memory usage, consumer lag, and dead letter queue sizes, enabling proactive monitoring and troubleshooting of event processing in your Harness environment.
