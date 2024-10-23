---
title: Enabling Caching on Git Repos and Clearing Clouddriver Caching to Resolve Caching Issues
---

## Introduction
In Spinnaker 
From Spinnaker 1.26, support was added for "caching" git repositories.  This allows the behavior only to clone the repo the first time it is needed.  In subsequent updates, Clouddriver completes a ```git pull``` only download updates. This is expected to dramatically improve execution times and reliability when working with big repositories.
 
 
 
 

## Prerequisites
A valid Github account connection to the Spinnaker environment

## Instructions
This is an opt-in feature that is disabled by default.  To enable it, administrators need to add the following change to the Clouddriver profile configuration:
```
apiVersion: spinnaker.armory.io/v1alpha2
kind: SpinnakerService
metadata:
  name: spinnaker
spec:
  spinnakerConfig:
    profiles:
      clouddriver:
        artifacts:
          gitrepo:
            clone-retention-max-bytes: 5221225472
            clone-retention-minutes: -1
``` 
Please note:
A Git error can happen when the local repository (e.g., the cloned version in Clouddriver) has an entirely different history from the remote one. 
Sometimes the repo/branch deployed and then pushed in the remote has a commit that involves changing the history of the commits etc.  In such a case, an error can occur caused by an irreconcilable change.  A Clouddriver restart will fix the issue since all the local repositories (in the Clouddriver pods) will be purged from the local storage. They will undergo an initial caching routine again upon restart.

