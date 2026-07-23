---
title: Harness AI DevOps Agent
description: Create pipelines, manage resources, and troubleshoot with AI through natural language conversations in the Harness UI.
sidebar_label: DevOps Agent
sidebar_position: 2
keywords:
  - devops agent
  - harness ai
  - pipeline creation
  - resource management
  - gitops operations
  - error analyzer
  - policy generation
tags:
  - harness-ai
  - devops-agent
  - automation
redirect_from:
  - /docs/platform/harness-aida/ai-devops
  - /docs/platform/harness-ai/devops-agent
---

The Harness AI DevOps Agent streamlines your DevOps processes by enabling you to create and edit steps, stages, and pipelines with ease. Leveraging the power of large language models, the agent provides intelligent suggestions, automates repetitive tasks, and generates OPA Rego policies to help you meet your compliance standards.

:::note AI models
The DevOps Agent uses Claude Opus 4.6, hosted through AWS Bedrock and Google Vertex AI, for all AI-powered operations including pipeline creation, error analysis, policy generation, and resource management.
:::

---

## What will you learn in this topic?

By the end of this topic, you will be able to:

- <a href="#installation-and-setup">Enable and configure the DevOps Agent</a>.
- <a href="#pipeline-development">Build and orchestrate pipelines with AI</a>.
- <a href="#resource-management">Create and manage Harness resources</a>.
- <a href="#gitops-operations">Manage GitOps applications and resources</a>.

---

## Before you begin

Before you use the DevOps Agent, ensure you have the following:

- **Harness AI enabled**: Harness AI must be active for your account. Go to <a href="/docs/platform/harness-ai/overview#enable-ai" target="_blank">Overview</a> for more information on activating Harness AI.
- **Module access**: Access to the Harness modules you want to automate (CI, CD, IaCM, IDP, SCS, STO, DB DevOps, Chaos Engineering).
- **RBAC permissions**: Permission to create and manage pipelines, resources, and policies in your Harness project. Go to <a href="/docs/platform/role-based-access-control/rbac-in-harness" target="_blank">RBAC in Harness</a> for more information on permissions.

---

## Installation and setup

Enable the DevOps Agent directly within the Harness UI. No separate installation on an external tool or marketplace is required.

1. Navigate to **Account Settings** in the left navigation.
2. Under **General**, select <a href="/docs/platform/settings/default-settings" target="_blank">Default Settings</a>.
3. Find **Harness AI** and enable the **Harness AI** setting.
4. Optional: Enable **Allow Overrides** to let organizations and projects in the account optionally override this setting and disable the agent.

:::note
The DevOps Agent is only available via the Harness UI.
:::

---

## DevOps Agent capabilities

The DevOps Agent provides the following capabilities across pipeline development, resource management, and GitOps operations.

| **Capability** | **What You Can Do** |
|----------------|---------------------|
| **Step Management** | Create, edit, and organize individual steps within your pipelines |
| **Stage Configuration** | Modify and configure stages with schema validation |
| **Pipeline Orchestration** | Build and update pipelines across all Harness modules |
| **Multi-Module Pipelines** | Create pipelines for CI, CD, IaCM, IDP, SCS, STO, DB DevOps, and Chaos Engineering |
| **Policy Generation** | Generate and integrate OPA Rego policies for compliance |
| **Error Analyzer** | AI-powered root cause analysis with automated fix recommendations |
| **Pipeline Summarizer** | Generate natural language summaries of pipelines and executions |
| **Resource Management** | Create and update Services, Environments, Connectors, and Secrets |
| **GitOps Operations** | Manage 13 GitOps resource types including applications and ApplicationSets |

---

## Pipeline development

Use the DevOps Agent to build, configure, and troubleshoot your pipelines with natural language prompts.

### Step management

Create and edit individual steps within your pipelines through conversational AI.

The DevOps Agent enables you to:
- **Context-aware editing**: Edit steps based on your current pipeline configuration
- **Bulk changes**: Update numerous steps at once

### Stage configuration

