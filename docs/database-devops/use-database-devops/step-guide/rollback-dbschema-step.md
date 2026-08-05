---
title: Rollback DB Schema step
sidebar_label: Rollback DB Schema
description: Configure the Rollback DB Schema step in a Harness Database DevOps pipeline to revert Liquibase or Flyway migrations to a specific tag or by a changeset count.
sidebar_position: 2
keywords:
  - rollback db schema
  - rollback schema step
  - harness database devops
  - liquibase rollback
  - flyway rollback
  - rollback by tag
  - rollback by count
  - database devops pipeline
  - harness dbops rollback
tags:
  - harness-db-devops
  - rollback-strategy
  - pipeline-steps
  - liquibase-integration
  - database-recovery
---
import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

The **Rollback DB Schema** step reverts previously applied database changesets on a target DB instance as part of a Harness pipeline. It is typically added after an [Apply DB Schema step](/docs/database-devops/use-database-devops/step-guide/apply-dbschema-step) as part of a failure strategy or a dedicated rollback stage.

## Before you begin

- **Applied migrations:** Rollback requires changesets previously applied by an Apply DB Schema step. Nothing can be rolled back on a fresh instance with no applied changesets.
- **Rollback scripts:** Liquibase rollback requires that each changeset defines a rollback statement. Go to [Automatic and Custom Rollback](/docs/database-devops/concepts-and-features/automatic-and-custom-rollback) to understand when rollback scripts are required.
- **Tag (for rollback by tag):** The target tag must exist in `DATABASECHANGELOG`. Go to [Using Rollback Tags with Apply Schema](/docs/database-devops/use-database-devops/using-rollback-tags) to learn how tags are created.

## Add the Rollback DB Schema step

1. In Harness, go to **Database DevOps** and select your project.
2. Open your pipeline and select the stage where you want to configure rollback.
3. Add a **Custom Stage** with a step group.
4. Inside the step group, **Add Step** and choose **Rollback DB Schema**.
5. Configure the step parameters described below.
6. Select **Apply Changes**, then save and run the pipeline.

## Step parameters

![DBDevOps Rollback DBSchema Step](../static/dbops-rollback-schema-step.png)

1. **Name** - Display name for the step. The step ID is derived from this name.
2. **Timeout** - Maximum duration before the step times out. Default is `10m`.
3. **Container Registry** - Select the container registry connector that Harness uses to pull the migration container.
4. **Migration Type** - Select **Liquibase** or **Flyway** depending on your schema's migration tool.
5. **Select DB Schema** - Choose the DB Schema associated with the instance you want to roll back.
6. **Select DB Instance** - Choose the DB Instance where the rollback will be executed.
7. **Specify rollback target** - Choose how to identify the rollback target: rollback to a specific tag, rollback by count, or rollback to a target version (Flyway). Go to [Rollback for Database Schemas](/docs/database-devops/use-database-devops/rollback-for-database-schemas) for details on each method.

## Next steps

- Go to [Apply DB Schema step](/docs/database-devops/use-database-devops/step-guide/apply-dbschema-step) to configure the apply step that precedes rollback.
- Go to [Rollback for Database Schemas](/docs/database-devops/use-database-devops/rollback-for-database-schemas) to understand rollback methods, automated rollback patterns, and failure strategies.
- Go to [Automatic and Custom Rollback](/docs/database-devops/concepts-and-features/automatic-and-custom-rollback) to learn how to write rollback scripts for complex changesets.
