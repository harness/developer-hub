---
title: Disable diagnostic settings results in echo pod unable to start (Armory 2.21.2)
---

## Issue
Under Armory 2.21.2, when diagnostics are disabled in the configuration:
```
  diagnostics:
   enabled: false
   uuid: xxxxxx-0d0f-40c2-aa78-xxxxxxx
   logging:
    enabled: false
    endpoint: https://debug.armory.io/v1/logs
```

And then redeployed to Spinnaker, the Echo pod unable to boot up.  
The following error can be found in the logs:
APPLICATION FAILED TO START
***************************

Description:

Parameter 0 of constructor in io.armory.spinnaker.echo.plugins.events.PluginEventsController required a bean of type 'io.armory.spinnaker.echo.plugins.events.DebugService' that could not be found.

The following candidates were found but could not be injected:
- Bean method 'diagnosticsService' in 'PluginEventsConfig' not loaded because @ConditionalOnProperty (diagnostics.enabled) found different value in property 'diagnostics.enabled'
Only if the settings are reversed again so that ```armory.diagnostic.enabled``` flag is changed to ```true``` and redeployed, will the deployment will succeed.

## Cause
There is a bug in 2.21.2 that causes the error in the Echo pod.

