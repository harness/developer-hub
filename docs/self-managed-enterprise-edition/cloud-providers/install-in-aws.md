---
title: Amazon EKS
description: This guide provides detailed instructions for deploying the Harness Self-Managed Enterprise Edition on Elastic Kubernetes Service (EKS).
sidebar_label: Amazon EKS
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This guide offers step-by-step instructions for deploying Harness Self-Managed Platform (SMP) on Amazon EKS using Helm charts. It includes EKS-specific prerequisites, configuration details, and best practices to ensure a secure, reliable, and optimized deployment.

### Prerequisites

1. AWS Account: You must have access to an AWS account with necessary IAM permissions to:
    - Create EKS clusters and node groups.
    - Create and attach IAM roles and policies.
    - Provision VPC, subnets, and security groups.
    - Create and manage IAM OIDC providers and service accounts.
2. `kubectl` 
3. [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)
4. [`eksctl`](https://eksctl.io/introduction/#installation)
5. Helm Installed.

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

  :::note
  Before creating the cluster, make sure a VPC and Elastic IPs are available for provisioning the SMP cluster.
  :::

1. Download the latest Helm chart from the [Harness GitHub Releases page](https://github.com/harness/helm-charts/releases?q=harness-0&expanded=true). Under the **Assets** section, locate and download the `harness-<release-version>.tgz` file.

2. Navigate to the extracted path and create a new YAML file using the configuration below. It will create an EKS cluster for your SMP environment. 
  
    This configuration sets up a cluster named `<CLUSTER-NAME>` in the `<REGION>` region with managed node groups, essential IAM policies, and networking settings required for running Harness Self-Managed Platform. 
    
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
          alpha.eksctl.io/cluster-name: <CLUSTER-NAME> # Modify this label to match the kubernetes name
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
        name: smp-aws-cl
        region: <REGION>
        # Change these tags to anything that would be helpful for your accounting
        tags:
          cluster: smp-test
          owner: <YOUR-NAME>
          purpose: sandbox-lab
          scope: smp-test
        # Currently this is the latest version of K8S supported by Harness SMP
        version: "1.31"
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

3. Check your Kubernetes context and ensure it’s set to use your AWS configuration.

    ```bash
    kubectl config current-context
    ```
    If AWS config is not set, run the following command

      ```bash
      aws eks --region=<YOUR-AWS-REGION> update-kubeconfig --cluster=<YOUR-CLUSTER-NAME>
      ```

### Step 3: Configure Amazon EBS CSI driver

  Currently, `eksctl` does not provide a built-in way to automatically attach the Amazon EBS CSI driver, which is required for provisioning Persistent Volumes (PVs). To ensure your cluster can dynamically create the necessary PVs, follow the steps below to manually set up the EBS CSI driver.

   1. Create a namespace for your deployment.

      ```bash
      kubectl create namespace <harness-namespace>
      ``` 

   2. Create an IAM role with a trust policy that allows EKS to assume the role via IRSA, and create a `trust-policy.json` file as shown below:
      
      ```json
        {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Effect": "Allow",
              "Principal": {
                "Federated": "arn:aws:iam::<AWS-ACCOUNT-ID>:oidc-provider/<OIDC-PROVIDER>"
              },
              "Action": "sts:AssumeRoleWithWebIdentity",
              "Condition": {
                "StringEquals": {
                  "<OIDC_PROVIDER>:sub": "system:serviceaccount:kube-system:ebs-csi-controller-sa"
                }
              }
            }
          ]
        }
      ```

      Once the `trust-policy.json` file is created, use the below command to create IAM role.

      ```bash
        aws iam create-role \
        --role-name AmazonEKS_EBS_CSI_DriverRole \
        --assume-role-policy-document file://trust-policy.json --region <YOUR-AWS-REGION>
      ```

    3. Get the OIDC provider using:
    
        ```bash
        aws eks describe-cluster --name <AWS_CLUSTER_NAME> --region <YOUR-AWS-REGION> --query "cluster.identity.oidc.issuer" --output text 
        ```

    4. Attach the `AmazonEBSCSIDriverPolicy` to the IAM role:
      
        ```bash
        aws iam attach-role-policy \
        --role-name AmazonEKS_EBS_CSI_DriverRole \
        --policy-arn arn:aws:iam::aws:policy/service-role/AmazonEBSCSIDriverPolicy --region <YOUR-AWS-REGION>
        ```

### Step 4: Install Self-Managed Enterprise Edition in AWS EKS

:::note Important Note
  If you are using Kubernetes 1.3x, make sure to specify the storage class in your override file as mentioned in [supported Kubernetes versions](/docs/self-managed-enterprise-edition/smp-supported-platforms#supported-kubernetes-versions).
:::

1. Open the `harness/values.yaml` file in any editor or create a new override file, and modify the following values.

    ```yaml
      global:
        #Add storageClass if you are using k8s version 1.30 or above
        storageClass: "gp2"
        storageClassName: "gp2"        
        ingress:
          enabled: "true"
          hosts: ""
          tls:
            enabled: false
        
        defaultbackend:
        # -- Create will deploy a default backend into your cluster
          create: true
        
        loadbalancerURL: ""
    ```

2. Install the Helm chart.

    ```bash
      helm install <release-name> <path-to-directory> -f <override-file>.yaml -n <harness-namespace>
    ```

3. Check and confirm that all PersistentVolumeClaims are attached to the databases in your namespace:

    ```bash
    kubectl get pvc -n hs-smp-elb
    ```

4. Attach the PersistentVolumeClaims by patching each with the 'gp2 or gp3' StorageClass in your Harness namespace using the command below

    ```bash
    kubectl get pvc -n <harness-namespace> -o jsonpath='{range .items[*]}{.metadata.name}{"\n"}{end}' | \
    while read pvc; do
      echo "Patching $pvc with gp2..."
      kubectl patch pvc "$pvc" -n <harness-namespace> --type='merge' -p '{"spec":{"storageClassName":"gp2"}}'
    done
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
      kubectl create -f loadbalancer.yaml -n <harness-namespace>
      ```

6. Get the ELB URL.

   ```bash
   kubectl get service -n <harness-namespace>
   ```

7. Make a note of the `EXTERNAL-IP` for the `harness-ingress-controller`. It should look like `<string>.us-east-2.elb.amazonaws.com`.

   ```
    NAME                         TYPE           CLUSTER-IP       EXTERNAL-IP                                                               PORT(S)                                      AGE
    default-backend              ClusterIP      10.100.54.229    <none>                                                                    80/TCP                                       38s
    harness-ingress-controller   LoadBalancer   10.100.130.107   af5b132b743fb4XXXXXXX24581119f1b-1454307465.us-east-2.elb.amazonaws.com   10254:32709/TCP,80:32662/TCP,443:32419/TCP   38s
    ```

8. Open the `harness/values.yaml` file in any editor and update your `loadbalancerURL` and `hosts` as shown below:

    ```yaml
      global:
        loadbalancerURL: "https://<YOUR_ELB_ADDRESS>"
        ingress:
          hosts: "<YOUR_ELB_ADDRESS>"
          enabled: "true" 
    ```

9. Upgrade the Helm deployment, applying your new ELB as the load balancer to your configuration.

   ```bash
    helm upgrade <release-name> <path-to-directory>/ -f override-demo.yaml -n <harness-namespace>
   ```

10. Navigate to the sign up UI at `https://<YOUR_ELB_ADDRESS>/auth/#/signup` to create your admin user.

11. Complete to the post-install next steps.

import Postinstall from '/docs/self-managed-enterprise-edition/shared/post-install-next-steps.md';

<Postinstall />