---
title: Manage Connectors
sidebar_label: Manage Connectors
description: Step-by-step instructions for creating, viewing, testing, editing, and deleting connectors in Harness 3.0, along with best practices for organization and security.
keywords:
  - manage connectors
  - create connector
  - test connection
  - delete connector
  - naming conventions
  - connector best practices
tags:
  - connectors
  - platform
sidebar_position: 3
---

Connectors are created once and then referenced by every pipeline, trigger, and platform feature that needs the external service. This topic walks through the full connector lifecycle in the Harness UI, from creation and validation through editing and deletion, and closes with the conventions that keep a large connector inventory maintainable.

---

## What will you learn in this topic?

By the end of this topic, you will be able to:

- <a href="#create-connectors">Create a connector at the correct scope and validate it</a>.
- <a href="#view-and-search-connectors">Find a specific connector using search, filters, and sorting</a>.
- <a href="#test-connectors">Run a connection test and interpret the result</a>.
- <a href="#edit-and-delete-connectors">Modify or remove a connector safely</a>.
- <a href="#best-practices">Apply naming, security, and maintenance conventions</a>.

---

## Before you begin

Before you create or modify a connector, ensure you have the following:

- **Connector permissions**: Create and edit permissions on connectors at the target scope. For more information on connector permissions, see <a href="/docs/platform/connectors/manage-access-control-for-connectors" target="_blank">Manage access control for connectors</a>.
- **Provider credentials**: A token, key, certificate, or service account for the external service, stored as a Harness secret. For more information on creating secrets, see <a href="/3k-docs/platform/getting-started/secrets/manage" target="_blank">Manage secrets</a>.
- **Connector type selection**: The connector type and required properties for your provider. For more information on supported providers, see <a href="/3k-docs/platform/getting-started/connectors/types" target="_blank">Connector types</a>.
- **Delegate access**: A <a href="/docs/platform/delegates/delegate-concepts/delegate-overview" target="_blank">Harness Delegate</a> that can reach the target service, for private or on-premise endpoints.

---

## Create connectors

Create a connector before any pipeline references it, so that credentials and connectivity are validated up front. The exact fields vary by connector type, but the workflow is consistent across all types.

**Step 1: Navigate to Connectors**

Open Harness and navigate to the scope where you want to create the connector (**Account**, **Organization**, or **Project**). From there, you can reach the **Connectors** list in two ways:

- **From General Settings**: Select **General Settings** in the left navigation panel, then select **Connectors**.
- **From the more menu**: Select **more** in the left navigation panel, then select **Connectors** under **Resources**. If **Connectors** is not listed, click **See all** to view every resource.

Connectors might appear on **Recent** in the left navigation panel and can be pinned if required.

**Step 2: Select the connector type**

Click **+Create Connector**. In the **Connector Setup** panel, search for the type you need, or click the **Filter** icon to narrow the catalog by category, for example, **Code Repository**, **Artifact Repository**, or **Secret Manager**. Select a connector type, such as GitHub, Docker, or Artifactory, to open the **Connect to** panel for that type.

**Step 3: Name the connector**

In the **Name** field, accept the suggested name or enter a descriptive display name, for example, `Production GitHub`. Harness derives the identifier from the name and displays it next to **Id**. To set a custom identifier, click the **Edit**. The identifier is immutable after creation.

**Step 4: Enter the provider details**

Complete the fields the connector type asks for. A red asterisk marks a required field, and the set differs by type, so not every field below appears for every connector. The most common ones are:

- **Provider variant**: Select where the service runs, for example, **Cloud** or **Enterprise** for GitHub, and **DockerHub** or **Other** for Docker.
- **Endpoint**: Enter the URL of the external service, for example, **Artifactory Repository URL**.
- **Authentication**: Select the method the provider supports. **OAuth** replaces the credential fields with a **Connect** button that authorizes Harness through the provider. Methods such as **Username and Password** ask for credentials instead: enter the username as **Plain Text**, or select the dropdown to reference a Harness secret or an expression, then click **Create or Select** for the password, token, or key.

**Step 5: Configure the connection settings**

Expand **Connection** to control how Harness reaches the service. These fields are common to every connector type:

- **Delegate**: Set to **On** to route traffic through a Harness Delegate for behind-the-firewall access, then use **Delegate selector** to target specific delegates and **Timeout (in seconds)** to bound the connection attempt. Leave it **Off** for services Harness can reach directly.
- **Secure Tunnel**: Set to **Enabled** to route traffic through Harness Secure Connect instead of a delegate. This requires the Secure Connect client.

**Step 6: Scope the resources (optional)**

Some connector types add extra sections for the resources they reach. Code repository connectors, for example, include a **Cloning** section with **Connection Type** (**HTTP** or **SSH**), and a **Resources** section where you narrow what the connector can access:

- **Organization**: Limits access to resources in the named organization.
- **Repository**: Limits access to the named repository.
- **Test Repository**: The repository Harness checks when you test the health of the connector.

**Step 7: Add metadata (optional)**

Expand **Metadata** and enter a **Description** that explains the purpose of the connector, and **Tags** for filtering and organization. Separate tags with commas, and use the `key:value` format for object entries.

**Step 8: Create the connector**

Click **Submit**.

:::tip Use YAML for automation
You can also create connectors using YAML definitions, the Harness REST API, or the Terraform provider. Use one of these methods for infrastructure-as-code workflows, where connectors are version-controlled alongside pipeline definitions. For more information on these formats, see <a href="/3k-docs/platform/getting-started/connectors/configure" target="_blank">Connector configuration reference</a>.
:::

