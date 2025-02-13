---
title: How to run Kubernetes with Split Synchronizer
sidebar_label: How to run Kubernetes with Split Synchronizer
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

## The Synchronizer

### Use Case
The Split Synchronizer coordinates the sending and receiving of data to a remote datastore (Redis). All of your processes can share to this datastore for the evaluation of treatments, acting as the cache for your SDKs. The Synchronizer, Redis, and your app can all be orchestrated in a Kubernetes cluster. We will show a basic example of this.

### Sizing and Scaling
The Synchronizer is multithreaded and can handle production-level traffic by increasing the number of threads posting events and impressions. For more information on sizing Redis and the Synchronizer for production-level workloads, review our Synchronizer Runbook.

### Health Check
The URL for the healthcheck is /health/application. For the sake of this sample application, we are using a curl command on the pod itself to do the healthcheck, as Kubernetes does not have native JSON parsing capability.

### Sample Usage
Here are sample YAML files for creating the demo app, as well as Synchronizer and Redis. This includes using a ConfigMap to store the SDK key used and health and readiness checks. This has a NodePort service to allow the app using the SDK to communicate outside the cluster. The split-name in the config map allows you to use your own Split organization for testing and bringing up this application.

### Architecture Diagram

![](https://www.split.io/wp-content/uploads/Screen-Shot-2022-10-06-at-9.08.59-PM.png)

### YAML Files
#### ConfigMap
```yaml
# ConfigMap
apiVersion: v1
data:
  api-key: <insert your SDK Key here>
  split-name: <insert your split name here>
kind: ConfigMap
metadata:
  name: app-configmap
```

#### App Deployment
````yaml
# App Deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: pyapp
  name: pyapp
spec:
  replicas: 3
  selector:
    matchLabels:
      app: pyapp
  template:
    metadata:
      labels:
        app: pyapp
    spec:
      containers:
        - image: kleinjoshuaa/py-split-demo
          name: split-demo
          startupProbe:
            exec:
              command:
                - /bin/bash
                - -c
                - health=`curl -s localhost:3010/health/application | grep '"healthy":true' -o | wc -l`; if test $health -ne 3; then exit 0; else exit 1; fi
            initialDelaySeconds: 3
            timeoutSeconds: 1
          livenessProbe:
            exec:
              command:
                - /bin/bash
                - -c
                - health=`curl -s localhost:3010/health/application | grep '"healthy":true' -o | wc -l`; if test $health -ne 3; then exit 0; else exit 1; fi
            initialDelaySeconds: 1
            periodSeconds: 5
          env:
            - name: API_KEY
              valueFrom:
                configMapKeyRef:
                  name: app-configmap
                  key: api-key
            - name: SPLIT_NAME
              valueFrom:
                configMapKeyRef:
                  name: app-configmap
                  key: split-name
            - name: USE_REDIS
              value: "True"
            - name: REDIS_HOST
              value: "redis-svc"
            - name: REDIS_PORT
              value: "6379"
            - name: POD_ID
              valueFrom:
                fieldRef:
                  fieldPath: metadata.name
status: {}
```

#### App Service
```yaml
# App Service
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
    app: pyapp
  type: NodePort
```

#### Redis Pod
```yaml
# Redis Pod
apiVersion: v1
kind: Pod
metadata:
  name: redis
  labels:
    app: redis
spec:
  containers:
    - name: redis
      image: redis
```

#### Redis Service
```yaml
# Redis Service
apiVersion: v1
kind: Service
metadata:
  name: redis-svc
spec:
  selector:
    app: redis
  ports:
    - port: 6379
      targetPort: 6379
```

#### Synchronizer Pod
```yaml
# Synchronizer Pod
apiVersion: v1
kind: Pod
metadata:
  name: split-sync
  labels:
    app: split-sync
spec:
  containers:
    - name: split-sync
      image: splitsoftware/split-synchronizer
      env:
        - name: SPLIT_SYNC_APIKEY
          valueFrom:
            configMapKeyRef:
              name: app-configmap
              key: api-key
        - name: SPLIT_SYNC_REDIS_HOST
          value: redis-svc
        - name: SPLIT_SYNC_REDIS_PORT
          value: "6379"
```

#### ConfigMap
```yaml
apiVersion: v1
data:
 api-key: <insert your SDK Key here>
 split-name: <insert your split name here>
kind: ConfigMap
metadata:
 name: app-configmap
```