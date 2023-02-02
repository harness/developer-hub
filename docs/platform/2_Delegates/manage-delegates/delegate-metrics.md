---
title: Configure delegate metrics
description: This topic describes how to configure Prometheus and Grafana for delegate metrics collection.
# sidebar_position: 2
---

Harness captures delegate agent metrics for delegates shipped on immutable image types. The delegate is instrumented for the collection of the following delegate agent metrics.
  
| **Metric name** | **Description** |
| :-- | :-- |
| `task_execution_time` | The time it takes to complete a task. |
| `tasks_currently_executing` | The number of tasks underway. |
| `tasks_in_queue` | The number of tasks that are waiting in the queue. |
| `task_timeout` | The number of tasks that time out before completion. |

This document explains how to configure the Prometheus monitoring tool for metrics collection, and how to configure the Grafana analytics tool for metrics display. This document includes example YAML you can use to create application manifests for both configurations.

## Install Prometheus

You'll need to install and run Prometheus to collect metrics. You can install Prometheus locally using the `brew` package manager:

```
brew install prometheus
```

After you install Prometheus and set up your config file, you can run Prometheus as follows:

```
prometheus --web.external-url http://localhost:19090/prometheus/ --config.file=prometheus.yml
```

## Configure the Prometheus database

You can use Prometheus to collect delegate metrics. Prometheus “scrapes” metrics from the delegate replica pods you deploy in a cluster. To collect delegate metrics, Prometheus must be configured with the following settings. The configuration of Prometheus is specified as a Kubernetes **ConfigMap** and saved as a prometheus.yml file. 

### Configure the namespace

Prometheus must be configured to use the namespace to which your delegates were deployed. 

```
apiVersion: v1
kind: ConfigMap
metadata:
  name: prometheus-delegate-conf
  Labels:
    name: prometheus-delegate-conf
  namespace: harness-delegate-ng
```

You can skip this step if you’re using the Harness prometheus.yml file and your delegates are deployed to the `harness-delegate-ng` namespace. This namespace is configured in the prometheus.yml file by default. 

### Apply the prometheus.yml file

Deploy the Prometheus configuration map. Use the following command:

```
kubectl apply -f prometheus.yml
```

### Confirm the configuration

If Prometheus is correctly configured, you should be able to see metrics collection. To check, use the following command to port-forward the Prometheus service:

```
kubectl port-forward {prometheus-pod-name} 8084:9090 -n {namespace}
```

In this command, replace `{prometheus-pod-name}` with the name of the deployed Prometheus pod. Replace `{namespace}` with the namespace from the `metadata.namespace` field in the prometheus.yml file. 

```
kubectl port-forward prometheus-deployment-7fd6bcf85-5gm8j 8084:9090 -n harness-delegate-ng
```

As shown in this example, the default namespace is `harness-delegate-ng`.

The Prometheus service runs at port 8084 with a target port of 9090.

```
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
```

These values are specified in the definition of the Prometheus service in the prometheus.yml file.

Open your browser and navigate to `localhost:8084`.

### Example prometheus.yml file

```
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

## Set up Grafana

To set up Grafana, use the following example grafana.yml file.

1. Copy the grafana.yml file.

2. If you're not using the default `harness-delegate-ng` namespace, replace it with the namespace into which you deployed your delegate.

3. Use the following command to apply the Grafana configuration file to your deployment:

   ```
   kubectl apply -f grafana.yml
   ```
   
4. Port-forward the Prometheus service to view the metrics:

   ```
   kubectl port-forward {grafana-pod-name} 8084:9090 -n {namespace]
   ```
   
5. Open your browser and navigate to `localhost:3000`.


### Example grafana.yml file

```
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
