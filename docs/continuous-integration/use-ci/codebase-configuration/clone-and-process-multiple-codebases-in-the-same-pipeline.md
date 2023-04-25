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

This topic assumes you are familiar with [Harness CI concepts](../../ci-quickstarts/ci-concepts.md) and the general [pipeline creation process](../prep-ci-pipeline-components.md).

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

## Add a Git Clone step

Add a **Git Clone** step to clone a second repo into the pipeline's workspace.

1. On the **Execution** tab, select **Add step**, select **Add step** again, and then select **Git Clone** from the step library.
2. Enter a **Name** and optional **Description**.
3. For **Connector**, select or create a [code repo connector](./create-and-configure-a-codebase.md#code-repo-connectors) for your second code repo.
4. If **Repository Name** is not automatically populated, enter the second code repo's name.
5. For **Build Type**, select **Git Branch** if you want the step to clone code from a specific branch with in the repo, or select **Git Tag** if you want the step to clone code from a specific commit tag. Based on your selection, specify a **Branch Name** or **Tag Name**.
6. Populate other fields as desired. For example, use **Clone Directory** to clone the code repo to a specific location in the workspace. For information about all **Git Clone** step settings, go to the [Git Clone step settings reference](./ci-git-clone-step.md).
7. Select **Apply Changes** to save the step, and then select **Save** to save the pipeline.

## Build an artifact from both code repos

Now that the files from both repos will be cloned into a common workspace, you can add a step to build an artifact using code from both repos, such as a [Build and Push an image to Docker Registry step](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push-to-docker-hub-step-settings).

Pay attention to settings like the [Dockerfile setting](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push-to-docker-hub-step-settings#dockerfile) that assume files are located at the codebase's root directory if not otherwise specified. Depending on the default codebase, you might need to specify a non-root path for build files.

You can also use, for example, a `cp` command in a [Run step](/docs/continuous-integration/use-ci/run-ci-scripts/run-step-settings) to move cloned files around the workspace before building an artifact.

## YAML example

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

## Option: Use a Run step

As an alternative to the **Git Clone** step, you can use scripts in **Run** steps to clone multiple repos into a stage.

You might want to define [stage variables](../set-up-build-infrastructure/ci-stage-settings.md#advanced-stage-variables) for the names and URLs of the codebases that you clone into the workspace. These variables are accessible across all steps in the stage.

Depending on the image you use for the **Run** step, you might need to install Git before you clone any repos. For example, you could use this code in a **Run** step to install git, verify that it's working, and clone the repo with the Dockerfile needed to build an image. This example uses stage variables for the GitHub usenrame and Docker repo.

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
