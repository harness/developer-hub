---
title: Dinghy file does not update pipelines in Spinnaker
---

## Issue
This issue is seen when the application and pipeline are created by the same ```dinghyfile```, and need to be imported twice so the reference will be ingested into the process properly as upon execution, and at the time of initial evaluation, the pipeline ID was unavailable.  Therefore, the ```dingyfile``` needs to be executed twice to see the pipeline ID. 

## Cause
This issue is observed as in the first commit, the auto-gen ID is present but converted into null within the trigger and thus not assigned as it doesn't exist. At the 2nd commit, the ```pipelineID``` function is able to locate the ID.
 