Configure stages to logically group related steps in your pipelines.

The agent supports:
- Creating any stage type within a pipeline
- Creating any steps within the stage with schema validation
- Configuring advanced settings like failure strategy, conditional executions, and delegate selectors

### Pipeline orchestration

Manage your complete pipelines with intelligent creation and editing capabilities.

Features include:
- **Intelligent pipeline creation**: Automatically generate pipelines based on project context
- **Seamless editing**: Modify pipelines quickly to adapt to evolving requirements

<DocVideo src="https://www.loom.com/share/b07b9609119f4168b948739154d9a863?sid=d5fd1172-569f-4e59-b2dc-867b551ba108" title="Pipeline Generation Demo" />

---

### Multi-module pipeline creation

Create pipelines and stages across all Harness modules, enabling teams to build end-to-end workflows that span the entire software delivery lifecycle.

**Supported modules and stage types:**

| **Module** | **Description** |
|------------|-----------------|
| **CI (Continuous Integration)** | Build, test, and scan stages for continuous integration workflows |
| **CD (Continuous Delivery)** | Deployment stages with rollout strategies, approvals, and environment targeting |
| **IaCM (Infrastructure as Code Management)** | Infrastructure provisioning pipelines using Terraform and other IaC tools |
| **IDP (Internal Developer Portal)** | Pipelines for developer self-service workflows and automation |
| **SCS (Software Supply Chain Security)** | Supply chain security scanning and attestation stages |
| **STO (Security Testing Orchestration)** | Security testing stages including SAST, DAST, and SCA scans |
| **DB DevOps** | Database schema migration and change management stages |
| **Chaos Engineering** | Chaos experiment stages for resilience testing |
| **Custom** | Custom stages and steps for specialized workflows |

**IaCM pipeline creation:**

The DevOps Agent can create Infrastructure as Code Management (IaCM) pipelines that provision and manage infrastructure using Terraform and other IaC tools.

**Example prompts:**
- "Create an IACM Pipeline that provisions AWS Infrastructure with the IACM Steps."
- "Build a pipeline with an IACM stage to manage my Terraform workspace."
- "Create a pipeline that runs Terraform plan and apply for my cloud infrastructure."

**Cross-module pipeline examples:**
- "Create a pipeline with a CI stage to build my app, an STO stage to scan for vulnerabilities, and a CD stage to deploy to production."
- "Build a pipeline with a Chaos Engineering stage after deployment to validate resilience."
- "Create a pipeline with an IDP workflow stage to provision a new environment, then deploy my service to it."

---

### Policy generation and integration

Generate and integrate Open Policy Agent (OPA) Rego policies to maintain robust security and compliance postures.

The DevOps Agent enables you to:

| **Policy Feature** | **Description** |
|--------------------|-----------------|
| **Automated OPA Rego policy generation** | Generate OPA Rego policies automatically based on your defined compliance requirements |
| **Seamless policy integration** | Integrate generated policies into your existing workflows to ensure adherence to compliance standards |

This feature helps ensure that your pipelines adhere to industry standards and organizational compliance requirements.

---

### Error analyzer

Analyze pipeline failures with AI-powered root cause analysis, historical pattern matching, and automated fix recommendations.

Harness AI analyzes pipeline failures by correlating recent changes, examining dependencies, identifying historical patterns, and recommending specific fixes. Use this feature to quickly diagnose and resolve pipeline issues without manual debugging.

When a pipeline fails, Harness AI performs:
- **Change impact analysis**: Identifies recent pipeline modifications that may have caused the failure
- **Dependency checks**: Verifies the status of external infrastructure and services
- **Historical pattern matching**: Compares the failure against similar past failures
- **Root cause analysis**: Determines the specific step and command causing the issue
- **Automated recommendations**: Suggests prioritized action items with justifications

**Analyze a pipeline error:**

1. Navigate to the failed pipeline execution.
2. Select **Analyze Error**.
3. Review the analysis results in the Change Impact Correlation panel.

