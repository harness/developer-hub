---
title: Set Up a Module
description: Prepare an OpenTofu or Terraform module repository with the required file structure so the Harness IaCM Module Registry can parse it correctly.
sidebar_position: 20
sidebar_label: Set Up a Module
redirect_from:
  - /docs/infra-as-code-management/registry/module-registry/content/module-structure
keywords:
  - IaCM
  - Module Registry
  - module structure
  - module layout
  - submodules
  - OpenTofu
  - Terraform
tags:
  - IaCM
  - registry
---

Harness reads your module's files and automatically parses them into tabs in the Module Registry. Structure your repository correctly so the registry can surface your module's inputs, outputs, dependencies, resources, documentation, and submodules.

This topic covers the required module structure, standard files, submodules, and repository layouts.

<!-- SCREENSHOT: A module repository in an IDE or file explorer showing the standard file layout: main.tf, variables.tf, outputs.tf, versions.tf, README.md, and a modules/ folder. This illustrates what a correctly structured module repository looks like before registration. -->

---

## What you will learn

By the end of this page, you will understand:

- **Required files**: Which files (`main.tf`, `variables.tf`, `outputs.tf`, `versions.tf`, `README.md`) are required or recommended, and what each one does.
- **Registry tab mapping**: How each standard file maps to a tab in the Module Registry (Inputs, Outputs, Dependencies, Resources, Readme, Submodules).
- **Submodule structure**: How to add reusable child modules and how the registry parses them one level deep.
- **Non-standard layouts**: How to configure a `Folder Path` when your module does not sit at the repository root, such as in a monorepo.

---

## Module requirements

A module has a **root module**, which contains the top-level configuration for the module. The root module is required. Reusable child modules (submodules) are optional. The most common entry-point file is `main.tf`.

---

## Module layout

A typical module repository contains the following files and directories:

```
module-name/
├── main.tf       # Primary resource configurations
├── variables.tf  # Input variable definitions
├── outputs.tf    # Output values
├── README.md     # Documentation for the module
├── versions.tf   # Version constraints and provider requirements
├── provider.tf   # Provider configuration (optional)
├── modules/      # Nested submodules (optional)
├── examples/     # Usage examples (for integration testing)
└── tests/        # Automated test files (for Tofu/Terraform testing)
```

---

## Standard files and registry tabs

The Module Registry parses standard files and surfaces their contents in corresponding tabs. If something looks incorrect in the registry, update the source files rather than the registry.

| File | Purpose | Registry tab |
| --- | --- | --- |
| `variables.tf` | Declares the module's input variables. Include descriptions and, when applicable, default values. | Inputs |
| `outputs.tf` | Declares the values the module returns, so users can access relevant module data. | Outputs |
| `versions.tf` | Declares required providers and version constraints to keep the module stable. | Dependencies |
| `main.tf` | Declares the resources the module manages. | Resources |
| `README.md` | Human-readable documentation: overview, usage, and examples. | Readme |
| `modules/` | Folder of nested submodules. Metadata is collected one level deep. | Submodules |
| `provider.tf` | Provider configuration. Define settings here rather than hardcoding them in the module so consumers retain flexibility. | — |

The `examples/` and `tests/` directories support module testing but do not appear as registry tabs. Go to [Test a Module](/docs/infra-as-code-management/registry/module-registry/module-registry-testing) to configure module testing.

<details>
<summary>Example: variables.tf</summary>

```hcl
variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t2.micro"
}
```

</details>

<details>
<summary>Example: outputs.tf</summary>

```hcl
output "instance_id" {
  description = "ID of the created EC2 instance"
  value       = aws_instance.example.id
}
```

</details>

<details>
<summary>Example: versions.tf</summary>

```hcl
tofu {
  required_version = ">= 1.0.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }
}
```

</details>

---

## Submodules

Submodules let you ship smaller reusable pieces alongside a root module. Place them in a folder named `modules/` at the root. Submodules are only recognized inside that folder.

:::warning Submodules cannot carry their own version
Git tags apply only to the root module, so submodules inherit the root module's tag. Do not add a `version` argument to a submodule `source` that uses the `//` path syntax. OpenTofu and Terraform reject this source format.
:::

The registry parses only the immediate children of the `modules/` directory. Deeper submodules remain usable through the `//` subpath syntax but do not appear in the registry tabs.

Example repository tree with submodules:

```
.
├── README.md
├── main.tf
├── variables.tf
├── outputs.tf
├── modules/
│   ├── submoduleA/
│   │   ├── main.tf
│   │   └── ...
│   └── submoduleB/
│       ├── README.md
│       ├── main.tf
│       ├── variables.tf
│       └── outputs.tf
```

Go to [Explore Module Details](/docs/infra-as-code-management/registry/module-registry/registered-module-settings) to review how submodule metadata surfaces in the registry.

---

## Non-standard layouts {#non-standard-layouts}

By default, the registry expects the root module (`main.tf`) at the repository root and submodules inside a `modules/` folder. If your module does not sit at the repository root, for example in a monorepo holding multiple modules, set the **Folder Path** field when you register it. **Folder Path** maps to the `repository_path` argument on the `harness_platform_infra_module` Terraform resource.

Setting **Folder Path** re-roots all resolution, including where the registry looks for the `modules/` folder, so submodules are discovered relative to the path you set.

**Example**: Root module lives in `terraform/infrastructure`:

```
.
├── README.md
└── terraform/
    └── infrastructure/
        ├── main.tf
        ├── variables.tf
        ├── outputs.tf
        └── modules/
            └── submoduleA/
                └── main.tf
```

Set **Folder Path** during registration:

1. In the **New Module** wizard, configure the module name, provider, connector, and repository.
2. In the **Folder Path** field, enter the path from the repository root to the directory containing the root module, for example `terraform/infrastructure`.
3. Complete the remaining fields and select **Save**.

Or set the equivalent `repository_path` argument in Terraform:

```hcl
resource "harness_platform_infra_module" "example" {
  name                 = "my-module"
  system               = "aws"
  repository           = "tf-aws-vpc"
  repository_branch    = "main"
  repository_path      = "terraform/infrastructure"
  repository_connector = "account.mygithub"
}
```

:::tip Submodules not appearing?
Confirm that **Folder Path** points at the directory containing `main.tf` and that submodules sit in a `modules/` folder directly under that path. Metadata collection is one level deep, so deeply nested submodules are not surfaced even though they remain usable through the `//` subpath syntax.
:::

---

## Recommended module structure

- **Root module**: Keep the root module at the repository root or configured Folder Path.
- **Submodules**: Place reusable child modules in the `modules/` directory.
- **Documentation**: Include module usage and examples in `README.md`.
- **Version constraints**: Specify compatible OpenTofu or Terraform and provider versions in `versions.tf`.
- **Testing**: Store module tests in the `tests/` directory.

---

## Next steps

Once your repository is ready, go to [Register a Module](/docs/infra-as-code-management/registry/module-registry) to add the module to the registry.
