---
title: Getting started with Harness Platform
description: A self-service onboarding guide for Harness Platform
sidebar_label: Get Started
sidebar_position: 2
redirect_from:
  - /docs/platform/get-started/tutorials
  - /docs/get-started/tutorials
  - /docs/getting-started/start-for-free
  - /docs/get-started/start-for-free
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The Harness Platform helps developers and DevOps teams deliver software faster, more securely, and at lower cost—without compromising quality, reliability, or governance.

This guide helps you get started with the Harness Platform.

## Table of Content

1. [Access your Harness account](#step-1-access-your-harness-account)
2. [Key Concept](#step-2-key-concepts)
3. [Create organization and project](#step-3-create-organization-project-and-invite-collaborators)
4. [Manage users](#step-4-manage-users)
5. [Manage shared resources](#step-5-manage-shared-resources)
---

### Step 1: Access your Harness account

:::tip
Harness provides a free tier of the Platform to help you get started with software delivery.

[**Sign up now for free!**](https://app.harness.io/auth/#/signup/&?utm_source=website&utm_medium=harness-developer-hub&utm_campaign=plt-plg&utm_content=get-started)
:::

Harness is available in both SaaS and Self-Managed (on-premises) editions.

<Tabs>
<TabItem value="saas" label="SaaS" default>

Harness SaaS is a fully managed, cloud-hosted version of the Harness Platform. Harness offers Free, Team, and Enterprise plans. For details about plan features and pricing, see [Subscriptions and licenses](/docs/platform/subscriptions-licenses/subscriptions.md).

[Sign up with the Free plan](https://app.harness.io/auth/#/signup/?module=cd&utm_medium=harness-developer-hub) and then [sign in to your Harness account](https://app.harness.io/auth/#/signin).

New Accounts on the Team or Enterprise plans are created through an invitation from an Account Administrator. You must accept the invitation email before you can [sign in](https://app.harness.io/auth/#/signin). If you are unsure who your Account Administrator is or need assistance, contact [Harness Support](mailto:support@harness.io).

</TabItem>
<TabItem value="smp" label="Self-Managed Enterprise Edition">

Harness Self-Managed Enterprise Edition also known as Self-Managed Platform (SMP) is a Kubernetes-native, self-managed deployment of the Harness Platform that runs on your own public or private cloud infrastructure. For an overview, see
[Harness Self-Managed Enterprise Edition](/docs/self-managed-enterprise-edition/smp-overview).

This option requires:
  - A valid Harness SMP license key.
  - Access to download the Harness SMP software (container images and Helm chart).

Contact [Harness Support](mailto:support@harness.io) to obtain access to your license key.

Once you have the license key and download access, install and configure Harness SMP by following the [instructions](/docs/category/install). After installation, create your Harness SMP account and sign in to your instance at `http://YOUR_DOMAIN_NAME/auth/#/signin`.

</TabItem>
</Tabs>

---
### Step 2: Key concepts

Before you begin, get familiar with the terminology and functionality commonly used across the Harness Platform and its modules.

  * [Platform key concepts](/docs/platform/get-started/key-concepts)
  * [Overview](/docs/platform/get-started/harness-ui-overview)
  * [Supported platforms and technologies](/docs/platform/platform-whats-supported)

---
### Step 3: Create organization, project and invite collaborators

:::tip 
---
Harness recommends creating a sample project with a few pilot users to get familiar with the Harness Platform.
:::

To get started, follow the steps below:
  - [Create an organization](/docs/platform/organizations-and-projects/create-an-organization). 
  - [Create a project](/docs/platform/organizations-and-projects/create-an-organization/#create-a-project)
  - [Invite collaborators](/docs/platform/organizations-and-projects/create-an-organization/#invite-collaborators)

Once you are familiar with the platform, you can create additional organizations and projects to represent your business units and product development initiatives.

---
### Step 4: Manage users

To enable broad or fine-grained permissions, configure [authentication](/docs/platform/authentication/authentication-overview) and [role-based access control (RBAC)](/docs/platform/role-based-access-control/rbac-in-harness) for your Harness account. 

You can also automate user provisioning from external sources, including user group memberships and role assignments. The following methods are supported:

  - [Okta](/docs/platform/role-based-access-control/provision-users-with-okta-scim)
  - [Microsoft Entra ID](/docs/platform/role-based-access-control/provision-users-and-groups-using-azure-ad-scim)
  - [OneLogin](/docs/platform/role-based-access-control/provision-users-and-groups-with-one-login-scim)
  - [Just-in-time user provisioning](/docs/platform/role-based-access-control/provision-use-jit)

---
### Step 5: Manage shared resources

Harness provides shared resources such as [delegates](/docs/platform/delegates/delegate-concepts/delegate-overview), [connectors](/docs/category/connectors), and [secrets](/docs/platform/secrets/secrets-management/harness-secret-manager-overview). These resources are used across most Harness Platform operations.

You can configure shared resources at the account, organization, or project scope, depending on how broadly you want them to be available. For more information, see the documentation below.
  - [Add a secret manager](/docs/platform/get-started/tutorials/add-secrets-manager.md)
  - [Install delegate on Kubernetes or Docker](/docs/platform/get-started/tutorials/install-delegate)
  - [Build and set up a delegate with a minimal image type](/docs/platform/delegates/install-delegates/build-custom-delegate-images-with-third-party-tools)
  - [Install Harness Delegate on Google Kubernetes Engine (GKE) With Workload Identity](/docs/platform/delegates/install-delegates/gke-workload-identity)

#### Automate setup of shared resources

Shared resources created at the account scope are available to all organizations and projects in your account. Harness recommends using the Harness Terraform Provider or the Harness REST API to automate the configuration of these shared resources.

<Tabs>
<TabItem value="terraform" label="Terraform Provider" default>

You can achieve a high degree of automation and repeatability when deploying and managing resources in Harness by integrating the Harness Terraform Provider into your onboarding processes.

Use the following documentation and the [Harness Terraform Registry](https://registry.terraform.io/providers/harness/harness) to install the Harness Terraform Provider and configure Terraform:
  - [Overview](/docs/platform/automation/terraform/harness-terraform-provider-overview)
  - [Onboarding](/docs/platform/get-started/tutorials/onboard-terraform-provider)
  - [Advanced Onboarding](/docs/platform/automation/terraform/advanced-terraform-onboarding)


Harness provides a [sample Terraform deployment repository](https://github.com/harness-community/solutions-architecture/tree/main/terraform-development-factory) for reference and reuse.

For best results, follow Terraform and CI/CD best practices, including:
  * **Source control:** Store Terraform configurations in a version control system such as Git to track changes and support collaboration.
  * **Automated plan and apply:** Use CI/CD pipelines to automate `terraform plan` and `terraform apply`. For example, you can use Harness CD pipelines to automate onboarding and service configuration.
  * **State management:** Use a remote backend, such as Terraform Cloud or AWS S3 with state locking, to maintain consistent state across teams and environments.
  * **Notifications:** Configure notifications for Terraform actions so failures during `terraform apply` are reported through channels such as Slack or email.
  * **Monitoring and logging:** Monitor infrastructure using tools like Grafana or Prometheus, and log changes and activities to support auditing and troubleshooting.
  * **Secrets management:** Secure sensitive data, such as API keys, using a secrets manager like HashiCorp Vault or AWS Secrets Manager.
  * **Backups:** Regularly back up Terraform state files to protect against data loss.
  * **Documentation:** Maintain clear documentation for Terraform configurations and modules, including design decisions and usage instructions, to ensure maintainability and team alignment.

</TabItem>
<TabItem value="api" label="Harness REST API">


The Harness REST API provides programmatic access to Harness resources, allowing you to automate configuration, and manage the platform at scale.

For more information, go to [Get started with Harness API](/docs/platform/automation/api/api-quickstart).

</TabItem>
</Tabs>

---
## Explore Harness modules

After completing onboarding to the Harness Platform, you can begin using Harness modules to implement and automate your software delivery lifecycle (SDLC). Refer to the module documentation to [get started with Harness modules](https://developer.harness.io/) and create CI/CD [pipelines](/docs/category/pipelines) tailored to your delivery workflows..

In addition, the Harness Platform provides several cross-module capabilities that help standardize configuration, improve governance, and optimize pipeline execution across modules, including:

  * [Approvals](/docs/platform/approvals/approvals-tutorial)
  * [Dashboards](/docs/platform/dashboards/dashboards-overview)
  * [Global default settings](/docs/platform/settings/default-settings)
  * [Governance](/docs/category/governance-1) and [monitored services](/docs/platform/monitored-service)
  * [Harness AIDA](/docs/platform/harness-aida/aida-overview)
  * [Notifications](/docs/platform/notifications/notification-settings)
  * [Templates](/docs/platform/templates/template)
  * [Triggers](/docs/platform/triggers/triggers-overview)
  * [Variables, expressions, and runtime input](/docs/platform/variables-and-expressions/runtime-inputs)

## Become a Harness Certified Expert

<UniversityAdmonition title="Harness self-paced training">
  For an interactive onboarding experience with additional use cases and features, check out [Harness University](https://developer.harness.io/university).
</UniversityAdmonition>