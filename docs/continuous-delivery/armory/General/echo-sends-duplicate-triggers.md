---
title: Echo Sends Duplicate Triggers
---

## Issue
Echo may send out multiple triggers. This can lead to doubling the size of logs, or doubling alerts and can cause unnecessary slow downs as a result
Applies to:Kubernetes V2Spinnaker with HA mode

## Cause
Echo with replicas of more than 1 will have issues with duplicate triggers. Especially for CRON. This will happen with multiple replicas of Echo that haven't been configured with HA Mode to split them. This can cause further issues if other microservices aren't set up for HA mode as well.

