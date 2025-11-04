---
title: Create an Artifact Registry
description: Learn how to create artifact registries, including upstream proxies. 
sidebar_position: 10
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';



An **Artifact Registry** is a central location for storing and managing software artifacts, such as container images or helm charts used throughout the software development lifecycle. To create one, follow these steps:

1. First, select **+ New Artifact Registry** under the **Registries** tab. 
1. Select a [registry type](/docs/artifact-registry/whats-supported#supported-registry-types). 
1. Enter a **Registry Name** and optional **Description** and **Labels**.
    :::tip
    This registry name must start with a letter and can only contain lowercase alphanumerics, `_`, `.` and `-`
    :::
1. Select Visibility between **Private** and **Public**. This will determine if the registry is accessible to all users or not.
    :::info
    Public registries allow anyone to view repository contents and pull images. Private registries restrict both visibility and image pulls to users or service accounts with the required permissions or tokens. 
    :::
    :::note Feature Flag Requirement
    To create a public artifact registry, the feature flag `PL_ALLOW_TO_SET_PUBLIC_ACCESS` must be enabled. Contact [Harness Support](mailto:support@harness.io) to activate it. Then, in your Harness account, go to **Account Settings > Authentication** and turn on **Allow public resources** to make the registry publicly accessible.
    :::


1. Select **Create Registry**.

<DocImage path={require('./static/create-registry.png')} width="80%" title="Create Registry form" alt="Create Registry form" />
<br/>
<br/>
> **Next steps:**
>To know about creating an upstream proxy, go to [Create an upstream proxy](/docs/artifact-registry/manage-registries/upstream-proxy).