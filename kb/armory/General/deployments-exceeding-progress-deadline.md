---
title: Deployments Exceeding Progress Deadline
---

## Issue
During long deployments, it's possible for Spinnaker to error out and fail without a major reason. Error codes may relate to timeouts. 

## Cause
This can be due to a Kubernetes error that deals with the ```manifest.yml``` that is being deployed.  This error directly correlates to the ```progressDeadlineSeconds``` variable in the ```manifest.yml ```file

