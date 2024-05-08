---
title: Mirror repositories
description: Create pipelines to sync branch and tag changes across repos.
sidebar_position: 30
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Mirroring syncs changes from one repo to another. In Harness, you can create CI pipelines that mirror branch and tag changes from one repo to another.

You can set up one-way or two-way mirroring.

## Configure mirroring in Harness

In Harness, mirroring uses a mirror script in a CI pipeline. This script replicates commits from the source repo on the target repo.

To automate mirroring, a webhook trigger runs the pipeline whenever a change is pushed to the source repo. You can also run the mirror pipeline manually, rather than using a webhook trigger.

### Create the pipeline

The pipeline created in this guide is provider agnostic and direction agnostic. This means you can use one pipeline for one-way or two-way mirroring across many pairs of repos and providers.

1. Create a [CI pipeline](/docs/continuous-integration/use-ci/prep-ci-pipeline-components).
2. Add a [Build stage](/docs/continuous-integration/use-ci/set-up-build-infrastructure/ci-stage-settings) and **[disable Clone Codebase](/docs/continuous-integration/use-ci/codebase-configuration/create-and-configure-a-codebase/#disable-clone-codebase-for-specific-stages)**.
3. Set up your desired [build infrastructure](/docs/continuous-integration/use-ci/set-up-build-infrastructure/which-build-infrastructure-is-right-for-me.md), such as [Harness Cloud](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure.md).

### Add variables

Add pipeline variables required by the mirror script.

These variables use [runtime input](/docs/platform/variables-and-expressions/runtime-inputs.md) (`<+input>`), which allows you to use this same pipeline for many pairs of mirrored repos without editing the pipeline itself. Later, you'll create triggers to populate these values at runtime.

<Tabs>
<TabItem value="Visual" label="Visual editor">

To add pipeline variables in the Pipeline Studio's Visual editor:

1. Edit your pipeline and select **Variables** on the right side of the pipeline studio.
2. Under the **Pipeline** section, select **Add Variable**.
3. Configure the variable settings as defined below, and then select **Save**.

   Make sure the **Value** is exactly as given in the table.

| Type | Name | Value | Required during runtime | Description |
| ---- | ---- | ----- | ----------------------- | ----------- |
| Secret | `sourceToken` | `<+input>` | True | Access token for the source repo. |
| String | `sourceURL` | `<+input>` | True | The `https`-format clone URL for the source repo. |
| Secret | `targetToken` | `<+input>`  | True | Access token for the target repo. |
| String | `targetURL` | `<+input>` | True | The `https`-format clone URL for the target repo. |
| String | `reference` | `<+input>` | True | The full reference path to sync from source to target, such as `refs/heads/main` for branches and `refs/tags/v.1.2.3` for tags. |
| String | `referenceShaOld` | `<+input>` | False | The previous value of the `reference` on the source repo. For example, on a branch update, the `referenceShaOld` is the old SHA of the branch before the update. If provided, this value's usage depends on the change on the reference:<br/>If the reference was deleted and the old SHA is provided, the reference is deleted on the target repo only if has the same value on the target repo. If the old SHA isn't provided, the reference is deleted on the target repo without any further checks.<br/>If the reference was updated, the old SHA is used to update the reference by either fast forward or force update if the reference has the same value on the target repo. For example, after force pushing changes to the source repo, fast forward to source isn't possible. Providing the old SHA ensures mirroring overwrites the target only if the reference in the target repo has the same value as the source repo's reference before the force push. If the old SHA isn't provided, only fast forward updates of a reference are possible and force updates fail to sync. |
| String | `syncDelete` | `<+input>.default(false).allowedValues(true,false)`  | False | Indicates if deletion of a branch or tag reference on the source repo should be synced to the target repo. Set to `true` to delete branches/tags on the target repo when they are deleted on the source repo. Set to `false` to block such deletions from being mirrored on the target. Default is `false`. This applies to branch and tag deletions only. Deleting files is considered a reference update, which is not impacted by this flag. |

</TabItem>
<TabItem value="YAML" label="YAML editor" default>

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
      description: |-
        The previous value of the 'reference' on the source repo. For example, on a branch update, the 'referenceShaOld' is the old SHA of the branch before the update. If provided, this value's usage depends on the change on the reference:

        If the reference was deleted and the old SHA is provided, the reference is deleted on the target repo only if has the same value on the target repo. If the old SHA isn't provided, the reference is deleted on the target repo without any further checks.

        If the reference was updated, the old SHA is used to update the reference by either fast forward or force update if the reference has the same value on the target repo. For example, after force pushing changes to the source repo, fast forward to source isn't possible. Providing the old SHA ensures mirroring overwrites the target only if the reference in the target repo has the same value as the source repo's reference before the force push. If the old SHA isn't provided, only fast forward updates of a reference are possible and force updates fail to sync.
      required: false
      value: <+input>
    - name: syncDelete
      type: String
      description: "Indicates if deletion of a branch or tag reference on the source repo should be synced to the target repo. Set to true to delete branches/tags in the target repo when they are deleted in the source repo. Set to false to block such deletions from being mirrored in the target. Default is false. This applies to branch and tag deletions only. Deleting files is considered a reference update, which is not impacted by this flag. "
      required: false
      value: <+input>.default(false).allowedValues(true,false)
```

</TabItem>
</Tabs>

### Add the mirror script

This script mirrors changes from one source repo to one target repo. The script uses variables with [runtime inputs](/docs/platform/variables-and-expressions/runtime-inputs.md) so that you can use the same pipeline for mirroring for multiple pairs of repos. Later, you'll create triggers that populate the variables in the script with the values for specific source and target repos.

1. In the Build stage, add a [Run step](/docs/continuous-integration/use-ci/run-step-settings)
2. Depending on your build infrastructure, you might need to select an [image](/docs/continuous-integration/use-ci/run-step-settings/#container-registry-and-image) that has Git installed and supports basic shell. If your build infrastructure already has these tools available, you don't need to specify an image.
3. In **Command**, enter the following shell script, and then save the step and the pipeline.

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

# we don't have any old sha left? return failure
if [ -z "$REFERENCE_SHA_OLD" ]  || [ "$REFERENCE_SHA_OLD" = "null" ]; then
  echo "sync failed - changes can't be fast forwarded"
  return 2
fi

# otherwise, retry save force-push to mimik changes on source (handles force push on source)
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

### Get tokens and clone URLs

Mirroring requires some information from the repos you want to sync.

1. Create access tokens for the source and target repos, and then store them as [Harness text secrets](/docs/platform/secrets/add-use-text-secrets). Create one token for each repo involved in mirroring (either as a source, target, or both).

   * Source repo tokens need at least read permission.
   * Target repo tokens need read and write permissions.
   * For two-way (source and target) repos, you can use the same token if it has read and write permissions.

   For Harness Code repos, Harness recommends creating a [Harness service account](/docs/platform/role-based-access-control/add-and-manage-service-account) with `repo_read` and `repo_push` permissions for the repos you are mirroring. Then you can [create a Harness API key and token](/docs/platform/automation/api/add-and-manage-api-keys) for the service account. This ensures that the token isn't tied to a specific user and the token's permission can be as minimal as possible.

   For other SCM providers, refer to the provider's documentation on generating access tokens.

2. Get the `https` clone URLs for the source and target repos.

### Create triggers

Create [triggers](/docs/platform/triggers/triggers-overview) to populate the [pipeline variables](#add-variables) and automatically run the mirror pipeline when changes are pushed to the source repo.

One-way syncing requires one trigger on the source repo.

Two-way syncing requires two triggers, since both repos can be the source for the other repo.

Create as many triggers as you need for all source-target combinations.

1. In your mirror pipeline, select **Triggers** in the Pipeline Studio header.
2. Select **New Trigger** and select the **Custom** webhook trigger.

   While Harness offers provider-specific webhook triggers, to ensure the pipeline works for any combination of SCM providers, you must use [custom webhook triggers](/docs/platform/triggers/trigger-deployments-using-custom-triggers).

3. Enter a trigger **Name** and select **Continue**. The **Description** and **Tags** are optional.
4. Skip the **Conditions** tab and go to the **Pipeline Input** tab.
5. Enter the [access tokens and clone URLs](#get-tokens-and-clone-urls) for your source and target repos in `sourceToken`, `targetToken`, `sourceURL`, and `targetURL`.
6. Set the `reference` and `referenceShaOld` as follows depending on the *source* repo's SCM provider:

   * Harness Code:
      * `reference`: `<+trigger.payload.ref.name>`
      * `referenceShaOld`: `<+trigger.payload.old_sha>`
   * GitHub:
      * `reference`: `<+trigger.payload.ref>`
      * `referenceShaOld`: `<+trigger.payload.before>`
   * GitLab:
      * `reference`: `<+trigger.payload.ref>`
      * `referenceShaOld`: `<+trigger.payload.before>`
   * Other providers: Refer to the provider's API documentation or sample payloads to determine the payload values to extract in the trigger. You can also manually run the mirror pipeline and specify one-time fixed value for these inputs at runtime.

7. Set `syncDelete` to either `true` or `false` depending on the desired behavior.

   `syncDelete` indicates if deletion of a branch or tag reference on the source repo should be synced to the target repo.

   This applies to branch and tag deletions only. Deleting files is considered a reference *update*, which is not impacted by this flag.

   Set `syncDelete` to `true` if you want to delete branches/tags on the target repo when they are deleted on the source repo. Otherwise, set `syncDelete` to `false` to block such deletions from being mirrored on the target.

8. Save the trigger.
9. Register the trigger's webhook on the source repo.

   1. In Harness, obtain the trigger's webhook URL by selecting the **Webhook/Link** icon in the list of triggers.
   2. In your SCM provider, go to the source repo's webhook setting and add a webhook.
   3. Paste the webhook URL from Harness in the webhook's payload URL.
   4. Set the content type to JSON.
   5. Select the required event types to ensure all branch/tag events and changes are synced.

      * Harness Code: Branch created, branch updated, branch deleted, tag created, tag updated, tag deleted
      * GitHub: Push
      * GitLab: Push events, tag events
      * Other providers: Refer to the provider's documentation for webhook events.

   For more information about manual webhook registration, go to [Webhook triggers reference](/docs/platform/triggers/triggers-reference).

### Test the mirror

To test the trigger and verify that mirroring works, create a branch on the source repo.

Branch creation should activate the trigger and run the mirror pipeline.

In Harness, you can [view the build](/docs/continuous-integration/use-ci/viewing-builds) to monitor the pipeline's progress and inspect pipeline inputs and outputs.

If the run is successful, you can check that the new branch is present on the target repo.

## Race conditions can occur in two-way mirrors

With bidirectional sync there is a chance of race conditions where both repos update the same reference before one could get synced.

In this scenario, the mirror script in this pipeline doesn't overwrite any changes on the target repo. Instead, the sync fails until the conflict is resolved.

If sync fails due to race conditions in two-way mirroring, you must manually inspect and mitigate the issue. For example, you might need to fix the reference conflict between the two repos and manually get both repos on the same SHA. After that, the mirror script (and automatic syncing through triggers) should work again.

## Use input sets for manual mirroring

Harness recommends that you [use triggers to automatically run the mirror pipeline](#create-triggers). However, there are situations where you might manually run the mirror pipeline, for example:

* You prefer to manually handle mirroring for some or all repos.
* You don't want mirroring to happen on every commit to the source repo.
* There is an error or conflict blocking automatic mirroring.

**Harness recommends using input sets to facilitate manual mirroring.** This is because the [mirror script](#add-the-mirror-script) uses [variables with runtime inputs](#add-variables) so that you can use the same pipeline for mirroring for multiple pairs of repos. [Input sets](/docs/platform/pipelines/input-sets.md) allow you to predefine some or all of these runtime inputs, which reduces toil and the chance of errors when manually running the pipeline.

Create an input set for each pair of mirrored repos.

1. In the Pipeline Studio header, select **Input Sets**.
2. Select **New Input Set**.
3. Enter a **Name** for the input set, such as `Mirror SOURCE_REPO_NAME to TARGET_REPO_NAME`. **Description** and **Tags** are optional.
4. Enter the [access tokens and clone URLs](#get-tokens-and-clone-urls) for the source and target repos in `sourceToken`, `targetToken`, `sourceURL`, and `targetURL`.
5. Don't include values for `reference`, `referenceShaOld`, or `syncDelete` in your input sets, because these values usually depend on the particular runtime conditions.

   When running the pipeline manually, you'll select an input set to populate the tokens and clone URLS, and then input the remaining values directly at runtime.

   Rarely, there might be occasions where you want to provide a fixed value for `reference`, such as for major branches like `main/develop/...`. In this case you can include a value for `reference` in the input set.

6. Save the input set.

Continue creating input sets until you have created an input set for each source-target combination.

:::info two-way syncing

For two-way syncing, you need to create two input sets. Both input sets should contain the same tokens and clone URLs, but you'll swap them so that each repo can be the source for the other. For example, if you have `repoA` and `repoB`, you need two input sets configured like this:

   * Input set for `repoA` as the source (mirror `repoA` to `repoB`):
      * Use `repoA` values for `sourceToken` and `sourceURL`.
      * Use `repoB` values for `targetToken` and `targetURL`.
   * Input set for `repoB` as the source (mirror `repoB` to `repoA`):
      * Use `repoB` values for `sourceToken` and `sourceURL`.
      * Use `repoA` values for `targetToken` and `targetURL`.

:::
