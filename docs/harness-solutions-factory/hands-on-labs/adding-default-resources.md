---
title: Adding Default Resources to a Project
sidebar_label: Adding Resources Lab
description: Adding a default connector and infrastructure definition to a project.
sidebar_position: 30
---

:::note
*Before proceeding, ensure that the Harness Solutions Factory has been deployed into your account and that you've completed Your First Harness Project customizations lab*

Throughout the lab, ensure you are only making changes in your custom-harness-template-library repository
::: 

## Add a new Kubernetes Connector using Delegate

1. Open the `custom-template-library` in VSCode and `Reopen in Container`
2. Create a new branch called `feature/infrastructure-connectors`
3. Create a new file called `harness_connectors.tf` in the root of the `harness-project` directory

```
resource "harness_platform_connector_kubernetes" "k8s_dev_infra" {
  identifier  = "k8s_dev_infra"
  name        = "K8s Dev Infra"
  org_id      = data.harness_platform_organization.selected.id
  project_id  = data.harness_platform_project.selected.id
  description = "Kubernetes Connector"
  tags        = local.common_tags_tuple
  inherit_from_delegate {
    delegate_selectors = [var.k8s_dev_infra_delegate]
  }
}
```

4. Open the file `harness-project/variables.tf` to add the following variable.

```
variable "k8s_dev_infra_delegate" {
    type = string
    description = "Provide the delegate selector to use for the Kubernetes connector"
    default = "dev"
}
```

5. Open the file `harness-project/terraform.tfvars.example` to add the following helper example

```
# Provide the delegate selector to use for the Kubernetes connector
k8s_dev_infra_delegate = "dev"
```

6. In terminal, change directory to the new folder `cd harness-project`, open the file `terraform.tfvars.example` and save as a new file (CTL+SHIFT+S on windows or CMD+SHIFT+S on Mac). The file should be named `terraform.tfvars`
    - For local testing, you will need a terraform provider configuration. Run the command `mise provider`
7. The **`providers.tf` includes the two variables `harness_platform_url` and `harness_platform_account`. The `harness-project` mandates those in the `variables.tf`. Remove or Comment out the entries from the `providers.tf`
8. Modify the `terraform.tfvars` to set the variables:

| Variable | Description |
| --- | --- |
| `harness_platform_account` | Should be your Harness account number |
| `harness_platform_key` | Personal Access Token with permissions to the provided account |
| `organization_id` | For the purposes of this test, use the workshop organization `Lab` |
| `project_name` | Provide a new name for a test project - `Lab Exercise` |

9. In terminal, run the command `mise deploy:dryrun`. You should see a *Plan* for 24 resources to be added. *This will run the commands* `tofu init; tofu fmt; tofu plan` using Mise
```
# Example Output
Plan: 24 to add, 0 to change, 0 to destroy.
Changes to Outputs:
  + organization_identifier = "Lab"
  + project_identifier      = (known after apply)
  + project_url             = (known after apply)
```
10. Run a `mise deploy` to execute the full deployment of the codebase against your account. *This will run the commands* `tofu init; tofu fmt; tofu plan; tofu apply` using Mise
```
# Example Output
Apply complete! Resources: 24 added, 0 changed, 0 destroyed.
Outputs:
organization_identifier = "Lab"
project_identifier = "Lab_Exercise"
project_url = "<https://app.harness.io/ng/account/uZuUmmrnT4qQRx5XF0ZtkQ/all/orgs/Lab/projects/Lab_Exercise/overview>"
```
11. Navigate to your new project in your Harness Account to verify the results.
12. Commit your code locally and push the branch

## Add a new default Infrastructure Definition

