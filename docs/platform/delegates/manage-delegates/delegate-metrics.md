---
title: Configure delegate metrics and auto scale
description: This topic describes how to configure Prometheus and Grafana to collect and display delegate metrics and how to auto scale using replicas.
sidebar_position: 2
redirect_from:
  - /docs/platform/delegates/manage-delegates/auto-scale-using-replicas
canonical_url: https://www.harness.io/blog/architecting-harness-ci-for-scale
---

Harness Delegates are responsible for executing various types of workloads, and the amount of resources consumed depends on the specific type of workload being performed. Harness cannot predict the specific resource requirements for a particular workload in advance.

This topic explains how to:
- Configure the Prometheus monitoring tool for the metrics collection.
- Configure the Grafana analytics tool to display metrics.
- Configure the delegate resource threshold.
- Auto scale using replicas.


## Delegate metrics

Harness captures delegate agent metrics for delegates with an immutable image type. This process requires a delegate an immutable image. For more information, go to [Delegate image types](/docs/platform/delegates/delegate-concepts/delegate-image-types).

The delegate is instrumented for the collection of the following delegate agent metrics.

:::info note
All metrics reset when you restart the delegate.

:::

| **Metric name** | **Description** |
| :-- | :-- |
| `io_harness_custom_metric_task_execution_time` | The amount of time it took to complete a task (in seconds). |
| `io_harness_custom_metric_tasks_currently_executing` | The number of tasks currently in an executing state. |
| `io_harness_custom_metric_task_timeout_total` # | The total number of tasks that timed out before completion. |
| `io_harness_custom_metric_task_completed_total` # | The total number of tasks completed. |
| `io_harness_custom_metric_task_failed_total` # | The total number of failed tasks. |
| `io_harness_custom_metric_task_rejected_total` * #| The number of tasks rejected because of a high load on the delegate. |
| `io_harness_custom_metric_delegate_connected` | Indicates whether the delegate is connected. Values are 0 (disconnected) and 1 (connected). |
| `io_harness_custom_metric_resource_consumption_above_threshold`* | Delegate CPU is above a threshold. Provide `DELEGATE_CPU_THRESHOLD` as the env variable in the delegate YAML to configure the CPU threshold. For more information, go to [Configure delegate resource threshold](#configure-delegate-resource-threshold). |
| `ldap_sync_group_flush_total` | Publishes the total count for a user group when the LDAP group sync returns 0 users for that group. The metric publishes the `accountIdentifier`, `GroupDN`, and the `count`. |

:::info note
Metrics with * above are only visible if you configure the resource threshold in your delegate YAML. Go to [Configure delegate resource threshold](#configure-delegate-resource-threshold) for more information.

Also note that the above metrics are available only if your delegate version is later than 23.05.79311.
:::

:::info note
Metrics with # above the include the suffix `_total` as of Harness Delegate 23.11.81403. Delegate versions earlier than 23.11.81403 do not include the suffix `_total` in the metric name.

:::

This topic includes example YAML files you can use to create application manifests for your Prometheus and Grafana configurations.

### General recommended metrics configuration

Below are the metrics settings recommended by Harness. Tailor these settings according to your organization's specific needs.

#### CPU/Memory

Configuring HPA based on CPU/Memory can be a bit complex for some use cases. However, if the calculations are possible, we believe 70-80% usage is the most effective HPA indicator. Ideally, this percentage should be slightly lower than `DELEGATE_CPU_THRESHOLD`, so that HPA is triggered before the delegate starts rejecting tasks to avoid task execution failures or slowdown.

:::info
Using CPU-based HPA is not advisable unless CPU is limited for the delegate container (not limited by default). When CPU is unlimited, exceeding 100% is possible and should not be the sole reason to scale or reject tasks. CPU-based HPA should only be used when the CPU usage goes above 100% for a prolonged period. Instead, memory-based HPA is recommended for autoscaling purposes. Harness suggests using memory-based HPA for better performance and efficiency.
:::

#### io_harness_custom_metric_task_execution_time

Utilize the P99 metric to establish a baseline after initiating pipeline runs and set an appropriate threshold.

Set a low severity alarm for significant deviations.

A significant change can indicate pipeline performance issues or the addition of a slow pipeline. While an alarm doesn't necessarily signify an issue, it's worth investigating.

HPA isn't suitable for this metric.

#### io_harness_custom_metric_tasks_currently_executing

HPA based on CPU/Memory provides better indicators. Utilize a count metric.

Create a low severity alarm for significant deviations (for example, a 30-50% change).

Set a high severity alarm for zero over a prolonged period (for example, 30 minutes) if delegates are consistently expected to perform tasks.

If the change is unexpected, the alarm could indicate a need to plan for scaling the delegate fleet due to increased usage. A sudden burst might cause downtime or indicate a problem with pipeline executions or downstream services.

#### io_harness_custom_metric_task_timeout_total

HPA isn't necessary. Ideally, this should be close to zero. Create a high severity alarm for a sufficiently low number.

An alarm might indicate misconfigured pipelines or disruptions in downstream services, but also overloaded delegate.

#### io_harness_custom_metric_task_completed_total

While possibly not highly informative, it can be added to the dashboard for insight into processed volume.

Plot count per delegate; all delegates should be similarly utilized.

#### io_harness_custom_metric_task_failed_total

HPA isn't necessary. Ideally, this should be close to zero, but intermittent failures occur and shouldn't trigger alarms.

Establish a baseline and set a high severity alarm for significant deviations. This would signify a serious issue such as a service outage or misconfiguration.

#### io_harness_custom_metric_task_rejected_total

HPA isn't necessary (as this indicates that CPU/Memory thresholds are already reached), but it provides an alternate observation of delegate utilization.

Create a low severity alarm for total unique task rejections. This alarm can indicate a need to scale up the delegate fleet.

#### io_harness_custom_metric_resource_consumption_above_threshold

While this can serve as a simpler HPA metric, we advise to use CPU/Memory for HPA instead if possible. By the time this metric is triggered, rejection has likely already begun, making it too late for HPA adjustments. Fine-tuning CPU/Memory metrics provides a better HPA indicator, allowing scaling before task rejection occurs.

## Configure the Prometheus monitoring tool for the metrics collection

### Apply the prometheus.yml file

The configuration of Prometheus requires the installation of a Prometheus workload and service in your Kubernetes cluster. Use the following example configuration file to install the `harness-delegate-prometheus-deployment` workload and a service named `harness-delegate-prometheus-service`. The configuration includes a load balancer with an IP address you can use to access the Prometheus UI.

Expand the section below to view a sample `prometheus.yml` file.

<details>
<summary>Example prometheus.yml file</summary>

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: harness-delegate-ng

---

apiVersion: v1
kind: ConfigMap
metadata:
  name: prometheus-delegate-conf
  labels:
    name: prometheus-delegate-conf
  namespace: harness-delegate-ng
data:
  CPU: "1"
  MEMORY: "2048"
  POD_MEMORY: "3072"
  prometheus.yml: |-
    global:
      scrape_interval: 10s
      evaluation_interval: 10s

    scrape_configs:
      - job_name: 'kubernetes-apiservers'

        kubernetes_sd_configs:
        - role: endpoints
        scheme: http
        metrics_path: '/api/metrics'

        relabel_configs:
        - source_labels: [__meta_kubernetes_namespace, __meta_kubernetes_service_name, __meta_kubernetes_endpoint_port_name]
          action: keep
          regex: default;kubernetes;https

      - job_name: 'kubernetes-pods'

        kubernetes_sd_configs:
        - role: pod

        relabel_configs:
        - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]
          action: keep
          regex: true
        - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_path]
          action: replace
          target_label: __metrics_path__
          regex: (.+)
        - source_labels: [__address__, __meta_kubernetes_pod_annotation_prometheus_io_port]
          action: replace
          regex: ([^:]+)(?::\d+)?;(\d+)
          replacement: $1:$2
          target_label: __address__
        - action: labelmap
          regex: __meta_kubernetes_pod_label_(.+)
        - source_labels: [__meta_kubernetes_namespace]
          action: replace
          target_label: kubernetes_namespace
        - source_labels: [__meta_kubernetes_pod_name]
          action: replace
          target_label: kubernetes_pod_name

      - job_name: 'kubernetes-service-endpoints'

        kubernetes_sd_configs:
        - role: endpoints

        relabel_configs:
        - source_labels: [__meta_kubernetes_service_annotation_prometheus_io_scrape]
          action: keep
          regex: true
        - source_labels: [__meta_kubernetes_service_annotation_prometheus_io_scheme]
          action: replace
          target_label: __scheme__
          regex: (https?)
        - source_labels: [__meta_kubernetes_service_annotation_prometheus_io_path]
          action: replace
          target_label: __metrics_path__
          regex: (.+)
        - source_labels: [__address__, __meta_kubernetes_service_annotation_prometheus_io_port]
          action: replace
          target_label: __address__
          regex: ([^:]+)(?::\d+)?;(\d+)
          replacement: $1:$2
        - action: labelmap
          regex: __meta_kubernetes_service_label_(.+)
        - source_labels: [__meta_kubernetes_namespace]
          action: replace
          target_label: kubernetes_namespace
        - source_labels: [__meta_kubernetes_service_name]
          action: replace
          target_label: kubernetes_name
