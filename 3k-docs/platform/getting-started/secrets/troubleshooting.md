---
title: Secrets Troubleshooting
sidebar_label: Troubleshooting
description: Diagnose and resolve common issues with secrets in Harness 3.0 — secret not found, external manager connection failures, stale cached values, and file decode errors.
---

Diagnose and resolve common issues with secrets in Harness 3.0. This guide covers the most frequently encountered problems, their root causes, and step-by-step resolution procedures.

---

## Secret Not Found

Pipeline execution fails with an error indicating the referenced secret cannot be found.

```bash
# Common error message
Error: Secret with identifier [my_secret] not found in scope [project:myproject]
```

<details>
<summary>Incorrect scope reference</summary>

The secret exists but is being referenced with the wrong scope prefix. For example, referencing an organization-level secret without the `org.` prefix.

**Solution:** Verify the scope of the secret in the Harness UI. Use the correct prefix:

```bash
# Project scope (no prefix)
<+secrets.getValue("my_secret")>

# Organization scope
<+secrets.getValue("org.my_secret")>

# Account scope
<+secrets.getValue("account.my_secret")>
```

</details>

<details>
<summary>Secret has been deleted</summary>

The secret was deleted but is still referenced in a pipeline, connector, or service definition.

**Solution:** Recreate the secret with the same identifier, or update the referencing entities to use a different secret. Check the audit log to confirm when and by whom the secret was deleted.

</details>

<details>
<summary>Insufficient permissions</summary>

The user or service account executing the pipeline does not have the `Access` permission on the secret.

**Solution:** Verify that the pipeline execution user or service account has the `Access` permission for the secret at the appropriate scope. Check role bindings in **Access Control** settings.

</details>

<details>
<summary>Wrong project or organization context</summary>

The pipeline is running in a different project or organization than where the secret was created, and the secret is not accessible from the current scope.

**Solution:** Either move the secret to a higher scope (organization or account) so it is accessible from the pipeline's project, or create a copy of the secret in the correct project.

</details>

---

## Connection Failed to External Secret Manager

Pipeline execution fails because Harness cannot connect to the external secret manager to retrieve the secret value.

<details>
<summary>External secret manager is offline or unreachable</summary>

The secret manager endpoint is down, or network connectivity between the Harness Delegate and the secret manager is interrupted.

**Solution:** Verify that the external secret manager is running and accessible. Check network connectivity from the Delegate host. Verify DNS resolution and firewall rules. Test connectivity using `curl` or `telnet` from the Delegate.

</details>

<details>
<summary>Authentication credentials expired</summary>

The token or credentials used to authenticate with the external secret manager have expired or been revoked.

**Solution:** Renew or regenerate the authentication credentials for the secret manager connector. Update the connector configuration in Harness with the new credentials and test the connection.

</details>

<details>
<summary>Secret path has changed</summary>

The path or key name in the external secret manager has been modified, but the Harness secret reference still points to the old path.

**Solution:** Verify the current path of the secret in your external secret manager. Update the secret configuration in Harness to reference the correct path.

</details>

<details>
<summary>Delegate connectivity issues</summary>

The Harness Delegate responsible for retrieving the secret is offline, unhealthy, or cannot reach the secret manager endpoint.

**Solution:** Check the Delegate status in the Harness UI. Verify the Delegate is running and has a heartbeat. Ensure the Delegate has network access to the secret manager. If using Delegate selectors, verify the correct Delegate is selected.

</details>

---

## Secret Value Not Updating

You have updated a secret value but pipeline executions continue to use the old value.

<details>
<summary>Secret caching (60-second TTL)</summary>

Harness caches resolved secret values for up to 60 seconds to reduce load on secret managers. If you updated the secret and immediately ran a pipeline, the cached value may have been used.

**Solution:** Wait at least 60 seconds after updating a secret before running a pipeline that references it. The cache will expire and the new value will be retrieved on the next execution.

:::info Cache Duration
There is no manual cache invalidation mechanism — the cache expires automatically after 60 seconds.
:::

</details>

<details>
<summary>External manager not synced</summary>

If using an external secret manager with replication (e.g., GCP Secret Manager with multi-region replication), the new value may not have propagated to the region where the Delegate is retrieving the secret.

**Solution:** Verify the replication status in your external secret manager. Wait for replication to complete before running the pipeline. Check that the Delegate is connecting to the correct region endpoint.

</details>

<details>
<summary>Wrong secret updated</summary>

If you have secrets with similar names at different scopes, you may have updated the wrong one. For example, updating a project-level secret when the pipeline references an organization-level secret with a similar name.

**Solution:** Verify the exact identifier and scope of the secret referenced in the pipeline YAML. Ensure you updated the secret at the correct scope level.

