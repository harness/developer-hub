---
title: FME SDK validation checklist
sidebar_label: SDK validation checklist
helpdocs_is_private: false
helpdocs_is_published: true
---

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/13998631077901-SDK-validation-checklist </button>
</p>

The SDK validation checklist helps you ensure that the SDK is implemented according to Split’s best practices. This document describes the guidelines for incorporating the Split SDK into your software application in all supported languages. The main purpose is to define the general guidelines, checks, and validations that can be useful for developers and software architects to avoid common mistakes or oversights and to ensure optimal performance of the Split SDK. This guide covers recommendations in the following areas:

* Architectural design principles
* Safety checks for prevention of race conditions
* Taking advantage of helpful Split features
* Configuration validation exercises

These areas each reflect best practices that come from our own experience at Split using the Split SDK, and the experiences of customers like you. In addition, they also convey an understanding of how Split SDK works beneath the surface.

You can use or adapt them to your needs. The primary objectives are to ensure resource optimization, maximum application responsiveness, appropriate security enforcements, and proactive issue detection in your project, team, organization, or company source code working with the Split SDK.

## All SDKs

The following validation considerations are relevant for all of Split’s SDKs. 

* **Ensure that the SDK is implemented in a singleton pattern.** Using the SDK as a singleton ensures that the minimum number of threads are used to serve your application. If you don’t, you can overload your infrastructure with unnecessary network traffic and use up far more application threads than is required. Use multiple clients on the client side from a single factory if you need to get treatments for multiple different traffic type ids.

* **Ensure that the SDK is blocked until it signals it’s ready.** All Split SDKs have a method that blocks the thread until the SDK is ready with feature flag and segment definitions. Calling getTreatment before the SDK is ready gives CONTROL treatments. 

* **Run the SDK with DEBUG enabled and evaluate any errors or warning messages that are thrown.** Pay attention specifically to errors or warnings related to multiple factories, missing event listeners, or other incorrect factory and client configuration. **Note: Run with debug enabled for only a few minutes.**

* **Ensure any code calling getTreatment is able to handle when ‘CONTROL’ is returned.** The SDKs return ‘CONTROL’ as a treatment string when there is a connectivity error. Ensure that there is a fall through in the if-statement to support this.

* **Validate SDK Versions are up to date.** Review the SDK tab on the Account usage data page. Ensure that the SDKs are up to date, or, at the minimum, they are on the same major version. It is helpful to establish and document a regular SDK update cadence, such as quarterly or biannually. Check the SDK CHANGES.txt on github for any SDKs you are using to see if anything may be relevant to your usage of Split.

* **Evaluate if you can take advantage of the SDK .destroy() method.** The .destroy() method of the SDK flushes all stored unpublished events and impressions. This is primarily advantageous for the client side SDKs where you have parts of the user journey that explicitly end their session. On the browser, .destroy() returns a promise. If it’s resolved, then you can be sure that all data is pushed to Split. On the server side it also may be useful in the event that you need to shutdown a service running the Split SDK. Calling .destroy() ensures that data is posted back to Split. 

* **Validate 1 minute of impressions (and events) on the Split live tail.** Enable the Query for about a minute and ensure that the number of impressions received by Split is about what you’d expect from SDK activity. 

* **If you have events coming in, validate them with a similar approach.** Ensure that events coming in have the event properties that you would expect them to have.

* **Validate that all expected attributes are being passed to the SDK.** Split’s recommendation is to wrap the SDK to ensure that attributes are always passed to the SDK. A consistent attribute set is important to ensure that all targeting rules have access to the same list of attributes. Client Side SDKs also have the ability to bind attributes to the client itself. 

* **Validate 24 hours of impressions (and events) from the Data hub.** Take a feature flag that has a known high activity and download all impressions for it from the previous 24 hour period. Ensure that the number of treatments and IDs all match with expectations. For events, take the previous full 24 hours of events, if applicable. With impressions, take note if you are seeing any ‘CONTROL’ treatments as those warrant further investigation to understand why those are happening.

