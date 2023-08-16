---
title: Azure Blueprint
description: Use Blueprint to provision resources in Azure.
sidebar_position: 6
---

Harness has first-class support for [Azure Blueprints](https://learn.microsoft.com/en-us/azure/governance/blueprints/overview) as an infrastructure and resource provisioner.

You can use Blueprints to provision Azure resources that adhere to your organization's standards, patterns, and requirements. You can package ARM templates, resource groups, policy and role assignments, and much more into a Blueprint. See [this video](https://www.youtube.com/watch?v=cQ9D-d6KkMY) from Microsoft Developer for more details.

This topic provides steps on using Harness to provision a target environment or resources using Blueprint.

## Important notes

* Blueprint provisioning is only supported for provisioning Azure resources.
* Harness supports the following scope types:
	+ Tenant
	+ Management Group
	+ Subscription
	+ Resource Group
* Harness Blueprint provisioning is supported in Basic and Canary deployments, and Blue-Green deployments that [deploy Azure Web Apps](/docs/continuous-delivery/deploy-srv-diff-platforms/azure/azure-web-apps-tutorial).
* **Azure Web App deployment targets only:** you can use Blueprint with Harness to provision any Azure resources, but deployment target provisioning is limited to Azure Web App deployments.
* Incremental mode is supported for all Scope types (Subscription, Resource group, Management group, Tenant) and Complete mode is supported for Resource group only.
* Blueprint templates must be in JSON. Bicep isn't supported.
* Rollback is supported for the Resource group scope only.


### Azure roles required

See Blueprint in [Add a Microsoft Azure connector](https://developer.harness.io/docs/platform/connectors/cloud-providers/add-a-microsoft-azure-connector/).

### Harness role permissions required

- **Environments**: `View/Create`, `Edit`, `Access`, `Delete`.

## Azure Blueprint provisioning summary

Harness provisioning is categorized into the following use cases:
- **Ad hoc provisioning:** temporary and on-demand provisioning of resources for specific tasks or purposes.
- **Dynamic infrastructure provisioning:** provision the target deployment environment as part of the same deployment process. Typically, dynamic infrastructure provisioning is for temporary pre-production environments, such as dev, test, and qa. Production environments are usually pre-existing. 

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

You don't need to deploy artifacts via Harness services to use Azure Blueprint provisioning in a stage.

You can simply set up an Azure Blueprint provisioner and use it in a stage to provision infrastructure without deploying any artifact.

### Service Instances (SIs) consumption

Harness Service Instances (SIs) aren't consumed and no other licensing is required when a Harness stage uses Azure Blueprint to provision resources.

When Harness deploys artifacts via Harness services to the provisioned infrastructure in the same stage or pipeline, SIs licensing is consumed.

## Create Azure BP Resources step

The Create Azure BP Resources step provisions infrastructure and resources using a template file that you provide.

To add the Create Azure BP Resources step, do the following:

1. In your Harness CD Deploy stage, add the **Create Azure BP Resources** step.
   1. If you are using the step for dynamic infrastructure provisioning, add/configure the step in the stage **Environment** tab.
   2. If you are using the step for ad hoc provisioning, add/configure the step in the stage **Execution** tab.
2. Configure the step using the settings described below.

### Azure Connector

Select or create the Harness Azure connector for Harness to use when connecting to Azure and provisioning with the template.

### Scope

Select **Subscriptions** or **Management Groups**.

The `targetScope` in the blueprint identifies its scope.

Your `assign.json` file must have a `scope` property (`properties.scope`). 

The scope is the target subscription of the blueprint assignment (format: `/subscriptions/{subscriptionId}`). 

For management group level assignments, the property is required.

For example:

```json

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

By assigning the blueprint at the subscription level, the resources and configurations defined within the blueprint are applied to that particular subscription. This allows you to enforce standardization and consistency within the specific Azure environment you're targeting.

While Azure Management Groups provide a way to organize and manage multiple subscriptions, the blueprint itself is not directly assigned to a Management Group. However, the policies and RBAC assignments within the blueprint can be inherited by Management Groups and their associated subscriptions. This means that when a blueprint is applied to a subscription within a Management Group, the policies and RBAC settings defined in the blueprint can propagate to that subscription and its resources.

### Assignment Name

Enter the unique name to give the assignment of the blueprint. 

When you assign a blueprint to a subscription, you provide an assignment name to identify that specific assignment instance.

The **Assignment Name** should be unique within the scope of the subscription where the blueprint is being assigned. This means that each blueprint assignment within a subscription should have a distinct assignment name.

### Azure Blueprint Template

Add the Blueprint template file to use for provisioning.

<details>
<summary>Example: Blueprint template file</summary>

The following example provides a blueprint description, specifies the target scope as the subscription level, includes parameters for RBAC assignment and storage account type, and defines a resource group artifact with an optional description.

```json

{
    "properties": {
        "description": "This will be displayed in the essentials, so make it good",
        "targetScope": "subscription",
        "parameters": {
            "principalIds": {
                "type": "string",
                "metadata": {
                    "displayName": "Principal IDs",
                    "description": "This is a blueprint parameter that any artifact can reference. We'll display these descriptions for you in the info bubble. Supply principal IDs for the users, groups or service principals for the RBAC assignment",
                    "strongType": "PrincipalId"
                }
            },
            "storageAccountType": {
                "type": "string",
                "defaultValue": "Standard_GRS"
            }
        },
        "resourceGroups": {
            "SingleRG": {
                "description": "An optional description for your RG artifact. FYI location and name properties can be left out and we will assume they are assignment-time parameters"
            }
        }
    },
    "type": "Microsoft.Blueprint/blueprints"
}

```

</details>

## Advanced step settings

In **Advanced**, you can use the following options:

* [Delegate Selector](https://developer.harness.io/docs/platform/delegates/manage-delegates/select-delegates-with-selectors/)
* [Conditional Execution](https://developer.harness.io/docs/platform/pipelines/w_pipeline-steps-reference/step-skip-condition-settings/)
* [Failure Strategy](https://developer.harness.io/docs/platform/pipelines/w_pipeline-steps-reference/step-failure-strategy-settings/)
* [Looping Strategy](https://developer.harness.io/docs/platform/pipelines/looping-strategies-matrix-repeat-and-parallelism/)
* [Policy Enforcement](https://developer.harness.io/docs/platform/governance/policy-as-code/harness-governance-overview/)