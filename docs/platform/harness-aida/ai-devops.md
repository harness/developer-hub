---
title: Harness AI DevOps Agent
description: Harness AI DevOps Agent unlock your pipeline productivity
sidebar_position: 53
---
# Harness AI DevOps Agent Documentation

The **Harness AI DevOps Agent** streamlines your DevOps processes by enabling you to create and edit steps, stages, and pipelines with ease. Leveraging the power of Large Language Models, the agent provides intelligent suggestions, automates repetitive tasks, and now generates and integrates OPA Rego policies to help you meet your compliance standards.


## Installation and Setup

The Harness AI DevOps Agent is enabled directly within the Harness UI—no separate installation on an external tool or marketplace is required. Follow these steps to activate the agent:

| **Step** | **Instruction** | **Screenshot/Note** |
|----------|-----------------|---------------------|
| **1**    | Navigate to the **Default Settings** page at the account level in the Harness UI. | *[Harness UI]* |
| **2**    | Locate and enable the **Harness AI Setting**. | *[Enable setting screenshot placeholder]* |
| **3**    | Once enabled, the DevOps Agent becomes active and ready for use. | |

> **Note:** The DevOps Agent is available via the Harness UI only

---

## Authentication

After enabling the agent in the Harness UI, you must authenticate your Harness account to access the agent’s capabilities. To authenticate:

1. Log in to your Harness account through the Harness UI.
2. Make sure the setting is enabled, Harness AI will operate on your behalf and your user credential.



---

## Using Harness AI DevOps Agent: Main Features

Once authenticated, you can leverage the agent’s capabilities to manage your DevOps workflows. The key features include:

| **Feature**                            | **Description**                                                                                                       |
|----------------------------------------|-----------------------------------------------------------------------------------------------------------------------|
| **Step Management**                    | Create, edit, and organize individual steps within your pipelines.                                                   |
| **Stage Configuration**                | Modify and configure your stages.                                              |
| **Pipeline Orchestration**             | Build and update your pipelines.                                 |
| **Continuous Integration (CI) Support**| Automatically generate, validate, and optimize CI pipelines using intelligent insights.                              |
| **Policy Generation and Integration**  | Generate and integrate Open Policy Agent (OPA) Rego policies to meet your compliance standards.                        |

---

### Step Management

Harness AI DevOps Agent enables you to create new steps or edit existing ones.

- **Context-Aware Editing:** Edit steps based on your current pipeline configuration.
- **Bulk changes:** Update numerous steps at once. 


---

### Stage Configuration

Configure stages to logically group related steps in your pipelines. The agent supports:

- Creating any stage type on the pipeline
- Creates any steps within the stage with schema validation
- Configuring advanced settings like failure strategy, conditional executions, and delegate selectors.

![Configuring stages within a pipeline](./static/devops_stages.png)

---

### Pipeline Orchestration

Manage your complete pipelines with features including:

- **Intelligent Pipeline Creation:** Automatically generate pipelines based on project context.
- **Seamless Editing:** Modify pipelines quickly to adapt to evolving requirements.


---

### Continuous Integration (CI) & Continuous Deployment (CD) Support

In addition to managing pipelines, the Harness AI DevOps Agent extends its capabilities to Continuous Integration (CI) & CD. Drawing from the features detailed in the [Harness AIDA RCA documentation](https://developer.harness.io/docs/platform/harness-aida/aida-ci) :contentReference[oaicite:0]{index=0}, the agent provides:

| **CI & CD Feature**                         | **Description**                                                                                             |
|----------------------------------------|-------------------------------------------------------------------------------------------------------------|
| **Automated CI & CD Pipeline Generation**   | Automatically generate and configure CI pipelines based on your project’s context and best practices.       |
| **Pipeline Failure and Suggested Remediation **      | Get help fixing your pipeline failures with Harness RCA.             |


---

### Policy Generation and Integration

The Harness AI DevOps Agent also enhances compliance by generating and integrating policies. This capability allows you to:

| **Policy Feature**                        | **Description**                                                                                             |
|-------------------------------------------|-------------------------------------------------------------------------------------------------------------|
| **Automated OPA Rego Policy Generation**  | Generate Open Policy Agent (OPA) Rego policies automatically based on your defined compliance requirements.  |
| **Seamless Policy Integration**           | Integrate generated policies into your existing workflows to ensure adherence to compliance standards.      |

This feature helps maintain robust security and compliance postures by ensuring that your pipelines adhere to industry standards.

---
