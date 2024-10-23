---
title: Manual Installation of Project Aurora for Spinnaker™ (No Helm)
---

## Introduction
**If Helm cannot be used in the environment**, it is possible to install the dependencies for Project Aurora for Spinnaker™ manually.
This document walks through installing the Remote Network Agent (RNA) and the Argo Rollouts Controller, which are both required for Project Aurora. If the target deployment cluster already has Argo Rollouts installed, that section of the installation can be skipped.

## Prerequisites
### Before Beginning
Complete all steps in [Get Started with Project Aurora for Spinnaker™](https://docs.armory.io/docs/installation/aurora-install/) up to the section titled [Enable Aurora in target Kubernetes clusters](https://docs.armory.io/docs/installation/aurora-install/#enable-aurora-in-target-kubernetes-clusters).
### **Only proceed with this document if Helm cannot be used to complete the section Enable Aurora in target Kubernetes clusters.**

## Instructions
## Create a namespace
In the target cluster where apps will be deployed, create a namespace for the Remote Network Agent:
```kubectl create ns aurora```
The examples on this page assume a namespace called ```aurora``` for the Remote Network Agent installation. Replace the namespace in the examples if using a different namespace.
## ****Install Argo Rollouts
Project Aurora for Spinnaker™ requires that Argo Rollouts Controller 1.x or later is installed in each target Kubernetes cluster along with the Armory Agent.
For information about how to install Argo Rollouts, see [Controller Install](https://argoproj.github.io/argo-rollouts/installation/#controller-installation)[ation](https://argoproj.github.io/argo-rollouts/installation/#controller-installation) in the Argo documentation.
## ****Configure permissions
Create a ```ClusterRole```, ```ServiceAccount```, and ```ClusterRoleBinding``` for the Remote Network Agent by applying the following manifest to the ```aurora``` namespace:
```
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: spin-cluster-role
rules:
- apiGroups:
  - ""
  resources:
  - pods
  - pods/log
  - ingresses/status
  - endpoints
  verbs:
  - get
  - list
  - update
  - patch
  - delete
- apiGroups:
  - ""
  resources:
  - services
  - services/finalizers
  - events
  - configmaps
  - secrets
  - namespaces
  - ingresses
  - jobs
  verbs:
  - create
  - get
  - list
  - update
  - watch
  - patch
  - delete
- apiGroups:
  - batch
  resources:
  - jobs
  verbs:
  - create
  - get
  - list
  - update
  - watch
  - patch
- apiGroups:
  - apps
  - extensions
  resources:
  - deployments
  - deployments/finalizers
  - deployments/scale
  - daemonsets
  - replicasets
  - replicasets/finalizers
  - replicasets/scale
  - statefulsets
  - statefulsets/finalizers
  - statefulsets/scale
  verbs:
  - create
  - get
  - list
  - update
  - watch
  - patch
  - delete
- apiGroups:
  - monitoring.coreos.com
  resources:
  - servicemonitors
  verbs:
  - get
  - create
- apiGroups:
  - spinnaker.armory.io
  resources:
  - '*'
  - spinnakerservices
  verbs:
  - create
  - get
  - list
  - update
  - watch
  - patch
- apiGroups:
  - admissionregistration.k8s.io
  resources:
  - validatingwebhookconfigurations
  verbs:
  - '*'
---
apiVersion: v1
kind: ServiceAccount
metadata:
  namespace: aurora
  name: spin-sa
---
kind: ClusterRoleBinding
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: spin-cluster-role-binding
subjects:
  - kind: ServiceAccount
    name: spin-sa
    namespace: aurora
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: spin-cluster-role
```

## ****Configure the Remote Network Agent
For information about adding accounts, see the ```kubernetes.accounts[]``` options in the [Agent Configuration documentation](https://docs.armory.io/docs/armory-agent/agent-options/#configuration-options).
```
apiVersion: v1
kind: ConfigMap
metadata:
  name: armory-agent-config
  namespace: aurora
data:
  armory-agent.yaml: |
    hub:
      connection:
        grpc: agents.cloud.armory.io:443
      auth:
        armory:
          clientId: ${CLIENT_ID_FOR_AGENT_FROM_ABOVE}
          secret: ${CLIENT_SECRET_FOR_AGENT_FROM_ABOVE}
          tokenIssuerUrl: https://auth.cloud.armory.io/oauth/token
          audience: https://api.cloud.armory.io
          verify: true
    kubernetes:
     accounts: [] 
```

## ****Deploy the Remote Network Agent
Apply the following Remote Network Agent deployment manifest to the namespace created on the target cluster for the Agent (```aurora``` for the examples on this page):
```
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: spin
    app.kubernetes.io/name: armory-agent
    app.kubernetes.io/part-of: spinnaker
    cluster: spin-armory-agent
  name: spin-armory-agent
spec:
  replicas: 1
  selector:
    matchLabels:
      app: spin
      cluster: spin-armory-agent
  template:
    metadata:
      labels:
        app: spin
        app.kubernetes.io/name: armory-agent
        app.kubernetes.io/part-of: spinnaker
        cluster: spin-armory-agent
    spec:
      serviceAccount: spin-sa
      containers:
      - image: armory/agent-kubernetes:0.1.3
        imagePullPolicy: IfNotPresent
        name: armory-agent
        env:
        - name: ARMORY_HUB
          value: "true"
        ports:
          - name: health
            containerPort: 8082
            protocol: TCP
          - name: metrics
            containerPort: 8008
            protocol: TCP
        readinessProbe:
          httpGet:
            port: health
            path: /health
          failureThreshold: 3
          periodSeconds: 10
          successThreshold: 1
          timeoutSeconds: 1
        terminationMessagePath: /dev/termination-log
        terminationMessagePolicy: File
        volumeMounts:
        - mountPath: /opt/spinnaker/config
          name: volume-armory-agent-config
        # - mountPath: /kubeconfigfiles
        #   name: volume-armory-agent-kubeconfigs
      restartPolicy: Always
      volumes:
      - name: volume-armory-agent-config
        configMap:
          name: armory-agent-config
      # - name: volume-armory-agent-kubeconfigs
      #   secret:
      #     defaultMode: 420
      #     secretName: kubeconfigs-secret
```
## Next steps
After completing the above steps, return to [Get Started with Project Aurora for Spinnaker™](https://docs.armory.io/docs/installation/aurora-install/) and continue from [Verify the Agent Deployment](https://docs.armory.io/docs/installation/aurora-install/#verify-the-agent-deployment).

