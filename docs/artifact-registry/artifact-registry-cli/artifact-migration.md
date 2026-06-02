---
title: Migrate artifacts to Harness Artifact Registry
description: Learn how to migrate artifacts to Harness Artifact Registry using the Harness CLI.
sidebar_label: Migrate Artifacts
sidebar_position: 1
keywords:
  - artifact migration
  - artifact registry migration
  - artifact registry cli
tags:
  - artifact-registry
  - artifact-registry-cli
  - artifact-registry-migration
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

This guide walks you through migrating artifacts to Harness Artifact Registry from other artifact registries and servers using the Harness CLI.

---

## Before you begin

Make sure you have the following:

- **Harness CLI installed:** Install the [Harness CLI v1 (hc)](/docs/platform/automation/cli/install#v1.0.0-hc--installation) and authenticate to your Harness account. Use the latest version.
- **Source registry access:** Valid credentials (username and API token) for your source artifact registry (for example, Nexus).
- **Destination registries created:** Create the target registries in Harness Artifact Registry before migration. Go to [Artifact Registry best practices](/docs/artifact-registry/ar-best-practices/) to review guidance on registry setup and configuration.
- **Permissions:** Permissions to create and manage artifact registries in your Harness account. Go to [RBAC in Harness](/docs/platform/role-based-access-control/rbac-in-harness) to configure access control.

---

## Step 1: Create target registries in Harness

Before migrating, create the destination registries in Harness Artifact Registry:

1. Navigate to **Artifact Registry** in your Harness project.
2. Select **New Registry** for each registry you want to migrate to.
3. Configure the registry type, name, and settings.
4. Note the registry identifier for use in the migration configuration.

---

## Step 2: Prepare the migration configuration file

### Supported artifact types

The migration tool supports the following artifact types:

| Artifact type | Description |
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
| `COMPOSER` | Composer (PHP) packages |
| `SWIFT` | Swift packages |

### Configuration structure

Create a YAML configuration file (for example, `migration-config.yaml`) that defines your migration settings.

:::info Important configuration requirements
- Both source and destination endpoints **must use HTTPS** (`https://`).
- The destination endpoint must always be `https://pkg.harness.io`.
- Use **API tokens** (not passwords) for authentication credentials.
:::

The following example shows the configuration structure:

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
    # highlight-next-line
    sourcePackageHostname: https://registry.example.com  # Optional: override source hostname for Docker and Helm artifacts
  - artifactType: MAVEN
    sourceRegistry: maven-releases
    destinationRegistry: harness-maven-reg
```

### Configuration parameters

#### Source configuration

The source block configures the connection to your existing registry:

- **endpoint:** Full HTTPS URL of your source registry.
- **type:** Source registry type (for example, `NEXUS`, `JFROG`).
- **credentials.username:** Username for source registry authentication.
- **credentials.password:** API token for source registry (**important**: use API token, not user password). You can reference environment variables using `${VARIABLE_NAME}` syntax (for example, `${SOURCE_PASSWORD}`).
- **insecure:** Set to `true` to skip SSL certificate verification (use with caution).

#### Destination configuration

The destination block points to Harness Artifact Registry:

- **endpoint:** Always `https://pkg.harness.io` for Harness Artifact Registry.
- **type:** Always `HAR` for Harness.
- **credentials.username:** Your Harness username.
- **credentials.password:** Harness authentication token. You can reference environment variables using `${VARIABLE_NAME}` syntax (for example, `${HARNESS_TOKEN}`).

#### Mappings

Each mapping defines how artifacts are migrated from source to destination:

- **artifactType:** Type of artifact (see supported types table above).
- **sourceRegistry:** Repository name or ID in your source registry.
- **destinationRegistry:** Registry identifier in Harness (must be created beforehand).
- **sourcePackageHostname** (optional): Override the source hostname for Docker and Helm artifacts.

### Configuration best practices

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

2. **Use API tokens**, not passwords, for authentication.

3. **Always use HTTPS** (`https://`) for both source and destination endpoints.

4. **Start with low concurrency** (1-2) for initial testing, then increase for production migrations.

5. **Test with a small registry** before migrating large repositories.

---

## Step 3: Run the migration

Execute the migration using the Harness CLI:

```bash
hc registry migrate --config migration-config.yaml --verbose
```

### Available flags

| Flag | Description | Default |
|------|-------------|---------|
| `-c, --config` | Path to configuration file | `config.yaml` |
| `--concurrency` | Number of concurrent operations (overrides config) | `1` |
| `--dry-run` | Run migration in dry-run mode (no uploads, generates file list and directory structure) | `false` |
| `--overwrite` | Allow overwriting existing artifacts | `false` |
| `--pkg-url` | Base URL for the package API (overrides config) | - |
| `-v, --verbose` | Enable verbose logging | `false` |

### Example commands

Basic migration:

```bash
hc registry migrate --config migration-config.yaml
```

Migration with custom concurrency:

```bash
hc registry migrate --config migration-config.yaml --concurrency 10
```

Migration with overwrite enabled:

```bash
hc registry migrate --config migration-config.yaml --overwrite
```

Migration with verbose logging:

```bash
hc registry migrate --config migration-config.yaml --verbose
```

Dry-run migration (preview without uploading):

```bash
hc registry migrate --config migration-config.yaml --dry-run
```

This generates a file list and directory structure of what would be migrated without performing any uploads. Use this to verify your configuration before running the actual migration.

---

## Troubleshooting

<Troubleshoot
  issue="Authentication errors during artifact migration to Harness Artifact Registry"
  mode="docs"
  fallback="Verify you are using API tokens (not passwords) and that credentials have appropriate permissions to access both source and destination registries."
/>

<Troubleshoot
  issue="Connection failures when migrating artifacts with the Harness CLI"
  mode="docs"
  fallback="Ensure the source endpoint URL is correct, uses HTTPS, and is accessible from your network. If using a self-signed certificate, set insecure: true in the configuration (not recommended for production)."
/>

<Troubleshoot
  issue="Missing artifacts after migration to Harness Artifact Registry"
  mode="docs"
  fallback="Run the migration with --verbose to check logs for errors. Verify that all destination registries exist before starting migration and that the artifact type mappings are correct."
/>

For additional help, run `hc registry migrate --help` or contact Harness Support.

---

## Next steps

After successful migration:

- Update your CI/CD pipelines to use Harness Artifact Registry. Go to [Artifact Registry and CD](/docs/artifact-registry/platform-integrations/cd-ar-integrations) to configure pipeline integrations.
- Go to [Configure registries](/docs/artifact-registry/manage-registries/configure-registry) to set up upstream proxies if needed.
- Go to [Webhooks](/docs/artifact-registry/manage-registries/ar-webhooks) to configure automation for your registries.
