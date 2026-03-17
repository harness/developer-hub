---
title: Overview
description: Learn key concepts and overview of the Harness Platform including accounts, organizations, projects, delegates, connectors, pipelines, and RBAC.
helpdocs_topic_id: hv2758ro4e
helpdocs_category_id: kx4hs8bn38
helpdocs_is_private: false
helpdocs_is_published: true
redirect_from:
  - /docs/platform/get-started/platform-overview
  - /docs/getting-started/key-concepts
  - /docs/get-started/key-concepts
  - /docs/getting-started/harness-platform-architecture
  - /docs/get-started/harness-platform-architecture
  - /docs/getting-started/learn-harness-key-concepts
  - /docs/platform/key-concepts
  - /docs/get-started/beta-preview-ga
  - /docs/get-started/release-status
canonical_url: https://www.harness.io/blog/general-availability-harness-developer-hub-hdh
---

## What is Harness Platform?

The Harness Platform is the shared foundation that powers all Harness modules. It provides a single, unified interface to onboard teams, manage projects, and configure platform-wide settings.

This section focuses on the core capabilities you’ll use regardless of which module you’re working in—such as setting up organizations and projects, managing delegates, and configuring global security and access controls. For module-specific features and workflows (for example, deploying services using Continuous Delivery), refer to the documentation for the relevant module on the [Harness Developer Hub](https://developer.harness.io).

## Platform Overview

The Harness Platform is the foundation that everything else in Harness is built on.

<DocImage
  path={require('./static/harness-platform-overview.jpg')}
  alt="Account Overview"
  title="Click to view full size image"
  width={800}
  height={450}
/>


Think of it as the common layer that handles all the shared capabilities your teams need—things like user management, access control, secrets, connectors, auditing, and notifications. These platform services are defined once and reused everywhere, so you don’t have to configure the same basics again and again for each product.

On top of this foundation sit the Harness modules, such as Continuous Integration, Feature Flags, Security Testing, and GitOps. Because these modules run on the platform, they automatically inherit its capabilities. For example, when you set up authentication, permissions, or notifications at the platform level, those settings apply consistently across all modules you use.

On this page, we focus specifically on the Harness Platform layer. You’ll learn about core building blocks like Accounts, Organizations, Projects, and Delegates, and how they work together to support every module running on Harness.

---
## Account

A Harness account is the highest level for everything you do in Harness. It’s where you define your organizational structure, manage global settings, and control access across all users and projects. Within an account, you create **organizations and projects**. This hierarchy helps teams work independently while still following shared security, governance, and access rules set at the account level.

Resources such as **connectors** can be created at different levels, such as the **account, organization, or project**. Resources defined at a higher level are automatically available to lower levels, which helps reduce duplication and keeps configuration consistent.


<DocImage
  path={require('./static/account-overview.jpg')}
  alt="Account Overview"
  title="Click to view full size image"
  width={600}
  height={600}
/>


Designing a clear organization and project structure upfront allows teams to manage their own resources and workflows without depending on account administrators for day-to-day tasks.

---

### Account information

To get started with your account, see the [Platform onboarding guide](./onboarding-guide.md). You can view key account details on the **Account Overview** page, including:
  * Account name and Account ID
  * The Harness SaaS cluster hosting your account
  * Module subscriptions and license information

You’ll need this information when setting up delegates, configuring the Terraform provider, using the CLI, or integrating other automation and administration tools.

If you’re using the **Self-Managed Enterprise Edition**, account information and setup differ from the SaaS experience. For details, see the [Self-Managed Enterprise Edition documentation](/docs/self-managed-enterprise-edition.md).

---

## Organizations and Projects

Within a Harness account, you organize your work using organizations and projects. This structure helps teams collaborate effectively while keeping ownership, access, and configuration clearly defined.

### Organizations

A Harness organization (or *org*) groups together projects that share a common purpose or business goal. Organizations are often used to represent higher-level groupings in a company, such as:

  * Business units
  * Product lines
  * Departments

Each organization can contain multiple projects and provides a natural boundary for managing teams, access, and shared resources.

### Projects

A Harness project is where teams do their day-to-day work. Projects contain the pipelines, users, and resources needed to build, deploy, test, and operate applications. Projects typically represent:

  * Application or service teams
  * Platform or infrastructure teams
  * Individual workloads within an organization

Projects give teams a shared workspace while allowing them to operate independently. 

---

## Role-based access control (RBAC)

Role-based access control (RBAC) in Harness lets you decide who can do what, and where—without slowing teams down or compromising security.

With RBAC, you can delegate administrative responsibility at the organization and project levels instead of managing everything at the account level. For example, assigning the **Project Admin** role makes a user responsible for managing access, resources, and settings within a specific project.

Once ownership is delegated:

* Organization and project admins can invite and manage users
* Teams can independently manage pipelines, modules, and platform resources
* Changes made in one project or organization do not affect others

This approach reduces dependency on account administrators and allows teams to move faster while maintaining strong governance and security boundaries.

### How RBAC works in Harness

Harness RBAC applies across all scopes, from the account level down to individual resources such as projects, pipelines, or services. This gives you fine-grained control over access, whether you’re managing a large enterprise or a small team.

RBAC in Harness is built on three core components:

* **Principals** – The identities that receive access, such as users, user groups, and service accounts
* **Roles** – Collections of permissions that define what actions can be performed
* **Resource groups** – Sets of resources that determine where those actions can be performed

You grant access by assigning roles and resource groups to principals. Together, these components ensure that each user has only the access they need—no more, no less.

For detailed configuration steps and advanced scenarios, see the [Harness RBAC documentation](/docs/platform/role-based-access-control/rbac-in-harness).

### User and group management

Harness makes it easy to manage users and user groups at scale, whether you’re onboarding a small team or supporting a large organization.

A Harness user is any individual registered in your Harness account with a unique email address. You can add or remove users manually, or automate user provisioning using integrations such as Okta SCIM, Microsoft Entra ID SCIM, OneLogin SCIM, or just-in-time (JIT) provisioning with SAML.

Harness supports multiple [authentication methods](/docs/platform/authentication/authentication-overview), allowing you to choose what best fits your organization’s security and compliance requirements:

* Username and password
* Public OAuth providers, including Google, GitHub, GitLab, LinkedIn, Azure, and Bitbucket
* SAML providers such as Azure AD, Okta, and OneLogin
* LDAP

You can configure [one or more authentication methods](/docs/platform/authentication/multiple-identity-providers) depending on your setup.

### User groups

To simplify access management, you can organize users into [user groups](/docs/platform/role-based-access-control/add-user-groups). Instead of assigning permissions to individual users, you assign [roles](/docs/platform/role-based-access-control/add-manage-roles) and [resource groups](/docs/platform/role-based-access-control/add-resource-groups) to a user group, and those permissions automatically apply to all members of the group.

User groups also play a key role in notifications. You can configure notifications for a group using channels such as:

* Email or email aliases
* Slack webhooks
* Microsoft Teams webhooks
* PagerDuty

This approach helps you manage access and notifications consistently while reducing administrative overhead.

---

### Service accounts

Service accounts are non-human identities used by external systems and automation tools to integrate with the Harness Platform. Unlike regular users, service accounts are not associated with an individual and are intended for CI/CD tools, scripts, and other automated workflows.

You manage service accounts the same way you manage users:
  * Assign **roles** to define what actions the service account can perform
  * Assign **resource groups** to define where those actions can be performed

This allows you to apply the same RBAC controls and governance policies to automation as you do to human users. Using service accounts helps improve security and maintainability by avoiding reliance on personal user credentials for automation.

---

### API keys and tokens

API keys and tokens are used to authenticate users and service accounts when accessing Harness programmatically through APIs, CLIs, or automation tools.

* When you create an API key for a service account, the key inherits all permissions granted to that service account through its role bindings.
* When you create an API key or personal access token (PAT) for a user, it inherits the permissions of that user.

This means API keys and tokens can only perform actions that the associated user or service account is allowed to perform.

:::tip
use **service accounts and their API keys** for automation and integrations, and reserve **personal tokens** for individual use cases such as local development or testing.
:::

---

## Governance using policy as code

Harness lets you enforce governance and compliance using policy as code, powered by Open Policy Agent (OPA).

Policies act as guardrails that automatically evaluate configurations and actions across the platform. You can use them to ensure standards are followed—for example, enforcing security requirements, limiting resource usage, or preventing misconfigurations—before changes are applied.

You can start quickly by using built-in sample policies or create custom policies tailored to your organization’s needs. Learn more in the [Harness governance overview](/docs/platform/governance/policy-as-code/harness-governance-overview).

---

## Secrets management

Harness includes built-in support for secrets management to securely store and manage sensitive data such as API keys, passwords, and tokens.

Secrets are encrypted and can be referenced safely across your Harness account without exposing their values. In addition to the built-in secret manager, Harness integrates with popular external secret managers, allowing you to continue using existing security tools and workflows.

For details, see the [Harness secrets management overview](/docs/platform/secrets/secrets-management/harness-secret-manager-overview).

---

## Delegates

Harness Delegates are lightweight workers that you install in your environment—such as a Kubernetes cluster or virtual machine—to securely execute tasks on behalf of the Harness Platform.

Delegates connect to the Harness Platform using **outbound-only HTTP/HTTPS**, which means no inbound network access is required. They interact with your systems—like container platforms, artifact repositories, and monitoring tools—while keeping credentials and secrets within your network.

Delegates are essential for enabling Harness to perform actions in your infrastructure, but you don’t need to install one immediately. You can set up a delegate when configuring pipelines or connectors, and the platform guides you through the installation process.

<figure>

![](../static/harness-platform-architecture-00.png)

<figcaption>Diagram of Harness Delegate architecture</figcaption>
</figure>

<details>
<summary>Harness GitOps Agent</summary>

The Harness GitOps Agent is similar to the Harness Delegate, but it is purpose-built to support **GitOps-based workflows and management**.

GitOps is part of **Harness Continuous Delivery (CD)**. To get started, see [Install a Harness GitOps Agent](/docs/continuous-delivery/gitops/gitops-entities/agents/install-a-harness-git-ops-agent). For a deeper understanding of how Delegates and GitOps Agents work together, refer to the [Delegate and GitOps Agent strategy](https://www.harness.io/blog/delegates-and-agents-onramp-to-scale-with-harness).

The following video provides an overview of the Harness Delegate and GitOps Agent strategy.

<DocVideo src="https://www.youtube.com/watch?v=_4k4I8g-Fo0" />

</details>

## Connectors

[Harness connectors](/docs/category/connectors) contain the information necessary to integrate and work with 3rd party tools. For example, a GitHub connector authenticates with a GitHub account and repo and fetches files as part of a build or deploy stage in a pipeline.

Harness offers many types of connectors, including:

- [Code repo connectors](/docs/category/code-repositories)
- [Artifact repo connectors](/docs/category/artifact-repositories)
- [Cloud provider connectors](/docs/category/cloud-providers)
- [Monitoring and logging system connectors](/docs/platform/connectors/monitoring-and-logging-systems/connect-to-monitoring-and-logging-systems)
- [Ticketing system connectors](/docs/category/ticketing-systems-1)

## Pipelines

Pipelines are a feature of several Harness modules. Pipelines represent a workflow, and, in Harness, they are comprised of pipeline-level settings, [stages](#stages), and [steps](#steps-and-step-groups). Pipelines can be a cyclical process that include integration, delivery, operations, testing, deployment, real-time changes, and monitoring.

For example, a pipeline can use the CI module to build, test, and push code, and then a CD module to deploy the artifact to your production infrastructure.

Pipelines are triggered manually in the Harness Platform or automatically in response to Git events, schedules, new artifacts, and so on.

### Pipeline Studio

In Harness, you can write pipelines in YAML or build pipelines visually in the Pipeline Studio.

* The **Visual editor** provides a GUI experience where you can easily configure settings, add and remove steps and stages, and drag-and-drop steps and stages to rearrange them, organize them in parallel, or add or remove them from step groups.
* The **YAML editor** provides a [text editor experience for creating pipelines](/docs/platform/pipelines/harness-yaml-quickstart.md). You can also user the [Harness Git Experience](#git-experience) to manage your Harness YAML entities from your Git repos.

You can freely switch between the two editors. When editing a pipeline in Harness, use the selector at the top of the Pipeline Studio to switch between the Visual and YAML editors.

### Stages

A [stage](/docs/platform/pipelines/add-a-stage.md) is a subset of a pipeline that contains the logic to perform one major segment of the pipeline process. Stages are based on the different milestones of your pipeline, such as building, approving, and delivering.

Some stages, like a deploy stage, use strategies that automatically add the necessary steps.

### Steps and step groups

A step is an individual operation in a stage. Harness offers many steps, from specialized steps to generic scripting steps.

Steps can run sequentially or in parallel. You can also organized related steps into step groups.

Usually, a step group is a collection of steps that share the same logic, such as the same rollback strategy.

For more information, go to [Run Steps in a Step Group](/docs/continuous-delivery/x-platform-cd-features/cd-steps/step-groups/) and [Organize steps in step groups](/docs/platform/pipelines/use-step-groups.md).

### Templates

[Templates](/docs/platform/templates/template) enhance developer productivity, reduce onboarding time, and enforce standardization across the teams that use Harness. You can create templates for steps, step groups, stages, and pipelines.

## Automation

Harness offers several approaches for automating management of Harness entities in your account:

- [Terraform Provider](/docs/category/terraform-provider)
- [Harness CLI](/docs/category/cli)
- [Harness API](/docs/category/api)

## Harness Manager

The *Harness Manager* can be a synonym for the Harness Platform and it can refer to "inline" (within the platform) storage and management of configurations and pipelines. It can also refer to the orchestration and handling of internal Harness functions, for example, when you run a pipeline.

## Git Experience

With the [Harness Git Experience](/docs/platform/git-experience/git-experience-overview), you can sync your Harness account, orgs, and projects with your Git repo to manage Harness entirely from Git.

Components that you can write in YAML can also be managed purely through Git with the Git Experience.

## FirstGen vs NextGen

:::warning

Eventually all FirstGen accounts will be migrated to NextGen.

FirstGen Harness CD reached EOL on December 30, 2023, and EOS on March 30, 2024.

:::

Harness FirstGen and Harness NextGen are two versions of the Harness product suite.

* Harness FirstGen is the legacy or earlier version of Harness. It covers common platforms but didn't include all Harness modules.
* Harness NextGen is Harness' new version with a redesigned experience and new Continuous Integration, Feature Flags, Security Testing Orchestration, Service Reliability Management, Cloud Cost Management, and Chaos Engineering modules.

---

## Feature Lifecycle

Learn about recent and upcoming changes to the Harness Platform and modules.

* [Release notes](/release-notes)
* [Product roadmap](/roadmap)
* [Early access features](/release-notes/early-access)

### Beta, Limited GA, and GA definitions

Harness releases features and modules that may be in various states of development, including **Beta**, **Limited GA**, and **GA**.

A **Beta** feature or module:
* Is released behind a feature flag.
* May include bugs or have performance issues.
* May include functionality that will not be included in the GA release.
* May be unstable or cause instability with existing features.
* May not include documentation.
* May not be suitable for production environments.
* May not include all functionality.

A **Limited GA** feature or module:
* Is released behind a feature flag.
* Includes basic documentation.
* May be suitable for specific production environments.

A **GA** feature or module:
* Is suitable for production environments.
* Includes complete documentation.
* Includes a stable UI.
