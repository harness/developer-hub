---
title: Harness Concepts
description: This topic describes how to optimize cloud costs using asset governance.
# sidebar_position: 2
---


# Harness Concepts: Rules, Rule Sets, Enforcements and Evaluations to optimise cloud costs

## Rules

Rules help you set up Asset Governance for your cloud provider. A Rule is essentially a small file with a set of logic that you can run on your cloud infrastructure. For example, there might be a scenario in which you want to delete all low utilised load balancers where packet count is less than 1000 in last 72 hours on Azure. In such a case, we write and run a rule which does this for us.

Ideally, rules include policy, resource, filters, and actions.

- A **policy** is defined in YAML format and consists of filters and actions that are applied to a specific type of cloud resource.

- A **resource** is the type of cloud resource or service on which the rule will be run with the actions and filters, such as Azure VMs, AKS, Cosmos DB, etc.

- A **filter**, as the name suggests, is a criteria used to narrow down the results based on the attributes. These attributes can include anything such as tags, metadata, or any other resource property provided by you. When the filter is applied, only those resources that match the criteria specified in the filter are given as a result.

- **Actions** are operations performed on the filtered resources. Actions include things like terminating an azure vm, deleting an azure storage-container, or sending an email notification.

<DocImage path={require('../static/anatomy_of_a_rule.png')} width="70%" height="70%" title="Click to view full size image" />

So essentially, **a Rule is a file that includes logic defined by a policy that performs certain actions on the resource based on the filters provided by the user**. Rules can include multiple policies, and policies include resource, filters and actions. 

<DocImage path={require('../static/rule_example.png')} width="80%" height="80%" title="Click to view full size image" />

:::important note
Number of Rules per Account[Custom + OOTB] can be 300.
:::

### Create a new Rule

1. In **Harness**, go to **Cloud Costs**.
2. Select **Asset Governance**.
3. Select **Rules**.
4. Select **+ New Rule**. 


  <DocImage path={require('../static/asset-governance-rule-creation.png')} width="90%" height="90%" title="Click to view full size image" />

5. Enter a name for the rule.
6. Select the cloud provider.
7. Optionally, enter a description of the rule.
8. Select **Apply**.
9. Enter the YAML policy in the rule editor.
10. Select **Save**. If the policy is invalid, an error message is displayed.

10. Select the **Account** and the **Region** from the dropdown list in the Test Terminal.
11. Select **Dry Run** to view the instances or services that will be acted upon when you enforce the rule.
12. After evaluating the output, select **Run Once** to execute the rule. 

  <DocImage path={require('../static/rule_window.png')} width="90%" height="90%" title="Click to view full size image" />

:::info
Harness provides some out-of-the-box policies for azure.vm, azure.disk, azure.cosmosdb, etc. that can be enforced. These policies cannot be edited but can be cloned.
:::
### Update a Rule

You can view the Rules on the Asset Governance Rules page. You can click on Edit button from the vertical ellipsis menu (⋮) to edit a Rule or simply click on the Rule to open Rule editor and then make changes.

### Delete a Rule

To delete a Rule Set, click on Delete from the vertical ellipsis menu (⋮).

  <DocImage path={require('../static/update_and_delete.png')} width="90%" height="90%" title="Click to view full size image" />


## Rule Sets

As mentioned previously, a Rule can have multiple policies. However, when there are multiple rules with multiple policies, it can become hard to manage them all together. This is where **Rule Sets** can be used. Rule sets serve as logical bindings on top of individual rules that help you organize and manage rules. By organizing rules into sets, organizations improve accessibility and simplify maintenance, as enforcements can be made against the entire rule set rather than individual rules.

  <DocImage path={require('../static/rule_set.png')} width="90%" height="90%" title="Click to view full size image" />
  
:::info
A Rule Set can have upto 30 Rules in it.
:::

### Create a new Rule Set

To create a Rule Set, perform the following steps:

1. In **Harness**, go to **Cloud Costs**.
2. Select **Asset Governance**.
3. Select **Rules**.
4. Select the **Rule Sets** tab.
5. Select **+ New Rule Set**.
6. Enter a name for the rule set.
7. Optionally, enter a description of the rule set.
8. Select the cloud provider.
9. Select the rules that you want to add to the rule set. 
10. Select **Create Rule Set**. 
The rule set is created successfully.

  <DocImage path={require('../static/create-new-rule-set.png')} width="90%" height="90%" title="Click to view full size image" />


  <DocImage path={require('../static/view-rule-set.png')} width="90%" height="90%" title="Click to view full size image" />

