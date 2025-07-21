---
title: Setting Up Connectors
sidebar_label: Setting Up Connectors
description: Setting Up Connectors 
sidebar_position: 4
---

This topic describes how to set up connectors within Harness DB DevOps. 

## Setting Up Connectors for Databases

### JDBC Connectors

The JDBC connector accepts the following:  
- **JDBC URL**: The database URL (**string**)  
- **Username**: Username (**string / secret**)  
- **Password**: Password (**secret**)  

It performs a test connection using a delegate with a delegate selector or any available delegate. Ensure the delegate has network access to the database.  

The JDBC connector is used for connecting to your database instance.

---

#### URL Examples

| Database           | JDBC URL Format                                                                                                                  |
|--------------------|----------------------------------------------------------------------------------------------------------------------------------|
| **ORACLE**         | `jdbc:oracle:thin:@//{host}:{port}/{servicename}`                                                                                |
| **POSTGRES**       | `jdbc:postgresql://{host}:{port}/{dbName}?sslmode=disable`                                                                       |
| **SQLSERVER**      | `jdbc:sqlserver://{host}:{port};trustServerCertificate=true;databaseName={dbName}`                                               |
| **MYSQL**          | `jdbc:mysql://{host}:{port}/{dbName}`                                                                                            |
| **MONGODB**        | `mongodb://{host}:{port}/{dbName}/?authSource=admin`                                                                             |
| **GOOGLE SPANNER** | `jdbc:cloudspanner:/projects/{project-id}/instances/{instance-id}/databases/{database-name}?lenient=true`                        |
| **MongoDB SSL**    | `mongodb://{host}:{port}/{dbName}/?tls=true&authSource=admin`                                                                    |
| **POSTGRES SSL**   | `jdbc:postgresql://{host}:{port}/{dbName}?ssl=true`                                                                              |
| **SQLSERVER SSL**  | `jdbc:sqlserver://{host}:{port};databaseName={dbName};encrypt=true;trustServerCertificate=false;`                                |
| **MYSQL SSL**      | `jdbc:mysql://{host}:{port}/{dbName}?useSSL=true`                                                                                |
| **ORACLE SSL**     | `jdbc:oracle:thin:@(DESCRIPTION=(ADDRESS=(PROTOCOL=TCPS)(HOST={host})(PORT={port}))(CONNECT_DATA=(SERVICE_NAME={servicename})))` |

---

## Setting Up Google Spanner

Google Spanner uses a unique JDBC URL format and does not require a password for authentication. Instead, authentication is handled via **Service Account (SA)** credentials.

### Prerequisites for Google Spanner

1. **Authentication**:  
   - **Google Service Account (GSA)** json key 
   - The GSA must have the following roles:  
     - `roles/spanner.databaseAdmin`  
     - `roles/spanner.databaseUser`

---

## Connector FAQs

### Why can't I connect to my Oracle database with a &nbsp; `sys as sysdba` &nbsp; username? 

Sometimes, users want to login to their database using the `sys as sysdba` username. To do so properly with Harness:

1. Your **JDBC URL** should have the query parameter `internal_logon=sysdba`
2. Your **Username** should be `sys`.

Go to [Oracle's documentation](https://docs.oracle.com/en/database/oracle/oracle-database/23/jjdbc/data-sources-and-URLs.html#GUID-44572C63-10D2-478A-BB2E-ACF6674C59CC) for information about logging on as `sys`.