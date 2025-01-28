---
title: SCIM for Microsoft Entra ID
sidebar_label: SCIM for Microsoft Entra ID
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/12386431119245-SCIM-for-Microsoft-Entra-ID <br /> ✘ images still hosted on help.split.io </button>
</p>

System for Cross-domain Identity Management (SCIM) is an open standard that allows admins to automate user and group provisioning. SCIM communicates user and group information between identity providers (e.g., Okta, AzureAD) and service providers requiring user and group information (Split). With SCIM, IT administrators can govern Split users and groups within their own identity provider.

# Enabling SCIM for Azure AD

You can enable SCIM user provisioning to work with your SSO-Strict mode enabled Split account. SCIM facilitates user provisioning which allows your IdP to create, update, and deactivate members in Split. You can:

* Enable SCIM for your Split organization
* Connect Split to Azure AD
* Create and manage users and groups in Split directly from Azure AD 

Once SCIM is enabled for your organization:

* You must add new users in AzureAD to give them access to Split. You can’t invite new users to Split. Any existing open invites are revoked.
* User management actions such as deactivate and activate are disabled in Split. Azure AD administrators control the user management within Azure AD.
* Be aware that the display or user name of the users reflects the username in Azure AD and cannot be edited in Split.
* Groups that are synced from AzureAD are uneditable in Split. If you want to change the members in a group, the AzureAD administrators can add them.
* Split_Administrators is a reserved group name. Use this group name in AzureAD to map it to Administrators on the Split side.

# Enabling SCIM for your Split organization

**Note: As a prerequisite, you must enable SAML in SSO Strict mode to use this capability. Refer to the [Single sign-on with Azure](https://help.split.io/hc/en-us/articles/360021124931-Single-sign-on-with-Azure) guide to enable SAML before configuring SCIM.**

To enable SCIM for your organization, do the following:

1. From the left navigation, select **Admin settings** and then **Security**. Click the SCIM tab on the Security Settings page.
2. From the IDP menu list, select **Azure AD**. Click the SCIM toggle to **On**. 
3. The SCIM enable modal appears. The following information displays and must be copied:

   * The access token. Be sure to copy and store this token in a safe location as you won’t be able to access this token again. This only displays once. If you do lose it, you can regenerate a new token.
   * SCIM connector base URL.

   <p>
    <img src="https://help.split.io/hc/article_attachments/12392400520845" alt="scim-enabled.png" />
   </p>

**Note: For security reasons, the access token is valid for one year from the time it is created. At the end of this period, Administrators should regenerate this token and update Azure AD with the new token to continue using the SCIM functionality.**

# Connecting Split to Azure AD

To connect Split to AzureAD, do the following:

**Notes:** 
* **Only an Azure administrator can do the following setup on the Azure’s Split Enterprise app.**
* **The group name Administrators is a reserved keyword in Split and cannot be overridden. It must have at least one member. Group name Split_Administrators on AzureAD maps to Administrators on Split.**

1. Log into your Azure administrator account in your Azure AD Admin Center. Click **All Services and Enterprise Applications**, and then **Split**. This should already be set up for you if you enabled SAML. 
2. From the left navigation, click **Provisioning** and then **Get started** to begin setting up SCIM for your Split App.  

<p>
  <img src="https://help.split.io/hc/article_attachments/12392563310605" alt="provisioning-menu.png" />
</p>

3. Select the Provisioning Mode as **Automatic** and copy over the SCIM Base Connector URL from Split into Tenant URL and Access Token from Split into the Secret Token field. 

<p>
  <img src="https://help.split.io/hc/article_attachments/12392633988237" alt="select-provisioning-mode.png" />
</p>

4. Click the **Test Connection** button and then **Save**. You receive a message indicating that the supplied credentials are authorized to enable provisioning. The mappings and settings sections are now available.
5. Click **Mappings** and click **Provision Azure Active Directory Users** to change the user settings. 
6. Click attribute **mail** and change source attribute to userPrincipalName or originalUserPrincipalName. The target attribute remains as emails[type eq “work”].value.

<p>
  <img src="https://help.split.io/hc/article_attachments/12392639219725" alt="mail-attribute.png" />
</p>

7 Click **Ok** and then **Save**.

  <p>
    <img src="https://help.split.io/hc/article_attachments/16056968473357" alt="azure-active-directory-admin-center.png" />
  </p>

8. Toggle the provisioning status to **On** and click the **Save** button.

# Provisioning users or groups from Azure AD to Split

**Notes**

**Be aware that:**

* **Because groups are pushed from Okta, they are now IdP managed and you can’t deactivate them from Split. Go back to Okta to deactivate them.**
* **Group name length should be less than 25 characters.**

To provision users, do the following:

1. Click the **Users and groups** tab. 
2. Click the **Add user/group** button and from the list, click **None selected** under Users and Groups and search for the users or groups in the modal.

<p>
  <img src="https://help.split.io/hc/article_attachments/12392742177677" alt="provision-user-and-group.png" />
</p>

3. In the search field, find the desired person and click the **Select** and then **Assign** buttons to assign access to Split. 

   <p>
     <img src="https://help.split.io/hc/article_attachments/12395065041165" alt="assign-user-and-group.png" />
   </p>

4. To ensure the person is added, from the Admin settings of the Split application, under Organizational settings, click **Users**. The new user appears in the list.
5. Follow the same process to Assign groups to your Split application.

You can monitor the Provisioning status by viewing the logs on the Provisioning tab. The provisioning cycle is set to 40mins. All changes made to Azure AD reflect in Split at this frequency.

**Notes:**
* **The Group Name in Azure AD is the same as the Group Name in Split. To link an Azure AD Group to a Split Group, create a Group in Azure AD with the same name. The linking happens behind the scenes.**

* **Special case for Administrators. As Administrators is a reserved word on the Split application, this group must exist and have at least one member. If you are unable to create a group with name Administrators in Azure AD to link to Split, create one with name Split_Administrators. If a group with the name Split_Administrators is synced from Azure AD, it automatically maps to the Administrators group on Split. The name on Split remains Administrators.**

* **Provisioning runs at a 40 min interval by default and all changes made to Assigned users and Groups reflect in Split after the next provisioning cycle run.**

# Error message in Azure AD setup

If you see the AADSTS50105 error message, it means that you aren't a direct member of a group with access or the administrator hasn't assigned you with access. Contact the admin to assign you access to the Split application in the Azure AD Enterprise Apps section.

