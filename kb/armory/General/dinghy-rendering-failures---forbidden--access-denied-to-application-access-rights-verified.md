---
title: Dinghy rendering failures - Forbidden- Access denied to application (Access Rights Verified)
---

## Issue
A pipeline shows as blank, and the following errors are observed on Dinghy events:
```
time="2021-07-08T15:46:56Z" level=error msg="Upsert failed: [Forbidden: Access denied to application  - required authorization: WRITE]"
time="2021-07-08T15:46:56Z" level=error msg="Failed to update Pipelines for [deploy_cp/infrastructure/live/us-east-1/sandboxes/spinnaker-pipelines/infra-services/find-last-commit/dinghyfile Forbidden: Access denied to application  - required authorization: WRITE]: %!s(MISSING)"
time="2021-07-08T15:46:56Z" level=error msg="Error processing Dinghyfile: [Forbidden: Access denied to application  - required authorization: WRITE]"
time="2021-07-08T15:46:57Z" level=error msg="ProcessPush Failed (other): [Forbidden: Access denied to application  - required authorization: WRITE]"
```
However, access for Dinghy was confirmed to be functional for other pipelines to the same deployment targets, and therefore, the credentials being used have confirmed to be functional and access rights have been verified.

## Cause
This issue may be caused by a missing template. For example:
```"application": "{{ var "app" }}",```
As such, when Spinnaker tries to update the pipeline, the application is empty/cannot be found.

