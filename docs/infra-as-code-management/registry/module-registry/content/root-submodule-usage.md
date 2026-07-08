This section covers the requirements and best practices for using root modules and nested submodules in your infrastructure-as-code setup. It explains the structure and configuration needed for single-module repositories and how to properly reference submodules within your code.

:::important
To register a module version, **your Git repository must have a release or tag associated with the desired module version**. Ensure you have created a tag in your Git repository before attempting to register the module in the Module Registry.

Go to [Tags](/docs/code-repository/work-in-repos/tag/) for more information on tagging with Harness Code Repository.
:::

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

## Root Level Modules (Single Module)

If you are using only a single module, you must have a `main.tf` file at the root level of your repository. Below is an example of the typical structure for a single-module repository:

```
.
├── README.md
├── main.tf
├── variables.tf
├── outputs.tf
```

Example of defining a single module in `main.tf`:

```hcl
module "native-module" {
  source  = "app.harness.io/<account_id>/native-module/aws"
  version = "1.2.1"  # This matches your repository's Git tags.
}
```

## Submodule Usage

:::info
While there is no set limit on nested submodule paths, metadata collection is only carried out one level deep.
:::

Submodules are only recognized if they are placed within the `modules` folder.

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
**Submodules cannot have a version included**, as Git tags do not apply to anything beyond the root level.
:::

## Non-standard folder structures

By default, the Module Registry expects the root module (`main.tf`) at the repository root and submodules inside a `modules` folder. If your repository uses a different layout, use the **Folder Path** property to tell Harness where the root module lives. The **Folder Path** field in the UI maps to the `repository_path` argument on the `harness_platform_infra_module` Terraform resource, which is defined as the path to the module within the repository.

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
