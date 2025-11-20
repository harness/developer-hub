---
title: Setting up and Querying FIAT backend in MySQL and Viewing Users that have Logged in to Spinnaker Using FIAT
---

## Introduction
Administrators may be interested in the information logged in FIAT for some basic auditing. This process can sometimes help Administrators when they would like to do a quick audit of users accessing their Spinnaker instance.
There are a few caveats and notes about the information contained within the FIAT Database that Administrators should note.
* The data contained in the live FIAT database is often ephemeral.
* An example - a logout, if explicitly called, will typically delete entries. 
* As a part of typical user behavior, users end up timing out vs. doing an explicit logout.

Suppose administrators want to know when a user logged in or would like to store the data for further auditing purposes. In that case, enabling and keeping[ the logged events in non-ephemeral storage](https://docs.armory.io/armory-enterprise/armory-admin/observe/integrations-logging/) is suggested. Event logging will provide more details about user access in an environment.

Please note that because of the nature of the information, the data found in FIAT should not be considered an official user license count.

## Prerequisites
Authentication and Authorization should be set up in the Spinnaker environment:[https://spinnaker.io/docs/reference/architecture/authz_authn/](https://spinnaker.io/docs/reference/architecture/authz_authn/)
Access to the MySQL Database to make queries.
Armory CDSH 2.27.2+

## Instructions
Administrators should consider configuring MySQL as a backend for FIAT for better performance than alternatives and provides ease of search.

### Creating the fiat MySQL database
By default, Spinnaker does not automatically create the **fiat** SQL database.You need to create it by connecting to the SQL server and execute the command below to create the plain database without any schemas:
```mysql> create database fiat;```
### Setting Up FIAT MySQL Backend
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
              # https://github.com/spinnaker/kork/blob/master/kork-sql/src/main/kotlin/com/netflix/spinnaker/kork/sql/config/ConnectionPoolProperties.kt
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
The data in the **fiat** database will show up after the first user-related event, such as a simple log-out or log-in.If you do not see the database being populated, try to log out and log back in.
The ```fiat_user``` table will then show up in the MySQL DB under the table ```fiat```, along with several other tables.

### Querying the fiat_user Table
Below is an example query that an admin can use to look at the users logged in. Please keep in mind the [above notes about the data generated from this query](#note).
```
select id, from_unixtime(updated_at/1000) from fiat.fiat_user  
where id like '%armory.io' 
  and id not in (select id from front50.service_accounts);
```

This returns:
```
+---------------------------------+--------------------------------+
| id                              | from_unixtime(updated_at/1000) |
+---------------------------------+--------------------------------+
| alice.rios@armory.io            | 2022-08-05 18:59:16.0330       |
| john.smith@armory.io            | 2022-08-05 18:59:16.2290       |
| samantha.lee@armory.io          | 2022-08-05 18:59:16.0210       |
| tom.tucker@armory.io            | 2022-08-05 18:59:16.1040       |
....
```

* ```ID``` = the email or Subject of the account* ```TIMESTAMP``` = when FIAT last updated the user object. The events of a full-sync operation will update this field, so it is not an accurate representation of the last login, but it can show when there was recent activity. In the example shown, the ```updated_at``` values are consistent for all users, which is when a sync was fired.

### Querying the fiat_permissions Table
Administrators can also use the ```fiat_permissions``` table to audit an individual's access rights
```select * from fiat_permission where fiat_user_id="";```
This query will return a table with the individual's permissions

### Querying the fiat_resource Table
For this example, an application was created with the following values:
Administrators may then want to query a particular set of applications from the ```fiat_resource``` table to see the permissions that are assigned to a specific resource
```select * from fiat_resource where resource_name like "";```
Upon doing so, administrators can take a look at the output, which includes details of the permissions for the application.


