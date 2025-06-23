---
title: Create Perspectives
description: Perspectives allow you to group your resources in ways that are more meaningful to your business needs.
sidebar_position: 3
helpdocs_is_private: false
helpdocs_is_published: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::note
You can create up to 10,000 Perspectives.
:::

<DocVideo src="https://app.tango.us/app/embed/7dc1bfa7-a157-4555-8473-ff9e0bb421ec" style="min-height:720px" title="Create a Perspective in Harness CCM" />

To create a Perspective, follow these steps:

1. In **Cloud Costs**, click **Perspectives**
2. Click **New Perspective**
3. Complete the following three steps:

<Tabs groupId="steps" queryString>
  <TabItem value="step1" label="Step 1: Perspective Builder" default>


1. Enter a name for your Perspective (avoid special characters)
2. Select a folder for organization (optional)
3. Choose a default time view:
   * Last 7 days
   * Last 30 days
   * Last month
   * This month

### Perspective Rules

1. Click **Add rule** in the **Specify rules for the perspective** section. You can add multiple rules in a Perspective and their binding can use either the **AND** operator or the **OR** operator.
2. Each rule can be set up using Operand, Operator and Values. 

<div style={{marginBottom: '10px'}}>Rules help you define which cloud resources to include in your perspective using a simple "Operand-Operator-Value" structure.</div>

<div className="rule-components-container" style={{display: 'flex', justifyContent: 'space-between', marginBottom: '20px'}}>
  <div className="rule-component" style={{flex: '1', padding: '15px', margin: '0 10px', border: '1px solid #eee', borderRadius: '5px'}}>
    <div style={{fontSize: '18px', fontWeight: 'bold', marginBottom: '10px', textAlign: 'center'}}>Operand</div>
    <div style={{fontSize: '13px', backgroundColor: '#f8f8f8', padding: '6px', borderRadius: '4px', marginBottom: '8px', fontStyle: 'italic'}}>The data category or attribute you want to filter on</div>
    <div>Select from:</div>
    <ul style={{paddingLeft: '20px'}}>
      <li>Common</li>
      <li>Cost Categories</li>
      <li>Cluster</li>
      <li>AWS</li>
      <li>GCP</li>
      <li>Azure</li>
      <li>External Data</li>
    </ul>
  </div>
  
  <div className="rule-component" style={{flex: '1', padding: '15px', margin: '0 10px', border: '1px solid #eee', borderRadius: '5px'}}>
    <div style={{fontSize: '18px', fontWeight: 'bold', marginBottom: '10px', textAlign: 'center'}}>Operator</div>
    <div style={{fontSize: '13px', backgroundColor: '#f8f8f8', padding: '6px', borderRadius: '4px', marginBottom: '8px', fontStyle: 'italic'}}>The comparison method that defines how to match values</div>
    <div>Choose from:</div>

    * **IN**: Include only resources that exactly match the specified value
    * **NOT IN**: Include all resources except those that match the specified value
    * **NULL**: Include only resources where this field has no value (excludes resources with this field)
    * **NOT NULL**: Include only resources where this field has a value
    * **LIKE**: Include resources where the field partially matches a pattern (uses regular expressions)
      - For exact pattern matching, use `^pattern$` syntax
    
  </div>
  
  <div className="rule-component" style={{flex: '1', padding: '15px', margin: '0 10px', border: '1px solid #eee', borderRadius: '5px'}}>
    <div style={{fontSize: '18px', fontWeight: 'bold', marginBottom: '10px', textAlign: 'center'}}>Values</div>
    <div style={{fontSize: '13px', backgroundColor: '#f8f8f8', padding: '6px', borderRadius: '4px', marginBottom: '8px', fontStyle: 'italic'}}>The specific data points to include or exclude in your perspective</div>
    <div>Select the specific data points to apply the rule to.</div>
    <div style={{marginTop: '10px'}}>These will vary based on your selected Operand and Operator.</div>
  </div>
</div>

#### Example: 

- Operand: `Commmon > Product`
- Operator: `IN`
- Values: `[Amazon DataZone, Amazon DynamoDB] `

This will show all the cost items that are related to Amazon DataZone and Amazon DynamoDB.

<DocImage path={require('./static/example-p.png')} width="90%" height="90%" title="Click to view full size image" />

#### Preview and Continue

As you build your perspective, a real-time preview appears on the right side of the screen that shows a graph of the cost data based on the rules you have added, along with a cost breakdown. 

