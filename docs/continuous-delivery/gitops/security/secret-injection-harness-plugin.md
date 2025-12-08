---
title: Secret Injection with Harness Argo CD Plugin
description: Learn how to use Harness expressions and secrets in Argo CD manifests with the Config Management Plugin.
sidebar_position: 6
---

This topic describes how to use the Harness Argo CD Plugin to inject secrets and use Harness expressions directly within your Argo CD manifests.

## Overview

The Secret Injection feature enables you to use Harness expressions and secrets directly within your Argo CD manifests through the Harness Argo CD Config Management Plugin. This plugin integrates with Argo CD's manifest rendering process, allowing you to reference Harness secrets without requiring a Harness Delegate.

Previously, secret decryption was handled by the Harness Delegate, and there was no way to use Harness expressions within Argo CD manifests if you wanted to follow a pure GitOps pattern with only the Argo CD stack. The Config Management Plugin solves this by delegating the manifest rendering process to Harness, giving you control over how manifests are generated before they are applied to the cluster.

## How it works

Argo CD has a concept of rendering manifests before deploying them. When you have a GitOps application pointing to a directory containing Kubernetes manifests, the Harness Config Management Plugin processes these manifests during the rendering phase.

### Architecture

- **Argo CD Repo Server**: Previously, the Argo CD repo server was completely responsible for generating manifests from Git before applying them to the cluster. You could not modify this generation process.
- **Config Management Plugin**: With the plugin, Argo CD delegates the manifest rendering process to Harness, allowing you to inject Harness expressions and secrets during manifest generation.
- **No Delegate Required**: The GitOps agent does not use a Delegate for secret resolution, making it ideal for users who want to use only the Argo CD stack and follow the GitOps pattern.

The plugin:

1. Intercepts the manifest rendering process in Argo CD
2. Scans your manifests for Harness expressions
3. Resolves the expressions using Harness's secret management system
4. Replaces the expressions with their actual values
5. Returns the rendered manifests to Argo CD for deployment

:::info Important

Since secret resolution happens during the manifest rendering phase itself, you don't need to manually sync the application after adding Harness expressions to your manifests. The secrets are resolved automatically when Argo CD renders the manifests.

:::

## Use cases

The Secret Injection feature is particularly useful for:

- **Pure GitOps deployments**: Use Harness secrets without installing a Harness Delegate
- **Vault integration**: Reference secrets stored in HashiCorp Vault through Harness
- **Harness Secret Manager**: Use secrets from Harness's built-in secret manager
- **Environment-specific values**: Inject different secret values for dev, staging, and production environments
- **Centralized secret management**: Manage all secrets in Harness while maintaining GitOps workflows

## Prerequisites

Before using the Secret Injection feature, ensure you have:

- A Harness GitOps application configured and pointing to a Git repository
- Secrets configured in Harness (either in Harness Secret Manager or external secret managers like Vault)
- The Harness Argo CD Config Management Plugin installed and configured on your GitOps agent
- Kubernetes manifests in your Git repository

## Supported secret types

The Harness Argo CD Plugin supports the following secret sources:

- **Harness Secret Manager**: Secrets stored in Harness's built-in secret manager
- **HashiCorp Vault**: Secrets stored in Vault and referenced through Harness
- **Other secret managers**: Any secret manager integrated with Harness

## Supported manifest types

The plugin supports secret injection for standard Kubernetes objects, including:

- Deployments
- Services
- ConfigMaps
- Secrets
- ServiceAccounts
- NetworkPolicies
- And other Kubernetes resources

## Using Harness expressions in manifests

To use Harness expressions in your manifests, include them in your YAML files using the standard Harness expression syntax.

### Example: Basic secret injection

Here's an example of a directory containing basic Kubernetes objects with Harness secret expressions:

```yaml
# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-application
  namespace: default
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
      - name: app-container
        image: my-app:latest
        env:
        - name: DATABASE_PASSWORD
          value: <+secrets.getValue("db_password")>
        - name: API_KEY
          value: <+secrets.getValue("api_key")>
```

### Example: Using Vault secrets

Reference secrets stored in HashiCorp Vault through Harness:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: vault-secrets
  namespace: default
type: Opaque
stringData:
  vault-value: <+secrets.getValue("vault_secret")>
```

In this example, `vault_secret` is a Harness secret entity that points to a Vault path (e.g., `sample-hash-test`).

### Example: Using Harness Secret Manager

Reference secrets from Harness's built-in secret manager:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: harness-secrets
  namespace: default
type: Opaque
stringData:
  harness-value: <+secrets.getValue("harness_secret_manager_secret")>
```

### Example: Service Account with secret injection

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: my-service-account
  namespace: default
