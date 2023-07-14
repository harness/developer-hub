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
