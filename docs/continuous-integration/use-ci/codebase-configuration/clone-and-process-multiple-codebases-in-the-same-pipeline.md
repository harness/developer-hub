---
title: Clone multiple code repos in one pipeline
description: Use Git Clone steps to clone additional code repos into a pipeline's workspace.

sidebar_position: 20
helpdocs_topic_id: k8tz6mtiut
helpdocs_category_id: 7ljl8n7mzn
helpdocs_is_private: false
helpdocs_is_published: true
---

In addition to the pipeline's default [codebase](./create-and-configure-a-codebase.md), you can use **Git Clone** steps to clone additional code repos into the pipeline's workspace. For example, you can use this to:

* Build multiple artifacts in the same pipeline. For example, suppose you use Packer and Ansible to build artifacts automatically, and you have separate repos for Packer, Ansible, and code. You can clone all three repos into the pipeline's workspace.
* Pull code from separate code and build repos. For example, if your code files are in a repo managed by the Engineering team and your Dockerfiles are in a different repo managed by the Security team, you can clone both repos into the pipeline's workspace.

This topic assumes you are familiar with [CI concepts](../../ci-quickstarts/ci-concepts.md) and the general [pipeline creation process](../prep-ci-pipeline-components.md).

## Configure the default codebase

When you add a **Build** stage to a CI pipeline, you specify the Git account or repository where your code is stored. The codebase declared in a pipeline's first stage becomes the pipeline's default codebase, and this repo is cloned into the workspace automatically when the pipeline runs.

This topic uses an example pipeline to demonstrate how you can use a **Git Clone** step to clone a second repo into a pipeline's workspace. The example pipeline does the following:

* Specifies a repo that contains code files in the **Build** stage settings.
* Uses a **Git Clone** step to clone a separate Dockerfile repo into the workspace.
* Uses a **Build and Push** step builds and pushes an image using files from both repos.

