---
title: Managing Secrets
sidebar_label: Managing Secrets
description: Create, use, rotate, and manage secrets throughout their lifecycle — including UI workflows, pipeline usage, API access, and Terraform automation.
sidebar_position: 3
---

Create, use, rotate, and manage secrets throughout their lifecycle. This guide covers the complete set of operations for working with secrets in Harness 3.0, including UI workflows, pipeline usage, API access, and Terraform automation.

---

## Create secrets

Secrets can be created at the Account, Organization, or Project scope depending on your navigation context.

1. **Navigate to Secrets**: Go to your Project, Organization, or Account settings. Select **Secrets** from the left navigation menu.

2. **Choose Secret Type**: Click **+ New Secret** and select either **Text** or **File** based on the type of credential you need to store.

3. **Configure Details**: Provide a **Name** for the secret. The **Identifier** is auto-generated from the name but can be customized. Enter the secret **Value** (for text secrets) or upload the **File** (for file secrets).

4. **Advanced Configuration**: Select the **Secret Manager** to use for storing the encrypted value. The Harness built-in manager is selected by default. Choose an external manager if your organization requires it.

5. **Optional Metadata**: Add optional **Tags** to organize and filter secrets (e.g., `env:prod`, `team:platform`). Add an optional **Description** for documentation purposes.

6. **Save**: Click **Save** to create the secret. The value is encrypted and stored in the selected secret manager. The secret is now available for use in pipelines and connectors within its scope.

---

## Use secrets in pipelines

Secrets can be referenced in multiple contexts within your pipeline configuration. The secret value is resolved at runtime and automatically masked in execution logs.

### In connector configuration

```yaml title="connector-secret.yaml"
version: 1
kind: connector
spec:
  name: Docker Hub
  type: docker_registry
  spec:
    url: https://index.docker.io/v2/
    authentication:
      type: username_password
      spec:
        username: myuser
        password: <+secrets.getValue("dockerhub_password")>
```

### In pipeline variables

```yaml title="pipeline-variables.yaml"
pipeline:
  name: Deploy Application
  variables:
    - name: api_key
      type: secret
      value: <+secrets.getValue("prod_api_key")>
    - name: db_password
      type: secret
      value: <+secrets.getValue("org.shared_db_password")>
  stages:
    - name: Deploy
      type: deploy
      spec:
        service: my_service
        environment:
          name: production
          deploy-to: production
```

### In shell scripts

```bash title="shell-script-step.sh"
#!/bin/bash
# Secret values are resolved before script execution
export API_KEY=<+secrets.getValue("api_key")>
export DB_HOST=<+pipeline.variables.db_host>
export DB_PASS=<+secrets.getValue("db_password")>

# Use the resolved values
curl -s -H "Authorization: Bearer $API_KEY" \
  https://api.example.com/health

# Connect to database
psql "host=$DB_HOST user=deploy password=$DB_PASS dbname=app" \
  -c "SELECT version();"
```

### In service definitions

```yaml title="service-definition.yaml"
version: 1
kind: service
spec:
  name: Payment Service
  type: kubernetes
  spec:
    manifests:
      - type: k8s
        spec:
          store:
            type: git
            spec:
              connector: github_connector
              repo: payment-service
              branch: main
              paths:
                - k8s/
    variables:
      - name: STRIPE_KEY
        type: secret
        value: <+secrets.getValue("stripe_api_key")>
      - name: JWT_SECRET
        type: secret
        value: <+secrets.getValue("jwt_signing_key")>
```

### Use file secrets

File secrets require base64 decoding when used in shell scripts:

```bash title="file-secret-usage.sh"
#!/bin/bash
# Retrieve and decode a file secret (e.g., GCP service account key)
echo '<+secrets.getValue("gcp_sa_key")>' | base64 -d > /tmp/sa-key.json

# Authenticate with GCP using the decoded key file
gcloud auth activate-service-account --key-file=/tmp/sa-key.json

# Retrieve and write a kubeconfig file
echo '<+secrets.getValue("prod_kubeconfig")>' | base64 -d > /tmp/kubeconfig
export KUBECONFIG=/tmp/kubeconfig

# Use kubectl with the decoded kubeconfig
kubectl get pods -n production

# Clean up sensitive files after use
rm -f /tmp/sa-key.json /tmp/kubeconfig
```

:::warning File Secret Decoding
File secrets are stored as base64-encoded content. Always pipe the secret value through `base64 -d` before writing to a file. Clean up decoded files after use to avoid leaving sensitive data on disk.
:::

---

## Rotate secrets

Regular secret rotation reduces the impact of credential compromise. Harness supports both manual rotation through the UI and automated rotation through external secret managers.

### Manual rotation

1. Generate the new credential value in the source system (e.g., create a new API token in GitHub).
2. Navigate to the secret in Harness and click **Edit**.
3. Enter the new secret value and click **Save**.
4. Verify that existing pipelines and connectors work correctly with the new value by running a test execution.
5. Revoke the old credential value in the source system once the new value is confirmed working.

### Automated rotation with external managers

When using an external secret manager with automated rotation (such as AWS Secrets Manager rotation lambdas or Vault dynamic secrets), Harness automatically retrieves the latest value at pipeline execution time. No manual intervention is required in Harness.

### Emergency rotation

