---
title: Cost Estimation for Environments
description: Learn how Harness IDP surfaces infrastructure cost data from IACM workspaces in your environments.
sidebar_label: Cost Estimation
sidebar_position: 4
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import DocImage from '@site/src/components/DocImage';

Harness IDP displays infrastructure cost estimation data from IACM workspaces directly in your environments. When an IACM workspace has cost estimation enabled, Infracost runs during the Terraform plan stage and computes estimated monthly costs for priceable cloud resources. This data is exposed at the individual resource level and aggregated at the environment level.

---

## Before you begin

If you wish for cost estimation data to appear in your environments, ensure the following:

- The IACM workspace template used by the environment has `cost_estimation.enabled: true`. Go to [Workspace Templates](/docs/infra-as-code-management/workspaces/workspace-templates) to know the process of template configuration.
- The Terraform module contains priceable cloud resources (compute instances, databases, storage, and so on).

:::info
Kubernetes and Helm resources are not supported by Infracost and do not produce cost data.
:::

---

## How it works

Cost estimation runs during the **Terraform plan** stage, not the apply stage. Infracost evaluates the plan output and computes estimated monthly costs for supported cloud resources. No additional configuration is needed on the environment or blueprint beyond enabling cost estimation on the IACM workspace template.

Cost data is supported for the following cloud providers:

- Amazon Web Services (AWS)
- Google Cloud Platform (GCP)
- Microsoft Azure

---

## View cost data

### Environment list

The environments list includes an **EST.COST/MO** column. Environments with cost estimation enabled display an aggregated value such as `$~7/mo (USD)`. Environments without cost estimation enabled display **Cost not enabled**.

<DocImage path={require('./static/cost-list.png')} />

The same **EST.COST/MO** column appears in the **Environments** tab on the blueprint overview page, showing cost data across all environments created from that blueprint.

<DocImage path={require('./static/blueprint-costs.png')} />

### Environment detail: Cost tab

On the environment detail page, open the **Cost** tab to view a per-resource breakdown.

<DocImage path={require('./static/cost-tab.png')} />

The table shows the following columns:

| Column | Description |
|---|---|
| **Resource** | The Terraform resource identifier (for example, `google_compute_instance.vm`). |
| **Resource Type** | The resource type (for example, `google_compute_instance`). |
| **Est. Cost/Mo** | Estimated monthly cost in USD. |

:::tip
The Cost tab also supports pagination for environments with a large number of resources.
:::

When a cost change is detected between plan runs, a diff appears next to the estimated cost, showing the absolute change and percentage (for example, `+$114 (+100%)` for increases or `-$1 (-14%)` for decreases).

<DocImage path={require('./static/cost-diff.png')} />

:::info When cost data is not shown

Cost data is absent in the following cases:

- The IACM workspace template has `cost_estimation.enabled: false`.
- The workspace uses only Kubernetes or Helm resources, which Infracost does not support.
- No Terraform plan has been executed yet for the environment.
- The environment instance uses a [CD backend rather than IACM](/docs/internal-developer-portal/environment-management/blueprints/env-blueprint-yaml#backend-types).

:::