The following steps explain how to create a pipeline and add a **Build** stage. If you already have a pipeline with a **Build** stage, you can skip to [Add a Git Clone step](#add-a-git-clone-step).

1. Select **Pipelines** and then select **Create a Pipeline**.
2. Enter a **Name** for the pipeline and then select **Start**.
3. In the Pipeline Studio, select **Add Stage**, and then select **Build**.
4. Enter a **Stage Name** and make sure **Clone Codebase** is enabled. This tells Harness to clone the codebase into the build environment before running the steps in the stage.
5. For **Connector**, select or create a [code repo connector](./create-and-configure-a-codebase.md#code-repo-connectors) for one of the code repos that you want the pipeline to use.
6. If **Repository Name** is not automatically populated, specify a repository to use for this pipeline.
7. Select **Set Up Stage**.
8. On the stage's **Infrastructure** tab, [set up the build infrastructure](/docs/category/set-up-build-infrastructure).

For more information about configuring the **Build** stage's, go to [Create and configure a codebase](./create-and-configure-a-codebase.md) and [CI Build stage settings](../set-up-build-infrastructure/ci-stage-settings.md).

## Add the Git Clone step

Add a **Git Clone** step to clone a second repo into the pipeline's workspace. This step's settings are described below. Depending on the stage's build infrastructure, some settings may be unavailable.

### Name, Id, and Description

Enter a **Name** summarizing the step's purpose. Harness automatically assigns an **Id** ([Entity Identifier Reference](../../../platform/20_References/entity-identifier-reference.md)) based on the **Name**. You can change the **Id**.

The **Description** is an optional text string.

### Connector

Select a connector for the source control provider hosting the code repo that you want the step to clone.

The following topics provide more information about creating code repo connectors:

* Azure Repos: [Connect to Azure Repos](/docs/platform/Connectors/Code-Repositories/connect-to-a-azure-repo)
* Bitbucket: [Bitbucket connector settings reference](/docs/platform/Connectors/Code-Repositories/ref-source-repo-provider/bitbucket-connector-settings-reference)
* GitHub: [GitHub connector settings reference](/docs/platform/Connectors/Code-Repositories/ref-source-repo-provider/git-hub-connector-settings-reference)
* GitLab: [GitLab Connector Settings Reference](/docs/platform/Connectors/Code-Repositories/ref-source-repo-provider/git-lab-connector-settings-reference)
* Other Git providers:
  * [Git connector settings reference](/docs/platform/Connectors/Code-Repositories/ref-source-repo-provider/git-connector-settings-reference)
  * [Connect to an AWS CodeCommit Repo](/docs/platform/Connectors/Code-Repositories/connect-to-code-repo)

### Repository Name

If the connector's [URL Type](/docs/platform/Connectors/Code-Repositories/ref-source-repo-provider/git-connector-settings-reference#url-type) is **Repository**, then **Repository Name** is automatically populated based on the repository defined in the connector's configuration.

If the connector's URL Type is **Account**, then you must specify the name of the code repo that you want to clone into the pipeline workspace.

### Build Type, Branch Name, and Tag Name

For **Build Type**, select **Git Branch** if you want the step to clone code from a specific branch within the repo, or select **Git Tag** if you want the step to clone code from a specific commit tag. Based on your selection, specify a **Branch Name** or **Tag Name**.

:::tip

You can use [fixed values, runtime input, or variable expressions](/docs/platform/references/runtime-inputs/) for the branch and tag names. For example, you can enter `<+input>` for the branch or tag name to supply a branch or tag name at runtime. You could also use expressions to match the pipeline's [codebase](./create-and-configure-a-codebase.md) branch or tag so that, for example, the pipeline and the Git Clone step both pull code from the same environment, such as `production` when a production build runs or `development` when a development build runs.

:::

This setting applies only to the repo specified in this **Git Clone** step. It is separate from the `codebase` object for the pipeline's **Build** stage. If you want this **Git Clone** step's repo to use the same branch or commit as the primary codebase, specify either `<+codebase.branch>` or `<+codebase.tag>` for **Branch Name** or **Tag Name**. These expressions pull runtime input from the pipeline; for example, if the pipeline's primary codebase uses the `development` branch, then the **Git Clone** step clones the `development` branch from its repo. For more information, go to the [Built-in CI codebase variables reference](./built-in-cie-codebase-variables-reference.md).

### Clone Directory

An optional target path in the pipeline workspace where you want to clone the repo.

You can't specify `/harness/` as a target directory for a **Git Clone** step because this folder is reserved for the **Build** stage's [codebase](./create-and-configure-a-codebase.md). You can specify **Shared Paths** in your [CI Build stage settings](../set-up-build-infrastructure/ci-stage-settings.md) to share data across steps in your **Build** stage.

### Depth

The number of commits to fetch when the step clones the repo.

For manually-triggered builds, the default depth is `50`. This means each `git clone` operation fetches the 50 most recent commits. For all other trigger types, the default depth is `0`, which fetches all commits from the relevant branch.

For more information, go to the [git clone documentation](https://git-scm.com/docs/git-clone).

### SSL Verify

If **True**, which is the default value, the pipeline verifies your Git SSL certificates. The build fails if the certificate check fails. Set this to **False** only if you have a known issue with the certificate and you are willing to run your builds anyway.

If you want to use self-signed certificates in a Kubernetes Cluster build infrastructure, go to [Configure a Kubernetes Build Farm to use Self-Signed Certificates](../set-up-build-infrastructure/k8s-build-infrastructure/configure-a-kubernetes-build-farm-to-use-self-signed-certificates.md)

### Run as User

Specify the user ID to use to run all processes in the pod if running in containers. For more information, go to [Set the security context for a pod](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/#set-the-security-context-for-a-pod).

### Set Container Resources

Set maximum resource limits for the resources used by the container at runtime:

* **Limit Memory:** The maximum memory that the container can use. You can express memory as a plain integer or as a fixed-point number using the suffixes `G` or `M`. You can also use the power-of-two equivalents `Gi` and `Mi`. The default is `500Mi`.
* **Limit CPU:** The maximum number of cores that the container can use. CPU limits are measured in CPU units. Fractional requests are allowed; for example, you can specify one hundred millicpu as `0.1` or `100m`. The default is `400m`. For more information, go to [Resource units in Kubernetes](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#resource-units-in-kubernetes).

### Timeout

Set the timeout limit for the step. Once the timeout limit is reached, the step fails and pipeline execution continues. To set skip conditions or failure handling for steps, go to:

* [Step Skip Condition settings](/docs/platform/8_Pipelines/w_pipeline-steps-reference/step-skip-condition-settings.md)
* [Step Failure Strategy settings](/docs/platform/8_Pipelines/w_pipeline-steps-reference/step-failure-strategy-settings.md)

### Stage setting: SSH-keyscan timeout

If your [connector](#connector) uses SSH authentication, you can add a `PLUGIN_SSH_KEYSCAN_TIMEOUT` [stage variable](/docs/platform/pipelines/add-a-stage/#option-stage-variables) to override the `ssh-keyscan` command's timeout limit (the default is `5s`).

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```
```mdx-code-block
<Tabs>
  <TabItem value="Visual" label="Visual">
```

1. In your CI pipeline, select the stage with the **Git Clone** step, and then select the **Overview** tab.
2. Under **Advanced**, select **New Variable**.
3. For **Variable Name**, enter `PLUGIN_SSH_KEYSCAN_TIMEOUT`.
4. Set the **Type** to **String**, and then select **Save**.
5. Enter the desired timeout limit for the **Value**. This is an integer representing a number of seconds, such as `90`.

```mdx-code-block
  </TabItem>
  <TabItem value="YAML" label="YAML" default>
```

```yaml
    - stage:
        ...
        variables:
          - name: PLUGIN_SSH_KEYSCAN_TIMEOUT
            type: String
            description: ""
            value: 90
```

```mdx-code-block
  </TabItem>
</Tabs>
```

Add this variable to all stages where you need to override the `SSH-keyscan` timeout limit.

## Build an artifact from both code repos

Now that the files from both repos will be cloned into a common workspace, you can add a step to build an artifact using code from both repos, such as a [Build and Push an image to Docker Registry step](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push-to-docker-hub-step-settings).

Pay attention to settings like the [Dockerfile setting](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push-to-docker-hub-step-settings#dockerfile) that assume files are located at the codebase's root directory if not otherwise specified. Depending on the default codebase, you might need to specify a non-root path for build files.

You can also use, for example, a `cp` command in a [Run step](/docs/continuous-integration/use-ci/run-ci-scripts/run-step-settings) to move cloned files around the workspace before building an artifact.

## Reference: YAML example

The following YAML example describes a pipeline that clones two code repos.

```yaml
pipeline:
  name: Clone two repos
  identifier: Clone_two_repos
  projectIdentifier: my_project
  orgIdentifier: default
  tags: {}
  properties:
    ci:
      codebase:
        connectorRef: account.git1
        repoName: my-code-repo
        build: <+input>
  stages:
    - stage:
        name: build from two repos
        identifier: build_from_two_repos
        description: ""
        type: CI
        spec:
          cloneCodebase: true
          platform:
            os: Linux
            arch: Amd64
          runtime:
            type: Cloud
            spec: {}
          execution:
            steps:
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
              - step:
                  type: BuildAndPushDockerRegistry
                  name: BuildAndPushDockerRegistry_1
                  identifier: BuildAndPushDockerRegistry_1
                  spec:
                    connectorRef: mydockerhubconnector
                    repo: username/imagerepo
                    tags:
                      - <+pipeline.executionId>
                    dockerfile: /path/to/dockerfile
```

## Alternative: Use a Run step

As an alternative to the **Git Clone** step, you can use scripts in **Run** steps to clone multiple repos into a stage.

You might want to define [stage variables](../set-up-build-infrastructure/ci-stage-settings.md#advanced-stage-variables) for the names and URLs of the codebases that you clone into the workspace. These variables are accessible across all steps in the stage.

Depending on the image you use for the **Run** step, you might need to install Git before you clone any repos. For example, you could use this code in a **Run** step to install git, verify that it's working, and clone the repo with the Dockerfile needed to build an image. This example uses stage variables for the GitHub username and Docker repo.

```
apk add git  
git --version  
git clone https://github.com/$GITHUB_USERNAME/$DOCKER_REPO
```

<details>
<summary>Move files and folders after cloning</summary>

Your pipeline's default codebase files are in the root folder, while other codebase files are in subfolders. If you run a `find` or a recursive `ls` in a **Run** step after cloning additional codebases, you see something like this:

```
# Files from default codebase:  
87 info 4/26/2022 10:43:31 AM ./setup-be-service.sh  
88 info 4/26/2022 10:43:31 AM ./default-be-template.json  
89 info 4/26/2022 10:43:31 AM ./core/  
90 info 4/26/2022 10:43:31 AM ./core/src/  
...  
# Files from $DOCKER_REPO codebase:  
146 info 4/26/2022 10:43:31 AM ./myDockerRepo/myBackendService  
147 info 4/26/2022 10:43:31 AM ./myDockerRepo/myBackendService/Dockerfile
```

In this example, you need to copy the DockerFile for the back-end service into the root workspace folder. For example, this `cp` command assumes the DockerFiles are arranged by app repo name in the Docker repo:

```
cp $DOCKER_REPO/$APP_REPO/Dockerfile .
```

Now the Dockerfile is in the correct location to build the image, for example:

```
./setup-backend-service.sh  
./default-be-template.json  
./Dockerfile  
./core/  
...
```

</details>

<details>
<summary>YAML example: Clone with Run step</summary>

```yaml
pipeline:  
    name: build-from-multiple-repos-example  
    identifier: buildfrommultiplereposexample  
    allowStageExecutions: false  
    projectIdentifier: docexampleproject  
    orgIdentifier: wtd  
    description: Git clone, copy Dockerfile from myDockerRepo to workspace root, build image  
    tags: {}  
    properties:  
        ci:  
            codebase:  
                connectorRef: mygithubconnector  
                repoName: myBackendService  
                build: <+input>  
    stages:  
        - stage:  
              name: Build myBackendService  
              identifier: Build_Test_and_Push  
              type: CI  
              spec:  
                  cloneCodebase: true  
                  infrastructure:  
                      type: KubernetesDirect  
                      spec:  
                          connectorRef: mydelegateconnector  
                          namespace: harness-delegate-ng  
                          automountServiceAccountToken: true  
                  execution:  
                      steps:  
                          - step:  
                                type: Run  
                                name: git-clone-and-copy-dockerfile  
                                identifier: echotriggervarscustom  
                                spec:  
                                    connectorRef: mydockerhubconnector  
                                    image: alpine:latest  
                                    shell: Sh  
                                    command: |+  
                                        # Clone Codebase is enabled, which copies all  
                                        # files and folders to the current folder.  
                                        # Before we can build an image, we need to clone the   
                                        # Docker repo and copy the corresponding Dockerfile  
                                        # to the current folder   
  
                                        apk add git  
                                        git --version  
                                        git clone https://github.com/$GITHUB_USERNAME/$DOCKER_REPO  
  
                                        # We now have Docker repo at the current folder:  
                                        find .  
  
                                        # Copy Dockerfile to current folder, where the Docker Build  
                                        # step can find it:  
                                        cp $DOCKER_REPO/$APP_REPO/Dockerfile .  
  
                                    privileged: true  
                          - step:  
                                type: BuildAndPushDockerRegistry  
                                name: build-my-backend-service  
                                identifier: buildmybackendservice  
                                spec:  
                                    connectorRef: mydockerhubconnector  
                                    repo: <+input>  
                                    tags:  
                                        - <+pipeline.sequenceId>  
                                        - latest  
                                    optimize: true  
              variables:  
                  - name: GITHUB_USERNAME  
                    type: Secret  
                    value: msharmadgithubuname  
                  - name: APP_REPO  
                    type: String  
                    value: myBackendService  
                  - name: DOCKER_REPO  
                    type: String  
                    value: myDockerRepo  
              failureStrategies: []
```

</details>
