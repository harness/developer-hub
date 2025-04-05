---
title: Create an Upstream Proxy
description: Learn how to configure your artifact registries with an upstream proxy. 
sidebar_position: 20
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

An upstream proxy in Harness enables your artifact registry to automatically fetch and cache artifacts from remote sources when they are not available locally. It acts as an intermediary between your registry and external repositories such as Maven Central or Docker Hub.

:::tip
The upstream proxy is essential for caching open-source dependencies. During a build, if a required dependency is not already cached, it is retrieved from a public repository and stored in the Upstream Proxy artifact tab. This ensures continuous availability, even if the source repository (e.g. Docker Hub or Maven Central) experiences downtime. Harness’s caching mechanism enhances reliability and efficiency by reducing dependency on external services and safeguarding access to critical artifacts.
:::

## Key benefits
- **Caching:** Faster access to artifacts by storing them locally once fetched.
- **Centralization:** Consolidate external repositories into one location for easier access.
- **Access Control:** Enforce your security policies while fetching artifacts.
- **Reliability:** Reduce dependency on external services by leveraging cached artifacts.

## Create an upstream proxy

<Tabs>
<TabItem value="Interactive Guide">
<DocVideo src="https://app.tango.us/app/embed/e147bc05-70a1-4c65-b828-a12a422898c2" title="Creating an Upstream Proxy in Harness Artifact Registry" />
</TabItem>
<TabItem value="Step-by-step">

1. Select the dropdown next to **+ New Artifact Registry**, and then select **Upstream Proxy**.
2. Enter the **Upstream Proxy Key**. This is the identifier or name for the proxy within Harness and is chosen by you. 
   
   :::tip allowed characters
    This proxy key must start with a letter and can only contain lowercase alphanumerics, `_`, `.` and `-`
   :::

3. For the source, select Docker Hub.
4. Choose your **Authentication** method. In this case, we only want to use public docker images, so we will select **Anonymous**.
5. Select **Create Upstream Proxy**.
</TabItem>
</Tabs>