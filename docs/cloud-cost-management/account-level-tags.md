---
title: Account tags in CACM
sidebar_label: Account tags
description: Understand how AWS account tags, GCP project labels, and Azure subscription tags appear in Harness CACM and how to use them in Perspectives, Cost Categories, and Dashboards.
keywords:
  - account tags
  - project labels
  - subscription tags
  - accountTag
  - projectLabels
  - Label V2
  - tag inheritance
tags:
  - cloud-cost-management
  - aws
  - gcp
  - azure
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

## What Are Account Tags?

In every major cloud provider (**AWS**, **GCP**, **Azure**), a **Tag** is a key-value label such as `team=platform` or `env=production` that you attach to a cloud resource. Based on these tags, spend can be grouped into meaningful buckets, so you can answer questions like *How much did the platform team spend last month?* But this only works if every resource is tagged. A single account can run thousands of resources, and they are created and destroyed all the time. Tagging each one by hand is hard to keep up with, and any untagged resource ends up unattributed instead of counted toward the right team or environment.

An **Account Tag** removes that burden. You set one tag on an entire AWS account, GCP project, or Azure subscription, and every resource inside inherits it, including resources with no tags of their own. Cloud & AI Cost Management (CACM) then lets you filter and group cost by account tags in **Perspectives**, **Cost Categories**, and **Dashboards**, exactly like resource tags.

Each cloud provider surfaces account tags differently and has its own setup requirement.

### An Example - How It Works?

The following example shows how account tags turn many separate accounts into a clear per-team cost breakdown, without tagging a single resource. The same example is shown for AWS, GCP, and Azure below.

<Tabs queryString="provider">
<TabItem value="aws" label="AWS" default>

Say you run three AWS accounts, owned by two teams. You want to know what each team spends, but you do not want to tag every resource inside those accounts. Instead, you tag each account once with a `team` tag:

| AWS account | `team` tag |
|-------------|------------|
| `web-app` | `team=platform` |
| `checkout` | `team=platform` |
| `analytics` | `team=data` |

Group a Perspective by `accountTag/team`, and CACM folds the two `platform` accounts into a single line:

| `accountTag/team` | Monthly cost |
|-------------------|--------------|
| `platform` | $84,000 |
| `data` | $31,000 |

</TabItem>
<TabItem value="gcp" label="GCP">

Say you run three GCP projects across two environments. You want cost split by environment without tagging every resource. Instead, you label each project once with an `env` label:

| GCP project | `env` label |
|-------------|-------------|
| `storefront` | `env=production` |
| `payments` | `env=production` |
| `sandbox` | `env=staging` |

Group a Perspective by `projectLabels/env`, and CACM folds the two `production` projects into a single line:

| `projectLabels/env` | Monthly cost |
|---------------------|--------------|
| `production` | $52,000 |
| `staging` | $9,000 |

</TabItem>
<TabItem value="azure" label="Azure">

Say you run three Azure subscriptions across two cost centers. You want cost split by cost center without tagging every resource. Instead, you tag each subscription once with a `costCenter` tag:

| Azure subscription | `costCenter` tag |
|--------------------|------------------|
| `networking` | `costCenter=infra` |
| `shared-services` | `costCenter=infra` |
| `warehouse` | `costCenter=data` |

Group a Perspective by `costCenter`, and CACM folds the two `infra` subscriptions into a single line:

| `costCenter` | Monthly cost |
|--------------|--------------|
| `infra` | $40,000 |
| `data` | $18,000 |

</TabItem>
</Tabs>

---

## Account Tag Key Formats By Cloud Provider

Each cloud provider uses a different key format for **Account Tags** in CACM. You can use **Account Tags** under `Label V2` to filter and group your cost in **Perspectives**, **Cost Categories**, and **Dashboards**:

| Cloud provider | Tag level | Term | Key format under `Label V2` |
|----------------|-----------|------|----------------------------|
| **AWS** | Account | Account tag | A key starting with `accountTag/`, such as `accountTag/team` |
| **GCP** | Project | Project label | A key starting with `projectLabels/`, such as `projectLabels/env` |
| **Azure** | Subscription or resource group | Subscription / resource group tag | A plain key with no prefix, and only after you turn on tag inheritance |

