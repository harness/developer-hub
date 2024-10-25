---
title: How to Audit for Empty Roles in FIAT using Redis/MySQL
---

## Introduction
Administrators may be interested in the information in FIAT for some auditing of the roles that have been defined.  This process can sometimes help Administrators when they would like to do a quick check to ensure that roles are defined according to their policy and identify Empty Roles that may be in FIAT.
The process is much more streamlined when using MySQL, but administrators can use the default Redis storage and perform a search.

## Prerequisites
Authentication and Authorization should be set up in the Spinnaker environment:[https://spinnaker.io/docs/reference/architecture/authz_authn/](https://spinnaker.io/docs/reference/architecture/authz_authn/)
Access to the MySQL Database to make queries. (Optional)
Access to the Redis Database to make queries.
Armory CDSH 2.27.2+

## Instructions
Administrators should consider configuring MySQL as a backend for FIAT for better performance than alternatives and provides ease of search.
[MySQL Process](#mysql) | [Redis Process](#redis)

### MySQL Process
#### Setting Up FIAT MySQL Backend
Administrators can set the following for the FIAT profile in their SpinnakerConfig:
```
spec:
  spinnakerConfig:
    profiles:
      fiat:
        permissionsRepository: 
          redis:
            enabled: false
          sql:
            enabled: true
        sql:
          enabled: true
          connectionPools:
            default:
              # additional connection pool parameters are available here,
              # for more detail and to view defaults, see:
              # [https://github.com/spinnaker/kork/blob/master/kork-sql/src/main/kotlin/com/netflix/spinnaker/kork/sql/config/ConnectionPoolProperties.kt](https://github.com/spinnaker/kork/blob/master/kork-sql/src/main/kotlin/com/netflix/spinnaker/kork/sql/config/ConnectionPoolProperties.kt)
              default: true
              jdbcUrl: jdbc:mysql://
              user: 
              password: 
          migration:
            jdbcUrl: jdbc:mysql://
            user: 
            password: 
          redis:
            enabled: false
```
The ```fiat_user``` and ```fiat_permission``` tables will then show up in the MySQL DB under the table ```fiat```, along with several other tables.
 
### Querying for Empty Roles in MySQL
* Administrators can then log in to the database and run 
```select * from fiat.fiat_user where id not in (select fiat_user_id from fiat.fiat_permission);```
* Once queried, customers can make changes to the users so that roles are assigned to the flagged users.* It is then recommended that Administrators run the check in the database again. 

### Redis Process
#### Querying for Empty Roles in Redis
Looking at entries for Empty Roles in Redis can be a little more complicated, but there is a reduction in setup time
Locate the Redis key with the user list, with `````` being the URL (e.g., templocation-redis.tc9ztb.ng.0001.euw1.cache.amazonaws.com)and ``````
```redis-cli -h  -p  smembers "spinnaker:fiat:users"```

Locate the Redis role keys as well, with `````` being the URL (e.g., templocation-redis.tc9ztb.ng.0001.euw1.cache.amazonaws.com)and ``````
```redis-cli -h  -p  keys spinnaker:fiat:permissions*:*:roles```
Note that we used a wildcard to cover the instance where v1 and v2 permissions exist, such as:
```
"spinnaker:fiat:permissions:USER1:roles"
"spinnaker:fiat:permissions-v2:USER2:roles"
```
 Truncate, unique, sort, and diff the list to find a list of users and roles.  For example
```
"test.abc.io"
"dacccff0-c022-4567-b9ab-19b9356d102c@temp-service-account"
"*"
"082555d5-703c-4233-ad39-2031b33a6c41@temp-service-account"
"__unrestricted_user__"
"ab64440d-3806-4286-ab5b-28843ccaac3e@temp-service-account"
```

Use that list to add appropriate roles to the users/service accounts.  It is possible to check the accounts lists to see if they are being used in any pipelines or the environment
Administrators can find if one of the service accounts is being used by curling the background and comparing the returned list with the information gathered from the Redis queries above

```curl -X GET -k https://127.0.0.1:8080/serviceAccounts |jq```

Administrators can also query their Front50 to see if any pipelines are using the flagged users. 
 It is recommended for [large-scale and production environments that administrators use Front50 with MySQL for persistent storage](https://spinnaker.io/docs/setup/productionize/persistence/front50-sql/#why-sql).  
 The query customers can run is:
```select id, name, json_extract(json_extract(body, '$.triggers[0]'), '$.runAsUser') from pipelines;```

* Once the changes have been made, it is recommended to re-verify that all the ```spinnaker:fiat:permissions*:*:roles``` keys are not empty

