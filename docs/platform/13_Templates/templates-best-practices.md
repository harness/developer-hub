---
title: Best practices and guidelines for templates
description: Best practices for template versioning with GitExperience
sidebar_position: 2
---

Template versioning in Harness is an important part of maintaining effective development processes. To ensure the best practices are followed, it is essential to have a clear and consistent workflow for managing templates.

You can save your templates in remote Git repositories. For example, a core pipeline that you want all of your app pipelines to use. You can put the template in a core repository and reuse it in multiple pipelines.

Maintaining a good template management system is essential for your deployments.

This topic explains the best practices for template management.

## Role-based access control for templates

You can create templates at the account, org, or project scope and can configure corresponding permissions at each of these scopes.

The following table explains the permissions associated with templates:

|**Permission**       |  **Description**     |
|  ---  |  ---  |
|  Create     | Can create a template.      |
|  Edit or Delete     |  Can edit or delete an existing template.     |
|  Access     |  Can add the template to a pipeline for deployment or build.     |
|  Copy     |   Can copy the template configuration to a pipeline.    |

You can select the scope of the templates based on the following

- The number of users who will use this template.

- Membership of these users across various teams.

- Access control for these users.

## Template creation guidelines

Harness supports the following types of templates that can be referenced in a pipeline:

- [Step template](./run-step-template-quickstart.md)
- [Stage template](./add-a-stage-template.md)
- [Pipeline template](./create-pipeline-template.md)

For each template, irrespective of its type, you must provide a unique identifier.

## Step templates

You can create a template for any step in Harness. Harness supports templates for CI and CD steps.

You can create Step templates at the account, org, or project scope and use them in pipelines, stages, stage templates, and pipeline templates. You can manage step templates via Harness Git Experience.

### Sample step template

```yaml
template:
  name: Cleanup Demo
  identifier: Cleanup_Demo
  versionLabel: 0.0.1
  type: Step
  projectIdentifier: Cleanup
  orgIdentifier: default
  spec:
    type: K8sDelete
    spec:
      deleteResources:
        type: ReleaseName
        spec:
          deleteNamespace: true
    timeout: 10m
```

The example below shows how the template is used in a pipeline.

```yaml
pipeline:
  name: Multi Service Deployment Demo
  identifier: Multi_Service_Deployment_Demo
  projectIdentifier: Cleanup
  orgIdentifier: default
  tags: {}
  stages:
    - stage:
        name: Deploy
        identifier: Deploy
        description: ""
        type: Deployment
        spec:
          deploymentType: Kubernetes
          service:
            serviceRef: <+input>
            serviceInputs: <+input>
          execution:
            steps:
              - step:
                  name: Rollout Deployment
                  identifier: rolloutDeployment
                  type: K8sRollingDeploy
                  timeout: 10m
                  spec:
                    skipDryRun: false
                    pruningEnabled: false

## Step template reference in a pipeline
## You will provide the templateRef and version to configure for the step

              - step:
                  name: Cleanup Demo
                  identifier: CleanupDemo
                  template:
                    templateRef: Cleanup_Demo
                    versionLabel: 0.0.1
            rollbackSteps:
              - step:
                  name: Rollback Rollout Deployment
                  identifier: rollbackRolloutDeployment
                  type: K8sRollingRollback
                  timeout: 10m
                  spec:
                    pruningEnabled: false
          environment:
            environmentRef: staging
            deployToAll: false
            infrastructureDefinitions:
              - identifier: productstaging
                inputs:
                  identifier: productstaging
                  type: KubernetesDirect
                  spec:
                    namespace: <+input>.allowedValues(dev,qa,prod)
        tags: {}
        failureStrategies:
          - onFailure:
              errors:
                - AllErrors
              action:
                type: StageRollback
  allowStageExecutions: true
```

## Stage templates

Harness supports the following stage types as templates:

- Build
- Deploy
- Custom
- Approval

You can configure a stage template at the project, org, and account scope. Harness supports versioning of Stage templates in Harness or via Harness Git Experience.

You can define variables within the stage template and access them within the pipeline that references the template.

### Sample stage template

