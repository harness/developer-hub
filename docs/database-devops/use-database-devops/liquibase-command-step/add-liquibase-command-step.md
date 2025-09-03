---
title: Add the Liquibase command step
sidebar_label: Add the Liquibase command step
description: Learn how to add and configure the native Liquibase command step in Harness DB DevOps pipelines for advanced database control and flexibility.
sidebar_position: 1
keywords:
  - liquibase command step
  - harness dbops
  - liquibase integration
  - add liquibase step
  - database devops
  - db migration automation
  - ci cd database pipeline
  - liquibase command harness
  - database changeset execution
tags:
  - harness-db-devops
  - liquibase-integration
  - pipeline-steps
  - database-automation
  - changeset-management
---

When you create a pipeline in Harness Database DevOps, the Liquibase command step can help play a role in managing database changes. This step allows users to apply schema modifications and execute SQL scripts seamlessly within the pipeline.

Here's how you can add the Liquibase command step to your pipeline:

 1. In Harness, go to the **Database DevOps** module and select your **Project**. 
 2. Under the **Pipeline** tab, select the pipeline that you want to add the Liquibase command step to. 
 3. Within the pipeline configuration, select **Add Step**. 
 4. Select the **Liquibase Command Step**. 
 5. Configure the Liquibase Command Step by either selecting: 
    1. **Command**: Specify the command you want to execute (e.g. `update`, `rollback`, etc)
    1. **Schema Name**: Enter the name of the database schema that the command will affect. 
    1. **Instance Name**: Specify the database instance where the command will be executed. 
    1. **Tag**: This is an optional step but you can create a tag that indicates the version or state you want to apply or rollback changes to. 
 6. At the next step after these configurations, review the configuration to ensure it's set how you'd like. 
 7. Select **Save the pipeline**. 
 8. Run the pipeline and monitor the execution. 

:::info
To create a pipeline in Database DevOps, you can refer to the Harness documentation detailing how to [Create a pipeline](/docs/database-devops/use-database-devops/create-a-pipeline)
:::