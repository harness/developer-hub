---
title: Harness GitOps pipeline steps
description: Configure Harness pipeline steps for GitOps.
sidebar_position: 10
---

This topic shows you how to configure your Harness GitOps pipeline steps. Few of these steps are specifically meant to be used with [PR pipelines](/docs/continuous-delivery/gitops/pr-pipelines/pr-pipelines-basics.md), but others can be used directly in your GitOps pipeline stages. 

## PR Pipeline Steps

:::tip Important

This topic describes how to use Harness GitOps PR pipeline steps in your [Harness PR pipeline](/docs/continuous-delivery/gitops/pr-pipelines/pr-pipelines.md). Please refer to that topic before venturing into this one.

:::

Harness automatically adds multiple steps to the PR pipelines that you create in Harness. These steps and optional steps are described in this section.

Steps that Harness adds to the PR pipeline:
- Update Release Repo step
- Merge PR step
- Fetch Linked Apps step

Optional steps that you can add to the PR pipeline:
- Revert PR step

:::note

You don't have to edit anything in the **Update Release Repo**, **Merge PR** and **Fetch Linked Apps** steps. The steps are ready for use, but you can apply optional configurations specified below.

:::

### Update Release Repo step

This step fetches JSON or YAML files, updates them with your changes, performs a commit and push, and then creates the PR.

You can also enter variables in this step to update key-value pairs in the config file you are deploying.

In this step, you can do the following:

- Provide a **custom PR title**. If you don't provide a PR title, Harness creates the PR with the title **Harness: Updating config overrides**.

- Specify **hierarchical variables**. If you specify a dot-separated variable in this step, the step creates or updates a nested variable. For example, if you specify the key-value pair of a variable as `a.b:val`, it creates or updates the config file with the following JSON object:
   ```
   {
       "a": {
            "b": "val"
       }
       ...
       // other existing config.json values
   }
   ```

- If a variable name used in this step matches a variable in the Harness service or environment used in this pipeline, the variable entered in this step overrides the service or environment variable.

- If an empty or blank value is provided for a variable, the variable is disregarded, and no updates are made to the JSON or YAML file for that specific variable.

![](static/harness-git-ops-application-set-tutorial-56.png)

### Merge PR step

:::info Limitation

You can create a maximum of two Merge PR steps in a stage.

:::

This step merges a PR.

### Fetch Linked Apps step

The Fetch Linked Apps step provides app information, such as the app name, agent identifier, and URL to the Harness GitOps app.

The following image shows information that is displayed on the **Output** tab of the step:

![picture 1](static/9b9bdbb81176317f5eafdd31e982b081ba449514f56fa5d9222effc03f69bd88.png)

As shown in the image, you can select the **Click to copy** icon in the **Output Name** column to copy the expression that references a key name. You can then use that expression to reference the output value in a subsequent Shell Script step or other step setting.

Harness fetches the ApplicationSet YAML file from its file store and identifies the related Harness GitOps app(s). 

### Revert PR step

This step reverts the commit passed and creates a new PR. Use this step if you want to run any tests or automation on the pipeline and then revert the commit done by the **Update Release Repo** step.

The Revert PR step uses the commitId from the Update Release Repo step as input. The commitId can be an expression, runtime input, or a static value. For example,

```
<+pipeline.stages.deploy.spec.execution.steps.updateReleaseRepo.updateReleaseRepoOutcome.commitId>
```

The Revert PR step creates a new branch and creates a commit to revert the changes made by the commit in the Update Release Repo step.

You can create another Merge PR step to merge the PR created by the Revert PR step. In this scenario, the Merge PR step reaches its maximum limit for a stage.

## Additional Harness GitOps Pipeline Steps

:::info

For the **Update GitOps App** and **GitOps Sync** steps, ensure that the service, environment, and cluster selected in the pipeline matches the service, environment, and cluster, respectively, in the application.

:::

### Update GitOps App step

:::note

Currently, this feature is behind the feature flag `GITOPS_UPDATE_APP_STEP`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

:::

:::note Limitation

You can use the Update GitOps App step only once in a stage.

:::

This step updates a GitOps application through a PR Pipeline. Use this step if you have an existing GitOps application and want to update its target revision (branch or tag) or Helm overrides.

A common Git-based use case bases production deployments on Git tags because tags are immutable. In this use case, to deploy a new version, you can use the Update GitOps App step to update your GitOps application to a new tag.

By using this step, you can also provide Helm overrides (parameters, file parameters, or values files) from the pipeline. Helm parameters and file parameters represent individual value overrides for your Helm application, while values files represent an existing set of overrides already present in the repository.

:::info

Existing Helm parameters and file parameters are merged with the values provided in the PR pipeline. Other parameters remain unchanged. A parameter and a file parameter are not merged with each other.

:::

If a parameter is specified both in the values file and as a parameter or file parameter override, the latter takes precedence.

![](static/harness-git-ops-application-set-tutorial-64.png)

Once your GitOps application is updated, you can use the GitOps Sync step to deploy your changes.

### GitOps Sync step

This step triggers a sync for your existing or updated GitOps application.

After selecting this step, in **Advanced Configuration**, select the application you want to sync and configure the sync options.

![](./static/gitopssync-step.png)

The sync options provided are the same options you receive while syncing an application in GitOps directly.

This completes all the possible configurable steps in Harness PR pipelines. Happy Deploying!
