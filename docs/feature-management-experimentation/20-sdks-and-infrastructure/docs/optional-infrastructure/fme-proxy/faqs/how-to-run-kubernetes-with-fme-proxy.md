---
title: How to run Kubernetes with Split Proxy
sidebar_label: How to run Kubernetes with Split Proxy
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

## The Proxy

### Use Case

There are two main scenarios where the Split Proxy is useful. The first is when using a client-side SDK as a workaround to adblockers. Using the Split Proxy will allow the SDK to connect to URL endpoints within your domain. As a result, an ad-blocker won’t see the connection to Split’s servers that the Proxy is doing on your backend.

The second use case for the Proxy is with server-side SDKs: in a microservices environment or otherwise where multiple Split SDKs are used in multiple different services. The Split Proxy can be used so that those SDKs communicate across your internal network infrastructure. This is better than having to establish a connection to the Split Cloud on their own. As a result, this can speed up SDK initialization time significantly. In addition, this allows for monitoring Split Proxy as a single point of contact with Split Cloud.

This second case is what we will be using for the example here. For the first use case, one could expose the proxies directly to the internet rather than only to the app within the cluster. For more information see the Split Proxy page in Split’s help center.

### Sizing and Scaling

To ensure SDKs have no issues initializing even when facing high demand, you could consider having separate Proxy instances. They can handle split and segments, events and impressions. Since events and impressions are more memory-intensive tasks for the Proxy, serving a high amount of these requests may affect the responsiveness of the more performant splits and segments requests—which are the ones involved in the SDKs’ initialization. Having separate instances of the Proxy—one for impressions and one for events—can significantly reduce latency and allow for fine tuning based upon events and impressions traffic you have.

Additionally, since split and segment requests are less demanding, having dedicated instances for initialization will likely allow you to serve more SDKs with fewer instances.

For reference, these are the sizing recommendations from our internal testing. A Proxy serving 1M JS SDK clients with default polling rates for it to stabilize at ~50 percent CPU and lower RAM usage:

1 instance with 32 cores, 32GB memory, 10 Gigabit network
4 instances with 8 cores, 8GB memory, 10 Gigabit network

### Health Check

The URL for the healthcheck is `/health/application`. For the sake of this sample application, we are using a curl command on the pod itself to do the healthcheck, since Kubernetes does not have native JSON parsing capability.

### Sample Usage

Here are sample YAML files for creating a Proxy. This includes using a `ConfigMap` to store the SDK key used and health and readiness checks. This has a `NodePort` service to allow the app to communicate outside the cluster. We have separate deployments for a Proxy for the events.split.io events and impressions endpoint, and one for sdk.split.io. The split-name in the `ConfigMap` allows you to use your own Split account for testing and bringing up this application.

![](https://www.split.io/wp-content/uploads/Screen-Shot-2022-10-06-at-9.05.16-PM.png)

### YAML Files

#### ConfigMap
```yaml
# ConfigMap
apiVersion: v1
data:
  api-key: <insert the SDK key here to connect to split cloud>
  client-api-key: <insert the 'client' SDK key for your SDK clients to use>
  split-name: <insert your split name here>
kind: ConfigMap
metadata:
  name: proxy-configmap
```

#### Events Proxy Deployment
```yaml
# Events Proxy Deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: proxy-events-deployment
  name: proxy-events-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: proxy-events-deployment
  template:
    metadata:
      labels:
        app: proxy-events-deployment
    spec:
      containers:
        - image: splitsoftware/split-proxy
          name: split-proxy
          startupProbe:
            httpGet:
              path: /health/application
              port: 3010
            initialDelaySeconds: 3
            timeoutSeconds: 1
          livenessProbe:
            httpGet:
              path: /health/application
              port: 3010
            initialDelaySeconds: 1
            periodSeconds: 5
          env:
            - name: SPLIT_PROXY_APIKEY
              valueFrom:
                configMapKeyRef:
                  name: proxy-configmap
                  key: api-key
            - name: SPLIT_PROXY_CLIENT_APIKEYS
              valueFrom:
                configMapKeyRef:
                  name: proxy-configmap
                  key: client-api-key
```

#### Events Proxy Service
```yaml
# Events Proxy Service
apiVersion: v1
kind: Service
metadata:
  labels:
    app: proxy-events-svc
  name: proxy-events-svc
spec:
  ports:
    - name: proxy
      port: 3000
      protocol: TCP
      targetPort: 3000
    - name: admin
      port: 3010
      protocol: TCP
      targetPort: 3010
  selector:
    app: proxy-events-deployment
```

#### SDK Proxy Deployment
```yaml
# SDK Proxy Deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: proxy-sdk-deployment
  name: proxy-sdk-deployment
spec:
  replicas: 2
  selector:
    matchLabels:
      app: proxy-sdk-deployment
  template:
    metadata:
      labels:
        app: proxy-sdk-deployment
    spec:
      containers:
        - image: splitsoftware/split-proxy
          name: split-proxy
          startupProbe:
            httpGet:
              path: /health/application
              port: 3010
            initialDelaySeconds: 3
            timeoutSeconds: 1
          livenessProbe:
            httpGet:
              path: /health/application
              port: 3010
            initialDelaySeconds: 1
            periodSeconds: 5
          env:
            - name: SPLIT_PROXY_APIKEY
              valueFrom:
                configMapKeyRef:
                  name: proxy-configmap
                  key: api-key
            - name: SPLIT_PROXY_CLIENT_APIKEYS
              valueFrom:
                configMapKeyRef:
                  name: proxy-configmap
                  key: client-api-key
```

#### SDK Proxy Service
```yaml
# SDK Proxy Service
apiVersion: v1
kind: Service
metadata:
  labels:
    app: proxy-sdk-svc
  name: proxy-sdk-svc
spec:
  ports:
    - name: proxy
      port: 3000
      protocol: TCP
      targetPort: 3000
    - name: admin
      port: 3010
      protocol: TCP
      targetPort: 3010
  selector:
    app: proxy-sdk-deployment
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
  replicas: 2
  selector:
    matchLabels:
      app: pyapp-demo
  template:
    metadata:
      labels:
        app: pyapp-demo
    spec:
      containers:
        - image: kleinjoshuaa/py-split-demo-proxy
          name: proxy-demo
          env:
            - name: SPLIT_NAME
              valueFrom:
                configMapKeyRef:
                  name: proxy-configmap
                  key: split-name
            - name: API_KEY
              valueFrom:
                configMapKeyRef:
                  name: proxy-configmap
                  key: client-api-key
            - name: EVENTS_PROXY_URL
              value: "http://proxy-events-svc:3000/api"
            - name: SDK_PROXY_URL
              value: "http://proxy-sdk-svc:3000/api"
            - name: POD_ID
              valueFrom:
                fieldRef:
                  fieldPath: metadata.name
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
    app: pyapp-demo
  type: NodePort
```