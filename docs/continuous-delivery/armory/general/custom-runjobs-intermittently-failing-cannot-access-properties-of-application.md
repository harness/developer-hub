---
title: Custom RunJobs intermittently failing (Cannot Access Properties of Application)
---

## Issue
On an intermittent basis, pipelines that are deploying on Kubernetes targets fail on different custom run job stages.
This could manifest in a few different ways, mainly with failure errors such as:```Cannot access properties of application , Required permissions READ. ```

## Cause
It may be that the configuration has defined two different Clouddriver accounts that are associated with the same namespace, so when the stage completes versus when it doesn't - it depends on which Clouddriver account was picked at ***runtime***.
Another reason may be is that the permissions given on the two different Clouddriver accounts are different.

