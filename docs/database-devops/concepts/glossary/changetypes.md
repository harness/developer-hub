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
Harness Database DevOps supports a wide range of change types for managing schema and data evolution. The change types are grouped by Entity, Constraint, Data, Programmability, and Utility, along with their rollback behavior and examples.

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
Removes an existing table. This change type has no automatic rollback; write a manual rollback block with a `createTable` statement if you need to restore the table.

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
Removes a column from a table. This change type has no automatic rollback; write a manual rollback block with an `addColumn` statement if you need to restore the column.
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

7. **Create Index**
Creates an index to improve query performance. When rolled back, the index is dropped.
```yaml
- changeType: createIndex
  tableName: users
  indexName: idx_users_email
  columns:
    - name: email
```

8. **Drop Index**
Removes an existing index. This change type has no automatic rollback; write a manual rollback block with a `createIndex` statement if you need to restore the index.
```yaml
- changeType: dropIndex
  tableName: users
  indexName: idx_users_email
```

9. **Modify Data Type**
Changes the data type of an existing column. This change type has no automatic rollback; write a manual rollback block if you need to revert to the original type.
```yaml
- changeType: modifyDataType
  tableName: users
  columnName: age
  newDataType: bigint
```

:::warning
Depending on the database engine and table size, modifying a column’s data type may acquire locks or trigger a table rewrite.
Consider phased rollouts for large production tables.
:::

10. **Add Auto Increment**
Configures an existing column as auto-incrementing so the database generates a new value on each insert. This change type has no automatic rollback; write a manual rollback block if you need to reverse it.
```yaml
- changeType: addAutoIncrement
  tableName: users
  columnName: id
  columnDataType: int
```

11. **Add Lookup Table**
Creates a new lookup table populated with the distinct values from a source column, then adds a foreign key on the source table pointing to the new lookup table. The source column is not dropped. When rolled back, the lookup table and foreign key are removed.
```yaml
- changeType: addLookupTable
  existingTableName: employees
  existingColumnName: department
  newTableName: departments
  newColumnName: name
  newColumnDataType: varchar(255)
  constraintName: fk_employees_departments
```

12. **Merge Columns**
Concatenates the values of two existing columns into a new combined column, then drops both source columns. This change type has no automatic rollback, so back up the source data before you run it.
```yaml
- changeType: mergeColumns
  tableName: users
  column1Name: first_name
  joinString: " "
  column2Name: last_name
  finalColumnName: full_name
  finalColumnType: varchar(255)
```

13. **Set Column Remarks**
Adds a descriptive comment to a column, stored in the database catalog. This change type has no automatic rollback; write a manual rollback block if you need to clear the remark.
```yaml
- changeType: setColumnRemarks
  tableName: users
  columnName: email
  remarks: Primary contact email address for the account
```

14. **Set Table Remarks**
Adds a descriptive comment to a table, stored in the database catalog. This change type has no automatic rollback; write a manual rollback block if you need to clear the remark.
```yaml
- changeType: setTableRemarks
  tableName: users
  remarks: Stores all registered application users
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
Removes a primary key. This change type has no automatic rollback; write a manual rollback block with an `addPrimaryKey` statement if you need to restore it.
```yaml
- changeType: dropPrimaryKey
  tableName: users
```

3. **Add Foreign Key**
Defines a foreign key relationship. When rolled back, the foreign key is dropped.
```yaml
- changeType: addForeignKeyConstraint
  baseTableName: orders
  baseColumnNames: user_id
  referencedTableName: users
  referencedColumnNames: id
```

4. **Drop Foreign Key**
Removes a foreign key. This change type has no automatic rollback; write a manual rollback block with an `addForeignKeyConstraint` statement if you need to restore it.
```yaml
- changeType: dropForeignKeyConstraint
  baseTableName: orders
  constraintName: fk_orders_users
```

5. **Add Unique Constraint**
Enforces uniqueness on a column. When rolled back, the constraint is dropped.
```yaml
- changeType: addUniqueConstraint
  tableName: users
  columnNames: email
```

6. **Drop Unique Constraint**
Removes a uniqueness constraint. This change type has no automatic rollback; write a manual rollback block with an `addUniqueConstraint` statement if you need to restore it.
```yaml
- changeType: dropUniqueConstraint
  tableName: users
  constraintName: uq_users_email
```

7. **Add Not Null Constraint**
Marks a column as NOT NULL. When rolled back, the NOT NULL constraint is removed.
```yaml
- changeType: addNotNullConstraint
  tableName: users
  columnName: email
```

8. **Drop Not Null Constraint**
Removes a NOT NULL constraint. When rolled back, the NOT NULL constraint is restored.
```yaml
- changeType: dropNotNullConstraint
  tableName: users
  columnName: email
```

9. **Add Check Constraint**
Adds a constraint to validate data at the database level. When rolled back, the constraint is dropped.
```yaml
- changeType: addCheckConstraint
  tableName: users
  constraintName: chk_users_age
  checkConstraint: age >= 18
```

10. **Drop Check Constraint**
Removes an existing CHECK constraint. This change type has no automatic rollback; write a manual rollback block with an `addCheckConstraint` statement if you need to restore it.
```yaml
- changeType: dropCheckConstraint
  tableName: users
  constraintName: chk_users_age
```

11. **Add Default Value**
Sets a default value for a column. When rolled back, the default value is removed.
```yaml
- changeType: addDefaultValue
  tableName: users
  columnName: status
  defaultValue: active
```

12. **Drop Default Value**
Removes a column’s default value. This change type has no automatic rollback; write a manual rollback block with an `addDefaultValue` statement if you need to restore it.
```yaml
- changeType: dropDefaultValue
  tableName: users
  columnName: status
