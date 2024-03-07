---
title: Create and execute rules
description: This topic describes how to optimize cloud costs using asset governance.
# sidebar_position: 2
---

### Governance in detail

#### Rule
Anatomy of a Rule: Cloud policies use a declarative vocabulary of resources, filters, and actions to be configured in YAML. 

- Policy: A Cloud Custodian policy is defined in YAML format and consists of a set of filters and actions that are applied to a specific type of AWS resource.

- Resource: In Cloud Custodian, a cloud resource or service (such as ASG, S3, EC2, ELBs, RDS, etc.) is referred to as a "key" in a policy file. This key specifies the type of cloud resource or service that the following actions and filters act upon. Go to Cloud Custodian documentation for more information.

- Filters: In Cloud Custodian, filters are criteria that are used to narrow down resources based on their attributes. These attributes include tags, metadata, or other resource properties. The result of a filter is an output of resources that meet the criteria specified in the filter. This output is then used as the input for the actions defined in the policy. Filters in Cloud Custodian are essentially key-value pairs that can also be used more generically. They allow users to specify conditions that must be met for a resource to be included in the output. Go to Cloud Custodian documentation for more information.

- Actions: In Cloud Custodian, actions are operations that can be performed on a resource and are applied to the output of the filters specified in the policy. Actions can include things like terminating an EC2 instance, deleting an S3 bucket, or sending an email notification.Actions in Cloud Custodian are essentially webhooks that are executed when the criteria specified in the policy are met. These webhooks can also be used more generically, allowing the automation of a wide range of tasks.

##### CRUD operations on Rule:
** 1. Creating a Rule **
** 2. Updating a Rule **
** 3. Deletng a Rule **

#### Rule Sets
Rule sets serve as logical bindings on top of individual rules that help you organize and manage rules. They are especially useful when dealing with numerous rules, as it can become challenging to keep track of them individually and they streamline governance by grouping related regulations, making them easier to track and maintain.

By organizing rules into sets, organizations improve accessibility and simplify maintenance, as changes can be made to entire sets rather than individual rules. Rule sets help to keep rules organized and easily accessible, making it easier to manage and maintain complex rule configurations.

##### CRUD operations on Rule Sets:
** 1. Creating a Rule Set **
** 2. Updating a Rule Set **
** 3. Deletng a Rule Set **

#### Enforcements
Enforcements are automated actions taken when predefined conditions are met within our environment. These actions are typically designed to ensure compliance with governance policies, optimize resource utilization, enhance security, or streamline operations. For instance, an enforcement might automatically scale resources up or down based on predefined thresholds or schedule the deletion of unused instances after a specified period. 

The advantages of enforcements lie in their ability to automate routine tasks, reduce manual intervention, ensure consistency in policy enforcement, improve resource efficiency, and enhance overall system reliability and security. By automating actions based on predetermined conditions, enforcements enable organizations to maintain governance, optimize operations, and adapt to changing environments more effectively.

#### Evaluations
#### Audits
#### RBAC
#### Testing Terminal 

In our rule editor, we have a test terminal so that when customers are trying out their rules, they can see the output in the terminal itself. This is done to ensure that customers can run the rules and try them accordingly to check how the output would look on the selected region and account on our terminals. We give them two options: first, to select the target region, and second, to select the subscription. They can provide the relevant inputs and run the rule at once, or they can choose to try and generate a simulation of rule enforcement. The test terminal helps with effective debugging and also assists in trying out the rules.

#### Cost Correlation

**Cost Correlation refresh API**

This API would be used to refresh or update the cost of all the resources in the evaluation. This API is exposed to resolve the case where cost for any resource are not yet part of CUR, Billing Report or Billing Data yet(due to newly deployed resources etc).
Limit: For any evaluation you can hit the refresh cost button only one time in last 30 minutes.
