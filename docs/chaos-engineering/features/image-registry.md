---
title: Image registry
sidebar_position: 4
description: A repository that hosts container images used by chaos experiments
redirect_from:
  - /docs/chaos-engineering/configure-chaos-experiments/image-registry
---


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


This section describes an image registry, and how it can be used within a chaos experiment. 

Image registry is a repository that hosts container images which are used by chaos experiments. Registries can be **public** or **private**. HCE allows you to use custom image registries for chaos experiments.

:::tip
- You can configure the image registry to be used with the default probes. If you haven't configured a probe yet, the experiment will use default image registry. 
- HCE doesn't provide image registry support at the moment for default probes.
:::

Follow the steps mentioned below to use default or custom values of image registry in your chaos experiment. 

<Tabs>
 <TabItem value="Custom values">

## Custom image registry
### Step 1: Navigate to Image Registry

* To use a custom image, go to **Image Registry** on the left-hand side, and select **Use custom values**.

  ![select-custom](./static/image-registry/select-custom.png)

### Step 2: Specify parameters
* Specify parameters for the custom values, such as **Custom image registry server**, **Custom image registry account**, and **Registry type**.

  ![public-registry](./static/image-registry/public-registry.png)

* You can choose between **Public** or **Private** in the **Registry type**. When you select **Private** registry type, add the **secret name**.

  ![private-registry](./static/image-registry/private-registry.png)

### Step 3: Save the custom values
* Click **Save** to save your changes.

In your chaos experiment manifest, the above custom setting will be reflected as shown below.

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

</TabItem>
 <TabItem value="Default values">

## Default image registry 

### Step 1: Navigate to Image Registry
* To use a default image, select **Use default values**, and click **Save** to save your changes. 

  ![select-save](./static/image-registry/click-save.png)

In your chaos experiment manifest, the above default setting is reflected as shown below.
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
