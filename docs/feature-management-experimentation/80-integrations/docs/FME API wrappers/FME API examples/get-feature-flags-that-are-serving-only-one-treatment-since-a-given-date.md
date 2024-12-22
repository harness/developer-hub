---
title: Get feature flags that are serving only one treatment since a given date
sidebar_label: Get feature flags that are serving only one treatment since a given date
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360043412752-Python-Admin-API-sample-Report-feature-flags-with-100-treatment-and-not-changed-for-certain-time-period </button>
</p>

Basic code to use Python and Split REST API to extract feature flags names that serve 100% treatment in default rule and have not been changed for a specific time for  a given workspace/environment, and last received impressions for specific time.

This script is useful to detect old feature flags that can be removed from the code as the feature is completely enabled or disabled and no changes done to the feature flag for certain time.

## How to use

 - Class wrapper for FME API, installation instructions in this link: [Python Library Wrapper for FME API](https://help.split.io/hc/en-us/articles/4412331052685)
 - Update your Split Admin API key in the code below.
 
 The script will loop through all workspaces, environments and feature flags and check the target dates threshold for feature flag last modified and last impressions received dates. The script will print out the feature flag, environment and workspace (project) names.

```python
from splitapiclient.main import get_client
import datetime

#############################################
workspaceName = "Defaults"
environmentName = "Production"
LastModifiedTime= datetime.datetime(2021, 11, 1)
LastTrafficReceived = datetime.datetime(2021, 11, 1)
#############################################

client = get_client({'apikey': 'ADMIN API KEY'})
cuttoffModifiedDate = 1000 * float(LastModifiedTime.strftime('%s'))
trafficReceivedDate = 1000 * float(LastTrafficReceived.strftime('%s'))
finalList = []

for ws in client.workspaces.list():
    for env in client.environments.list(ws.id):
        for spDef in client.split_definitions.list(env.id, ws.id):
            if spDef._lastUpdateTime<cuttoffModifiedDate:
                if spDef._lastTrafficReceivedAt>trafficReceivedDate:
                    for dr in spDef._default_rule:
                        if dr._size==100:
                            finalList.append([ws.name, env.name, spDef.name])
                            print(ws.name+", "+env.name+", "+spDef.name)
```