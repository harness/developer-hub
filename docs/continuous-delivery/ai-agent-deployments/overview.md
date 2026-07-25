---
title: AI Agents Deployment overview
sidebar_label: Overview
description: Deploy AI agents to managed agent runtimes through the same Harness CD service, environment, infrastructure, and pipeline model you already use.
sidebar_position: 1
keywords:
  - ai agent deployment
  - agent service
  - aws bedrock agentcore
  - google vertex agent runtime
  - agent runtime
tags:
  - continuous-delivery
  - ai-agents
  - agent-deployments
---

Harness CD deploys AI agents to managed agent runtimes as a first-class deployment type. You define an **Agent Service**, a dedicated Harness entity for AI agents, point it at a container image, and deploy it to AWS Bedrock AgentCore or Google Vertex Agent Runtime through a pipeline. The environment and infrastructure definition, which you set to deployment type **AI Agent Services**, follow the same model as every other CD deployment in Harness, and the pipeline execution uses the same stage structure.

:::note

Agent deployments are behind the feature flag `CDS_AGENT_RUNTIME_DEPLOYMENT`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

:::

---

## What will you learn?

This section covers everything you need to deploy an AI agent through Harness CD, on either supported runtime. The workflow is the same on both: register an agent service, configure an environment with an infrastructure definition, and build a pipeline with a canary execution.

- **Concepts:** Understand agent services, the deployment model, and how the pieces fit together. Go to [How a deployment fits together](#how-a-deployment-fits-together) to review the model.
- **Deploy to Google Agent Runtime:** Register an agent service, configure the Vertex infrastructure, and build the canary pipeline. Go to [Google Agent Runtime](/docs/continuous-delivery/ai-agent-deployments/google-agent-runtime/agent-service) to get started.
- **Deploy to AWS Agent Core:** Register an agent service, configure the Bedrock AgentCore infrastructure, and build the canary pipeline. Go to [AWS Agent Core](/docs/continuous-delivery/ai-agent-deployments/aws-agent-core/agent-service) to get started.

For each runtime, the documentation is organized into three stages that mirror the deployment flow: **Agent service**, **Environment**, and **Execution**.

---

## Why deploy agents through Harness

As AI agents move into production, teams often ship them with hand-written scripts or CLI commands that run outside the delivery pipeline. That approach breaks the unified CD experience: there is no shared deployment history, no approval gates, no rollback, and no way to apply Harness RBAC, secrets management, or OPA policies to agent workloads.

Agent deployments close that gap. An agent becomes a Harness entity, so it inherits governance, audit trails, canary rollout, and traffic shifting alongside your services on Kubernetes, ECS, Lambda, and every other supported platform.

---

## Supported runtimes

An agent deployment targets one of two managed runtimes, selected when you register the agent service:

- **Google Agent Runtime:** Vertex Agent Engine, the managed execution environment for agents on Vertex AI. Go to [Google Agent Runtime](/docs/continuous-delivery/ai-agent-deployments/google-agent-runtime/agent-service) to deploy to this runtime.
- **AWS Agent Core:** Amazon Bedrock AgentCore, a serverless runtime that runs agents in isolated, ephemeral container sessions. Go to [AWS Agent Core](/docs/continuous-delivery/ai-agent-deployments/aws-agent-core/agent-service) to deploy to this runtime.

This release deploys a pre-built container image to either runtime. The runtime pulls the agent image at deploy time.

---

## How a deployment fits together

An agent deployment wires four pieces into one Deployment stage, the same way any other CD deployment does.

The **agent service** defines the agent identity, its container image, and the target runtime platform. It is a dedicated entity type, separate from a regular Harness CD service. The **environment** groups your deployment targets, and its **infrastructure definition** (set to deployment type **AI Agent Services**) describes the cloud target, such as the AWS region and networking or the GCP project and location. The pipeline **execution** references the agent service, environment, and infrastructure and runs per-platform deploy, traffic-shift, and rollback steps to roll the new revision out as a canary.

Harness validates that the pieces match at plan creation. The stage deployment type must equal the agent service deployment type, and the agent service platform type must equal the infrastructure definition type, so a Google agent service can only deploy to Google infrastructure and an AWS agent service can only deploy to AWS infrastructure.

---

## Next steps

Choose the runtime you want to deploy to and start with its agent service.

- [Google Agent Runtime](/docs/continuous-delivery/ai-agent-deployments/google-agent-runtime/agent-service)
- [AWS Agent Core](/docs/continuous-delivery/ai-agent-deployments/aws-agent-core/agent-service)
