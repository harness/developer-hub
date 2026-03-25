---
id: policy-as-code-api-keys-tokens
title: Policy as Code for API Keys and Tokens
description: Learn how to implement policy as code to create, manage, and enforce governance for API keys and authentication tokens.
tags: [policy-as-code, security, api-keys, tokens, governance]
keywords: [policy as code, api key, token management, governance, compliance]
sidebar_position: 22
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


Harness uses [Open Policy Agent (OPA)](https://www.openpolicyagent.org/) for its policy engine, allowing you to define your governance rules as code using the [Rego language](https://www.openpolicyagent.org/docs/policy-language#learning-rego).

You can apply these policies to automate and secure how [API keys and tokens](/docs/platform/automation/api/add-and-manage-api-keys) are created, updated, rotated, and used within your Harness account. For example, you can create a policy that limits token validity duration, enforces naming standards, or requires periodic rotation.

Policies are automatically evaluated during the “On Save” event — which occurs whenever an API key is created or updated, or when a token is created, updated, or rotated.

## Prerequisites  

- Harness Governance  
  - [Overview](/docs/platform/governance/policy-as-code/harness-governance-overview)  
  - [Quickstart](/docs/platform/governance/policy-as-code/harness-governance-quickstart)  
- [OPA’s Rego policy language](https://academy.styra.com/courses/opa-rego).  

## Configure Policy as Code for API Keys and Tokens 

In the following steps, we use a user API key and token as an example. You can follow the same steps to configure a Service Account API key and token, or a Personal Access Token (PAT).

:::note
To configure policies at the Organization scope, navigate to the Organization Settings and follow the same process.
:::

<Tabs>
<TabItem value="interactive" label="Interactive" default>
    <iframe
    src="https://app.tango.us/app/embed/e9e9c7a5-840a-4ee2-a938-4730acd3218f"
    style={{ 
        minHeight: '640px',
        width: '100%',
        height: '100%' 
    }}
    sandbox="allow-scripts allow-top-navigation-by-user-activation allow-popups allow-same-origin"
    security="restricted"
    title="Create and Apply Policies in Harness"
    referrerPolicy="strict-origin-when-cross-origin"
    frameBorder="0"
    allowFullScreen
    webkitallowfullscreen
    mozallowfullscreen />
</TabItem>
<TabItem value="Manual" label="Step-by-Step" default>

### Step 1: Add a Policy 

1. Navigate to **Account Settings** → **Security and Governance** → **Policies**.

2. Click the **Policies** tab in the top-right area of the page. 

3. Click **New Policy**.
   1. Enter a **Name** for your policy.  
   2. Select where to store your policy: **Inline** or **Remote**, and then click **Apply**. 

4. Create the policy manually, or open the Library tab on the right to pick one of the sample policies. For example, you can use the following sample to prevent users from creating token for an API key in your Account.

    ```
    package opapolicy

    deny[msg] {
        contains(input.token.apiKeyType, "USER")
        msg = sprintf("Token APIKeyType %s contains 'USER'", [input.token.apiKeyType])
    }
    ```
    Similarly, you can [review additional examples](#policy-examples) in the sections below.
    
5. Click **Save** to proceed. 

### Step 2: Add the Policy to a Policy Set

1. Go to the **Policy Sets** tab in the top-right section of the page.  

2. Click **New Policy Set**.  
   1. Enter a **Name** for the policy set.  
   2. (Optional) Enter a **Description** for the policy set.  
   3. For **Entity type**, select **API Key** or **Token**, depending on the policy you created.  
   4. For **On what event should the policy set be evaluated**, select **On Save**.  

3. In **Policy evaluation criteria**, click **Add Policy**.  

4. Select the policy that you want to use.  

5. Select **Error and exit** as the severity and action. If the policy fails, an error is shown and the change is not saved.

6. Click **Apply**, and then click **Finish**.

### Step 3: Policy Enforcement.

By default, the policy set is not enforced. To enforce it, toggle the **Enforced** button to **On**.

### Step 4: Apply the Policy

After creating your Policy Set and adding policies to it, test the policy enforcement using the example from [Step 1.4](#step-1-add-a-policy) and follow the steps below.

1. Go to your **Profile**. 

2. Create an **API Key**:  
   - Enter a **Name** for your API key.  
   - Click **Save**.  

3. Create a **Token**:  
   - Enter a **Name** for your token.  
   - Click **Save**.  

It won't allow you to save, and you should see an **error** message (severity: **Error and exit** that you added in [Step 2.5](#step-2-add-the-policy-to-a-policy-set)).
</TabItem>
</Tabs>

## Policy Examples

1. **Restrict token creation by type**: Prevents users from creating tokens with specific `apiKeyType` values.

   **Account tokens (blocks USER type):**
    ```rego
    package opapolicy
    
    deny[msg] {
        contains(input.token.apiKeyType, "USER")
        msg = sprintf("Token APIKeyType %s contains 'USER'", [input.token.apiKeyType])
    }
    ```

   **Service Account tokens (blocks SERVICE type):**
    ```rego
    package opapolicy
    
    deny[msg] {
        contains(input.token.apiKeyType, "SERVICE")
        msg = sprintf("Token APIKeyType %s contains 'SERVICE'", [input.token.apiKeyType])
    }
    ```

2. **`validTo`** : The expiry timestamp assigned at the time of initial token creation. The example below shows that the expiry time cannot be set beyond the allowed date and time (timestamp: `1779647400000`).

   ```rego
   package opapolicy
   
   deny[msg] {
       input.token.validTo > 1779647400000
       msg = sprintf("For CreateToken, Token APIKeyType ValidTo %v greater than X date", [input.token.validTo])
   }
   ```

3. **`scheduledExpireTime`**: The new expiry timestamp set when the token is rotated. The example below show that the expiry time cannot be set beyond the allowed date and time while rotating a token (timestamp: `1771957800000`).

   ```rego
   package opapolicy
   
   deny[msg] {
       input.token.scheduledExpireTime > 1771957800000
       msg = sprintf("For RotateToken, Token APIKeyType ScheduledExpireTime %v greater than X date", [input.token.scheduledExpireTime])
   }
   ```