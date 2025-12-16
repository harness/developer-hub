---
title: Working with Flyway Migration Files
description: Learn how to build a migration file for your database using Harness DBOps.
sidebar_label: Working with Flyway Migration Files
sidebar_position: 4
slug: /database-devops/concepts/flyway-migrations-file-structure
keywords:
  - migration
  - database migration
  - flyway migration
  - database devops
  - db devops
  - harness db devops
  - harness database devops
  - harness dbops
  - harness dbops
  - harness database
  - harness db
  - harness devops
  - harness ci cd
tags:
  - changelog
  - database-devops
  - db-devops
  - harness-db-devops
  - ci-cd
  - dbops
---

Flyway provides a versioned, convention-driven approach to managing database schema changes. When paired with Harness Database DevOps, Flyway migrations become fully automated, GitOps-driven, and Kubernetes-native. This guide walks you through how to structure your migration files, configure the flyway.toml manifest, and prepare your repository for seamless deployments.

## Flyway Migration File Structure

A typical Flyway-compatible repository looks like this:
```tree
.
├── migrations/
│   ├── V1__init.sql
│   ├── V2__create_users.sql
│   ├── V3__add_orders_table.sql
│   └── U1__revert_init.sql
│   └── U2__drop_users.sql
├── flyway.toml
└── README.md
```
Recommended naming conventions:
1. `migrations/` as the folder root.
2. `flyway.toml` placed at the top level.
3. Semantic versioning (V1, V2, V3…) to maintain predictable ordering.

## Creating Versioned Migration Files
Flyway processes migrations based on its naming convention:

### 1. Versioned Migrations
Executed once and never modified.
```sql
V<version>__<description>.sql
```

Examples:
1. `V1__init.sql`
2. `V2__add_users_table.sql`
3. `V3__add_indexes.sql`

Each file contains SQL statements meant to evolve your schema:

```sql
-- V2__create_users.sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(200) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 2. Undo Migrations
Flyway supports a special class of migrations known as Undo Migrations, which use the `U<version>__<description>.sql` naming pattern.

```sql
U001__revert_init.sql
U002__remove_users_table.sql
```
Undo migrations allow you to reverse the effects of a corresponding versioned migration. For example:
|Forward Migration|	Undo Migration|	Purpose|
| --- | --- | --- |
| V1__init.sql | U1__revert_init.sql | Rolls back schema objects created in V1 |
| V2__create_users.sql | U2__drop_users.sql | Removes objects introduced in V2 |

Undo migrations are executed when you run the 'DB Schema Rollback' step in your pipeline. This allows for more controlled rollback than relying solely on backups or manual scripts.

### 3. Creating the flyway.toml Configuration File (Optional)
The `flyway.toml` file defines how Flyway connects to your database and manages migrations. 

A basic configuration looks like this:

```toml
[flyway]
# Relative path to your migration files
locations = ["filesystem:migrations"]

# Default schema used for tracking metadata
defaultSchema = "public"

# (Optional) Naming validation
validateMigrationNaming = true

# (Optional) Disable clean operations in production
cleanDisabled = true
```

You can also define dynamic configurations using profiles. For example:
:::important note
These environments are not used directly by Harness (Harness uses its own JDBC connectors). The `flyway.toml` is primarily for local testing or CI pipelines that run Flyway commands outside of Harness.
:::

```toml
[environments.dev]
url = "jdbc:postgresql://dev-db:5432/app"
user = "app_user"
password = "password123"

[environments.qa]
url = "jdbc:postgresql://qa-db:5432/app"
user = "qa_user"
password = "securepass"
```
## Best Practices for Building Flyway Migrations
1. Maintain Immutable Versioned Migrations Never modify an existing V1__*.sql file. If you need to correct a change: Create a new version file, e.g., `V4__fix_users_column.sql`.
2. Keep Migrations Small and Incremental. Smaller files ensure better readability and reduce risk during execution.
3. Enable naming validation in flyway.toml to enforce team-wide consistency: `validateMigrationNaming = true`
4. Use a Single Source of Truth. All schema changes must originate in Git, not from manual DB edits. Harness will ensure schema consistency across environments.