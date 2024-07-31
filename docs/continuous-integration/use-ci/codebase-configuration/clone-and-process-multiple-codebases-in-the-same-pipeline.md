---
title: Clone multiple code repos in one pipeline
description: Use Git Clone steps to clone additional code repos into a pipeline's workspace.
sidebar_position: 20
helpdocs_topic_id: k8tz6mtiut
helpdocs_category_id: 7ljl8n7mzn
helpdocs_is_private: false
helpdocs_is_published: true
---


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


In addition to the pipeline's default [codebase](./create-and-configure-a-codebase.md), you can use **Git Clone** step to clone additional code repos into the pipeline's workspace.

For example, you can use this to:

* Build multiple artifacts in the same pipeline. Suppose you use Packer and Ansible to build artifacts automatically, and you have separate repositories for Packer, Ansible, and code. You can clone all three repositories into the pipeline's workspace.
* Pull code from separate code and build repositories. For instance, if your code files are in a repository managed by the Engineering team and your Dockerfiles are in a different repository managed by the Security team, you can clone both repositories into the pipeline's workspace.
* Clone codebases without using the built-in clone codebase function.

## Add a Git Clone step

Assume the [default codebase](./create-and-configure-a-codebase#configure-the-default-codebase) is a repo that contains app code files, and the Dockerfile necessary to build the app image is in a different repo. You can use [Git Clone](./git-clone-step) step to clone the second repo into the workspace, or fetch spricifc files/directories. Then, you can use a [Build and Push](../../../category/build-and-push) step to build and push an image using files from both repos.


<Tabs>
  <TabItem value="gitclone" label="Add a Git Clone step" default>


Add a **Git Clone** step to clone a second repo into the pipeline's workspace.

```yaml
    - step:
        type: GitClone
        name: clone second repo
        identifier: clone_second_repo
        spec:
          connectorRef: account.git
          repoName: myOrg/mySecondRepo
          build:
            type: branch
            spec:
              branch: main
```

For details, visit the [git clone step](./git-clone-step) page.

## Add a Run step

You can use `git` commands in [Run steps](../run-step-settings.md) to clone multiple repos into a stage. You can also provide arguments to clone subdirectories, clone recursively, and so on.

For example, this step clones a GitHub repository.

```yaml
              - step:
                  type: Run
                  identifier: clone
                  name: clone
                  spec:
                    shell: Sh
                    command: |-
                      git clone https://GH_PERSONAL_ACCESS_TOKEN@github.com/ACCOUNT_NAME/REPO_NAME.git
```

To use this command, you would replace:

* `ACCOUNT_NAME` with your GitHub account name.
* `REPO_NAME` with the name of the GitHub repo to clone.
* `PERSONAL_ACCESS_TOKEN` with a [GitHub personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) that has pull permissions to the target repository. Additional permissions may be necessary depending on the Action's purpose. Store the token as a [Harness secret](/docs/category/secrets) and use a variable expression, such as `<+secrets.getValue("YOUR_TOKEN_SECRET")>`, to call it.

For details about the **Run** step settings, check out the **Run scripts** tab under the [Run step settings](../run-step-settings.md) page.


</TabItem>
</Tabs>

:::tip

When cloning additional codebases that use the same credentials as your default codebase, you can [use your default codebase connector's credentials in your Run step](/kb/continuous-integration/articles/Using_Git_Credentials_from_Codebase_Connector_in_CI_Pipelines_Run_Step).

:::

## Build an artifact from both code repos

Now that the files from both repos will be cloned into a common workspace, you can add a step to build an image using code from both repos, such as a [Build and Push to Docker step](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push/build-and-push-to-docker-registry).

Pay attention to settings like the [Dockerfile setting](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push/build-and-push-to-docker-registry/#dockerfile) that assume files are located at the codebase's root directory if not otherwise specified. This is because the pipeline's default codebase files are cloned in the root folder (`/harness`), while other codebase files are cloned into subfolders.

Depending on the default codebase, you might need to specify a non-root path for build files. You can also use commands, such as `cp`, in [Run steps](/docs/continuous-integration/use-ci/run-step-settings) to move cloned files around the workspace before building the image.

## YAML examples


<Tabs>
  <TabItem value="clone" label="Example with Git Clone step" default>


The following YAML example describes a pipeline that clones two code repos, one as the default codebase (`cloneCodebase: true`) and the second in the `GitClone` step.

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


</TabItem>
  <TabItem value="run" label="Example with Run step">


This example clones app code as the [default codebase](#configure-the-default-codebase) and then uses a **Run** step to clone a separate repo that has the Dockerfile necessary to build the app.

Due to the build infrastructure and the `image` used for the **Run** step, it is necessary to install Git before cloning the additional repo. The **Run** step uses the following commands to install Git, verify that it's working, and then clone the repo that has the Dockerfile needed to build the app.

```
apk add git
git --version
git clone https://github.com/$GITHUB_USERNAME/$DOCKERFILE_REPO_NAME
```

This example also uses [stage variables](../set-up-build-infrastructure/ci-stage-settings.md#advanced-stage-variables), such as `$GITHUB_USERNAME` to reference account and repo names. These variables are accessible across all steps in the stage.

```yaml
    stages:
        - stage:
              name: Build Test and Push
              identifier: Build_Test_and_Push
              type: CI
              spec:
                  cloneCodebase: true
                  infrastructure:
                      type: KubernetesDirect
                      spec:
                          connectorRef: YOUR_KUBERNETES_CLUSTER_CONNECTOR_ID
                          namespace: YOUR_NAMESPACE
                          automountServiceAccountToken: true
                  execution:
                      steps:
                          - step:
                                type: Run
                                name: git-clone-and-copy-dockerfile
                                identifier: git-clone-and-copy-dockerfile
                                spec:
                                    connectorRef: account.harnessImage
                                    image: alpine:latest
                                    shell: Sh
                                    command: |+
                                        # This stage clones the default codebase, which copies all app files and folders to the stage workspace.
                                        # To build the image, the pipeline needs to clone the repo with the Dockerfile
                                        # And then copy the Dockerfile to the current folder.

                                        apk add git
                                        git --version
                                        git clone https://github.com/$GITHUB_USERNAME/$DOCKERFILE_REPO

                                        # We now have Docker repo at the current folder:

                                        find .

                                        # Copy Dockerfile to current folder, where the Docker Build step can find it:

                                        cp $DOCKER_REPO/$APP_REPO/Dockerfile .
                                    privileged: true
                          - step:
                                type: BuildAndPushDockerRegistry
                                name: build-my-backend-service
                                identifier: buildmybackendservice
                                spec:
                                    connectorRef: YOUR_DOCKER_CONNECTOR_ID
                                    repo: <+input>
                                    tags:
                                        - <+pipeline.sequenceId>
                                        - latest
                                    optimize: true
              variables:
                  - name: GITHUB_USERNAME
                    type: Secret
                    value: myGitHubAccount
                  - name: APP_REPO
                    type: String
                    value: myCodeRepo
                  - name: DOCKERFILE_REPO
                    type: String
                    value: myGitHubRepo
              failureStrategies: []
```


</TabItem>
</Tabs>

## Use a Plugin step

As an alternative to the **Git Clone** and **Run** steps, you can clone a codebase by running the [Git Drone plugin](https://plugins.drone.io/plugins/git) in a [Plugin step](../use-drone-plugins/run-a-drone-plugin-in-ci.md).
