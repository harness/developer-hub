---
title: Automated Rollback for Database Schemas
sidebar_label: Automated Rollback for Database Schemas
description: Automated Rollback for Database Schemas.
sidebar_position: 4
---

This topic describes how Harness Database DevOps implements automated rollback to maintain the stability and integrity of your database schema workloads. 

## What are tags? 

A tag is a marker or label assigned to a specific point in a database's migration history. Harness recommends creating a change every time you deploy a changeset to a database so that you always have a rollback point for future changes.

### Rollback A Database Schema 

To rollback a database schema, this action refers to rolling back changes you've made to your database based on a specified tag of your creation. 

Here is how you can rollback a database within Harness Database DevOps: 

 1. In Harness, go to the **Database DevOps** module and select your **Project**. 
 2. Determine the tag you want to roll back to. This tag represents a specific state of the database schema that you want to revert to after applying changes. 
 3. Select the **Pipelines** tab on the side menu, and open the pipeline in your Harness Database DevOps interface where the rollback will be executed. 
 4. In the configuration for the rollback step, you will need to provide the following details:
    -  **Schema Name**: Specify the name of the database schema that you want to roll back.
    - **Instance Name**: Indicate the database instance where the rollback will take place. This is typically defined by a JDBC URL, user, and password.
    - **Rollback Tag**: Enter the name of the tag to which you want to roll back the schema.
 5. Run the pipeline with the configured rollback step.
 6. Keep an eye on the execution logs to ensure that the rollback is successful. The logs will provide information about the actions taken 
  during the rollback.
 7. After the rollback is complete, verify that the database schema has been reverted to the desired state. This may involve checking the schema structure and ensuring that any changes made after the specified tag have been undone.

:::info
You can refer to the Harness documentation detailing how to [Add a Liquibase command step](/docs/database-devops/use-database-devops/add-liquibase-command-step.md)
:::

## Built in failure strategies including rollback

When managing database schema changes, it’s crucial to have mechanisms in place to handle failures gracefully. Built-in failure strategies, including rollback, are designed to protect your application and data by providing automated responses when something goes wrong during a database update.

Rollback is the process of undoing changes that were made to the database if an error occurs during an update. This ensures that the database is returned to its previous state, preventing partial updates that could lead to inconsistencies or application crashes.

This reduces the risk of downtime or data corruption and allows teams to quickly address issues without having to manually intervene.

## Automated Rollback for Database Schema Changes

When managing database schema changes, the risk of something going wrong is always present. With Harness DB DevOps, you can help mitigate this risk by providing an automated rollback feature. This feature ensures that if a schema change fails, the database can be quickly and automatically restored to its previous state, maintaining stability and data integrity.

### What is Automated Rollback?

Automated rollback is a feature that automatically reverses database changes if an error occurs during a deployment. This prevents partial or inconsistent updates that could disrupt your application or lead to data corruption.

In Harness DB DevOps, automated rollback leverages tags and versioning to ensure a smooth and reliable process. There are two main scenarios where rollback can occur:

 1. **Immediate Rollback**: If a change fails to apply during
 deployment.
 2. **Delayed Rollback**: If a change is successfully applied, but a rollback is later required.

### Immediate Rollback

By default, if a change fails to apply during deployment, Harness DB DevOps will automatically roll back the change using the database's built-in transaction rollback mechanism. This is what we call an **immediate rollback**. This ensures that the database remains in a consistent state, even if a part of the deployment fails.

### Delayed Rollback

In some cases, you might need to roll back changes that were successfully applied. This could be due to:

 - A subsequent change in the deployment pipeline failing
 - An application health check failing after deployment
 - Other operational or business reasons

For these scenarios, Harness DB DevOps provides a 'Rollback Schema' pipeline step. This step can be configured in your pipeline to roll back to a particular tag, allowing you to revert your database schema to a known good state.

## Accelerate Innovation Velocity

Harness DB DevOps is a powerful tool that helps accelerate innovation velocity, particularly in the context of managing and evolving database schemas. By using DB DevOps, development teams can introduce new features, improve existing ones, and deploy updates more rapidly and safely. 

By integrating DB DevOps into your development workflow, teams can accelerate their innovation velocity by automating and streamlining database schema changes. DB DevOps reduces the friction associated with database updates, allowing teams to focus on delivering new features and improvements faster and with greater confidence. This, in turn, enhances the overall agility of the development process, enabling organizations to stay competitive and responsive to market demands.