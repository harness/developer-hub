---
title: Connector Troubleshooting
sidebar_label: Troubleshooting
description: Common connector issues, root causes, and step-by-step solutions for diagnosing and resolving connectivity problems in Harness 3.0.
keywords:
  - connector troubleshooting
  - failed connection
  - delegate logs
  - rate limiting
  - certificate validation
  - authentication failure
tags:
  - connectors
  - platform
  - troubleshooting
sidebar_position: 5
---

Connector failures block pipeline execution, and the underlying cause is usually a credential, network, permission, or delegate problem. This topic groups the most common connector issues by symptom, explains the root cause of each, and gives you the commands and checks needed to confirm and resolve it.

---

## Failed connection

A `Failed` status on a connector indicates that the most recent connection test did not succeed. The following are the most common root causes and their solutions.

<details>
<summary>Invalid credentials</summary>

The token, password, or key referenced by the connector has expired, was revoked, or was entered incorrectly.

**Solution:**

1. Verify that the secret still exists and holds a valid value in <a href="/docs/platform/secrets/secrets-management/harness-secret-manager-overview" target="_blank">Harness Secret Manager</a>.
2. Test the credential manually, for example, use the token to call the provider's API directly.
3. If the credential is expired, generate a new token or key and update the Harness secret.
4. Re-test the connector from the Harness UI.

</details>

<details>
<summary>Network connectivity</summary>

The delegate cannot reach the target endpoint because of firewall rules, DNS resolution failures, or proxy configuration issues.

**Solution:**

1. Confirm that the delegate resolves the target hostname by running a DNS lookup from the delegate host.
2. Verify that the target port is open, using `telnet` or `curl` from the delegate.
3. Check the firewall and security group rules for both the delegate and the target service.
4. If you use a proxy, confirm that the delegate proxy configuration includes the target endpoint.

</details>

<details>
<summary>Insufficient permissions</summary>

The credentials are valid but lack the required permissions on the external service, for example, a read-only token used for write operations.

**Solution:**

1. Review the error message for the specific permission that is missing.
2. Check the token scopes or the IAM policy attached to the credential.
3. Update the permission grants on the external service to include the required access.
4. For GitHub, confirm that the token holds the required scopes, such as `repo` and `admin:repo_hook`.

</details>

<details>
<summary>Delegate issues</summary>

The delegate assigned to the connector is offline, unhealthy, or lacks the required network access.

**Solution:**

1. Navigate to **Account Settings**, then select **Delegates**, and verify that the delegate status is `Connected`.
2. Check the delegate pod logs for errors or resource constraints.
3. Verify that the delegate selector on the connector matches an active delegate.
4. If no delegate selector is set, confirm that at least one delegate with network access to the target is available.

</details>

<details>
<summary>Timeout issues</summary>

Connection timeouts occur when the delegate cannot establish a connection to the target service within the configured timeout window.

| Cause | Solution |
|---|---|
| Default timeout too low | Increase the connection timeout value in the connector or delegate configuration. |
| High network latency | Deploy a delegate closer to the target service, in the same region or VPC. |
| Incorrect endpoint URL | Verify that the endpoint URL and port are correct. Check for typos in the hostname. |
| Delegate resource constraints | Check delegate CPU and memory usage. Scale up the delegate if resources are exhausted. |

</details>

---

## Pipeline vs test failures

In some cases, a connector test succeeds in the UI but fails during pipeline execution, or the reverse. This discrepancy occurs for several reasons.

<details>
<summary>Different delegate</summary>

The connection test can use a different delegate than the pipeline execution. If the connector has no delegate selector, any available delegate can be chosen, and one delegate can have network access while another does not.

**Solution:** Add an explicit delegate selector to the connector so that the same delegate serves both the test and the pipeline execution.

</details>

<details>
<summary>Variable resolution</summary>

If the connector configuration uses Harness expressions, for example, `<+variable.name>`, these resolve at pipeline runtime and can be unavailable during a standalone connection test.

