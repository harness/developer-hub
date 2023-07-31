---
title: Configure Harness Self-Managed Enterprise Edition to use external databases
sidebar_label: Configure external databases
description: Harness supports multiple databases when you deploy Harness Self Managed Enterprise Edition. Tutorials are available for you to learn about your configuration options.
sidebar_position: 1
---

By default, Harness Self-Managed Enterprise Edition uses an embedded database, which is sufficient for evaluation or small to medium scale deployments. However, as your deployment scales and becomes critical for your organization, it's essential to switch to a more robust external database solution. 

Harness supports multiple databases when you deploy Harness Self-Managed Enterprise Edition. To use an external database with Harness, you must install and configure the database software as a self-managed or cloud-based solution. Once your external database is set up, you can then configure Harness to connect to it. This involves specifying the database connection properties, such as the database URL, username, and password.

## Benefits of an external database

Below are some of the benefits of using an external database:

- High availability
- Disaster recovery
- No maintenance downtime
- Secondary read support (read scaling)

## Setup

The specific steps and procedures to set up an external database with Harness vary, depending on the version and your specific deployment environment. It's always best to refer to the official Harness documentation and consult support resources for the most up-to-date and accurate information regarding database configuration for production-ready deployments.

## Database options

You can configure any of the following external databases with Harness Self-Managed Enterprise Edition:

- MongoDB
- PostgreSQL
- Redis
- TimescaleDB

Tutorials are available for each installation option.

### MongoDB

- [Cloud-based tutorial](/tutorials/self-managed-enterprise-edition/use-an-external-mongodb-database)

- [Self-managed tutorial](/tutorials/self-managed-enterprise-edition/use-an-external-self-managed-mongodb)

### PostgreSQL

- [Self-managed tutorial](/tutorials/self-managed-enterprise-edition/use-an-external-postgres-database)

### Redis

- [Self-managed tutorial](/tutorials/self-managed-enterprise-edition/use-an-external-redis-database)

### TimescaleDB

- [Self-managed tutorial](/tutorials/self-managed-enterprise-edition/use-an-external-sm-timescaledb)
