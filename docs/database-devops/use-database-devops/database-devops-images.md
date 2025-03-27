---
title: Harness DB DevOps Images
description: Harness DB DevOps images and how to configure updates.
sidebar_label: DB Devops Images
sidebar_position: 21
---

Harness publishes `plugins/drone-liquibase` with `x.y.z-{liquibaseVersion}`, where `x.y.z` follows Harness semantic versioning.

## Harness DB DevOps Images List

Here are some examples of Harness DB Devops images and their purposes:

* `plugins/download-artifactory`: Used for downloading artifacts from Artifactory.
* `plugins/drone-liquibase:1.1.0-4.27`: Default Liquibase plugin for database operations.
* `harness/drone-git`: Used to clone Git repositories.
* `plugins/drone-liquibase:1.1.0-4.27-mongo`: Liquibase plugin for MongoDB.
* `plugins/drone-liquibase:1.1.0-4.27-spanner`: Liquibase plugin for Google Spanner.

## Configure Harness DB Devops Image Versions

By default, Harness uses predefined images. Customers can override these defaults using API endpoints.

### Get Default Configurations

Retrieve the latest default Harness DB Devops image versions:

```sh
curl --location --request GET "https://app.harness.io/gateway/v1/dbops/execution-config/get-default-config" \
--header "Harness-Account: $YOUR_HARNESS_ACCOUNT_ID" --header "X-API-KEY: $API_KEY"
```

Response:

```json
{
    "artifactoryTag": "plugins/download-artifactory:1.0.0",
    "defaultTag": "plugins/drone-liquibase:1.1.0-4.27",
    "gitCloneTag": "harness/drone-git:1.6.4-rootless",
    "mongoTag": "plugins/drone-liquibase:1.1.0-4.27-mongo",
    "spannerTag": "plugins/drone-liquibase:1.1.0-4.27-spanner"
}
```

### Get Customer-Specific Overrides

Send a get-customer-config request to get the build images that your DB DevOps pipelines currently use. When overridesOnly is true, which is the default value, this endpoint returns the non-default images that your pipeline uses.

```sh
curl --location --request GET "https://app.harness.io/gateway/v1/dbops/execution-config/get-customer-config?overridesOnly=true" \
--header "Harness-Account: $YOUR_HARNESS_ACCOUNT_ID" --header "X-API-KEY: $API_KEY"
```

### Update Image Configuration

Override the default image versions with a new tag:

```sh
curl --location --request POST "https://app.harness.io/gateway/v1/dbops/execution-config/update-config" \
--header "Harness-Account: $YOUR_HARNESS_ACCOUNT_ID" \
--header "X-API-KEY: $API_KEY" \
--header 'Content-Type: application/json' \
--data-raw '[
    {
        "field": "gitCloneTag",
        "value": "harness/drone-git:1.5.4-rootless"
    }
]'
```

### Reset Image Configuration to Defaults

Reset specific images to their default versions:

```sh
curl --location --request POST "https://app.harness.io/gateway/v1/dbops/execution-config/reset-config" \
--header "Harness-Account: $YOUR_HARNESS_ACCOUNT_ID" \
--header "X-API-KEY: $API_KEY" \
--header 'Content-Type: application/json' \
--data-raw '[
    {
        "field": "gitCloneTag"
    }
]'
```

### Delete Overrides

Delete all custom overrides for your account:

```sh
curl --location --request DELETE "https://app.harness.io/gateway/v1/dbops/execution-config" \
--header "Harness-Account: $YOUR_HARNESS_ACCOUNT_ID" --header "X-API-KEY: $API_KEY"
```

## Reference:

You can refer the images directly from [dockerhub](https://hub.docker.com/r/plugins/drone-liquibase/tags)


## Harness DBOps Image Pulls
By default, when a DBOps pipeline runs, the Harness Delegate uses a [Docker connector](/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference.md) to make an anonymous outbound connection to pull the Harness DBOps images from the public container registry where they are stored.

### I don't want to pull images anonymously

You can use credentialed access if you don't want the Harness Delegate to pull images anonymously. For instructions, go to [Connect to the Harness container image registry](/docs/platform/connectors/artifact-repositories/connect-to-harness-container-image-registry-using-docker-connector).

### I don't want to pull images from a public registry

Harness DBOps images are stored in a public container registry. If you don't want to pull the images directly from the public registry, you can pull Harness images from your own private registry. For instructions on each of these options, go to [Connect to the Harness container image registry](/docs/platform/connectors/artifact-repositories/connect-to-harness-container-image-registry-using-docker-connector.md).

### Override LiteEngine or CIAddOn Image in DBOps

Refer to the [section](/docs/continuous-integration/use-ci/set-up-build-infrastructure/harness-ci#harness-ci-image-updates) to override using CI Apis
For Using private registry for the above images, override the default harnessImage connector at AccountLevel, refer to [section](/docs/platform/connectors/artifact-repositories/connect-to-harness-container-image-registry-using-docker-connector/#configure-harness-to-always-use-credentials-to-pull-harness-images)
