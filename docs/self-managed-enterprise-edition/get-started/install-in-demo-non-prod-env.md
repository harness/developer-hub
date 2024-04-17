---
title: Install Harness Self-Managed Enterprise Edition in a demo/non-production environment
sidebar_label: Install in a demo/non-prod environment
description: Harness supports Self-Managed Enterprise Edition installation in your cloud provider for demo/non-production environments. Tutorials are available for you to learn about your installation options.
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<DocsTag  backgroundColor= "#4279fd" text="Harness Demo Feature"  textColor="#ffffff"/>

For organizations planning to deploy Harness Self-Managed Enterprise Edition in a production environment, Harness requires that you engage with our Post-Sales Engineering team. This will ensure that we can assist you in setting up and deploying the platform to meet your enterprise-grade objectives such as high availability, build speed, and data reliability.

On the other hand, if you intend to use Harness Self-Managed Enterprise Edition for demonstration, non-production development, or capability assessment purposes, we offer tutorials to help you get started quickly on various providers. These tutorials are designed to be analogous to the methodologies utilized internally at Harness for deployment testing.

## Demo/non-production installation requirements

Regardless of the cloud or Kubernetes provider you use, validate the following before you install Harness Self-Managed Enterprise Edition:

- Your provider can meet the infrastructure requirements for our [development environment reference architecture](/docs/self-managed-enterprise-edition/self-managed-helm-based-install/harness-helm-chart/#development-environment-deployment-infrastructure).
- You utilize a [Supported Kubernetes version](/docs/self-managed-enterprise-edition/smp-supported-platforms/#supported-kubernetes-versions).
- You have a recent version of kubectl and a [supported Helm client](/docs/self-managed-enterprise-edition/self-managed-helm-based-install/install-harness-self-managed-enterprise-edition-using-helm-ga/#helm-client-version-compatibility).
- You have the ability to provision and use Persistent Volumes (this is often taken care of by various block storage drivers within your cloud platform, such as the [EBS CSI Driver](https://docs.aws.amazon.com/eks/latest/userguide/ebs-csi.html) for Amazon EKS).

## Quickstart architecture

Regardless of the cloud provider you use, our Quickstart process attempts to deploy an architecture that matches this reference:

![Quickstart architecture](./static/smp-quickstart-arch.png)

## Quickstart networking

Harness Self-Managed Enterprise Edition's Helm deployment has methods to configure connections to existing production ingress controllers and load balancers your operations might currently use.

Harness Helm charts also ship with configurations for both an out-of-the-box NGINX ingress controller and a load balancer. You can set up and deploy these configurations to simplify the deployment process and modify them later to fit your production-level requirements.

## Demo/non-prod installation

<Tabs>
<TabItem value="Amazon EKS">

#### Prerequisites

This topic assumes you have experience with AWS EKS, such as setting up projects, namespaces, and clusters.

In addition to a Harness account, you need the following:

- Access to an AWS EKS project
- Access to Helm charts
- An elastic IP address

##### Create a test cluster

Before you install Harness Self-Managed Enterprise Edition, you must create a test cluster.

To create a test cluster, do the following:

1. Install and configure eksctl.
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

   1. Create an IAM role for your EKS cluster to utilize the EBS CSI Driver

   2. Enable the EBS CSI Driver for your EKS cluster

eksctl should automatically configure a Kubernetes config for your kubectl within your terminal session. If not, ensure you have a connection to your new cluster. For more information, go to [Getting started with Amazon EKS – AWS Management Console and AWS CLI](https://docs.aws.amazon.com/eks/latest/userguide/getting-started-console.html#eks-configure-kubectl) in the AWS EKS documentation.

#### Install Harness Self-Managed Enterprise Edition in AWS EKS

1. Create a namespace for your deployment.

   ```
   kubectl create namespace harness
   ```

2. Retrieve and extract the latest [Harness Helm charts](https://github.com/harness/helm-charts/releases). The harness charts will look like `harness-<version_number>`.

3. Open the `harness/override-demo.yaml` file in any editor, and modify the following values.


    | Key                       | Value     |
    | ----------------------------------- | --------------------- |
    | `global.ingress.enabled`| `true`|
    | `global.loadbalancerURL`| `""`|
    | `global.ingress.hosts`| `""`|


4. Install the Helm chart.

   ```
    helm install harness harness/ -f override-demo.yaml -n harness
    ```

   As EKS has the ability to create and attach Elastic Load Balancers as a Kubernetes Resource. For more information, go to [Application load balancing on Amazon EKS](https://docs.aws.amazon.com/eks/latest/userguide/alb-ingress.html) in the AWS EKS documentation. For this tutorial, we'll take advantage of this functionality by creating our Load Balancer first manually.

5. Save the reference `loadbalancer.yaml` file and apply it into your cluster.

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

7. Open the `harness/override-demo.yaml` file in any editor and modify the following values.

    | Key                       | Value     |
    | ----------------------------------- | --------------------- |
    | `global.ingress.enabled`| `true`|
    | `global.loadbalancerURL`| `"https://<YOUR_ELB_ADDRESS>"`    |
    | `global.ingress.hosts`| `"<YOUR_ELB_ADDRESS>"` |


8. Upgrade the Helm deployment, applying your new ELB as the load balancer to your configuration.

   ```
   helm upgrade harness harness/ -f override-demo.yaml -n harness
   ```

9. kubectl destroy two pods to inherit the new configuration.
   - The ingress controller pod (for example, `harness-ingress-controller-7f8bc86bb8-mrj94`)
   - The gateway pod (for example, `gateway-59c47c595d-4fvt2`)

10. Navigate to the sign up UI at `https://<YOUR_ELB_ADDRESS>/auth/#/signup` to create your admin user.
11. Complete to the post-install next steps.

</TabItem>

<TabItem value="Google Cloud Platform (GCP)">

#### Prerequisites

This topic assumes you have experience with GCP, such as setting up projects, namespaces, and clusters.

In addition to a Harness account, you need the following:

- Access to a GCP project
- Access to Helm charts
- An available external static IP address, if you don't have one available, you can create one using the steps below.

#### Reserve an external static IP

Before you install Harness Self-Managed Enterprise Edition, you must reserve an external static IP address.

To reserve an external static IP address, do the following:

   1. Go to your GCP project.
   2. Select **VPC network**. The VPC networks page opens.
   3. In the left nav, select **IP addresses**. The IP addresses page opens.
   4. Select **Reserve External Static IP Address**, then select the following.
      1. **Network Service Tier:** Premium.
      2. **IP Version:** IPv4.
      3. **Type:** Regional.

      :::note
      Make sure the IP address is in the same region as your cluster. Make a note of or copy the IP address. You'll need it later in the installation process.
      :::

   5. Select **Reserve**.

#### Install Harness Self-Managed Enterprise Edition in GCP

1. Create a new cluster or use an existing one.

2. Create a new namespace:

   1. Set your Kubernetes context to the GCP project you are using.

   2. Run the following

      ```
      kubectl create ns <namespace name>
      ```

3. Download the latest charts from the Harness Helm chart [repo](https://github.com/harness/helm-charts/releases).

    :::info
    Charts are located under **Assets**. The file name looks like `harness-0.15.0.tgz`.
    :::

4. Extract the `*.tgz` file.

5. Open the `override-demo.yaml` file in a file editor.

6. Add your external static IP address in the following fields.

   ```yaml
   loadbalancerURL: http://xx.xx.xx.xx
   ```

   ```yaml
   loadBalancerIP: xx.xx.xx.xx
   ```

7. Set the following fields.

   ```yaml
   loadbalancerURL: http://xx.xx.xx.xx
     ingress:
       # --- Enable Nginx ingress controller gateway
       enabled: true
       annotations: {}
       loadBalancerIP: 34.136.145.137
       className: "harness"
       loadBalancerEnabled: true
       useSelfSignedCert: false
       ingressGatewayServiceUrl: ''
       hosts:
         - ""
   ```

8. Search for "nginx:", and set `create:` to `true`.

   ```yaml
    nginx:
      create: true
   ```

9. Search for "defaultbackend:", and set `create:` to `true`.

   ```yaml
    defaultbackend:
      create: true
   ```

10. Save the file and exit.

11. Run the following from your terminal.

    ```
    helm install <YOUR_RELEASE_NAME> <path to Harness directory> -n <YOUR_NAMESPACE_NAME> -f override.demo.yaml
    ```

    for example:

    ```
    helm install test-release harness/ -n smp-test -f harness/override-demo.yaml
    ```

12. After the installation is complete, paste the `loadbalancerURL` in your browser's address bar, and then sign in to the Harness UI.
13. Complete to the post-install next steps.

</TabItem>


<TabItem value="Google Kubernetes Engine (GKE)">

#### Prerequisites

This topic assumes you have experience with GKE, such as setting up projects, namespaces, and clusters.

In addition to a Harness account, you need the following:

- Access to Helm charts
- An external IP address

#### Create a test cluster

Before you install Harness Self-Managed Enterprise Edition, you must create a test cluster.

To create a test cluster, do the following:

1. Configure the gcloud cli with your Google Cloud account.

   :::info
   These can also be run in the Google Cloud Shell. For more information, go to [Google Cloud Shell](https://cloud.google.com/shell).
   :::

2. Run the following GKE cluster configuration, modifying the `< >` enclosed values with those from your own environment.

   ```
   gcloud beta container --project <gcp_project> clusters create "<cluster_name>" --no-enable-basic-auth --cluster-version "1.27.8-gke.1067004" --release-channel "regular" --machine-type "e2-standard-8" --image-type "COS_CONTAINERD" --disk-type "pd-balanced" --disk-size "100" --metadata disable-legacy-endpoints=true --scopes "https://www.googleapis.com/auth/devstorage.read_only","https://www.googleapis.com/auth/logging.write","https://www.googleapis.com/auth/monitoring","https://www.googleapis.com/auth/servicecontrol","https://www.googleapis.com/auth/service.management.readonly","https://www.googleapis.com/auth/trace.append" --num-nodes "7" --logging=SYSTEM,WORKLOAD --monitoring=SYSTEM --enable-ip-alias --network "projects/<gcp_project>/global/networks/default" --subnetwork "projects/<gcp_project>/regions/us-central1/subnetworks/default" --no-enable-intra-node-visibility --default-max-pods-per-node "110" --security-posture=standard --workload-vulnerability-scanning=disabled --no-enable-master-authorized-networks --addons HorizontalPodAutoscaling,HttpLoadBalancing,GcePersistentDiskCsiDriver --enable-autoupgrade --enable-autorepair --max-surge-upgrade 1 --max-unavailable-upgrade 0 --binauthz-evaluation-mode=DISABLED --enable-managed-prometheus --enable-shielded-nodes --node-locations "<zone, example: us-central1-c>" --zone <zone, example: us-central1-c>
   ```

3. Create a Static IP in the same zone as your GKE cluster.

   ```
   gcloud compute addresses create smp-test-ip --project=<gcp_project> --region=<example: us-central1>
   ```

4. Retrieve and note your IP address.

   ```
   gcloud compute addresses describe smp-test-ip --region <region>
   ```

5. Get a Kubernetes config for your new cluster.

   ```
   gcloud container clusters get-credentials smp-cluster --zone <zone, example: us-central1-c> --project <gcp_project>
   ```

#### Install Harness Self-Managed Enterprise Edition in GKE

1. Create a namespace for your deployment.

   ```
   kubectl create namespace harness
   ```

2. Retrieve and extract the latest [Harness Helm charts](https://github.com/harness/helm-charts/releases). The harness charts will look like `harness-<version_number>`.

3. Open the `harness/override-demo.yaml` file in any editor, and modify the following values.

   | Key                       | Value     |
    | ----------------------------------- | --------------------- |
    | `global.ingress.enabled`| `true`|
    | `global.loadbalancerURL`| `"https://<YOUR_IP_ADDRESS>"` |
    | `global.ingress.hosts`| `""`|
    |`global.ingress.loadBalancerIP`|`<YOUR_IP_ADDRESS>`|
    |`global.ingress.loadBalancerEnabled`|`true`|
    |`platform.bootstrap.networking.defaultbackend.create`|`true`|
    |`platform.bootstrap.networking.nginx.create`|`true`|
    |`platform.bootstrap.networking.nginx.loadBalancerEnabled`|`true`|
    |`platform.bootstrap.networking.nginx.loadBalancerIP`|`<YOUR_IP_ADDRESS>`|

4. Install the Helm chart.

   ```
    helm install harness harness/ -f override-demo.yaml -n harness
    ```

5. Navigate to the sign up UI at `https://<YOUR_IP_ADDRESS>/auth/#/signup` to create your admin user.

6. Complete to the post-install next steps.

</TabItem>
</Tabs>

## Post-install next steps

1. Deploy the Harness modules you want to use. For more information, go to [Deploy Harness modules](/docs/self-managed-enterprise-edition/self-managed-helm-based-install/install-harness-self-managed-enterprise-edition-using-helm-ga/#deploy-harness-modules).
2. Add your Harness license. For more information, go to [Add a Harness license](/docs/self-managed-enterprise-edition/self-managed-helm-based-install/install-harness-self-managed-enterprise-edition-using-helm-ga/#add-a-harness-license).
3. Configure SMTP to allow for additional user invitations. For more information, go to [Add SMTP configuration](https://developer.harness.io/docs/platform/notifications/add-smtp-configuration/).


