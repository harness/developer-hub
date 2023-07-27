---
title: SEI Azure DevOps integration
description: Integrate SEI with Azure DevOps.
sidebar_position: 20
sidebar_label: Azure DevOps
---

Azure DevOps (ADO) is a Microsoft product that provides version control, reporting, requirements management, project management, automated builds, testing and release management capabilities. It covers the entire application lifecycle, and enables DevOps capabilities.

Use the SEI Azure DevOps Services integration to integrate SEI with ADO Services. SEI ingests pipelines, Git repos, Team Foundation Version Control (TFVC), and Azure Boards data from ADO Services.

Azure DevOps Services is a cloud offering. To integrate with the on-premises offering, Azure DevOps Server, you must use the [generic SEI integration](./sei-connector-generic.md).

## Requirements

The following permissions and settings are required to use the SEI ADO Services integration:

* You have registered for Azure DevOps Services and created organizations and projects in ADO.
* All SEI-relevant ADO projects use **Git** for version control.
* You have enabled **Third-party application access via OAuth** in your [ADO organization policies](https://learn.microsoft.com/en-us/azure/devops/organizations/accounts/change-application-access-policies?view=azure-devops).
* Your Azure DevOps account has one of the following access levels: **Basic**, **Basic + Test Plans**, or **Visual Studio Professional/Enterprise**. For more information, go to the Microsoft documentation on [Azure DevOps Access Levels](https://docs.microsoft.com/en-us/azure/devops/organizations/security/access-levels?view=azure-devops#supported-access-levels).
* You have **Reader** permission (or higher) for all SEI-relevant Azure DevOps projects. For more information, go to the Microsoft documentation on [Azure DevOps Permissions](https://docs.microsoft.com/en-us/azure/devops/organizations/security/permissions-access?view=azure-devops).

<figure>

![](./static/azure-devops-user-permissions.png)

<figcaption>Permissions for an Azure DevOps user who can access two projects and can't access a third project.</figcaption>
</figure>

## Configure the integration

1. In your Harness project, go to the SEI module, and select **Account**.
2. Select **SEI Integrations** under **Data Settings**.
3. Select **Available Integration**, locate the **Azure DevOps Services** integration, and select **Install**.
4. Configure and save the integration.

   * If you are redirected to Azure DevOps, sign in with your user credentials. Azure DevOps uses OAuth authentication.
   * Enter a **Name** for the integration.
   * The **Description** and **Tags** are optional.
   * Identify Azure DevOps **Organizations** to associate with the integration. If unspecified, the integration associates all available organizations. Available organizations are organizations that the authenticated user can access.
