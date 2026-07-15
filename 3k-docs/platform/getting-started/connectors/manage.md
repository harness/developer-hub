---
title: Managing Connectors
sidebar_label: Managing Connectors
description: Step-by-step instructions for creating, viewing, testing, editing, and deleting connectors in Harness 3.0, along with best practices for organization and security.
sidebar_position: 3
---

Step-by-step instructions for creating, viewing, testing, editing, and deleting connectors in Harness 3.0, along with best practices for organization and security.

---

## Creating connectors

To create a new connector, follow the steps below. The exact fields vary based on the connector type, but the general workflow is consistent across all types.

1. **Navigate to Connectors** — Open the Harness platform and navigate to the scope where you want to create the connector (Account, Organization, or Project). Go to **Settings** and select **Connectors** from the left navigation panel.

2. **Select Connector Type** — Click **+ New Connector**. Browse or search the connector catalog to find the desired type (e.g., GitHub, AWS, Kubernetes, Vault). Click on the connector type to begin configuration.

3. **Configure Overview** — Enter the connector details in the Overview section:
   - **Name** — A descriptive display name (e.g., "Production GitHub").
   - **Identifier** — Auto-generated from the name, or set a custom identifier. This is immutable after creation.
   - **Description** — Optional text describing the purpose of the connector.
   - **Tags** — Optional key-value tags for filtering and organization.

4. **Configure Connection Details** — Enter the type-specific connection settings. The fields vary by connector type:
   - **Code Repos** — URL, connection type (HTTP/SSH), authentication method, API access toggle.
   - **Cloud Providers** — Credential type, access key/role ARN/service account, region, delegate selectors.
   - **Secret Managers** — Vault URL, authentication method, secret engine, base path.
   - **Kubernetes** — Master URL, authentication method, namespace.

5. **Connect and Test** — Click **Save and Test** to save the connector and run a connectivity test. Harness will validate the credentials, network connectivity, and permissions. If the test fails, review the error message and correct the configuration before proceeding.

:::tip Use YAML for Automation
You can also create connectors using YAML definitions, the Harness REST API, or the Terraform provider. This is recommended for infrastructure-as-code workflows where connectors are version-controlled alongside pipeline definitions.
:::

---

## Viewing and searching connectors

The Connectors list page displays all connectors available at the current scope. The table includes the following columns:

| Column | Description |
|---|---|
| Name | Display name and identifier of the connector, with type icon. |
| Type | The connector category and provider (e.g., GitHub, AWS, Vault). |
| Status | Connection health indicator: Active (green), Failed (red), or Unconfigured (gray). |
| Created | Date and user who created the connector. |
| Updated | Date of the most recent modification. |
| Actions | Context menu with Edit, Delete, Test Connection, and Copy Identifier options. |

### Search and filter

Use the toolbar above the connector list to find specific connectors:

- **Search Bar** — Type to filter connectors by name or identifier in real time.
- **Filter Button** — Click the filter icon to narrow results by connector type, status, pinned status, or tags.
- **Sort Options** — Sort by name (A-Z or Z-A), creation date, or last updated date.

---

## Testing connectors

Testing a connector verifies that the credentials are valid, the endpoint is reachable, and the required permissions are in place. There are two ways to test a connector:

**From the Connector List** — Click the three-dot menu on any connector row and select **Test Connection**. The result (success or failure with error details) appears inline as a status update on the connector row.

**From the Connector Details Page** — Open a connector by clicking its name, then click the **Test** button in the header. The details page shows the full test result including step-by-step validation output (connectivity, authentication, authorization).

:::info Test Connection vs Pipeline Execution
The test connection feature validates basic connectivity and credentials. However, a successful test does not guarantee that a pipeline using this connector will succeed. Pipeline execution may require additional permissions (e.g., write access to a repository) or use a different delegate than the one selected for the test.
:::

---

## Editing and deleting connectors

### Editing a connector

To edit a connector, open it from the connector list or use the three-dot menu and select **Edit**. You can modify any field except the identifier, which is immutable after creation. After making changes, click **Save and Test** to validate the updated configuration.

### Deleting a connector

To delete a connector, use the three-dot menu on the connector row and select **Delete**. A confirmation dialog will appear before the connector is permanently removed.

:::warning Deletion Warning
Deleting a connector will break any pipelines, triggers, or other resources that reference it. Before deleting, verify that the connector is not in use by searching for its identifier across your pipelines and configurations. Harness does not currently block deletion of connectors that have active references — the referencing resources will fail at execution time.
:::

---

## Best practices

Follow these best practices to keep your connectors organized, secure, and maintainable as your organization scales.

### Naming conventions

Use a consistent naming pattern that includes the provider and purpose, such as `aws_prod_deploy` or `github_ci_readonly`. Include the environment in the name when creating environment-specific connectors (e.g., `k8s_staging`, `k8s_production`). Avoid special characters in identifiers — use underscores or camelCase for readability.

```yaml title="naming-conventions.yaml"
# Pattern: {provider}_{environment}_{purpose}

# Code Repositories
github_prod_ci            # GitHub connector for production CI builds
gitlab_staging_manifests  # GitLab connector for staging K8s manifests

# Cloud Providers
aws_prod_deploy           # AWS connector for production deployments
aws_dev_infra             # AWS connector for dev infrastructure
gcp_staging_gke           # GCP connector for staging GKE cluster

# Kubernetes Clusters
k8s_prod_us_east          # K8s connector for prod US-East cluster
k8s_staging_eu_west       # K8s connector for staging EU-West cluster

# Secret Managers
vault_prod_secrets        # Vault connector for production secrets
vault_dev_secrets         # Vault connector for development secrets
```

### Organization

**Tags** — Apply consistent tags to group connectors by team, environment, region, or application (e.g., `env:production`, `team:platform`).

**Pinning** — Pin frequently used connectors to the top of the list for quick access.

**Scope Selection** — Create shared connectors at the account or organization level, and project-specific connectors at the project level. Avoid duplicating connectors across projects.

### Security

**Rotate Credentials Regularly** — Set up a schedule to rotate tokens, keys, and passwords. Use short-lived tokens where possible.

**Minimum Access** — Grant connectors only the permissions they need. Use read-only tokens for CI connectors and write-scoped tokens only for deployment connectors.

**Separate by Environment** — Use different connectors (and credentials) for development, staging, and production to limit blast radius.

### Monitoring

**Set Up Alerts** — Configure notifications for connector status changes so failures are caught early.

**Review Status Regularly** — Periodically check the connector list for any connectors in Failed status and resolve issues promptly.

### Maintenance

**Cleanup Unused Connectors** — Regularly audit and remove connectors that are no longer referenced by any pipeline or resource.

**Credential Rotation** — Document the rotation schedule and assign ownership to specific team members.

**Version Control** — Store connector definitions as YAML in a Git repository and manage changes through pull requests for auditability.