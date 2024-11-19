---
title: Database DevOps (DB DevOps) FAQs
description: This article addresses some frequently asked questions about Harness Database DevOps (DB DevOps).
sidebar_position: 2
---

This article addresses some frequently asked questions about Harness Database DevOps (DB DevOps).

### What is DB DevOps?

Harness Database DevOps (DB DevOps) is a new module that integrates database changes into your deployment pipeline and provides greater visibility into database changes. It will allow you to manage database code like application code.

### How will DB DevOps be priced?

The plan is to price around the concept of ‘database instances', which is the application of a particular database schema, to a particular database connection. This pricing metric aligns well to perceived customer value. For our startup tier we also plan to have per-user pricing, with a cap on the number of database instances per user.

### Does DB DevOps support rollbacks?

Yes, rollbacks are supported, leveraging Liquidbase's rollback capabilities. For many liquibase native operations there is a default rollback behavior that can be overriden if desired. When passing raw sql scripts, a rollback script can be associated to the change to allow for rollback.

Liquibase rollback or "roll-forward" is an "undo" mechanism for database changes.

Each change is recorded as a changeset in a changelog file. Changesets include both the change itself and rollback instructions.

When initiating a rollback, Liquibase reads the changelog backwards, executing each changeset. This process can revert the database to any previous state.

Changesets can be rolled back individually or in groups. Liquibase uses "tags and contexts to manage sets of changes", allowing for targeted rollbacks.

The reason customers may have asked how this works is if they felt the changes may potentially be destructive, like a column deletion. Once a column is dropped, its data is typically lost. Liquibase can recreate the column structure during rollback, but cannot automatically restore the lost data. 

The way to mitigate this is to again use changesets to back up the data before deletion have rollback instructions to recreate the column and restore the data and cleans up the backup table.

This should be there as a best practice and then executed to allow for any schema evolution. We are also exploring governance guard-rails to enforce such practices.

### How does DB DevOps handle database provisioning?

Initially we will not add functionality for this, but it is under consideration for our post-GA roadmap.

### Does DB DevOps leverage any existing open-source tooling?

Yes, we currently use liquidbase, and plan to add support for flyway in the future.

### How does DB DevOps manage database changes in relation to application deployments?

Both change types can be included in the same pipeline to ensure that the database and schema are deployed together.

### How will Harness help my SQL performance?

Harness will have views correlating changes in database performance metrics with changes that may affect it. Our roadmap also includes analyzing SQL queries to warn users of queries that may cause performance issues or outages before applying them to production.

### Will DB DevOps be aware of changes done to my database outside of Harness?

Initially DB DevOps will be aware of any changes done to your database by Liquibase. Eventually we plan to add detection for changes done that do not use Harness or Liquibase.
