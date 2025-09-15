---
title: How To Customize using Harness Custom Template Library
description: This document will walk you through the steps required to setup a new custom Harness Template Library and connect it to your Harness Solutions Factory deployment.
---

For the purpose of this tutorial we will be focusing on customizing the project creation workflow but this can be done for any workflow.

## Setup the Custom Template Library

1.  Clone **harness-template-library** and **custom-harness-template-library** from your account.
    
    *   **harness-template-library** has the source
        
    *   **custom-harness-template-library** has the scaffold
        
2.  Open in your code editor and create a branch.
    
3.  Copy **idp\_resource\_template**, the entire directory from **harness-template-library**, into **custom-harness-template-library**
    
    *   This directory contains files for setting up connections and resource templates. It is used presently, and if it don’t exist it will fail.
        
4.  Copy **idp\_registry\_mgr.yaml** into root you want this to be in the same exact location at **harness-template-library**
    
    *   Inside this file look for the workflow you want to customize and delete the entities that do not apply. We are deleting them because they are not needed because they do not exist!
        
    *   If you already have other custom workflows make sure you don’t delete the ones you’ve already created and just add another under entities.
        
    *   Chance the **source** to custom-template-library
        
    *   Change the **created\_by**
        
    *   Save

*   For our example our **idp\_registry\_mgr.yaml** will look like this:

```
--- 
annotations: 
    source: custom-template-library 
    created_by: Mine 
entities: 
    - org: Harness_Platform_Management 
        project: Solutions Factory 
        workflows: 
            - name: harness-project
```

5.  Copy the directory of the workflow you are modifying and drop it at the root of **custom-harness-template-library**
    
    *   Go into .harness → **catalog\_template.yaml** file to make changes so that the catalog file is pointed to the custom copy
        
    *   Find the **template\_library\_connector** and change the **default** to <variable.account.custom\_template\_library\_connector>
        
    *   Find the **template\_library\_repo** and change the **default** to <variable.account.custom\_template\_library\_connector>
        
    *   _**Note:** These variables are set and already in our Harness account under Account Settings → Variables as Custom Template Library Repo and Custom Template Library Connector._
        
    *   Find the **template\_library\_branch** and change the default to whatever you named your branch
        
    *   If you wanted multiple different workflows you could customize even further and edit **template\_library\_directory**
        
    *   Change the properties repo\_source default to custom. This will set the tag for bulk actions.
        
    *   Save, commit, push
        
6.  Go back to Harness → Solutions Factory Project → Pipelines and run the Register Custom IDP Templates pipeline which will read from the file we just edited.
    
    *   Change the **hsf\_branch** pipeline variable to the branch we just pushed to
        
    *   _**Note:** Generally the branch will be set to main but for testing purposes we are setting it to the branch we just pushed to._
        
    *   This pipeline is cloning the repo, and read the registration file
        

You don’t need to worry about the one that currently exists because it has an annotation **is\_harnesss\_official: “True”**. When this workflow runs it will match the ID of the workflow, then change the annotation is\_harness\_official to “False” and replace any of the changes. From this point forward if I run the official IDP it won’t touch the one I modified.

Any workspaces that are created with the custom template library will now be configured with the **source:custom** tag, and have the appropriate connectors, branch and repos.

## Adding in a Variable

Going back to our example let’s assume that you want to add a variable into the project creation workflow.

1.  Navigate to the [Terraform Harness Documentation](https://registry.terraform.io/providers/harness/harness/latest/docs "https://registry.terraform.io/providers/harness/harness/latest/docs")
    
2.  Under Next Gen find harness\_platform\_variables
    
3.  Go into your code editor
    
4.  Add in file **harness\_variables.tf** and paste in declaration from the Terraform docs
    
    *   Change **org\_id** to data.harness\_platform\_organization.selected.id
        
        *   You could use a variable but this was pulled from the others where the data object already exists.
            
    *   Change **project\_id** to data.harness\_platform\_project.selected.id
        
        *   You could use a variable but this was pulled from the others where the data object already exists.
            
    *   Change **fixed\_value** to var.application\_id
        

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

5.  Add in the **application\_id** variable into **variables.tf**
```
variable "application_id"{ 
    type = string 
    description = "[Optional] Please provide your team's application ID" 
    default = "n/a" 
}
```
6.  Add the variable to **catalog\_template.yaml**. This will tell the user what to do and pass the information.

```
application_id: 
    title: "ServiceNOW Application Identifier" 
    type: string 
    description: "Please provide your team's application ID"
```

*   If you wanted to add in validations you can add this in here and add in things like patterns, minLength, and maxLength.
    
*   Let’s say all new builds must have this field, so now we will add it into required
    
*   Note: the default value covers all pre-existing builds
    
*   Scroll down to **configure\_workspace** and under RESOURCE\_VARS add
    

```application_id: ${{ parameters.application_id }}```

*   This will pass in the application ID into workspace creation.
    
*   Save, commit and push
    

7.  Since we made changes to the workflow you need to run the Register Custom IDP Templates pipeline
    

Workflows are registered using APIs not git experience therefore the change would only take effect if it’s reloaded back in.

## Adding a New Group

1.  Create a new file under groups
    

The name of the file is very important as it is going to determine the identifier

As an example let’s create a Security Champions group by creating the Security\_Champions.yaml file that looks like this:

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
    