---
title: Integrate Self-Managed Enterprise Edition with HashiCorp Vault
sidebar_label: HashiCorp Vault Integration
description: Learn how to integrate Harness SMP with HashiCorp Vault to securely inject secrets at runtime without storing them as Kubernetes Secrets.
tags:
  - SMP
  - Security
  - Secrets
  - HashiCorp Vault
  - Integration
---

### Overview
This guide explains how to configure a self-managed Harness platform to source Harness service secrets directly from HashiCorp Vault, instead of storing them as Kubernetes Secrets.

### Key benefits

* **Eliminate Kubernetes Secrets**: Secrets are never stored in kubernetes secrets, avoiding the risk of secrets being exposed through commands such as `kubectl get secrets`.
* **Fetch secrets at runtime**: Secrets are retrieved from Vault when pods start and are made available to application containers before execution.
* **Centralize secret management**: Continue using your existing Vault instance, policies, and workflows without duplicating secrets in Kubernetes.

### How the integration works

The integration operates in two stages:

- **One-time setup**: You run a command-line tool that reads your Harness Helm chart and automatically creates the required secrets in your Vault instance.
- **Runtime behavior**: When Harness pods start, an init container authenticates with Vault, fetches the secrets required by that pod, and makes them available to the application container before it starts.

### Supported Modules
- CI
- CD
- Chaos

---
## Prerequisites

Before you start, make sure you have the following in place:

* A running HashiCorp Vault instance that can be accessed from within your Kubernetes cluster
* A Vault token with the necessary permissions to create and read secrets
* The Harness Helm chart and its associated override values file

---
## Configure HashiCorp Vault

Before generating secrets, you need to configure HashiCorp Vault with the required secret engine, policies, and authentication method.

### Step 1. Enable the Key-Value Version 2 secrets engine

:::note
This setup also works with the KV v1 secrets engine. If KV v1 is already enabled at the desired path, no additional changes are required.
:::

Enable the KV v2 secrets engine at the `secret/` path by running the following command:

```bash
vault secrets enable -path=secret kv-v2
```

### Step 2. Create a generator policy and token

The secrets generator requires a Vault token with permission to write secrets. Start by creating a policy file named `harness-generator-policy.hcl`:

```hcl
path "secret/data/harness/*" {
  capabilities = ["create", "update", "read"]
}

path "secret/metadata/harness/*" {
  capabilities = ["list", "read"]
}
```

Apply the policy and generate a token:

```bash
vault policy write harness-generator harness-generator-policy.hcl
vault token create -policy=harness-generator -ttl=24h
```

Store this token securely. You will need it later when running the generator tool.

### Step 3. Configure Kubernetes authentication

For production environments, configure Kubernetes authentication so that Harness pods can securely authenticate with Vault at runtime.

#### 3.1 Enable Kubernetes authentication

```bash
vault auth enable kubernetes
```

#### 3.2 Configure the Kubernetes auth method

```bash
vault write auth/kubernetes/config \
  kubernetes_host="https://kubernetes.default.svc:443" \
  kubernetes_ca_cert=@/var/run/secrets/kubernetes.io/serviceaccount/ca.crt \
  token_reviewer_jwt=@/var/run/secrets/kubernetes.io/serviceaccount/token
```

#### 3.3 Create a runtime policy

Create a read-only policy file named `harness-runtime-policy.hcl`. This policy allows Harness pods to read secrets from Vault at runtime.

```hcl
path "<engine>/data/<basePath>/*" {
  capabilities = ["read"]
}

path "<engine>/metadata/<basePath>/*" {
  capabilities = ["list"]
}
```

Apply the policy:

```bash
vault policy write harness-runtime harness-runtime-policy.hcl
```

#### 3.4 Create a Kubernetes auth role for Harness

Create a Kubernetes auth role that allows Harness pods running in the `harness` namespace to authenticate with Vault and read secrets during startup:

```bash
vault write auth/kubernetes/role/harness \
  bound_service_account_names=harness-default \
  bound_service_account_namespaces=harness \
  policies=harness-runtime \
  ttl=1h
```

:::note Important: Required Service Accounts

Add the following Kubernetes service accounts to the role based on the modules you are installing.
CI/CD uses the `harness-default` service account.

**Platform module (mandatory):**

* `harness-looker`
* `harness-manager`
* `harness-platform-service`
* `harness-queue-service`
* `harness-serviceaccount`
* `ng-manager`
* `template-service`

**Chaos module:**

