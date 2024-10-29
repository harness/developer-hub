---
title: Commitment Orchestrator for AWS RDS Standard RIs
description: This topic describes Commitment Orchestrator and its working.
# sidebar_position: 2
helpdocs_topic_id: 
helpdocs_category_id: 
helpdocs_is_private: false
helpdocs_is_published: true
---

### What are AWS RDS Reserved Instances (RIs)?

Amazon Relational Database Service (RDS) Reserved Instances (RIs) are long-term reservations designed to provide substantial cost savings compared to On-Demand pricing. By committing to specific database instances for either a one- or three-year term, RDS RIs offer a predictable cost structure, enabling AWS users to optimize expenses as their operations scale.

RDS supports a variety of instance types, each optimized for different workloads and performance requirements. Choosing the right instance type is essential for achieving both efficiency and cost-effectiveness with Reserved Instances. This approach not only reduces costs but also supports capacity reservation within specific Availability Zones, ensuring that your applications have reliable scalability and consistent performance — crucial for workloads that demand uninterrupted database access and high uptime.

RDS Reserved Instances (RIs) work by allowing you to commit to a specific type of database instance for a set period—either one or three years—in exchange for a lower price compared to On-Demand rates. This model is particularly cost-effective for databases that run continuously, as it significantly reduces long-term costs.

Once a Reserved Instance is purchased, AWS automatically applies the discounted rate to eligible database (DB) instance classes on your bill, ensuring you benefit from the savings without needing to manually track instances. The level of discount depends on factors such as:

1. **DB Instance Type**: The specific database instance type you commit to, as instance classes vary in cost and capacity.
2. **DB Engine**: Different database engines (e.g., MySQL, PostgreSQL, Oracle) have varied pricing structures, impacting the discount you receive.
3. **Commitment Term**: Opting for a three-year term provides deeper savings than a one-year commitment.

By selecting an RDS RI that aligns with your database requirements, this pricing model allows you to optimize your AWS costs while effectively meeting your performance and scalability needs.

### Pricing

The pricing model for Amazon RDS Reserved Instances centers around the idea of commitment and upfront payment. 

- No upfront payment: You pay nothing upfront but commit to paying for the instance over the term.
- Partial upfront payment: You pay a part of the cost upfront, and the rest is spread out over the period.
- All upfront payment: You pay the entire cost upfront in one lump sum, receiving the largest discount.

### Challenges

Managing Reserved Instance (RI) commitments presents several challenges due to the complex nature of AWS resources and the need for careful monitoring and forecasting.

First, the variety and volume of Reserved Instances complicate management, as each RI may have different terms, expiration dates, and specifications. This diversity makes it difficult to monitor all RIs effectively and ensure they align with evolving needs.
Continuous monitoring of RI usage is also essential, as usage patterns can fluctuate. Striking a balance is crucial; overusing or underutilizing RIs can lead to inefficiencies, resulting in either missed savings opportunities or unnecessary costs. 
Forecasting future needs adds another layer of difficulty, as factors like product demand changes or new organizational priorities can impact resource requirements. This unpredictability makes it challenging to anticipate usage accurately, leading to the potential for unused commitments.

Additionally, the fear of overprovisioning may cause organizations to under-commit, sacrificing potential long-term savings. Effectively leveraging RIs requires a thorough understanding of workload cycles and the ability to anticipate both current and future demands. Ultimately, a balanced approach is needed to manage RI commitments while accommodating business needs.

Lastly, manually management of RIs can become a time-consuming a nd error-prone task, especially as infrastructure grows in complexity.
For Reserved Instance (RI) management, automation is valuable. Automated systems can continuously monitor RI usage and optimize commitments based on real-time data, ensuring RIs are neither over nor underutilized. This reduces the chances of overspending and enhances cost savings by adjusting resources dynamically to meet current demand.

Additionally, automation improves scalability and agility. When managing resources manually, scaling up or down to meet demand can be slow and reactive, potentially leading to lost revenue or user dissatisfaction. Automated systems, however, can respond instantly to usage fluctuations, scaling resources efficiently and cost-effectively. 

