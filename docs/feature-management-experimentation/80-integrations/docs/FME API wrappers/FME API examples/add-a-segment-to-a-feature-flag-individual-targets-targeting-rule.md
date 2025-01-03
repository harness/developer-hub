---
title: Add a segemnt to a feature flag individual targets targeting rule
sidebar_label: Add a segemnt to a feature flag individual targets targeting rule
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360032185971-Python-Admin-API-sample-Add-a-segment-to-individual-targets-for-group-of-feature-flags </button>
</p>

Basic code to use Python and Split REST API to individually target segments to treatments for a given array of feature flags names within a given workspace/environment.

## How to use

 - Class wrapper for FME API, installation instructions in this link: [Python Library Wrapper for FME API](https://help.split.io/hc/en-us/articles/4412331052685)
 - Update your Split Admin API key, environment name, workspace (project) name, and segment name in the code below.
 - Update the feature flag and treatment names in the `splits` array

:::warning
The script does not verify if the given segment name is added to the same traffic type and environment.
:::

```python
from splitapiclient.main import get_client

#############################################
workspaceName="Default"
environmentName="Production"
splits=[["feature_flag_01", "off"], ["feature_flag_02", "off"]]
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