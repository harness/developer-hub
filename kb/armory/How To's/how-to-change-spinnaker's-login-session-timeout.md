---
title: How to Change Spinnaker's Login Session Timeout
---

## Introduction
While using Spinnaker, some users may want to extend the login sessions. The logins are controlled by a Gate property (*server.session.timeout-in-seconds*). By default the property to 3600 seconds which is an hour. 

## Prerequisites
N/A

## Instructions
1. Edit the gate-local.yml located in the Halyard Profile config yaml (please create if it is not already created):```**.hal//profiles/gate-local.yml**```In operator, in your configuration yaml (e.g. SpinnakerService.yml) at:```**spec.spinnakerConfig.profiles.gate**```
e.g.
```
spec:
  spinnakerConfig:
    profiles: 
      gate:
```
2. Add the property and the new value in seconds```***server.session.timeout-in-seconds: ***```3. Save changes and redeploy Spinnaker 

