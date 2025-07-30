---
title: "Harness CCM: Subscription Plans"
description: "A comprehensive guide to Harness Cloud Cost Management (CCM) subscription plans, features, and licensing options."
sidebar_position: 7
helpdocs_is_private: false
helpdocs_is_published: true
---
<div style={{display: "flex", alignItems: "center", marginBottom: "10px"}}>
  <img src="/img/icon_ccm.svg" alt="CCM Icon" style={{height: "32px", marginRight: "12px"}} />
  <h2 style={{margin: 0}}>Pricing Model</h2>
</div>

Harness has introduced a new pricing model for Cloud Cost Management that gives you the flexibility to choose exactly what you need. Our CCM suite is now available as four separate SKUs that can be purchased individually or bundled together.

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
      <li>Amortization</li>
      <li>Coverage Planning</li>
    </ul>
  </div>
  
  <div style={{flex: "1 0 200px", maxWidth: "24%", border: "none", borderRadius: "8px", padding: "15px", boxShadow: "0 2px 5px rgba(0,0,0,0.03)", background: "linear-gradient(135deg, rgba(0,207,222,0.02) 0%, rgba(5,166,96,0.02) 100%)"}}>
    <h3 style={{color: "#3D8B82", marginTop: 0, fontSize: "1.1rem", fontWeight: "600"}}>AutoStopping</h3>
    <p>Automatically stop idle non-production resources to reduce cloud costs by up to 75%.</p>
    <ul style={{paddingLeft: "20px", marginTop: "8px", fontSize: "0.9rem"}}>
      <li>Idle Resource Detection</li>
      <li>Smart Scheduling</li>
      <li>Usage-Based Automation</li>
      <li>Dependency Management</li>
      <li>Cloud Agnostic Support</li>
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


## Need Help?

If you have questions about your subscription options or need assistance with upgrading:

- **Contact Sales**: [Harness Sales Team](https://www.harness.io/company/contact-sales?utm_source=harness_io&utm_medium=cta&utm_campaign=platform&utm_content=pricing&utm_term=essentials)
- **Support Portal**: [Harness Support](https://support.harness.io)
- **Schedule a Demo**: [Request a personalized demo](https://www.harness.io/demo)
