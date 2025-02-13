---
title: Create an Upstream Proxy
description: Learn how to configure your artifact registries with an upstream proxy. 
sidebar_position: 20
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

An upstream proxy in Harness allows your artifact registry to automatically pull and cache artifacts from remote sources when they are not available locally. This serves as an intermediary between your registry and external repositories (e.g., Maven Central, Docker Hub). 

:::tip
The upstream proxy plays a crucial role by caching open source dependencies. When building, if these dependencies aren't present in the upstream proxy cache, they must be fetched from a public repository. This initial fetch stores the dependencies in the Upstream Proxy artifact tab, ensuring they are always available locally. This is particularly beneficial when the source repository, such as Docker Hub, is temporarily unavailable. Harness's caching mechanism provides a reliable and efficient solution, reducing dependency on external services and safeguarding access to essential artifacts during server outages.
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