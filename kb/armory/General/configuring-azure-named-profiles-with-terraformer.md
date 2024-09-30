---
title: Configuring Azure Named profiles with Terraformer
---

## Introduction
Customers may want to deploy to Azure targets in Spinnaker and create resources.  A method Administrators can use is to configure Armory Terraformer to create resources in Azure.

## Prerequisites
Administrators will need to have an existing Azure account and appropriate permissions.  
The Armory CDSH environment should also have [Terraformer and Named Profiles set up and configured](https://docs.armory.io/continuous-deployment/armory-admin/terraform-enable-integration/#named-profiles).
Below, we will advise about how to:
Create a Service Principal in the Azure Portal
Create an Application in the Azure Active DirectoryGenerate a Client Secret for the Azure Active Directory ApplicationGrant the Application access to manage resources in the Azure Subscription
Spinnaker - Terraformer configuration

## Instructions
[Azure Provider: Authenticating using a Service Principal with a Client Secret](#azureprovider) | [Creating a Service Principal in the Azure Portal](#serviceprincipal) | [Spinnaker - Terraformer Configuration](#terraformerconfig)
## Azure Provider: Authenticating using a Service Principal with a Client Secret
A Service Principal is an application within Azure Active Directory whose authentication tokens can be used as the **```client_id```**, **```client_secret```**, and **```tenant_id```** fields needed by Terraformer (**```subscription_id```** can be independently recovered from the Azure account details).
It’s possible to complete this task in the Azure CLI or the Azure Portal.  Both require the Service Principal to have the **```Contributor```** rights to the subscription.  Depending on the configuration, administrators can assign other roles based on the company security policy.  This change is not covered in this guide.  Also, using Azure CLI is beyond the scope of this tutorial, but administrators can refer to the following [guide from Microsoft](https://learn.microsoft.com/en-us/cli/azure/create-an-azure-service-principal-azure-cli) for further reading.
## **Creating a Service Principal in the Azure Portal**
There are three tasks necessary to create a Service Principal using [the Azure Portal](https://portal.azure.com/):
* Create an Application in Azure Active Directory, which will create an associated Service Principal* Generating a Client Secret for the Azure Active Directory Application, which will be used to authenticate* Grant the Service Principal access to manage resources in the Azure subscriptions
### **1.  Creating an Application in Azure Active Directory**
* First, navigate to [the **Azure Active Directory** overview](https://portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/Overview) within the Azure Portal - [then select the **App Registration** blade](https://portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/RegisteredApps/RegisteredApps/Overview).  Click the **New registration** button at the top to add a new Application within Azure Active Directory.On this page, set the following values, then press **Create**:
* **Name** - ta friendly identifier and can be anything (e.g., “Terraformer-Named-Profile”)* **Supported Account Types** - set to “Accounts in this organizational directory only (single-tenant).”* **Redirect URI** - choose “Web” for the URI type.  The actual value can be left blank.
* At this point, the newly created Azure Active Directory application should be visible on-screen.  If not, navigate to the [**App Registration** blade](https://portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/RegisteredApps/RegisteredApps/Overview) and select the Azure Active Directory application.* At the top of this page, please take note of the “Application (client) ID” and the “Directory (tenant) ID,” which will be used for the values of **```client_id```** and **```tenant_id```** respectively in upcoming steps.
### **2.  Generating a Client Secret for the Azure Active Directory Application**
* Now that the Azure Active Directory Application exists, we can create a Client Secret which can be used for authentication.* To do this, select ```Certificates & secrets```.  This screen displays the Certificates and Client Secrets (i.e., passwords) associated with this Azure Active Directory Application.* On this screen, we can generate a new Client Secret by clicking the ```New client secret``` button, then entering a Description and selecting an Expiry Date, and then pressing ```Add```.  Once the Client Secret has been generated, it will be displayed on the screen.  *This information is only displayed once,* so please copy it now.  Otherwise, it must be regenerated.  This value is the **```client_secret```** value necessary for future steps.
### **3.  Granting the Application access to manage resources in the Azure Subscription**
* Once the Application exists in Azure Active Directory - we can grant it permission to modify resources in the Subscription.* To do this, [navigate to the **Subscriptions** blade within the Azure Portal](https://portal.azure.com/#blade/Microsoft_Azure_Billing/SubscriptionsBlade), select the Subscription to be used, click **Access Control (IAM)**, and finally, **Add** > **Add role assignment**.* Specify a Role that grants the appropriate permissions needed for the Service Principal (for example, **```Contributor```** will give Read/Write on all resources in the Subscription).  There’s more information about [the built-in roles available on Microsoft’s website](https://docs.microsoft.com/azure/role-based-access-control/built-in-roles).* Search for and select the name of the Service Principal created in Azure Active Directory to assign it this role - then press **Save**.
## Spinnaker - Terraformer configuration
The Spinnaker configuration for Terraformer needs the following secrets defined.
* ```**ARM_CLIENT_ID**``` = The Application ID.  Administrators can retrieve the information from the [Enterprise Applications blade](https://portal.azure.com/#view/Microsoft_AAD_IAM/StartboardApplicationsMenuBlade/~/AppAppsPreview/menuId~/null) or after the Application is generated in Azure Active Directory.* ```**ARM_CLIENT_SECRET**``` = The client secret that is generated from **Certificates & secrets.*** **```ARM_SUBSCRIPTION_ID```** = Subscription ID in Azure.* **```ARM_TENANT_ID```** = Tenant ID in Azure.
For security reasons and ease of maintenance, it is strongly suggested not to add sensitive information directly to Spinnaker’s manifest and instead use Spinnaker’s secrets.  One path forward can be using Kubernetes secrets, as detailed in Armory’s documentation [here](https://docs.armory.io/continuous-deployment/armory-admin/secrets/secrets-kubernetes/).
### Example configuration manifest
The configuration below is a sample of how to set up Fiat to limit the scope when using the Azure Profile.
apiVersion: spinnaker.armory.io/v1alpha2
kind: SpinnakerService
metadata:
  name: spinnaker
spec:
  spinnakerConfig:
    profiles:
      terraformer:
        fiat:
          enabled: true
          baseUrl: http://spin-fiat:7003
        redis:
          baseUrl: redis://spin-redis:6379
        profiles:
          - name: azure-profile
            variables:
              - kind: static
                options:
                  name: ARM_CLIENT_ID
                  value: encrypted:k8s!n:!k:
              - kind: static
                options:
                  name: ARM_CLIENT_SECRET
                  value: encrypted:k8s!n:!k:
              - kind: static
                options:
                  name: ARM_SUBSCRIPTION_ID
                  value: encrypted:k8s!n:!k:
              - kind: static
                options:
                  name: ARM_TENANT_ID
                  value: encrypted:k8s!n:!k:
            permissions:
            - spinnaker-admin
            - spinnaker-ops


