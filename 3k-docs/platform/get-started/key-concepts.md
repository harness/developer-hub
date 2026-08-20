---
title: Overview
description: Learn the key concepts of the Harness Platform, including the four Harness Agents, accounts, organizations, projects, RBAC, delegates, connectors, and pipelines.
slug: /platform/get-started/overview
canonical_url: https://www.harness.io/blog/general-availability-harness-developer-hub-hdh
keywords:
  - harness platform
  - autonomous sdlc
  - harness agents
  - software delivery agent
  - rbac
tags:
  - platform
  - get-started
---

The Harness Platform is the foundation that everything else in Harness is built on. Think of it as the common layer that handles all the shared capabilities your teams need: user management, access control, secrets, connectors, auditing, and notifications. You define these capabilities once and reuse them everywhere.

On top of this foundation sit the four **Harness Agents**, which are the products you use to deliver software, test it for security risk, protect it in production, and manage its cost. Because every Agent runs on the platform, each one automatically inherits all platform capabilities.

<DocImage
  path={require('/docs/platform/get-started/static/harness-platform-overview.png')}
  alt="Harness Platform overview diagram"
  title="Click to view full size image"
  width={800}
  height={450}
/>

For example, when you set up authentication, permissions, or notifications at the platform level, those settings apply consistently across every Agent and capability you use.

Harness Platform is also referred to as **Harness Manager**. It is the web UI where you sign in, create projects, set up pipelines, and manage your configurations.

---

## Before you begin

