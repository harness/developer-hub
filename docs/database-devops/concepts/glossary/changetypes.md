---
id: change-types
title: Change Types
description: Common change types supported in Harness Database DevOps for schema and data management.
sidebar_label: Change Types
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

A Change Type in Liquibase is a structured instruction that tells Liquibase how to update a database. Each changeset you write in YAML, XML, JSON, or SQL contains one or more change types. Liquibase then translates these into the correct SQL statements for the target database platform.
This allows you to describe what should happen, while Liquibase figures out how to do it in the right SQL dialect.

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
Creates a new table with defined columns. When rolled back, drops the table.

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
Removes an existing table. When rolled back, it recreates the table if definition is provided.

```yaml
- changeType: dropTable
  tableName: users
```
3. **Add Column**
Adds new columns to a table. When rolled back, drops the added columns.
```yaml
- changeType: addColumn
  tableName: users
  columns:
    - name: email
      type: varchar(255)
```
4. **Drop Column**
Removes a column from a table. When rolled back, tries to recreates the column if definition is provided.
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

6. **Rename Table**
Renames a table. When rolled back, renames it back.
```yaml
- changeType: renameTable
  oldTableName: users
  newTableName: app_users
```
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
When rolled back, recreates it if definition is provided.
```yaml
- changeType: dropPrimaryKey
  tableName: users
```

3. **Add Foreign Key**
Defines a foreign key relationship.
When rolled back, drops the foreign key.
```yaml
- changeType: addForeignKeyConstraint
  baseTableName: orders
  baseColumnNames: user_id
  referencedTableName: users
  referencedColumnNames: id
```

4. **Drop Foreign Key**
Removes a foreign key.
When rolled back, recreates it if definition is provided.
```yaml
- changeType: dropForeignKeyConstraint
  baseTableName: orders
  constraintName: fk_orders_users
```
5. **Add Unique Constraint**
Enforces uniqueness on a column. When rolled back, removes the constraint.
```yaml
- changeType: addUniqueConstraint
  tableName: users
  columnNames: email
```
6. **Drop Unique Constraint**
Removes a uniqueness constraint. When rolled back, re-applies it if definition is provided.
```yaml
- changeType: dropUniqueConstraint
  tableName: users
  constraintName: uq_users_email
```
7. **Add Not Null Constraint**
Marks a column as NOT NULL. When rolled back, drops the NOT NULL constraint.
```yaml
- changeType: addNotNullConstraint
  tableName: users
  columnName: email
```
8. **Drop Not Null Constraint**
Removes a NOT NULL constraint. When rolled back, re-applies it.
```yaml
- changeType: dropNotNullConstraint
  tableName: users
  columnName: email
```
</TabItem>
<TabItem value="data" label="Data Change Types">

1. **Insert**
Inserts rows into a table. When rolled back, requires manual intervention (typically delete).
```yaml
- changeType: insert
  tableName: users
  columns:
    - name: id
      value: 1
    - name: name
      value: Alice
```
2. **Update**
Updates rows in a table. When rolled back, requires manual intervention (must specify original values).
```yaml
- changeType: update
  tableName: users
  where: id=1
  columns:
    - name: name
      value: Alicia
```
3. **Delete**
Deletes rows from a table. When rolled back, requires manual intervention (must specify data to restore).
```yaml
- changeType: delete
  tableName: users
  where: id=1
```
4. **Load Data**
Loads data from a CSV file. When rolled back, requires manual intervention (usually delete).
```yaml
- changeType: loadData
  tableName: users
  file: data/users.csv
```
</TabItem>
</Tabs>

## Change Types vs Raw SQL
The table below compares the advantages of using change types versus writing raw SQL for database changes:

| Aspect          | Change Types                                                         | Raw SQL                                          |
| --------------- | -------------------------------------------------------------------- | ------------------------------------------------ |
| **Portability** | Works across multiple databases (Liquibase translates automatically) | Vendor-specific, may fail on different platforms |
| **Readability** | Declarative and self-explanatory                                     | Requires SQL expertise to interpret              |
| **Automation**  | Easily integrates into CI/CD and GitOps workflows                    | Harder to automate across environments           |
| **Rollback**    | Built-in rollback support for most change types                      | Must be manually written and tested              |
| **Governance**  | Easier to version, review, and audit                                 | Harder to maintain compliance and history        |
| **Flexibility** | Covers most schema, data, and constraint changes                     | Needed for complex, vendor-specific features     |

Always prefer Change Types for common operations; fall back to raw SQL only when absolutely necessary.

## Conclusion 
Change types are the building blocks of database changes in Harness Database DevOps. They provide a clear, portable, and automation-friendly way to manage schema and data evolution across diverse database platforms. By leveraging change types, teams can ensure safer deployments, easier rollbacks, and better collaboration in their database development workflows.
For complex scenarios not covered by change types, raw SQL can be used, but it should be minimized to maintain the benefits of using change types.