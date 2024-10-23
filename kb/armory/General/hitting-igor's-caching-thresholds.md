---
title: Hitting Igor's Caching Thresholds
---

## Issue
Completing a Jenkins job doesn’t trigger a pipeline execution. Pushing to a docker repository doesn’t trigger a pipeline execution
In your Igor logs, you see something like:
```Number of items (999999) to cache exceeds upper threshold (1000) in monitor=DockerMonitor partition=dockerhub```

Or:
```Number of items (999999) to cache exceeds upper threshold (1000) in monitor=JenkinsMonitor partition=jenkins```

## Cause
Potential causes could be:
* A new Jenkins master has been added* A new docker registry has been added* Igor has been down for a while* Redis has been wiped

