---
title: Combined version and service (module) name is too long when deploying with App Engine
---

## Issue
An organization deploying to App Engine runs into the following error.
```Combined version and service (module) name is too long.```
This happens in Google Cloud Platform - using App Engine Flex when deploying services. The character length maximum is **48 characters**. Names can reach more than 48 characters when environments, users, and services are all combined. 

## Cause
Google App Engine Flex has a limitation of 48 characters when naming a service. This includes versions and the default settings. 
You can see an example ```app.yaml``` file here.

```
runtime: custom
env: flex
service: data-replication-service
env_variables:
  SPRING_PROFILES_ACTIVE: dev
runtime_config:
  jdk: openjdk8
resources:
  cpu: 1
  memory_gb: 1
  disk_size_gb: 10
handlers:
  - url: /.*
    script: this field is required, but ignored
```
Combining the **Service**, **Name**, as well as **Version** that's being committed can go over 48 characters.

