---
title: Unable to pick up the CredentialsTypeProperties bean and map it to Customer ArtifactCredentials
---

## Introduction
Customers may use a Custom Plugin and are looking to have the ```CredentialsTypeProperties``` bean registered on the context.  They are looking to map a custom ```ArtifactCredential``` to the custom ```ArtifactAccount```
The Configuration class listed below doesn't seem to be picking up the bean
[https://github.com/spinnaker/clouddriver/blob/master/clouddriver-artifacts/src/main/java/com/netflix/spinnaker/config/ArtifactConfiguration.java](https://github.com/spinnaker/clouddriver/blob/master/clouddriver-artifacts/src/main/java/com/netflix/spinnaker/config/ArtifactConfiguration.java)

## Prerequisites
This is because a plugin is isolated in its own ```classloader``` and ```Spring context```, with the app's Spring context as the parent.
Components from the app will automatically get autowired into the plugin, and if an app component is autowired with a single bean and the plugin defines that bean as primary, a dependency is formed implicitly.
However if an app component takes a collection of beans and that is already satisfied, it isn't able to wait to see if more are in the plugin. So a dependency then has to be manually created.
This is accomplished by overriding ```registerBeanDefinitions``` which the method that does most of the work in ```SpringLoaderPlugin```. In this case we manually make ```artifactCredentialsRepository``` depend on the plugin. That way it guarantees that the plugin beans will be initialized before ```artifactCredentialsRepository``` and the new credentials will be available.

## Instructions
The Armory Engineering team has provided a sample Artifact Plugin that will allow for the bean dependency.
[https://github.com/spinnaker-plugin-examples/customArtifact](https://github.com/spinnaker-plugin-examples/customArtifact)
Kork behavior may be updated in the future to ease the above steps from being necessary.

