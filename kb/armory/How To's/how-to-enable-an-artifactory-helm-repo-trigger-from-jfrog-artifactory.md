---
title: How to enable an Artifactory Helm repo trigger from jFrog Artifactory
---

## Introduction
As part of an automated pipeline trigger strategy, customers would like to use a Helm chart residing in a jFrog Artifactory account to serve as the execution trigger.

## Prerequisites
A ```helm``` repository in the defined Artifactory account, with at least one Helm chart deployed to it.
 

## Instructions
Configure the repository in Spinnaker, according to the official [Repository Config](https://docs.armory.io/armory-enterprise/installation/armory-operator/op-manifest-reference/repository/#artifactory) documentation, under ```spec.spinnakerConfig.config``` - example below:
```
repository:
  artifactory:
    enabled: true
    searches:
    - name: helm-artifactory-repo
      baseUrl: https://.jfrog.io/artifactory
      permissions:
        READ: []
        WRITE: []
      repo: default-helm-local
      repoType: helm
      username: 
      password: ​
```

Note: The ```permissions``` block refers to Fiat users. The example above is a bare-bone Spinnaker baseline with no authentication/authorization configured, so if the environment has defined users, ensure that they are explicitly specified.
Enable artifact support in Spinnaker, according to the official [Artifact Config](https://docs.armory.io/armory-enterprise/installation/armory-operator/op-manifest-reference/artifact/#helm) documentation, under ```spec.spinnakerConfig.config.artifacts``` - example below:
```
helm:
  enabled: true
  accounts:
  - name: helm-artifactory-repo
    repository: https://.jfrog.io/artifactory/default-helm-local
    username: 
    password: ​
```
Igor will receive the list of accounts from Clouddriver, but a property in Igor needs to be set in order to enable the trigger, under ```spec.spinnakerConfig.profiles```

```
spec:
  spinnakerConfig:
    profiles:
      igor:
        helm: 
          enabled: true​
```
* Apply changes, and if this is the first time configuring an automated pipeline trigger - observe that the Igor pod comes up successfully. If it doesn't, refer to the following Knowledge Base article: [Igor pod not running or starting up when configuring pipeline triggers](https://support.armory.io/support?id=kb_article_view&sysparm_article=KB0010551).* In the pipeline, in the ```Configuration``` section, under ```Automated Triggers``` , add a new trigger of type ```Helm Chart``` . Select the helm account configured above, then define a new artifact.* In the ```Expected Artifact``` pop-up, under the ```Expected Artifact``` section, once again select the helm account, and select the artifact (Helm chart) from the ```Name``` drop-down menu.* Test the trigger, to ensure it is working as intended