```yaml
template:
  name: CD Deploy
  identifier: CD_Deploy
  versionLabel: "1.0"
  type: Stage
  tags: {}
  spec:
    type: Deployment
    spec:
      deploymentType: Kubernetes
      service:
        serviceRef: <+input>
        serviceInputs: <+input>
      environment:
        environmentRef: <+input>
        deployToAll: false
        environmentInputs: <+input>
        infrastructureDefinitions: <+input>
      execution:
        steps:
          - step:
              name: Rollout Deployment
              identifier: rolloutDeployment
              type: K8sRollingDeploy
              timeout: 10m
              spec:
                skipDryRun: false
                pruningEnabled: false
          - step:
              type: Http
              name: Health Check
              identifier: Health_Check
              spec:
                url: https://app.harness.io
                method: GET
                headers: []
                outputVariables: []
              timeout: 10s
        rollbackSteps:
          - step:
              name: Rollback Rollout Deployment
              identifier: rollbackRolloutDeployment
              type: K8sRollingRollback
              timeout: 10m
              spec:
                pruningEnabled: false
    failureStrategies:
      - onFailure:
          errors:
            - AllErrors
          action:
            type: StageRollback
    when:
      pipelineStatus: Success
      condition: <+input>
```

The example below is a pipeline that references the stage template.

Stage templates can take inputs at runtime during a pipeline run, fix inputs in the template when it's linked to the pipeline, and provide identifiers for object input or strings for variable input.

To reference a template at the account scope, use `account.<templateIdentifier>`.

To reference a template at the org scope, use `org.<templateIdentifier>`.

```yaml
name: Multi Service Deployment Demo
  identifier: Multi_Service_Deployment_Demo
  projectIdentifier: Multi Service
  orgIdentifier: default
  tags: {}
  stages:
    - stage:
        name: Deploy
        identifier: Deploy
        description: ""
        type: Deployment
        spec:
          deploymentType: Kubernetes
          service:
            serviceRef: <+input>
            serviceInputs: <+input>
          execution:
            steps:
              - step:
                  name: Rollout Deployment
                  identifier: rolloutDeployment
                  type: K8sRollingDeploy
                  timeout: 10m
                  spec:
                    skipDryRun: false
                    pruningEnabled: false
              - step:
                  name: Cleanup Demo
                  identifier: CleanupDemo
                  template:
                    templateRef: Cleanup_Demo
                    versionLabel: 0.0.1
            rollbackSteps:
              - step:
                  name: Rollback Rollout Deployment
                  identifier: rollbackRolloutDeployment
                  type: K8sRollingRollback
                  timeout: 10m
                  spec:
                    pruningEnabled: false
          environment:
            environmentRef: staging
            deployToAll: false
            infrastructureDefinitions:
              - identifier: productstaging
                inputs:
                  identifier: productstaging
                  type: KubernetesDirect
                  spec:
                    namespace: <+input>.allowedValues(dev,qa,prod)
        tags: {}
        failureStrategies:
          - onFailure:
              errors:
                - AllErrors
              action:
                type: StageRollback
    - stage:
        name: Dev Deploy
        identifier: Dev_Deploy

## Stage templates are referenced in the pipeline. For an account level template, use the prefix account.<templateIdentifier>. For an organization template, use the prefix org.<templateIdentifier>.
        template:
          templateRef: account.CD_Deploy
          versionLabel: "1.0"
          templateInputs:
            type: Deployment
            spec:
              service:
                serviceRef: <+input>
                serviceInputs: <+input>
              environment:
                environmentRef: <+input>
                environmentInputs: <+input>
                infrastructureDefinitions: <+input>
            when:
              condition: <+input>
  allowStageExecutions: true
```

## Pipeline templates

Pipeline templates support all stage types. Pipeline templates can reference stage templates at the same object level or higher.

You can manage pipeline templates using the Harness Git Experience.
You cannot edit steps or stages when the template is linked to a pipeline in a project. You must change the configuration in the Template Studio.

When you design a pipeline template, Harness recommends that provide all of your parameters in the template. When you use the template in a pipeline, the content is already available. You cannot customize on top of a pipeline template.

### Sample pipeline template

