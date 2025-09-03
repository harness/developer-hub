---
title: State Migration
description: Learn how to migrate and import infrastructure state in Harness IaCM workspaces.
sidebar_position: 20
---

Learn how to migrate your infrastructure state into Harness workspaces using the IaCM migration tool.

:::tip Prerequisites
- Harness project with [configured connectors](/docs/infra-as-code-management/get-started/#add-connectors)
- [OpenTofu backend configuration](https://opentofu.org/docs/language/settings/backends/configuration/)
:::

## Process Overview
- **Local Setup** - Configure workspace settings
- **Workspace Creation** - Create Harness workspaces
- **State Import** - Import infrastructure state

## Phase 1: Local Setup

### Get the Migration Tool
Clone the IaCM migration repository:
```bash
git clone git@github.com:harness/iacm-migration.git
```
Alternatively, you can [fork the repository](https://github.com/harness/iacm-migration/fork) if you prefer.

### Configure Your Variables
Create a new `<filename>.tfvars` file in your local repository. This file will define:
- Your Harness account details
- Workspace configurations
- Provider settings

:::info tfvar jexl support
[JEXL expressions](https://developer.harness.io/docs/platform/variables-and-expressions/harness-variables/) cannot be used to reference `tfvar` files.
:::

See the example below for reference:

<details>
<summary>Sample tfvars file</summary>

```hcl
account_id = "<harness-account-id>"
org = "<harness-org>"
project = "<harness-project>"
default_provisioner_type = "terraform"
default_provisioner_version = "1.5.7"
default_cost_estimation_enabled = true
default_provider_connector = "<cloud-provider-connector-name>"
default_repository_connector = "<git-repo-connector-name>"
workspaces = [
    {
        identifier = "workspace_demo_1"
        repository = "<repo-directory>"
        repository_path = "migration-demo-1"
        repository_branch = "<repo-branch>"
        terraform_variables = [
            {
                key = "instance_type"
                value = "t2.micro"
                value_type = "string"
            }
        ],
    },
    {
        identifier = "workspace_demo_2"
        repository = "<repo-directory>"
        repository_path = "migration-demo-2"
        repository_branch = "<repo-branch>"
        terraform_variables = [
            {
                key = "instance_type"
                value = "t2.micro"
                value_type = "string"
            }
        ],
    },
]
```
</details>

### Apply Your Configuration
Run the following command in your repository directory:
```bash
terraform apply -refresh=true -var-file=<filename>.tfvars
```
When prompted, review the proposed changes and type **yes** to proceed.

:::info What Happens Next?
This will generate an `out` folder containing:
- Your new `main.tf` file listing your Harness workspaces
- A migration pipeline configured to import your state
:::

## Phase 2: Create Workspaces

Now that your configuration is ready:

- **Set Up Authentication**
    ```bash
    cd out
    export HARNESS_PLATFORM_API_KEY=<your-harness-api-key>
    ```

- **Create the Workspaces**
    ```bash
    terraform init && terraform apply
    ```

- **Verify Creation**: Check your Harness account to confirm the new workspaces are created.

## Phase 3: Import Your State

- **Run Migration Pipeline**
    - Navigate to your new migration pipeline in Harness
    - Select the target workspace for state import
    - Start the pipeline

- **Verify State Import**
    - Go to your workspace
    - Open the State tab
    - Confirm your infrastructure state is imported correctly

- **Complete Migration**
    Repeat the import process for each workspace you created.

<details>
<summary>🔍 Example Infrastructure Configuration</summary>

Here's a sample Terraform configuration that sets up an AWS S3 backend with a single AWS resource:

```hcl
terraform {
    backend "s3" {
        bucket = "migration-demo"
        key = "terraform.tfstate"
        region = "us-east-1"
    }
}

provider "aws" {
    region = "us-east-1"
}

resource "aws_instance" "app1" {
    instance_type = var.instance.type
    ami = "ami-0bb7d64eeag57c9a9"
    tags = {
        "team" = "app-team"
        "costcentre" = "engineering"
    }
}
```

:::tip
Make sure your AWS S3 bucket contains these resources before starting the migration to avoid errors.
:::
</details>