---
title: Harness CI images list
description: When you run a Harness CI build, the pipeline pulls the Harness CI images it needs from DockerHub.
sidebar_position: 200
helpdocs_topic_id: 275bcj03j4
helpdocs_category_id: 4xo13zdnfx
helpdocs_is_private: false
helpdocs_is_published: true
---

When you run a Harness CI build, the pipeline pulls the Harness CI images it needs from DockerHub. You can find these images at [https://hub.docker.com/u/harness](https://hub.docker.com/u/harness).

If you don't want the Harness Delegate to pull images from a public repo for security reasons, you can add a special **Harness Container Image Registry** connector to your Harness account. With this connector, the Delegate pulls these images from the **Harness Container Image Registry** only. For instructions on configuring this connector, go to [Connect to Harness Container Image Registry using Docker connector](../../platform/7_Connectors/connect-to-harness-container-image-registry-using-docker-connector.md).

By default, Harness uses anonymous access to [Harness DockerHub](https://hub.docker.com/u/harness) to pull the images. If you experience rate limiting issues when pulling images, provide login information in the [Harness Container Image Registry Docker connector's authentication settings](https://developer.harness.io/docs/platform/Connectors/connect-to-harness-container-image-registry-using-docker-connector#step-2-enter-credentials).

### View the CI images list

Use the following command to get the Harness CI images list:

```
curl -X  GET https://app.harness.io/registry/_catalog
```

### Example: CI images list

Here is an example of the Harness CI images list and the purpose of each image:

* `harness/ci-addon`: Used to execute steps on containers in Kubernetes pods
* `harness/ci-lite-engine`: Used to orchestrate execution of steps on a Kubernetes pods
* `harness/drone-git`: Used to clone git repos
* `plugins/cache`: Used to cache files to/from S3/GCS that help to expedite builds
* `plugins/kaniko`: Used to build Docker images with the kaniko framework and push images to Docker registry out of the box
* `plugins/kaniko-ecr`: Used to build Docker images with the kaniko framework and push images to AWS ECR registry out of the box
* `plugins/kaniko-gcr`: Used to build Docker images with the kaniko framework and push images to GCP GCR registry out of the box
* `plugins/s3`: Used to upload files to AWS S3 buckets out of the box
* `plugins/gcs`: Used to upload files to GCP GCS service out of the box

The tags for these images change often.