---
title: Database DevOps (DB DevOps) FAQs
description: This article addresses some frequently asked questions about Harness Database DevOps (DB DevOps).
sidebar_position: 2
---

This article addresses some frequently asked questions about Harness Database DevOps (DB DevOps).

### What is DB DevOps?

Harness Database DevOps (DB DevOps) is a new module that integrates database changes into your deployment pipeline and provides greater visibility into database changes. It will allow you to manage database code like application code.

### Does DB DevOps support rollbacks?

Yes, rollbacks are supported within the DB DevOps framework. The system includes built-in rollback capabilities that can be customized as needed. For many operations, there is a default rollback behavior that can be overridden if desired. When using raw SQL scripts, a corresponding rollback script can be associated with the change to facilitate the rollback process.

The rollback mechanism serves as an "undo" feature for database changes. Each change is recorded as a changeset, which includes both the change itself and the associated rollback instructions.

When initiating a rollback, the system processes the changesets in reverse order, executing each one to revert the database to a previous state. Changesets can be rolled back individually or in groups, and the system utilizes tags and contexts to manage sets of changes, allowing for targeted rollbacks.

Customers may inquire about this functionality, particularly in scenarios where changes could be destructive, such as deleting a column. While the system can recreate the column structure during a rollback, it cannot automatically restore lost data. To mitigate this risk, it is advisable to use changesets to back up data before deletion, include rollback instructions to recreate the column, and clean up any backup tables afterward.

Implementing these best practices will support effective schema evolution. Additionally, we are exploring governance guardrails to enforce such practices within the DB DevOps process.

Yes, rollbacks are supported, leveraging Liquibase's rollback capabilities. For many liquibase native operations there is a default rollback behavior that can be overriden if desired. When passing raw sql scripts, a rollback script can be associated to the change to allow for rollback.

Liquibase rollback or "roll-forward" is an "undo" mechanism for database changes.

Each change is recorded as a changeset in a changelog file. Changesets include both the change itself and rollback instructions.

When initiating a rollback, Liquibase reads the changelog backwards, executing each changeset. This process can revert the database to any previous state.

Changesets can be rolled back individually or in groups. Liquibase uses "tags and contexts to manage sets of changes", allowing for targeted rollbacks.

The reason customers may have asked how this works is if they felt the changes may potentially be destructive, like a column deletion. Once a column is dropped, its data is typically lost. Liquibase can recreate the column structure during rollback, but cannot automatically restore the lost data. 

The way to mitigate this is to again use changesets to back up the data before deletion have rollback instructions to recreate the column and restore the data and cleans up the backup table.

This should be there as a best practice and then executed to allow for any schema evolution. We are also exploring governance guard-rails to enforce such practices.

### How does DB DevOps manage database changes in relation to application deployments?

Customers can only deploy application changes if they are also licensed for Harness CD however, both change types can be included in the same pipeline to ensure that the database and schema are deployed together.