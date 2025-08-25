---
title: "Harness Database DevOps: Subscription Plans"
description: "A complete guide to Harness Database DevOps subscription plans, pricing models, and licensing options."
sidebar_position: 8
helpdocs_is_private: false
helpdocs_is_published: true
---

Harness Database DevOps provides flexible subscription plans designed to scale with your database deployment needs. Harness offers two primary licensing tiers: **Free Tier** and **Enterprise**.

:::info
- **If You Require More Than 4 Database Instances or 2 Users**: You must upgrade to an Enterprise plan.  
- **Enterprise Plans** scale based on the number of **Database Instances** (preferred metric), providing clear, predictable pricing that grows with your usage.  
:::

## Free Tier

The Free plan is ideal for small teams experimenting with Harness Database DevOps. It provides limited access to core features and allows you to validate the platform before scaling.

| Feature | Free Tier |
|---------|------------|
| **Database Instances** | Up to 4 |
| **Users** | Up to 2 |
| **Free Trial** | Matches free trial duration of other Harness products |

:::note
The Free Tier will only be available when the **Self-Managed Platform Free and Team GA stage** is released.
:::

## Enterprise Plans

Harness Database DevOps Enterprise offers flexibility with two pricing options. Both are billed annually and come with **no minimum commitment**.

<div style={{display: "flex", flexDirection: "row", gap: "15px", marginBottom: "30px", overflowX: "auto", marginTop: "20px", padding: "5px 0"}}>

  <div style={{flex: "1 0 200px", maxWidth: "45%", border: "none", borderRadius: "8px", padding: "15px", boxShadow: "0 2px 5px rgba(0,0,0,0.03)", background: "linear-gradient(135deg, rgba(0,207,222,0.02) 0%, rgba(5,166,96,0.02) 100%)"}}>
    <h3 style={{color: "#3D8B82", marginTop: 0, fontSize: "1.1rem", fontWeight: "600"}}>dev360 (Per User)</h3>
    <p>Starting at <strong>$660 per User / year</strong>. Includes unlimited DB Instances per user.</p>
    <ul style={{paddingLeft: "20px", marginTop: "8px", fontSize: "0.9rem"}}>
      <li>Annual billing only</li>
      <li>No minimum commitment</li>
      <li>Designed for teams managing multiple instances per user</li>
    </ul>
    <p style={{fontSize: "0.8rem", color: "#777"}}><em>Note: This option will be phased out after limited GA.</em></p>
  </div>

  <div style={{flex: "1 0 200px", maxWidth: "45%", border: "none", borderRadius: "8px", padding: "15px", boxShadow: "0 2px 5px rgba(0,0,0,0.03)", background: "linear-gradient(135deg, rgba(0,207,222,0.02) 0%, rgba(5,166,96,0.02) 100%)"}}>
    <h3 style={{color: "#3D8B82", marginTop: 0, fontSize: "1.1rem", fontWeight: "600"}}>dev360 (Per Database Instance)</h3>
    <p>Starting at <strong>$330 per DB Instance / year</strong>. Pricing scales directly with the number of deployed DB Instances.</p>
    <ul style={{paddingLeft: "20px", marginTop: "8px", fontSize: "0.9rem"}}>
      <li>Annual billing only</li>
      <li>No minimum commitment</li>
      <li>Preferred pricing model — aligns with customer value</li>
    </ul>
    <p style={{fontSize: "0.8rem", color: "#777"}}><strong>Preferred Model</strong> – simple, scalable, and value-aligned.</p>
  </div>

</div>

## Competitive Benchmark

Harness Database DevOps pricing is designed to be competitive within the industry:

| Competitor | Pricing Model | Cost |
|------------|---------------|------|
| **FlywayDB** | Per User / Year | $597 |
| **Liquibase** | Per DB Instance / Month | $33 (330/year) |
| **ByteBase** | Per DB Connector / Year | $1200 |
| **DB Marlin** | Per DB Connector / Year | $1094 |

Harness provides predictable pricing that balances simplicity and customer value while aligning closely with competitor models.

## Subscription Management

Navigate to **Account Settings → Subscriptions** to view your plan details, including:

- **Subscription Details**: Plan (Free or Enterprise), type (per user or per DB instance), and limits.  
- **Subscribed Limits**: Maximum DB Instances or users based on your chosen plan.  
- **Start & Expiry Dates**: Billing cycle information.  
- **Usage Metrics**: Track current consumption vs. subscribed limits.  

:::info
Features outside your current plan will be marked with a lock icon (🔒) in the UI. Clicking on them will guide you to upgrade options.
:::

## Upgrading from Free to Enterprise

When you upgrade from the Free Tier to Enterprise, the following changes occur:

| Capability | Enterprise Benefits | Business Advantage |
|------------|----------------------|-------------------|
| **Database Instances** | Unlimited (per chosen model) | Scale operations seamlessly without constraints |
| **Users** | Unlimited | Enable collaboration across larger database teams |
| **Advanced Value Alignment** | Pay per instance (preferred model) or per user | Match costs with actual usage and delivered value |

## Enterprise License Expiry

If your Enterprise license expires, the following changes occur:

| Feature | Behavior After Expiry | Impact |
|---------|----------------------|--------|
| **Deployments** | Disabled | Cannot deploy new DB schemas |
| **Instances** | Existing DB Instances remain | No new instances can be added |
| **User Access** | Restricted to read-only | Prevents configuration or new deployments |

Users will see **license expired** banners in the UI until renewal.

## Need Help?

If you have questions about subscription options or need assistance with upgrading:

- **Contact Sales**: [Harness Sales Team](https://www.harness.io/company/contact-sales)  
- **Support Portal**: [Harness Support](https://support.harness.io)  
- **Schedule a Demo**: [Request a personalized demo](https://www.harness.io/demo/database-devops)
