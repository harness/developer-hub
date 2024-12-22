---
title: Get feature flags that have a dependency on a given flag
sidebar_label: Get feature flags that have a dependency on a given flag
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/4413713254413-Python-Admin-API-Sample-Find-all-Feature-Flags-that-have-dependency-on-a-given-Flag-name </button>
</p>

Basic Code to use Python and Split REST API to show feature flags names that have dependency on a specific feature flag in a given environment and workspace names.

## How to use

 - Class wrapper for FME API, installation instructions in this link: [Python Library Wrapper for FME API](https://help.split.io/hc/en-us/articles/4412331052685)
 - Update your Split Admin API key in the code below.
 - Update the `workspaceName` (project name), `environmentName`, `splitName` (feature flag name) variables.

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