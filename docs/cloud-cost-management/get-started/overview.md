---
title: Harness Cloud & AI Cost Management (CACM) Overview
sidebar_label: Overview
description: Provides an overview of Harness Cloud & AI Cost Management.
sidebar_position: 1
helpdocs_topic_id: rr85306lq8
helpdocs_category_id: j4adbv9wn7
helpdocs_is_private: false
helpdocs_is_published: true
redirect_from:
  - /docs/cloud-cost-management/getting-started-ccm/continuous-efficiency-overview
---

Harness Cloud & AI Cost Management (CACM) is a full-featured FinOps platform designed to help organizations monitor, govern, and optimize their cloud and AI expenditures. It provides deep visibility into spending across major cloud providers: AWS, Azure, and Google Cloud Platform (GCP), as well as AI providers like Anthropic, OpenAI, including managed AI offerings like AWS Bedrock and Google Vertex. Additionally, CACM allows you to integrate external cost data, such as SaaS costs and data center expenses, for a unified view of your organization's total technology spend.

<DocImage path={require('./static/overview.png')} width="100%" title="CACM Overview" />

---
## The Three Pillars of CACM

### Cost Visibility

- [Perspectives (Now Cost Explorer with Cloud & AI costs)](/docs/category/perspectives): Custom views to analyze cloud and AI costs by provider, service, region, tags, or business units. Organize them into folders, share with teams via RBAC, and use the "Ask AI" feature to create perspectives using natural language. Track spending on AI providers like Anthropic, OpenAI, and managed AI providers like AWS Bedrock and GCP Vertex AI, analyze token usage, and understand AI cost growth patterns.
- [BI Dashboards](/docs/category/bi-dashboards): Pre-built and customizable business intelligence dashboards powered by Looker. Visualize cost trends, compare spending across teams or projects, and create executive-level reports. Dashboards can be scheduled, shared, and embedded to keep stakeholders informed without requiring them to log into CACM.
- [Cost Categories](/docs/category/cost-categories): Define custom cost allocation rules to map cloud and AI spending to your business structure. Group resources by team, product, cost center, or any business dimension. The same rules you've written for cloud chargeback now apply to AI spend.
 
### Cost Governance

- [Budgets](/docs/category/budgets): Set daily, weekly, monthly, quarterly, or yearly spending limits tied to perspectives. Configure multiple alert thresholds and receive notifications via email or Slack before costs exceed budget. Available for both cloud & AI costs.

- [Asset Governance](/docs/category/asset-governance): Enforce cloud policies using policy-as-code. Create rules to identify non-compliant resources (untagged, idle, misconfigured), group them into rule sets, and schedule automatic evaluations with alerts for violations.

- [Anomaly Detection](/docs/category/anomalies): ML-powered detection of unusual spending patterns with configurable sensitivity, status management (Active/Resolved/Archived), and automated alerts to catch cost spikes early. Available for both cloud & AI costs.

### Cost Optimization

- [Recommendations](/docs/category/recommendations): AI-powered suggestions to right-size Kubernetes workloads, node pools, EC2 instances, ECS services, and Azure VMs. View potential savings, create Jira/ServiceNow tickets, and track which recommendations have been applied.

- [AutoStopping](/docs/category/autostopping-rules): Automatically stop idle non-production resources based on traffic or schedules. Supports EC2, ECS, RDS, Azure VMs, and GKE clusters. Typically saves 60-70% on non-production costs with zero code changes.

- [Commitment Orchestration](/docs/category/commitment-orchestrator): Automate AWS Reserved Instance and Savings Plan management. Analyze coverage and utilization, track savings vs. on-demand pricing, and let Harness automatically purchase optimal commitments or use manual approval mode.

- [Cluster Orchestrator](/docs/category/cluster-orchestrator-for-aws-eks-clusters-beta): Intelligent Kubernetes cluster management that automatically optimizes node pools, manages spot instances, and handles workload bin-packing. Reduces cluster costs while maintaining performance and availability SLAs.

---

### Why Harness' Cloud & AI Cost Management?

- **AI Cost Visibility with Unit Economics**: As AI adoption accelerates, so do costs. CACM tracks spending on AI providers like Anthropic, OpenAI, and Gemini, and managed AI providers like AWS Bedrock and GCP Vertex AI, breaking down costs by model, monitoring token usage, and helping you understand where your AI budget is going. More importantly, CACM ties every dollar of AI spend to the agent, session, and business outcome it produced giving you cost per agent run, cost per session including multi-turn conversations, cost per inference, cost broken down by token type, session, inference and use-case, and agent ROI tied to business outcomes (cost per resolved ticket, cost per completed workflow, cost per customer interaction).

- **Actionable, Not Just Informative**: Unlike tools that only show dashboards, CACM takes action. AutoStopping shuts down idle resources, Cluster Orchestrator optimizes nodes, and Commitment Orchestration purchases RIs automatically—turning insights into savings without manual effort.

- **Built for Modern Infrastructure**: Native support for Kubernetes, containers, serverless, and AI workloads. CACM understands cloud-native architectures, not just VMs and storage buckets.

- **Trace-Level Cost Decomposition for AI**: Cost can be analyzed by agent, by session and conversation, by individual run, and step-by-step within a run—all the way down to the model and tool invoked at each step. Expensive workloads surface, worst-case behavior becomes visible instead of being averaged away, and the same dimensions plug into Cost Categories, Perspectives, and Budgets.

- **Governance at Scale**: Policy-as-code enforcement ensures compliance across hundreds of accounts. Automatically detect untagged resources, idle infrastructure, and security misconfigurations before they become costly problems.

- **Integrated with Your Workflow**: Create Jira or ServiceNow tickets directly from recommendations. Receive alerts via Slack or email. CACM fits into how your teams already work.

- **Proven ROI**: Organizations typically see 20-30% reduction in overall cloud & AI spend, with non-production savings of 60-70% through AutoStopping alone.
---

## Next Steps
- [Get Started with Cloud & AI Cost Management](/docs/cloud-cost-management/get-started/#aws)
