---
title: Disable Deployment Registration banner message "You configured a feature that requires registration"
---

## Introduction
Starting in Armory Enterprise 2.27, users will be prompted with a banner message in the Spinnaker UI to register their instance with Armory Cloud. This feature will attempt to make API calls to Armory in order to check whether the instance has been registered with Armory, which may be considered usage data and therefore not be permitted with some customers depending on their contract or situation.The text of the banner message reads:
```You configured a feature that requires registration. Registering shares your unique instance ID, which is required for certain features to work. Register here: ```
This is a non-optional feature for most users of Armory, however **air-gapped customers may need this feature disabled** as it will attempt to make API calls toward Armory to check registration status.The banner should not be removed, and will not interfere with Spinnaker Usage.  Please note customers should be sending this data to ArmoryImplementation: [RegistrationVerificationMessenger.kt](https://github.com/armory-plugins/instance-registration/blob/master/instance-registration-gate/src/main/kotlin/io/armory/spinnaker/gate/registration/RegistrationVerificationMessenger.kt)

## Prerequisites
Air-gapped Armory 2.27+

## Instructions
To disable the deployment registration message from appearing, add the following patch to your Spinnaker configuration:
```
apiVersion: spinnaker.armory.io/v1alpha2
kind: SpinnakerService
metadata:
  name: spinnaker
spec:
  spinnakerConfig:
    profiles:
      spinnaker:
        spinnaker:  # This second `spinnaker` is required
          extensibility:
            plugins:
              Armory.InstanceRegistration:
                enabled: false
```