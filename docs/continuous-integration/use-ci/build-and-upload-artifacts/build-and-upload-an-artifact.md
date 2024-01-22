---
title: Build and push artifacts and images
description: There are many ways you can use Harness CI to upload artifacts.
sidebar_position: 10
helpdocs_topic_id: 8l31vtr4hi
helpdocs_category_id: mi8eo3qwxm
helpdocs_is_private: false
helpdocs_is_published: true
---

You can use Harness CI to upload artifacts, such as Docker images or test results. [Build and Push steps](#build-and-push) build your codebase and then push the resulting artifact to a container registry or cloud storage repo. [Upload Artifact steps](#upload-artifacts) upload any artifact.

## Build and Push

**Build and Push** steps build your codebase and then push the artifact to a repo. You can:

- [Build and push to Docker Hub or a Docker registry](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push-to-docker-hub-step-settings.md)
- [Build and push to Azure Container Registry (ACR)](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push-to-acr.md)
- [Build and push to Amazon Elastic Container Registry (ECR)](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push-to-ecr-step-settings.md)
- [Build and push to Google Artifact Registry (GAR)](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push-to-gar.md)
- [Build and push to Google Container Registry (GCR)](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push-to-gcr.md)
- [Build and push to GitHub Container Registry (GHCR)](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push-to-ghcr.md)
- [Build and push to a JFrog Artifactory Docker registry](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push-to-docker-jfrog.md)

For other non-Docker upload locations, you can use a script in a [Run step](/docs/continuous-integration/use-ci/run-ci-scripts/run-step-settings.md) to build and upload the artifact.

:::tip

You can also:

- [Build images without pushing](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-without-push.md)
- [Build multi-architecture images](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-multi-arch.md)

:::

<details>
<summary>Video: Add a Build and Push step</summary>

The following video demonstrates how to add a **Build and Push** step to a Harness CI pipeline.

<DocVideo src="https://www.youtube.com/embed/v3A4kF1Upqo?feature=oembed" />

</details>

### Kubernetes cluster build infrastructures require root access

With Kubernetes cluster build infrastructures, **Build and Push** steps use [kaniko](https://github.com/GoogleContainerTools/kaniko/blob/main/README.md). Other build infrastructures use [drone-docker](https://github.com/drone-plugins/drone-docker/blob/master/README.md). Kaniko requires root access to build the Docker image. It doesn't support non-root users.

If your build runs as non-root (`runAsNonRoot: true`), and you want to run the **Build and Push** step as root, you can set **Run as User** to `0` on the **Build and Push** step to use the root user for that individual step only.

If your security policy doesn't allow running as root, go to [Build and push with non-root users](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push-nonroot.md).

## Upload Artifacts

**Upload Artifact** steps upload artifacts. These steps _don't_ include build commands. You can:

- [Upload artifacts to JFrog Artifactory non-Docker registry](/docs/continuous-integration/use-ci/build-and-upload-artifacts/upload-artifacts-to-jfrog.md)
- [Upload artifacts to GCS](/docs/continuous-integration/use-ci/build-and-upload-artifacts/upload-artifacts-to-gcs-step-settings.md)
- [Upload artifacts to S3](/docs/continuous-integration/use-ci/build-and-upload-artifacts/upload-artifacts-to-s-3-step-settings.md)
- [Upload artifacts to Sonatype Nexus](/docs/continuous-integration/use-ci/build-and-upload-artifacts/upload-artifacts-to-sonatype-nexus.md)

For other upload locations, you can use a script in a [Run step](/docs/continuous-integration/use-ci/run-ci-scripts/run-step-settings.md) to upload the artifact.

## Troubleshoot building and pushing artifacts and images

Go to the [CI Knowledge Base](/kb/continuous-integration/continuous-integration-faqs) for questions and issues related to building and pushing images or uploading artifacts, such as:

* [What drives the Build and Push steps? What is kaniko?](/kb/continuous-integration/continuous-integration-faqs/#what-drives-the-build-and-push-steps-what-is-kaniko)
* [Does a kaniko build use images cached locally on the node? Can I enable caching for kaniko?](/kb/continuous-integration/continuous-integration-faqs/#does-a-kaniko-build-use-images-cached-locally-on-the-node-can-i-enable-caching-for-kaniko)
* [Can I run Build and Push steps as root if my build infrastructure runs as non-root? What if my security policy doesn't allow running as root?](/kb/continuous-integration/continuous-integration-faqs/#can-i-run-build-and-push-steps-as-root-if-my-build-infrastructure-runs-as-non-root)
* [Can I set kaniko and drone-docker runtime flags, such as skip-tls-verify or custom-dns?](/kb/continuous-integration/continuous-integration-faqs/#can-i-set-kaniko-and-drone-docker-runtime-flags-such-as-skip-tls-verify-or-custom-dns)
* [Is remote caching supported in Build and Push steps?](/kb/continuous-integration/continuous-integration-faqs/#is-remote-caching-supported-in-build-and-push-steps)
* [Build and Push to ECR step fails with error building image, failed to execute command, exec format error.](/kb/continuous-integration/continuous-integration-faqs/#build-and-push-to-ecr-step-fails-with-error-building-image-failed-to-execute-command-exec-format-error)
* [Where does the Build and Push to ECR step pull the base images specified in the Dockerfile?](/kb/continuous-integration/continuous-integration-faqs/#where-does-the-build-and-push-to-ecr-step-pull-the-base-images-specified-in-the-dockerfile)
* [Can I send artifacts by email?](/kb/continuous-integration/continuous-integration-faqs/#can-i-send-emails-from-ci-pipelines)
* [Can I run the Upload Artifacts to JFrog Artifactory step with a non-root user?](/kb/continuous-integration/continuous-integration-faqs/#can-i-run-the-upload-artifacts-to-jfrog-artifactory-step-with-a-non-root-user)
* [How do I show content on the Artifacts tab?](/kb/continuous-integration/continuous-integration-faqs/#how-do-i-show-content-on-the-artifacts-tab)
* [Does the Upload Artifacts to S3 step compress files before uploading them?](/kb/continuous-integration/continuous-integration-faqs/#does-the-upload-artifacts-to-s3-step-compress-files-before-uploading-them)
