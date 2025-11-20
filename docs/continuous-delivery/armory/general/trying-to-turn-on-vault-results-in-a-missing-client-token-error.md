---
title: Trying to turn on Vault results in a Missing Client Token Error
---

## Issue
When trying to enable Vault on Spinnaker, it results in this error
SpinnakerService validation failed:
error fetching vault token - error logging into vault using kubernetes auth: Error making API request.
```URL: PUT "https://vault-prod.[CLIENTURL].com/v1/auth/eks/armory-spinnaker-prod/login'''
Code: 500. Errors:
* namespace not authorized

## Cause
Operator and go-yaml-tools with namespace support do not currently support dedicated secrets containers using Vault Enterprise.

