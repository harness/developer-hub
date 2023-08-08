---
title: Harness CI images
description: When you run a Harness CI build, the pipeline pulls the Harness CI images it needs from Docker Hub.
sidebar_position: 70
helpdocs_topic_id: 275bcj03j4
helpdocs_category_id: 4xo13zdnfx
helpdocs_is_private: false
helpdocs_is_published: true
---

When a Harness CI pipeline runs, there is an *initialize* step that automatically runs before any other steps in the stage. This step prepares the environment to run your steps, such as preparing the build infrastructure and pulling required [Harness images from Docker Hub](https://hub.docker.com/u/harness).

:::info

Harness CI images are not the same as [pre-built public images](./public-docker-images.md). Harness CI images are essential images used by Harness to run CI pipelines. Pre-built public images are extended versions of official Docker images that you can optionally use to quickly set up a specific build environment.

:::

## CI images list

Use the following cURL command to get the Harness CI images list:

```curl
curl -X  GET https://app.harness.io/registry/_catalog
```

Here are some examples of Harness CI images and the purpose of each image. Build image tags change often.

* `harness/ci-addon`: Used to execute steps on containers in Kubernetes pods
* `harness/ci-lite-engine`: Used to orchestrate execution of steps on Kubernetes pods
* `harness/drone-git`: Used to clone git repos
* `plugins/cache`: Used to cache files to/from S3/GCS that help to expedite builds
* `plugins/kaniko`: Used to build Docker images with the kaniko framework and push images to Docker registry out of the box for Kubernetes cluster build infrastructures.
* `plugins/kaniko-ecr`: Used to build Docker images with the kaniko framework and push images to AWS ECR registry out of the box for Kubernetes cluster build infrastructures.
* `plugins/kaniko-gcr`: Used to build Docker images with the kaniko framework and push images to GCP GCR registry out of the box for Kubernetes cluster build infrastructures.
* `plugins/s3`: Used to upload files to AWS S3 buckets out of the box
* `plugins/gcs`: Used to upload files to GCP GCS service out of the box

## I don't want to pull images from a public repo

If you don't want the Harness Delegate to pull images from a public repo for security reasons, you can add a special **Harness Container Image Registry** connector to your Harness account. With this connector, the Delegate pulls these images from the **Harness Container Image Registry** only. For instructions on configuring this connector, go to [Connect to Harness Container Image Registry using Docker connector](/docs/platform/Connectors/Artifact-Repositories/connect-to-harness-container-image-registry-using-docker-connector).

By default, Harness uses anonymous access to [Harness Docker Hub](https://hub.docker.com/u/harness) to pull the images. If you experience rate limiting issues when pulling images, provide login information in the [Harness Container Image Registry Docker connector's authentication settings](/docs/platform/Connectors/Artifact-Repositories/connect-to-harness-container-image-registry-using-docker-connector#step-2-enter-credentials).

## CI image updates

Your organization has a one-month window to run security scans or other tests on new CI build images before you deploy them. Every two weeks, Harness publishes new versions of images required to run CI builds. Each image is backwards-compatible with the previous two releases.

### Image update release processes

Harness updates `harness/ci-*` images, such as `harness/ci-addon` and `harness/ci-lite-engine`, according to the following release process:

* Harness publishes updates for all CI images on the second and fourth Monday of each month.
* Version numbers use an `x.y.z` format where `x` indicates the major release number, `y` indicates the minor release number, and `z` indicates a hotfix or patch release number.
* All images are supported for the latest three releases: `latest`, `latest-1`, and `latest-2`. Each image release is backward-compatible with the previous two releases.
* You can choose to deploy the latest containers immediately upon release, or you can download and scan them before deployment.
* If your builds use containers that are more than two releases old, the Harness UI shows a warning that the image versions are no longer supported. Builds won't fail automatically.
* If a hotfix or security fix is required for a specific image, Harness creates hotfixes for the latest three images and notifies customers when these hotfixes are available.

Drone images are updated as needed. All Drone image updates are backward-compatible. When you first deploy CI, Harness scans all `plugin` images you plan to use and addresses any vulnerabilities. After your initial deployment, Harness publishes updates to address new vulnerabilities based on our Service Level Agreement with your organization.

### Update the images used in your pipelines

You can use the Harness CI `execution-config` API to update the images used in your infrastructure.

:::info Authentication

You can use either `X-API-KEY: $API_KEY` or `Authorization: Bearer $token` for authentication. For more information, go to [Add and manage API keys](/docs/platform/User-Management/add-and-manage-api-keys).

:::

1. Send a `get-default-config` request to get a list of the latest Harness CI build images and tags. You can use the `infra` parameter to get `k8` images or `VM` images.

   ```
   curl --location --request GET "https://app.harness.io/gateway/ci/execution-config/get-default-config?accountIdentifier=$ACCOUNT_ID&infra=K8" --header 'X-API-KEY: $API_KEY'
   ```

   The response payload shows the latest supported images and their tags, for example:

   ```
   {
    "status": "SUCCESS",
     "data": {
       "addonTag": "harness/ci-addon:1.14.4",
       "liteEngineTag": "harness/ci-lite-engine:1.14.4",
       "gitCloneTag": "harness/drone-git:1.1.0-rootless",
       "buildAndPushDockerRegistryTag": "plugins/kaniko:1.3.1",
       "buildAndPushECRTag": "plugins/kaniko-ecr:1.3.1",
       "buildAndPushGCRTag": "plugins/kaniko-gcr:1.3.1",
       "gcsUploadTag": "plugins/gcs:1.2.6",
       "s3UploadTag": "plugins/s3:1.0.5",
       "artifactoryUploadTag": "plugins/artifactory:1.0.6",
       "cacheGCSTag": "plugins/cache:1.3.8",
       "cacheS3Tag": "plugins/cache:1.3.8",
       "securityTag": "harness/sto-plugin:latest"
     },
     "metaData": null,
     "correlationId": "08919155-a6d6-4bd3-8401-6b86318c85ca"
   }
   ```

2. Send a `get-customer-config` request to get the build images that your CI pipelines currently use. When `overridesOnly` is `true`, which is the default value, this endpoint returns the non-default images that your pipeline uses.

   ```
   curl --location --request GET "https://app.harness.io/gateway/ci/execution-config/get-customer-config?accountIdentifier=$ACCOUNT_ID&infra=K8&overridesOnly=true" --header 'X-API-KEY: $API_KEY'
   ```

   If the response contains `null`, your pipeline is using all default images, for example:

   ```
   {
       "status": "SUCCESS",
       "data": {},
       "metaData": null,
       "correlationId": "11ce1bc8-b337-4687-9ab9-e13d553ae82f"
   }
   ```

3. Send an `update-config` (POST) request with a list of the images you want to update and the new tags to apply.

   ```
   curl --location --request POST "https://app.harness.io/gateway/ci/execution-config/update-config?accountIdentifier=$ACCOUNT_ID&infra=K8" --header 'X-API-KEY: $API_KEY' --header 'Content-Type: application/json'
   --data-raw '[
       {
           "field": "gitCloneTag",
           "value": "harness/drone-git:1.0.9-rootless
       },
       {
           "field": "gcsUploadTag",
           "value": "plugins/gcs:1.3.0"
       }
   ]'
   ```

4. To reset one or more images to their defaults, send a `reset-config` (POST) request with a list of the images to reset.

   ```
   curl --location --request POST "https://app.harness.io/gateway/ci/execution-config/reset-config?accountIdentifier=$ACCOUNT_ID&infra=K8" --header 'X-API-KEY: $API_KEY' --header 'Content-Type: application/json'
   --data-raw '[
       {
           "field": "gitCloneTag"
       },
       {
           "field": "gcsUploadTag"
       }
   ]'
   ```
