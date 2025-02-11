---
title: Upstream Proxy
description: Learn how to configure your artifact registries with an upstream proxy. 
sidebar_position: 40
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

An upstream proxy in Harness allows your artifact registry to automatically pull and cache artifacts from remote sources when they are not available locally. This serves as an intermediary between your registry and external repositories (e.g., Maven Central, Docker Hub). 

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
    ![](./static/create-proxy.png)
2. Enter the **Upstream Proxy Key**. This is the identifier or name for the proxy within Harness and is chosen by you. 
   
   :::tip allowed characters
    This proxy key must start with a letter and can only contain lowercase alphanumerics, `_`, `.` and `-`
   :::

3. For the source, select Docker Hub.
4. Choose your **Authentication** method. In this case, we only want to use public docker images, so we will select **Anonymous**.
5. Select **Create Upstream Proxy**.
</TabItem>
</Tabs>

