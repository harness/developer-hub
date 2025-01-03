---
title: Events not seen in FME when using FME API call to post new events
sidebar_label: Events not seen in FME when using FME API call to post new events
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360050550512-Events-not-seen-in-Split-when-using-Admin-API-call-to-post-new-events </button>
</p>

### Issue

When using Admin REST API to [post events](https://docs.split.io/reference/events-overview), the call response code is 202, but the event does not show up in Split Data hub.

### Root cause

This issue can occur if the Epoch timestamp used is invalid, empty, or in seconds, instead of milliseconds. 

### Answer

Verify the following data in the call is correct:

1. Epoch timestamp used is in millisecond.
2. Traffic type used exists in Split organization.
3. The API key used is the SDK API Key and not Admin API Key.