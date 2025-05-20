---
title: Working with SQL Files
description: Working with SQL Files
keywords:
  - sql files
  - sql changelogs
  - liquibase
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
  - sql file structure
  - sql queries
sidebar_label: Working with SQL Files
sidebar_position: 3
---

A well-structured SQL file directory ensures consistent, traceable, and collaborative database change management with Harness DBOps. This guide walks through best practices for organizing SQL changelogs, structuring includeAll blocks, and writing maintainable formatted SQL changesets.

:::tip
Consider this as an example implementation of our changelog directory structure.
:::

## SQL File Directory Organization

A well-organized SQL file directory structure is crucial for maintaining database changes. Here's a recommended structure:

``` bash
db/
 ├── master.yaml                  # Main changelog file
 ├── changes/
 │   ├── release-1/
 │   │   ├── 001-create-users-table.sql
 │   │   ├── 002-add-email-column.sql
 │   │   └── 003-create-orders-table.sql
 │   └── release-2/
 │       ├── 001-add-payment-table.sql
 │       └── 002-alter-users-table.sql
 └── application/
```

Below are sample contents for the files referenced in the folder structure above :

**db/master.yaml**
``` yaml
databaseChangeLog:
  - includeAll:
      path: changes/release-1/
      relativeToChangelogFile: true
  
  - includeAll:
      path: changes/release-2/
      relativeToChangelogFile: true
```

### Liquibase Formatted SQL files
In Harness DBOps, we allow seamless integration of liquibase formatted SQL files, enabling you to track database changes effectively. Similar to other tools, Harness DBOps uses metadata in the SQL files to help identify and manage changes.

```SQL
--liquibase formatted sql

--changeset stephen-atwell:1
CREATE TABLE users (
      id INT PRIMARY KEY,
      name VARCHAR(255),
      mobile_number VARCHAR(255)
);

--changeset stephen-atwell:2
CREATE INDEX idx_users_mobile ON users(mobile_number);
```

SQL files in Liquibase require special comments that contain metadata for tracking changes. Every Liquibase SQL file must begin with the following comment to indicate it contains these structured comments. 

:::info note
In the above example SQL Schema, the comments:

1. `--liquibase formatted sql` - Required at the top of every SQL file to indicate it contains Liquibase metadata
2. `--changeset --changeset stephen-atwell:1` - Defines a changeset with the **specified author** (stephen-atwell) and **ID**(1) which is unique within the changelog file. This comment is similar to YAML changesets.
:::

### Spacing
It is a best practice not to include a space before `--liquibase formatted sql`. Formatting variations may cause the Liquibase parser to return an error. When specifying changeset attributes in a formatted SQL changelog, any attribute value that contains spaces must be quoted. For example:
```sql
--changeset stephen-atwell:add_columns context:"production" labels:"schema-update critical"
ALTER TABLE users ADD COLUMN first_name VARCHAR(50);
ALTER TABLE users ADD COLUMN last_name VARCHAR(50);
```
Notice:
- context: "production" doesn't need quotes (no spaces), but it's valid to include them
- labels: "schema-update critical" requires quotes due to the space between words

:::tip
Using space in author name is not recommended. Prefer to use dot/dash separated names.
:::

### `include` and `includeAll` tags
Liquibase provides two primary tags for referencing other changelog files in your root changelog: include and includeAll. The `include` tag allows you to include a single SQL file in your changelog: 

```sql
--liquibase formatted sql

--changeset stephen-atwell:1
--include: changes/release-1/001-create-users-table.sql
```

While `includeAll` allows you to include multiple SQL files in your changelog:
```sql
--liquibase formatted sql

--changeset stephen-atwell:2
--includeAll: changes/release-2/
```
:::info 
Use `includeAll` for releases or environments where speed and scalability are prioritized and Use `include` when explicit control and maintainability are needed, especially in controlled isolated environments.
:::

### Changeset
Each changeset in a formatted SQL file begins with a comment of the form:
```sql
--changeset author:id attribute1:value1 attribute2:value2 [...]
```

### Rollback actions
If you need to roll back a change, you can specify rollback actions directly in the changeset. These actions will be executed when the changeset is rolled back.

```sql
--liquibase formatted sql

--changeset stephen-atwell:1
create table test1 (  
    id int primary key,
    name varchar(255)  
);  
--rollback drop table test1; 

--changeset stephen-atwell:2 
insert into test1 (id, name) values (1, 'stephan');
insert into test1 (id,  name) values (2, 'josh');

--rollback delete from test1 where id in (1, 2);
```

:::caution 
When using SQL format for your changelog files, rollback actions are required. For more information about implementing rollbacks, refer to [Automatic and Custom Rollback](../automatic-and-custom-rollback.md).
:::

A clear and consistent SQL file structure allow teams to manage database changes with properly liquibase formatted SQL files. By following the best practices for directory organization, changeset formatting, spacing, and rollback definitions, you can ensure your changelogs are well-structured, maintainable, and CI/CD-ready.