---
title: How to build a resilient integration
sidebar_label: How to build a resilient integration
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/25255992258701-How-to-build-a-resilient-integration </button>
</p>

Split is built to be resilient. Our service is built atop AWS, with its best in class SLAs for uptime, and across multiple geo locations. The splits and segments you define through Split's web console are served to the SDKs running in your apps through Fastly's CDN to ensure your rollout plans are always available. You can read more on Split's commitment to reliability [here](https://www.split.io/trust/reliability/).

Even so, it is always a good idea to prepare yourself for events such as a Split outage or network issues preventing your applications from reaching Split. In this article we'll touch on what to expect from a service outage and how you can shield yourself to keep the impact to your services to a minimum.

## What to expect if there’s a Split outage

When using Split, you first define your rollout plans through our web console, then consume these rollout plans in your code using our SDKs. These two parts are independent and an outage in either will have different implications for you.

## Web console and rollout plans

If Split's web console is not available you will not be able to change your rollout plans or kill a feature until access is restored. This does not mean that the behavior for your applications or the treatments served to your customers will change, as the most up to date rollout plans will still be served to the SDKs running in your code after downloading from Split's CDN.

## SDKs

All of our SDKs work with a local cache of feature flag and segment definitions to evaluate treatments for you. This means that, once initialized, they don't need to reach Split in order to calculate treatments for you.

**Client side SDKs** can make use of a persistent cache in the device to initialize even if they can't reach Split's servers. For web SDKs this persistent cache needs to be enabled through the factory configuration. Upon instantiation the SDK factory will first parse any existing cache and emit the `SDK_READY_FROM_CACHE` event, at which point it will be able to calculate treatments according to the feature flag and segment definitions that existed the last time it was able to sync with Split. If at the time of initialization the SDK is not able to reach Split, the SDK will emit the `SDK_READY_TIMED_OUT` event if it's enabled through the factory configuration. It is important to note that even after that event is emitted the SDK will continue to attempt to initialize and may emit the `SDK_READY` event at a later time if connectivity to Split is restored.

**Server side SDKs** will behave differently during initialization without connectivity to Split depending on their operation mode:

**Producer mode:** This is the default operation mode. In this mode the SDK will fetch feature flag and segment definitions from Split upon instantiation and will cache them in memory. If Split is not reachable the SDK will not be able to fetch feature flag and segment definitions and calling the `BlockUntilReady` method will result in a Timeout Exception being raised. Even if the Timeout Exception is raised, the SDK will continue to attempt to reach Split through an exponential backoff mechanism and may be able to fetch your feature flag and segment definitions at a later time if connectivity is restored,
**Consumer mode:** In this mode the SDK does not maintain an in-memory cache of definitions, but rather consumes them from a Redis instance in your infrastructure which is maintained by a [Synchronizer](https://help.split.io/hc/en-us/articles/360019686092-Split-Synchronizer) instance. Since the SDK is not communicating directly to Split it can initialize normally, even in the event of an outage, as long as the Redis instance is populated with your feature flag and segment definitions.

## Additional infrastructure

Similar to SDKs, any running instances of the Proxy, Synchronizer or Evaluator will continue to work even if connectivity to Split is lost, and will automatically recover and sync your rollout plans to their latest versions once Split is reachable again.

## How to shield yourself

These are some measures that can be taken in order to keep an outage's impact to your applications to a minimum.

## Infrastructure redundancy

There are additional pieces of infrastructure that can provide an additional layer of redundancy so that your SDKs can continue to operate normally during an outage.

The [Split Proxy](https://help.split.io/hc/en-us/articles/4415960499213-Split-Proxy) acts as an intermediary between Split and your SDKs. Similar to the way SDKs fetch feature flag and segment data from Split and cache them in memory, the proxy maintains an in-memory cache of feature flag and segment definitions to serve to downstream SDKs. In this way, SDKs consuming the Proxy can initialize even if Split is not reachable. Additionally, a Split Proxy instance can be started from a snapshot file containing your rollout plans, allowing you to spin up a Proxy instance even is Split is not reachable.

The [Split Synchronizer](https://help.split.io/hc/en-us/articles/360019686092-Split-Synchronizer) can also provide redundancy by allowing SDKs to initialize as consumers of your Redis cache even when Split is not reachable, although if redundancy is all that is needed the Proxy is a better alternative for easier deployment and maintenance in most cases.

## Coding best practices

### Handle SDK timeouts gracefully

For server side SDKs, this means catching and handling the Timeout Exception raised by the blockUntilReady method.

For client side SDKs you can set up a listener for the SDK_READY_TIMED_OUT event.

Note that:

* A timed out SDK can still be queried for treatments, but it will return control treatments.
* Even after timing out the SDK will continue to attempt initialization following an exponential backoff mechanism, which means it may become ready at some point later in time if Split becomes reachable.

### Account for the control treatment

In case Split is unreachable and the SDK is unable to fetch feature flag definitions - and there is no cache available in the case of client side SDKs - any evaluations will return the [control treatment](https://help.split.io/hc/en-us/articles/360020528072-Control-treatment). Make sure you code your application so that it is able to safely handle this situation. This may mean falling back to a safe behavior, such as turning an experimental feature off.

## Split's status page

Split reports any disruptions to its services in the [status page](https://status.split.io/). You can subscribe to the status page to get notified whenever an incident is reported. In the status page you will see the status for Split's various components:

* **SDK API:** this API serves rollout plans for our SDKs. A service disruption could prevent new SDK instances from initializing if your rollout plans aren't yet cached in Split's CDN as a result of previous requests by other SDK instances, and running SDK instances would not be able to fetch rollout plan changes.
* **API:** Split's [public API](https://docs.split.io/reference/introduction).
* **Web console:** a web console outage means users can't log into Split's web application to modify rollout plans. Existing rollouts plans will continue to be served to Split SDKs in your applications and you end users' experience will be unaffected.
* **Data processing:** issues in this component will impact Split's ability to ingest [impression](https://help.split.io/hc/en-us/articles/360020585192-Impressions) and [event](https://help.split.io/hc/en-us/articles/360020585772-Events) data. This will also affect Live tail, alerts, experimentation, and impression webhooks. SDKs mitigate issues in our data processing pipeline by following a retry mechanism when they fail to post data back to Split.  Data processing issues are usually temporal, delaying ingestion and rarely resulting in data loss. 
* **Integrations:** this component will reflect issues with any of Split's various [integrations](https://help.split.io/hc/en-us/categories/360001538192-Integrate-automate). The integrations affected will be noted in the status page update and if the issue lies with an integration partner it will be noted and tracked.
* **CDN:** issues with our CDN may prevent new SDK instances from fetching rollout plans during initialization. For server side SDKs this will result in treatment evaluations returning control treatments. For client side SDKs evaluations will return treatments according to the rollout plans already cached in the device, if a cache is available.
* **Streaming Authentication Service:** issues in this component will prevent SDKs from receiving rollout plan updates via push notifications. In this scenario all SDKs will fall back to polling to fetch updates with no impact to your end users.
* **Documentation:** this component has no impact on any of Split's services.