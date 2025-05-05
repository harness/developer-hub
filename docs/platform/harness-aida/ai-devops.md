---
title: Harness AI DevOps Agent
description: Harness AI DevOps Agent unlock your pipeline productivity
sidebar_position: 53
---
# Harness AI DevOps Agent Documentation

The **Harness AI DevOps Agent** streamlines your DevOps processes by enabling you to create and edit steps, stages, and pipelines with ease. Leveraging the power of Large Language Models, the agent provides intelligent suggestions, automates repetitive tasks, and now generates and integrates OPA Rego policies to help you meet your compliance standards.

:::info AI Models

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
The DevOps Agent is available via the Harness UI only
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

- Creating any stage type on the pipeline
- Creates any steps within the stage with schema validation
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

### Video Demo

<DocVideo src="https://www.loom.com/share/b07b9609119f4168b948739154d9a863?sid=d5fd1172-569f-4e59-b2dc-867b551ba108" title="AI DevOps Agent Demo" />