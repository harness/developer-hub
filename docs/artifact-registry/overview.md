---
title: Overview
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Find the Artifact Registry module

In your [project](/docs/platform/organizations-and-projects/projects-and-organizations), select the **Artifact Registry** module in the top left. You should see the **Registries** landing page. 

The rest of this overview assumes you are working within the **Artifact Registry** module on the platform. 

## Create an artifact registry

An **Artifact Registry** is a central location for storing and managing software artifacts, such as container images or helm charts used throughout the software development lifecycle. To create one, follow these steps:

1. First, select **New Artifact Registry** under the **Registries** tab. 
1. Select a [registry type](/docs/open-source/registries/whats-supported#supported-registry-types). 
1. Enter a **Registry Name** and optional **Description** and **Labels**.
    :::tip
    This registry name must start with a letter and can only contain lowercase alphanumerics, `_`, `.` and `-`
    :::
1. Select **Create Registry**.

## Create an upstream proxy

An **Upstream Proxy** for an **Artifact Registry** is a proxy configuration that allows the registry to fetch artifacts from another external or remote registry. When a user requests an artifact that isn't available in the local registry, the registry directs the request to a configured upstream proxy. To create one, follow these steps: 

1. Select the dropdown next to **New Artifact Registry**, and then select **Upstream Proxy**.
1. Select a [registry type](/docs/open-source/registries/whats-supported#supported-registry-types).
1. Enter the **Upstream Proxy Key**. This is the identifier or name for the proxy within Gitness and is chosen by you. 
   :::tip
    This proxy key must start with a letter and can only contain lowercase alphanumerics, `_`, `.` and `-`
   :::
1. Depending on the registry, fill out any other required settings.

    <Tabs>
    <TabItem value="Docker" label="Docker">
    - Enter the proxy <b>Source</b>. Either <b>Docker Hub</b> or a <b>Custom</b> source.
    - If it's a custom source, enter the Docker <b>Remote Registry URL</b>. 
    </TabItem>

    <TabItem value="Helm" label="Helm">
    Enter the Helm <b>Remote Registry URL</b>.
    </TabItem>
    </Tabs>

1. Choose your **Authentication** method.
1. Select **Create Upstream Proxy**.

## Set an upstream proxy

After creating an upstream proxy, you can set it in your local artifact registry. To do so, follow these steps:

1. In your registry, select **Configuration**.
2. Open the **Advanced (Optional)** dropdown menu. 
3. Select **Configure Upstream**.
4. Under **Available upstream proxies**, you will see a list of available upstream proxies. Select as many as you would like. 
5. Under **Selected proxies**, you will see an ordered list of selected proxies for this registry. When the registry receives a request, the proxies will be *queried in order* from top to bottom.

## Registry configuration

To change your registry settings, go to the registry and select **Configuration**."

Here you can:
- Change your registry **Description**.
- Add a label under **Labels**.
- Set an **Upstream Proxy** under **Advanced** settings. 

## Delete a registry

1. In **Artifact Registries**, select the three dots on the right of the registry you want to delete. 
2. Select **Delete**.

OR

1. In your registry, select the three dots on the top right next to **Setup Client**.
2. Select **Delete**. 

