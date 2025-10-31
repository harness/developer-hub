---
title: Add a Segment to Individual Targets for a Group of Feature Flags
description: Learn how to individually target segments to treatments for a given array of feature flags using the Admin API.
sidebar_position: 11
sidebar_label: Add a Segment to Individual Targets for a Group of Feature Flags
---

## Overview

Use this script to individually target segments to treatments for a given array of feature flags in a workspace or environment.

### Prerequisites

- Install the [Python Admin API Wrapper](/docs/feature-management-experimentation/api/wrappers/python-admin-api).
- You've created an Admin API key from the Split UI.

## Configuration

Before running the script, update the following variables in the code:

- `ADMIN API KEY`: Your Split Admin API key.
- `workspaceName`: The name of the workspace.
- `environmentName`: The name of the environment.
- `segmentNames`: The name of the segment.
- `splits`: The array of feature flag and treatment names.

Run this script using Python 3 from your local machine or preferred development environment. The script does not verify if the given segment name is added to the same traffic type and environment.

```python
from splitapiclient.main import get_client

#############################################
workspaceName="Default"
environmentName="Production"
splits=[["clients_on", "off"], ["clients", "off"]]
segmentNames=["coldweather"]
#############################################

ws = client.workspaces.find(workspaceName)
env = client.environments.find(environmentName, ws.id)
splitDef = client.split_definitions.find(splitName, env.id, ws.id)

for splitDef in client.split_definitions.list(env.id, ws.id):
    for split in splits:
        if splitDef._name == split[0]:
            trs = []
            for tr in splitDef._treatments:
                if tr._name == split[1]:
                    tr._segments = segmentNames
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