---
title: FME payload
sidebar_label: FME payload
helpdocs_is_private: false
helpdocs_is_published: true
description: "The feature flag and segment definitions fetched by FME SDKs"
---

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360006854852-Frontend-and-backend-API-key-usage </button>
</p>

In your application code, when the SDK factory is created, the SDK fetches the feature flag definitions (including targeting rules) and segment definitions that are needed to evaluate feature flags.

:::note
The **FME payload** is also called **FME feature flag and segment definitions**, **FME definitions**, and **rollout plan**.
:::

These definitions are cached locally and updated in real-time in milliseconds using a streaming architecture.

As needed, your application makes a just-in-time call to the FME SDK in local memory, passing the feature flag name, the user ID, and optionally, a map of user or session attributes. The response is returned instantly, with no need for a network call.

As a result of this architecture, targeting decisions are made locally, in memory, from within your own application code (in milliseconds).

:::tip
You can limit the size of the FME payload fetched from Harness servers by using flag sets.
:::