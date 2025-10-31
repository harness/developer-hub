---
title: Delete a List of Feature Flags and Flag Definitions
description: Learn how to delete a list of feature flags and their definitions using the Admin API.
sidebar_position: 2
sidebar_label: Delete a List of Feature Flags and Flag Definitions
---

## Overview

Use this script to delete a list of feature flags and flag definitions from all projects.

### Prerequisites

- Install the [Python Admin API Wrapper](/docs/feature-management-experimentation/api/wrappers/python-admin-api).
- You've created an Admin API key from the Split UI.
- Make sure you have the workspace and environment names where your flags are defined.

## Configuration

Before running the script, update the following variables in the code:

- `ADMIN API KEY`: Your Split Admin API key.
- `feature_flags`: Update this array with the name of the feature flags you want to delete.

Run this script using Python 3 from your local machine or preferred development environment.

```python
from splitapiclient.main import get_client

#############################################
feature_flags = ['feature_flag1', 'feature_flag2', 'feature_flag3']
#############################################

client = get_client({'apikey': 'ADMIN API KEY'})

for project in client.workspaces.list():
    print("Project: "+project.name)
    for env in client.environments.list(project.id):
        print("Environment: "+env.name)
        for flagDef in client.split_definitions.list(env.id, project.id):
            for flag in feature_flags:
                if flagDef._name==flag:
                    print("Feature flag: "+flagDef.name+", deleting definition") 
                    client.splits.remove_from_environment(flag, env.id, project.id)
    for flag in feature_flags:
        for ff in client.splits.list(project.id):
            if flag==ff._name:
                print("deleting feature flag "+flag)
                project.delete_split(flag)
```