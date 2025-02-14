---
title: Get started with Artifact Registry
description: Build a Registry with Harness
sidebar_position: 20
sidebar_label: Get Started
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The Harness Artifact Registry module allows you to quickly and easily store your digital artifacts. 

Getting started with Artifact Registry follows these steps:
- [Create a registry](/docs/artifact-registry/get-started/quickstart#create-a-registry)
- [Create an upstream proxy](/docs/artifact-registry/get-started/quickstart#create-an-upstream-proxy)
- [Connect the upstream proxy to the registry](/docs/artifact-registry/get-started/quickstart#connect-the-upstream-proxy)
- [Use you registry](/docs/artifact-registry/get-started/quickstart#use-a-registry)

## Prerequisite
Depending on your package manager, e.g. Docker, Helm or Maven, you may need to use its associated dependencies like the Docker CLI. 

## Create a registry
<Tabs>
<TabItem value="Interactive guide">
<DocVideo src="https://app.tango.us/app/embed/e3650c96-80e9-414d-aba1-64cb0d4db24d" title="Create an Artifact Registry" />
</TabItem>
<TabItem value="Step-by-step">

1. Select **+ New Artifact Registry** under the **Registries** tab. 
2. Select a [registry type](/docs/artifact-registry/whats-supported#supported-registry-types).
3. Enter a **Registry Name** and, optionally, a **Description** or **Labels**.
    :::tip
    This registry name must start with a letter and can only contain lowercase alphanumerics, `_`, `.` and `-`
    :::
4. Select **Create Registry**.
</TabItem>
</Tabs>
---

## Create an upstream proxy
An **Upstream Proxy** in an Artifact Registry is a configuration that enables the registry to retrieve artifacts from an external or remote registry. If a requested artifact is not available locally, the registry forwards the request to the upstream proxy to fetch it. 

:::info upstream proxy usage
Upstream proxies are commonly used to manage dependencies. During a build, if an open-source dependency is not already cached in the upstream proxy, it will be fetched from a public repository. This ensures access to necessary dependencies while optimizing retrieval speed and reducing redundant downloads.
:::

To create one, follow these steps: 
<Tabs>
<TabItem value="Interactive guide">
<DocVideo src="https://app.tango.us/app/embed/4d59383b-7b7d-4355-acb7-1eed4ca657f0" title="Create an Upstream Proxy in Harness Artifact Registry" />
</TabItem>
<TabItem value="Step-by-step">

1. Select the dropdown next to **+ New Artifact Registry**, and then select **Upstream Proxy**.
2. Enter the **Upstream Proxy Key**. This is the identifier or name for the proxy within Harness and is chosen by you. 
   
   :::tip allowed characters
    This proxy key must start with a letter and can only contain lowercase alphanumerics, `_`, `.` and `-`
   :::

3. For the source, e.g. **Docker Hub**.
4. Choose your **Authentication** method. 
    - In cases where you use public images, select **Anonymous**.
5. Select **Create Upstream Proxy**.
</TabItem>
</Tabs>
---

### Connect the upstream proxy
After creating an upstream proxy, you need to set it in your artifact registry. To do so, follow these steps:

<Tabs>
<TabItem value="Interactive guide">
<DocVideo src="https://app.tango.us/app/embed/4294875b-384e-4558-839c-3f96c225a928" title="Configuring Upstream in Harness Workspaces" />
</TabItem>
<TabItem value="Step-by-step">

1. In the registry we created above, select **Configuration**.
2. Open the **Advanced (Optional)** dropdown menu. 
3. Select **Configure Upstream**.
4. Under **Available upstream proxies**, you will see a list of available upstream proxies. Select as many as you would like. 
5. Under **Selected proxies**, you will see an ordered list of selected proxies for this registry. When the registry receives a request, the proxies will be *queried in order* from top to bottom.
6. Click **Save** in the top right corner. 
</TabItem>
</Tabs>

## Use a registry
Next, use the registry we created. To do so, we will pull an artifact from the proxy, tag it, and add it to our registry. 

<Tabs>
<TabItem value="Interactive guide">
<DocVideo src="https://app.tango.us/app/embed/a6085408-4187-4d5d-90cd-08e4a2ee193d" title="Use an Artifact Registry" />
</TabItem>
<TabItem value="Step-by-step">

1. Click Setup Client.
2. Select Generate Token to generate a token to use as your password when logging into your package e.g. Docker or Maven
3. Follow the remained on-screen instruction by running the command in your terminal to pull an image and then push it to your registry.
</TabItem>
</Tabs>

:::info pull an image
When you pull an artifact, the system first checks the local registry. If the artifact is not found, it automatically queries the upstream proxy. The proxy then attempts to retrieve the artifact from the designated external source, if available. This process ensures seamless access to artifacts, even if they are not initially stored in the local registry.
:::

Now, you should see the artifact appear in your docker registry as well as the **Artifacts** tab in the left navigation panel.
That concludes the quick start guide! You should now have enough to get started with Artifact Registry. 

## See Also
To learn more go to:

- [Configure Registries](/docs/artifact-registry/manage-registries/configure-registry)
- [Manage Artifacts](/docs/artifact-registry/manage-artifacts/artifact-management)