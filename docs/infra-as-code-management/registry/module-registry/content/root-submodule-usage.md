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
export TF_TOKEN_app_harness_io=<your_harness_pat>
tofu init
# or: terraform init
```

:::note Self-Managed Platform
If your organization runs Harness on a custom domain (for example `registry.example.com`), replace dots with underscores in that hostname:

```bash
export TF_TOKEN_registry_example_com=<your_harness_pat>
tofu init   # or: terraform init
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
