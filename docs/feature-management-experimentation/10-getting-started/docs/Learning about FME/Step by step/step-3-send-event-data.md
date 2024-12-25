---
title: "Step 3: Send event data"
sidebar_label: "Step 3: Send event data"
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360025335031-Step-3-Send-event-data <br /> ✘ images still hosted on help.split.io </button>
</p>

# Send event data

Measure the impact of your feature rollout on your customer experience by sending Split event data and calculating metrics based on those events. Events allow you to record any actions your users perform and experiences your users encounter, such as response times or errors.

Event data can be sent to Split in one of four ways:

* Install Split's [RUM Agent](https://help.split.io/hc/en-us/sections/12619161404685-Client-side-Agents) or [Split Suite](https://help.split.io/hc/en-us/sections/22701959913229-Client-side-Suites) which will auto-collect performance event data when installed in a client-side application
* Call Split's SDK `track` method (example below) to explicitly add instrumentation code to your application to record events
* Post a JSON body to Split's [`events` API](https://docs.split.io/reference#events-overview) to ingest events data from existing sources
* Split integrations with [Segment](https://help.split.io/hc/en-us/articles/360020742532-Segment), [mParticle](https://help.split.io/hc/en-us/articles/360038306272-mParticle-), [Sentry](https://help.split.io/hc/en-us/articles/360029879431-Sentry), [Amazon S3](https://help.split.io/hc/en-us/articles/360053674072-Amazon-S3), or [Google Analytics](https://help.split.io/hc/en-us/articles/360040838752-Google-Analytics) to ingest events data from existing sources

Below is an example of calling the track method of the SDK in Javascript. See links above for the API and integration routes.

```javascript
// parameters
var queued = client.track('TRAFFIC_TYPE', 'EVENT_TYPE', eventValue);
// Example
var queued = client.track('user', 'page_load_time', 83.334)
```

Learn more in the track section of each SDK reference guide ([Javascript example](https://help.split.io/hc/en-us/articles/360020448791-JavaScript-SDK#track)).

To help verify that events are being received by Split, from the left navigation pane, click the user's initials at the bottom, select **Admin settings**, and click **Event types**. There you can see event types and a stream of events per event type. Learn more about [events](https://help.split.io/hc/en-us/articles/360020585772-Track-events).

<p>
  <img src="http://help.split.io/hc/article_attachments/30795551048589" alt="step_3_send_event_data.png" />
</p>
