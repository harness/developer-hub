---
title: The timeout of Bake Stage does not respect the timeout in Bake Stage configuration
---

## Issue
Users may notice that although the configuration of ```Fail Stage after a specific amount of time``` for a bake stage in Spinnaker is set to 4.5 hours:The bake stage does not respect the set timeout limit.  It would instead expire before that limit (in this example, 4 hours), although the baking process continues in the environment. The UI would show the following:



## Cause
The option ```Fail stage after a specific amount of time``` forces the stage to fail if its running time exceeds a specific length.
By default, Spinnaker can use sensible timeouts dependent on the stage type and the operations the stage needs to perform at runtime. These defaults can vary based on chosen configuration.
As such, the timeout of bake stage not matching the timeout in the configuration in Spinnaker UI is expected behaviour, as the timeout of the stage may exceed the set maximum time in the Spinnaker Manifest.  

