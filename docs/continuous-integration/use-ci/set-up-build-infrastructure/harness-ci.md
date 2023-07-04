---
title: Harness CI images
description: When you run a Harness CI build, the pipeline pulls the Harness CI images it needs from Docker Hub.
sidebar_position: 70
helpdocs_topic_id: 275bcj03j4
helpdocs_category_id: 4xo13zdnfx
helpdocs_is_private: false
helpdocs_is_published: true
---

When a Harness CI pipeline runs, there is an *initialize* step that automatically runs before any other steps in the stage. This step prepares the environment to run your steps, such as preparing the build infrastructure and pulling required Harness CI images from Docker Hub. You can find Harness Docker images at [https://hub.docker.com/u/harness](https://hub.docker.com/u/harness).

## CI images list

Use the following cURL command to get the Harness CI images list:

```curl
curl -X  GET https://app.harness.io/registry/_catalog
```

Here are some examples of Harness CI images and the purpose of each image. Build image tags change often.

* `harness/ci-addon`: Used to execute steps on containers in Kubernetes pods
* `harness/ci-lite-engine`: Used to orchestrate execution of steps on a Kubernetes pods
* `harness/drone-git`: Used to clone git repos
* `plugins/cache`: Used to cache files to/from S3/GCS that help to expedite builds
* `plugins/kaniko`: Used to build Docker images with the kaniko framework and push images to Docker registry out of the box
* `plugins/kaniko-ecr`: Used to build Docker images with the kaniko framework and push images to AWS ECR registry out of the box
* `plugins/kaniko-gcr`: Used to build Docker images with the kaniko framework and push images to GCP GCR registry out of the box
* `plugins/s3`: Used to upload files to AWS S3 buckets out of the box
* `plugins/gcs`: Used to upload files to GCP GCS service out of the box

## I don't want to pull images from a public repo

If you don't want the Harness Delegate to pull images from a public repo for security reasons, you can add a special **Harness Container Image Registry** connector to your Harness account. With this connector, the Delegate pulls these images from the **Harness Container Image Registry** only. For instructions on configuring this connector, go to [Connect to Harness Container Image Registry using Docker connector](/docs/platform/Connectors/Artifact-Repositories/connect-to-harness-container-image-registry-using-docker-connector).

By default, Harness uses anonymous access to [Harness Docker Hub](https://hub.docker.com/u/harness) to pull the images. If you experience rate limiting issues when pulling images, provide login information in the [Harness Container Image Registry Docker connector's authentication settings](/docs/platform/Connectors/Artifact-Repositories/connect-to-harness-container-image-registry-using-docker-connector#step-2-enter-credentials).

## CI image updates

Go to [CI build image updates](./ci-build-image-updates.md).
