---
title: IaCM plugins
sidebar_label: IaCM Plugins
description: Configure IaCM plugin behavior using PLUGIN_ environment variables on your workspace.
keywords:
  - iacm plugins
  - plugin environment variables
  - PLUGIN_CA_CERT_PATH
  - proxy
  - ca certificate
tags:
  - IaCM
  - plugins
sidebar_position: 40
---

{/* cSpell:ignore iacm */}

IaCM executes provisioner operations through a Harness-managed plugin. The plugin runs automatically as part of IaCM operations, and you configure its behavior by setting `PLUGIN_` environment variables on your workspace.

---

## What is a plugin?

Using a plugin enables IaCM to:

- Run provisioners in an isolated, reproducible environment.
- Configure plugin behavior through a stable set of `PLUGIN_` environment variables.
- Deliver fixes and new capabilities without pipeline changes.
- Run consistently across Harness-hosted and self-managed infrastructure, including environments behind proxies.

---

## Set a plugin environment variable

The plugin reads its configuration from the environment variables on your workspace.

1. Navigate to your workspace and select the **Connectors and Variables** tab.
2. In the **Environment Variables** section, select **+ Add Variable**.
3. Set **Type** to **string** or **secret**, depending on the sensitivity of the value.
4. Set **Key** to the full variable name including the `PLUGIN_` prefix (for example, `PLUGIN_CA_CERT_PATH`) and set the **Value**. Harness passes all workspace environment variables through to the plugin container, and the IaCM plugin reads only those with the `PLUGIN_` prefix to configure its behavior.
5. Select **Save Changes**.

---

## Plugin environment variables {#iacm-plugin-reference}

The following `PLUGIN_` environment variables are available on the IaCM plugin. Select a variable name to view its full configuration details.

| **Variable** | **Applies to** | **Description** |
|---|---|---|
| [`PLUGIN_CA_CERT_PATH`](#plugin-ca-cert-path) | Terraform, OpenTofu, Terragrunt, and AWS CDK | Trusts a corporate CA certificate for provisioner binary downloads behind a TLS-intercepting proxy. |


---

### PLUGIN_CA_CERT_PATH {#plugin-ca-cert-path}

Points the IaCM plugin to a corporate CA certificate so it can trust a TLS-intercepting proxy during provisioner binary downloads. A corporate CA certificate is your organization's internal certificate authority certificate. Corporate proxies commonly use this certificate to re-sign intercepted HTTPS traffic, which causes standard certificate validation to fail unless the plugin explicitly trusts it.

**When to use it:** Use this variable when IaCM runs on customer-managed infrastructure behind an HTTP(S) forward proxy that re-signs TLS certificates with a corporate CA. If provisioner downloads fail or hang while calls to `*.harness.io` succeed, configure `PLUGIN_CA_CERT_PATH`.

**Requirements:**
- The value must point to a single PEM file containing one or more certificates (a CA bundle), not a directory.
- Mount the certificate file into the runner or plugin container before referencing it.

**How it works:** When set, the plugin creates a trust bundle that combines your corporate CA certificate with the operating system's default trusted root certificates and configures the provisioner download process to use this bundle automatically. The plugin also sets `SSL_CERT_FILE`, `CURL_CA_BUNDLE`, and `SSL_CERT_DIR` for troubleshooting. You do not need to configure these variables manually.

**Configure PLUGIN_CA_CERT_PATH:**

1. Mount your corporate CA certificate into the runner or plugin container. For example:

   ```
   /etc/iacm/corporate-ca.pem
   ```

2. Add a workspace environment variable with:
   - **Key:** `PLUGIN_CA_CERT_PATH`
   - **Value:** The mounted certificate path.

3. Re-run the pipeline.

**Verify:** Check the step logs for a message similar to:

```
[certs] corporate CA trust configured from /etc/iacm/corporate-ca.pem
```

The **Installing provisioner** step downloads the provisioner binary successfully through the proxy, and the pipeline continues with the remaining IaCM operations.

---

## Related concepts {#iacm-related-concepts}

- Go to [Connectors and variable sources](/docs/infra-as-code-management/configuration/connectors-and-variables/connectors-variables) to configure workspace environment variables.
- Go to [Custom images for OpenTofu](/docs/infra-as-code-management/iac-provisioners/opentofu/custom-images) to add certificates by building a custom plugin image.
