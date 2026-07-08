OpenTofu or Terraform modules are reusable units of infrastructure configuration that help standardize deployment patterns and improve maintainability. A well-structured module simplifies usage and promotes best practices. This guide covers module structure requirements, root and submodule conventions, authentication for local CLI usage, and configuration options for non-standard repository layouts.

## Requirements

**Root module:** If you organize your OpenTofu or Terraform code **as a module** (for reuse, versioning, or registration in the Module Registry), that layout has a **root module**, the top-level configuration OpenTofu or Terraform uses as the execution entry point. The root module is **the only required element** in that structure; reusable child modules are optional. The most common entry-point file is `main.tf`, which anchors the configurations that provision your infrastructure. Not every team packages work as a reusable module; this guide assumes you are structuring a repository that way.

:::important
To register a module version, **your Git repository must have a release or tag associated with the desired module version**. Ensure you have created a tag in your Git repository before attempting to register the module in the Module Registry.

Go to [Tags](/docs/code-repository/work-in-repos/tag/) to learn about tagging with Harness Code Repository.
:::

## Module Layout

A typical OpenTofu or Terraform module consists of a set of configuration files that define resources, variables, outputs, and dependencies. Below is a recommended directory structure:

```
module-name/
├── main.tf      # Primary resource configurations
├── variables.tf # Input variable definitions
├── outputs.tf   # Output values
├── README.md    # Documentation for the module
├── modules/     # Nested submodules (if applicable)
```

## Key components

**`variables.tf` (Input Variables):** Declares configurable inputs for the module. Variables should include descriptions and, when applicable, default values.

Example:

```hcl
variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t2.micro"
}
```

Go to [variable usage](/docs/infra-as-code-management/configuration/connectors-and-variables/connectors-variables) to learn about using variables in workspaces.

**`outputs.tf` (Output Values):** Defines values that the module will return upon execution. Helps users access relevant module data.

Example:

```hcl
output "instance_id" {
  description = "ID of the created EC2 instance"
  value       = aws_instance.example.id
}
```

**`README.md` (Module Documentation):** Provides an overview of the module's purpose and usage. Include example configurations and descriptions of variables and outputs.

**`provider.tf` (Provider Configuration):** If a module requires provider settings, define them here. Avoid hardcoding provider settings within a module to allow flexibility.

Example:

```hcl
tofu {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }
}
```

**`versions.tf` (Version Constraints):** Specifies compatible OpenTofu or Terraform and provider versions. Ensures module stability by preventing incompatible updates.

Example:

```hcl
tofu {
  required_version = ">= 1.0.0"
}
```

**`modules/` (Nested Modules / Submodules):** If a module is composed of multiple submodules, organize them within this directory to improve modularity and reusability. Submodules are only recognized if they are placed within the `modules` folder at the root directory.

:::info
While there is no set limit on nested submodule paths, metadata collection is only carried out one level deep.
:::

Example repository tree with submodules:

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
│   │   ├── README.md
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   ├── outputs.tf
```

Reference submodules in your root module `main.tf` using the `//` syntax for the path to the submodule:

```hcl
module "native-submodule" {
  source  = "app.harness.io/<account-id>/native-module//modules/native-submodule"
}
```

:::info submodule versions
**Submodules cannot have a version included**, as Git tags do not apply to anything beyond the root level. If you add a `version` argument to a submodule `source` that uses the `//` path syntax, OpenTofu and Terraform commands fail with an error stating that the module source format is invalid. Submodules inherit the version from the root module's Git tag.
:::

**`examples/` (Usage Examples):** Provide working examples demonstrating how to use the module in different scenarios.

**`tests/` ([Automated Testing](/docs/infra-as-code-management/registry/module-registry/module-registry-testing)):** Testing ensures the module functions as expected. Use tools like `tofu test` or external frameworks such as `Terratest`.

Example test using `tofu test`:

```hcl
tofu {
  test {
    assert {
      condition     = resource.aws_instance.example.instance_type == "t2.micro"
      error_message = "Unexpected instance type"
    }
  }
}
```

---

## Authentication for local usage

When you run OpenTofu or Terraform commands locally, such as `init`, `validate`, or `plan`, against a configuration that sources modules from the Harness registry, the CLI must authenticate with `app.harness.io`. Without this, `init` fails with a 401 error.

