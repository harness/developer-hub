---
title: Cloud provider account disappearing from Spinnaker UI
---

## Issue
An organization may run into a problem in between deployments where a defined cloud provider account will disappear from the Spinnaker UI. This may lead to deployment failures and/or pipelines timeouts, due to Spinnaker being unable to discover the provider’s account. 

## Cause
This is known bug affecting Spinnaker versions older than 1.18.0. The issue stems from how clouddriver caches resources from deleted Spinnaker accounts, which does not purge the SQL cache automatically.

