---
title: Connect to AppDynamics as a Custom APM
description: As an alternative to Harness' standard AppDynamics integration , you can use this guide to add AppDynamics to Harness as a custom APM. This approach enables you to expand monitoring beyond Business T…
sidebar_position: 80
helpdocs_topic_id: w7tcb2frp9
helpdocs_category_id: ep5nt3dyrb
helpdocs_is_private: false
helpdocs_is_published: true
---

As an alternative to Harness' [standard AppDynamics integration](../continuous-verification-overview/concepts-cv/app-dynamics-verification-overview.md), you can use this guide to add AppDynamics to Harness as a custom APM. This approach enables you to expand monitoring beyond Business Transactions, to cover specific metrics of interest (for example, JVM data).


### Before You Begin

* See [Custom Verification Overview](custom-verification-overview.md).

### Step 1: Add AppDynamics as a Custom Verification Provider

To add a Custom Metrics Provider using AppDynamics, do the following:

1. In Harness Manager, click **Setup** > **Connectors** > **Verification Providers**.
2. Click **Add Verification Provider**. From the drop-down, select **Custom Verification**.  
  
   This opens the **Metrics Data Provider** settings.
   
   ![](./static/connect-to-app-dynamics-as-a-custom-apm-61.png)
   
3. In **Type**, select **Metrics Data Provider**, as shown above.

### Step 2: Display Name

In **Display Name**, give the Verification Provider an arbitrary name. (You will use this name to select this provider in a Workflow.)

### Step 3: Base URL

In **Base URL**, enter: `https://<your-AppDynamics-account-name>.saas.appdynamics.com/controller/`

Ensure that you include the forward slash at the end of the URL.

### Step 4: Headers

In **Headers**, click **Add Headers**, and add the following row:



|  |  |  |
| --- | --- | --- |
| **Key** | **Value** | **Encrypted Value** |
| Authorization | Enter a base 64–encoded version of this string, representing your AppDynamics credentials:`<username>@<account-name>:<password>`You can also use an Open Authorization (OAuth) token-based authentication. Instead of the above credentials combination, enter your token.For more information about generating the token, see [AppDynamics API Clients documentation](https://docs.appdynamics.com/display/PRO45/API+Clients). | Checked |

### Step 5: Validation Path

In **Validation Path**, enter `rest/applications?output=json`.

The settings will now look something like this:

![](./static/connect-to-app-dynamics-as-a-custom-apm-62.png)

### Step 6: Test and Submit

1. Click **Test** to verify your custom verification provider.
2. If the test succeeds, click **Submit** to save the custom verification provider.

### See Also

* [Verify Deployments with AppDynamics as a Custom APM](verify-deployments-with-app-dynamics-as-a-custom-apm.md)