AWS and GCP add a prefix so you can tell an account tag apart from a resource tag. Azure adds no prefix, so its keys look like ordinary resource tags. Select your provider below for the full format and setup.

<Tabs queryString="provider">
<TabItem value="aws" label="AWS" default>

### AWS Account Tags

**Prerequisites:**

- **AWS Organizations:** Account tags apply only to member accounts in an AWS Organization. Standalone accounts do not have account-level tags.
- **CUR 2.0 connector:** Go to [Set up cost visibility for AWS](/docs/cloud-cost-management/get-started/onboarding-guide/set-up-cost-visibility-for-aws?tab-number=1) to configure or migrate your connector for consolidated billing.
- **Who can apply:** An AWS Organizations administrator applies tags to member accounts from the management account.

When you tag an AWS Organization member account, that tag flows into Harness and appears under `Label V2` with the prefix `accountTag/{key}`.

- **Example key:** `accountTag/team`
- **Example value:** `platform`
- **Distinct from:** resource-level tags, which have no prefix

**How it works:** Tags applied from the AWS Organizations management account to member accounts flow into CUR 2.0 under the `resource_tags` field with the `accountTag/` prefix. Harness ingests these into `Label V2`.

</TabItem>
<TabItem value="gcp" label="GCP">

### GCP Project Labels

**Prerequisites:**

- **GCP Organization:** Account-level project labels are available only when your projects belong to a GCP Organization. Standalone projects outside an Organization do not surface account-level labels.
- **Billing export:** Project labels are included automatically from your GCP billing export. No additional Harness configuration is required. Go to [Set up CACM for GCP](/docs/cloud-cost-management/get-started/onboarding-guide/set-up-cost-visibility-for-gcp) to configure your connector.
- **Who can apply:** A user with the `resourcemanager.projects.update` permission on the project sets the project labels. This permission is included in the GCP **Owner** and **Editor** roles.

Project-level labels from GCP Cloud Resource Manager appear with the prefix `projectLabels/{key}`.

- **Example key:** `projectLabels/env`
- **Example value:** `production`
- **Distinct from:** resource-level labels on individual GCP resources, which have no prefix

**How it works:** GCP billing exports include project-level labels on every billing line item. Harness ingests these into `Label V2` with the `projectLabels/` prefix so you can distinguish them from resource-level labels.

</TabItem>
<TabItem value="azure" label="Azure">

### Azure Subscription and Resource Group Tags

**Prerequisites:**

