---
title: API keys
sidebar_label: API keys
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360019916211-API-keys <br /> ✘ images still hosted on help.split.io </button>
</p>

Split [SDKs](https://help.split.io/hc/en-us/articles/360033557092-SDK-overview) and [Admin API](https://docs.split.io/reference) both require API keys for authentication.

In Split, there are three types of keys:

* **Server-side** type API keys are recommended to use with SDKs that live in your infrastructure (for example, your servers)

* **Client-side** type API keys are for SDKs living in public environments (for example, browsers or mobile clients)

* **Admin** type API Keys are used for access to Split's [Admin API endpoints](https://docs.split.io/reference).

:::danger[Keep your Server-side and Admin keys private]
Never expose Admin and Server-side keys in untrusted contexts. Do not put your Server-side or Admin API keys in client-side JavaScript or mobile SDKs. Split has special browser keys that you can use in client-side JavaScript, Android, and iOS.
If you accidentally expose your API key, revoke it in the **APIs** tab in **Account settings**. 

Be sure to copy your API Key once it's generated. For security purposes, you won’t see the key again.
:::

# Managing your API keys

To manage your API keys, go to the **API keys** tab in your **Admin Settings** page. On this page you can:

* See a list of all your existing API keys.
* Add additional API keys by clicking **Add API key** in the top right.
* Revoke existing API keys
* Clone existing API keys

## Adding Server-side and Client-side API keys

To add one of these API keys, do the following: 

1. From the left navigation, click the **user's initials** at the bottom, and then select **Admin settings**.

2. Click **API keys**. The API key page appears.

<p>
  <img src="https://help.split.io/hc/article_attachments/15906996339725" alt="create-sdk-key.png" />
</p>

3. From the Admin API keys tab, click **Actions** and then **Create SDK API key** . The Create SDK API key view appears.

<p>
  <img src="https://help.split.io/hc/article_attachments/15907006945293" alt="create-sdk-api-key.png" />
</p>

4. Enter a name for this API Key to let other users know what it’s used for.

5. Select Server-side or Client-side as the type depending if you use this key to get treatments for a back end service or your user interface.

6. Select one environment that the key has access to fetch a feature flag  and segment information from.

7. Click the **Create API key** button to create the key.

## Adding Admin API keys

1. From the left navigation, click the **user's initials** at the bottom and then select Admin settings.

2. Click **API keys**. The API key page appears.

3. From the Admin API keys tab,  click **Actions** and then **Create Admin API**. The Create Admin API key view appears.

<p>
  <img src="https://help.split.io/hc/article_attachments/15907037233805" alt="create-admin-api-key.png" />
</p>

4. Enter a name for this API key to let other users what it's used for.

5. Select **All environments** or **Restrict to specific environments** to control the restrictions that this API Key has access to. If you select Restrict to specific environments, select one or more environments that the key has access to in one project.

6. Click the **Create API key** button. A new API key and access token are now created.

<p>
  <img src="https://help.split.io/hc/article_attachments/15907069858445" alt="admin-api-key-access-token.png" />
</p>

## Cloning API keys

The Clone API keys action creates a new API key with access levels the same as the key being cloned. To clone an API key, do the following:

1. From the left navigation, click the **user's initials** at the bottom and then select **Admin settings**.

2. Click **API keys**. The API key page appears.

3. From the Admin API keys tab,  click **Clone** on the desired key. The Clone API key view appears.

<p>
  <img src="https://help.split.io/hc/article_attachments/15907105805197" alt="clone-admin-api-key.png" />
</p>

4. Enter a new name for the cloned key.

5. The Key scope section shows the original key’s scope that is applied to this new key.

6. Click the **Clone API key** button to create the cloned key.

## Endpoint restrictions for Admin API keys

If you restrict an API Key to one or more environments, the following are the Admin API endpoints that are restricted:

* [Projects](https://docs.split.io/reference#get-workspaces) (formerly called Workspaces). All calls return a 401
* [Environments](https://docs.split.io/reference#environments-overview). All calls return a 401
* [Traffic Types](https://docs.split.io/reference#traffic-types-overview). All calls return a 401
* [Attributes](https://docs.split.io/reference#attributes-overview). All calls return a 401
* [Identities](https://docs.split.io/reference#identities-overview). All calls using an environment the key is not restricted for return a 401
* [Segments](https://docs.split.io/reference#segments-overview). All calls using an environment the key is not restricted for return a 401
* [Feature flags](https://docs.split.io/reference/feature-flag-overview). All calls using an environment the key is not restricted for return a 401
* [Change Requests](https://docs.split.io/reference#change-request-overview). All calls return a 401
* [Tags](https://docs.split.io/reference#tags-overview). All calls return a 401
