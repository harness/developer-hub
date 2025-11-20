---
title: Get started with IaCM
description: A self-service onboarding guide for Harness IaCM.
sidebar_position: 20
sidebar_label: Get Started
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DynamicMarkdownSelector from '@site/src/components/DynamicMarkdownSelector/DynamicMarkdownSelector';

Welcome to the Harness IaCM onboarding guide. Discover how Harness streamlines and secures your infrastructure management with Infrastructure as Code Management (IaCM).

## What is IaCM?
IaC automates infrastructure management via code. IaCM enhances this by ensuring consistent, accountable, and repeatable deployments. Harness boosts IaCM with [**real-time cost estimation**](/docs/infra-as-code-management/workspaces/cost-estimation), [**automated policy enforcement**](/docs/infra-as-code-management/policies-governance/terraform-plan-cost-policy), and [**drift detection**](/docs/infra-as-code-management/pipelines/operations/drift-detection), ensuring efficient provisioning and compliance with standards.

:::tip Terraform to OpenTofu migration
Harness IaCM supports integration with all **OpenTofu** versions<HarnessApiData
    query="https://app.harness.io/gateway/iacm/api/provisioners/supported/opentofu"
    token="process.env.HARNESS_GENERIC_READ_ONLY_KEY"
    fallback=""
    parse='.[-1] | " (latest: v\(.))"'></HarnessApiData>.  
 For **Terraform**, we support all MPL versions up to **1.5.x**, any BSL versions (from 1.6.0) are not supported.

Follow this [**OpenTofu migration guide**](https://opentofu.org/docs/intro/migration/) to transition from Terraform to OpenTofu and leverage the benefits of this open-source alternative.
:::

Go to [What's Supported in IaCM](/docs/infra-as-code-management/whats-supported) for more information on supported Cloud Providers and Code/Git providers.

<DynamicMarkdownSelector
  options={{
    OpenTofu: {
      path: "/infra-as-code-management/content/get-started/opentofu-quickstart.md",
      logo: "opentofu-logo.svg",
      logoSize: 24
    },
    Terragrunt: {
      path: "/infra-as-code-management/content/get-started/terragrunt-quickstart.md",
      logo: "terragrunt-logo.svg",
      logoSize: 24
    },
    Terraform: {
      path: "/infra-as-code-management/content/get-started/terraform-quickstart.md",
      logo: "terraform-logo.svg",
      logoSize: 24
    }
  }}
  toc = {toc}
  nextHeadingID='iacm-next-steps'
/>

## Next steps {#iacm-next-steps}
This guide introduced you to the core functionalities and setup of Harness IaCM, from creating workspaces to configuring pipelines. To enhance your experience and team efficiency, get the most out of Harness IaCM's built-in reusable features, including:

- [**Workspace Templates:**](/docs/infra-as-code-management/workspaces/workspace-templates) Quickly create new workspaces using pre-defined, customizable templates.
- [**Module Registry:**](/docs/category/module-registry) Share and reuse infrastructure modules across teams to standardize deployments.
- [**Default Pipelines:**](/docs/infra-as-code-management/pipelines/default-pipelines) Start with ready-made pipeline templates to accelerate automation and best practices.
- [**Queue Step:**](/docs/infra-as-code-management/pipelines/operations/iacm-queue-step) Serialize your pipeline execution to track concurrent executions and prevent state conflicts.

Go to [Harness AI Chat use cases](/docs/platform/harness-aida/harness-ai-chat-guide/) for more use cases on Harness AI, and platform integration.

<UniversityAdmonition title="Harness IaCM self-paced training">
  For an interactive onboarding experience including further use cases and features like **drift detection**, **remote backends**, and **policy enforcement**, check out [**Harness IaCM self-paced training**](https://university-registration.harness.io/self-paced-training-harness-infrastructure-as-code-management).
</UniversityAdmonition>

