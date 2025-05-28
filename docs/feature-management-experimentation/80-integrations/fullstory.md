---
title: FullStory
sidebar_label: FullStory
description: ""
---

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360045937831-FullStory </button>
</p>

import UpdateBanner from "./shared/_update-banner.mdx";

 <UpdateBanner integration={frontMatter.title} />

## Split + FullStory

FullStory is a digital experience analytics platform that records users’ sessions for playback and analysis. FullStory events allow FullStory customers to add additional information to a session while it is being recorded. Split leverages FullStory events to report feature flag impressions to the FullStory session, and as a source of events for measurement and experimentation in Split (there is a section below for both types of integration). 

Follow the guide for your type of integration to proceed with installation. Segments integration deals with passing Split impressions to FullStory sessions. Events integration covers passing FullStory events to Split for use in measurement and experimentation.

## Prerequisites

To connect FullStory with Split, you need:

* FullStory API recording JavaScript installed
* Split JavaScript SDK 10.12.1 or later installed
* AWS lambda experience recommended
* Node.js developer experience recommended

## Integrating FullStory impressions into Split

The following sections explain how to integrate FullStory impressions into Split.

### Send Split impressions as FullStory custom events

The Split + FullStory integration uses out-of-the-box features of both products.

<div style={{maxWidth:700}}> ![](./static/fullstory-code.png) </div>
 
1. Associate the FullStory recording with the same key used for Split `getTreatment` evaluations by calling FS.identify. In the listing above, the user_id is shared by the FS.identify API call and the Split SDK configuration key (shown in blue).

2. Add a custom impression listener to report Split impressions to FullStory’s custom events API. As highlighted in red above, the FullStory custom event API is called for a “split_evaluation” event, passing the entire impression data as properties for that event. The impression data includes the name of the feature flag evaluated and the treatment the user received.

If you’re not familiar with the Split JavaScript SDK configuration, visit Split's [JavaScript documentation](/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-sdks/javascript-sdk) for more information.

### Verify split_evaluation events are arriving in FullStory

To verify events are arriving in FullStory, do the following:

1. On the session playback screen, look for the split_evaluation event.

   <div style={{maxWidth:600}}> ![](./static/fullstory-split-evaluation-event.png) </div>

2. If you have many events, search for split_evaluation using the **Filter events** function.

   <div style={{maxWidth:600}}> ![](./static/fullstory-filter-events.png) </div>

### Create a segment based on a treatment received

Once you have split_evaluation events, create a new FullStory segment that contains all the users who received a particular treatment from a given feature flag. Do the following:

1. From the FullStory home page, click to create a new segment.

   <div style={{maxWidth:300}}> ![](./static/fullstory-create-new-segment.png) </div>

2. Under API events, click **split_evaluation**.

   <div style={{maxWidth:300}}> ![](./static/fullstory-api-events.png) </div>

3. Build an Event filter for any feature flag and treatment you’ve integrated.

   <div style={{maxWidth:600}}> ![](./static/fullstory-event-filter.png) </div>

  In this example, the segment shows sessions where there is a getTreatment call to “multivariant_demo” and the user received “v3” as their treatment.

   <div style={{maxWidth:500}}> ![](./static/fullstory-segment.png) </div>

You can now play back and review specific customer experiences. Every session in this playlist showed v3 of the multivariant_demo feature flag.

Knowing which treatment a user saw for a particular feature flag is crucial data for evaluating their experience with FullStory. This simple integration makes that data available to analyze a single user’s session and to create segments for overall comparison of behavior between treatment groups.

## Integrating FullStory events into Split

Send FullStory events to Split to use in experimentation. FullStory events are received from a FullStory webhook, transformed, and reported to Split. This lets Split share the event data channel that may already be in place for FullStory.

Using the FullStory events webhook, you can pass FullStory events to Split to use for measurement, alerts, and experimentation. Events are the result of an FS.event() call from the FullStory SDK, for example:

<div style={{maxWidth:600}}> ![](./static/fullstory-fs-event.png) </div>

This transforms into the corresponding Split event:

<div style={{maxWidth:600}}> ![](./static/fullstory-corresponding-fs-split-event.png) </div>

:::info[Note]
If you want a Split value, you must put the value in a split{} section, as shown in the example above.
:::

```json
split: {
  value: 42
}, // etc.
```

## Installing the FullStory events webhook

To install the FullStory events webhook, do the following:

1. Clone the [fullstory events repository](https://github.com/splitio/fullstory-events-2-split) in an empty directory.

2. Inside the directory, copy your API keys (carefully) into files with the following names:
   * SPLIT_API_KEY (server-side API key for your desired environment)
   * FULLSTORY_API_KEY (I used admin)<br /><br />

   :::important
   The files must precisely have these names. An extra space at the end of the line or empty lines after it could cause issues later.
   :::

3. From this same directory:

<ul>

```
> npm install 
> zip -r fullstory.zip *
```

</ul>

:::info[Brew]
**If you have brew installed, you can perform a "brew install npm" on OSX. Follow the instructions to install npm for other operating systems described in [Downloading and installing Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm). The fullstory.zip should include the index.js, the key files, and a full node_modules directory.**
:::

## Installing the FullStory events webhook

A single node.js lambda does the work for the integration, using only the filesystem (for API keys) and the Axios HTTP client. The integration makes two cheap API calls per FullStory event. To install a FullStory webhook in AWS, do the following:

1. Create a new lamba called fullstory using the Node.js language.

2. Upload fullstory.zip to the Code screen of your AWS lambda.

3. Give the lambda a function URL to POST to it. Enable CORS and give the Allow Headers field a *.

4. Provide the function URL to the FullStory events webhook.

5. Use the FullStory webhook test button to make sure you get back a 200 response from your lambda.

:::info[Testing]
**When testing, it can sometimes take 5 to 10 minutes for FS.event calls to propagate to Split. Try reloading your page after a minute to accelerate the event publishing.**
:::

## Debugging

Use [Amazon CloudWatch](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html) to look at inbound events and check they're properly handled. Some events take time to propagate, but CloudWatch gives early indication of trouble.

## About this integration

This is a third-party integration that has been tested by Split. Split does not own or maintain this integration. For more information, contact the [contributor](mailto:david.martin@split.io).

To learn more about all our integrations, check out our integrations page. If you’d like a demo of Split or help to implement any of our integrations, contact [support@split.io](mailto:support@split.io).