* `chaos-linux-ifc-sa`
* `chaos-linux-ifs-sa`
* `chaos-machine-ifc-sa`
* `chaos-machine-ifs-sa`

:::



## Set up Vault-backed secrets for Harness SMP

In the previous steps, you configured HashiCorp Vault with the required secrets engine, policies, and authentication methods. With Vault now ready, you can generate the secrets required by Harness SMP and configure Harness to retrieve them directly from Vault at runtime.

This section walks you through generating those secrets and updating your Harness configuration accordingly.

### Step 1: Download the secrets generator tool

Download the secrets generator binary that matches your operating system and architecture.

**Linux (AMD64)**

```bash
curl -L -o vaultSecretGenerator \
  https://app.harness.io/public/shared/vault-secrets-generator/0.0.1/vaultSecretGenerator-linux-amd64
chmod +x vaultSecretGenerator
```

**Linux (ARM64)**

```bash
curl -L -o vaultSecretGenerator https://app.harness.io/public/shared/vault-secrets-generator/0.0.1/vaultSecretGenerator-linux-arm64
chmod +x vaultSecretGenerator
```

**macOS (AMD64)**

```bash
curl -L -o vaultSecretGenerator \
  https://app.harness.io/public/shared/vault-secrets-generator/0.0.1/vaultSecretGenerator-darwin-amd64
chmod +x vaultSecretGenerator
```

**macOS (ARM64 / Apple Silicon)**

```bash
curl -L -o vaultSecretGenerator \
  https://app.harness.io/public/shared/vault-secrets-generator/0.0.1/vaultSecretGenerator-darwin-arm64
chmod +x vaultSecretGenerator
```

**Windows (AMD64)**

```bash
curl -L -o vaultSecretGenerator \
  https://app.harness.io/public/shared/vault-secrets-generator/0.0.1/vaultSecretGenerator-windows-amd64
```

**Windows (ARM64)**

```bash
curl -L -o vaultSecretGenerator https://app.harness.io/public/shared/vault-secrets-generator/0.0.1/vaultSecretGenerator-windows-arm64
chmod +x vaultSecretGenerator
```

---

### Step 2: Prepare your Vault environment

Before proceeding, verify that the following Vault configuration steps from the prerequisites are complete:

* A generator token with write permissions has been created
* Runtime authentication with read permission is configured (Kubernetes authentication is recommended)

---

### Step 3: Configure the Vault connection in your override file

The secrets generator reads Vault connection details from your Helm values file. Add the following configuration to your `override.yaml` file:

```yaml
global:
  externalSecretsLoader:
    enabled: true
    provider: vault
    vault:
      address: "https://your-vault-instance:8200"
      engine: "secret"
      basePath: "harness"
      auth:
        method: "token"
        # The token is read from the VAULT_TOKEN environment variable
```

---

### Step 4: Generate Harness secrets in Vault

Export the generator token and run the secrets generator:

```bash
export VAULT_TOKEN="hvs.your-token-here"

./vaultSecretGenerator generate harness /path/to/harness-helm-chart -f override.yaml
```

This command reads the configuration from `override.yaml`, scans the Harness Helm chart for required secrets (such as database credentials, API keys, and certificates), generates secure secret values, and uploads the secrets to Vault under the `secret/harness/*` path. 

### Step 5: Add required secrets to Vault

Before proceeding, manually add the following secrets to your Vault instance under the appropriate paths:

  1. **Add license-related secrets**

    | Vault Path                                                     | Description         |
    | -------------------------------------------------------------- | ------------------- |
    | `<engine>/<basePath>/looker/env-secrets/LICENSE_FILE`          | Looker license file |
    | `<engine>/<basePath>/looker/env-secrets/LICENSE_KEY`           | Looker license key  |
    | `<engine>/<basePath>/harness-manager/env-secrets/LICENSE_INFO` | CG license key      |
    | `<engine>/<basePath>/ng-manager/env-secrets/SMP_LICENSE`       | NG license key      |

  2. **Add log service storage credentials**

    | Vault Path                                                                     | Description                                 |
    | ------------------------------------------------------------------------------ | ------------------------------------------- |
    | `<engine>/<basePath>/log-service/env-secrets/LOG_SERVICE_S3_ACCESS_KEY_ID`     | Access key for S3-compatible storage        |
    | `<engine>/<basePath>/log-service/env-secrets/LOG_SERVICE_S3_SECRET_ACCESS_KEY` | Secret access key for S3-compatible storage |

    :::note
    These credentials apply to both AWS S3 and external S3-compatible storage such as **MinIO**.
    :::

  3. **Verify paths and permissions**

    * Ensure all secret paths match the configured engine and base path.
    * Confirm Vault policies allow the Harness services to read these secrets.

