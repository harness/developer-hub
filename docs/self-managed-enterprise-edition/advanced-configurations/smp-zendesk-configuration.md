---
id: zendesk-configuration
title: Zendesk Integration for Support Tickets
sidebar_label: Zendesk Integration
description: Learn how to configure Zendesk to access support tickets directly from your Self-Managed Platform.
keywords:
  - zendesk
  - login
  - authentication
  - integration
  - configuration
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info Feature availability
This feature is available in Self-Managed Enterprise Edition 0.32.x and later. Admin access is required for "SMP Key Management" functionality.
:::

The Zendesk integration enables access to Harness support tickets from Self-Managed Platform without having to login separately from Harness SAAS. 

This integration requires generating a unique key pair where the private key remains secure on the local system while the public key is shared with Harness Support for account mapping and integration activation.

### Generate and register your SMP key

<Tabs>
<TabItem value="interactive" label="Interactive" default>
<iframe 
  src="https://app.tango.us/app/embed/b117a2ff-5f39-45c3-b08d-0a2e2415cdfa" 
  style={{minHeight: '640px'}} 
  sandbox="allow-scripts allow-top-navigation-by-user-activation allow-popups allow-same-origin" 
  title="SMP-Zendesk configuration" 
  width="100%" 
  height="100%" 
  referrerPolicy="strict-origin-when-cross-origin" 
  frameBorder="0" 
  webkitAllowFullScreen 
  mozAllowFullScreen 
  allowFullScreen
/>
</TabItem>

<TabItem value="manual" label="Manual">
1. Navigate to **Account Settings** → **General** → **SMP Key Management**.

2. Click **Generate SMP key** to create a unique public key for your account.

3. Download the public key file and send it to [Harness Support](mailto:support@harness.io) for account mapping.

    :::note
    Harness does not have access to your private keys. Only the public key is shared with Harness Support to enable this functionality.
    :::

4. **(Optional)** To rotate your key as a security best practice or if compromised, click **Rotate SMP Key** and confirm. Send the new public key to Harness Support. 

    **Important**: After rotating your key, you must send the new public key to Harness Support for remapping. The Zendesk integration will stop working until the new key is mapped to your account.

5. Once enabled, access your tickets by navigating to **Help** → **View my tickets**.

    <DocImage path={require('./static/access-tickets.png')} width="600" />
</TabItem>

</Tabs>


