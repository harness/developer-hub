---
title: AWS Agent Core overview
sidebar_label: Overview
description: Deploy AI agents to Amazon Bedrock AgentCore through the Harness CD service, environment, and pipeline model.
sidebar_position: 1
keywords:
  - aws agent core
  - bedrock agentcore
  - ai agent deployment
tags:
  - continuous-delivery
  - ai-agents
  - agent-deployments
---

import DocImage from '@site/src/components/DocImage';

AWS Agent Core is the Amazon Bedrock AgentCore runtime, a secure, serverless runtime purpose-built for deploying and scaling AI agents. It runs each agent session in an isolated container, supports any framework such as CrewAI, LangGraph, LlamaIndex, Google ADK, OpenAI Agents SDK, and Strands Agents, and works with any foundation model, without infrastructure to manage. To understand the runtime itself, go to [What is Amazon Bedrock AgentCore](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/what-is-bedrock-agentcore.html) and [AgentCore Runtime](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/agents-tools-runtime.html).

Harness CD deploys an agent to AWS Agent Core as a first-class deployment type, using the same service, environment, infrastructure, and execution model that every other CD deployment uses.

:::note

Agent deployments are behind the feature flag `CDS_AGENT_RUNTIME_DEPLOYMENT`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

:::

---

## Why deploy through Harness

Teams often ship agents to AWS Agent Core with hand-written scripts or the AgentCore CLI, run outside their delivery pipeline. That approach has no shared deployment history, no approval gates, no canary rollout, and no rollback, and it cannot apply Harness RBAC, secrets management, or OPA policies to the agent workload.

Deploying through Harness closes that gap. The agent becomes a Harness entity, so it inherits governance, audit trails, canary traffic shifting, and rollback alongside your services on Kubernetes, ECS, Lambda, and every other supported platform. You point Harness at the agent image, describe the AWS target once, and every deployment runs through the same reviewed pipeline.

---

## What will you learn?

This section covers everything you need to deploy an agent to AWS Agent Core through a Harness pipeline. You will learn how to:

- Register an agent service that points at your agent container image and execution role.
- Configure an environment with an AWS Agent Core infrastructure definition.
- Build a pipeline with a canary execution that deploys the agent and shifts traffic to the new revision.

---

## What is supported

This release deploys a pre-built container image to AWS Agent Core. The runtime pulls the agent image from Amazon ECR at deploy time. The canary deployment strategy is supported through the deploy and traffic-shift steps, with rollback that reverts traffic to the previous revision. Weighted traffic shifting requires an AgentCore Gateway on the infrastructure definition.

---

## Before you begin

- **Harness account with agent deployments enabled:** When the feature is enabled, **Agent Services** appears in the left navigation of the **Continuous Delivery & GitOps** module. For how to access or create a Harness account, go to [Getting started with Harness Platform](/docs/platform/get-started/onboarding-guide) to set up access.

    :::info Contact Harness support:

    If **Agent Services** does not appear, contact your account administrator or [Harness Support](mailto:support@harness.io) to enable `CDS_AGENT_RUNTIME_DEPLOYMENT`.

    :::

- **An agent container image:** Your agent must be packaged as a container image in an Amazon ECR repository that AgentCore can pull from.
- **An AWS connector:** You need an AWS connector with permission to deploy to AgentCore. Go to [AWS connector settings reference](/docs/platform/connectors/cloud-providers/ref-cloud-providers/aws-connector-settings-reference) to create one.
- **A Kubernetes connector for the step group:** The deploy, traffic shift, and rollback steps run as container steps on a Kubernetes cluster, so you need a connector for the cluster that runs them.
- **Pipeline and entity permissions:** You need **View** and **Create/Edit** for [Services](/docs/platform/role-based-access-control/permissions-reference) and [Environments](/docs/platform/role-based-access-control/permissions-reference), and **View**, **Create/Edit**, and **Execute** for [Pipelines](/docs/platform/role-based-access-control/permissions-reference#pipelines). To get these, an administrator must assign you a role that includes them. Go to [RBAC in Harness](/docs/platform/role-based-access-control/rbac-in-harness) to understand roles.

---

## Create a deploy stage

To deploy an agent, create a pipeline and add a **Deploy** stage. Under **Deployment Type**, select **AI Agent Services**. This deployment type unlocks the agent service, the AWS Agent Core infrastructure, and the agent deploy, traffic-shift, and rollback steps.

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/deployment-type.png')} width="50%" height="50%" alt="Stage deployment type selection with AI Agent Services selected" title="Click to view full size" />
</div>

After you select the deployment type, configure the stage in three steps: register the agent service, set up the environment, and build the canary execution.

---

## Next steps

Configure the stage in the following order. Each page walks you through one part of the deployment.

- **[Agent service](/docs/continuous-delivery/ai-agent-deployments/aws-agent-core/agent-service):** Register the agent, choose AWS Agent Core as the deploy target, and point it at the agent container image and execution role. The agent service is what the stage deploys.
- **[Environment](/docs/continuous-delivery/ai-agent-deployments/aws-agent-core/environment):** Add an infrastructure definition that describes the AWS region, gateway, and networking the agent deploys to.
- **[Canary deployment](/docs/continuous-delivery/ai-agent-deployments/aws-agent-core/canary-deployment):** Build the pipeline execution that deploys the new revision and shifts traffic to it, with rollback if a step fails.