### Optional: 

1. Store generated secrets in a JSON file for backup. To save the generated secrets to a local JSON file, run:

    ```bash
    export VAULT_TOKEN="hvs.your-token-here"

    ./vaultSecretGenerator generate harness /path/to/harness-helm-chart \
      -f override.yaml \
      --output-json ./harness-secrets-backup.json
    ```

2. If you already have a JSON file containing the secret values you want to use, you can upload those secrets to Vault instead of regenerating them. This can be useful if you want to reuse existing secrets or if you need to migrate secrets from an existing secret manager. To upload the secrets, run the following command:

    ```bash
    export VAULT_TOKEN="hvs.your-token-here"

    ./vaultSecretGenerator generate \
      --input-json ./harness-secrets-backup.json \
      harness /path/to/harness-helm-chart \
      -f override.yaml
    ```

---

### Step 5: Configure Vault authentication for Harness

Update `override.yaml` to match the authentication method to be used by the Harness pods.

1: Kubernetes authentication (recommended)

    ```yaml
    global:
      externalSecretsLoader:
        enabled: true
        provider: vault
        vault:
          address: "http://vault.vault.svc.cluster.local:8200"
          engine: "secret"
          basePath: "harness"
          auth:
            method: "kubernetes"
            role: "harness"           # role created in vault
            serviceAccount: "<serviceaccount>"       # loader serviceaccount for auth
    ```

2. Token authentication (not recommended for production)

:::warning
This method stores your Vault token in plaintext in the ConfigMap resource. This is not recommended for production use, as it exposes your Vault token in plaintext. 
:::

    ```yaml
    global:
      externalSecretsLoader:
        enabled: true
        provider: vault
        vault:
          address: "http://vault.vault.svc.cluster.local:8200"
          engine: "secret"
          basePath: "harness"
          auth:
            method: "token"
            token: "hvs.your-token-here" #Plaintext token
    ```

---

## Step 6: Configure Database Secrets

### 1. Database Credentials

Database credentials can be managed differently depending on whether you are using an external databas or an internal (Harness-managed) database.

**1.1 Static Credentials (External Databases Only)**

    For external databases, customers can choose to use static credentials stored in Vault’s KV secrets engine.

    * **Setup:**
      Customers must manually create and manage the database credentials in their Vault instance.

    * **Configuration:**
      Customers must explicitly override the Vault path in `values.yaml` to point to the location where the static credentials are stored.

    * **Behavior:**
      At runtime, the secrets loader fetches credentials from the user-provided Vault KV path.

    Example configuration:

    ```yaml
    global:
      externalSecretsLoader:
        databases:
          # MongoDB (external)
          mongo:
            engine: ""        # KV engine name for static credentials
            overridePath: ""  # Vault path where static credentials are stored
    ```

**1.2 Dynamic Credentials (External Databases Only)**

      Harness also supports Vault’s Database Secrets Engine for external databases, which generates short-lived, dynamic credentials on demand. To enable dynamic credentials:

      1. Configure the Database Secrets Engine and role in Vault.
      2. Update `override.yaml` to instruct the loader to use the Database Secrets Engine instead of static KV secrets.

      Example configuration:

      ```yaml
      global:
        externalSecretsLoader:
          databases:
            # MongoDB (external)
            mongo:
              useDatabaseSecretsEngine: "true"
              databaseRole: "harness-mongo-role"
      ```

For internal databases managed by Harness, database credentials are automatically generated and managed by Harness.
No manual Vault configuration or overrides are required.

---

### 2. Database SSL Certificates (Optional)

If your databases require SSL/TLS, the generator can also help manage the necessary certificates. Before running the generator, add the following section to your `override.yaml`:

```yaml
global:
  # Database SSL configuration (optional)
  databases:
    postgres:
      ssl:
        enabled: true
        caFileKey: "caFile"                    # Key name in Vault for CA certificate
        trustStoreKey: "trustStore"             # Key name in Vault for TrustStore
        trustStorePasswordKey: "trustStorePassword"
```

#### Certificate handling behavior
- During secret generation, the tool checks `secret/harness/{dbType}` for the required certificate keys. If any are missing, it provides instructions for uploading the certificates to Vault.
- At runtime, the loader retrieves the certificates from Vault and mounts them into the application container.

---

## Step 7: Deploy Harness

