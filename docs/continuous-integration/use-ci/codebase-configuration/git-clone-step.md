---
title: Git Clone step in CI
description: Clone a repository into the CI stage's workspace.
sidebar_position: 10
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This topic describes how to use the **Git Clone** step included in Harness Continuous Integration (CI) pipelines. The **Git Clone** step clones a repository into the CI stage's workspace. In addition to the pipeline's default [clone codebase](./create-and-configure-a-codebase.md), you can use **Git Clone**, **Run**, and **Plugin** steps to clone additional code repos into the pipeline's workspace.

For example, assume the default codebase is a repo that contains app code files, and the Dockerfile necessary to build the app image is in a different repo. You can use a **Git Clone** or **Run** step to clone the second repo into the workspace. Then, you can use a **Build and Push** step to build and push an image using files from both repos.

:::note

We've recently enhanced the Git clone operations within Harness, in both the Git Clone step and the native Clone Codebase functionality. Support was added for : 


- Git LFS - Allows users to clone repositories with large file storage (LFS) efficiently.
- Fetch Tags - Enables fetching of tags during the clone operation.
- Sparse Checkout - Enables cloning specific subdirectories.
- Clone Submodules - Adds options for including and recursively cloning Git submodules.
- Clone Path Customization - Exposes the clone path in the codebase section, allowing users to specify a custom clone directory.
- Additional Pre-Fetch Command - Ability to specify any additional Git commands to run before fetching the code.


These capabilites are behind feature flag `CI_GIT_CLONE_ENHANCED`. If it is not available in your account, contact [Harness Support](mailto:support@harness.io) to enable the feature.

:::

Add a **Git Clone** step to clone a second repo into the pipeline's workspace.

```yaml
              - step:
                  type: GitClone
                  name: clone second repo
                  identifier: clone_second_repo
                  spec:
                    connectorRef: account.git2
                    build:
                      type: branch
                      spec:
                        branch: main
```

## Step Settings 

The **Git Clone** step has the following settings. Depending on the stage's build infrastructure, some settings might be unavailable.

### Name, Id, and Description

Enter a **Name** summarizing the step's purpose. Harness automatically assigns an **Id** ([Entity Identifier Reference](../../../platform/references/entity-identifier-reference.md)) based on the **Name**. You can change the **Id**.

The **Description** is an optional text string.

### Connector

If you're using [Harness Code Repository (Code)](https://developer.harness.io/docs/code-repository/get-started/overview/), you do not need to configure a connector. 


For third-party Git provider, select a connector for the source control provider hosting the code repo that you want the step to clone.

The following topics provide more information about creating code repo connectors:

* Azure Repos: [Connect to Azure Repos](/docs/platform/connectors/code-repositories/connect-to-a-azure-repo)
* Bitbucket: [Bitbucket connector settings reference](/docs/platform/connectors/code-repositories/ref-source-repo-provider/bitbucket-connector-settings-reference)
* GitHub: [GitHub connector settings reference](/docs/platform/connectors/code-repositories/ref-source-repo-provider/git-hub-connector-settings-reference)
* GitLab: [GitLab Connector Settings Reference](/docs/platform/connectors/code-repositories/ref-source-repo-provider/git-lab-connector-settings-reference)
* Other Git providers:
  * [Git connector settings reference](/docs/platform/connectors/code-repositories/ref-source-repo-provider/git-connector-settings-reference)
  * [Connect to an AWS CodeCommit Repo](/docs/platform/connectors/code-repositories/connect-to-code-repo)

### Repository Name

If the connector's [URL Type](/docs/platform/connectors/code-repositories/ref-source-repo-provider/git-connector-settings-reference#url-type) is **Repository**, then **Repository Name** is automatically populated based on the repository defined in the connector's configuration.

If the connector's URL Type is **Account**, then you must specify the name of the code repo that you want to clone into the pipeline workspace.

### Build Type, Branch Name, and Tag Name

For **Build Type**, select **Git Branch** if you want the step to clone code from a specific branch within the repo, or select **Git Tag** if you want the step to clone code from a specific commit tag. Based on your selection, specify a **Branch Name** or **Tag Name**.

:::tip

You can use [fixed values, runtime input, or variable expressions](/docs/platform/variables-and-expressions/runtime-inputs/) for the branch and tag names. For example, you can enter `<+input>` for the branch or tag name to supply a branch or tag name at runtime. You could also use expressions to match the pipeline's [codebase](./create-and-configure-a-codebase.md) branch or tag so that, for example, the pipeline and the Git Clone step both pull code from the same environment, such as `production` when a production build runs or `development` when a development build runs.

:::

This setting applies only to the repo specified in this **Git Clone** step. It is separate from the `codebase` object for the pipeline's **Build** stage. If you want this **Git Clone** step's repo to use the same branch or commit as the primary codebase, specify either `<+codebase.branch>` or `<+codebase.tag>` for **Branch Name** or **Tag Name**. These expressions pull runtime input from the pipeline; for example, if the pipeline's primary codebase uses the `development` branch, then the **Git Clone** step clones the `development` branch from its repo. For more information, go to the [CI codebase variables reference](./built-in-cie-codebase-variables-reference.md).

### Clone Directory

An optional target path in the pipeline workspace where you want to clone the repo.

You can't specify `/harness/` as a target directory for a **Git Clone** step because this folder is reserved for the **Build** stage's [codebase](./create-and-configure-a-codebase.md). You can specify **Shared Paths** in your [CI Build stage settings](../set-up-build-infrastructure/ci-stage-settings.md) to share data across steps in your **Build** stage.

## Additional Configuration

