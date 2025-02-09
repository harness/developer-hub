---
title: Traffic type attributes
sidebar_label: Traffic type attributes
helpdocs_is_private: false
helpdocs_is_published: true
---
import Attributes from "@site/docs/feature-management-experimentation/10-getting-started/docs/key-concepts/attributes.md";

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360020529772-Identifying-customers <br /> ✘ images still hosted on help.split.io </button>
</p>

<Attributes User_attribute='Traffic type attribute' user_attribute='traffic type attribute' />

## Send
 
Split provides the [identities Split API endpoint](https://docs.split.io/reference/identities-overview) and the [Python Library Wrapper for Split](https://help.split.io/hc/en-us/sections/12618854150157-Admin-API-Wrappers) to use for sending attributes with user keys.

## Manage
 
As an administrator in Split, you can see the user keys and attributes of your Split traffic and the last time an update is received. To manage your account's traffic attributes, do the following:

1. From the left navigation, click on the **user's initials** at the bottom, select **Admin settings** and then **Projects**. 

2. Click **View** for the project you are working in and then the **Traffic types** tab. 

3. Click **View/edit attributes**.

<p>
  <img src="https://help.split.io/hc/article_attachments/30800922792205" alt="identifying_customers.png" />
</p>

3. Optionally, edit the display name, description, and attribute type.

4. Click **Save**. The attributed is updated.

## Visualize
 
You can view a user key's attribute data on the third tab of the user key dashboard which is populated from the attribute data you send using Split's API. To navigate to this dashboard, click on a unique key when you view impression data or use the search bar on the left navigation panel.