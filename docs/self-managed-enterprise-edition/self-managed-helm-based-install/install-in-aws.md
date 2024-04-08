---
title: Install in AWS
description: Learn how to install Harness Self-Managed Enterprise Edition in AWS.
sidebar_position: 20
---

<DocsTag  backgroundColor= "#4279fd" text="Harness Paid Plan Feature"  textColor="#ffffff"/>

This topic explains how to use Helm to install the Harness Self-Managed Enterprise Edition in AWS.

For Helm installation instructions, go to [Helm installation](/docs/category/helm-installation/) or the Harness Helm chart [readme](https://github.com/harness/helm-charts/tree/main?tab=readme-ov-file#harness-helm-charts).

## Prerequisites

This topic assumes you have experience with AWS, such as setting up projects, namespaces, and clusters.

In addition to a Harness account, you need the following:

- Access to an AWS project
- Access to Helm charts
- An elastic IP address

## Install in AWS

1. Create a new cluster or use an existing one.

2. Create a new namespace:

   1. Set your Kubernetes context to the AWS project you are using.

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

6. Add your elastic IP address in the following fields.

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


