---
title: Get Started
description: This topic describes how you can set up Commitment Orchestrator 
# sidebar_position: 2
helpdocs_topic_id: 
helpdocs_category_id: 
helpdocs_is_private: false
helpdocs_is_published: true
---

Commitment Orchestrator can be found on Harness' dashboard under [Cloud Costs module](https://app.harness.io/). 

Prerequisites:

- A master account with the right permissions to be added via [AWS connector](https://app.harness.io/cloud-cost-management/aws-connector) on which you want to enable orchestration.


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="step1" label="Step 1: Master Account Setup" default>

### Setting up the master account 

You need to select the master account with the right permissions to be added via connector on which you want to enable orchestration. 

You can either select an existing connector for your master account or create one. Please note, even if "Commitment Orchestrator" is enabled in Connector Set Up for any other Account except for Master, it will not be visible in the connector list in Commitment Orchestrator Setup since Commitment Orchestrator requires Master Account connector.

Select "EC2" .

<DocImage path={require('./static/stepone.png')} width="80%" height="80%" title="Click to view full size image" />

</TabItem>
<TabItem value="step2" label="Step 2: Exclusions">

### Exclusion

Commitment Orchestrator provides you with an option to choose the child accounts and instances you would like to exclude when orchestrating for Compute Usage.

<DocImage path={require('./static/steptwo.png')} width="100%" height="100%" title="Click to view full size image" />
<DocImage path={require('./static/stepthree.png')} width="100%" height="100%" title="Click to view full size image" />

:::important note 
The purchases will happen only at master account level and thus will be in turn applicable for child accounts as well. The exclusion list will only be considered for the compute spend calulations and actual RI/SP may be used against the instances if they are part of child accounts.
:::

</TabItem>
<TabItem value="step3" label="Step 3: Coverage Percentage">

### Coverage Percentage and Engine Mode

**Coverage Percentage:** The Coverage percentage is the percentage of your compute spend that you want to be covered by Savings Plans or Reserved Instances. The remaining amount will continue to run as on-demand.

**Engine mode:** Select your preferred engine mode for commitment orchestration that can either be "Automated Actions without manual approval" or "Automated Actions with manual Approval"

<DocImage path={require('./static/stepfour.png')} width="100%" height="100%" title="Click to view full size image" />

</TabItem>
<TabItem value="step4" label="Step 4: Review & Complete">

### Review

After all the set-up steps, you can review and finalise your inputs.

<DocImage path={require('./static/stepfive.png')} width="80%" height="80%" title="Click to view full size image" />

</TabItem>
</Tabs>

## Commitment Orchestrator Dashboard


<DocImage path={require('./static/dashboard-co.png')} width="80%" height="80%" title="Click to view full size image" />


Post set-up, you can view your dashboard with all the information required . You can manipulate the information shown according to the filters such as Instances and Regions and see all the information related to Computer Coverage, Savings, Commitment Utilisation alongwith Log history. This way, the dashboard allows you to easily keep a track of your commitments and make informed decisions.

- **Compute Spend**: Total amount spent on EC2 compute resources across your selected accounts, instance families, and regions. This includes both On-Demand and Reserved Instance and/or Savings Plans costs, providing a comprehensive view of your EC2 expenditure over the selected time period.

- **Compute Coverage**: Percentage of your EC2 compute usage that is covered by Reserved Instances or Savings Plans. 

- **Savings**: Total cost savings achieved through Reserved Instances, Savings Plans as compared to On-Demand rates. This shows the actual dollar amount saved by using commitment orchestration and helps quantify the ROI of your optimization efforts.

- **Commitment Utilisation**: Percentage of your purchased Reserved Instances and Savings Plans that are actively being used. 

### Compute Coverage Graph

<DocImage path={require('./static/dashboard-co.png')} width="80%" height="80%" title="Click to view full size image" />

The Compute Coverage Graph provides a visual representation of your EC2 compute usage coverage by Reserved Instances and Savings Plans over time. You can customize the view by grouping the data by:

- **Commitment Type**: Compare coverage between, On-Demand, Reserved Instances and Savings Plans to understand which commitment types are providing the most coverage and total cost across all commitment types.
- **Instance Family**: Analyze coverage across different EC2 instance families (e.g., m5, c5, r5) to identify optimization opportunities.
- **Region**: View coverage distribution across AWS regions to ensure balanced commitment utilization geographically.

### Savings Graph

<DocImage path={require('./static/savings-graph.png')} width="80%" height="80%" title="Click to view full size image" />

The Savings Graph displays the total cost savings achieved through Reserved Instances and Savings Plans compared to On-Demand rates. You can customize the view by grouping the data by:

- **Commitment Type**: Compare savings from Reserved Instances, and Savings Plans to understand which commitment types are delivering the most value
- **Instance Family**: Analyze savings across different EC2 instance families (e.g., t2, t3) to identify the most cost-effective instance types
- **Region**: View savings distribution across AWS regions to optimize your regional commitment strategy

### Commitment Utilisation Graph

The Commitment Utilisation Graph shows the percentage of your purchased Reserved Instances and Savings Plans that are actively being used. This line chart displays utilization trends for both commitment types and includes detailed metrics for each commitment:

- **Name**:  Reserved Instance or Savings Plan
- **Compute Spend**: The amount of compute costs covered by the commitment
- **Utilisation**: The absolute utilization amount
- **Utilisation (%)**: The percentage utilization rate

### Log History

The Log History section provides a comprehensive audit trail of all Commitment Orchestrator activities, including recommendation generation, action execution, cost impact tracking, configuration changes, error logs, and performance metrics. The log history is filterable by date range, account, region, and action type, making it easy to analyze specific periods or troubleshoot particular issues.

### Active Actions

The Active Actions feature enables users to review and manage recommendations generated by the Commitment Orchestrator. You can view all recommendations categorized by day and type, then approve or reject them individually, in subsets, or all at once across different master accounts and regions.

<DocImage path={require('./static/native-user-approval.png')} width="100%" height="100%" title="Click to view full size image" />

### Supported Actions:

The Commitment Orchestrator supports six action states currently:

* **APPROVED**: You can approve the recommendation, allowing the action to proceed.
* **REJECTED**: You can choose to reject the recommendation, preventing the action from taking place.
* **APPROVAL_PENDING**: The action is pending approval by the user. This is the default state for all recommendations and any pending actions will expire in 24 hours.
* **EXPIRED**: The recommended action has expired.
* **ERROR**: The approval process encounters an error.
* **COMPLETED**: The approved recommendation has been successfully completed.

<DocImage path={require('./static/action-state.png')} width="90%" height="90%" title="Click to view full size image" />


:::info
You can change and select the mode (either automatic approval or manual approval) during the setup flow. 
:::

