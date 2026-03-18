---
title: Harness CI images
description: When you run a Harness CI build, the pipeline pulls the Harness CI images it needs from Docker Hub.
sidebar_position: 70
helpdocs_topic_id: 275bcj03j4
helpdocs_category_id: 4xo13zdnfx
helpdocs_is_private: false
helpdocs_is_published: true
---

import Dhrl from '/docs/continuous-integration/shared/docker-hub-rate-limiting-trbs.md';

When a Harness CI pipeline runs, an _initialize_ step runs automatically before any other steps in the stage. This step prepares the environment to run your steps, such as preparing the build infrastructure and pulling required Harness images from Docker Hub (the default), the [Harness project on GAR](http://us-docker.pkg.dev/gar-prod-setup/harness-public), or the [Harness ECR public gallery](https://gallery.ecr.aws/harness), depending on how you configure your accounts and pipelines to [connect to the Harness container registry](/docs/platform/connectors/artifact-repositories/connect-to-harness-container-image-registry-using-docker-connector.md).

## Harness CI images list

You can find Harness CI images on Docker Hub, the [Harness project on GAR](http://us-docker.pkg.dev/gar-prod-setup/harness-public), the [Harness ECR public gallery](https://gallery.ecr.aws/harness), or the Harness EU-GAR registry.

The following Harness CI images are available on Docker Hub, GAR, ECR, and EU-GAR. Build image tags change often.

- `harness/ci-addon`: Used to execute steps on containers in Kubernetes pods.
- `harness/ci-lite-engine`: Used to orchestrate execution of steps on Kubernetes pods.
- `harness/drone-git`: Used to clone git repos.
- `harness/harness-cache-server`: Used to cache dependencies and build artifacts.

Harness CI uses [Drone plugin images](https://console.cloud.google.com/gcr/images/gcr-prod/global/plugins) to run some operations. The following plugin images are available across all supported registries:

- `plugins/kaniko`: Used to build Docker images with kaniko and push to Docker registry for Kubernetes cluster build infrastructures.
- `plugins/kaniko-ecr`: Used to build Docker images with kaniko and push to AWS ECR for Kubernetes cluster build infrastructures.
- `plugins/kaniko-acr`: Used to build Docker images with kaniko and push to Azure ACR for Kubernetes cluster build infrastructures.
- `plugins/kaniko-gar`: Used to build Docker images with kaniko and push to Google Artifact Registry for Kubernetes cluster build infrastructures.
- `plugins/docker`: Used to build and push Docker images for Harness Cloud build infrastructures.
- `plugins/ecr`: Used to build and push Docker images to AWS ECR for Harness Cloud build infrastructures.
- `plugins/acr`: Used to build and push Docker images to Azure ACR for Harness Cloud build infrastructures.
- `plugins/gar`: Used to build and push Docker images to Google Artifact Registry for Harness Cloud build infrastructures.
- `plugins/buildx`: Used to build and push Docker images with Buildx.
- `plugins/buildx-ecr`: Used to build and push Docker images to AWS ECR with Buildx.
- `plugins/buildx-acr`: Used to build and push Docker images to Azure ACR with Buildx.
- `plugins/buildx-gar`: Used to build and push Docker images to Google Artifact Registry with Buildx.
- `plugins/cache`: Used to cache files to/from S3/GCS that help to expedite builds.
- `plugins/s3`: Used to upload files to AWS S3 buckets.
- `plugins/gcs`: Used to upload files to GCP GCS service.
- `plugins/artifactory`: Used to upload artifacts to JFrog Artifactory.
- `plugins/download-artifactory`: Used to download artifacts from JFrog Artifactory.
- `plugins/test-analysis`: Used for test intelligence and test report parsing.
- `plugins/artifact-metadata-publisher`: Used to publish artifact metadata.
- `plugins/aws-oidc`: Used for AWS OIDC-based authentication.
- `plugins/gcp-oidc`: Used for GCP OIDC-based authentication.
- `plugins/buildah-docker`: Used to build Docker images with Buildah.
- `plugins/drone-liquibase`: Used for database DevOps with Liquibase.
- `plugins/image-migration`: Used to migrate Docker images between registries.
- `plugins/email`: Used to send email notifications.
- `plugins/githubaction`: Used to run GitHub Actions in Harness CI.

If an image you need is not listed here or is unavailable on your expected registry, contact [Harness Support](https://support.harness.io/).

## Harness CI image pulls

By default, when a CI pipeline runs, the Harness Delegate uses a [Docker connector](/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference.md) to make an anonymous outbound connection to pull the Harness CI images from the public container registry where they are stored.

### I don't want to pull images anonymously

If you don't want the Harness Delegate to pull images anonymously, you can use credentialed access instead. For instructions, go to [Connect to the Harness container image registry](/docs/platform/connectors/artifact-repositories/connect-to-harness-container-image-registry-using-docker-connector).

### I don't want to pull images from a public registry

Harness CI images are stored in a public container registry. If you don't want to pull the images directly from the public registry, you can pull Harness images from your own private registry. For instructions on each of these options, go to [Connect to the Harness container image registry](/docs/platform/connectors/artifact-repositories/connect-to-harness-container-image-registry-using-docker-connector.md).

### Docker Hub rate limiting

<Dhrl />

## Harness CI image updates

Every week, based on changes, CI images are updated and listed on the [CI release notes](https://developer.harness.io/release-notes/continuous-integration/) page. We recommend maintaining a one-month window to run security scans or other tests on new CI build images before deploying them.

Harness updates `harness/ci-*` images, such as `harness/ci-addon` and `harness/ci-lite-engine`, according to the following release process:

- Harness publishes updates for all CI images weekly based on changes.
- Version numbers follow the x.y.z format, where x represents the major release number, y represents the minor release number, and z represents a hotfix or patch release number.
- You can choose to deploy the latest containers immediately upon release or download and scan them before deployment.
- If issues are found, patches will be applied to the latest version.

[Harness plugin images](https://console.cloud.google.com/gcr/images/gcr-prod/global/plugins) for SMP are updated as needed. All Harness image updates are backward-compatible. When you first deploy CI, Harness scans all `plugin` images you plan to use and addresses any vulnerabilities. After your initial deployment, Harness publishes updates to address new vulnerabilities based on our Service Level Agreement with your organization.

## Specify the Harness CI images used in your pipelines

You can use the Harness CI `execution-config` API to specify or update the Harness CI images used in your infrastructure by specifying image tags.

API key authentication is required. For more information about API keys, go to [Manage API keys](/docs/platform/automation/api/add-and-manage-api-keys). For more information about authentication, go to the [Harness API documentation](https://apidocs.harness.io/#section/Introduction/Authentication).

1. Send a `get-default-config` request to get a list of the latest Harness CI build images and tags. You can use the `infra` parameter to get `k8` images or `VM` images.

   ```json
   curl --location --request GET "https://app.harness.io/gateway/ci/execution-config/get-default-config?accountIdentifier=$YOUR_HARNESS_ACCOUNT_ID&infra=K8" \
   --header "X-API-KEY: $API_KEY"
   ```

   The response payload shows the latest supported images and their tags, for example:

   ```json
   {
     "status": "SUCCESS",
     "data": {
       "addonTag": "harness/ci-addon:1.16.92",
       "liteEngineTag": "harness/ci-lite-engine:1.16.92",
       "addonTagRootless": "harness/ci-addon:rootless-1.16.92",
       "liteEngineTagRootless": "harness/ci-lite-engine:rootless-1.16.92",
       "gitCloneTag": "harness/drone-git:1.6.9-rootless",
       "buildAndPushDockerRegistryTag": "plugins/kaniko:1.10.6",
       "buildAndPushECRTag": "plugins/kaniko-ecr:1.11.0",
       "buildAndPushACRTag": "plugins/kaniko-acr:1.11.2",
       "buildAndPushGCRTag": "plugins/kaniko-gcr:1.10.1",
       "buildAndPushGARTag": "plugins/kaniko-gar:1.11.1",
       "buildAndPushBuildxDockerRegistryTag": "plugins/buildx:1.3.3",
       "buildAndPushBuildxECRTag": "plugins/buildx-ecr:1.3.1",
       "buildAndPushBuildxGARTag": "plugins/buildx-gar:1.3.1",
       "buildAndPushBuildxACRTag": "plugins/buildx-acr:1.3.1",
       "gcsUploadTag": "plugins/gcs:1.6.3",
       "s3UploadTag": "plugins/s3:1.5.3",
       "artifactoryUploadTag": "plugins/artifactory:1.7.6",
       "cacheGCSTag": "plugins/cache:1.9.8",
       "cacheS3Tag": "plugins/cache:1.9.8",
       "cacheProxyImage": "harness/harness-cache-server:1.7.4",
       "securityTag": "harness/sto-plugin:latest",
       "sscaOrchestrationTag": "harness/ssca-plugin:0.39.0",
       "sscaEnforcementTag": "harness/ssca-plugin:0.39.0",
       "sscaArtifactSigningTag": "harness/ssca-artifact-signing-plugin:0.39.0",
       "sscaArtifactVerificationTag": "harness/ssca-artifact-signing-plugin:0.39.0",
       "sscaCdxgenOrchestrationTag": "harness/ssca-cdxgen-plugin:0.39.0",
       "provenanceTag": "harness/slsa-plugin:0.39.0",
       "slsaVerificationTag": "harness/slsa-plugin:0.39.0",
       "sscaComplianceTag": "harness/ssca-compliance-plugin:0.39.0",
       "iacmTerraform": "plugins/harness_terraform:dev",
       "iacmTerragrunt": "plugins/harness_terraform:dev",
       "iacmAnsible": "plugins/harness_terraform:dev",
       "iacmOpenTofu": "plugins/harness_terraform:dev",
       "iacmCheckov": "plugins/harness_checkov:dev",
       "iacmTFCompliance": "plugins/harness_tf_compliance:dev",
       "iacmTFLint": "plugins/harness_tf_lint:dev",
       "iacmTFSec": "plugins/harness_tf_sec:dev",
       "iacmModuleTest": "plugins/harness_terraform:dev",
       "cookieCutter": "harness/cookiecutter:latest",
       "createRepo": "harness/createrepo:latest",
       "directPush": "harness/directpush:latest",
       "registerCatalog": "harness/registercatalog:latest",
       "createCatalog": "harness/createcatalog:latest",
       "slackNotify": "harness/slacknotify:latest",
       "createOrganisation": "harness/createorganisation:latest",
       "createProject": "harness/createproject:latest",
       "createResource": "harness/createresource:latest",
       "updateCatalogProperty": "harness/updatecatalogproperty:latest"
     },
     "metaData": null,
     "correlationId": "08919155-a6d6-4bd3-8401-6b86318c85ca"
   }
   ```

2. Send a `get-customer-config` request to get the build images that your CI pipelines currently use. When `overridesOnly` is `true`, which is the default value, this endpoint returns the non-default images that your pipeline uses.

   ```json
   curl --location --request GET "https://app.harness.io/gateway/ci/execution-config/get-customer-config?accountIdentifier=$YOUR_HARNESS_ACCOUNT_ID&infra=K8&overridesOnly=true" \
   --header "X-API-KEY: $API_KEY"
   ```

   If the response contains `null`, your pipeline is using all default images, for example:

   ```json
   {
     "status": "SUCCESS",
     "data": {},
     "metaData": null,
     "correlationId": "11ce1bc8-b337-4687-9ab9-e13d553ae82f"
   }
   ```

3. Send an `update-config` (POST) request with a list of the images you want to update and the new tags to apply.

   ```json
   curl --location --request POST "https://app.harness.io/gateway/ci/execution-config/update-config?accountIdentifier=$YOUR_HARNESS_ACCOUNT_ID&infra=K8" \
   --header "X-API-KEY: $API_KEY" \
   --header 'Content-Type: application/json' \
   --data-raw '[
       {
           "field": "gitCloneTag",
           "value": "harness/drone-git:1.6.9-rootless"
       },
       {
           "field": "gcsUploadTag",
           "value": "plugins/gcs:1.6.3"
       }
   ]'
   ```

4. To reset one or more images to their defaults, send a `reset-config` (POST) request with a list of the images to reset.

   ```json
   curl --location --request POST "https://app.harness.io/gateway/ci/execution-config/reset-config?accountIdentifier=$YOUR_HARNESS_ACCOUNT_ID&infra=K8" \
   --header "X-API-KEY: $API_KEY" \
   --header 'Content-Type: application/json' \
   --data-raw '[
       {
           "field": "gitCloneTag"
       },
       {
           "field": "gcsUploadTag"
       }
   ]'
   ```

## Deprecation notice: app.harness Docker registry

Harness images are available on Docker Hub, the [Harness project on GAR](http://us-docker.pkg.dev/gar-prod-setup/harness-public), and the [Harness ECR public gallery](https://gallery.ecr.aws/harness). In a continuation of this effort, and to improve stability when pulling Harness-required images, Harness deprecated the Harness-hosted `app.harness` Docker registry effective 15 February 2024. For more information, go to [Connect to the Harness container image registry](/docs/platform/connectors/artifact-repositories/connect-to-harness-container-image-registry-using-docker-connector.md#deprecation-notice-appharness-docker-registry).

## Windows Rootless

:::info
Currently, the feature to download rootless **lite-engine**, **ci-addon**, and **drone-git** images for Windows by default is behind the feature flag, `CI_ADDON_LE_WINDOWS_ROOTLESS`. [Contact Harness Support](https://support.harness.io/) to enable this feature.

:::

Customers who are trying to utilize Windows Images with a rootless operation can do so by downloading the appropriate images. The rootless Windows version is available as of the following version, or higher:

- `harness/ci-addon:rootless-1.16.92`
- `harness/ci-lite-engine:rootless-1.16.92`
- `harness/drone-git:1.6.9-rootless`

## Troubleshoot Harness images

Go to the [CI Knowledge Base](/docs/continuous-integration/ci-articles-faqs/continuous-integration-faqs) for questions and issues related to Harness-required images and pipeline initialization, such as:

- [How do I get a list of tags available for an image in the Harness image registry?](/docs/continuous-integration/ci-articles-faqs/continuous-integration-faqs#how-do-i-get-a-list-of-tags-available-for-an-image-in-the-harness-image-registry)
- [Build failed with "failed to pull image" or "ErrImagePull"](/docs/continuous-integration/ci-articles-faqs/continuous-integration-faqs#build-failed-with-failed-to-pull-image-or-errimagepull)
- [What access does Harness use to pull the Harness internal images from the public image repo?](/docs/continuous-integration/ci-articles-faqs/continuous-integration-faqs#what-access-does-harness-use-to-pull-the-harness-internal-images-from-the-public-image-repo)
- [Can I use my own private registry to store Harness CI images?](#i-dont-want-to-pull-images-from-a-public-registry)
- [Docker Hub rate limiting](#docker-hub-rate-limiting)
