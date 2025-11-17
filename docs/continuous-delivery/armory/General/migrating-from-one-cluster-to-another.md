---
title: Migrating from one cluster to another
---


## Migrating pipelines:
Follow this steps for moving all your pipelines and applications from one Spinnaker to another.The first thing to check is if you have applications with the same name on both spinnaker, if so you need to answer one question.  
1) I want to keep pipelines separated  
2) I want to merge both pipelines 

If 1), you will not be able to retain the information in your infrastructure view when migrating.  
If 2) You will be able to retain everything. 

Download the entire data where spinnaker pipelines are stored. For example an S3 bucket would look like:
```aws s3 cp s3://old-spinnaker-test/front50/ . --recursive```
  If you want to follow step 1, here you need to change the name of the application folder and the application property inside the json files that got downloaded 
```aws s3 cp front50 s3://new-spinnaker/front50/ --recursive```
Now you should be able to see the applications and pipelines from your old spinnaker in the new one.
## Migrating execution history can be achieved by
* Using Redis:Create a Dump of your Redis BD and load it into you new Redis
* Using MySQL:Create a Dump of your MySQL BD and load it into you new MySQL
* Using Redis in one and MySQL in the new one:To do this, you need to copy the configuration from your new spinnaker ```orca-local``` to the old one with the poller for migration enabled.
```
pollers:
 orchestrationMigrator:
   enabled: true
   intervalMs: 180000
 pipelineMigrator:
   enabled: true
   intervalMs: 180000
spinnaker:
   pollInterval: 15  # in seconds for all monitors
   pollingSafeguard:
      itemUpperThreshold: 50000  # change your limits for all monitors
sql:
 enabled: true
 connectionPools:
   jdbcUrl: jdbc:mysql://:3306/spin-orca
   user: orca
   password: XXXXX
   connectionTimeout: 5000
   maxLifetime: 30000
   maxPoolSize: 50
 migration:
   jdbcUrl: jdbc:mysql://:3306/spin-orca
   user: orca_migration
   password: XXXXX
executionRepository:
 dual:
  enabled: true
  primaryName: sqlExecutionRepository
  previousName: redisExecutionRepository
 sql:
   enabled: true
 redis:
   enabled: true
monitor:
 activeExecutions:
   redis: false
```
