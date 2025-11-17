---
title: Deployments on PCF fail with invalid size for application memory.
---

## Issue
When an organization tries to deploy an application with a manifest.yaml on Pivotal Cloud Foundry, the deployment fails with Invalid size for application memory = ‘#GB' 

## Cause
This is.a known bug with PCF where the manifest file will not recognize the identifiers used for memory. Original Documentation: [https://docs.cloudfoundry.org/devguide/deploy-apps/manifest-attributes.html#memory](https://docs.cloudfoundry.org/devguide/deploy-apps/manifest-attributes.html#memory)


