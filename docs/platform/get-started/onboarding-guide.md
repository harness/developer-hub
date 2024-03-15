---
title: Onboarding guide
description: A self-service onboarding guide for Harness Platform
sidebar_position: 2
redirect_from:
  - /docs/platform/get-started/tutorials
  - /docs/get-started/tutorials
  - /docs/getting-started/start-for-free
  - /docs/get-started/start-for-free
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The Harness Platform and modules are built to help developers and DevOps teams deliver software with the highest velocity, quality, security, reliability, and resilience, while achieving the lowest cost possible and remaining inside the governance guardrails necessary for meeting organizational goals.

Follow this guide to get started with the Harness Platform.

<!-- add tutorials links -->
<!-- add module info -->

## Access your Harness account

Harness offers both SaaS and on-premises editions.

<Tabs>
<TabItem value="saas" label="SaaS" default>

Harness SaaS is a fully-managed cloud version of the Harness Platform. Harness offers free, team, and enterprise plan tiers. For more information about plan options and pricing, go to [Subscriptions and licenses](./subscriptions.md).

:::tip

Harness offers a free tier of the Harness Software Delivery Platform to help you on your software delivery journey.

[Sign up for free and get started with Harness today.](https://app.harness.io/auth/#/signup/&?utm_source=website&utm_medium=harness-developer-hub&utm_campaign=plt-plg&utm_content=get-started)

:::

To create an account on the free plan, [sign up for a free account](https://app.harness.io/auth/#/signup/?module=cd&utm_medium=harness-developer-hub) and then [sign in to your Harness account](https://app.harness.io/auth/#/signin).

New accounts on the team or enterprise plan must receive an invitation email from an Account Administrator to be able to [sign in](https://app.harness.io/auth/#/signin). Contact [Harness Support](mailto:support@harness.io) if you need more information or if you do not know your Account Administrator.

</TabItem>
<TabItem value="smp" label="Self-Managed Enterprise Edition">

[Harness Self-Managed Enterprise Edition (aka SMP)](/docs/self-managed-enterprise-edition/get-started/onboarding-guide) is a self-managed, Kubernetes-native version of Harness Platform that runs on your own public or private cloud infrastructure.

This option requires access to a Harness SMP license key as well as the ability to download the Harness SMP software (container images & Helm Chart). Contact [Harness Support](mailto:support@harness.io) if you do not have access to either the license key or the download location for your SMP account.

When you have the license key and download location, install and configure a Harness SMP instance as explained in [Install Harness SMP using Helm Chart](/docs/self-managed-enterprise-edition/self-managed-helm-based-install/install-harness-self-managed-enterprise-edition-using-helm-ga).

Then [create your Harness SMP Account](/docs/self-managed-enterprise-edition/get-started/onboarding-guide#create-your-harness-account). After initial account creation, you can sign in to your Harness SMP account by navigating to `http://YOUR_DOMAIN_NAME/auth/#/signin`.

</TabItem>
</Tabs>

## Review key concepts

Get familiar with terminology and functionality found in the Harness Platform and Harness modules.

* [Harness Platform key concepts](/docs/platform/get-started/key-concepts)
* [Supported platforms and technologies](/docs/platform/platform-whats-supported)

## Create a sample org or project and invite collaborators

- [Create org/project and invite collaborators including admin](/docs/platform/organizations-and-projects/create-an-organization)

## Automate onboarding of users from external sources 
You can automate the onboarding of users from external sources along with their user group memberships & role assignments. 

- [Provision users and groups with Okta (SCIM)](/docs/platform/role-based-access-control/provision-users-with-okta-scim)
- [Provision users and groups using Microsoft Entra ID (SCIM)](/docs/platform/role-based-access-control/provision-users-and-groups-using-azure-ad-scim)
- [Provision users and groups with OneLogin (SCIM)](/docs/platform/role-based-access-control/provision-users-and-groups-with-one-login-scim)
- [Just-in-time user provisioning](/docs/platform/role-based-access-control/provision-use-jit)

## Install delegate

- [Install delegate on Kubernetes or Docker](/docs/platform/get-started/tutorials/install-delegate)
- [Build and set up a delegate with a minimal image type](/docs/platform/delegates/install-delegates/build-custom-delegate-images-with-third-party-tools)
- [Install Harness Delegate on Google Kubernetes Engine (GKE) With Workload Identity](/docs/platform/delegates/install-delegates/gke-workload-identity)

## Automate setup of shared resources
Account-level resources such as secrets, delegates & connectors are shared with all organizations and projects in the account. We recommend you either use the Harness Terraform Provider or the Harness REST API for this step.

### Terraform Provider
You can achieve a high degree of automation and repeatability in deploying and managing resources on Harness by simply integrating the Harness Terraform Provider into your Harness onboarding workflows. Keep in mind to follow best practices for Terraform and CI/CD to get the best results.

#### Install the Harness Terraform Provider & Setup Terraform Configuration

Harness Terraform Registry is available here: https://registry.terraform.io/providers/harness/harness. You can use the following docs to get started.
- [Onboard with Terraform Provider](/docs/platform/get-started/tutorials/onboard-terraform-provider)
- [Harness Terraform Provider overview](/docs/platform/automation/terraform/harness-terraform-provider-overview)
- [Advanced Terraform onboarding](/docs/platform/automation/terraform/advanced-terraform-onboarding)

#### Build Automation with Terraform Provider

You should adhere to the following best practices.
- Source Control: Save your Terraform configurations in a version control system like Git. This helps in tracking changes and enables collaboration.

- Automate Plan & Apply: Implement CI/CD tools to automate the `terraform plan` and `terraform apply` steps. Popular choices include using Harness CD Pipelines to automate and onboard services. 

- State Management: Use remote state storage solutions, such as Terraform Cloud or AWS S3 with state locking, to ensure that your state is consistent across various environments or teams.

- Notifications: Implement notifications for Terraform actions. If something goes wrong during `terraform apply`, it can be beneficial to have notifications sent to Slack, Email, etc.

- Monitoring and Logging: Monitor your infrastructure with tools like Grafana or Prometheus. Logging changes and activities help in audit trails.

- Secrets Management: Use tools like HashiCorp Vault or AWS Secrets Manager to securely store sensitive information like API keys.

- Backup: Regularly back up your Terraform state files to prevent data loss.

- Documentation: Maintain a well-documented record of all Terraform scripts and modules. Documenting the design decisions and usage instructions ensures that any team member can understand and use the automation built around the Terraform provider.

#### Sample Architecture

A sample repo is available for your use here:
https://github.com/harness-community/solutions-architecture/tree/main/terraform-development-factory

### API

Use the [API quickstart](/docs/platform/automation/api/api-quickstart) to get started.

## Dive into modules

After onboarding to the Harness Platform, you're ready to start using Harness modules to supercharge your SDLC.

Explore module documentation to [get started with Harness modules](https://developer.harness.io/).

## Become a Harness Certified Expert

Explore the [Harness University](https://developer.harness.io/university) to find instructor-led training opportunities and test your skills in module certification courses.
