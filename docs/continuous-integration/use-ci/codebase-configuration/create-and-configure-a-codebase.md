---
title: Create and configure a codebase
description: CI pipelines build and test code that is pulled from Git code repositories.

sidebar_position: 10
helpdocs_topic_id: mozd8b49td
helpdocs_category_id: ojaa8v6fwz
helpdocs_is_private: false
helpdocs_is_published: true
---

CI pipelines build and test code that is pulled from a Git code repositories. When you add a **Build** stage to a CI pipeline, you select a [code repo connector](#code-repo-connectors) that connects to the Git account or repository where your code is stored. This topic explains how to configure codebase settings for CI pipelines.

This topic assumes you have an understanding of [Harness CI concepts](../../ci-quickstarts/ci-concepts.md) and the general [pipeline creation process](../prep-ci-pipeline-components.md).

## Code repo connectors

Harness uses code repo connectors to connect to Git providers, such as Bitbucket, GitHub, GitLab, and others. You can create code repo connectors for entire accounts or specific repositories. You can view a list of your saved connectors in **Connectors** under **Project Setup**. The following topics provide more information about creating code repo connectors:

* AWS CodeCommit: [Connect to an AWS CodeCommit Repo](/docs/platform/Connectors/connect-to-code-repo#add-aws-codecommit-repo)
* Azure Repos: [Connect to Azure Repos](/docs/platform/Connectors/connect-to-a-azure-repo)
* Bitbucket: [Bitbucket Connector Settings Reference](../../../platform/7_Connectors/ref-source-repo-provider/bitbucket-connector-settings-reference.md)
* GitHub:
  * [Add a GitHub connector](/docs/platform/Connectors/add-a-git-hub-connector)
  * [GitHub connector settings reference](/docs/platform/Connectors/ref-source-repo-provider/git-hub-connector-settings-reference)
  * [Use a GitHub App in a GitHub connector](/docs/platform/Connectors/git-hub-app-support)
* GitLab: [GitLab Connector Settings Reference](../../../platform/7_Connectors/ref-source-repo-provider/git-lab-connector-settings-reference.md)
* Other Git providers:
  * [Connect to a Git repo](/docs/platform/Connectors/connect-to-code-repo)
  * [Git connector settings reference](/docs/platform/Connectors/ref-source-repo-provider/git-connector-settings-reference)

The CodeCommit, Bitbucket, GitHub, and GitLab Connectors have authorization settings as required by their respective providers. The Git connector can connect with any provider using basic authentication over HTTPS.

## Configure a pipeline's default codebase

When you add a **Build** stage to a CI pipeline, you select a [code repo connector](#code-repo-connectors) that connects to the Git account or repository where your code is stored.

1. In the Pipeline Studio, select **Add Stage**, and then select **Build**.
2. Enter a **Stage Name**. **Description** and **Tags** are optional.
3. Make sure **Clone Codebase** is enabled. This tells Harness to clone the codebase into the build environment before running the steps in the stage.
4. For **Connector**, select or create a [code repo connector](#code-repo-connectors).
5. If **Repository Name** is not automatically populated, you can specify a repository to use for this pipeline. You can also set this field to `<+input>` to specify a repo at runtime.
6. Select **Set Up Stage**.

![Configuring the codebase when adding a Build stage.](./static/create-and-configure-a-codebase-00.png)

The first codebase declared in a pipeline becomes the pipeline's default codebase. If you need to change the connector or other codebase settings, go to [Edit the default codebase configuration](#edit-the-default-codebase-configuration).

Once a default codebase is established, when you add subsequent stages to the pipeline, you can disable **Clone Codebase** for those stages, but you can't change the connector or repo. Usually, you disable **Clone Codebase** only if the codebase is not needed for the stage's operations. However, you can also [use a Git Clone step to clone multiple code repos in a pipeline](./clone-and-process-multiple-codebases-in-the-same-pipeline.md).

## Edit the default codebase configuration

To manage a pipeline's default codebase configuration, select **Codebase** on the right side panel while viewing the pipeline in the Pipeline Studio.

![Configuring pipeline codebase settings.](./static/create-and-configure-a-codebase-03.png)

In addition to changing the **Connector** or **Repository Name**, you can manage the following advanced settings.

### Depth

The number of commits to fetch when the pipeline clones the codebase repo.

For manually-triggered builds, the default depth is `50`. This means each `git clone` operation fetches the 50 most recent commits. For all other trigger types, the default depth is `0`, which fetches all commits from the relevant branch.

For more information, go to the [git clone documentation](https://git-scm.com/docs/git-clone).

### SSL Verify

If **True**, which is the default value, the pipeline verifies your Git SSL certificates. The build fails if the certificate check fails. Set this to **False** only if you have a known issue with the certificate and you are willing to run your builds anyway.

If you want to use self-signed certificates in a Kubernetes Cluster build infrastructure, go to [Configure a Kubernetes Build Farm to use Self-Signed Certificates](../set-up-build-infrastructure/configure-a-kubernetes-build-farm-to-use-self-signed-certificates.md)

### Pull Request Clone Strategy

When a build is triggered by a pull request, this setting determines the branch to use for the artifact after the repo is cloned.

If this is set to **Merge Commit** (which is the default setting), the pipeline tries to merge the pull request branch with the target branch before building the artifact. This guarantees that the artifact includes all commits in both the pull request and the target branch. The disadvantage is that this can take more time and result in build failures: If the merge fails, then the build fails.

![](./static/create-and-configure-a-codebase-04.png)

If this is set to **Source Branch**, the pipeline builds the artifact from the latest commit in the pull request branch. This can be faster and less likely to result in build failures; however, it might not include some commits in the target branch.

![](./static/create-and-configure-a-codebase-05.png)

### Set Container Resources

Set maximum resource limits for the containers that clone the codebase at runtime:

* **Limit Memory:** The maximum memory that the container can use. You can express memory as a plain integer or as a fixed-point number using the suffixes `G` or `M`. You can also use the power-of-two equivalents `Gi` and `Mi`.
* **Limit CPU:** The maximum number of cores that the container can use. CPU limits are measured in CPU units. Fractional requests are allowed; for example, you can specify one hundred millicpu as `0.1` or `100m`. For more information, go to [Resource units in Kubernetes](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#resource-units-in-kubernetes).

## Improve codebase clone time

If cloning your codebase takes more time than expected, try setting **Limit Memory** to `1Gi`.

If codebase cloning takes longer than expected when the build is triggered by a pull request, set **Pull Request Clone Strategy** to **Source Branch** and set **Depth** to `1`.

## YAML example

Here's an example of codebase configuration in YAML.

```yaml
pipeline:
  name: tutorial example
  identifier: tutorial_example
  projectIdentifier: tutorial_test
  orgIdentifier: default
  tags: {}
  properties:
    ci:
      codebase:
        connectorRef: account.docsexample
        build: <+input>
        depth: 0
        sslVerify: true
        prCloneStrategy: MergeCommit
        resources:
          limits:
            memory: 500Mi
            cpu: 400m
```

## See also

* [Runtime Inputs](../../../platform/20_References/runtime-inputs.md)
* [Create a Connector using YAML](../../../platform/7_Connectors/create-a-connector-using-yaml.md)
* [CI Build stage settings](../build-stage-settings/ci-stage-settings.md)
