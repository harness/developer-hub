---
title: Harness AI DevOps Agent
description: Harness AI DevOps Agent unlocks your pipeline productivity.
sidebar_label: DevOps Agent
sidebar_position: 8
---
# Harness AI DevOps Agent

The **Harness AI DevOps Agent** streamlines your DevOps processes by enabling you to create and edit steps, stages, and pipelines with ease. Leveraging the power of large language models, the agent provides intelligent suggestions, automates repetitive tasks, and now generates and integrates OPA Rego policies to help you meet your compliance standards.

:::note AI Models

The AI DevOps Agents use the following AI models to facilitate your DevOps tasks:

- DevOps Agent: Claude 4.0 Sonnet
- Support Agent: OpenAI GPT-4o
- OPA Agent: OpenAI GPT-4o
- Error Analyzer: OpenAI GPT-4o

:::

## Installation and Setup

The Harness AI DevOps Agent is enabled directly within the Harness UI—no separate installation on an external tool or marketplace is required. Follow these steps to activate the agent:

1. Select **Account Settings** in the left nav. 
2. Under **General**, select [**Default Settings**](/docs/platform/settings/default-settings).
3. Find **Harness AI** and enable the **Harness AI** setting. 
4. Optionally, enable **Allow Overrides**. This will allow orgs and projects in the account to optionally override this setting and disable the agent.

:::note
The DevOps Agent is only available via the Harness UI.
:::

## Using Harness AI DevOps Agent: Main Features

Once authenticated, you can leverage the agent’s capabilities to manage your DevOps workflows. The key features include:

| **Feature**                            | **Description**                                                                                                       |
|----------------------------------------|-----------------------------------------------------------------------------------------------------------------------|
| **Step Management**                    | Create, edit, and organize individual steps within your pipelines.                                                   |
| **Stage Configuration**                | Modify and configure your stages.                                              |
| **Pipeline Orchestration**             | Build and update your pipelines across all Harness modules.                                 |
| **Multi-Module Pipeline Creation**     | Create pipelines for CI, CD, IACM, IDP, SCS, STO, DB DevOps, and Chaos Engineering modules.                          |
| **Resource Creation**                  | Create and update Services, Environments, Connectors, and Secrets through conversational prompts.                     |
| **Policy Generation and Integration**  | Generate and integrate Open Policy Agent (OPA) Rego policies to meet your compliance standards.                        |
| **Error Analyzer**                     | AI-powered root cause analysis for pipeline failures with automated fix recommendations.                              |
| **Pipeline Summarizer**               | Generate natural language summaries of pipelines, executions, and dependent resources.                                |

### Step Management

Harness AI DevOps Agent enables you to create new steps or edit existing ones.

- **Context-Aware Editing:** Edit steps based on your current pipeline configuration.
- **Bulk changes:** Update numerous steps at once. 

### Stage Configuration

Configure stages to logically group related steps in your pipelines. The agent supports:

- Creating any stage type within a pipeline.
- Creating any steps within the stage with schema validation.
- Configuring advanced settings like failure strategy, conditional executions, and delegate selectors.

### Pipeline Orchestration

Manage your complete pipelines with features including:

- **Intelligent Pipeline Creation:** Automatically generate pipelines based on project context.
- **Seamless Editing:** Modify pipelines quickly to adapt to evolving requirements.


#### Pipeline Generation Demo

For a demo of the Harness DevOps Agent generating pipelines, see the following:

<DocVideo src="https://www.loom.com/share/b07b9609119f4168b948739154d9a863?sid=d5fd1172-569f-4e59-b2dc-867b551ba108" title="AI DevOps Agent Demo" />

### Multi-Module Pipeline Creation

The Harness AI DevOps Agent supports creating pipelines and stages across all Harness modules, enabling teams to build end-to-end workflows that span the entire software delivery lifecycle.

**Supported modules and stage types:**

