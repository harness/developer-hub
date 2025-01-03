---
title: Single sign-on with AD FS
sidebar_label: Single sign-on with AD FS
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360021127411-Single-sign-on-with-AD-FS <br /> ✘ images still hosted on help.split.io </button>
</p>

Use this guide to set up Microsoft Active Directory Federation Services (AD FS) as an SAML IdP using Split's SAML 2.0 API, allowing users to log in to Split using their single sign-on (SSO) credentials. [Learn more about configuring SAML in Split.](https://help.split.io/hc/en-us/articles/360021120871)

# Configure SAML

If you are a Split administrator, you can configure SAML in the Security section of Admin Settings. 

1. Go to **Admin Settings** > **Security** > **SAML**.
2. Add your **IdP metadata** to the text area.
3. Enable/disable **SAML strict mode**.
4. Enable/disable **just-in-time user provisioning**.
5. Click **Save**.

When you save these changes, you can view the summary of the SAML configuration parameters. You use these settings in Okta.

# Add relying trust party
 
1. Open the AD FS management console by going to the Server Manager console and selecting **AD FS Management** from the **Tools** list (on the right).

<p> 
	<img src="https://help.split.io/hc/article_attachments/360017740292/ADFS_management_console.png" alt="ADFS_management_console.png" />
</p>	

2. Click **Required: Add a trusted relying party**.

<p>
 	<img src="https://help.split.io/hc/article_attachments/360017624891/ADFS_add_relying_trust_party.png" alt="ADFS_add_relying_trust_party.png" />
</p>

3. A walk-through opens to assist you in adding a new relying party trust to the AD FS configuration database. Read the instructions and click **Next**.
4. Select **Import data about the relying part from a file**.
5. Click **Browse** to select the metadata file then click **Next**.

<p>
	<img src="https://help.split.io/hc/article_attachments/360017740272/ADFS_import_SAML_metadata.png" alt="ADFS_import_SAML_metadata.png" />
</p>

6. Provide a **display name** for the Trust, for example, Split, and then click **Next**.

<p>
	<img src="https://help.split.io/hc/article_attachments/360017740252/ADFS_display_name.png" alt="ADFS_display_name.png" />
</p>	

7. Select **Permit all users to access this relying party**, and then click **Next**.

<p>
	<img src="https://help.split.io/hc/article_attachments/360017740232/ADFS_Permit_all_user_access.png" alt="ADFS_Permit_all_user_access.png" />
</p>

8. Review the settings, and then click **Next**. 

<p>
	<img src="https://help.split.io/hc/article_attachments/360017624871/ADFS_Review_Settings.png" alt="ADFS_Review_Settings.png" />
</p>

9. Click **Close**. This saves the trust and opens the Edit Claim Rules.

We recommend two claim rules for brokering the SAML assertions. Follow the steps below to configure.

10. Click **Add Rule**.

<p>
	<img src="https://help.split.io/hc/article_attachments/360017624851/ADFS_add_rule.png" alt="ADFS_add_rule.png" />
</p>

11. Select **Send LDAP Attributes as Claims**, and then click **Next**.

 <p>
 	<img src="https://help.split.io/hc/article_attachments/360017740212/ADFS_send_attributes_as_claims.png" alt="ADFS_send_attributes_as_claims.png" />
</p>

12. Configure the rule as follows. When all settings are configured, click **Finish**.
    * Set the **Claim rule name** as **NameID**.
    * Set the **Attribute store** as **Active Directory**.
    * Set the **LDAP Attribute** as **User-Principle-Name**.
    * Set the **Outgoing Claim Type** as **E-Mail Address**.

 <p>
 	<img src="https://help.split.io/hc/article_attachments/360017624831/ADFS_Claim1.png" alt="ADFS_Claim1.png" />
 </p>	

13. Add the second rule by clicking **Add Rule**.
14. Select **Transform an Incoming Claim**, and then click **Next**.

<p>
	<img src="https://help.split.io/hc/article_attachments/360017624811/ADFS_transform_incoming_claim.png" alt="ADFS_transform_incoming_claim.png" />
</p>

15. Configure the rule as follows. When all settings are configured, click **Finish**.
    * Set the **Claim rule name** as **Email Claim**.
    * Set the **Incoming claim type** as **E-Mail Address**.
    * Set the **Outgoing claim type** as **Name ID**.
    * Set the **Outgoing name ID** format as **Email**.

<p>
	<img src="https://help.split.io/hc/article_attachments/360017624791/ADFS_Claim2.png" alt="ADFS_Claim2.png" />
</p>	

16. Right-click the properties of the relying party trust and select the **Advanced** tab.
17.Select **SHA-1** for the **Secure hash algorithm**, and then click **Apply**. 

<p>
	<img src="https://help.split.io/hc/article_attachments/360017740192/ADFS_secure_hash_algorithm.png" alt="ADFS_secure_hash_algorithm.png" />
</p>

Split is now set up with AD FS.

