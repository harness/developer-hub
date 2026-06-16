---
title: Module Registry
description: Learn how to register a module in Harness IaCM
sidebar_position: 10
sidebar_label: Register Modules
redirect_from: /docs/infra-as-code-management/iacm-features/module-registry/module-registry
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The Harness IaCM Module Registry is a centralized repository where you can publish and manage versions of pre-built infrastructure modules. These modules, which include components like virtual machines, databases, and networks, can be reused by different teams, streamlining infrastructure management and ensuring consistency across projects.

:::tip delegate version
If you are using Harness to connect to your code repository, you can continue without further action.

However, if you are connecting via a [delegate](https://developer.harness.io/docs/platform/delegates/delegate-concepts/delegate-overview/), ensure the delegate version is `25.01.85000` or later
:::

## Register a module

:::important
To register a module version, **your Git repository must have a release or tag associated with the desired module version**. Ensure you have created a tag in your Git repository before attempting to register the module in the Module Registry.

Go to [Tags](/docs/code-repository/work-in-repos/tag/) for more information on tagging with Harness Code Repository.
:::

Follow the steps in the guide below to register a new module.

<Tabs>
<TabItem value="Interactive guide">
<DocVideo src="https://app.tango.us/app/embed/5aa16720-f96c-44f3-9ad7-2e4dce4ad3b3?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" title="Register a module in Harness" />
</TabItem>
<TabItem value="Step-by-step">
    1. Login to [Harness](https://app.harness.io).
    2. Select **Account settings**, then select  **IaCM Module Registry** from the **Account-level resources** section.
    3. Click on **New Module** and fill in or select the following fields:
        - Name
        - Provider
        - Git Provider option
        - Repository connector 
        - Git Fetch type
        - Branch/tag
    4. Click on **Save**
    
    :::note
    Your repository connector will pull the module details to store your new module.
    :::

   Once saved, the module will now appear in the Module Registry, ready for use in projects.
</TabItem>
</Tabs>

#### Register modules with OpenTofu or Terraform

You can also register modules programmatically using the Harness OpenTofu or Terraform Provider with the `harness_platform_infra_module` resource.

:::warning Repository Field Format
When using the `harness_platform_infra_module` resource, the `repository` field must be **the repository name only**, not the full URL.

```hcl
resource "harness_platform_infra_module" "example" {
  name                = "my-module"
  description         = "Example module"
  system              = "provider"
  repository          = "tf-aws-vpc"  # Repository name only
  repository_branch   = "main"
  repository_connector = "account.mygithub"
}
```
:::

---

## Review module settings
Harness pulls various details from your module and makes it easy to review them.

<DocVideo src="https://app.tango.us/app/embed/f23cb280-5072-4622-a56b-7882cd01afff?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" title="Review your settings for a registered module" />

:::info syncing module versions
The Sync button checks your registered module in Harness against the latest release in your repository and configured connector branch. If a newer version exists, it will sync it.
:::

---

## Troubleshooting

### Resolve a 404 when a pipeline downloads a module at runtime

When an IaCM pipeline initializes, it downloads the modules referenced by your configuration from the Module Registry. If a module download returns a 404 (not found), the run fails before it can plan or apply.

A 404 on a module download usually means the requested module version cannot be resolved in the registry at the moment of the download. The most common causes are a version that was never published, a source reference that does not match the registry entry, or a download that ran before a newly published version finished propagating. Work through the checks below to tell these cases apart.

1. Check whether the requested version is published in the registry. In the Harness UI, go to the Module Registry to open the module and confirm that the exact version your configuration pins appears in the version list. If the version is missing, register or sync it (see [Register a module](#register-a-module)), or update your configuration to pin a version that is published.

2. Check whether the module source reference matches the registry entry. The namespace, name, and provider (system) in your `source` reference must match the registered module exactly, including case. Open the module in the Module Registry and compare its name and provider against the reference in your configuration. Correct any mismatch in the reference so it resolves to the registered module.

3. Check whether the version was published only moments before the run. If you published or synced the version shortly before the pipeline started, re-run the pipeline and confirm whether the same version downloads successfully on the retry. A version that fails on one run and succeeds on a retry without any change to the configuration or registry points to a transient download rather than a missing version.

4. Confirm the module exists and the reference syntax is correct before re-running. Open the module in the Module Registry to verify the version is listed, then confirm your `source` reference uses the syntax shown for that module. Correcting the reference or pinning a published version resolves a genuine "not found"; if the version is present and the reference is correct, treat an intermittent 404 as a transient download and retry.

:::note registry propagation
A version that was just published or synced may not be immediately downloadable. If a 404 appears right after publishing and the same version downloads on a later run with no other change, retry the pipeline before treating the version as missing.
:::

If a 404 persists for a version that is confirmed present in the registry with a matching reference, contact [Harness Support](mailto:support@harness.io) with the failing pipeline execution URL and the module reference.
