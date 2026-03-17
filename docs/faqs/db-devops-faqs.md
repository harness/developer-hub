---
title: Database DevOps (DB DevOps) FAQs
description: Frequently asked questions about Harness Database DevOps (DB DevOps), including supported migration tools, rollback capabilities, and deployment workflows.
sidebar_position: 2
---

This page answers common questions about **Harness Database DevOps (DB DevOps)** and how it integrates database changes into modern CI/CD workflows.

## What is Harness DB DevOps?

Harness Database DevOps (DB DevOps) is a module that enables teams to manage database changes using the same CI/CD practices used for application code.

It integrates database schema changes into deployment pipelines, providing visibility, governance, and automation for database deployments across environments.

Key capabilities include:

- Pipeline-driven database deployments  
- Version-controlled database changes  
- Integration with application CI/CD workflows  
- Governance and approval workflows  
- Auditability and deployment visibility  

This approach allows teams to manage **database code alongside application code**, improving reliability and consistency across environments.


## Which database migration tools are supported?

Harness DB DevOps supports popular database migration frameworks including:

- **Liquibase**
- **Flyway**

Organizations can continue using their preferred migration tool while leveraging Harness pipelines to orchestrate and manage database deployments.

The migration framework executes the schema changes, while Harness provides:

- pipeline orchestration
- deployment visibility
- governance and approvals
- integration with CI/CD workflows

## Does DB DevOps support rollbacks?

Yes. Harness DB DevOps supports rollbacks through a dedicated pipeline step that safely reverts previously applied database changes. The **Apply Rollback** step allows teams to revert database changes executed during earlier deployments while maintaining visibility and control within the pipeline workflow. 

Learn more about rollbacks in the [DB DevOps documentation](https://developer.harness.io/docs/database-devops/use-database-devops/rollback-for-database-schemas).


## How does DB DevOps manage database changes with application deployments?

Database and application changes can be orchestrated within the **same Harness pipeline** to ensure coordinated deployments. This allows teams to:

- deploy database schema changes before application releases
- validate database updates during pipeline execution
- maintain consistency across environments

Application deployments require a **Harness Continuous Delivery (CD)** license. However, database deployments can still be managed independently within Harness pipelines.

## Can DB DevOps be used independently of Harness CD?

Yes. Database deployments can be executed through Harness pipelines without deploying application services. However, if you want to deploy **applications and databases together in the same pipeline**, a **Harness CD license** is required.

## How are database changes tracked and audited?

Database changes are tracked through both the migration framework and Harness platform capabilities.

Typically:

- migration scripts or changelogs are stored in **source control**
- migration tools track applied changes using metadata tables
- Harness pipelines record **deployment history and execution logs**

This provides a complete audit trail of:

- what changes were deployed?
- when deployments occurred?
- which environments were affected?

## What databases are supported?

Harness DB DevOps supports databases that are compatible with the underlying migration frameworks (Liquibase or Flyway).

Commonly used databases include:

- PostgreSQL  
- MySQL  
- Oracle  
- SQL Server  
- CockroachDB  
- MongoDB
- Amazon RDS
- MSSQL Azure
- Google Cloud SQL
- Snowflake
- AlloyDB

Support ultimately depends on the compatibility of the migration framework being used.

## How does DB DevOps help prevent unsafe database changes?

Harness DB DevOps helps teams reduce deployment risk through governance and pipeline controls.

Examples include:

- Approval gates before production deployments  
- Pipeline validation steps  
- Environment-based deployment controls  
- Audit logging and deployment visibility  

These capabilities help teams introduce **controlled, repeatable database deployment processes** across environments.