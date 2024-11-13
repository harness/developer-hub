---
title: Migrating to the Policy Engine Plugin from the Policy Engine Extension
---

## Introduction
With the [deprecation of the Policy Engine Extension](https://docs.armory.io/docs/armory-admin/policy-engine-enable/policy-engine-ext-enable/) and its replacement with the Policy Engine Plugin, customers who are still using the Policy Engine Extension can use the following information to move to the Policy Engine Plugin.  The Policy Engine Plugin allows for Armory to provide a more robust set of features to our customers, and is a more further developed solution towards enabling policies in their Spinnaker environment.Plugins require access to the external resource repository to remain updated, but if the environment is air-gapped, please take a look at the following KB article that advises about [how to deploy plugins in air-gapped situations](https://support.armory.io/support?id=kb_article&sysparm_article=KB0010314)

## Prerequisites
Administration access to the Spinnaker Environment

## Instructions
To migrate to the Policy Engine Plugin from the extension, perform the following steps:
Turn off the Policy Engine extension. You cannot run both the extension and plugin at the same time. You must disable the extension project and then enable the plugin. 
**Halyard**: Remove the following snippet from ```.hal/default/profiles/spinnaker-local.yml```:
armory:
  opa:
    enabled: true
    url: :/v1​
**Operator**: Remove the ```opa``` blocks from the Front50 and Clouddriver sections of your ```SpinnakerService``` manifest:
apiVersion: spinnaker.armory.io/v1alpha2
kind: SpinnakerService
metadata:
  name: spinnaker
spec:
  spinnakerConfig:
    profiles:
      front50: #Enables Save time validation of policies
        armory:
          opa:
            enabled: true
            url: :/v1
      clouddriver: #Enables Runtime validation of policies
        armory:
          opa:
            enabled: true
            url: :/v1​

* If you redeploy Armory Enterprise and apply these changes before you enable the Policy Engine Plugin, no policies get enforced. * Enable the [Policy Engine Plugin](https://docs.armory.io/docs/armory-admin/policy-engine-enable/policy-engine-plug-enable/). If you have an existing OPA server with policies that you want to use, you can provide that OPA server in the plugin configuration. You do not need to create a new OPA server or migrate your policies.