The following settings are available when you click **Additional Configuration**.

### Privileged

When this setting is enabled, Harness will run all containers with the Docker `--privileged` flag enabled. This option is disabled by default.

This option grants the container elevated privileges within the underlying host environment. This means that the container has access to all Linux kernel capabilities and devices, similar to running processes outside the container. It effectively removes the isolation provided by the container runtime and can potentially pose security risks if not used carefully.

### Depth

The number of commits to fetch when the step clones the repo.

The default depth varies by build and trigger type:

* For manually-triggered branch and tag builds, the default depth is `50`. This means each `git clone` operation fetches the 50 most recent commits.
* For manually-triggered PR builds and all auto-triggered builds (such as webhook triggers), the default depth is `0`. This means each `git clone` operation fetches all commits from the relevant branch.

For more information, go to the [git clone documentation](https://git-scm.com/docs/git-clone).

### Fetch Tags

Determines whether to fetch all tags when performing a shallow clone (depth > 0). Setting this to `true` is equivalent to adding the `--tags` flag.

### Pull Request Clone Strategy

When a build is triggered by a pull request, this setting determines the branch to use for the artifact after the repo is cloned.

If this is set to **Merge Commit** (which is the default setting), the pipeline tries to merge the pull request branch with the target branch before building the artifact. This guarantees that the artifact includes all commits in both the pull request and the target branch. The disadvantage is that this can take more time and result in build failures: If the merge fails, then the build fails.

![](./static/create-and-configure-a-codebase-04.png)

If this is set to **Source Branch**, the pipeline builds the artifact from the latest commit in the pull request branch. This can be faster and less likely to result in build failures; however, it might not include some commits in the target branch.

![](./static/create-and-configure-a-codebase-05.png)

:::tip
If you're using the GitHub API, use the stage variable `PR_MERGE_STRATEGY_BRANCH` along with the `CI_PR_MERGE_STRATEGY_BRANCH` flag to enable the **Merge Commit Strategy** for codebase cloning.
:::

### Download LFS Files

The [Git Large File Storage (LFS)](https://git-lfs.com/) client is an extension for versioning large files, such as audio, video, datasets, and graphics.
Set **Download LFS Files** to `true` to download Git-LFS files. Default is `false`.

### Sparse Checkout

Do a sparse checkout on given patterns. The subset of files is chosen by providing a list of directories in cone mode. Refer to [git documentation](https://git-scm.com/docs/git-sparse-checkout#_internalscone_pattern_set) for more details.

### Include Submodules

Determines whether to include submodules in the clone. Default is `false`. Set to `true` to include submodules or recursive to clone submodules recursively. 

### Pre Fetch Command

Specify any additional Git commands to run before fetching the code. This field is for Git commands only; separate each command with a new line.

This could be used, for example, to set additional LFS configurations or clone specific submodules. For example,

```bash
git config lfs.fetchexclude ".jpg"
```

### SSL Verify

If **True**, which is the default value, the pipeline verifies your Git SSL certificates. The build fails if the certificate check fails. Set this to **False** only if you have a known issue with the certificate and you are willing to run your builds anyway.

If you want to use self-signed certificates in a Kubernetes Cluster build infrastructure, go to [Configure a Kubernetes Build Farm to use Self-Signed Certificates](../set-up-build-infrastructure/k8s-build-infrastructure/configure-a-kubernetes-build-farm-to-use-self-signed-certificates.md)

### Run as User

This setting is available for Kubernetes cluster build infrastructures only.

All Git clone steps, including the default clone codebase step and any additional **Git Clone** steps, use user 1000 by default for Kubernetes.

If necessary, you can specify, in **Run as User**, a user ID to use to run all processes in the pod if running in containers. For more information, go to [Set the security context for a pod](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/#set-the-security-context-for-a-pod).

Specifying **Run as User** at the step level overrides **Run as User** in the [build infrastructure settings](../set-up-build-infrastructure/ci-stage-settings.md#infrastructure), if you had also specified it there.

### Set Container Resources

Set maximum resource limits for the resources used by the container at runtime:

* **Limit Memory:** The maximum memory that the container can use. You can express memory as a plain integer or as a fixed-point number using the suffixes `G` or `M`. You can also use the power-of-two equivalents `Gi` and `Mi`. The default is `500Mi`.
* **Limit CPU:** The maximum number of cores that the container can use. CPU limits are measured in CPU units. Fractional requests are allowed; for example, you can specify one hundred millicpu as `0.1` or `100m`. The default is `400m`. For more information, go to [Resource units in Kubernetes](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#resource-units-in-kubernetes).

### Timeout

Set the timeout limit for the step. Once the timeout limit is reached, the step fails and pipeline execution continues. To set skip conditions or failure handling for steps, go to:

* [Step Skip Condition settings](/docs/platform/pipelines/step-skip-condition-settings.md)
* [Step Failure Strategy settings](/docs/platform/pipelines/failure-handling/define-a-failure-strategy-on-stages-and-steps)

## Troubleshooting 
* **SSH-keyscan timeout:** - If your [connector](#connector) uses SSH authentication, you can add a `PLUGIN_SSH_KEYSCAN_TIMEOUT` [stage variable](/docs/platform/pipelines/add-a-stage/#stage-variables) to override the `ssh-keyscan` command's timeout limit (the default is `5s`).
Stage variables are configured in stage settings, not step settings.
* If you're using the GitHub API and facing issues with **Merge Commit Strategy** for codebase cloning, use the stage variable `PR_MERGE_STRATEGY_BRANCH` along with the `CI_PR_MERGE_STRATEGY_BRANCH` flag.


