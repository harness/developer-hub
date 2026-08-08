---
title: Get Started with CACM
description: Connect your first billing provider, cloud or AI, and see cost flow into Cloud & AI Cost Management.
sidebar_position: 20
sidebar_label: Get Started
redirect_from:
  - /docs/cloud-cost-management/get-started/get-started
  - /docs/cloud-cost-management/get-started/onboarding-guide/set-up-cost-visibility-for-aws
  - /docs/cloud-cost-management/get-started/onboarding-guide/set-up-cost-visibility-for-azure
  - /docs/cloud-cost-management/get-started/onboarding-guide/set-up-cost-visibility-for-gcp
  - /docs/cloud-cost-management/get-started/onboarding-guide/set-up-cost-visibility-for-kubernetes
  - /docs/cloud-cost-management/get-started/onboarding-guide/use-quick-create-k8s
---

Connect your first cloud or AI provider and see your spend in one place. Add more providers at any point to expand your coverage.

---

## Before You Begin

- **Cloud & AI Cost Management:** The Cloud & AI Cost Management module must be enabled on your Harness account, and you must have permission to create connectors. Go to [RBAC in Harness](/docs/platform/role-based-access-control/rbac-in-harness) to confirm your role, or contact your account administrator.
- **Admin access to one billing provider:** A cloud account (AWS, Azure, or GCP), a Kubernetes cluster, or an AI provider account (OpenAI or Anthropic). Connect one to start.

---

## Step 1: Connect a Billing Provider

CACM brings cloud and AI spend into one place. Pick any one provider to connect. Each one sends cost data on its own, so start with any provider that fits your setup.

1. Open **Account Settings** in Cloud & AI Cost Management.
2. Click the **Integration for cloud & AI cost** tile.
3. On the **Cloud and AI Integration** page, select the tab for your provider: **Cloud Accounts**, **Kubernetes Clusters**, **AI Providers**, or **External Cost Data Sources**.
4. Click the **+ New** button on that tab. The button label changes per tab: **+ New Cloud Account**, **+ New Kubernetes Connector**, or **+ AI Provider**.
5. Select your provider from the picker and follow the setup wizard.

Go to [Cloud Providers](/docs/category/cloud-providers-1) or [AI Providers](/docs/category/ai-providers) to follow the per-provider setup guide.

---

## Step 2: Wait for the First Sync

Allow up to 24 hours for data to sync from the provider. AI providers are usually faster, typically 6 to 12 hours.

:::note Historical data and backfill
The first sync loads recent cost data, and how far back it reaches depends on the provider. For example, AWS can backfill up to 36 months through AWS Support, while Kubernetes generates the last 30 days of cost from the first events it receives. Go to the provider's setup guide to review its backfill limits.
:::

---

## Step 3: View and Analyze Your Costs

Open **Cost Explorer**. Your spend now appears in one place, across all providers configured.

<DocImage path={require('./static/cacm-overview.png')} width="100%" title="CACM overview showing spend across connected providers." />

From here you can:

- **Explore cost:** Break spend down by provider, service, region, account, or token type.
- **Group cost with Views:** Build [Views](/docs/cloud-cost-management/cost-explorer) to slice cost by team, product, or environment.
- **Map cost to your business:** Use [Cost Categories](/docs/category/cost-categories) to align spend with your organizational structure.
- **Set budgets and alerts:** Add [Budgets](/docs/category/budgets) and anomaly alerts on any view.

Once cost is flowing and you can see it in Cost Explorer, you are set up. Everything else builds on this.

---

## Next Steps

- Go to [Navigating CACM](/docs/cloud-cost-management/get-started/navigating-cacm) to see what CACM offers across visibility, governance, and optimization.
- Go to [AI Cost Management](/docs/cloud-cost-management/ai-cost-management/overview) to attribute AI spend to agents, sessions, and requests with trace-level detail.
- Go to [Harness CACM self-paced training](https://university-registration.harness.io/self-paced-training-harness-cloud-cost-management) for an interactive onboarding experience covering Perspectives, Budgets, and AutoStopping.
