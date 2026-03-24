---
title: Copy Feature Flag Definitions Between Projects
description: Learn how to copy a feature flag definition (e.g. individual targeting, targeting rules, and treatments) using the Admin API.
sidebar_position: 17
sidebar_label: Copy Feature Flag Definitions Between Projects
---

## Overview

You can use Python and the Admin API to copy feature flag definitions (including individual targeting, targeting rules, and treatments) from a source project or environment to a target project or environment. This works either across different Harness accounts or within the same Harness account.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs queryString="copy-choice">
<TabItem value="different" label="Copy Between Different Accounts">

### Prerequisites

- Install the [Python Admin API Wrapper](/docs/feature-management-experimentation/api/wrappers/python-admin-api) by running `pip install splitapiclient`.
- You've created [Admin API keys](/docs/feature-management-experimentation/api-keys/) for both source and target projects in Harness.

## Configuration

Before running the script: 

1. Configure the source API key, projects, and environments.
1. Configure the target API key and traffic type.

Run the script to copy feature flags and definitions. If your flags reference segments, you’ll need to create those segments in the target account before running the script.

```python
from splitapiclient.main import get_client

#############################################
sourceAPIKey="<SOURCE_ADMIN_API_KEY>"
sourceProjectNames=["<PROJECT>"]
sourceEnvironmentNames=["<ENV_1>", "<ENV_2>"]
targetTrafficTypeName = "user"
targetAPIKey="<TARGET_ADMIN_API_KEY>"
#############################################

sourceClient = get_client({'apikey': sourceAPIKey})
targetClient = get_client({'apikey': targetAPIKey})

for sourceProjectName in sourceProjectNames:
    for sourceEnvironmentName in sourceEnvironmentNames:
        print("Copying flags from ", sourceProjectName, " ", sourceEnvironmentName)
        sourceWs = sourceClient.workspaces.find(sourceProjectName)
        sourceEnv = sourceClient.environments.find(sourceEnvironmentName, sourceWs.id)
        splits = sourceClient.split_definitions.list(sourceEnv.id, sourceWs.id)
        for split in splits:
            print(split.name, " is being copied")
            splitMeta = sourceClient.splits.find(split.name, sourceWs.id)

            if (targetTrafficTypeName != splitMeta._trafficType._name):
                continue
            trs = []
            for tr in split._treatments:
                trs.append(tr.export_dict())
            rls = []
            for rl in split._rules:
                rls.append(rl.export_dict())
            drls = []
            for drl in split._default_rule:
                drls.append(drl.export_dict())
            splitDefinition = {"treatments": trs, "defaultTreatment": split._default_treatment, "rules": rls, "defaultRule": drls}
            targetWs = targetClient.workspaces.find(sourceProjectName)
            targetEnv = targetClient.environments.find(sourceEnvironmentName, targetWs.id)
            if(targetClient.splits.find(split._name, targetWs.id)):
                print('Split Meta already exists for Project: ', sourceProjectName, ' Flag: ', split._name)
                split=targetClient.splits.find(split._name, targetWs.id)
            else:
                print('Creating Split Meta for Project: ', sourceProjectName, ' Flag: ', split._name)
                split = targetWs.add_split({'name': split._name, 'description': splitMeta._description}, targetTrafficTypeName)
            
            if(targetClient.split_definitions.find(split._name, targetEnv.id, targetWs.id)):
                print('Updating Split Definition for Project: ', sourceProjectName, ' Environment: ', sourceEnvironmentName, ' Flag: ', split._name)
                splitDef = targetClient.split_definitions.find(split._name, targetEnv.id, targetWs.id)
                splitDef = splitDef.update_definition(splitDefinition)
            else:
                print('Adding Split Definition for Project: ', sourceProjectName, ' Environment: ', sourceEnvironmentName, ' Flag: ', split._name)
                splitDef = split.add_to_environment(targetEnv.id, splitDefinition)
```

</TabItem>
<TabItem value="same" label="Copy Within the Same Account">

### Prerequisites

- Install the [Python Admin API Wrapper](/docs/feature-management-experimentation/api/wrappers/python-admin-api) by running `pip install splitapiclient`.
- You've created an [Admin API key](/docs/feature-management-experimentation/api-keys/) for the same account in Harness.

## Configuration

Before running the script, update the following variables in the code:

| Variable | Description |
|----------|-------------|
| `ADMIN API KEY` | Your Harness FME Admin API key. |
| `sourceSplitName` | The name of the source feature flag you want to copy or reference. |
| `sourceProjectName` | The name of the project that contains the source feature flag. |
| `sourceEnvironmentName` | The name of the environment where the source feature flag is defined. |
| `targetSplitName` | The name for the new feature flag that will be created or updated. |
| `targetProjectName` | The name of the project where the new feature flag will be created. |
| `targetEnvironmentName` | The name of the environment where the new feature flag will be deployed. |
| `targetSplitDescription` | An optional description for the new feature flag. |
| `targetTrafficTypeName` | The traffic type (e.g., `user`) associated with the new feature flag. |

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

</TabItem>
</Tabs>