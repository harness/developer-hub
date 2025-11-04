---
title: Create an Upstream Proxy
description: Learn how to configure your artifact registries with an upstream proxy. 
sidebar_position: 20
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

An **Upstream Proxy** in Harness Artifact Registry is a proxy configuration that allows your registry to automatically fetch and cache artifacts from external or remote registries. When a user requests an artifact that isn't available locally, the registry directs the request to the configured upstream proxy, retrieves the artifact, and caches it for future use.

:::tip Why use an upstream proxy?
The upstream proxy is essential for caching open-source dependencies. During a build, if a required dependency is not already cached, it is retrieved from a public repository (e.g., Docker Hub or Maven Central) and stored in your Upstream Proxy. This ensures continuous availability, even if the source repository experiences downtime. Harness's caching mechanism enhances reliability and efficiency by reducing dependency on external services and safeguarding access to critical artifacts.
:::

## Key benefits

- **Caching:** Faster access to artifacts by storing them locally once fetched
- **Centralization:** Consolidate external repositories into one location for easier management
- **Access Control:** Enforce your security policies while fetching artifacts
- **Reliability:** Reduce dependency on external services by leveraging cached artifacts

## Create an upstream proxy

<Tabs>
<TabItem value="Interactive Guide">
<DocVideo src="https://app.tango.us/app/embed/e147bc05-70a1-4c65-b828-a12a422898c2" title="Creating an Upstream Proxy in Harness Artifact Registry" />
</TabItem>
<TabItem value="Step-by-step">

To create an upstream proxy, follow these steps:

1. Select the dropdown next to **+ New Artifact Registry**, and then select **Upstream Proxy**.

2. Select a [registry type](/docs/artifact-registry/whats-supported#supported-registry-types).

3. Enter the **Upstream Proxy Key**. This is the identifier or name for the proxy within Harness and is chosen by you.
   
   :::tip Allowed characters
   The proxy key must start with a letter and can only contain lowercase alphanumerics, `_`, `.` and `-`
   :::

4. Depending on the registry type, configure the source settings:

    <Tabs>
    <TabItem value="Docker" label="Docker">
    
    - Enter the proxy **Source**: Either **Docker Hub** or a **Custom** source
    - If it's a custom source, enter the Docker **Remote Registry URL**
    
    </TabItem>
    <TabItem value="ECR" label="ECR">
    
    - Select the **AWS ECR** source
    - Enter the **ECR Remote Registry URL**

    :::info AWS ECR URL format
    Your AWS Elastic Container Registry (ECR) URL will be in this format:  
    `https://{region}.console.aws.amazon.com/ecr/repositories/{public-or-private}/{repo-id}/{repo-name}?region={region}`
    :::
    
    </TabItem>
    <TabItem value="Helm" label="Helm">
    
    - Enter the Helm **Remote Registry URL**
    
    </TabItem>
    </Tabs>

5. Choose your **Authentication** method:

   :::note Public vs Private authentication
   - Select **Access Key and Secret Key** for private sources
   - Select **Anonymous (No credentials required)** for public sources
   :::

6. Select **Create Upstream Proxy**.

</TabItem>
</Tabs>

> **Next steps:**
>After you've created your upstream proxy, you will need to set it in a registry. To learn how to do so, go to [Set an upstream proxy](/docs/artifact-registry/manage-registries/configure-registry#set-proxy-for-registry).