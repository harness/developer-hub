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

 - database URL (**string**)
 - username  (**string / secret**)
 - password - (**secret**)

It, then, performs a test connection using a delegate with a delegate selector or any available delegate. You should use a delegate that has network access to the database.

Just to highlight, the JDBC connector is for instance entity and for connecting to your database. 

#### Database URLs

should this be under database URL subfield? As heading is for connectors and JDBC is a type and this property belong to it.

#### URL Examples

| Database | JDBC URL Format |
|------------------|------------------------------------------------------|
| `ORACLE` | `jdbc:oracle:thin:@//host:port/FREEPDB1` | 
| `POSTGRES` | `jdbc:postgresql://host:port/dbName?sslmode=disable` |
| `SQLSERVER` | `jdbc:sqlserver://host:port;trustServerCertificate=true;databaseName=master` | 
| `MongoAtlasSQL` | `jdbc:mongodb://host:port%s?ssl=true&authSource=admin` |
| `MYSQL` | `jdbc:mysql://host:port/db` |
| `MONGODB` | `mongodb://host:port/dbName/?authSource=admin` |
