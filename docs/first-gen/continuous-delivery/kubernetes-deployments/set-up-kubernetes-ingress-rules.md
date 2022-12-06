---
title: Set up Kubernetes Ingress Rules
description: Add your Ingress rules to your Harness Kubernetes deployments.
sidebar_position: 300 
helpdocs_topic_id: tot87l7e6k
helpdocs_category_id: n03qfofd5w
helpdocs_is_private: false
helpdocs_is_published: true
---

Route traffic using the Ingress rules defined in your Harness Kubernetes Service.

### Before You Begin

* [Set Up Kubernetes Traffic Splitting](set-up-kubernetes-traffic-splitting.md)
* [Define Kubernetes Manifests](define-kubernetes-manifests.md)
* If you are new to Ingress, see [Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/) from Kubernetes.

A Harness Service is different from a Kubernetes service. A Harness Service includes the manifests and container used for deployment. A Kubernetes service enables applications running in a Kubernetes cluster to find and communicate with each other, and the outside world. To avoid confusion, a Harness Service is always capitalized in Harness documentation. A Kubernetes service is not.

### Step 1: Add a Service Manifest

For Ingress Rules, you simply add your Kubernetes service and Ingress manifests to your Harness Service, and then refer to the service name in the Ingress manifest.

Here is the Kubernetes service manifest. Note the service name `my-svc`:


```
apiVersion: v1  
kind: Service  
metadata:  
  name: my-svc  
spec:  
  ports:  
  - name: my-port  
    port: 8080  
    protocol: TCP  
    targetPort: my-container-port  
  selector:  
    app: my-deployment  
  type: ClusterIP
```
The service name **my-svc** will be referred to in the Ingress manifest.

### Step 2: Add an Ingress Manifest

Add an Ingress manifest that refers to the service name. In our example, the service name is `my-svc`:


```
apiVersion: extensions/v1beta1  
kind: Ingress  
metadata:  
 name: my-ingress  
 annotations:  
  kubernetes.io/ingress.class: "nginx"  
spec:  
  rules:  
  - http:  
     paths:  
     - path: /my/path  
       backend:  
        serviceName: my-svc  
        servicePort: 8080
```
### Notes

* Using the values.yaml file and Go templating, you would simply add the service name and any other key values to the values.yaml file and then replace them in both manifests with the variable. For examples of using Go templating, see [Use Go Templating in Kubernetes Manifests](use-go-templating-in-kubernetes-manifests.md).

