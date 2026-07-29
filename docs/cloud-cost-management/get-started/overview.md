---
title: Overview
sidebar_label: Overview
sidebar_position: 1
redirect_from:
  - /docs/cloud-cost-management/getting-started-ccm/continuous-efficiency-overview
---

Harness Cloud & AI Cost Management (CACM) is a FinOps platform that helps you monitor, govern, and optimize **cloud and AI spend in one place**. It provides visibility across AWS, Azure, and Google Cloud Platform (GCP); AI providers like OpenAI and Anthropic, including managed offerings such as AWS Bedrock and GCP Vertex AI; and external sources like SaaS and data center costs, giving you a unified view of your organization's total technology spend.

Unlike tools that only show dashboards, CACM also acts on what it finds: AutoStopping shuts down idle resources, Commitment Orchestration buys RIs and Savings Plans, and recommendations right-size workloads, turning insight into savings. Organizations typically see a 20–30% reduction in overall cloud and AI spend.

<DocImage path={require('./static/cacm-overview-hero.png')} width="100%" title="Harness Cloud & AI Cost Management" />

---

## What CACM solves

Cloud and AI spend share the same problem: costs are easy to incur and hard to attribute. CACM closes that gap for both by bringing all spend into a single FinOps workflow.

| Cloud cost challenges | AI cost challenges |
|---|---|
| Spend scattered across AWS, Azure, GCP, and SaaS with no unified view | AI spend is invisible until the invoice arrives; provider dashboards show only totals |
| Idle and oversized resources quietly draining budgets | No way to attribute cost to a team, product, agent, or customer |
| Manual, error-prone chargeback to teams and products | No measure of ROI per AI outcome (cost per ticket, session, or inference) |
| Cost spikes discovered only after the invoice arrives | No alerts when AI spend suddenly spikes |

---

## What CACM offers: the three pillars

### Cost Visibility

- [Perspectives/Views (Now Cost Explorer with Cloud & AI costs)](/docs/category/perspectives): Custom views to analyze cloud and AI costs by provider, service, region, tags, or business units. Organize them into folders, share with teams via RBAC, and use the "Ask AI" feature to create Perspectives/Views using natural language. Track spending on AI providers like Anthropic, OpenAI, and managed AI providers like AWS Bedrock and GCP Vertex AI, analyze token usage, and understand AI cost growth patterns.
- [BI Dashboards](/docs/category/bi-dashboards): Pre-built and customizable business intelligence dashboards powered by Looker. Visualize cost trends, compare spending across teams or projects, and create executive-level reports. Dashboards can be scheduled, shared, and embedded to keep stakeholders informed without requiring them to log into CACM.
- [Cost Categories](/docs/category/cost-categories): Define custom cost allocation rules to map cloud and AI spending to your business structure. Group resources by team, product, cost center, or any business dimension. The same rules you've written for cloud chargeback now apply to AI spend.
 
### Cost Governance

- [Budgets](/docs/category/budgets): Set daily, weekly, monthly, quarterly, or yearly spending limits tied to Perspectives/Views. Configure multiple alert thresholds and receive notifications via email or Slack before costs exceed budget. Available for both cloud & AI costs.

- [Asset Governance](/docs/category/asset-governance): Enforce cloud policies using policy-as-code. Create rules to identify non-compliant resources (untagged, idle, misconfigured), group them into rule sets, and schedule automatic evaluations with alerts for violations.

- [Anomaly Detection](/docs/category/anomalies): ML-powered detection of unusual spending patterns with configurable sensitivity, status management (Active/Resolved/Archived), and automated alerts to catch cost spikes early. Available for both cloud & AI costs.

### Cost Optimization

- [Recommendations](/docs/category/recommendations): AI-powered suggestions to right-size Kubernetes workloads, node pools, EC2 instances, ECS services, and Azure VMs. View potential savings, create Jira/ServiceNow tickets, and track which recommendations have been applied.

- [AutoStopping](/docs/category/autostopping-rules): Automatically stop idle non-production resources based on traffic or schedules. Supports EC2, ECS, RDS, Azure VMs, and GKE clusters. Typically saves 60-70% on non-production costs with zero code changes.

- [Commitment Orchestration](/docs/category/commitment-orchestrator): Automate AWS Reserved Instance and Savings Plan management. Analyze coverage and utilization, track savings vs. on-demand pricing, and let Harness automatically purchase optimal commitments or use manual approval mode.

- [Cluster Orchestrator](/docs/category/cluster-orchestrator-for-aws-eks-clusters): Intelligent Kubernetes cluster management that automatically optimizes node pools, manages spot instances, and handles workload bin-packing. Reduces cluster costs while maintaining performance and availability SLAs.

---

## How it comes together

- **AI Cost Visibility with Unit Economics**: As AI adoption accelerates, so do costs. CACM tracks spending on AI providers like Anthropic, OpenAI, and Gemini, and managed AI providers like AWS Bedrock and GCP Vertex AI, breaking down costs by model, monitoring token usage, and helping you understand where your AI budget is going. More importantly, CACM ties every dollar of AI spend to the agent, session, and business outcome it produced giving you cost per agent run, cost per session including multi-turn conversations, cost per inference, cost broken down by token type, session, inference and use-case, and agent ROI tied to business outcomes (cost per resolved ticket, cost per completed workflow, cost per customer interaction).

- **Actionable, Not Just Informative**: Unlike tools that only show dashboards, CACM takes action. AutoStopping shuts down idle resources, Cluster Orchestrator optimizes nodes, and Commitment Orchestration purchases RIs automatically, turning insights into savings without manual effort.

