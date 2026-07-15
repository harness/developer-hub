---
title: Secret Types
sidebar_label: Secret Types
description: Harness supports two types of secrets — Text Secrets for inline string values and File Secrets for uploaded file content. Both are encrypted and can be stored in the built-in or any external secret manager.
sidebar_position: 2
---

Harness supports two types of secrets: Text Secrets for inline string values and File Secrets for uploaded file content. Both types are encrypted and can be stored in the built-in or any external secret manager.

---

## Text secrets

Text secrets store inline string values such as passwords, tokens, and API keys. The value is provided directly as a string when creating the secret.

**Common uses:** API keys and access tokens, database passwords and connection strings, OAuth client secrets and refresh tokens, private keys stored as PEM-encoded strings, configuration values that must remain confidential.

| Property | Value |
|---|---|
| Maximum size | 50 MB |
| Encoding | UTF-8 |
| Multi-line support | Yes — newlines and whitespace are preserved |
| Type identifier | `SecretText` |

### Examples

```yaml title="api-token-example.yaml"
# API Token
# Type: SecretText
# Name: GitHub API Token
# ID: github_api_token
# Value: ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

```yaml title="db-password-example.yaml"
# Database Password
# Type: SecretText
# Name: Production DB Password
# ID: prod_db_password
# Value: S3cur3P@ssw0rd!2026
```

```yaml title="ssh-key-text-example.yaml"
# SSH Private Key as Text
# Type: SecretText
# Name: Deploy SSH Key
# ID: deploy_ssh_key
# Value: (PEM-encoded private key content)
# -----BEGIN OPENSSH PRIVATE KEY-----
# b3BlbnNzaC1rZXktdjEAAAAA...
# -----END OPENSSH PRIVATE KEY-----
```

```yaml title="multiline-config-example.yaml"
# Multi-line Configuration Value
# Type: SecretText
# Name: TLS Certificate Chain
# ID: tls_cert_chain
# Value:
# -----BEGIN CERTIFICATE-----
# MIIDXTCCAkWgAwIBAgIJALa...
# -----END CERTIFICATE-----
# -----BEGIN CERTIFICATE-----
# MIIEvTCCA6WgAwIBAgIQBNn...
# -----END CERTIFICATE-----
```

---

## File secrets

File secrets store the content of uploaded files. The file is read, base64-encoded, and stored as an encrypted value. At runtime, the file content is decoded and made available to the pipeline execution.

**Common uses:** GCP service account JSON key files, Kubernetes kubeconfig files, TLS/SSL certificate and private key PEM files, license files and configuration bundles.

| Property | Value |
|---|---|
| Maximum size | 50 MB |
| File types | Any file type (`.json`, `.yaml`, `.pem`, `.p12`, `.key`, `.txt`, etc.) |
| Storage format | Base64-encoded |
| Type identifier | `SecretFile` |

:::info Base64 Encoding
File secrets are automatically converted to base64-encoded text when stored. When you retrieve a file secret in a pipeline, you may need to decode it before use. See the Managing Secrets section for decoding examples.
:::

### Examples

```json title="gcp-sa-key-example.json"
// GCP Service Account Key
// Type: SecretFile
// Name: GCP SA Key - Production
// ID: gcp_sa_key_prod
// File: service-account.json
{
  "type": "service_account",
  "project_id": "my-project-123",
  "private_key_id": "key-id-here",
  "private_key": "-----BEGIN RSA PRIVATE KEY-----\n...",
  "client_email": "sa@my-project-123.iam.gserviceaccount.com",
  "client_id": "123456789",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token"
}
```

```yaml title="kubeconfig-example.yaml"
# Kubeconfig File
# Type: SecretFile
# Name: Production Kubeconfig
# ID: prod_kubeconfig
# File: kubeconfig.yaml
apiVersion: v1
kind: Config
clusters:
  - cluster:
      server: https://k8s.example.com:6443
      certificate-authority-data: LS0tLS1CRUd...
    name: production
contexts:
  - context:
      cluster: production
      user: deploy-user
    name: production
current-context: production
users:
  - name: deploy-user
    user:
      token: eyJhbGciOiJSUzI1NiIs...
```

```yaml title="private-key-example.pem"
# Private Key PEM File
# Type: SecretFile
# Name: TLS Private Key
# ID: tls_private_key
# File: server.key
-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEA2a2rwplBQLzHPZe...
-----END RSA PRIVATE KEY-----
```

---

## External secret managers

Harness integrates with external secret management platforms, allowing you to leverage your existing secrets infrastructure. When an external secret manager is configured, Harness stores only a reference to the secret path — the actual value remains in your infrastructure.

### Supported platforms

| Platform | Authentication Methods | Features |
|---|---|---|
| HashiCorp Vault | Token, AppRole, AWS IAM, Kubernetes | Dynamic secrets, leasing, namespaces |
| AWS Secrets Manager | Access Key, IAM Role, IRSA | Automatic rotation, cross-account access |
| GCP Secret Manager | Service Account Key, Workload Identity | Versioning, IAM policies, replication |
| Azure Key Vault | Client Secret, Managed Identity | HSM-backed keys, soft-delete, purge protection |
| Custom | Shell script on Delegate | Any secret manager accessible from the Delegate |

### Configuration steps

1. Navigate to **Account Settings → Connectors → Secret Managers**.
2. Select the external secret manager type you want to configure.
3. Provide the connection details: endpoint URL, authentication credentials, and any platform-specific settings.
4. Test the connection to verify that Harness can reach your secret manager.
5. Save the configuration. The secret manager is now available for use when creating secrets.

### Benefits

**Secrets remain in your infrastructure** — Harness never stores the actual secret value. Only a reference to the path in your secret manager is persisted.

**Existing rotation policies apply** — Continue using your organization's existing rotation schedules and automation. Harness resolves the latest value at execution time.

**Data residency compliance** — Secret values remain in the region and infrastructure where your secret manager is deployed, satisfying data residency requirements.

:::warning Delegate Required
External secret managers require a Harness Delegate with network access to the secret manager endpoint. Ensure the Delegate can resolve the secret manager hostname and that the required ports are open in your network configuration.
:::