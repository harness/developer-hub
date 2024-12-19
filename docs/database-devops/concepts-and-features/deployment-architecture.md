---
title: DB DevOps Architecture
sidebar_label: DB DevOps Architecture
description: Deployment architecture of Harness Database DevOps
sidebar_position: 5
---

Welcome to the Harness Database DevOps Product Documentation. This guide will assist you in  integrating database operations into your application deployment workflows. Our Database DevOps module enables you to manage database schemas, orchestrate changes, and ensure consistency across all your environments. Let's dive into how Harness Database DevOps can streamline your database change management and enhance your overall deployment strategy.

## Before you begin, review the following:

- [All about Database DevOps](/docs/database-devops/get-started/overview.md)

## Harness DB DevOps Architecture

:::info
Before you can access Harness Database DevOps, you must have Harness enable the following feature flag, `DBOPS_ENABLED`. To enable the feature flag, please contact [Harness Support](mailto:support@harness.io).
:::

   ![Harness DB DevOps architecture diagram](./static/database-devops-architecture.png)

[Harness Database DevOps](/docs/database-devops/get-started/overview.md) is designed to function independently, allowing organizations to manage database change operations without relying on Harness CI. It integrates seamlessly with [Harness CD](../../continuous-delivery/get-started/key-concepts.md) to apply DevOps best practices to database operations, enabling users to orchestrate database changes as part of their deployment pipelines. While it utilizes the CI architecture on the backend, the primary use case for Database DevOps is to operate standalone or in conjunction with Harness CD, rather than being dependent on Harness CI.

## Database DevOps Key Concepts

### Database Schemas

A database schema is the structure of a database, e.g. what tables and columns and indexes exist. In the context of Harness DB DevOps, there is an entity called a 'schema’ that is a collection of DDL or DML changes that can be applied to a database. Today this collection is in the form of a liquibase changelog checked into git or artifactory.

:::info
Head over to the [Key Concepts documentation on Harness Database DevOps](../get-started/key-concepts.md) to learn more.
:::

### Database Instances 

A database instance associates a database schema to a database connection. It represents the intersection of the database's structural definition (the schema) with the actual data environment where the schema is implemented.

### Database Connection

A database connection refers to the specific parameters and credentials used to establish a secure link between the Harness platform and an individual database server. This connection is done through a JDBC (Java Database Connectivity) URL, which specifies the location of the database server, and is authenticated using a username and password. The connection is made via a Harness Delegate, which allows secure access to the database, even when the database instance is not internet-accessible. This setup enables Harness to execute SQL scripts, orchestrate database changes, and manage schema versions as part of the CI/CD pipeline, all while adhering to security best practices. 
