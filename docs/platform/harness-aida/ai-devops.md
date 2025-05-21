---
title: Harness AI DevOps Agent
description: Harness AI DevOps Agent unlocks your pipeline productivity.
sidebar_position: 53
---
# Harness AI DevOps Agent

The **Harness AI DevOps Agent** streamlines your DevOps processes by enabling you to create and edit steps, stages, and pipelines with ease. Leveraging the power of large language models, the agent provides intelligent suggestions, automates repetitive tasks, and now generates and integrates OPA Rego policies to help you meet your compliance standards.

:::note AI Models

The AI DevOps Agents use the following AI models to facilitate your DevOps tasks:

- DevOps Agent: Claude 3.7 Sonnet
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
| **Pipeline Orchestration**             | Build and update your pipelines.                                 |
| **Policy Generation and Integration**  | Generate and integrate Open Policy Agent (OPA) Rego policies to meet your compliance standards.                        |

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

### Policy Generation and Integration

The Harness AI DevOps Agent also enhances compliance by generating and integrating policies. This capability allows you to:

| **Policy Feature**                        | **Description**                                                                                             |
|-------------------------------------------|-------------------------------------------------------------------------------------------------------------|
| **Automated OPA Rego Policy Generation**  | Generate Open Policy Agent (OPA) Rego policies automatically based on your defined compliance requirements.  |
| **Seamless Policy Integration**           | Integrate generated policies into your existing workflows to ensure adherence to compliance standards.      |

This feature helps maintain robust security and compliance postures by ensuring that your pipelines adhere to industry standards.

### Error Analyzer

The Harness Error Analyzer feature helps developers identify the root cause of issues and provides remediation guidance on how to fix them. By analyzing pipeline logs and the Harness pipeline context, it is able to process and interpret relevant information.
    - Troubleshoot your pipeline errors
    - Receive proposed fixes for your pipeline errors

#### Error Analyzer Demo

For a demo of the error analyzer, see the following:

<DocVideo src="https://www.loom.com/share/f4ae8141f74c4b8f9e80b174acaee7d2?sid=73a0dd74-0a5e-4fd5-9f5c-b776d2985604" />

### Video Demo

<DocVideo src="https://www.loom.com/share/b07b9609119f4168b948739154d9a863?sid=d5fd1172-569f-4e59-b2dc-867b551ba108" title="AI DevOps Agent Demo" />

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