---
title: Setting up 
description: This topic describes how you can set up Commitment Orchestrator 
# sidebar_position: 2
helpdocs_topic_id: 
helpdocs_category_id: 
helpdocs_is_private: false
helpdocs_is_published: true
---

## Getting Started
Commitment Orchestrator can be found on our dashboard under [Cloud Costs module](https://app.harness.io/). 

Commitment Orchestrator can be easily setup from the dashboard itself by following these steps:

### Step 1 : Setting up the master account 

You need to select the master account with the right permissions to be added via connector on which you want to enable orchestration. 

You can either select an existing connector for your master account or create one. Please note, even if "Commitment Orchestrator" is enabled in Connector Set Up for any other Account except for Master, it will not be visible in the connector list in Commitment Orchestrator Setup since Commitment Orchestrator requires Master Account connector.

<DocImage path={require('./static/step-one.png')} width="80%" height="80%" title="Click to view full size image" />

### Step 2: Exclude Child Accounts and Instances
Commitment Orchestrator provides you with an option to choose the child accounts and instances you would like to exclude when orchestrating for Compute Usage.
<DocImage path={require('./static/Step2.png')} width="80%" height="80%" title="Click to view full size image" />

:::important note 
The purchases will happen only at master account level and thus will be in turn applicable for child accounts as well. The exclusion list will only be considered for the compute spend calulations and actual RI/SP may be used against the instances if they are part of child accounts.
:::

### Step 3: Coverage Percentage and SP/RI split
Coverage Percentage: The Coverage percentage is the percentage of your compute spend that you want to be covered by Savings Plans or Reserved Instances. The remaining amount will continue to run as on-demand.

SP/RI split: Out of the totally compute spend, you have the option to split it between Convertible Reserved Instances and Compute Savings Plan. Out of total coverage, the system automatically calculates the maximum guardrail for purchasing the Savings Plans given the past compute spend data to ensure limiting any over purchase of saving plans. You can reduce the percentage by increasing share of Reserved Instances. However, you can't increase the coverage via Savings Plan beyond the max limit.

<DocImage path={require('./static/Step3.png')} width="80%" height="80%" title="Click to view full size image" />

### Step 4: Review
After all the set-up steps, you can review and finalise your inputs.
<DocImage path={require('./static/Step4.png')} width="80%" height="80%" title="Click to view full size image" />

Post set-up, you can view your dashboard with all the information required . You can manipulate the information shown according to the filters such as Instances and Regions and see all the information related to Computer Coverage, Savings, Commitment Utilisation alongwith Log history. This way, the dashboard allows you to easily keep a track of your commitments and make informed decisions.

<DocImage path={require('./static/dashboard_co.png')} width="80%" height="80%" title="Click to view full size image" />

#### Interactive walkthrough for the same:
 <iframe 
     src="https://app.tango.us/app/embed/845a1973-c350-4d4e-b5cc-51ad3482c0f9" 
     title="Set up Commitment Orchestrator" 
     style={{minHeight:'640px'}}
     width="100%" 
     height="100%" 
     referrerpolicy="strict-origin-when-cross-origin" 
     frameborder="0" 
     webkitallowfullscreen="webkitallowfullscreen" 
     mozallowfullscreen="mozallowfullscreen" 
     allowfullscreen="allowfullscreen"></iframe>
