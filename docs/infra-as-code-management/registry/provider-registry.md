---
title: Provider Registry
sidebar_label: Provider Registry
sidebar_position: 20
description: Publish, sign, and consume custom OpenTofu or Terraform providers with the Harness IaCM Provider Registry.
keywords:
  - IaCM
  - Provider Registry
  - custom provider
  - GPG key
  - provider protocol
  - SHA256SUMS
  - OpenTofu
  - Terraform
tags:
  - IaCM
  - registry
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

The Harness IaCM **Provider Registry** allows you to securely publish and distribute <Tooltip id="iacm.provider-registry.custom-provider">custom providers</Tooltip>. Providers are signed with <Tooltip id="iacm.provider-registry.gpg-key">GPG keys</Tooltip>, compiled as <Tooltip id="iacm.provider-registry.binary-files">binary files</Tooltip> for <Tooltip id="iacm.provider-registry.multiple-platforms">multiple platforms</Tooltip>, and made available for use in [OpenTofu](https://opentofu.org/) or Terraform configurations.

You find the Provider Registry under **IaCM** > **Registry**, alongside the [Module Registry](/docs/infra-as-code-management/registry/module-registry) and **GPG Keys** tabs. Because providers are distributed as compiled binaries rather than source, you build and sign them yourself, then upload the binaries and their signature to Harness.

:::tip Example use case
A DevOps team creates a **custom provider** to integrate OpenTofu with their internal APIs. By publishing it in the Provider Registry, developers across macOS, Linux, and Windows consume the provider during `tofu init` without manually managing binaries.
:::

---

## What you will learn from this topic

This page walks through the full lifecycle of a custom provider, from signing key to consumption:

- **Generate and register a GPG key:** Create a signing key and add it to Harness so the registry can verify your binaries.
- **Build the required artifacts:** Produce platform-specific binaries, a checksum file, and a detached signature.
- **Publish a provider version:** Register the provider in Harness, select a protocol version, upload the artifacts, and publish.
- **Consume the published provider:** Reference the provider from an OpenTofu or Terraform configuration, and authenticate the CLI for local runs.

---

## Before you begin

Confirm the following before you publish a provider version:

- **Harness account with IaCM enabled:** You need **Infrastructure as Code Management** under **Infrastructure** in Harness when it is entitled on your account. Go to [Getting started with Harness Platform](/docs/platform/get-started/onboarding-guide) to access or create a Harness account.

    :::info Contact Harness support:

    If IaCM does not appear, go to [Get started with IaCM](/docs/infra-as-code-management/get-started) or contact your account administrator or [Harness Support](mailto:support@harness.io).

    :::

- **Provider Registry permissions:** You need **View** (`iac_providerregistry_view`) and **Create / Edit** (`iac_providerregistry_edit`) on **IACM Provider Registry**, plus **Create / Edit** (`iac_registry_edit`) on **Registry** to add GPG keys. Go to the [permissions reference](/docs/platform/role-based-access-control/permissions-reference#infrastructure-as-code) to review the IaCM resources, and to [RBAC in Harness](/docs/platform/role-based-access-control/rbac-in-harness) and [Manage roles](/docs/platform/role-based-access-control/add-manage-roles) to have an administrator assign a role that includes them.
- **Local build environment:** A toolchain that compiles your provider into platform-specific binaries, such as Go.
- **GPG tooling:** Go to [GnuPG downloads](https://www.gnupg.org/download/) to install `gpg` on your machine.

---

## Prepare your provider

The Provider Registry assumes your binaries are already signed with a GPG key. This section covers generating that key, registering it with Harness, and producing the checksum and signature files that publishing requires.

### Generate a GPG key

GPG keys sign your provider binaries so the registry, and the OpenTofu or Terraform client, can verify them. Harness needs three values from the key: the **Name**, the **Key ID**, and the **ASCII armored public key**.

Run the following commands in order to generate a key and collect those values:

1. Generate a key pair and follow the interactive prompts:

   ```bash
   gpg --full-generate-key
   ```

2. List your keys in long format to find the key ID:

   ```bash
   gpg --list-keys --keyid-format LONG
   ```

3. Export the public key in ASCII armor format, substituting the key ID from the previous step:

   ```bash
   gpg --armor --export <KEY_ID>
   ```

Go to [Generating a new GPG key](https://docs.github.com/en/authentication/managing-commit-signature-verification/generating-a-new-gpg-key) to review the full GnuPG walkthrough, including passphrase and expiry choices.

### Add your GPG key to IaCM

Register the public key with Harness so it can verify the signature you upload with each provider version:

1. Go to **IaCM** > **Registry** > **GPG Keys**.
2. Click **New GPG Key**.
3. Enter the **Name**, **Key ID**, and **ASCII armored public key** you collected in the previous step.
4. Click **Save**.

### Create checksum and signature files

Each provider version requires three kinds of artifact:

- **Compiled binaries:** One binary for each operating system and architecture you support.
- **Checksum file:** A `SHA256SUMS` <Tooltip id="iacm.provider-registry.checksum-file">checksum file</Tooltip> listing the hash of every binary.
- **Signature file:** A `SHA256SUMS.sig` <Tooltip id="iacm.provider-registry.signature-file">signature file</Tooltip>, which is a detached signature. A detached signature is a separate file that proves the checksum file was signed by your key, rather than wrapping the signed content inside it.

Run both commands from the directory that holds your compiled binaries.

1. Create the checksum file. The command differs by operating system:

   <Tabs queryString="checksum-os">
   <TabItem value="macos" label="macOS" default>

   ```bash
   shasum -a 256 * > SHA256SUMS
   ```

   </TabItem>
   <TabItem value="linux" label="Linux">

   ```bash
   sha256sum * > SHA256SUMS
   ```

   </TabItem>
   </Tabs>

   :::warning Match the checksum entries to the files you upload
   Both commands expand `*` against the current directory only. If your binaries sit in per-platform subdirectories, the command fails with a directory error and hashes nothing. Flatten the binaries into one directory first, or name them explicitly. Re-run the command if you rebuild a binary, and delete any stale `SHA256SUMS` beforehand so the file does not list itself.
   :::

2. Sign the checksum file with the same key you registered in Harness:

   ```bash
   gpg --default-key <KEY_ID> --output SHA256SUMS.sig --detach-sign SHA256SUMS
   ```

---

## Register and publish a provider

Registering a provider creates the entry in the registry. Publishing a version validates your uploaded artifacts and makes that version available to OpenTofu and Terraform.

### Select a provider protocol version

Registration asks you to select a protocol version, so decide which one your provider implements before you start.

:::info Provider protocol versions
The provider protocol defines the interface and communication standard between OpenTofu or Terraform and external providers. Each protocol version, such as v4, v5, or v6, specifies how providers implement functions, handle requests, and structure their schemas. Newer protocol versions add features, improve security, and may deprecate older behaviours.

Select the protocol version that matches your provider implementation and the Terraform or OpenTofu version you intend to support. Selecting multiple protocol versions widens compatibility and supports users who have not yet upgraded. If the selected protocol does not match what your binary implements, `init` fails when the client negotiates with the provider.

Go to the [Terraform plugin protocol reference](https://developer.hashicorp.com/terraform/plugin/terraform-plugin-protocol) to review what each protocol version supports.
:::

### Publish a provider version

Follow either the interactive guide or the written steps below.

<Tabs queryString="provider-registration">
<TabItem value="interactive-guide" label="Interactive Guide" default>
<DocVideo src="https://app.tango.us/app/embed/c6beb8f1-75df-4c1d-bbab-3d87209ef6fd?skipCover=true&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" title="Register a Provider in Harness IaCM" />
</TabItem>
<TabItem value="step-by-step" label="Step-by-Step">

Complete the following steps to register a provider and publish its first version:

1. From the IaCM module, go to **Registry**, then select the **Provider Registry** tab.
2. Click **New Provider** and enter a provider name.
3. Add a version. The version must follow semantic versioning, for example `1.0.0`.
4. Select one of your stored GPG keys.
5. Select a provider protocol version, for example v4, v5, or v6.
6. Upload the required files: the compiled binaries for all supported operating systems and architectures, the `SHA256SUMS` checksum file, and the `SHA256SUMS.sig` signature file.
7. Verify that all registry files are uploaded.
8. Click **Publish**. Harness validates the upload and publishes the provider version.

:::note Draft state
If you do not publish the version immediately, it remains in a draft state and appears alongside published versions on the provider detail page. Drafts allow you to upload additional binaries, checksums, or signature files later before finalizing the version. Draft versions are not available for consumption in OpenTofu or Terraform, so `init` cannot resolve them until you reopen the draft and click **Publish**.
:::

:::warning Publishing fails if:
- Any required file is missing.
- Filename versions do not match the version you entered.
- The signature or checksum file does not match the uploaded binaries.

The version stays in draft state when validation fails. Correct the artifacts, re-upload the affected files, then publish again.
:::

</TabItem>
</Tabs>

---

## Consume a published provider

Once published, a provider version resolves like any other registry provider. Workspace executions authenticate automatically; local runs need a token.

### Reference the provider in your configuration

Declare the provider in the `required_providers` block, using your Harness account ID and provider name:

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

Your Harness account ID appears in the URL of any Harness page, after `/account/`, and under **Account Settings** > **Account Details**.

When you run the <Tooltip id="iacm.tf-commands.init">init</Tooltip> command, OpenTofu or Terraform automatically pulls the binary that matches the client operating system and architecture. If no uploaded binary matches that platform, `init` fails.

### Authenticate the OpenTofu or Terraform CLI

Inside an IaCM workspace execution, Harness authenticates to the registry for you and no extra configuration is needed. When you run `tofu init` or `terraform init` locally against a configuration that sources providers from the Harness registry, the CLI must authenticate with `app.harness.io` itself. Without authentication, `init` fails with a `401` error when it tries to download the provider.

OpenTofu and Terraform read tokens from environment variables named `TF_TOKEN_<hostname>`, where dots in the hostname are replaced with underscores. Set the variable to a [Harness personal access token (PAT)](/docs/platform/automation/api/add-and-manage-api-keys) before running any local commands:

```bash
export TF_TOKEN_app_harness_io=<your_harness_pat>
tofu init
# or: terraform init
```

:::note Self-Managed Platform
If your organization runs Harness on a custom domain, for example `registry.example.com`, replace dots with underscores in that hostname:

```bash
export TF_TOKEN_registry_example_com=<your_harness_pat>
tofu init   # or: terraform init
```
:::

To persist the token across shell sessions, add the `export` line to your shell profile, such as `~/.zshrc` or `~/.bashrc`. Alternatively, store credentials in the OpenTofu or Terraform credentials file (`~/.tofurc` or `~/.terraform.d/credentials.tfrc.json`).

:::info Two authentication contexts, kept separate
`TF_TOKEN_app_harness_io` authenticates your local CLI with the registry. It is unrelated to the GPG key, which only signs and verifies the binaries. Go to [Use a Module](/docs/infra-as-code-management/registry/module-registry/registered-module-settings#use-a-module) to review the equivalent setup for modules.
:::

---

## Troubleshooting

<Troubleshoot
  issue="tofu init or terraform init returns a 401 error when pulling a provider from the Harness IaCM Provider Registry"
  mode="general"
  fallback="Set the TF_TOKEN_app_harness_io environment variable to a valid Harness personal access token before running init. If your organization uses a custom domain, replace dots in the hostname with underscores for the variable name, for example TF_TOKEN_registry_example_com."
/>

<Troubleshoot
  issue="Publishing a provider version fails in Harness IaCM because a required file is missing or the version does not match"
  mode="general"
  fallback="Publishing requires every supported binary plus the SHA256SUMS and SHA256SUMS.sig files. Confirm that the version string in each binary filename matches the version you entered exactly, for example 1.0.0 and not 1.0.1. The version stays in draft state until validation passes."
/>

<Troubleshoot
  issue="Signature verification fails when publishing a provider version to the Harness IaCM Provider Registry"
  mode="general"
  fallback="SHA256SUMS.sig must be a detached signature of the exact SHA256SUMS file you upload, created with the same GPG key registered under Registry > GPG Keys. If you rebuilt any binary, regenerate SHA256SUMS and re-sign it before uploading."
/>

<Troubleshoot
  issue="A published Harness IaCM provider does not download for a specific operating system or architecture during tofu init"
  mode="general"
  fallback="Upload a compiled binary for every operating system and architecture you intend to support. OpenTofu and Terraform resolve the binary matching the client platform, and init fails when no uploaded binary matches it."
/>

<Troubleshoot
  issue="A Harness IaCM provider version stays in draft state and cannot be consumed in OpenTofu or Terraform"
  mode="general"
  fallback="Draft versions are not available for consumption. Open the version on the provider detail page, confirm all binaries, the checksum file, and the signature file are uploaded, then click Publish."
/>

---

## Next steps

You have published a signed provider version and made it available to every OpenTofu and Terraform configuration in your account. Explore the other reusable building blocks in IaCM:

- [Module Registry](/docs/infra-as-code-management/registry/module-registry): Publish and share OpenTofu or Terraform modules.
- [Workspace Templates](/docs/infra-as-code-management/workspaces/workspace-templates): Standardize workspace configurations across teams.
- [Permissions reference](/docs/platform/role-based-access-control/permissions-reference#infrastructure-as-code): Review every IaCM resource and permission before delegating registry access.
