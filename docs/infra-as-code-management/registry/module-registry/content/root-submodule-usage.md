This section covers the requirements and best practices for using root modules and nested submodules in your infrastructure-as-code setup. It explains the structure and configuration needed for single-module repositories and how to properly reference submodules within your code.

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
