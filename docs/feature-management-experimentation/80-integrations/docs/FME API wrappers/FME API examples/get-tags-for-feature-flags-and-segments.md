---
title: Get tags for feature flags and segments
sidebar_label: Get tags for feature flags and segments
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/4411406899725-Python-Admin-API-Sample-Extract-list-of-tags-for-feature-flags-and-segments </button>
</p>

Basic code to use Python and Split REST API to export the tags associated with feature flags and segments.

## How to use

 - Class wrapper for FME API, installation instructions in this link: [Python Library Wrapper for FME API](https://help.split.io/hc/en-us/articles/4412331052685)
 - Update your Split Admin API key in the code below.

```python
from splitapiclient.main import get_client

client = get_client({'apikey': 'ADMIN API KEY'})
print('workspace, split, segment, tag')
for ws in client.workspaces.list():
    for split in client.splits.list(ws.id):
        if split._tags is None:
            continue
        for tag in split._tags:
            print(ws.name+","+split._name+",,"+tag['name']))
    for segment in client.segments.list(ws.id):
        if segment._tags is None:
            continue
        for tag in segment._tags:
            print(ws.name+","+split._name+",,"+tag['name']))
```