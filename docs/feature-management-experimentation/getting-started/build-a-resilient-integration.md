---
title: Build a Resilient Integration
sidebar_label: Build a Resilient Integration
description: Learn how to build a resilient integration with Harness FME.
sidebar_position: 8
redirect_from:
  - /docs/feature-management-experimentation/getting-started/overview/build-a-resilient-integration
---

Harness FME is built to be resilient. Our service is built atop AWS, with its best-in-class SLAs for uptime, and across multiple geolocations. The feature flags and segments you define through Harness FME's web console are served to the SDKs running in your apps through Fastly's CDN to ensure your rollout plans are always available.

Even so, it is always a good idea to prepare yourself for events such as a Harness FME outage or network issues preventing your applications from reaching Harness FME. In this article we'll touch on what to expect from a service outage and how you can shield yourself to keep the impact to your services to a minimum.

## What to expect if there’s a Harness FME outage

Harness FME reports any disruptions to its services on the [status page](https://status.harness.io/), where you can subscribe to get notified whenever an incident is reported.

The status page tracks the following components:

* **SDK API**: This API serves rollout plans for FME SDKs. A service disruption could prevent new SDK instances from initializing if your rollout plans are not yet cached in the CDN as a result of previous requests by other SDK instances, and running SDK instances would not be able to fetch rollout plan changes.
* **Admin API**: The [Admin API](https://docs.split.io) is used to manage feature flags, segments, and other objects programmatically, and to send bulk event and impression uploads.
* **Streaming service**: Issues in this component will prevent SDKs from receiving rollout plan updates and authenticating to the streaming service via push notifications. In this scenario, all SDKs fall back to polling to fetch updates with no impact to your end users.
* **Management Console**: A Management Console outage means users cannot log in to the web application to modify rollout plans. Existing rollout plans continue to be served to SDKs in your applications, so your end users' experience is unaffected.
* **Data processing**: Issues in this component affect the ability to ingest [impression](/docs/feature-management-experimentation/feature-management/monitoring-analysis/impressions) and [event data](/docs/feature-management-experimentation/release-monitoring/events/). This also affects Live tail, alerts, experimentation, and impression webhooks. SDKs mitigate issues in the data processing pipeline by following a retry mechanism when they fail to post data back to Harness FME. Data processing issues are usually temporary, delaying ingestion and rarely resulting in data loss.
* **Integrations**: This component reflects issues with any of the various [integrations](/docs/feature-management-experimentation/integrations). The integrations affected are noted in the status page update, and if the issue lies with an integration partner it is noted and tracked.
* **CDN**: Issues with the CDN may prevent new SDK instances from fetching rollout plans during initialization. For server-side SDKs, this results in treatment evaluations returning control treatments. For client-side SDKs, evaluations return treatments according to the rollout plans already cached on the device, if a cache is available.
* **API docs**: This component reflects the availability of the API reference documentation site. A disruption here does not affect SDK evaluations, data processing, or your rollout plans.

When using Harness FME, you first define your rollout plans through our web console, then consume these rollout plans in your code using our SDKs. These two parts are independent and an outage in either will have different implications for you.

## Web console and rollout plans

If Harness FME's web console is not available, you will not be able to change your rollout plans or kill a feature until access is restored. This does not mean that the behavior for your applications or the treatments served to your customers will change, as the most up to date rollout plans will still be served to the SDKs running in your code after downloading from Harness FME's CDN.

## SDKs

All of our SDKs work with a local cache of feature flag and segment definitions to evaluate treatments for you. This means that, once initialized, they don't need to reach Harness FME in order to calculate treatments for you.

**Client-side SDKs** can make use of a persistent cache in the device to initialize even if they can't reach Harness FME's servers. For web SDKs this persistent cache needs to be enabled through the factory configuration. 

Upon instantiation, the SDK factory will first parse any existing cache and emit the `SDK_READY_FROM_CACHE` event, at which point it will be able to calculate treatments according to the feature flag and segment definitions that existed the last time it was able to sync with Harness FME. 

If at the time of initialization the SDK is not able to reach Harness FME, the SDK will emit the `SDK_READY_TIMED_OUT` event if it's enabled through the factory configuration. Even after that event is emitted, the SDK will continue to attempt to initialize and may emit the `SDK_READY` event at a later time if connectivity to Harness FME is restored.

**Server-side SDKs** will behave differently during initialization without connectivity to Harness FME depending on their operation mode:

* **Producer mode**: This is the default operation mode. In this mode the SDK will fetch feature flag and segment definitions from Harness FME upon instantiation and will cache them in memory. If Harness FME is not reachable the SDK will not be able to fetch feature flag and segment definitions and calling the `BlockUntilReady` method will result in a Timeout Exception being raised. 

  Even if the Timeout Exception is raised, the SDK will continue to attempt to reach Harness FME through an exponential backoff mechanism and may be able to fetch your feature flag and segment definitions at a later time if connectivity is restored,

* **Consumer mode**: In this mode the SDK does not maintain an in-memory cache of definitions, but rather consumes them from a Redis instance in your infrastructure which is maintained by a [Synchronizer instance](/docs/feature-management-experimentation/sdks-and-infrastructure/optional-infra/split-synchronizer). Since the SDK is not communicating directly to Harness FME it can initialize normally, even in the event of an outage, as long as the Redis instance is populated with your feature flag and segment definitions.

## Additional customer-deployed components

Similar to SDKs, any running instances of the Proxy, Synchronizer, or Evaluator will continue to work even if connectivity to Harness FME is lost, and will automatically recover and sync your rollout plans to their latest versions once Harness FME is reachable again.

## How to shield yourself

These are some measures that can be taken in order to keep an outage's impact to your applications to a minimum.

### Customer-deployed component redundancy

There are additional pieces of infrastructure that can provide an additional layer of redundancy so that your SDKs can continue to operate normally during an outage.

The [Harness FME Proxy](/docs/feature-management-experimentation/sdks-and-infrastructure/optional-infra/split-proxy) acts as an intermediary between Harness FME and your SDKs. Similar to the way SDKs fetch feature flag and segment data from Harness FME and cache them in memory, the proxy maintains an in-memory cache of feature flag and segment definitions to serve to downstream SDKs. 

In this way, SDKs consuming the Proxy can initialize even if Harness FME is not reachable. Additionally, a Harness FME Proxy instance can be started from a snapshot file containing your rollout plans, allowing you to spin up a Proxy instance even is Harness FME is not reachable.

The [Harness FME Synchronizer](/docs/feature-management-experimentation/sdks-and-infrastructure/optional-infra/split-synchronizer) can also provide redundancy by allowing SDKs to initialize as consumers of your Redis cache even when Harness FME is not reachable, although if redundancy is all that is needed the Proxy is a better alternative for easier deployment and maintenance in most cases.

## Coding best practices

### Handle SDK timeouts gracefully

For server-side SDKs, this means catching and handling the Timeout Exception raised by the `blockUntilReady` method.

For client-side SDKs, you can set up a listener for the `SDK_READY_TIMED_OUT` event.

:::info Notes
* A timed out SDK can still be queried for treatments, but it will return control treatments.
* Even after timing out, the SDK will continue to attempt initialization following an exponential backoff mechanism, which means it may become ready at some point later in time if Harness FME becomes reachable.
:::

### Account for the control treatment

In case Harness FME is unreachable and the SDK is unable to fetch feature flag definitions‚ and there is no cache available in the case of client side SDKs‚ any evaluations will return the [control treatment](/docs/feature-management-experimentation/feature-management/setup/control-treatment). 

Make sure you code your application so that it is able to safely handle this situation. This may mean falling back to a safe behavior, such as turning an experimental feature off.

<UniversityAdmonition title="Harness FME self-paced training">
  For an interactive onboarding experience including further use cases and features like **release monitoring**, **events**, and **metrics**, check out the [**Harness Feature Management & Experimentation Feature Delivery Foundations for Admins & Product Managers certification**](https://university-registration.harness.io/fme-feature-delivery-foundations-for-admins-product-managers).
</UniversityAdmonition>