secrets:
- name: <+secrets.getValue("service_account_token")>
```

## Setting up secrets in Harness

Before using secret expressions in your manifests, you must create the secrets in Harness:

1. In your Harness project, navigate to **Secrets**.
2. Create a new secret:
   - For Harness Secret Manager: Create a text secret with your value
   - For Vault: Create a secret reference pointing to your Vault path (e.g., `sample-hash-test`)
3. Note the secret identifier - this is what you'll reference in your expressions

## Deploying manifests with secret injection

Once you've added Harness expressions to your manifests:

1. Commit and push your changes to Git
2. Your GitOps application will detect the changes
3. If auto-sync is enabled, the application will automatically sync
4. The Harness Config Management Plugin will:
   - Render the manifests
   - Resolve all Harness expressions
   - Inject the actual secret values
   - Pass the rendered manifests to Argo CD for deployment

### Viewing injected secrets

After deployment:

- **In Harness UI**: Secrets are masked and not displayed in plain text for security
- **In Kubernetes cluster**: If you have permission to view secrets in the cluster, you can use `kubectl` to inspect them:

```bash
kubectl get secret <secret-name> -n <namespace> -o yaml
```

Note: Values in `stringData` fields are base64-encoded before being stored in the cluster.

## Auto-sync behavior

When auto-sync is enabled for your GitOps application:

1. Changes to manifests in Git are automatically detected
2. The plugin renders the manifests with injected secrets
3. New Kubernetes objects (like uncommented secrets) are automatically created
4. The application syncs to the desired state

## Configuring the Harness Argo CD Plugin

:::note

The Harness Argo CD Config Management Plugin configuration is typically managed by your platform team. Contact your Harness administrator if you need assistance with plugin setup.

:::

The plugin must be configured on your GitOps agent to enable secret injection. Once configured, it automatically processes manifests containing Harness expressions.

## Best practices

When using the Secret Injection feature, follow these best practices:

1. **Create secrets in Harness first**: Always ensure the secret exists in Harness before referencing it in manifests
2. **Use descriptive secret names**: Name your secrets clearly to make them easy to identify and maintain
3. **Test in non-production**: Always test secret injection in dev or staging environments before deploying to production
4. **Enable auto-sync carefully**: Consider the security implications of auto-sync for sensitive applications
5. **Use RBAC**: Leverage Harness RBAC to control who can access and modify secrets
6. **Document secret references**: Add comments in your manifests to explain what each secret expression references
7. **Audit secret usage**: Regularly review which secrets are being used in your manifests

## Security considerations

- **Secrets are masked in UI**: Harness masks secret values in the UI to prevent accidental exposure
- **Base64 encoding**: Kubernetes automatically base64-encodes values in `stringData` fields before storing them
- **Cluster permissions**: Only users with appropriate Kubernetes RBAC permissions can view secret values in the cluster
- **No Delegate required**: Secrets are resolved without requiring a Harness Delegate, reducing the attack surface

### Risk mitigation for secret injection plugins

:::warning Important

Argo CD caches the manifests generated by plugins, along with the injected secrets, in its Redis instance. These manifests are also available via the repo-server API (a gRPC service). This means that secrets are accessible to anyone who has access to the Redis instance or the repo-server.

:::

To mitigate the risks associated with secret injection plugins, implement the following security measures:

1. **Network Policies**: Set up network policies to prevent direct access to Argo CD components (Redis and the repo-server). Ensure your cluster supports these network policies and can actually enforce them.

2. **Dedicated Cluster**: Consider running Argo CD on its own dedicated cluster with no other applications running on it. This isolation reduces the attack surface and limits potential exposure.

3. **Access Controls**: Implement strict RBAC policies to limit who can access the Argo CD components and the Kubernetes cluster where secrets are stored.

4. **Audit and Monitoring**: Regularly audit access to Argo CD components and monitor for any unauthorized access attempts.

For more detailed information on mitigating risks of secret injection plugins, refer to the [Argo CD Secret Management documentation](https://argo-cd.readthedocs.io/en/stable/operator-manual/secret-management/#mitigating-risks-of-secret-injection-plugins).

## Limitations

- Secrets must exist in Harness before they can be referenced in manifests
- The plugin processes manifests during the Argo CD rendering phase
- Secret values are resolved at deployment time, not at sync time
- The plugin requires network connectivity to Harness to resolve expressions

## Troubleshooting

### Secret not found error

If you receive an error that a secret cannot be found:

1. Verify the secret exists in Harness
2. Check that the secret identifier in your expression matches the secret name in Harness
3. Ensure you have permission to access the secret
### Expressions not being replaced

If Harness expressions are not being replaced with actual values:

1. Verify the Harness Argo CD Plugin is installed and configured
2. Check the Argo CD application logs for plugin errors
3. Ensure the expression syntax is correct: `<+secrets.getValue("secret_name")>`

### Auto-sync not working

If changes to manifests are not automatically syncing:

1. Verify auto-sync is enabled in your GitOps application settings
2. Check that the Git repository is accessible
3. Review the application sync status in the Harness UI

## Related documentation

- [External Secrets Integration](/docs/continuous-delivery/gitops/security/external-secrets-integration)
- [SOPS Integration](/docs/continuous-delivery/gitops/security/sops)
- [Harness GitOps Basics](/docs/continuous-delivery/gitops/get-started/harness-git-ops-basics)
- [Create a GitOps Application](/docs/continuous-delivery/gitops/get-started/harness-cd-git-ops-quickstart)

## Example: Complete workflow

Here's a complete example of using secret injection in a GitOps workflow:

1. **Create secrets in Harness**:
   - Create a Vault secret named `vault_secret` pointing to path `sample-hash-test`
   - Create a Harness Secret Manager secret named `harness_secret`

2. **Add expressions to your manifest**:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: app-secrets
  namespace: default
type: Opaque
stringData:
  vault-value: <+secrets.getValue("vault_secret")>
  harness-value: <+secrets.getValue("harness_secret")>
```

3. **Commit and push to Git**:

```bash
git add secret.yaml
git commit -m "Add secret injection"
git push origin main
```

4. **Verify deployment**:
   - Check the Harness UI to see the new secret object
   - Use `kubectl` to verify the secret was created in the cluster (if you have permissions)

```bash
kubectl get secret app-secrets -n default -o yaml
```

The secret values will be base64-encoded in the cluster and masked in the Harness UI for security.
