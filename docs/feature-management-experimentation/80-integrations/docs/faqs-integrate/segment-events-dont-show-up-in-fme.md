---
title: Segment events don't show up in FME
sidebar_label: Segment events don't show up in FME
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360034941652-Segment-Why-don-t-my-segment-events-show-up-in-Split </button>
</p>

### Issue

After setting up Segment and Split integration to send Events from Segment to Split, events are created in Segment but they do not show up in Split.

### Root cause

Possible root cause is that there are Destination Filters applied to the Split destination in Segment.

### Solution

1. Login to your Segment account.
2. Click on Destinations.
3. Select the Split Destination.
4. Under the Destination Filters tab, make sure there are no filters configured to block the events you are expecting to see in Split.