---
title: "Harness CCM: Subscription Plans"
description: "A comprehensive guide to Harness Cloud Cost Management (CCM) subscription plans, features, and licensing options."
sidebar_position: 7
helpdocs_is_private: false
helpdocs_is_published: true
---



Harness offers two primary licensing tiers for Cloud Cost Management: **Free Forever** and **Enterprise**. 

:::info
- **If Your Cloud Spend Exceeds $250K/year**: You must upgrade to an Enterprise plan. The Free Forever plan is limited to organizations with less than USD250K/month in cloud spend.

- **If Your Cloud Spend is Under $250K/year**: CCM remains accessible on the Free Forever plan, but with certain limitations and adjustments. 

:::

## Free Forever

The Free Forever plan is a no-commitment, no-contract plan that provides you with the essential features of CCM for free. It is ideal for small and medium-sized organizations with less than USD250K/month in cloud spend.

| Feature | Free Forever | 
|---------|-------------|
| **Cloud Spend Manage** | Up to $250,000/year | 
| **Kubernetes Clusters** | 2 | 
| **[AutoStopping Rules](https://developer.harness.io/docs/category/autostopping-rules)** | 10 rules |
| **Data Visibility** | Data available for viewing limited to 30 days | 
| **Currency Preferences** | Not supported | 

#### Definitions

- **Cloud Spend Manage**: The total monthly cloud expenditure across all connected cloud accounts (AWS, Azure, GCP).
- **Kubernetes Clusters**: Number of Kubernetes clusters you can connect for cost visibility and optimization.
- **AutoStopping Rules**: Intelligent rules that automatically stop idle cloud resources to reduce costs.
- **Data Visibility**: The timeframe for which historical cost data and analytics are accessible to users in the dashboard and reports.
- **Currency Preferences**: Ability to view and report costs in currencies other than USD.


## Enterprise Plan

Harness has introduced a new pricing model for Cloud Cost Management that gives you the flexibility to choose exactly what you need. Our CCM suite is now available as four separate SKUs that can be purchased individually or bundled together.

You can buy SKUs individually or buy the entire CCM bundle.

The individual SKUs available are:

<div style={{display: "flex", flexDirection: "row", gap: "15px", marginBottom: "30px", overflowX: "auto", marginTop: "20px", padding: "5px 0"}}>
  <div style={{flex: "1 0 200px", maxWidth: "24%", border: "none", borderRadius: "8px", padding: "15px", boxShadow: "0 2px 5px rgba(0,0,0,0.03)", background: "linear-gradient(135deg, rgba(0,207,222,0.02) 0%, rgba(5,166,96,0.02) 100%)"}}>
    <h3 style={{color: "#3D8B82", marginTop: 0, fontSize: "1.1rem", fontWeight: "600"}}>Cloud Cost Insights</h3>
    <p>Gain complete visibility into your cloud spend across AWS, Azure, GCP, and Kubernetes.</p>
    <p>Includes:</p>
    <ul style={{paddingLeft: "20px", marginTop: "8px", fontSize: "0.9rem"}}>
      <li>Perspectives</li>
      <li>Cost Categories</li>
      <li>BI Dashboards</li>
      <li>Recommendations</li>
      <li>Asset Governance</li>
      <li>Budgets</li>
      <li>Anomalies</li>
    </ul>

  </div>
  
  <div style={{flex: "1 0 200px", maxWidth: "24%", border: "none", borderRadius: "8px", padding: "15px", boxShadow: "0 2px 5px rgba(0,0,0,0.03)", background: "linear-gradient(135deg, rgba(0,207,222,0.02) 0%, rgba(5,166,96,0.02) 100%)"}}>
    <h3 style={{color: "#3D8B82", marginTop: 0, fontSize: "1.1rem", fontWeight: "600"}}>Commitment Orchestrator</h3>
    <p>Optimize your cloud commitments with intelligent management across your cloud providers.</p>
    <ul style={{paddingLeft: "20px", marginTop: "8px", fontSize: "0.9rem"}}>
      <li>Reserved Instance Recommendations</li>
      <li>Savings Plans Optimization</li>
      <li>Commitment Analysis</li>
      <li>Coverage Planning</li>
    </ul>
  </div>
  
  <div style={{flex: "1 0 200px", maxWidth: "24%", border: "none", borderRadius: "8px", padding: "15px", boxShadow: "0 2px 5px rgba(0,0,0,0.03)", background: "linear-gradient(135deg, rgba(0,207,222,0.02) 0%, rgba(5,166,96,0.02) 100%)"}}>
    <h3 style={{color: "#3D8B82", marginTop: 0, fontSize: "1.1rem", fontWeight: "600"}}>AutoStopping</h3>
    <p>Automatically stop idle non-production resources to reduce cloud costs by up to 75%.</p>
    <ul style={{paddingLeft: "20px", marginTop: "8px", fontSize: "0.9rem"}}>
      <li>Idle Resource Detection</li>
      <li>Smart Scheduling</li>
    </ul>

  </div>
  
  <div style={{flex: "1 0 200px", maxWidth: "24%", border: "none", borderRadius: "8px", padding: "15px", boxShadow: "0 2px 5px rgba(0,0,0,0.03)", background: "linear-gradient(135deg, rgba(0,207,222,0.02) 0%, rgba(5,166,96,0.02) 100%)"}}>
    <h3 style={{color: "#3D8B82", marginTop: 0, fontSize: "1.1rem", fontWeight: "600"}}>Cluster Orchestrator</h3>
    <p>Optimize Kubernetes infrastructure costs with advanced resource management.</p>
    <ul style={{paddingLeft: "20px", marginTop: "8px", fontSize: "0.9rem"}}>
      <li>Advanced Bin-Packing</li>
      <li>Spot Instance Management</li>
      <li>Intelligent Workload Scheduling</li>
      <li>Multi-Level Spot/On-Demand Distribution</li>
      <li>Karpenter-Based Autoscaling</li>
    </ul>

  </div>
</div>



## Subscription Management

<DocImage path={require('./static/subscription-management.png')} width="100%" height="100%" title="Click to view full size image" />

Navigate to the **Account Settings** -> **Subscriptions**. Your subscription details will show:

- **Subscription Details**
    - **Account Name**: Your Harness account identifier
    - **Plan**: Your current subscription tier (Free, Team, or Enterprise)
    - **Subscription Type**: Shows which CCM SKUs you've purchased. The tooltip will show the number of SKUs purchased alongwith which ones.
    - **Subscribed Limits**: Maximum usage thresholds for your plan per each SKU purchased
    - **Start Date**: When your current subscription period began
    - **Expiry Date**: When your subscription will need renewal

- **Usage vs Subscribed Limit:** For each purchased SKU, you'll see your current usage metrics compared to your subscription limits. 



:::info
Features that are not included in your current subscription will be clearly marked with a lock icon (🔒) in the UI. You can click on these locked features to learn more about their benefits and how to add them to your subscription.

<DocImage path={require('./static/locked-screen.png')} width="100%" height="100%" title="Click to view full size image" />

:::


## Upgrading from Free Forever to Enterprise

When you upgrade from Free Forever to Enterprise plan, the following changes occur:

| Capability | After upgrade to Enterprise License | Business Advantage |
|---------|---------------------|--------|
| **All reporting, optimization and governance features** | As per purchased SKUs | Reduce cloud spend through advanced optimization recommendations, custom dashboards, and predictive analytics |
| **Kubernetes Clusters** | Unlimited | Achieve complete visibility across your entire K8s infrastructure, enabling organization-wide cost allocation and optimization |
| **AutoStopping Rules** | Unlimited | Maximize cloud cost savings by automatically stopping idle resources across all environments and projects |
| **Data Visibility** | Extended to 5 years. Users will gain all the historical access of their free tier as well. | Make data-driven decisions with long-term trend analysis and gain deeper insights into seasonal patterns and multi-year cost trends |


## Enterprise License Expiry

When your Enterprise license expires, the following changes occur:

| Feature | Behavior After License Expiry | Impact |
|---------|------------------------------|--------|
| **Data Collection** | Stops for all sources | No new cost data is collected from any cloud provider or Kubernetes cluster |
| **Historical Data** | Remains accessible | Previously collected data can still be viewed but no new data is added |
| **[Recommendations](https://developer.harness.io/docs/category/recommendations)** | No longer generated | Existing recommendations remain visible but no new ones are created |
| **Alerts & Notifications** | Stopped | No budget alerts, anomaly alerts, or scheduled reports are sent |
| **[AutoStopping](https://developer.harness.io/docs/category/autostopping-rules)** | AutoStopping rules will not show new savings due to paused data collection | No new Savings calculation data is displayed |

Users will see **license expired** banners in the UI to inform them of the expired status.



## Need Help?

If you have questions about your subscription options or need assistance with upgrading:

- **Contact Sales**: [Harness Sales Team](https://www.harness.io/company/contact-sales?utm_source=harness_io&utm_medium=cta&utm_campaign=platform&utm_content=pricing&utm_term=essentials)
- **Support Portal**: [Harness Support](https://support.harness.io)
- **Schedule a Demo**: [Request a personalized demo](https://www.harness.io/demo)