---

## View and search connectors

The **Connectors** list page displays all connectors available at the current scope. Use it to audit connector health and locate the identifier you need for a pipeline reference.

A status icon precedes every connector name: a green check mark for a successful connection, and a red cross for a failed one. Click **More** (⋮) at the end of a row to act on that connector.

### Choose the columns

The list shows **Name**, **Type**, **Created**, and **Updated** by default. Select the **Columns** dropdown to show or hide columns, and select **Reset** to return to the default set.

| Column | Description | Shown by default |
|---|---|---|
| Name | Display name of the connector, with its status icon. | Yes |
| Type | The provider the connector connects to, for example, Docker, Kubernetes, or GitHub, with the provider icon. | Yes |
| Created | How long ago the connector was created. | Yes |
| Updated | How long ago the connector was last modified. | Yes |
| ID | The immutable identifier you reference from pipelines. | No |
| Description | The description entered in the **Metadata** section. | No |
| Tags | The tags applied to the connector. | No |

### Search, filter, and sort

Use the toolbar above the connector list to narrow a long list to the connector you need.

- **Search**: Enter a name in the **Search** field to filter connectors as you type.
- **Add filter**: Click **Add filter**, then select an attribute to filter on: **Type**, **Status**, **Pinned**, **Tags**, **Name**, or **Description**. Add more than one filter to combine conditions.
- **Sort**: Select the sort dropdown, which shows the active option, to sort by **Last modified**, **Newest**, **Oldest**, **Name (A->Z, 0->9)**, or **Name (Z->A, 9->0)**. **Last modified** is the default.

---

## Test connectors

You can test a connector to verify that the credentials are valid, the endpoint is reachable, and the required permissions are in place. Run a test after every configuration change and after any credential rotation.

There are two ways to test a connector.

- **From the connector list**: Click **More**(⋮) on any connector row and select **Test Connection**. The result, either success or failure with error details, appears inline as a status update on the connector row.
- **From the connector details page**: Select a connector by clicking its name, then click **Test Connection** in the header. The details page shows the full test result, including step-by-step validation output for connectivity, authentication, and authorization.

A successful test validates basic connectivity and credentials, but it does not guarantee that a pipeline using the connector succeeds. Pipeline execution can require additional permissions, such as write access to a repository, or it can use a different delegate than the one selected for the test. For more information on this discrepancy, see <a href="/3k-docs/platform/getting-started/connectors/troubleshooting" target="_blank">Connector troubleshooting</a>.

---

## Edit and delete connectors

Update a connector in place when credentials rotate or endpoints change, and delete a connector only after you confirm nothing references it.

### Edit a connector

You can edit a connector by opening it from the connector list, or by clicking **More**(⋮) and selecting **Edit**. You can modify any field except the identifier, which is immutable after creation. After you make changes, click **Save** to validate the updated configuration.

### Delete a connector

You can delete a connector by clicking **More**(⋮) on the connector row and selecting **Delete**. A confirmation dialog appears before the connector is permanently removed.

:::warning
Deleting a connector breaks any pipeline, trigger, or other resource that references it. Before you delete a connector, verify that it is not in use by searching for its identifier across your pipelines and configurations. Harness does not block deletion of connectors that have active references, and the referencing resources fail at execution time.
:::

---

## Best practices

Follow these practices to keep your connectors organized, secure, and maintainable as your organization scales.

### Naming conventions

Use a consistent naming pattern that includes the provider and purpose, such as `aws_prod_deploy` or `github_ci_readonly`. Include the environment in the name for environment-specific connectors, for example, `k8s_staging` or `k8s_production`. Avoid special characters in identifiers, and use underscores or camelCase for readability.

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

### Organize connectors

- **Tags**: Apply consistent tags to group connectors by team, environment, region, or application, for example, `env:production` or `team:platform`.
- **Pinning**: Pin frequently used connectors to the top of the list for quick access.
- **Scope selection**: Create shared connectors at the **Account** or **Organization** level, and project-specific connectors at the **Project** level. Avoid duplicating connectors across projects.

### Secure connectors

- **Rotate credentials regularly**: Set up a schedule to rotate tokens, keys, and passwords. Use short-lived tokens where possible.
- **Grant minimum access**: Grant connectors only the permissions they need. Use read-only tokens for CI connectors, and write-scoped tokens only for deployment connectors.
- **Separate by environment**: Use different connectors, and different credentials, for development, staging, and production to limit the blast radius of a compromised credential.

### Monitor connectors

- **Set up alerts**: Configure notifications for connector status changes so that failures are caught early.
- **Review status regularly**: Periodically check the connector list for connectors in Failed status and resolve the issues promptly.

### Maintain connectors

- **Clean up unused connectors**: Regularly audit and remove connectors that are no longer referenced by any pipeline or resource.
- **Document credential rotation**: Record the rotation schedule and assign ownership to specific team members.
- **Use version control**: Store connector definitions as YAML in a Git repository and manage changes through pull requests for auditability.

---

## Next steps

- <a href="/3k-docs/platform/getting-started/connectors/configure" target="_blank">Connector configuration reference</a>: To define connectors in YAML, Terraform, or the REST API.
- <a href="/3k-docs/platform/getting-started/connectors/troubleshooting" target="_blank">Connector troubleshooting</a>: To resolve failed connections, timeouts, and permission errors.
- <a href="/3k-docs/platform/getting-started/pipeline" target="_blank">Pipeline YAML v1 overview</a>: To reference the connector from a pipeline stage.