The analysis includes:
- Recent changes with timestamps and authors
- External dependency status
- Historical failure patterns with similarity scores
- Prioritized recommendations
- Impact assessment and risk level

Harness AI provides action items with:
- **Priority**: High, Medium, or Low urgency
- **Action**: Specific steps to resolve the issue
- **Justification**: Explanation of why the action is needed

Each recommendation targets a specific problem, such as:
- Removing intentional failure commands
- Replacing placeholder commands with actual build steps
- Implementing proper error handling

**Automatically fix pipeline YAML:**

1. In the analysis panel, select **Help me fix the pipeline yaml**.
2. Review the Pipeline Fix Summary showing:
   - Problem identified
   - Solution applied
   - Before and after YAML comparison
3. Examine the Updated Step YAML in the preview panel.
4. Select **Accept** to apply the changes to your pipeline.

**Use pipeline error analysis to:**
- Diagnose failures faster than manual log review
- Identify whether failures stem from code changes or infrastructure issues
- Learn from historical failure patterns across your organization
- Generate fixes for common pipeline configuration errors
- Assess the blast radius of pipeline failures

**View audit trail:**

To see the complete history of pipeline changes:

1. In the analysis panel, select **Show Me the Audit trail**.
2. Review the chronological list of pipeline modifications.

Use the audit trail to understand the sequence of changes leading to the failure.

---

### Pipeline summarizer

Generate detailed pipeline summaries by analyzing your pipeline configuration, execution history, and dependent resources.

Harness AI can generate natural language summaries to help you quickly understand what your pipelines do without manually reviewing each step.

The DevOps Agent analyzes:
- Pipeline configuration and steps
- Recent execution history
- Dependent resources (connectors, secrets, infrastructure)

Harness AI then generates a natural language summary explaining the pipeline's purpose, key steps, and outcomes.

**Generate a pipeline summary:**

1. Navigate to your pipeline in the Harness platform.
2. Select **AI Summarize** in the three dots menu.
3. Review the generated summary.

The summary appears in the pipeline details view and includes:
- Pipeline purpose and goals
- Key stages and steps
- Deployment targets and environments
- Recent execution patterns

**Use pipeline summaries to:**
- Onboard new team members to existing pipelines
- Document pipeline behavior for compliance
- Quickly understand inherited or legacy pipelines
- Review pipeline changes before approval

---

## Resource management

Create and manage Harness resources through conversational AI prompts.

### Service creation and update

Generate complete service definitions through conversational prompts. Describe your application requirements, and Harness AI creates a fully configured service with manifests, artifacts, and connectors.

Harness AI creates services by:
- **Understanding your requirements**: Analyzes your conversational input about application type, deployment needs, and infrastructure
- **Generating complete YAML**: Creates service definitions with all required components
- **Configuring manifests**: Sets up Kubernetes manifests, Helm charts, or other deployment configurations
- **Connecting artifacts**: Links to artifact registries with appropriate image references
- **Adding metadata**: Includes descriptions, tags, and identifiers for organization

**Create a service:**

1. Open the Harness AI assistant in your project.
2. Describe the service you want to create. For example:
   - "Create a Kubernetes service"
   - "Set up a service for my Node.js application"
   - "Generate a service for nginx deployment"
3. Review the generated service definition:
   - Service name and identifier
   - Service type (Kubernetes, ECS, etc.)
   - Manifest configuration
   - Artifact details
   - Connector references
4. Preview the complete YAML in the YAML Preview panel.
5. Select **Create** to add the service to your project.

**Use AI service creation to:**
- Quickly onboard new applications without manual YAML writing
- Standardize service configurations across projects
- Generate baseline configurations for customization
- Learn proper service structure through examples
- Migrate applications to Harness faster

**Best practices:**
- **Provide specific details**: More context leads to better configurations (for example, "Create a Kubernetes service for a Node.js API with 5 replicas")
- **Verify connector references**: Ensure referenced connectors exist in your project before creating the service
- **Update image tags**: Replace `latest` tags with specific versions for production services
- **Review resource settings**: Adjust CPU and memory limits based on actual application requirements
- **Add service variables**: Include environment-specific variables after creation
- **Use Git sync**: Store service definitions in Git for version control

