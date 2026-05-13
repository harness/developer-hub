---
title: Branch-scoped build numbers
description: Track incremental build numbers per branch using the branchSeqId expression.
sidebar_position: 25
---

Harness provides branch-scoped build numbers that increment independently for each branch in your repository. Use the `<+pipeline.branchSeqId>` expression to version artifacts and track builds per branch, instead of relying on the global pipeline sequence counter, `<+pipeline.sequenceId>`, that increments across all branches.


:::info
This feature is behind the feature flag `CI_ENABLE_BRANCH_SEQUENCE_ID`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.
:::

---

## What will you learn in this topic?

By the end of this topic, you will be able to:

- Use the `<+pipeline.branchSeqId>` expression to track incremental build numbers per branch.
- Understand when the branch sequence ID is available and when it returns null.
- Apply branch-scoped build numbers to version artifacts and Docker images.
- Manage branch sequence counters using the Harness API.

---

## Before you begin

Before you use branch-scoped build numbers, ensure you have the following:

- The `CI_ENABLE_BRANCH_SEQUENCE_ID` feature flag enabled for your account. Contact <a href="mailto:support@harness.io">Harness Support</a> to enable it.
- Pipeline builds triggered with branch context (webhook triggers or manual branch builds).
- A <a href="/docs/platform/automation/api/add-and-manage-api-keys" target="_blank">Harness API key</a> if you plan to manage branch sequences via API.

---

## Overview

The global `<+pipeline.sequenceId>` increments with every execution across all branches, making it difficult to identify which build number corresponds to a specific branch. 

The branch sequence ID (`<+pipeline.branchSeqId>`) solves this by maintaining separate counters for each branch-repository combination:


| Branch | Repository | Execution | `sequenceId` | `branchSeqId` |
|--------|------------|-----------|--------------|---------------|
| main | github.com/org/repo | 1st | 1 | 1 |
| feature-x | github.com/org/repo | 2nd | 2 | 1 |
| main | github.com/org/repo | 3rd | 3 | 2 |
| feature-x | github.com/org/repo | 4th | 4 | 2 |

## How it works

The branch sequence ID is:

1. **Scoped to pipeline + branch + repository**: Each unique combination of pipeline identifier, normalized branch name, and normalized repository URL maintains its own counter.
2. **Incremented at execution start**: The counter increments when the pipeline execution begins, before any steps run. If a build is queued due to concurrency limits, the sequence is assigned when the build is first triggered, not when it starts executing from the queue.
3. **Normalized for consistency**: Repository URLs are normalized (e.g., `https://github.com/org/repo.git` and `git@github.com:org/repo` resolve to the same identifier). Branch names have `refs/heads/` prefixes stripped.
4. **Persisted in database**: Counters persist across pipeline executions and survive service restarts.
5. **Cleaned up on pipeline deletion**: When a pipeline is deleted, all associated branch sequence records are removed.

### When the expression resolves

The `<+pipeline.branchSeqId>` expression returns a value when:

- Build is triggered by a **PR webhook** (uses the source branch)
- Build is triggered by a **push webhook** to a branch
- Build is a **manual branch build**

The expression returns `null` when:

