---
title: How to use Split Webhooks with Azure Logic App
sidebar_label: How to use Split Webhooks with Azure Logic App
helpdocs_is_private: false
helpdocs_is_published: true
---

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360030895311-How-to-use-Split-Webhooks-with-Azure-Logic-App </button>
</p>

### Question

Does the Split Webhook integration work with Azure Logic App?

### Answer

Split Webhook automatically zips the post body request to the target app server. There is a compatibility issue between the way Split uses gzip library and how Azure Logic App server decodes it.

The solution is to add the following parameter at the end of the Azure Logic App Webhook URL:

```
&gzip=false
```