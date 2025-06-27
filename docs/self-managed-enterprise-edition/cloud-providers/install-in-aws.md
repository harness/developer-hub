---
title: Install Self-Managed Platform in Amazon Elastic Kubernetes Service (EKS)
description: This guide provides detailed instructions for deploying the Harness Self-Managed Enterprise Edition on Elastic Kubernetes Service (EKS).
sidebar_label: Amazon Elastic Kubernetes Service (EKS)
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This guide provides step-by-step instructions for deploying the Harness Self-Managed Platform (SMP) on Amazon EKS using Helm charts.

It outlines the necessary prerequisites, configuration steps, and recommended best practices to ensure a secure and efficient deployment on EKS.

### Prerequisites

1. [AWS account](https://console.aws.amazon.com/console/home) with necessary IAM permissions to:
      - Create EKS clusters and node groups.
      - Create and attach IAM roles and policies.
      - Provision VPC, subnets, and security groups.
      - Create and manage IAM OIDC providers and service accounts.
2. [`kubectl`](https://kubernetes.io/docs/tasks/tools/#kubectl) 
3. [`AWS CLI`](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)
4. [`eksctl`](https://eksctl.io/introduction/#installation)
5. [Helm Installed](https://helm.sh/docs/intro/install/#from-the-helm-project).

:::note
You can create an EKS cluster using either the AWS Management Console or the AWS CLI. However, this section focuses on using the `AWS CLI` and `eksctl`.

Ensure that both tools are installed and correctly configured before proceeding.
:::

### Step 1: Configure Your AWS Account

1. Open your terminal and run the following command. It will prompt you to enter your AWS credentials:

   ```bash
   aws configure
   ```

2. Provide your AWS credentials when prompted:

    - Access Key ID and Secret Access Key: You can access these from the AWS [IAM Console](https://console.aws.amazon.com/iam/home#/security_credentials).

    - Default region name: Specify the AWS region where you want to deploy the cluster (e.g., us-east-1).

    - Default output format: It's recommended to use `json`.

   Example:

   ```bash
   AWS Access Key ID [None]: YOUR_ACCESS_KEY
   AWS Secret Access Key [None]: YOUR_SECRET_KEY
   Default region name [None]: YOUR_REGION
   Default output format [None]: json
   ```

   :::warning Note
    Use Step 3 to verify that your AWS account is configured correctly.
    
    If the configuration appears saved but the verification fails, it's possible that the credentials are incorrect, expired, or lack necessary permissions.

    Alternatively, you can export the credentials as environment variables, as shown below.

     ```bash
    export AWS_ACCESS_KEY_ID=YOUR_ACCESS_KEY
    export AWS_SECRET_ACCESS_KEY=YOUR_SECRET_KEY
    export AWS_DEFAULT_REGION=YOUR_REGION
    ``` 
   :::  

3. To verify your configuration, run the following command:

   ```bash
   aws sts get-caller-identity
   ```

   If configured correctly, this command will return your AWS account information as shown below:

   ```json
    {
      "UserId": "AROASIYUWQHU2SSQKRFIB:<USER>@email-domain.xyz",
      "Account": "<ACCOUNT-ID>",
      "Arn": "arn:aws:sts::156272853481:assumed-role/AWSReservedSSO_AWSPowerUserAccess_687b2d551b4cfd18/<USER>@email-domain.xyz"
    }
   ```

   For additional help, refer to the [official AWS CLI configuration documentation](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html).


### Step 2: Provision a Cluster

  :::note
  Before creating the cluster, ensure that a VPC and Elastic IPs are available for provisioning the SMP cluster.
  :::

1. Create a new YAML file (e.g., `create-smp-cluster.yaml`) using the sample configuration provided below.
    - This configuration will provision an EKS cluster for your SMP environment.
    - The configuration sets up the following:
      - A cluster named `<CLUSTER-NAME>` in the `<YOUR-AWS-REGION>` region
      - Managed node groups
      - Required IAM policies
      - Networking settings necessary for running the Harness Self-Managed Platform
    - The configuration comes with default values suitable for sandbox or testing environments. You can customize the values such as cluster name, region, tags, and CIDR ranges as needed.

      ```yaml
      accessConfig:
        authenticationMode: API_AND_CONFIG_MAP
      apiVersion: eksctl.io/v1alpha5
      # Modify these to your target region; update again if eksctl reports an unavailable Availability Zone for EKS nodes.
      availabilityZones: #
      - <YOUR-AWS-REGION-1>
      - <YOUR-AWS-REGION-2>
      - <YOUR-AWS-REGION-3>
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
        instanceType: t3.2xlarge # Update to an instance type suitable for your workload and budget
        labels:
          alpha.eksctl.io/cluster-name: <CLUSTER-NAME> # Ensure this matches the name of your EKS cluster
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
        name: <TAGS>  # Set a unique name for the resource group or tagging identifier
        region: <YOUR-AWS-REGION> # Specify the AWS region where the cluster will be provisioned
        tags:
          cluster: <CLUSTER-NAME>
          owner: <YOUR-NAME>
          purpose: <CLUSTER-PURPOSE>  # Purpose of the cluster (e.g., dev, test, production)
          scope: <USAGE-OF-CLUSTER> # Scope or boundary of usage (e.g., team-specific, project-specific)
        version: "1.31"    # This is the latest Kubernetes version currently supported by Harness SMP
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
2. Run the following command to create the EKS cluster using the YAML configuration:

    ```bash
    eksctl create cluster -f <create-smp-cluster.yaml>
    ```
    :::info
    This command will trigger the provisioning of the entire infrastructure defined in the YAML — including the EKS control plane, node groups, VPC, IAM, and networking.
    :::

    Replace `<create-smp-cluster.yaml>` with the actual filename if you named it differently.

    On success, it outputs a final message like:

      ```bash
      [✓]  EKS cluster "<CLUSTER-NAME>" in "<YOUR-AWS-REGION>" region is ready
      [✓]  Saved kubeconfig as "~/.kube/config"
      ```

### Step 3: Verify the Cluster Deployment

After provisioning completes, verify the cluster was created successfully using the following commands:

  - Check the cluster status:

    ```bash
    eksctl get cluster --region <YOUR-AWS-REGION>
    ```
  
  - Confirm the nodes are ready:

    ```bash
    kubectl get nodes
    ```

    You should see all worker nodes in a `Ready` state, as shown in example below:

      ```bash
      NAME                                           STATUS   ROLES    AGE   VERSION
      ip-192-168-20-26.us-east-2.compute.internal    Ready    <none>   16d   v1.31.7-eks-473151a
      ip-192-168-22-217.us-east-2.compute.internal   Ready    <none>   16d   v1.31.7-eks-473151a
      ip-192-168-28-24.us-east-2.compute.internal    Ready    <none>   16d   v1.31.7-eks-473151a
      ip-192-168-40-97.us-east-2.compute.internal    Ready    <none>   16d   v1.31.7-eks-473151a
      ip-192-168-52-54.us-east-2.compute.internal    Ready    <none>   16d   v1.31.7-eks-473151a
      ip-192-168-71-199.us-east-2.compute.internal   Ready    <none>   16d   v1.31.7-eks-473151a
      ip-192-168-80-135.us-east-2.compute.internal   Ready    <none>   16d   v1.31.7-eks-473151a
      ```

  - Confirm the Kubernetes context is set:

    ```bash
    kubectl config current-context
    ```
    This should return the context of your newly created EKS cluster as shown below:

    ```bash
    <USER>@email-domain.xyz@<CLUSTER-NAME>.<REGION>.eksctl.io
    ```
    
    If AWS config is not set, run the following command

      ```bash
      aws eks --region=<YOUR-AWS-REGION> update-kubeconfig --cluster=<YOUR-CLUSTER-NAME>
      ```

    If any nodes are in a `NotReady` state or the context is incorrect, ensure your `kubectl` is configured correctly and your IAM user has the necessary permissions.

### Step 4: Configure the Amazon EBS CSI Driver

:::note
`eksctl` currently does not offer a built-in mechanism to automatically install the Amazon EBS CSI driver, which is required for provisioning Persistent Volumes (PVs) on your cluster. 
:::

To enable dynamic volume provisioning, you need to manually install and configure the EBS CSI driver using the steps below.

   1. Create a namespace for your deployment.

      ```bash
      kubectl create ns <HARNESS-NAMESPACE>
      ``` 

   2. Create an IAM role with a trust policy that allows Amazon EKS to assume the role via IAM Roles for Service Accounts (IRSA). 
   
      :::tip Get the OIDC Issuer URL for IRSA Configuration
      
            ```bash
            aws eks describe-cluster --name <AWS_CLUSTER_NAME> --region <YOUR-AWS-REGION> --query "cluster.identity.oidc.issuer" --output text 
            ```
            
            Example output:

            ```bash
            https://oidc.eks.us-east-1.amazonaws.com/id/EXAMPLEDOCID
            ```

            Use the portion after `https://` (i.e., `oidc.eks.us-east-1.amazonaws.com/id/EXAMPLEDOCID`) as the `<OIDC_PROVIDER>` in the `trust-policy.json` file.
      :::

      Begin by creating a `trust-policy.json` file with the following content:
        
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

      Once the `trust-policy.json` file is created, use the following command to create the IAM role:

      ```bash
        aws iam create-role \
        --role-name AmazonEKS_EBS_CSI_DriverRole \
        --assume-role-policy-document file://trust-policy.json --region <YOUR-AWS-REGION>
      ```



  4. Attach the `AmazonEBSCSIDriverPolicy` to the IAM role:
      
        ```bash
        aws iam attach-role-policy \
        --role-name AmazonEKS_EBS_CSI_DriverRole \
        --policy-arn arn:aws:iam::aws:policy/service-role/AmazonEBSCSIDriverPolicy --region <YOUR-AWS-REGION>
        ```

  5. Use the following script to verify that your infrastructure components are functioning correctly and ensure that your Kubernetes cluster is ready to deploy Harness Self-Managed Platform (SMP):

      <details>
        <summary>Health Check Script to verify you installation and upgrade</summary>

          ```bash
          #!/bin/bash
          set -e

          echo "Starting Kubernetes Cluster Health Check"
          echo "----------------------------------------"

          # Generate a unique ID for this run
          RUN_ID=$(date +%s)
          TEST_NAMESPACE="health-check-${RUN_ID}"
          TEST_PVC="test-pvc-${RUN_ID}"
          TEST_POD="test-pod-${RUN_ID}"

          # Colors for output
          GREEN='\033[0;32m'
          YELLOW='\033[1;33m'
          RED='\033[0;31m'
          NC='\033[0m' # No Color

          # Function to clean up resources
          cleanup() {
            echo -e "${YELLOW}Cleaning up test resources...${NC}"
            kubectl delete pod $TEST_POD --namespace=$TEST_NAMESPACE --ignore-not-found=true
            kubectl delete pvc $TEST_PVC --namespace=$TEST_NAMESPACE --ignore-not-found=true
            kubectl delete namespace $TEST_NAMESPACE --ignore-not-found=true
            echo -e "${GREEN}Cleanup completed${NC}"
          }

          # Function to print success message
          success() {
            echo -e "${GREEN}✅ $1${NC}"
          }

          # Function to print error message and exit
          fail() {
            echo -e "${RED}❌ $1${NC}"
            exit 1
          }

          # Function to print warning message
          warn() {
            echo -e "${YELLOW}⚠️ $1${NC}"
          }

          # Check if kubectl is installed
          if ! command -v kubectl &> /dev/null; then
            fail "kubectl is not installed. Please install kubectl and configure it to connect to your cluster."
          fi

          # Check if kubectl can connect to the cluster
          if ! kubectl cluster-info &> /dev/null; then
            fail "Cannot connect to Kubernetes cluster. Please check your kubeconfig file."
          fi

          # Trap for clean exit
          trap cleanup EXIT

          # Check 1: Create a test namespace
          echo "Check 1: Creating test namespace $TEST_NAMESPACE"
          if kubectl create namespace $TEST_NAMESPACE &> /dev/null; then
            success "Namespace created successfully"
          else
            fail "Failed to create namespace $TEST_NAMESPACE"
          fi

          # Check 2: List available StorageClasses
          echo "Check 2: Checking available StorageClasses"
          SC_COUNT=$(kubectl get storageclass -o name | wc -l)
          if [ "$SC_COUNT" -eq 0 ]; then
            fail "No StorageClasses found in the cluster"
          fi
          DEFAULT_SC=$(kubectl get storageclass -o=jsonpath='{.items[?(@.metadata.annotations.storageclass\.kubernetes\.io/is-default-class=="true")].metadata.name}')
          if [ -z "$DEFAULT_SC" ]; then
            warn "No default StorageClass found, will use the first available one"
            DEFAULT_SC=$(kubectl get storageclass -o=jsonpath='{.items[0].metadata.name}')
          fi
          success "Using StorageClass: $DEFAULT_SC"

          # Check 3: Create a PVC and pod together (handles WaitForFirstConsumer binding mode)
          echo "Check 3: Creating test PVC using StorageClass $DEFAULT_SC"
          cat <<EOF | kubectl apply -f - &> /dev/null
          apiVersion: v1
          kind: PersistentVolumeClaim
          metadata:
            name: $TEST_PVC
            namespace: $TEST_NAMESPACE
          spec:
            accessModes:
              - ReadWriteOnce
            resources:
              requests:
                storage: 1Gi
            storageClassName: $DEFAULT_SC
          EOF

          if [ $? -ne 0 ]; then
            fail "Failed to create PVC"
          fi

          # Check 4: Immediately create a pod that uses the PVC (for WaitForFirstConsumer binding mode)
          echo "Check 4: Creating test pod that mounts the PVC"
          cat <<EOF | kubectl apply -f - &> /dev/null
          apiVersion: v1
          kind: Pod
          metadata:
            name: $TEST_POD
            namespace: $TEST_NAMESPACE
          spec:
            containers:
            - name: busybox
              image: busybox:1.34
              command: ["sh", "-c", "echo 'Kubernetes storage test' > /data/test.txt && sleep 30"]
              volumeMounts:
              - name: test-volume
                mountPath: /data
            volumes:
            - name: test-volume
              persistentVolumeClaim:
                claimName: $TEST_PVC
            restartPolicy: Never
          EOF

          if [ $? -ne 0 ]; then
            fail "Failed to create pod"
          fi

          # Wait for both pod to be running and PVC to be bound
          echo "Waiting for pod to be running and PVC to be bound (up to 2 minutes)..."
          TIMEOUT=120
          for i in $(seq 1 $TIMEOUT); do
            POD_STATUS=$(kubectl get pod $TEST_POD -n $TEST_NAMESPACE -o=jsonpath='{.status.phase}')
            PVC_STATUS=$(kubectl get pvc $TEST_PVC -n $TEST_NAMESPACE -o=jsonpath='{.status.phase}')
            
            if [ "$PVC_STATUS" == "Bound" ] && ([ "$POD_STATUS" == "Running" ] || [ "$POD_STATUS" == "Succeeded" ]); then
              success "PVC successfully bound and pod is running"
              break
            fi
            
            if [ $i -eq $TIMEOUT ]; then
              echo "Timed out waiting. PVC status: $PVC_STATUS, Pod status: $POD_STATUS"
              kubectl get pvc $TEST_PVC -n $TEST_NAMESPACE -o yaml
              kubectl get pod $TEST_POD -n $TEST_NAMESPACE -o yaml
              kubectl get events -n $TEST_NAMESPACE
              fail "Resource creation timeout"
            fi
            
            sleep 1
            # Show a spinner to indicate progress
            printf "\r[%s]" "$(printf '=%.0s' $(seq 1 $i))"
          done
          echo ""

          # Wait for pod completion
          echo "Waiting for pod to complete..."
          TIMEOUT=60
          for i in $(seq 1 $TIMEOUT); do
            POD_STATUS=$(kubectl get pod $TEST_POD -n $TEST_NAMESPACE -o=jsonpath='{.status.phase}' 2>/dev/null)
            
            # Check for completion (either running or succeeded is good)
            if [ "$POD_STATUS" == "Succeeded" ]; then
              success "Pod completed successfully"
              break
            fi
            
            # For running pods, check if they're actually ready
            if [ "$POD_STATUS" == "Running" ]; then
              CONTAINER_READY=$(kubectl get pod $TEST_POD -n $TEST_NAMESPACE -o=jsonpath='{.status.containerStatuses[0].ready}')
              if [ "$CONTAINER_READY" == "true" ]; then
                success "Pod is running with container ready"
                break
              fi
            fi
            
            # Check for failure states
            if [ "$POD_STATUS" == "Failed" ]; then
              echo "Pod failed to run"
              kubectl get pod $TEST_POD -n $TEST_NAMESPACE -o yaml
              kubectl get events -n $TEST_NAMESPACE
              fail "Pod execution failed"
            fi
            
            # Timeout check
            if [ $i -eq $TIMEOUT ]; then
              echo "Timed out waiting for pod to complete. Current status: $POD_STATUS"
              kubectl get pod $TEST_POD -n $TEST_NAMESPACE -o yaml
              kubectl get events -n $TEST_NAMESPACE
              fail "Pod execution timeout"
            fi
            
            sleep 1
            # Show a spinner to indicate progress
            printf "\r[%s]" "$(printf '=%.0s' $(seq 1 $i))"
          done
          echo ""

          # Wait for pod to complete
          echo "Waiting for pod to complete..."
          kubectl wait --for=condition=Ready pod/$TEST_POD -n $TEST_NAMESPACE --timeout=60s &> /dev/null || true
          POD_STATUS=$(kubectl get pod $TEST_POD -n $TEST_NAMESPACE -o=jsonpath='{.status.phase}')
          if [ "$POD_STATUS" == "Running" ] || [ "$POD_STATUS" == "Succeeded" ]; then
            success "Pod completed successfully"
          else
            echo "Pod did not complete successfully. Status: $POD_STATUS"
            kubectl get pod $TEST_POD -n $TEST_NAMESPACE -o yaml
            kubectl get events -n $TEST_NAMESPACE
            fail "Pod execution failed"
          fi

          # Optional: Add additional checks here
          # DNS check
          echo "Check 5: Testing DNS resolution within the cluster"
          cat <<EOF | kubectl apply -f - &> /dev/null
          apiVersion: v1
          kind: Pod
          metadata:
            name: dns-test-pod
            namespace: $TEST_NAMESPACE
          spec:
            containers:
            - name: dns-test
              image: busybox:1.34
              command:
                - "sh"
                - "-c"
                - "nslookup kubernetes.default.svc.cluster.local > /dev/null && echo 'DNS test passed' || echo 'DNS test failed'"
            restartPolicy: Never
          EOF

          # Wait for DNS test to complete
          kubectl wait --for=condition=Ready pod/dns-test-pod -n $TEST_NAMESPACE --timeout=60s &> /dev/null || true
          DNS_TEST_RESULT=$(kubectl logs dns-test-pod -n $TEST_NAMESPACE)
          if [[ "$DNS_TEST_RESULT" == *"DNS test passed"* ]]; then
            success "DNS resolution is working correctly"
          else
            warn "DNS resolution may have issues. Check cluster DNS service."
            kubectl logs dns-test-pod -n $TEST_NAMESPACE
          fi
          kubectl delete pod dns-test-pod -n $TEST_NAMESPACE --ignore-not-found=true &> /dev/null

          echo ""
          echo -e "${GREEN}All health checks passed! ✅${NC}"
          echo -e "${GREEN}Kubernetes cluster is healthy and ready for workloads.${NC}"

          # Summary report
          echo ""
          echo "Health Check Summary:"
          echo "---------------------"
          echo "Namespace creation: ✅"
          echo "StorageClass availability: ✅"
          echo "PVC provisioning: ✅"
          echo "Pod scheduling with volume: ✅"
          echo "DNS resolution: ✅"
          echo ""
          echo "To run this health check again, execute:"
          echo "$ bash $(basename "$0")"
          ```
      </details>

        > 💡 The script checks for Kubernetes connectivity, StorageClass availability, PVC provisioning, pod scheduling, and DNS resolution.

        Save the script as `k8s-health-check.sh`, make it executable using:

        ```bash
        chmod +x k8s-health-check.sh
        ```

        Then run it with:

        ```bash
        ./k8s-health-check.sh
        ```

        If all checks pass, your cluster is healthy and ready for workloads. ✅

### Step 5: Install Self-Managed Platform in Amazon EKS

:::note Important Note
  If you are using Kubernetes 1.3x, make sure to specify the storage class in your override file as mentioned in [supported Kubernetes versions](/docs/self-managed-enterprise-edition/smp-supported-platforms#supported-kubernetes-versions).
:::

1. Download the latest Helm chart from the [Harness GitHub Releases](https://github.com/harness/helm-charts/releases?q=harness-0&expanded=true) page.

   - In the Assets section, locate and download the `harness-<release-version>.tgz` (e.g., harness-0.29.0.tgz) file.
   - Extract the downloaded file and navigate to the extracted directory.

2. Create a file named `override-new.yaml` and add the following YAML content to it.

      ```yaml
      global:
        # Required for Kubernetes v1.30 or above:
        # Explicitly define the StorageClass to ensure PVCs bind correctly.
        # "gp2" is a default AWS EBS-backed StorageClass in most EKS clusters.
        # You can also use other supported types like "gp3", depending on your storage performance and cost needs.
        storageClass: "gp2"
        storageClassName: "gp2"        
        ingress:
          enabled: "true"
          hosts: ""
          tls:
            enabled: false
        
        defaultbackend:
          create: true  # Deploys a default backend component in the cluster when set to true
        
        loadbalancerURL: ""
      ```

3. Install the Helm chart using the following command.

    ```bash
      helm install <RELEASE-NAME> <PATH-TO-EXTRACTED-FOLDER> -f override-new.yaml -n <HARNESS-NAMESPACE>
    ```

4. Verify that all PersistentVolumeClaims (PVCs) have been successfully created and are bound to their respective volumes in your namespace:

    ```bash
    kubectl get pvc -n <HARNESS-NAMESPACE>
    ```

    Replace `<HARNESS-NAMESPACE>` with the namespace where your workloads are deployed.

    if the PVCs are attached properly, their status will appear as `Bound`, as shown below. If the status remains `Pending`, proceed to step 5 to manually attach the PVCs.

    ```bash
    NAME                                          STATUS    VOLUME                                     CAPACITY   ACCESS MODES   STORAGECLASS   VOLUMEATTRIBUTESCLASS   AGE
    data-postgres-0                               Bound     pvc-328b51ff-0e4e-4594-8aa3-0334d5a61ada   8Gi        RWO            gp2            <unset>                 22m
    data-redis-sentinel-harness-server-0          Bound     pvc-80b28b73-ecaf-47ff-81e5-4ba1071fc056   10Gi       RWO            gp2            <unset>                 22m
    data-redis-sentinel-harness-server-1          Pending                                                                                       <unset>                 62s
    datadir-mongodb-replicaset-chart-0            Bound     pvc-09e78d03-8007-409e-8e60-76fcfa4594c9   20Gi       RWO            gp2            <unset>                 22m
    datadir-mongodb-replicaset-chart-1            Pending                                                                                       <unset>                 47s
    minio                                         Bound     pvc-d68cbb06-bb84-4ffd-ba83-35b7a9387137   10Gi       RWO            gp2            <unset>                 22m
    storage-volume-harness-awsnlb-timescaledb-0   Bound     pvc-3a8f10a9-e651-415a-8688-f64720ec1917   100Gi      RWO            gp2            <unset>                 22m
    timescaledb-backup-minio                      Bound     pvc-f8351e00-7466-4319-87f6-0083a6e5fe01   200Gi      RWO            gp2            <unset>                 22m
    wal-volume-harness-awsnlb-timescaledb-0       Bound     pvc-72de96b7-3fd8-4c23-ae26-c9cd3afdab15   1Gi        RWO            gp2            <unset>                 22m
    ```

5. Attach the PersistentVolumeClaims (PVCs) by patching each one with the gp2 StorageClass. While you can use other available StorageClasses (such as gp3), this installation uses gp2 by default. 

    Use the following command to apply the patch in your Harness namespace.

      ```bash
      kubectl get pvc -n <HARNESS-NAMESPACE> -o jsonpath='{range .items[*]}{.metadata.name}{"\n"}{end}' | \
      while read pvc; do
        echo "Patching $pvc with gp2..."
        kubectl patch pvc "$pvc" -n <HARNESS-NAMESPACE> --type='merge' -p '{"spec":{"storageClassName":"gp2"}}'
      done
      ```

    This command will attach the PVCs. Once completed, you can verify the attachment by repeating step 4 above.

:::info
   AWS EKS can create and attach Elastic Load Balancers as a Kubernetes Resource. For more information, go to [Application load balancing on Amazon EKS](https://docs.aws.amazon.com/eks/latest/userguide/alb-ingress.html) in the EKS documentation. 
:::

6. Create a Load Balancer by saving the following configuration to a file named `loadbalancer.yaml`, and then apply it to your cluster.

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

    After saving the file, run the following command to create the Load Balancer in your cluster.

      ```bash
      kubectl create -f loadbalancer.yaml -n <HARNESS-NAMESPACE>
      ```

7. Get the ELB URL by verifying that the LoadBalancer is provisioned and has an external IP using the command below:

   ```bash
   kubectl get svc harness-ingress-controller -n <HARNESS-NAMESPACE>
   ```
  
   Make a note of the `EXTERNAL-IP` for the `harness-ingress-controller`. It should look like `<STRING>.<YOUR-AWS-REGION>.elb.amazonaws.com`.

   ```bash
    NAME                         TYPE           CLUSTER-IP       EXTERNAL-IP                                                               PORT(S)                                      AGE
    harness-ingress-controller   LoadBalancer   10.100.130.107   af5b132b743fb4XXXXXXX24581119f1b-1454307465.us-east-2.elb.amazonaws.com   10254:32709/TCP,80:32662/TCP,443:32419/TCP   38s
    ```

8. Update the `override-new.yaml` file by adding the `loadbalancerURL` and `hosts` fields as shown below:

    ```yaml
      global:
        loadbalancerURL: "http://<YOUR_ELB_ADDRESS>"
        ingress:
          hosts: "<YOUR_ELB_ADDRESS>"
          enabled: "true" 
    ```

9. Upgrade the Helm deployment, applying your new ELB as the load balancer to your configuration.

   ```bash
    helm upgrade <RELEASE-NAME> <PATH-TO-EXTRACTED-FOLDER> -f override-new.yaml -n <HARNESS-NAMESPACE>
   ```

10. Once all components are healthy, you can access SMP by navigating to the sign-up UI at `https://<YOUR_ELB_ADDRESS>/auth/#/signup` to create your admin user.

11. Complete to the post-install next steps.

import Postinstall from '/docs/self-managed-enterprise-edition/shared/post-install-next-steps.md';

<Postinstall />