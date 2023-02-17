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
| `task_timeout` | The number of tasks that time out before completion. |

This document explains how to configure the Prometheus monitoring tool for metrics collection, and how to configure the Grafana analytics tool for metrics display. This document includes example YAML you can use to create application manifests for both configurations.

### Apply the prometheus.yml file

The configuration of Prometheus requires the installation of a Prometheus workload and service in your Kubernetes cluster. Use the following example configuration file to install the `harness-delegate-prometheus-deployment` workload and a service named `harness-delegate-prometheus-service`. The configuration includes a load balancer with an IP address you can use to access the Prometheus UI. 

Use the following command to deploy the configuration file. 

```
kubectl apply -f prometheus.yml
```

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
   
4. This manifest also creates a load balancer and service in your Kubernetes cluster. Click the exposed URL to access Grafana.


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
