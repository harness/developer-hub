---
title: Update SQL step
sidebar_label: Update SQL
description: Configure the Update SQL step in a Harness Database DevOps pipeline to preview the SQL that would be applied to a database without executing it, for validation and policy enforcement before deployment.
sidebar_position: 3
keywords:
  - update sql
  - update sql step
  - harness database devops
  - liquibase update-sql
  - sql preview
  - changeset preview
  - opa policy enforcement
  - database devops pipeline
tags:
  - harness-db-devops
  - pipeline-steps
  - liquibase-integration
  - sql-preview
---

The **Update SQL** step generates the SQL statements that would be applied to a target database from your Liquibase changelog, without executing them. It is used for validation, auditing, and policy enforcement before a deployment runs. The generated SQL is surfaced in the Harness UI and can be referenced in downstream approval gates and OPA policy steps.

:::note
The Update SQL step is a Liquibase-only step. It is not available for Flyway migrations.
:::

## Add the Update SQL step

1. In Harness, go to **Database DevOps** and select your project.
2. Open your pipeline and select the stage where you want to preview SQL.
3. Select **Add Step** and choose **Update SQL**.
4. Configure the step parameters described below.
5. Select **Apply Changes**, then save and run the pipeline.

## Step parameters

1. **Name** - Display name for the step. The step ID is derived from this name.
2. **Timeout** - Maximum duration before the step times out. Default is `10m`.
3. **Container Registry** - Select the container registry connector that Harness uses to pull the migration container.
4. **Select DB Schema** - Choose the DB Schema that holds your changelog and migration definitions.
5. **Select DB Instance** - Choose the DB Instance against which the SQL preview will be generated.

## Use the SQL output in downstream steps

The generated SQL is available as a step output expression. Use this to pass the preview SQL into an approval gate or OPA policy step:

```
<+execution.steps.{stepGroupIdentifier}.steps.{stepIdentifier}.output.sqlCommands>
```

For example, if the step group is `stepGroup1` and the step identifier is `UpdateSQL_1`:

```
<+execution.steps.stepGroup1.steps.UpdateSQL_1.output.sqlCommands>
```

## Next steps

- Go to [Apply DB Schema step](/docs/database-devops/use-database-devops/step-guide/apply-dbschema-step) to apply the reviewed changesets to your database instance.
- Go to [Using OPA with Database DevOps](/docs/database-devops/use-database-devops/governance/using-opa-with-database-devops) to configure OPA policies that evaluate the generated SQL before deployment.
