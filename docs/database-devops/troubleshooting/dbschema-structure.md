---
title: Reserved Keywords in DB Schemas
description: Understand why overview is a reserved identifier and should not be used when creating DB Schemas in Harness.
sidebar_label: Reserved DB Schema Identifier
sidebar_position: 8
keywords: [database devops, db schema, identifier, reserved keyword, overview, API restrictions]
tags:
  - database-devops
  - db-schema
  - reserved-keywords
  - identifier
  - overview
  - api-restrictions
  - dbops
  - harness-db-devops
---

When defining a **DB Schema** in Harness Database DevOps, each schema must have a unique `identifier`. This identifier serves as the reference handle across pipeline configurations, API calls, and backend services.

As part of platform-level constraints, the identifier `overview` is **reserved** and **must not be used** when creating or referencing a DB Schema.

## Why This Matters

Harness exposes internal REST endpoints to retrieve metadata and usage information for Database DevOps entities. One such endpoint is:

```sh
/v1/orgs/{org}/projects/{project}/dbschema/overview
```


If a DB Schema is created using the identifier `overview`, it will result in a direct conflict with this reserved API route. This would break routing logic and lead to ambiguous or failed API behavior.

To safeguard against this, the platform enforces validation to prevent the use of `overview` as a DB Schema identifier.

## What Is Considered a DB Schema Identifier?

A DB Schema identifier is a logical and system-resolvable key used internally to reference a specific database changelog configuration. It is **not the same** as a Liquibase `changeset` ID.

For example:

```yaml
dbSchema:
  identifier: user-service-schema   # This is the DB Schema ID (not a changeset)
  name: User Service Schema
```

## What Happens If You Use "overview"?

Attempting to use `overview` as the identifier for a DB Schema will result in a validation error at the API or UI level. This is an intentional safeguard to avoid platform-level routing conflicts.

### Invalid DB Schema Identifier
```yaml
dbSchema:
  identifier: overview     # Invalid: Conflicts with internal API endpoint
  name: Main Schema
```

### Valid DB Schema Identifier
```yaml
dbSchema:
  identifier: orders-schema
  name: Orders Service Schema
```

## Best Practices
- Use descriptive and unique identifiers for all DB Schemas.
- Avoid reserved or commonly used route terms such as `overview`, `default`, `admin`, etc.
- Stick to lowercase letters, numbers, and hyphens (-) to ensure compatibility and clarity.

:::info Note
This restriction only applies to the identifier of the schema. You are still allowed to use the word "overview" in the **name**, **description**, or **comments** of the schema configuration.
:::