After configuring all rules, click **Next** to proceed to **Budgets, Reports and Alerts**.

:::note Important Notes
- If no rules are specified, your perspective will include data from all cloud providers and clusters
- When combining cluster labels with cloud provider data, you must add a specific Cloud Provider filter. 
:::
-------

  </TabItem>
  <TabItem value="step2" label="Step 2: Budgets, Reports and Alerts">

### Budgets
  
Budgets can help you receive alerts when the spend exceeds or is about to exceed a specified threshold so that it can be prevented.

You can add multiple budgets for a single Perspective. Click on **+create a new Budget** to add a new budget and set up Target, Budget Amount and Configure Alerts.

For detailed information about setting up budgets, see [Setting Up Budgets](https://developer.harness.io/docs/cloud-cost-management/use-ccm-cost-governance/ccm-budgets/create-a-budget)

-----

### Perspective Reports

<div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
  <DocImage path={require('./static/output.gif')} width="70%" height="70%" title="Click to view full size image" />
</div>


Reports can send a cost report to specified users at the specified frequency. You can create a report schedule for a specific perspective.

1. In the Reports section, click **+create new Report Schedule**
2. Configure the following options:
   * **Name**: Name of the report.
   * **Time zone**: Choose the time zone for the report schedule
   * **Frequency**: Choose Daily, Weekly, Monthly, Quarterly, Yearly for delivery of reports.
   * **Select date and time**: Choose the date and time for when the report should be sent
   * **Send Report To**: Enter an email ID of the recipients. Email IDs are separated by a comma. Up to 50 email IDs can be added for sharing the report schedule
3. Click **Save**.

-------

### Anomaly Alerts

You can also set up alerts for all anomalies in the current perspective. The scope of the alerts set via this option will be for the current perspective, i.e., the alerts will be set only for anomalies detected on the current perspective data.

1. Click on **+ add Anomaly Alert**
2. Configure Name, Alert Conditions and Alert Channel. For details, see: [Anomaly Detection](https://developer.harness.io/docs/cloud-cost-management/use-ccm-cost-reporting/anomaly-detection/a-detect-cloud-cost-anomalies-with-ccm#anomaly-notifications)

#### Additional Resources

For more detailed information about Anomaly detection in CCM, refer to [Detect Cloud Cost Anomalies with CCM](https://developer.harness.io/docs/cloud-cost-management/use-ccm-cost-reporting/anomaly-detection/a-detect-cloud-cost-anomalies-with-ccm)

------


</TabItem>
  <TabItem value="step3" label="Step 3: Preferences">

With perspective preferences, you have the flexibility to tailor the cost data presented in your perspective. You can opt to include or exclude specific cost data provided by the Cloud Service Providers (CSPs) according to your needs and requirements. 

Customize how your perspective data is visualized with these options:

### General Preferences

#### Show Others
The default perspective graph displays only the top 12 cost items. Enable this option to group all remaining costs into an "Others" category, ensuring you see your complete spending picture.

#### Show Anomalies
Highlight unusual spending patterns or sudden cost changes in your visualizations. This feature makes it easy to spot potential issues or unexpected charges that may require investigation.

### Cloud-based Preferences

<Tabs groupId="cloud" queryString>
  <TabItem value="aws" label="AWS" default>

#### AWS-specific Preferences
When creating your perspective, the **Preferences** section allows you to include specific cost factors sourced from the AWS Cost and Usage Reports (AWS CUR). These selected cost factors will be incorporated into your perspective for a more tailored and comprehensive view of your cloud costs. 

* **Include Discounts**: Includes any discounts that AWS applied to your usage. 
* **Include Credit**: Includes any credits that AWS has applied to your bill.
* **Include Refunds**: Includes the negative charges that AWS refunded money for. 
* **Include Taxes**: Includes any taxes that AWS applied to your bill. For example, VAT or US sales tax. 
* **Show costs as**: The following are the various AWS cost types supported by Perspectives.

#### AWS Cost Types

* **Net amortized cost**: The actual cost of using resources, accounting for upfront payments made for Reserved Instances. It evenly spreads the upfront costs over the reservation term, considers monthly fees, and includes discounts like RI volume discounts.

* **Blended cost**: The total cost of using AWS services, which includes both upfront and usage-based charges, divided by the total number of usage units. Blended rates are the rates associated with total usage in an organization averaged across accounts. For a line item, the blended cost is usage multiplied by the blended rate. The blended cost is the cost attributed to the account's usage as a linked account in an organization.

* **Unblended cost**: The direct cost incurred for using AWS services, without factoring in any upfront payments or volume discounts. Unblended rates are the rates associated with an individual account's service usage. For a line item, the unblended cost is usage multiplied by the unblended rate. The unblended cost would be the cost of the account's usage if it were a standalone account. Unblended costs represent your usage costs on the day they are charged to you. In finance terms, they represent your costs on a cash basis of accounting.

* **Amortized cost**: The total upfront payment for reserved instances spread evenly over the term of the reservation. This method is used to allocate the upfront costs equally across the duration of the reservation, making it easier to analyze the cost distribution.
    
  For example, Alejandro decides to buy a Partial Upfront t2.micro Reserved Instance (RI) with a one-year term. The upfront cost for this RI is 30 USD, which he pays at the beginning. Additionally, there is a monthly fee of 2.48 USD associated with the RI. In this case, the Cost Explorer chart will show Alejandro's RI costs as a spike on the first day of each month. This spike represents the monthly fee of 2.48 USD being charged. When Alejandro chooses "Amortized costs" in the Cost Explorer settings, it provides a different perspective on the cost data. Amortization is a process of spreading the upfront cost of a reserved instance over its duration (one year in this case). Instead of showing a large upfront cost, Amortized costs evenly distribute the upfront cost over the term of the RI. Selecting **Amortized costs** and considering a 30-day month, the Cost Explorer chart will display a daily effective rate. This daily effective rate is calculated by taking the EC2 effective rate (which is the hourly cost of running an instance) and multiplying it by the number of hours in a day. So, if the EC2 effective rate for the t2.micro instance is 0.165 USD per hour, the daily effective rate will be 0.165 USD multiplied by 24 hours, resulting in 3.96 USD.

* **Effective cost**: The average hourly rate obtained by combining both the upfront payment and the hourly rate. `EffectiveCost` is calculated by adding the `amortizedUpfrontCostForUsage` to the `recurringFeeForUsage`.

</TabItem>
<TabItem value="gcp" label="GCP">

#### GCP-specific Preferences

The following cost factors retrieved from your GCP Billing Export data can be included or excluded in your perspectives for a more comprehensive view of your cloud costs.

* **Include Discounts**: Includes any discounts that GCP applied to your usage. 
* **Include Taxes**: Includes any taxes that GCP applied to your bill. For example, VAT or US sales tax. This option is enabled by default.

</TabItem>
<TabItem value="azure" label="Azure">

#### Azure-specific Preferences

Azure provides two types of cost export metrics: **Actual Cost** and **Amortized Cost**, each serving distinct financial tracking and analysis needs. In the Azure portal, users can toggle between these cost types to gain insights into their billing data. CCM allows users to configure their Azure connector to support both cost types, offering enhanced visibility and control over their expenses.

#### Azure Cost Types

* **Actual Cost**: Refers to the real-time, pay-as-you-go pricing for Azure resources and services. It is calculated based on hourly or per-minute usage, directly reflecting the charges that can vary with demand and utilization. This cost model is ideal for real-time monitoring and cost analysis, as it provides a precise view of expenses as they occur.

* **Amortized Cost**: Offers a predictable, averaged representation of costs over a specified period, typically on a monthly basis. This approach spreads the upfront payments or commitments of Reserved Instances (RIs) over their term, which can be either one or three years. Amortized costs are particularly useful for evenly distributing expenses over reservation terms, aiding in financial projections and budgeting by providing a stable cost structure.

To accommodate the diverse needs of different teams, CCM supports the setup of both Actual and Amortized cost exports within the same connector. Users can view and toggle between these costs in their perspectives.

:::note
- In order to accurately track costs, ensure that your connector has one billing type set to "Actual." If not set while creating the connector, the creation will fail. For existing connectors, update them such that one of the billing types should be "Actual"; otherwise, connector test connection would fail.

- Billing type will be set to "Actual" in billing export in places where billing type was not present before this feature launch.

- CCM will maintain data with the Azure cost type set to "Actual." All cost computations will be based on this setting.

- For Active Spend and License-Util APIs, Costs will be queried assuming Azure cost type "Actual".
- Prior to Azure preferences, all data was ingested as 'Actual,' even if Amortized billing was used. After Azure preferences, we ingested the new Amortized billing export data. Due to this, in some cases, 'Actual' data might no longer show. To fix this, kindly change the Azure cost type filter to 'Amortized'.
:::

  </TabItem>
</Tabs>


------

</TabItem>
</Tabs>


