---
title: What is the sequence and timing when sending events with Split's track method?
sidebar_label: What is the sequence and timing when sending events with Split's track method?
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360029716732-What-is-the-sequence-and-timing-when-sending-events-with-Split-s-track-method </button>
</p>

<p>
  This article discusses the path an event takes from an instance of the Split
  SDK where the track method is called to the datastore used for calculating metric
  values from that event.
</p>
<p>
  In order to accurately attribute events to treatments the timestamp in the event
  is captured and recorded when the track method is called, so independent of any
  latency in transmission, the event has an accurate timestamp for when it occurred.
  This is the timestamp that will be compared to a feature flag's versions and
  impressions to determine if the event can be attributed to a treatment.
</p>
<p>
  A variety of design factors were considered in the implementation of the Split
  pipeline - speed, stability, accuracy, comprehensiveness, etc.
</p>
<p>
  With the above in mind, Split aims to bring the fastest time to value possible
  in our pipeline, but has made architectural decisions that increase stability
  and accuracy.With experimentation it is far more important to ensure the
  platform is operating on the most accurate information.
</p>
<p>
  1) SDK to API: The API send events in batches, as configured by an SDK configuration
  parameter, (for instance, in the Java SDK, the parameter is eventFlushIntervalInMillis).
  The default value of this parameter is stated in the documentation for each SDK;
  for most SDKs it is 30 seconds. Another parameter sets the size of the events
  queue (in the Java SDK, the parameter is
  <span>eventsQueueSize which defaults to 500). When the events queue is full, the SDK will flush its content and post the events to the Split cloud, regardless of the setting of the flush interval parameter.</span>
</p>
<p>
  2) API to Queue: The API writes data to an ingestion queue, this typically takes
  only a few milliseconds.
</p>
<p>
  3) Queue to S3: Uses the shortest possible buffer time for AWS firehose, which
  is 60 seconds.
</p>
<p>
  4) S3 to Data Lake: A job retrieves the raw events data and processes it for
  storage in the Split data lake, ready for analysis. Typical run time for this
  job varies from 2 to 5 minutes depending on load.
</p>
<p>
  5) Data Lake to Calculated Result: Jobs are scheduled based on
  <a href="https://help.split.io/hc/en-us/articles/360019836212-When-are-Metric-Cards-updated" target="_self">how long the experiment has been running</a>,
  since older experiments have low variance over small windows of data. Once a
  job begins, it takes from 15 seconds to 5 minutes to process and save the results,
  depending on the data volumes involved.
</p>
<p>
  The last update time shown in a feature flag's metric impact tab is based on
  when the job completes. Typically, it's fair to estimate about 5 minutes of pipeline
  delay from the time the event is received to the time it is available for processing.
  In many cases, the pipeline is faster than that (both the SDK and firehose buffer
  times are trains leaving a station, if you get there just before the train departs
  you don't wait long). Spikes in data volumes can add delay to the pipeline.
</p>