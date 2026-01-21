---
title: Harness DB DevOps Images
description: Learn about the container images used in Harness DB DevOps and how to configure image versions and updates securely and efficiently.
sidebar_label: DB DevOps Images
sidebar_position: 21
keywords:
  - db devops images
  - harness container images
  - image configuration
  - docker images
  - harness dbops
  - update db devops image
  - image versioning
  - database devops container
  - dbops deployment image
  - dbops infrastructure
tags:
  - harness-db-devops
  - container-images
  - image-configuration
  - devops-infrastructure
  - dbops-deployment
---

Harness publishes `plugins/drone-liquibase` with `x.y.z-{liquibaseVersion}`, where `x.y.z` follows Harness semantic versioning.

## Harness DB DevOps Images List

Here are some examples of Harness DB Devops images and their purposes:

* `plugins/download-artifactory`: Used for downloading artifacts from Artifactory.
* `plugins/drone-liquibase:x.y.z-{liquibaseVersion}`: Default Liquibase plugin for database operations.
* `harness/drone-git`: Used to clone Git repositories.
* `plugins/drone-liquibase:x.y.z-{liquibaseVersion}-mongo`: Liquibase plugin for MongoDB.
* `plugins/drone-liquibase:x.y.z-{liquibaseVersion}-spanner`: Liquibase plugin for Google Spanner.

For complete and latest list of images and their tags, refer to the [Release Notes](http://developer.harness.io/release-notes/database-devops).

## Configure Harness DB Devops Image Versions

By default, Harness uses predefined images. Customers can override these defaults using API endpoints.

### Get Default Configurations

Retrieve the latest default Harness DB Devops image versions:

```sh
curl -i -X GET \
https://app.harness.io/v1/dbops/execution-config/get-default-config \ 
-H "Harness-Account: $YOUR_HARNESS_ACCOUNT_ID" \ 
-H "X-API-KEY: $API_KEY"
```

Response:

```json
{
  "artifactoryTag": "plugins/download-artifactory:1.0.0",
  "defaultTag": "plugins/drone-liquibase:1.18.0-4.33",
  "gitCloneTag": "harness/drone-git:1.6.4-rootless",
  "mongoTag": "plugins/drone-liquibase:1.18.0-4.33-mongo",
  "spannerTag": "plugins/drone-liquibase:1.18.0-4.33-spanner"
}
```

### Get Customer-Specific Overrides

Send a get-customer-config request to get the build images that your DB DevOps pipelines currently use. When overridesOnly is true, which is the default value, this endpoint returns the non-default images that your pipeline uses.

```sh
curl -i -X GET \                                                        
'https://app.harness.io/v1/dbops/execution-config/get-customer-config?overridesOnly=true' \
-H "Harness-Account: $YOUR_HARNESS_ACCOUNT_ID" 
-H "X-API-KEY: $API_KEY"
```

### Update Image Configuration

Override the default image versions with a new tag:

```sh
curl -i -X POST \
https://app.harness.io/v1/dbops/execution-config/update-config \
--header "Harness-Account: $YOUR_HARNESS_ACCOUNT_ID" \
--header "X-API-KEY: $API_KEY" \
--header 'Content-Type: application/json' \
--data-raw '[
  {
    "field": "gitCloneTag",
    "value": "harness/drone-git:1.5.6-rootless"
  },
  {
    "field": "mongoTag",
    "value": "plugins/drone-liquibase:1.18.0-4.33-mongo"
  },
  {
    "field": "spannerTag",
    "value": "plugins/drone-liquibase:1.18.0-4.33-spanner"
  }
]'
```

### Reset Image Configuration to Defaults

Reset specific images to their default versions:

```sh
curl -i -X POST \
https://app.harness.io/v1/dbops/execution-config/reset-config \
--header "Harness-Account: $YOUR_HARNESS_ACCOUNT_ID" \
--header "X-API-KEY: $API_KEY" \
--header 'Content-Type: application/json' \
--data-raw '[
    {
    "artifactoryTag",
    "defaultTag",
    "gitCloneTag",
    "mongoTag",
    "spannerTag"
    }
]'
```

### Delete Overrides

Delete all custom overrides for your account:

```sh
curl -i -X DELETE \
https://app.harness.io/v1/dbops/execution-config \
--header "Harness-Account: $YOUR_HARNESS_ACCOUNT_ID" 
--header "X-API-KEY: $API_KEY"
```

## Reference:
You can refer the images directly from [dockerhub](https://hub.docker.com/r/plugins/drone-liquibase/tags)

### What is Harness DBOps Image Pulls?
By default, when a DBOps pipeline runs, the Harness Delegate uses a [Docker connector](/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference.md) to make an anonymous outbound connection to pull the Harness DBOps images from the public container registry where they are stored.

### What if I don't want to pull images anonymously?
You can use credentialed access if you don't want the Harness Delegate to pull images anonymously. For instructions, go to [Connect to the Harness container image registry](/docs/platform/connectors/artifact-repositories/connect-to-harness-container-image-registry-using-docker-connector).

### I don't want to pull images from a public registry
Harness DBOps images are stored in a public container registry. If you don't want to pull the images directly from the public registry, you can pull Harness images from your own private registry. For instructions on each of these options, go to [Connect to the Harness container image registry](/docs/platform/connectors/artifact-repositories/connect-to-harness-container-image-registry-using-docker-connector.md).

### How to Override LiteEngine or CIAddOn Image in DBOps?
Refer to the [section](/docs/continuous-integration/use-ci/set-up-build-infrastructure/harness-ci#harness-ci-image-updates) to override using CI Apis
For Using private registry for the above images, override the default harnessImage connector at AccountLevel, refer to [section](/docs/platform/connectors/artifact-repositories/connect-to-harness-container-image-registry-using-docker-connector/#configure-harness-to-always-use-credentials-to-pull-harness-images)
