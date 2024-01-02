---
title: Create and execute rules
description: This topic describes how to optimize cloud costs using asset governance.
# sidebar_position: 2
---


# Optimize cloud costs by using the asset governance rules

:::note
Currently, Azure support for Asset Governance is behind the feature flag **CCM_ENABLE_AZURE_CLOUD_ASSET_GOVERNANCE_UI**. Contact [Harness Support](mailto:support@harness.io) to enable the feature.
:::
To optimize cloud costs, you need to create a governance rule or combine multiple rules into a ruleset and enforce it to provide a more comprehensive, consistent, and efficient approach to cloud asset governance.


## Create a new rule

1. In **Harness**, go to **Cloud Costs**.
2. Select **Asset Governance**.
3. Select **Rules**.
4. Select **+ New Rule**. 


  <DocImage path={require('./static/asset-governance-rule-creation.png')} width="60%" height="60%" title="Click to view full size image" />

5. Enter a name for the rule.
6. Select the cloud provider.
7. Optionally, enter a description of the rule.
8. Select **Apply**.
9. Enter the YAML policy in the rule editor.
10. Select **Save**. 

  If the policy is invalid, an error message is displayed.
10. Select the **Account** and the **Region** from the dropdown list in the Test Terminal.
11. Select **Dry Run** to view the instances or services that will be acted upon when you enforce the rule. 
12. After evaluating the output, select **Run Once** to execute the rule. 

  <DocImage path={require('./static/asset-governance-rule-enforcement.png')} width="60%" height="60%" title="Click to view full size image" />

Harness provides some out-of-the-box policies for EC2, RDS, EBS, ELB, and S3 that can be enforced. These policies cannot be edited but can be cloned.

## Create a new rule set

Rule sets serve as logical bindings on top of individual rules that help you organize and manage rules. They are especially useful when dealing with numerous rules, as it can become challenging to keep track of them individually. Rule sets help to keep rules organized and easily accessible, making it easier to manage and maintain complex rule configurations.

To create a rule set, perform the following steps:

1. In **Harness**, go to **Cloud Costs**.
2. Select **Asset Governance**.
3. Select **Rules**.
4. Select the **Rule sets** tab.
5. Select **+ New Rule Set**.
6. Enter a name for the rule set.
7. Optionally, enter a description of the rule set.
8. Select the cloud provider.
9. Select the rules that you want to enforce. 

  <DocImage path={require('./static/create-new-rule-set.png')} width="60%" height="60%" title="Click to view full size image" />


10. Select **Create Rule Set**. 
The rule set is created successfully. You can view the rule set on the **Asset Governance Rules** page. Expand the rule set to view the individual rules in the rule set.

  <DocImage path={require('./static/view-rule-set.png')} width="60%" height="60%" title="Click to view full size image" />

11. Select **Enforce Rule Set** in the Enforcements column to enforce this rule set.


## Enforce a rule or a rule set

You need to create rule enforcement to automatically detect and take action when the conditions are met. Rule enforcement allows automated actions such as scaling resources up or down based on predefined thresholds. For example, you can create an enforcement to schedule the deletion of all unused EC2 instances older than 60 days.

To create enforcement, perform the following steps:

1. In your **Harness** application, go to **Cloud Costs**.
2. Select **Asset Governance**.
3. Select **Enforcements**.
4. Select **+ New Enforcement**.
5. Enter a name for the enforcement.
6. Optionally, enter a description of the enforcement.
7. Select the cloud provider.
8. Select the rules or rulesets that you want to enforce. You can use the **Search** box if you have multiple rules and are looking to enforce a particular rule or rule set.
9. Select **Continue**. 
10. Select the target accounts and target regions. You could select multiple accounts and regions.
11. Set the frequency from **Hourly**, **Daily**, or **Weekly **options. In case you select Daily or Weekly, specify the day, time, and time zone to run the rule on schedule.
12. Toggle the **Dry Run** mode if you do not want to take action immediately.
13. Select **Finish**. 

    <DocImage path={require('./static/set-up-schedule.png')} width="60%" height="60%" title="Click to view full size image" />


After setting up the schedule, you can view the enforcement on the **Rule Enforcements** page. Expand the enforcement to view the rules, target accounts, and regions included in the enforcement. 

<DocImage path={require('./static/view-rule-set.png')} width="60%" height="60%" title="Click to view full size image" />

Furthermore, you can disable the enforcement at any time using the toggle button in the **Status** column. If you want to turn off the dry-run mode, select **Edit** from the vertical ellipsis menu (⋮) and switch to active mode.
  
<DocImage path={require('./static/rule-enforcements-page.png')} width="60%" height="60%" title="Click to view full size image" />



## Evaluate the rules

1. In your **Harness** application, go to **Cloud Costs**.
2. Select **Asset Governance**.
3. Select **Evaluations**.
4. Select the rule to view the evaluation details. 
The target accounts, regions, and evaluation logs are displayed.

 <DocImage path={require('./static/asset-gov-eval.png')} width="60%" height="60%" title="Click to view full size image" />


## Use filters in rule evaluation

You can create filters to view selected rules:

1. Select the filter icon.
2. Enter a name.
3. Select who can edit and view the filter.
4. Select one or more of the following criteria to filter the results:
    * Rules
    * Rule Sets
    * Enforcements
    * Minimum Cost Impact ($)
    * AWS Filters

      - Target Accounts
      - Target Regions
    * Azure Filters

      - Azure Subscription
      - Target Regions

  <DocImage path={require('./static/filter-evalaution-rules.png')} width="40%" height="40%" title="Click to view full size image" />

5. Select **Apply**.