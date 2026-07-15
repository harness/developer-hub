---
title: Secrets Best Practices
sidebar_label: Best Practices
description: Best practices for creating, storing, rotating, auditing, and maintaining compliance for secrets in Harness 3.0 — covering access control, rotation schedules, monitoring, and compliance standards.
sidebar_position: 4
---

Follow these best practices to ensure your secrets are secure, well-organized, compliant, and easy to manage at scale. These guidelines cover creation, access control, rotation, monitoring, and compliance.

---

## Creation and storage

How you create and store secrets directly impacts the security posture of your CI/CD pipelines.

**Use strong, unique secret values** — Generate passwords with a minimum of 16 characters including uppercase, lowercase, numbers, and special characters. For API tokens and machine credentials, use at least 32 characters. Never reuse secret values across different services or environments.

**Scope secrets appropriately** — Create secrets at the narrowest scope that satisfies your access requirements. Use project-level secrets for project-specific credentials. Promote to organization or account scope only when the credential is genuinely shared across multiple projects.

**Choose the correct secret type** — Use Text Secrets for passwords, tokens, and string-based credentials. Use File Secrets for JSON key files, kubeconfig files, certificates, and binary content. Using the correct type ensures proper encoding and retrieval.

**Leverage external secret managers** — For production environments, use an external secret manager (Vault, AWS Secrets Manager, GCP Secret Manager, or Azure Key Vault) to maintain full control over encryption keys, access policies, and rotation schedules. The built-in manager is appropriate for development and testing.

**Never commit secrets to source code** — Do not include secret values in Git repositories, pipeline YAML files, Dockerfiles, or any version-controlled configuration. Always reference secrets using Harness expressions and store the actual values in a secret manager.

:::tip Naming Convention
Adopt a consistent naming convention for secrets. For example: `{service}_{environment}_{purpose}` such as `payment_prod_stripe_key`. This makes secrets easier to find, audit, and manage.
:::

---

## Access control

Implement the principle of least privilege for secret access. Grant only the minimum permissions required for each role and regularly review access grants.

### RBAC permission levels

| Permission | Description | Grants |
|---|---|---|
| View | View secret metadata (name, ID, type, tags). | Read-only access to the secret configuration. The actual value is never displayed. |
| Create | Create new secrets in the given scope. | Ability to create new secrets and set their initial value. |
| Edit | Modify existing secret metadata and value. | Update name, description, tags, and the encrypted value. |
| Delete | Remove secrets permanently. | Permanently delete secrets from the secret manager. |
| Access | Use the secret in pipelines and connectors. | Reference the secret in runtime expressions. Required for pipeline execution. |

### Recommended roles

| Role | Permissions | Typical Users |
|---|---|---|
| Secret Admin | View, Create, Edit, Delete, Access | Platform engineers, security team |
| Secret Manager | View, Create, Edit, Access | DevOps engineers, team leads |
| Secret User | View, Access | Developers, pipeline authors |
| Secret Viewer | View | Auditors, read-only stakeholders |

**Separate environments** — Use separate secrets for each environment (development, staging, production). Do not share production credentials with lower environments. This limits the blast radius if a development credential is compromised.

:::warning Avoid Over-Permissioning
Do not grant Delete permissions to users who only need to reference secrets in pipelines. Accidental or unauthorized deletion of a production secret can cause widespread pipeline failures. Reserve Delete permissions for Secret Admin roles only.
:::

---

## Rotation schedule

Regular rotation reduces the window of exposure if a credential is compromised. Establish rotation schedules based on the sensitivity and risk level of each secret.

| Sensitivity | Rotation Interval | Examples |
|---|---|---|
| High | Every 30 days | Production database passwords, cloud provider master keys, payment gateway credentials |
| Medium | Every 90 days | API tokens, service account keys, artifact registry credentials |
| Low | Every 180 days | Development environment credentials, internal tool API keys, non-production certificates |

