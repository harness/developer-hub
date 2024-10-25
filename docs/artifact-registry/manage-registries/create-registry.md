---
title: Create or Import Registries
description: Learn how to create and import artifact registries, including upstream proxies. 
sidebar_position: 10
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Create an artifact registry

An **Artifact Registry** is a central location for storing and managing software artifacts, such as container images or helm charts used throughout the software development lifecycle. To create one, follow these steps:

1. First, select **+ New Artifact Registry** under the **Registries** tab. 
1. Select a [registry type](/docs/artifact-registry/whats-supported#supported-registry-types). 
1. Enter a **Registry Name** and optional **Description** and **Labels**.
    :::tip
    This registry name must start with a letter and can only contain lowercase alphanumerics, `_`, `.` and `-`
    :::
1. Select **Create Registry**.

## Create an upstream proxy

An **Upstream Proxy** for an **Artifact Registry** is a proxy configuration that allows the registry to fetch artifacts from another external or remote registry. When a user requests an artifact that isn't available in the local registry, the registry directs the request to a configured upstream proxy. To create one, follow these steps: 

1. Select the dropdown next to **+ New Artifact Registry**, and then select **Upstream Proxy**.

    ![](./static/create-proxy.png)

1. Select a [registry type](/docs/artifact-registry/whats-supported#supported-registry-types).
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
