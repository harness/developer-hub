---
title: Connector Troubleshooting
sidebar_label: Troubleshooting
description: Common connector issues, root causes, and step-by-step solutions for diagnosing and resolving connectivity problems in Harness 3.0.
sidebar_position: 5
---

Common connector issues, root causes, and step-by-step solutions for diagnosing and resolving connectivity problems in Harness 3.0.

---

## Failed connection

A "Failed" status on a connector indicates that the most recent connection test did not succeed. The following are the most common root causes and their solutions.

<details>
<summary>Invalid Credentials</summary>

The token, password, or key referenced by the connector has expired, been revoked, or was entered incorrectly.

1. Verify the secret still exists and contains a valid value in the Harness Secret Manager.
2. Test the credential manually (e.g., use the token to call the provider's API directly).
3. If expired, generate a new token/key and update the Harness secret.
4. Re-test the connector from the Harness UI.

</details>

<details>
<summary>Network Connectivity</summary>

The delegate cannot reach the target endpoint due to firewall rules, DNS resolution failures, or proxy configuration issues.

1. Confirm the delegate can resolve the target hostname (run DNS lookup from the delegate host).
2. Verify the target port is open (use `telnet` or `curl` from the delegate).
3. Check firewall and security group rules for the delegate and target service.
4. If using a proxy, ensure the delegate's proxy configuration includes the target endpoint.

</details>

<details>
<summary>Insufficient Permissions</summary>

The credentials are valid but lack the required permissions on the external service (e.g., read-only token used for write operations).

1. Review the error message for the specific permission that is missing.
2. Check the token scopes or IAM policy attached to the credential.
3. Update the permission grants on the external service to include the required access.
4. For GitHub, ensure the token has the required scopes (`repo`, `admin:repo_hook`, etc.).

</details>

<details>
<summary>Delegate Issues</summary>

The delegate assigned to the connector is offline, unhealthy, or does not have the required network access.

1. Navigate to **Account Settings > Delegates** and verify the delegate status is "Connected."
2. Check delegate pod logs for errors or resource constraints.
3. Verify the delegate selector on the connector matches an active delegate.
4. If no delegate selector is set, ensure at least one delegate with network access to the target is available.

</details>

<details>
<summary>Timeout Issues</summary>

Connection timeouts occur when the delegate cannot establish a connection to the target service within the configured timeout window.

| Cause | Solution |
|---|---|
| Default timeout too low | Increase the connection timeout value in the connector or delegate configuration. |
| High network latency | Deploy a delegate closer to the target service (same region or VPC). |
| Incorrect endpoint URL | Verify the endpoint URL and port are correct. Check for typos in the hostname. |
| Delegate resource constraints | Check delegate CPU and memory usage. Scale up the delegate if resources are exhausted. |

</details>

---

## Pipeline vs test failures

In some cases, a connector test succeeds in the UI but fails during pipeline execution (or vice versa). This discrepancy can occur for several reasons.

<details>
<summary>Different Delegate</summary>

The test connection may use a different delegate than the pipeline execution. If the connector does not have a delegate selector, any available delegate can be chosen. One delegate may have network access while another does not.

**Solution:** Add an explicit delegate selector to the connector to ensure the same delegate is used for both testing and pipeline execution.

</details>

<details>
<summary>Variable Resolution</summary>

If the connector configuration uses Harness expressions (e.g., `<+variable.name>`), these are resolved at pipeline runtime but may not be available during a standalone connection test.

**Solution:** Avoid using runtime expressions in connector configurations. Use static values or secret references instead.

</details>

<details>
<summary>Scope Mismatch</summary>

The test runs at the connector's scope, but the pipeline may be at a different scope (e.g., project-level pipeline referencing an account-level connector with incorrect scope prefix).

**Solution:** Verify the connector reference includes the correct scope prefix (e.g., `account.my_connector` or `org.my_connector`).

</details>

<details>
<summary>Concurrent Connection Limits</summary>

The external service may impose concurrent connection limits. A standalone test succeeds because it is a single connection, but parallel pipeline stages may exceed the limit.

**Solution:** Check the external service's rate limits and connection quotas. Consider limiting pipeline parallelism or using connection pooling where supported.

</details>

---

## Not found errors

A "Connector not found" error during pipeline execution indicates that the referenced connector cannot be resolved.

<details>
<summary>Common causes and scope prefix reference</summary>

**Common causes:**

- **Deleted or Renamed** — The connector was deleted or its identifier was changed (identifiers are immutable, but the connector may have been recreated with a different ID).
- **Scope Mismatch** — The pipeline references a project-level connector, but the connector exists at the account or organization level (or vice versa).
- **Incorrect Identifier** — A typo in the connector reference in the pipeline YAML.

**Scope prefix reference:**

| Scope | Reference format |
|---|---|
| Account-level | `account.connectorIdentifier` |
| Organization-level | `org.connectorIdentifier` |
| Project-level | `connectorIdentifier` (no prefix) |

</details>

---

## Rate limiting

External services like GitHub and GitLab impose API rate limits that can affect connector operations, especially during periods of high pipeline activity.

<details>
<summary>Symptoms and solutions</summary>

**Symptoms:**
- HTTP 429 (Too Many Requests) errors in pipeline logs.
- "API rate limit exceeded" error messages from GitHub or GitLab.
- Intermittent connector test failures that resolve after waiting.

**Solutions:**

- **Use GitHub App authentication** — GitHub Apps have higher rate limits (5,000 requests/hour per installation vs. 5,000/hour per user for PATs).
- **Separate connectors for CI and API** — Use different tokens for codebase cloning and API operations to distribute rate limit consumption.
- **Reduce polling frequency** — If using polling-based triggers, increase the polling interval to reduce API calls.
- **Use webhooks instead of polling** — Configure webhook-based triggers to eliminate periodic API polling entirely.

</details>

---

## Kubernetes issues

Kubernetes connector issues are among the most common troubleshooting scenarios.

<details>
<summary>Certificate Validation Failure</summary>

The delegate cannot validate the Kubernetes API server's TLS certificate, resulting in an "unable to verify the first certificate" or "certificate signed by unknown authority" error.

1. Provide the CA certificate in the connector configuration (`caCertRef`).
2. Ensure the CA certificate is in PEM format and includes the full chain.
3. If using a self-signed certificate, add the CA to the delegate's trust store.

</details>

<details>
<summary>Service Account Token Expired</summary>

Kubernetes service account tokens can expire, especially in clusters with token request projection enabled (default in K8s 1.21+).

1. Generate a new service account token and update the Harness secret.
2. Consider using the "Inherit from Delegate" credential type for automatic token management.
3. For long-lived tokens, create a non-expiring secret-based token (not recommended for production).

</details>

<details>
<summary>RBAC Permission Denied</summary>

The service account lacks the required Kubernetes RBAC permissions for the deployment operations (e.g., create/update Deployments, Services, ConfigMaps).

Create a `ClusterRole` or `Role` with the required permissions and bind it to the service account:

```yaml title="harness-rbac.yaml"
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: harness-deployer
rules:
  - apiGroups: ["", "apps", "extensions", "batch"]
    resources:
      - pods
      - services
      - deployments
      - replicasets
      - statefulsets
      - daemonsets
      - jobs
      - configmaps
      - secrets
      - namespaces
      - events
    verbs: ["get", "list", "watch", "create", "update", "patch", "delete"]
  - apiGroups: ["networking.k8s.io"]
    resources: ["ingresses"]
    verbs: ["get", "list", "watch", "create", "update", "patch", "delete"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: harness-deployer-binding
subjects:
  - kind: ServiceAccount
    name: harness-deployer
    namespace: harness-delegate
roleRef:
  kind: ClusterRole
  name: harness-deployer
  apiGroup: rbac.authorization.k8s.io
```

</details>

---

## Cloud authentication failures

<details>
<summary>AWS — IAM Trust Policy</summary>

When using "Inherit from Delegate" with cross-account access, the target role's trust policy must allow the delegate's instance profile or IRSA role to assume it.

Verify the trust policy includes the delegate's IAM role ARN in the `Principal` field and that the external ID matches.

</details>

<details>
<summary>AWS — STS Regional Endpoint</summary>

STS assume-role calls may fail if the delegate is in a different region than the STS endpoint being used.

Ensure the STS regional endpoint is enabled for the delegate's region, or configure the connector to use the global STS endpoint.

</details>

<details>
<summary>GCP — Service Account Key</summary>

The JSON key file may be invalid, expired, or the service account may have been disabled in the GCP IAM console.

Verify the service account is active in GCP IAM. Generate a new key if needed and update the Harness file secret.

</details>

<details>
<summary>GCP — Project ID Mismatch</summary>

The service account belongs to a different GCP project than the one being accessed.

Grant the service account cross-project access via IAM role bindings on the target project.

</details>

<details>
<summary>GCP — Missing IAM Roles</summary>

Missing IAM roles on the service account for the required operations (e.g., `roles/container.admin` for GKE).

Add the required IAM roles to the service account in the GCP IAM console. Common roles include `roles/container.developer`, `roles/storage.admin`, and `roles/secretmanager.secretAccessor`.

</details>

<details>
<summary>Azure — Subscription and Tenant ID</summary>

Incorrect subscription ID or tenant ID results in authentication failures or "resource not found" errors.

Double-check the subscription ID and tenant ID in the connector configuration against the Azure portal.

</details>

<details>
<summary>Azure — Service Principal</summary>

The service principal secret may have expired, or the app registration may lack the required API permissions.

Check the service principal in **Azure AD > App Registrations**. Verify the client secret has not expired and that the required Azure role assignments are in place.

</details>

---

## Diagnostic steps

When troubleshooting connector issues, follow these steps in order to systematically identify and resolve the problem.

<details>
<summary>Step 1 — Test Connection from the UI</summary>

Start by running the built-in test connection. The UI provides a step-by-step breakdown of the connection attempt (connectivity, authentication, authorization) with detailed error messages for each step.

</details>

<details>
<summary>Step 2 — Check Delegate Logs</summary>

Examine the delegate logs for detailed error traces. If running on Kubernetes:

```bash title="delegate-logs.sh"
# Find the delegate pod
kubectl get pods -n harness-delegate-ng

# View delegate logs
kubectl logs -n harness-delegate-ng <delegate-pod-name> --tail=500

# Follow logs in real-time
kubectl logs -n harness-delegate-ng <delegate-pod-name> -f

# Search for specific connector errors
kubectl logs -n harness-delegate-ng <delegate-pod-name> | grep -i "connector\|connection\|auth"
```

</details>

<details>
<summary>Step 3 — Verify Network Connectivity</summary>

From the delegate host, verify that the target endpoint is reachable:

```bash title="network-diagnostics.sh"
# Test HTTPS connectivity
curl -v https://api.github.com

# Test TCP connectivity to a specific port
telnet k8s-api.example.com 6443

# Test DNS resolution
nslookup vault.example.com

# Test with timeout
curl --connect-timeout 5 -s -o /dev/null -w "%{http_code}" https://api.github.com
```

</details>

<details>
<summary>Step 4 — Validate Credentials Manually</summary>

Test the credentials outside of Harness to determine whether the issue is with the credential itself or with the Harness configuration:

```bash title="credential-validation.sh"
# Test GitHub token
curl -H "Authorization: token YOUR_PAT" https://api.github.com/user

# Test AWS credentials
aws sts get-caller-identity

# Test Kubernetes service account token
kubectl --token=YOUR_TOKEN --server=https://k8s-api:6443 get namespaces

# Test Vault token
curl -H "X-Vault-Token: YOUR_TOKEN" https://vault.example.com:8200/v1/sys/health
```

</details>

<details>
<summary>Step 5 — Review Secret Manager</summary>

Verify that the secrets referenced by the connector are accessible:

- Confirm the secret exists at the expected scope (account, org, or project).
- Verify the secret manager itself is healthy (especially for external managers like Vault).
- Check that the secret has not been rotated without updating the secret value in Harness.
- For file secrets (e.g., GCP service account key, SSH key), ensure the content format is correct.

</details>

:::info Escalation Path
If you have followed all diagnostic steps and the issue persists, collect the following information before escalating to support: the connector type and identifier, the exact error message, delegate logs from the time of the failure, network diagnostic results, and the pipeline execution ID (if applicable).
:::