OpenTofu and Terraform read authentication tokens from environment variables named `TF_TOKEN_<hostname>`, where any dots in the hostname are replaced with underscores. For the standard Harness SaaS endpoint (`app.harness.io`), the variable name is `TF_TOKEN_app_harness_io`.

Set the variable to a [Harness personal access token (PAT)](/docs/platform/automation/api/add-and-manage-api-keys) before running any local commands:

```bash
export TF_TOKEN_app_harness_io=<your_harness_pat>
tofu init
# or: terraform init
```

:::note Self-Managed Platform
If your organization runs Harness on a custom domain (for example `registry.example.com`), replace dots with underscores in that hostname:

```bash
export TF_TOKEN_registry_example_com=<your_harness_pat>
tofu init   # or: terraform init
```
:::

Once the variable is set, subsequent `tofu validate`, `tofu plan`, and equivalent Terraform commands work without further configuration for the duration of your shell session. To persist the token across sessions, add the `export` line to your shell profile (for example `~/.zshrc` or `~/.bashrc`). Alternatively, store credentials in the OpenTofu or Terraform credentials file (`~/.tofurc` or `~/.terraform.d/credentials.tfrc.json`) to avoid environment variable management.

---

## Non-standard folder structures

By default, the Module Registry expects the root module (`main.tf`) at the repository root and submodules inside a `modules` folder. If your repository uses a different layout, use the **Folder Path** property to tell Harness where the root module lives. The **Folder Path** field in the UI maps to the `repository_path` argument on the `harness_platform_infra_module` Terraform resource.

### Root module in a subdirectory

When `main.tf` is not at the repository root, for example in a monorepo that holds several modules, set **Folder Path** to the directory that contains the root module. Harness then treats that directory as the module root.

Example repository where the root module lives in `terraform/infrastructure`:

```
.
├── README.md
├── terraform/
│   ├── infrastructure/
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   ├── outputs.tf
│   │   ├── modules/
│   │   │   ├── submoduleA/
│   │   │   │   ├── main.tf
```

Set the **Folder Path** when you register the module:

1. In the **New Module** wizard, configure the module name, provider, connector, and repository.
2. In the **Folder Path** field, enter the path from the repository root to the directory that contains the root module, for example `terraform/infrastructure`.
3. Complete the remaining fields and save.

Set the equivalent `repository_path` argument when you register the module with the Harness OpenTofu or Terraform provider:

```hcl
resource "harness_platform_infra_module" "example" {
  name                 = "my-module"
  system               = "provider"
  repository           = "tf-aws-vpc"
  repository_branch    = "main"
  repository_path      = "terraform/infrastructure"
  repository_connector = "account.mygithub"
}
```

### Submodules outside the root modules folder

After you set **Folder Path**, the `modules` folder is resolved relative to the configured root module, not the repository root. In the example above, Harness collects submodule metadata from `terraform/infrastructure/modules`. Submodule metadata is still only collected from a folder named `modules` at the configured root, so keep submodules whose metadata you want surfaced in the registry inside that folder.

Referencing a submodule in your code is independent of metadata collection. Use the `//` subpath syntax in the `source` argument to point at a submodule at any path within the module:

```hcl
module "native-submodule" {
  source = "app.harness.io/<account-id>/native-module//modules/native-submodule"
}
```

:::tip
If submodules do not appear on the registered module, confirm that **Folder Path** points at the directory that contains `main.tf` and that the submodules sit in a `modules` folder directly under that path. Metadata collection is one level deep, so deeply nested submodules are not surfaced even though they remain usable through the `//` subpath syntax.
:::

---

## Best practices

- **Root module:** Always include a `main.tf` file at the root level of your repository. This file serves as the entry point for [OpenTofu](https://opentofu.org/docs/language/modules/) or Terraform execution.
- **Modules folder:** Place all submodules within a `modules/` folder. Submodules are only recognized if they are placed within this folder.
- **Consistent naming:** Use consistent naming conventions for files and directories to improve readability and maintainability.
- **Documentation:** Provide comprehensive documentation in the README.md file, including an overview, usage instructions, and examples.
- **Version constraints:** Specify compatible OpenTofu or Terraform and provider versions in the `versions.tf` file to ensure module stability.
- **Testing:** Include automated tests in the tests/ directory to verify the functionality of your module.
