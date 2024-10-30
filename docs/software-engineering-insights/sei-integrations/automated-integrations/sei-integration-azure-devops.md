---
title: SEI Azure DevOps integration
description: Integrate SEI with Azure DevOps.
sidebar_position: 20
sidebar_label: Azure DevOps
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Azure DevOps (ADO) is a Microsoft product that provides version control, reporting, requirements management, project management, automated builds, testing and release management capabilities. It covers the entire application lifecycle, and enables DevOps capabilities.

Use the SEI Azure DevOps Services integration to integrate SEI with ADO Services. SEI ingests pipelines, Git repos, Team Foundation Version Control (TFVC), and Azure Boards data from ADO Services.

Azure DevOps Services is a cloud offering. To integrate with the on-premises offering, Azure DevOps Server, you must use an [Ingestion Satellite](/docs/software-engineering-insights/sei-ingestion-satellite/satellite-overview).

:::note
Please note that the new onboarding experience for the Azure DevOps integration, with Personal Access Token (PAT) authentication is currently in BETA and requires the `<SEI_IS_AZURE_NEW_ONB_ENABLED>` Feature Flag. Contact [Harness Support](mailto:support@harness.io) to enable it.
:::

## Requirements

The following permissions and settings are required to use the **SEI AzureDevOps Services integration**:

<Tabs>
   <TabItem value = "OAuth" label = "OAuth" default>

* You have registered for Azure DevOps Services and created organizations and projects in ADO.
* All SEI-relevant ADO projects use **Git** for version control.
* You have enabled **Third-party application access via OAuth** in your [ADO organization policies](https://learn.microsoft.com/en-us/azure/devops/organizations/accounts/change-application-access-policies?view=azure-devops).
* Your Azure DevOps account has one of the following access levels: **Basic**, **Basic + Test Plans**, or **Visual Studio Professional/Enterprise**. For more information, go to the Microsoft documentation on [Azure DevOps Access Levels](https://docs.microsoft.com/en-us/azure/devops/organizations/security/access-levels?view=azure-devops#supported-access-levels).
* You have **Reader** permission (or higher) for all SEI-relevant Azure DevOps projects. For more information, go to the Microsoft documentation on [Azure DevOps Permissions](https://docs.microsoft.com/en-us/azure/devops/organizations/security/permissions-access?view=azure-devops).

<figure>

![](../static/azure-devops-user-permissions.png)

<figcaption>Permissions for an Azure DevOps user who can access two projects and can't access a third project.</figcaption>
</figure>

</TabItem>

<TabItem value = "PAT" label = "Personal Access Token">

Before you configure the **SEI AzureDevOps integration**, you must generate a **Personal Access Token.**

1. Sign in to your **Azure DevOps organisation** with **Microsoft account** using the following url: `https://dev.azure.com/{yourorganisation}`
2. Navigate to your **User Settings**:
   1. Click on your profile picture in the top right corner.
   2. Select **Security** from the dropdown menu.
   3. Under **Personal Access Tokens**, click on the **+ New Token** button.
3. In the Organization dropdown, select **All accessible organizations**.
4. Configure the **Scopes** by choosing the required level of access for the token as given below.

![](../static/ado-pat-permissions.avif)

</TabItem>
</Tabs>

## Configure the integration

<Tabs>
   <TabItem value = "OAuth" label = "OAuth" default>

1. In your **Harness Project**, select the **SEI Module**, and go to your **Account**.
2. Select **Integrations** under **Data Settings**.
3. Select **Available Integration**, locate the **Azure DevOps Services** integration, and select **Install**.
4. Configure and save the integration.

   * If you are redirected to Azure DevOps, sign in with your user credentials. Azure DevOps uses OAuth authentication.
   * Enter a **Name** for the integration.
   * The **Description** and **Tags** are optional.
   * Identify Azure DevOps **Organizations** to associate with the integration. If unspecified, the integration associates all available organizations. Available organizations are organizations that the authenticated user can access.

</TabItem>
   <TabItem value = "PAT" label = "Personal Access Token">

1. Select **Integrations** under **Data Settings**.
2. Select **Available Integration**, locate the **Azure DevOps Services integration**, and select **Install**.
3. Choose the authentication type as **Using Personal Access Token (PAT)** and click on **Next** in the instructions page.
4. Configure and **save** the integration.
   * Enter a **Name** for the integration.
   * The **Description** and **Tags** are optional.
   * Add the **Personal Access Token** you previously generated in Azure DevOps.
   * Select the specific Azure DevOps services you want to integrate:
     * Azure Boards
     * Azure Pipelines
     * Azure Repos
   * Click on **Validate Connection** to validate the connection, and once successful, you'll have the integration set up under the **Your Integrations** tab.

:::info
Note: Different integrations will be automatically created for various Azure DevOps services. For example:

* Azure integration - Boards for Azure Boards
* Azure integration - Pipelines for Azure DevOps Pipelines
* Azure integration - Repos for Azure DevOps Repos

:::
</TabItem>
</Tabs>

<details>

<summary>Known Issues</summary>

**Limitations in the AzureDevops integration**

1. Data for the following widgets (duration metrics) is not available:
   * CICD Job Duration Report
   * CICD Job Duration Single Stat
   * CICD Job Duration Trend Report
   * CICD Pipeline Jobs Duration Report
   * CICD Pipeline Jobs Duration Trend Report
2. The integration does not accurately reflect the pipeline stage status.
3. Lead time widgets are not supported on this integration

</details>

:::note
Please note that after adding an integration and for each subsequent data sync, it may take up to **24 hours** for the data to be fully reflected on SEI. This means that any widgets you configure on Insights using this integration **may not display data until the synchronization is completed.**
:::