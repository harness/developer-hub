---
title: Front50 pods failing to start after upgrading Spinnaker version from 2.20.1 to 2.23.5
---

## Issue
Spinnaker Halyard installations that have Front50 configured with MySQL as the backend fail to start after upgrading Spinnaker from version 2.20.x to 2.23.5 (or later). Exceptions similar to below are seen on the Front50 logs, if the environment was migrated from a Redis Front50 setup to a MySQL set up
```
***************************
APPLICATION FAILED TO START
***************************

Description:

Parameter 0 of constructor in com.netflix.spinnaker.front50.model.application.ApplicationService required a single bean, but 2 were found:
	- redisApplicationDAO: defined by method 'redisApplicationDAO' in class path resource [com/netflix/spinnaker/front50/redis/RedisConfig.class]
	- applicationDAO: defined by method 'applicationDAO' in class path resource [com/netflix/spinnaker/front50/config/CommonStorageServiceDAOConfig.class]


Action:

Consider marking one of the beans as @Primary, updating the consumer to accept multiple beans, or using @Qualifier to identify the bean that should be consumed
````

It is also possible that Front50 was set up using the PersistentStorage settings for the environment.  In this example, it was set up with S3 and then migrated to MySQL RDS
````
***************************
APPLICATION FAILED TO START
***************************

Description:

Parameter 0 of method applicationDAO in com.netflix.spinnaker.front50.config.CommonStorageServiceDAOConfig required a single bean, but 2 were found:
	- s3StorageService: defined by method 's3StorageService' in class path resource [com/netflix/spinnaker/front50/config/S3Config.class]
	- sqlStorageService: defined by method 'sqlStorageService' in class path resource [com/netflix/spinnaker/config/SqlConfiguration.class]


Action:

Consider marking one of the beans as @Primary, updating the consumer to accept multiple beans, or using @Qualifier to identify the bean that should be consumed
```

## Cause
From the logs it is evident that there were 2 beans being passed to Front50 causing the application to fail during startup. It has been noticed that ```persistantStorageType:``` in ```halyard config``` under ```/home/spinnaker/.hal/config ```does not accept MySQL as a configuration. Hence ```persistantStorageType``` is either configured with Redis, S3, GCS, etc,. However, MySQL can be enabled in ```front50-local.yml``` under ```/home/spinnaker/.hal/default/profiles/front50-local.yml```. to override the ```persistantStorageType``` from the main halyard config.
This has been the expected behaviour until 2.20 and halyard 1.9.4. However for the versions post that, any configuration mentioned in the halyard main configuration should be explicitly enabled/disabled under (```*-local.yml```), else the service would consider both the configurations. This is the reason behind Front50 considering both MySQL and Redis configurations as separate beans during startup.
Halyard Config:
````
persistentStorage:
    persistentStoreType: redis
    azs: {}                   
    gcs:              
      rootFolder: front50  
    redis: {}           
    s3:                     
      bucket: xxxxx
      rootFolder: xxxxx
      region: us-east-1
      pathStyleAccess: false
      accessKeyId: xxxxx
      secretAccessKey: xxxxx
    oracle: {} 
````
```front50-local.yml```

````
sql:
  enabled: true
  connectionPools:
    default:
      default: true
      jdbcUrl: jdbc:mysql://your.database:3306/front50
      user: front50_service
      password: **
  migration:
    user: front50_migrate
    jdbcUrl: jdbc:mysql://your.database:3306/front50
s3:
  enabled: false
gcs:
  enabled: false
````


