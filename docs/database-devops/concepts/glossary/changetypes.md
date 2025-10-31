---
id: change-types
title: Change Types
description: Common change types supported in Harness Database DevOps for schema and data management.
sidebar_label: Change Types
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

A Liquibase-compatible schema is composed of one or more Change Types. These are a structured instruction that defines particular database updates. Each changeset you write in YAML, XML, JSON, or SQL contains one or more change types. When Applying the change, Database DevOps translates these into the correct SQL statements for the target database platform.

## Why Change Types Matter
- Cross-Database Compatibility: You write a single change definition; Liquibase generates SQL for MySQL, PostgreSQL, Oracle, SQL Server, and more.
- Clarity & Safety: Change types are declarative and easier to understand than raw SQL. They also help avoid mistakes with rollbacks.
- Governance & Review: Each changeset with a defined change type can be tracked, versioned, and peer-reviewed like application code.
- Automation-Friendly: Change types integrate smoothly into CI/CD pipelines, making database deployments repeatable and reliable.

## Categories of Change Types
Harness Database DevOps supports a wide range of change types for managing schema and data evolution. Below are the most commonly used types, grouped by Entity, Constraint, and Data, along with their rollback behavior and examples.

<Tabs>
<TabItem value="entity" label="Entity Change Types" default>

**1. Create Table**
Creates a new table with defined columns. By default, when rolled back the table is dropped.

```yaml
- changeType: createTable
  tableName: users
  columns:
    - name: id
      type: int
      constraints:
        primaryKey: true
    - name: name
      type: varchar(255)
```
2. **Drop Table**
Removes an existing table.

```yaml
- changeType: dropTable
  tableName: users
```
3. **Add Column**
Adds new columns to a table. By default when rolled back, drops the added columns.
```yaml
- changeType: addColumn
  tableName: users
  columns:
    - name: email
      type: varchar(255)
```
4. **Drop Column**
Removes a column from a table.
```yaml
- changeType: dropColumn
  tableName: users
  columnName: email
```
5. **Rename Column**
Renames a column in a table. When rolled back, renames it back.
```yaml
- changeType: renameColumn
  tableName: users
  oldColumnName: email
  newColumnName: user_email
```
:::note
Renaming a column directly typically necessitates downtime because it means the database schema is not backwards compatible. For this reason, Harness recommends adding a new column using the new name, and setting up a trigger to sync the two versions. Once the old application version no longer exists in any environment, an additional changeset can be released that removes the trigger and deletes the old column.
:::
6. **Rename Table**
Renames a table. When rolled back, renames it back.
```yaml
- changeType: renameTable
  oldTableName: users
  newTableName: app_users
```
:::note
Renaming a table directly typically necessitates downtime because it means the database schema is not backwards compatible. For this reason, Harness recommends adding a new table using the new name, and setting up a trigger to sync the two versions. Once the old application version no longer exists in any environment, an additional changeset can be released that removes the trigger and deletes the old table.
:::

</TabItem>
<TabItem value="constraint" label="Constraint Change Types">

1. **Add Primary Key**
Adds a primary key constraint. When rolled back, drops the primary key.
```yaml
- changeType: addPrimaryKey
  tableName: users
  columnNames: id
```

2. **Drop Primary Key**
Removes a primary key.
```yaml
- changeType: dropPrimaryKey
  tableName: users
```

3. **Add Foreign Key**
Defines a foreign key relationship.
```yaml
- changeType: addForeignKeyConstraint
  baseTableName: orders
  baseColumnNames: user_id
  referencedTableName: users
  referencedColumnNames: id
```

4. **Drop Foreign Key**
Removes a foreign key.
```yaml
- changeType: dropForeignKeyConstraint
  baseTableName: orders
  constraintName: fk_orders_users
```
5. **Add Unique Constraint**
Enforces uniqueness on a column. 
```yaml
- changeType: addUniqueConstraint
  tableName: users
  columnNames: email
```
6. **Drop Unique Constraint**
Removes a uniqueness constraint.
```yaml
- changeType: dropUniqueConstraint
  tableName: users
  constraintName: uq_users_email
```
7. **Add Not Null Constraint**
Marks a column as NOT NULL.
```yaml
- changeType: addNotNullConstraint
  tableName: users
  columnName: email
```
8. **Drop Not Null Constraint**
Removes a NOT NULL constraint.
```yaml
- changeType: dropNotNullConstraint
  tableName: users
  columnName: email
```
</TabItem>
<TabItem value="data" label="Data Change Types">

1. **Upload Load Data**
The preferred way to manage reference or seed data. Loads rows from a CSV file into an existing table. If a record exists, it is updated; otherwise, it is inserted.
- Generates DELETE statements automatically for rollback.
- NULL in CSV → database NULL (not string "NULL").
```yaml
- changeType: loadData
  tableName: users
  file: data/users.csv
```
:::tip
For reliable rollbacks, version your CSVs in Git or Artifactory (e.g., users-v1.csv, users-v2.csv).
To deploy new data:
```yml
- changeType: loadUpdateData
  tableName: users
  file: data/users-v2.csv
```
To rollback:
```yaml
- changeType: loadUpdateData
  tableName: users
  file: data/users-v1.csv
```
This same pattern is also recommended for createProcedure changes.
:::
2. **Insert**
Inserts rows into a table. The operation does not provide default rollback behavior.
```yaml
- changeType: insert
  tableName: users
  columns:
    - name: id
      value: 1
    - name: name
      value: Alice
```
3. **Update**
Updates rows in a table.
```yaml
- changeType: update
  tableName: users
  where: id=1
  columns:
    - name: name
      value: Alicia
```
4. **Delete**
Deletes rows from a table.
```yaml
- changeType: delete
  tableName: users
  where: id=1
```
</TabItem>
</Tabs>

## Change Types vs Raw SQL
The table below compares the advantages of using change types versus writing raw SQL for database changes:

| Aspect          | Change Types                                                         | Raw SQL                                          |
| --------------- | -------------------------------------------------------------------- | ------------------------------------------------ |
| **Portability** | Works across multiple databases (Liquibase translates automatically) | Vendor-specific, different SQL databases have minor SQL syntax differences that may cause failure on different platforms.|
| **Readability** | Declarative and self-explanatory                                     | Requires SQL expertise to interpret              |
| **Rollback**    | Built-in rollback support for most change types                      | Must be manually written and tested              |
| **Governance**  | Easier to version, review, and audit                                 | Harder to maintain compliance and history        |
| **Flexibility** | Covers most schema, data, and constraint changes                     | Needed for complex, vendor-specific features     |

Always prefer Change Types for common operations; fall back to raw SQL only when absolutely necessary.

## Conclusion 
Change types are the building blocks of database changes in Harness Database DevOps. They provide a clear, portable, and automation-friendly way to manage schema and data evolution across diverse database platforms. By leveraging change types, teams can ensure safer deployments, easier rollbacks, and better collaboration in their database development workflows.
For complex scenarios not covered by change types, raw SQL can be used, but it should be minimized to maintain the benefits of using change types.