</details>

---

## File Secret Decode Issues

File secrets are stored as base64-encoded content. Common issues arise when the decoded output is not handled correctly in pipeline steps.

<details>
<summary>File not decoded before use</summary>

The file secret value is base64-encoded. If you write the raw value to a file without decoding, the file will contain base64 text instead of the original file content.

**Solution:** Always pipe the secret value through `base64 -d` (or `base64 --decode`) before writing to a file.

</details>

<details>
<summary>File type mismatch</summary>

The decoded file content does not match the expected format. For example, a JSON key file was uploaded but the consuming tool expects a different format.

**Solution:** Verify the original file content matches the expected format. Decode the secret and inspect the output to ensure it matches the expected structure.

</details>

```bash title="base64-decode-examples.sh"
#!/bin/bash

# Decode a file secret and write to a file
echo '<+secrets.getValue("gcp_sa_key")>' | base64 -d > /tmp/service-account.json

# Verify the decoded file is valid JSON
cat /tmp/service-account.json | python3 -m json.tool > /dev/null 2>&1
if [ $? -eq 0 ]; then
  echo "File decoded successfully - valid JSON"
else
  echo "ERROR: Decoded file is not valid JSON"
  exit 1
fi

# macOS alternative (if base64 -d does not work)
echo '<+secrets.getValue("gcp_sa_key")>' | base64 -D > /tmp/service-account.json

# Decode and set correct file permissions
echo '<+secrets.getValue("ssh_private_key")>' | base64 -d > /tmp/id_rsa
chmod 600 /tmp/id_rsa
```

:::tip Validate After Decoding
Always validate decoded file secrets before use. For JSON files, use `python3 -m json.tool` or `jq .`. For YAML files, use `python3 -c "import yaml; yaml.safe_load(open('file.yaml'))"`. For PEM files, use `openssl x509 -in file.pem -noout -text`.
:::

---

## Diagnostic Steps

Follow this five-step process to systematically identify and resolve secret-related issues.

<details>
<summary>Step 1 — Verify the secret exists</summary>

Navigate to the Secrets page at the expected scope (Project, Organization, or Account). Search for the secret by name or identifier. Confirm the secret exists and note its exact identifier and scope.

```bash title="verify-secret.sh"
curl -s -X GET \
  "https://app.harness.io/gateway/ng/api/v2/secrets/my_secret?accountIdentifier=abc123&projectIdentifier=myproject" \
  -H "x-api-key: YOUR_API_KEY" | python3 -m json.tool
```

</details>

<details>
<summary>Step 2 — Test secret access with a minimal pipeline</summary>

Create a minimal pipeline that references the secret in a shell script step. This isolates the secret access from other pipeline logic.

```yaml title="test-secret-pipeline.yaml"
pipeline:
  name: Secret Test
  stages:
    - name: Test Secret Access
      type: custom
      spec:
        steps:
          - name: Verify Secret
            type: script
            spec:
              shell: bash
              command: |
                # This will print ******** if the secret is resolved
                echo "Secret value: <+secrets.getValue("my_secret")>"
                echo "Secret resolved successfully"
```

</details>

<details>
<summary>Step 3 — Check secret references</summary>

Open the secret details and navigate to the **References** tab. Verify that the pipeline in question is listed as a reference. If it is not listed, the expression syntax in the pipeline may be incorrect.

</details>

<details>
<summary>Step 4 — Review the activity log</summary>

Open the secret details and navigate to the **Activity** tab. Review recent events to check for unexpected modifications, deletions, or access failures. Look for error entries that indicate connection issues to the secret manager.

</details>

<details>
<summary>Step 5 — Validate permissions</summary>

Navigate to **Access Control** in your project or organization settings. Verify that the pipeline execution user or service account has the `Access` permission for the secret resource at the correct scope level.

```bash title="check-permissions.sh"
curl -s -X POST \
  "https://app.harness.io/gateway/authz/api/acl" \
  -H "x-api-key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "principal": {
      "principalIdentifier": "user_or_sa_id",
      "principalType": "USER"
    },
    "resourceScope": {
      "accountIdentifier": "abc123",
      "orgIdentifier": "default",
      "projectIdentifier": "myproject"
    },
    "resourceType": "SECRET",
    "resourceIdentifier": "my_secret",
    "permission": "core_secret_access"
  }'
```

</details>

:::info Still Having Issues?
If the diagnostic steps above do not resolve your issue, collect the following information and contact Harness support: the secret identifier and scope, the pipeline YAML with the secret reference, the full error message from the pipeline execution log, the Delegate logs if using an external secret manager, and the audit log entries for the secret.
:::