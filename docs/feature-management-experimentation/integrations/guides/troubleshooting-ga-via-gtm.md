---
title: Troubleshooting Google Analytics via Google Tag Manager with the JavaScript SDK
description: Learn how to troubleshoot Google Analytics through Google Tag Manager with the FME JavaScript SDK.
sidebar_position: 6
sidebar_label: Troubleshooting Google Analytics
---

## Overview

When using Google Tag Manager to deploy and capture events with Google Analytics library, setting up the JavaScript SDK to capture GA events via the SDK integration does not capture any GA events.

There are two potential root causes for this behavior:

1. The JavaScript SDK will capture events of a given GA tracker, by default when running this required command:

   ```bash
   window.ga('require', 'splitTracker');
   ```

   The SDK will capture all the event reported by the default GA tracker only. If GA has other trackers, then we need run additional command for each tracker to hook the SDK to it

1. If Google Tag Manager is configured to pick up the events that are pushed to `window.datalayer` object, then it will create a new tracker for every new event it sends, which makes the trackers dynamically created continuously and would not work with the SDK integration.

If GA or GTM uses multiple trackers, for example, if we have two more trackers; `gtm1` and `gtm2`, you can run the following commands:

```bash
window.ga('gtm1.require', 'splitTracker');
window.ga('gtm2.require', 'splitTracker');
```

We can also detect all trackers dynamically and add them to the SDK hook:

```bash
var trackers = window.ga.getAll();
for (var i = 0; i < trackers.length; i++) { 
    trackerName = trackers[i].model.data.ea[':name']; 
    console.log(trackerName)
    window.ga(trackerName+'.require','splitTracker');
}
```

If GTM is creating new trackers dynamically per each GA event, Harness recommends using the SDK `client.track` method to send events picked up from the same `window.datalayer` object.