```yaml
template:
## The name is the name of the pipeline when it's linked with a pipeline template
  name: "Golden Pipeline"
  type: Pipeline
  projectIdentifier: sandbox
  orgIdentifier: default
  spec:
    stages:
      - stage:
          name: Deploy to Dev
          identifier: Deploy_to_Dev
          template:
            templateRef: Deploy_Stage
            versionLabel: "1.0"
            templateInputs:
              type: Deployment
              spec:
                service:
                  serviceRef: <+input>
                  serviceInputs: <+input>
                environment:
                  environmentRef: <+input>
                  environmentInputs: <+input>
                  serviceOverrideInputs: <+input>
                  infrastructureDefinitions: <+input>
      - stage:
          name: Deploy to QA
          identifier: Deploy_to_QA
          template:
            templateRef: Deploy_Stage
            versionLabel: "1.0"
            templateInputs:
              type: Deployment
              spec:
                service:
                  serviceRef: <+input>
                  serviceInputs: <+input>
                environment:
                  environmentRef: <+input>
                  environmentInputs: <+input>
                  serviceOverrideInputs: <+input>
                  infrastructureDefinitions: <+input>
      - stage:
          name: Approve
          identifier: Approve
          description: ""
          type: Approval
          spec:
            execution:
              steps:
                - step:
                    name: Approve
                    identifier: Approve
                    type: HarnessApproval
                    timeout: 1d
                    spec:
                      approvalMessage: |-
                        Please review the following information
                        and approve the pipeline progression
                      includePipelineExecutionHistory: true
                      approvers:
                        minimumCount: 1
                        disallowPipelineExecutor: false
                        userGroups:
                          - account._account_all_users
                      approverInputs: []
          tags: {}
      - stage:
          name: Deploy to Prod
          identifier: Deploy_to_Prod
          template:
            templateRef: Deploy_Stage
            versionLabel: "1.0"
            templateInputs:
              type: Deployment
              spec:
                service:
                  serviceRef: <+input>
                  serviceInputs: <+input>
                environment:
                  environmentRef: <+input>
                  environmentInputs: <+input>
                  serviceOverrideInputs: <+input>
                  infrastructureDefinitions: <+input>

## Below is the identifier for the pipeline template and the version label
  identifier: End_2_End_Pipeline
  versionLabel: "1.0"
```


## Template versioning guidelines

You can create versions of your templates in Harness and Git.

### Inline template versioning

- You can set a stable version for your template and enforce it on all the pipelines that reference it.

  Use a stable version when introducing a breaking change without affecting existing projects.

- Harness recommends managing versions of the templates in the UI. In this way, you can see what changes have been made between versions of the template.

### Remote template versioning

- Harness creates a new file each time you create a version of a template. 

  The file name is in the following format:

  ```
  <template_name>_<version>.yaml.
  ```

- Harness recommends updating the same file and using branches to manage different versions and changes to your template.
  Manage templates on different branches to ensure that changes to an existing version don't affect users on the stable, main branch.

- When you reference a pipeline with a template, ensure the pipeline branch matches the template branch.

:::caution
When tracking template changes, Harness versioning should not be combined with GitHub versioning.
:::

### Product Demo - Templates at the Org and Account level with Git Experience

<!-- Video:
https://harness-1.wistia.com/medias/bv9c2a8exg-->
<docvideo src="https://harness-1.wistia.com/medias/bv9c2a8exg" />


## Template referencing guidelines

To reference a template at the account scope, use the following expression: 

```
account.<templateIdentifier>
```

To reference a template at the organization scope, use the following expression: 

```
org.<templateIdentifier>
```

### Use template

- Select the **Use Template** option to reference your template in your pipelines.
- With this option, changes to the existing version are propagated to all resources referencing it.
- If you select **Always use Stable** when linking a template to a pipeline or stage, any stable version that gets promoted will be pushed to those resources using that template.
- In order to prevent a newly published template and its changes from being adopted, you can fix the template to a specific pipeline.

### Copy template

- Copy Template copies the configuration of a template. It doesn't have a link to the template.

- This option is helpful for the quick configuration of a step, stage, or pipeline without being tied to a specific version of the template.

## Manage templates

You can manage your Harness templates at the account, org, and project scope.
RBAC is available for the templates at each of the levels in the platform hierarchy.

You can version templates can in Harness or Git via Harness Git Experience.