* **Evaluate if you can take advantage of Flag Sets**   You can use Split Flag sets for limiting the flags downloaded by an SDK. [Flag Sets](https://help.split.io/hc/en-us/articles/22256278916621-Using-flag-sets-to-boost-SDK-performance) allow you to control from Split's UI which flags are downloaded by an SDK. This means you can ensure that only the flags needed for a frontend SDK or a backend SDK are downloaded. This reduces the time for the SDK to get ready while also saving memory and bandwidth. 

## Browser SDKs (including Angular, React, etc.)

The following items are specific to browser-based SDKs. 

* **(React-specific) Ensure that the SDK is only used in a component or higher-order component (HOC).** Review the code samples on our help center. Do not create a new factory for each time a subcomponent is rendered. 

* **Evaluate if localStorage mode is something you may be interested in.** By default, the SDK stores the cache in memory, which means every time the user visits the page, the SDK has to re-download the whole cache again.

  Using this option stores the cache in the browser file system, which improves the SDK performance after the first load. For more information, refer to [Why does the JavaScript SDK return Not Ready status in slow networks?](https://help.split.io/hc/en-us/articles/360012551371-Why-does-the-JavaScript-SDK-return-Not-Ready-status-in-Slow-Networks-) Using this option also allows users to view localStorage in their browser to see rollout plans. If you are use multiple factories, ensure that you are setting prefixes explicitly so they don’t overwrite one another’s localstorage objects.

* **Evaluate if you can take advantage of lazy loading.** The SDK factory must have the customer key at initialization time. This key might not be available initially though, especially if the key is provided from another tool (e.g., Segment or mParticle). Using the Lazy init allows you to initialize the SDK by passing a dummy key, then create a new client from the same factory object when the actual customer key is obtained.

## Mobile SDKs 

The following items are specific to the mobile SDKs. 

* **Ensure that the SDK background syncing is enabled if desired.** Mobile SDKs have the synchronizeInBackground configuration setting that allows them to synchronize to the Split cloud while in the background. By default, this is disabled.

## All Client-side SDKs (including iOS, React, JS, etc.)

The following items are specific to all client-side SDKs. This includes mobile- and browser-based SDKs. 

* **Evaluate if you can take advantage of additional SDK emitted events.** In addition to SDK_READY, client side SDKs also emit the following additional events that may be useful: 
  * SDK_READY_FROM_CACHE. The SDK is ready to evaluate using cached data (which might be stale). If conditions are met, this event is emitted almost immediately since access to the cache is synchronous. Otherwise it won't fire.
  * SDK_READY_TIMED_OUT. When this event fires, it doesn't mean the SDK initialization is interrupted. SDK_READY may still fire at a later time if or when the SDK finishes downloading the necessary information from the servers. This may happen with slow connections or environments which have many feature flags, segments, or dynamic configurations. 
  * SDK_UPDATE. This event fires whenever a feature flag or segment is changed. Use this if you want to reload your app every time you make a change in the user interface.

* **Evaluate if you need to change the flush rate.** The SDK posts impressions on frequency based on the parameter scheduler.impressionsRefreshRate. By default, the parameter is set to 60 seconds in the browser and 30 minutes in the mobile SDKs. This means after the getTreatment function is called, impressions get posted back to the Split cloud after that length of time.

  On mobile devices, if the user stays in the app for less than that amount of time, the impressions stay in the SDK cache. However, they are not posted as the posting thread has not run yet. The next time a user opens the app, the impressions are posted but this can be a few days later.

  For browsers, the JS SDKs use the beacon API to post results back to the Split cloud when the page is no longer visible.

  For experimentation, it is desired to have the results up to date. It is recommended to set the parameter scheduler.impressionsRefreshRate to a value less than the average time the user stays on the app.

## Server-side SDKs (Python, Node.js, Java, etc.)

The following items are specific to server-side SDKs. 

* **Evaluate your traffic needs.** You may need to change the impressionsRefreshrate. The SDK has threads that sync the Split information from Split cloud to the cache, and posts all impressions and events created in the cache. Make sure the SDK can handle the incoming impressions load because the SDK drops impressions if the cap is reached in the impressionsQueue and impressions can’t be evicted.

  The SDK has parameters to control the run frequency for these threads. We recommend to estimate the highest number of impressions created at peak time from incoming user sessions and divide that by the number of app servers that have the SDK to estimate the number of treatments per minute each SDK generates. Roughly, the SDK’s default impressionsQueue can handle 2000 treatments per minute. If the peak time generates higher impressions, we can reduce the value of scheduler.impressionsRefreshRate by half (for example, from 60 to 30 seconds).

**Note This traffic sizing is for pushing data back to Split cloud. Even if the impressionsQueue is full and drops impressions, serving treatments are not affected.**
