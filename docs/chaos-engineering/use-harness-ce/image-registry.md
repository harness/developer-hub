---
sidebar_position: 5
title: Image Registry
description: A repository that hosts container images used by chaos experiments.
redirect_from:
- /docs/chaos-engineering/configure-chaos-experiments/image-registry
- /docs/chaos-engineering/features/image-registry
- /docs/chaos-engineering/concepts/explore-concepts/image-registry
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This topic describes using an image registry within a chaos experiment.

### What is an image registry?

An image registry is a repository that hosts container images that are used by chaos experiments. Registries can be **public** or **private**. HCE allows you to use custom image registries for chaos experiments.

A custom image registry allows for storing container images securely, restricting access to authorized users and applications only.

:::tip
- You can configure the image registry to be used with the default probes. If you haven't configured a probe yet, the experiment will use the default image registry.
- HCE doesn't provide image registry support at the moment for default probes.
:::

Follow the steps below to use [custom values](#custom-values-for-image-registry) or [default values](#default-values-for-image-registry) of the image registry in your chaos experiment.

To watch a video on configuring image registry, go to [image registry](https://youtu.be/jpSd1nGf8s0).

### Why use a Custom Image Registry?

When the image you need to use for your chaos experiment is private, and the chaos experiments are required to be run for internal consumption, you can configure image registry as **private** and provide custom values to it.
This way, you will have better control, and security when working with private images.

Depending on whether you use DDCR (Delegate Driven Chaos Runner) or dedicated chaos infrastructure, image registry settings is configured from **account**/**organization**/**project**/**infrastructure** settings or from the UI, respectively.

:::info note
Theis feature is behind the feature flag `CHAOS_IMAGEREGISTRY_DEV`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.
:::

<Tabs>
<TabItem value = "Harness Delegate / DDCR">

### Configure Image Registry from Account/Organization/Project/Infrastructure settings

With appropriate permissions, you can configure image registry from the **account** or **organization** or **project** or **infrastructure** settings.

This approach provides flexibility and ensures you can manage image registry settings at different levels.

In this example, you will learn how to configure image registry from **Account Settings**.

1. Go to **Account Settings** -> **Image Registry (For Chaos)**.

    ![account settings](./static/image-registry/account-level.png)

2. Provide registry details:
  a. Specify the server and account name. 
  b. Choose the image registry type. 
  c. Enable **Allow Overrides** option if you want to allow changes to image registry settings at lower levels, such as Organization, Project, or Infrastructure.
  For example, currently, you are in the **Account** scope. Allowing overrides will allow you to make changes to the image registry settings at the **Organization**, **Project**, and **infrastructure** levels.

    ![override settings](./static/image-registry/override.png)

3. Use Custom Images (Optional):

  a. Enable **Use custom images** if you want to provide custom images for the specified fields.
  b. Add your custom images in the fields shown in the screenshot.

    ![custom image settings](./static/image-registry/custom-img.png)

:::tip
If you enable the **Allow Overrides** option, you can configure the image registry for infrastructures that are **Supported by a Harness Delegate**:
  a. Go to Environments > Infrastructure.
  b. Click Edit.
  c. Scroll to the bottom to access the **Image Registry** settings.

  ![ir infra](./static/image-registry/ir-settings.png)
:::

</TabItem>

<TabItem value = "Dedicated chaos infrastructure">

## Custom values for image registry
### Step 1: Navigate to Image Registry

* To use a custom image, go to **Image Registry** on the left-hand side, and select **Use custom values**.

  ![select-custom](./static/image-registry/select-custom.png)

### Step 2: Specify parameters
* Specify parameters for the custom values, such as **Custom image registry server**, **Custom image registry account**, and **Registry type**.

  ![public-registry](./static/image-registry/public-registry.png)

* You can choose between **Public** or **Private** in the **Registry type**. When you select **Private** registry type, add the **secret name**.

  ![private-registry](./static/image-registry/private-registry.png)

### Step 3: Save the custom values
* Select **Save** to save your changes.

In your chaos experiment manifest, the above custom setting will be reflected below.

```yaml
container:
  name: ""
  image: docker.io/chaosnative/k8s:1.30.0
  imagePullSecrets:
   - name: defreg
  command:
    - sh
    - "-c"
  args:
    - kubectl apply -f /tmp/ -n {{workflow.parameters.adminModeNamespace}} && sleep 30
```

:::info note
* If you use a public image or provide the `imagePullSecret` while using a private registry, the Argo workflow controller (v3.4.x) finds the entry point for litmus-checker.
* If you use an image from an internal registry without providing `imagePullSecret`, the workflow facilitates a default command that you can use to determine the entry point of litmus-checker.
:::

## Default values for image registry

* To use a default image, navigate to image registry, select **Use default values**, and then select **Save**.

  ![select-save](./static/image-registry/click-save.png)

In your chaos experiment manifest, the above default setting will be reflected below.

```yaml
container:
  name: ""
  image: docker.io/chaosnative/k8s:1.30.0
  command:
    - sh
    - "-c"
  args:
    - kubectl apply -f /tmp/ -n {{workflow.parameters.adminModeNamespace}} && sleep 30
```
</TabItem>
</Tabs>

## Images required

Listed below are images that you should download to use image registry. The example below describes images required for 1.47.x release. Based on the release, the version will vary.

Go to [Delegate release](https://developer.harness.io/release-notes/delegate/) to get the latest version of Delegate image.

<Tabs>
<TabItem value = "Harness Delegate / DDCR">

- harness/chaos-ddcr:1.47.0
- harness/chaos-log-watcher:1.47.0
- harness/service-discovery-collector:0.27.0
- docker.io/harness/chaos-ddcr-faults:1.47.0

</TabItem>

<TabItem value = "Dedicated Chaos Infrastructure">

- harness/chaos-log-watcher:1.47.0
- harness/chaos-workflow-controller:v3.4.16
- harness/chaos-argoexec:v3.4.16
- harness/chaos-exporter:1.47.0
- harness/chaos-operator:1.47.0
- harness/chaos-runner:1.47.0
- harness/chaos-subscriber:1.47.0
- docker.io/harness/chaos-go-runner:1.47.0
- harness/k8s-chaos-infrastructure-upgrader:1.47.0

</TabItem>


</Tabs>