---
title: Harness Concepts
description: This topic describes how to optimize cloud costs using asset governance.
# sidebar_position: 2
---


# Harness Concepts: Rules, Rule Sets, Enforcements and Evaluations to optimise cloud costs

:::note
Currently, GCP support for Asset Governance is behind the feature flag **CCM_ENABLE_GCP_CLOUD_ASSET_GOVERNANCE_UI** Contact [Harness Support](mailto:support@harness.io) to enable the feature.
:::

## Overview


## Rules

Rules help you set up asset governance for your cloud provider. A rule is essentially a small file with a set of logic that you can run on your cloud infrastructure. For example, there might be a scenario in which you want to migrate your Amazon EBS volumes from GP2 to GP3. In such a case, we will write a small file which will run this logic for us. 

Ideally, rules include policy, resource filters, and actions.

- A **policy** is defined in YAML format and consists of filters and actions that are applied to a specific type of cloud resource set up by you.

- A **resource** is the type of cloud resource or service on which the rule will be run or to which the actions and filters will be applied, such as AWS EC2, AWS S3, GCP SQL, or Azure VMs.

- A **filter**, as the name suggests, is a criteria used to narrow down the results based on the attributes. These attributes can include anything such as tags, metadata, or any other resource property provided by you. When the filter is applied, only those resources that match the criteria specified in the filter are given as a result.

- **Actions** are operations that have to be performed on the resource and are applied to the output of the filters specified in the policy when the rule is run. Actions can include things like terminating an EC2 instance, deleting an S3 bucket, or sending an email notification.

So essentially, a rule is a file that includes logic defined by a policy that performs certain actions on the resource based on the filters provided by the user. Rules can include multiple policies, and policies include resource filters and actions.

<DocImage path={require('./static/anatomy_of_a_rule.png')} width="70%" height="70%" title="Click to view full size image" />

<DocImage path={require('./static/rule_example.png')} width="80%" height="80%" title="Click to view full size image" />

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

## Rule Sets

As mentioned previously, a Rule can have multiple policies. However, when there are multiple rules with multiple policies, it can become hard to manage them all together. This is where rule sets come into the picture. Rule sets serve as logical bindings on top of individual rules that help you organize and manage rules. By organizing rules into sets, organizations improve accessibility and simplify maintenance, as enforcements can be made against the entire rule set rather than individual rules.

  <DocImage path={require('./static/rule_set.png')} width="90%" height="90%" title="Click to view full size image" />

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


## Enforcements

Enforcements enable you to enforce a certain set of rules or rule sets (also known as governance guardrails) against a specific set of targets (accounts, subscriptions, and projects) to run periodically. Sometimes, we need rules to run periodically, such as every day, week, or month. However, running these rules manually every day or week at a specified time creates extra overhead and is a slow process prone to manual errors. To solve this, enforcements allow users to set up a timely schedule and choose the day, time, and frequency at which they want their rules or rule sets to be enforced.

For example, a user can create an enforcement to schedule the deletion of all unused EC2 instances older than 60 days. This enforcement will run on the **days specified by the user**, at the **specified time**, and with the **specified frequency (hourly, daily, monthly**). For instance, you could set it to run daily at 2:00 AM to ensure that any EC2 instances meeting the criteria are removed. Alternatively, you might choose to run it hourly during peak usage times, or monthly for less critical cleanup tasks. 

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