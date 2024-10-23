---
title: ECS Deployment Failures
---

## Issue
Users may notice failures when deploying tasks with tags to ECS deployment targets. This behavior began on 2023/05/25 and impacts all versions of CDSH. The error on the failed pipeline would look similar to the error in the image below

**Update Jun 1, 2023:** Hotfixes and versions have been released to address this issue

## Cause
The failures are due to API errors with the AWS API. The issue occurs for those pipelines that have an ECS deploy stage consisting tags as shown below

The API that accepts the tags has been causing the issue.
 
 

