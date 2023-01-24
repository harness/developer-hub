---
title: Azure Resource Management (ARM) How-tos
description: Harness has first-class support for Azure Resource Manager (ARM) templates as an infrastructure provisioner. You can use ARM templates to provision the deployment target environment in Azure, or to s…
sidebar_position: 100
helpdocs_topic_id: qhnnq1mks3
helpdocs_category_id: 3i7h1lzlt2
helpdocs_is_private: false
helpdocs_is_published: true
---

Harness has first-class support for [Azure Resource Manager (ARM) templates](https://docs.microsoft.com/en-us/azure/azure-resource-manager/templates/overview) as an infrastructure provisioner.

You can use ARM templates to provision the deployment target environment in Azure, or to simply provision any Azure infrastructure.

See the following ARM How-tos:

* [Set Up Your Harness Account for Azure ARM](set-up-your-harness-account-for-azure-arm.md)
* [Add Azure ARM Templates to Harness](add-azure-arm-templates.md)
* [Provision and Deploy to ARM Provisioned Infrastructure](target-azure-arm-or-blueprint-provisioned-infrastructure.md)
* [Provision Resources using a Harness ARM Infrastructure Provisioner](provision-using-the-arm-blueprint-create-resource-step.md)
* [Use Azure ARM Template Outputs in Workflow Steps](use-azure-arm-and-blueprint-parameters-in-workflow-steps.md)
* [Azure ARM Rollbacks](azure-arm-rollbacks.md)

For a conceptual overview of provisioning with ARM and Blueprints, including videos, see [Azure ARM and Blueprint Provisioning with Harness](../../concepts-cd/deployment-types/azure-arm-and-blueprint-provision-with-harness.md).

### Limitations

* Harness supports the following scope types:
	+ Tenant
	+ Management Group
	+ Subscription
	+ Resource Group
* Harness ARM Template provisioning is supported in Canary and Multi-Service Workflows, and Blue/Green Workflows that [deploy Azure Web Apps](../azure-webapp-category/azure-web-app-deployments-overview.md).  
If you simply want to provision infrastructure without deploying any resources to the provisioned infrastructure, simply use a Canary Workflow and an **ARM/Blueprint Create Resource** step in its **Pre-deployment Steps** and omit any further phases and steps.
* **Azure Web App deployment targets only:** you can use ARM templates with Harness to provision any Azure resources, but deployment target provisioning is limited to Azure Web App deployments.  
A deployment target is defined in the Infrastructure Definition used by a Workflow (or Workflow Phase). In an Infrastructure Definition that uses the Microsoft Azure **Cloud Provider Type**, you will only see **Map Dynamically Provisioned Infrastructure** if you select **Azure Web Application** in **Deployment Type**.  
See [Provision and Deploy to ARM Provisioned Infrastructure](target-azure-arm-or-blueprint-provisioned-infrastructure.md).
* Incremental mode is supported for all Scope types (Subscription, Resource group, Management group, Tenant) and Complete mode is supported for Resource group only.
* ARM templates must be in JSON. Bicep isn't supported.
* Rollback is supported for the Resource group scope only. See [Azure ARM Rollbacks](azure-arm-rollbacks.md).

### Azure Roles Required

See **Azure Resource Management (ARM)** in [Add Microsoft Azure Cloud Provider](https://docs.harness.io/article/4n3595l6in-add-microsoft-azure-cloud-provider).

### Harness Permissions Required

To set up a Harness ARM Provisioner, your Harness User account must belong to a User Group with the following Application Permissions:

* **Permission Type:** `Provisioners`.
* **Application:** one or more Applications.
* **Filter:** `All Provisioners`.
* **Action:** `Create, Read, Update, Delete`.

