---
title: Setting Up Connectors
sidebar_label: Setting Up Connectors
description: Setting Up Connectors 
sidebar_position: 4
---

This topic describes how to set up connectors within Harness DB DevOps. 

## Setting Up Connectors for MongoDB

### JDBC Connectors

The JDBC connector accepts the following:

 - **JDBC URL**: The database URL (**string**)
 - **Username**: Username (**string / secret**)
 - **Password**: Password (**secret**)

It, then, performs a test connection using a delegate with a delegate selector or any available delegate. You should use a delegate that has network access to the database.

Just to highlight, the JDBC connector is for instance entity and for connecting to your database. 

#### URL Examples

| Database | JDBC URL Format |
|------------------|------------------------------------------------------|
| `ORACLE` | `jdbc:oracle:thin:@//host:port/FREEPDB1` | 
| `POSTGRES` | `jdbc:postgresql://host:port/dbName?sslmode=disable` |
| `SQLSERVER` | `jdbc:sqlserver://host:port;trustServerCertificate=true;databaseName=master` | 
| `MongoAtlasSQL` | `jdbc:mongodb://host:port%s?ssl=true&authSource=admin` |
| `MYSQL` | `jdbc:mysql://host:port/db` |
| `MONGODB` | `mongodb://host:port/dbName/?authSource=admin` |

## Connector FAQs

### Why can't I connect to my Oracle database with a &nbsp; `sys as sysdba` &nbsp; username? 

Sometimes, users want to login to their database using the `sys as sysdba` username. To do so properly with Harness:

1. Your **JDBC URL** should have the query parameter `internal_logon=sysdba`
2. Your **Username** should be `sys`.

Go to [Oracle's documentation](https://docs.oracle.com/en/database/oracle/oracle-database/23/jjdbc/data-sources-and-URLs.html#GUID-44572C63-10D2-478A-BB2E-ACF6674C59CC) for information about logging on as `sys`.