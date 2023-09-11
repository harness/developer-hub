---
title: Account and Application Templates
description: Create templates for common commands and scripts, to ensure consistency and save time.
# sidebar_position: 2
helpdocs_topic_id: ygi6d8epse
helpdocs_category_id: vbcmo6ltg7
helpdocs_is_private: false
helpdocs_is_published: true
---

This content is for Harness [FirstGen](/docs/get-started/harness-first-gen-vs-harness-next-gen.md). Switch to [NextGen](../../../../platform/13_Templates/use-a-template.md).Harness includes an account-wide Template Library, called the Shared Template Library, and an Application-wide Template Library.

Only members of a Harness User Group with the **Manage Template Library** permission may create, edit, and delete Account and Application-level templates. Members of a User Group with this permission disabled can view and link to templates only.


### Before You Begin

* [Add a Service](../../model-cd-pipeline/setup-services/service-configuration.md)
* [Add a Workflow](../../model-cd-pipeline/workflows/workflow-configuration.md)

### Shared Template Library and Application Template Library

The Shared Template Library is available from **Setup** and the Application Template Library is available in each Application.

![](./static/use-templates-17.png)

Using templates from either source works the same way, and both options are available in Harness components, but Application templates may be used within their Application only.

For example, when you click **Add Command** in the Service, you see the option to select a template from the Application or Shared Template Library.

![](./static/use-templates-18.png)

### Template YAML

When you look at the code for an Application containing Services or Workflows using linked templates, the YAML for the template information of the command is displayed like this:


```
- type: SHELL_SCRIPT  
      name: DocExample  
      properties:  
        sweepingOutputScope: null  
        connectionAttributes: null  
        publishAsVar: false  
        commandPath: null  
        scriptType: BASH  
        host: null  
        scriptString: echo "Hello" ${name}  
        timeoutMillis: 600000  
        sshKeyRef: null  
        executeOnDelegate: true  
        sweepingOutputName: null  
        tags: ''  
      templateUri: AccountName/DocExample:latest  
      templateVariables:  
      - name: name
```
### Next Steps

* [Create an HTTP Workflow Step Template](../../../firstgen-platform/account/manage-templatelib/account-and-application-templates.md)
* [Create a Shell Script Workflow Step Template](../../../firstgen-platform/account/manage-templatelib/create-a-shell-script-workflow-step-template.md)
* [Create a Service Command Template](../../../firstgen-platform/account/manage-templatelib/create-a-service-command-template.md)
* [Add Service Command Templates into Command Units](../../../firstgen-platform/account/manage-templatelib/add-service-command-templates-into-command-units.md)
* [Link Templates to Services and Workflows](../../../firstgen-platform/account/manage-templatelib/link-templates-to-services-and-workflows.md)

