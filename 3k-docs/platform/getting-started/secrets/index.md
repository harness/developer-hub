---
title: Secrets Management Overview
sidebar_label: Secrets Overview
id: index
slug: /platform/getting-started/secrets
description: Harness Secrets provides a secure credential management system for CI/CD pipelines — store, manage, and reference sensitive data with full encryption, access control, and audit trails.
sidebar_position: 1
---

Harness Secrets provides a secure credential management system for CI/CD pipelines. Store, manage, and reference sensitive data such as API keys, passwords, certificates, and tokens with full encryption, access control, and audit trails.

---

## What are secrets?

Secrets in Harness are encrypted values that store sensitive information required by your pipelines, connectors, and services. They are never exposed in plain text through the Harness UI or API responses, and they are masked in pipeline execution logs.

### Purpose

**Encrypted Storage** — All secret values are encrypted at rest using AES-256 encryption. Values are decrypted only at the point of use during pipeline execution.

**Centralized Management** — Manage all credentials from a single location with consistent naming, scoping, and organization across your account hierarchy.

**Access Control** — Role-based access control (RBAC) governs who can view, create, edit, delete, and use secrets. Permissions are enforced at every scope level.

**External System Integration** — Connect to external secret managers such as HashiCorp Vault, AWS Secrets Manager, GCP Secret Manager, and Azure Key Vault to leverage your existing secrets infrastructure.

**Audit Trails** — Every secret access, creation, modification, and deletion is logged. Activity logs provide a complete history for compliance and security review.

**Rotation Support** — Rotate secrets manually or automatically through external secret managers. Harness resolves the latest value at execution time, minimizing downtime during rotation.

### Benefits

| Benefit | Description |
|---|---|
| Security | AES-256 encryption at rest, TLS 1.2+ in transit, automatic log masking, and zero plain-text exposure. |
| Compliance | Full audit trails, data residency controls, and integration with compliance-ready external vaults. |
| Flexibility | Support for text and file secrets, multiple secret managers, and scoped access across the hierarchy. |
| Reusability | Define a secret once and reference it across multiple pipelines, connectors, and services using expressions. |
| Traceability | Track where each secret is used, who accessed it, and when it was last modified through the activity log. |
| Rotation | Support for manual and automated rotation with external managers, resolving latest values at runtime. |

---

## Key concepts

Every secret in Harness is composed of the following attributes. Understanding these attributes is essential for creating, referencing, and managing secrets effectively.

### Secret anatomy

| Attribute | Description | Example |
|---|---|---|
| Name | Human-readable display name for the secret. | `GitHub API Token` |
| Identifier (ID) | Unique identifier used in YAML and expressions. | `github_api_token` |
| Type | Either `Text` (inline string) or `File` (uploaded file content). | `SecretText` or `SecretFile` |
| Secret Manager | The backend that stores and retrieves the encrypted value. | `harnessSecretManager` |
| Value | The actual secret content (never displayed in the UI or API responses). | `********` |
| Metadata | Optional tags and description for organization and search. | `env:prod`, `team:backend` |
| Scope | The hierarchy level at which the secret is defined. | `account` / `org` / `project` |

### Secret scope

Secrets can be created at three levels within the Harness hierarchy. The scope determines which pipelines and services can access the secret. Secrets defined at a higher scope are accessible by all entities within that scope and its children.

| Scope | Reference Syntax | Accessible By | Use Case |
|---|---|---|---|
| Account | `account.SecretName` | All organizations and projects in the account. | Shared credentials used across the entire organization, such as cloud provider master keys or enterprise license keys. |
| Organization | `org.SecretName` | All projects within the organization. | Team-level credentials such as shared database passwords or artifact registry tokens. |
| Project | `SecretName` | Only pipelines and services within that project. | Project-specific credentials such as service API keys or environment-specific passwords. |

:::tip Scope Best Practice
Define secrets at the narrowest scope possible. Use project-level secrets for project-specific credentials and only promote to organization or account scope when the secret is genuinely shared across multiple projects or organizations.
:::

---

## Secret managers

Harness supports both a built-in secret manager and integration with external secret management platforms. You can configure different secret managers at the account, organization, or project level.

### Harness built-in secret manager

The default secret manager provided by Harness uses AES-256 encryption to store secrets. It is available out of the box with no additional configuration required. This is suitable for teams that do not have an existing external secret management solution.

### External secret managers

For organizations with existing secret management infrastructure, Harness integrates with the following external providers:

- **HashiCorp Vault** — Enterprise-grade secret management with dynamic secrets, leasing, and renewal.
- **AWS Secrets Manager** — AWS-native secret storage with automatic rotation and fine-grained IAM policies.
- **GCP Secret Manager** — Google Cloud-native secret storage with IAM-based access control and versioning.
- **Azure Key Vault** — Microsoft Azure secret and key management with HSM-backed encryption.
- **Custom Secret Manager** — Connect to any secret manager using a custom shell script executed on a Harness Delegate.

:::info External Secrets Stay in Your Infrastructure
When you use an external secret manager, the actual secret values never leave your infrastructure. Harness stores only a reference to the secret path. At execution time, the Harness Delegate retrieves the value directly from your secret manager and injects it into the pipeline execution context.
:::

---

## Secret referencing

Secrets are referenced in pipelines, connectors, and configurations using Harness expressions. The expression syntax resolves the secret value at runtime and injects it into the execution context.

### Expression Syntax

```yaml title="secret-expressions.yaml"
# Reference a project-scoped secret
<+secrets.getValue("my_secret_id")>

# Reference an organization-scoped secret
<+secrets.getValue("org.my_secret_id")>

# Reference an account-scoped secret
<+secrets.getValue("account.my_secret_id")>
```

### Usage in YAML

Secrets can be referenced anywhere a string value is expected in your pipeline YAML:

```yaml title="connector-with-secret.yaml"
version: 1
kind: connector
spec:
  name: GitHub Connector
  type: github
  spec:
    url: https://github.com
    authentication:
      type: token
      spec:
        token: <+secrets.getValue("github_pat")>
```

### Usage in shell scripts

In shell script steps, secret expressions are resolved before the script executes. The resolved value is masked in logs:

```bash title="shell-script-secret.sh"
# The expression is resolved before execution
export API_KEY=<+secrets.getValue("api_key")>

# The actual value is injected but masked in logs
curl -H "Authorization: Bearer $API_KEY" https://api.example.com/data
```

:::warning Secret Masking
Harness automatically masks secret values in pipeline execution logs. However, if a script transforms the secret value (for example, by encoding it or splitting it into substrings), the transformed value may not be automatically masked. Avoid logging or printing secret values in any form.
:::