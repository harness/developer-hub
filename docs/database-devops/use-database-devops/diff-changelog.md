---
title: Diff Changelog
sidebar_label: Diff Changelog
description: Learn how Harness Database DevOps can create a diff changelog to synchronize database schemas.
keywords:
  - diff changelog
  - database diff changelog
  - liquibase diff changelog
  - database devops
  - harness dbops
  - database synchronization
  - dbops schema management
  - multi-instance schema sync
  - consistent database schemas
  - automated schema sync
  - database environment consistency
tags:
  - harness-db-devops
  - schema-management
  - database-automation
  - multi-instance-management
  - database-consistency
  - liquibase
---
import CommitToGit from "../snippets/commit-to-git.md";

Traditional database change workflows rely on manually written scripts. This creates risk:

- Missing dependencies
- Incomplete rollbacks
- Inconsistent naming and standards

Diff-changelog eliminates these risks by deriving changes directly from database state. You can define the **desired schema** by modifying a real database. The system generates the **migration plan** automatically.

## What is a Diff Changelog?

The `diff-changelog` is a command that generates a changelog based on the current state of a database. This command becomes exponentially more powerful when it is embedded inside a governed Database DevOps pipeline.  Instead of being a one-time developer utility, it becomes an **automated change-authoring engine** that converts real database state into deployable, policy-compliant migrations.

## Prerequisites
Before you begin, ensure you have the following prerequisites in place:
- A Harness account with access to the Database DevOps module.
- Database instances set up and connected to Harness via database connectors.
- A database schema and database instance defined in the Database DevOps module.

## How to use `diff-changelog` in Database DevOps ?

### 1. Synchronize Development with Git
Before any changes are captured, the development database is brought in sync with Git by running a standard Liquibase `apply`.  This ensures the environment is a trusted baseline.

### 2. Capture the Authoring Schema
A snapshot of the authoring environment is taken after engineers have completed their schema changes. This snapshot represents the desired database state.

Example:
```yml
- step:
    type: LiquibaseCommand
    name: Authoring Schema Snapshot
    identifier: snapshot_authoring
    spec:
      connectorRef: account.harnessImage
      command: snapshot
      resources:
        limits:
          memory: 2Gi
          cpu: "1"
      settings:
        output-file: mySnapshot.json
        snapshot-format: json
        dbSchema: pipeline_authored
        dbInstance: authoring
        excludeChangeLogFile: true
      timeout: 10m
      contextType: Pipeline
```

### 3. Generate the Diff Changelog

The pipeline runs `diff-changelog` using the snapshot as the reference and development as the target. This produces a changelog file containing only the delta between the two states.

Example:
```yml
- step:
    type: LiquibaseCommand
    name: Diff as Changelog
    identifier: diff_dev_as_changelog
    spec:
      connectorRef: account.harnessImage
      command: diff-changelog
      resources:
        limits:
          memory: 2Gi
          cpu: "1"
      settings:
        reference-url: offline:mssql?snapshot=mySnapshot.json
        author: <+pipeline.variables.email>
        label-filter: <+pipeline.variables.ticket_id>
        generate-changeset-created-values: "true"
        generated-changeset-ids-contains-description: "true"
        changelog-file: diff.yaml
        dbSchema: pipeline_authored
        dbInstance: development
        excludeChangeLogFile: true
      timeout: 10m
      when:
        stageStatus: Success
```

The resulting file `diff.yaml` will contain:
- New columns
- New indexes
- Modified objects
- All required rollback metadata

### 4. Merge the Diff Changelog into Primary Changelog
The diff file is merged into the primary changelog, which is then deployed to the target database. For which we will use the `RunStep`.
 In the Stage, select "Custom" and then create a "Step Group". Then a new add step, **Run** Step with the following configuration:
  - **Container Registry**: used to pull images from private or public registries.
  - **Image**: "`mikefarah/yq:4.45.4`"
  - **Shell**: "`sh`"
  - **Command**: Add the following script under the command palette:
  ```bash
        # Optionally annotate changesets
        yq '.databaseChangeLog.[].changeSet.comment = "<+pipeline.variables.comment>" | .databaseChangeLog.[] |= .changeSet.id = "<+pipeline.variables.ticket_id>-"+(path | .[-1])' diff.yaml > diff-comments.yaml
        
        # Merge new changesets into the main changelog

        yq -i 'load("diff-comments.yaml") as $d2 | .databaseChangeLog += $d2.databaseChangeLog' dbops/ensure_dev_matches_git/changelogs/pipeline-authored/changelog.yml

        # Output the merged changelog (for transparency/logging)
        cat dbops/ensure_dev_matches_git/changelogs/pipeline-authored/changelog.yml
        ```

<CommitToGit/>