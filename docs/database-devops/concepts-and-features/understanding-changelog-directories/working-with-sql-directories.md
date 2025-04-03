---
title: Working with SQL File Directories
description: Working with SQL File Directories
sidebar_position: 2
---

# Working with SQL File Directories

This guide explains how to effectively manage SQL file directories. A well-organized SQL file directory structure is crucial for maintaining database changes

:::tip
Consider this as an example implementation of our changelog directory structure. For more detailed information about different directory organization patterns and best practices, refer to [Changelog Directory Structure](./changelog-directories-structure.md).
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
 └──
```

Here the example of above files are as follows:

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
```sql
--liquibase formatted sql 
```

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

### How to use the include and includeAll tags
Use the include or includeAll tags in a formatted SQL root changelog to reference other changelog files.
```sql
--liquibase formatted sql

--changeset stephen-atwell:1
--include: changes/release-1/001-create-users-table.sql

--changeset stephen-atwell:2
--includeAll: changes/release-2/
```

### Changeset
Each changeset in a formatted SQL file begins with a comment of the form:
```sql
--changeset author:id attribute1:value1 attribute2:value2 [...]
```
The changeset comment is followed by one or more SQL statements, separated by semicolons or by the value of the `endDelimiter` attribute.

### Rollback actions
Your changesets may include statements to be applied when rolling back the changeset. Rollback statements have the following format:

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