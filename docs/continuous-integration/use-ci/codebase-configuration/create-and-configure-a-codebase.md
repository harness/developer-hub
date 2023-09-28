---
title: Create and configure a codebase
description: CI pipelines build and test code that is pulled from Git code repositories.

sidebar_position: 10
helpdocs_topic_id: mozd8b49td
helpdocs_category_id: ojaa8v6fwz
helpdocs_is_private: false
helpdocs_is_published: true
---

CI pipelines build and test code that is pulled from a Git code repository. When you add a **Build** stage to a CI pipeline, you select a [code repo connector](#code-repo-connectors) that connects to the Git account or repository where your code is stored. This topic explains how to configure codebase settings for CI pipelines.

This topic assumes you have an understanding of the [CI pipeline creation process](../prep-ci-pipeline-components.md).

## Code repo connectors

Harness uses code repo connectors to connect to Git providers, such as Bitbucket, GitHub, GitLab, and others. You can create code repo connectors for entire accounts or specific repositories. You can view a list of your saved connectors in **Connectors** under **Project Setup**. The following topics provide more information about creating code repo connectors:

* Azure Repos: [Connect to Azure Repos](/docs/platform/Connectors/Code-Repositories/connect-to-a-azure-repo)
* Bitbucket: [Bitbucket Connector Settings Reference](/docs/platform/Connectors/Code-Repositories/ref-source-repo-provider/bitbucket-connector-settings-reference)
* GitHub: [GitHub connector settings reference](/docs/platform/Connectors/Code-Repositories/ref-source-repo-provider/git-hub-connector-settings-reference)
* GitLab: [GitLab Connector Settings Reference](/docs/platform/Connectors/Code-Repositories/ref-source-repo-provider/git-lab-connector-settings-reference)
* Other Git providers:
  * [Git connector settings reference](/docs/platform/Connectors/Code-Repositories/ref-source-repo-provider/git-connector-settings-reference)
  * [Connect to an AWS CodeCommit Repo](/docs/platform/Connectors/Code-Repositories/connect-to-code-repo)

The CodeCommit, Azure, Bitbucket, GitHub, and GitLab connectors have authorization settings as required by their respective providers. The Git connector can connect with any provider using basic authentication over HTTPS.

## Configure a pipeline's default codebase

When you add a **Build** stage to a CI pipeline, you select a [code repo connector](#code-repo-connectors) that connects to the Git account or repository where your code is stored.

1. In the Pipeline Studio, select **Add Stage**, and then select **Build**.
2. Enter a **Stage Name**. **Description** and **Tags** are optional.
3. Make sure **Clone Codebase** is enabled. This tells Harness to clone the codebase into the build environment before running the steps in the stage.
4. For **Connector**, select or create a [code repo connector](#code-repo-connectors).
5. If **Repository Name** is not automatically populated, you can specify a repository to use for this pipeline. You can also set this field to `<+input>` to specify a repo at runtime.
6. Select **Set Up Stage**.

![Configuring the codebase when adding a Build stage.](./static/create-and-configure-a-codebase-00.png)

<details>
<summary>YAML example: Basic codebase configuration</summary>

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
        connectorRef: YOUR_CODEBASE_CONNECTOR_ID
        repoName: YOUR_GIT_REPO
        build: <+input>
```

</details>

The first codebase declared in a pipeline becomes the pipeline's default codebase. If you need to change the connector or other codebase settings, go to [Edit the default codebase configuration](#edit-the-codebase-configuration).

Once a default codebase is established, when you add subsequent stages to the pipeline, you can disable **Clone Codebase** for those stages, but you can't change the connector or repo. Usually, you disable **Clone Codebase** only if the codebase is not needed for the stage's operations. However, you can also [use a Git Clone step to clone multiple code repos in a pipeline](./clone-and-process-multiple-codebases-in-the-same-pipeline.md).

## Edit the codebase configuration

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```
```mdx-code-block
<Tabs>
  <TabItem value="Visual" label="Visual">
```

To edit a pipeline's default codebase configuration, select **Codebase** on the right side panel of the Pipeline Studio's Visual editor.

<!-- ![A pipeline's codebase settings as shown in the Pipeline Studio's Visual editor.](./static/create-and-configure-a-codebase-03.png) -->

<docimage path={require('./static/create-and-configure-a-codebase-03.png')} />

```mdx-code-block
  </TabItem>
  <TabItem value="YAML" label="YAML" default>
```

To edit a pipeline's default codebase configuration in the YAML editor, edit the `codebase` section. For example:

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
        connectorRef: YOUR_CODEBASE_CONNECTOR_ID
        build: <+input>
        depth: 0
        sslVerify: true
        prCloneStrategy: MergeCommit
        resources:
          limits:
            memory: 500Mi
            cpu: 400m
```

```mdx-code-block
  </TabItem>
</Tabs>
```

In addition to changing the **Connector** (`connectorRef`) or **Repository Name** (`repoName`), you can edit the following advanced settings.

### Depth

The number of commits to fetch when the pipeline clones the codebase repo.

For manually-triggered builds, the default depth is `50`. This means each `git clone` operation fetches the 50 most recent commits. For all other trigger types, the default depth is `0`, which fetches all commits from the relevant branch.

For more information, go to the [git clone documentation](https://git-scm.com/docs/git-clone).

### SSL Verify

If **True**, which is the default value, the pipeline verifies your Git SSL certificates. The build fails if the certificate check fails. Set this to **False** only if you have a known issue with the certificate and you are willing to run your builds anyway.

If you want to use self-signed certificates in a Kubernetes Cluster build infrastructure, go to [Configure a Kubernetes Build Farm to use Self-Signed Certificates](../set-up-build-infrastructure/k8s-build-infrastructure/configure-a-kubernetes-build-farm-to-use-self-signed-certificates.md)

### Pull Request Clone Strategy

When a build is triggered by a pull request, this setting determines the branch to use for the artifact after the repo is cloned.

If this is set to **Merge Commit** (which is the default setting), the pipeline tries to merge the pull request branch with the target branch before building the artifact. This guarantees that the artifact includes all commits in both the pull request and the target branch. The disadvantage is that this can take more time and result in build failures: If the merge fails, then the build fails.

![](./static/create-and-configure-a-codebase-04.png)

If this is set to **Source Branch**, the pipeline builds the artifact from the latest commit in the pull request branch. This can be faster and less likely to result in build failures; however, it might not include some commits in the target branch.

![](./static/create-and-configure-a-codebase-05.png)

### Set Container Resources

Set maximum resource limits for the containers that clone the codebase at runtime:

* **Limit Memory:** The maximum memory that the container can use. You can express memory as a plain integer or as a fixed-point number using the suffixes `G` or `M`. You can also use the power-of-two equivalents `Gi` and `Mi`. The default is `500Mi`.
* **Limit CPU:** The maximum number of cores that the container can use. CPU limits are measured in CPU units. Fractional requests are allowed; for example, you can specify one hundred millicpu as `0.1` or `100m`. The default is `400m`. For more information, go to [Resource units in Kubernetes](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#resource-units-in-kubernetes).

## Troubleshooting

### Improve codebase clone time

If cloning your codebase takes more time than expected, try setting **Limit Memory** to `1Gi`.

If codebase cloning takes longer than expected when the build is triggered by a pull request, set **Pull Request Clone Strategy** to **Source Branch** and set **Depth** to `1`.

### The same Git commit is not used in all stages

If your pipeline has multiple stages, each stage that has **Clone codebase** enabled will clone the codebase during stage initialization. If your pipeline uses the generic [Git connector](/docs/platform/Connectors/Code-Repositories/ref-source-repo-provider/git-connector-settings-reference) and a commit is made to the codebase after a pipeline run has started, it is possible for later stages to clone the newer commit, rather than the same commit that the pipeline started with.

If you want to force all stages to use the same commit ID, even if there are changes in the repository while the pipeline is running, you must use a [code repo connector](#code-repo-connectors) for a specific SCM provider, rather than the generic Git connector.

## See also

* [Runtime Inputs](/docs/platform/20_References/runtime-inputs.md)
* [Create a Connector using YAML](../../../platform/7_Connectors/create-a-connector-using-yaml.md)
* [CI Build stage settings](../set-up-build-infrastructure/ci-stage-settings.md)
