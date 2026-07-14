---
title: Generate GCP access tokens from OIDC tokens
description: Use a plugin to publish Helm charts to Docker registries
sidebar_position: 41
---

The [GCP OIDC plugin](https://github.com/harness-community/drone-gcp-oidc) generates a [Google Cloud access token](https://cloud.google.com/docs/authentication/token-types#access) from your OIDC token and then stores the GCP token in the output variable `GCLOUD_ACCESS_TOKEN`. You can also configure the plugin to generate a `credentials.json` file and then use that file to authenticate and generate a token. You can use the `GCLOUD_ACCESS_TOKEN` output variable or credentials file in subsequent pipeline steps to control Google Cloud Services through API (cURL) or the gcloud CLI. This setup is supported on both Harness Cloud and Self-managed Kubernetes Infrastructure.

For general information about using plugins in CI pipelines, go to [Explore plugins](../use-ci/use-drone-plugins/explore-ci-plugins.md) and [Use Drone plugins](../use-ci/use-drone-plugins/run-a-drone-plugin-in-ci.md).

## Configure the GCP OIDC plugin

To use the GCP OIDC plugin, [add a Plugin step](../use-ci/use-drone-plugins/run-a-drone-plugin-in-ci.md) to your [CI pipeline](../use-ci/prep-ci-pipeline-components.md). For example:

```yaml
              - step:
                  type: Plugin
                  name: generate-token
                  identifier: generate-token
                  spec:
                    connectorRef: YOUR_IMAGE_REGISTRY_CONNECTOR
                    image: plugins/gcp-oidc
                    settings:
                      project_id: 12345678
                      pool_id: 12345678
                      service_account_email_id: some-email@email.com
                      provider_id: service-account1
                      duration: 7200
                      create_application_credentials_file: false
```

To use the GCP OIDC plugin, configure the [Plugin step settings](../use-ci/use-drone-plugins/plugin-step-settings-reference.md) as follows:

| Keys | Type | Description | Value example |
| - | - | - | - |
| `connectorRef` | String | Select a [Docker connector](/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference). | YOUR_IMAGE_REGISTRY_CONNECTOR |
| `image` | String | Enter `plugins/gcp-oidc`. You can specify an optional architecture tag. For a list of available tags, go to the [GCP OIDC plugin README](https://github.com/harness-community/drone-gcp-oidc?tab=readme-ov-file#plugin-image). | `plugins/gcp-oidc:linux-amd64` |
| `project_id` | String | Your GCP project ID. | `12345678` |
| `pool_id` | String | The pool ID for OIDC authentication. | `12345678` |
| `provider_id` | String | The provider ID for OIDC authentication. | `service-account1` |
| `service_account_email_id` | String | The service account's email address. | `some-email@email.com` |
| `duration` | String | The generated access token's lifecycle duration in seconds.<br/>The default is `3600`.<br/>The service account must have the `iam.allowServiceAccountCredentialLifetimeExtension` permission to set a custom duration. | `7200` |
| `create_application_credentials_file` | Boolean | Set to `true` to generate `application_default_credentials.json` file.<br/>This file is an alternative way to generate the token by calling the credentials file.<br/>The default is `false`. | `true` |

:::tip

You can use variable expressions for plugin settings. For example, `registry_username: <+stage.variables.service_account>` references a [stage variable](/docs/platform/pipelines/add-a-stage#stage-variables) called `SERVICE_ACCOUNT`.

:::

## Use the GCP token

The GCP OIDC plugin outputs the GCP token to the variable `GCLOUD_ACCESS_TOKEN`. You can reference this output variable in subsequent pipeline steps to control Google Cloud Services through API (cURL) or the gcloud CLI.

:::info

`GCLOUD_ACCESS_TOKEN` is minted with the default `https://www.googleapis.com/auth/cloud-platform` OAuth scope. It works for Google Cloud APIs such as Cloud Storage, BigQuery, Artifact Registry, and Cloud Run. It does **not** work for Google Workspace APIs such as Sheets, Drive, Gmail, or Admin SDK. Calls to those endpoints return `401 Unauthorized`. Go to [Access Google Workspace APIs](#access-google-workspace-apis-sheets-drive-gmail) to mint a scope-specific token instead.

:::

To reference this variable, use an expression such as `<+steps.STEP_ID.output.outputVariables.GCLOUD_ACCESS_TOKEN>`. Replace `STEP_ID` with the ID of the GCP OIDC plugin step, such as `<+steps.generate_gcp_token.output.outputVariables.GCLOUD_ACCESS_TOKEN>`.

Here's a YAML example of a Plugin step generating a GCP token and a Run step using that token.

```yaml
              - step:
                  type: Plugin
                  name: generate-token
                  identifier: generate_token
                  spec:
                    connectorRef: YOUR_IMAGE_REGISTRY_CONNECTOR
                    image: plugins/gcp-oidc
                    settings:
                      project_id: 12345678
                      pool_id: 12345678
                      service_account_email_id: some-email@email.com
                      provider_id: service-account1
                      duration: 7200
                      create_application_credentials_file: false
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

### Get token from credentials file

If you set `create_application_credentials_file` to `true`, run the following commands to authenticate and get the access token using the credentials file:

```
gcloud auth login --brief --cred-file <+execution.steps.STEP_ID.output.outputVariables.GOOGLE_APPLICATION_CREDENTIALS>
gcloud config config-helper --format="json(credential)"
```

The first line authenticates and the second line generates the access token.

---

## Access Google Workspace APIs (Sheets, Drive, Gmail)

The `GCLOUD_ACCESS_TOKEN` output variable is scoped to `cloud-platform`, which covers Google Cloud APIs only. To call Google Workspace APIs such as Sheets, Drive, Gmail, Calendar, Docs etc, you need a token minted with a Workspace scope. Use the ADC (Application Default Credentials) file that the plugin writes, then mint a fresh scoped token from it.

### Configure the plugin to write the ADC file

Set `create_application_credentials_file` to `true`. The plugin writes the ADC JSON file inside the stage workspace and exports its path as the `GOOGLE_APPLICATION_CREDENTIALS` environment variable.

```yaml
              - step:
                  type: Plugin
                  name: generate-sheets-token-example
                  identifier: generate_sheets_token_example
                  spec:
                    connectorRef: YOUR_IMAGE_REGISTRY_CONNECTOR
                    image: plugins/gcp-oidc
                    settings:
                      project_id: "357844043395"
                      pool_id: my-pool
                      provider_id: my-provider
                      service_account_email_id: my-service-account@my-project.iam.gserviceaccount.com
                      duration: "600"
                      create_application_credentials_file: "true"
```

### Mint a scoped token

Call `gcloud auth application-default print-access-token` with the Workspace scope you need. This command reads the ADC file the plugin wrote and mints a new short-lived token restricted to that scope. Keep this step in the **same stage** as the Plugin step so that the ADC file and `$GOOGLE_APPLICATION_CREDENTIALS` are available.

```yaml
              - step:
                  type: Run
                  name: access-spreadsheet
                  identifier: access_spreadsheet
                  spec:
                    shell: Sh
                    command: |-
                      set -e

                      SHEETS_TOKEN=$(gcloud auth application-default print-access-token \
                        --scopes=https://www.googleapis.com/auth/spreadsheets.readonly)

                      curl -sS -H "Authorization: Bearer ${SHEETS_TOKEN}" \
                        'https://sheets.googleapis.com/v4/spreadsheets/SPREADSHEET_ID/values/Sheet1'
```

## Related Links

[GCP OIDC plugin GitHub Repo](https://github.com/harness-community/drone-gcp-oidc)

[AWS OIDC Token Plugin](/docs/continuous-integration/secure-ci/aws-oidc-token-plugin)

[Azure OIDC Token Plugin](/docs/continuous-integration/secure-ci/azure-oidc-token-plugin)