When you reference resources in a template, you can only reference resources in the same scope. For more information, refer to the use cases below.

### Use case 1: Account-level deploy stage template

- You can't hard-code a service because there are no services at the account level. The field will be `<+input>`.

- You can't hard-code an environment because there are no environments at the account level. The field will be `<+input>`.

- You configure your execution steps as-is, with no restrictions at the account level.

- Variables defined at the account level in the stage template must be configured as fixed or run-time inputs so that they can be defined when referenced in the pipeline.

- Connectors you reference are only at the account level, you can't reference a connector in a lower-level org or project.

### Use case 2: Org-level deploy stage template

- You can't fix a service because there are no services at the org level. You define them as `<+input>`. When used in a pipeline, you can configure an expression in the runtime or to fix the service. 

- You can't fix an environment because there are no environments at the org level. You configure them as `<+input>`. You can select an environment within a project when referenced in a specific project's pipeline. 

- Connector options when referenced within a template are related to the organization and account level for which the template is configured. The selection is also determined by the RBAC of the user configuring the template.

- The variable should either be a fixed value or a run-time input so that you can configure the correct options when linked in the pipeline.

## Roll out changes with templates

Harness offers two ways to update your templates and roll the changes out to your users and pipelines.

1. You can leverage the Harness inline template experience, meaning the template files are contained and fully-managed in Harness.

2. Harness can manage the template in Github by making commits and PR-driven changes to it.

Both methods have benefits and can provide an convenient, scalable way to manage, edit, and promote your templates.

If you reference templates in your pipeline, you can configure them to always pull the stable version. This means that when you make a change to a template and promote it to stable, the change is automatically published and propagated to all pipelines that reference the template.

### Inline templates

When managing templates inline in Harness, your templates are stored in the Harness database, and you manage the versions in Harness. You can configure and update your templates in the UI.

You can set the template version used in a pipeline when you build out the pipeline. You can set any version of the template to be the stable version, and you can configure all pipelines that reference the template to use the **Always reference from Stable** option.

### Create a new version of an inline template

Harness recommends that you manage template versions primarily in the UI. This ensures that you can see the changes between updates to an existing version of the template.

When deciding where to store your templates, you should consider the following:

- How many users are going to consume this template?
- Are your users on different teams?
- Do your users have access to the same resources?

With the answers to the above questions, you can decide if you want to store the templates at the account, org, or project level in the Harness platform.

