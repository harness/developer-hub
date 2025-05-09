---
title: Install Prometheus
description: Guide to set up prometheus on your kubernetes cluster. 
sidebar_position: 2
---

## Install Open Source Prometheus

Harness supports using open source Prometheus to monitor your self-managed enterprise edition deployment. This guide walks you through installing Prometheus using the Bitnami `kube-prometheus` Helm chart and the `monitoring.coreos.com` CRDs.

## Prerequisites

- Helm 3 installed
- Access to your Kubernetes cluster
- Namespace `prometheus` (or any preferred namespace)

---

## Step 1: Configure Prometheus Settings

Create an override file `override-prometheus.yaml` to customize resources and enable Prometheus to scrape metrics from pods using annotations:

```yaml
prometheus:
  resourcesPreset: "medium"
  additionalScrapeConfigs:
    enabled: true
    type: internal
    internal:
      jobList:
      - job_name: 'kubernetes-pods'
        scrape_interval: 30s
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
```

> This chart automatically installs the necessary CRDs. Use the `--skip-crds` flag in the Helm install command if you want to avoid CRD installation.

---

## Step 2: Install the Bitnami Kube-Prometheus Chart

### For connected environments:

```bash
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update
helm install prometheus oci://registry-1.docker.io/bitnamicharts/kube-prometheus \
  -f override-prometheus.yaml -n prometheus --create-namespace
```

### For air-gapped environments:

```bash
helm pull bitnami/kube-prometheus
# Transfer chart to jumpbox or airgap environment
helm install prometheus ./kube-prometheus -f override-prometheus.yaml -n prometheus --create-namespace
```

---

## Step 3: Access Prometheus

### Option 1: Port Forwarding
```bash
kubectl port-forward -n prometheus svc/prometheus-kube-prometheus-prometheus 9090:9090
```
Then visit: [http://localhost:9090](http://localhost:9090)

### Option 2: Expose via Ingress
```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: prometheus-ingress
  namespace: prometheus
spec:
  ingressClassName: <PrometheusNginxIngressClass>
  rules:
  - http:
      paths:
      - path: /
        pathType: ImplementationSpecific
        backend:
          service:
            name: prometheus-kube-prometheus-prometheus
            port:
              number: 9090
```

### Option 3: Expose via Istio VirtualService
```yaml
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: prometheus-virtualservice
  namespace: prometheus
spec:
  gateways:
  - <PrometheusGateway>
  http:
  - match:
    - uri:
        prefix: /
    name: prometheus
    rewrite:
      uri: /
    route:
    - destination:
        host: prometheus-kube-prometheus-prometheus
        port:
          number: 9090
```
