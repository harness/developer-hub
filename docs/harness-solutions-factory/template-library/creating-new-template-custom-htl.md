---
title: How to build your own template in Custom Harness Template Library
sidebar_label: Build Your Own Template
description: Build a new Harness Solutions Factory template from scratch in Custom Harness Template Library, from Terraform scaffold to registered IDP workflow.
keywords:
  - create custom template
  - custom harness template library
  - terraform template scaffold
  - idp catalog workflow
tags:
  - hsf
  - templates
sidebar_position: 30
redirect_from:
    - /docs/harness-solutions-factory/custom-harness-template-library/creating-new-template-custom-htl
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

In this tutorial you will build a new template for the Harness Solutions Factory (HSF) Template Library from scratch. You start from the Terraform scaffold, author the Harness YAML templates, test the module locally, and finish with a registered workflow that any user can run from the Harness Internal Developer Portal (IDP).

---

## What will you learn?

- **Scaffold a template:** Generate the standard Terraform directory structure in your Custom Harness Template Library repo.
- **Write the Terraform module:** Define providers, variables, locals, data sources, resources, and outputs using the HSF conventions.
- **Author Harness YAML templates:** Build the pipeline, stage, step, and step group definitions that Terraform renders.
- **Test locally:** Validate, deploy, and tear down your module before it reaches IDP.
- **Register the workflow:** Publish your `catalog_template.yaml` so users can run it from the IDP catalog.

---

## Before you begin