---
apiVersion: v1
kind: Service
metadata:
  name: harness-delegate-prometheus-service
  namespace: harness-delegate-ng
spec:
  selector:
    app: prometheus-delegate
  type: LoadBalancer
  ports:
    - port: 8084
      targetPort: 9090
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: harness-delegate-prometheus-deployment
  namespace: harness-delegate-ng
spec:
  replicas: 1
  template:
    metadata:
      labels:
        app: prometheus-delegate
    spec:
      containers:
        - name: prometheus
          image: prom/prometheus:v2.6.0
          args:
            - "--config.file=/etc/prometheus/prometheus.yml"
            - "--storage.tsdb.path=/prometheus/"
          ports:
            - containerPort: 9090
          volumeMounts:
            - name: prometheus-config-volume
              mountPath: /etc/prometheus/
            - name: prometheus-storage-volume
              mountPath: /prometheus/
      volumes:
        - name: prometheus-config-volume
          configMap:
            defaultMode: 420
            name: prometheus-delegate-conf

        - name: prometheus-storage-volume
          emptyDir: {}
  selector:
    matchLabels:
      app: prometheus-delegate

```

</details>

Use the following command to deploy the configuration file.

```
kubectl apply -f prometheus.yml
```

## Configure the Grafana analytics tool to display metrics

To set up Grafana, use the following example `grafana.yml` file.

<details>
<summary>Example `grafana.yml` file</summary>

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: grafana-datasources
  namespace: harness-delegate-ng
data:
  prometheus.yaml: |-
    {
        "apiVersion": 1,
        "datasources": [
            {
               "access":"proxy",
                "editable": true,
                "name": "prometheus",
                "orgId": 1,
                "type": "prometheus",
                "url": "http://harness-delegate-prometheus-service:8084",
                "version": 1
            }
        ]
    }

---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: grafana
  namespace: harness-delegate-ng
spec:
  replicas: 1
  selector:
    matchLabels:
      app: grafana
  template:
    metadata:
      name: grafana
      labels:
        app: grafana
    spec:
      containers:
      - name: grafana
        image: grafana/grafana:latest
        ports:
        - name: grafana
          containerPort: 3000
        resources:
          limits:
            memory: "1Gi"
            cpu: "1000m"
          requests:
            memory: 500M
            cpu: "500m"
        volumeMounts:
          - mountPath: /var/lib/grafana
            name: grafana-storage
          - mountPath: /etc/grafana/provisioning/datasources
            name: grafana-datasources
            readOnly: false
      volumes:
        - name: grafana-storage
          emptyDir: {}
        - name: grafana-datasources
          configMap:
              defaultMode: 420
              name: grafana-datasources

---
apiVersion: v1
kind: Service
metadata:
  name: grafana
  namespace: harness-delegate-ng
  annotations:
      prometheus.io/scrape: 'true'
      prometheus.io/port:   '3000'
spec:
  selector:
    app: grafana
  type: LoadBalancer
  ports:
    - port: 3000
      targetPort: 3000
```

