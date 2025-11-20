---
title: Errors don't propagate from child to parent pipelines if they occur in stages configured to "ignore the failure"
---

## Issue
Error messages don't propagate from child to parent pipelines if they occur in stages configured to ```ignore the failure```.  In these instances, the parent pipeline will not have enough information to appropriately handle the child pipeline's error.  

## Cause
This happens when a stage in the child pipeline has been set to ```ignore the failure``` if the stage fails (under ```Execution Options```).  If an error occurs in this stage, Spinnaker still considers the pipeline successful because the failure was ignored due to the setting, and even though the stage execution will display an error, the pipeline execution is not considered as "having failed" and will not signal as such. 
*note* Certain types of error will cause the entire pipeline to fail, even if the stage is set to ```ignore the failure```.  In the case of these "grand failures," Parent pipelines may fail.

