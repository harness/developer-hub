---
title: Delete all user IDs from a segment in batches of 1000
sidebar_label: Find all feature flags that have dependency on a given flag
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360030837932-Python-Admin-API-sample-Delete-thousands-of-keys-in-a-segment <br />  ✘ shouldn't '90' in the example be '999' ? </button>
</p>

Basic code to use Python and Split REST API to delete segment keys on chunks when the segment contains thousands of keys.

## How to use

 - Class wrapper for FME API, installation instructions in this link: [Python Library Wrapper for FME API](https://help.split.io/hc/en-us/articles/4412331052685)
 - Update your Split Admin API key, environment, workspace (project), and segment names in the code below.

 :::tip
 If you only have one workspace, use the Default workspace.
 :::

```python
from splitapiclient.main import get_client

#############################################
workspaceName = "Defaults"
environmentName = "Production"
segmentName = "employees"
#############################################

client = get_client({'apikey': 'ADMIN API KEY'})
ws = client.workspaces.find(workspaceName)
env = client.environments.find(environmentName, ws.id)
segDef = client.segment_definitions.find(segmentName, env.id, ws.id)

segKeys = segDef.get_keys()
cnt=0
keys = []
for key in segKeys:
    cnt = cnt + 1
    if cnt > 90:
        final = {"keys": keys, "comment":"removing 1k keys"}
        segDef.remove_keys(final)
        keys = []
        cnt = 0
    keys.append(key)
if cnt < 90:
    final = {"keys": keys, "comment":"removing 1k keys"}
    segDef.remove_keys(final)
```