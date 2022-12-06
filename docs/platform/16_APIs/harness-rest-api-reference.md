---
title: Use the Harness REST API
description: Use the Harness REST API to automate Harness operations.
# sidebar_position: 2
helpdocs_topic_id: bn72tvbj6r
helpdocs_category_id: pm96bpz4kf
helpdocs_is_private: false
helpdocs_is_published: true
---

The Harness REST API lets you automate Harness operations, including your builds, deployments, feature flags, etc.

The Harness REST API reference docs are located at [https://harness.io/docs/api](https://harness.io/docs/api/).

![](./static/harness-rest-api-reference-08.png)
You can try the API within the reference docs, or anywhere else (Postman, etc), but you'll need an API key from your Harness account first.

When using the API key within the API reference docs, your credentials are saved until the end of the browser session.

### Step 1: Create a Harness API Key and PAT

The Harness API uses API keys to authenticate requests. You create the API key in your Harness Manager User Profile, add a Personal Access Token (PAT) to the key, and then use the PAT in your API requests.

For an overview of Harness API keys, see [Add and Manage API Keys](../4_Role-Based-Access-Control/7-add-and-manage-api-keys.md).Let's create the API key and its Personal Access Token.

Here's a quick visual summary:

![](./static/harness-rest-api-reference-09.gif)

#### Create API Key

In Harness, navigate to your **Profile**.

![](./static/harness-rest-api-reference-10.png)
In **My API Keys**, Click **API Key**. The API Key settings appear.

![](./static/harness-rest-api-reference-11.png)
Enter **Name, Description,** and **Tags** for your API.

Click **Save**. The new API Key is created.

#### Create Personal Access Token

Next, we'll add the Personal Access Token (PAT) that you will use when you make API requests.

Click **Token** below the API Key you just created.

![](./static/harness-rest-api-reference-12.png)
In the **New Token** settings, enter a Name, Description, and Tags.

To set an expiration date for this token, select **Set Expiration Date** and enter the date in **Expiration Date (mm/dd/yyyy)**.

Click **Generate Token**.

Your new token is generated.

![](./static/harness-rest-api-reference-13.png)
Please copy and store your token value somewhere safe. You won't be able to see it again.  
  
Your API keys carry many privileges, so be sure not to share them in publicly accessible areas. Make sure you always use the updated API Key value after you rotate the token. For more details, see [Rotate Token](../4_Role-Based-Access-Control/7-add-and-manage-api-keys.md#rotate-token).

#### Service Account Tokens

You can also use a Service Account Tokens instead of PAT. See [Add and Manage Service Accounts](../4_Role-Based-Access-Control/6-add-and-manage-service-account.md).

### Step 2: Use the API

Now you're ready to use the Harness API in the reference docs or anywhere else.

See [https://harness.io/docs/api](https://harness.io/docs/api/).