Deploy or upgrade Harness using the updated override file:

```bash
helm install harness harness/harness -f override.yaml -n harness
```

```bash
# Upgrade existing installation
helm upgrade harness harness/harness -f override.yaml -n harness
```

---

## Step 8: Verify the Integration

Verify that all pods have successfully transitioned to the **Running** state:

```bash
kubectl get pods -n harness
```

---

## Updating secrets and rotation

Secrets are injected into pods only at startup through an init container. As a result, changes made to secrets in Vault are not automatically reflected in running pods. To apply updated values, you must restart the affected pods. This ensures that the pods use the latest values from Vault.

### 1. Manual secret updates (static secrets)

If you manually update a secret in Vault, for example, when rotating an API key or updating a certificate, you must restart the relevant pods so they can retrieve the new values.

#### Step 1: Update the secret in Vault

```bash
vault kv put secret/harness/platform-service/env-secrets API_KEY="new-value"
```

#### Step 2: Restart the pods

Trigger a rollout restart so the init container runs again and fetches the updated secrets. Restart a specific deployment:

```bash
kubectl rollout restart deployment platform-service -n harness
```

Restart all deployments in the namespace (for example, if a shared secret was updated):

```bash
kubectl rollout restart deployment -n harness
```

---

### 2. Dynamic database credentials (TTL expiry)

When using dynamic database credentials through the Vault database secrets engine, credentials are issued with a defined time-to-live (TTL).

- **Behavior:** Vault generates database credentials that are valid for the configured TTL (for example, 24 hours).
- **Expiry:** Once the TTL expires, the credentials become invalid and the application loses database connectivity.
- **Rotation:** To rotate credentials, the pod must be restarted before the TTL expires so that new credentials can be fetched.

:::note Important
Any updates to these secrets must be managed by the customer. Harness does not currently support automatic restarts or secret change watchers.
:::

---

## Advanced configuration

### Generator tool options

The `vaultSecretGenerator` tool supports the following command format:

```bash
./vaultSecretGenerator generate [OPTIONS] <release-name> <chart-path> -f <values-file>
```

#### Required arguments

* `<release-name>`: Name of your Harness release (for example, `harness`)
* `<chart-path>`: Path to the Harness Helm chart directory
* `-f <values-file>`: Override values file (can be specified multiple times)

#### Environment variables

* `VAULT_TOKEN`: Vault token with write permissions (required)

#### Optional flags

* `--input-json <file>`: Path to a JSON file containing pre-generated secrets. When specified, secret generation is skipped and existing secrets are uploaded to Vault.
* `--output-json <file>`: Saves generated secrets to a JSON file for backup or migration purposes.

    :::info
    Vault connection details—including the address, engine, base path, and authentication method—are read from `override.yaml` under `global.externalSecretsLoader.vault`, not from command-line flags.
    :::

### Example 

1. Basic usage

    ```bash
    export VAULT_TOKEN="hvs.your-token-here"

    ./vaultSecretGenerator generate harness ./harness-chart -f override.yaml
    ```

2. Using multiple override files

    ```bash
    export VAULT_TOKEN="hvs.your-token-here"

    ./vaultSecretGenerator generate harness ./harness-chart \
      -f base-values.yaml \
      -f override.yaml \
      -f secrets-config.yaml
    ```

---

## How secrets are organized in Vault

The Harness secrets generator stores secrets in Vault using a predictable path structure, making it easier to manage, audit, and troubleshoot secrets across services.

| Secret type               | Vault path                              | Example                                       | Description                                                          |
| ------------------------- | --------------------------------------- | --------------------------------------------- | -------------------------------------------------------------------- |
| **Environment variables** | `secret/harness/{service}/env-secrets`  | `secret/harness/platform-service/env-secrets` | Key-value pairs injected into the container as environment variables |
| **File-based secrets**    | `secret/harness/{service}/file-secrets` | `secret/harness/gateway/file-secrets`         | File-based secrets such as SSL certificates and JKS keystores        |
| **Database credentials**  | `secret/harness/{db-name}`              | `secret/harness/timescaledb`                  | Static database credentials (when not using dynamic secrets)         |

---

## Backup and restore secrets
:::note
The secrets generator does not create automatic backups. You must explicitly use the `--output-json` flag to save secrets to a file.
:::

You can create a backup of your secrets by saving them to a JSON file using the `--output-json` flag. This is useful for creating a backup or migrating secrets to another Vault instance.

To create a backup of your secrets, run the following command:

```bash
export VAULT_TOKEN="hvs.your-token-here"

./vaultSecretGenerator generate \
  --input-json ./harness-secrets-backup.json \
  harness ./harness-chart \
  -f override.yaml
```

---

### Configuration options

The following example shows all supported configuration options for using Vault-backed secrets with Harness. This configuration is required to load secrets from Vault at runtime. 

You can configure the following options in your `override.yaml` file:

```yaml
global:
  externalSecretsLoader:
    enabled: true
    provider: vault
    vault:
      address: "http://vault.vault.svc.cluster.local:8200"
      engine: "secret"
      basePath: "harness"
      auth:
        method: "kubernetes" # Supported values: kubernetes, token, approle
        role: "harness"      # Required for Kubernetes authentication
        # token: "hvs.xxx"   # Token authentication (development only)

    # Database configuration
    databases:
      timescaledb:
        useDatabaseSecretsEngine: "true"
        databaseRole: "harness-timescaledb-role"
          engine: ""
          overridePath: ""

      mongo:
        useDatabaseSecretsEngine: "true"
        databaseRole: "harness-mongo-role"
        engine: ""
        overridePath: ""

      redis:
        useDatabaseSecretsEngine: "true"
        databaseRole: "harness-redis-role"
        engine: ""
        overridePath: ""
```

## How secrets are loaded

When a pod starts, an init container is responsible for retrieving secrets from Vault and making them available to the application container. The process follows these steps:

1. **Authenticate to Vault**: The init container authenticates to Vault using the configured authentication method.
2. **Fetch environment variable secrets**: The init container fetches environment variable secrets from `secret/harness/{service}/env-secrets`.
3. **Fetch file-based secrets**: The init container fetches file-based secrets from `secret/harness/{service}/file-secrets`.
4. **Generate database credentials**: If the database secrets engine is enabled, the init container generates database credentials from `database/creds/{role}`.
5. **Write secrets to a shared volume**: The init container writes secrets to a shared volume:
   * Environment variables are written to `/opt/harness/secrets/.env`.
   * File-based secrets are written to `/opt/harness/secrets/files/{filename}`.
6. **Exit successfully**: The init container exits successfully, allowing the main application container to start.

---

### File type detection

The secrets loader automatically detects file-based secrets based on their file extensions. Detected files are written to `/opt/harness/secrets/files/` with permissions set to `0600` (read/write access for the owner, no access for group or others) and owned by the root user and group. Supported file extensions include `.crt`, `.pem`, `.key`, `.jks`, and `.p12`.

---

## Troubleshooting

This section covers common issues you may encounter when using Vault-backed secrets with Harness and how to resolve them.

### Common init container issues

| Error or symptom                           | Likely cause                           | Solution                                                                                                                                                                                                                          |
| ------------------------------------------ | -------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Permission denied**                      | Vault policy or role misconfiguration  | Check the secrets loader logs. Verify that the Vault policy allows `read` access on `secret/data/...` and `list` access on `secret/metadata/...`. Also confirm the Kubernetes auth role and service account bindings are correct. |
| **Secret not found**                       | Secret missing or incorrect Vault path | Verify that the secret exists in Vault. Re-run the secrets generator if needed. Ensure the service name matches the expected Vault path.                                                                                          |
| **Connection refused** or **no such host** | Network or configuration issue         | Confirm that the Vault service is running and reachable. Check the `vault.address` value in `override.yaml`. Test connectivity using `curl` from within the cluster if possible.                                                  |
| **Pod stuck in `Init:0/1`**                | Any of the above issues                | Inspect the init container logs using `kubectl logs <pod> -c secrets-loader`. Review pod events with `kubectl describe pod <pod>`.                                                                                                |

---

## Frequently asked questions

**1. Can I use this integration with secret managers other than Vault?**
 
    Currently, only HashiCorp Vault is supported. Support for additional secret managers may be introduced in future releases.

**2. What happens if Vault is unavailable when a pod restarts?**
 
    The init container will fail and the pod will not start. Kubernetes will retry based on the configured restart policy. For production environments, ensure Vault is deployed in a highly available configuration.

**3. How do I update a secret after deployment?**

    Update the secret in Vault and restart the affected pods so they can retrieve the new values:

        ```bash
        vault kv put secret/harness/platform-service/env-secrets API_KEY="new-value"
        kubectl rollout restart deployment platform-service -n harness
        ```

**4. What is the minimum Harness Helm chart version required?**

 The external secrets loader requires Harness Helm chart version **0.36.0 or later**.


