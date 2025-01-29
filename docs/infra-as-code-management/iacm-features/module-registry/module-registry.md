---
title: Module Registry
description: Learn how to register a module in Harness IaCM
sidebar_position: 10
sidebar_label: Register modules
---

<CTABanner
  buttonText="Learn More"
  title="Pending release"
  tagline="The IaCM Module Registry feature is currently pending release and will be available soon!"
  link="https://www.harness.io/blog/harness-iacm-module-registry"
  closable={true}
  target="_self"
/>

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::warning pending release
IaCM Module Registry is currently pending release and will be available soon! [Learn more](https://www.harness.io/blog/harness-iacm-module-registry).
:::
 
The Harness IaCM Module Registry is a centralized repository where you can publish and manage versions of pre-built infrastructure modules. These modules, which include components like virtual machines, databases, and networks, can be reused by different teams, streamlining infrastructure management and ensuring consistency across projects.

### Prerequisites
Before you begin configuring module registry, ensure that you have:
- Access to your OpenTofu or Legacy Terraform environment via [Harness connectors](https://developer.harness.io/docs/infra-as-code-management/get-started/onboarding-guide#add-connectors).

:::tip delegate version
If you are using Harness to connect to your code repository, you can continue without further action.

However, if you are connecting via a [delegate](https://developer.harness.io/docs/platform/delegates/delegate-concepts/delegate-overview/), ensure the delegate version is `24.10.84200` or later
:::

## Register a module
Follow the steps in the guide below to register a new module.

<Tabs>
<TabItem value="Interactive guide">
<iframe 
    src="https://app.tango.us/app/embed/5aa16720-f96c-44f3-9ad7-2e4dce4ad3b3" 
    title="Register a module in Harness" 
    style={{ minHeight: '640px' }}
    width="100%" 
    height="100%"
    referrerpolicy="strict-origin-when-cross-origin"
    frameborder="0"
    webkitallowfullscreen="true"
    mozallowfullscreen="true"
    allowfullscreen="true"
></iframe>
</TabItem>
<TabItem value="Step-by-step">
    1. Login to [Harness](https://app.harness.io).
    2. Select **Account settings**, then select  **IaCM Module Registry** from the **Account-level resources** section.
    3. Click on **New Module** and fill in or select the following fields:
        - Name
        - Provider
        - Git Provider option
        - Repository connector 
        - Git Fetch type
        - Branch/tag
    4. Click on **Save**
    
    :::note
    Your repository connector will pull the module details to store your new module.
    :::

   Once saved, the module will now appear in the Module Registry, ready for use in projects.
</TabItem>
</Tabs>

## Review module settings
Harness pulls various details from your module and makes it easy to review them.
<iframe 
    src="https://app.tango.us/app/embed/f23cb280-5072-4622-a56b-7882cd01afff" 
    title="Review your settings for a registered module" 
    style={{ minHeight: '640px' }}
    width="100%" 
    height="100%"
    referrerpolicy="strict-origin-when-cross-origin"
    frameborder="0"
    webkitallowfullscreen="true"
    mozallowfullscreen="true"
    allowfullscreen="true"
></iframe>


:::info syncing module versions
The Sync button checks your registered module in Harness against the latest release in your repository and configured connector branch. If a newer version exists, it will sync it.
:::