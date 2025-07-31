---
title: Find Feature Flags Dependent on a Specific Flag
description: Learn how to find all feature flags that have a dependency on a feature flag name using the Admin API.
sidebar_position: 1
sidebar_label: Find Feature Flags Dependent on a Specific Flag
---

## Overview

Use this script to find all feature flags that have a dependency on a given feature flag within a specific environment and workspace.

### Prerequisites

- Install the [Python Admin API Wrapper](/docs/feature-management-experimentation/api/wrappers/python-admin-api).
- You've created an Admin API key from the Split UI.
- Make sure you have the workspace and environment names where your flags are defined.

## Configuration

Before running the script, update the following variables in the code:

- `ADMIN API KEY`: Your Split Admin API key.
- `workspaceName`: Name of your workspace.
- `environmentName`: Name of the environment.
- `splitName`: The feature flag you want to check dependencies for.

Run this script using Python 3 from your local machine or preferred development environment.

```python
from splitapiclient.main import get_client

#############################################
workspaceName="Default"
environmentName="Production"
splitName = "mysplit"
#############################################

client = get_client({'apikey': 'ADMIN API KEY'})
ws = client.workspaces.find(workspaceName)
env = client.environments.find(environmentName, ws.id)

for spDef in client.split_definitions.list(env.id, ws.id):
    for rule in spDef._rules:
        if rule._condition != {}:
            for matcher in rule._condition['matchers']:
                if 'depends' in matcher:
                    if matcher['depends']['splitName']==splitName:
                        print ("Found dependency: "+spDef.name)
```