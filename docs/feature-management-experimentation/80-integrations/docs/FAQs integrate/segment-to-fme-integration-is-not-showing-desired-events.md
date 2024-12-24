---
title: Segment to FME integration is not showing desired events
sidebar_label: Segment to FME integration is not showing desired events
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360020571271-Segment-to-Split-integration-is-not-showing-desired-events </button>
</p>

## Problem

Segment to Split integration is set up to enable tracking event "checkout". Under the eventTypeId field, we put "checkout". However, the checkout event never shows up under "Traffic Type" page.

[](https://help.split.io/hc/article_attachments/360016436592/Screen_Shot_2018-12-04_at_2.35.16_PM.png)

## Root cause

The eventTypeId field in the Segment integration page is incorrectly set. You should not put the actual event name here, only the property name that holds the event name.

## Solution

Review the JSON structure for the desired event in Segment, and based on the structure, determine the property Path+Name and add it to the Segment integration page in the Split user interface.

For example, if the Segment JSON is as below:

```json
{
   "event": "checkout"
   "properties" : {
     "environmentId" : "xxxxx"
     "environmentName" : "xxxxx"
     "key" : "zxcv"
     "machineIP" : "x.x.x.x"
     "page" : "eCommerce"
   }
}
```

The eventTypeId field should be set to event.

For the example below:

```json
{
   "eventId": "231344"
   "properties" : {
     "eventName" : "checkout"
     "environmentId" : "xxxxx"
     "environmentName" : "xxxxx"
     "key" : "zxcv"
     "machineIP" : "x.x.x.x"
     "page" : "eCommerce"
   }
}
```

The eventTypeId field should be set to `properties.eventName`.