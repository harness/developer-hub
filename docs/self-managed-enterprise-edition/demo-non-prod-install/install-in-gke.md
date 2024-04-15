---
title: Install in GKE
description: Learn how to install Harness Self-Managed Enterprise Edition in GKE.
sidebar_position: 25
---

<DocsTag  backgroundColor= "#4279fd" text="Harness Demo Feature"  textColor="#ffffff"/>

This topic explains how to use Helm to install the Harness Self-Managed Enterprise Edition in Google Kubernetes Engine (GKE).

For Helm installation instructions, go to [Helm installation](/docs/category/helm-installation/) or the Harness Helm chart [readme](https://github.com/harness/helm-charts/tree/main?tab=readme-ov-file#harness-helm-charts).

## Prerequisites

This topic assumes you have experience with GKE, such as setting up projects, namespaces, and clusters.

In addition to a Harness account, you need the following:

- Access to Helm charts
- An external IP address


### Create a test cluster

To create your test cluster, do the following:


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
    | `global.loadbalancerURL`| `"https://<YOUR_IP_ADDRESS>"  `     |
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

import Postinstall from '/docs/self-managed-enterprise-edition/shared/post-install-next-steps.md';

<Postinstall />

