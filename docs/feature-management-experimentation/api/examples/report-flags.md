---
title: Report Feature Flags with 100% Treatment and are Unchanged for a Specific Time Period
description: Learn how to extract feature flag names that serve 100% treatment in the default rule and have not been changed for a specific time for a given workspace or environment using the Admin API.
sidebar_position: 9
sidebar_label: Report Feature Flags with 100% Treatment and are Unchanged for a Specific Time Period
---

## Overview

Use this script to extract feature flag names that serve 100% treatment in the default rule, have not been changed for a specific time for a given workspace or environment, and last received impressions for a specific amount of time.

### Prerequisites

- Install the [Python Admin API Wrapper](/docs/feature-management-experimentation/api/wrappers/python-admin-api).
- You've created an Admin API key from the Split UI.

## Configuration

Before running the script, update the following variables in the code:

- `ADMIN API KEY`: Your Split Admin API key.
- `workspaceName`: The name of the workspace.
- `environmentName`: The name of the environment.
- `LastModifiedTime`: A date used to filter feature flags based on when they were last modified. Only flags modified on or after this date will be included.
- `LastTrafficReceived`: A date used to filter feature flags based on the last time they received traffic (impressions). Only flags that have not received traffic since this date will be included.

Run this script using Python 3 from your local machine or preferred development environment. The script will loop through all workspaces, environments, and feature flags, and check the target dates threshold for the feature flags' last modified and last impressions received dates. The script will print out the feature flag, environment, and workspace names.

:::tip
This script is useful to detect old feature flags that can be removed from the code as the feature is completely enabled or disabled and no changes done to the feature flag for certain time.
:::

```python
from splitapiclient.main import get_client
import datetime

#############################################
workspaceName = "Defaults"
environmentName = "Production"
LastModifiedTime= datetime.datetime(2021, 11, 1)
LastTrafficReceived = datetime.datetime(2021, 11, 1)
#############################################

client = get_client({'apikey': 'ADMIN API KEY'})
cuttoffModifiedDate = 1000 * float(LastModifiedTime.strftime('%s'))
trafficReceivedDate = 1000 * float(LastTrafficReceived.strftime('%s'))
finalList = []

for ws in client.workspaces.list():
    for env in client.environments.list(ws.id):
        for spDef in client.split_definitions.list(env.id, ws.id):
            if spDef._lastUpdateTime<cuttoffModifiedDate:
                if spDef._lastTrafficReceivedAt>trafficReceivedDate:
                    for dr in spDef._default_rule:
                        if dr._size==100:
                            finalList.append([ws.name, env.name, spDef.name])
                            print(ws.name+", "+env.name+", "+spDef.name)
```