---

### Connector creation and update

Create connectors with intelligent recommendations for authentication, permissions, and configuration. Describe what you want to connect, and Harness AI helps you set up secure, validated connections.

Harness AI creates connectors by:
- **Understanding connection requirements**: Analyzes your input about target infrastructure, cloud provider, or service
- **Recommending authentication methods**: Suggests secure authentication approaches (IAM roles, service accounts, API keys)
- **Guiding configuration**: Provides step-by-step setup with contextual help
- **Validating credentials**: Tests connections and identifies permission issues
- **Generating complete YAML**: Creates connector definitions with all required fields

**Connector details:**
- **Name**: Human-readable connector name
- **Identifier**: Unique connector identifier for API and service references
- **Type**: Connector category (Kubernetes, AWS, Docker Registry, Git, etc.)
- **Description**: Auto-generated description with creation timestamp

**Authentication configuration:**
- **Auth method**: Recommended authentication approach:
  - Service account tokens (Kubernetes)
  - IAM roles or access keys (AWS, Azure, GCP)
  - Username/password or personal access tokens (Git providers)
  - API keys (various services)
- **Credential references**: Links to Harness secrets for secure storage. Harness does not accept actual credentials when configuring a connector. Users must update the connector manually to provide secrets.
- **Permission recommendations**: Minimum required permissions for least-privilege access

---

### Environment creation and update

Generate complete environment definitions through conversational prompts. Describe your deployment target, and Harness AI creates a fully configured environment with infrastructure definitions and overrides.

Harness AI creates environments by:
- **Understanding deployment context**: Analyzes your input about environment purpose, infrastructure, and deployment stage
- **Generating complete YAML**: Creates environment definitions with infrastructure configurations
- **Configuring infrastructure definitions**: Sets up clusters, namespaces, regions, or resource groups
- **Setting environment type**: Classifies as Production or Pre-Production based on context
- **Adding metadata**: Includes descriptions, tags, and identifiers for organization

**Create an environment:**

1. Open the Harness AI assistant in your project.
2. Describe the environment you want to create. For example:
   - "Create a production Kubernetes environment"
   - "Set up a staging environment in AWS"
   - "Generate a dev environment for my GKE cluster"
3. Review the generated environment definition:
   - Environment name and identifier
   - Environment type (Production/Pre-Production)
   - Infrastructure definitions
   - Connector references
   - Service overrides
4. Preview the complete YAML in the YAML Preview panel.
5. Select **Create** to add the environment to your project.

**Environment details:**
- **Name**: Human-readable environment name (for example, `production`, `staging-us-east`)
- **Identifier**: Unique environment identifier for API and pipeline references
- **Type**: Production or Pre-Production classification
- **Description**: Auto-generated description with creation timestamp

**Use AI environment creation to:**
- Quickly set up deployment environments without manual YAML writing
- Replicate environment configurations across projects
- Generate baseline configurations for customization
- Create consistent dev/staging/prod environment structures
- Set up multi-region or multi-cluster deployments faster

---

### Secret creation and update

Create secret configurations by generating the secret object structure with proper naming, scope, and metadata. After AI creates the secret object, you provide the actual secret value manually in the Harness UI for security.

Harness AI creates secret configurations by:
- **Understanding secret requirements**: Analyzes your input about what credentials or sensitive data you need to store
- **Recommending secret types**: Suggests text secrets, file secrets, or SSH keys based on your use case
- **Generating secret metadata**: Creates the secret object with name, description, and scope
- **Setting up references**: Configures the secret for use in connectors, pipelines, and services
- **Guiding value entry**: Directs you to provide the actual secret value securely

:::note Important
For security reasons, Harness AI creates the secret object structure but cannot and will not generate actual secret values. After AI creates the secret, you must provide the real credential, token, password, or sensitive data through the Harness UI. This ensures your sensitive information remains secure and under your control.
:::

