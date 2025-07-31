---
title: Export All Feature Flag Definition JSON Structures
description: Learn how to export all feature flag definitions' JSON structure in all environments and workspaces using the Admin API.
sidebar_position: 12
sidebar_label: Export All Feature Flag Definition JSON Structures
---

## Overview

Use this script to export all feature flag definitions' JSON structure in all environments and workspaces to a file named `[Workspace Name]_[Environment Name]_[Split Name].json`.

### Prerequisites

- Install the [Python Admin API Wrapper](/docs/feature-management-experimentation/api/wrappers/python-admin-api).
- You've created an Admin API key from the Split UI.

## Configuration

Before running the script, update the following variables in the code:

- `ADMIN API KEY`: Your Split Admin API key.
- `workspaceName`: The name of the workspace.
- `environmentName`: The name of the environment.
- `targetFolder`: The directory where the JSON file lives.

Run this script using Python 3 from your local machine or preferred development environment. 

```python
from splitapiclient.main import get_client

#############################################
workspaceName = "Defaults"
environmentName = "Production"
targetFolder="/Users/bilalal-shahwany/Desktop/WeWork/"
#############################################

def SaveToFile(splitDefinition, splitName, workspaceName, environmentName):
    reportObj = open(targetFolder+workspaceName+"_"+environmentName+"_"+splitName+".json", "w")
    json.dump(splitDefinition, reportObj)
    reportObj.close()

ws = client.workspaces.find(workspaceName)
env = client.environments.find(environmentName, ws.id)
for splitDef in client.split_definitions.list(env.id, ws.id):
   print ("Exporting Split: "+splitDef._name)
   trs = []
   for tr in splitDef._treatments:
      trs.append(tr.export_dict())
   rls = []
   for rl in splitDef._rules:
      rls.append(rl.export_dict()) 
   drls = []
   for drl in splitDef._default_rule:
      drls.append(drl.export_dict()) 
   splitDefinition = {"treatments": trs,"defaultTreatment": splitDef._default_treatment, "rules": rls, "defaultRule": drls}
   SaveToFile(splitDefinition, splitDef._name, ws._name, env._name)
```