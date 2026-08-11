---
title: Mirror repositories
sidebar_label: Mirror Repositories
description: Create a CI pipeline that mirrors branch and tag changes between two repositories, in one direction or both.
keywords:
  - mirror
  - sync
  - two-way mirroring
  - webhook trigger
  - input sets
tags:
  - code-repository
  - config-repos
  - pipelines
sidebar_position: 30
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Mirroring syncs changes from one repository to another. In Harness, you build a CI pipeline that mirrors branch and tag changes between a source repository and a target repository. You can set up one-way or two-way mirroring, and the same pipeline works for both.

---

## What you will learn

- **Pipeline setup:** How to build a provider-agnostic mirror pipeline with a Run step and a shell script.
- **Runtime inputs:** How pipeline variables let one pipeline serve many repository pairs.
- **Automation:** How to drive the pipeline with custom webhook triggers.
- **Manual runs:** How input sets reduce toil when you run the pipeline by hand.

---

## Before you begin

- **Harness CI:** Mirroring runs as a CI pipeline, so you need the Continuous Integration module and a build infrastructure. Go to [Which build infrastructure is right for me](/docs/continuous-integration/use-ci/set-up-build-infrastructure/which-build-infrastructure-is-right-for-me) to choose one.
- **Pipeline permissions:** You need **Create/Edit** and **Execute** on [Pipelines](/docs/platform/role-based-access-control/permissions-reference#pipelines). Go to [RBAC in Harness](/docs/platform/role-based-access-control/rbac-in-harness) to configure roles.
- **Repository access tokens:** You need a token for each repository involved. Source tokens need read access; target tokens need read and write access.
- **Webhook access on the source repository:** Automating the mirror requires permission to register a webhook on the source repository.

:::info

Mirroring described on this page is bidirectional-capable and pushes commits to the target repository. This differs from the read-only mirror described in [Get started](/docs/code-repository/get-started/onboarding-guide#step-1-set-up-repositories).

<!-- TODO(SME): The onboarding guide describes mirroring as creating "read-only mirrors" that keep source code in its original location, while this page describes a pipeline that pushes to the target and supports two-way sync. Confirm whether these are two different features or one feature described inconsistently, then align both pages. -->

:::

---

## Configure mirroring in Harness

Mirroring uses a mirror script in a CI pipeline. The script replicates commits from the source repository on the target repository.

To automate mirroring, a webhook trigger runs the pipeline whenever a change is pushed to the source repository. You can also run the mirror pipeline manually instead of using a trigger.

### Create the pipeline

The pipeline in this guide is provider agnostic and direction agnostic, so you can use one pipeline for one-way or two-way mirroring across many pairs of repositories and providers.

1. Create a [CI pipeline](/docs/continuous-integration/use-ci/prep-ci-pipeline-components).
2. Add a [Build stage](/docs/continuous-integration/use-ci/set-up-build-infrastructure/ci-stage-settings) and [disable Clone Codebase](/docs/continuous-integration/use-ci/codebase-configuration/create-and-configure-a-codebase/#disable-clone-codebase-for-specific-stages).
3. Set up your build infrastructure, such as [Harness Cloud](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure).

### Add variables

Add the pipeline variables that the mirror script requires.

These variables use [runtime input](/docs/platform/variables-and-expressions/runtime-inputs) (`<+input>`), so you can use the same pipeline for many pairs of mirrored repositories without editing the pipeline. Later, you create triggers that populate these values at runtime.

<Tabs>
<TabItem value="visual" label="Visual Editor" default>

To add pipeline variables in the Pipeline Studio visual editor, do the following:

1. Edit your pipeline, then select **Variables** on the right side of the Pipeline Studio.
2. Under the **Pipeline** section, select **Add Variable**.
3. Configure the variable settings as defined in the following table, then select **Save**. The **Value** must be exactly as given.

| Type | Name | Value | Required during runtime | Description |
| ---- | ---- | ----- | ----------------------- | ----------- |
| Secret | `sourceToken` | `<+input>` | True | Access token for the source repository. |
| String | `sourceURL` | `<+input>` | True | The `https` format clone URL for the source repository. |
| Secret | `targetToken` | `<+input>` | True | Access token for the target repository. |
| String | `targetURL` | `<+input>` | True | The `https` format clone URL for the target repository. |
| String | `reference` | `<+input>` | True | The full reference path to sync from source to target, such as `refs/heads/main` for branches and `refs/tags/v.1.2.3` for tags. |
| String | `referenceShaOld` | `<+input>` | False | The previous value of `reference` on the source repository. Go to [How referenceShaOld affects syncing](#how-referenceshaold-affects-syncing) to understand its behavior. |
| String | `syncDelete` | `<+input>.default(false).allowedValues(true,false)` | False | Whether deletion of a branch or tag on the source repository syncs to the target. Go to [How syncDelete affects deletions](#how-syncdelete-affects-deletions) for the full behavior. |

</TabItem>
<TabItem value="yaml" label="YAML Editor">

In the YAML editor, add the following variables to the end of the pipeline YAML:

```yaml
  variables:
    - name: sourceToken
      type: Secret
      description: "Access token for the source repo."
      required: true
      value: <+input>
    - name: sourceURL
      type: String
      description: "The https-format clone URL for the source repo."
      required: true
      value: <+input>
    - name: targetToken
      type: Secret
      description: "Access token for the target repo."
      required: true
      value: <+input>
    - name: targetURL
      type: String
      description: "The https-format clone URL for the target repo."
      required: true
      value: <+input>
    - name: reference
      type: String
      description: "The full reference path to sync from source to target, such as 'refs/heads/main' for branches and 'refs/tags/v.1.2.3' for tags."
      required: true
      value: <+input>
    - name: referenceShaOld
      type: String
      description: "The previous value of the 'reference' on the source repo. See the Harness documentation for how this value affects fast-forward and force updates."
      required: false
      value: <+input>
    - name: syncDelete
      type: String
      description: "Indicates whether deletion of a branch or tag reference on the source repo should be synced to the target repo. Default is false. This applies to branch and tag deletions only."
      required: false
      value: <+input>.default(false).allowedValues(true,false)
```

</TabItem>
</Tabs>

#### How referenceShaOld affects syncing

`referenceShaOld` is the value of the reference on the source repository before the change. Its effect depends on what happened to the reference:

- **On deletion:** When you provide the old SHA, Harness deletes the reference on the target repository only if it currently holds that same value. When you do not provide the old SHA, Harness deletes the reference on the target without any further check.
- **On update:** Harness uses the old SHA to update the reference by fast forward, or by force update when the reference holds the same value on the target. For example, after a force push to the source repository, a fast forward is no longer possible. Providing the old SHA ensures mirroring overwrites the target only if the target reference still matches the source reference from before the force push. When you do not provide the old SHA, only fast forward updates succeed and force updates fail to sync.

#### How syncDelete affects deletions

`syncDelete` controls whether deleting a branch or tag on the source repository also deletes it on the target repository:

- **`true`:** Harness deletes the branch or tag on the target when it is deleted on the source.
- **`false`:** Harness blocks the deletion from mirroring to the target. This is the default.

This flag applies to branch and tag deletions only. Deleting a file counts as a reference update, which this flag does not affect.

### Add the mirror script

This script mirrors changes from one source repository to one target repository. It reads the pipeline variables above, so the same pipeline serves multiple repository pairs.

1. In the Build stage, add a [Run step](/docs/continuous-integration/use-ci/run-step-settings).
2. Depending on your build infrastructure, you might need to select an [image](/docs/continuous-integration/use-ci/run-step-settings/#container-registry-and-image) that has Git installed and supports a basic shell. If your build infrastructure already provides these tools, you do not need to specify an image.
3. In **Command**, enter the following shell script, then save the step and the pipeline.

<!-- TODO(SME): This script uses `return` for its exit paths rather than `exit`. Outside a function or a sourced script, `return` is invalid in POSIX sh and bash, so the step may not report the intended status. Confirm how Harness executes the Run step command block and whether `return` should be `exit`. Do not change this without confirming, because the numeric codes appear to signal distinct failure modes. -->

```shell
SOURCE_TOKEN=<+pipeline.variables.sourceToken>
SOURCE_URL=<+pipeline.variables.sourceURL>
TARGET_TOKEN=<+pipeline.variables.targetToken>
TARGET_URL=<+pipeline.variables.targetURL>
REFERENCE=<+pipeline.variables.reference>
REFERENCE_SHA_OLD=<+pipeline.variables.referenceShaOld>
SYNC_DELETE=<+pipeline.variables.syncDelete>

# generate clone urls with creds
SOURCE_URL_WITH_AUTH=$(echo "$SOURCE_URL" | sed -e "s^//^//git:$SOURCE_TOKEN@^")
TARGET_URL_WITH_AUTH=$(echo "$TARGET_URL" | sed -e "s^//^//git:$TARGET_TOKEN@^")

echo "setup repo with source '$SOURCE_URL' and target '$TARGET_URL'"
git init --bare repo
cd repo
git remote add source $SOURCE_URL_WITH_AUTH
git remote add target $TARGET_URL_WITH_AUTH

echo "checking reference '$REFERENCE' existence on source"
set +e
git ls-remote --exit-code source $REFERENCE
STATUS=$?
set -e

# Handle reference deletion
if [ $STATUS -eq 2 ]; then
  if [ -z "$SYNC_DELETE" ] || [ "$SYNC_DELETE" != "true" ]; then
    echo "skip sync of deleted reference"
    return 0
  fi

  if [ -z "$REFERENCE_SHA_OLD" ]  || [ "$REFERENCE_SHA_OLD" = "null" ]; then
    echo "delete reference '$REFERENCE' from target"
    git push target ":$REFERENCE"
  else
    echo "delete reference '$REFERENCE' from target if on sha '$REFERENCE_SHA_OLD'"
    git push target ":$REFERENCE" --force-with-lease="$REFERENCE:$REFERENCE_SHA_OLD"
  fi

  echo "sync successful"
  return 0
elif [ $STATUS -ne 0 ]; then
  echo "failed to check reference existence"
  return 1
fi

# handle reference update / creation
echo "pulling reference '$REFERENCE' from source"
git fetch source "$REFERENCE:refs/sync/source"
SOURCE_SHA=$(git rev-parse "refs/sync/source^{commit}")
echo "source is on sha '$SOURCE_SHA'"

echo "pushing reference '$REFERENCE' on commit '$SOURCE_SHA' to target"
set +e
git push target "refs/sync/source:$REFERENCE"

# did the push succeed? return success
if [ $? -eq 0 ]; then
  echo "sync successful"
  return 0
fi

# no old sha left? return failure
if [ -z "$REFERENCE_SHA_OLD" ]  || [ "$REFERENCE_SHA_OLD" = "null" ]; then
  echo "sync failed - changes cannot be fast forwarded"
  return 2
fi

# otherwise, retry safe force-push to mimic changes on source (handles force push on source)
echo "fast forward sync failed - retry using the old sha '$REFERENCE_SHA_OLD' as assumed sha of reference on target repo"
git push target "refs/sync/source:$REFERENCE" --force-with-lease="$REFERENCE:$REFERENCE_SHA_OLD"

# did the push fail? return failure
if [ $? -ne 0 ]; then
  echo "sync failed - source and target are out of sync"
  echo "Manual intervention needed"
  return 3
fi

echo "sync successful"
```

The script signals the following outcomes:

| Code | Meaning |
| --- | --- |
| `0` | Sync succeeded, or a deletion was skipped because `syncDelete` is `false`. |
| `1` | Harness could not determine whether the reference exists on the source. |
| `2` | The change cannot be fast forwarded and no old SHA was supplied. |
| `3` | The safe force push failed. Source and target are out of sync and need manual intervention. |

### Get tokens and clone URLs

Mirroring requires credentials and URLs from the repositories you want to sync.

1. Create access tokens for the source and target repositories, then store them as [Harness text secrets](/docs/platform/secrets/add-use-text-secrets). Create one token for each repository involved in mirroring, whether it acts as a source, a target, or both.

    - Source repository tokens need at least read permission.
    - Target repository tokens need read and write permissions.
    - For two-way mirroring, you can use one token per repository if it has read and write permissions.

    For Harness Code repositories, create a [Harness service account](/docs/platform/role-based-access-control/add-and-manage-service-account) with `repo_read` and `repo_push` permissions for the repositories you are mirroring, then [create a Harness API key and token](/docs/platform/automation/api/add-and-manage-api-keys) for that service account. A service account token is not tied to a specific user and can carry the minimum permissions required.

    For other providers, go to the provider's documentation to generate access tokens.

2. Get the `https` clone URLs for the source and target repositories.

### Create triggers

Create [triggers](/docs/platform/triggers/triggers-overview) to populate the [pipeline variables](#add-variables) and run the mirror pipeline automatically when changes are pushed to the source repository.

One-way syncing requires one trigger on the source repository. Two-way syncing requires two triggers, because each repository acts as the source for the other. Create as many triggers as you need for all source and target combinations.

To create a trigger, do the following:

1. In your mirror pipeline, select **Triggers** in the Pipeline Studio header.
2. Select **New Trigger**, then select the **Custom** webhook trigger.

    Harness offers provider-specific webhook triggers, but you must use [custom webhook triggers](/docs/platform/triggers/trigger-deployments-using-custom-triggers) so the pipeline works for any combination of providers.

3. Enter a trigger **Name**, then select **Continue**. **Description** and **Tags** are optional.
4. Skip the **Conditions** tab and go to the **Pipeline Input** tab.
5. Enter the [access tokens and clone URLs](#get-tokens-and-clone-urls) for your source and target repositories in `sourceToken`, `targetToken`, `sourceURL`, and `targetURL`.
6. Set `reference` and `referenceShaOld` according to the *source* repository's provider:

    | Provider | `reference` | `referenceShaOld` |
    | --- | --- | --- |
    | Harness Code | `<+trigger.payload.ref.name>` | `<+trigger.payload.old_sha>` |
    | GitHub | `<+trigger.payload.ref>` | `<+trigger.payload.before>` |
    | GitLab | `<+trigger.payload.ref>` | `<+trigger.payload.before>` |

    For other providers, go to the provider's API documentation or sample payloads to determine which payload values to extract. You can also run the mirror pipeline manually and supply fixed values at runtime.

7. Set `syncDelete` to `true` or `false`. Go to [How syncDelete affects deletions](#how-syncdelete-affects-deletions) to choose.
8. Save the trigger.
9. Register the trigger's webhook on the source repository:

    1. In Harness, obtain the trigger's webhook URL by selecting the **Webhook/Link** icon in the list of triggers.
    2. In your provider, go to the source repository's webhook settings and add a webhook.
    3. Paste the webhook URL from Harness into the webhook payload URL.
    4. Set the content type to JSON.
    5. Select the event types required to sync all branch and tag changes:

        | Provider | Events |
        | --- | --- |
        | Harness Code | Branch created, branch updated, branch deleted, tag created, tag updated, tag deleted |
        | GitHub | Push |
        | GitLab | Push events, tag events |

        For other providers, go to the provider's documentation to identify the equivalent events.

    Go to [Webhook triggers reference](/docs/platform/triggers/triggers-reference) to review manual webhook registration.

### Test the mirror

To confirm that mirroring works, create a branch on the source repository. Branch creation activates the trigger and runs the mirror pipeline.

In Harness, [view the build](/docs/continuous-integration/use-ci/viewing-builds) to monitor progress and inspect pipeline inputs and outputs. If the run succeeds, confirm that the new branch exists on the target repository.

---

## Race conditions in two-way mirrors

With bidirectional sync, both repositories can update the same reference before either change syncs. In that case the mirror script does not overwrite changes on the target repository. The sync fails instead, and stays failed until you resolve the conflict.

When sync fails because of a race condition, inspect the two repositories and mitigate manually. For example, resolve the reference conflict and bring both repositories to the same SHA. Automatic syncing through triggers resumes once they match.

---

## Use input sets for manual mirroring

Harness recommends [triggers](#create-triggers) to run the mirror pipeline automatically. You might still run it manually when:

- You prefer to handle mirroring manually for some or all repositories.
- You do not want mirroring to run on every commit to the source repository.
- An error or conflict is blocking automatic mirroring.

Use [input sets](/docs/platform/pipelines/input-sets) for manual runs. Because the [mirror script](#add-the-mirror-script) reads [runtime input variables](#add-variables), an input set predefines some or all of those inputs, which reduces toil and the chance of error.

Create one input set for each pair of mirrored repositories:

1. In the Pipeline Studio header, select **Input Sets**.
2. Select **New Input Set**.
3. Enter a **Name**, such as `Mirror SOURCE_REPO_NAME to TARGET_REPO_NAME`. **Description** and **Tags** are optional.
4. Enter the [access tokens and clone URLs](#get-tokens-and-clone-urls) for the source and target repositories in `sourceToken`, `targetToken`, `sourceURL`, and `targetURL`.
5. Leave `reference`, `referenceShaOld`, and `syncDelete` empty, because these values usually depend on runtime conditions.

    When you run the pipeline manually, select an input set to populate the tokens and clone URLs, then supply the remaining values at runtime.

    Occasionally you might want a fixed `reference`, such as for a long-lived branch like `main`. In that case, include a value for `reference` in the input set.

6. Save the input set.

Continue until you have an input set for each source and target combination.

:::info Two-way syncing

For two-way syncing, create two input sets. Both contain the same tokens and clone URLs, swapped so that each repository can act as the source for the other. For example, with `repoA` and `repoB`:

- Input set for `repoA` as the source, mirroring `repoA` to `repoB`:
    - Use `repoA` values for `sourceToken` and `sourceURL`.
    - Use `repoB` values for `targetToken` and `targetURL`.
- Input set for `repoB` as the source, mirroring `repoB` to `repoA`:
    - Use `repoB` values for `sourceToken` and `sourceURL`.
    - Use `repoA` values for `targetToken` and `targetURL`.

:::

---

## Troubleshooting

<Troubleshoot
  issue="The Harness mirror pipeline fails with sync failed - source and target are out of sync"
  mode="docs"
  fallback="The safe force push was rejected because the target reference no longer matches the supplied old SHA. Inspect both repositories, resolve the reference conflict manually, and bring both to the same SHA before rerunning."
/>

<Troubleshoot
  issue="The Harness mirror pipeline reports changes cannot be fast forwarded"
  mode="docs"
  fallback="No referenceShaOld was supplied, so only fast forward updates are possible. Map the provider payload field for the previous SHA into the referenceShaOld trigger input."
/>

<Troubleshoot
  issue="A branch deleted on the source repository is not deleted on the mirror target repository"
  mode="docs"
  fallback="syncDelete defaults to false, which blocks deletions from mirroring. Set syncDelete to true on the trigger to propagate branch and tag deletions."
/>

<Troubleshoot
  issue="The Harness mirror webhook trigger does not run the pipeline when the source repository is pushed"
  mode="general"
  fallback="Confirm the webhook is registered on the source repository with content type JSON, that the selected events cover branch and tag changes, and that the trigger is a Custom webhook trigger rather than a provider-specific one."
/>

---

## Next steps

You have a mirror pipeline that syncs branch and tag changes, triggers that run it automatically, and input sets for manual runs.

- [Import repos](/docs/code-repository/config-repos/import-repo): Migrate a repository once rather than syncing it continuously.
- [Rules](/docs/code-repository/config-repos/rules): Protect the target repository from direct changes that would conflict with the mirror.
- [Triggers](/docs/platform/triggers/triggers-overview): Review trigger types and payload expressions.
