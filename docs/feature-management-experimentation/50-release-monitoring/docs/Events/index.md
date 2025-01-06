---
title: Events
sidebar_label: Events
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360020585772-Events <br /> ✘ images still hosted on help.split.io </button>
</p>

:::info
Split’s Integration Advisors are here to help with standing up your event integration pipelines. Contact your Customer Success Manager to set up a meeting and explore options.
:::

To power your analytics and experimentation, you need to send events to Split. This enables you to measure the impact of your features on customer behavior, user experience, or application performance. Event data can be sent to Split in any of the following ways:

* Install Split's [RUM agent](https://help.split.io/hc/en-us/sections/12619161404685-Client-side-Agents) or [Split Suite](https://help.split.io/hc/en-us/sections/22701959913229-Client-side-Suites)
* Call Split's SDK track method
* Post a JSON body to Split's [`events` API](https://docs.split.io/reference/events-overview)
* Split integrations with [Segment](https://help.split.io/hc/en-us/articles/360020742532-Segment), [mParticle](https://help.split.io/hc/en-us/articles/360038306272-mParticle-), [Sentry](https://help.split.io/hc/en-us/articles/360029879431-Sentry), [Amazon S3](https://help.split.io/hc/en-us/articles/360053674072-Amazon-S3), or [Google Analytics](https://help.split.io/hc/en-us/articles/360040838752-Google-Analytics)

The API and integration routes allow you to ingest event data from existing sources (i.e. take advantage of telemetry from existing instrumentation or analytics). The Split Suite and RUM Agents will automatically collect event data when installed in a client side application. Use the `track` method if you want to explicitly add instrumentation code to your application to record events.

Events received by Split can then be aggregated to produce metrics. To learn more, review the [Metrics](https://help.split.io/hc/en-us/articles/22005565241101-Metrics) guide.

## Event fields

Each event contains the following fields:

| **Field** | **Description** |
| --- | --- | 
Environment ID and name | Environment where the event was captured. These must match with the ID and name in Split.
Event type ID | Event type that this event should correspond to. This is the event type ID that is used when you create metrics in Split.
Foreign ID | Third party ID to identify this event.  This populates only if it’s received through an integration.
Key | The key id of the traffic type used for firing the event. This must match with the traffic type key used for generating impressions when `getTreatment` is called in order for metrics to calculate impact successfully.
Properties | Map of key-value pairs that is used to filter your metrics or for the value in sum and average metrics.
Reception timestamp | Time the impression was received by Split.
SDK and version | Language and version of the SDK that is used to capture the event. This is only populated when using Split's track method.
Source |  Source of the event if captured via Split's RUM agent or through an integration.
Timestamp | Time the event was captured.
Traffic type ID and name | Traffic type of the key registering the event. This traffic type in Split of the event. Note that you may have the same event tracked from multiple traffic types if doing experimentation on different traffic types.
Value | Value to be used in creating the metric.This is optional and if it’s not passed in, the value registers as zero.

## Using the RUM agent or Split Suite

This is one of the simplest approaches to getting started sending events. Split's RUM agent or Split Suite, when installed, will automatically collect events and automatically create metrics. If you are already using the Split SDK in your application on the client side, you can upgrade to using the Split Suite and take advantage of the events automatically generated. Even if you are only using Split on your application backend, you can still take advantage of our Client Side Split RUM agents. Split will join across based upon the user or anonymous key sent to the RUM agent on the front end with the SDK on the back end to be able to compute the metric impact. 

For more information on the specific installation instructions, events captured and metrics automatically created, please refer to our help documentation for your selected [RUM agent](https://help.split.io/hc/en-us/sections/12619161404685-Client-side-Agents) or [Split Suite](https://help.split.io/hc/en-us/sections/22701959913229-Client-side-Suites).

## Using the SDK track method

Use the `track` method to record any actions your customers perform. Each action is known as an `event` and corresponds to an event type. Calling `track` through one of our SDKs is the first step to getting experimentation data into Split and allows you to measure the impact of your splits on your users’ actions and metrics. In the following examples, you can see that the `.track()` method can take up to five arguments. The proper data type and syntax for each are the following:

* **key:** The `key` variable used in the `getTreatment` call and firing this track event. The expected data type is **String**.
* **TRAFFIC_TYPE:** The traffic type of the key in the track call. The expected data type is **String**. You can only pass values that match the names of [traffic types](https://help.split.io/hc/en-us/articles/360019916311-Traffic-type) that you have defined in your instance of Split.
* **EVENT_TYPE:** The event type that this event should correspond to. The expected data type is **String**. Full requirements on this argument are:
     * Contains 63 characters or fewer.
     * Starts with a letter or number.
     * Contains only letters, numbers, hyphen, underscore, or period. 
     * This is the regular expression we use to validate the value: `[a-zA-Z0-9][-_\.a-zA-Z0-9]{0,62}`
* **VALUE:** (Optional) The value to be used in creating the metric. This field can be sent in as null or 0 if you intend to purely use the count function when creating a metric. The expected data type is **Integer** or **Float**.
* **PROPERTIES:** (Optional). A Map of key-value pairs that can be used to define or filter a metric. Refer to the [event properties](https://help.split.io/hc/en-us/articles/360020585772-Events#event-properties) section for more information. 

The following is an example in Java.

___Note: Other SDK languages each have specific syntax that need to be followed on their own help pages. Refer to our [SDK section](https://help.split.io/hc/en-us/articles/360033557092-SDK-overview) of our help documentation for more information about using the `track` call for your selected SDK.___


```java
// If you would like to send an event without a value 
boolean trackEvent = client.track("key", "TRAFFIC_TYPE", "EVENT_TYPE");
// Example
boolean trackEvent = client.track("john@doe.com", "user", "page_load_time");

// If you would like to associate a value to an event
boolean trackEvent = client.track("key", "TRAFFIC_TYPE", "EVENT_TYPE", VALUE);
// Example  
boolean trackEvent = client.track("john@doe.com", "user", "page_load_time", 83.334);

// If you would like to associate a value and properties to an event
boolean trackEvent = client.track("key", "TRAFFIC_TYPE", "EVENT_TYPE", VALUE, {PROPERTIES});
// Example  
HashMap<String, Object> properties = new HashMap<>();
properties.put("package", "premium");
properties.put("admin", true);
properties.put("discount", 50);

boolean trackEvent = client.track("john@doe.com", "user", "page_load_time", 83.334, properties);
```

### Considerations

This method generally is best for two use cases:

* You are new to event tracking and experimentation in general. If Split is the first time you are tracking events, then using Split's track method is a great way to start.
* You already have one or more tools that do tracking and have a wrapped function that calls all of your trackers. In this case, it would be straightforward just to add Split's track method to that function.

When using the track method we strongly recommend wrapping the function. If you are in the first use case and early on your experimentation journey, it is important to ensure a quality code architecture and as such wrapping the track call allows further extensibility to other applications that you may be tracking with later on.

### Level of effort using the track method

The following explains the level of effort you can expect when using this method to send events to Split.

Using the track method requires that you call this function for each of the events you want to track. This would include multiple traffic types and every event that you may want to use to measure the impact of a feature flag treatment. If you are already tracking events using other systems, you can include Split's track method in a wrapped call with your other trackers. 

If you are already using a system for tracking events and Split has an events integration with that system, Split would recommend that approach over using the track method. 

## Using events APIs

You can post a JSON body to Split's [events API](https://docs.split.io/reference/events-overview) to ingest event data from existing sources. You can see the schema for sending an event in the following:

```
[{
  "eventTypeId": String, 
  "trafficTypeName": String, 
  "key": String, 
  "timestamp": Number, 
  "value": Number,
  "properties":{String: Any,String: Any, etc.}
}]
```

### Considerations

Using the events API makes sense when you have a stream of events from some other system where you are tracking events that you can tap into. 

If you are already tracking user events with some other system and it offers some kind of webhook, one common approach is to use a serverless function like AWS lambda to transform events from that webhook into Split's format and send those events across to Split. 

Another possible use case would be the scenario where you have a system that cannot or will not be running the Split SDK but still needs to track events. The advantage of using the events API over the SDK is that almost every single programming language has the ability to make HTTP API calls. So any internet connected application can send events to Split with this method.

There is no rate limit on the events API. It can handle any volume of load of events. However, it is recommended to keep individual payload sizes under 1 megabyte.

### Level of effort using events API

The level of effort for implementing the events API is low. It is a straightforward HTTP API call with a JSON formatted body and authenticated with a Bearer auth token. If the events data can be tapped into from some sort of events stream, or some application that is already tracking events and formatted into Split's Events format, it can be sent across to Split.

## Using integrations to send events

You can use [Segment](https://help.split.io/hc/en-us/articles/360020742532-Segment), [mParticle](https://help.split.io/hc/en-us/articles/360038306272-mParticle-), [Sentry](https://help.split.io/hc/en-us/articles/360029879431-Sentry), [Amazon S3](https://help.split.io/hc/en-us/articles/360053674072-Amazon-S3), or [Google Analytics (GA)](https://help.split.io/hc/en-us/articles/360040838752-Google-Analytics) to ingest event data from existing sources. Using these integrations allows you to avoid explicitly sending events to Split and instead send events to these systems that forwards them on to Split.

### Considerations

If you're already tracking events using Google Analytics, mParticle, Segment, or Sentry, Split strongly recommends using these integrations for ease of ingesting events. One thing to be aware of is that these integrations typically send all events from the source system to Split. Specifically the Sentry, Segment, and mParticle integrations do not have filtering to only send some events. The GA integration can be configured with filters. The Amazon S3 integration requires filtering when the file is generated, if events were to be excluded.

The Amazon S3 integration is best used when event collection is already centralized and AWS infrastructure is available for use. Then the events can be piped directly to Split with this integration.

### Level of effort using integrations

The Sentry, Segment, and mParticle integrations are similar in that there is no engineering effort required to load events captured within these systems. There is configuration that has to happen within Split and within the third-party application to map the events and traffic types to what they will be in Split. For more information, view the specific pages of each of these integrations in the help center. 

The Google Analytics integration is for the browser only and requires the SDK to be instantiated on any page that you want to use it on. Once instantiated in code, it allows sending GA hits to Split automatically without needing to track individual events. This can also be used in concert with our [Google Tag Manager (GTM)](https://help.split.io/hc/en-us/articles/7936008367245-Google-Tag-Manager) helper script that adds Split's tracker automatically to any GTM trackers.

The Amazon S3 integration requires infrastructure work of creating a new S3 bucket and setting up files with the proper naming convention, data schema, file format, and compression algorithm. The user doing this setup needs rights to set the bucket policy as well. 

## Event properties

Properties provide additional context around the events your customers generate. Event properties are attributes of a particular event and reflect the state and additional metadata at which the event was generated. For the event `checkout.click`, an event property could be 'category' which denotes the type of person checking out. A customer could generate the `checkout.click` event by being a 'guest' or 'user'. The event property 'guest' provides more information about the specific event.

Below is a sample event `checkout.click` showing the event properties with Split's common fields removed.

### JSON
```
{
 "eventTypeId": "checkout.click",
 "environmentName": "Production",
 "trafficTypeName": "user",
 "timestamp": 1557936519990,
 "value": 0,
 "source": "Segment",
 "foreignId": "ajs-85cb03f2f34af1426d9a2128146ab832",
 <b>"properties": {
   "category": "guest",
   "packaging_fees": "25.08",
   "discount_saving": "4",
   "label": "necklace",
   "login_id": "null",
   "page_version":"unit_page",
   "total_tax": "32.00",
   "total_cost": "945.69",
   "type": "button",
   "package": "luxury",
   "visitor_id": "null"
 }</b>
}
```

You can view the event properties being sent for a given event type using the [Live tail functionality in Data hub](https://help.split.io/hc/en-us/articles/360044867032).

These event properties are also exposed in the metric definition builder so you can create more granular and flexible metrics. Event properties can be used as filters for your metric definition, or as values to be measured. Refer to the [Metrics](https://help.split.io/hc/en-us/articles/22005565241101-Metrics) guide for more information.

Split currently supports the following types of properties: strings, numbers, and booleans. Up to 300 properties can be captured per event type, and each property has a 256 character limit.

## Exploring events
 
Split supports multiple ways to explore your event data, allowing you to quickly understand and troubleshoot your event pipelines:

1. In Admin settings, the Event types page lists all event types that have been received by Split in the last 150 days. For a given event type, you can see the count of events received over the last 7 days, the timestamp of the last event received, and all metrics that have been created using that event type. _Note: These event types are automatically captured by Split. Any event types manually entered in the [metric definition](https://help.split.io/hc/en-us/articles/22005565241101-Metrics) will not be displayed on this page._

<p>
  <img src="https://help.split.io/hc/article_attachments/22002237207309" alt="event_type_view.png" />
</p>

2. In Data hub, Explore enables you to visualize the event volume trend for a selected event type over the last 7 days. To visualize your events, first select a traffic type and an event type on the form to the left. After this, click on the **Query** button to generate a graph of your results.

<p>
  <img src="https://help.split.io/hc/article_attachments/22232144014861" alt="metric_definition.png" />
</p>

3. In Data hub, [Live tail](https://help.split.io/hc/en-us/articles/360044867032-Live-tail) enables you to run a live query of impressions and events, so you can understand your event stream in more detail, including which event properties are being sent with each event type.
