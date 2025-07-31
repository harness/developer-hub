---
title: Add User Keys to the Individual Target Section in Existing Feature Flags
description: Learn how to add user keys in the individual target section of a given treatment to an existing feature flag using the Admin API.
sidebar_position: 10
sidebar_label: Add User Keys to the Individual Target Section in Existing Feature Flags
---

## Overview

Use this script to add user keys in the individual target section of a given treatment to an existing feature flag.

### Prerequisites

- Install the [Python Admin API Wrapper](/docs/feature-management-experimentation/api/wrappers/python-admin-api).
- You've created an Admin API key from the Split UI.

## Configuration

Before running the script, update the following variables in the code:

- `ADMIN API KEY`: Your Split Admin API key.
- `workspaceName`: The name of the workspace.
- `environmentName`: The name of the environment.
- `SplitName`: The name of the feature flag.
- `treatmentName`: The name of the treatment.
- `userIds`: A list of user IDs (or keys) to be targeted.

Run this script using Python 3 from your local machine or preferred development environment. The script will determine the treatment order to use in constructing the patch request payload, and checks if an individual target section already exists for the treatment to change the JSON path accordingly.

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