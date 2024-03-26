---
title: Subscriptions and licenses
description: View and manage your Harness subscriptions and licenses.
sidebar_position: 20
redirect_from:
  - /docs/platform/get-started/pl-subscription-mgmt
  - /docs/get-started/sign-up-for-harness-aws-marketplace
  - /docs/getting-started/sign-up-for-harness-aws-marketplace
---

import Manage from '/docs/platform/shared/subscription-manage.md';
import View from '/docs/platform/shared/subscription-view-subscriptions.md';

You can view and manage module subscription and license information within your Harness account.

## Developer 360 subscriptions

You can subscribe to Harness modules using the [Developer 360](https://www.harness.io/pricing) subscription model.

This model spans all modules except Cloud Cost Management, which is on a *Cloud Spend* model.

The following sections explain how this subscription model works across the various modules on the platform.

### Who is a developer?

Every user who contributes to software development, deployment, operations, and optimization is considered a developer on the Harness Platform for the purpose of the Developer 360 subscription model.

These users use Harness to create code repositories, build software, test and secure software, deploy software, run chaos experiments, manage SLOs, manage feature flags and more.

The definition of a developer (and the consumption entitlements, if any) remain the same for all plans, namely Free, Startup, and Enterprise.

### Modules with direct developer tracking

The following Harness modules are directly involved in a developer's day-to-day workflow. These modules consume a developer license for every developer involved.

- **Code Repository (CODE):** All users on the Harness Platform with permission to access Harness CR module are considered CODE Developers and consume a license.
- **Continuous Integration (CI):** All users on the Harness Platform with permission to access Harness CI module are considered CI Developers and consume a license.
- **Internal Developer Portal (IDP):** All users on the Harness Platform with permissions to access Harness IDP module are considered IDP Developers and consume a license.
- **Software Engineering Insights (SEI):** All users read from a configured SCM or Issue Management tool are considered SEI Developers and consume a license.

### Modules with no direct developer tracking (consumption entitlements)

All other Harness modules (except CCM) are indirectly involved in a developer's day-to-day workflow, and they track an indirect unit instead of a developer. Harness refers to these indirect units as *Consumption Entitlements*.

In these cases, the developer license acts as a proxy for granting a predetermined set of consumption entitlements, as explained below.

You can subscribe to more consumption entitlements, if needed, at an additional cost.

<details>
<summary>Continuous Delivery and GitOps (CD) Services</summary>

CD deploys software services onto infrastructure platforms spanning traditional VMs, Kubernetes, public cloud platforms, serverless functions, and other custom deployment targets. A **Service** is an independent unit of software you track and manage through Harness CD and GitOps. This typically maps to:

- A service in Kubernetes.
- A containerized service on a cloud (such as AWS ECS or Azure ACS or Google Container Engine).
- A VM in the traditional VM-based apps.
- Six serverless functions in serverless environments.

CD tracks **Service** license consumption instead of **Developers**. All Service licenses are tracked over a *last 30 days* active window. For a detailed understanding of CD services and how they are tracked, go to [Service licensing for CD](https://developer.harness.io/docs/continuous-delivery/get-started/service-licensing-for-cd/).

</details>

<details>
<summary>Feature Flags (FF) Developers and Monthly Active Users (MAUs)</summary>

Harness Feature Flags is a feature flag rollout and management module that tracks Developers based on their active engagement with the FF module. FF tracks **Developers** and **MAU** license consumption.

Every platform user that actively creates, edits, or deletes a flag or a group is tracked as a FF developer. Monthly Active Users (MAUs) represent the unique users seen every month from one or more client-side applications that evaluate various flags managed by Harness.

</details>

<details>
<summary>Service Reliability Management (SRM) Services</summary>

SRM helps manage SLOs/SLIs for various services in an R&D organization. A **Service** is an independent unit of software you track & manage through Harness SRM. This typically maps to:

- A service in Kubernetes.
- A containerized service on a cloud (such as AWS ECS or Azure ACS or Google Container Engine).
- A VM in the traditional VM-based apps.
- Six serverless functions in serverless environments.

SRM tracks **Service** license consumption, instead of **Developers**. All Service licenses are tracked over a *last 30 days* active window.

</details>

<details>
<summary>Chaos Engineering (CE) Services</summary>

CE helps run chaos experiments across various services in an R&D organization, towards the goal of making them resilient . A **Service** is an independent unit of software you track & manage through Harness CD & GitOps. This typically maps to:

- A service in Kubernetes.
- A containerized service on a cloud (such as AWS ECS or Azure ACS or Google Container Engine).
- A VM in the traditional VM-based apps.
- Six serverless functions in serverless environments.

CE tracks **Service** license consumption, instead of **Developers**. All Service licenses are tracked over a *last 30 days* active window.

</details>

<details>
<summary>Infrastructure as Code Management (IACM) Executions</summary>

An IACM **Execution** is counted as every successful IACM stage execution that uses an Infrastructure Provider's `apply` command (such as `terraform apply`) and results in resource changes.

IACM tracks **Executions** license consumption, instead of **Developers**.

</details>

<details>
<summary>Security Test Orchestration (STO) Security Scans</summary>

A **Security Scan** is defined as the execution of the STO step within a pipeline. This involves scanning an artifact (referred to as the Target), which can be a Repository, Docker image, or a live application, for security vulnerabilities.

STO tracks **Security Scans** license consumption, instead of **Developers**. Security Scans are tracked over a *last 30 days* active window.

</details>

<details>
<summary>Software Supply Chain Assurance (SSCA) Supply Chain Executions</summary>

A **Supply Chain Execution** is defined as the execution of the SSCA step in a pipeline. Generating SBOMs, enforcing SBOM policies, generating SLSA provenance or verifying SLSA provenance are all counted as unique SSCA steps.

SSCA tracks **Supply Chain Executions** license consumption, instead of **Developers**. Supply Chain Executions are tracked over a *last 30 days* active window.

</details>

### Included and add-on consumption entitlements

The Developer 360 subscription model includes module-specific consumption entitlements by default.

This means every developer license for a module includes a corresponding consumption entitlement, where applicable.

Additionally, you always have the flexibility to purchase add-on consumption entitlements, as needed.

#### Included consumption entitlements

| Harness Module | Included Consumption Entitlement |
|----------------|----------------------------------|
| Code Repository | Not applicable since Developers are tracked directly|
| Continuous Integration | Not applicable since Developers are tracked directly|
| Continuous Delivery & GitOps | 1 Service for every 3 Developers |
| Feature Flags | 10K MAUs per Developer per Month|
| Service Reliability Management | 1 Service for every 3 Developers |
| Chaos Engineering | 1 Service for every 3 Developers |
| Infrastructure as Code Management | 120 Executions per Developer per Year|
| Software Engineering Insights | Not applicable since Developers are tracked directly |
| Internal Developer Portal | Not applicable since Developers are tracked directly|
| Security Testing Orchestration | 100 Security Scans per Developer per Month |
| Software Supply Chain Assurance | 100 Supply Chain Executions per Developer per Month|

#### Add-on consumption entitlements

For every module where a consumption entitlement applies, you can purchase any number of add-on entitlements.

This means you can purchase more:

- Services for CD, SRM, and CE
- MAUs for Feature Flags
- Executions for IACM
- Security Scans for STO
- Supply Chain Executions for SSCA

### Cloud Cost Management (CCM) Cloud Spend

CCM does not follow the Developer 360 subscription model.

**Cloud Spend** for CCM is licensed as a Monthly/Annual Cloud Spend that is managed and optimized via Harness. This cloud spend is actively tracked in the CCM module experience and tracked against the licensed cloud spend.

## View subscriptions

You can view and manage your Harness module subscriptions in your Harness **Account Settings**.

<View />

## Manage subscriptions

<Manage />

## Module subscriptions and licenses

For more information about specific module subscriptions and licenses, go to:

- [CI Subscriptions and licenses](/docs/continuous-integration/get-started/ci-subscription-mgmt/)
- [CD Service-based licensing and usage](/docs/continuous-delivery/get-started/service-licensing-for-cd)
- [FF Subscriptions](/docs/category/subscribe-to-feature-flags)
- [SRM subscriptions and licenses](/docs/service-reliability-management/get-started/srm-subscription-licensing)

## Sign up for Harness through the AWS Marketplace

Follow these steps to purchase Harness products through the AWS Marketplace:

1. Go to the [AWS Marketplace](https://aws.amazon.com/marketplace/seller-profile?id=cddecd76-14a6-4b48-98a4-c747994c0cf4) to see a list of available modules.
2. Select the module you want to purchase.
3. Select **View purchase options**.
4. Sign in to your AWS account or create a new account.
5. Select the configuration you want to purchase.

   :::info
   If you would like to work with the Harness team to get custom pricing options for Harness on AWS Marketplace on a contract basis, please complete [this form](https://www.harness.io/contact-sales/get-pricing).
   :::

6. Choose your contract options, and then select **Create contract**.
7. Select **Pay now** to purchase the contract for the module you selected.
8. Select **Click here to set up your account**, and then follow the prompts to set up your account.

   A Harness Customer Success Manager will contact you and provision a license for you.
