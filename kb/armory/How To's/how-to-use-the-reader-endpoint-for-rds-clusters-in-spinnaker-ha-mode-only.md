---
title: How to use the Reader Endpoint for RDS Clusters in Spinnaker (HA Mode Only)
---

## Introduction
Providing Spinnaker with an SQL database backend has been tested to improve performance in many Spinnaker installations. This article will go over how to further configure the RDS Cluster with Spinnaker to further improve performance by enabling the Reader Endpoint for Clouddriver to use.
At this time, Spinnaker only supports the Reader Instance while Clouddriver is in HA (High Availability) Mode. The reader endpoint can be configured for a normal Clouddriver service.  However, this has not been very well tested and is not generally recommended.

## Prerequisites
* RDS Cluster with a Reader Endpoint* Running Spinnaker* Clouddriver HA (High Availability)

## Instructions
1. Create a new patch file with the following configuration as the base.

```
apiVersion: spinnaker.armory.io/v1alpha2
kind: SpinnakerService
metadata:
  name: spinnaker
  namespace: $NAMESPACE
spec:
  spinnakerConfig:
    profiles:
      clouddriver-ro: {}
      clouddriver-ro-deck: {}
      clouddriver-rw: {}
      clouddriver-caching: {}
```
We split the Clouddriver profiles here so that we can apply custom profiles to each of the Clouddriver services.

2. Add in the SQL configuration for each of these profiles. An example of this can be seen below
```
apiVersion: spinnaker.armory.io/v1alpha2
kind: SpinnakerService
metadata:
  name: spinnaker
  namespace: $NAMESPACE
spec:
  spinnakerConfig:
    profiles:
################################################################################################################################################################
      clouddriver-ro:
        sql:
          enabled: true
          read-only: true 
          taskRepository:
            enabled: true
          cache:
            enabled: true
            readBatchSize: 500
            writeBatchSize: 300
          scheduler:
            enabled: true
          unknown-agent-cleanup-agent:
            enabled: true
          connectionPools:
            default:
              default: true
              jdbcUrl: jdbc:mysql://$SOME_URL_HERE:3306/clouddriver
              user: clouddriver_service
              password: $PASSWORD
              maxPoolSize: 50
            tasks:
              user: clouddriver_service
              jdbcUrl: jdbc:mysql://$SOME_URL_HERE:3306/clouddriver
              password: austinthao
          migration:
            user: clouddriver_migrate
            jdbcUrl: jdbc:mysql://$SOME_URL_HERE:3306/clouddriver
            password: $PASSWORD
        redis:
          enabled: false
          cache:
            enabled: false
          scheduler:
            enabled: false
          taskRepository:
            enabled: false
################################################################################################################################################################
      clouddriver-caching:
        sql:
          enabled: true
          read-only: false 
          taskRepository:
            enabled: true
          cache:
            enabled: true
            readBatchSize: 500
            writeBatchSize: 300
          scheduler:
            enabled: true
          unknown-agent-cleanup-agent:
            enabled: true
          connectionPools:
            default:
              default: true
              jdbcUrl: jdbc:mysql://$SOME_URL_HERE:3306/clouddriver
              user: clouddriver_service
              password: $PASSWORD
              maxPoolSize: 50
            tasks:
              user: clouddriver_service
              jdbcUrl: jdbc:mysql://$SOME_URL_HERE:3306/clouddriver
              password: $PASSWORD
          migration:
            user: clouddriver_migrate
            jdbcUrl: jdbc:mysql://$SOME_URL_HERE:3306/clouddriver
            password: $PASSWORD
        redis:
          enabled: false
          cache:
            enabled: false
          scheduler:
            enabled: false
          taskRepository:
            enabled: false
################################################################################################################################################################
      clouddriver-ro-deck:
        sql:
          enabled: true
          read-only: true 
          taskRepository:
            enabled: true
          cache:
            enabled: true
            readBatchSize: 500
            writeBatchSize: 300
          scheduler:
            enabled: true
          unknown-agent-cleanup-agent:
            enabled: true
          connectionPools:
            default:
              default: true
              jdbcUrl: jdbc:mysql://$SOME_URL_HERE:3306/clouddriver
              user: clouddriver_service
              password: $PASSWORD
              maxPoolSize: 49
            tasks:
              user: clouddriver_service
              jdbcUrl: jdbc:mysql://$SOME_URL_HERE:3306/clouddriver
              password: $PASSWORD
          migration:
            user: clouddriver_migrate
            jdbcUrl: jdbc:mysql://$SOME_URL_HERE:3306/clouddriver
            password: $PASSWORD
        redis:
          enabled: false
          cache:
            enabled: false
          scheduler:
            enabled: false
          taskRepository:
            enabled: false
################################################################################################################################################################
      clouddriver-rw:
        sql:
          enabled: true
          read-only: false 
          taskRepository:
            enabled: true
          cache:
            enabled: true
            readBatchSize: 500
            writeBatchSize: 300
          scheduler:
            enabled: true
          unknown-agent-cleanup-agent:
            enabled: true
          connectionPools:
            default:
              default: true
              jdbcUrl: jdbc:mysql://$SOME_URL_HERE:3306/clouddriver
              user: clouddriver_service
              password: $PASSWORD
              maxPoolSize: 50
            tasks:
              user: clouddriver_service
              jdbcUrl: jdbc:mysql://$SOME_URL_HERE:3306/clouddriver
              password: $PASSWORD
          migration:
            user: clouddriver_migrate
            jdbcUrl: jdbc:mysql://$SOME_URL_HERE:3306/clouddriver
            password: $PASSWORD
        redis:
          enabled: false
          cache:
            enabled: false
          scheduler:
            enabled: false
          taskRepository:
            enabled: false
```

3. Next, we'll need to set Clouddriver's read only services (```clouddriver-ro``` and ```clouddriver-ro-deck```) to read only.
```
apiVersion: spinnaker.armory.io/v1alpha2
kind: SpinnakerService
metadata:
  name: spinnaker
  namespace: $NAMESPACE
spec:
  spinnakerConfig:
    profiles:
################################################################################################################################################################
      clouddriver-ro:
          read-only: true
################################################################################################################################################################
      clouddriver-ro-deck:
          read-only: true 
```

4. Finally, we can configure the reader endpoint for the default connectionPools for both ```clouddriver-ro``` and ```clouddriver-ro-deck```. Please keep in mind that the tasks connectionPool will still need the writer endpoint as it still needs to ```UPDATE``` the ```DATABASECHANGELOCK``` table.
```
apiVersion: spinnaker.armory.io/v1alpha2
kind: SpinnakerService
metadata:
  name: spinnaker
  namespace: $NAMESPACE
spec:
  spinnakerConfig:
    profiles:
################################################################################################################################################################
      clouddriver-ro-deck:
        sql:
          connectionPools:
            default:
              default: true
              jdbcUrl: jdbc:mysql:$READER_ENDPOINT_HERE:3306/clouddriver
              user: clouddriver_service
              password: $PASSWORD
################################################################################################################################################################
      clouddriver-ro:
        sql:
          connectionPools:
            default:
              default: true
              jdbcUrl: jdbc:mysql:$READER_ENDPOINT_HERE:3306/clouddriver
              user: clouddriver_service
              password: $PASSWORD
```