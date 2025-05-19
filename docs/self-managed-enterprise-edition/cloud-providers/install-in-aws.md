---
title: Amazon EKS
description: This guide provides detailed instructions for deploying the Harness Self-Managed Enterprise Edition on Elastic Kubernetes Service (EKS).
sidebar_label: Helm Charts for EKS
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::note Important Note
  If you are using Kubernetes 1.3x, make sure to specify the storage class in your override file as mentioned in [supported Kubernetes versions](/docs/self-managed-enterprise-edition/smp-supported-platforms#supported-kubernetes-versions).
:::

This guide offers step-by-step instructions for deploying Harness Self-Managed Platform (SMP) on Amazon EKS using Helm charts. It includes EKS-specific prerequisites, configuration details, and best practices to ensure a secure, reliable, and optimized deployment.

### Prerequisites

1. AWS Account: You must have access to an AWS account with necessary IAM permissions to:
    - Create EKS clusters and node groups.
    - Create and attach IAM roles and policies.
    - Provision VPC, subnets, and security groups.
    - Create and manage IAM OIDC providers and service accounts.
2. `kubectl` 
3 [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)
4 [eksctl](https://eksctl.io/introduction/#installation)
5. Helm 3.x

:::note
  You can create a cluster using the AWS Management Console, but in this section, we’ll use the AWS CLI (`aws configure`) and `eksctl` to create the cluster. Make sure both tools are installed and configured before proceeding.
:::

### Step 1: Configure AWS CLI 

1. Open your terminal and run the following command, it will ask for AWS credentials:

    ```bash
    aws configure
    ```

2. Enter your AWS credentials when prompted:

    :::info
      - **Access Key ID** and **Secret Access Key**: You can generate these from your [AWS IAM Console](https://console.aws.amazon.com/iam/home#/security_credentials).
      - **Default region name**: Choose the AWS region where you want to deploy the cluster (e.g., `us-east-1`).
      - **Default output format**: Recommended to use `json`.
    :::

    ```bash
    AWS Access Key ID [None]: YOUR_ACCESS_KEY
    AWS Secret Access Key [None]: YOUR_SECRET_KEY
    Default region name [None]: YOUR_REGION
    Default output format [None]: json
    ```
    or alternatively, you can export them as environment variables using the following commands:

      ```bash
      export AWS_ACCESS_KEY_ID=YOUR_ACCESS_KEY
      export AWS_SECRET_ACCESS_KEY=YOUR_SECRET_KEY
      export AWS_DEFAULT_REGION=YOUR_REGION
      ```

3. To verify and confirm your configuration, run the following command:

   ```bash
    aws sts get-caller-identity
   ```

    This command should return your AWS account information when configured correctly.
    If you encounter any issues, refer to the [official AWS CLI configuration documentation](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html) for guidance.

### Step 2: Create a Cluster

  To provision a new EKS cluster for your SMP environment, use the following `eksctl` configuration YAML. This file sets up a cluster named `my-smp-test` in the `us-east-2` region with managed node groups, essential IAM policies, and networking settings required for running Harness Self-Managed Platform. 
  
  It is pre-configured with defaults suited for sandbox or testing purposes, but you can modify the values (like cluster name, region, tags, and CIDR) as needed.

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
          autoScaler: true
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
      cidr: <YOUR-CIDR> # for example, 192.168.0.0/16
      clusterEndpoints:
        privateAccess: false
        publicAccess: true
      manageSharedNodeSecurityGroupRules: true
      nat:
        gateway: Single
    ```

### Step 3: Configure Amazon EBS CSI driver

  Currently, `eksctl` does not provide a built-in way to automatically attach the Amazon EBS CSI driver, which is required for provisioning Persistent Volumes (PVs). To ensure your cluster can dynamically create the necessary PVs, follow the steps below to manually set up the EBS CSI driver.


   1. Create an IAM role for your EKS cluster to enable the use of the EBS CSI driver. You can do this either through the AWS Management Console or by using the `eksctl` command, as shown below.

      ```bash
        eksctl create iamserviceaccount \
        --name ebs-csi-controller-sa \
        --namespace <namespace-your-choice> \
        --cluster <your-cluster-name> \
        --attach-policy-arn arn:aws:iam::aws:policy/service-role/AmazonEBSCSIDriverPolicy \
        --approve \
        --role-name AmazonEKS_EBS_CSI_DriverRole \
        --region <your-region>
      ```

   2. Enable the EBS CSI Driver for your EKS cluster.

      2.1. Associate OIDC Provider (if not done yet)
          
          ```bash    
            eksctl utils associate-iam-oidc-provider \
            --region <your-region> \
            --cluster <your-cluster-name> \
            --approve
          ```

      2.2 Install EBS CSI Driver

        If you're using Amazon EKS add-ons:

        ```bash
          aws eks create-addon \
          --cluster-name <your-cluster-name> \
          --addon-name aws-ebs-csi-driver \
          --service-account-role-arn arn:aws:iam::156272853481:role/AmazonEKS_EBS_CSI_DriverRole \
          --region <your-region>
        ```

        Or via `eksctl`:

        ```bash
          eksctl create addon \
          --name aws-ebs-csi-driver \
          --cluster <your-cluster-name>  \
          --service-account-role-arn arn:aws:iam::156272853481:role/AmazonEKS_EBS_CSI_DriverRole \
          --force \
          --region <your-region>
        ```
    
      2.3 Update Trust Relationship in IAM

        To enable a Kubernetes service account to assume an IAM role using OIDC authentication, you need to update the IAM role's trust policy, which can be done through the AWS CLI or AWS console by modifying the trust relationship.

        Login to AWS Management Console, navigate to IAM, select the role you need to update within Roles move to Trust relationships tab and add the below json

        ```json
          {
              "Effect": "Allow",
              "Principal": {
                  "Federated": "arn:aws:iam::<ACCOUNT_ID>:oidc-provider/oidc.eks.us-east-1.amazonaws.com/id/<PROVIDER_ID>"
              },
              "Action": "sts:AssumeRoleWithWebIdentity",
              "Condition": {
                  "StringEquals": {
                      "oidc.eks.<YOUR-AWS-REGION>.amazonaws.com/id/<PROVIDER_ID>:sub": "system:serviceaccount:<namespace>:<service-account-name>"
                  }
              }
          }
        ```

### Step 4: Install Self-Managed Enterprise Edition in AWS EKS

1. Create a namespace for your deployment.

   ```bash
   kubectl create namespace harness-aws
   ```

2. Download the latest Helm chart from the [Harness GitHub Releases page](https://github.com/harness/helm-charts/releases?q=harness-0&expanded=true). Under the **Assets** section, locate and download the `harness-<release-version>.tgz` file.

3. Open the `harness/values.yaml` file in any editor or create a new override file, and modify the following values.

    ```yaml
      global:
        ingress:
          enabled: "true"
    ```

    Search for `loadbalancerURL` in `global` config set to "" 

    ```yaml
      global:
        loadbalancerURL: ""
    ```

    Search for `hosts` in `global.ingress` set to ""

    ```yaml
      global:
        ingress:
          hosts: ""

    ```
4. Install the Helm chart.

    ```bash
      helm install harness harness/ -f override-demo.yaml -n harness-aws
    ```

:::info
   AWS EKS can create and attach Elastic Load Balancers as a Kubernetes Resource. For more information, go to [Application load balancing on Amazon EKS](https://docs.aws.amazon.com/eks/latest/userguide/alb-ingress.html) in the EKS documentation. 
:::

5. Save the following reference in `loadbalancer.yaml` file and apply it into your cluster.
  
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
      kubectl create -f loadbalancer.yaml -n harness-aws
      ```

6. Get the ELB URL.

   ```bash
   kubectl get service -n harness-aws
   ```

7. Make a note of the `EXTERNAL-IP` for the `harness-ingress-controller`. It should look like `<string>.us-east-2.elb.amazonaws.com`.

   ```
    NAME                         TYPE           CLUSTER-IP       EXTERNAL-IP                                                               PORT(S)                                      AGE
    default-backend              ClusterIP      10.100.54.229    <none>                                                                    80/TCP                                       38s
    harness-ingress-controller   LoadBalancer   10.100.130.107   af5b132b743fb4XXXXXXX24581119f1b-1454307465.us-east-2.elb.amazonaws.com   10254:32709/TCP,80:32662/TCP,443:32419/TCP   38s
    ```

8. Open the `harness/values.yaml` file in any editor and modify the following values.

    ```yaml
      global:
        ingress:
          enabled: "true" 
    ```

    Update your `loadbalancerURL` and `hosts` as shown below:

    ```yaml
      global:
        loadbalancerURL: "https://<YOUR_ELB_ADDRESS>"
    ```

    ```yaml
      global:
        ingress:
          hosts: "<YOUR_ELB_ADDRESS>"
    ```

9. Upgrade the Helm deployment, applying your new ELB as the load balancer to your configuration.

   ```bash
    helm upgrade harness harness/ -f override-demo.yaml -n harness-aws
   ```

10. Navigate to the sign up UI at `https://<YOUR_ELB_ADDRESS>/auth/#/signup` to create your admin user.

11. Complete to the post-install next steps.

import Postinstall from '/docs/self-managed-enterprise-edition/shared/post-install-next-steps.md';

<Postinstall />