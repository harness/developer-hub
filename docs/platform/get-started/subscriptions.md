---
title: Subscriptions and licenses
description: View and manage your Harness subscriptions and licenses.
sidebar_position: 20
redirect_from:
  - /docs/platform/get-started/pl-subscription-mgmt
---

import Manage from '/docs/platform/shared/subscription-manage.md';
import View from '/docs/platform/shared/subscription-view-subscriptions.md';

You can view and manage module subscription and license information within your Harness account.

## Developer 360 subscriptions

You can subscribe to Harness modules using the [Developer 360](https://www.harness.io/pricing) subscription model.

This model spans all modules except Cloud Cost Management, which is on a *Cloud Spend* model.

The following sections explain how this subscription model works across the various modules on the platform.

### Who is a developer?

Every user who contributes to software development, deployment, maintenance, optimization, and more is considered a developer on the Harness Platform for the purpose of the Developer 360 subscription model.

These users use Harness to create code repositories, build software, test and secure software, deploy software, run chaos experiments, manage SLOs, manage feature flags and more.

The definition of a developer (and the consumption entitlements, if any) remain the same for all plans, namely Free, Startup, and Enterprise.

### Modules with direct developer tracking

The following Harness modules are directly involved in a developer's day-to-day workflow. These modules consume a developer license for every developer involved.

- Code Repository (CODE)
- Continuous Integration (CI)
- Internal Developer Portal (IDP)
- Software Engineering Insights (SEI)

### Modules with no direct developer tracking (consumption entitlements)

All other Harness modules (except CCM) are indirectly involved in a developer's day-to-day workflow, and they track an indirect unit instead of a developer. Harness refers to these indirect units as *Consumption Entitlements*.

In these cases, the developer license acts as a proxy for granting a predetermined set of consumption entitlements, as explained below.

You can subscribe to more consumption entitlements, if needed, at an additional cost.

* **Continuous Delivery and GitOps (CD) Services:** CD deploys software services onto infrastructure platforms spanning traditional VMs, Kubernetes, public cloud platforms, serverless functions, and other custom deployment targets. A **Service** is an independent unit of software you track and manage through Harness CD and GitOps. This typically maps to:

   - A service in Kubernetes
   - A containerized service on a cloud (such as AWS ECS or Azure ACS or Google Container Engine)
   - A VM in the traditional VM-based apps
   - Six serverless functions in serverless environments

   CD tracks **Service** license consumption instead of **Developers**. All Service licenses are tracked over a *last 30 days* active window. For a detailed understanding of CD services and how they are tracked, go to [Service licensing for CD](https://developer.harness.io/docs/continuous-delivery/get-started/service-licensing-for-cd/).

* **Feature Flags (FF) Developers and Monthly Active Users (MAUs):** Harness Feature Flags is a feature flag rollout and management module that tracks Developers based on their active engagement with the FF module. FF tracks **Developers** and **MAU** license consumption.

   Every platform user that actively creates, edits, or deletes a flag or a group is tracked as a FF developer. Monthly Active Users (MAUs) represent the unique users seen every month from one or more client-side applications that evaluate various flags managed by Harness.

* **Service Reliability Management (SRM) Services:** SRM helps manage SLOs/SLIs for various services in an R&D organization. A **Service** is an independent unit of software you track & manage through Harness SRM. This will typically map to:

   - A service in Kubernetes
   - A containerized service on acloud (such as AWS ECS or Azure ACS or Google Container Engine)
   - A VM in the traditional VM-based apps
   - Six serverless functions in serverless environments

   SRM tracks **Service** license consumption, instead of **Developers**. All Service licenses are tracked over a *last 30 days* active window.

* **Chaos Engineering (CE) Services:** CE helps run chaos experiments across various services in an R&D organization, towards the goal of making them resilient . A **Service** is an independent unit of software you track & manage through Harness CD & GitOps. This will typically map to:

   - A service in Kubernetes
   - A containerized service on a cloud (such as AWS ECS or Azure ACS or Google Container Engine)
   - A VM in the traditional VM-based apps
   - Six serverless functions in serverless environments

   CE tracks **Service** license consumption, instead of **Developers**. All Service licenses are tracked over a *last 30 days* active window.

* **Infrastructure as Code Management (IACM) Executions:** An IACM **Execution** is counted as every successful IACM stage execution that uses an Infrastructure Provider's `apply` command (such as `terraform apply`) and results in resource changes. IACM tracks **Executions** license consumption, instead of **Developers**.

* **Security Test Orchestration (STO) Security Scans:** A **Security Scan** is defined as the execution of the STO step within a pipeline. This involves scanning an artifact (referred to as the Target), which can be a Repository, Docker image, or a live application, for security vulnerabilities. STO tracks **Security Scans** license consumption, instead of **Developers**. Security Scans are tracked over a *last 30 days* active window.

* **Software Supply Chain Assurance (SSCA) Supply Chain Executions:** A **Supply Chain Execution** is defined as the execution of the SSCA step in a pipeline. Generating SBOMs, enforcing SBOM policies, generating SLSA provenance or verifying SLSA provenance are all counted as unique SSCA steps. SSCA tracks **Supply Chain Executions** license consumption, instead of **Developers**. Supply Chain Executions are tracked over a *last 30 days* active window.

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
| Infrastructure as Code Management | 10 Executions per Developer per Month|
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