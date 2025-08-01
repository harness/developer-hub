---
title: Copy Feature Flag Definitions Between Projects
description: Learn how to copy a feature flag definition (e.g. individual targeting, targeting rules, and treatments) using the Admin API.
sidebar_position: 17
sidebar_label: Copy Feature Flag Definitions Between Projects
---

## Overview

Use this script to copy a feature flag definition (e.g. individual targeting, targeting rules, and treatments) from a source project or environment to a target project or environment.

### Prerequisites

- Install the [Python Admin API Wrapper](/docs/feature-management-experimentation/api/wrappers/python-admin-api).
- You've created an Admin API key from the Split UI.

## Configuration

Before running the script, update the following variables in the code:

- `ADMIN API KEY`: Your Split Admin API key.
- `sourceSplitName`: The name of the source feature flag you want to copy or reference.
- `sourceProjectName`: The name of the project that contains the source feature flag.
- `sourceEnvironmentName`: The name of the environment where the source feature flag is defined.
- `targetSplitName`: The name for the new feature flag that will be created or updated.
- `targetProjectName`: The name of the project where the new feature flag will be created.
- `targetEnvironmentName`: The name of the environment where the new feature flag will be deployed.
- `targetSplitDescription`: An optional description for the new feature flag.
- `targetTrafficTypeName`: The traffic type (e.g., user) associated with the new feature flag.

Run this script using Python 3 from your local machine or preferred development environment. This script creates the target feature flag in the `target` project and adds the feature flag definition. If the target feature flag already exists, comment out the line that creates the target feature flag.

:::tip
Each feature flag has a unique hash key used to calculate treatments when a percentage distribution rule is used, i.e. user bucketing will be different in each feature flag, and their experience might change from the old to the new feature flag.
:::

```python
from splitapiclient.main import get_client

#############################################
sourceSplitName="clients"
sourceProjectName="Default"
sourceEnvironmentName="Production"
targetSplitName = "clients-new"
targetProjectName = "myApp"
targetEnvironmentName = "Prod-myApp"
targetSplitDescription = "target description"
targetTrafficTypeName = "user"
#############################################

client = get_client({'apikey': 'ADMIN API KEY'})
sourceWs = client.workspaces.find(sourceProjectName)
sourceEnv = client.environments.find(sourceEnvironmentName, sourceWs.id)
sourceSplitDef = client.split_definitions.find(sourceSplitName, sourceEnv.id, sourceWs.id)
targetWs = client.workspaces.find(targetProjectName)
targetEnv = client.environments.find(targetEnvironmentName, targetWs.id)

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
split = targetWs.add_split({'name':targetSplitName, 'description':targetSplitDescription}, targetTrafficTypeName)
splitDef = split.add_to_environment(targetEnv.id, splitDefinition)
```
