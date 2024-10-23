---
title: Testing X509 Certificates Subject Filtering with Agent 
---

## Issue
Organizations using Armory Agent and X509 Certificates may run into an issue where it appears that subject filtering isn’t working.[https://docs.armory.io/docs/armory-agent/agent-mtls/](https://docs.armory.io/docs/armory-agent/agent-mtls/) This will typically come up during a testing phase. 

## Cause
This is a red herring - This is because there are ***grpc endpoints*** that don’t go through the application layer security filtering, rather just informational that has no security risk.