11. You can view the rule set on the **Asset Governance Rules** page. Expand the rule set to view the individual rules in the rule set.
12. Select **Enforce Rule Set** in the Enforcements column to enforce this rule set.

### Update a Rule Set

You can view the Rule Set on the Asset Governance Rules page. Expand the rule set to view the individual rules in the rule set. You can click on Edit button from the vertical ellipsis menu (⋮) to edit the rule set.

### Delete a Rule Set
To delete a Rule Set, click on Delete from the vertical ellipsis menu (⋮).

 <DocImage path={require('../static/update_and_delete_ruleSet.png')} width="90%" height="90%" title="Click to view full size image" />

## Enforcements

Enforcements enable you to enforce a certain set of Rules or Rule Sets (also known as governance guardrails) against a specific set of targets (accounts, projects, or subscriptions) to run periodically. Sometimes, we need rules to run periodically, such as every day, week, or month. However, running these rules manually every day or week at a specified time creates extra overhead and is a slow process prone to manual errors. To solve this, Enforcements allow users to set up a timely schedule and choose the day, time, and frequency for their rules or rule sets.

For example, a user can create an Enforcement to schedule the deletion of all unattached disks. This Enforcement will run on the **days specified by the user**, at the **specified time**, and with the **specified frequency (hourly, daily, monthly**). For instance, you could set it to run daily at 2:00 AM to ensure that any unattached disks meeting the criteria are removed. Alternatively, you might choose to run it hourly during peak usage times, or monthly for less critical cleanup tasks. 

While setting up a new Enforcement, you can select the following:
- **Cloud provider**: Currently we support AWS, Azure and GCP.
- **Rules/ Rule Sets**: You can select the Rules or Rule Sets that your Enforcement will consist of.
- **Target Accounts and Regions**: The target accounts and regions that you will be running the Enforcements on.
- **Frequency**: The frequency for running the Enforcement. Currently, it can be set for hourly, daily or weekly.
- **Time**: After setting the frequency, you can choose the time at which it runs.
- **Dry Run Mode**: You can choose to run your Enforcement in Dry Run mode which will generate a simulation of the rule enforcement instead of performing actions.

  <DocImage path={require('../static/enforcements.png')} width="95%" height="95%" title="Click to view full size image" />

:::important note
- Number of Targets in an Enforcement can be upto 200.
- Number of Regions in Enforcement can be upto 30.
- Number of Rule Sets in Enforcement can be upto 30.
- Number of Rules in Enforcement can be upto 30.
:::

### Create a new Enforcement
To create an Enforcement, perform the following steps:

1. In your **Harness** application, go to **Cloud Costs**.
2. Select **Asset Governance**.
3. Select **Enforcements**.
4. Select **+ New Enforcement**.
5. Enter a name for the Enforcement.
6. Optionally, enter a description of the Enforcement.
7. Select the cloud provider.
8. Select the Rules or Rule Sets that you want to enforce. You can use the **Search** box if you have multiple rules and are looking to enforce a particular rule or rule set.
9. Select **Continue**. 
    <DocImage path={require('../static/create_enforcement.png')} width="90%" height="90%" title="Click to view full size image" />
10. Select the target accounts and target regions. You could select multiple accounts and regions.
11. Set the frequency from **Hourly**, **Daily**, or **Weekly** options. In case you select Daily or Weekly, specify the day, time, and time zone to run the rule on schedule.
12. Toggle the **Dry Run** mode if you do not want to take action immediately.
13. Select **Finish**. 

    <DocImage path={require('../static/set-up-schedule.png')} width="90%" height="90%" title="Click to view full size image" />

After setting up the schedule, you can view the Enforcement on the **Enforcements** page. 

<DocImage path={require('../static/enforcements_list.png')} width="90%" height="90%" title="Click to view full size image" />

Furthermore, you can disable the Enforcement at any time using the toggle button in the **Status** column. If you want to turn off the dry-run mode, select **Edit** from the vertical ellipsis menu (⋮) then go to "Target And Schedule", use slider to turn off "Enforce Rule(s) in Dry Run mode" and click on Finish.

### Update an Enforcement

