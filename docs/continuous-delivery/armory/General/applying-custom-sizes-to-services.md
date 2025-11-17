---
title: Applying Custom Sizes to Services
---


*Note: This guide assumes you’re deploying Spinnaker on Kubernetes using the [Distributed](https://www.spinnaker.io/setup/install/environment/#distributed-installation) deployment type with Halyard.*
You may find the need to apply custom limits and requests to some of the Spinnaker services – doing so can provide more stable behavior of the services while also preventing extreme bursts of CPU activity or the allocation of more memory than is available (and thus being OOM Killed).
Custom Sizing in Hal Config
Custom sizing can be applied to a service through the ```deploymentEnvironment.customSizing``` section of your hal config. The following example sets requests for ```gate``` of 250 millicpu and 512 MiB with limits of 500 millicpu and 1GiB of memory.
 deploymentEnvironment:
  customSizing:
    gate:
      limits:
        cpu: 500m
        memory: 1Gi
      requests:
        cpu: 250m
        memory: 512Mi
(Note: for these settings to be applied to sidecar containers as well, prefix the service name with “spin-“)
For a more complete understanding of these settings see the [Kubernetes docs](https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/)

JAVA_OPTS in Service Settings
In addition to the options available through the ```deploymentEnvironment.customSizing``` settings, JVM-based services have ```JAVA_OPTS``` that can be set or overridden through their [service-settings](https://www.spinnaker.io/reference/halyard/custom/#tweakable-service-settings). This is done by creating or editing the ```$HOME/.hal/default/service-settings/.yml``` of the respective service
By default, the following is set for all JVM-based services and provides 1/2 of the container’s allocated memory to be used by the service:
```JAVA_OPTS=-XX:+UnlockExperimentalVMOptions -XX:+UseCGroupMemoryLimitForHeap -XX:MaxRAMFraction=2```
(Note: The above is currently *not* being set for Gate and should therefore be set manually by the user)

Setting Xmx and Xms JAVA_OPTS
You may find it useful to set Xmx and Xms of a JVM-based service. The example below shows how this would be done to the ```gate``` service by editing/creating ```$HOME/.hal/default/service-settings/gate.yml```:
env:
  JAVA_OPTS: "-Xms512m -Xmx1024m"

Finally…
Make sure to ```hal deploy apply``` for your changes to take effect.

