---
title: Setting Up Connectors for MongoDB
sidebar_label: Setting Up Connectors for MongoDB
description: Setting Up Connectors for MongoDB.
sidebar_position: 4
---

This topic describes how Harness Database DevOps implements automated rollback to maintain the stability and integrity of your database schema workloads. 

## Setting Up Connectors for MongoDB


### JDBC Connectors

The JDBC connector accepts the following:

 - database URL (**string**)
 - username  (**string / secret**)
 - password - (**secret**)

It, then, performs a test connection using a delegate with a delegate selector or any available delegate.

For the JDBC Connector test connection, we use JDBC Type 4 connectors. The JDBC Type 4 connectors are platform-independent, connecting directly to a database by converting JDBC calls into database-specific calls; known as database protocol drivers or thin drivers. In order for us to support any databases further on, we just need to add a JDBC type 4 dependency in Bazel’s WORKSPACE without touching the source code.

### JDBC URLs

URL Examples

| Database | JDBC URL Format |
| `ORACLE` | `jdbc:oracle:thin:@//host:port/FREEPDB1` | 
| `POSTGRES` | `jdbc:postgresql://host:port/dbName?sslmode=disable` |
| `SQLSERVER` | `jdbc:sqlserver://host:port;trustServerCertificate=true;databaseName=master` | 
| `MongoAtlasSQL` | `jdbc:mongodb://host:port%s?ssl=true&authSource=admin` |
| `MYSQL` | `jdbc:mysql://host:port/db` |

