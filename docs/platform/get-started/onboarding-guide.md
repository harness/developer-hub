---
title: Getting started with Harness Platform
description: A self-service onboarding guide for Harness Platform
sidebar_label: Get Started
sidebar_position: 2
slug: /platform/get-started
redirect_from:
  - /docs/platform/get-started/onboarding-guide
  - /docs/platform/get-started/tutorials
  - /docs/get-started/tutorials
  - /docs/getting-started/start-for-free
  - /docs/get-started/start-for-free
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## What will you learn in this topic?

- How to [access a Harness account](#step-1-access-your-harness-account)?
- How to [create organization](#create-an-organization), [projects](#create-a-project) and [invite collaborators](#invite-collaborators)?
- How to [manage users](#step-3-manage-users) and [shared resources](#step-4-manage-shared-resources)?
- How to become a [Harness certified expert](#become-a-harness-certified-expert)?

---

## Before you begin
- [Harness Platform overview](/docs/platform/get-started/overview)
- [Harness UI overview](/docs/platform/get-started/harness-ui-overview)

---

## Setup Harness Platform

Follow the steps below to understand the platform and complete the initial setup so you can start using other Harness modules.

### Step 1: Access your Harness account

[Sign up for a free account](https://app.harness.io/auth/#/signup/&?utm_source=website&utm_medium=harness-developer-hub&utm_campaign=plt-plg&utm_content=get-started) or sign in to your existing Harness account to get started.

Harness provides a free tier of the Platform to help you get started with software delivery.

Harness is offered as **SaaS** and **Self-Managed** (on-premises) editions. These offerings are described below.

| | **SaaS** | **Self-Managed Enterprise Edition (SMP)** |
|---|---|---|
| **What it is** | Fully managed, cloud-hosted version of Harness. No infrastructure setup required. | Kubernetes-native deployment that runs on your own public or private cloud infrastructure. See [SMP overview](/docs/self-managed-enterprise-edition/smp-overview). |
| **Plans / licensing** | Free, Team, and Enterprise. See [Subscriptions and licenses](/docs/platform/subscriptions-licenses/subscriptions). | Requires a valid SMP license key and access to download the Harness SMP software. |
| **Get access** | [Sign up with the Free plan](https://app.harness.io/auth/#/signup/?module=cd&utm_medium=harness-developer-hub), then [sign in](https://app.harness.io/auth/#/signin). Team/Enterprise accounts are created by invitation from an Account Administrator. | Contact [Harness Support](mailto:support@harness.io) to obtain your license key and software download access. |
| **Setup** | None — Harness manages the infrastructure. | Follow the [installation instructions](/docs/category/install), then sign in at `http://YOUR_DOMAIN_NAME/auth/#/signin`. |

---

### Step 2: Create organization, project and invite collaborators

Once you have created an account, contact your administrator to get permissions to create organizations and projects.

#### Create an organization

1. In Harness, select **Account Settings** to switch to account scope; the **Organizations** tab appears on top of **Account Settings**. Click **Organizations**. 

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/acc-settings.png')} width="80%" height="60%" title="Click to view full size image" /> </div>

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/select-org.png')} width="80%" height="60%" title="Click to view full size image" /> </div>


**(OR)** 


1. Click the **Account**, select **Organizations**, click **View All Orgs**, and click **Organizations**

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/acc-2.png')} width="80%" height="60%" title="Click to view full size image" /> </div>


2. Click **+New Organization**. The new organization settings appear.

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/acc-3.png')} width="80%" height="60%" title="Click to view full size image" /> </div>


<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/create-an-organization-01.png')} width="80%" height="60%" title="Click to view full size image" /> </div>
   
3. In **Name**, enter a name for your organization.
4. Enter **Description**, and [Tags](../references/tags-reference.md) for your new org.
5. Click **Save and Continue**.


#### Invite collaborators

The org and any projects added to it are used by their members only.

You don't have to add the same members to an org and its projects. You can add org-level members, and then add project-level members later when you set up or edit a project.

1. Click **Organizations**, and then select the three-dot menu (**⋮**) of the org you want to invite people to.

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/invite-collab.png')} width="80%" height="60%" title="Click to view full size image" /> </div>

2. Select **Invite People to Collaborate**, type a member's name and select it.
2. In **Role**, select the role the member will have in this org, such as Organization Admin or Organization Member.

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/create-an-organization-02.png')} width="80%" height="60%" title="Click to view full size image" /> </div>

3. Click **Add**.
   
   Members receive invites via their email addresses.

   You can invite more members from within the Org later.

4. Click **Finish**. The Org is added to the list in Account Settings Organizations.

#### Create a project

You can create Projects in the Org from the projects section of Harness, or from within the org. You'll set up user permissions in the next step.

In this example, you will create projects in **Projects**.

1. In Harness, go to **Home** and click **Projects**.
2. Click **+Project**.
3. Name the project, and select a color. The Id of the project is generated automatically. See [Harness Entity Reference](../references/harness-entity-reference.md).
4. In **Organization**, select the org you created.
5. Add a description and tags, and then click **Save and Continue**.
6. In **Invite Collaborators**, type a member's name and select it.
7. Select a role for the member, and click **Add**.
8. Click **Save and Continue** to create the project.


You can create additional organizations and projects to represent your business units and product development initiatives.

:::tip 
- Harness recommends creating a sample project with a few pilot users to get familiar with the Platform.
- Once your initial setup is ready, choose a module from the left navigation bar.

:::

---

### Step 3: Manage users

To facilitate fine-grained permissions, configure [authentication](/docs/platform/authentication/authentication-overview) and [role-based access control (RBAC)](/docs/platform/role-based-access-control/rbac-in-harness) for your Harness account. 

You can also automate user provisioning from external sources, including user group memberships and role assignments. The following methods are supported:

  - [Okta](/docs/platform/role-based-access-control/provision-users-with-okta-scim)
  - [Microsoft Entra ID](/docs/platform/role-based-access-control/provision-users-and-groups-using-azure-ad-scim)
  - [OneLogin](/docs/platform/role-based-access-control/provision-users-and-groups-with-one-login-scim)
  - [Just-in-time user provisioning](/docs/platform/role-based-access-control/provision-use-jit)

To add users manually, go to [add users manually](/docs/platform/role-based-access-control/add-users/#add-users-manually).

---

### Step 4: Manage shared resources

Shared resources are the connective layers between Harness and your infrastructure. Most modules require at least one delegate and a connector to function.

- **Delegate**: A lightweight worker you install in your environment (Kubernetes, Docker, VM) that executes tasks on behalf of Harness using outbound-only HTTPS. You don't need one immediately, but you'll need one when running pipelines. For more information, go to [Delegates](/docs/platform/delegates/delegate-concepts/delegate-overview).

- **Connector**: Stores credentials and connection information for third-party tools like GitHub, AWS, GCP, and DockerHub. For more information, go to [connectors](/docs/category/connectors).

- **Secret**: An encrypted storage for sensitive values like API keys and passwords. Harness has a built-in secret manager and integrates with Vault, AWS Secrets Manager, and others. For more information, go to [secrets](/docs/platform/secrets/secrets-management/harness-secret-manager-overview).

As an administrator, you can configure shared resources at the account, organization, or project scope, depending on how you want to facilitate their availability.

:::tip
- For teams managing Harness at scale, you can automate the configuration of shared resources using the Harness Terraform Provider or REST API.
- Shared resources created at the account scope are available to all organizations and projects in your account.
:::

---

## Explore Harness modules

Once the platform is set up, you can start using Harness modules to automate your software delivery lifecycle. Each module is built for a specific part of the software delivery lifecycle (SDLC) and can be used independently or together.

| If you want to | Start with |
|---|---|
| Build and test code automatically | [Continuous Integration (CI)](/docs/continuous-integration) |
| Deploy services to any environment | [Continuous Delivery & GitOps (CD)](/docs/continuous-delivery) |
| Manage cloud infrastructure costs | [Cloud Cost Management (CCM)](/docs/cloud-cost-management) |
| Safely roll out features with flags | [Feature Flags (FF)](/docs/feature-flags) |
| Find and fix security vulnerabilities | [Security Testing Orchestration (STO)](/docs/security-testing-orchestration) |
| Run chaos experiments on your systems | [Chaos Engineering (CE)](/docs/chaos-engineering) |
| Track engineering metrics and DORA | [Software Engineering Insights (SEI)](/docs/software-engineering-insights) |

---

## Become a Harness Certified Expert

<UniversityAdmonition title="Harness self-paced training">
  For an interactive onboarding experience with additional use cases and features, check out [Harness University](https://developer.harness.io/university).
</UniversityAdmonition>

---

## Next steps
- [Authentication in Harness Platform](/docs/category/authentication)
- [Platform Access Control](/docs/category/platform-access-control)
- [Supported platform and technologies](/docs/platform/platform-whats-supported)
- [Automate configuring shared resources using Terraform](/docs/platform/automation/terraform/harness-terraform-provider-overview)
- [Automate configuring shared resources using REST API](/docs/platform/automation/api/api-quickstart)