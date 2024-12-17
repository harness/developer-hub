---
title: Efficiency with events
sidebar_label: Efficiency with events
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/26878730331789-Efficiency-with-Events </button>
</p>

## Efficiency with Events

Events can be optimized to ensure that you’re getting the most value out of the events that you send to Split. On a technical level filtering events is easiest when using the track method of the SDK as that is code that can be accessed and reasoned about. Other integrations that may be easy to filter with are the [S3 integration](https://help.split.io/hc/en-us/articles/360053674072-Amazon-S3) or the [Events API](https://docs.split.io/reference/events-overview) - in either case the filtering would have to be done before any data is sent to those integrations.

### Filtering events by Business Requirements

One recommended approach is to write up business requirements for the experimentation program and use those business requirements to understand what events are needed to track. From that point onwards you can send just those events to Split. If you decide later on that more events are needed then past events that have been stored in another system can be sent as well. Split will appropriately attribute events from the past as long as the keys, timestamps, and traffic types match up with keys and versions of feature flags. New metrics can be created and the existing data stored in Split’s backend can be attributed even if they hadn't been used before. Computing the impact of the experiment once new data is loaded is a simple click of the **recalculate** button on the metrics impact tab.

### Filtering Events by Key

If using pooling or sampling on MTKs, ensure that you are also doing the same filtering on events so that keys not being experimented with don’t have events sent to Split either. Filtering events alone by keys is also possible. If there is a desire to reduce the event count and leave the MTK count alone (such as for getTreatment calls for a percentage based rollout) then filtering events by keys can be done. Fewer MTKs will enter the experiment (as many will have their events dropped) - but this may be ok if only testing for large effects or if the volume is significant enough that experiments are sufficiently powered even with the smaller population.

**DO NOT FILTER RANDOM EVENTS** this will cause partial event chains and inconsistent data.

