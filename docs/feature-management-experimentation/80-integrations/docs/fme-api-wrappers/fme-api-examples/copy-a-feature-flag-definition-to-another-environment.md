---
title: Copy a feature flag definition to another environment
sidebar_label: Copy a feature flag definition to another environment
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360051602451-Python-Admin-API-sample-Copy-and-overwrite-feature-flag-definitions-between-environments </button>
</p>

Basic code to use Python to copy feature flag fefinition (Individual targets, targeting rules, and treatments) for a given feature flag in workspace from one environment to another, and overwrite existing definitions in the target environment.

The script will use the REST Admin API to perform the actions.

## How to use

 - Class wrapper for FME API, installation instructions in this link: [Python Library Wrapper for FME API](https://help.split.io/hc/en-us/articles/4412331052685)
 - Update your Split Admin API key in the code below.
 - Update the `sourceWorkspaceName` (project name), `sourceEnvironmentName`, `targetEnvironmentName`, `sourceSplitName` (feature flag name) variables.

```python
from splitapiclient.main import get_client
import json

#############################################
sourceSplitName="clients"
sourceWorkspaceName="Default"
sourceEnvironmentName="Production"
targetSplitName=sourceSplitName
targetWorkspaceName=sourceWorkspaceName
targetEnvironmentName="Staging"
#############################################

client = get_client({'apikey': 'ADMIN API KEY'})
sourceWs = client.workspaces.find(sourceWorkspaceName)
sourceEnv = client.environments.find(sourceEnvironmentName, sourceWs.id)
sourceSplitDef = client.split_definitions.find(sourceSplitName, sourceEnv.id, sourceWs.id)
targetWs = client.workspaces.find(targetWorkspaceName)
targetEnv = client.environments.find(targetEnvironmentName, targetWs.id)
targetSplitDef = client.split_definitions.find(targetSplitName, targetEnv.id, targetWs.id)

trs = []
for tr in sourceSplitDef._treatments:
   trs.append(tr.export_dict())
rls = []
for rl in sourceSplitDef._rules:
   rls.append(rl.export_dict()) 
drls = []
for drl in sourceSplitDef._default_rule:
   drls.append(drl.export_dict()) 
splitDefinition = {"treatments": trs,"defaultTreatment": sourceSplitDef._default_treatment, "rules": rls, "defaultRule": drls}
targetSplitDef.update_definition(splitDefinition)
```