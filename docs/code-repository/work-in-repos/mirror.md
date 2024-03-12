---
title: Mirror
description: Create pipelines to sync branch and tag changes across repos.
sidebar_position: 45
---

Mirroring syncs changes from one repo to another. In Harness, you can create CI pipelines that mirror branch and tag changes.

You can set up one-way or two-way mirroring.

In Harness, mirroring uses webhook triggers to run a pipeline that replicates commits from the source repo in the target repo. The webhook trigger runs whenever changes are pushed to the source repo. You can also run the mirror pipeline manually, rather than using a webhook trigger.

The pipeline created in this guide is provider agnostic and direction agnostic. This means you can use one pipeline for one-way or two-way mirroring across many pairs of repos and providers.

While mirroring is not unique to Harness Code, this guide assumes at least one of the repos is in Harness Code.

## Create the pipeline

Create a [CI pipeline]().

Add a [Build stage]() and set up your desired [build infrastructure](). The pipeline created in this guide uses a Linux platform on Harness Cloud build infrastructure.

Add [pipeline variables]().
(these use runtime input (`<+input>`). Later in this guide, you will create input sets that contain the predetermined values or ingest them from a webhook trigger)

* `reference`: The full reference path that you want to sync from source to target, such as `refs/heads/main` for branches and `refs/tags/v.1.2.3` for tags. There are some cases where you might include `reference` in an input set, such as for major branches like `main/develop/...`.
* `referenceShaOld`: This is the previous value of the `reference` on the source repo. For example, on a branch update, the `referenceShaOld` is the old SHA of the branch before the update. If provided, this value's usage depends on the change on the reference:
   * If the reference was deleted, this SHA is used only to delete the reference on the target repo if it has the exact same value on the target repo.
   * If the reference was updated, this SHA is used to update the reference by either a fast forward or force update if the reference has the same value on the target repo. For example, if a user force pushes changes to the source repo, a fast forward to source isn't possible. Providing the old SHA ensures mirroring only overwrites the target if the reference in the target repo has the same value as the source repo's reference before the force push. If the old SHA isn't provided, only fast forward updates of a reference are possible and force updates fail to sync.
* `syncDelete`: This indicates if deletion of a reference on the source repo should be synced to the target repo. This is valid branch and tag deletions only. Deleting files is considered a reference *update*, which is not impacted by this flag.

## Add the mirror script

Add run step.

This script mirrors changes from one source repo to one target repo.

To use this pipeline to mirror changes from one source to multiple targets, you can [create triggers](#create-triggers) for each source-target combination.





## Get tokens and clone URLs

Mirroring requires some information from the repos you want to sync.

1. Create access tokens for the source and target repos, and then store them as [Harness text secrets](/docs/platform/secrets/add-use-text-secrets). Create one token for each repo involved in mirroring (either as a source, target, or both).

   * Source repo tokens need at least read permission.
   * Target repo tokens need read and write permissions.
   * For two-way (source and target) repos, you can use the same token if it has read and write permissions.

   For Harness Code repos, Harness recommends creating a [Harness service account](/docs/platform/role-based-access-control/add-and-manage-service-account) with `repo_read` and `repo_push` permissions for the repos you are mirroring. Then you can [create a Harness API key and token](/docs/platform/automation/api/add-and-manage-api-keys) for the service account. This ensures that the token isn't tied to a specific user and the token's permission can be as minimal as possible.

   For other SCM providers, refer to the provider's documentation on generating access tokens.

2. Get the `https` clone URLs for the source and target repos.

## Create input sets

The [mirror script](#add-the-mirror-script) in this guide uses variables with [runtime inputs](/docs/platform/variables-and-expressions/runtime-inputs.md) so that you can use the same pipeline for mirroring for multiple pairs of repos. Input sets allow you to predefine some or all of these runtime inputs, which reduces toil and the chance of errors when creating triggers or manually running the pipeline.

**For each pair of mirrored repos, [create an input set](/docs/platform/pipelines/input-sets.md) that defines inputs for `sourceToken`, `targetToken`, `sourceURL`, and `targetURL`.** The values are the [access tokens and clone URLs](#get-tokens-and-clone-urls) for your source and target repos.

If you're configuring two-way syncing, create two input sets. Both input sets should contain the same tokens and clone URLs, but you'll swap them so that each repo can be the source for the other. For example, if you have `repoA` and `repoB`, you need two input sets configured like this:

   * Input set for `repoA` as the source:
      * Use `repoA` values for `sourceToken` and `sourceURL`.
      * Use `repoB` values for `targetToken` and `targetURL`.
   * Input set for `repoB` as the source:
      * Use `repoB` values for `sourceToken` and `sourceURL`.
      * Use `repoA` values for `targetToken` and `targetURL`.

Don't include `reference`, `referenceShaOld`, or `syncDelete` in your input sets. These values are usually defined at runtime and dependent on the particular runtime conditions. When running the pipeline manually, you'll provide these values at runtime. When using a trigger, the values are pulled from the webhook payload.

For variable definitions, go to [create the pipeline](#create-the-pipeline).

## Create triggers

Create [triggers](/docs/platform/triggers/triggers-overview) to automatically run the mirror pipeline when changes are pushed to the source repo.

One-way syncing requires one trigger on the source repo.

Two-way syncing requires two triggers, since both repos can be the source for the other repo.

Create as many triggers as you need for all source-target combinations.

1. In your mirror pipeline, select **Triggers** in the Pipeline Studio header.
2. Select **New Trigger** and select the **Custom** webhook trigger.

   While Harness offers provider-specific webhook triggers, to ensure the pipeline works for any combination of SCM providers, you must use [custom webhook triggers](/docs/platform/triggers/trigger-deployments-using-custom-triggers).

3. Enter a trigger **Name** and select **Continue**. The **Description** and **Tags** are optional.
4. Skip the **Conditions** tab and go to the **Pipeline Input** tab.
5. Select the [input set](#create-input-sets) containing the values for `sourceToken`, `targetToken`, `sourceURL`, and `targetURL` for the repos you'll mirror with this trigger.
6. Set `syncDelete` to either `true` or `false` depending on the desired behavior.

   `syncDelete` indicates if deletion of a branch or tag reference on the source repo should be synced to the target repo.

   This applies to branch and tag deletions only. Deleting files is considered a reference *update*, which is not impacted by this flag.

   Set `syncDelete` to `true` if you want to delete branches/tags in the target repo when they are deleted in the source repo. Otherwise, set `syncDelete` to `false` to block such deletions from being mirrored in the target.

7. Set the `reference` and `referenceShaOld` as follows depending on the *source* repo's SCM provider:

   * Harness Code:
      * `reference`: `<+trigger.payload.ref.name>`
      * `referenceShaOld`: `<+trigger.payload.old_sha>`
   * GitHub:
      * `reference`: `<+trigger.payload.ref>`
      * `referenceShaOld`: `<+trigger.payload.before>`
   * GitLab:
      * `reference`: `<+trigger.payload.ref>`
      * `referenceShaOld`: `<+trigger.payload.before>`
   * Other providers: Refer to provider API documentation or sample payloads to determine the payload values to extract in the trigger. You can also manually run the mirror pipeline and specify one-time fixed value for these inputs at runtime.

   For definitions of these inputs, go to [create the pipeline](#create-the-pipeline).

8. Register the 
these use custom triggers and must be manually registered.


## Test the mirror

verify

## YAML examples

* Generic mirror (any direction)
* One-way from Harness Code to other SCM provider
* One-way from other SCM provider to Harness Code
* Two-way sync