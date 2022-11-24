---
title: Use Harness Policy As Code For Secrets
description: Add a Policy step to your Secret.
# sidebar_position: 2
helpdocs_topic_id: ozw30qez44
helpdocs_category_id: zoc8fpiifm
helpdocs_is_private: false
helpdocs_is_published: true
---

Harness provides governance using Open Policy Agent (OPA), Policy Management, and Rego policies.

You can create the policy and apply it to all Secrets in your Account, Org, and Project. The policy is evaluated on Secret-level events like **On Save,** which occurs during Secret Creation and Updates. See [Harness Governance Quickstart](/article/jws2znftay-harness-governance-quickstart).​

This topic describes how to add a Policy step to a Secret.

### Before You Begin

* [Harness Governance Overview](/article/1d3lmhv4jl-harness-governance-overview)
* [Harness Governance Quickstart](/article/jws2znftay-harness-governance-quickstart).
* Policies use OPA authoring language Rego. For more information, see [OPA Policy Authoring](https://academy.styra.com/courses/opa-rego).

### Limitations

* The policies that can be enforced are currently restricted by the Harness entities supported by the OPA service.

### Step 1: Add a Policy

In Harness, go to **Account Settings**.

Click **Policies**.

![](https://files.helpdocs.io/i5nl071jo5/articles/4kuokatvyw/1652792608062/screenshot-2022-05-17-at-5-06-58-pm.png)Click **Policies**, and then click **New Policy**.

![](https://files.helpdocs.io/i5nl071jo5/articles/4kuokatvyw/1652787608928/screenshot-2022-05-17-at-5-09-33-pm.png)**New Policy** settings appear.

Enter a **Name** for your policy and click **Apply**.

![](https://files.helpdocs.io/i5nl071jo5/articles/4kuokatvyw/1652787747420/screenshot-2022-05-17-at-5-11-32-pm.png)Next, you need to add your policy. Enter your own Rego policy. For example:


```
package docexamplepolicy  
  
deny {   
     input.secret.description = "Secret description"  
     }
```
Click **Save**.

### Step 2: Add the Policy to a Policy Set

After you create your policy, you must add it to a Policy Set before applying it to your Secrets.

In **Policies**, click **Policy Sets**, then click **New Policy Set**.

The **Policy Set** settings appear.

In **Name**, enter the name of the Policy Set.

In **Description**, enter a description of the Policy Set.

In **Entity type**, select **Secret**.

In **On what event should the Policy Set be evaluated**, select **On save.**

Click **Continue**.

![](https://files.helpdocs.io/i5nl071jo5/articles/ozw30qez44/1656667001970/screenshot-2022-07-01-at-2-46-09-pm.png)Existing Secrets are not automatically updated with policies. Policies can be applied to Secrets only on a save when they are created or updated.In **Policy evaluation criteria**, click **Add Policy.**

**Select Policy** settings appear. Select the policy you want to use from the list.

![](https://files.helpdocs.io/i5nl071jo5/articles/ozw30qez44/1656667324701/screenshot-2022-07-01-at-2-51-28-pm.png) 

Select the severity and action you want to apply when the policy isn’t adhered to. You can select one of the following

* **Warn & continue** - You will receive a warning if the policy is not met when the Secret is evaluated, but the Secret will be saved and you may proceed.
* **Error and exit** - You'll get an error and be exited without saving the Secret if the policy isn't met when the Secret is examined.![](https://files.helpdocs.io/i5nl071jo5/articles/ozw30qez44/1656667402618/screenshot-2022-07-01-at-2-52-46-pm.png)

Click **Apply**, and then click **Finish**.

To enforce your Policy Set, toggle on the **Enforced** button.

![](https://files.helpdocs.io/i5nl071jo5/articles/ozw30qez44/1656667523236/screenshot-2022-07-01-at-2-54-19-pm.png)### Step 3: Apply the Policy to a Secret

After you have created your Policy Set, and added your policies to it, apply the policy to a Secret. 

Let us look at an example.

You can add a Secret from any module in your Project in Project setup, or in your Organization, or Account Resources.

In Account Resources, click **Secrets**.

Click **New Secret**, and then click **Text**.

Enter all the required fields and click **Save and Continue**.

Based on your selection in the Policy Evaluation criteria, you will either receive a warning or an error.

### See Also

* [​Harness Policy As Code Overview​](/article/4vx27jqwv2-harness-policy-engine)

