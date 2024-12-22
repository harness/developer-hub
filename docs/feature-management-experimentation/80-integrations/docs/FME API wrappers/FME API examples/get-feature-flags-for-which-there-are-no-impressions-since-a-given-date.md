---
title: Get feature flags for which there are no impressions since a given date
sidebar_label: Get feature flags for which there are no impressions since a given date
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/4411398846349-Python-Admin-API-sample-Export-all-feature-flags-that-have-not-received-Impressions-from-certain-date </button>
</p>

Basic code to use Python and Split REST API to export feature flags names that did not receive any impressions from certain date in a specific environments and workspace.

## How to use

 - Class wrapper for FME API, installation instructions in this link: [Python Library Wrapper for FME API](https://help.split.io/hc/en-us/articles/4412331052685)
 - Update your Split Admin API key in the code below.
 - Update the `workspaceName` (project name) and `environmentName` variables.
 - Set the `cutoffDate` variable as Epoch Time.

```python
from splitapiclient.main import get_client

#############################################
workspaceName="Default"
environmentName="Production"
cutoffDate = 1633114468000
#############################################

client = get_client({'apikey': 'ADMIN API KEY'})
ws = client.workspaces.find(workspaceName)
env = client.environments.find(environmentName, ws.id)
for splitDef in client.split_definitions.list(env.id, ws.id): 
    if splitDef._lastTrafficReceivedAt<cutoffDate:
        print(splitDef._name, splitDef._lastTrafficReceivedAt)
```