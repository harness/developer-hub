---
title: Quiet the Echo Service
---

## Introduction
When planning and upgrade or maintenance in Spinnaker, Echo by default will keep on triggering notification which may cause unwanted errors or issues with stuck pipelines. Quieting Echo during the maintenance time will prevent unwanted echo triggers during that time. With triggers suppressed this effectively stops pipelines from being run if they are flagged to respect the quiet period. 
There are two options to quieting the Echo service. The first option is to disable communication to Orca. This will prevent ANY trigger from firing and cannot be scheduled. The second option is enable ```quietPeriod``` in Echo. This allows a quiet period to be scheduled and allows the operator to configure which triggers should be suppressed.


## Prerequisites
Suppressing all triggers by disabling communication to Orca
In the Echo profile file ```echo-local.yml``` add the following configuration ```orca.enabled: false``` and redeploy Echo. This will suppress all triggers until this setting is changed back to ```true``` and the Echo service is redeployed.

## Instructions
Enable quietPeriod
**NOTE:** Pipelines **MUST** be configured to respect the quiet period for this to work!!!
The following sample config will suppress the list of triggers in ```suppressedTriggerTypes``` from ```startIso``` to ```endIso``` if ```quietPeriod.enabled: true```. The triggers will automatically start working again after the ```endIso``` time. It can also be manually disabled by changing ```quietPeriod.enabled``` back to ```false```.
In Echo’s profile
In the Echo profile file ```echo-local.yml``` in Halyard's hal config profiles directory e.g. (```~/.hal/default/profiles/```) or in Operator under the ```spec.spinnakerConfig.profiles.echo, ```add the following configuration and replace everything in between ```<>``` in the ```startISO``` and ```endISO``` parameters and change the list of ```suppressedTriggerTypes``` as needed.

quietPeriod:
  enabled: true
  startIso: 
  endIso: 
  # see https://github.com/spinnaker/echo/blob/64cb72de7648a82d392db459e98026d1a9c16959/echo-model/src/main/java/com/netflix/spinnaker/echo/model/Trigger.java#L77 for list of triggers
  # The following will suppress all triggers including a Manual trigger
  suppressedTriggerTypes:
    - cron
    - webhook
    - git
    - concourse
    - jenkins
    - docker
    - pubsub
    - dryrun
    - pipeline
    - plugin
    - helm
    - manual

In Deck’s settings-local.js
In Deck’s ```settings-local.js``` file in Halyard's hal config profiles directory e.g. (```~/.hal/default/profiles/```) add the following: 
```window.spinnakerSettings.feature.quietPeriod = true;```
 
In Operator under the ```spec.spinnakerConfig.profiles.deck.settings-local.js:```
spec:
  spinnakerConfig:
    profiles:
      deck:
        settings-local.js:
          window.spinnakerSettings.feature.quietPeriod = true;
``````
Update Pipeline configs to respect quietPeriod
For a pipeline to respect Echo’s ```quietPeriod``` setting it must have the following set in its pipeline definition at the same indent level as ```stages``` and ```triggers```:
```"respectQuietPeriod": true```
If this is not set it is assumed that the pipeline does NOT respect Echo’s quietPeriod setting.
**Example pipeline config snippet**

{
  "appConfig": {},
  "expectedArtifacts": [],
  "keepWaitingPipelines": false,
  "lastModifiedBy": "admin",
  "limitConcurrent": true,
  "respectQuietPeriod": true,
  "spelEvaluator": "v4",
  "stages": [],
  "triggers": [],
  "updateTs": "1625697650000"
}


**Update config via the Deck UI**
****