**Solution:** Avoid runtime expressions in connector configurations. Use static values or secret references instead.

</details>

<details>
<summary>Scope mismatch</summary>

The test runs at the connector scope, but the pipeline can sit at a different scope, for example, a **Project**-level pipeline that references an **Account**-level connector with an incorrect scope prefix.

**Solution:** Verify that the connector reference includes the correct scope prefix, for example, `account.my_connector` or `org.my_connector`.

</details>

<details>
<summary>Concurrent connection limits</summary>

The external service can impose concurrent connection limits. A standalone test succeeds because it opens a single connection, but parallel pipeline stages can exceed the limit.

**Solution:** Check the rate limits and connection quotas of the external service. Limit pipeline parallelism, or use connection pooling where the provider supports it.

</details>

---

## Not found errors

A `Connector not found` error during pipeline execution indicates that the referenced connector cannot be resolved.

<details>
<summary>Common causes and scope prefix reference</summary>

**Common causes:**

- **Deleted or renamed**: The connector was deleted, or its identifier changed. Identifiers are immutable, so this happens when a connector is recreated with a different ID.
- **Scope mismatch**: The pipeline references a **Project**-level connector, but the connector exists at the **Account** or **Organization** level, or the reverse.
- **Incorrect identifier**: A typo in the connector reference in the pipeline YAML.

**Scope prefix reference:**

| Scope | Reference format |
|---|---|
| **Account** level | `account.connectorIdentifier` |
| **Organization** level | `org.connectorIdentifier` |
| **Project** level | `connectorIdentifier` (no prefix) |

For more information on connector scope, see <a href="/3k-docs/platform/getting-started/connectors" target="_blank">Connectors overview</a>.

</details>

---

## Rate limiting

External services such as GitHub and GitLab impose API rate limits that affect connector operations, especially during periods of high pipeline activity.

<details>
<summary>Symptoms and solutions</summary>

**Symptoms:**

- HTTP 429 (Too Many Requests) errors in pipeline logs.
- `API rate limit exceeded` error messages from GitHub or GitLab.
- Intermittent connector test failures that resolve after a wait.

**Solutions:**

- **Use GitHub App authentication**: GitHub Apps carry higher rate limits, 5,000 requests per hour per installation, compared with 5,000 per hour per user for personal access tokens. For more information on these limits, see <a href="https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api" target="_blank">GitHub REST API rate limits</a>.
- **Separate connectors for CI and API**: Use different tokens for codebase cloning and API operations to distribute rate limit consumption.
- **Reduce polling frequency**: If you use polling-based triggers, increase the polling interval to reduce API calls.
- **Use webhooks instead of polling**: Configure webhook-based triggers to remove periodic API polling entirely.

</details>

---

## Kubernetes issues

Kubernetes connector issues are among the most common troubleshooting scenarios, and most trace back to certificates, token expiry, or cluster RBAC.

<details>
<summary>Certificate validation failure</summary>

The delegate cannot validate the Kubernetes API server TLS certificate, which produces an `unable to verify the first certificate` or `certificate signed by unknown authority` error.

**Solution:**

1. Provide the certificate authority (CA) certificate in the connector configuration, using `caCertRef`.
2. Confirm that the CA certificate is in PEM format and includes the full chain.
3. If the cluster uses a self-signed certificate, add the CA to the delegate trust store.

</details>

<details>
<summary>Service account token expired</summary>

Kubernetes service account tokens can expire, especially in clusters with token request projection enabled, which is the default in Kubernetes 1.21 and later.

**Solution:**

1. Generate a new service account token and update the Harness secret.
2. Consider the **Inherit from Delegate** credential type for automatic token management.
3. For long-lived tokens, create a non-expiring secret-based token. This is not recommended for production.

</details>

<details>
<summary>RBAC permission denied</summary>

