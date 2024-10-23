---
title: Pods Going to Unhealthy State due to Zombie Processes
---

## Issue
Every 2-3 days, some or all of your pods may start to go unhealthy. Checking processes reveals that there are zombie SSL processes that are defunct but not shutting down, eventually slowing and crashing both pods as well as kubectl and Docker. This problem can happen on any OS or Cloud, if you have TLS enabled and Monitoring set upApplies to:EKSAWSKubernetesUbuntuDocker

## Cause
There is a bug or issue with healthchecks/livenessProbe and SSL. Every 10 seconds, (or however long between health checks) the service will create a new process but fail to remove it. This zombie process will take up space and resources, until so many are spawned that it will crash the pod it’s supposed to be checking on. 