**Create a secret:**

1. Open the Harness AI assistant in your project or account settings.
2. Describe the secret you need to create. For example:
   - "Create a secret for my Docker Hub password"
   - "Set up a secret for GitHub personal access token"
   - "Add a secret for AWS access key"
   - "Create an SSH key secret for deployment"
3. Review the generated secret configuration:
   - Secret name and identifier
   - Secret type (Text, File, SSH Key)
   - Scope (Project, Organization, Account)
   - Description and tags
4. Preview the configuration in the YAML Preview panel.
5. Select **Create** to generate the secret object.
6. **Immediately provide the secret value** in the prompt that appears.
7. Select **Save** to store the secret securely.

Harness AI generates identifiers following these patterns:
- **Secret name**: Descriptive name indicating purpose (for example, `docker_hub_password`, `github_pat`)
- **Identifier**: Converts name to lowercase with underscores (for example, `docker_hub_password`)
- **Description**: Explains what the secret is for (for example, "Docker Hub authentication password for nginx images")

**Use AI secret creation to:**
- Quickly set up credential storage with proper naming
- Standardize secret naming across projects
- Create secrets at the appropriate scope level
- Generate metadata for compliance and audit trails
- Organize secrets with consistent tagging

---

## GitOps operations

The Harness AI DevOps Agent provides full operational control over your Harness GitOps environment through natural language.

The DevOps Agent covers 13 resource types and approximately 25 operations spanning agents, applications, clusters, repositories, ApplicationSets, credentials, events, logs, managed resources, resource actions, dashboards, resource trees, and cluster-environment linking.

Instead of navigating dashboards to check application health or manually initiating syncs, describe what you need in plain language. The DevOps Agent queries your GitOps data, triggers operations, and generates pipeline snippets for GitOps workflows.

### Supported resource types

The following table lists all GitOps resource types you can interact with through the DevOps Agent.

| Resource type | Description | Available operations |
|---------------|-------------|----------------------|
| **GitOps Agent** | An Argo CD agent installed in a Kubernetes cluster. Agents can be scoped at account, org, or project level. | List, Get |
| **Application** | An Argo CD application managed by an agent. | List, Get, Create, Update, Sync, Bulk Sync, Refresh, Cancel Operation, Run Resource Action |
| **Cluster** | A Kubernetes cluster registered with a GitOps agent. | List, Get |
| **Repository** | A Git repository registered with a GitOps agent. | List, Get |
| **ApplicationSet** | A template that auto-generates multiple applications from generators. Supports list, git, clusters, matrix, merge, pullRequest, scmProvider, and plugin generator types. | List, Get, Create, Update |
| **Repository Credential** | Repository credentials (SSH keys, tokens) for GitOps agents. | List, Get |
| **Application Events** | Kubernetes events emitted by a GitOps application (sync events, health changes). | List |
| **Pod Logs** | Container logs from pods in a GitOps application's workloads. | Get |
| **Managed Resources** | Kubernetes resources (Deployments, Services, ConfigMaps, and so on) tracked by a GitOps application. | List |
| **Resource Actions** | Available actions (restart, pause, resume, and so on) for a specific Kubernetes resource within a GitOps application. | List |
| **Dashboard** | High-level summary metrics including total apps, healthy/degraded counts, and sync status breakdown. | Get |
| **Resource Tree** | The full Kubernetes resource tree for an application, showing all resources and parent-child relationships. | Get |
| **Cluster-Environment Link** | Links between GitOps clusters and Harness environments. | List, Create, Delete |

---

### Application operations

Applications support the broadest set of operations.

| Operation | Description |
|-----------|-------------|
| **List / Get** | List all applications in a project or get details of a specific application |
| **Create** | Create a new GitOps application with a source repo, target cluster, and sync policy |
| **Update** | Change an application's source repo, target branch, destination cluster, or other settings. Linking a service or environment to an application is also handled through update. |
| **Sync** | Deploy the latest changes from Git to the cluster for a single application |
| **Bulk sync** | Sync multiple applications in parallel |
| **Refresh** | Force Argo CD to re-check Git and compare with the live cluster state. Supports normal and hard refresh. |
| **Cancel operation** | Stop a currently running sync or rollback that is stuck or unwanted |
| **Run resource action** | Perform actions on Kubernetes resources managed by the application |

