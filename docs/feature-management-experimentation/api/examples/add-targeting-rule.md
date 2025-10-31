---
title: Add Targeting Rules to an Existing Feature Flag
description: Learn how to add targeting rules to an existing feature flag using the Admin API.
sidebar_position: 14
sidebar_label: Add Targeting Rules to an Existing Feature Flag
---

## Overview

Use this script to add targeting rules to an existing feature flag.

### Prerequisites

- Install the [Python Admin API Wrapper](/docs/feature-management-experimentation/api/wrappers/python-admin-api).
- You've created an Admin API key from the Split UI.

## Configuration

Before running the script, update the following variables in the code:

- `ADMIN API KEY`: Your Split Admin API key.
- `workspaceName`: The name of the workspace. If you only have one workspace, use the Default workspace.
- `environmentName`: The name of the environment.
- `splitName`: The name of the feature flag.

Run this script using Python 3 from your local machine or preferred development environment. This example adds two targeting rules.

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