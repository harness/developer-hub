---
title: Helm Charts Guide for Google Kubernetes Engine (GKE)
description: This guide provides detailed instructions for deploying the Harness Self-Managed Enterprise Edition on Google Kubernetes Engine (GKE) using a Helm chart.
sidebar_label: Helm Charts for GKE
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This guide provides step-by-step instructions to install the Harness Self-Managed Enterprise Edition on Google Kubernetes Engine (GKE). You’ll configure key components such as ingress, load balancer settings, and the necessary Kubernetes resources using Helm charts. 

By the end of this guide, you will have a fully functioning Harness instance running on your GKE cluster, ready for use in your environment.

### Prerequisites

Before you start, make sure you have:

- Experience with GCP (projects, clusters, and namespaces).
- A Harness account.
- Access to the [Harness Helm charts](https://github.com/harness/helm-charts/releases).
- An external static IP address in the same region as your cluster.

<Tabs>
<TabItem value="GCP">

### Step 1: Reserve an external static IP

To manually install in GCP, first reserve a static external IP address, then proceed with installing Harness Self-Managed Enterprise Edition.

1. Go to your GCP project and navigate to VPC network.

2. Select IP addresses in the left nav and choose Reserve External Static IP Address.

3. Configure the following:
   * Network Service Tier: Premium
   * IP Version: IPv4
   * Type: Regional

> **Ensure the IP address is in the same region as your cluster. Make a note of or copy the IP address for later use.**

5. Select Reserve to finalize.

### Step 2: Create a GKE Cluster

1. Go to the GKE section, navigate to **Kubernetes Engine** → **Clusters** in your [Google Cloud Console](https://console.cloud.google.com/kubernetes/clusters)

2. Click "Create", Choose **"Standard"** for full control (not Autopilot).

3. Configure your Cluster Basics

   - **Name** your cluster (e.g., `my-cluster`)
   - Select your **Region** (e.g., `us-central1`)
   - Choose the **Release Channel** (e.g., `Regular`)
   - Click "Create" to save your Cluster.

4. Configure the Default Node Pool, Scroll to the **"Default node pool"** section:

   - Set the **Machine type** (e.g., `e2-standard-2`)
   - Under **Size**, set:
     - **Minimum number of nodes**: `0`
     - **Maximum number of nodes**: `20`
   - Enable the checkbox for **Enable autoscaling**

5. Click "Create", GCP will begin provisioning your cluster with autoscaling configured.

### Step 3: Install Self-Managed Enterprise Edition in GKE

1. Set your Kubernetes context to the GCP project you are using.

      ```bash
      kubectl config get-contexts
      ```

   Select your GCP project from the list and use the below command to set the context 

      ```bash
      kubectl config use-context <GCP-project context>
      ```

2. Create a Kubernetes namespace for your SMP deployment

   ```bash
   kubectl create ns <namespace name>
   ```

3. Download the latest Helm chart from the [Harness GitHub Releases page](https://github.com/harness/helm-charts/releases?q=harness-0&expanded=true). Under the **Assets** section, locate and download the `harness-<release-version>.tgz` file.

4. Open the `override-demo.yaml` file in a file editor.

5. Add your external static IP address in the following fields.

   ```yaml
   loadbalancerURL: http://xx.xx.xx.xx
     ingress:
       # --- Enable Nginx ingress controller gateway
       enabled: true
       annotations: {}
       loadBalancerIP: xx.xx.xx.xx
       className: "harness"
       loadBalancerEnabled: true
       useSelfSignedCert: false
       ingressGatewayServiceUrl: ''
       hosts:
         - ""
   ```

6. Update `nginx`, and set `create:` to `true`.

   ```yaml
    nginx:
      create: true
   ```

7. Update `defaultbackend:`, and set `create:` to `true`.

   ```yaml
    defaultbackend:
      create: true
   ```

8. Save the file and exit.

9. Run the following from your terminal.

    ```bash
    helm install <YOUR_RELEASE_NAME> <path to Harness directory> -n <YOUR_NAMESPACE_NAME> -f override.demo.yaml
    ```

    For example:

    ```bash
    helm install test-release harness/ -n smp-test -f harness/override-demo.yaml
    ```

10. After the installation is complete, open the `loadbalancerURL` in your browser to access and sign in to the Harness UI.

</TabItem>

<TabItem value="GKE with gcloud CLI">

To install in GKE using the gcloud CLI, you first create your test cluster, then install Harness Self-Managed Enterprise Edition.
### Create a test cluster

To create your test cluster in GKE using the gcloud CLI, do the following:

1. Configure the gcloud CLI with your Google Cloud account.

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

### Install Harness Self-Managed Enterprise Edition in GKE

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

import Postinstall from '/docs/self-managed-enterprise-edition/shared/post-install-next-steps.md';

<Postinstall />

