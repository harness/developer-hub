---
title: Setting an SQL Cleanup Job for Clouddriver
---

## Introduction
Spinnaker allows for the easy configuration of a cleanup job for the Clouddriver MySQL backend if it is enabled.  This can be helpful to remove orphaned entries and maintain a reasonable size of the SQL backend.
Enabling this setting causes clouddriver-caching's clean up agent to periodically purge old clusters and accounts. OSS recommends setting to true when using the Kubernetes provider.

## Prerequisites
N/A

## Instructions
#### In Halyard:
This would be added to the ```clouddriver-local.yaml``` file in the hal config profiles directory e.g. (~/.hal/default/profiles/)
``````sql.unknown-agent-cleanup-agent.enabled: true``````
Alternatively, Users can manually go into the MYSQL Database and remove the offending entries. 
#### In Operator:
This can be set at **spec.spinnakerConfig.profiles.clouddriver**
spec:
  spinnakerConfig:
    profiles:
      clouddriver:
        sql.unknown-agent-cleanup-agent.enabled: true
Alternatively, Users can manually go into the MYSQL Database and remove the offending entries. 