1. Create a new file called `harness_infradefs.tf` in the root of the `harness-project` directory
```
resource "harness_platform_infrastructure" "infrastructure" {
  depends_on = [
    harness_platform_environment.environments
  ]
  identifier      = "infrastructure"
  name            = "K8s Dev Infra"
  org_id          = data.harness_platform_organization.selected.id
  project_id      = data.harness_platform_project.selected.id
  env_id          = "dev"
  type            = "KubernetesDirect"
  deployment_type = "Kubernetes"
  yaml            = <<-EOT
  infrastructureDefinition:
    name: K8s Dev Infra
    identifier: infrastructure
    description: ""
    tags:
      ${indent(4, yamlencode(local.common_tags))}
    orgIdentifier: ${data.harness_platform_organization.selected.id}
    projectIdentifier: ${data.harness_platform_project.selected.id}
    environmentRef: dev
    deploymentType: Kubernetes
    type: KubernetesDirect
    spec:
      connectorRef: ${harness_platform_connector_kubernetes.k8s_dev_infra.id}
      namespace: ${var.k8s_dev_infra_namespace}
      releaseName: release-<+INFRA_KEY>
    allowSimultaneousDeployments: true
  EOT
  tags            = local.common_tags_tuple
}
```
2. Open the file `harness-project/variables.tf` to add the following variable.
```
variable "k8s_dev_infra_namespace" {
    type = string
    description = "Provide the name of the infrastructure definition to add"
    default = "infrastructure"
}
```
3. Open the file `harness-project/terraform.tfvars.example` to add the following helper example
```
# Provide the name of the infrastructure definition to add
k8s_dev_infra_namespace = "infrastructure"
```
4. Open the file `harness-project/terraform.tfvars` to add the following value for testing
```
# Provide the name of the infrastructure definition to add
k8s_dev_infra_namespace = "infrastructure"
```
5. In terminal, run the command `mise deploy:dryrun`. You should see a *Plan* for 1 resource to be added. *This will run the commands* `tofu init; tofu fmt; tofu plan` using Mise
```
# Example Output
Plan: 1 to add, 0 to change, 0 to destroy.
```
6. Run a `mise deploy` to execute the full deployment of the codebase against your account. *This will run the commands* `tofu init; tofu fmt; tofu plan; tofu apply` using Mise
```
# Example Output
Plan: 1 to add, 0 to change, 0 to destroy.
harness_platform_infrastructure.infrastructure: Creating...
harness_platform_infrastructure.infrastructure: Creation complete after 1s [id=infrastructure]
Apply complete! Resources: 1 added, 0 changed, 0 destroyed.
```
7. Navigate to your new project to verify the results. We have just added a new Infrastructure Definition in the Environment `Dev`
8. Clean-up your new project by deleting the resources `mise teardown`. This will destroy the resources, remove the state files and providers, and then remove the **`providers.tf`
9. Commit your code locally and push the branch

## Rollout changes to your projects
1. Navigate to the `Solutions Factory` project
2. Open the IACM Workspaces and select the `Lab_Custom-Project` workspace
3. Switch the *Configuration* tab for the workspace and change the branch to use your new branch `feature/infrastructure-connectors`
4. Click `Drift Check`. The results will show that two new items will be added.
5. Navigate back to the workspace and run `Provision`. Wait for the execution to complete to verify that everything has worked.
6. Navigate to the `Harness Platform Management` organization, go to the Code Repository module, and click `custom-template-library`
7. Create and merge a new Pull-Request and delete the branch
8. Navigate to IACM Workspace, select the workspace `Lab_Custom-Project`and in the *Configuration* tab change the branch to use your new branch `main`
9. Run the pipeline `Bulk Workspace Management` by navigating to the pipelines in the `Solutions Factory` project and filtering your pipelines by typing `iacm` in the pipeline search bar
    - WORKSPACE_SOURCE = `custom`
    - WORKSPACE_TYPE = `harness-project`
    - WORKSPACE_STATUS = `any`
    - WORKSPACE_CHANGE_SOURCE = `no`
    - WORKSPACE_ACTION = `apply`
10. After the `Bulk Workspace Management` completes, it will have started new executions of the `Provision Workspace` pipeline for each matching IACM Workspace. Approve the changes to the existing workspaces and verify the changes have been applied.
    - Each project will have the new connector and infrastructure definition
    - The `Custom Project` should have no changes applied

*In your local VSCode repository, check out branch* `main` to pull your changes and delete your local branch `feature/infrastructure-connectors`