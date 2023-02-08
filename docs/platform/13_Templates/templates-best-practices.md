---
title: Best Practices for Template Versioning
description: Best Practices for Template Versioning with GitExperience
sidebar_position: 10
---

Template versioning in Harness is an important part of maintaining effective development processes. To ensure the best practices are followed, it is essential to have a clear and consistent workflow for managing templates. 

You can save your templates in remote Git repositories. For example, a core pipeline that you want all of your app pipelines to use. You can put the template in a core repository and reuse it in multiple pipelines.

Maintaining a good template management system is essential for your deployments.

Here are some of the best practices you can follow: 

- **Regular updates:** Regularly update your templates and fix any bugs to keep them up-to-date.
- **Sharing**: Share your templates with others in your organization or open-source them, to get feedback and make improvements.
- **Policies**: Set up policies that outlines who should create, manage, and review the templates before they are approved.
- **Track changes**: Make sure that changes are documented and tracked, so any future changes or updates can be easily identified.
- **Test changes**: When making changes to templates, make sure to test them thoroughly before approving them for use.
- **Backup changes**: Templates can be critical resources when you need them. Backing up your templates in multiple locations allows for quick and easy access when needed, reducing downtime during critical moments.

## Role-based access control for templates

You can create templates at the account, org, or project scope and can configure corresponding permissions at each of these scopes.

The following table explains the permissions associated with templates:

|**Permission**       |  **Description**     |
|  ---  |  ---  |
|  Create     | Can create a template.      |
|  Edit or Delete     |  Can edit or delete an existing template.     |
|  Access     |  Can add the template to a pipeline for deployment or build.     |
|  Copy     |   Can copy the template configuration to a pipeline.    |



## Template creation guidelines

Harness supports the following types of templates that can be referenced in a pipeline:

- [Step Template](./run-step-template-quickstart.md)
- [Stage Template](./add-a-stage-template.md)
- [Pipeline Template](./create-pipeline-template.md)

For each template, irrespective of its type, you must provide a unique identifier.

## Template versioning guidelines

You can create versions of your templates in Harness and Git.

Harness creates a new file each time you create a version of a template. 

The file name is in the following format:

```
<template_name>_<version>.yaml.
```

### Inline template versioning

### Remote template versioning

## Template referencing guidelines

To reference a template at the account scope, use the following expression: 


```
account.<templateIdentifier>
```


To reference a template at the organization scope, use the following expression: 


```
org.<templateIdentifier>
```


## Backward compatibility

- Version the template with the latest and most stable versions to avoid backward compatibility issues. These types of templates require more maintenance because changes to imported templates can break pipelines for all projects that use them.

- Version the template with the most up-to-date and stable versions in order to avoid problems with backward compatibility.
- A template change cannot always be backward compatible, especially when a variable is configured and referenced in a step or stage.
- If you revert a template, the corresponding version will no longer contain the variable and could break the referenced step.
- A backward-compatible change is one that affects the configuration of the Harness deployment steps. Configurations often change behavior but pose minimal risk to the pipeline's overall performance.



## Branches and version control
- Maintain different versions of your templates in Git and track their changes.
- Harness recommends updating the same file and using branches to manage different versions and changes to your template.
  Manage templates on different branches to ensure that changes to an existing version don't affect users on the stable, main branch.

:::caution
When tracking template changes, Harness versioning should not be combined with GitHub versioning.
:::

- When you reference a pipeline with a template, ensure the pipeline branch matches the template branch.