You can manage the creation and state of your templates via our Terraform provider. For more information, go to the [Harness platform template Terraform provider resource](https://registry.terraform.io/providers/harness/harness/latest/docs/resources/platform_template).

#### Sample Terraform resource snippet

```yaml
resource "harness_platform_template" "inline" {
  identifier    = "identifier"
  org_id        = harness_platform_project.test.org_id
  project_id    = harness_platform_project.test.id
  name          = "name"
  comments      = "comments"
  version       = "ab"
  is_stable     = true
  template_yaml = <<-EOT
template:
      name: "name"
      identifier: "identifier"
      versionLabel: ab
      type: Pipeline
      projectIdentifier: ${harness_platform_project.test.id}
      orgIdentifier: ${harness_platform_project.test.org_id}
      tags: {}
      spec:
        stages:
          - stage:
              name: dvvdvd
              identifier: dvvdvd
              description: ""
              type: Deployment
              spec:
                deploymentType: Kubernetes
                service:
                  serviceRef: <+input>
                  serviceInputs: <+input>
                environment:
                  environmentRef: <+input>
                  deployToAll: false
                  environmentInputs: <+input>
                  serviceOverrideInputs: <+input>
                  infrastructureDefinitions: <+input>
                execution:
                  steps:
                    - step:
                        name: Rollout Deployment
                        identifier: rolloutDeployment
                        type: K8sRollingDeploy
                        timeout: 10m
                        spec:
                          skipDryRun: false
                          pruningEnabled: false
                  rollbackSteps:
                    - step:
                        name: Rollback Rollout Deployment
                        identifier: rollbackRolloutDeployment
                        type: K8sRollingRollback
                        timeout: 10m
                        spec:
                          pruningEnabled: false
              tags: {}
              failureStrategies:
                - onFailure:
                    errors:
                      - AllErrors
                    action:
                      type: StageRollback

      EOT
```

### Create a new version of a template with Git Experience

With Git Experience, you can manage your templates in GitHub. When you create a new version of a template, Harness creates a new `<template_name>_<version>.yaml` file.

You can manage templates on different branches. This allows you to safely change an existing version without pushing it to users on the stable, main branch version.

If you want to track changes to your template, Harness recommends that you update the same file and use branches to manage different versions and changes.

:::info note

 Harness does not recommend combining inline and GitHub versioning if you want to track changes to your templates.

:::

If you use a template to reference a pipeline, you must ensure that the pipeline branch is the same branch as the template if the template is in the same repository.

#### Sample template YAML in GitHub

```yaml
template:
    name: Sample Template
    identifier: Sample_Template
    versionLabel: 0.0.1
    type: Step
    projectIdentifier: CD_Product_Team
    orgIdentifier: default
    description: "Shell Script Template"
    tags: {}
    spec:
        type: ShellScript
        timeout: 10m
        spec:
            shell: Bash
            onDelegate: true
            source:
                type: Inline
                spec:
                    script: |-
                        echo "Hello World"
                        
                        echo "This is Git to Harness, Hello!"
            environmentVariables: []
            outputVariables: []
            executionTarget: {}
```

You can manage the creation and state of your templates via our Terraform provider. For more information, go to the [Harness platform template Terraform provider resource](https://registry.terraform.io/providers/harness/harness/latest/docs/resources/platform_template).

The following is a sample Terraform resource snippet.

```yaml
resource "harness_platform_template" "remote" {
  identifier = "identifier"
  org_id     = harness_platform_project.test.org_id
  project_id = harness_platform_project.test.id
  name       = "name"
  comments   = "comments"
  version    = "ab"
  is_stable  = true
  git_details {
    branch_name    = "main"
    commit_message = "Commit"
    file_path      = "file_path"
    connector_ref  = "account.connector_ref"
    store_type     = "REMOTE"
    repo_name      = "repo_name"
  }
  template_yaml = <<-EOT
template:
      name: "name"
      identifier: "identifier"
      versionLabel: ab
      type: Pipeline
      projectIdentifier: ${harness_platform_project.test.id}
      orgIdentifier: ${harness_platform_project.test.org_id}
      tags: {}
      spec:
        stages:
          - stage:
              name: dvvdvd
              identifier: dvvdvd
              description: ""
              type: Deployment
              spec:
                deploymentType: Kubernetes
                service:
                  serviceRef: <+input>
                  serviceInputs: <+input>
                environment:
                  environmentRef: <+input>
                  deployToAll: false
                  environmentInputs: <+input>
                  serviceOverrideInputs: <+input>
                  infrastructureDefinitions: <+input>
                execution:
                  steps:
                    - step:
                        name: Rollout Deployment
                        identifier: rolloutDeployment
                        type: K8sRollingDeploy
                        timeout: 10m
                        spec:
                          skipDryRun: false
                          pruningEnabled: false
                  rollbackSteps:
                    - step:
                        name: Rollback Rollout Deployment
                        identifier: rollbackRolloutDeployment
                        type: K8sRollingRollback
                        timeout: 10m
                        spec:
                          pruningEnabled: false
              tags: {}
              failureStrategies:
                - onFailure:
                    errors:
                      - AllErrors
                    action:
                      type: StageRollback

      EOT
}
```

## Backward compatibility

- Version the template with the latest and most stable versions to avoid backward compatibility issues. These types of templates require more maintenance because changes to imported templates can break pipelines for all projects that use them.

- Version the template with the most up-to-date and stable versions in order to avoid problems with backward compatibility.
- A template change cannot always be backward compatible, especially when a variable is configured and referenced in a step or stage.
- If you revert a template, the corresponding version will no longer contain the variable and could break the referenced step.
- A backward-compatible change is one that affects the configuration of the Harness deployment steps. Configurations often change behavior but pose minimal risk to the pipeline's overall performance.

## Reconciliation

- Harness warns you when a pipeline references a template that needs to be reconciled when you change it.

- You can view the Git YAML differences for the pipeline and see which lines have been modified.

- To update the template, select **Save**. Harness reconciles the change making it the default state.
