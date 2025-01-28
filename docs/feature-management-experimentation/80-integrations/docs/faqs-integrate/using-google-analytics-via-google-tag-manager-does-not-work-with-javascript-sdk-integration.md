---
title: Using Google Analytics via Google Tag Manager does not work with Javascript SDK integration
sidebar_label: Using Google Analytics via Google Tag Manager does not work with Javascript SDK integration
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360062069371-Using-Google-Analytics-via-Google-Tag-Manager-does-not-work-with-Javascript-SDK-integration </button>
</p>

### Issue

When using Google Tag Manager to deploy and capture events with Google Analytics library, setting up the Javascript SDK to capture GA events via the SDK integration does not capture any GA events.

### Root cause

There are two potential root causes for this issue:

1. The Javascript SDK will capture events of a given GA tracker, by default when running this required command:

```javascript
window.ga('require', 'splitTracker');
```

The SDK will capture all the event reported by the default GA tracker only. If GA has other trackers, then we need run additional command for each tracker to hook the SDK to it

2. If Google Tag Manager is configured to pick up the events that are pushed to window.datalayer object, then it will create a new tracker for every new event it sends, which makes the trackers dynamically created continuously and would not work with the SDK integration.

### Answers

1. If GA or GTM uses multiple trackers, for example, if we have two more trackers; gtm1 and gtm2, run the following commands:

```javascript
window.ga('gtm1.require', 'splitTracker');
window.ga('gtm2.require', 'splitTracker');
```

We can also detect all trackers dynamically and add them to SDK hook:

```javascript
var trackers = window.ga.getAll();
for (var i = 0; i < trackers.length; i++) { 
    trackerName = trackers[i].model.data.ea[':name']; 
    console.log(trackerName)
    window.ga(trackerName+'.require','splitTracker');
}
```

2. If GTM is creating new trackers dynamically per each GA event, then we recommend to use the SDK client.track method to send events picked up from the same window.datalayer object.