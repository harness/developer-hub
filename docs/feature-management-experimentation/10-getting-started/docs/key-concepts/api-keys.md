---
title: API key
sidebar_label: API key
helpdocs_is_private: false
helpdocs_is_published: true
description: "Authorizes communication with Harness servers"
---
import OutboundSvg from "@site/docs/feature-management-experimentation/shared/OutboundLink.mdx";
import FindAPIKeys from "@site/docs/feature-management-experimentation/shared/_find-sdk-api-key.mdx";

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360006854852-Frontend-and-backend-API-key-usage </button>
</p>

An API key is a confidential GUID string that authorizes communication with Harness servers.

**Admin API keys** are used for requests to our public <a href="https://docs.split.io">Split Admin HTTP API<OutboundSvg /></a> endpoints.

**SDK API keys** are used to download the [FME definitions](./fme-definitions.md) and to send [impressions](./impressions.md) and [events](./events.md) needed by FME to calculate monitoring and experimentation data.

:::info
<FindAPIKeys keyType='Admin API keys and SDK API keys' is='are' />
:::

In practice, you need only one client-side and one server-side API key for each environment. When you create a new environment, one key of each type is automatically created for the new environment.

There is nothing wrong with having multiple keys of the same type for the same environment, but there is no real reason to do so. Harness does not track which API key is used.

:::tip[Choose the correct type of SDK API key]
* A client-side SDK (JavaScript, iOS, Android) should be initialized with a **client-side API key**.
* A server-side SDK (Go, Java, .NET, Node.js, etc.) should be initialized with a **server-side API key**.
:::

<!-- todo: update segment endpoint details below -->

:::note[Note for developers]
The main difference between the access provided to client-side SDKs using a **client-side API key** and server-side SDKs using a **server-side API** key is the **segment information** that is retrieved. The client-side SDKs hit the endpoint `/memberships`, which only returns the segments containing the ID used to initialize the SDK. The server-side SDKs call `/segmentChanges`, which downloads the entire contents of every segment in the environment. This way, the server-side SDKs can compute treatments for any possible ID, while the client-side SDKs minimize space overhead for browsers and mobile devices by only downloading the segment information needed to process getTreatment calls for the ID specified during initialization.
:::