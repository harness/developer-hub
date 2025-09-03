---
title: Add Dashboards using Grafana Operator
description: Manage Grafana dashboards and datasources declaratively in Kubernetes with Grafana Operator, Helm, and CRDs, enabling easy versioning, automation, and maintenance of observability for Harness modules. 
sidebar_position: 5
---

## Overview

Harness provides curated dashboards for multiple modules such as CI, CD, STO, Platform and many more. To manage these dashboards efficiently, we recommend using the **Grafana Operator**, which allows you to:

- Deploy dashboards as Kubernetes custom resources (CRs).
- Maintain your monitoring setup via GitOps or Helm.
- Separate dashboards into logical folders using folder CRs.
- Automatically sync dashboards into your Grafana instance.

This guide walks you through installing the operator, connecting it to a running Grafana instance, and syncing dashboards from the Harness open-source dashboards repository.

## Install Grafana Operator

To install the Grafana Operator via Helm:

:::info note
   We recommend using grafana operator v5.16.0 and above having several fixes with grafana operator specially related to Grafana Folders struct.
:::

```bash
helm upgrade -i grafana-operator oci://ghcr.io/grafana/helm-charts/grafana-operator -n grafana
```

> This creates the operator in the `grafana` namespace, which will monitor and reconcile Grafana-related custom resources. 

## Connect the Operator to Grafana

The Grafana Operator needs credentials and the endpoint URL of your running Grafana instance to sync resources. This is done by defining a `Secret` and a `Grafana` custom resource.

Create a file named `grafana.yaml`:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: grafana-admin-credentials
  namespace: grafana
stringData:
  GF_SECURITY_ADMIN_USER: admin #         <-- Modify username
  GF_SECURITY_ADMIN_PASSWORD: password #  <-- Modify password
---
apiVersion: grafana.integreatly.org/v1beta1
kind: Grafana
metadata:
  name: grafana-instance
  labels:
    dashboards: "grafana-instance"
  namespace: grafana
spec:
  external:
    url: http://grafana.grafana.svc.cluster.local:3000 # <-- Grafana endpoint
    adminPassword:
      name: grafana-admin-credentials
      key: GF_SECURITY_ADMIN_PASSWORD
    adminUser:
      name: grafana-admin-credentials
```

Apply it in your cluster:

```bash
kubectl apply -f grafana.yaml
```

---

## Install and Sync Harness Dashboards

To install Harness-maintained dashboards and automatically sync them into your Grafana instance:

1. Clone the dashboards repo:

    ```bash
      git clone https://github.com/harness/harness-dashboards.git
      cd harness-dashboards/chart
    ```

2. Install dashboards using Helm:

    ```bash
      helm install harness-dashboards . -n grafana
    ```

Once deployed, the Grafana Operator will sync these resources into your Grafana instance. The dashboards will be organized under a top-level folder titled **Harness**, containing subfolders for each module (e.g., Platform, CI, CD) and further grouped by services.

## Summary

You’ve now set up a scalable and declarative way to manage dashboards using the Grafana Operator. This approach enables structured, version-controlled observability tailored for your Harness environment.


