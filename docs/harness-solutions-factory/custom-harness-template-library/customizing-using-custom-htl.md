---
title: How to customize an existing template using Custom Harness Template Library
description: This tutorial will go through how to make changes to a template in Custom Harness Template Library
sidebar_position: 2
redirect_from: 
    - /kb/reference-architectures/hsf/htl/customizing-using-custom-htl
---

For the purpose of this tutorial we will be focusing on customizing the project creation workflow but this can be done for any workflow.

:::note
**What is the idp_registration_mgr.yaml?**

It is a way to identify the scope of which a template should be deployed. Rather than defining the scope and restricting where the file can be deployed we decided to register the templates here. 

Within this file workflows are not only scoped by organization but also scoped by modules that are purchased and if it’s a default workflow that should be included for all HSF users.
:::

Any workspaces that are created with the custom template library will now be configured with the **source:custom** tag, and have the appropriate connectors, branch and repos.

## Adding in a Variable

Let’s add a variable into the project creation workflow.
:::note
For the purposes of this tutorial, we will provide the examples. To learn more about the Harness Terraform provider, review the [documentation](https://registry.terraform.io/providers/harness/harness/latest/docs)
:::
1.  Navigate to the [Terraform Harness Documentation](https://registry.terraform.io/providers/harness/harness/latest/docs) 
2.  Under Next Gen find `harness_platform_variables`
3.  Go into your code editor and open up `custom-harness-template-library/harness-project` 
4.  Add in file **harness_variables.tf** and paste in declaration from the Terraform docs    
    *   Change **org_id** to `data.harness_platform_organization.selected.id`  
        *   You could use a variable but this was pulled from the others where the data object already exists.
    *   Change **project_id** to `data.harness_platform_project.selected.id`
        *   You could use a variable but this was pulled from the others where the data object already exists. 
    *   Change **fixed_value** to `var.application_id`
```
resource "harness_platform_variables" "application_id"{ 
    identifier = "application_id" 
    name = "Application ID" 
    org_id = data.harness_platform_organization.selected.id 
    project_id = data.harness_platform_project.selected.id 
    type = "String" 
    spec { 
        value_type = "FIXED" 
        fixed_value = var.application_id
    }
}
```

5.  Add in the **application_id** variable into **variables.tf**
```
variable "application_id"{ 
    type = string 
    description = "[Optional] Please provide your team's application ID" 
    default = "n/a" 
}
```
6.  Add the variable to **catalog_template.yaml**. This will tell the user what to do and pass the information.

```
application_id: 
    title: "ServiceNOW Application Identifier" 
    type: string 
    description: "Please provide your team's application ID"
```
*   If you wanted to add in validations you can add this in here and add in things like patterns, minLength, and maxLength. 
*   Let’s say all new builds must have this field, so now we will add it into required
*   Note: the default value covers all pre-existing builds
*   Scroll down to **configure_workspace** and under RESOURCE_VARS add
```application_id: ${{ parameters.application_id }}```
*   This will pass in the application ID into workspace creation.
*   Save, commit and push
7.  Run the `Register Custom IDP Templates` pipeline since we made changes to the workflow.
    
Workflows are registered using APIs not git experience therefore the change would only take effect if it’s reloaded back in.

## Adding a New Group
1.  Create a new file under groups 
* The name of the file is very important as it is going to determine the identifier
* As an example let’s create a Security Champions group by creating the Security_Champions.yaml file that looks like this:

```
tags: 
    purpose: Security Champions 
role bindings: 
    - role: _project_viewer 
        resource_group: _all_project_level_resources 
    - role: _sto_secops_role 
        resource_group: _all_project_level_resources
```

2.  Save, commit and push
    