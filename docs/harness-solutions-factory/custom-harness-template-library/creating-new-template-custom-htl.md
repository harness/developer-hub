---
title: How to build your own template in Custom Harness Template Library
description: This tutorial will go through how to make changes to a template in Custom Harness Template Library
sidebar_position: 4
---

In this tutorial you will create a new template for the Harness Solutions Factory (HSF) Template Library from scratch.

## Before You Start

### Where does the repo come from?

When HSF is deployed into your account, it automatically creates a repository called `custom-harness-template-library` inside the `Harness Platform Management` organization. This is your personal copy of the template library — it is where all custom templates live.

To find it: navigate to **Harness Platform Management** org → **Repositories** and look for `custom-harness-template-library`. Clone that repo locally before continuing.

:::note
If you want to setup your own Custom Harness Template Library review this [documentation](../custom-harness-template-library/setup-custom-htl.md):::

### What permissions do I need?

Your Harness API token needs the following at minimum:

- **Template: Create/Edit** at the scope where you are deploying (account, org, or project)
- **Pipeline: Execute** on the `Solutions Factory` project (to trigger the IACM workspace)
- **IDP: Register/Unregister** to manage catalog entries

If you are testing as a non-admin, ask your Harness admin to assign you the `Developer` role in the `Harness Platform Management` org.

### What is `mise`?

`mise` (mise-en-place) is a task runner and tool version manager. The HSF repo uses it to standardize commands across machines — it reads `mise.toml` at the repo root and gives you consistent commands like `mise run deploy` regardless of your OS. Using this is **optional**.

