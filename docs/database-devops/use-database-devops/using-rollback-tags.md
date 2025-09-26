---
title: Using Rollback Tags with Apply Schema Step
sidebar_label: Rollback Tags with Apply Schema
description: Learn how Harness automatically manages rollback tags during the Apply Schema step, ensuring safe and reliable database rollbacks in Harness Database DevOps.
sidebar_position: 12
keywords:
  - rollback tags
  - apply schema step
  - harness dbops
  - database rollback
  - preStartTag expression
  - database devops
  - schema change rollback
  - harness liquibase integration
  - ci/cd rollback
  - database deployment safety
tags:
  - harness-db-devops
  - rollback-management
  - apply-schema
  - database-deployment
  - rollback-tags
---

When deploying database changeSets in Harness, rollback safety is built-in. The **Apply Schema** step ensures that every deployment is checkpointed with a rollback tag (`preStartTag`). This tag can be reused or created automatically, giving teams a reliable way to revert changes if needed.  

## How it Works  
When the Apply Schema step runs in a pipeline:
1. Harness checks if the last deployed changeSet already has a tag.
2. If a tag exists, Harness will reuse it.
3. If no tag is found, Harness automatically creates a new tag before running the update command.
This ensures that every deployment has a safe checkpoint for rollback.
## Accessing Rollback Tags  

You can access the rollback tag value with Harness expressions:  

- **Within the same stage**  
  ```yaml
  <+execution.steps.stepGroupIdentifier.steps.stepIdentifier.output.preStartTag>
  ```
- **Across pipeline**
   ```yaml
   <+pipeline.stages.stageIdentifier.spec.execution.steps.stepGroupIdentifier.steps.stepIdentifier.output.preStartTag>
   ```
Here’s what each part means:
- `stageIdentifier`: The stage where your Apply Schema step runs.
- `stepGroupIdentifier`: The step group containing your Apply Schema step.
- `stepIdentifier`: The Apply Schema step itself.
- `preStartTag`: The tag value Harness captures before running the update.

## Best Practices
- Use consistent tag naming conventions (e.g., release-2025-09-22).
- Store rollback [tags](https://developer.harness.io/docs/database-devops/concepts/glossary/tag) in external audit systems for traceability.
- Always verify tags before running deployments in production.
- Integrate rollback tags into approval steps for safer rollouts.
- When deploying a git-based schema, tag using the git sha
- when deploying an artifactory-based schema, tag using the artifact version

## FAQ
### 1. Is this different from Liquibase tags?
Yes. Liquibase requires manual tagging. Harness automates this process, ensuring a rollback tag is always captured—no missed steps, no manual scripts.

### 2. Can I export tags for external systems?
Yes, rollback tags can be logged or passed into monitoring and audit tools. It can also be queried via this API Endpoint - `https://apidocs.harness.io/migration-state/v1migrationstateprojdbinstance`

### 3. What if no previous tag exists?
Harness creates one automatically before the update, ensuring rollback safety every time.

### 4. Why use Harness instead of Liquibase directly?
Harness Database DevOps builds on top of Liquibase capabilities but adds pipeline automation, visibility, governance, auditability, and intelligent defaults like automatic tagging. This means:

    - You don’t need to write custom scripts for rollback safety.
    - Rollbacks are standardized across all environments.
    - Teams save time by using built-in pipeline steps instead of managing manual Liquibase commands.

### 5. How does this improve CI/CD for databases?
Tags ensure every schema deployment is checkpointed. Combined with Harness pipelines, this makes database delivery as safe and repeatable as application delivery.