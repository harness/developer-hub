---
title: Add user IDs to a segment in batches of 1000
sidebar_label: Add user IDs to a segment in batches of 1000
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360044314111-Python-Admin-API-sample-Import-thousands-of-keys-to-existing-segment </button>
</p>

Basic code uses REST Admin API to import user keys into an existing segment in a given environment.

## How to use

 - Class wrapper for FME API, installation instructions in this link: [Python Library Wrapper for FME API](https://help.split.io/hc/en-us/articles/4412331052685)
 - Update your Split Admin API key in the code below.
 - Update the `workspaceName` (project name), `environmentName`, `segmentName` (feature flag name) variables.

The example below shows importing Keys from csv file, the code will import keys in batches of 1000.

```python
from splitapiclient.main import get_client

#############################################
workspaceName = "Default"
environmentName = "Production"
segmentName = "test_24k"
sourceFile = "/Users/bilalal-shahwany/Downloads/all_keys.csv"
#############################################

client = get_client({'apikey': 'ADMIN API KEY'})
ws = client.workspaces.find(workspaceName)
env = client.environments.find(environmentName, ws.id)
segDef = client.segment_definitions.find(segmentName, env.id, ws.id)

with open(sourceFile, "r") as a_file:
    cnt=0
    keys = []
    for line in a_file:
        cnt = cnt + 1
        if cnt > 1000:
            final = {"keys": keys, "comment":"adding 1k keys"}
            print(final)
            segDef.import_keys_from_json("false", final)
            keys = []
            cnt = 0
        keys.append(line.strip())
    if cnt < 1000:
        final = {"keys":keys, "comment":"adding 1k keys"}
        segDef.import_keys_from_json("false", final)
```