If a secret is compromised: (1) Update the secret value in Harness or your external secret manager. (2) Revoke the compromised credential in the source system. (3) Review audit logs to identify any unauthorized access. (4) Run affected pipelines to verify the new credential works. (5) Report the incident per your organization's security policy.

---

## View and search for secrets

### List view columns

| Column | Description |
|---|---|
| Name | Secret name and identifier |
| Type | `SecretText` or `SecretFile` |
| Secret Manager | The backend storing the encrypted value |
| Scope | Account, Organization, or Project |
| Tags | Assigned metadata tags |
| Last Modified | Timestamp of the last update |
| References | Count of pipelines, connectors, and services using this secret |

### Search and filters

Use the search bar to find secrets by name or identifier. Apply filters to narrow results by Secret Manager, Scope (Account/Org/Project), Tags, Type (SecretText/SecretFile), or Usage (in use vs. unused).

Sort the secrets list by Name, Last Modified, Type, or References count. Click a column header to toggle ascending and descending order.

### Secret details view

Click on a secret to open its details view. The details page has three tabs:

- **Configuration** — View and edit the secret name, identifier, description, tags, and secret manager. The value is never displayed.
- **References** — See all pipelines, connectors, and services that reference this secret, with direct links to each entity.
- **Activity** — View the complete audit trail including creation, modification, access events, and the user who performed each action.

---

## Deleting secrets

Before deleting a secret, verify that it is not referenced by any active pipeline, connector, or service. Deleting a secret that is in use will cause pipeline failures.

1. Open the secret details and navigate to the **References** tab. If the secret has active references, update or remove those references before proceeding.
2. Navigate to the secret in the Secrets list.
3. Click the three-dot menu on the secret row and select **Delete**.
4. Confirm the deletion in the dialog. This action cannot be undone.

:::warning Safe Deletion Practice
Always check the **References** tab before deleting a secret. Harness will warn you if the secret has active references, but it will not prevent deletion — the referencing resources will fail at execution time.
:::

---

## API and automation

Harness provides a REST API and Terraform provider for automating secret management.

### REST API

All requests require an API key with appropriate permissions. Base URL: `https://app.harness.io/gateway/ng/api/v2/secrets`

```bash title="list-secrets.sh"
# List secrets
curl -X GET \
  "https://app.harness.io/gateway/ng/api/v2/secrets?accountIdentifier=abc123&projectIdentifier=myproject" \
  -H "x-api-key: YOUR_API_KEY" \
  -H "Content-Type: application/json"
```

```bash title="create-secret.sh"
# Create a text secret
curl -X POST \
  "https://app.harness.io/gateway/ng/api/v2/secrets?accountIdentifier=abc123" \
  -H "x-api-key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "secret": {
      "type": "SecretText",
      "name": "My API Key",
      "identifier": "my_api_key",
      "orgIdentifier": "default",
      "projectIdentifier": "myproject",
      "spec": {
        "secretManagerIdentifier": "harnessSecretManager",
        "valueType": "Inline",
        "value": "sk-xxxxxxxxxxxxxxxxxxxx"
      }
    }
  }'
```

```bash title="update-secret.sh"
# Update a text secret value
curl -X PUT \
  "https://app.harness.io/gateway/ng/api/v2/secrets/my_api_key?accountIdentifier=abc123" \
  -H "x-api-key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "secret": {
      "type": "SecretText",
      "name": "My API Key",
      "identifier": "my_api_key",
      "orgIdentifier": "default",
      "projectIdentifier": "myproject",
      "spec": {
        "secretManagerIdentifier": "harnessSecretManager",
        "valueType": "Inline",
        "value": "sk-new-value-xxxxxxxxxxxx"
      }
    }
  }'
```

```bash title="delete-secret.sh"
# Delete a secret
curl -X DELETE \
  "https://app.harness.io/gateway/ng/api/v2/secrets/my_api_key?accountIdentifier=abc123&projectIdentifier=myproject" \
  -H "x-api-key: YOUR_API_KEY"
```

### Terraform Provider

```hcl title="text-secret.tf"
resource "harness_platform_secret_text" "api_key" {
  identifier  = "api_key"
  name        = "API Key"
  description = "Production API key for external service"
  org_id      = "default"
  project_id  = "myproject"

  secret_manager_identifier = "harnessSecretManager"
  value_type                = "Inline"
  value                     = var.api_key_value

  tags = [
    "env:prod",
    "team:platform",
  ]
}
```

```hcl title="file-secret.tf"
resource "harness_platform_secret_file" "gcp_sa_key" {
  identifier  = "gcp_sa_key"
  name        = "GCP Service Account Key"
  description = "Service account key for GCP access"
  org_id      = "default"
  project_id  = "myproject"

  secret_manager_identifier = "harnessSecretManager"
  file_path                 = var.gcp_sa_key_path

  tags = [
    "env:prod",
    "provider:gcp",
  ]
}
```

```yaml title="secret-config.yaml"
secret:
  type: SecretText
  name: GitHub PAT
  identifier: github_pat
  orgIdentifier: default
  projectIdentifier: myproject
  spec:
    secretManagerIdentifier: harnessSecretManager
    valueType: Inline
```

:::info API Key Permissions
API keys used for secret management must have the appropriate RBAC permissions. Ensure the API key's service account has at minimum `secret_edit` permissions for creating and updating secrets, and `secret_delete` for deletion operations.
:::