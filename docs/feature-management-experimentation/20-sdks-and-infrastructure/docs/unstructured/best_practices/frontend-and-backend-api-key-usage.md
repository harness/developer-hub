---
title: Frontend and backend API key usage
sidebar_label: Frontend and backend API key usage
helpdocs_is_private: false
helpdocs_is_published: true
---

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360006854852-Frontend-and-backend-API-key-usage </button>
</p>

As a practical matter, you need only a single front end and single back end API key for each Split environment. When an environment is created, Split automatically creates one key of each type for the new environment.

There is nothing wrong with having multiple keys of the same type for the same environment, but there is no real reason to do so because Split does not currently track which API key is used.

A client-side SDK (JavaScript, iOS, Android) should be initialized with a front end API key. A server-side SDK (Go, Java, .NET, etc.) should be initialized with a back end API key. The main difference between the access provided to client-side SDKs using a front end API key and server-side SDKs using a back end API key is the way they retrieve information about segments. The client-side SDKs hit the endpoint /mySegments, which only returns the segments containing the ID used to initialize the SDK. The server-side SDKs call /segmentChanges, which downloads the entire contents of every segment in the environment. This way, the server-side SDKs can compute treatments for any possible ID, while the client-side SDKs minimize space overhead for browsers and mobile devices by only downloading the segment information needed to process getTreatment calls for the ID specified during initialization.