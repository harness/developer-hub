---
title: Getting started with Harness Platform
description: A self-service onboarding guide for Harness Platform
sidebar_label: Get Started
sidebar_position: 2
slug: /platform/get-started
redirect_from:
  - /docs/platform/organizations-and-projects/create-an-organization
  - /docs/platform/get-started/onboarding-guide
  - /docs/platform/get-started/tutorials
  - /docs/get-started/tutorials
  - /docs/getting-started/start-for-free
  - /docs/get-started/start-for-free
  - /docs/platform/organizations-and-projects/create-an-organization
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Use this guide to set up Harness Platform so your teams can start using any Harness module.

## What will you learn in this topic?

- How to [access a Harness account](#step-1-access-your-harness-account).
- How to [create organization](#create-an-organization), [projects](#create-a-project) and [invite collaborators](#invite-collaborators).
- How to [manage users](#step-3-manage-users) and [shared resources](#step-4-manage-shared-resources).
- How to become a [Harness certified expert](#become-a-harness-certified-expert).

---

## Before you begin
- <a href="/docs/platform/get-started/overview" target="_blank">Harness Platform overview</a>
- <a href="/docs/platform/get-started/harness-ui-overview" target="_blank">Harness UI overview</a>

---

## Set up the Harness Platform

Follow the steps below to understand the platform and complete the initial setup so you can start using other Harness modules.

### Step 1: Access your Harness account

[Sign up for a free account](https://app.harness.io/auth/#/signup/&?utm_source=website&utm_medium=harness-developer-hub&utm_campaign=plt-plg&utm_content=get-started) or sign in to your existing Harness account to get started.

If you have signed up for a free account, go to <a href="/docs/platform/account-license-limits/" target="_blank"> Account license limits </a> to know the limitations on actions that you can perform.

After you log in to your account, select a module and you are redirected to the platform user interface.

---

### Step 2: Create organization, project, and invite collaborators

Once you have created an account, you can begin creating organizations and projects. If you are part of a team account, contact your administrator to get the necessary permissions to create organizations and projects.

:::important
- With a free account, a default organization and project are already created for you. 
- You **cannot** create another new organization. However, you can create multiple projects within the default organization, and invite collaborators into the default organization.
:::

#### Create an organization

1. In Harness, select **Account Settings** to switch to account scope.
 
 The **Organizations** tab appears on top of **Account Settings**. Click **Organizations**. 

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/acc-settings.png')} width="80%" height="60%" title="Click to view full size image" /> </div>

**(OR)** 


1. Click the **Account**, select **Organizations**, click **View All Orgs**, and click **Organizations**.

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/acc-2.png')} width="80%" height="60%" title="Click to view full size image" /> </div>


2. Click **+New Organization**. 

    The new organization settings appear.

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/acc-3.png')} width="80%" height="60%" title="Click to view full size image" /> </div>

3. In **Name**, enter a name for your organization. Enter **Description**, and <a href="/docs/platform/references/tags-reference" target="_blank">tags</a> for your new org. Click **Save and Continue**.

    The organization is created and you can now invite collaborators.

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/create-an-organization-01.png')} width="80%" height="60%" title="Click to view full size image" /> </div>


#### Invite collaborators

You do not have to add the same members to an org and its projects. You can add org-level members, and then add project-level members later when you set up or edit a project.

The org and any projects added to the org are used by their members only.

1. Click **Organizations**, and then select the three-dot menu (**⋮**) of the org you want to invite people to.

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/invite-collab.png')} width="80%" height="60%" title="Click to view full size image" /> </div>

2. Select **Invite People to Collaborate**, type a member's name and select it.
3. In **Role**, select the role the member will have in this org, such as Organization Admin or Organization Member.

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/create-an-organization-02.png')} width="80%" height="60%" title="Click to view full size image" /> </div>

4. Click **Add**.
   
   Members receive invites via their email addresses.

   You can invite more members from within the org later.

5. Click **Finish**. 

    The org is added to the list under **Organizations**.

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/projects-and-organizations-05.png')} width="80%" height="60%" title="Click to view full size image" /> </div>


#### Create a project

You can create projects from the **Projects** section or from within the organization. You will set up user permissions in the next step.

The following steps show you how to create a project from the **Projects** section.

1. In Harness, go to **Home** and click **Projects**.
2. Click **+Project**.
3. Name the project, and select a color. Harness automatically generates the project ID. See <a href="/docs/platform/references/harness-entity-reference" target="_blank">Harness Entity Reference</a>.
4. In **Organization**, select the org you created.
5. Add a description and tags, and then click **Save and Continue** to create the project.

To invite collaborators, follow the steps from [Invite Collaborators](#invite-collaborators).

The project you created will be listed under **Projects**.

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/projects-and-organizations-06.png')} width="80%" height="60%" title="Click to view full size image" /> </div>

You can create additional organizations and projects to represent your business units and product development initiatives.

:::tip 
- Harness recommends creating a sample project with a few pilot users to get familiar with the Platform.
- Once your initial setup is ready, choose a module from the left navigation bar.

:::

---

### Step 3: Manage users

To control user access at a granular level, configure <a href="/docs/platform/authentication/authentication-overview" target="_blank">authentication</a> and <a href="/docs/platform/role-based-access-control/rbac-in-harness" target="_blank">role-based access control (RBAC)</a> for your Harness account. 

You can also automate user provisioning from external sources, including user group memberships and role assignments. The following methods are supported:

  - <a href="/docs/platform/role-based-access-control/provision-users-with-okta-scim" target="_blank">Okta</a>
  - <a href="/docs/platform/role-based-access-control/provision-users-and-groups-using-azure-ad-scim" target="_blank">Microsoft Entra ID</a>
  - <a href="/docs/platform/role-based-access-control/provision-users-and-groups-with-one-login-scim" target="_blank">OneLogin</a>
  - <a href="/docs/platform/role-based-access-control/provision-use-jit" target="_blank">Just-in-time user provisioning</a>

To add users manually, go to <a href="/docs/platform/role-based-access-control/add-users/#add-users-manually" target="_blank">add users manually</a>.

---

### Step 4: Manage shared resources

Shared resources are the connections between Harness and your infrastructure. Most modules require at least one delegate and a connector to function.

- **Delegate**: A lightweight worker you install in your environment (Kubernetes, Docker, virtual machine (VM)). It executes tasks on behalf of Harness using outbound-only HTTPS. You do not need one immediately, but you will need one when running pipelines. For more information, go to <a href="/docs/platform/delegates/delegate-concepts/delegate-overview" target="_blank">Delegates</a>.

- **Connector**: Stores credentials and connection information for third-party tools like GitHub, AWS, GCP, and DockerHub. For more information, go to <a href="/docs/category/connectors" target="_blank">connectors</a>.

- **Secret**: An encrypted storage for sensitive values like API keys and passwords. Harness has a built-in secret manager and integrates with Vault, AWS Secrets Manager, and others. For more information, go to <a href="/docs/platform/secrets/secrets-management/harness-secret-manager-overview" target="_blank">secrets</a>.

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
- <a href="/docs/category/authentication" target="_blank">Authentication in Harness Platform</a>
- <a href="/docs/category/platform-access-control" target="_blank">Platform access control</a>
- <a href="/docs/platform/platform-whats-supported" target="_blank">Supported platforms and technologies</a>
- <a href="/docs/platform/automation/terraform/harness-terraform-provider-overview" target="_blank">Automate configuring shared resources using Terraform</a>
- <a href="/docs/platform/automation/api/api-quickstart" target="_blank">Automate configuring shared resources using REST API</a>