---
title: SDKs, APIs, and Integrations
sidebar_label: SDKs, APIs, and Integrations
slug: /sdks/sdks-overview
---

## Configuration Options
Statsig offers 20+ SDKs, with both client-side and server-side SDK options. At their core, Statsig’s SDKs enable two key functions: 
1. **Targeting & Assignment-** Assigning users to an experiment variant or targeting new feature roll-outs based on a user’s attributes. Target with any user or environment-level attribute you log.  
2. **Logging-** Log events for user or system-level actions, which are translated into computed Metrics for analysis within your Statsig Console.

## Client vs. Server-side SDKs
If you’ve decided to use Statsig’s SDKs, the next step is to decide how best to integrate Statsig with your client & server architecture. 

Statsig SDKs come in two main variants, **[Client SDKs](https://docs.statsig.com/client/introduction)** and **[Server SDKs](https://docs.statsig.com/server/introduction)**. These two sets of SDKs serve different purposes and are used in different parts of the feature flagging and experimentation process. The following highlights some of the key differences between them:

||Server| Client |
|--|--|--|
|Purpose | A Statsig Server SDK is used on the server-side of your application or service. It is responsible for managing feature gates, configurations, and experiments at the backend| A Statsig Client SDK is used on the client-side of your application, which could be in a mobile, web, or any other client-facing part of your product. It allows you to communicate with the Statsig servers (or a Statsig Server SDK) and make runtime decisions based on feature gates and experiments|
|Privacy | All evaluation is done on your own server, meaning users will only see what you send back to them in the response|All evaluations are precomputed on Statsig servers and sent down to you client applications. Names are obfuscated, but a savvy user may be able to glean information from the raw response|
|Performance | Evaluations are done real-time, this means that performance is directly tied to the size of your configurations. In practice however, this is rarely an issue and we strive to make our SDKs as performant as possible|As all evaluation is precomputed, gate and experiment checks are mostly a dictionary lookup with some computation used for creating and flushing exposure events|
|Propagation | The SDK will continually poll for any changes to your configurations, updating its internal state when a change is detected| Client SDKs only pull changes once during initialization. In practice, this means changes will not be observed until after an updateUser call or session restart (re-initialize)|
|Users|Server SDKs are designed to run against multiple users, and all SDK methods require a user object up front to work|Client SDKs are designed to be run with one user at a time. All evaluations are loaded once up front during initialization|
|Infrastructure | Server SDKs require you to host your own backend services| Client SDKs run entirely on the client and utilize Statsig's servers|