### Manual rotation process

1. Generate a new credential value in the source system.
2. Update the secret value in Harness (or the external secret manager).
3. Run a test pipeline to verify the new credential works.
4. Revoke the old credential in the source system.
5. Update the rotation timestamp in your tracking system.

### Automated rotation

External secret managers such as AWS Secrets Manager and HashiCorp Vault support automated rotation through rotation lambdas and dynamic secrets respectively. When automated rotation is configured, Harness automatically retrieves the latest value at pipeline execution time with no manual intervention required.

### Emergency rotation

In the event of a credential compromise:

1. **Immediately revoke the compromised credential** in the source system to prevent further unauthorized access.
2. Generate a new credential and update the secret value in Harness.
3. Review audit logs in both Harness and the source system to assess the scope of the compromise.
4. Run all affected pipelines to verify the new credential.
5. Report the incident per your organization's security incident response policy.

---

## Monitoring and auditing

Continuous monitoring and auditing of secret usage is essential for maintaining a strong security posture.

**Enable audit logging** — Ensure audit logging is enabled at the account level. Harness logs all secret operations including creation, modification, deletion, and runtime access. These logs capture the user, timestamp, IP address, and the operation performed.

**Review activity regularly** — Periodically review the **Activity** tab on critical secrets to detect unexpected access patterns or unauthorized modifications. Set up alerts for high-sensitivity secrets to receive notifications when they are accessed or modified.

**Track references** — Use the **References** tab to understand where each secret is used across pipelines, connectors, and services. This helps identify the impact of rotation or deletion and ensures no orphaned references exist.

**Clean up unused secrets** — Regularly audit secrets with zero references. Unused secrets represent unnecessary risk. Remove them after verifying they are not referenced by any active entity. Filter the secrets list by usage to identify candidates for cleanup.

:::info Audit Log Retention
Harness retains audit logs based on your account plan. For compliance purposes, configure audit log export to your organization's SIEM or log management platform for long-term retention and analysis.
:::

---

## Compliance

Organizations operating in regulated industries need to ensure their secrets management practices meet compliance requirements.

### Data residency

When using external secret managers, secret values remain in the region and infrastructure where your secret manager is deployed. This allows you to meet data residency requirements by choosing a secret manager in the appropriate geographic region. The Harness platform stores only a reference to the secret path, not the value itself.

### Encryption standards

| Standard | Implementation |
|---|---|
| Encryption at rest | AES-256 encryption for the built-in secret manager. External managers use their own encryption standards. |
| Encryption in transit | TLS 1.2 or higher for all communication between Harness, Delegates, and external secret managers. |
| Key management | Built-in manager uses Harness-managed keys. External managers use customer-managed keys (CMK/BYOK). |

### Secret exposure prevention

Harness implements multiple layers of protection to prevent secret exposure:

- **Log masking** — Secret values are automatically masked in pipeline execution logs. Any output matching a secret value is replaced with asterisks.
- **UI protection** — Secret values are never displayed in the Harness UI. The value field shows only masked characters.
- **API protection** — Secret values are never included in API responses. Only metadata (name, ID, type, tags) is returned.
- **Configuration protection** — Secret expressions in pipeline YAML reference the secret by ID, not by value. The value is resolved only at runtime.
- **Output protection** — Pipeline output variables that contain secret values are automatically masked in subsequent stages and the execution UI.

### Compliance reporting

Use the following data sources to support compliance audits and reporting: audit logs (complete history of all secret operations with timestamps, users, and IP addresses), secret references (which pipelines and services use each secret), rotation history (when each secret was last rotated through the activity log), and RBAC configuration (role bindings and permission grants demonstrating least-privilege access controls).

:::tip Compliance Automation
Automate compliance checks by using the Harness API to periodically verify that all secrets follow your organization's policies: rotation schedules are met, unused secrets are flagged, and RBAC permissions are aligned with your access matrix.
:::