Install it from [mise.jdx.dev](https://mise.jdx.dev/getting-started.html), then run `mise help` in any template directory to see available commands.

### Prerequisites

- OpenTofu or Terraform installed 
- OpenTofu or Terraform Images if using Docker 
- `git`
- A cloned copy of your `custom-harness-template-library` repo
- **optional** Docker (or compatible engine)
- **optional** `mise` installed and available on your PATH

> **Fastest setup:** The repo ships with a `.devcontainer/` directory. Open it in VS Code and choose **Reopen in Container** — all tools are pre-installed automatically.

## Creating your own template in Custom Harness Template Library 

### Step 1 — Create a Branch and Scaffold

Always start on a new branch.

```bash
git checkout -b feature/my-new-template
```

Then generate the template scaffold. 

If using mise, replace `my-new-template` with your chosen name.
```bash
mise run template <my-new-template>
```

Otherwise run
```bash
cp scaffolds/terraform <new-template-name>
```

> **Naming rules:** Use lowercase letters and hyphens only — for example `maven-cicd-k8s` or `delegate-fleet-management`. Be descriptive and concise.

This creates the following structure:

```
my-new-template/
├── .harness/
│   └── catalog_template.yaml    ← The IDP form users see
│   └── pipe_hsf_hub.yaml
│   └── rb_hsf_hub.yaml
│   └── rg_hsf_hub.yaml
├── templates/
│   ├── pipelines/
│   ├── stages/
│   │   └── snippets/            ← Create this manually if missing (see note below)
│   ├── steps/
│   └── step_groups/
├── main.tf
├── locals.tf
├── variables.tf
├── outputs.tf
├── terraform.tf
├── terraform.tfvars.example
├── Makefile
└── README.md
```

> **Note:** The `snippets/` subdirectory is not always created by the scaffold. If you need it, create it manually:
> ```bash
> mkdir -p my-new-template/templates/stages/snippets
> ```

### Step 2 — Set Provider Versions

Open `terraform.tf`. This declares which providers your template needs. The standard configuration should be copied into the file:

```hcl
terraform {
  required_providers {
    harness = {
      source  = "harness/harness"
      version = ">= 0.31"
    }
    time = {
      source  = "hashicorp/time"
      version = "~> 0.9.1"
    }
  }
}
```

> **Why `time`?** The Harness API sometimes needs a brief pause between resource creates. The `time_sleep` resource (used in Step 7) handles this — include the provider by default even if you are not sure you need it yet.

### Step 3 — Define Your Variables

Open `variables.tf`. Every input to your template goes here. The library uses three standard groups — copy these in order.

**Group 1: Platform configuration (always required)**

```hcl
variable "harness_platform_url" {
  type        = string
  description = "Harness Platform URL. Defaults to Harness SaaS."
  default     = "https://app.harness.io/gateway"
}

variable "harness_platform_account" {
  type        = string
  description = "Harness Platform Account ID (Required)."
}

variable "organization_id" {
  type        = string
  description = "Optional: Existing Organization ID. Must exist before execution."
  default     = null
}

variable "project_id" {
  type        = string
  description = "Optional: Existing Project ID. Must exist before execution."
  default     = null
}

variable "tags" {
  type        = map(any)
  description = "Optional: Tags to associate with Harness resources."
  default     = {}
}
```

**Group 2: Build infrastructure (include if your template creates CI/STO pipelines)**

```hcl
variable "kubernetes_connector" {
  type        = string
  description = "Kubernetes connector. Set to 'skipped' for Harness Cloud."
  default     = "skipped"
}

variable "kubernetes_namespace" {
  type        = string
  description = "Optional: Kubernetes namespace for pipeline execution."
  default     = "default"
}

variable "kubernetes_node_selectors" {
  type        = map(any)
  description = "Optional: Kubernetes node selectors."
  default     = {}
}

variable "kubernetes_override_image_connector" {
  type        = string
  description = "Optional: Container registry connector override."
  default     = "skipped"
}
```

> **The `"skipped"` convention:** HSF uses the string `"skipped"` as a "not provided" signal throughout the library. When `kubernetes_connector = "skipped"`, the template automatically switches to Harness Cloud infrastructure. You will see this pattern in YAML conditionals in Step 6.

**Group 3: Your custom variables**

Add any inputs specific to your template below the standard groups:

```hcl
variable "my_connector_ref" {
  type        = string
  description = "Required: Connector reference. Must exist before execution."
}

variable "my_feature_enabled" {
  type        = bool
  description = "Optional: Enable my custom feature."
  default     = true
}
```

### Step 4 — Add Computed Values in `locals.tf`

`locals.tf` handles the logic that turns raw variables into values ready for use in resources. A standard block will be copied into the file. Add any custom locals below it.

Example file:
```hcl
locals {
  required_tags = {
    created_by              = "Terraform"
    harnessSolutionsFactory = "true"
    managedResource         = "true"
  }

  common_tags       = merge(var.tags, local.required_tags)
  common_tags_tuple = [for k, v in local.common_tags : "${k}:${v}"]

  # Determines the scope prefix used when one template references another.
  # Account-level templates are referenced as "account.<id>"
  # Org-level templates are referenced as "org.<id>"
  # Project-level templates are referenced with no prefix
  tier_handler = (
    var.project_id != null ? "" :
    var.organization_id != null ? "org." : "account."
  )

  common_template_vars = {
    ORGANIZATION_ID = var.organization_id != null ? data.harness_platform_organization.this[0].id : null
    PROJECT_ID      = var.project_id != null ? data.harness_platform_project.this[0].id : null
  }

  infrastructure_config = {
    KUBERNETES_CONNECTOR       = var.kubernetes_connector
    KUBERNETES_NAMESPACE       = var.kubernetes_namespace
    KUBERNETES_NODESELECTORS   = var.kubernetes_node_selectors != {} ? yamlencode(var.kubernetes_node_selectors) : "skipped"
    KUBERNETES_IMAGE_CONNECTOR = var.kubernetes_override_image_connector
  }
}
```

### Step 5 — Add Data Sources

Create a `data.tf` file if necessary. These lookups validate that the organization and project you are targeting actually exist before Terraform tries to create anything inside them — turning a confusing `apply` failure into a clear `plan` failure with a helpful error message.

```hcl
data "harness_platform_organization" "this" {
  count      = var.organization_id == null ? 0 : 1
  identifier = var.organization_id
}

data "harness_platform_project" "this" {
  count      = var.project_id == null ? 0 : 1
  identifier = var.project_id
  org_id     = data.harness_platform_organization.this[0].id

  lifecycle {
    precondition {
      condition     = var.project_id == null || var.organization_id != null
      error_message = "organization_id must be set when project_id is provided."
    }
  }
}
```

> **Important:** If you provide a `project_id`, you must also provide an `organization_id`. The project data source uses the org to locate the project. Providing a `project_id` without an `organization_id` will cause a Terraform index error at plan time.

### Step 6 — Author the Harness YAML Template Files

The files inside `templates/` define the actual Harness resources — pipelines, stages, steps, and step groups. These are rendered by Terraform's `templatefile()` function, so they use a special interpolation syntax rather than plain YAML.

Examples for how to setup inputs and templates with stage infrastructure details blended in can be found [here](../configurations/configuring-stage-infra.md). 

:::note
To reduce the potential for errors we recommend to copy these files from a different template that has been provided by Harness Template Library to start. 
:::

### Naming convention

Every file must be prefixed based on its type, with an underscore separating the prefix from the name:

| Prefix | Type | Example filename |
|--------|------|-----------------|
| `pipe_` | Pipeline | `pipe_my_pipeline.yaml` |
| `sta_` | Stage | `sta_my_stage.yaml` |
| `stp_` | Step | `stp_my_step.yaml` |
| `stg_` | Step Group | `stg_my_step_group.yaml` |

Always use the `.yaml` extension (not `.yml`).

### Step 7 — Create Terraform Resources in `main.tf`

Now connect the YAML templates to Terraform resources using `harness_platform_template`.

```hcl
# Create a Step template
resource "harness_platform_template" "stp_my_step" {
  lifecycle {
    create_before_destroy = true
  }

  identifier = "my_step_template"
  name       = "My Custom Step"
  org_id     = local.common_template_vars["ORGANIZATION_ID"]
  project_id = local.common_template_vars["PROJECT_ID"]
  version    = "v1"
  is_stable  = true

  template_yaml = templatefile(
    "${path.module}/templates/steps/stp_my_step.yaml",
    merge(local.common_template_vars, {
      TEMPLATE_IDENTIFIER = "my_step_template"
      TEMPLATE_NAME       = "My Custom Step"
      TEMPLATE_DESC       = "A custom step that does X"
      TEMPLATE_VERSION    = "v1"
      TAGS                = yamlencode(local.common_tags)
      MY_CONNECTOR        = var.my_connector_ref
    })
  )

  tags = local.common_tags_tuple
}

# A brief pause lets the step fully register before the stage references it. The API returns immediately and is eventually consistent.
# 5 seconds matches the value used across the library and is sufficient for
# Harness SaaS. On self-hosted or slower environments, increase to 10–15s.
resource "time_sleep" "wait_for_step" {
  create_duration = "5s"
  destroy_duration = "5s"
  depends_on      = [harness_platform_template.stp_my_step]
}

# Create a Stage template that uses the step above
resource "harness_platform_template" "sta_my_stage" {
  lifecycle {
    create_before_destroy = true
  }

  identifier = "my_stage_template"
  name       = "My Custom Stage"
  org_id     = local.common_template_vars["ORGANIZATION_ID"]
  project_id = local.common_template_vars["PROJECT_ID"]
  version    = "v1"
  is_stable  = true

  template_yaml = templatefile(
    "${path.module}/templates/stages/sta_my_stage.yaml",
    merge(local.common_template_vars, {
      TEMPLATE_IDENTIFIER   = "my_stage_template"
      TEMPLATE_NAME         = "My Custom Stage"
      TEMPLATE_DESC         = "A stage that runs my custom step"
      TEMPLATE_VERSION      = "v1"
      TAGS                  = yamlencode(local.common_tags)
      STEP_TEMPLATE_REF     = "${local.tier_handler}${harness_platform_template.stp_my_step.identifier}"
      STEP_TEMPLATE_VERSION = harness_platform_template.stp_my_step.version
      STAGE_INFRASTRUCTURE  = templatefile(
        "${path.module}/templates/stages/snippets/infrastructure.yaml",
        local.infrastructure_config
      )
    })
  )

  tags       = local.common_tags_tuple
  depends_on = [time_sleep.wait_for_step]
}
```

> **On scope and `tier_handler`:** All templates in a single module must live at the same scope — account, org, or project. You cannot mix scopes (for example, a step at account level referenced by a stage at project level). If you use the `local.tier_handler` then it will automatically inject the scope based on the provided variables.

### Step 8 — Define Outputs

Open `outputs.tf`. Always expose the IDs and versions of every template you create — these are returned to the IDP workflow and shown to the user after deployment.

```hcl
output "step_template" {
  description = "The created step template"
  value = {
    id      = harness_platform_template.stp_my_step.id
    version = harness_platform_template.stp_my_step.version
  }
}

output "stage_template" {
  description = "The created stage template"
  value = {
    id      = harness_platform_template.sta_my_stage.id
    version = harness_platform_template.sta_my_stage.version
  }
}

output "template_organization_info" {
  description = "Organization information (if provided)"
  value       = var.organization_id != null ? { id = data.harness_platform_organization.this[0].id } : null
}
```

**How outputs surface in IDP:**

The IDP workflow reads Terraform outputs via this path pattern:
```
pipeline.stages.Provision.spec.execution.steps.Provision.steps.apply.output.outputVariables.<output_name>
```

Each top-level key in your `outputs.tf` becomes the `<output_name>` at the end of the path. In the example above, `step_template` and `stage_template` are the output names. If you add more outputs (e.g. `pipeline_template`), reference them in `catalog_template.yaml` using the same path with your new output name substituted at the end.


### Step 9 — Complete `terraform.tfvars.example`

This file is what users copy when configuring the template themselves. Every variable should appear here with its description as a comment.

```hcl
# Harness Platform URL
harness_platform_url = "https://app.harness.io/gateway"

# Harness Platform Account ID (Required)
harness_platform_account = # Required

# Organization ID — leave null for account-level deployment
organization_id = null

# Project ID — leave null for org or account-level deployment
# Note: if you set project_id, you must also set organization_id
project_id = null

# Tags
tags = {}

# Kubernetes connector — set to "skipped" to use Harness Cloud
kubernetes_connector = "skipped"

# Kubernetes namespace
kubernetes_namespace = "default"

# Node selectors
kubernetes_node_selectors = {}

# Image connector override
kubernetes_override_image_connector = "skipped"

# Connector reference for my integration (Required)
my_connector_ref = # Required

# Enable my custom feature
my_feature_enabled = true
```

### Step 10 — Create the IDP Catalog Workflow

This is the most important file. It defines the form users see in the Harness Internal Developer Portal.

Open `.harness/catalog_template.yaml`. Before writing anything, note these rules:

**Rule 1 — `token` must be on the first page.**
The `ui:field: HarnessAuthToken` field type is a built-in plugin that ships with HSF and auto-populates the user's token. If it renders as a plain text box, confirm the Harness IDP backend plugin is enabled in your account.

**Rule 2 — `Solutions Factory Connection` must be the last page, all fields hidden.**
Users never see this page. Every field is populated automatically from the account-level variables set during HSF deployment (the ones you verified in "Before You Start"). If those variables are missing, the fields will silently pass empty strings and the pipeline will fail.

**Rule 3 — Set `template_library_directory` and `workspace_type` to your directory name.**
These two fields tell HSF which folder in your repo to run Terraform from. They must match the directory name you chose in Step 1.

**About `infra_defaults`:** The hidden default `account.buildfarm_infrastructure` is a Kubernetes connector created by the Central Build Farm Setup factory. If you have not run that factory, the `Central Build Farm` option in the form will not work — but `Harness Cloud` and `Self-Hosted Kubernetes` will still function correctly.

**About `RESOURCE_NAME`:** This is the unique identifier for the IACM workspace that runs your Terraform. Two deployments with the same `RESOURCE_NAME` will share (and potentially overwrite) the same workspace state. Use a descriptive constant that is unique to this template. If your template needs to be deployed multiple times independently, make this a user-provided input.

**About `RESOURCE_OWNER`:** `HSF_Admins` is a user group created automatically during HSF deployment. You do not need to create it manually.

```yaml
apiVersion: harness.io/v1
kind: Workflow
name: Deploy My Custom Template
identifier: mycustomtemplate
type: harness_factory
owner: group:account/HSF_Admins
metadata:
  description: Deploys my custom Harness templates for X use case
  tags:
    - solutions-factory
    - harness

spec:
  parameters:

    # Page 1: Your template's configuration
    # The token field MUST be on this first page
    - title: Configure My Template
      properties:
        token:
          title: Harness Token
          type: string
          ui:widget: password
          ui:field: HarnessAuthToken

        build_infrastructure_type:
          title: Choose your build infrastructure
          type: string
          default: build_farm
          enum: [build_farm, cloud, custom]
          enumNames:
            - Central Build Farm
            - Harness Cloud
            - Self-Hosted Kubernetes

        infra_defaults:
          title: infra_defaults
          type: object
          ui:widget: hidden
          properties:
            kubernetes_connector:
              type: string
              default: account.buildfarm_infrastructure
            kubernetes_namespace:
              type: string
              default: default
            kubernetes_override_image_connector:
              type: string
              default: ""
            kubernetes_node_selectors:
              type: string
              default: ""

      dependencies:
        build_infrastructure_type:
          allOf:
            - if:
                properties:
                  build_infrastructure_type:
                    const: "custom"
              then:
                required: [kubernetes_connector, kubernetes_namespace]
                properties:
                  kubernetes_connector:
                    title: Kubernetes Connector Reference
                    type: string
                    pattern: '^account.*$'
                  kubernetes_namespace:
                    title: Kubernetes Namespace
                    type: string
                  kubernetes_override_image_connector:
                    title: Override Image Connector Reference
                    type: string
                  kubernetes_node_selectors:
                    title: Node Selectors (key:value JSON)
                    type: object
                    additionalProperties:
                      type: string

    # Page 2: Template-specific inputs
    - title: Template Options
      properties:
        my_connector_ref:
          title: Connector Reference
          type: string
          description: Enter your connector reference. Must exist before execution.
        my_feature_enabled:
          title: Enable my custom feature?
          type: boolean
          default: true

    # Last page: Solutions Factory connection
    # All fields are hidden — populated from account-level variables set during HSF deployment
    - title: Solutions Factory Connection
      properties:
        solutions_factory_details:
          title: Solutions Factory Details
          type: object
          required:
            - harness_account_url
            - harness_account_id
            - harness_org_id
            - harness_project_id
            - template_library_connector
            - template_library_repo
            - template_library_branch
            - template_library_directory
          properties:
            harness_account_url:
              type: string
              default: <+variable.account.solutions_factory_endpoint>
              ui:widget: hidden
            harness_account_id:
              type: string
              default: <+account.identifier>
              ui:widget: hidden
            harness_org_id:
              type: string
              default: <+variable.account.solutions_factory_org>
              ui:widget: hidden
            harness_project_id:
              type: string
              default: <+variable.account.solutions_factory_project>
              ui:widget: hidden
            template_library_connector:
              type: string
              default: <+variable.account.custom_template_library_connector>
              ui:widget: hidden
            template_library_repo:
              type: string
              default: <+variable.account.custom_template_library_repo>
              ui:widget: hidden
            template_library_branch:
              type: string
              default: main
              ui:widget: hidden
            template_library_directory:
              type: string
              default: my-new-template    # ← your directory name
              ui:widget: hidden
        solutions_factory_opts:
          type: object
          required: [repo_source, workspace_type]
          properties:
            repo_source:
              type: string
              default: custom
              ui:widget: hidden
            workspace_type:
              type: string
              default: my-new-template    # ← your directory name
              ui:widget: hidden
            is_ephemeral:
              type: string
              default: "false"
              ui:widget: hidden
            requires_approval:
              type: string
              default: "false"
              ui:widget: hidden
            use_mini_factory:
              type: string
              default: "false"
              ui:widget: hidden

  steps:
    - id: configure_workspace
      name: Configuring Harness Workspace
      action: trigger:harness-custom-pipeline
      input:
        url: ${{ parameters.solutions_factory_details.harness_account_url }}/ng/account/${{ parameters.solutions_factory_details.harness_account_id }}/all/orgs/${{ parameters.solutions_factory_details.harness_org_id }}/projects/${{ parameters.solutions_factory_details.harness_project_id }}/pipelines/Create_and_Manage_IACM_Workspaces/pipeline-studio?storeType=INLINE
        inputset:
          GIT_REPOSITORY_CONNECTOR: ${{ parameters.solutions_factory_details.template_library_connector }}
          GIT_REPOSITORY_NAME: ${{ parameters.solutions_factory_details.template_library_repo }}
          GIT_REPOSITORY_BRANCH: ${{ parameters.solutions_factory_details.template_library_branch }}
          GIT_REPOSITORY_PATH: ${{ parameters.solutions_factory_details.template_library_directory }}
          RESOURCE_NAME: MY_CUSTOM_TEMPLATE
          RESOURCE_OWNER: group:default/HSF_Admins
          RESOURCE_VARS:
            kubernetes_connector: ${{ "skipped" if (parameters.build_infrastructure_type == "cloud") else ( parameters.infra_defaults.kubernetes_connector if (parameters.build_infrastructure_type == "build_farm") else parameters.kubernetes_connector ) }}
            kubernetes_namespace: ${{ "default" if (parameters.build_infrastructure_type == "cloud") else ( parameters.infra_defaults.kubernetes_namespace if (parameters.build_infrastructure_type == "build_farm") else parameters.kubernetes_namespace ) }}
            kubernetes_node_selectors: ${{ "{}" if (parameters.build_infrastructure_type == "cloud") else ( parameters.kubernetes_node_selectors if parameters.kubernetes_node_selectors else parameters.infra_defaults.kubernetes_node_selectors ) }}
            kubernetes_override_image_connector: ${{ "skipped" if (parameters.build_infrastructure_type == "cloud") else ( parameters.kubernetes_override_image_connector if parameters.kubernetes_override_image_connector else parameters.infra_defaults.kubernetes_override_image_connector ) }}
            my_connector_ref: ${{ parameters.my_connector_ref }}
            my_feature_enabled: ${{ parameters.my_feature_enabled }}
          RESOURCE_VARS_SECRETS: {}
          RESOURCE_VARS_ENVS: {}
          RESOURCE_VARS_ENVS_SECRET: {}
          INCLUDE_HARNESS_ENVS: "true"
          WORKSPACE_TAGS:
            source: ${{ parameters.solutions_factory_opts.repo_source }}
            type: ${{ parameters.solutions_factory_opts.workspace_type }}
          IS_EPHEMERAL: ${{ parameters.solutions_factory_opts.is_ephemeral }}
          REQUIRES_APPROVAL: ${{ parameters.solutions_factory_opts.requires_approval }}
        apikey: ${{ parameters.token }}
        showOutputVariables: true

  output:
    links:
      - title: View Deployed Templates
        url: ${{ parameters.solutions_factory_details.harness_account_url }}/ng/account/${{ parameters.solutions_factory_details.harness_account_id }}/all/settings/templates?page=0
    text:
      - title: Deployment Summary
        content: |
          Templates deployed successfully.
          step_template: ${{ steps.configure_workspace.output['pipeline.stages.Provision.spec.execution.steps.Provision.steps.apply.output.outputVariables.step_template'] }}
          stage_template: ${{ steps.configure_workspace.output['pipeline.stages.Provision.spec.execution.steps.Provision.steps.apply.output.outputVariables.stage_template'] }}
```

### Step 11 — Test Locally

Test your Terraform module directly before touching IDP. This confirms all the Terraform code is correct without needing to merge or register anything.

**1. Create your local config file:**
```bash
cd my-new-template
cp terraform.tfvars.example terraform.tfvars
# Edit terraform.tfvars with real values from your account
```

**2. Run a dry-run (no resources created):**
```bash
mise run deploy:dryrun
```

**3. Deploy and verify:**
```bash
mise run deploy
# Check that your templates appeared under Account Settings → Templates
```

**4. Check idempotency — run plan again and confirm no changes are proposed:**
```bash
mise run cycle
```

**5. Tear down when done:**
```bash
mise run teardown
```

### Step 12 — Generate the README and Commit

Generate the inputs/outputs tables for your README automatically:

```bash
mise run docs
```

Then commit everything and push:

```bash
git add my-new-template/
git commit -m "feat: add my-new-template"
git push origin feature/my-new-template
```

Open a pull request against `main`. Once it is merged, move on to Step 13.

### Step 13 — Register the IDP Workflow

After your changes are merged to `main`, register the workflow by running the **Register Custom IDP Templates** pipeline in the `Solutions Factory` project.

1. In Harness, navigate to **Harness Platform Management** org → **Solutions Factory** project → **Pipelines**
2. Find and run **Register Custom IDP Templates**
3. Once the pipeline completes, navigate to **Internal Developer Portal** and execute your newly created workflow!

> **Re-registering after changes?** Any time you update your `catalog_template.yaml` and merge to `main`, just run the **Register Custom IDP Templates** pipeline again — it handles re-registration automatically.