---
title: Kubernetes Autostopping quickstart guide
description: This quickstart shows you how to create and test an AutoStopping rule for your Kubernetes cluster.
sidebar_position: 10
helpdocs_topic_id: 9l4gblg2we
helpdocs_category_id: e04ek5vxtx
helpdocs_is_private: false
helpdocs_is_published: true
---

This quickstart shows you how to create and test an AutoStopping rule for your Kubernetes cluster.

### Install a sample application​

To test AutoStopping, you can use a sample nginx application. Perform the following steps to install this sample application:

#### Apply the following YAML in your Kubernetes cluster​:


```
apiVersion: v1
kind: Namespace
metadata:
  name: autostopping-sample

---

apiVersion: apps/v1
kind: Deployment
metadata:
  name: autostopping-sample-app
  namespace: autostopping-sample
  labels:
    app: autostopping-sample-app
spec:
  replicas: 1
  selector:
    matchLabels:
      app: autostopping-sample-app
  template:
    metadata:
      labels:
        app: autostopping-sample-app
    spec:
      containers:
      - name: autostopping-sample-app
        image: nginx:1.14.2
        ports:
        - containerPort: 80

---

apiVersion: v1
kind: Service
metadata:
  name: autostopping-sample-svc
  namespace: autostopping-sample
spec:
  selector:
    app: autostopping-sample-app
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
```
This installs a demo application named `autostopping-sample-app` that runs three pods running nginx in the `autostopping-sample` namespace.​

### Supported ingress controllers for Kubernetes AutoStopping

Kubernetes AutoStopping support is fully available for the following ingress controllers and API gateways:

* Nginx​
* Istio​
* Traefik​
* Ambassador​
* HAProxy

Setting up AutoStopping Rules for each of these are shown below. ​

### Kubernetes AutoStopping for Nginx​

#### Expose your application by creating an ingress rule.

Apply the following YAML to the cluster.​


```
apiVersion: networking.k8s.io/v1​  
kind: Ingress  
metadata:  
  name: autostopping-sample-ig  
  namespace: autostopping-sample  
  annotations:  
     nginx.ingress.kubernetes.io/rewrite-target: /  
spec:  
    ingressClassName: nginx  
    rules:  
    - http:  
       paths:  
       - path: /  
       pathType: Prefix  
       backend:  
         service:  
          name: autostopping-sample-svc  
          port:  
           number: 80
```
#### Create an AutoStopping Rule

Before applying this YAML, make sure that the `cloud-connector-id` is updated and the namespace of the Rule is the same as the `autostopping-sample-app` application.​
```
apiVersion: ccm.harness.io/v1  
kind: AutoStoppingRule  
metadata:  
  name: autostopping-sample-rule  
  namespace: autostopping-sample  
  annotations:  
      harness.io/cloud-connector-id: Lightwing_Non_Prod  
spec:  
    service:  
        name: autostopping-sample-svc  
        port: 80  
    ingress:  
        name: autostopping-sample-ig  
        controllerName: nginx  
    idleTimeMins: 5  
    ahideProgressPage: false
```
Your sample application is now managed by an AutoStopping Rule called `autostopping-sample-ru​`.

### Kubernetes AutoStopping for Istio​

#### Expose your application by creating an ingress rule.


```
apiVersion: networking.istio.io/v1alpha3​  
kind: VirtualService  
metadata:  
  name: httpbin  
  namespace: autostopping-sample  
spec:  
  gateways:  
  - http-gateway  
  http:  
  - match:  
    - uri:  
        prefix: /autostopping-test  
    route:  
    - destination:  
        port:  
          number: 80  
        host: autostopping-sample-svc
```
#### Create an AutoStopping Rule

Before applying this YAML, make sure that the `cloud-connector-id` is updated and the namespace of the Rule is the same as the `autostopping-sample-app` application.​
```
apiVersion: ccm.harness.io/v1​  
kind: AutoStoppingRule  
metadata:  
    name: autostopping-sample-rule  
    namespace: autostopping-sample  
    annotations:  
        harness.io/cloud-connector-id: [CloudConnectorID]  
spec:  
    service:  
        name: autostopping-sample-svc  
        port: 80  
    istio:  
        virtualServices:  
          - httpbin  
    idleTimeMins: 5  
    hideProgressPage: false
```
Your sample application is now managed by an AutoStopping Rule called `autostopping-sample-rule`​.