You can view any Enforcements on Rule Enforcements page. Click on the enforcement to view details such as the rules, target accounts, and regions included in the enforcement. For updating, you can use the "Edit" button from the vertical ellipsis menu (⋮) to update the enforcements as per your convenience.

### Delete an Enforcement

To delete an enforcement, simply click on “Delete” from the vertical ellipsis menu (⋮).

<DocImage path={require('../static/update_and_delete_enforcement.png')} width="90%" height="90%" title="Click to view full size image" />

## Evaluations

Evaluations include all the data about enforcements run (both RUN ONCE from rule editor and from Enforcement). The Evaluations window also shows you the total cost impact with each Enforcement i.e. the costs or spendings associated with each Evaluation along with the last time that Rule/Rule set was enforced. With Evaluations, you can view and audit all the Enforcements that ran in the past.

Harness CCM also supports multiple statuses for evaluations. Currently CCM supports three statuses for an evaluation:

- Success: If the evaluation is completed without any errors, the status of the evaluation is shown as "Successful".
- Failure:  If the evaluation is not completed and has errors, the status of the evaluation is shown as "Failure".
- Partial Success: If the evaluation is successful without any Harness errors but Cloud Custodian has additional logs and/or in case of multi-policy evaluations, if the evaluation was successful only for a subset of resources, the status is shown as "Partial Success".

<DocImage path={require('../static/evaluations_azure.png')} width="90%" height="90%" title="Click to view full size image" />

### View Evaluations

1. In your **Harness** application, go to **Cloud Costs**.
2. Select **Asset Governance**.
3. Select **Evaluations**.
4. You can see all the Evaluations of Rules listed on  the window.
4. Select the rule for which you want to view the Evaluation details. The target subscription, region, identified resources and evaluation logs are displayed.

<DocImage path={require('../static/evaluations.png')} width="90%" height="90%" title="Click to view full size image" />


### Filters in Evaluations List Page

You can create filters to view selected rules:

1. Select the filter icon.
2. Enter a name.
3. Select who can edit and view the filter.
4. Select one or more of the following criteria to filter the results:
    * Rules
    * Rule Sets
    * Enforcements
    * Minimum Cost Impact ($)
    * Cloud Provider
    * Azure Filters
      - Azure Subscription
      - Target Regions

5. Select **Apply**.

  <DocImage path={require('../static/filter-evalaution-rules.png')} width="40%" height="40%" title="Click to view full size image" />

:::important note
Number of evaluations for which we can compute cost impact is 1,50,000/ Day.
:::

## Testing Terminal

In the rule editor, a test terminal is present for users to see the output in the terminal itself upon evaluating a Rule. This is done to ensure that users can run the rules and try accordingly to check how the output would look on the selected subscription and region. There are two options: first, to select the target subscription and second, to select the regions. After providing the relevant inputs, the users can select either to dry run the rule first, run it once or enforce the rule. 

<DocImage path={require('../static/outputTerminal.png')} width="90%" height="90%" title="Click to view full size image" />

After this, the resources identified are shown on the output terminal in JSON format. With this output, users can perform different actions like searching, downloading, filtering, sorting and picking. 

<DocImage path={require('../static/Ouputscreen.png')} width="90%" height="90%" title="Click to view full size image" />

#### Searching in Output Terminal
After the output is rendered, users can search for any keywords in the output terminal. This streamlines troubleshooting and debugging processes and helps to efficiently locate required information amidst large volumes of output data. 

#### Zip Downloads
The JSON output can be downloaded in either JSON format or a CSV format(original or flatted) into a single zip archive.

#### JSON Filtering
The output can be filtered based on the keys present in the JSON output. Currently, filtering on the basis of `==`, `!=`, `<`, `<=`, `>`, `>=` is supported in terms of numeric key values and if the key's value is a string, string matching using `LIKE` is supported. This feature enables users to extract specific fields, filter out irrelevant data, and perform relevant queries on JSON datasets.

#### Sorting
The output can be sorted based on the keys present in the JSON output in either an `ASCENDING` or `DESCENDING` manner.

#### Pick
If output needs to be streamlined and only a few keys-value pairs are required, 'Pick' functionality can be used. Using this, users can pick only the required keys and see the data associated with them in the output.

:::info
If multiple Regions and/or multiple Subscriptions are selected, the Output Terminal will render the links to the Evaluations page for all the individual evaluations per Subscription-Region pair. From that page, upon clicking on individual evaluations, detailed output and logs can be seen.
:::

