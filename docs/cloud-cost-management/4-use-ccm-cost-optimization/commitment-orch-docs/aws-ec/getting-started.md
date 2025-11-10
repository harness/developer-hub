---
title: Get Started
description: This topic describes Commitment Orchestrator and its working.
sidebar_position: 2
helpdocs_topic_id: 
helpdocs_category_id: 
helpdocs_is_private: false
helpdocs_is_published: true
---

### Before You Begin

To setup Commitment Orchestrator in Harness CCM, you need:

- **Active CCM Connectors**: You must have at least one active cloud connector set up for the cloud providers you want to categorize costs for: Set Up [CCM Connectors](/docs/cloud-cost-management/get-started#aws).

- A master account with the right permissions to be added via AWS connector on which you want to enable orchestration.

- **Required Permissions**: Your Harness user account must belong to a user group with the following role permissions:

<details>
<summary>Required Permissions</summary>
To enable visibility, in the master account connector, you need to add the following permissions.

```
"ec2:DescribeReservedInstancesOfferings",
"ce:GetSavingsPlansUtilization",
"ce:GetReservationUtilization",
"ec2:DescribeInstanceTypeOfferings",
"ce:GetDimensionValues",
"ce:GetSavingsPlansUtilizationDetails",
"ec2:DescribeReservedInstances",
"ce:GetReservationCoverage",
"ce:GetSavingsPlansCoverage",
"savingsplans:DescribeSavingsPlans",
"organizations:DescribeOrganization"
"ce:GetCostAndUsage"
```

And to enable actual orchestration, you need to add the following permissions.
```
"ec2:PurchaseReservedInstancesOffering",
"ec2:GetReservedInstancesExchangeQuote",
"ec2:DescribeInstanceTypeOfferings",
"ec2:AcceptReservedInstancesExchangeQuote",
"ec2:DescribeReservedInstancesModifications",
"ec2:ModifyReservedInstances"
"ce:GetCostAndUsage"
savingsplans:DescribeSavingsPlansOfferings
savingsplans:CreateSavingsPlan
```
</details>

-----

## Steps to configure:

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

- Go to Commitment Orchestrator > Setup Orchestrator.

<Tabs>
<TabItem value="step1" label="Account and Service details" default>

- Specify the cloud account and service for which you want to enable orchestration. Currently, Commitment Orchestrator supports AWS Elastic Compute Cloud (EC2). Support for other cloud providers is in the works.

- Specify the Master Account Connector. You need to select the master account with the right permissions to be added via connector on which you want to enable orchestration.  You can either select an existing connector for your master account or create one. Please note, even if "Commitment Orchestrator" is enabled in Connector Set Up for any other Account except for Master, it will not be visible in the connector list in Commitment Orchestrator Setup since Commitment Orchestrator requires Master Account connector.


<DocImage path={require('./static/stepone-copy.png')} width="80%" height="80%" title="Click to view full size image" />

</TabItem>
<TabItem value="step2" label="Orchestrator Exclusions (Optional)">

Commitment Orchestrator provides you with an option to exclude Accounts, Regions and Instances from the orchestration.

-   Account Exclusions: You can include or exclude specific accounts from the orchestration. The accounts marked as included will be considered for RI Orchestration.

<DocImage path={require('./static/steptwo-copy.png')} width="100%" height="100%" title="Click to view full size image" />

-   Region Exclusions: You can include or exclude specific regions from the orchestration. All the regions are shown with their coverage and compute spend for making an informed decision

<DocImage path={require('./static/stepthree-copy.png')} width="100%" height="100%" title="Click to view full size image" />

-   Instance Exclusions: You can include or exclude specific instances from the orchestration. 


<DocImage path={require('./static/stepfour-copy.png')} width="100%" height="100%" title="Click to view full size image" />

:::important note 
The purchases will happen only at master account level and thus will be in turn applicable for child accounts as well. The exclusion list will only be considered for the compute spend calulations and actual RI/SP may be used against the instances if they are part of child accounts.
:::

</TabItem>
<TabItem value="step3" label="Orchestration Preferences">

- **Target Coverage:** The Target Coverage is the percentage of your compute spend that you want to be covered by Savings Plans or Reserved Instances. The remaining amount will continue to run as on-demand. This is capped at 75%. Commitment orchestrator automatically adjust coverage based on usage patterns. You can set the maximum limit up to which this can increase.

- **Atomization:** Atomisation helps with restricting all RI base transactions to a specified date. Commitment Orchestrator intends to buy a seed RI on a monthly basis in each of the regions to create a situation where in the future there would be a seed RI expiring on a monthly basis.

    Atom RI helps with restricting all RI based transactions to a specified date. To extend on this approach, Harness Commitment Orchestrator intends to buy an Atom RI on a monthly basis in each of the regions to create a situation where in the future there would be a Atom RI expiring on a monthly basis.
    This provides Harness Commitment Orchestrator with a unique situation of being able to aggressively perform RI based exchanges to obtain higher savings with low risk factor.

<DocImage path={require('./static/stepfive-copy.png')} width="100%" height="100%" title="Click to view full size image" />


You can select the atom purchase frequency and select the atom purchase terms and you can also see the cost implications pf atomization


<DocImage path={require('./static/stepsix.png')} width="80%" height="80%" title="Click to view full size image" />

</TabItem>
<TabItem value="step4" label="Step 4: Review & Complete">

### Review

After all the set-up steps, you can review and finalise your inputs.

<DocImage path={require('./static/stepseven.png')} width="80%" height="80%" title="Click to view full size image" />

</TabItem>
</Tabs>
