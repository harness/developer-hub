---
title: Add the Flyway Command step
sidebar_label: Add the Flyway Command step
description: Learn how to add and configure the native Flyway command step in Harness DB DevOps pipelines for advanced database control and flexibility.
sidebar_position: 1
keywords:
  - flyway command step
  - harness dbops
  - flyway integration
  - add flyway step
  - database devops
  - db migration automation
  - ci cd database pipeline
  - flyway command harness
  - database changeset execution
tags:
  - harness-db-devops
  - flyway-integration
  - pipeline-steps
  - database-automation
  - changeset-management
---

When you create a pipeline in Harness Database DevOps, the Flyway command step can help play a role in managing database changes. This step allows users to apply schema modifications and execute SQL scripts seamlessly within the pipeline.

Harness Database DevOps executes Flyway commands using the configured DB Schema and DB Instance, centralizing change management while maintaining flexibility for teams that prefer Flyway’s SQL-first migration model.

Here’s how you can add and configure the Flyway Command step in a Harness Database DevOps pipeline:
1. In Harness, navigate to the Database DevOps module and open your Project.
2. Under the Pipeline tab, select the pipeline where you want to add the Flyway command step.
3. Inside the pipeline configuration, choose Add Step.
4. Select the Flyway Command Step from the Database DevOps step library.
5. Configure the Flyway Command Step by providing the required details:
   - **Command**: Choose the Flyway operation you want Harness to execute (e.g., `migrate-sql`, `undo-sql`).
   - **Schema Name**: Enter the target database schema managed through Harness DB DevOps.
   - **Instance Name**: Select the database instance where the command will run.
   - **Tag (optional)**: Provide a tag if you want to associate the command execution with a specific version or state.
6. Review your configuration to ensure alignment with your governance, environment, and promotion strategy.
7. Select Save the pipeline.
8. Run the pipeline and monitor the step execution through the Harness UI for logs, command output, and compliance insights.

:::info
To create a pipeline in Database DevOps, you can refer to the Harness documentation detailing how to [Create a pipeline](/docs/database-devops/gitops/create-a-pipeline)
:::

## Supported Flyway Commands in Harness Database DevOps
Within the Flyway Command step, you can select and run any of the following Flyway operations. Harness handles the execution lifecycle, governance, logging, and enforcement—eliminating the operational overhead typically associated with manual Flyway CLI invocations.

### Run Flyway command for migrate-sql
Generates the SQL that Flyway would apply during a migration—without executing it.
Harness provides the generated SQL in pipeline logs and artifacts, enabling teams to perform governance checks, peer reviews, or automated policy evaluations before any change touches the database.

**Use cases:**
- Previewing changes for audit and compliance
- Validating migration correctness during PR workflows
- Integrating with policy engines to block unsafe migrations

### Run Flyway command for undo-sql
Generates the SQL required to reverse the most recently applied migration, without performing the rollback.
Harness surfaces the output for review, governance checks, or integration into change-approval workflows.

**Use cases:**
- Auditing rollback impact
- Preparing controlled rollback procedures
- Ensuring reversibility of migrations in compliance-sensitive environments