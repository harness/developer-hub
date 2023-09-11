---
title: Build and push an artifact
description:  There are many ways you can use Harness CI to upload artifacts.
sidebar_position: 10
helpdocs_topic_id: 8l31vtr4hi
helpdocs_category_id: mi8eo3qwxm
helpdocs_is_private: false
helpdocs_is_published: true
---

You can use Harness CI to upload artifacts, such as Docker images or test results. [Build and Push steps](#build-and-push) build your codebase and then push the resulting artifact to a container registry or cloud storage repo. [Upload Artifact steps](#upload-artifacts) upload any artifact.

## Build and Push

**Build and Push** steps build your codebase and then push the artifact to a repo. You can:

* [Build and Push to Docker Hub](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push-to-docker-hub-step-settings.md)
* [Build and Push to Azure Container Registry (ACR)](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push-to-acr.md)
* [Build and Push to Google Container Registry (GCR)](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push-to-gcr.md)
* [Build and Push to Amazon Elastic Container Registry (ECR)](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push-to-ecr-step-settings.md)

For other upload locations, you can use a script in a [Run step](/docs/continuous-integration/use-ci/run-ci-scripts/run-step-settings.md) to build and upload the artifact. For an example, go to the [Publish to Google Artifact Registry (GAR) tutorial](/tutorials/ci-pipelines/publish/google-gar).

<details>
<summary>Video: Add a Build and Push step</summary>

The following video demonstrates how to add a Build and Push step to a Harness CI pipeline.

<!-- Video:
https://harness-1.wistia.com/medias/rpv5vwzpxz-->
<docvideo src="https://www.youtube.com/embed/v3A4kF1Upqo?feature=oembed" />

<!-- div class="hd--embed" data-provider="YouTube" data-thumbnail="https://i.ytimg.com/vi/v3A4kF1Upqo/hqdefault.jpg"><iframe width="200" height="150" src="https://www.youtube.com/embed/v3A4kF1Upqo?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe></div -->

</details>

<details>
<summary>Kubernetes cluster build infrastructures require root access</summary>

With Kubernetes cluster build infrastructures, **Build and Push** steps use [kaniko](https://github.com/GoogleContainerTools/kaniko/blob/main/README.md). Other build infrastructures use [drone-docker](https://github.com/drone-plugins/drone-docker/blob/master/README.md). Kaniko requires root access to build the Docker image. It doesn't support non-root users.

If your build runs as non-root (`runAsNonRoot: true`), and you want to run the **Build and Push** step as root, you can set **Run as User** to `0` on the **Build and Push** step to use the root user for that individual step only.

If your security policy doesn't allow running as root, go to [Build and push with non-root users](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push-nonroot.md).

</details>

## Upload Artifacts

**Upload Artifact** steps upload artifacts. These steps *don't* include build commands. You can:

* [Upload Artifacts to JFrog](/docs/continuous-integration/use-ci/build-and-upload-artifacts/upload-artifacts-to-jfrog.md)
* [Upload Artifacts to GCS](/docs/continuous-integration/use-ci/build-and-upload-artifacts/upload-artifacts-to-gcs-step-settings.md)
* [Upload Artifacts to S3](/docs/continuous-integration/use-ci/build-and-upload-artifacts/upload-artifacts-to-s-3-step-settings.md)
* [Upload Artifacts to Sonatype Nexus](/docs/continuous-integration/use-ci/build-and-upload-artifacts/upload-artifacts-to-sonatype-nexus.md)

For other upload locations, you can use a script in a [Run step](/docs/continuous-integration/use-ci/run-ci-scripts/run-step-settings.md) to upload the artifact.






## Useful techniques
<!-- remove after moving/creating new pages and make sure to update links -->

Here are some interesting ways you can use or enhance **Build and Push** steps.

### Use Harness expressions for tags
<!-- add to Tag setting for each step -->

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

As a more specific example, if you have a [Background step](../manage-dependencies/background-step-settings.md) in a later stage in your pipeline, you can use the `<+pipeline.sequenceId>` variable to identify the image without needing to call on a fixed value.

![](./static/build-and-upload-an-artifact-11.png)

### Build a Docker image without pushing
<!-- create separate page -->

You can use your CI pipeline to test a Dockerfile used in your codebase and verify that the resulting image is correct before you push it to your Docker repository.

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```
```mdx-code-block
<Tabs>
  <TabItem value="hosted" label="Harness Cloud, local runner, or self-hosted VM build infrastructures" default>
```

1. In your CI pipeline, go to the **Build** stage that includes the **Build and Push an image to Docker Registry** step.
2. In the **Build** stage's **Overview** tab, expand the **Advanced** section.
3. Select **Add Variable** and enter the following:
   * **Name:** `PLUGIN_DRY_RUN`
   * **Type:** **String**
   * **Value:** `true`
4. Save and run the pipeline.

```mdx-code-block
  </TabItem>
  <TabItem value="other" label="Kubernetes cluster build infrastructures">
```

With the built-in **Build and Push** steps:

1. In your CI pipeline, go to the **Build** stage that includes the **Build and Push an image to Docker Registry** step.
2. In the **Build** stage's **Overview** tab, expand the **Advanced** section.
3. Select **Add Variable** and enter the following:
   * **Name:** `PLUGIN_NO_PUSH`
   * **Type:** **String**
   * **Value:** `true`
4. Save and run the pipeline.

With the Buildah plugin (which is used to [build and push with non-root users](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push-nonroot.md)):

1. In your CI pipeline, go to the **Build** stage that includes the **Plugin** step with the Buildah plugin.
2. In the **Build** stage's **Overview** tab, expand the **Advanced** section.
3. Select **Add Variable** and enter the following:
   * **Name:** `PLUGIN_DRY_RUN`
   * **Type:** **String**
   * **Value:** `true`
4. Save and run the pipeline.

```mdx-code-block
  </TabItem>
</Tabs>
```

### Build multi-architecture images

<!-- create a separate page -->

To use a CI pipeline to build multi-architecture images, create a separate stage for building and pushing each architecture.

The following YAML example describes a multi-architecture pipeline with two stages. Both stages have similar components but they are slightly different according to the architecture of the image that the stage builds.

Each stage:

* Uses a variation of a Kubernetes cluster build infrastructure.
* Has a **Run** step that prepares the DockerFile.
* Has a **Build and Push** step that builds and uploads the image.

<details>
<summary>YAML example: Multi-arch image pipeline</summary>


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
                    connectorRef: CI_Docker_Hub
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
                    connectorRef: my-docker-hub
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
                    connectorRef: CI_Docker_Hub
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
                    connectorRef: my-docker-hub
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

### Set kaniko runtime flags

<!-- add to all build and push pages that allow K8s cluster infra -->

With Kubernetes cluster build infrastructures, **Build and Push** steps use [kaniko](https://github.com/GoogleContainerTools/kaniko/blob/main/README.md). Other build infrastructures use [drone-docker](https://github.com/drone-plugins/drone-docker/blob/master/README.md).

You can set kaniko runtime flags by adding [stage variables](/docs/platform/pipelines/add-a-stage/#option-stage-variables) formatted as `PLUGIN_FLAG_NAME`. For example, to set `--skip-tls-verify`, you would add a stage variable named `PLUGIN_SKIP_TLS_VERIFY` and set the variable value to `true`.

```yaml
        variables:
          - name: PLUGIN_SKIP_TLS_VERIFY
            type: String
            description: ""
            required: false
            value: "true"
```