</details>

1. Copy the `grafana.yml` file.

2. If you're not using the default `harness-delegate-ng` namespace, replace it with the namespace into which you deployed your delegate.

3. Use the following command to apply the Grafana configuration file to your deployment:

   ```
   kubectl apply -f grafana.yml
   ```

   :::info note
   This manifest also creates a load balancer and service in your Kubernetes cluster.
   :::

4. Select the exposed URL to access Grafana.

## Configure delegate resource threshold

You can set the delegate to reject new tasks when the configured resource threshold is reached. You can then spin up new delegates when resources are above the threshold.

:::info note
The `io_harness_custom_metric_resource_consumption_above_threshold` metric is only visible if you configure resource threshold in your delegate YAML.
:::

:::warning Configuration Deprecation Notice
Delegate configuration to control the task rejections `DYNAMIC_REQUEST_HANDLING` and `DELEGATE_RESOURCE_THRESHOLD` are now deprecated and will be removed in a future version of the delegate. The preferred method to configure a resource threshold is by using `DELEGATE_CPU_THRESHOLD` as described below.

:::

To configure the delegate resource threshold, set the `DELEGATE_CPU_THRESHOLD` env variable to the CPU threshold in percentages. When the threshold is exceeded, the delegate rejects new tasks.

   ```yaml
   env:
      - name: DELEGATE_CPU_THRESHOLD
        value: "80"
   ```

