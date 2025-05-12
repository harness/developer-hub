---
title: Helm Charts Guide for Google Kubernetes Engine (GKE)
description: This guide provides detailed instructions for deploying the Harness Self-Managed Enterprise Edition on Google Kubernetes Engine (GKE) using a Helm chart.
sidebar_label: Helm Charts for GKE
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<DocsTag  backgroundColor= "#4279fd" text="Harness Demo Feature"  textColor="#ffffff"/>

## Overview
This guide provides detailed instructions for deploying Harness SMP on Google Kubernetes Engine (GKE) using Helm charts. It covers GKE-specific configurations, requirements, and best practices.

For Helm installation instructions, go to [Helm installation](/docs/self-managed-enterprise-edition/install/install-using-helm) or the Harness Helm chart [readme](https://github.com/harness/helm-charts/tree/main?tab=readme-ov-file#harness-helm-charts).

### Prerequisites

This topic assumes you have experience with GCP, such as setting up projects, namespaces, and clusters.

In addition to a Harness account, you need the following:

- Access to Helm charts
- An external static IP address

<Tabs>
<TabItem value="GCP">

To install in GCP manually, you first reserve your static IP, then install Harness Self-Managed Enterprise Edition.

### Reserve an external static IP

To reserve an external static IP in GCP, do the following:

1. Go to your GCP project.
2. Select **VPC network**. The VPC networks page opens.
3. In the left nav, select **IP addresses**. The IP addresses page opens.
4. Select **Reserve External Static IP Address**, then select the following.
   1. **Network Service Tier:** Premium.
   2. **IP Version:** IPv4.
   3. **Type:** Regional.

      :::info
      Make sure the IP address is in the same region as your cluster. Make a note of or copy the IP address. You'll need it later in the installation process.
      :::

5. Select **Reserve**.

### Install Harness Self-Managed Enterprise Edition in GCP

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

</Tabs>

import Postinstall from '/docs/self-managed-enterprise-edition/shared/post-install-next-steps.md';

<Postinstall />

