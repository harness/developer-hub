---
title: Copy feature flags to another project
sidebar_label: Copy feature flags to another project
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360028036832-Python-Admin-API-sample-Copying-feature-flags-with-its-definition-between-projects-example </button>
</p>

Basic code to use Python to copy a feature flag definition (Individual targeting, targeting rules, and treatments) from source project/environment to a target Project/Environment. The script will create the target feature flag in the target Project, then add the feature flag definition.

If the target feature flag already exist, comment out the line that creates the target feature flag.

The script will use the REST Admin API to perform the actions.

## How to use

 - Class wrapper for FME API, installation instructions in this link: [Python Library Wrapper for FME API](https://help.split.io/hc/en-us/articles/4412331052685)
 - Update your Split Admin API key in the the code below.
 - Update the `sourceProjectName`, `sourceEnvironmentName`, `sourceSplitName` (feature flag name), `targetProjectName`, `targetEnvironmentName`, `targetSplitName` (feature flag name), `targetSplitDescription`, `targetTrafficTypeName` variables.

 :::info(Note)
 Please note each feature flag has a unique hash key used to calculate treatments when percentage distribution rule is used, i.e. users bucketing will be different in each feature flag, and their experience might change from the old to the new feature flag.
 :::

```
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