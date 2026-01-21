---
title: Migrate Artifacts to Harness Artifact Registry
description: Learn how to migrate artifacts to Harness Artifact Registry using the Harness CLI.
sidebar_label: Migrate Artifacts
sidebar_position: 2
keywords:
  - artifact migration
  - artifact registry migration
  - artifact registry cli
tags:
  - artifact registry cli
  - artifact registry migration
---

In this guide, we will learn how to migrate artifacts to Harness Artifact Registry from other artifact registries/servers.

## Prerequisites

Before starting the migration, ensure you have:

1. **Harness CLI installed**: Install the [Harness CLI v1 (hc)](/docs/platform/automation/cli/install#v1.0.0-hc--installation) and authenticate to your Harness account. Ensure you're using the latest version.
2. **Source registry access**: Valid credentials (username and API token) for your source artifact registry (e.g., Nexus)
3. **Destination registries created**: Create the target registries in Harness Artifact Registry before migration. Review [Artifact Registry Best Practices](/docs/artifact-registry/ar-best-practices/) for guidance on registry setup and configuration.
4. **Permissions**: Ensure you have the necessary permissions to create and manage artifact registries in your Harness account. See [RBAC in Harness](/docs/platform/role-based-access-control/rbac-in-harness) for more information on configuring access control.

## Step 1: Create Target Registries in Harness

Before migrating, create the destination registries in Harness Artifact Registry:

1. Navigate to **Artifact Registry** in your Harness project
2. Click **New Registry** for each registry you want to migrate to
3. Configure the registry type, name, and settings
4. Note the registry identifier for use in the migration configuration

## Step 2: Prepare the Migration Configuration File

### Supported Artifact Types

The migration tool supports the following artifact types:

| Artifact Type | Description |
|---------------|-------------|
| `DOCKER` | Docker container images |
| `HELM` | OCI-compliant Helm charts |
| `HELM_LEGACY` | Non-OCI compliant Helm registries (automatically migrated to OCI-compliant format) |
| `GENERIC` | Generic artifacts and files |
| `PYTHON` | Python packages (PyPI) |
| `MAVEN` | Maven artifacts |
| `NPM` | NPM packages |
| `NUGET` | NuGet packages |
| `RPM` | RPM packages |
| `GO` | Go modules |
| `CONDA` | Conda packages |

### Configuration Structure

Create a YAML configuration file (e.g., `migration-config.yaml`) that defines your migration settings.

:::info Important Configuration Requirements
- Both source and destination endpoints **must use HTTPS** (`https://`)
- The destination endpoint must always be `https://pkg.harness.io`
- Use **API tokens** (not passwords) for authentication credentials.
:::

Here's the configuration structure:

```yaml
version: 1.0.0
concurrency: 5  # Number of packages migrated concurrently.
overwrite: false  # Set to true to overwrite existing artifacts

source:
  endpoint: https://nexus.example.com  # Source registry endpoint (must use https://)
  type: NEXUS  # Source registry type (e.g., NEXUS)
  credentials:
    username: your-username
    password: your-api-token  # Use API token, not password. Can also use env var: ${SOURCE_PASSWORD}
  insecure: false  # Set to true to skip SSL verification (not recommended)

destination:
  endpoint: https://pkg.harness.io  # Harness Artifact Registry endpoint
  type: HAR
  credentials:
    username: your-harness-username
    password: your-harness-token  # Generate from Harness. Can also use env var: ${HARNESS_TOKEN}

mappings:
  - artifactType: DOCKER
    sourceRegistry: docker-local  # Source registry name
    destinationRegistry: harness-docker-reg  # Destination registry identifier in Harness
  - artifactType: HELM
    sourceRegistry: helm-local
    destinationRegistry: harness-helm-reg
    // highlight-next-line
    sourcePackageHostname: https://registry.example.com  # Optional: override source hostname which is available for docker and helm artifacts.
  - artifactType: MAVEN
    sourceRegistry: maven-releases
    destinationRegistry: harness-maven-reg
```

### Configuration Parameters

#### Source Configuration

- **endpoint**: Full HTTPS URL of your source registry
- **type**: Source registry type (e.g., `NEXUS` - refer to your source registry documentation for the correct type value)
- **credentials.username**: Username for source registry authentication
- **credentials.password**: API token for source registry (**important**: use API token, not user password). You can reference environment variables using `${VARIABLE_NAME}` syntax (e.g., `${SOURCE_PASSWORD}`)
- **insecure**: Set to `true` to skip SSL certificate verification (use with caution)

#### Destination Configuration

- **endpoint**: Always `https://pkg.harness.io` for Harness Artifact Registry
- **type**: Always `HAR` for Harness
- **credentials.username**: Your Harness username
- **credentials.password**: Harness authentication token. You can reference environment variables using `${VARIABLE_NAME}` syntax (e.g., `${HARNESS_TOKEN}`)

#### Mappings

Each mapping defines how artifacts are migrated from source to destination:

- **artifactType**: Type of artifact (see supported types above)
- **sourceRegistry**: Repository name/ID in your source registry
- **destinationRegistry**: Registry identifier in Harness (must be created beforehand)
- **sourcePackageHostname** (optional): Override the source hostname for Docker and Helm artifacts

### Configuration Best Practices

1. **Use environment variables** for sensitive credentials:
   ```yaml
   source:
     credentials:
       username: ${SRC_USER}
       password: ${SRC_TOKEN}
   destination:
     credentials:
       username: ${HARNESS_USER}
       password: ${HARNESS_TOKEN}
   ```

2. **Use API tokens**, not passwords, for authentication

3. **Always use HTTPS** (`https://`) for both source and destination endpoints

4. **Start with low concurrency** (1-2) for initial testing, then increase for production migrations

5. **Test with a small registry** before migrating large repositories

## Step 3: Run the Migration

Execute the migration using the Harness CLI:

```bash
hc registry migrate --config migration-config.yaml --verbose
```

### Available Flags

| Flag | Description | Default |
|------|-------------|---------|
| `-c, --config` | Path to configuration file | `config.yaml` |
| `--concurrency` | Number of concurrent operations (overrides config) | `1` |
| `--overwrite` | Allow overwriting existing artifacts | `false` |
| `--pkg-url` | Base URL for the package API (overrides config) | - |
| `-v, --verbose` | Enable verbose logging | `false` |

### Example Commands

**Basic migration:**
```bash
hc registry migrate --config migration-config.yaml
```

**Migration with custom concurrency:**
```bash
hc registry migrate --config migration-config.yaml --concurrency 10
```

**Migration with overwrite enabled:**
```bash
hc registry migrate --config migration-config.yaml --overwrite
```

**Migration with verbose logging:**
```bash
hc registry migrate --config migration-config.yaml --verbose
```

## Troubleshooting

If you encounter issues during migration:

- **Authentication errors**: Verify you're using API tokens (not passwords) and that credentials have appropriate permissions
- **Connection failures**: Ensure the source endpoint URL is correct, uses HTTPS, and is accessible from your network
- **Missing artifacts**: Check verbose logs for errors and verify that destination registries exist before starting migration


For additional help, run `hc registry migrate --help` or contact Harness Support.

:::note
The migration command executes immediately upon running. Features like dry-run preview and failure recovery modes are planned for future releases.
:::



## Next Steps

After successful migration:
- Update your CI/CD pipelines to use Harness Artifact Registry
- Configure [upstream proxies](/docs/artifact-registry/manage-registries/configure-registry#set-proxy-for-registry) if needed
- Set up [webhooks](/docs/artifact-registry/manage-registries/ar-webhooks) for automation