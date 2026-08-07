---
title: Rollback SQL step
sidebar_label: Rollback SQL
description: Configure the Rollback SQL step in a Harness Database DevOps pipeline to preview the SQL that would be executed during a rollback without applying it, for validation and policy enforcement.
sidebar_position: 4
keywords:
  - rollback sql
  - rollback sql step
  - harness database devops
  - liquibase rollback-sql
  - rollback preview
  - opa policy enforcement
  - database devops pipeline
tags:
  - harness-db-devops
  - pipeline-steps
  - liquibase-integration
  - rollback-strategy
---

The **Rollback SQL** step generates the SQL statements that would be executed during a rollback operation without applying them to the database. It is used for validation, auditing, and policy enforcement before a rollback runs. The generated SQL is surfaced in the Harness UI and can be referenced in downstream approval gates and OPA policy steps.

:::note
The Rollback SQL step is a Liquibase-only step. It is not available for Flyway migrations.
:::

## Before you begin

- **DB Schema and DB Instance:** You must have at least one DB Schema and one DB Instance configured in Harness Database DevOps. Go to [Set up connectors](/docs/database-devops/use-database-devops/set-up-connectors) to configure your database connector.
- **Tag (for rollback to a specific tag):** The target tag must exist in `DATABASECHANGELOG`. Go to [Using Rollback Tags with Apply Schema](/docs/database-devops/use-database-devops/using-rollback-tags) to learn how tags are created.

## Add the Rollback SQL step

1. In Harness, go to **Database DevOps** and select your project.
2. Open your pipeline and select the stage where you want to preview rollback SQL.
3. Select **Add Step** and choose **Rollback SQL**.
4. Configure the step parameters described below.
5. Select **Apply Changes**, then save and run the pipeline.

## Step parameters

1. **Name** - Display name for the step. The step ID is derived from this name.
2. **Timeout** - Maximum duration before the step times out. Default is `10m`.
3. **Container Registry** - Select the container registry connector that Harness uses to pull the migration container.
4. **Select DB Schema** - Choose the DB Schema associated with the instance you want to preview rollback SQL for.
5. **Select DB Instance** - Choose the DB Instance against which the rollback SQL preview will be generated.
6. **Specify tag to rollback to** - Choose how to identify the rollback target: rollback to a specific tag, or rollback by count. Go to [Rollback for Database Schemas](/docs/database-devops/use-database-devops/rollback-for-database-schemas) for details on each method.

## Use the SQL output in downstream steps

The generated rollback SQL is available as a step output expression. Use this to pass the preview SQL into an approval gate or OPA policy step:

```
<+execution.steps.{stepGroupIdentifier}.steps.{stepIdentifier}.output.sqlCommands>
```

## Next steps

- Go to [Rollback DB Schema step](/docs/database-devops/use-database-devops/step-guide/rollback-dbschema-step) to execute the rollback after validating the SQL.
- Go to [Using OPA with Database DevOps](/docs/database-devops/use-database-devops/governance/using-opa-with-database-devops) to configure OPA policies that evaluate the generated SQL before rollback.
