---
title: Using S3 as a Backend for Front50 (Settings, Suggestions, and Considerations)
---

## Introduction
Customers using S3 as a Front50 Backend should only do so for non-production environments/test environments.  This is due to multiple factors, such as the inability of S3 to scale with large environments and the nature of S3 being designed for Data Storage, not as a Database.  
Per the guidance provided in OSS documentation, consistency-related issues have plagued deployments using S3.
[https://spinnaker.io/docs/setup/productionize/persistence/front50-sql/#why-sql](https://spinnaker.io/docs/setup/productionize/persistence/front50-sql/#why-sql)
Customers should also take into consideration the following:
* Running Front50 with an S3 backend can be inefficient, as additional resources are required for consistent performance, either in the form of additional ReplicaSets or additional resources (horizontal or vertical scaling)* Higher thresholds may be required for an environment to function correctly, possibly loosening restrictions so that the environment can work without issue.* Resource restraints may cause the Front50 container to crash and restart consistently.
**Therefore, customers must move to MySQL as a backend whenever performance, scale, or reliability becomes a factor.  **

## Prerequisites
N/A

## Instructions
In the case where admins have chosen to use S3 in an environment that does not have scaling/reliability/performance requirements but would like to, administrators will want to look to add the following changes to their Environment
* -XX:MaxRAMPercentage=75%* readinessProbe.periodSeconds = 120* readinessProbe.timeoutSeconds = 120* spinnaker.s3.maxkeys = 30000
This can be accomplished by editing the```SpinnakerService.yml``` file in their Environment to allow the environment to function effectively
spec:
  spinnakerConfig:
    profiles:
      front50:
        spinnaker:
          s3:
            enabled: true
            maxKeys: 30000
    service-settings:
      front50: 
        env:
          JAVA_OPTS: "-XX:InitialRAMPercentage=50 -XX:MaxRAMPercentage=75"
        kubernetes:
          readinessProbe:
            failureThreshold: 3
            httpGet:
              path: /health
              port: 7002
              scheme: HTTPS
            initialDelaySeconds: 60
            periodSeconds: 120
            successThreshold: 1
            timeoutSeconds: 120

