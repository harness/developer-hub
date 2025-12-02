---
title: Generate Azure access tokens from OIDC tokens
description: Use the Azure OIDC token plugin to authenticate with Azure services using OIDC in Harness CI pipelines.
sidebar_position: 43
---

The [Azure OIDC plugin](https://github.com/harness-community/drone-azure-oidc) lets you authenticate with Azure services using [OIDC federation](https://learn.microsoft.com/en-us/entra/workload-id/workload-identity-federation) instead of long-lived secrets. This is useful in Harness CI pipelines running on Harness Cloud or self-hosted delegates where temporary credentials are preferred.

## Prerequisites

- An Azure AD App Registration or User-Assigned Managed Identity configured with federated identity credentials.
- OIDC configured in your Azure account (via Federated Credentials).
- The pipeline must be running in a context where Harness can issue an OIDC token.
- This setup is supported on both Harness Cloud and Self-managed Kubernetes Infrastructure.

For more on configuring Azure for OIDC, refer to [Azure Workload Identity Federation](https://learn.microsoft.com/en-us/entra/workload-id/workload-identity-federation).

## Example Pipeline Usage

```yaml
- step:
    type: Plugin
    name: generate-azure-token
    identifier: generate_azure_token
    spec:
      image: plugins/azure-oidc
      settings:
        tenant_id: <tenant_id>
        client_id: <client_id>
```

This step will use the injected OIDC token from Harness to authenticate with Azure and generate an access token for the specified scope.

The plugin automatically sets the environment variable `AZURE_ACCESS_TOKEN` for use in subsequent steps.

## Inputs

| Key                     | Type   | Required | Default                                 | Description                                                                                                                                           |
| ----------------------- | ------ | -------- | --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `tenant_id`             | String | ✅ Yes   | -                                       | The Azure AD Tenant ID (GUID format).                                                                                                                 |
| `client_id`             | String | ✅ Yes   | -                                       | The Azure AD Application (Client) ID (GUID format).                                                                                                   |
| `scope`                 | String | ❌ No    | `https://management.azure.com/.default` | The Azure resource scope for the access token. See [Supported Scopes](#supported-scopes) below.                                                      |
| `azure_authority_host`  | String | ❌ No    | `https://login.microsoftonline.com`     | The Azure AD authority host to use. Set this for national clouds like Azure Government or Azure China (e.g., `https://login.microsoftonline.us`). |

## Supported Scopes

The `scope` parameter determines which Azure service API the token is valid for. You must also assign appropriate RBAC roles to the Service Principal in Azure to authorize specific operations.

| Service                     | Scope                                         |
| --------------------------- | --------------------------------------------- |
| Azure Management API        | `https://management.azure.com/.default`       |
| Azure Storage               | `https://storage.azure.com/.default`          |
| Microsoft Graph             | `https://graph.microsoft.com/.default`        |
| Azure Container Registry    | `https://containerregistry.azure.net/.default` |
| Azure Key Vault             | `https://vault.azure.net/.default`            |
| Azure Database              | `https://database.windows.net/.default`       |

## Follow-up Usage

After this step, you can use the `AZURE_ACCESS_TOKEN` in subsequent pipeline steps to authenticate with Azure services.

:::note
The Azure OIDC plugin does not export credentials as plain environment variables. Instead, it writes them as output secrets, which you can access in later steps using output variable expressions (for example, `<+steps.STEP_ID.output.outputVariables.AZURE_ACCESS_TOKEN>`). These secrets are automatically masked in logs for security.
:::

Example:

```yaml
- step:
    type: Run
    name: List Azure Resources
    identifier: list_azure_resources
    spec:
      image: mcr.microsoft.com/azure-cli
      shell: sh
      envVariables:
        AZURE_ACCESS_TOKEN: <+steps.generate_azure_token.output.outputVariables.AZURE_ACCESS_TOKEN>
      command: |
        az rest --method get \
          --url "https://management.azure.com/subscriptions?api-version=2020-01-01" \
          --headers "Authorization=Bearer $AZURE_ACCESS_TOKEN" \
          --output json
```

## Notes

- `PLUGIN_OIDC_TOKEN_ID` is automatically generated and set by the Harness CI platform when it detects the Azure OIDC plugin is being executed.
- The plugin outputs the access token in the form of an environment variable: `AZURE_ACCESS_TOKEN`
- This can be accessed in subsequent pipeline steps like: `<+steps.STEP_ID.output.outputVariables.AZURE_ACCESS_TOKEN>`

## Plugin Image

The plugin `plugins/azure-oidc` is available for the following architectures:

| OS            | Tag             |
| ------------- | --------------- |
| latest        | `linux-amd64/arm64, windows-amd64` |
| linux/amd64   | `linux-amd64`   |
| linux/arm64   | `linux-arm64`   |
| windows/amd64 | `windows-amd64` |

## Related Links

[Azure OIDC plugin GitHub Repo](https://github.com/harness-community/drone-azure-oidc)

[AWS OIDC Token Plugin](/docs/continuous-integration/secure-ci/aws-oidc-token-plugin)

[GCP OIDC Token Plugin](/docs/continuous-integration/secure-ci/gcp-oidc-token-plugin)
