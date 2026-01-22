---
title: Changelog Sync with Database DevOps
sidebar_label: Changelog Sync
description: Learn how to use the Liquibase changelog-sync command with Harness Database DevOps to baseline database environments and align changelog state without deploying changes.
keywords:
  - changelog sync
  - liquibase changelog-sync
  - database baseline
  - liquibase baseline database
  - harness database devops
  - harness dbops liquibase
  - database changelog management
  - liquibase databasechangelog
tags:
  - harness-db-devops
  - liquibase
  - schema-management
  - database-baseline
  - dbops
---
Harness Database DevOps supports the use of Liquibase’s `changelog-sync` command to help teams baseline database environments and align changelog state without deploying changes to the database. This is particularly useful when introducing Liquibase to existing databases or when multiple environments have intentionally divergent objects.

## What is Schema sync?
The Schema sync operation, executed via the `changelog-sync` command, marks all changesets in a specified changelog as executed in the target database without actually applying any of the changes defined in those changesets. No database objects are created, modified, or dropped. 

## Prerequisites
Before running `changelog-sync`, ensure the following:
- A Harness account with access to the Database DevOps module
- A database instance and schema configured in Harness
- A valid liquibase compatible changelog committed to your Git repository

## Running Changelog Sync in a Harness Pipeline
1. Navigate to Pipelines in the Database DevOps module.
2. Create existing pipeline and Add a **Custom Stage**.
3. Create a **Step Group** and enable Container-based execution.
4. Select the **Liquibase Command** step.
5. Configure the step:
    - **Select DB Schema**: Select the database schema.
    - **Select DB Instance**: Select the target database instance.
    - **Command**: `changelog-sync` to mark all changesets as executed.
6. Save and run the pipeline.

## When to Use Changelog Sync
The `changelog-sync` command is commonly used in the following scenarios:

### Baseline a New Environment
When onboarding an existing database into Liquibase or Harness Database DevOps, you may already have schema objects present that are defined in your changelog. Running `changelog-sync` allows you to baseline the database without reapplying those changes.

### Align Environments with Intentional Differences
For example:
- A **DEV** environment contains development-only tables or objects.
- A new **TEST** environment should not include those DEV-only objects.
- Both environments must still share the same changelog.

In this case, running `changelog-sync` on TEST marks the DEV-only changesets as executed, preventing them from being deployed while keeping the changelog aligned.

### Prevent Failures from Manually Created Objects
If a database object was created manually outside of Liquibase, subsequent Liquibase updates may fail when attempting to recreate that object. By marking the corresponding changeset as executed using `changelog-sync`, you prevent update failures while maintaining changelog consistency.
