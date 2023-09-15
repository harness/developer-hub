---
title: Build and push artifacts and images
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
* [Build and Push to Amazon Elastic Container Registry (ECR)](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push-to-ecr-step-settings.md)
* [Build and Push to Google Container Registry (GCR)](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push-to-gcr.md)

For other upload locations, you can use a script in a [Run step](/docs/continuous-integration/use-ci/run-ci-scripts/run-step-settings.md) to build and upload the artifact. For an example, go to the [Publish to Google Artifact Registry (GAR) tutorial](/tutorials/ci-pipelines/publish/google-gar).

:::tip

You can also:

* [Build images without pushing](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-without-push.md)
* [Build multi-architecture images](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-multi-arch.md)

:::

<details>
<summary>Video: Add a Build and Push step</summary>

The following video demonstrates how to add a Build and Push step to a Harness CI pipeline.

<!-- Video:
https://harness-1.wistia.com/medias/rpv5vwzpxz-->
<docvideo src="https://www.youtube.com/embed/v3A4kF1Upqo?feature=oembed" />

<!-- div class="hd--embed" data-provider="YouTube" data-thumbnail="https://i.ytimg.com/vi/v3A4kF1Upqo/hqdefault.jpg"><iframe width="200" height="150" src="https://www.youtube.com/embed/v3A4kF1Upqo?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe></div -->

</details>

### Kubernetes cluster build infrastructures require root access

With Kubernetes cluster build infrastructures, **Build and Push** steps use [kaniko](https://github.com/GoogleContainerTools/kaniko/blob/main/README.md). Other build infrastructures use [drone-docker](https://github.com/drone-plugins/drone-docker/blob/master/README.md). Kaniko requires root access to build the Docker image. It doesn't support non-root users.

If your build runs as non-root (`runAsNonRoot: true`), and you want to run the **Build and Push** step as root, you can set **Run as User** to `0` on the **Build and Push** step to use the root user for that individual step only.

If your security policy doesn't allow running as root, go to [Build and push with non-root users](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push-nonroot.md).

## Upload Artifacts

**Upload Artifact** steps upload artifacts. These steps *don't* include build commands. You can:

* [Upload Artifacts to JFrog](/docs/continuous-integration/use-ci/build-and-upload-artifacts/upload-artifacts-to-jfrog.md)
* [Upload Artifacts to GCS](/docs/continuous-integration/use-ci/build-and-upload-artifacts/upload-artifacts-to-gcs-step-settings.md)
* [Upload Artifacts to S3](/docs/continuous-integration/use-ci/build-and-upload-artifacts/upload-artifacts-to-s-3-step-settings.md)
* [Upload Artifacts to Sonatype Nexus](/docs/continuous-integration/use-ci/build-and-upload-artifacts/upload-artifacts-to-sonatype-nexus.md)

For other upload locations, you can use a script in a [Run step](/docs/continuous-integration/use-ci/run-ci-scripts/run-step-settings.md) to upload the artifact.
