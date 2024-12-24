---
title: How to use Split Webhooks with Azure Logic App
sidebar_label: How to use Split Webhooks with Azure Logic App
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360033336272-How-to-programmatically-determine-if-a-particular-user-ID-exists-in-a-segment </button>
</p>

### Question

What is the best way to verify if a user ID (or key) exist in a specific segment? Using Admin API we have to fetch all the keys for all segments and loop through them to find the segment names.

### Answer

Split Webhook automatically zips the post body request to the target app server. There is a compatibility issue between the way Split uses gzip library and how Azure Logic App server decodes it.

The solution is to add the following parameter at the end of the Azure Logic App Webhook URL:

```
&gzip=false
```