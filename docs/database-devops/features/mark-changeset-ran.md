---
title: Mark Changeset Ran | Apply Schema Step
description: Learn how to use the mark-changeset-ran option in Harness Database DevOps pipelines. This option ensures failed changesets are marked as ran, enabling rollback execution for failed database changes.
tags: 
  - harness database devops
  - liquibase
  - changesets
  - rollback
  - schema management
  - ci/cd
  - database deployments
keywords:
  - mark changeset ran harness
  - harness db devops rollback
  - liquibase mark changeset ran
  - harness database schema apply
  - rollback failed changeset
  - database devops ci/cd
---

The **Mark Changeset Ran** option is available in the Apply Schema step under Harness Database DevOps. When enabled, it ensures that failed changesets are marked as **ran** in the database changelog table, even if they do not execute successfully. This feature provides more reliable rollback behavior and prevents broken changesets from being re-executed in future pipeline runs.

## How it works

By default, if **Mark Changeset Ran** is not selected, any changeset that fails during the Apply Schema step stays unexecuted. This means the same changeset will be retried the next time the pipeline runs. In this case, rollback steps won’t be aware of the failed changeset, so no rollback action is taken for it.

When you select **Mark Changeset Ran**, Harness marks failed changesets as **ran** in the database changelog table, even though they didn’t apply successfully. This prevents them from being retried in later runs. More importantly, if your pipeline has a rollback step that rolls back to the Apply Schema step’s pre-start tag, the rollback will now include rollback scripts for those failed changesets.

This gives you a safer and more consistent rollback experience, since failed changesets won’t just sit in a “half-applied” state—they’ll be tracked and properly rolled back.

## Step-by-step: Enable Mark Changeset Ran

1. In your pipeline, add or edit an **Apply Schema** step.  
2. Under **Global Settings**, check the option:  
   - **Mark failed changeset run**.  
3. Save your changes and run the pipeline.  
4. If any changeset fails:
   - The failed changeset is marked as ran.  
   - If a rollback step exists, it will roll back to the pre-start tag and include rollback scripts for the failed changeset.

![Apply Schema Mark Changeset Ran](./static/db-apply-mark-changeset-ran.png)

## Example workflow

**Pipeline structure:**
- Step 1: Apply Schema (with *Mark Changeset Ran* checked)  
- Step 2: Rollback (configured with pre-start tag of Step 1)  

**Scenario:**  
- A changeset `001_add_users_table.sql` fails to apply.  
- Harness marks it as ran in the changelog.  
- Rollback step executes the rollback script for `001_add_users_table.sql`.  

This ensures the rollback step cleans up failed changes automatically.

## When to use Mark Changeset Ran

Use this option when:

* ✅ You want rollback steps to include failed changesets and automatically clean them up.
* ✅ Database consistency and safety are more important than retrying failed changesets.
* ✅ Your team follows GitOps practices and you need the pipeline state to stay aligned with the database state.
* ✅ You want a complete audit trail where even failed changesets are tracked in the changelog table.

Avoid using this option if your workflow depends on retrying failed changesets in later runs instead of rolling them back.

## FAQ

### Does this feature skip failed changesets in future runs?
Yes. Failed changesets are marked as ran, so they won’t re-run. Instead, rollback scripts are executed if configured.  

### Is this the same as Liquibase’s `mark-ran` command?
Yes, this option is Liquibase-compatible. Harness leverages the same mechanism but integrates it directly into the CI/CD workflow.  

### What happens if I disable this option?
Failed changesets remain pending in the changelog and will retry on the next pipeline run. Rollback will not include them.  

### Does it affect audit and tracking?
Yes. All failed changesets are still recorded in the changelog table, ensuring full auditability.  