For this, we extended the capabilities of our Commitment Orchestrator to now support AWS RDS as well.

## Getting Started

### Step 1 : Setting up the master account 

You need to select the master account with the right permissions to be added via connector on which you want to enable orchestration. You can either select an existing connector for your master account or create one.

From the top down menu select "RDS".

<DocImage path={require('./static/RDS1.png')} width="100%" height="100%" title="Click to view full size image" />

### Step 2: Coverage Percentage, Commitment, orchestrator engine mode and payment option
Coverage Percentage: The Coverage percentage is the percentage of your compute spend that you want to be covered by Reserved Instances. The remaining amount will continue to run as on-demand or spot if available.

You can also choose a desire engine mode between automated actions with or without manual approval.

Currently we support 3 payment options:
- No Upfront
- Partial Upfront
- Full Upfront

<DocImage path={require('./static/RDS2.png')} width="100%" height="100%" title="Click to view full size image" />

After this is done, review summary and complete setup. RI purchase term is set for 1 year with no upfront payment strategy to ensure maximum guardrails from over commitment.

<DocImage path={require('./static/RDS3.png')} width="100%" height="100%" title="Click to view full size image" />

## Native User Approval
With this feature, users can approve the recommendations generated by the orchestrator. This feature enhances the functionality of the orchestrator by enabling user actions such as approval or rejection of recommendations generated by the engine. 

### Supported actions:

The Commitment Orchestrator supports six action states currently:

* **APPROVED**: You can approve the recommendation, allowing the action to proceed.
* **REJECTED**: You can choose to reject the recommendation, preventing the action from taking place.
* **APPROVAL_PENDING**: The action is pending approval by the user. This is the default state for all recommendations and any pending actions will expire in 24 hours.
* **EXPIRED**: The recommended action has expired.
* **ERROR**: The approval process encounters an error.
* **COMPLETED**: The approved recommendation has been successfully completed.

<DocImage path={require('./static/action_state.png')} width="90%" height="90%" title="Click to view full size image" />

### Action Center UI

In the Action Center UI, you can:

- View a list of all recommendations generated by the engine, categorized by day and recommendation type.
- Approve or reject recommendations individually, in subsets, or all at once.
- Perform actions on different master accounts and regions.

:::info
You can change and select the mode (either automatic approval or manual approval) during the setup flow. 
:::


## Current features:

1. **Enhanced Visibility**: Commitment Orchestrator gives insight into current account status, including detailed breakdowns of savings and resource utilization across all accounts and regions. (Requires visibility permission as part of the master account connector setup).
2. **Convertible RI Support**: It allows easy purchasing of Convertible Reserved Instances (RI) to optimize cost-efficiency and flexibility in resource allocation.
3. **Commitment Orchestrator Setup**: Commitment Orchestrator can be easily setup on your master account to centralize commitment management and streamline operations.
4. **Detailed Activity Logs**: Harness’ Commitment Orchestrator also provides comprehensive logs detailing every action performed within the Commitment Orchestrator, ensuring transparency and accountability.
5. **RBAC Support**: Role-Based Access Control (RBAC) is included to manage permissions and access levels within the Commitment Orchestrator, enhancing security and governance.

## FAQs
1. Which cloud providers are supported at the moment?

-  Currently, we support AWS Compute Saving Plans and Convertible RIs for EC2 and Standard RIs for RDS.

2. Is Audit trails support available?

-  Audit trails are supported but only if "Automated Actions with manual Approval" mode is selected when setting up the Commitment Orchestrator.

3. How many RI purchases happen in a month?

4. Where can I see the history of all the actions taken?

- In the visibility section, you can see all the actions under the logs

5. Is RBAC supported?

-  Yes, there are two permissions : view(Visibility) and edit (Setup)

6. Can orchestration be setup on any account?

-  No, only master account with correct permission listed above will be allowed and it can be done for multiple master accounts.

