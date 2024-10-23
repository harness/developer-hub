---
title: Using Custom Resource Status Plugin and Scale Agent leads to An attempt was made to call a method that does not exist Error
---

## Issue
Armory customers that may be using the [Custom Resource Status Plugin](https://docs.armory.io/plugins/plugin-k8s-custom-resource-status/) (2.0.3) and encounter the error below.  The following error will prevent Armory CDSH from starting.
An attempt was made to call a method that does not exist. The attempt was made from the following location:
io.armory.plugin.config.CustomResourceStatusPluginConfiguration.injectDefaultHandler(CustomResourceStatusPluginConfiguration.kt:17)
The following method did not exist:
'void com.netflix.spinnaker.clouddriver.kubernetes.description.GlobalResourcePropertyRegistry.setDefaultHandler(com.netflix.spinnaker.clouddriver.kubernetes.op.handler.KubernetesUnregisteredCustomResourceHandler)'
The method's class, com.netflix.spinnaker.clouddriver.kubernetes.description.GlobalResourcePropertyRegistry, is available from the following locations:
jar:file:/opt/clouddriver/lib/clouddriver-kubernetes-2023.05.30.19.45.40.release-1.30.x.jar!/com/netflix/spinnaker/clouddriver/kubernetes/description/GlobalResourcePropertyRegistry.class
The class hierarchy was loaded from the following locations:
com.netflix.spinnaker.clouddriver.kubernetes.description.GlobalResourcePropertyRegistry: file:/opt/clouddriver/lib/clouddriver-kubernetes-2023.05.30.19.45.40.release-1.30.x.jar
Action:
Correct the classpath of your application so that it contains a single, compatible version of com.netflix.spinnaker.clouddriver.kubernetes.description.GlobalResourcePropertyRegistry
2023-08-10T17:53:39.125317254Z

## Cause
[Custom Resource Status Plugin](https://docs.armory.io/plugins/plugin-k8s-custom-resource-status/) (2.0.3) has a dependency on a Clouddriver change, and customers will need to have the newer version of Clouddriver, either as a hotfix image, or with Armory CDSH 2.30.3+, or 2.28.7+

