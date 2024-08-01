---
title: State migration
description: Learn how to migrate and import infrastructure state in Harness IaCM workspaces.
sidebar_position: 20
---

This topic describes how you can migrate and import your infrastructure state into Harness workspaces with the IaCM migration tool. Go to [Remote backend initialization](https://developer.harness.io/docs/infra-as-code-management/remote-backends/init-configuration) to find out how to configure your remote backend.

## Prerequisites

Every workspace you create will be created inside a specified project, so you should:
- Ensure you have an existing Harness project.
- Configure any connectors within that project before passing their values to your migration variables file.

## Migration phases
Harness IaCM migration is built in three phases to grant control over your configuration and imported state.

1. Prepare your configured workspaces locally.
2. Apply your new workspaces and import them to Harness.
3. Import your infrastructure state into your new workspaces.

<details>
  <summary>Sample Terraform file</summary>

  The following sample Terraform file sets a remote AWS S3 backend and a single AWS resource.

  :::note environment variables
  In this case, your S3 bucket, key, and region can be set as workspace environment variables. Go to [Add new environment variables](https://developer.harness.io/docs/infra-as-code-management/remote-backends/init-configuration#add-new-environment-variables) to learn how to add these.
  :::

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
  :::tip confirm resources
  Ensure your AWS S3 bucket contains the above resources to prevent errors during the migration steps.
  :::
</details>

## Prepare your local migration state

The migration tool utilizes a `variables.tf` file to set default variables that can be shared across multiple new workspaces. You can define these variables and list your new workspaces in a list (step 2 below).

Create workspace configurations for each Terraform state file in your project with the following steps:

1. Clone the IaCM migration repository: 
    - `git clone git@github.com:wings-software/iacm-migration.git`.
2. Create and new `<filename>.tfvars` file in the local repository, see the **Sample tfvars file** below for an example.
3. In your terminal, `cd` to your repository directory and run: 
    - `terraform apply -refresh=true -var-file=<filename>.tfvars`.
    - This will run the terraform plan command, list your proposed changes, and ask you to confirm if you want to perform these actions.
4. Type **yes** and press **enter**.

:::info generated out folder
Once the apply command completes, an out folder is generated within your repository with your new main.tf file listing your new Harness workspaces along with a new pipeline with a migration step that will pull the state from your remote backend and securely stores it in your Harness project.
:::

<details>
    <summary>Sample tfvars file</summary>
    
    The following tfvars file example consists of configurations for two new workspaces with default project parameters and connectors.

    ```
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

## Create your new workspaces

Now that your workspaces and state are confirmed in your local environment:

1. In your terminal, cd to the out folder and export your Harness API key.
    - `export HARNESS_PLATFORM_API_KEY=<your-harness-api-key>`.
2. Run `terraform init`, then run `terraform apply`.
3. Confirm your new resources have been added to your Harness account.

### Import state

1. Navigate to, and run your new migration pipeline.
2. Select the workspace you want to import your state to.
3. Your migration pipeline will import your infrastructure state into Harness based on the parameters passed from your `<filename>.tfvars` file earlier.

### Confirm your imported state

4. Navigate to the workspace you ran the migration pipeline against.
5. Select the State tab and confirm that your state has been imported.
6. Repeat the import steps for each new workspace.