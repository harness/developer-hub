---
title: Export All Feature Flags that have not received Impressions from a Specific Date
description: Learn how to export all feature flags that have not received impressions from a specific date using the Admin API.
sidebar_position: 4
sidebar_label: Export All Feature Flags that have not received Impressions from a Specific Date
---

## Overview

Use this script to export all feature flag names that have not received any impressions from a specific date in a given environment and workspace.

### Prerequisites

- Install the [Python Admin API Wrapper](/docs/feature-management-experimentation/api/wrappers/python-admin-api).
- You've created an Admin API key from the Split UI.
- Make sure you have the workspace name and environment name associated with your feature flags and segments.

## Configuration

Before running the script, update the following variables in the code:

- `ADMIN API KEY`: Your Split Admin API key.
- `workspace_name`: Name of your workspace.
- `environment_name`: Name of the environment.
- `cutoffDate`: Set this variable as Epoch time.

Run this script using Python 3 from your local machine or preferred development environment.

```python
from splitapiclient.main import get_client

#############################################
workspaceName="Default"
environmentName="Production"
cutoffDate = 1633114468000
#############################################

client = get_client({'apikey': 'ADMIN API KEY'})
ws = client.workspaces.find(workspaceName)
env = client.environments.find(environmentName, ws.id)
for splitDef in client.split_definitions.list(env.id, ws.id): 
    if splitDef._lastTrafficReceivedAt<cutoffDate:
        print(splitDef._name, splitDef._lastTrafficReceivedAt)
```