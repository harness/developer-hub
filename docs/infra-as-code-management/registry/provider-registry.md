---
title: Provider Registry
description: Learn how to publish and manage custom providers with Harness IaCM's Provider Registry.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The Harness IaCM **Provider Registry** allows you to securely publish and distribute <Tooltip text="A OpenTofu or Terraform provider built and maintained by your organization, usually for internal APIs or services not available in the public registry.">custom providers</Tooltip>. Providers are signed with <Tooltip text="A cryptographic key used to verify the authenticity and integrity of files. In this case, they ensure provider binaries have not been tampered with.">GPG keys</Tooltip>, compiled as <Tooltip text="Executable program files produced after compiling source code (for example, Go or Java). OpenTofu or Terraform uses these binaries to interact with your infrastructure.">binary files</Tooltip> for <Tooltip text="Supported platforms include Darwin/macOS (arm64, amd64), Linux (amd64), and Windows (amd64).">multiple platforms</Tooltip>, and made available for use in [OpenTofu](https://opentofu.org/) or Terraform configurations.

- Found under **IaCM > Registry** (alongside [Module Registry](/docs/infra-as-code-management/registry/module-registry) and GPG Keys).
- Providers are published as **compiled binaries** for supported operating systems like macOS, Linux, or Windows.
- **GPG keys** are required to sign provider binaries for verification.

:::tip Example use case  
A DevOps team creates a **custom provider** to integrate OpenTofu with their internal APIs.  
By publishing it in the Provider Registry, developers across macOS, Linux, and Windows can seamlessly consume the provider during `tofu init` without manually managing binaries.  
:::

---

## Prerequisites
Before you begin, make sure you have:
1. **Access and permissions** to IaCM and the **Registry** area in your Harness project.
2. A local build environment to **compile your provider** into platform-specific binaries (for example, Go or Java toolchains).
3. [**GPG tooling installed**](https://www.gnupg.org/download/) on your machine.

---

## Provider Preparation
Before registering your provider, you must prepare the necessary cryptographic keys and supporting files.

### GPG Key Setup
GPG keys are required to sign provider binaries before publishing.

:::info Required values
- **Name**
- **Key ID**
- **ASCII armored public key**
:::

Follow the three steps below to generate a GPG key:

<Tabs queryString="gpg-key-setup">
<TabItem value="1. Generate a GPG key" label="1. Generate a GPG key">

```bash
gpg --full-generate-key
```

</TabItem>
<TabItem value="2. List GPG keys" label="2. List GPG keys">

```bash
gpg --list-keys --keyid-format LONG
```

</TabItem>
<TabItem value="3. Export GPG key" label="3. Export GPG key">
Export GPG key (in ASCII armor format)
```bash
gpg --armor --export <KEY_ID>
```
</TabItem>
</Tabs>

If you need more information on how to generate GPG Keys, go to [Generating a new GPG key for full instructions](https://docs.github.com/en/authentication/managing-commit-signature-verification/generating-a-new-gpg-key).

### Add your GPG key to IaCM
1. Go to **IaCM > Registry > GPG Keys**
2. Click **New GPG Key**
3. Enter the **Name**, **Key ID**, and **ASCII armored public key** as generated in the previous steps above.
4. Click **Save**

---

### File Requirements
Each provider version requires the following artifacts:
- Compiled binaries for each supported OS/architecture.
- A SHA256SUMS checksum file.
- A SHA256SUMS.sig signature file.

<Tabs queryString="file-requirements">
<TabItem value="create-checksum" label="1. Create CHECKSUM file">

```bash
shasum -a 256 * > SHA256SUMS
```
</TabItem>
<TabItem value="sign-checksum" label="2. Sign the CHECKSUM file:">

```bash
gpg --default-key <KEY_ID> --output SHA256SUMS.sig --detach-sign SHA256SUMS
```
</TabItem>
</Tabs>

---

## Provider Registration
<Tabs queryString="provider-registration">
<TabItem value="Interactive guide" label="Interactive guide">
<DocVideo src="https://app.tango.us/app/embed/c6beb8f1-75df-4c1d-bbab-3d87209ef6fd?skipCover=true&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" title="Registry a Provider in Harness IaCM" />
</TabItem>
<TabItem value="step-by-step" label="Step-by-Step">

1. From the IaCM module, go to **Registry**, then select the **Provider Registry** tab.
2. Click **New Provider** and enter a provider name.
3. Add a version (must follow semantic versioning, e.g., 1.0.0).
4. Select one of your stored GPG keys.
5. Choose a provider protocol version, e.g. v4, v5, v6.

:::info provider protocol versions
The provider protocol defines the interface and communication standard between OpenTofu or Terraform and external providers. Each protocol version (e.g., v4, v5, v6) specifies how providers should implement functions, handle requests, and structure their schemas. Newer protocol versions add features, improve security, and may deprecate older behaviors. Select the protocol version that matches your provider implementation and the Terraform/OpenTofu version you intend to support.

Selecting multiple provider protocol versions allows your provider to be compatible with a wider range of Terraform or OpenTofu versions, and to support users who may not yet have upgraded to the latest protocol.
:::

6. Upload the required files:
- Compiled binaries for all supported OS/architectures.
- SHA256SUMS checksum file.
- SHA256SUMS.sig signature file.

7. Verify that ALL registry files are uploaded.
8. Click **Publish**. The system will validate the upload and publish the provider version.

:::warning Publishing will fail if:
- Any required file is missing.
- Filename versions don’t match the version you entered.
- The .sig or checksum file does not match.
:::

</TabItem>
<TabItem value="yaml" label="YAML">

```yaml
# Example placeholder for future CLI/YAML-based setup
provider:
  name: myprovider
  version: 1.0.0
  gpg_key: <KEY_ID>
  protocols: ["5"]
  files:
    - darwin_arm64/myprovider_v1.0.0
    - darwin_amd64/myprovider_v1.0.0
    - linux_amd64/myprovider_v1.0.0
    - windows_amd64/myprovider_v1.0.0
    - SHA256SUMS
    - SHA256SUMS.sig
```
</TabItem>
</Tabs>

---

## Use Published Providers
Once published, providers can be consumed directly in Tofu/Terraform configuration:

For example:
```hcl
terraform {
  required_providers {
    <provider-name> = {
      source = "<provider-name>.app.harness.io/account/<harness-account-id>/<provider-name>"
      version = "1.0.0"
    }
  }
}
provider "<provider-name>" {
 # Configuration options 
}
```

When you run <Tooltip text="OpenTofu or Terraform command-line tool used to initialize a new or existing Terraform configuration. It downloads and configures providers, modules, and other dependencies." />`init`</Tooltip> command, OpenTofu/Terraform will automatically pull the correct binary for your operating system.

---

## Troubleshooting
- **Version mismatches:** Versions in your binary filenames must match the registry version exactly (e.g., 1.0.0 vs 1.0.1).
- **Missing files:** Publishing requires all binaries, checksum, and signature files.

---

## Next Steps
Explore other reusable features in IaCM:
- [**Module Registry**](/docs/infra-as-code-management/registry/module-registry): publish and share Terraform/OpenTofu modules.
- [**Workspace Templates**](/docs/infra-as-code-management/workspaces/workspace-templates): standardize workspace configurations across teams.