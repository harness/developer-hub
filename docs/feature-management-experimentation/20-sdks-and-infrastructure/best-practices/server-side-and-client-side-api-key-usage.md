---
title: Server-side and client-side SDK API key usage
sidebar_label: Server-side and client-side API key usage
sidebar_position: 4
---

In practice, you need only a single client-side and a single server-side SDK API key for each Harness FME environment. When an environment is created, FME automatically creates one key of each type for the new environment.

There is nothing wrong with having multiple keys of the same type for the same environment, but there is no real reason to do so because FME does not currently track which API key is used.

A client-side SDK (JavaScript, iOS, Android) should be initialized with a client-side SDK API key. A server-side SDK (Go, Java, .NET, etc.) should be initialized with a server-side SDK API key. The main difference between the access provided to client-side SDKs using a client-side SDK API key and server-side SDKs using a server-side SDK API key is the way they retrieve information about segments. The client-side SDKs hit the endpoint /memberships, which only returns the segments containing the ID used to initialize the SDK. The server-side SDKs call /segmentChanges, which downloads the entire contents of every segment in the environment. This way, the server-side SDKs can compute treatments for any possible ID, while the client-side SDKs minimize space overhead for browsers and mobile devices by downloading only the segment information needed to process getTreatment calls for the ID specified during initialization.