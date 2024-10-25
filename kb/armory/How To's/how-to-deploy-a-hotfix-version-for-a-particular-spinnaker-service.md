---
title: How to Deploy a Hotfix Version for a Particular Spinnaker service
---

## Introduction
The Spinnaker environment is up and running, but there is a need to deploy and install a customized (hotfix) service rather than upgrading the entire Spinnaker platform.This article advises about how to deploy a hotfix to particular Spinnaker services.

## Prerequisites
Please plan ahead for any additional affects a hotfix may cause.  Please also note that the hotfix may not be completely be tested with compatibility for all Spinnaker versions, unlike a versioned release, which has gone through testing.

## Instructions
In order to install the hotfix, the service image will need to be swapped out with the hotfix in *service-settings*.
#### In Halyard
For example, when using Halyard and in this example, a Dinghy hotfix needs to be installed, an entry will need to be made in the following service setting path (if the file doesn't already exist, please create it):  ```.``````hal//service-settings/dinghy.yml```
artifactId: 

The `````` input parameter contains the docker image path with its tag name. For example:
```artifactId: armory/dinghy:2.21.4```
After that, run the ```hal deploy apply ```command to apply the changes.For other particular services, please add different ```.yml``` files in the same service settings directory (```.hal//service-settings/```*```)```* and follow the same approach.e.g. ```clouddriver.yml```, ```kayenta.yml```, etc.
Once the affected pods boot up successfully, please verify it by using the ```kubectl describe pods ``` command to check if the container within this pod has the correct hotfix image version.
#### In Operator
In a similar scenario, when using Operator, please locate the `````` section in ```SpinnakerService.yml``` file, and add the ```artifactId``` YAML content of the corresponding service's service-setting, then apply the changes.
As an example, if making the change to Dinghy to match version ```2.21.4``` of the service, in ```spec.spinnakerConfig.service-settings```
spec:
  spinnakerConfig:
    service-settings:
      clouddriver: {}
      deck: {}
      dinghy:
        artifactId: armory/dinghy:2.21.4
      echo: {}
      fiat: {}
      front50: {}
      gate: {}
      igor: {}
      kayenta: {}
      orca: {}
      rosco: {}
Once the affected pods boot up successfully, please verify it by using the ```kubectl describe pods ``` command to check if the container within this pod has the correct hotfix image version.