---

### ApplicationSet operations

ApplicationSets use generators to automatically create multiple applications from a single template. The DevOps Agent supports 8 generator types.

The DevOps Agent supports 8 generator types: list, git, clusters, matrix, merge, pullRequest, scmProvider, and plugin.

| Operation | Description |
|-----------|-------------|
| **List / Get** | List ApplicationSets or get details of a specific ApplicationSet by UUID |
| **Create** | Create an ApplicationSet with any supported generator type |
| **Update** | Modify an ApplicationSet's generators, template, or sync policy |

**Example prompts:**
- "Create an ApplicationSet using a list generator with dev, staging, and prod environments."
- "Create an ApplicationSet using a git directory generator scanning all folders in my repo."
- "Create a matrix ApplicationSet combining environments (list) and directories (git)."
- "Create a clusters ApplicationSet that deploys to all registered clusters."

---

### Kubernetes resource actions

Perform actions directly on Kubernetes resources managed by your GitOps applications. You can first discover what actions are available for a specific resource, then execute them.

**Supported actions:**
- **Deployments**: restart, pause, resume, scale
- **Argo Rollouts**: restart, pause, resume, promote-full, abort, retry, skip-current-step

**Example prompts:**
- "What actions can I run on the web Deployment in app my-app?"
- "Restart the web Deployment in app my-app."

---

### Inspect and troubleshoot

The DevOps Agent can retrieve detailed information for troubleshooting GitOps applications.

**Available capabilities:**
- **Events**: View Kubernetes events for an application (sync events, health changes)
- **Pod logs**: Stream logs from specific containers in an application's workloads
- **Managed resources**: List all Kubernetes resources tracked by an application
- **Resource tree**: View the full resource hierarchy (Deployment, ReplicaSet, Pod, Service, and so on) with parent-child relationships
- **Dashboard**: Get a high-level summary of your GitOps environment, including total app counts, health status, and sync status breakdown

**Example prompts:**
- "Show recent events for app my-app."
- "Get the last 100 lines of logs from pod web-abc123 in app my-app."
- "What Kubernetes resources does app my-app manage?"
- "Show the resource tree for app guestbook."
- "How many GitOps apps are healthy vs degraded?"

---

### Query status and health

Ask the DevOps Agent questions about your GitOps environment in natural language. The agent queries across agents, applications, ApplicationSets, clusters, repositories, and the dashboard to answer.

**Example prompts:**
- "What applications are out of sync? How long have they been out of sync? Which project are the out-of-sync applications in?"
- "What syncs failed in the past 24 hours?"
- "Which applications are unhealthy in the production environment?"
- "List all healthy GitOps agents at account level."
- "List all clusters registered at account level."
- "What clusters are linked to environment prod?"

---

### Trigger operations from chat

You can initiate GitOps operations directly from the AI chat.

**Example prompts:**
- "Sync the app my-app with pruning enabled."
- "Bulk sync apps app1 and app2."
- "Hard refresh all apps on my agent."
- "Cancel the running sync on app my-app."
- "Initiate a sync for all applications that manage non-prod services."
- "Link cluster incluster to environment staging."

---

## Next steps

- <a href="/docs/platform/harness-ai/core-capabilities/#data-storage-and-privacy-policies" target="_blank">Core Capabilities Overview</a>: Data storage and privacy policies.
- <a href="/docs/platform/harness-ai/core-capabilities/in-your-pipelines/worker-agent/" target="_blank">Worker Agents</a>: Run autonomous AI agents inside pipeline steps.
- <a href="/docs/platform/harness-ai/model-connector" target="_blank">Choose Model Connector</a>: Configure model providers for Worker Agents.