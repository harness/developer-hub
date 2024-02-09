<!-- hidden while plugin is still in dev -->
<!-- ---
title: Generate GCP access tokens from OIDC tokens
description: Use a plugin to publish Helm charts to Docker registries
sidebar_position: 41
--- -->

The [GCP OIDC plugin](https://github.com/harness-community/drone-gcp-oidc) generates a [Google Cloud access token](https://cloud.google.com/docs/authentication/token-types#access) from your OIDC token and then stores the GCP token in the output variable `GCLOUD_ACCESS_TOKEN`. You can use this variable in subsequent pipeline steps to control Google Cloud Services through API (cURL) or the gcloud CLI.

For general information about using plugins in CI pipelines, go to [Explore plugins](../use-ci/use-drone-plugins/explore-ci-plugins.md) and [Use Drone plugins](../use-ci/use-drone-plugins/run-a-drone-plugin-in-ci.md).

## Add OIDC token stage variable

The GCP OIDC plugin requires an OIDC token, which it ingests from a stage variable.

Add a [stage variable](/docs/platform/pipelines/add-a-stage#stage-variables) named `PLUGIN_OIDC_TOKEN_ID` and set the value to your OIDC token.

You can store your OIDC ID token in a [Harness text secret](/docs/platform/secrets/add-use-text-secrets) and then use an expression to reference the secret in your stage variable, such as  `<+secrets.getValue("oidc_token_id")>`.

## Configure the GCP OIDC plugin

To use the GCP OIDC plugin, [add a Plugin step](../use-ci/use-drone-plugins/run-a-drone-plugin-in-ci.md) to your [CI pipeline](../use-ci/prep-ci-pipeline-components.md). For example:

```yaml
              - step:
                  type: Plugin
                  name: generate-token
                  identifier: generate-token
                  spec:
                    connectorRef: account.harnessImage
                    image: plugins/gcp-oidc
                    settings:
                      project_id: 12345678
                      pool_id: 12345678
                      service_account_email_id: some-email@email.com
                      provider_id: service-account1
                      duration: 7200
```

To use the GCP OIDC plugin, configure the [Plugin step settings](../use-ci/use-drone-plugins/plugin-step-settings-reference.md) as follows:

| Keys | Type | Description | Value example |
| - | - | - | - |
| `connectorRef` | String | Select a [Docker connector](/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference). Harness uses this connector to pull the plugin `image`. | `account.harnessImage` |
| `image` | String | Enter `plugins/gcp-oidc`. You can specify an optional architecture tag. For a list of available tags, go to the [GCP OIDC plugin README](https://github.com/harness-community/drone-gcp-oidc?tab=readme-ov-file#plugin-image). | `plugins/gcp-oidc:linux-amd64` |
| `project_id` | String | Your GCP project ID. | `12345678` |
| `pool_id` | String | The pool ID for OIDC authentication. | `12345678` |
| `provider_id` | String | The provider ID for OIDC authentication. | `service-account1` |
| `service_account_email_id` | String | The service account's email address. | `some-email@email.com` |
| `duration` | String | The generated access token's lifecycle duration in seconds.<br/>The default is `3600`.<br/>The service account must have the `iam.allowServiceAccountCredentialLifetimeExtension` permission to set a custom duration. | `7200` |

:::tip

You can use variable expressions for plugin settings. For example, `registry_username: <+stage.variables.service_account>` references a [stage variable](/docs/platform/pipelines/add-a-stage#stage-variables) called `SERVICE_ACCOUNT`.

:::

## Use the GCP token

The GCP OIDC plugin outputs the GCP token to the variable `GCLOUD_ACCESS_TOKEN`. You can reference this output variable in subsequent pipeline steps to control Google Cloud Services through API (cURL) or the gcloud CLI.

To reference this variable, use an expression such as `<+steps.STEP_ID.output.outputVariables.GCLOUD_ACCESS_TOKEN>`. Replace `STEP_ID` with the ID of the GCP OIDC plugin step, such as `<+steps.generate_gcp_token.output.outputVariables.GCLOUD_ACCESS_TOKEN>`.

Here's a YAML example of a Plugin step generating a GCP token and a Run step using that token.

```yaml
              - step:
                  type: Plugin
                  name: generate-token
                  identifier: generate_token
                  spec:
                    connectorRef: account.harnessImage
                    image: plugins/gcp-oidc
                    settings:
                      project_id: 12345678
                      pool_id: 12345678
                      service_account_email_id: some-email@email.com
                      provider_id: service-account1
                      duration: 7200
              - step:
                  type: Run
                  name: list compute engine zone
                  identifier: list_zones
                  spec:
                    shell: Sh
                    command: |-
                      curl -H "Authorization: Bearer <+steps.generate_token.output.outputVariables.GCLOUD_ACCESS_TOKEN>" \
                      "https://compute.googleapis.com/compute/v1/projects/my-cool-project/zones/some-zone/instances"
```
