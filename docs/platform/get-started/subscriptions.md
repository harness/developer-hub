---
title: Subscriptions and licenses
description: View and manage your Harness subscriptions and licenses.
sidebar_position: 4
redirect_from:
  - /docs/platform/get-started/pl-subscription-mgmt
---

import Manage from '/docs/platform/shared/subscription-manage.md';
import View from '/docs/platform/shared/subscription-view-subscriptions.md';

## Developer 360 subscriptions

Customers subscribe to Harness modules using a subscription model called [Developer 360](https://www.harness.io/pricing). This model spans all modules except Cloud Cost Management, which is on a ‘Cloud Spend’ model. The following sections explain how this subscription model works across the various modules on the platform.

### Who is a developer?

Every user who contributes to software development / deployment / maintenance / optimization and more, is considered a developer on the Harness Platform for the purpose of the Developer 360 subscription model. These users use Harness to create code repositories, build software, test & secure software, deploy software, deploy software, run chaos experiments, manage SLOs, manage feature flags and more. Note that the definition of a developer (and the consumption entitlements if any) remain the same for all plans, namely Free, Startup and Enterprise.

### Modules with direct developer tracking

Following Harness modules are directly involved in a developer’s day-to-day workflow, and hence consume a developer license for every developer involved.

- Code Repository (CR)
- Continuous Integration (CI)
- Internal Developer Portal (IDP)
- Software Engineering Insights (SEI)

### Modules with no direct developer tracking

Following Harness modules are indirectly involved in a developer’s day-to-day workflow and hence track an indirect unit instead of a developer. Harness calls these indirect units as ‘Consumption Entitlements’. In these cases, developer license acts as a proxy for granting a predetermined set of consumption entitlements. Customers can subscribe to more consumption entitlements if needed at an additional cost.

#### Continuous Delivery & GitOps (CD)

**Services** CD module deploys and manages any number of software services, spanning traditional VMs, Kubernetes, Clouds, Serverless and other custom deployments. A Service is an independent unit of software you track & manage. This will typically map to a Service in Kubernetes apps, or to a cloud container service on cloud (such as AWS ECS or Azure ACS or Google Container Engine) or to a VM in the traditional VM-based apps or to 6 serverless functions in serverless environments. All Service licenses are consumed over a last 30 day active window.

CD tracks ‘Service’ license consumption, instead of Developers.

#### Feature Flags (FF)

**Developers & Monthly Active Users (MAUs)** FF is a feature flag rollout and management module that tracks Developers based on their active engagement with the FF module. Every platform user that actively creates / edits / deletes a flag or a group, is tracked as a FF developer. MAUs or Monthly Active Users represent the unique users seen every month, from one or more client side applications that evaluate various flags managed via Harness.

FF tracks ‘Developers’ and ‘MAU’ license consumption.

#### Service Reliability Management (SRM)

**Services** SRM helps manage SLOs/SLIs for various services in a R&D organization. A Service is an independent unit of software you track & manage through Harness SRM. This will typically map to a Service in Kubernetes apps, or to a cloud container service on cloud (such as AWS ECS or Azure ACS or Google Container Engine) or to a VM in the traditional VM-based apps or to 6 serverless functions in serverless environments. All Service licenses are consumed over a last 30 day active window.

SRM tracks ‘Service’ license consumption, instead of Developers.

#### Chaos Engineering (CE)

**Services** CE helps run chaos experiments across various services in a R&D organization, towards the goal of making them resilient . A Service is an independent unit of software you track & manage through Harness CE. This will typically map to a Service in Kubernetes apps, or to a cloud container service on cloud (such as AWS ECS or Azure ACS or Google Container Engine) or to a VM in the traditional VM-based apps or to 6 serverless functions in serverless environments. All Service licenses are consumed over a last 30 day active window.

CE tracks ‘Service’ license consumption, instead of Developers.

#### Infrastructure as Code Management (IACM)

**Executions** Every successful IACM stage execution that uses an Infrastructure Provider’s `Apply’ command (such as terraform apply) that results in resource changes, is counted as an execution. All executions are tracked over a last 30 day active window.

IACM tracks ‘Executions’ license consumption, instead of Developers.

#### Security Test Orchestration (STO)

**Security Scans** A Security Scan is defined as the execution of the STO step within a pipeline, tracked over a last 30 day active window. This involves scanning an artifact (referred to as the Target), which can be a Repository, Docker image, or application, for any security vulnerabilities.

STO tracks ‘Security Scans’ license consumption, instead of Developers.

#### Software Supply Chain Assurance (SSCA)

**Supply Chain Executions** A Supply Chain Execution is defined as the execution of SSCA Step in a pipeline, tracked over a last 30 day active window. Generating SBOMs, Enforcing SBOM policies, Generating SLSA Provenance or Verifying SLSA provenance - all are counted as unique SSCA steps.

SSCA tracks ‘Supply Chain Executions’ license consumption, instead of Developers.

#### Cloud Cost Management (CCM)

**Cloud Spend** CCM is licensed on Monthly / Annual Cloud Spend that is managed and optimized via Harness. This cloud spend is actively tracked in the CCM module experience and tracked against the licensed cloud spend. As previously noted, CCM does not follow the Developer 360 subscription model.

### Included & Add-on consumption entitlements

Developer 360 subscription model includes module-specific consumption entitlements by default. This means every Developer license for a module, includes a corresponding consumption entitlement, where it applies. Additionally, customers always have the flexibility to buy add-on consumption entitlements, as it applies to their needs.

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

For every module where a consumption entitlement applies, customers can purchase any number of add-on entitlements. This implies that customers can buy more:

- Services for CD, SRM and CE
- MAUs for Feature Flags
- Executions for IACM
- Security Scans for STO
- Supply Chain Executions for SSCA


## View subscriptions

You can view and manage your Harness module subscriptions in your Harness **Account Settings**.

<View />

## Module subscriptions and licenses

For more information on module subscriptions and license information, go to:

- [CI Subscriptions and licenses](/docs/continuous-integration/get-started/ci-subscription-mgmt/)
- [CD Service-based licensing and usage](/docs/continuous-delivery/get-started/service-licensing-for-cd)
- [FF Subscriptions](/docs/category/subscribe-to-feature-flags)

## Manage subscriptions

<Manage />