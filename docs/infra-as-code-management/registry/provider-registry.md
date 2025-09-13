---
title: Provider Registry
description: Learn how to publish and manage custom providers with Harness IaCM's Provider Registry.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


The Harness IaCM **Provider Registry** allows you to securely publish and distribute <Tooltip text="A OpenTofu or Terraform provider built and maintained by your organization, usually for internal APIs or services not available in the public registry.">custom providers</Tooltip>. Providers are signed with <Tooltip text="A cryptographic key used to verify the authenticity and integrity of files. In this case, it ensures provider binaries have not been tampered with.">GPG keys</Tooltip>, compiled as <Tooltip text="Executable program files produced after compiling source code (for example, Go or Java). Terraform/OpenTofu uses these binaries to interact with your infrastructure.">binary files</Tooltip> for <Tooltip text="Supported platforms include Darwin/macOS (arm64, amd64), Linux (amd64), and Windows (amd64).">multiple platforms</Tooltip>, and made available for use in [OpenTofu](https://opentofu.org/) or Terraform configurations.

- Found under **IaCM > Registry** (alongside Module Registry and GPG Keys).  
- Providers are published as **compiled binaries** for supported operating systems like macOS, Linux, or Windows.  
- **GPG keys** are required to sign provider binaries for verification.  

:::tip Example use case  
A DevOps team creates a **custom provider** to integrate OpenTofu with their internal APIs.  
By publishing it in the Provider Registry, developers across macOS, Linux, and Windows can seamlessly consume the provider during `tofu init` without manually managing binaries.  
:::

---

## Prerequisites  
Before using the Provider Registry, ensure you have:  

- A **GPG key** with:  
  - Name  
  - Key ID  
  - ASCII armor format  
- Installed **GPG tooling** to generate, list, and export keys.  
- **Compiled binaries** for supported OS/architectures:  
  - Darwin/macOS (arm64, amd64)  
  - Linux (amd64)  
  - Windows (amd64)  
- A **checksum file** with SHA-256 hashes of all binaries.  
- A **signature file** (`.sig`) created by signing the checksum file.  

---

## GPG Key Setup  
GPG keys are required to sign provider binaries before publishing.  

:::note Required values
- **Name**  
- **Key ID**  
- **ASCII armored public key**  
:::

**[Insert GitHub link with detailed steps once available.]**

<Tabs queryString="gpg-key-setup">
<TabItem value="1. Generate a GPG key" label="1. Generate a GPG key">
### Generate a GPG key  
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


---

## Provider Registration
<Tabs queryString="provider-registration">
<TabItem value="step-by-step" label="Step-by-Step">
1.	Go to IaCM > Registry > Provider Registry.
	2.	Click New Provider and enter a provider name.
	3.	Add a version (must follow semantic versioning, e.g., 1.0.0).
	4.	Select one of your stored GPG keys.
	5.	Choose a provider protocol version (UI dropdown currently limited to v4, v5, v6).
	6.	Upload the required files:
	•	Compiled binaries for all supported OS/architectures.
	•	SHA256SUMS checksum file.
	•	SHA256SUMS.sig signature file.
	7.	Verify that all files are uploaded.
	8.	Click Publish. The system will validate the upload and publish the provider version.

:::warning Publishing will fail if:
	•	Any required file is missing.
	•	Filename versions don’t match the version you entered.
	•	The .sig or checksum file does not match.
:::
</TabItem>
<TabItem value="yaml" label="Config Snippet">
```yaml
# Example placeholder for future CLI/YAML-based setup
provider:
  name: myprovider
  version: 1.0.0
  gpg_key: <KEY_ID>
  protocols: [ "5" ]
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

### Binary Files Requirements

Each provider version requires the following:
	•	Compiled binaries for each supported OS/architecture.
	•	A checksum file containing SHA-256 hashes of the binaries.
	•	A signature file (.sig) created by signing the checksum file.

Example: Create checksum file
```bash
shasum -a 256 * > SHA256SUMS
```

Example: Sign checksum file
```bash
gpg --default-key <KEY_ID> --output SHA256SUMS.sig --detach-sign SHA256SUMS
```

---

## Use Published Providers
Once published, providers can be consumed directly in Terraform/OpenTofu configs:

```hcl
terraform {
  required_providers {
    myprovider = {
      source  = "example.com/org/myprovider"
      version = "1.0.0"
    }
  }
}
```
When you run terraform init, Terraform will automatically pull the correct binary for your operating system.

---

## Troubleshooting
- Version mismatches: Filenames must match the registry version exactly (e.g., 1.0.0 vs 1.0.1).
- Missing files: Publishing requires all binaries, checksum, and signature files.
- UI issues: Known limitations include restricted protocol selection and unclear error messages.

---

## Next Steps
Explore other reusable features in IaCM:
- Module Registry — publish and share Terraform/OpenTofu modules.
- Workspace Templates — standardize workspace configurations across teams.
- GPG Keys Management — securely manage keys used for provider signing.