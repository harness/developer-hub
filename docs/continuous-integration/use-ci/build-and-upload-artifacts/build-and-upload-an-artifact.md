---
title: Build and push an artifact
description: Add a Build and Push step to build and push an artifact to a repo.
sidebar_position: 20
helpdocs_topic_id: 8l31vtr4hi
helpdocs_category_id: mi8eo3qwxm
helpdocs_is_private: false
helpdocs_is_published: true
---

Add a **Build and Push** step to your CI pipeline to build your codebase and then push the artifact to a repo. The following repos are supported:

* Docker
* Azure Container Registry (ACR)
* Google Container Registry (GCR)
* Amazon Elastic Container Registry (ECR)

This topic describes a simple one-step build workflow that does not include testing. It builds the code in a build farm, and then pushes it to a repo.

For details about various **Build and Push** step settings, go to the [CI technical reference](/docs/category/ci-technical-reference).

For a visual overview of this process, watch the following video:

<!-- Video:
https://harness-1.wistia.com/medias/rpv5vwzpxz-->
<docvideo src="https://www.youtube.com/embed/v3A4kF1Upqo?feature=oembed" />

<!-- div class="hd--embed" data-provider="YouTube" data-thumbnail="https://i.ytimg.com/vi/v3A4kF1Upqo/hqdefault.jpg"><iframe width="200" height="150" src="https://www.youtube.com/embed/v3A4kF1Upqo?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe></div -->

## Before you begin

You should have an understanding of the following:

* Harness' [key concepts](../../../getting-started/learn-harness-key-concepts.md).
* How to [set up build infrastructure](/docs/category/set-up-build-infrastructure).
* How to create pipelines. If you haven't created a pipeline before, try one of the following tutorials:
  * [Build and test on a Kubernetes cluster build infrastructure](/tutorials/build-code/ci-tutorial-kubernetes-cluster-build-infra).
  * [Get started for free with the fastest CI on the planet](https://developer.harness.io/tutorials/build-code/fastest-ci).
* [CI stage settings](../../ci-technical-reference/ci-stage-settings.md).

## Add the Build and Push step

1. Go to **Pipelines** and create a new pipeline or edit an existing pipeline.
1. Configure the pipeline's codebase, if you have not already done so. For details, go to [Create and configure a codebase](../codebase-configuration/create-and-configure-a-codebase.md).

:::tip

The codebase configuration specifies the repo to use for this pipeline. When you run the pipeline, you specify the specific branch or commit to use for that build.

:::

2. If your pipeline doesn't already have a **Build** stage, select **Add Stage**, and then select **Build**.
3. On the **Build** stage's **Infrastructure** tab, configure the build infrastructure. For example, you can [Define a Kubernetes cluster build infrastructure](../set-up-build-infrastructure/set-up-a-kubernetes-cluster-build-infrastructure.md).
4. In the **Build** stage's **Execution** tab, select **Add Step**, select **Add Step** again, and then select a **Build and Push** step from the Step Library.

For all Build and Push steps, you select or create a connector for the target repo, add repo-specific information, and specify Dockerfile information. For information about each **Build and Push** step's settings, go to the reference topic that corresponds with your registry provider:

* Docker: [Build and Push an image to Docker registry step settings](../../ci-technical-reference/build-and-push-to-docker-hub-step-settings.md)
* Azure Container Registry (ACR): [Build and Push to ACR step settings](../../ci-technical-reference/build-and-push-to-acr-step-settings.md) or [Build and Push an image to Docker registry step settings](../../ci-technical-reference/build-and-push-to-docker-hub-step-settings.md)
* Google Container Registry (GCR): [Build and Push to GCR step settings](../../ci-technical-reference/build-and-push-to-gcr-step-settings.md)
* Amazon Elastic Container Registry (ECR): [Build and Push to ECR step settings](../../ci-technical-reference/build-and-push-to-ecr-step-settings.md)

6. Select **Apply Changes** to save the step, and then select **Save** to save the pipeline.

## Run the pipeline

Select **Run Pipeline** to run your pipeline. Depending on your pipeline's codebase configuration, you may need to select a Git branch or tag to use for the build.

![](./static/build-and-upload-an-artifact-13.png)

While the build runs, you can monitor the **Build and Push** step logs. For example, these are the logs for a step that pushed to a Docker repo:

```
/kaniko/executor --dockerfile=Dockerfile --context=dir://. --destination=cretzman/ciquickstart:13
Retrieving image manifest alpine:3.12
Retrieving image alpine:3.12
Retrieving image manifest alpine:3.12
Retrieving image alpine:3.12
Built cross stage deps: map[]
Retrieving image manifest alpine:3.12
Retrieving image alpine:3.12
Retrieving image manifest alpine:3.12
Retrieving image alpine:3.12
Executing 0 build triggers
Unpacking rootfs as cmd ADD go-sample-app /bin/ requires it.
LABEL maintainer="John Doe <john.doe@example.com>"
Applying label maintainer=John Doe <john.doe@example.com>
Using files from context: [/step-exec/workspace/go-sample-app]
ADD go-sample-app /bin/
Taking snapshot of files...
ENTRYPOINT ["/bin/go-sample-app"]
```

If the build succeeds, you can find the pushed image in your image repo:

![](./static/build-and-upload-an-artifact-14.png)

The build is also listed in your Harness project's **Builds**.

## Useful techniques

Here are some interesting ways you can use or enhance **Build and Push** steps.

<details>
<summary>Use Harness expressions for tags</summary>

When you push an image to a repo, you tag the image so you can identify it later. For example, in one pipeline stage, you push the image, and, in a later stage, you use the image name and tag to pull it and run integration tests on it.

There are several ways to tag images, but Harness expressions can be useful.

![](./static/build-and-upload-an-artifact-10.png)

For example, `<+pipeline.sequenceId>` is a built-in Harness expression that represents the **Build Id** number, for example `9`.

After the pipeline runs, you can see the `Build Id` in the output.

![](./static/build-and-upload-an-artifact-15.png)

The ID also appears as an image tag in your target image repo:

![](./static/build-and-upload-an-artifact-12.png)

The `Build Id` tags an image that you pushed in an earlier stage of your pipeline. You can use the `Build Id` to pull the same image in later stages of the same pipeline. By using a variable expression, rather than a fixed value, you don't have to use the same image name every time.

For example, you can use the `<+pipeline.sequenceId>` expression as a variable tag to reference images in future pipeline stages by using syntax such as: `harnessdev/ciquickstart:<+pipeline.sequenceId>`.

As a more specific example, if you have a [Background step](../../ci-technical-reference/background-step-settings.md) in a later stage in your pipeline, you can use the `<+pipeline.sequenceId>` variable to identify the image without needing to call on a fixed value.

![](./static/build-and-upload-an-artifact-11.png)

</details>

<details>
<summary>Build a Docker image without pushing</summary>

You can use your CI pipeline to test a Dockerfile used in your codebase and verify that the resulting image is correct before you push it to your Docker repository.

1. In your CI pipeline, go to the **Build** stage that includes the **Build and Push an image to Docker Registry** step.
2. In the **Build** stage's **Overview** tab, expand the **Advanced** section.
3. Click **Add Variable** and enter the following:
	1. Name: **PLUGIN\_NO\_PUSH**
	2. Type: **String**
	3. Value: **true**
4. Save and run the pipeline.

</details>

<details>
<summary>Build multi-architecture images</summary>

To use a CI pipeline to build multi-architecture images, create a stage for each architecture. Here is a YAML example of a mulit-architecture pipeline:

```yaml
pipeline:
  allowStageExecutions: true
  projectIdentifier: my-project
  orgIdentifier: default
  tags:
    CI: ""
  properties:
    ci:
      codebase:
        connectorRef: CI_GitHub
        repoName: Automation.git
        build: <+input>
  stages:
    - stage:
        name: K8
        identifier: upload
        type: CI
        spec:
          cloneCodebase: true
          infrastructure:
            type: KubernetesDirect
            spec:
              connectorRef: K8Linux
              namespace: <+input>
              runAsUser: ""
              automountServiceAccountToken: true
              nodeSelector: {}
              containerSecurityContext:
                runAsUser: ""
              os: Linux
          execution:
            steps:
              - step:
                  type: Run
                  name: CreateDockerFile
                  identifier: CreateDockerFile
                  spec:
                    connectorRef: CI_DockerHub
                    image: alpine:latest
                    command: |-
                      touch harnessDockerfileui
                      cat > harnessDockerfileui <<- EOM
                      FROM alpine:latest AS dev-env
                      ARG foo
                      RUN echo "$foo bar"
                      ENTRYPOINT ["pwd"]

                      FROM alpine:latest AS release-env
                      ARG hello
                      RUN echo "$hello world"
                      ENTRYPOINT ["ls"]
                      EOM
                      cat harnessDockerfileui
                    resources:
                      limits:
                        memory: 100M
              - step:
                  type: BuildAndPushDockerRegistry
                  name: DockerPushStep
                  identifier: DockerPushStep
                  spec:
                    connectorRef: my-dockerhub
                    repo: my-repo/ciquickstart
                    tags:
                      - "1.0"
                    dockerfile: harnessDockerfileui
                    target: dev-env
                    resources:
                      limits:
                        memory: 100M
        variables: []
    - stage:
        name: K8s Linux arm
        identifier: CI_Golden_ARM
        type: CI
        spec:
          cloneCodebase: true
          infrastructure:
            type: KubernetesDirect
            spec:
              connectorRef: k8sarm
              namespace: ci-gold-arm-delegate
              automountServiceAccountToken: true
              tolerations:
                - effect: NoSchedule
                  key: kubernetes.io/arch
                  operator: Equal
                  value: arm64
              nodeSelector:
                kubernetes.io/arch: arm64
              os: Linux
          execution:
            steps:
              - step:
                  type: Run
                  name: CreateDockerFile
                  identifier: CreateDockerFile
                  spec:
                    connectorRef: CI_DockerHub
                    image: alpine:latest
                    command: |-
                      touch harnessDockerfileui
                      cat > harnessDockerfileui <<- EOM
                      FROM alpine:latest AS dev-env
                      ARG foo
                      RUN echo "$foo bar"
                      ENTRYPOINT ["pwd"]

                      FROM alpine:latest AS release-env
                      ARG hello
                      RUN echo "$hello world"
                      ENTRYPOINT ["ls"]
                      EOM
                      cat harnessDockerfileui
                    resources:
                      limits:
                        memory: 100M
              - step:
                  type: BuildAndPushDockerRegistry
                  name: DockerPushStep
                  identifier: DockerPushStep
                  spec:
                    connectorRef: my-dockerhub
                    repo: my-repo/ciquickstart
                    tags:
                      - "1.0"
                    dockerfile: harnessDockerfileui
                    target: dev-env
                    resources:
                      limits:
                        memory: 100M
        variables: []
  variables: []
  identifier: CI_MultiArch
  name: CI_MultiArch
```

</details>

## YAML example

Here's a YAML example for a CI pipeline that has a **Build** stage with a **Build and Push** step:

```yaml
pipeline:
  name: CI Quickstart
  identifier: CI_Quickstart
  properties:
    ci:
      codebase:
        connectorRef: account.CI_Quickstart
        repoName: goHelloWorldServer
        build: <+input>
  stages:
    - stage:
        name: Build Test and Push
        identifier: Build_Test_and_Push
        type: CI
        spec:
          cloneCodebase: true
          execution:
            steps:
              - step:
                  type: BuildAndPushDockerRegistry
                  name: Build and push image to DockerHub
                  identifier: Build_and_push_image_to_DockerHub
                  spec:
                    connectorRef: account.Docker_Quickstart
                    repo: cretzman/ciquickstart
                    tags:
                      - <+pipeline.sequenceId>
          infrastructure:
            type: KubernetesDirect
            spec:
              connectorRef: account.cidelegate
              namespace: harness-delegate-uat
          serviceDependencies: []
  projectIdentifier: CI_Quickstart
  orgIdentifier: default
```

## See also

* [Run step settings](../../ci-technical-reference/run-step-settings.md)
