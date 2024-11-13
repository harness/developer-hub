---
title: Configuring Slack notifications with sendCompactMessages to send a shorter and more compact message
---

## Introduction
By default, Slack notifications are sent with a verbose message including details about the stage it was triggered from. This message can be unnecessarily detailed, especially if using a custom message.
By enabling ```sendCompactMessages``` , a less verbose Slack message will be sent with only necessary information.
### Without ```sendCompactMessages``` enabled:
**
**
### with ```sendCompactMessages``` enabled:



## Prerequisites
Slack notifications enabled: [https://docs.armory.io/armory-enterprise/armory-admin/notifications-slack-configure/](https://docs.armory.io/armory-enterprise/armory-admin/notifications-slack-configure/)

## Instructions
In addition to the above Slack notifications configuration in ```spec.spinnakerConfig.config.notifications.slack```, add the following to the Echo profile:
apiVersion: spinnaker.armory.io/v1alpha2
kind: SpinnakerService
metadata:
  name: spinnaker  
spec:
  spinnakerConfig:
    profiles:
      echo:    # equivalent of echo-local.yml
        slack:
          sendCompactMessages: true

