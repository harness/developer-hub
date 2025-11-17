---
title: Disable default repositories for Plugins on air-gapped environments and Specify the Repo
---

## Introduction
In air-gapped environments, access to public internet is generally blocked and in such cases, the Spinnaker services would not be able to download the Plugin from default public repositories.
In this example, we will look at the Observability plugin, which is responsible for measuring the performance and monitoring the Spinnaker micro services.  This same method can be applied to the Policy Engine Plugin, and any other plugins that are being used.
Because it is trying to get the public repository, this delays the start time for Spinnaker micro services as applications start after the timeouts. Below is the example startup log from ```echo``` service where the service is seen to timeout when attempting to connect to the public repository for fetching the Observability plugin. 
```
2021-06-16 14:07:29.259  INFO 1 --- [           main] org.pf4j.AbstractPluginManager           : Plugin '/opt/echo/plugins/armory-observability-plugin-v1.2.0/echo' is disabled
2021-06-16 14:07:29.277  INFO 1 --- [           main] org.pf4j.AbstractPluginManager           : Plugin 'Armory.ObservabilityPlugin@1.2.0' resolved
2021-06-16 14:09:40.147 ERROR 1 --- [           main] org.pf4j.update.DefaultUpdateRepository  : Connection timed out (Connection timed out)
2021-06-16 14:11:51.215 ERROR 1 --- [           main] org.pf4j.update.DefaultUpdateRepository  : Connection timed out (Connection timed out)
```
The steps to disable the default repository are described below

## Prerequisites
Spinnaker version 2.26.0 or later. There is an issue with this not working with prior versions.

## Instructions
**Disable the Plugin for air-gapped environments:**
Identify the plugins configuration under the config files and change the ```enableDefaultRepositories:``` to "false".  After doing so, all Plugins will no longer access the cloud repository for the plugin.
```
apiVersion: spinnaker.armory.io/v1alpha2
kind: SpinnakerService
metadata:
  name: spinnaker
  namespace: spinnaker
spec:
  spinnakerConfig:
    profiles:
      spinnaker:
        spinnaker:
          extensibility:
            enableDefaultRepositories: false
            plugins:
              Armory.ObservabilityPlugin:
                 ..... 
```
However, plugins could be maintained under repositories that are internal to the organization. In such situations, adding the custom repository details under the path  spinnakerConfig.profiles.spinnaker.spinnaker.extensibility.repositories:  should fetch the plugins from the custom repository.
```
apiVersion: spinnaker.armory.io/v1alpha2
kind: SpinnakerService
metadata:
  name: spinnaker
  namespace: spinnaker
spec:
  spinnakerConfig:
    profiles:
      spinnaker:
        spinnaker:
          extensibility:
            enableDefaultRepositories: false
            plugins:
              Armory.ObservabilityPlugin:
                 ..... 
                enabled: true
                version: 1.0.0
            repositories:
              armory-observability-plugin-releases:
                url: https://custom.repository/armory-plugins/armory-observability-plugin-releases/master/repositories.json
              armory-plugins:
                url: https://dl.bintray.com/armory/armory-plugins/repositories.json
```                


