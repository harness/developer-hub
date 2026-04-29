---
title: Overview
description: Learn key concepts and overview of the Harness Platform including accounts, organizations, projects, delegates, connectors, pipelines, and RBAC.
helpdocs_topic_id: hv2758ro4e
helpdocs_category_id: kx4hs8bn38
helpdocs_is_private: false
helpdocs_is_published: true
slug: /platform/get-started/overview
redirect_from:
  - /docs/platform/get-started/key-concepts
  - /docs/platform/get-started/platform-overview
  - /docs/getting-started/key-concepts
  - /docs/get-started/key-concepts
  - /docs/getting-started/harness-platform-architecture
  - /docs/get-started/harness-platform-architecture
  - /docs/getting-started/learn-harness-key-concepts
  - /docs/platform/key-concepts
  - /docs/get-started/beta-preview-ga
  - /docs/get-started/release-status
  - /docs/platform/organizations-and-projects/projects-and-organizations
canonical_url: https://www.harness.io/blog/general-availability-harness-developer-hub-hdh
---

import Link from '@docusaurus/Link';

## Harness Platform overview

The Harness Platform is the foundation that everything else in Harness is built on. Think of it as the common layer that handles all the shared capabilities your teams need- user management, access control, secrets, connectors, auditing, and notifications. You define these capabilities once and reuse them everywhere.

On top of this foundation sit the Harness modules, such as Continuous Integration, Continuous Delivery and GitOps, Feature Flags, and more. Because these modules run on the platform, they automatically inherit all platform capabilities.

<DocImage
  path={require('./static/harness-platform-overview.png')}
  alt="Harness Platform overview diagram"
  title="Click to view full size image"
  width={800}
  height={450}
/>

For example, when you set up authentication, permissions, or notifications at the platform level, those settings apply consistently across all modules you use.

Harness Platform is also referred to as **Harness Manager**. It is the web UI where you sign in, create projects, set up pipelines, and manage your configurations.

---

## What will you learn in this topic? 

By the end of this topic, you will be able to understand:

