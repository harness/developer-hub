---
title: Use Harness Policy As Code for Feature Flags
description: This topic gives steps to create, update, and view policies and policy sets for Feature Flags.
# sidebar_position: 2
helpdocs_topic_id: vb6ilyz194
helpdocs_category_id: zoc8fpiifm
helpdocs_is_private: false
helpdocs_is_published: true
---

Currently, this feature is behind the Feature Flags `OPA_PIPELINE_GOVERNANCE`, `CUSTOM_POLICY_STEP`, and `OPA_FF_GOVERNANCE`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.This topic describes how to create policies using the Harness Policy As Code and apply them to your Feature Flags. Harness Policy As Code uses the Open Policy Agency (OPA) to store policies on the Harness platform. For more information about how OPA and Harness Policy As Code work, see [Harness Policy As Code Overview](/article/4vx27jqwv2-harness-policy-engine).

### Before You Begin

* Ensure you have read and understood [Harness Policy As Code Overview](/article/4vx27jqwv2-harness-policy-engine).
* Ensure you have [created your project and environment](https://ngdocs.harness.io/article/1j7pdkqh7j-create-a-feature-flag) in the Harness platform.
* Policies use OPA authoring language Rego. New to Rego? Use the following resources to learn it:
	+ Free online course on Rego from Styra founder and OPA co-creator Tim Hendricks: [OPA Policy Authoring](https://academy.styra.com/courses/opa-rego).
	+ See [Policy Language](https://www.openpolicyagent.org/docs/latest/policy-language/) from OPA. The [Rego Cheat Sheet](https://dboles-opa-docs.netlify.app/docs/v0.10.7/rego-cheatsheet/) is also helpful to have on hand.

### Step: Create and Apply a Policy

To create and apply a policy, follow the steps below:

#### Step 1: Create a Policy

The first step of using policies with your Feature Flags is creating a policy.

1. In Harness Platform, click **Feature Flags** and select your project.

![](https://files.helpdocs.io/i5nl071jo5/articles/vb6ilyz194/1651158215766/opa-p-2-1.png)1. In **Project Setup**, click **Policies**.

You can view an overview of your policies and how many times they have been evaluated on the [Overview](/article/4vx27jqwv2-harness-policy-engine) page.![Screenshot of the Policies Overview page on the Harness Platform](https://files.helpdocs.io/i5nl071jo5/articles/vb6ilyz194/1651157968367/opa-p-2-2.png)1. Click **Policies**, then click **New Policy**.

![](https://files.helpdocs.io/i5nl071jo5/articles/vb6ilyz194/1651158334156/opa-p-2-3.png)1. In the **New Policy** page, enter the **Name** of the Policy and click **Apply**. This is the Policy name that appears on the Policy Overview page.
2. Then, you can either enter your own Rego policy or use a pre-existing policy from the policy library.

Policies are written in Rego, for more information about Rego, see the [OPA documentation for Policy Language](https://www.openpolicyagent.org/docs/latest/policy-language/). ##### Use Your Own Rego Policy

To use your own Rego policy:

1. Enter your Rego policy into the policy editor. For example:  
  

```
package feature_flags  
  
# Deny flags that aren't booleans  
deny[sprintf("feature flag '%s' isn't of type boolean", [input.flag.identifier])] {    
  input.flag.kind != "boolean"  
}
```
2. Click **Save**.

![](https://files.helpdocs.io/i5nl071jo5/articles/vb6ilyz194/1651241100211/screenshot-2022-04-29-at-15-02-19.png)##### Use an Existing Rego Policy from the Harness Policy Library

To select a pre-existing policy:

1. In the right-hand panel, click the **Library**.
2. In the **Entity** drop-down menu, select **Flags**.![](https://files.helpdocs.io/i5nl071jo5/articles/vb6ilyz194/1651158508741/opa-p-2-4.png)
3. Select a pre-existing flag policy from the list. The Rego code will populate in the **Library** editor.
4. Click **Use this Sample**.

![](https://files.helpdocs.io/i5nl071jo5/articles/vb6ilyz194/1651161718892/screenshot-2022-04-28-at-17-01-30.png)1. In **File Overwrite**, click **Confirm** to add the sample to your editor.

![](https://files.helpdocs.io/i5nl071jo5/articles/vb6ilyz194/1651161767768/screenshot-2022-04-28-at-17-02-32.png)1. Click **Save**.

##### Use the Testing Terminal to Check Your Code

1. To check your policy code is valid, test your policy against a previous **Policy Evaluation** in the **Testing Terminal**:

You can only test a policy in the Testing Terminal if you have previously run a Policy Evaluation. If you are creating your first ever policy for the Project, continue to [Step 2: Add the Policy to a Policy Set](#step-2-adding-the-policy-to-a-policy-set). After you have applied your first policy to a Feature Flag, you can then use the Testing Terminal.1. In the **Testing Terminal**, click **Select Input.**

![](https://files.helpdocs.io/i5nl071jo5/articles/vb6ilyz194/1651160704214/screenshot-2022-04-28-at-16-44-31.png)1. Select **Feature Flag** as the **Entity Type**. **Event Type** and **Action** are automatically completed.
2. Select the **Feature Flag** you want to test, then click **Apply**. This will automatically populate the **Testing Terminal** using the details of the Feature Flag you selected.

![](https://files.helpdocs.io/i5nl071jo5/articles/vb6ilyz194/1651160857514/screenshot-2022-04-28-at-16-47-21.png)1. Click **Test**. Depending on whether the updated policy successfully applies to the existing Feature Flag, you receive one of the following:
* **I****nput failed Policy Evaluation**: The Feature Flag doesn’t adhere to the updated policy.

![](https://files.helpdocs.io/i5nl071jo5/articles/vb6ilyz194/1651238871940/screenshot-2022-04-29-at-14-17-09.png)* **Input succeeded Policy Evaluation**: The Feature Flag adheres to the updated policy.

![](https://files.helpdocs.io/i5nl071jo5/articles/vb6ilyz194/1651238892587/screenshot-2022-04-29-at-14-24-44.png)#### Step 2: Add the Policy to a Policy Set

After you create an individual policy, you must add it to a Policy Set before you can apply it to your Feature Flags.

1. In **Policies**, click **Policy Sets**, then click **New Policy Set**.

![](https://lh4.googleusercontent.com/f2GbzvnKR5dw5iVaHRfr695eq16qFYya38-I9tSzDH37UZRPljOzGaLmGuGBLdtsWvtQzWDgL8uNRfmLjy-gsWepN1HKw8XXrgpAFo71o13aT0VAp-JJ3noiRvPlumo_-NfG0crI)1. In **Name**, enter the name of the Policy Set.
2. (Optional) In **Description**, enter a description of the Policy Set.
3. In **Entity type** that this policy applies to, select **Feature Flag**.
4. In **On what event should the Policy Set be evaluated**, select **On save**, then click **Continue**.

![](https://files.helpdocs.io/i5nl071jo5/articles/vb6ilyz194/1651159624484/4-ep-z-7-tu-m-tr-l-4-i-7-yl-3-njyw-uid-2-rm-ah-rhbx-6-hlkv-bmb-3-g-fx-kn-1-vgog-h-7-k-5-a-c-8-k-s-8-yn-l-a-n-3-y-4-cm-yzau-7-gommtz-gm-38-fi-0-njjyw-ohqc-8-fny-19-tso-y-02-hxj-ra-ud-gp-p-3-ebq-xay-7-d-1)Policies are not automatically applied to existing Feature Flags. Policies can be applied to Feature Flags only on a save when they are created, updated, or switched on or off. 1. In Policy evaluation criteria, click **Add Policy**, then click your Project to display all the policies you created for that project.
2. Select the policy you want to use. In the drop down menu next to the policy name, select the severity and action you want to apply when the policy isn’t adhered to:
* **Warn & continue**: If a policy isn’t met when the Feature Flag is evaluated, you receive a warning but the flag is saved and you can continue.
* **Error and exit:** If a policy isn’t met when the Feature Flag is evaluated, you receive an error and are exited without saving the flag.

![](https://files.helpdocs.io/i5nl071jo5/articles/vb6ilyz194/1651159733445/eb-9-ak-qiq-9-n-n-qxcewg-7-j-ybrg-ip-9-d-8-nhg-8-w-vb-9-vxfyt-tk-njog-dlq-3-ke-1-o-8-eo-kjswnzd-vfx-4-w-hbrp-0-vs-ma-vhl-18-trob-2-f-lzt-dksyia-0-vl-5909-nkf-ktwrc-1-ypnv-3-dq-2-a-or-tw-up-h-s-1)1. Click **Apply**, then click **Finish**.
2. The Policy Set is automatically set to Enforced, to make it unenforced, toggle off the **Enforced** button.

You need to enforce the policy before it evaluates your Feature Flags.![](https://files.helpdocs.io/i5nl071jo5/articles/vb6ilyz194/1651159902040/q-m-670-yv-6-ce-ri-p-2-f-n-1-pv-3-f-3-n-qrem-3-v-ig-n-nitvw-y-909-o-2-h-dh-nu-jldnig-o-6-ugv-md-9-at-25-nni-njh-878-k-71-grmk-8-tdj-d-tyighy-ui-axyr-qppqhv-4-p-ymsd-4-z-9-dx-9-u-6-q-9-g-1-rs-58-wh-81-a-5)### Step: Apply a Policy to a Feature Flag

After you have created your Policy Set and added your policies to it, apply the policy to a Feature Flag. 

1. In Harness Platform, click **Feature Flags**.
2. Click **+ Flag**.
3. [Create a new Feature Flag](https://ngdocs.harness.io/article/1j7pdkqh7j-create-a-feature-flag#before_you_begin). Make sure the flag [adheres to the policy you are testing.](/article/vb6ilyz194-using-harness-policy-engine-for-feature-flags#step_1_creating_a_policy)
4. Click **Save and Close**. The result is one of the following:
* **Success**: When you save the flag, the policy rule is evaluated, returns Flag created, and the flag is saved.
* **Failure**:
	+ If you selected **Warn and continue** when creating the policy, the flag is saved but you receive the following warning message:![](https://files.helpdocs.io/i5nl071jo5/articles/vb6ilyz194/1651160090467/opa-p-1-2.png)
	+ If you selected **Error and exit** when creating the policy, the flag doesn’t save and you receive the following error message:

![](https://files.helpdocs.io/i5nl071jo5/articles/vb6ilyz194/1651160060068/log-mfcex-2-z-s-9-sp-yp-4-hn-y-6-gmdaobx-czmh-3-u-d-0-bd-zo-d-e-9-p-6-a-9-unr-3-z-r-4-kvp-5-i-rxf-0-28-jgnj-8-w-r-9-thjb-fxbiu-cy-1-0-ev-q-1-qy-qpz-k-27-xc-sc-okzh-ilr-4-k-2-qnz-xpl-ni-5-ln-3-xtcv-2-duv)After you have successfully created a Policy Set and applied it to your feature flags, you can:

* [Edit a Policy](/article/vb6ilyz194/preview#editing-a-policy)
* [Edit a Policy Set](/article/vb6ilyz194/preview#editing-a-policy-set)
* [View a History of Policy Evaluations](/article/vb6ilyz194/preview#viewing-a-history-of-policy-evaluations)

### Edit a Policy

After you have created a policy, you can edit it by renaming it or updating its rules in the policy editor.

1. In Feature Flags, click **Policies**.
2. Click **Policies**, then click the three dots next to the policy you want to change, then click **Edit**.

![](https://files.helpdocs.io/i5nl071jo5/articles/vb6ilyz194/1651162131161/af-1-jtmg-yrul-nxxs-qgnxg-83-e-r-4-s-5-eg-b-1-s-r-zl-q-6-kl-1-vn-6-f-0-m-ewxhzymzsc-rwzm-prac-7-wxc-eg-u-0-o-exp-xf-mmlskox-oe-k-94-vlk-xrj-7-cvctzg-5-z-wbkp-iieiru-0-f-7-keef-srws-ihztgo-3-x)1. To update the policy name, click **Edit Policy**.

![](https://files.helpdocs.io/i5nl071jo5/articles/vb6ilyz194/1651160353409/screenshot-2022-04-28-at-16-38-46.png)1. Enter the new name and click **Apply**.

![](https://files.helpdocs.io/i5nl071jo5/articles/vb6ilyz194/1651160384928/scf-7-hxrwqy-8-ak-p-48-b-zob-rb-60-szvgb-mgztz-2-t-dancu-ct-5-ba-4-x-8-p-eruz-qdi-5-ly-kgusqp-lkluqz-93-y-mqn-alaa-wvq-rbiukkr-8-dpvq-xbv-zl-bulj-93-p-fz-dig-2-hy-ukuug-5-flg-som)1. To update the policy rules, edit the Rego code in the policy editor.

![](https://files.helpdocs.io/i5nl071jo5/articles/vb6ilyz194/1651160625706/screenshot-2022-04-28-at-16-43-21.png)1. Test the updated policy in the Testing Terminal against a previous Policy Evaluation to ensure it is valid. For more information about how to do this, see [Step 9 in Create a Policy](/article/vb6ilyz194-using-harness-policy-engine-for-feature-flags#step_1_create_a_policy).
2. When you've made all the changes, click **Save**.

![](https://files.helpdocs.io/i5nl071jo5/articles/vb6ilyz194/1651161085592/screenshot-2022-04-28-at-16-49-46.png)### Edit a Policy Set

You can edit a Policy Set to amend the name or add a new policy. 

1. In Feature Flags, click **Policies**.
2. Click **Policy Sets**, then click the three dots next to the Policy Set you want to change, then click **Edit**.

![](https://files.helpdocs.io/i5nl071jo5/articles/vb6ilyz194/1651161124852/ivrr-cb-f-6-mvrxrxg-dvop-qmfjrwymg-1-c-eai-7-b-jks-c-wk-s-1-j-4-b-a-2-l-uktmqh-ju-qzud-g-9-doyp-3-d-8-dqs-ti-lrt-3-sm-hfhlhf-vg-jz-kqm-st-4-zth-6-ukc-bb-uy-izx-eo-tml-9-bpen-q-6-q-x-3-zqz)1. The Policy Set's settings are displayed. Follow the steps in [Add the Policy to a Policy Set](/article/vb6ilyz194-using-harness-policy-engine-for-feature-flags#step_2_add_the_policy_to_a_policy_set) to edit the details.
2. Click **Apply**, then click **Finish**.

### View a History of Policy Evaluations

You can view all failures, warnings, and successes of evaluations for each of your Policy Sets. 

1. In Feature Flags, click **Policies**. On the Overview page, you can view the total number of:
* Policy Sets.
* Policy Sets in effect.
* Number of policies across all Policy Sets.
* Policy evaluations.
* Passed, failed, and warning results from evaluations.
1. Click **Evaluation**.

![](https://files.helpdocs.io/i5nl071jo5/articles/vb6ilyz194/1651161215302/gm-z-4-bpi-pf-1-l-co-tm-64-fxh-kdi-btx-nw-y-9-bt-8-s-7-h-tf-knz-5-fsas-el-uf-7-aq-54-pu-0-mk-19-yn-kd-witzjotup-5-vhq-bm-kxde-2-ofvcx-cu-0-n-rhuc-qy-sn-64-sr-arrv-gherkogaisx-rmg-2-mm-bxtp)1. To view further details of a particular evaluation, click on it and expand the relevant evaluation.

![](https://files.helpdocs.io/i5nl071jo5/articles/vb6ilyz194/1651161241164/g-owpr-uo-0-iug-oyb-i-3-tk-5-bd-fwfwdcv-vdou-tbt-2-g-6-gdzk-8-ln-kwlk-6-afkpdwqc-z-008-i-4-dmobw-gc-2-hck-m-0-aqov-xodu-y-39-o-ck-pjuhy-q-wfme-vii-zp-6-ewm-n-u-iu-lbq-wxv-nfsb-ldq-xxo)### See Also

* [Harness Policy As Code Overview](/article/4vx27jqwv2-harness-policy-engine)

