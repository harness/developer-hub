---
title: Mixpanel
sidebar_label: Mixpanel
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360045503191-Mixpanel </button>
</p>

Mixpanel is a product analytics tool that enables you to explore user behavior data and analyze metrics like user adoption, growth, and retention. Split integrations can be configured to send impressions to Mixpanel, or extract Mixpanel events to be used as events in Split.

# Sending Split impressions to Mixpanel

**Note: This is a third-party integration that has been tested by Split. Split does not own or maintain this integration. For more information, contact [the contributor](https://github.com/dbmartin00).**

Split impressions describe the treatment that each user receives when a feature flag is evaluated.  Set up a Split webhook to listen for impressions as they are captured and send them to Mixpanel.  The webhook will transform the impressions into Mixpanel events. Using either AWS Lambda or a Google Cloud Function you can easily transform Split impressions into Mixpanel events.

## Prerequisites

To connect Mixpanel to Split, you need:

* A Mixpanel project token
* Administrator access to your Split account

## How to use

### Step 1: Publish a Split impressions webhook

Using Java AWS Lambda (AWS) and Java Google Cloud Function (GCF) parse the input stream into Impression instances. Then create a new series of Mixpanel events that include the data from the impressions, setting the Mixpanel `distinct_id` to the impression's key and passing other properties through as event properties. Base64 encode the resulting events and post them to Mixpanel events endpoint. For the code to compile, you need the following Mixpanel token:

`event.properties.put("token", YOUR_MIXPANEL_TOKEN_HERE)`

Both AWS and GCF versions cache the HTTP client used to POST to Mixpanel in their execution runtimes.  After cold start, the cheapest, default runtimes show timings in the 100-200ms range for handling batches of 50 impressions.

### Step 2: Configure Split to use your webhook

Copy your function/lambdas URL endpoint and paste it into the [Split impressions webhook](https://help.split.io/hc/en-us/articles/360020700232-Webhook-impressions) configuration.

Make sure you choose the environment from which you wish to receive impressions. If you are generating traffic in a testing environment, you will not see those impressions in production, and vice-versa.

### Step 3: Trigger Split impressions

You must have some code written that uses a `getTreatment` call to evaluate a feature flag. Once the listener is registered, each `getTreatment` call generates an impression, and within several seconds the impression arrives at the listener.

Using your cloud's native logging infrastructure (e.g., CloudWatch for AWS and LogViewer for Google) you can check that the impression function/lambda is being invoked.  he sample source code includes good logging to verify success.  If you don’t see logging, your function may not be installed correctly, or there may be no impressions.  Check the impressions tab for your feature flag. If you see impressions arriving, but your function/lambda is not being invoked, the connection may be misconfigured.  

Note that AWS Lambda functions ought to be installed with a POST method on the API Gateway in order to get a URL for use with Split.

### Step 4: Verify Mixpanel events are arriving from Split

Use the Mixpanel LiveView to verify that your Split events are arriving as expected.

<p>
  <img src="https://help.split.io/hc/article_attachments/360060465652/split_mixpanel.png" alt="split_mixpanel.png" />
</p>

The distinct_id is the Split impression's key - the identifier with which getTreatment was evaluated. If Mixpanel has more events with the same distinct_id, you will be able to join against that data and use Split impressions to further understand your customer behavior by building cohorts.

The event in Mixpanel includes the treatment (typically "on" or "off" or whichever treatments you configured in Split), a descriptive label for why the treatment was returned, the name of the feature flag evaluated, a timestamp, and some accompanying details about the Split SDK which evaluated the `getTreatment` call.

These functions have not been heavily performance tested.  Further tuning may be necessary for high volumes of event traffic.  

## Code

The source code referenced can be found in GitHub - [Java AWS Lambda](https://github.com/dbmartin00/split2mixpanel) and [Java Google Cloud Function](https://github.com/dbmartin00/split2mixpanelGCF).

# Sending Mixpanel impressions to Split

**Note: This is a third-party integration that has been tested by Split. Split does not own or maintain this integration. For more information, contact [the contributor](https://github.com/dbmartin00).**

This integration extracts events from Mixpanel via the Data Export API, transforms them to the Split event format, and then sends these events to Split via the Events API. Refer to the [Github repository](https://github.com/dbmartin00/mixpanel2split) for instructions on how to install this integration.
