---
title: Copy images across registries
description: Use a plugin to copy an image from one registry to another.
sidebar_position: 24
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The [Image Migration plugin](https://github.com/harness-community/drone-docker-image-migration) copies an image from one registry and replicates it in another. It does this by pulling the target image from the source registry and pushing it to the destination registry.

For general information about using plugins in CI pipelines, go to [Explore plugins](../use-drone-plugins/explore-ci-plugins.md) and [Use Drone plugins](../use-drone-plugins/run-a-drone-plugin-in-ci.md).

## Supported registries

Currently, this plugin's functionality is limited by its supported authentication methods.

This plugin can pull images from:

* Public Docker registries
* Docker registries that don't require authentication
* Private registries that support basic authentication (username and password)
* Private AWS ECR registries accessed by [AWS access key and secret](https://docs.aws.amazon.com/AmazonECR/latest/userguide/security-iam.html)
* GAR registries that support [GAR access token authentication](https://cloud.google.com/artifact-registry/docs/docker/authentication#standalone-helper)

This plugin can push images to:

* Docker registries that support basic authentication (username and password)
* AWS ECR registries accessed by [AWS access key and secret](https://docs.aws.amazon.com/AmazonECR/latest/userguide/security-iam.html)
* GAR registries that support [GAR access token authentication](https://cloud.google.com/artifact-registry/docs/docker/authentication#standalone-helper)

If your authentication requirements vary from those supported by this plugin, consider running multiple Build and Push steps in parallel, running the necessary pull and push commands in a [Run step](/docs/continuous-integration/use-ci/run-step-settings), or using the [Image Migration plugin](https://github.com/harness-community/drone-docker-image-migration) as a basis to [write your own plugin](../use-drone-plugins/custom_plugins.md).

## Configure the Image Migration plugin

To use the Image Migration plugin, [add a Plugin step](../use-drone-plugins/run-a-drone-plugin-in-ci.md) to your [CI pipeline](../prep-ci-pipeline-components.md). How you configure the [Plugin step settings](../use-drone-plugins/plugin-step-settings-reference.md) depends on the authentication methods involved.

<Tabs>
<TabItem value="basic" label="Basic auth or no auth" default>

To use the Image Migration plugin to pull from or push to registries that use basic authentication (username and password) or no authentication, you must provide the username and password/token for the authenticated registry.

In this example, only the destination registry requires authentication. The source registry could be public or unauthenticated.

```yaml
              - step:
                  type: Plugin
                  name: migrate_image
                  identifier: migrate_image
                  spec:
                    connectorRef: YOUR_IMAGE_REGISTRY_CONNECTOR
                    image: plugins/image-migration
                    settings:
                      source: some-registry/image:latest
                      destination: my-target-registry/image:latest
                      username: YOUR_USERNAME
                      password: <+secrets.getValue("registry_token")>
```

In this example, both the source and destination registries require authentication.

```yaml
              - step:
                  type: Plugin
                  name: migrate_image
                  identifier: migrate_image
                  spec:
                    connectorRef: YOUR_IMAGE_REGISTRY_CONNECTOR
                    image: plugins/image-migration
                    settings:
                      source: registry-1.example.com/image:latest
                      destination: registry-2.example.com/image:latest
                      source_username: USERNAME_FOR_SOURCE_REGISTRY
                      source_password: <+secrets.getValue("source_registry_token")>
                      username: YOUR_USERNAME
                      password: <+secrets.getValue("registry_token")>
                      overwrite: true
```

With basic authentication, the Image Migration plugin settings are as follows:

| Keys | Type | Description | Value example |
| - | - | - | - |
| `connectorRef` | String | Select a [Docker connector](/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference). | `YOUR_IMAGE_REGISTRY_CONNECTOR` |
| `image` | String | Enter `plugins/image-migration`. You can specify an optional architecture tag. For a list of available tags, go to the [Image Migration plugin README](https://github.com/harness-community/drone-docker-image-migration?tab=readme-ov-file#plugin-image). | `plugins/image-migration:linux-amd64` |
| `source` | String | The registry, image name, and tag of the image to copy. The format depends on the registry provider. | `registry-1.example.com/my-cool-image:latest`<br/>`some-registry/some-image:1.2.3` |
| `destination` | String | The destination where the image will be copied along with the image name and tag. The format depends on the registry provider. | `registry-2.example.com/my-cool-image:latest`<br/>`some-registry/some-image:1.2.3` |
| `username` | String | Your username for the destination registry. | `someuser` |
| `password` | String | If required, provide a reference to a [Harness text secret](/docs/platform/secrets/add-use-text-secrets) containing a password or access token to authenticate with the destination registry. | `<+secrets.getValue("destination_pat")>` |
| `source_username` | String | If required, provide your username for the source registry. | `someuser2` |
| `source_password` | String | If required, provide a reference to a [Harness text secret](/docs/platform/secrets/add-use-text-secrets) containing a password or access token to authenticate with the source registry. | `<+secrets.getValue("source_pat")>` |
| `overwrite` | Boolean | Set to `true` to overwrite the existing copy of the image in the destination registry, if present. The default is `false` (overwrite disabled). | `true` |
| `insecure` | Boolean | Set to `true` to disable TLS. The default is `false` (TLS enabled). | `false` |

</TabItem>
<TabItem value="gar" label="GAR access token">

To use the Image Migration plugin to pull from or push to GAR registries, you must use [GAR access token authentication](https://cloud.google.com/artifact-registry/docs/docker/authentication#standalone-helper).

In this example, the source registry is a non-GAR registry that uses basic authentication and the destination registry is a GAR registry.

```yaml
              - step:
                  type: Plugin
                  name: migrate_image
                  identifier: migrate_image
                  spec:
                    connectorRef: YOUR_IMAGE_REGISTRY_CONNECTOR
                    image: plugins/image-migration
                    settings:
                      source: registry-1.example.com/image:latest
                      destination: LOCATION-docker.pkg.dev/PROJECT-ID/REPO-NAME/IMAGE-NAME:TAG
                      source_username: USERNAME_FOR_SOURCE_REGISTRY
                      source_password: <+secrets.getValue("source_registry_token")>
                      username: oauth2accesstoken
                      password: <+secrets.getValue("gar_token")>
                      overwrite: true
```

With GAR, the Image Migration plugin settings are as follows:

| Keys | Type | Description | Value example |
| - | - | - | - |
| `connectorRef` | String | Select a [Docker connector](/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference). | `YOUR_IMAGE_REGISTRY_CONNECTOR` |
| `image` | String | Enter `plugins/image-migration`. You can specify an optional architecture tag. For a list of available tags, go to the [Image Migration plugin README](https://github.com/harness-community/drone-docker-image-migration?tab=readme-ov-file#plugin-image). | `plugins/image-migration:linux-amd64` |
| `source` | String | The registry, image name, and tag of the image to copy. The format depends on the registry provider. The [full image name format for GAR](https://cloud.google.com/artifact-registry/docs/docker/pushing-and-pulling#tag) is `LOCATION-docker.pkg.dev/PROJECT_ID/REPO_NAME/IMAGE_NAME:TAG`. | `registry-1.example.com/my-cool-image:latest`<br/>`some-registry/some-image:1.2.3` |
| `destination` | String | The destination where the image will be copied along with the image name and tag. The format depends on the registry provider. The [full image name format for GAR](https://cloud.google.com/artifact-registry/docs/docker/pushing-and-pulling#tag) is `LOCATION-docker.pkg.dev/PROJECT_ID/REPO_NAME/IMAGE_NAME:TAG`. | `registry-2.example.com/my-cool-image:latest`<br/>`some-registry/some-image:1.2.3` |
| `username` | String | Your username for the destination registry. If the destination registry is in GAR, this must be `oauth2accesstoken`. | `someuser` |
| `password` | String | If required, provide a reference to a [Harness text secret](/docs/platform/secrets/add-use-text-secrets) containing a password or access token to authenticate with the destination registry. For GAR, you must use a GAR access token. | `<+secrets.getValue("destination_pat")>` |
| `source_username` | String | If required, provide your username for the source registry. If the source registry is in GAR, this must be `oauth2accesstoken`. | `someuser2` |
| `source_password` | String | If required, provide a reference to a [Harness text secret](/docs/platform/secrets/add-use-text-secrets) containing a password or access token to authenticate with the source registry. For GAR, you must use a GAR access token. | `<+secrets.getValue("source_pat")>` |
| `overwrite` | Boolean | Set to `true` to overwrite the existing copy of the image in the destination registry, if present. The default is `false` (overwrite disabled). | `true` |
| `insecure` | Boolean | Set to `true` to disable TLS. The default is `false` (TLS enabled). | `false` |

</TabItem>
<TabItem value="ecr" label="AWS access key and secret">

To use the Image Migration plugin to copy images to or from AWS ECR registries, you must use [AWS access key and secret authentication](https://docs.aws.amazon.com/AmazonECR/latest/userguide/security-iam.html). In the plugin settings, you can either provide an AWS access token for `password`, or provide `aws_access_key_id`, `aws_secret_access_key`, and `aws_region`.

In this example, an image is copied between registries in the same AWS ECR account.

```yaml
              - step:
                  type: Plugin
                  name: migrate_image
                  identifier: migrate_image
                  spec:
                    connectorRef: YOUR_IMAGE_REGISTRY_CONNECTOR
                    image: plugins/image-migration
                    settings:
                      source: aws_account_id.dkr.ecr.us-west-2.amazonaws.com/image-dev:1.2.3
                      destination: aws_account_id.dkr.ecr.us-west-2.amazonaws.com/image-prod:1.2.3
                      username: AWS
                      aws_access_key_id: "012345678901"
                      aws_secret_access_key: <+secrets.getValue("aws_secret_access_key")>
                      aws_region: us-west-2
                      overwrite: true
```

In this example, only the destination registry is in AWS ECR.

```yaml
              - step:
                  type: Plugin
                  name: migrate_image
                  identifier: migrate_image
                  spec:
                    connectorRef: YOUR_IMAGE_REGISTRY_CONNECTOR
                    image: plugins/image-migration
                    settings:
                      source: registry-2.example.com/image:latest
                      destination: aws_account_id.dkr.ecr.us-west-2.amazonaws.com/image:latest
                      username: AWS
                      aws_access_key_id: "012345678900"
                      aws_secret_access_key: <+secrets.getValue("aws_secret_access_key")>
                      aws_region: us-west-2
                      overwrite: true
```

<!-- In this example, only the source repo is AWS.

```yaml
              - step:
                  type: Plugin
                  name: migrate_image
                  identifier: migrate_image
                  spec:
                    connectorRef: YOUR_IMAGE_REGISTRY_CONNECTOR
                    image: plugins/image-migration
                    settings:
                      source: aws_account_id.dkr.ecr.us-west-2.amazonaws.com/image:latest
                      destination: registry-2.example.com/image:latest
                      source_username: AWS
                      source_password: <+secrets.getValue("aws_token")>
                      aws_region: us-west-2
                      username: DESTINATION_USERNAME
                      password: DESTINATION_PASSWORD
                      overwrite: true
```

-->

With AWS ECR, the Image Migration plugin settings are as follows:

| Keys | Type | Description | Value example |
| - | - | - | - |
| `connectorRef` | String | Select a [Docker connector](/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference). | `YOUR_IMAGE_REGISTRY_CONNECTOR` |
| `image` | String | Enter `plugins/image-migration`. You can specify an optional architecture tag. For a list of available tags, go to the [Image Migration plugin README](https://github.com/harness-community/drone-docker-image-migration?tab=readme-ov-file#plugin-image). | `plugins/image-migration:linux-amd64` |
| `source` | String | The registry, image name, and tag of the image to copy. The format depends on the registry provider. The format for AWS ECR is `AWS_ACCOUNT_ID.dkr.ecr.REGION.amazonaws.com/IMAGE_NAME:TAG`. | `registry-1.example.com/my-cool-image:latest`<br/>`some-registry/some-image:1.2.3` |
| `destination` | String | The destination where the image will be copied along with the image name and tag. The format depends on the registry provider. The format for AWS ECR is `AWS_ACCOUNT_ID.dkr.ecr.REGION.amazonaws.com/IMAGE_NAME:TAG`. | `registry-2.example.com/my-cool-image:latest`<br/>`some-registry/some-image:1.2.3` |
| `username` | String | Your username for the destination registry. If the destination registry is in ECR, this must be `AWS`. | `someuser`<br/>`AWS` |
| `password` | String | If required, provide a reference to a [Harness text secret](/docs/platform/secrets/add-use-text-secrets) containing a password or access token to authenticate with the destination registry.<br/>For AWS ECR, either provide an AWS access token in `password` or provide `aws_access_key_id`, `aws_secret_access_key`, and `aws_region`. | `<+secrets.getValue("destination_pat")>` |
| `aws_access_key_id` | String | The AWS access key ID to generate the access token. | `"012345678900"` |
| `aws_secret_access_key` | String | A reference to a [Harness text secret](/docs/platform/secrets/add-use-text-secrets) containing the AWS secret access key to generate the access token. | `<+secrets.getValue("aws_secret_access_key")>` |
| `aws_region` | String | The AWS region containing the ECR registry. | `us-west-2` |
| `source_username` | String | If required, provide your username for the source registry. | `someuser2` |
| `source_password` | String | If required, provide a reference to a [Harness text secret](/docs/platform/secrets/add-use-text-secrets) containing a password or access token to authenticate with the source registry. | `<+secrets.getValue("source_pat")>` |
| `overwrite` | Boolean | Set to `true` to overwrite the existing copy of the image in the destination registry, if present. The default is `false` (overwrite disabled). | `true` |
| `insecure` | Boolean | Set to `true` to disable TLS. The default is `false` (TLS enabled). | `false` |

</TabItem>
</Tabs>

:::tip

You can use variable expressions for plugin settings. For example, `registry_username: <+stage.variables.docker_user_name>` references a [stage variable](/docs/platform/pipelines/add-a-stage#stage-variables) called `DOCKER_USER_NAME`.

:::
