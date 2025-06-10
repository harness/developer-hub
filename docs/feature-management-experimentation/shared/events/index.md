:::info
Harness FME's Integration Advisors are here to help with standing up your event integration pipelines. Contact your Customer Success Manager to set up a meeting and explore options.
:::

To power your analytics and experimentation, you need to send events to Harness FME. This enables you to measure the impact of your features on customer behavior, user experience, or application performance.

For more information about sending event data to Harness FME, see the [Setup](/docs/feature-management-experimentation/50-release-monitoring/events/setup.md) documentation.

The API and integration routes allow you to ingest event data from existing sources (i.e. take advantage of telemetry from existing instrumentation or analytics). The FME SDK Suite and RUM Agents will automatically collect event data when installed in a client side application. Use the `track` method if you want to explicitly add instrumentation code to your application to record events.

Events received by Harness FME can then be aggregated to produce metrics. To learn more, review the [Metrics](https://help.split.io/hc/en-us/articles/22005565241101-Metrics) guide.

## Event fields

Each event contains the following fields:

| **Field** | **Description** |
| --- | --- |
| Environment ID and name | Environment where the event was captured. These must match with the ID and name in Harness FME. |
| Event type ID | Event type that this event should correspond to. This is the event type ID that is used when you create metrics in Harness FME. |
| Foreign ID | Third party ID to identify this event. This populates only if it’s received through an integration. |
| Key | The key ID of the traffic type used for firing the event. This must match with the traffic type key used for generating impressions when `getTreatment` is called in order for metrics to calculate impact successfully. |
| Properties | Map of key-value pairs that is used to filter your metrics or for the value in sum and average metrics. |
| Reception timestamp | Time the impression was received by Harness FME. |
| SDK and version | Language and version of the SDK that is used to capture the event. This is only populated when using Harness FME's track method. |
| Source | Source of the event if captured via Harness FME's RUM agent or through an integration. |
| Timestamp | Time the event was captured. |
| Traffic type ID and name | Traffic type of the key registering the event. This is the traffic type in Harness FME of the event. Note that you may have the same event tracked from multiple traffic types if doing experimentation on different traffic types. |
| Value | Value to be used in creating the metric. This is optional and if it’s not passed in, the value registers as zero. |

## Event properties

Properties provide additional context around the events your customers generate. Event properties are attributes of a particular event and reflect the state and additional metadata at which the event was generated. For the event `checkout.click`, an event property could be 'category' which denotes the type of person checking out. A customer could generate the `checkout.click` event by being a 'guest' or 'user'. The event property 'guest' provides more information about the specific event.

Below is a sample event `checkout.click` showing the event properties with Harness FME's common fields removed.

#### JSON

<pre>\{<br />  "eventTypeId": "checkout.click",<br />  "environmentName": "Production",<br />  "trafficTypeName": "user",<br />  "timestamp": 1557936519990,<br />  "value": 0,<br />  "source": "Segment",<br />  "foreignId": "ajs-85cb03f2f34af1426d9a2128146ab832",<br />  <strong>"properties": \{ <br />    "category": "guest",<br />    "packaging_fees": 25.08,<br />    "discount_saving": 4,<br />    "label": "necklace",<br />    "login_id": null,<br />    "page_version": "unit_page",<br />    "total_tax": 32.00,<br />    "total_cost": 945.69,<br />    "type": "button",<br />    "package": "luxury",<br />    "visitor_id": null<br />  \} </strong><br />}<br /></pre>

You can view the event properties being sent for a given event type using the [Live tail functionality in Data hub](https://help.split.io/hc/en-us/articles/360044867032).

These event properties are also exposed in the metric definition builder so you can create more granular and flexible metrics. Event properties can be used as filters for your metric definition, or as values to be measured. Refer to the [Metrics](https://help.split.io/hc/en-us/articles/22005565241101-Metrics) guide for more information.

Harness FME currently supports the following types of properties: strings, numbers, and booleans. Up to 300 properties can be captured per event type, and each property has a 256 character limit.

## Exploring events
 
Harness FME supports multiple ways to explore your event data, allowing you to quickly understand and troubleshoot your event pipelines:

1. In Admin settings, the Event types page lists all event types that have been received by Harness FME in the last 150 days. For a given event type, you can see the count of events received over the last 7 days, the timestamp of the last event received, and all metrics that have been created using that event type. 

   :::note
   These event types are automatically captured by Harness FME. Any event types manually entered in the [metric definition](https://help.split.io/hc/en-us/articles/22005565241101-Metrics) will not be displayed on this page.
   :::

   <img src="https://help.split.io/hc/article_attachments/22002237207309" alt="event_type_view.png" width="1000" />


2. In Data hub, Explore enables you to visualize the event volume trend for a selected event type over the last 7 days. To visualize your events, first select a traffic type and an event type on the form to the left. After this, click on the **Query** button to generate a graph of your results.

   <img src="https://help.split.io/hc/article_attachments/22232144014861" alt="metric_definition.png" width="1000" />


3. In Data hub, [Live tail](https://help.split.io/hc/en-us/articles/360044867032-Live-tail) enables you to run a live query of impressions and events, so you can understand your event stream in more detail, including which event properties are being sent with each event type.