| **Module** | **Description** |
|------------|-----------------|
| **CI (Continuous Integration)** | Build, test, and scan stages for continuous integration workflows. |
| **CD (Continuous Delivery)** | Deployment stages with rollout strategies, approvals, and environment targeting. |
| **IACM (Infrastructure as Code Management)** | Infrastructure provisioning pipelines using Terraform and other IaC tools. |
| **IDP (Internal Developer Portal)** | Pipelines for developer self-service workflows and automation. |
| **SCS (Software Supply Chain Security)** | Supply chain security scanning and attestation stages. |
| **STO (Security Testing Orchestration)** | Security testing stages including SAST, DAST, and SCA scans. |
| **DB DevOps** | Database schema migration and change management stages. |
| **Chaos Engineering** | Chaos experiment stages for resilience testing. |
| **Custom** | Custom stages and steps for specialized workflows. |

#### IACM Pipeline Creation

The DevOps Agent can create Infrastructure as Code Management (IACM) pipelines that provision and manage infrastructure using Terraform and other IaC tools. This enables teams to automate infrastructure provisioning directly through conversational prompts.

**Example prompts:**

- "Create an IACM Pipeline that provisions AWS Infrastructure with the IACM Steps."
- "Build a pipeline with an IACM stage to manage my Terraform workspace."
- "Create a pipeline that runs Terraform plan and apply for my cloud infrastructure."

#### Cross-Module Pipeline Examples

You can combine stages from multiple modules in a single pipeline:

- "Create a pipeline with a CI stage to build my app, an STO stage to scan for vulnerabilities, and a CD stage to deploy to production."
- "Build a pipeline with a Chaos Engineering stage after deployment to validate resilience."
- "Create a pipeline with an IDP workflow stage to provision a new environment, then deploy my service to it."

### Policy Generation and Integration

The Harness AI DevOps Agent also enhances compliance by generating and integrating policies. This capability allows you to:

| **Policy Feature**                        | **Description**                                                                                             |
|-------------------------------------------|-------------------------------------------------------------------------------------------------------------|
| **Automated OPA Rego Policy Generation**  | Generate Open Policy Agent (OPA) Rego policies automatically based on your defined compliance requirements.  |
| **Seamless Policy Integration**           | Integrate generated policies into your existing workflows to ensure adherence to compliance standards.      |

This feature helps maintain robust security and compliance postures by ensuring that your pipelines adhere to industry standards.

### Error Analyzer

Harness AI analyzes pipeline failures by correlating recent changes, examining dependencies, identifying historical patterns, and recommending specific fixes. Use this feature to quickly diagnose and resolve pipeline issues without manual debugging.

When a pipeline fails, Harness AI performs:

- **Change impact analysis** - Identifies recent pipeline modifications that may have caused the failure
- **Dependency checks** - Verifies the status of external infrastructure and services
- **Historical pattern matching** - Compares the failure against similar past failures
- **Root cause analysis** - Determines the specific step and command causing the issue
- **Automated recommendations** - Suggests prioritized action items with justifications

**Analyze a pipeline error**

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

- **Priority** - High, Medium, or Low urgency
- **Action** - Specific steps to resolve the issue
- **Justification** - Explanation of why the action is needed

Each recommendation targets a specific problem, such as:

- Removing intentional failure commands
- Replacing placeholder commands with actual build steps
- Implementing proper error handling

Automatically fix pipeline YAML:

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

**View audit trail**

To see the complete history of pipeline changes:

1. In the analysis panel, select **Show Me the Audit trail**.
2. Review the chronological list of pipeline modifications.

Use the audit trail to understand the sequence of changes leading to the failure.


### Service Creation and Update

Harness AI generates complete service definitions through conversational prompts. Describe your application requirements, and Harness AI creates a fully configured service with manifests, artifacts, and connectors.

Harness AI creates services by:

- **Understanding your requirements** - Analyzes your conversational input about application type, deployment needs, and infrastructure
- **Generating complete YAML** - Creates service definitions with all required components
- **Configuring manifests** - Sets up Kubernetes manifests, Helm charts, or other deployment configurations
- **Connecting artifacts** - Links to artifact registries with appropriate image references
- **Adding metadata** - Includes descriptions, tags, and identifiers for organization

**Create a service**

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

Use AI service creation to:

- Quickly onboard new applications without manual YAML writing
- Standardize service configurations across projects
- Generate baseline configurations for customization
- Learn proper service structure through examples
- Migrate applications to Harness faster

#### Best practices

- **Provide specific details** - More context leads to better configurations (for example, "Create a Kubernetes service for a Node.js API with 5 replicas")
- **Verify connector references** - Ensure referenced connectors exist in your project before creating the service
- **Update image tags** - Replace `latest` tags with specific versions for production services
- **Review resource settings** - Adjust CPU and memory limits based on actual application requirements
- **Add service variables** - Include environment-specific variables after creation
- **Use Git sync** - Store service definitions in Git for version control



### Connector Creation and Update

Harness AI guides you through connector creation with intelligent recommendations for authentication, permissions, and configuration. Describe what you want to connect, and Harness AI helps you set up secure, validated connections.

Harness AI creates connectors by:

- **Understanding connection requirements** - Analyzes your input about target infrastructure, cloud provider, or service
- **Recommending authentication methods** - Suggests secure authentication approaches (IAM roles, service accounts, API keys)
- **Guiding configuration** - Provides step-by-step setup with contextual help
- **Validating credentials** - Tests connections and identifies permission issues
- **Generating complete YAML** - Creates connector definitions with all required fields

**Connector details**
- **Name** - Human-readable connector name
- **Identifier** - Unique connector identifier for API and service references
- **Type** - Connector category (Kubernetes, AWS, Docker Registry, Git, etc.)
- **Description** - Auto-generated description with creation timestamp

**Authentication configuration**
- **Auth method** - Recommended authentication approach:
  - Service account tokens (Kubernetes)
  - IAM roles or access keys (AWS, Azure, GCP)
  - Username/password or personal access tokens (Git providers)
  - API keys (various services)
- **Credential references** - Links to Harness secrets for secure storage. Harness doesn't accept any actual credentials when configuring a connector. Users will need to update the connector manually to provide secret.
- **Permission recommendations** - Minimum required permissions for least-privilege access

### Environment Creation and Update

Harness AI generates complete environment definitions through conversational prompts. Describe your deployment target, and Harness AI creates a fully configured environment with infrastructure definitions and overrides.


Harness AI creates environments by:

- **Understanding deployment context** - Analyzes your input about environment purpose, infrastructure, and deployment stage
- **Generating complete YAML** - Creates environment definitions with infrastructure configurations
- **Configuring infrastructure definitions** - Sets up clusters, namespaces, regions, or resource groups
- **Setting environment type** - Classifies as Production or Pre-Production based on context
- **Adding metadata** - Includes descriptions, tags, and identifiers for organization

**Create Environment**

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

Environment details
- **Name** - Human-readable environment name (for example, `production`, `staging-us-east`)
- **Identifier** - Unique environment identifier for API and pipeline references
- **Type** - Production or Pre-Production classification
- **Description** - Auto-generated description with creation timestamp

Use AI environment creation to:

- Quickly set up deployment environments without manual YAML writing
- Replicate environment configurations across projects
- Generate baseline configurations for customization
- Create consistent dev/staging/prod environment structures
- Set up multi-region or multi-cluster deployments faster

### Secret Creation and Update

Harness AI helps you create secret configurations by generating the secret object structure with proper naming, scope, and metadata. After AI creates the secret object, you provide the actual secret value manually in the Harness UI for security.

Harness AI creates secret configurations by:

- **Understanding secret requirements** - Analyzes your input about what credentials or sensitive data you need to store
- **Recommending secret types** - Suggests text secrets, file secrets, or SSH keys based on your use case
- **Generating secret metadata** - Creates the secret object with name, description, and scope
- **Setting up references** - Configures the secret for use in connectors, pipelines, and services
- **Guiding value entry** - Directs you to provide the actual secret value securely

For security reasons, Harness AI creates the secret object structure but **cannot and will not generate actual secret values**. After AI creates the secret, you must provide the real credential, token, password, or sensitive data through the Harness UI. This ensures your sensitive information remains secure and under your control.

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