- **Know basic DevOps concepts:** What CI/CD means, what a pipeline is in general terms, and why access control matters in engineering teams.
- **What an identity provider (IdP) is (optional):** Helps you understand the <a href="/docs/platform/authentication/authentication-overview" target="_blank" >authentication and RBAC sections</a>.
- **Git basics (optional):** The [Git Experience](#git-experience) section assumes familiarity with repos and YAML.

:::tip New to DevOps?
Do not worry if you do not recognize a term. Check the <a href="/glossary" target="_blank" > Harness Glossary </a> as you read.
:::

---

## Autonomous SDLC

Harness is the platform for the **Autonomous SDLC**. Coding agents create changes in code. Harness gives AI agents the context and the control to take every code change safely through production and beyond.

Autonomous SDLC does not mean that every action runs without you. Harness supports a range of autonomy, and you decide where each Agent acts on its own, where it recommends an action for you to approve, and where it only reports what it found. The same identity, permissions, policies, approvals, verification, and evidence apply in every mode. You draw the lines, and Harness enforces them.

---

## Harness Agents

Harness organizes its functionality into four Agents. Each Agent is a complete product aligned to a clear outcome, and each one contains a set of capabilities that you activate only when you need them.

| Agent | Outcome | Capabilities |
|---|---|---|
| **Harness Software Delivery Agent** | Take every code change safely through production. | Code Deployments, Builds, Infrastructure Deployments, Database Deployments, Artifacts, Code Repositories, Code Reviews |
| **Harness Security Testing Agent** | Find and fix risk before production. | Security Testing Orchestration, Supply Chain Security, SAST, SCA, Hardened Images (soon) |
| **Harness Runtime Protection Agent** | Protect applications, APIs, and AI in production. | API Posture Management, API Advanced Protection, AI Security |
| **Harness Cost Management Agent** | Control and optimize cloud and AI costs. | AI Costs, Cloud Costs, Engineering Efficiency |

Capabilities are modular. A capability such as Builds or Cloud Costs is something you turn on inside an Agent, so you pay for and operate only the functionality your teams use.

Additional Harness offerings, such as AI SRE, AI Evals, Internal Developer Portal, Feature Management and Experimentation, and Resilience Testing, run on this same platform foundation. They use the same identity, policy, context, and metering as the four Agents.

:::info Modules become capabilities
If you used Harness before the Agent model, the functionality you rely on has not changed. What were previously described as separate modules are now capabilities inside one of the four Agents. Your pipelines, entitlements, and configurations continue to work.
:::

### Why these products are called Agents

An Agent is more than a chat assistant. Each Agent combines context about your environment, the intelligence to reason over that context, the ability to execute work, and governance over every action it takes.

| Product | Work it owns |
|---|---|
| A coding agent | Creates changes in code. |
| Software Delivery Agent | Takes each change safely through production. |
| Security Testing Agent | Finds and fixes risk before production. |
| Runtime Protection Agent | Protects software in production. |
| Cost Management Agent | Governs and optimizes cloud and AI costs. |

### The Agent Harness

All four Agents share one common AI foundation, called the Agent Harness. It provides the following:

- **Expert Agents:** Understand, investigate, explain, recommend, create, and configure through natural language.
- **SDLC Knowledge Graph:** Provides shared context across repositories, services, teams, pipelines, deployments, security findings, runtime behavior, costs, and outcomes.
- **Worker Agents:** Built-in AI workflows that perform substantive work rather than only make recommendations.
- **Governed Orchestration Engine:** Runs work through Harness Delegates inside your own environments and applies identity, permissions, policy, approvals, deterministic workflows, verification, evidence, rollback, and cost controls.

You access all four Agents through one Harness AI experience across the UI, the CLI, and your IDE. Coding agents and other external tools reach the same context and capabilities through Harness MCP.

:::info Agents versus Delegates and the GitOps Agent
Harness Agents are products. Harness Delegates and the Harness GitOps Agent are lightweight workers that run inside your infrastructure and execute tasks on behalf of Harness. Go to [Delegates](#delegates) to understand how execution works.
:::

---

## Account

A Harness account is the highest level for all operations you perform in Harness. It is where you define your organizational structure, manage global settings, and control access across all users and projects. Within an account, you create **organizations and projects**. This hierarchy helps teams work independently while still following shared security, governance, and access rules set at the account level.

Go to the <a href="/docs/platform/get-started/onboarding-guide" target="_blank" >Platform onboarding guide</a> to set up your account and get started.


<DocImage
  path={require('/docs/platform/get-started/static/account-overview.png')}
  alt="Account Overview"
  title="Click to view full size image"
  width={800}
  height={450}
/>

---

Within a Harness account, you organize your work using organizations and projects. This structure helps teams collaborate effectively while keeping ownership, access, and configuration clearly defined.

## Organizations

A Harness organization (or *org*) groups together projects that share a common purpose or business goal. Organizations are often used to represent higher-level groupings in a company, such as:

* Business units
* Product lines
* Departments

Go to <a href="/docs/platform/organizations-and-projects/#organizations" target="_blank">Organizations</a> to know more about creating and managing organizations.

## Projects

A Harness project is where teams do their day-to-day work.

Projects typically represent:

* Application or service teams
* Platform or infrastructure teams
* Individual workloads within an organization

Go to <a href="/docs/platform/organizations-and-projects/#projects" target="_blank">Projects</a> to know more about creating and managing projects.


---

## Harness SaaS versus SMP offerings

Harness is offered as **Software as a Service (SaaS)** and **Self-Managed** (on-premises) editions. **This documentation covers the SaaS edition.** If you are using Self-Managed Enterprise Edition (SMP), go to the <a href="/docs/self-managed-enterprise-edition" target="_blank" >SMP documentation</a>.


| | **SaaS** | **Self-Managed Enterprise Edition (SMP)** |
|---|---|---|
| **What it is** | Fully managed, cloud-hosted version of Harness. No infrastructure setup required. | Kubernetes-native deployment that runs on your own public or private cloud infrastructure. Go to [SMP overview](/docs/self-managed-enterprise-edition/smp-overview) to learn how it is deployed. |
| **Plans/licensing** | Free, Team, and Enterprise. Go to [Subscriptions and licenses](/docs/platform/subscriptions-licenses/subscriptions) to compare plans. | Requires a valid SMP license key and access to download the Harness SMP software. |
| **Get access** | [Sign up with the Free plan](https://app.harness.io/auth/#/signup/?module=cd&utm_medium=harness-developer-hub), then [sign in](https://app.harness.io/auth/#/signin). Team/Enterprise accounts are created by invitation from an Account Administrator. | Contact [Harness Support](mailto:support@harness.io) to obtain your license key and software download access. |
| **Setup** | None. Harness manages the infrastructure. | Follow the [installation instructions](/docs/category/helm-installation), then sign in at `http://YOUR_DOMAIN_NAME/auth/#/signin`. |


---

## Role-based access control (RBAC)

Role-based access control (RBAC) describes **who** is allowed to perform **what** actions and **where**.

With RBAC, you can delegate administrative responsibility at the organization and project levels instead of managing everything at the account level.

For example, you can assign a project administrator who is responsible for managing access, resources, and settings within a specific project.

Once ownership is delegated:
* Organization and project admins can invite and manage users.
* Teams can independently manage pipelines, Agent capabilities, and platform resources.
* Changes made in one project or organization do not affect others.

This approach reduces dependency on account administrators and allows teams to move faster while maintaining strong governance and security boundaries.

### How RBAC works in Harness

Harness RBAC has three core components:

* **Principals**: The people and systems that need access; users, user groups, and service accounts.
* **Roles**: What actions they can take; for example, create pipelines or view secrets.
* **Resource groups**: Where they can do it; for example, only within a specific project.

You grant access by combining a **role** and a **resource group** and assigning them to a **principal**.

Harness RBAC applies across all scopes, from the account level down to individual resources such as projects, pipelines, and services. It also applies to every action an Agent takes, so AI-driven work runs under the same permissions as human work.

Go to the <a href="/docs/platform/role-based-access-control/rbac-in-harness" target="_blank" >Harness RBAC documentation</a> for detailed setup.

### User and group management

A Harness user is anyone in your account, identified by an email address. You can add users manually or set up automatic provisioning using System for Cross-domain Identity Management (SCIM), which is a standard protocol for automating user provisioning. Some tools are:
- Okta SCIM
- Microsoft Entra ID SCIM
- OneLogin SCIM
- Just-In-Time (JIT) provisioning with Security Assertion Markup Language (SAML).

Harness supports multiple <a href="/docs/platform/authentication/authentication-overview" target="_blank" >authentication methods</a>, allowing you to choose what best fits your organization’s security and compliance requirements:

* Username and password
* Public OAuth providers, including Google, GitHub, GitLab, LinkedIn, Azure, and Bitbucket
* Enterprise Single Sign-On (SSO) providers (Security Assertion Markup Language (SAML) providers such as Microsoft Entra ID, Okta, and OneLogin)
* Lightweight Directory Access Protocol (LDAP)

### User groups

Instead of setting permissions for each person individually, you can create <a href="/docs/platform/role-based-access-control/add-user-groups" target="_blank" >user groups</a> and assign <a href="/docs/platform/role-based-access-control/add-manage-roles" target="_blank" >roles</a> and <a href="/docs/platform/role-based-access-control/add-resource-groups" target="_blank" >resource groups</a> to the user group. Everyone in the group automatically gets those permissions.

User groups also control notifications, so you can send alerts to a group via email, Slack, Microsoft Teams, or PagerDuty.

This approach helps you manage access and notifications consistently while reducing administrative overhead.

### Service accounts

Service accounts are like user accounts but for scripts and automated workflows. They are non-human identities. For example, a CI/CD pipeline might use a service account to deploy code without needing someone's personal login.

You give service accounts the same roles and resource groups as regular users to control what they can access.
  * Assign **roles** to define what actions the service account can perform
  * Assign **resource groups** to define where those actions can be performed

This allows you to apply the same RBAC controls and governance policies to automation as you do to human users. Using service accounts helps improve security and maintainability by avoiding reliance on personal user credentials for automation.

### API keys and tokens

API keys and tokens let external tools authenticate with Harness without a browser login. These keys and tokens can only perform the actions that the associated user or service account has permission to perform.

- **API key for a service account**: Use this for automation and integrations. The key inherits all permissions granted to the service account.
- **Personal access token (PAT) for a user**: Use this for your own local development or testing. The token inherits your user permissions.

---

## Governance using policy as code

Harness lets you enforce governance and compliance using policy as code, powered by Open Policy Agent (OPA).

Policies act as guardrails that automatically evaluate configurations and actions across the platform. You use them to ensure teams follow standards.

For example, if you want to make sure nobody accidentally deploys to production, you write a rule (a "policy") that Harness checks automatically before every deployment. If the rule fails, the deployment is blocked.

Because every Agent runs through the same Governed Orchestration Engine, these policies also apply to the work that Expert Agents and Worker Agents perform.

You can start quickly by using built-in sample policies or create custom policies tailored to your organization’s needs. Go to the <a href="/docs/platform/governance/policy-as-code/harness-governance-overview" target="_blank" >Harness governance overview</a> to learn more.

---

## Secrets management

Harness includes built-in support for secrets management to securely store and manage sensitive data such as API keys, passwords, and tokens.

Harness encrypts secrets so you can reference them safely across your account without exposing their values. In addition to the built-in secret manager, Harness integrates with popular external secret managers, allowing you to continue using your existing security tools and workflows.

Go to the <a href="/docs/platform/secrets/secrets-management/harness-secret-manager-overview" target="_blank" >Harness secrets management overview</a> for details.

---

## Delegates

Harness Delegates are lightweight workers that you install in your environment, such as a Kubernetes cluster or a virtual machine, to securely execute tasks on behalf of the Harness Platform.

Delegates connect to Harness Manager using **outbound-only HTTP/HTTPS**, so you do not need any inbound network access. When you run a pipeline, Harness Manager tells the Delegate what to do, and the Delegate performs the actual operations, such as deploying to a cluster or pulling an artifact, within your network.

Delegates are how Agent work stays inside your environment. When a Worker Agent executes a task, the Governed Orchestration Engine runs it through a Delegate using your own credentials, so your code, secrets, and infrastructure never leave your boundary.

Delegates are essential for enabling Harness to perform actions in your infrastructure, but you do not need to install one immediately. You set up a Delegate when configuring pipelines and connectors, and the platform guides you through the installation process.

<DocImage path={require('/docs/platform/static/harness-platform-architecture-00.png')} width="90%" height="90%" title="Harness Delegate architecture diagram" />

### Harness GitOps Agent

The Harness GitOps Agent is similar to a Harness Delegate, but it is purpose-built to support **GitOps-based workflows and management**.

GitOps is part of the Software Delivery Agent. Go to <a href="/docs/continuous-delivery/gitops/gitops-entities/agents/install-a-harness-git-ops-agent" target="_blank" >Install a Harness GitOps Agent</a> to get started. For a deeper understanding of how Delegates and GitOps Agents work together, go to [Delegate and GitOps Agent strategy](https://www.harness.io/blog/delegates-and-agents-onramp-to-scale-with-harness).

The following video provides an overview of the Harness Delegate and GitOps Agent strategy.

<DocVideo src="https://www.youtube.com/watch?v=_4k4I8g-Fo0" />

---

## Connectors

<a href="/docs/category/connectors" target="_blank" >Harness connectors</a> contain the information necessary to integrate and work with third-party tools. For example, a GitHub connector authenticates with a GitHub account and repo, and then fetches files as part of a build or deploy stage in a pipeline.

Harness offers many types of connectors, including:

- <a href="/docs/category/code-repositories" target="_blank" >Code repo connectors</a>
- <a href="/docs/category/artifact-repositories" target="_blank" >Artifact repo connectors</a>
- <a href="/docs/category/cloud-providers" target="_blank" >Cloud provider connectors</a>
- <a href="/docs/platform/connectors/monitoring-and-logging-systems/connect-to-monitoring-and-logging-systems" target="_blank" >Monitoring and logging system connectors</a>
- <a href="/docs/category/ticketing-systems-1" target="_blank" >Ticketing system connectors</a>

Connectors also supply the model endpoints that Agents use. An AI model connector points an Agent at a hosted or self-hosted model, so the Agent reasons over your context using a provider you control.

---

## Pipelines

A pipeline represents a workflow that includes pipeline-level settings, [stages](#stages), and [steps](#steps-and-step-groups). Pipelines cover integration, delivery, operations, testing, deployment, real-time changes, and monitoring.

Pipelines are also where Agent work runs. An Agent step performs AI-driven work, such as reviewing a pull request or fixing a failing build, inside the same pipeline that builds and deploys your service, under the same approvals and policies.

For example, a pipeline can use build capabilities to build, test, and push code, and then use deployment capabilities to deploy the artifact to your production infrastructure.

You can trigger pipelines manually in Harness Platform or automatically in response to Git events, schedules, new artifacts, and so on.

### Pipeline Studio

In Harness, you can write pipelines in YAML or build pipelines visually in Pipeline Studio.

* **Visual editor** provides a GUI experience to easily configure settings, add and remove steps and stages, and drag-and-drop steps and stages to rearrange them. It also helps you organize steps in parallel, or add or remove them from step groups.
* **YAML editor** provides a <a href="/docs/platform/pipelines/harness-yaml-quickstart" target="_blank" >text editor experience for creating pipelines</a>. You can also use [Harness Git Experience](#git-experience) to manage your Harness YAML entities from Git repos.

You can freely switch between the two editors. When editing a pipeline in Harness, use the selector at the top of Pipeline Studio to switch between the Visual and YAML editors.

### Stages

A <a href="/docs/platform/pipelines/add-a-stage" target="_blank" >stage</a> is a subset of a pipeline that contains the logic to perform one major segment of the pipeline process. Stages are based on the different milestones of your pipeline, such as building, approving, and delivering.

Some stages, like the deploy stage, use strategies that automatically add the necessary steps.

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

Imagine you want to onboard a new team. Without automation, you would need to manually create user accounts, assign roles, create a project, and configure connectors, one click at a time in the UI.

Harness offers several approaches to automating the management of Harness entities in your account:

- <a href="/docs/category/terraform-provider" target="_blank" >Terraform Provider</a>: Define projects, roles, and connectors in a `.tf` file and apply it in one command, which keeps your setup reproducible and version-controlled.
- <a href="/docs/category/api" target="_blank" >Harness API</a>: Invite users in bulk and assign projects programmatically.
- <a href="/docs/category/cli" target="_blank" >Harness CLI</a>: Trigger pipelines and manage resources directly from your terminal or CI scripts.

---

## Git Experience

With <a href="/docs/platform/git-experience/git-experience-overview" target="_blank" >Harness Git Experience</a>, you store and manage Harness configurations such as pipelines, templates, and input sets directly in a Git repository.

Instead of making changes only in the UI, you can edit YAML files in Git and have those changes automatically reflected in Harness. This means your Harness configurations go through the same pull request reviews, version history, and branching workflows as your application code.

---

## Feature lifecycle

Learn about recent and upcoming changes to the Harness Platform and Agents.

* <a href="/release-notes" target="_blank" >Release notes</a>
* <a href="/roadmap" target="_blank" >Product roadmap</a>
* <a href="/release-notes/features" target="_blank" >Feature availability</a>

<details>
<summary> Beta, Limited GA, and GA definitions </summary>

Harness releases features and capabilities that may be in various states of development, including **Beta**, **Limited GA**, and **GA**.

A **Beta** feature or capability:
* Requires a feature flag for access.
* May have bugs and performance issues.
* May include functionality that is not carried forward to the GA release.
* May be unstable and affect existing features.
* May not have documentation.
* May not be production-ready.
* May be incomplete.

A **Limited GA** feature or capability:
* Requires a feature flag for access.
* Has basic documentation.
* May work for specific production environments.

A **GA** feature or capability:
* Is production-ready.
* Has complete documentation.
* Has a stable UI.

</details>

---

## Cross-Agent platform capabilities

The Harness Platform provides capabilities that work across all four Agents. You do not need to configure them separately for each capability you activate.

- <a href="/docs/platform/approvals/approvals-tutorial" target="_blank">Approvals</a>: Pause a pipeline at any stage and require manual or automated sign-off before it continues.
- <a href="/docs/platform/dashboards/dashboards-overview" target="_blank">Dashboards</a>: View real-time data on deployments, builds, and resource usage across your account.
- <a href="/docs/platform/settings/default-settings" target="_blank">Global default settings</a>: Set account-wide defaults for timeouts, behaviors, and configurations so every team starts from a consistent baseline.
- <a href="/docs/category/governance-1" target="_blank">Governance</a>: Enforce policies using Open Policy Agent (OPA) to block non-compliant configurations before they are applied.
- <a href="/docs/platform/harness-ai/overview" target="_blank">Harness AI</a>: Use one AI experience across the UI, the CLI, and your IDE to troubleshoot failures, generate pipelines, and get contextual recommendations. External coding agents reach the same context through Harness MCP.
- <a href="/docs/platform/notifications/notifications-overview" target="_blank">Notifications</a>: Send pipeline and approval alerts to Slack, Microsoft Teams, email, or PagerDuty.
- <a href="/docs/platform/templates/template" target="_blank">Templates</a>: Define steps, stages, and pipelines once and reuse them across multiple projects.
- <a href="/docs/platform/triggers/triggers-overview" target="_blank">Triggers</a>: Automatically run pipelines in response to Git events, schedules, or new artifact versions.
- <a href="/docs/platform/variables-and-expressions/runtime-inputs" target="_blank">Variables, expressions, and runtime input</a>: Pass dynamic values to pipelines at runtime and reference shared values across steps and stages.

---

## Next steps

- <a href="/3k-docs/platform/getting-started" target="_blank" >What's New</a>: Understand what changes between Harness NG and Harness 3.0.
- <a href="/3k-docs/platform/getting-started/agents" target="_blank" >Harness Agents</a>: Review the agent catalog, model connectors, and governance controls.
- <a href="/3k-docs/platform/platform-whats-supported" target="_blank" >What's supported</a>: Check supported platforms and integrations.
- <a href="/3k-docs/platform/getting-started/navigation" target="_blank" >Navigation</a>: Find your way around the redesigned UI.
