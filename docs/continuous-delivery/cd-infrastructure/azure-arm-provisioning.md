---
title: Azure Resource Management (ARM)
description: Use ARM to provision resources in Azure.
sidebar_position: 6
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

Harness has first-class support for [Azure Resource Manager (ARM) templates](https://learn.microsoft.com/en-us/azure/azure-resource-manager/templates/overview) as an infrastructure and resource provisioner.

You can use ARM templates to provision the deployment target infrastructure in Azure, or to simply provision any Azure resources.

This topic provides steps on using Harness to provision a target environment or resources using ARM.


## Important notes

* ARM provisioning is only supported for provisioning Azure resources.
* Harness supports the following scope types:
	+ Tenant
	+ Management Group
	+ Subscription
	+ Resource Group
* Harness ARM provisioning is supported in Basic and Canary deployments, and Blue-Green deployments that [deploy Azure Web Apps](/docs/continuous-delivery/deploy-srv-diff-platforms/azure/azure-web-apps-tutorial).
* **Azure Web App deployment targets only:** you can use ARM templates with Harness to provision any Azure resources, but deployment target provisioning is limited to Azure Web App deployments.
* Incremental mode is supported for all Scope types (Subscription, Resource group, Management group, Tenant) and Complete mode is supported for Resource group only.
* ARM templates must be in JSON. Bicep isn't supported.
* Rollback is supported for the Resource group scope only.

### Azure roles required

See ARM in [Add a Microsoft Azure connector](https://developer.harness.io/docs/platform/connectors/cloud-providers/add-a-microsoft-azure-connector/).

### Harness role permissions required

- **Environments**: `View/Create`, `Edit`, `Access`, `Delete`.


## Azure ARM provisioning summary

Harness provisioning is categorized into the following use cases:
- **Ad hoc provisioning**: temporary and on-demand provisioning of resources for specific tasks or purposes.
- **Dynamic infrastructure provisioning**: provision the target deployment environment as part of the same deployment process. Typically, dynamic infrastructure provisioning is for temporary pre-production environments, such as dev, test, and qa. Production environments are usually pre-existing. 

For details on Harness provisioning, go to [Provisioning overview](/docs/continuous-delivery/cd-infrastructure/provisioning-overview).

:::note

Currently, the dynamic provisioning documented in this topic is behind the feature flag `CD_NG_DYNAMIC_PROVISIONING_ENV_V2`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

:::


### Dynamic provisioning steps for different deployment types

Each of the deployment types Harness supports (Kubernetes, AWS ECS, etc.) require that you map different script outputs to the Harness infrastructure settings in the pipeline stage.

To see how to set up dynamic provisioning for each deployment type, go to the following topics:

- [Azure Web Apps](/docs/continuous-delivery/deploy-srv-diff-platforms/azure/azure-web-apps-tutorial)
- [Tanzu Application Services](/docs/continuous-delivery/deploy-srv-diff-platforms/tanzu/tanzu-app-services-quickstart)
- [VM deployments using SSH](/docs/continuous-delivery/deploy-srv-diff-platforms/traditional/ssh-ng)	
- [Windows VM deployments using WinRM](/docs/continuous-delivery/deploy-srv-diff-platforms/traditional/win-rm-tutorial)


### No artifact required

You don't need to deploy artifacts via Harness services to use Azure ARM provisioning in a stage.

You can simply set up an Azure ARM provisioner and use it in a stage to provision infrastructure without deploying any artifact.

### Service Instances (SIs) consumption

Harness Service Instances (SIs) aren't consumed and no other licensing is required when a Harness stage uses Azure ARM to provision resources.

When Harness deploys artifacts via Harness services to the provisioned infrastructure in the same stage or pipeline, SIs licensing is consumed.


## Create Azure ARM Resources step

The Create Azure ARM Resources step provisions infrastructure and resources using a template file that you provide.

Here are the different options for adding the step.

```mdx-code-block
<Tabs>
  <TabItem value="YAML" label="YAML" default>
```

Here's a YAML example of a step that uses a template and parameter file stored in the [Harness File Store](/docs/continuous-delivery/x-platform-cd-features/services/add-inline-manifests-using-file-store). The `subscription` and `resourceGroup` are set as [runtime inputs](https://developer.harness.io/docs/platform/references/runtime-inputs) so you can select them each time the pipeline runs.

```yaml

              - step:
                  type: AzureCreateARMResource
                  name: Azure Create ARM Resource
                  identifier: AzureCreateARMResource_1
                  spec:
                    provisionerIdentifier: abc123
                    configuration:
                      connectorRef: ACRdocs
                      template:
                        store:
                          type: Harness
                          spec:
                            files:
                              - /Azure ARM/azuredeploy.json
                      scope:
                        type: ResourceGroup
                        spec:
                          subscription: <+input>
                          resourceGroup: <+input>
                          mode: Complete
                      parameters:
                        store:
                          type: Harness
                          spec:
                            files:
                              - /Azure ARM/azuredeploy.parameters.json
                  timeout: 10m

```

```mdx-code-block
  </TabItem>
  <TabItem value="Harness Manager" label="Harness Manager">
```

1. In your Harness CD Deploy stage, add the **Create Azure ARM Resources** step.
   1. If you are using the step for dynamic infrastructure provisioning, add/configure the step in the stage **Environment** tab.
   2. If you are using the step for ad hoc provisioning, add/configure the step in the stage **Execution** tab.
2. Configure the step using the settings described below.


```mdx-code-block
  </TabItem>
</Tabs>
```

### Provisioner Identifier

You use the **Provisioner Identifier** in subsequent steps to refer to the provisioning in this step.

Enter a unique value in **Provisioner Identifier**.

The most common use of **Provisioner Identifier** is between the Create Azure ARM Resources step and Azure ARM Rollback step. When the **Provisioner Identifier** in the Create Azure ARM Resources step is used in the **Provisioner Identifier** in the Azure ARM Rollback step, the Azure ARM Rollback step rolls back the Create Azure ARM Resources step provisioning.

The **Provisioner Identifier** is a project-wide setting. You can reference it across pipelines in the same project.

For this reason, it's important that all your project members know the provisioner identifiers. Sharing this information will prevent one member building a pipeline from accidentally impacting the provisioning of another member's pipeline.

### Azure Connector

Select or create the Harness Azure connector for Harness to use when connecting to Azure and provisioning with the template.

### ARM Template File

In **ARM Template File**, add the template file to use for provisioning.

<details>
<summary>Example: ARM template file for Azure Web App</summary>

```json

{
  "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",
  "contentVersion": "1.0.0.0",
  "parameters": {
    "storagePrefix": {
      "type": "string",
      "minLength": 3,
      "maxLength": 11
    },
    "storageSKU": {
      "type": "string",
      "defaultValue": "Standard_LRS",
      "allowedValues": [
        "Standard_LRS",
        "Standard_GRS",
        "Standard_RAGRS",
        "Standard_ZRS",
        "Premium_LRS",
        "Premium_ZRS",
        "Standard_GZRS",
        "Standard_RAGZRS"
      ]
    },
    "location": {
      "type": "string",
      "defaultValue": "ukwest"
    },
    "appServicePlanName": {
      "type": "string",
      "defaultValue": "exampleplan"
    },
    "webAppName": {
      "type": "string",
      "metadata": {
        "description": "Base name of the resource such as web app name and app service plan "
      },
      "minLength": 2
    },
    "linuxFxVersion": {
      "type": "string",
      "defaultValue": "php|7.0",
      "metadata": {
        "description": "The Runtime stack of current web app"
      }
    },
    "resourceTags": {
      "type": "object",
      "defaultValue": {
        "Environment": "Dev",
        "Project": "Tutorial"
      }
    }
  },
  "variables": {
    "uniqueStorageName": "[concat(parameters('storagePrefix'), uniqueString('foobar'))]",
    "webAppPortalName": "[concat(parameters('webAppName'), uniqueString('barfoo'))]"
  },
  "resources": [
    {
      "type": "Microsoft.Storage/storageAccounts",
      "apiVersion": "2021-09-01",
      "name": "[variables('uniqueStorageName')]",
      "location": "[parameters('location')]",
      "tags": "[parameters('resourceTags')]",
      "sku": {
        "name": "[parameters('storageSKU')]"
      },
      "kind": "StorageV2",
      "properties": {
        "supportsHttpsTrafficOnly": true
      }
    },
    {
      "type": "Microsoft.Web/serverfarms",
      "apiVersion": "2021-03-01",
      "name": "[parameters('appServicePlanName')]",
      "location": "[parameters('location')]",
      "tags": "[parameters('resourceTags')]",
      "sku": {
        "name": "B1",
        "tier": "Basic",
        "size": "B1",
        "family": "B",
        "capacity": 1
      },
      "kind": "linux",
      "properties": {
        "perSiteScaling": false,
        "reserved": true,
        "targetWorkerCount": 0,
        "targetWorkerSizeId": 0
      }
    },
    {
      "type": "Microsoft.Web/sites",
      "apiVersion": "2021-03-01",
      "name": "[variables('webAppPortalName')]",
      "location": "[parameters('location')]",
      "dependsOn": [
        "[parameters('appServicePlanName')]"
      ],
      "tags": "[parameters('resourceTags')]",
      "kind": "app",
      "properties": {
        "serverFarmId": "[resourceId('Microsoft.Web/serverfarms', parameters('appServicePlanName'))]",
        "siteConfig": {
          "linuxFxVersion": "[parameters('linuxFxVersion')]"
        }
      }
    }
  ],
  "outputs": {
    "storageEndpoint": {
      "type": "object",
      "value": "[reference(variables('uniqueStorageName')).primaryEndpoints]"
    }
  }
}

```

</details>


### ARM Parameter File

In **ARM Parameter File**, link to your template parameters.

Harness accept ARM template parameters is a specific JSON format.

Typically, a parameters JSON file includes the `$schema` key to specify the location of the JSON schema file, and the `contentVersion` to specify the version of the template:

```json

{  
  "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentParameters.json#",  
  "contentVersion": "1.0.0.0",  
  "parameters": {  
    "adminUsername": {  
      "value": "johnsmith"  
    },  
    "adminPassword": {  
      "value": "m2y&oD7k5$eE"  
    },  
    "dnsLabelPrefix": {  
      "value": "genunique"  
    }  
  }  
}

```

When you use parameters text or files with Harness, you must remove the `$schema` and `contentVersion` keys.

Harness provisioning requires you remove these keys due to limitations in the Azure Java SDK and REST APIs. Only the parameter object key:value pairs are allowed.

Using the example above, the parameters would be provided like this in Harness:

```json

{  
    "adminUsername": {  
      "value": "johnsmith"  
    },  
    "adminPassword": {  
      "value": "m2y&oD7k5$eE"  
    },  
    "dnsLabelPrefix": {  
      "value": "genunique"  
    }  
}

```

### Scope

In **Scope**, enter the scope for the template. The schema link in the template identifies the template scope:

1. Resource group: "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#"
2. Subscription: "$schema": "https://schema.management.azure.com/schemas/2018-05-01/subscriptionDeploymentTemplate.json#"
3. Management group: "$schema": "https://schema.management.azure.com/schemas/2019-08-01/managementGroupDeploymentTemplate.json#"
4. Tenant: "$schema": "https://schema.management.azure.com/schemas/2019-08-01/tenantDeploymentTemplate.json#"

### Subscription

In **Subscription**, select the Azure subscription for the provisioned resources.

### Resource Group

In **Resource Group**, select the resource group for the provisioned resources.

### Mode

In **Mode**, select **Incremental** or **Complete**. This is the same as entering the `--mode` parameter in the `az deployment group create` command.

Incremental mode is supported for all Scope types (Subscription, Resource group, Management group, Tenant) and Complete mode is supported for Resource group only.For more information, see [Azure Resource Manager deployment](https://docs.microsoft.com/en-us/azure/azure-resource-manager/templates/deployment-modes) modes from Azure.

## Azure ARM Rollback step

The Azure ARM Rollback step rolls back provisioning performed by the Create Azure ARM Resources step.

### Provisioner Identifier

To rollback the Azure ARM provisioning performed by a Create Azure ARM Resources step, you add a Azure ARM Rollback step and reference the **Provisioner Identifier** from the Create Azure ARM Resources step.

### Important notes

- **Only Resource Group scope rollback is supported**: rollbacks are supported for Create Azure ARM Resources steps using the **Resource Group** scope only.
  
  If you choose a scope other than Resource Group in the Create Azure ARM Resources step and reference the step's **Provisioner Identifier** in the Azure ARM Rollback step, rollback fails.
- **Storage account not supported for resource group rollback**: if the ARM template used to create a resource group has a storage account (`Microsoft.Storage/storageAccounts`), then rollback fails for that storage account.
  
  This is because the template generated from Azure is not valid. During rollback you might see an error like this:

  ```
  [Resource - [Microsoft.Storage/storageAccounts/fileServices - storagewfvariables1234/default], failed due to - [{error={code=InvalidXmlDocument,message=XML specified is not syntactically valid. RequestId:0000-001a-0064-000-103dcd000000 Time:2021-03-03T12:25:02.5619016Z}}] 
  ```

### Rollback summary

When running a Harness stage that performs provisioning using an ARM template, Harness generates a template of the existing resource group and saves it before starting ARM deployment.

You can see Harness saving the template in the log of the Create Azure ARM Resources step:

```
Starting template validation  
Saving existing template for resource group - [harness-arm-test]   
Starting ARM Deployment at Resource Group scope ...   
Resource Group - [harness-arm-test]  
Mode - [INCREMENTAL]  
Deployment Name - [harness_558_1616014910588]  
ARM Deployment request send successfully

```

During rollback, this template is used to restore the resource group to its state before the deployment started:

```
Starting ARM Rollback at Resource Group scope ...   
Resource Group - [anil-harness-arm-test]  
Mode - [COMPLETE]  
Deployment Name - [harness_rollback_367_1616019421845]  
ARM Rollback request send successfully
```


## Advanced step settings

In the **Advanced** tab in all of steps, you can use the following options:

* [Delegate Selector](https://developer.harness.io/docs/platform/delegates/manage-delegates/select-delegates-with-selectors/)
* [Conditional Execution](https://developer.harness.io/docs/platform/pipelines/w_pipeline-steps-reference/step-skip-condition-settings/)
* [Failure Strategy](https://developer.harness.io/docs/platform/pipelines/w_pipeline-steps-reference/step-failure-strategy-settings/)
* [Looping Strategy](https://developer.harness.io/docs/platform/pipelines/looping-strategies-matrix-repeat-and-parallelism/)
* [Policy Enforcement](https://developer.harness.io/docs/platform/governance/policy-as-code/harness-governance-overview/)