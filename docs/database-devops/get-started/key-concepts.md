---
title: Database DevOps Key Concepts
sidebar_label: DB DevOps Key Concepts
displayed_sidebar: dbdevopsbeta
description: Basic terminology and concepts related to Harness Database DevOps
# sidebar_position: 10
---

This topic covers basic terminology and concepts related to Database DevOps. For general Harness Platform terminology and concepts, go to [Harness key concepts](/docs/platform/get-started/key-concepts.md). For information about using DB DevOps, go to [Harness Database DevOps onboarding guide](onboarding-guide.md).

## Database

A database is an organized collection of structured information, or data, that is stored and managed electronically, typically in a computer system. Databases are designed to support the storage, retrieval, modification, and deletion of data in a way that ensures data integrity, security, and performance.

### Database Schemas

A database schema is the structure of a database, e.g. what tables and columns and indexes exist. In the context of Harness DB DevOps, there is an entity called a 'schema’ that is a collection of DDL or DML changes that can be applied to a database. Today this collection is in the form of a liquibase changelog checked into git or artifactory.

### Database Instances 

A database instance associates a database schema to a database connection. It represents the intersection of the database's structural definition (the schema) with the actual data environment where the schema is implemented.

### Database Connection

A database connection refers to the specific parameters and credentials used to establish a secure link between the Harness platform and an individual database server. This connection is done through a JDBC (Java Database Connectivity) URL, which specifies the location of the database server, and is authenticated using a username and password. The connection is made via a Harness Delegate, which allows secure access to the database, even when the database instance is not internet-accessible. This setup enables Harness to execute SQL scripts, orchestrate database changes, and manage schema versions as part of the CI/CD pipeline, all while adhering to security best practices. 

### Data Definition Language (DDL)

As mentioned earlier under the definition of Database Schema, DDL refers to the SQL commands used to define or modify the structure of the database schema itself. This includes operations that create, alter, or drop database objects such as tables, indexes, views, and constraints. Some examples include the following: 

```
CREATE TABLE Employees (ID INT, Name VARCHAR(100), Department VARCHAR(50));
```

```
ALTER TABLE Employees ADD COLUMN Salary DECIMAL(10, 2);
```

```
TRUNCATE TABLE Employees;
```

### Data Manipulation Language (DML)

DML refers to SQL commands used for managing data within the database objects defined by DDL, such as tables. DML operaitons allow users to insert, update, delete, and retrieve data stored in the database. Some examples include the following:

```
INSERT INTO Employees (ID, Name, Department) VALUES (1, 'Jane Doe', 'HR');
```

```
UPDATE Employees SET Salary = 60000 WHERE ID = 1;
```

```
DELETE FROM Employees WHERE ID = 1;
```

### SQL (Structured Query Lanaguage)

SQL (Structured Query Language) databases are relational databases that use a structured query language to define and manipulate data. They are designed to store data in tables with fixed schemas, where each table consists of rows and columns. The relationships between tables are defined through foreign keys. 

### NO-SQL (Not Only SQL)

NoSQL (Not Only SQL) databases, on the other hand, are non-relational databases designed to store and retrieve data in ways that are different from traditional relational databases. They are schema-less, meaning they can store unstructured, semi-structured, or structured data without requiring a predefined schema. 