- **Built for Modern Infrastructure**: Native support for Kubernetes, containers, serverless, and AI workloads. CACM understands cloud-native architectures, not just VMs and storage buckets.

- **Trace-Level Cost Decomposition for AI**: Cost can be analyzed by agent, by session and conversation, by individual run, and step-by-step within a run, all the way down to the model and tool invoked at each step. Expensive workloads surface, worst-case behavior becomes visible instead of being averaged away, and the same dimensions plug into Cost Categories, Perspectives, and Budgets.

- **Governance at Scale**: Policy-as-code enforcement ensures compliance across hundreds of accounts. Automatically detect untagged resources, idle infrastructure, and security misconfigurations before they become costly problems.

- **Integrated with Your Workflow**: Create Jira or ServiceNow tickets directly from recommendations. Receive alerts via Slack or email. CACM fits into how your teams already work.

- **Proven ROI**: Organizations typically see 20-30% reduction in overall cloud & AI spend, with non-production savings of 60-70% through AutoStopping alone.
---

## The NEW Overview Experience

<DocImage path={require('./static/newoverview.png')} width="100%" title="CACM Overview" />

#### Summary Section

Displays your key cost metrics at a glance:

- **Total Spend**: Your total cloud costs for the selected time period
  - Shows trend vs. previous period (up, down, or stable)
  - Breaks down costs by cloud provider and LLM Services

:::note What is Total Cloud Spend Managed?
**Total Cloud Spend Managed** is the cloud spend Harness CACM actively manages, calculated by subtracting EDP (Enterprise Discount Program) discounts and marketplace spend from your total unblended cloud spend.

```
Total Cloud Spend Managed = Total Unblended Spend - EDP Discounts - Marketplace Spend
```
:::

- **Anomalies**: Unusual cost patterns detected automatically
  - Alerts you to unexpected spending changes
  - Shows impact of anomalies
  - Click to investigate and set rules

#### Top Spenders Section

Identifies what's costing you the most money. Switch between three views:

- **By Service**: Top services costing you money (EC2, RDS, S3, Lambda, etc.)
  - Helps identify which services to optimize
  - Shows breakdown by cloud provider and LLM providers for each service
  - Click to drill down into details in Cost Explorer

- **By Region**: Top regions with highest costs (us-east-1, eu-west-1, etc.)
  - Helps identify regional cost concentrations
  - Useful for understanding geographic spending
  - Shows which regions need attention

- **By Cloud Account**: Top cloud accounts with highest spending
  - Useful for chargeback and cost allocation
  - Shows spending by team or department
  - Helps identify accounts that need optimization

Each view shows the top 7 items with cost trends and provider breakdown.  

#### Service Breakdown Section

Visual breakdown of your costs across all cloud services using an interactive treemap chart.

**What you see**:
- Each service shown as a tile
- Larger tiles = higher costs
- Color indicates cloud provider (AWS, Azure, GCP)
- Service name and cost amount on each tile
- Cost trend indicator (up/down/stable)

Hover over tiles to see exact costs and percentages, click tiles to drill down into service details, click "View Full Breakdown" to open Cost Explorer for detailed analysis and identify which services are costing the most at a glance

<DocImage path={require('./static/parttwo.png')} width="100%" title="CACM Overview" />

#### Starred Views Section

Quick access to your favorite custom cost views (Cost Explorer).

**What you see**:
- Cards for each of your starred perspectives
- Each card shows View name and summary
- Direct links to view full perspective details

**What you can do**:
- Click any card to open that View in Cost Explorer
- Star Views in Cost Explorer to add them here
- Unstar Views to remove them
- Create custom Views for specific analysis needs

#### Optimization Impact Section

Shows how much money you're saving (or could save) through optimization features.

- **Recommendations**: Savings realized and potential savings opportunities
- **AutoStopping Savings**: Savings from automatically stopping idle resources
- **Asset Governance Savings**: Cost impact of enforced governance policies and compliance rules
- **Commitment Savings**: Savings from optimized Reserved Instances and Savings Plans coverage
- **Cluster Orchestrator Savings**: Savings from intelligent Kubernetes resource optimization and autoscaling

---

## Cloud Cost Management

Track, attribute, and optimize spend across AWS, Azure, GCP, and external sources (SaaS, data center) using Perspectives, Cost Categories, budgets, governance policies, and automated optimization such as AutoStopping and Commitment Orchestration.

**Get started:** [Connect a cloud provider](./get-started.md) for Kubernetes, AWS, GCP, or Azure.

---

## AI Cost Management

AI Cost Management extends the same platform to LLM providers, managed AI services, and AI applications. It tracks spend from invoice-level totals down to individual agent sessions, attributes cost to teams and products, and measures ROI per AI outcome (cost per resolved ticket, per session, per inference), all in the same Cost Explorer, Cost Categories, and budgets you already use for cloud.

**Get started:** [Connect an AI provider](./get-started.md) and select the **AI** tab, then see [Introduction to AI cost management](../ai-cost-management/introduction-to-ai-cost-management.md) for what you can track and how to set it up, including trace-level attribution for agents, sessions, and requests.

---

## Where to go next

Use these references to move from overview to setup without losing the thread:

- **[Get started](./get-started.md):** Connect a cloud or AI provider. Pick the **AI** tab to start tracking AI spend.
- **[Introduction to AI cost management](../ai-cost-management/introduction-to-ai-cost-management.md):** What you can track at each level (connector → traces → governance) and how it works.
- **[Perspectives/Views & Cost Explorer](/docs/category/perspectives):** Analyze and break down cloud and AI spend.

