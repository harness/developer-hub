---
title: Git Clone step settings
description: The Git Clone step clones a repo to the pipeline workspace.
sidebar_position: 70
helpdocs_topic_id: nl3ixvew4o
helpdocs_category_id: 4xo13zdnfx
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic provides settings for the Git Clone step, which clones a repo to the pipeline workspace. This step is useful when you want to include multiple repositories in your build. For example, suppose you maintain your code files in one repo and your build files (such as Dockerfiles) in a separate repo. In this case, you can set up your pipeline's **Build** stage to [clone your code files](../use-ci/codebase-configuration/create-and-configure-a-codebase.md) and then add a Git Clone step to clone your build files into your pipeline workspace.

:::info

Depending on the stage's build infrastructure, some settings may be unavailable. Not all settings are available for all build infrastructure options.

:::

## Name

The unique name for this step. Harness automatically assigns an **Id** ([Entity Identifier Reference](../../platform/20_References/entity-identifier-reference.md)) based on the **Name**. You can change the **Id**.

## Connector

The connector to the source control provider for the code repo you want the step to clone. For more information, go to [Code repo connectors](https://developer.harness.io/docs/category/code-repo-connectors).

## Repository Name

The name of the code repo you want to clone into the pipeline workspace, if this is not already designated in the connector's configuration.

This setting is required if the connector uses a Git account URL, such as `https://github.com/my-account/`, rather than to a URL for a specific repo within that account.

## Build Type

Select **Git Branch** if you want the step to clone code from a specific branch with in the repo. Select **Git Tag** if you want the step to clone code from a specific commit tag. Based on your selection, specify a **Branch Name** or **Tag Name**. You can use fixed values, runtime input, and variable expressions for the branch and tag names.

This setting applies only to the repo specified in this **Git Clone** step. It is separate from the `codebase` object for the pipeline's **Build** stage. If you want this **Git Clone** step's repo to use the same branch or commit as the primary codebase, specify either `<+codebase.branch>` or `<+codebase.tag>` for **Branch Name** or **Tag Name**. Make sure to set the input type to **Expression**. These expressions pull runtime input from the pipeline; for example, if the pipeline's primary codebase uses the `development` branch, then the **Git Clone** step clones the `development` branch from its repo. For more information, go to [Built-in CI codebase variables reference](built-in-cie-codebase-variables-reference.md).

## Clone Directory

The target path in the pipeline workspace where you want to clone the repo.

You can't specify `/harness/` as a target for a **Git Clone** step because this folder is reserved for the repo defined in the **Build** stage's `codebase` object. However, you can set up your **Build** stage to use a custom workspace volume and share data across steps in your **Build** stage. For more information, go to the **Workspace** section in [CI Build stage settings](ci-stage-settings.md).

## Additional Configuration

Use the following settings to add additional configuration to the step.

### Depth

The number of commits to fetch when the step clones the repo.

For manually-triggered builds, the default depth is `50`. This means each `git clone` operation fetches the 50 most recent commits. For all other trigger types, the default depth is `0`, which fetches all commits from the relevant branch.

For more information, go to [https://git-scm.com/docs/git-clone](https://git-scm.com/docs/git-clone).

### SSL Verify

If **True**, which is the default value, the pipeline verifies your Git SSL certificates. The build fails if the certificate check fails. Set this to **False** only if you have a known issue with the certificate and you are willing to run your builds anyway.

If you want to use self-signed certificates in your build infrastructure, go to [Configure a Kubernetes Build Farm to use Self-Signed Certificates](../use-ci/set-up-build-infrastructure/configure-a-kubernetes-build-farm-to-use-self-signed-certificates.md)

### Run as User

Specify the user ID to use to run all processes in the pod if running in containers. For more information, go to [Set the security context for a pod](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/#set-the-security-context-for-a-pod).

### Set Container Resources

Set maximum resource limits for the resources used by the container at runtime:

* **Limit Memory:** The maximum memory that the container can use. You can express memory as a plain integer or as a fixed-point number using the suffixes `G` or `M`. You can also use the power-of-two equivalents `Gi` and `Mi`.
* * **Limit CPU:** The maximum number of cores that the container can use. CPU limits are measured in CPU units. Fractional requests are allowed; for example, you can specify one hundred millicpu as `0.1` or `100m`. For more information, go to [Resource units in Kubernetes](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#resource-units-in-kubernetes).

### Timeout

Set the timeout limit for the step. Once the timeout limit is reached, the step fails and pipeline execution continues. To set skip conditions or failure handling for steps, go to:

* [Step Skip Condition settings](../../platform/8_Pipelines/w_pipeline-steps-reference/step-skip-condition-settings.md)
* [Step Failure Strategy settings](../../platform/8_Pipelines/w_pipeline-steps-reference/step-failure-strategy-settings.md)

## See also

* [Create and Configure a Codebase](../use-ci/codebase-configuration/create-and-configure-a-codebase.md)
* [Clone and Process Multiple Codebases in the Same Pipeline](../use-ci/run-ci-scripts/clone-and-process-multiple-codebases-in-the-same-pipeline.md)
