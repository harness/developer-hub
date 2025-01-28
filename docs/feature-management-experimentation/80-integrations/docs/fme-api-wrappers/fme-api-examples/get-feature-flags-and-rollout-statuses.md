---
title: Get feature flags and rollout statuses
sidebar_label: Get feature flags and rollout statuses
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360030467692-Python-Admin-API-sample-Getting-list-of-feature-flags-in-environment-with-their-rollout-status </button>
</p>

Basic code to use Python to retrieve list of feature flags names and their status for given workspace and environment names.

The script will use the REST Admin API to perform the actions. Will return list of feature flags names and the rollout status value.

## How to use

 - Class wrapper for FME API, installation instructions in this link: [Python Library Wrapper for FME API](https://help.split.io/hc/en-us/articles/4412331052685)
 - Update your Split Admin API key in the code below.
 - Update the `workspaceName` (project name) and `environmentName` variables.

```python
from splitapiclient.main import get_client

#############################################
workspaceName="Default"
#############################################

client = get_client({'apikey': 'ADMIN API KEY'})
ws = client.workspaces.find(workspaceName)
for sp in client.splits.list(ws.id):
    if sp._rolloutStatus != {}:
        print (sp.name+", "+str(sp._rolloutStatus['name']))
```