---
title: Concurrent Pipelines running with Bakes Fail (Packer behavior in Rosco)
---

## Issue
Attempting to run two concurrent Bake jobs (packer-based bakes only) with the same parameters in different pipelines can cause unexpected failures.  Running the same pipelines with ample time for one pipeline to complete and then the other generates no errors.  
 

## Cause
Due to how resources are identified to prevent conflicts, bake operations can fail with little information about why a failure occurred.  Running the bakes non-concurrently (at separate times) will work fine.  This issue primarily impacts Azure bakes due to how Azure tracks unique bake operations though it can potentially affect Bakes to other cloud providers.

The issue can be traced back to how Bakes are run.  When Bakes are run, a combination of values generates a unique key for resource and tracking purposes.
If a Bake doesn't correctly generate a unique resource for a given provider (AWS/GCP/Azure), unexpected failures can occur.  Azure is the most common place where these failures occur as Azure doesn't utilize a ```base_ami``` value, and the baking system was initially designed for AWS AMIs.  Azure bakes use a value, ```base_name```, which is not automatically added as part of the unique key (see issue: [https://github.com/spinnaker/spinnaker/issues/6738](https://github.com/spinnaker/spinnaker/issues/6738)).

Suppose a bake occurs without unique parameters for the set of fields.  In that case, it will likely fail upon concurrent executions because there will be an overlap in the bakes since the new Bake has the same parameters as the Bake that has yet to be completed.