## Auto scale using replicas

Autoscaling Harness Delegate using replicas is a useful feature that can help ensure your deployments are executed efficiently, without downtime or resource overload.

### Enable the usage threshold for delegate resources

You can set the delegate to reject new tasks when the configured resource threshold is reached. You can then spin up new delegates when resources are above the threshold. For more information, go to [Configure delegate resource threshold](#configure-delegate-resource-threshold).

### Configure Harness Delegate autoscaling using replicas for Helm chart deployments

To access the default Helm chart for the `values.yaml` file, go to [Harness Delegate Helm chart](https://github.com/harness/delegate-helm-chart/blob/main/harness-delegate-ng/values.yaml).

:::info note
You can also update the Harness Delegate YAML file in addition to the Helm chart.
:::

To auto scale the delegate, do the following:

1. In your `values.yaml` file, go to `autoscaling` parameters.

   ```yaml
   autoscaling:
     enabled: false
     minReplicas: 1
     maxReplicas: 10
     targetMemoryUtilizationPercentage: 80
     # targetCPUUtilizationPercentage: 80
   ```

2. Set `enabled` to `true`.

3. Specify the minimum and maximum number of replicas you want to use in the `minReplicas` and `maxReplicas` parameters.

   To fine-tune your autoscaling, you can set the `targetMemoryUtilizationPercentage` to add a new replica when memory utilization exceeds this percentage.

4. (Optional) Set the `targetCPUUtilizationPercentage` to add a new replica when CPU utilization exceeds this percentage.

5. Save the file, and upgrade your deployment.

    :::info
    Using CPU-based HPA is not advisable unless CPU is limited for the delegate container (not limited by default). When CPU is unlimited exceeding 100% is common and should not be the sole reason to scale or reject tasks. CPU-based HPA should only be used when the CPU usage goes above 100% for a prolonged period. Instead, memory-based HPA is recommended for autoscaling purposes. Harness suggests using memory-based HPA for better performance and efficiency.
    :::

### Configure Harness Delegate autoscaling using replicas for Kubernetes 1.23 and later

The HPA configuration setting is included in the default Kubernetes delegate YAML file. Harness updated the default HPA in the Harness Delegate YAML versions 24.02.82302 and later to use `autoscaling/v2` instead of `autoscaling/v1`, which was used in earlier delegate versions.

Since `autoscaling/v2` has been GA with Kubernetes 1.23 and higher, if you have a Kubernetes version lower than 1.23 and a delegate version 24.02.82302 or later, you must manually change the `apiVersion` in the `HorizontalPodAutoscaler` section of your delegate YAML to `autoscaling/v1`. For more information, go to [Configure Harness Delegate autoscaling using replicas for Kubernetes versions lower than 1.23](#configure-harness-delegate-autoscaling-using-replicas-for-kubernetes-versions-earlier-than-123).

To auto scale the delegate for Kubernetes 1.23 and higher, do the following:

1. In your `harness-delegate.yml` file, go to `autoscaling` parameters.

2. Specify the minimum and maximum number of replicas you want to use in the `minReplicas` and `maxReplicas` parameters.

   To fine-tune your autoscaling, you can set the `memory` `averageUtilization` to add a new replica if memory utilization exceeds this percentage. Below is an example of autoscaling the delegate if the memory usage of delegates goes above 70% (the default YAML setting).

<details>
<summary>Sample autoscaling YAML</summary>

   ```yaml

   ---

   apiVersion: autoscaling/v2
   kind: HorizontalPodAutoscaler
   metadata:
     name: kubernetes-delegate-hpa
     namespace: harness-delegate-ng
     labels:
         harness.io/name: kubernetes-delegate
   spec:
    scaleTargetRef:
      apiVersion: apps/v1
      kind: Deployment
      name: kubernetes-delegate
    minReplicas: 1
    maxReplicas: 1
    metrics:
    - type: Resource
      resource:
        name: memory
        target:
          type: Utilization
          averageUtilization: 70

   ---

   ```
</details>

3. (Optional) Set the `cpu` `averageUtilization`to add a new replica if CPU utilization exceeds this percentage.

4. Save the file, and deploy it to your Kubernetes cluster.

### Configure Harness Delegate autoscaling using replicas for Kubernetes versions earlier than 1.23

The HPA configuration setting is included in the default Kubernetes delegate YAML file.

:::warning important version info
Harness updated the default HPA in the Harness Delegate YAML to use `autoscaling/v2` instead of `autoscaling/v1` which was used in earlier delegate versions.

Since `autoscaling/v2` has been GA with Kubernetes 1.23 and higher, if you have a Kubernetes version earlier than 1.23 and a delegate version 24.02.82302 or later, you must manually change the `apiVersion` in the `HorizontalPodAutoscaler` section of your delegate YAML to `autoscaling/v1`.

:::

To auto scale the delegate for Kubernetes versions lower than 1.23, do the following:

1. In your `harness-delegate.yml` file, go to `autoscaling` parameters.

2. Replace the `apiVersion` in the `HorizontalPodAutoscaler` section of your delegate YAML to `autoscaling/v1`.

   ```yaml
   ---

   apiVersion: autoscaling/v1
   kind: HorizontalPodAutoscaler
   metadata:
      name: harness-delegate-hpa
      namespace: harness-delegate-ng
      labels:
          harness.io/name: harness-delegate
   spec:
     scaleTargetRef:
       apiVersion: apps/v1
       kind: Deployment
       name: harness-delegate
     minReplicas: 2
     maxReplicas: 10
     targetMemoryUtilizationPercentage: 70

   ---
   ```

3. Specify the minimum and maximum number of replicas you want to use in the `minReplicas` and `maxReplicas` parameters.

   To fine-tune your autoscaling, you can set the `targetMemoryUtilizationPercentage` to add a new replica if Memory utilization exceeds this percentage. Below is an example of autoscaling the delegate if the Memory usage of delegates goes above 70%.

4. (Optional) Set the `targetCPUUtilizationPercentage` to add a new replica if CPU utilization exceeds this percentage.

5. Save the file, and restart your pods.

   When you create a deployment, Harness automatically spins up new replicas of your delegate as needed to ensure the deployment is completed.

#### Example delegate YAML

Here's an example YAML file that configures delegates to have a minimum of 2 replicas. New tasks won't be accepted if the Memory usage goes above 80%. Once the Memory usage hits 70%, a new pod will be created to handle the load, up to a maximum of 10 replicas. When the Memory usage goes down below 70%, the number of replicas will be scaled back down to a minimum of 2.

<details>
<summary>Example delegate YAML</summary>

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: harness-delegate-ng

---

apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: harness-delegate-ng-cluster-admin
subjects:
  - kind: ServiceAccount
    name: default
    namespace: harness-delegate-ng
roleRef:
  kind: ClusterRole
  name: cluster-admin
  apiGroup: rbac.authorization.k8s.io

---

apiVersion: v1
kind: Secret
metadata:
  name: kubernetes-delegate-account-token
  namespace: harness-delegate-ng
type: Opaque
data:
  DELEGATE_TOKEN: "YOUR_DELEGATE_TOKEN"

---

# If delegate needs to use a proxy, please follow instructions available in the documentation
# https://developer.harness.io/docs/platform/delegates/manage-delegates/configure-delegate-proxy-settings/

apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    harness.io/name: kubernetes-delegate
  name: kubernetes-delegate
  namespace: harness-delegate-ng
spec:
  replicas: 2
  minReadySeconds: 120
  selector:
    matchLabels:
      harness.io/name: kubernetes-delegate
  template:
    metadata:
      labels:
        harness.io/name: kubernetes-delegate
      annotations:
        prometheus.io/scrape: "true"
        prometheus.io/port: "3000"
        prometheus.io/path: "/api/metrics"
    spec:
      terminationGracePeriodSeconds: 600
      restartPolicy: Always
      containers:
      - image: example/org/delegate:yy.mm.verno
        imagePullPolicy: Always
        name: delegate
        securityContext:
          allowPrivilegeEscalation: false
          runAsUser: 0
        ports:
          - containerPort: 9090
        resources:
          limits:
            memory: "2Gi"
          requests:
            cpu: "0.5"
            memory: "2Gi"
        livenessProbe:
          httpGet:
            path: /api/health
            port: 3460
            scheme: HTTP
          initialDelaySeconds: 10
          periodSeconds: 10
          failureThreshold: 3
        startupProbe:
          httpGet:
            path: /api/health
            port: 3460
            scheme: HTTP
          initialDelaySeconds: 30
          periodSeconds: 10
          failureThreshold: 15
        envFrom:
        - secretRef:
            name: kubernetes-delegate-account-token
        env:
        - name: JAVA_OPTS
          value: "-Xms64M"
        - name: ACCOUNT_ID
          value: YOUR_ACCOUNT_ID
        - name: MANAGER_HOST_AND_PORT
          value: https://app.harness.io
        - name: DEPLOY_MODE
          value: KUBERNETES
        - name: DELEGATE_NAME
          value: kubernetes-delegate
        - name: DELEGATE_TYPE
          value: "KUBERNETES"
        - name: DELEGATE_NAMESPACE
          valueFrom:
            fieldRef:
              fieldPath: metadata.namespace
        - name: INIT_SCRIPT
          value: ""
        - name: DELEGATE_DESCRIPTION
          value: ""
        - name: DELEGATE_TAGS
          value: ""
        - name: NEXT_GEN
          value: "true"
        - name: CLIENT_TOOLS_DOWNLOAD_DISABLED
          value: "true"
        - name: LOG_STREAMING_SERVICE_URL
          value: "https://app.harness.io/log-service/"
        - name: MEMORY_USAGE_THRESHOLD
          value: ""

---

apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
   name: kubernetes-delegate-hpa
   namespace: harness-delegate-ng
   labels:
       harness.io/name: kubernetes-delegate
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: kubernetes-delegate
  minReplicas: 1
  maxReplicas: 1
  metrics:
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 70

---

kind: Role
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: upgrader-cronjob
  namespace: harness-delegate-ng
rules:
  - apiGroups: ["batch", "apps", "extensions"]
    resources: ["cronjobs"]
    verbs: ["get", "list", "watch", "update", "patch"]
  - apiGroups: ["extensions", "apps"]
    resources: ["deployments"]
    verbs: ["get", "list", "watch", "create", "update", "patch"]

---

kind: RoleBinding
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: kubernetes-delegate-upgrader-cronjob
  namespace: harness-delegate-ng
subjects:
  - kind: ServiceAccount
    name: upgrader-cronjob-sa
    namespace: harness-delegate-ng
roleRef:
  kind: Role
  name: upgrader-cronjob
  apiGroup: ""

---

apiVersion: v1
kind: ServiceAccount
metadata:
  name: upgrader-cronjob-sa
  namespace: harness-delegate-ng

---

apiVersion: v1
kind: Secret
metadata:
  name: kubernetes-delegate-upgrader-token
  namespace: harness-delegate-ng
type: Opaque
data:
  UPGRADER_TOKEN: "YOUR_UPGRADER_TOKEN"

---

apiVersion: v1
kind: ConfigMap
metadata:
  name: kubernetes-delegate-upgrader-config
  namespace: harness-delegate-ng
data:
  config.yaml:
    mode: Delegate
    dryRun: false
    workloadName: kubernetes-delegate
    namespace: harness-delegate-ng
    containerName: delegate
    delegateConfig:
      accountId: YOUR_ACCOUNT_ID
      managerHost: https://app.harness.io

---

apiVersion: batch/v1
kind: CronJob
metadata:
  labels:
    harness.io/name: kubernetes-delegate-upgrader-job
  name: kubernetes-delegate-upgrader-job
  namespace: harness-delegate-ng
spec:
  schedule: "0 */1 * * *"
  concurrencyPolicy: Forbid
  startingDeadlineSeconds: 20
  jobTemplate:
    spec:
      template:
        spec:
          serviceAccountName: upgrader-cronjob-sa
          restartPolicy: Never
          containers:
          - image: example/org/delegate:yy.mm.verno
            name: upgrader
            imagePullPolicy: Always
            envFrom:
            - secretRef:
                name: kubernetes-delegate-upgrader-token
            volumeMounts:
              - name: config-volume
                mountPath: /etc/config
          volumes:
            - name: config-volume
              configMap:
                name: kubernetes-delegate-upgrader-config
```

</details>

### Scale down delegate pods

You can use `terminationGracePeriodSeconds` or `preStopHook` to scale down your delegate pods.

- `terminationGracePeriodSeconds`: This is used to allow the delegate to delay the shutdown so that this process can perform some cleanup. The container shutdown is delayed the specified duration.

   If there are no tasks running on the delegate pod, it terminates immediately. If the delegate pod is running one or more tasks, it will stop accepting new tasks and terminate as soon as all running tasks complete.

   For example, if `terminationGracePeriodSeconds` is set to 7200 (two hours), there are three possible scenarios:

   - No tasks: The delegate container terminates immediately.

   - Short tasks: For example, if tasks require 10 minutes to complete, the delegate will delay shutdown until tasks are complete (10 minutes), and then shutdown. In this example, the total delay is 10 minutes, not two hours.

   - Long tasks: For example, if tasks require five hours to complete, the delegate will delay the shutdown, up to the maximum grace period configured (two hours), then Kubernetes sends SIGKILL signal, force killing the delegate and tasks. Tasks will show up as timed out/failed in the UI.

- `preStopHook`: This is used to allow any other kind of cleanup outside of the main process, for example, if you want to save files. This hook runs in parallel to the `terminationGracePeriodSeconds`, but before the delegate process shutdown is triggered (before the delegate process receives SIGTERM). If the hook's grace period ends, it is terminated. The delegate enters draining mode and only runs tasks already in progress. It will try doing this until all tasks are completed or until it is interrupted by Kubernetes with the SIGKILL signal when the grace period expires.

:::info caution
There are some drawbacks of using a longer `terminationGracePeriodSeconds`. Harness recommends that you evaluate your requirements and determine the maximum waiting time for task completion. If there is a long task that is pending completion, it can potentially bring down the entire delegate instance as it will be unable to process any new tasks while draining. It is crucial to consider the duration of tasks and ensure that they are distributed evenly to prevent such situations.

During delegate upgrade scenarios, this is not a major issue, since Harness performs rolling updates by default. Rolling updates bring up new delegate instances before shutting down the old ones (this uses additional resources, but your tasks will finish). During a long task, if the delegate container requires a restart, it will result in one less delegate instance, which could impact other tasks that might fail to schedule due to a lack of available delegates.
:::