- **Azure organization:** Account-level subscription and resource group tags are available only when your subscriptions belong to an Azure organization (a Tenant with Management Groups). Standalone subscriptions outside an organization do not surface account-level tags.
- **Tag inheritance:** Subscription and resource group tags are not visible in Harness until you enable tag inheritance in Azure. Go to the [Enable tag inheritance](#enable-tag-inheritance) steps below.
- **Azure connector:** Re-sync your Azure connector in Harness after you enable tag inheritance. Go to [Set up cost visibility for Azure](/docs/cloud-cost-management/get-started/onboarding-guide/set-up-cost-visibility-for-azure) to configure your connector.
- **Who can apply:** An Azure subscription owner or contributor tags subscriptions and enables tag inheritance.

Azure does not expose subscription or resource group tags as separate fields in billing exports by default. Azure uses **tag inheritance** to roll tags down to billed resources.

#### Without Tag Inheritance (Default)

Only tags directly on the billed resource appear in cost data. Subscription and resource group tags are not visible in Harness.

#### With Tag Inheritance Enabled

Subscription and resource group tags flow down to every resource billed under that subscription or resource group. They then appear in Harness `Label V2` as plain keys — no prefix is added by Azure.

**What the conflict policy is:** The same tag key can exist at more than one level, for example `env` on both the subscription and a resource. When that happens, Azure applies a conflict policy to decide which value wins: the higher-level tag or the resource's own tag.

**Set the conflict policy:** You choose the conflict policy on the Azure **Tag inheritance** screen when you enable inheritance. Go to [Enable tag inheritance](#enable-tag-inheritance) to configure it.

#### Recommended Naming Convention

Because Azure does not add a prefix, use a naming convention in the tag key itself to distinguish subscription and resource group tags from resource-level tags in Harness:

- Subscription tags: `subscriptionTag-{key}` (for example, `subscriptionTag-costDepartment`)
- Resource group tags: `resourceGroupTag-{key}` (for example, `resourceGroupTag-app`)

#### Enable Tag Inheritance

1. In the Azure portal, go to **Cost Management** and select **Manage subscription**.
2. Select **Tag inheritance**.
3. Enable tag inheritance for each subscription or billing scope.
4. Choose your conflict behavior — prefer subscription and resource group tags or prefer resource tags.
5. Re-sync your Azure connector in Harness CACM.

Go to [Azure tag inheritance](https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/enable-tag-inheritance) to review the Azure documentation.

</TabItem>
</Tabs>

---

## Use Account-Level Tags in Harness

Once ingested, account-level tags are available as `Label V2` dimensions across CACM reporting features.

### Perspectives

In any Perspective, select `Label V2` in **Group By** or as a **Filter**. Account-level tag keys appear alongside resource-level tag keys. Look for the prefix to identify the source:

| Prefix | Source | Example |
|--------|--------|---------|
| `accountTag/` | AWS account (org-level) | `accountTag/team` |
| `projectLabels/` | GCP project | `projectLabels/env` |
| No prefix | Azure (with tag inheritance) or resource-level tag | `costDepartment` |

### Cost Categories

Cost Categories classify your spend into buckets using rules, and each rule follows an **Operand, Operator, Value** structure. Account-level tags plug into that structure as `Label V2` keys, so you can build a bucket from account tags without tagging a single resource.

For example, to create a **Cost Bucket** called **Engineering** that collects every account tagged for the engineering team:

- **Operand:** Select your cloud provider (for example, **AWS**), then choose the `Label V2` key `accountTag/team`.
- **Operator:** Select **IN** to match a specific value.
- **Value:** Select `engineering`.

Every dollar spent in AWS accounts tagged `team=engineering` then falls into the Engineering bucket. Because the rule matches at the account level, resources with no tags of their own are still counted, which is what makes account tags useful for organizations that manage spend by team or business unit rather than by individual resource.

### BI Dashboards

BI Dashboards let you build custom cost widgets, and account-level tags are available there as `Label V2` fields, the same place they appear in Perspectives and Cost Categories. You can filter and group any widget by an account tag, so a per-team or per-environment breakdown becomes a shared, always-on view instead of a one-off Perspective.

For example, to see monthly cost per team across every AWS account, add a **Data Widget** and group it by your account tag `accountTag/team`. Each team's spend then shows as its own line. To focus on just a few teams, add a filter for values like `platform` or `data`.

---

## Troubleshooting

<Troubleshoot
  issue="My AWS account tags are not appearing in Label V2 in Perspectives"
  mode="docs"
  fallback="Account tags require a CUR 2.0 connector and an AWS Organizations setup. Verify your connector is using CUR 2.0 and that your accounts are part of an AWS Organization with tags applied from the management account."
/>

<Troubleshoot
  issue="My GCP project labels are not showing up in Harness CACM Label V2"
  mode="docs"
  fallback="GCP project labels are included automatically from the billing export. Verify that labels are applied to your GCP projects in Cloud Resource Manager and that your GCP billing connector is active and syncing."
/>

<Troubleshoot
  issue="My Azure subscription or resource group tags are not visible in Harness CACM"
  mode="docs"
  fallback="Azure subscription and resource group tags require tag inheritance to be enabled in Azure Cost Management. Go to Cost Management > Manage subscription > Tag inheritance and enable it for each subscription, then re-sync your Azure connector in Harness."
/>
