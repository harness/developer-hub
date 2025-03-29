---
title: Setting up 
description: This topic describes how you can set up Commitment Orchestrator 
# sidebar_position: 2
helpdocs_topic_id: 
helpdocs_category_id: 
helpdocs_is_private: false
helpdocs_is_published: true
---

Commitment Orchestrator can be found on our dashboard under [Cloud Costs module](https://app.harness.io/). Commitment Orchestrator can be easily setup from the dashboard itself by following these steps:

From the dashboard, click on the Commitment Orchestrator option. Then click on "Manage Accounts" -> "+Add Orchestration". 

### Step 1 : Setting up the master account 

You need to select the master account with the right permissions to be added via connector on which you want to enable orchestration. 

You can either select an existing connector for your master account or create one. Please note, even if "Commitment Orchestrator" is enabled in Connector Set Up for any other Account except for Master, it will not be visible in the connector list in Commitment Orchestrator Setup since Commitment Orchestrator requires Master Account connector.

<DocImage path={require('./static/step-one.png')} width="80%" height="80%" title="Click to view full size image" />

### Step 2: Coverage Percentage, Commitment Orchestration Engine Mode and Payment Option

- **Coverage Percentage:** Coverage Percentage is the Percentage of your compute spend that you want to be covered by RIs or Savings Plans. The remaining compute spend that is not covered by any commitments will continue to run as on-demand (or spot, if applicable). This will be the target Coverage % for Commitment Orchestrator's automation, and will apply across your linked AWS Payer Account(s)

- **Commitment Orchestration Engine Mode:** Select your preferred engine mode for commitment orchestration:

* **Automated Actions without Manual Approval**: System will automatically execute recommended commitment purchases without requiring approval.
* **Automated Actions with Manual Approval**: System will generate recommendations that require manual approval before execution.

- **Payment Option**

Select your preferred payment structure for commitments:

- **No Upfront**: Pay the entire commitment amount in monthly installments.
- **Partial Upfront**: Pay a portion of the commitment upfront and the remainder in monthly installments.
- **Full Upfront**: Pay the entire commitment amount upfront for maximum discount.

<DocImage path={require('./static/step-two.png')} width="80%" height="80%" title="Click to view full size image" />

### Step 3: Review
After all the set-up steps, you can review and finalise your inputs.

<DocImage path={require('./static/step-three.png')} width="80%" height="80%" title="Click to view full size image" />

Post set-up, you can view your dashboard with all the information required . You can manipulate the information shown according to the filters such as **Accounts, Instances and Regions** and see all the information related to :
- Compute Spend
- Compute Coverage
- Savings
- Commitment Utilisation

You can also view the Log history and Active Actions. 

<DocImage path={require('./static/dashboard-co.png')} width="80%" height="80%" title="Click to view full size image" />

## Interactive walkthrough for set-up:
 <iframe 
     src="https://app.tango.us/app/embed/30ae820c-7055-4b85-b11b-2ecdaae818b4" 
     title="Set up Commitment Orchestrator" 
     style={{minHeight:'640px'}}
     width="100%" 
     height="100%" 
     referrerpolicy="strict-origin-when-cross-origin" 
     frameborder="0" 
     webkitallowfullscreen="webkitallowfullscreen" 
     mozallowfullscreen="mozallowfullscreen" 
     allowfullscreen="allowfullscreen"></iframe>


