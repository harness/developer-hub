---
title: Database DevOps Key Concepts
sidebar_label: DB DevOps Key Concepts
description: Basic terminology and concepts related to Harness Database DevOps
slug: /database-devops/concepts-and-features/key-concepts/
sidebar_position: 10
keywords:
  - database devops
  - db devops
  - harness db devops
  - harness database devops
  - harness dbops
  - harness database
  - harness db
  - harness devops
  - continuous integration
  - continuous delivery
  - ci cd
tags:
  - database-devops
  - db-devops
  - harness-db-devops
  - key-concepts
  - glossary
  - dbops
---

import BetaIcon from '/img/icon_beta.svg';

<BetaIcon />

This topic covers basic terminology and concepts related to Database DevOps. For general Harness Platform terminology and concepts, go to [Harness key concepts](/docs/platform/get-started/overview). For information about using DB DevOps, go to [Harness Database DevOps onboarding guide](/docs/database-devops/use-database-devops/get-started/onboarding-guide/).

## Database

A database is an organized collection of structured information, or data, that is stored and managed electronically, typically in a computer system. Databases are designed to support the storage, retrieval, modification, and deletion of data in a way that ensures data integrity, security, and performance.

```mermaid
%%{ init: {
  "theme": "base",
  "themeVariables": {
    "primaryColor": "#e0f0ff",
    "primaryBorderColor": "#007acc",
    "lineColor": "#007acc",
    "fontSize": "16px",
    "fontFamily": "Arial",
    "edgeLabelBackground":"#f6b26b"
  }
} }%%
flowchart LR
    A[Database Schema:<br>Repository +<br>Liquibase Changelog]
    B[DB Instance]
    C[DB Connector:<br>JDBC URL +<br>Credentials]
    D["<br>Harness<br> #0040;Platform+Delegate#0041;<br><br>"]
    E[Service]

    A --> B
    B --> C
    C --> D
    D --> Conceptual_Box
    A --> D

    A -. Optional Link .-> E
    subgraph Conceptual_Box["Customer Environment"]
    direction TB
        K8S
        DB
        PODS
    end
    subgraph K8S["Kubernetes Cluster"]
    direction TB
        C1["Pod: Git Clone & Checkout"]
        C2["Pod: Run Liquibase Apply"]
        DB["DB"]
    end
    subgraph PODS["Kubernetes Cluster"]
    direction TB
        C3["Pod: Collect Logs & Cleanup"]
    end
    subgraph DB["Target Database"]
      direction TB
          D1[("Database<br>–DATABASE SCHEMA<br>–DATABASECHANGELOG<br>")]
    end
    
    C1 --> C2
    C2 ==> C3
    C2 --> DB
    DB --> D

    style Conceptual_Box stroke-dasharray: 5 5
    style Conceptual_Box fill:#c2f0c2,stroke:#0f5132
    style C1 fill:#d4edda,stroke:#28a745,stroke-width:2px
    style C2 fill:#d4edda,stroke:#28a745,stroke-width:2px
    style C3 fill:#d4edda,stroke:#28a745,stroke-width:2px
    style D fill:#d4edda,stroke:#28a745,stroke-width:2px

    linkStyle 0 stroke-width:2px
    linkStyle 1 stroke-width:2px
    linkStyle 2 stroke-width:2px
    linkStyle 3 stroke-width:2px
    linkStyle 4 stroke-width:3px,stroke-dasharray: 4 4
    linkStyle 6 stroke-width:3px,stroke-dasharray: 4 4
    linkStyle 9 stroke-width:3px,stroke-dasharray: 4 4

```

## Database schemas

A database schema is the structure of a database, e.g. what tables and columns and indexes exist. In the context of Harness DB DevOps, there is an entity called a 'schema’ that is a collection of DDL or DML changes that can be applied to a database. Today this collection is in the form of a liquibase changelog checked into git or artifactory.

## Database instances

A database instance associates a database schema to a database connection. It represents the intersection of the database's structural definition (the schema) with the actual data environment where the schema is implemented.

```bash
Schema Organization
├── Schema A
│   ├── Instance I1
│   └── Instance I2
├── Schema B
│   ├── Instance P1
│   ├── Instance P2
│   └── Instance P3
└── Schema C
    ├── Instance E1
    └── Instance E2
```
**In this hierarchy**: Each schema can have multiple instances. 
Schema B, for example, has three instances, while Schemas A and C each have two instances.

## Database connection

A database connection refers to the specific parameters and credentials used to establish a secure link between the Harness platform and an individual database server. This connection is done through a JDBC (Java Database Connectivity) URL, which specifies the location of the database server, and is authenticated using a username and password. The connection is made via a Harness Delegate, which allows secure access to the database, even when the database instance is not internet-accessible. This setup enables Harness to execute SQL scripts, orchestrate database changes, and manage schema versions as part of the CI/CD pipeline, all while adhering to security best practices. 

