---
title: Install in a demo/non-prod environment in AWS
description: Learn how to install Harness Self-Managed Enterprise Edition in AWS.
sidebar_position: 15
sidebar_label: Install in AWS
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<DocsTag  backgroundColor= "#4279fd" text="Harness Demo Feature"  textColor="#ffffff"/>

This topic explains how to install a demo/non prod environment version of Harness Self-Managed Enterprise Edition in Amazon Web Services (AWS).

### Prerequisites

This topic assumes you have experience with AWS, such as setting up projects, namespaces, and clusters.

In addition to a Harness account, you need the following:

- Access to an AWS project
- Access to Helm charts
- An elastic IP address

Before you install Harness Self-Managed Enterprise Edition, you must create a test cluster.

### Create a test cluster

To create a test cluster using eksctl, do the following:

1. Install and configure eksctl. For more information, go to [Installation](https://eksctl.io/installation/) in the eksctl documentation.
2. Save the following to a `sample-demo-cluster.yaml` file.

    ```yaml
    accessConfig:
      authenticationMode: API_AND_CONFIG_MAP
    apiVersion: eksctl.io/v1alpha5
     # Modify these to the region of interest
     # Might need to modify again if your eksctl command says an AZ is unavailable for EKS nodes
    availabilityZones:
    - us-east-2a
    - us-east-2b
    - us-east-2c
    cloudWatch:
      clusterLogging: {}
    iam:
      vpcResourceControllerPolicy: true
      withOIDC: true
    kind: ClusterConfig
    kubernetesNetworkConfig:
      ipFamily: IPv4
    managedNodeGroups:
    - amiFamily: AmazonLinux2
      desiredCapacity: 7
      disableIMDSv1: true
      disablePodIMDS: false
      iam:
        withAddonPolicies:
          albIngress: true
          appMesh: false
          appMeshPreview: false
          autoScaler: false
          awsLoadBalancerController: true
          certManager: false
          cloudWatch: false
          ebs: true
          efs: false
          externalDNS: false
          fsx: false
          imageBuilder: false
          xRay: false
      instanceSelector: {}
      instanceType: t3.2xlarge
      labels:
        alpha.eksctl.io/cluster-name: my-smp-test # Modify this label to match the kubernetes name
        alpha.eksctl.io/nodegroup-name: standard-workers
      maxSize: 9
      minSize: 4
      name: standard-workers
      privateNetworking: false
      releaseVersion: ""
      securityGroups:
        withLocal: null
        withShared: null
      ssh:
        allow: false
        publicKeyPath: ""
      tags:
        alpha.eksctl.io/nodegroup-name: standard-workers
        alpha.eksctl.io/nodegroup-type: managed
      volumeIOPS: 3000
      volumeSize: 80
      volumeThroughput: 125
      volumeType: gp3
    metadata:
      # Modify these tags/metadata to your needs
      name: my-smp-test
      region: us-east-2
      # Change these tags to anything that would be helpful for your accounting
      tags:
        cluster: smp-test
        owner: <your-name>
        purpose: sandbox-lab
        scope: smp-test
      # Currently this is the latest version of K8S supported by Harness SMP
      version: "1.27"
    privateCluster:
      enabled: false
      skipEndpointCreation: false
    vpc:
      autoAllocateIPv6: false
      cidr: 192.168.0.0/16
      clusterEndpoints:
        privateAccess: false
        publicAccess: true
      manageSharedNodeSecurityGroupRules: true
      nat:
        gateway: Single
    ```

3. Modify any values as needed, such as the region and availability zones to which you want to deploy or any tagging that you want to apply.

4. Currently, eksctl doesn't have a simple methodology to attach the Amazon EBS CSI driver necessary for create the required Persistent Volumes (PVs). Do the following to create the required PVs:

   1. Create an IAM role for your EKS cluster to utilize the EBS CSI Driver.

   2. Enable the EBS CSI Driver for your EKS cluster.

eksctl should automatically configure a Kubernetes config for your kubectl within your terminal session. If not, ensure you have a connection to your new cluster. For more information, go to [Getting started with Amazon EKS – AWS Management Console and AWS CLI](https://docs.aws.amazon.com/eks/latest/userguide/getting-started-console.html#eks-configure-kubectl) in the AWS EKS documentation.

### Install Harness Self-Managed Enterprise Edition in AWS EKS

1. Create a namespace for your deployment.

   ```
   kubectl create namespace harness
   ```

2. Retrieve and extract the latest [Harness Helm charts](https://github.com/harness/helm-charts/releases). The harness charts will look like `harness-<version_number>`.

3. Open the `harness/values.yaml` file in any editor, and modify the following values.


    | Key                       | Value     |
    | ----------------------------------- | --------------------- |
    | `global.ingress.enabled`| `true`|
    | `global.loadbalancerURL`| `""`|
    | `global.ingress.hosts`| `""`|

4. Install the Helm chart.

    ```
    helm install harness harness/ -f override-demo.yaml -n harness
    ```

   AWS EKS has the ability to create and attach Elastic Load Balancers as a Kubernetes Resource. For more information, go to [Application load balancing on Amazon EKS](https://docs.aws.amazon.com/eks/latest/userguide/alb-ingress.html) in the EKS documentation. For this tutorial, we'll take advantage of this functionality by creating our Load Balancer first manually.

5. Save the following reference `loadbalancer.yaml` file and apply it into your cluster.
  
     ```yaml
       ---
       # Source: networking/templates/nginx/controller.yaml
       apiVersion: v1
       kind: ServiceAccount
       metadata:
         name: harness-serviceaccount
         namespace: harness
       ---
       # Source: networking/templates/nginx/controller.yaml
       apiVersion: v1
       kind: ConfigMap
       metadata:
         name: harness-ingress-controller
         namespace: harness
         labels:
       data:
         proxy-body-size: 1024m
         proxy-read-timeout: "600"
         proxy-send-timeout: "600"
       ---
       # Source: networking/templates/nginx/controller.yaml
       apiVersion: rbac.authorization.k8s.io/v1
       kind: Role
       metadata:
         name: harness-role
         namespace: harness
       rules:
       - apiGroups:
         - ""
         resources:
         - namespaces
         verbs:
         - get
       - apiGroups:
         - ""
         resources:
         - configmaps
         - pods
         - secrets
         - endpoints
         verbs:
         - update
         - get
         - list
         - watch
       - apiGroups:
         - ""
         resources:
         - services
         verbs:
         - get
         - list
         - update
         - watch
       - apiGroups:
         - extensions
         - networking.k8s.io
         resources:
         - ingresses
        verbs:
         - get
         - list
         - watch
       - apiGroups:
         - extensions
         - networking.k8s.io
         resources:
         - ingresses/status
         verbs:
         - update
       - apiGroups:
         - ""
         resourceNames:
         - ingress-controller-leader-harness
         resources:
         - configmaps
         verbs:
         - get
         - update
       - apiGroups:
         - ""
         resources:
         - configmaps
         verbs:
         - create
       - apiGroups:
         - ""
         resources:
         - endpoints
         verbs:
         - create
         - get
         - update
       - apiGroups:
         - ""
         resources:
         - events
         verbs:
         - create
         - patch
       ---
       # Source: networking/templates/nginx/controller.yaml
       apiVersion: rbac.authorization.k8s.io/v1
       kind: RoleBinding
       metadata:
         name: harness-role-hsa-binding
         namespace: harness
       roleRef:
         apiGroup: rbac.authorization.k8s.io
         kind: Role
         name: harness-role
       subjects:
         - kind: ServiceAccount
           name: harness-serviceaccount
           namespace: harness
       ---
       # Source: networking/templates/nginx/controller.yaml
       apiVersion: v1
       kind: Service
       metadata:
         name: harness-ingress-controller
         namespace: harness
         labels:
         annotations:
       spec:
         selector:
           app: harness-ingress-controller
         type: 'LoadBalancer'
         # externalTrafficPolicy: 'Cluster'
         ports:
         - name: health
           protocol: TCP
           port: 10254
           targetPort: 10254
         - name: http
           port: 80
           protocol: TCP
           targetPort: http
         - name: https
           port: 443
           protocol: TCP
           targetPort: https
       ---
       # Source: networking/templates/nginx/default-backend.yaml
       apiVersion: v1
       kind: Service
       metadata:
         name: default-backend
         namespace: harness
         labels:
       spec:
         ports:
         - name: http
           port: 80
           protocol: TCP
           targetPort: 8080
         selector:
           app: default-backend
         type: ClusterIP
       ---
       # Source: networking/templates/nginx/controller.yaml
       kind: Deployment
       apiVersion: apps/v1
       metadata:
         name: harness-ingress-controller
         namespace: harness
         labels:
       spec:
         replicas: 1
         selector:
           matchLabels:
             app: harness-ingress-controller
         progressDeadlineSeconds: 300
         strategy:
           rollingUpdate:
             maxSurge: 1
             maxUnavailable: 1
           type: RollingUpdate
         template:
           metadata:
             labels:
               app: "harness-ingress-controller"
           spec:
             affinity:
               podAntiAffinity:
                 requiredDuringSchedulingIgnoredDuringExecution:
                   - labelSelector:
                       matchLabels:
                         app: "harness-ingress-controller"
                     topologyKey: kubernetes.io/hostname
             serviceAccountName: harness-serviceaccount
             terminationGracePeriodSeconds: 60
             securityContext:
               runAsUser: 101
             containers:
             - image: us.gcr.io/k8s-artifacts-prod/ingress-nginx/controller:v1.0.0-alpha.2
               name: nginx-ingress-controller
               imagePullPolicy: IfNotPresent
               envFrom:
               - configMapRef:
                   name: harness-ingress-controller
               resources:
                 limits:
                   memory: 512Mi
                 requests:
                   cpu: "0.5"
                   memory: 512Mi
               ports:
                 - name: http
                   containerPort: 8080
                   protocol: TCP
                 - name: https
                   containerPort: 8443
                   protocol: TCP
               livenessProbe:
                 httpGet:
                   path: /healthz
                   port: 10254
                   scheme: HTTP
                 initialDelaySeconds: 30
                 timeoutSeconds: 5
               securityContext:
                 allowPrivilegeEscalation: false
               env:
               - name: POD_NAME
                 valueFrom:
                   fieldRef:
                     apiVersion: v1
                     fieldPath: metadata.name
               - name: POD_NAMESPACE
                 valueFrom:
                   fieldRef:
                     apiVersion: v1
                     fieldPath: metadata.namespace
               args:
               - /nginx-ingress-controller
               - --ingress-class=harness
               - --default-backend-service=$(POD_NAMESPACE)/default-backend
               - --election-id=ingress-controller-leader
               - --watch-namespace=$(POD_NAMESPACE)
               - --update-status=true
               - --configmap=$(POD_NAMESPACE)/harness-ingress-controller
               - --http-port=8080
               - --https-port=8443
               - --default-ssl-certificate=$(POD_NAMESPACE)/harness-cert
               - --publish-service=$(POD_NAMESPACE)/harness-ingress-controller
       ---
       # Source: networking/templates/nginx/default-backend.yaml
       kind: Deployment
       apiVersion: apps/v1
       metadata:
         name: default-backend
         namespace: harness
         labels:
       spec:
         replicas: 1
         selector:
           matchLabels:
             app: default-backend
         template:
           metadata:
             labels:
               app: default-backend
           spec:
             serviceAccountName: harness-serviceaccount
             terminationGracePeriodSeconds: 60
             containers:
             - name: default-http-backend
               image: registry.k8s.io/defaultbackend-amd64:1.5
               imagePullPolicy: IfNotPresent
               livenessProbe:
                 httpGet:
                   path: /healthz
                   port: 8080
                   scheme: HTTP
                 initialDelaySeconds: 30
                 timeoutSeconds: 5
               resources:
                 limits:
                   memory: 20Mi
                 requests:
                   cpu: 10m
                   memory: 20Mi
               securityContext:
                 runAsUser: 65534
               ports:
               - name: http
                 containerPort: 8080
                 protocol: TCP
      ```

      ```
      kubectl create -f loadbalancer.yaml -n harness
      ```

6. Get the ELB URL.

   ```
   kubectl get service -n harness
   ```

7. Make a note of the `EXTERNAL-IP` for the `harness-ingress-controller`. It should look like `<string>.us-east-2.elb.amazonaws.com`.


   ```
    NAME                         TYPE           CLUSTER-IP       EXTERNAL-IP                                                               PORT(S)                                      AGE
    default-backend              ClusterIP      10.100.54.229    <none>                                                                    80/TCP                                       38s
    harness-ingress-controller   LoadBalancer   10.100.130.107   af5b132b743fb4318947b24581119f1b-1454307465.us-east-2.elb.amazonaws.com   10254:32709/TCP,80:32662/TCP,443:32419/TCP   38s
    ```

7. Open the `harness/values.yaml` file in any editor and modify the following values.

    | Key                       | Value     |
    | ----------------------------------- | --------------------- |
    | `global.ingress.enabled`| `true`|
    | `global.loadbalancerURL`| `"https://<YOUR_ELB_ADDRESS>"`    |
    | `global.ingress.hosts`| `"<YOUR_ELB_ADDRESS>"` |


8. Upgrade the Helm deployment, applying your new ELB as the load balancer to your configuration.

   ```
   helm upgrade harness harness/ -f override-demo.yaml -n harness
   ```

   kubectl destroy two pods to inherit the new configuration.
   - The ingress controller pod (for example, `harness-ingress-controller-7f8bc86bb8-mrj94`)
   - The gateway pod (for example, `gateway-59c47c595d-4fvt2`)

9.  Navigate to the sign up UI at `https://<YOUR_ELB_ADDRESS>/auth/#/signup` to create your admin user.
10. Complete to the post-install next steps.

import Postinstall from '/docs/self-managed-enterprise-edition/shared/post-install-next-steps.md';

<Postinstall />

