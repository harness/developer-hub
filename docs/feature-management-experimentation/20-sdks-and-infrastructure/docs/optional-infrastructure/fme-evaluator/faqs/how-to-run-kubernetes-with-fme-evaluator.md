---
title: How to run Kubernetes with Split Evaluator
sidebar_label: How to run Kubernetes with Split Evaluator
helpdocs_is_private: false
helpdocs_is_published: true
---

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/17239031215629-Running-Split-Evaluator-Split-Proxy-or-Split-Synchronizer-with-Kubernetes </button>
</p>

## Introduction

Kubernetes is a tool used to orchestrate and manage containerized applications. Split Synchronizer, Split Evaluator, and Split Proxy can be run on your own infrastructure. These apps can handle specific use cases for feature flagging and experimentation with our SDKs and APIs.

All three Kubernetes related examples have a NodePort service to allow communication outside the cluster for the app. Once you have this up and running, if you are using minikube you can get the NodePort URL by calling:
```bash
 minikube service pyapp-svc -url
```
Then enter the returned URL in a browser, and you will see a page showing the pod name and the feature flag treatment.

## The Evaluator

### Use Case

Use the split evaluator when there is no Split SDK for the language you have in your application backend. The evaluator makes HTTP APIs available. The APIs exposed by the evaluator have most of the SDK functionality. You can use it to get treatments with dynamic config, and track events. See here for more information on individual commands and usage to deploy the split evaluator.

### Sizing and Scaling

Internal benchmarks on an AWS c5.2xlarge EC2 instance have shown that an evaluator instance running on a single thread can process 1,200 transactions per second. A transaction can retrieve multiple split treatments if using the getTreatments endpoint. In this specific benchmark, the evaluator was serving two treatments, so this was 2,400 treatments per second.

The evaluator is stateless. It can be scaled in and out as needed by spinning up a new instance and routing requests to it. The general recommendation is to spin up a new instance at 50% CPU or 50 percent memory usage.

### Health Check

The evaluator has a health check endpoint that can be used to determine if the evaluator is healthy: `/admin/healthcheck`.

## Sample Usage

Here are sample YAML files for creating an evaluator. This includes using a `ConfigMap` to store the SDK key used as well as health checks and readiness checks. The split-name in the config map allows you to use your Split organization for testing and bringing up this application.

![](https://www.split.io/wp-content/uploads/Screen-Shot-2022-10-06-at-9.02.09-PM.png)

Architecture diagram

### YAML Files

#### ConfigMap
```yaml
# ConfigMap
apiVersion: v1
data:
  api-key: <insert your api key here>
  split-name: <insert your split name here>
kind: ConfigMap
metadata:
  name: eval-configmap
```

#### Evaluator Service
```yaml
# Evaluator Service
apiVersion: v1
kind: Service
metadata:
  labels:
    app: evaluator-deployment
  name: evaluator-svc
spec:
  ports:
    - name: 7548-7548
      port: 7548
      protocol: TCP
      targetPort: 7548
  selector:
    app: evaluator-deployment
```

#### Evaluator Deployment
```yaml
# Evaluator Deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: evaluator-deployment
  name: evaluator-deployment
spec:
  replicas: 2
  selector:
    matchLabels:
      app: evaluator-deployment
  template:
    metadata:
      labels:
        app: evaluator-deployment
    spec:
      containers:
        - image: splitsoftware/split-evaluator
          name: split-evaluator
          startupProbe:
            httpGet:
              path: /admin/healthcheck
              port: 7548
            initialDelaySeconds: 1
            timeoutSeconds: 1
          livenessProbe:
            httpGet:
              path: /admin/healthcheck
              port: 7548
            initialDelaySeconds: 1
            periodSeconds: 5
          env:
            - name: SPLIT_EVALUATOR_API_KEY
              valueFrom:
                configMapKeyRef:
                  name: eval-configmap
                  key: api-key
```

#### App NodePort Service
```yaml
# App NodePort Service
apiVersion: v1
kind: Service
metadata:
  labels:
    app: pyapp-svc
  name: pyapp-svc
spec:
  ports:
    - name: "5000"
      port: 5000
      protocol: TCP
      targetPort: 5000
  selector:
    app: pyapp-demo
  type: NodePort
```

#### App Deployment
```yaml
# App Deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: pyapp-demo
  name: pyapp-demo
spec:
  replicas: 3
  selector:
    matchLabels:
      app: pyapp-demo
  template:
    metadata:
      labels:
        app: pyapp-demo
    spec:
      containers:
        - image: kleinjoshuaa/py-split-demo-evaluator
          name: evaluator-demo
          env:
            - name: SPLIT_NAME
              valueFrom:
                configMapKeyRef:
                  name: eval-configmap
                  key: split-name
            - name: EVALUATOR_URL
              value: "http://evaluator-svc:7548"
            - name: POD_ID
              valueFrom:
                fieldRef:
                  fieldPath: metadata.name
```