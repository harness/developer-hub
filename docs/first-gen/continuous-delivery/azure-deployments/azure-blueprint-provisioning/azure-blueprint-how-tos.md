---
title: Azure Blueprint How-tos
description: Harness has first-class support for Azure Blueprints as an infrastructure provisioner. Harness takes a Blueprint definition, publishes it using the version specified in assign.json file, and creates…
sidebar_position: 100
helpdocs_topic_id: sq1xy00oaa
helpdocs_category_id: 4on0a5avqo
helpdocs_is_private: false
helpdocs_is_published: true
---

Harness has first-class support for Azure Blueprints as an infrastructure provisioner.

Harness takes a Blueprint definition, publishes it using the version specified in assign.json file, and creates the assignment.

See the following Blueprint How-tos:

* [Set Up Your Harness Account for Azure Blueprint](set-up-harness-for-azure-blueprint.md)
* [Add Azure Blueprints to Harness](add-azure-blueprints-to-harness.md)
* [Provision using Azure Blueprint Definitions](provision-using-azure-blueprint-definitions.md)

For a conceptual overview of provisioning with ARM and Blueprints, including videos, see [Azure ARM and Blueprint Provisioning with Harness](../../concepts-cd/deployment-types/azure-arm-and-blueprint-provision-with-harness.md).

### Limitations

* Rollback is not supported for Azure Blueprints.
* All information about the assignment must be provided in assign.json file.
* "Unassignment" and updating already exiting Blueprints assignments is not supported.
* Azure Blueprint outputs cannot be referenced as variables in Harness. This limitation is the result of there being no outputs available when the Blueprint assignment is done. It is not supported by Azure. Consequently, Azure Blueprint cannot be used for mapping dynamically provisioned infrastructure while creating Harness Infrastructure Definitions.
* Before reviewing JSON requirements and limitations, let's review the key parameters:
	+ `identity`: Blueprint uses a managed identity to deploy the artifacts specified by the Blueprint definition. It can use the `SystemAssigned` or `UserAssigned` value.
	+ `location`: - Blueprint uses a managed Identity to deploy resources, which requires a location.
	+ `blueprintId`: for example: `/providers/Microsoft.Management/managementGroups/HarnessARMTest/providers/Microsoft.Blueprint/blueprints/101-boilerplate-mng/versions/v1.` Here is a description of each part:
	+ `/providers/Microsoft.Management/managementGroups/HarnessARMTest`: Blueprint definition scope including management group name that is `HarnessARMTest`.
	+ `/providers/Microsoft.Blueprint/blueprints/`: default Blueprint provider information.
	+ `101-boilerplate-mng`: Blueprint definition name.
	+ `v1`: new Blueprint version number.
	+ `locks`: determines whether users, groups, and service principals with permissions can modify and delete resources deployed by the Blueprint service principal.
	+ `parameters`: list of dynamic parameters that are applied to resources during deployment. See [Creating dynamic blueprints through parameters](https://docs.microsoft.com/en-us/azure/governance/blueprints/concepts/parameters) from Azure.
	+ `scope`: the subscription where blueprint definition will be assigned.
* Your assign.json file must have a `scope` property (`properties.scope`) for management group level assignments. The `scope` is the target subscription of the Blueprint assignment (format: `/subscriptions/{subscriptionId}`). For management group level assignments, the property is required.  
For example:
```
{  
    "identity": {  
    "type": "SystemAssigned"  
    },  
    "location": "westus2",  
    "properties": {  
    "blueprintId": "/providers/Microsoft.Management/managementGroups/HarnessARMTest/providers/Microsoft.Blueprint/blueprints/101-boilerplate-mng/versions/v2",  
    "resourceGroups": {  
        "SingleRG": {  
        "name": "mng-001",  
        "location": "eastus"  
        }  
    },  
    "locks": {  
        "mode": "none"  
    },  
    "parameters": {  
        "principalIds": {  
        "value": "0000000-0000-0000-0000-0000000000"  
        },  
        "genericBlueprintParameter": {  
        "value": "test"  
        }  
    },  
    "scope": "/subscriptions/0000000-0000-0000-0000-0000000000"  
    }  
}
```
  
The `scope` property is required for deployment using management groups. If the Blueprint definition begins with `/providers/Microsoft.Management/managementGroups/{managmentGroupName}` , the definition will be created at the management group scope, but the assignment is done at the subscription in `scope`.
* The subscription provided in the `scope` property must be a descendant of the management group provided in the `blueprintId`.
* `blueprintId` must follow the next pattern `/{resourceScope}/providers/Microsoft.Blueprint/blueprints/{blueprintName}/versions/{versionId}`. If not, an exception is thrown.
* If the Blueprint definition is created and published at the management group scope, Harness only supports assignment to one subscription during deployment. Harness doesn't support assignment to multiple subscriptions. You can only state one subscription as the value of `scope` property in the assign.json file.
* The assignment name is generated automatically.
* The artifacts name is taken from artifact `name` property in artifact.json. If `name` doesn’t exist in artifact.json, the file name is used. The artifact name is important because of its use with the `dependsOn` property. See [Understand the deployment sequence in Azure Blueprints](https://docs.microsoft.com/en-us/azure/governance/blueprints/concepts/sequencing-order) from Azure.
* If the blueprint.json file contains the `name` property and that name is not the same as the `name` provided in the assign.json file, this error message is shown:
```
Not match blueprint name found in blueprint json file with properties.blueprintId property in assign json file.  
Found name in blueprint json: boilerplate-101, and properties.blueprintId: boilerplate-201"
```
* If `identity` has the `SystemAssigned` value, then the Azure service principal used for the Harness Azure Cloud Provider must have the **Owner** role in the subscription where the assignment will be created. If the service principal uses a System-assigned user identity, then you are responsible for managing the right and lifecycle of a user-managed identity.
* During deployment, each Workflow checks whether the version number specified in the assign.json file already exits on Azure.  
If the version does already exist, only a new assignment will be created.  
If the version does not exist, the deployment process (creating or updating Blueprint definition and artifacts, publishing, and assignment) starts.

### Azure Roles Required

See **Azure Blueprint** in [Add Microsoft Azure Cloud Provider](https://docs.harness.io/article/4n3595l6in-add-microsoft-azure-cloud-provider).

### Harness Permissions Required

To set up a Harness Blueprint Provisioner, your Harness User account must belong to a User Group with the following Application Permissions:

* **Permission Type:** `Provisioners`.
* **Application:** one or more Applications.
* **Filter:** `All Provisioners`.
* **Action:** `Create, Read, Update, Delete`.

