---
title: Create an Artifact Registry
description: Learn how to create artifact registries, including upstream proxies. 
sidebar_position: 10
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';



An **Artifact Registry** is a central location for storing and managing software artifacts, such as container images or helm charts used throughout the software development lifecycle.

:::info Registry Scope Levels
Artifact registries can be created at **Account**, **Organization**, or **Project** level. Navigate to the desired scope level in Harness before creating the registry to control its accessibility across your organizational structure.
:::

To create an artifact registry, follow these steps:

1. Navigate to the desired scope level (Account, Organization, or Project) where you want to create the registry.
1. Select **+ New Artifact Registry** under the **Registries** tab. 
1. Select a [registry type](/docs/artifact-registry/whats-supported#supported-registry-types). 
1. Enter a **Registry Name** and optional **Description** and **Labels**.
    :::tip
    This registry name must start with a letter and can only contain lowercase alphanumerics, `_`, `.` and `-`
    :::
1. Select Visibility between **Private** and **Public**. This will determine if the registry is accessible to all users or not.
    :::info
    Public registries allow anyone to view repository contents and pull images. Private registries restrict both visibility and image pulls to users or service accounts with the required permissions or tokens. 
    :::
    :::note Feature flag requirement
    Public registry visibility is gated by the `PL_ALLOW_TO_SET_PUBLIC_ACCESS` feature flag. The same flag controls both creating a new public registry and switching an existing registry's visibility from Private to Public. If the **Public** option is missing on the Create Registry form (or on the visibility control of an existing registry), the flag is not enabled for your account.

    To enable public registry visibility:
    1. Contact [Harness Support](mailto:support@harness.io) to activate the `PL_ALLOW_TO_SET_PUBLIC_ACCESS` feature flag for your account.
    2. In your Harness account, go to **Account Settings > Authentication** and turn on **Allow public resources**.

    Both steps are required. Go to [Change registry visibility](/docs/artifact-registry/manage-registries/configure-registry#change-registry-visibility) to switch an existing registry between Private and Public after the flag is enabled.
    :::


1. Select **Create Registry**.

<DocImage path={require('./static/create-registry.png')} width="80%" title="Create Registry form" alt="Create Registry form" />
<br/>
<br/>
> **Next steps:**
>To know about creating an upstream proxy, go to [Create an upstream proxy](/docs/artifact-registry/manage-registries/upstream-proxy).