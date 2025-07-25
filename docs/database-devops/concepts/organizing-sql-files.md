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
tags:
  - SQL Files
  - ChangeSets
  - Rollback
  - YAML Changelogs
  - Harness Database DevOps
  - CI/CD
  - Schema Management
  - DevOps Best Practices
sidebar_label: Working with SQL Files
sidebar_position: 3
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

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

**`db/master.yaml`**
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

--changeset john-doe:1
CREATE TABLE users (
      id INT PRIMARY KEY,
      name VARCHAR(255),
      mobile_number VARCHAR(255)
);

--changeset john-doe:2
CREATE INDEX idx_users_mobile ON users(mobile_number);
```

SQL files in Liquibase require special comments that contain metadata for tracking changes. Every Liquibase SQL file must begin with the following comment to indicate it contains these structured comments. 

:::info note
In the above example SQL Schema, the comments:

1. `--liquibase formatted sql` - Required at the top of every SQL file to indicate it contains Liquibase metadata
2. `--changeset --changeset john-doe:1` - Defines a changeset with the **specified author** (john-doe) and **ID**(1) which is unique within the changelog file. This comment is similar to YAML changesets.
:::

### Spacing
It is a best practice not to include a space before `--liquibase formatted sql`. Formatting variations may cause the Liquibase parser to return an error. When specifying changeset attributes in a formatted SQL changelog, any attribute value that contains spaces must be quoted. For example:
```sql
--changeset john-doe:add_columns context:"production" labels:"schema-update critical"
ALTER TABLE users ADD COLUMN first_name VARCHAR(50);
ALTER TABLE users ADD COLUMN last_name VARCHAR(50);
```
Notice:
- `context`: "production" doesn't need quotes (no spaces), but it's valid to include them. You can learn more about [Contexts](/docs/database-devops/concepts/glossary/context).
- `labels`: "schema-update critical" requires quotes due to the space between words.

:::tip
Using space in author name is not recommended. Prefer to use dot/dash separated names.
:::

### include and includeAll tags
Liquibase provides two primary tags for referencing other changelog files in your root changelog: include and includeAll. The `include` tag allows you to include a single SQL file in your changelog: 

<Tabs>
<TabItem value="YAML Example">

```yaml
databaseChangeLog:
  - changeSet:
      id: 1
      author: john-doe
      changes:
        - include:
            path: changes/release-1/001-create-users-table.sql
```
</TabItem>
<TabItem value="SQL Example">

```sql
--liquibase formatted sql

--changeset john-doe:1
--include: changes/release-1/001-create-users-table.sql
```
</TabItem>
</Tabs>

While `includeAll` allows you to include multiple SQL files in your changelog:
<Tabs>
<TabItem value="YAML Example">

```yaml
databaseChangeLog:
  - changeSet:
      id: 2
      author: john-doe
      changes:
        - includeAll:
            path: changes/release-2/
```
</TabItem>
<TabItem value="SQL Example">

```sql
--liquibase formatted sql

--changeset john-doe:2
--includeAll: changes/release-2/
```
</TabItem>
</Tabs>

:::info 
Use `includeAll` for releases or environments where speed and scalability are prioritized and Use `include` when explicit control and maintainability are needed, especially in controlled isolated environments.
:::

### Changeset
Each changeset in a formatted SQL file begins with a comment of the form:
```sql
--changeset author:id attribute1:value1 attribute2:value2 [...]
```
For more information on changesets, you can refer to the [Changeset](/docs/database-devops/concepts/glossary/changeset) page.

### Rollback actions
If you need to roll back a change, you can specify rollback actions directly in the changeset. These actions will be executed when the changeset is rolled back.

<Tabs>
<TabItem value="YAML Example">

```yaml
  changes:
    - sql:
        sql: |
            CREATE TABLE test1 (
            id INT PRIMARY KEY,
            name VARCHAR(255)
          );
  rollback:
    - sql:
        sql: DROP TABLE test1;
  changes:
    - sql:
        sql: |
          INSERT INTO test1 (id, name) VALUES (1, 'john');
          INSERT INTO test1 (id, name) VALUES (2, 'josh');
    rollback:
      - sql:
          sql: DELETE FROM test1 WHERE id IN (1, 2);
```
</TabItem>
<TabItem value="SQL Example">

```sql
--liquibase formatted sql

--changeset john-doe:1
create table test1 (  
    id int primary key,
    name varchar(255)  
);  
--rollback drop table test1; 

--changeset john-doe:2 
insert into test1 (id, name) values (1, 'john');
insert into test1 (id,  name) values (2, 'josh');

--rollback delete from test1 where id in (1, 2);
```
</TabItem>
</Tabs>

:::caution 
When using SQL format for your changelog files, rollback actions are required. For more information about implementing rollbacks, refer to [Automatic and Custom Rollback](../features/automatic-and-custom-rollback.md).
:::

A clear and consistent SQL file structure allow teams to manage database changes with properly liquibase formatted SQL files. By following the best practices for directory organization, changeset formatting, spacing, and rollback definitions, you can ensure your changelogs are well-structured, maintainable, and CI/CD-ready.