---
title: Export feature flags and first treatments to a YAML file
sidebar_label: Export feature flags and first treatments to a YAML file
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360029219192-Python-Admin-API-sample-Export-feature-flags-treatments-to-YAML-file </button>
</p>

Example to use Python to export feature flags names and treatments to YAML files. The YAML files can be used with test automation to test all possible treatments from each feature flag.

The tool accept a list of feature flag names, will fetch the first treatment of each feature flag and create a yaml file named "feature_flag_treatments_1.yaml".

Then for each subsequent treatments, a yaml file will be created for each treatment, for example:

For example,

 

feature_flag_treatments_1.yaml:

- feature_flag1:
      treatment: 'on'

      config: '\{"name":"Staging config with spaces","value":"99"\}'

- feature_flag2:
      treatment: 'on'
- feature_flag3:
      treatment: 'on'

 

feature_flag_treatments_2.yaml:

- feature_flag1:
      treatment: 'off' 
- feature_flag2:
      treatment: 'off'
- feature_flag3:
      treatment: 'off'

 

feature_flag_treatments_3.yaml:

- feature_flag1:
      treatment: 'unallocated' 

## How to use

 - Class wrapper for FME API, installation instructions in this link: [Python Library Wrapper for FME API](https://help.split.io/hc/en-us/articles/4412331052685)
 - Update your Split Admin API key in the code below.
 - Update the `projectName` (project name), `environmentName`, `featureFlagNames`, and `targetYamlFile` variables.

```python
from splitapiclient.main import get_client
from yaml import dump

#############################################
featureFlagNames=["clients", "sample_feature"]
projectName="Default"
environmentName="Production"
targetYamlFile="feature_flags_treatment"
#############################################

client = get_client({'apikey': 'ADMIN API KEY'})
ws = client.workspaces.find(projectName)
env = client.environments.find(environmentName, ws.id)

pyarr=[[]]
arrCnt=1
for featureFlagName in featureFlagNames:
    featureFlagInfo = client.split_definitions.find(featureFlagName, env.id, ws.id)
    allTreatments=featureFlagInfo._treatments
    treatmentCnt=1
    for treatment in allTreatments:
        if treatmentCnt>arrCnt:
            pyarr.append([])
            arrCnt=arrCnt+1
        if treatment._configurations != "":
            config = treatment._configurations
            pyarr[treatmentCnt-1].append({featureFlagName: {"treatment": treatment._name, "config": config}})
        else:
            pyarr[treatmentCnt-1].append({featureFlagName: {"treatment": treatment._name}})
        treatmentCnt=treatmentCnt+1
cnt=1
for curarr in pyarr:
    stream = file("temp.yaml", 'w')
    print dump(curarr)
    stream.write(dump(curarr))
    stream.close()
    fin = open("temp.yaml")
    fout = file(targetYamlFile+str(cnt)+".yaml", 'w')
    for line in fin:
        line = line.replace("!!python/str", "")
        fout.write(line)
    fin.close()
    fout.close()    
    cnt=cnt+1
```