The service account lacks the <a href="https://kubernetes.io/docs/reference/access-authn-authz/rbac/" target="_blank">Kubernetes RBAC</a> permissions required for the deployment operations, for example, creating or updating Deployments, Services, and ConfigMaps.

**Solution:** Create a `ClusterRole` or `Role` with the required permissions and bind it to the service account.

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

Cloud provider connectors fail most often because of trust policy, region, or project scoping problems rather than invalid credentials. Use the following entries to isolate the cause by provider.

<details>
<summary>AWS: IAM trust policy</summary>

When you use **Inherit from Delegate** with cross-account access, the trust policy of the target role must allow the delegate instance profile or IRSA role to assume it.

**Solution:** Verify that the trust policy includes the delegate IAM role ARN in the `Principal` field, and that the external ID matches.

</details>

<details>
<summary>AWS: STS regional endpoint</summary>

Security Token Service (STS) assume-role calls fail when the delegate sits in a different region than the STS endpoint in use.

**Solution:** Enable the STS regional endpoint for the delegate region, or configure the connector to use the global STS endpoint.

</details>

<details>
<summary>GCP: service account key</summary>

The JSON key file is invalid or expired, or the service account was disabled in the GCP IAM console.

**Solution:** Verify that the service account is active in GCP IAM. Generate a new key if required and update the Harness file secret.

</details>

<details>
<summary>GCP: project ID mismatch</summary>

The service account belongs to a different GCP project than the project being accessed.

**Solution:** Grant the service account cross-project access through IAM role bindings on the target project.

</details>

<details>
<summary>GCP: missing IAM roles</summary>

The service account lacks the IAM roles required for the requested operations, for example, `roles/container.admin` for GKE.

**Solution:** Add the required IAM roles to the service account in the GCP IAM console. Common roles include `roles/container.developer`, `roles/storage.admin`, and `roles/secretmanager.secretAccessor`.

</details>

<details>
<summary>Azure: subscription and tenant ID</summary>

An incorrect subscription ID or tenant ID produces authentication failures or `resource not found` errors.

**Solution:** Verify the subscription ID and tenant ID in the connector configuration against the Azure portal.

</details>

<details>
<summary>Azure: service principal</summary>

The service principal secret has expired, or the app registration lacks the required API permissions.

**Solution:** Check the service principal in **Azure AD**, then select **App Registrations**. Verify that the client secret has not expired and that the required Azure role assignments are in place.

</details>

---

## Diagnostic steps

Follow these steps in order to isolate a connector problem systematically, from the Harness UI down to the credential itself.

<details>
<summary>Step 1: Test the connection from the UI</summary>

Start with the built-in connection test. The UI provides a step-by-step breakdown of the connection attempt, covering connectivity, authentication, and authorization, with a detailed error message for each step.

</details>

<details>
<summary>Step 2: Check delegate logs</summary>

Examine the delegate logs for detailed error traces. For a delegate running on Kubernetes:

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
<summary>Step 3: Verify network connectivity</summary>

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
<summary>Step 4: Validate credentials manually</summary>

Test the credentials outside Harness to determine whether the problem lies with the credential itself or with the Harness configuration:

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
<summary>Step 5: Review the secret manager</summary>

Verify that the secrets referenced by the connector are accessible:

- Confirm that the secret exists at the expected scope: **Account**, **Organization**, or **Project**.
- Verify that the secret manager itself is healthy, which matters most for external managers such as Vault.
- Check that the credential was not rotated at the provider without updating the secret value in Harness.
- For file secrets, such as a GCP service account key or an SSH key, confirm that the content format is correct.

</details>

### Escalate to Harness Support

If you complete all diagnostic steps and the issue persists, collect the following information before you escalate to [Harness Support](mailto:support@harness.io):

- The connector type and identifier.
- The exact error message.
- Delegate logs from the time of the failure.
- Network diagnostic results.
- The pipeline execution ID, if the failure occurred during a pipeline run.