## Data definition language (DDL)

As mentioned earlier under the definition of Database Schema, DDL refers to the SQL commands used to define or modify the structure of the database schema itself. This includes operations that create, alter, or drop database objects such as tables, indexes, views, and constraints. Some examples include the following: 

```sql
CREATE TABLE Employees (ID INT, Name VARCHAR(100), Department VARCHAR(50));
```

```sql
ALTER TABLE Employees ADD COLUMN Salary DECIMAL(10, 2);
```

```sql
TRUNCATE TABLE Employees;
```

## Data manipulation language (DML)

DML refers to SQL commands used for managing data within the database objects defined by DDL, such as tables. DML operations allow users to insert, update, delete, and retrieve data stored in the database. Some examples include the following:

```sql
INSERT INTO Employees (ID, Name, Department) VALUES (1, 'Jane Doe', 'HR');
```

```sql
UPDATE Employees SET Salary = 60000 WHERE ID = 1;
```

```sql
DELETE FROM Employees WHERE ID = 1;
```

## SQL (structured query language)

SQL (Structured Query Language) databases are relational databases that use a structured query language to define and manipulate data. They are designed to store data in tables with fixed schemas, where each table consists of rows and columns. The relationships between tables are defined through foreign keys. Liquibase can define changes via SQL scripts, or via yaml changesets that are compiled at runtime into SQL.

## NoSQL (not only SQL)

NoSQL (Not Only SQL) databases, on the other hand, are non-relational databases designed to store and retrieve data in ways that are different from traditional relational databases. They can store unstructured, semi-structured, or structured data without requiring a predefined schema. An example of this is MongoDB.

## Apply

Apply refers to the process of executing database schema changes in a target database environment. In Harness DB DevOps, Apply is a fundamental operation that:
1. Compares the current state of the database with the changelog
2. Identifies which changes need to be applied
3. Executes the necessary changelog in the correct order
4. Records the successful application of changes to prevent re-application

## Rollback

A rollback in the context of deployment refers to the process of reverting an application or system to a previous stable state after a new deployment has failed or introduced critical issues. This action minimizes downtime and restores the application to its last known good configuration.

## Liquibase

An open source database change control CLI tool that is leveraged used by Harness DB DevOps.

## Changelog and changesets

### Changelog
A Changelog is a file that defines all the changes made to your database. This helps audit your database and execute any changes that not applied.
When you want to modify your database, simply add a new changeset and specify its operation as a Change Type. For example, you may add a changeset to create a new table, and another changeset to drop a primary key.

### Changeset
Changesets are the fundamental units of database change tracking. Each changeset represents a change to your database schema.
It is a best practice to specify only one type of change per changeset. Doing so avoids failed auto-commit statements that can leave the database in an unexpected state.

Here are the key concepts:
1. **Unique Identification**: Each changeset requires two identifiers:
   - `id`: A unique identifier for the change.
   - `author`: The person responsible for the change.
    :::info

    A changeset is uniquely tagged by both the author and id attributes (author:id), as well as the changelog file path (The name of the changeset file that defines the change).

    :::

2. **Change tracking:** Once a changeset is executed, it is tracked in a special table `DATABASECHANGELOG` to ensure it is never run twice.

![changelog-and-changeset](./static/changelog-and-changeset.png)


### File format

The format of your changeset depends on the file type of your changelog, which can be SQL, XML, YAML, or JSON

![File format](./static/file-types-of-changelog.png)

#### SQL example

```sql
--liquibase formatted sql

--changeset john-doe:1
CREATE TABLE products (
      id INT PRIMARY KEY,
      name VARCHAR(255)
);

--changeset john-doe:2
CREATE INDEX idx_products_name ON products(name);
```


#### YAML example

```yaml
databaseChangeLog:
  -  changeSet:  
      id:  1
      author: john-doe
      changes:
        -  createTable:
            tableName: company
            columns:
              -  column:
                  name: address
```

#### XML example

```xml
<changeSet  id="1"  author="john-doe">
    <createTable  tableName="company">
        <column  name="address"  type="varchar(255)"/>
    </createTable>
</changeSet>
```

#### JSON example

```json
{
  "changeSet": {
    "id": "1",
    "author": "john-doe",
    "changes": [
      {
        "createTable": {
          "tableName": "company",
          "columns": [
            {
              "column": {
                "name": "address"
              }
            }
          ]
        }
      }
    ]
  }
}
```

## Next steps

- Go to [Changelog](/docs/database-devops/concepts/glossary/changelog) to understand the changelog file format and changeset ordering.
- Go to [Changeset](/docs/database-devops/concepts/glossary/changeset) to review changeset attributes, execution conditions, and transaction control.
- Go to [Onboarding guide](/docs/database-devops/use-database-devops/get-started/onboarding-guide/) to start using DB DevOps with your first pipeline.
