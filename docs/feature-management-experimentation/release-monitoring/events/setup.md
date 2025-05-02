# Setup

## Send event data

Measure the impact of your feature rollout on your customer experience by sending Harness FME event data and calculating metrics based on those events. Events allow you to record any actions your users perform and experiences your users encounter, such as response times or errors.

Event data can be sent to Harness FME in one of four ways:

* Install Harness FME's [RUM Agent](https://help.split.io/hc/en-us/sections/12619161404685-Client-side-Agents) or [Harness FME Suite](https://help.split.io/hc/en-us/sections/22701959913229-Client-side-Suites) which will auto-collect performance event data when installed in a client-side application
* Call Harness FME's SDK `track` method (example below) to explicitly add instrumentation code to your application to record events
* Post a JSON body to Harness FME's [`events` API](https://docs.split.io/reference#events-overview) to ingest events data from existing sources
* Harness FME integrations with [Segment](https://help.split.io/hc/en-us/articles/360020742532-Segment), [mParticle](https://help.split.io/hc/en-us/articles/360038306272-mParticle-), [Sentry](https://help.split.io/hc/en-us/articles/360029879431-Sentry), [Amazon S3](https://help.split.io/hc/en-us/articles/360053674072-Amazon-S3), or [Google Analytics](https://help.split.io/hc/en-us/articles/360040838752-Google-Analytics) to ingest events data from existing sources

Below is an example of calling the track method of the SDK in JavaScript. See links above for the API and integration routes.

```javascript
// parameters
var queued = client.track('TRAFFIC_TYPE', 'EVENT_TYPE'), eventValue);
// Example
var queued = client.track('user', 'page_load_time', 83.334)
```

Learn more in the track section of each SDK reference guide ([JavaScript example](https://help.split.io/hc/en-us/articles/360020448791-JavaScript-SDK#track)).

To help verify that events are being received by Harness FME, from the left navigation pane, click the user's initials at the bottom, select **Admin settings**, and click **Event types**. There you can see event types and a stream of events per event type. Learn more about [events](https://help.split.io/hc/en-us/articles/360020585772-Track-events).

<img src="https://help.split.io/hc/article_attachments/30795551048589" alt="step_3_send_event_data.png" width="1000" />

## Choosing event type names

To create metrics in Harness FME, you must send events using the SDK, Events API, or a third-party integration like Segment. When using the `track` method via the SDK or Events API, you'll need to choose an event type name.

### Naming requirements

Event type names must meet the following requirements:

* 80 characters or fewer
* Start with a letter, number, or left-bracket (`[`)
* Contain only letters, numbers, hyphens (`-`), underscores (`_`), brackets (`[]`), or periods (`.`)

For more information, see the [Events](https://help.split.io/hc/en-us/articles/360020585772-Events) documentation.

### Recommended naming convention

The Harness FME documentation often uses examples like `page_load_time` for event names, but a more intuitive convention is to follow an `OBJECT.action` format. 

You may name events like the following for an e-commerce site: 

- `song.played`
- `song.created`
- `song.viewed`
- `product.viewed`
- `product.addedToCart`
- `account.profile.address.updated`

This convention groups related events together when sorted alphabetically and helps make their purpose immediately clear. For more information on naming conventions, see [Segment Academy's naming conventions](https://segment.com/academy/collecting-data/naming-conventions-for-clean-data/) article.

## Efficiency with events

Events can be optimized to ensure that you’re getting the most value out of the events that you send to Harness FME. On a technical level filtering events is easiest when using the track method of the SDK as that is code that can be accessed and reasoned about. Other integrations that may be easy to filter with are the [S3 integration](https://help.split.io/hc/en-us/articles/360053674072-Amazon-S3) or the [Events API](https://docs.split.io/reference/events-overview) - in either case the filtering would have to be done before any data is sent to those integrations.

### Filtering events by business requirements

One recommended approach is to write up business requirements for the experimentation program and use those business requirements to understand what events are needed to track. From that point onwards you can send just those events to Harness FME. If you decide later on that more events are needed then past events that have been stored in another system can be sent as well. Harness FME will appropriately attribute events from the past as long as the keys, timestamps, and traffic types match up with keys and versions of feature flags. New metrics can be created and the existing data stored in Harness FME’s backend can be attributed even if they hadn't been used before. Computing the impact of the experiment once new data is loaded is a simple click of the **recalculate** button on the metrics impact tab.

### Filtering events by keys

If using pooling or sampling on MTKs, ensure that you are also doing the same filtering on events so that keys not being experimented with don’t have events sent to Harness FME either. Filtering events alone by keys is also possible. If there is a desire to reduce the event count and leave the MTK count alone (such as for getTreatment calls for a percentage based rollout) then filtering events by keys can be done. Fewer MTKs will enter the experiment (as many will have their events dropped) - but this may be ok if only testing for large effects or if the volume is significant enough that experiments are sufficiently powered even with the smaller population.

:::danger
Do not filter random events. This will cause partial event chains and inconsistent data.
:::
