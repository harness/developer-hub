---
title: Orca mishandling SpEL Expressions
---

## Issue
An organization may experience Orca mishandling SpEL Expressions. An example payload is below. 
```
payload: '{"subexperienceApprover":"${execution[''stages''].?[type == ''manualJudgment''][0][''context''][''lastModifiedBy'']}","clusterName": "${parameters[''Cluster Name'']}","subExperience": "${parameters[''Sub-experience Name'']}","GCPProjectID": "${parameters[''GCP Project ID'']}","namespace": "${parameters[''Namespace'']}","writeGroups": ["${parameters[''AD Write Group(s)'']}"],"readGroups": ["${parameters[''AD Read Group(s)'']}"],"location": "${parameters[''Cluster Location'']}","endpoint":"${parameters[''Public Endpoint'']}"}'
```

If this example payload is run through spinnaker, Orca will evaluate each of the parameters individually instead of having that payload be there for future runs to evaluate each of the needed parameters on the actual user run. The run through of Spinnaker will be set as (```executionId```, ```NameSpace```, etc..) This issue can also arise from Orca evaluating SpEL Expressions when none exist, which can cause a failed pipeline.
Related to the below Github Issue.
[https://github.com/spinnaker/spinnaker/issues/5910](https://github.com/spinnaker/spinnaker/issues/5910)

## Cause
The SpEL expression toggle in Deck is not working as expected. This is a bug that affects Armory and Spinnaker Version 2.24 and below. There are legitimate cases where there is a mix of some SpEL expressions that should be evaluated and cases where they shouldn't be evaluated. This is exacerbated by SpEL Expressions starting with ```$``` in Manifest Files which can cause Orca some confusion.



