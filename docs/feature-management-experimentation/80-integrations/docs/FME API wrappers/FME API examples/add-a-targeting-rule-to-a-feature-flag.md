---
title: Add a targeting rule to a feature flag
sidebar_label: Add a targeting rule to a feature flag
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360030918611-Python-Admin-API-sample-Adding-targeting-rule-to-an-existing-feature-flag </button>
</p>

Basic code to use Python to add new targeting rules to an existing feature flag.

The script will use the REST Admin API to perform the actions. The example contain two targeting rules added.

## How to use

 - Class wrapper for FME API, installation instructions in this link: [Python Library Wrapper for FME API](https://help.split.io/hc/en-us/articles/4412331052685)
 - Update your Split Admin API key in the code below.
 - Update the `workspaceName` (project name), `environmentName`, `splitName` (feature flag name) variables.

```python
from splitapiclient.main import get_client

############################################
workspaceName = "Default"
environmentName = "Production"
splitName = "clients_on"
############################################

client = get_client({'apikey': 'ADMIN API KEY'})
ws = client.workspaces.find(workspaceName)
env = client.environments.find(environmentName, ws.id)
splitDef = client.split_definitions.find(splitName, env.id, ws.id)

trs = []
for tr in splitDef._treatments:
    trs.append(tr.export_dict())
rls = []
for rl in splitDef._rules:
    rls.append(rl.export_dict()) 
drls = []
for drl in splitDef._default_rule:
    drls.append(drl.export_dict())
rls.append({"buckets": [{"treatment": "on","size": 100}],"condition": {"matchers": [{"attribute":"userGroup", "type": "MATCHES_STRING","string": "employees"}], "combiner": "AND"}})
splitDefinition = {"treatments": trs,"defaultTreatment": splitDef._default_treatment, "rules": rls, "defaultRule": drls}
splitDef.update_definition(splitDefinition)
```