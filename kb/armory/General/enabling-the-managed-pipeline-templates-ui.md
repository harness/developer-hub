---
title: Enabling the Managed Pipeline Templates UI
---

## Introduction
Armory Spinnaker 2.19+ contains the latest version of Managed Pipeline Templates v2 (MPTv2), which is the default pipeline templating solution offered in OSS Spinnaker.Armory recommends using Armory’s Pipeline as Code feature instead of MPTv2 because it offers the following benefits:

* Integration with GitHub, GitLab and BitBucket enabling teams to store pipelines with application code* Templates and access to the templates can be stored and managed separately from pipelines* The ability to compose complex templates and pipelines from modules
Note that Armory’s Pipeline as Code and the open source Managed Pipeline Templates are not integrated and do not work together.


## Prerequisites
N/A

## Instructions
By default, the Managed Pipeline Template UI is disabled in Armory Spinnaker 2.19.5. Leaving the UI disabled maintains the same experience users had with Armory Spinnaker 2.18.x (OSS 1.18.x).If users want to enable the Managed Pipeline Templates UI, add the following to the Operator config:

apiVersion: spinnaker.armory.io/v1alpha2
kind: SpinnakerService
metadata:
  name: spinnaker
spec:
  spinnakerConfig:
    config:
      features:
        pipelineTemplates: true
    profiles:
      deck:
        settings-local.js: |
          window.spinnakerSettings.feature.pipelineTemplates = true;
          window.spinnakerSettings.feature.managedPipelineTemplatesV2UI = true;


