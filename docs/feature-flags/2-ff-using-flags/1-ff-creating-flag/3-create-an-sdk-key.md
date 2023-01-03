---
title: Create an SDK Key
description: After you’ve created your Environment , you need to create an SDK key for it. You need to use this SDK key in your application’s code to authenticate your connection to the Harness Feature Flag clien…
tags: 
   - feature flags
# sidebar_position: 2
helpdocs_topic_id: 8ja1j98xgp
helpdocs_category_id: gjyyhm9f9h
helpdocs_is_private: false
helpdocs_is_published: true
---

After you’ve [created your Environment](2-create-an-environment.md), you need to create an SDK key for it. You need to use this SDK key in your application’s code to authenticate your connection to the Harness Feature Flag client. 

:::note
 You can view and copy the SDK key only immediately after it is created. For security, after you leave the page, the key is redacted and you can’t view it. Make sure you make a copy of the key to use in your application.
:::

## Create an SDK Key

1. In the Environment you created, in **Settings**, click **Create SDK Key**.
2. In **Create SDK Key**, in **Name**, enter a name for your SDK key.
3. In **Key Type**, select either **Client** or **Server** depending on the type of SDK you want to use. For more information about the SDK types Harness supports, go to [Chose a Client-side or Server-side SDK](../../4-ff-sdks/1-sdk-overview/1-client-side-and-server-side-sdks.md). If your organization needs to rotate the keys, you can choose to add more than one key for the same Environment.
4. Click **Create**.
5. Copy and store your Secret.

:::note
 You can view and copy the SDK key only immediately after it is created. For security, after you leave the page, the key is redacted and you can’t view it. Make sure you make a copy of the key to use in your application.
:::

## Next step

After you have created an SDK Key, you can then [Create a Feature Flag](4-create-a-feature-flag.md).