- **Secret name** - Descriptive name indicating purpose (for example, `docker_hub_password`, `github_pat`)
- **Identifier** - Converts name to lowercase with underscores (for example, `docker_hub_password`)
- **Description** - Explains what the secret is for (for example, "Docker Hub authentication password for nginx images")

Use AI secret creation to:

- Quickly set up credential storage with proper naming
- Standardize secret naming across projects
- Create secrets at the appropriate scope level
- Generate metadata for compliance and audit trails
- Organize secrets with consistent tagging



#### Pipeline Summarizer

Harness AI can generate detailed pipeline summaries by analyzing your pipeline, its executions, and dependent resources. Use these summaries to quickly understand what your pipelines do without manually reviewing each step.

The DevOps Agent analyzes:

- Pipeline configuration and steps
- Recent execution history
- Dependent resources (connectors, secrets, infrastructure)

Harness AI then generates a natural language summary explaining the pipeline's purpose, key steps, and outcomes.

1. Navigate to your pipeline in the Harness platform.
2. Select **AI Summarize** in the 3 dots menu
3. Review the generated summary.

The summary appears in the pipeline details view and includes:

- Pipeline purpose and goals
- Key stages and steps
- Deployment targets and environments
- Recent execution patterns

**Use Cases**

Use pipeline summaries to:

- Onboard new team members to existing pipelines
- Document pipeline behavior for compliance
- Quickly understand inherited or legacy pipelines
- Review pipeline changes before approval

## Data Storage and Privacy Policies

Harness AI is designed with strict data privacy and security principles. This section explains what data is used, how it is handled, and how it is discarded when you interact with the DevOps Agent or any AI-powered features in Harness. No configuration is necessary to ensure your privacy since Harness applies strict privacy defaults:

- Training is disabled across all AI integrations.
- Data is not persisted or exposed to model providers beyond inference.
- Fallback mechanisms are used only when necessary and are compliant with strict retention policies.

This section discusses these policies in greater detail. 

### Data Privacy and Subscription Terms

For a full legal breakdown of AI privacy at Harness, see: [AI Data Privacy](https://www.harness.io/legal/harness-ai-data-privacy) & [Subscription Terms 2025](https://www.harness.io/legal/subscription-terms-2025).

### No Data Use

Harness AI processes real-time user input and relevant context (e.g., pipeline metadata or error logs) to generate responses. This data is not stored, not logged, and never used for training by Harness or its model providers.

### Minimum Data Retention

Data discard behavior depends on the underlying AI provider:

| **Provider**           | **Model**        | **Discard Mechanism**              | **Retention** | **Used for Training?** |
| ---------------------- | ---------------- | ---------------------------------- | ------------- | ---------------------- |
| Google Vertex AI       | Claude 3.7       | Immediately purged after inference | 0 days        | No                     |
| OpenAI (fallback only) | GPT-4o           | Retained for 30 days, then purged  | 30 days       | No (Harness opts out)  |

### Failover/Fallback Scenarios

In rare scenarios (e.g., outage or capacity limits), Harness AI may fall back to OpenAI APIs:

- OpenAI may retain the data for 30 days.
- Harness does not permit OpenAI to train on this data.
- After 30 days, the data is automatically purged.

### No Anonymization/Tokenization Required

No anonymization or tokenization is needed because:

- Data is not stored or used for analytics or training.
- All processing is done in ephemeral memory.
- Discard mechanisms are managed by the underlying model providers.

## FAQs

### Is this available for SMP customers?

No, Harness AI is not available for SMP.

### Who is the AI DevOps Agent available to?

Enterprise Licenses (including Dev360, Service, SI, Users) are entitled to AI DevOps free of charge. Any module that has access to pipelines will be entitled to AI DevOps - not just CI or CD. This includes all Harness modules except for CCM. The scope of the AI DevOps Agent will be restricted to the license you have. For example, a CI-only customer cannot create a CD stage.

### Where can I submit feedback?

Please submit feedback by emailing [Harness Support](mailto:support@harness.io) or through the UI by clicking **Help** in the bottom left corner then **Give us feedback**.
