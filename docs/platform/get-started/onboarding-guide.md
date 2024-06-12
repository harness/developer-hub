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

## Access your Harness account

Harness offers both SaaS and on-premises editions.

<Tabs>
<TabItem value="saas" label="SaaS" default>

Harness SaaS is a fully-managed cloud version of the Harness Platform. Harness offers free, team, and enterprise plan tiers. For more information about plan options and pricing, go to [Subscriptions and licenses](./subscriptions-licenses/subscriptions.md).

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

When you have the license key and download location, install and configure a Harness SMP instance as explained in [Install Harness SMP using Helm Chart](/docs/self-managed-enterprise-edition/install/install-using-helm).

Then [create your Harness SMP Account](/docs/self-managed-enterprise-edition/get-started/onboarding-guide#create-your-harness-account). After initial account creation, you can sign in to your Harness SMP account by navigating to `http://YOUR_DOMAIN_NAME/auth/#/signin`.

</TabItem>
</Tabs>

## Review key concepts

Get familiar with terminology and functionality found in the Harness Platform and Harness modules.

* [Harness Platform key concepts](/docs/platform/get-started/key-concepts)
* [Navigation and user interface](/docs/platform/get-started/harness-ui-overview)
* [Supported platforms and technologies](/docs/platform/platform-whats-supported)

## Create projects and invite collaborators

To begin, [create a project and invite a few collaborators](/docs/platform/organizations-and-projects/create-an-organization). Harness recommends creating a sample project with a few pilot users to get familiar with the Harness Platform.

Once you're familiar with the mechanics, you can create more organizations and projects or represent your business units and product development initiatives.

## Manage users

Learn about [authentication](/docs/platform/authentication/authentication-overview) and [RBAC](/docs/platform/role-based-access-control/rbac-in-harness) to understand how to manage users in your Harness Account.

You can configure broad or highly-granular permissions structures.

You can also automate provisioning of users from external sources, along with their user group memberships and role assignments:

- [Provision users and groups with Okta (SCIM)](/docs/platform/role-based-access-control/provision-users-with-okta-scim)
- [Provision users and groups using Microsoft Entra ID (SCIM)](/docs/platform/role-based-access-control/provision-users-and-groups-using-azure-ad-scim)
- [Provision users and groups with OneLogin (SCIM)](/docs/platform/role-based-access-control/provision-users-and-groups-with-one-login-scim)
- [Just-in-time user provisioning](/docs/platform/role-based-access-control/provision-use-jit)

## Configure shared resources

Shared resources in Harness include [delegates](/docs/platform/delegates/delegate-concepts/delegate-overview), [connectors](/docs/category/connectors), [secrets](/docs/platform/secrets/secrets-management/harness-secret-manager-overview), and more. You'll use these resources with practically everything you do in Harness.

You can configure these at the account, organization, or project scope depending on how broadly you want to share them.

### Shared resources tutorials

- [Add a secret manager](/docs/platform/get-started/tutorials/add-secrets-manager.md)
- [Install delegate on Kubernetes or Docker](/docs/platform/get-started/tutorials/install-delegate)
- [Build and set up a delegate with a minimal image type](/docs/platform/delegates/install-delegates/build-custom-delegate-images-with-third-party-tools)
- [Install Harness Delegate on Google Kubernetes Engine (GKE) With Workload Identity](/docs/platform/delegates/install-delegates/gke-workload-identity)

### Automate setup of shared resources

Shared resources created at the account scope are shared with all organizations and projects in your account.

Harness recommends you use the Harness Terraform Provider or the Harness REST API to automate configuration of these shard resources.

<Tabs>
<TabItem value="terraform" label="Terraform Provider" default>

You can achieve a high degree of automation and repeatability in deploying and managing resources on Harness by integrating the Harness Terraform Provider into your Harness onboarding workflows.

Use the following documentation and [Harness Terraform Registry](https://registry.terraform.io/providers/harness/harness) to the Install the Harness Terraform Provider and set up Terraform configuration:

- [Onboard with Terraform Provider](/docs/platform/get-started/tutorials/onboard-terraform-provider)
- [Harness Terraform Provider overview](/docs/platform/automation/terraform/harness-terraform-provider-overview)
- [Advanced Terraform onboarding](/docs/platform/automation/terraform/advanced-terraform-onboarding)

A [sample Terraform deployment repo](https://github.com/harness-community/solutions-architecture/tree/main/terraform-development-factory) is available for your use.

For the best results, follow best practices for Terraform and CI/CD, such as:

- **Source control:** Save your Terraform configurations in a version control system like Git. This helps in tracking changes and enables collaboration.
- **Automate plan and apply:** Implement CI/CD tools to automate the `terraform plan` and `terraform apply` steps. Popular choices include using Harness CD Pipelines to automate and onboard services. 
- **State management:** Use remote state storage solutions, such as Terraform Cloud or AWS S3 with state locking, to ensure that your state is consistent across various environments or teams.
- **Notifications:** Implement notifications for Terraform actions. If something goes wrong during `terraform apply`, it can be beneficial to have notifications sent to Slack, Email, etc.
- Monitoring and Logging: Monitor your infrastructure with tools like Grafana or Prometheus. Logging changes and activities help in audit trails.
- **Secrets management:** Use tools like HashiCorp Vault or AWS Secrets Manager to securely store sensitive information like API keys.
- **Backup:** Regularly back up your Terraform state files to prevent data loss.
- **Documentation:** Maintain a well-documented record of all Terraform scripts and modules. Documenting the design decisions and usage instructions ensures that any team member can understand and use the automation built around the Terraform provider.

</TabItem>
<TabItem value="api" label="Harness API">

Go to [Get started with Harness API](/docs/platform/automation/api/api-quickstart).

</TabItem>
</Tabs>

## Dive into modules

After onboarding to the Harness Platform, you're ready to start using Harness modules to supercharge your SDLC.

Explore module documentation to [get started with Harness modules](https://developer.harness.io/) and start building CI/CD [pipelines](/docs/category/pipelines).

The Harness Platform has several cross-module features that can optimize and enhance your pipelines and module usage, including:

* [Harness AIDA](/docs/platform/harness-aida/aida-overview)
* [Variables, expressions, and runtime input](/docs/platform/variables-and-expressions/runtime-inputs)
* [Templates](/docs/platform/templates/template)
* [Triggers](/docs/platform/triggers/triggers-overview)
* [Notifications](/docs/platform/notifications/notification-settings)
* [Approvals](/docs/platform/approvals/approvals-tutorial)
* [Governance](/docs/category/governance-1) and [monitored services](/docs/platform/monitored-service)
* [Dashboards](/docs/platform/dashboards/dashboards-overview)
* [Global default settings](/docs/platform/settings/default-settings)

## Become a Harness Certified Expert

Explore the [Harness University](https://developer.harness.io/university) to find instructor-led training opportunities and test your skills in module certification courses.