```

13. **Drop All Foreign Key Constraints**
Removes all foreign key constraints from a table in a single operation. Liquibase cannot roll this change back because it does not record which constraints it dropped. Recreate them individually with `addForeignKeyConstraint` if you need to revert.
```yaml
- changeType: dropAllForeignKeyConstraints
  baseTableName: orders
```

</TabItem>
<TabItem value="data" label="Data Change Types">

1. **Load Data**
Loads rows from a CSV file into an existing table using INSERT statements. This change type has no automatic rollback; write a manual rollback block if you need to reverse it. NULL in CSV becomes a database NULL, not the string "NULL".
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
This same pattern is also recommended for `createProcedure` changes.
:::

2. **Insert**
Inserts rows into a table. This change type has no automatic rollback; write a manual rollback block with a `delete` statement if you need to reverse it.
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
Updates rows in a table. This change type has no automatic rollback; write a manual rollback block if you need to revert the changes.
```yaml
- changeType: update
  tableName: users
  where: id=1
  columns:
    - name: name
      value: Alicia
```

4. **Delete**
Deletes rows from a table. This change type has no automatic rollback; write a manual rollback block with an `insert` statement if you need to restore the rows.
```yaml
- changeType: delete
  tableName: users
  where: id=1
```

5. **Load Update Data**
Upserts reference data from a CSV file: updates the row if it exists, inserts it otherwise. This change type has no automatic rollback; write a manual rollback block if you need to reverse it.
```yaml
- changeType: loadUpdateData
  tableName: users
  file: data/users-v2.csv
```

6. **Execute SQL**
Executes database-specific SQL when a declarative change type is not available. This change type has no automatic rollback; write a manual rollback block if you need to reverse it.
```yaml
- changeType: sql
  sql: |
    ALTER SYSTEM SET max_connections = 500;
```

7. **SQL File**
Executes SQL from an external file. Useful for complex scripts that are easier to maintain separately. This change type has no automatic rollback; write a manual rollback block if you need to reverse it.
```yaml
- changeType: sqlFile
  path: sql/seed-reference-data.sql
  relativeToChangelogFile: true
```

</TabItem>
<TabItem value="programmability" label="Programmability Change Types">

1. **Create View**
Creates a database view. When rolled back, the view is dropped.
```yaml
- changeType: createView
  viewName: active_users
  selectQuery: SELECT * FROM users WHERE status = 'active'
```

2. **Drop View**
Removes an existing view. This change type has no automatic rollback; write a manual rollback block with a `createView` statement if you need to restore it.
```yaml
- changeType: dropView
  viewName: active_users
```

3. **Rename View**
Renames a view. When rolled back, renames it back.
```yaml
- changeType: renameView
  oldViewName: active_users
  newViewName: enabled_users
```

4. **Create Procedure**
Creates a stored procedure. This change type has no automatic rollback; write a manual rollback block if you need to reverse it.
```yaml
- changeType: createProcedure
  procedureName: archive_old_orders
  procedureBody: |
    BEGIN
      DELETE FROM orders WHERE created_at < NOW() - INTERVAL '1 year';
    END;
```

5. **Drop Procedure**
Removes a stored procedure. This change type has no automatic rollback; write a manual rollback block with a `createProcedure` statement if you need to restore it.
```yaml
- changeType: dropProcedure
  procedureName: archive_old_orders
```

6. **Create Sequence**
Creates a database sequence for generating ordered numeric values. When rolled back, the sequence is dropped.
```yaml
- changeType: createSequence
  sequenceName: order_id_seq
  startValue: 1
  incrementBy: 1
```

7. **Alter Sequence**
Modifies properties of an existing sequence. This change type has no automatic rollback; write a manual rollback block if you need to restore prior sequence properties.
```yaml
- changeType: alterSequence
  sequenceName: order_id_seq
  incrementBy: 10
```

8. **Drop Sequence**
Removes a sequence. This change type has no automatic rollback; write a manual rollback block with a `createSequence` statement if you need to restore it.
```yaml
- changeType: dropSequence
  sequenceName: order_id_seq
```

9. **Rename Sequence**
Renames a sequence. When rolled back, the sequence is renamed back to the original name.
```yaml
- changeType: renameSequence
  oldSequenceName: order_id_seq
  newSequenceName: order_seq
```

</TabItem>
<TabItem value="utility" label="Utility Change Types">

1. **Stop**
Fails the deployment at this point with an error message. This aborts the Apply step rather than pausing it; it is not an approval gate. To require manual sign-off before a deployment proceeds, use a [Harness approval stage](/docs/platform/approvals/approvals-tutorial) in your pipeline instead.
```yaml
- changeType: stop
  message: Deployment halted — verify prerequisites before re-running.
```

2. **Output**
Emits a message to the Liquibase log or console during deployment. Does not modify the database.
```yaml
- changeType: output
  message: Starting schema migration for release 2.0
  target: STDOUT
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

## Next steps

Now that you understand change types, you can start authoring and deploying database changes with Harness Database DevOps.

- Go to [Build a changelog](/docs/database-devops/use-database-devops/get-started/build-a-changelog) to write your first changelog using change types.
- Go to [Changesets](/docs/database-devops/concepts/glossary/changeset) to understand how change types are grouped and tracked.
- Go to [Automatic and custom rollback](/docs/database-devops/concepts-and-features/automatic-and-custom-rollback) to learn how rollback behavior works for each change type.
- Go to [Supported platforms](/docs/database-devops/dbdevops-supported-platforms) to check which change types are available for your target database.
