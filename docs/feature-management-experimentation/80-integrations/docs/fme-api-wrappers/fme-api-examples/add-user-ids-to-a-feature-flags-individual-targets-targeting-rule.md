---
title: Add user IDs to a feature flag's individual targets targeting rule
sidebar_label: Add user IDs to a feature flag's individual targets targeting rule
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360040085991-Python-Admin-API-sample-Adding-user-keys-to-individual-target-section-in-existing-feature-flag </button>
</p>

Basic code to use Python to add new user id (key) in the individual targeted  section of given treatment to an existing feature flag

The script will use the REST Admin API to perform the actions. The example will determine the treatment order to use in constructing the patch request payload, it also checks if an individual target section already exists for the treatment to change the JSON path accordingly.

## How to use

 - Class wrapper for FME API, installation instructions in this link: [Python Library Wrapper for FME API](https://help.split.io/hc/en-us/articles/4412331052685)
 - Update your Split Admin API key in the code below.
 - Update the `workspaceName` (project name), `environmentName`, `splitName` (feature flag name), `treatmentName` and `userIds` variables.

```python
from splitapiclient.main import get_client

############################################
workspaceName = "Default"
environmentName = "Production"
splitName = "clients_on"
userIds = ["user1", "user2", "user3"]
treatmentName="off"
############################################

client = get_client({'apikey': 'ADMIN API KEY'})
ws = client.workspaces.find(workspaceName)
env = client.environments.find(environmentName, ws.id)
splitDef = client.split_definitions.find(splitName, env.id, ws.id)

trs = []
for tr in splitDef._treatments:
    if tr._name == treatmentName:
        tr._keys = userIds
    trs.append(tr.export_dict())
rls = []
for rl in splitDef._rules:
    rls.append(rl.export_dict()) 
drls = []
for drl in splitDef._default_rule:
    drls.append(drl.export_dict()) 
splitDefinition = {"treatments": trs,"defaultTreatment": splitDef._default_treatment, "rules": rls, "defaultRule": drls}
splitDef.update_definition(splitDefinition)
```