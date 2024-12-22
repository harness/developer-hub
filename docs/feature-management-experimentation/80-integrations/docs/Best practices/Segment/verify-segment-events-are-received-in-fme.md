---
title: Verify Segment events are received in FME
sidebar_label: Verify Segment events are received in FME
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360035701011-Segment-Verifying-Segment-events-in-Split <br /> ✘ images still hosted on help.split.io </button>
</p>

<h2 id="h_01JFM1XH73JHP858PG9CY6M8B9">Introduction</h2>
<p>
  This article explains how to verify that you are correctly receiving Segment
  events in Split after configuring
  <a href="https://help.split.io/hc/en-us/articles/360020742532-Segment#split-as-a-destination" target="_self">Split as a Segment Destination</a>.
  Verification is a prudent next step after setting up the integration to ensure
  the quality of your Split data. Do this by crosschecking the events you see from
  the Segment sources you have connected to your Split destination against the
  events shown under Split's event types. You need Admin access in your organization
  to view the events in Split.
</p>
<h2 id="h_01JFM1XH73KKRKV195DZKNB3H6">Verifying events of one traffic type</h2>
<p>
  Verifying receipt of every single event type is tedious and unnecessary. For
  each Segment source that you have connected to your Split destination, checking
  one or two event types per configured traffic type is sufficient to know that
  data is correctly flowing. In the configuration of Split as a Segment destination
  in the Split console you map Segment's userId and anonymousId to Split traffic
  types. So you should check that an event sent with Segment's analytics.track()
  call using an anonymousId exists in Split under whatever traffic type you have
  mapped anonymousId, and similarly check events sent with a userId.
</p>
<p>
  For instance, if you see the following issue_added event in Segment
</p>
<pre><code>\{
  "anonymousId": "818b40b3-0a01-4ac4-b0c4-3da30ec10128",
  "context": \{
    "ip": "71.211.247.135",
    "library": \{
      "name": "analytics.js",
      "version": "3.9.0"
    \},
    "page": \{
      "path": "/IssueTracker/",
      "referrer": "",
      "search": "",
      "title": "JS Issue Tracker",
      "url": "http://kyle/IssueTracker/"
    \},
    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36"
  \},
  "event": "issue_added",
  "integrations": \{\},
  "messageId": "ajs-773646ec00cd37bc931237eaa739115a",
  "originalTimestamp": "2019-10-11T22:04:14.770Z",
  "receivedAt": "2019-10-11T22:04:14.769Z",
  "sentAt": "2019-10-11T22:04:14.772Z",
  "timestamp": "2019-10-11T22:04:14.767Z",
  "type": "track",
  "userId": null
\}</code></pre>
<div>
  You would find the equivalent event in Split by navigating to Admin Settings / Event Types, and searching for event type issue_added.
</div>
<p>
  <img src="https://help.split.io/hc/article_attachments/360042026771/Screen_Shot_2019-10-31_at_10.54.59_AM.png" alt="Screen_Shot_2019-10-31_at_10.54.59_AM.png" />
</p>
<p>
  Then click on View for the particular event type to see the list of events.
</p>
<p>
  <img src="https://help.split.io/hc/article_attachments/360042025872/Screen_Shot_2019-10-31_at_5.27.10_PM.png" alt="Screen_Shot_2019-10-31_at_5.27.10_PM.png" />
</p>
<p>
  Note that the traffic type and key match up with what was sent in Segment. If
  you want to see that every detail of the event matches what was sent to Segment,
  then you can click on View for a specific event.
</p>
<h2 id="h_01JFM1XH73R469HPPV0NXNW8V3">Verifying Events of Multiple Traffic Types</h2>
<p>
  One of the nice things about the Split/Segment integration is that when you have
  Split configured as a Segment destination, events sent to that destination containing
  both an anonymousId and userId will show up in Split as two events: one for the
  traffic type mapped to anonymousId and one for the traffic type mapped to userId.
  You can verify this using the same steps as above. For an event in Segment that
  looks like this
</p>
<pre><code>\{
  "anonymousId": "818b40b3-0a01-4ac4-b0c4-3da30ec10128",
  "context": \{
    "ip": "71.33.210.130",
    "library": \{
      "name": "analytics.js",
      "version": "3.9.0"
    \},
    "page": \{
      "path": "/IssueTracker/",
      "referrer": "",
      "search": "",
      "title": "JS Issue Tracker",
      "url": "http://kyle/IssueTracker/"
    \},
    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36"
  \},
  "event": "issue_added",
  "integrations": \{\},
  "messageId": "ajs-cb646d3c8bdaf4c2303f6ea16ed2a89e",
  "originalTimestamp": "2019-10-31T15:03:38.949Z",
  "receivedAt": "2019-10-31T15:03:38.974Z",
  "sentAt": "2019-10-31T15:03:38.952Z",
  "timestamp": "2019-10-31T15:03:38.971Z",
  "type": "track",
  "userId": "97980cfea0067"
\}</code></pre>
<p>
  You should then see the two events with the different traffic types in Split
  with both the anonymousId (818b40b3-0a01-4ac4-b0c4-3da30ec10128) and the userId
  (97980cfea0067).
</p>
<p>
  <img src="https://help.split.io/hc/article_attachments/360042027152/Screen_Shot_2019-10-31_at_5.40.44_PM.png" alt="Screen_Shot_2019-10-31_at_5.40.44_PM.png" />
</p>
<h2 id="h_01JFM1XH73QTK5TTZ4YGFKVEQJ">Troubleshooting</h2>
<p>
  If you are not seeing events from Segment in Split as expected, there are a couple
  things you can check.
</p>
<ol>
  <li>
    Check that the Split/Segment integration is configured to send the events
    you are looking for. The configuration page has on/off switches for "Enable
    Track", "Track Named Pages", and "Track Named Screens". Make sure these are
    properly enabled for the desired events.
  </li>
  <li>
    Check that Segment is not configured to filter the expected events for your
    Split destination. See
    <a href="https://help.split.io/hc/en-us/articles/360034941652-Segment-Segment-Events-Are-Not-Shown-in-Split" target="_self">this article</a>
    for details.
  </li>
</ol>