- How Harness Platform structures your work using the [Account](#account) → [Organization → Project](#organizations-and-projects) hierarchy.
- How [RBAC](#role-based-access-control-rbac) uses roles, resource groups, and principals to control who can do what, and where.
- What [Delegates](#delegates) and [Connectors](#connectors) are.
- How Harness stores and references sensitive data securely using [secrets management](#secrets-management).

---

## Before you begin

- **Know basic DevOps concepts:** What CI/CD means, what a pipeline is in general terms, and why access control matters in engineering teams.
- **What an identity provider (IdP) is (optional):** Helps understand the <a href="/docs/platform/authentication/authentication-overview" target="_blank" >authentication and RBAC sections</a>.
- **Git basics (optional):** The <a href="/docs/platform/get-started/key-concepts#git-experience" target="_blank" >Git Experience</a> section assumes familiarity with repos and YAML.

:::tip New to DevOps?
Do not worry if you do not recognize a term. Check the <a href="/glossary" target="_blank" > Harness Glossary </a> as you read.
:::

---

## Account

A Harness account is the highest level for everything you do in Harness. It is where you define your organizational structure, manage global settings, and control access across all users and projects. Within an account, you create **organizations and projects**. This hierarchy helps teams work independently while still following shared security, governance, and access rules set at the account level.

You can create resources such as **connectors** at different levels, such as **account, organization, or project**. Resources you define at a higher level are automatically available at lower levels, which reduces duplication and keeps configuration consistent.

To set up your account and get started, see the <a href="/docs/platform/get-started/onboarding-guide" target="_blank" >Platform onboarding guide</a>. 


<DocImage
  path={require('./static/account-overview.png')}
  alt="Account Overview"
  title="Click to view full size image"
  width={800}
  height={450}
/>

---

## Organizations and projects

Within a Harness account, you organize your work using organizations and projects. This structure helps teams collaborate effectively while keeping ownership, access, and configuration clearly defined.

### Organizations

A Harness organization (or *org*) groups together projects that share a common purpose or business goal. Organizations are often used to represent higher-level groupings in a company, such as:

  * Business units
  * Product lines
  * Departments


Each organization can contain multiple projects and provides a natural boundary for managing teams, access, and shared resources.


### Projects

A Harness project is where teams do their day-to-day work. Projects contain the users, pipelines, and the resources needed to build, deploy, test, and operate applications. 

For example, a project might have a Harness CI pipeline to build code and push an image to a repo and a Harness CD pipeline to pull and deploy that image to a cloud platform.

Projects typically represent:

  * Application or service teams
  * Platform or infrastructure teams
  * Individual workloads within an organization

Projects give teams a shared workspace while allowing them to operate independently. You can add an unlimited number of Harness projects to an org. All projects in the org can use the org's resources.

Much like account-level roles, project members can be assigned Project Admin, Member, and Viewer roles.

---

## Harness SaaS versus SMP offerings

Harness is offered as **Software as a Service (SaaS)** and **Self-Managed** (on-premises) editions. **This documentation covers the SaaS edition.** If you are using the Self-Managed Enterprise Edition (SMP), see the <a href="/docs/self-managed-enterprise-edition" target="_blank" >SMP documentation</a>.


| | **SaaS** | **Self-Managed Enterprise Edition (SMP)** |
|---|---|---|
| **What it is** | Fully managed, cloud-hosted version of Harness. No infrastructure setup required. | Kubernetes-native deployment that runs on your own public or private cloud infrastructure. See [SMP overview](/docs/self-managed-enterprise-edition/smp-overview). |
| **Plans/licensing** | Free, Team, and Enterprise. See [Subscriptions and licenses](/docs/platform/subscriptions-licenses/subscriptions). | Requires a valid SMP license key and access to download the Harness SMP software. |
| **Get access** | [Sign up with the Free plan](https://app.harness.io/auth/#/signup/?module=cd&utm_medium=harness-developer-hub), then [sign in](https://app.harness.io/auth/#/signin). Team/Enterprise accounts are created by invitation from an Account Administrator. | Contact [Harness Support](mailto:support@harness.io) to obtain your license key and software download access. |
| **Setup** | None. Harness manages the infrastructure. | Follow the [installation instructions](/docs/category/install), then sign in at `http://YOUR_DOMAIN_NAME/auth/#/signin`. |


---

## Role-based access control (RBAC)

Role-based access control (RBAC) describes **who** is allowed to perform **what** actions and **where**.

With RBAC, you can delegate administrative responsibility at the organization and project levels instead of managing everything at the account level. 

For example, assigning the **Project Admin** role makes a user responsible for managing access, resources, and settings within a specific project.

Once ownership is delegated:
* Organization and project admins can invite and manage users.
* Teams can independently manage pipelines, modules, and platform resources.
* Changes made in one project or organization do not affect others.

This approach reduces dependency on account administrators and allows teams to move faster while maintaining strong governance and security boundaries.

### How RBAC works in Harness

Harness RBAC has three core components:

* **Principals**: The people or systems that need access; users, user groups, or service accounts.
* **Roles**: What actions they can take; for example, create pipelines or view secrets.
* **Resource groups**: Where they can do it; for example, only within a specific project.

You grant access by combining a **role** and a **resource group** and assigning them to a **principal**.

Harness RBAC applies across all scopes, from the account level to individual resources such as projects, pipelines, and services.

For detailed setup, see the <a href="/docs/platform/role-based-access-control/rbac-in-harness" target="_blank" >Harness RBAC documentation</a>.

### User and group management

A Harness user is anyone with an account, identified by their email address. You can add users manually or set up automatic provisioning using System for Cross-domain Identity Management (SCIM), which is a standard protocol for automating user provisioning. Some tools are:
- Okta SCIM
- Microsoft Entra ID SCIM
- OneLogin SCIM
- Just-In-Time (JIT) provisioning with Security Assertion Markup Language (SAML).

Harness supports multiple <a href="/docs/platform/authentication/authentication-overview" target="_blank" >authentication methods</a>, allowing you to choose what best fits your organization’s security and compliance requirements:

* Username and password
* Public OAuth providers, including Google, GitHub, GitLab, LinkedIn, Azure, and Bitbucket
* Enterprise Single Sign-On (SSO) providers (Security Assertion Markup Language (SAML) providers such as Microsoft Entra ID, Okta, OneLogin) 
* Lightweight Directory Access Protocol (LDAP)

### User groups

Instead of setting permissions for each person individually, you can create <a href="/docs/platform/role-based-access-control/add-user-groups" target="_blank" >user groups</a> and assign <a href="/docs/platform/role-based-access-control/add-manage-roles" target="_blank" >roles</a> and <a href="/docs/platform/role-based-access-control/add-resource-groups" target="_blank" >resource groups</a> to a user group. Everyone in the group automatically gets those permissions.

User groups also control notifications, so you can send alerts to a group via email, Slack, Microsoft Teams, or PagerDuty.

This approach helps you manage access and notifications consistently while reducing administrative overhead.

### Service accounts

Service accounts are like user accounts but for scripts and automated workflows. They are non-human identities. For example, a CI/CD pipeline might use a service account to deploy code without needing someone's personal login.

You give service accounts the same roles and resource groups as regular users to control what they can access.
  * Assign **roles** to define what actions the service account can perform
  * Assign **resource groups** to define where those actions can be performed

This allows you to apply the same RBAC controls and governance policies to automation as you do to human users. Using service accounts helps improve security and maintainability by avoiding reliance on personal user credentials for automation.

### API keys and tokens

API keys and tokens let external tools authenticate with Harness without a browser login. These keys and tokens can only perform actions that the associated user or service account has permission to perform.

- **API key for a service account**: Use this for automation and integrations. The key inherits all permissions granted to that service account.
- **Personal access token (PAT) for a user**: Use this for your own local development or testing. The token inherits your user permissions.

---

## Governance using policy as code

Harness lets you enforce governance and compliance using policy as code, powered by Open Policy Agent (OPA).

Policies act as guardrails that automatically evaluate configurations and actions across the platform. You can use them to ensure teams follow standards. 

For example, if you want to make sure nobody accidentally deploys to production, you can write a rule (a "policy") that Harness checks automatically before every deployment. If the rule fails, the deployment is blocked.

You can start quickly by using built-in sample policies or create custom policies tailored to your organization’s needs. Learn more in the <a href="/docs/platform/governance/policy-as-code/harness-governance-overview" target="_blank" >Harness governance overview</a>.

---

## Secrets management

Harness includes built-in support for secrets management to securely store and manage sensitive data such as API keys, passwords, and tokens.

Harness encrypts your secrets so you can reference them safely across your account without exposing their values. In addition to the built-in secret manager, Harness integrates with popular external secret managers, allowing you to continue using existing security tools and workflows.

For details, see the <a href="/docs/platform/secrets/secrets-management/harness-secret-manager-overview" target="_blank" >Harness secrets management overview</a>.

---

## Delegates

Harness Delegates are lightweight workers that you install in your environment, such as a Kubernetes cluster or virtual machine, to securely execute tasks on behalf of the Harness Platform.

Delegates connect to Harness Manager using **outbound-only HTTP/HTTPS**, so you don’t need any inbound network access. When you run a pipeline, Harness Manager tells the Delegate what to do, and the Delegate performs the actual operations — such as deploying to a cluster or pulling an artifact — within your network.

Delegates are essential for enabling Harness to perform actions in your infrastructure, but you don’t need to install one immediately. You can set up a Delegate when configuring pipelines or connectors, and the platform guides you through the installation process.

<DocImage path={require('../static/harness-platform-architecture-00.png')} width="90%" height="90%" title="Harness Delegate architecture diagram" />

### Harness GitOps Agent

The Harness GitOps Agent is similar to the Harness Delegate, but it is purpose-built to support **GitOps-based workflows and management**.

GitOps is part of **Harness Continuous Delivery (CD)**. To get started, see <a href="/docs/continuous-delivery/gitops/gitops-entities/agents/install-a-harness-git-ops-agent" target="_blank" >Install a Harness GitOps Agent</a>. For a deeper understanding of how Delegates and GitOps Agents work together, refer to the [Delegate and GitOps Agent strategy](https://www.harness.io/blog/delegates-and-agents-onramp-to-scale-with-harness).

The following video provides an overview of the Harness Delegate and GitOps Agent strategy.

<DocVideo src="https://www.youtube.com/watch?v=_4k4I8g-Fo0" />

---

## Connectors

<a href="/docs/category/connectors" target="_blank" >Harness connectors</a> contain the information necessary to integrate and work with third-party tools. For example, a GitHub connector authenticates with a GitHub account and repo and fetches files as part of a build or deploy stage in a pipeline.

Harness offers many types of connectors, including:

- <a href="/docs/category/code-repositories" target="_blank" >Code repo connectors</a>
- <a href="/docs/category/artifact-repositories" target="_blank" >Artifact repo connectors</a>
- <a href="/docs/category/cloud-providers" target="_blank" >Cloud provider connectors</a>
- <a href="/docs/platform/connectors/monitoring-and-logging-systems/connect-to-monitoring-and-logging-systems" target="_blank" >Monitoring and logging system connectors</a>
- <a href="/docs/category/ticketing-systems-1" target="_blank" >Ticketing system connectors</a>

---

## Pipelines

A pipeline represents a workflow and includes pipeline-level settings, [stages](#stages), and [steps](#steps-and-step-groups). Pipelines can cover integration, delivery, operations, testing, deployment, real-time changes, and monitoring.

For example, a pipeline can use the CI module to build, test, and push code, and then a CD module to deploy the artifact to your production infrastructure.

You can trigger pipelines manually in the Harness Platform or automatically in response to Git events, schedules, new artifacts, and so on.

### Pipeline Studio

In Harness, you can write pipelines in YAML or build pipelines visually in the Pipeline Studio.

* The **Visual editor** provides a GUI experience to easily configure settings, add and remove steps and stages, and drag-and-drop steps and stages to rearrange them. It also helps organize steps in parallel, or add or remove them from step groups.
* The **YAML editor** provides a <a href="/docs/platform/pipelines/harness-yaml-quickstart" target="_blank" >text editor experience for creating pipelines</a>. You can also use the [Harness Git Experience](#git-experience) to manage your Harness YAML entities from your Git repos.

You can freely switch between the two editors. When editing a pipeline in Harness, use the selector at the top of the Pipeline Studio to switch between the Visual and YAML editors.

### Stages

A <a href="/docs/platform/pipelines/add-a-stage" target="_blank" >stage</a> is a subset of a pipeline that contains the logic to perform one major segment of the pipeline process. Stages are based on the different milestones of your pipeline, such as building, approving, and delivering.

Some stages, like a deploy stage, use strategies that automatically add the necessary steps.

### Steps and step groups

A step is an individual operation in a stage. Harness offers many steps, from specialized steps to generic scripting steps.

Steps can run sequentially or in parallel. You can also organize related steps into step groups.

Usually, a step group is a collection of steps that share the same logic, such as the same rollback strategy.

For more information, go to <a href="/docs/continuous-delivery/x-platform-cd-features/cd-steps/step-groups/" target="_blank" >Run Steps in a Step Group</a> and <a href="/docs/platform/pipelines/use-step-groups" target="_blank" >Organize steps in step groups</a>.

### Templates

<a href="/docs/platform/templates/template" target="_blank" >Templates</a> let you define a step, stage, or pipeline once and reuse it across multiple projects, thereby saving setup time and keeping workflows consistent.

This reduces onboarding time and enforces standardization across teams.

---

## Automation

Imagine you want to onboard a new team. Without automation, you would need to manually create their user accounts, assign roles, create a project, and configure connectors, one click at a time in the UI.

Harness offers several approaches for automating management of Harness entities in your account:

- <a href="/docs/category/terraform-provider" target="_blank" >Terraform Provider</a>: Define projects, roles, and connectors in a `.tf` file and apply it in one command — reproducible and version-controlled.
- <a href="/docs/category/api" target="_blank" >Harness API</a>: Invite users in bulk and assign them to projects programmatically.
- <a href="/docs/category/cli" target="_blank" >Harness CLI</a>: Trigger pipelines or manage resources directly from your terminal or CI scripts.

---

## Git Experience

With the <a href="/docs/platform/git-experience/git-experience-overview" target="_blank" >Harness Git Experience</a>, you can store and manage your Harness configurations such as pipelines, templates, and input sets directly in your Git repository.

Instead of making changes only in the UI, you can edit YAML files in Git and have those changes automatically reflected in Harness. This means your Harness configurations go through the same pull request reviews, version history, and branching workflows as your application code.

---

## Feature lifecycle

Learn about recent and upcoming changes to the Harness Platform and modules.

* <a href="/release-notes" target="_blank" >Release notes</a>
* <a href="/roadmap" target="_blank" >Product roadmap</a>
* <a href="/release-notes/early-access" target="_blank" >Early access features</a>

<details>
<summary> Beta, Limited GA, and GA definitions </summary>

Harness releases features and modules that may be in various states of development, including **Beta**, **Limited GA**, and **GA**.

A **Beta** feature or module:
* Requires a feature flag to access.
* May have bugs or performance issues.
* May include functionality not carried forward to the GA release.
* May be unstable or affect existing features.
* May not have documentation.
* May not be production-ready.
* May be incomplete.

A **Limited GA** feature or module:
* Requires a feature flag to access.
* Has basic documentation.
* May work for specific production environments.

A **GA** feature or module:
* Is production-ready.
* Has complete documentation.
* Has a stable UI.

</details>

---

## Cross-module capabilities

The Harness Platform provides several capabilities that work across all modules. You do not need to configure them separately for each module.

- <a href="/docs/platform/approvals/approvals-tutorial" target="_blank">Approvals</a>: Pause a pipeline at any stage and require a manual or automated sign-off before it continues.
- <a href="/docs/platform/dashboards/dashboards-overview" target="_blank">Dashboards</a>: View real-time data on deployments, builds, and resource usage across your account.
- <a href="/docs/platform/settings/default-settings" target="_blank">Global default settings</a>: Set account-wide defaults for timeouts, behaviors, and configurations so every team starts with a consistent baseline.
- <a href="/docs/category/governance-1" target="_blank">Governance</a>: Enforce policies using Open Policy Agent (OPA) to block non-compliant configurations before they are applied.
- <a href="/docs/platform/harness-ai/overview" target="_blank">Harness AI</a>: Use AI-assisted features to troubleshoot failures, generate pipelines, and get contextual recommendations directly in the platform.
- <a href="/docs/platform/notifications/notification-settings" target="_blank">Notifications</a>: Send pipeline and approval alerts to Slack, Microsoft Teams, email, or PagerDuty.
- <a href="/docs/platform/templates/template" target="_blank">Templates</a>: Define steps, stages, or pipelines once and reuse them across multiple projects.
- <a href="/docs/platform/triggers/triggers-overview" target="_blank">Triggers</a>: Automatically start pipelines in response to Git events, schedules, or new artifact versions.
- <a href="/docs/platform/variables-and-expressions/runtime-inputs" target="_blank">Variables, expressions, and runtime input</a>: Pass dynamic values into pipelines at runtime or reference shared values across steps and stages.

---

## Next steps

- <a href="/docs/platform/platform-whats-supported" target="_blank" >What's supported</a>
- <a href="/docs/platform/get-started/onboarding-guide" target="_blank" >Get started with Harness Platform</a>
