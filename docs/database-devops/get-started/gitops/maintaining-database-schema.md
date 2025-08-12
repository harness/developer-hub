---
title: Maintaining Versions of the Database Schema in a Git Repository
sidebar_label: Maintaining Versions of the Database Schema in a Git Repository
description: Learn how to maintain versions of your database schema in a Git repository using Harness DB DevOps, including best practices for version control and collaboration.
sidebar_position: 21
keywords:
  - database schema deployment
  - deploy schema changes
  - db schema updates
  - liquibase deployment
  - database devops
  - harness dbops
  - schema migration
  - ci cd database updates
  - changeset deployment
  - rollback and versioning
tags:
  - harness-db-devops
  - schema-deployment
  - changeset-management
  - ci-cd
  - rollback-strategy
---

Harness Database DevOps enables you to manage database schema changes as version-controlled .yml changelogs and changesets in a Git repository. This approach ensures consistency, traceability, and collaboration across development, staging, and production environments. 

## Why Version Your Database Schema?
Version-controlling database schema changes offers several advantages:
1. **Auditability**: Every schema change is tracked in Git history.
2. **Collaboration**: Multiple developers can work on database changes without conflicts.
3. **Rollback Support**: Historical versions make it easier to revert unintended changes.
4. **CI/CD Alignment**: Database deployments can follow the same GitOps principles as application code.

## How Harness Database DevOps Manages Schema Versions
Harness DB DevOps uses Liquibase-compatible .yml changelogs to define and track changes to your database schema.
- **Changelog File**: A .yml file that lists all schema changes in sequence.
- **Changeset**: An individual change unit inside the changelog.
- **Contexts**: Tags that let you control which changes apply in which environment.
- **Folder Structure**: Changelogs and changesets can be organized by module, environment, or release.

## 1. Initialize Your Changelog in Git
### Option A – Generate from Existing Database
If you do not have your schema tracked in Git yet: Use the Harness UI to generate an initial `.yml` changelog from your live database schema. Learn More about [Generate Changelog](https://developer.harness.io/docs/database-devops/use-database-devops/get-started/build-a-changelog/#setup-changelog) feature in Harness. Then commit the generated changelog to your Git repository.

### Option B – Use an Existing Files
If you already have your changelog files:
- Organize them following your chosen Harness DB DevOps repository structure (for example, one root changelog.yml including multiple changeset files).
- Commit your current schema state to Git.
For example: 
    ```tree
    ├── changelogs/
    │   ├── master.yml          # Main changelog file (includes all others)
    │   ├── changesets/
    │   │   ├── 2025-08-10-add-user-table.yml
    │   │   ├── 2025-08-11-add-email-index.yml
    │   │   └── ...
    │   ├── rollback/
    │   │   ├── rollback-add-user-table.yml
    │   │   ├── rollback-add-email-index.yml
    │   |   └── ... 
    ├── docs/                   # Optional – schema diagrams, design notes
    └── README.md
    ```
## 2. Commit and Push Changes
In trunk-based development, database changes are committed directly to the shared main branch or short-lived branches that are merged the same day.
1. Create or update the relevant .yml changeset in your changelog.
2. Use descriptive commit messages:
  ```bash
  git add .
  git commit -m "db: add user table and related indexes"
  git push origin main
  ```
3. If your team enforces pull requests, open a PR against main and ensure it is reviewed and merged within hours, not days.
4. Keep branches small and focused — ideally containing a single logical change.

## 3. Deploy Changes via Harness Pipelines
Harness executes your .yml changelogs in sequence during pipeline runs, ensuring every environment stays consistent. The pipeline automatically checks your Git repository for unapplied changesets and executes only the new ones, maintaining idempotency.
How it works:

- **Contexts**: Instead of maintaining separate changelog files for each environment, you can annotate changesets with contexts (e.g., dev, staging, prod).
- **Selective Deployment**: During pipeline execution, Harness applies only the changesets whose contexts match the target environment stage in the pipeline.
- **Drift Detection**: Harness continuously checks for schema drift between Git and the actual database, so you can identify and fix discrepancies early.
- **Rollback Support**: Pipelines can invoke rollback commands automatically if a deployment fails, reverting to the last known good state.

For example,
```yaml
databaseChangeLog:
  - changeSet:
      id: 001-create-users-table
      author: john-doe
      context: dev,staging
      changes:
        - createTable:
            tableName: users
            columns:
              - column:
                  name: id
                  type: int
                  constraints:
                    primaryKey: true
              - column:
                  name: name
                  type: varchar(255)
```
In this example:
- When deploying to dev or staging, the changeset is applied.
- When deploying to prod, it is skipped until explicitly marked for that context.
::: note important
Keep contexts environment-specific for controlled rollouts, but avoid creating too many context tags to prevent complexity.
:::

## Best Practices

* **One Logical Change per Changeset** – Keep each changeset focused on a single atomic change for easier rollbacks.
* **Consistent Naming Conventions** – Use descriptive IDs and filenames (e.g., `2025-08-12-add-users-table.yml`).
* **Never Edit Applied Changesets** – Create a new changeset for any modification to maintain audit history.
* **Use Liquibase compatible Contexts for Environment Targeting** – Tag changesets (e.g., `dev`, `staging`, `prod`) to control execution scope.
* **Keep Contexts Simple** – Limit to environment-level tags unless there’s a strong reason for finer granularity.
* **Align with Git Strategy** – Follow trunk-based or release-branch workflows for schema changes.
* **Commit Early and Test Often** – Validate in lower environments before promoting upstream.

**Context Tagging Patterns**

| Context Tag | Purpose                      | Example Usage              |
| ----------- | ---------------------------- | -------------------------- |
| `dev`       | Development environment only | Early feature testing      |
| `staging`   | Pre-production validation    | QA and integration testing |
| `prod`      | Production environment only  | Final approved changes     |
| `common`    | Runs in all environments     | Core schema objects        |
