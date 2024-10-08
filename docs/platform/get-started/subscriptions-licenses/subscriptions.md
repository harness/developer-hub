---
title: View and manage subscriptions
description: View and manage your Harness subscriptions and licenses.
sidebar_position: 20
redirect_from:
  - /docs/platform/get-started/pl-subscription-mgmt
  - /docs/platform/get-started/subscriptions
canonical_url: https://www.harness.io/blog/general-availability-harness-developer-hub-hdh
---

import Manage from '/docs/platform/shared/subscription-manage.md';
import View from '/docs/platform/shared/subscription-view-subscriptions.md';
import Cloud from '/docs/platform/shared/subscription-cloud-credits.md';

You can view and manage module subscription details as well as license information directly within your Harness account. This includes monitoring current subscriptions, reviewing license allocations, and adjusting as necessary to meet your organizational needs.

## Developer 360 subscriptions

You can subscribe to Harness modules using the [Developer 360](https://www.harness.io/pricing) subscription model. The Developer 360 subscription offers three plans: **Free**, **Startup**, and **Enterprise**. All plans include [Harness AIDA](/docs/category/harness-aida), our AI Development Assistant.

:::info
This model spans all modules except Cloud Cost Management, which is on a *Cloud Spend* model.
:::

The following sections explain how this subscription model works across the various modules on the platform.

### Who is a developer?

A **Developer**  contributes to code development, deployment, security, maintenance, optimization, or all other technical activities related to software code that is managed with Harness.

These users leverage Harness to create code repositories, build, test, secure, and deploy software, conduct chaos experiments, manage SLOs, handle feature flags, and more.

The definition of a **Developer** (and any associated consumption entitlements) remains consistent across all plans: **Free**, **Startup**, and **Enterprise**.

### Modules with direct developer tracking

The following Harness modules are integral to a **Developer's** daily workflow. Each module requires a separate developer license for every user involved.

- **Code Repository (CODE):** All users on the Harness Platform who have permission to access Harness CODE module are considered as **CODE Developers** and consume a license.
- **Continuous Integration (CI):** All users on the Harness Platform who have permission to access Harness CI module are considered as **CI Developers** and consume a license.
- **Internal Developer Portal (IDP):** All users on the Harness Platform who have permission to access Harness IDP module are considered as **IDP Developers** and consume a license.
- **Feature Flags (FF):** All users on the Harness Platform who have permission to create / update / delete Feature Flags and/or Delivery Groups, within the Harness FF module, are considered as **FF Developers** and consume a license.
- **Software Engineering Insights (SEI):** All users whose actions or artifacts are read from configured Source Code Management or Issue / Project Management tool(s) are considered as **SEI Developers** and consume a license.


### Modules with no direct developer tracking (consumption entitlements)

All other Harness modules (except CCM) are indirectly involved in a **Developer's** day-to-day workflow, and they track an indirect unit instead of a **Developer** license. Harness refers to these indirect units as **Consumption Entitlements**.

In these cases, the **Developer** license acts as a proxy for granting a predetermined set of consumption entitlements, as explained below.

You have the option to subscribe to additional **Consumption Entitlements** as needed, with an associated additional cost.

<details>
<summary>Continuous Delivery and GitOps (CD) Services</summary>

CD deploys software services onto infrastructure platforms spanning traditional VMs, Kubernetes, public cloud platforms, serverless functions, and other custom deployment targets. A **Service** is an independent unit of software you track and manage through Harness CD and GitOps. This typically maps to:

- A service in Kubernetes.
- A containerized service on a cloud (such as AWS ECS, Azure ACS, or Google Container Engine).
- A VM in the traditional VM-based apps.
- Five serverless functions in serverless environments.

CD tracks **Service** license consumption instead of **Developers**. All **Service** licenses are tracked over a *last 30 days* active window. For more information about CD services and how they are tracked, go to [Service licensing for CD](https://developer.harness.io/docs/continuous-delivery/get-started/service-licensing-for-cd/).

</details>

<details>
<summary>Feature Flags (FF) Developers and Monthly Active Users (MAUs)</summary>

Harness Feature Flags is a feature flag rollout and management module that tracks **Developers** and **MAU** (Monthly Active Users) for license consumption.

All users on the Harness Platform who have permission to create, update, or delete Feature Flags and/or Delivery Groups, within the Harness FF module, are considered **FF Developers** and consume a license.
**Monthly Active Users (MAUs)** represent the unique users seen every month from one or more client-side applications that evaluate various flags managed by Harness.

</details>

<details>
<summary>Service Reliability Management (SRM) Services</summary>

SRM helps manage SLOs/SLIs for various services in an R&D organization. A **Service** is an independent unit of software you track & manage through Harness SRM. This typically maps to:

- A service in Kubernetes.
- A containerized service on a cloud (such as AWS ECS or Azure ACS or Google Container Engine).
- A VM in the traditional VM-based apps.
- Five serverless functions in serverless environments.

SRM tracks **Service** license consumption, instead of **Developers**. All Service licenses are tracked over a *last 30 days* active window.

</details>

<details>
<summary>Chaos Engineering (CE) Services</summary>

Chaos Engineering (CE) makes it easy to run chaos experiments across diverse services within an R&D organization, aimed at enhancing their resilience. A **Service** represents an autonomous software unit managed and tracked through Harness CD and GitOps. This typically maps to:

- A service in Kubernetes.
- A containerized service on a cloud (such as AWS ECS, Azure ACS, or Google Container Engine).
- A VM in the traditional VM-based apps.
- Five serverless functions in serverless environments.

CE tracks **Service** license consumption, instead of **Developers**. All Service licenses are tracked over a *last 30 days* active window.

</details>

<details>
<summary>Infrastructure as Code Management (IACM) Executions</summary>

An IACM **Execution** is counted as every successful IACM stage execution that uses an Infrastructure Provider's `apply` command (such as `terraform apply`) and results in resource changes.

IACM tracks **Executions** license consumption, instead of **Developers**.

</details>

<details>
<summary>Security Testing Orchestration (STO) Security Scans</summary>

A **Security Scan** is defined as the execution of the Security Testing Orchestration (STO) step within a pipeline. This involves scanning a **Target** for security vulnerabilities. A target can be a repository, container image, configuration, or live application.

STO tracks **Security Scans** license consumption, instead of **Developers**. **Security Scans** are tracked over a *last 30 days* active window.

</details>

<details>
<summary>Supply Chain Security (SCS) Supply Chain Executions</summary>

A **Supply Chain Execution** is defined as the execution of the Supply Chain Security (SCS) step in a pipeline. Generating SBOMs, enforcing SBOM policies, generating SLSA provenance, or verifying SLSA provenance are all counted as unique SCS steps.

SCS tracks **Supply Chain Executions** license consumption, instead of **Developers**. **Supply Chain Executions** are tracked over a *last 30 days* active window.

</details>

### Included and add-on consumption entitlements

The Developer 360 subscription model includes module-specific consumption entitlements by default.

This means every developer license for a module includes a corresponding consumption entitlement, where applicable.

You can always acquire additional consumption entitlements as needed through add-on purchases.

#### Included consumption entitlements

| Harness Module | Included Consumption Entitlement |
|----------------|----------------------------------|
| **Code Repository** | Not applicable since **Developers** are tracked directly|
| **Continuous Integration** | Not applicable since **Developers** are tracked directly|
| **Continuous Delivery & GitOps** | 1 Service for every 3 **Developers** |
| **Feature Flags** | 10K MAUs per **Developer** per month|
| **Service Reliability Management** | 1 Service for every 3 **Developers** |
| **Chaos Engineering** | 1 Service for every 3 **Developers** |
| **Infrastructure as Code Management** | 120 Executions per **Developer** per year|
| **Software Engineering Insights** | Not applicable since **Developers** are tracked directly |
| **Internal Developer Portal** | Not applicable since **Developers** are tracked directly|
| **Security Testing Orchestration** | 100 Security Scans per **Developers** per month |
| **Supply Chain Security** | 100 Supply Chain Executions per **Developers** per month|

#### Add-on consumption entitlements

For every module where a consumption entitlement applies, you can purchase any number of add-on entitlements.

This means you can purchase more:

- Services for CD, SRM, and CE
- MAUs for Feature Flags
- Executions for IACM
- Security Scans for STO
- Supply Chain Executions for SCS

### Cloud Cost Management (CCM) Cloud Spend

CCM does not follow the Developer 360 subscription model.

**Cloud Spend** for CCM is licensed as a Monthly/Annual Cloud Spend that is managed and optimized via Harness. This cloud spend is actively tracked in the CCM module experience and tracked against the licensed cloud spend.

## View subscriptions

You can view and manage your Harness module subscriptions in your Harness **Account Settings**.

<View />

## Cloud credits

<Cloud />

## Manage subscriptions

<Manage />

## Module subscriptions and licenses

For more information about specific module subscriptions and licenses, go to:

- [CI Subscriptions and licenses](/docs/continuous-integration/get-started/ci-subscription-mgmt/)
- [CD Service-based licensing and usage](/docs/continuous-delivery/get-started/service-licensing-for-cd)
- [FF Subscriptions](/docs/feature-flags/subscribe-ff/subscriptions-overview.md)
- [SRM subscriptions and licenses](/docs/service-reliability-management/get-started/srm-subscription-licensing)

## Cloud Marketplace offerings

For information about Cloud Marketplace subscriptions, go to [Cloud marketplace offerings](/docs/category/cloud-marketplace-offerings).
