---
title: Terraform Named Profiles are Unable to use Environment Variables to Store Secrets
---

## Issue
Attempting to use Environmental Variables to store secrets (e.g. ```TF_VAR_```) with Named Profiles creates an issue where the credentials cannot be processed. An error is returned that ```No Valid Credentials Found``` is provided as an error message

## Cause
Named Profiles in Terraformer does not currently support Environment Variables

