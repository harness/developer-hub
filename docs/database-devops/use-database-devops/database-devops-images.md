---
title: Harness DBOps Images
description: Harness DBOps images and how to configure updates.
sidebar_label: DB Devops Images
sidebar_position: 21
---

## Harness DBOps Image Updates

Harness publishes `plugins/drone-liquibase` with `x.y.z-{liquibaseVersion}`, where `x.y.z` follows Harness semantic versioning.

## Harness DBOps Images List

Here are some examples of Harness DBOps images and their purposes:

* `plugins/download-artifactory`: Used for downloading artifacts from Artifactory.
* `plugins/drone-liquibase`: Default Liquibase plugin for database operations.
* `harness/drone-git`: Used to clone Git repositories.
* `plugins/drone-liquibase:latest-mongo`: Liquibase plugin for MongoDB.
* `plugins/drone-liquibase:latest-spanner`: Liquibase plugin for Google Spanner.

## Configure Harness DBOps Image Versions

By default, Harness uses predefined images. Customers can override these defaults using API endpoints.

### Get Default Configurations

Retrieve the latest default Harness DBOps image versions:

```sh
curl --location --request GET "https://app.harness.io/gateway/v1/dbops/execution-config/get-default-config" \
--header "Harness-Account: $YOUR_HARNESS_ACCOUNT_ID"
```

Response:

```json
{
    "artifactoryTag": "plugins/download-artifactory:latest",
    "defaultTag": "plugins/drone-liquibase:latest",
    "gitCloneTag": "harness/drone-git:1.5.6-rootless",
    "mongoTag": "plugins/drone-liquibase:latest-mongo",
    "spannerTag": "plugins/drone-liquibase:latest-spanner"
}
```

### Get Customer-Specific Overrides

Retrieve the image versions currently in use by your pipelines. If the response is empty, your pipeline is using the default images.

```sh
curl --location --request GET "https://app.harness.io/gateway/v1/dbops/execution-config/get-customer-config?overridesOnly=true" \
--header "Harness-Account: $YOUR_HARNESS_ACCOUNT_ID"
```

### Update Image Configuration

Override the default image versions with a new tag:

```sh
curl --location --request POST "https://app.harness.io/gateway/v1/dbops/execution-config/update-config" \
--header "Harness-Account: $YOUR_HARNESS_ACCOUNT_ID" \
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
--header "Harness-Account: $YOUR_HARNESS_ACCOUNT_ID"
```

## Reference:

You can refer the images directly from [dockerhub](https://hub.docker.com/r/plugins/drone-liquibase/tags)

