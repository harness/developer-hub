---
title: Delete feature flags
sidebar_label: Delete feature flags
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/4413636142093-Python-Admin-API-Sample-Delete-a-list-of-Feature-FLAGS-and-their-definitions </button>
</p>

Basic Code to use Python and Split REST API to delete a given feature flags names from all projects.

## How to use

 - Class wrapper for FME API, installation instructions in this link: [Python Library Wrapper for FME API](https://help.split.io/hc/en-us/articles/4412331052685)
 - Update your Split Admin API key in the code below.
 - Update the `feature_flags` array with feature flag names to be deleted.

:::danger[Cannot be undone]
Please be very careful when running the script below. When a feature flag is deleted, there is no Undo or Undelete operation.
:::

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