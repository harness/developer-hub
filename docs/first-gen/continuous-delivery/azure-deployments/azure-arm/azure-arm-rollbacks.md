---
title: Azure ARM Rollbacks
description: Harness generates a template of the existing resource group and saves it before starting ARM Deployment. It uses this for rollback.
# sidebar_position: 2
helpdocs_topic_id: 06mkvd27tu
helpdocs_category_id: 3i7h1lzlt2
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic describes Harness Azure ARM rollbacks.


### Limitations

* **Only Resource Group scope rollback is supported:** rollbacks are supported for Azure ARM provisioning using the **Resource Group** scope only.  
When you add your ARM template to Harness as an Infrastructure Provisioner, you specify its scope. See [Add Azure ARM Templates to Harness](add-azure-arm-templates.md).  
If you choose a scope other than **Resource Group**, any Workflow using that Infrastructure Provisioner will not rollback provisioned Azure resources if it fails.
* **Storage account not supported for resource group rollback:** if the ARM template used to create a resource group has a storage account (`Microsoft.Storage/storageAccounts`), then rollback fails for that storage account.  
This is because the template generated from Azure is not valid. During rollback you might see an error like this:


```
[Resource - [Microsoft.Storage/storageAccounts/fileServices - storagewfvariables1234/default],   
failed due to - [{error={code=InvalidXmlDocument,message=XML specified is not syntactically valid.   
RequestId:0000-001a-0064-000-103dcd000000 Time:2021-03-03T12:25:02.5619016Z}}] 
```
### Rollback Summary

When you add the **ARM/Blueprint Create Resource** step to a Workflow, Harness adds ARM Rollback functionality automatically. No ARM Rollback step appears in the Workflow, but it will appear in the deployment in **Deployments** if there is a rollback.

When running a Harness Workflow that performs provisioning using an ARM template, Harness generates a template of the existing resource group and saves it before starting ARM Deployment.

You can see Harness saving the template in the **Execute ARM Deployment** section of the **ARM/Blueprint Create Resource** step:


```
Starting template validation  
Saving existing template for resource group - [harness-arm-test]   
Starting ARM Deployment at Resource Group scope ...   
Resource Group - [harness-arm-test]  
Mode - [INCREMENTAL]  
Deployment Name - [harness_558_1616014910588]  
ARM Deployment request send successfully
```
During rollback, this template is used to restore the resource group to its state before the deployment started. You can see the rollback in the **Execute ARM Deployment** of the **ARM Rollback** step:


```
Starting ARM Rollback at Resource Group scope ...   
Resource Group - [anil-harness-arm-test]  
Mode - [COMPLETE]  
Deployment Name - [harness_rollback_367_1616019421845]  
ARM Rollback request send successfully
```
