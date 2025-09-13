---
title: Root & Submodule Usage
description: Learn about the requirements and correct usage of root modules and nested submodules.
sidebar_position: 30
sidebar_label: Root & Submodule Usage
redirect_from: /docs/infra-as-code-management/iacm-features/module-registry/root-sub-module-usage
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


This document provides an overview of the requirements and best practices for using root modules and nested submodules in your infrastructure-as-code setup. It explains the structure and configuration needed for single-module repositories and how to properly reference submodules within your code. Understanding these concepts will help ensure consistency and maintainability in your module usage.

:::important
To register a module version, **your Git repository must have a release or tag associated with the desired module version**. Ensure you have created a tag in your Git repository before attempting to register the module in the Module Registry.

Go to [Tags](/docs/code-repository/work-in-repos/tag/) for more information on tagging with Harness Code Repository.
:::

## Authentication for Local Usage
To authenticate with the Harness Module Registry when working locally, set the `TF_TOKEN_<subdomain>_harness_io` environment variable with your personal access token (PAT) before running [the `init` command](/docs/infra-as-code-management/cli-commands/terraform-plugins#initialize). This allows Terraform to access private modules securely. For example, `TF_TOKEN_app_harness_io`.


```bash
export TF_TOKEN_<subdomain>_harness_io=your_pat_token
tofu init
```

<Tabs>
<TabItem value="Single modules">

## Root Level Modules
If you are using only a single module, you must have a `main.tf` file at the root level of your repository. Below is an example of the typical structure for a single-module repository:

```
.
├── README.md
├── main.tf
├── variables.tf
├── outputs.tf
```

Here is an example of defining a single module in `main.tf`:

```hcl
module "native-module" {
  source  = "app.harness.io/<account_id>/native-module/aws"
  version = "1.2.1"  # This matches your repository's Git tags.
}
```
</TabItem>
<TabItem value="Submodules">

## Submodule Usage
:::info
While there is no set limit on nested submodule paths, metadata collection is only carried out one level deep.
:::

Submodules are only recognized if they are placed within the `modules` folder. 

Here is an example of the repository tree with submodules:

```
.
├── README.md
├── main.tf
├── variables.tf
├── outputs.tf
├── ...
├── modules/
│   ├── submoduleA/
│   │   ├── main.tf
│   │   ├── ...
│   ├── submoduleB/
│   │   │── README.md
│   │   │── main.tf
│   │   │── variables.tf
│   │   │── outputs.tf
```

They can be referenced in your root module `main.tf` file as shown below. Notice the `//` syntax, which indicates the path to the submodule:

```hcl
module "native-submodule" {
  source  = "app.harness.io/<account-id>/native-module//modules/native-submodule"
}
```
:::info submodule versions
Note that **submodules cannot have a version included**, as Git tags do not apply to anything beyond the root level.
:::
</TabItem>
</Tabs>