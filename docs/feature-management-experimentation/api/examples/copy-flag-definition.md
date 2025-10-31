---
title: Copy and Overwrite Feature Flag Definitions Between Environments
description: Learn how to copy feature flag definitions for a given flag in your workspace from one environment to another, and overwrite existing definitions in the target environment using the Admin API.
sidebar_position: 6
sidebar_label: Copy and Overwrite Feature Flag Definitions Between Environments
---

## Overview

Use this script to copy feature flag definitions for a given flag in your workspace from one environment to another, and overwrite existing definitions in the target environment.

### Prerequisites

- Install the [Python Admin API Wrapper](/docs/feature-management-experimentation/api/wrappers/python-admin-api).
- You've created an Admin API key from the Split UI.

## Configuration

Before running the script, update the following variables in the code:

- `ADMIN API KEY`: Your Split Admin API key.
- `sourceSplitName`: The name of the feature flag you want to use as the source.
- `sourceWorkspaceName`: The name of the workspace that contains the source feature flag.
- `sourceEnvironmentName`: The environment where the source feature flag is defined.
- `targetEnvironmentName`: The environment where you want to copy or apply the feature flag or related changes.

Run this script using Python 3 from your local machine or preferred development environment.

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