- **Custom Harness Template Library repo:** When HSF is deployed into your account, it automatically creates a repository called `custom-harness-template-library` in the **Harness Platform Management** organization. Navigate to **Harness Platform Management** > **Repositories**, then clone `custom-harness-template-library` locally. Go to [Using your own SCM for Custom Harness Template Library](/docs/harness-solutions-factory/template-library/setup-custom-htl) to use your own SCM provider instead.
- **Harness account access:** You need access to the Harness account where HSF is deployed. Go to [Getting started with Harness Platform](/docs/platform/get-started/onboarding-guide) to create or access an account.
- **Template permissions:** You need **View**, **Create**, and **Edit** for [Templates](/docs/platform/role-based-access-control/permissions-reference#shared-resources) at the scope where you deploy (account, org, or project).
- **Pipeline permissions:** You need **View** and **Execute** for [Pipelines](/docs/platform/role-based-access-control/permissions-reference#pipelines) on the **Solutions Factory** project, so you can trigger the IACM workspace pipeline.
- **IDP workflow permissions:** You need **View**, **Create / Edit**, and **Execute** for [Workflow](/docs/platform/role-based-access-control/permissions-reference#internal-developer-portal) in IDP. Go to [RBAC in Harness](/docs/platform/role-based-access-control/rbac-in-harness) and [Manage roles](/docs/platform/role-based-access-control/add-manage-roles) to have an administrator assign a role that includes these permissions.
- **Harness API token:** The IDP workflow submits your token when it triggers the provisioning pipeline. Go to [Manage API keys](/docs/platform/automation/api/add-and-manage-api-keys) to create a token with the permissions listed above.
- **Account-level HSF variables:** The last page of your catalog workflow reads these account variables, which HSF creates during deployment. Navigate to **Account Settings** > **Account Resources** > **Variables** and confirm all five exist with non-empty values: `solutions_factory_endpoint`, `solutions_factory_org`, `solutions_factory_project`, `custom_template_library_connector`, and `custom_template_library_repo`.

    :::warning
    If any of these variables are missing or empty, the hidden fields in your workflow pass empty strings, and the provisioning pipeline fails with no clear error. Verify them before you author `catalog_template.yaml` in Step 10.
    :::

- **Local tools:** Terraform or OpenTofu, `git`, and optionally Docker and `mise`. Go to [Developer Environment Setup](/docs/harness-solutions-factory/use-hsf/configurations/developer-env-setup) to install them, or open the repo in the bundled `.devcontainer/` and select **Reopen in Container** to get every tool preinstalled.
- **Optional, `mise`:** `mise` (mise-en-place) is a task runner and tool version manager. It reads `.mise.toml` at the repo root and gives you consistent commands across operating systems. Every step below also gives the `make` equivalent, so `mise` is not required. Go to [Local Development Using mise](/docs/harness-solutions-factory/use-hsf/configurations/using-mise) to set it up, then run `mise tasks` to list the available tasks.

---

### Step 1: Create a branch and scaffold

Always start on a new branch.

```bash
git checkout -b feature/my-new-template
```

Generate the template scaffold, replacing `my-new-template` with your chosen name.

<Tabs>
<TabItem value="make" label="Make" default>

```bash
make generate type=terraform name=my-new-template
```

</TabItem>
<TabItem value="mise" label="mise">

```bash
mise run template my-new-template
```

</TabItem>
</Tabs>

:::tip Naming rules
Use lowercase letters and hyphens only, for example `maven-cicd-k8s` or `delegate-fleet-management`. Be descriptive and concise. Go to [Naming Convention Standards](/docs/harness-solutions-factory/best-practices/naming-convention-standards) to review the full conventions.
:::

The scaffold creates the following structure:

```text
my-new-template/
├── .harness/
│   ├── catalog_template.yaml    # The IDP form users see
│   ├── pipe_hsf_hub.yaml
│   ├── rb_hsf_hub.yaml
│   └── rg_hsf_hub.yaml
├── templates/
│   ├── pipelines/
│   ├── stages/
│   │   └── snippets/
│   ├── steps/
│   └── step_groups/
├── main.tf
├── locals.tf
├── variables.tf
├── outputs.tf
├── providers.tf
├── terraform.tf
├── terraform.tfvars.example
├── Makefile
└── README.md
```

:::note
The `snippets/` subdirectory is not always created by the scaffold. If your stage templates need it, create it manually:

```bash
mkdir -p my-new-template/templates/stages/snippets
```
:::

### Step 2: Set provider versions

Open `terraform.tf`. This file declares which providers your template needs. Copy the standard configuration into it:

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

:::info Why the time provider?
The Harness API is eventually consistent, so it sometimes needs a brief pause between resource creates. The `time_sleep` resource used in Step 7 handles this. Include the provider by default even if you are not sure you need it yet.
:::

### Step 3: Define your variables

Open `variables.tf`. Every input to your template goes here. The library uses three standard groups. Copy them in order.

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

**Group 2: Build infrastructure (include if your template creates CI or STO pipelines)**

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

:::info The "skipped" convention
HSF uses the string `"skipped"` as a "not provided" signal throughout the library. When `kubernetes_connector = "skipped"`, the template automatically switches to Harness Cloud infrastructure. The same pattern appears in the YAML conditionals in Step 6.
:::

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

### Step 4: Add computed values in `locals.tf`

`locals.tf` holds the logic that turns raw variables into values ready for use in resources. Copy the standard block into the file, then add any custom locals below it.

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
    KUBERNETES_NODESELECTORS   = length(var.kubernetes_node_selectors) > 0 ? yamlencode(var.kubernetes_node_selectors) : "skipped"
    KUBERNETES_IMAGE_CONNECTOR = var.kubernetes_override_image_connector
  }
}
```

:::tip
Use `length(var.kubernetes_node_selectors) > 0` rather than comparing the map to `{}`. Direct map comparison is unreliable for `map(any)` types and can silently evaluate the wrong branch.
:::

### Step 5: Add data sources

Create a `data.tf` file if your template targets an existing organization or project. These lookups confirm that the organization and project actually exist before Terraform tries to create anything inside them, which turns a confusing `apply` failure into a clear `plan` failure with a helpful error message.

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

:::warning
If you provide a `project_id`, you must also provide an `organization_id`. The project data source uses the org to locate the project, so a `project_id` without an `organization_id` causes a Terraform index error at plan time.
:::

### Step 6: Author the Harness YAML template files

The files inside `templates/` define the actual Harness resources: pipelines, stages, steps, and step groups. Terraform renders them through the [`templatefile()`](https://developer.hashicorp.com/terraform/language/functions/templatefile) function, so they use interpolation placeholders rather than plain YAML.

Go to [Configuring Stage Infrastructure](/docs/harness-solutions-factory/use-hsf/configurations/configuring-stage-infra) to review examples of inputs and templates with stage infrastructure details blended in.

:::note
To reduce the potential for errors, copy these files from a template that Harness Template Library already provides, then adapt them.
:::

#### Naming convention

Prefix every file based on its type, with an underscore separating the prefix from the name.

| Prefix | Type | Example filename |
|--------|------|-----------------|
| `pipe_` | Pipeline | `pipe_my_pipeline.yaml` |
| `sta_` | Stage | `sta_my_stage.yaml` |
| `stp_` | Step | `stp_my_step.yaml` |
| `stg_` | Step Group | `stg_my_step_group.yaml` |

Always use the `.yaml` extension, not `.yml`. Go to [Naming Convention Standards](/docs/harness-solutions-factory/best-practices/naming-convention-standards) to review the full prefix list and the directory layout used across the factory.

### Step 7: Create Terraform resources in `main.tf`

Connect the YAML templates to Terraform resources using `harness_platform_template`.

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

# A brief pause lets the step fully register before the stage references it,
# because the Harness API returns immediately and is eventually consistent.
# 5 seconds matches the value used across the library and is sufficient for
# Harness SaaS. On self-hosted or slower environments, increase it to 10 or 15 seconds.
resource "time_sleep" "wait_for_step" {
  create_duration  = "5s"
  destroy_duration = "5s"
  depends_on       = [harness_platform_template.stp_my_step]
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
      STAGE_INFRASTRUCTURE = templatefile(
        "${path.module}/templates/stages/snippets/infrastructure.yaml",
        local.infrastructure_config
      )
    })
  )

  tags       = local.common_tags_tuple
  depends_on = [time_sleep.wait_for_step]
}
```

:::info Scope and tier_handler
All templates in a single module must live at the same scope: account, org, or project. You cannot mix scopes, for example a step at account level referenced by a stage at project level. `local.tier_handler` injects the correct scope prefix automatically based on the `organization_id` and `project_id` variables you provide.
:::

### Step 8: Define outputs

Open `outputs.tf`. Always expose the IDs and versions of every template you create. These values are returned to the IDP workflow and shown to the user after deployment.

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

**How outputs surface in IDP**

The IDP workflow reads Terraform outputs through this path pattern:

```text
pipeline.stages.Provision.spec.execution.steps.Provision.steps.apply.output.outputVariables.<output_name>
```

Each top-level key in your `outputs.tf` becomes the `<output_name>` at the end of the path. In the example above, `step_template` and `stage_template` are the output names. If you add more outputs, for example `pipeline_template`, reference them in `catalog_template.yaml` using the same path with your new output name substituted at the end. Step 10 shows where these paths are consumed in the workflow `output` block.

### Step 9: Complete `terraform.tfvars.example`

Users copy this file when they configure the template themselves, so every variable must appear here with its description as a comment.

```hcl
# Harness Platform URL
harness_platform_url = "https://app.harness.io/gateway"

# Harness Platform Account ID (Required)
harness_platform_account = # Required

# Organization ID. Leave null for account-level deployment.
organization_id = null

# Project ID. Leave null for org or account-level deployment.
# Note: if you set project_id, you must also set organization_id.
project_id = null

# Tags
tags = {}

# Kubernetes connector. Set to "skipped" to use Harness Cloud.
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

### Step 10: Create the IDP catalog workflow

This is the most important file, because it defines the form users see in IDP. Open `.harness/catalog_template.yaml` and apply these rules before you write anything.

**Rule 1: `token` must be on the first page.**
The `ui:field: HarnessAuthToken` field type is a built-in plugin that ships with HSF and auto-populates the user's token. If it renders as a plain text box, confirm the Harness IDP backend plugin is enabled in your account.

**Rule 2: `Solutions Factory Connection` must be the last page, with all fields hidden.**
Users never see this page. Every field is populated from the account-level variables you verified in [Before you begin](#before-you-begin). If those variables are missing, the fields silently pass empty strings and the pipeline fails.

**Rule 3: Set `template_library_directory` and `workspace_type` to your directory name.**
These two fields tell HSF which folder in your repo to run Terraform from. They must match the directory name you chose in Step 1.

**About `infra_defaults`:** The hidden default `account.buildfarm_infrastructure` is a Kubernetes connector created by the Central Build Farm Setup factory. If you have not run that factory, the **Central Build Farm** option in the form does not work, but **Harness Cloud** and **Self-Hosted Kubernetes** still function correctly. Go to [Central Build Farm Workflow](/docs/harness-solutions-factory/use-hsf/workflows/central-build-farm-workflow) to deploy it.

**About `RESOURCE_NAME`:** This is the unique identifier for the IACM workspace that runs your Terraform. Two deployments with the same `RESOURCE_NAME` share, and potentially overwrite, the same workspace state. Use a descriptive constant that is unique to this template. If your template needs to be deployed multiple times independently, make this a user-provided input.

**About `RESOURCE_OWNER`:** `HSF_Admins` is a user group created automatically during HSF deployment, so you do not need to create it manually. Reference it consistently as `group:account/HSF_Admins`.

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
    # All fields are hidden and populated from account-level variables set during HSF deployment
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
              default: my-new-template    # Your directory name from Step 1
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
              default: my-new-template    # Your directory name from Step 1
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
      name: Configure Harness workspace
      action: trigger:harness-custom-pipeline
      input:
        url: ${{ parameters.solutions_factory_details.harness_account_url }}/ng/account/${{ parameters.solutions_factory_details.harness_account_id }}/all/orgs/${{ parameters.solutions_factory_details.harness_org_id }}/projects/${{ parameters.solutions_factory_details.harness_project_id }}/pipelines/Create_and_Manage_IACM_Workspaces/pipeline-studio?storeType=INLINE
        inputset:
          GIT_REPOSITORY_CONNECTOR: ${{ parameters.solutions_factory_details.template_library_connector }}
          GIT_REPOSITORY_NAME: ${{ parameters.solutions_factory_details.template_library_repo }}
          GIT_REPOSITORY_BRANCH: ${{ parameters.solutions_factory_details.template_library_branch }}
          GIT_REPOSITORY_PATH: ${{ parameters.solutions_factory_details.template_library_directory }}
          RESOURCE_NAME: MY_CUSTOM_TEMPLATE
          RESOURCE_OWNER: group:account/HSF_Admins
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

### Step 11: Test locally

Test your Terraform module directly before you touch IDP. This confirms the Terraform code is correct without merging or registering anything.

:::warning
`make apply` and `mise run deploy` create real resources in the Harness account named in your `terraform.tfvars`. Run the plan first, and use a non-production account if one is available.
:::

Create your local configuration file:

```bash
cd my-new-template
cp terraform.tfvars.example terraform.tfvars
```

Edit `terraform.tfvars` with real values from your account, then run the following sequence.

<Tabs>
<TabItem value="make" label="Make" default>

1. Run a plan to confirm no resources are created yet:

    ```bash
    make plan
    ```

2. Apply, then confirm your templates appear under **Account Settings** > **Templates**:

    ```bash
    make apply
    ```

3. Check idempotency. The `cycle` target runs `init`, `destroy`, `apply`, and `plan`, and the final plan must propose no changes:

    ```bash
    make cycle
    ```

4. Tear down when you are finished. The `teardown` target runs `destroy` and `testing_cleanup`:

    ```bash
    make teardown
    ```

Go to [Local Testing Using Make](/docs/harness-solutions-factory/use-hsf/configurations/local-testing-using-make) to review every available target.

</TabItem>
<TabItem value="mise" label="mise">

1. Run a dry run to confirm no resources are created yet:

    ```bash
    mise run deploy:dryrun
    ```

2. Deploy, then confirm your templates appear under **Account Settings** > **Templates**:

    ```bash
    mise run deploy
    ```

3. Check idempotency. Run the cycle task and confirm the final plan proposes no changes:

    ```bash
    mise run cycle
    ```

4. Tear down when you are finished:

    ```bash
    mise run teardown
    ```

Run `mise tasks` to confirm these task names exist in your copy of the repo.

</TabItem>
</Tabs>

### Step 12: Generate the README and commit

Generate the resources, inputs, and outputs tables for your README.

<Tabs>
<TabItem value="terraform-docs" label="terraform-docs" default>

Install [terraform-docs](https://terraform-docs.io/user-guide/installation/), then run the following from your template directory:

```bash
terraform-docs markdown table --anchor=false .
```

To bootstrap `terraform.tfvars.example` from your variables, run:

```bash
terraform-docs tfvars hcl .
```

</TabItem>
<TabItem value="mise" label="mise">

```bash
mise run docs
```

</TabItem>
</Tabs>

Commit everything and push:

```bash
git add my-new-template/
git commit -m "feat: add my-new-template"
git push origin feature/my-new-template
```

Open a pull request against `main`. Once it is merged, continue to Step 13.

### Step 13: Register the IDP workflow

After your changes are merged to `main`, register the workflow by running the **Register Custom IDP Templates** pipeline in the **Solutions Factory** project.

1. In Harness, navigate to **Harness Platform Management** > **Solutions Factory** > **Pipelines**.
2. Find **Register Custom IDP Templates**, then click **Run**.
3. When the pipeline succeeds, navigate to **Internal Developer Portal** > **Workflows** and confirm your workflow appears with the `name` you set in `catalog_template.yaml`.
4. Run your workflow. A successful execution creates an IACM workspace named after your `RESOURCE_NAME`, applies your Terraform, and returns the output values in the **Deployment Summary** block. Confirm your new templates are listed under **Account Settings** > **Templates**.

:::tip Re-registering after changes
Any time you update `catalog_template.yaml` and merge to `main`, run the **Register Custom IDP Templates** pipeline again. It handles re-registration automatically.
:::

---

## Next steps

You have built, tested, and registered a custom template that any user in your account can deploy from the IDP catalog. Extend it by adding stage infrastructure options, or use the same pattern to build additional templates in your library.

- [Configuring Stage Infrastructure](/docs/harness-solutions-factory/use-hsf/configurations/configuring-stage-infra): Blend build infrastructure details into your stage templates.
- [How to customize an existing template using Custom Harness Template Library](/docs/harness-solutions-factory/template-library/customizing-using-custom-htl): Modify a template Harness already ships instead of starting from scratch.
- [Create new Terraform templates](/docs/harness-solutions-factory/template-library/new-terraform-templates): Review the scaffold file reference in more detail.
- [Execute a workflow](/docs/harness-solutions-factory/use-hsf/workflows/execute-a-workflow): Run your registered workflow and interpret its output.