- Build is triggered by a **tag push** (tags don't have branch context)
- Build is a **manual tag build**
- Build targets a **specific commit SHA** without branch context
- The feature flag is not enabled

### Pipelines with codebase disabled

The branch sequence ID works even when **Clone Codebase** is disabled in your pipeline's codebase configuration. Harness extracts branch and repository information directly from the webhook trigger payload. This way, the sequence counter increments correctly regardless of whether the pipeline clones the repository.

This is useful for pipelines that:

- Use a custom clone step instead of the built-in Clone Codebase
- Only need metadata from the trigger (branch name, PR number) without cloning
- Clone repositories conditionally based on pipeline logic

## Expression reference

| Expression | Description |
|------------|-------------|
| `<+pipeline.branchSeqId>` | Returns the incremental sequence ID for the current branch and repository combination. Returns `null` if not available. |

## Examples

### Display build information

```yaml
- step:
    type: Run
    name: Build Info
    identifier: build_info
    spec:
      shell: Sh
      command: |
        echo "Pipeline: <+pipeline.name>"
        echo "Global Build #: <+pipeline.sequenceId>"
        echo "Branch: <+codebase.branch>"
        echo "Branch Build #: <+pipeline.branchSeqId>"
```

Example output for the 5th build on the `develop` branch (47th overall pipeline execution):

```
Pipeline: my-ci-pipeline
Global Build #: 47
Branch: develop
Branch Build #: 5
```

### Version artifacts by branch

This example creates Docker image tags that include the branch-specific build number:

```yaml
- step:
    type: BuildAndPushDockerRegistry
    name: Build Image
    identifier: build_image
    spec:
      connectorRef: dockerhub
      repo: myorg/myapp
      tags:
        - <+codebase.branch>-<+pipeline.branchSeqId>
        - <+codebase.branch>-latest
```

This produces tags like:
- `develop-1`, `develop-2`, `develop-3` for builds on `develop`
- `feature-auth-1`, `feature-auth-2` for builds on `feature-auth`

### Semantic versioning with branch builds

Combine with other expressions for semantic versioning:

```yaml
- step:
    type: Run
    name: Set Version
    identifier: set_version
    spec:
      shell: Sh
      command: |
        BRANCH="<+codebase.branch>"
        BUILD_NUM="<+pipeline.branchSeqId>"

        if [[ "$BRANCH" == "main" ]]; then
          VERSION="1.0.${BUILD_NUM}"
        elif [[ "$BRANCH" == release/* ]]; then
          RELEASE_VER="${BRANCH#release/}"
          VERSION="${RELEASE_VER}.${BUILD_NUM}"
        else
          # Feature branches
          SAFE_BRANCH=$(echo "$BRANCH" | tr '/' '-')
          VERSION="0.0.0-${SAFE_BRANCH}.${BUILD_NUM}"
        fi

        echo "Version: $VERSION"
      outputVariables:
        - name: VERSION
```

### Conditional logic for non-branch builds

This example describes how to handle cases where the expression returns `null`, such as tag builds or commit-only builds:

```yaml
- step:
    type: Run
    name: Generate Version
    identifier: generate_version
    spec:
      shell: Sh
      command: |
        BRANCH_SEQ="<+pipeline.branchSeqId>"

        # When branchSeqId is null, the expression resolves to "null" string
        if [[ -n "$BRANCH_SEQ" && "$BRANCH_SEQ" != "null" ]]; then
          echo "Branch build #${BRANCH_SEQ}"
          VERSION="<+codebase.branch>-${BRANCH_SEQ}"
        else
          echo "Non-branch build (tag or commit)"
          VERSION="<+codebase.tag>-<+pipeline.sequenceId>"
        fi

        echo "Using version: $VERSION"
```

## Manage branch sequences

:::note
These API endpoints require the `CI_ENABLE_BRANCH_SEQUENCE_ID` feature flag. If the flag is not enabled, the API returns a message prompting you to enable it.
:::

### View branch sequences

You can view all branch sequence records for a pipeline using the API:

```bash
curl -X GET \
  'https://app.harness.io/pipeline/api/pipelines/<PIPELINE_ID>/branch-sequences?accountIdentifier=<ACCOUNT_ID>&orgIdentifier=<ORG_ID>&projectIdentifier=<PROJECT_ID>' \
  -H 'x-api-key: <API_KEY>'
```

Response:

```json
{
  "data": [
    {
      "normalizedRepoUrl": "github.com/myorg/myrepo",
      "branch": "main",
      "sequenceId": 42,
      "createdAt": 1709123456789,
      "lastUpdatedAt": 1709234567890
    },
    {
      "normalizedRepoUrl": "github.com/myorg/myrepo",
      "branch": "develop",
      "sequenceId": 15,
      "createdAt": 1709123456789,
      "lastUpdatedAt": 1709134567890
    }
  ]
}
```

### Reset a branch sequence

To reset a branch sequence counter, delete the record and it will restart from 1 on the next build:

```bash
curl -X DELETE \
  'https://app.harness.io/pipeline/api/pipelines/<PIPELINE_ID>/branch-sequences?accountIdentifier=<ACCOUNT_ID>&orgIdentifier=<ORG_ID>&projectIdentifier=<PROJECT_ID>&repoUrl=<REPO_URL>&branch=<BRANCH>' \
  -H 'x-api-key: <API_KEY>'
```

### Set a specific sequence value

You can set the sequence to a specific value (useful for migrations):

```bash
curl -X PUT \
  'https://app.harness.io/pipeline/api/pipelines/<PIPELINE_ID>/branch-sequences/set?accountIdentifier=<ACCOUNT_ID>&orgIdentifier=<ORG_ID>&projectIdentifier=<PROJECT_ID>&repoUrl=<REPO_URL>&branch=<BRANCH>&sequenceId=100' \
  -H 'x-api-key: <API_KEY>'
```

## Comparison with other expressions

| Expression | Scope | Increments | Use case |
|------------|-------|------------|----------|
| `<+pipeline.sequenceId>` | Pipeline (global) | Every execution | Unique execution identifier |
| `<+pipeline.branchSeqId>` | Pipeline + Branch + Repo | Per branch/repo combination | Branch-specific build numbering |
| `<+pipeline.executionId>` | Global (UUID) | N/A (unique ID) | Execution URL, logging |

## Troubleshooting

### Expression returns null

If `<+pipeline.branchSeqId>` returns `null` when you expect a value:

1. **Verify feature flag**: Confirm `CI_ENABLE_BRANCH_SEQUENCE_ID` is enabled for your account.
2. **Check build type**: Tag builds and commit SHA builds don't have branch context.
3. **Check webhook payload**: For webhook triggers, verify the payload includes branch information.

### Different branches showing same sequence

Branch sequences are scoped by normalized repository URL. If you're seeing unexpected behavior:

1. **Check repository URL normalization**: URLs like `https://github.com/org/repo.git` and `git@github.com:org/repo` normalize to the same identifier.
2. **Verify branch names**: Branch names are normalized (e.g., `refs/heads/main` becomes `main`).

### Sequence not incrementing

1. **Check for errors in execution logs**: Look for warnings about branch sequence increment failures.
2. **Verify database connectivity**: The sequence counter is stored in the database.
3. **Check pipeline identity**: Different pipelines have completely independent counters.

## Related articles

- <a href="/docs/platform/variables-and-expressions/harness-variables" target="_blank">Use Harness expressions</a>: Learn how to reference variables, expressions, and built-in pipeline data in your workflows.
- <a href="/docs/platform/variables-and-expressions/harness-expressions-reference" target="_blank">Harness expressions reference</a>: Browse the complete list of available expressions including pipeline, stage, and environment variables.
- <a href="/docs/platform/triggers/triggering-pipelines" target="_blank">Pipeline triggers</a>: Configure webhook triggers for push events, pull requests, and manual branch builds that provide branch context.
