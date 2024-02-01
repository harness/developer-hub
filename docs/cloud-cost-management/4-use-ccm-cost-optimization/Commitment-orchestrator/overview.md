Commitment Orchestrator
Overview
What are commitments ?
What is the problem with commitments ? (over committing under committing)
How does CO fit in?
Steps to configure
Beta features 
How CO fits in different personas
FAQs

In recent years, organizations leveraging cloud services have witnessed a concerning trend - the steady rise in cloud costs. As businesses increasingly migrate their operations to the cloud, the expenses associated with cloud infrastructure, storage, and data processing have become a significant portion of the cloud bills..
In the context of cloud services, commitments often refer to Reserved Instances (RIs). Reserved Instances are a pricing model offered by cloud service providers that allows customers to reserve and commit to a specific amount of computing capacity in advance for a term of one or three years. This commitment comes with a significant discount compared to on-demand pricing, making it a cost-effective option for workloads with predictable and sustained usage.

However, it's essential for organizations to carefully analyze their usage patterns before making commitments to ensure they choose the most suitable Reserved Instances for their needs.
Commitments in the cloud, such as Reserved Instances (RIs) or other long-term contracts, can become problematic in various situations. Here are some scenarios where commitments in the cloud might pose challenges:

 If the organization's workload patterns change significantly, commitments made based on initial assumptions may no longer align with actual resource needs.
Rapid changes in technology or the adoption of new services may render existing commitments less cost-effective or even obsolete.
Economic or business uncertainties can make long-term commitments risky, especially if there's a chance of downsizing or changes in strategy.
Some commitments, such as rigid long-term contracts, may lack flexibility to adapt to changing circumstances or unexpected events 
Overcommitting to a specific cloud provider or service may lead to vendor lock-in, making it challenging to switch to a different provider or adopt a multi-cloud strategy.
Overcommitting resources may result in underutilization, leading to inefficient use of budget and potentially higher overall costs.

With Harness CCM, we are on a mission to mitigate these and many more problems associated with cloud costs and commitments. Harness CCM helps you to track everything about your cloud spends so that you have an optimized cloud spend. With our latest addition of Commitment Orchestrator, we focus on managing your commitments for optimal performance and mitigating the problems associated with over commitments and under commitments.

What is over commitment and under commitment?
In the context of cloud computing, over-commitment and under-commitment typically refer to the utilization of resources compared to the commitments made through mechanisms like Reserved Instances (RIs). 
Over-Commitment:
Over-commitment occurs when an organization has reserved more resources (such as instances or capacity) than it actually needs or utilizes.
For example, an organization may have purchased a significant number of Reserved Instances based on an initial estimation of their workload. If the actual usage turns out to be lower than expected, the organization is considered to be over-committed.

While over-commitment may provide some level of capacity assurance, it can result in underutilized resources, leading to higher costs than necessary. The committed resources are paid for upfront or over the term, regardless of whether they are fully utilized.

Under-Commitment:
Under-commitment occurs when an organization hasn't reserved enough resources to meet its actual demand or workload. For instance, an organization may have opted for pay-as-you-go (on-demand) pricing or may not have purchased enough Reserved Instances to cover its workload. This results in a situation where resources are provisioned on-demand, potentially leading to higher costs per unit of compute compared to the reserved pricing.

Under-commitment can result in higher overall costs due to the absence of reserved capacity discounts. It may also lead to performance issues during peak demand periods when on-demand resources might be more expensive.

Finding the right balance between over-commitment and under-commitment is a key aspect of effective cost management in the cloud.
How does a Commitment Orchestrator help with under commitments or overcommitments?
Commitment orchestrator is a tool designed to help organizations manage their cloud commitments effectively. Here's how a commitment orchestrator can help manage commitments:
 Capacity Planning: Commitment orchestrator assists in capacity planning by analyzing historical usage patterns and forecasting future resource requirements. This ensures that organizations make informed decisions when committing to long-term contracts or Reserved Instances.
Financial Forecasting: The tool provides financial forecasting capabilities, allowing organizations to project their cloud costs over time. This is essential for budgeting and ensuring that commitments align with available financial resources.
 Multi-Cloud Optimization:  For organizations using multiple cloud providers, commitment orchestrator helps optimize commitments across different platforms. This includes recommending the most cost-effective cloud for specific workloads and managing commitments in a unified manner.
 Risk Mitigation: the tool helps mitigate the risks associated with commitments by providing visibility into potential challenges or inefficiencies. This allows organizations to proactively address issues and make data-driven adjustments.
