---
title: Apply DB Schema step
sidebar_label: Apply DB Schema
description: Configure the Apply DB Schema step in a Harness Database DevOps pipeline to apply Liquibase or Flyway migrations to a target database instance.
sidebar_position: 1
keywords:
  - apply db schema
  - apply schema step
  - harness database devops
  - liquibase apply
  - flyway apply
  - db migration pipeline
  - database changeset apply
  - harness dbops pipeline step
tags:
  - harness-db-devops
  - apply-schema
  - pipeline-steps
  - liquibase-integration
  - database-deployment
---
import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

The **Apply DB Schema** step runs pending database migrations against a target DB instance as part of a Harness pipeline. It applies changesets tracked in your schema changelog, optionally creates a rollback tag, and exposes a `preStartTag` expression so downstream steps can roll back to the exact state before the deployment began.

## Add the Apply DB Schema step

1. In Harness, go to **Database DevOps** and select your project.
2. Open your pipeline and select the stage where you want to apply migrations.
3. Add a **Custom Stage** with a step group.
4. Inside the step group, **Add Step** and choose **Apply DB Schema**.
5. Configure the step parameters described below.
6. Select **Apply Changes**, then save and run the pipeline.

## Step parameters

![DBDevOps Apply DBSchema Step](../static/dbops-apply-schema-step.png)

1. **Name** - Display name for the step. The step ID is derived from this name.
2. **Timeout** - Maximum duration before the step times out. Default is `10m`.  
3. **Container Registry** - Select the container registry connector that Harness uses to pull the migration container.  
4. **Migration Type** - Select **Liquibase** or **Flyway** depending on your schema's migration tool.  
5. **Select DB Schema** - Choose the DB Schema that holds your changelog and migration definitions.  
6. **Select DB Instance** - Choose the DB Instance (database connection) where migrations will be applied.  
7. **Specify tag to create (optional)** - Enter a tag value (for example, `v1.0.0`) to stamp the database after migrations are applied. This tag serves as a rollback anchor for downstream rollback steps. If left blank and no existing tag is found on the last changeset, Harness creates one automatically.
8. You can configure optional parameters passed to the migration tool:
  - **Mark failed changeset run** - When enabled, marks failed changesets as ran in `DATABASECHANGELOG` even if they did not execute successfully. This allows rollback steps to include the failed changeset in their rollback scope. Go to [Mark Failed Changeset Ran](/docs/database-devops/features/mark-failed-changeset-ran) for details.
  - **Tag database changeset** - When enabled, writes a synthetic tag-marker row to `DATABASECHANGELOG` on no-op deployments (zero applied changesets). Use this when you need a consistent rollback anchor across multi-service releases. Go to [Tag Database Changeset](/docs/database-devops/features/tag-database-changeset) for details.

## Use the preStartTag expression for rollback

The Apply DB Schema step exposes the tag that was active on the database before the deployment started. Use this in a downstream Rollback DB Schema step to revert to the exact pre-deployment state.

**Within the same stage:**
```
<+execution.steps.{stepGroupIdentifier}.steps.{stepIdentifier}.output.preStartTag>
```

**From a different stage:**
```
<+pipeline.stages.{stageIdentifier}.spec.execution.steps.{stepGroupIdentifier}.steps.{stepIdentifier}.output.preStartTag>
```

Go to [Rollback Tags with Apply Schema](/docs/database-devops/use-database-devops/using-rollback-tags) for a full walkthrough.

## Next steps

- Go to [Rollback DB Schema step](/docs/database-devops/use-database-devops/step-guide/rollback-dbschema-step) to configure a rollback step that uses the `preStartTag` from this step.
- Go to [Using Rollback Tags with Apply Schema](/docs/database-devops/use-database-devops/using-rollback-tags) to understand how tagging and rollback expressions work together.
- Go to [Failure strategies](/docs/database-devops/use-database-devops/failure-strategies) to configure automated rollback on step failure.
