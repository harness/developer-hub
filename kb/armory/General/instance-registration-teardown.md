---
title: Instance registration teardown
---

## Introduction
Please be advised that as of 2024-03-08, the Armory Continuous Deployment instance registration will no longer supported and needs to be disabled in your Armory Continuous Deployment instances. 
Please see the below for additional information about the change:
When the instance registration is enabled, Deck makes some API requests to Gate and expects a specific response; otherwise, it pops up a banner notificationValidate that the change has been successfully implemented in Deck:
    Navigate to the Spinnaker Deck URL and open the developer tools    Clear the browser cache and check the API requests to the Gate URL:
  Before the change, Deck sends a periodic request to:
   /poll   /feature-specific
   After the change, Deck does NOT call these endpoints   A user can also validate that the Header plugin has been updated by viewing the request to /plugins/deck/plugin-manifest.json and reviewing the ```Armory.ArmoryHeader ``` version to be 0.2.2

Validate that the change has been successfully implemented in Gate:
     View the Gate logs and verify that the following log DOES NOT exist: ```i.a.c.cloud.config.CloudConfiguration  : Cloud service is enabled```     In case the the armory.cloud config was never enabled, and the customer doesn't have a clientId/clientSecret. The following block can be safely ignored:
```
        armory.cloud:
          enabled: false
          iam:
            tokenIssuerUrl: https://auth.cloud.armory.io/oauth/token
            clientId: 
            clientSecret: 
          api:
            baseUrl: https://api.cloud.armory.io
```
It has many parameters involved for which customers are applicable or not. For example:
If using Armory-operator > 1.4.1 and Armory version >=2.27.1 -> APPLICABLEIf using an Armory-operator =2.27.1 -> APPLICABLEIf using an Armory-operator  NOT APPLICABLE

## Prerequisites
To avoid service disruption please apply the following configuration in your Armory Continuous deployment instance.For Armory Managed customers, please be advised that no action is required from you as our engineers will apply the above configuration.

## Instructions
Here is the manifest:
````
apiVersion: spinnaker.armory.io/v1alpha2
kind: SpinnakerService
metadata:
  name: spinnaker
spec:
  spinnakerConfig:
    profiles:
      gate:
        armory.cloud:
          enabled: false
          iam:
            tokenIssuerUrl: https://auth.cloud.armory.io/oauth/token
            clientId: 
            clientSecret: 
          api:
            baseUrl: https://api.cloud.armory.io
        spinnaker:
          extensibility:
            repositories:
              pluginRepository:
                url: https://raw.githubusercontent.com/armory-plugins/pluginRepository/master/repositories.json
            plugins:
              Armory.ArmoryHeader:
                enabled: true
                version: 0.2.2
            deck-proxy:
              enabled: true
              plugins:
                Armory.ArmoryHeader:
                  enabled: true
                  version: 0.2.2
````