CO does all of this with the help of its 2 engines: Utilisation engine and Purchase engine
Utilisation engine
Purchase engine
The utilization engine works to increase the utilization of underutilized RI. As part of increasing utilization, the engine performs the following actions:
Breaking RI into the smallest unit
Assembling the individual units to arrive at the target instance type
The purchase engine analyzes  the on-demand spend and then purchases the RIs/SPs basis the target coverage.


The engines work together to analyse your current commitments and use the analysis to predict the next commitments you need to buy to reach target coverage. This helps you understand how much finances should be distributed in what areas to make the most optimised use of resources.  
Steps to configure:

Step 1: Visibility
To enable visibility, in the master account connector, you need to add the following permissions.
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

Step 2: Setup flow (to enable actual orchestration)
"ec2:PurchaseReservedInstancesOffering",
"ec2:GetReservedInstancesExchangeQuote",
"ec2:DescribeInstanceTypeOfferings",
"ec2:AcceptReservedInstancesExchangeQuote",
"ec2:DescribeReservedInstancesModifications",
"ec2:ModifyReservedInstances"
"ce:GetCostAndUsage"
savingsplans:DescribeSavingsPlansOfferings
savingsplans:CreateSavingsPlan


Beta features:
Currently, CO is in Beta and it offers:
Visibility into your current account and breakdown of savings, utilisations across all your accounts and regions (Need visibility permission as part of master account connector)
Convertible RI purchase support
Compute SP purchase support
Convertible RI exchange
Setup of commitment orchestrator on your master accounts
Detailed logs of every action.
RBAC support for Commitment Orchestrator.

Use cases
Some use cases to understand the how CO can help you optimize your spends:

Persona
Scenario
Value added
Cloud Financial Manager 
A Cloud Financial Manager aims to maximize cost savings for the organization's AWS commitments.
Cost optimization : Commitment Orchestrator assists the manager in optimizing commitment utilization, preventing overcommitment or underutilization, and ensuring maximum ROI on cloud expenditures.
Cloud Architects 
Cloud Architects are responsible for designing and overseeing the organization's cloud infrastructure with varying workloads.
Automated Purchase Management: The Purchase Engine of Commitment Orchestrator, automated by Cloud Architects, streamlines the analysis of on-demand spend and purchases Reserved Instances or Savings Plans based on target coverage, ensuring efficient resource allocation.
Cloud Administrators 
Cloud Administrators handle day-to-day cloud operations, including managing Convertible Reserved Instances.
Convertible RI Management: The Utilization Engine of Commitment Orchestrator, managed by Cloud Administrators, identifies underutilized Convertible RIs and performs conversions to increase utilization, optimizing resource usage and cost efficiency.
IT Managers
IT Managers need detailed insights into commitments, utilization, and savings across multiple accounts and regions.
Visibility and Reporting: Commitment Orchestrator provides visibility into account breakdowns, savings, and utilization, supporting IT Managers in making informed decisions about cloud commitments and expenditures.
Organizations with multiple AWS accounts
Organizations with multiple AWS accounts under a master account seek flexibility in commitment management.
Staggered Purchase to Prevent Overcommitment: Commitment Orchestrator's daily staggered purchases, orchestrated by administrators in multi-account structures, prevent overcommitments, ensuring financial flexibility and optimal resource allocation.











FAQs
Which cloud providers are supported at the moment?
 --> Currently, we support AWS Compute Saving Plans and Convertible RIs.
Is Audit trails support available?
 --> In Beta version of CO, Audit trails are not supported but in upcoming GA release, it will be supported.
How many Saving Plan purchases happen in a month?
--> Only 1 SP purchase happens on a month on the basis of the last rolling 12 months data.
How many RI purchases happen in a month?
--> It's a daily staggered and recurring purchase, and hence, can happen multiple times.
How many exchanges happen in a month?
--> Number of exchanges depends on the requirement of the user.
Where can I see the history of all the actions taken?
→ In the visibility section, you can see all the actions under the logs
Is RBAC supported?
--> Yes, as part of Beta there are two permissions : view(Visibility) and edit (Setup)
Can orchestration be setup on any account?
--> No, only master account with correct permission listed above will be allowed and at a time only one account can be set up.



