---
title: Google Agent Runtime overview
sidebar_label: Overview
description: Deploy AI agents to Google Vertex Agent Runtime through the Harness CD service, environment, and pipeline model.
sidebar_position: 1
keywords:
  - google agent runtime
  - vertex agent engine
  - ai agent deployment
tags:
  - continuous-delivery
  - ai-agents
  - agent-deployments
---

import DocImage from '@site/src/components/DocImage';

Google Agent Runtime, part of Vertex Agent Engine, is a managed runtime for deploying and scaling AI agents on Vertex AI. It runs agents built with frameworks such as Google ADK, LangChain, LangGraph, LlamaIndex, and custom code, and handles the underlying infrastructure, scaling, and session management so you do not operate servers yourself. To understand the runtime itself, go to [Deploy an agent (Google Cloud)](https://cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/deploy-an-agent).

Harness CD deploys an agent to Google Agent Runtime as a first-class deployment type, using the same service, environment, infrastructure, and execution model that every other CD deployment uses.

:::note

Agent deployments are behind the feature flag `CDS_AGENT_RUNTIME_DEPLOYMENT`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

:::

---

## Why deploy through Harness

Teams often ship agents to Google Agent Runtime with hand-written scripts or the Vertex SDK, run outside their delivery pipeline. That approach has no shared deployment history, no approval gates, no canary rollout, and no rollback, and it cannot apply Harness RBAC, secrets management, or OPA policies to the agent workload.

Deploying through Harness closes that gap. The agent becomes a Harness entity, so it inherits governance, audit trails, canary traffic shifting, and rollback alongside your services on Kubernetes, ECS, Lambda, and every other supported platform. You point Harness at the agent image, describe the Vertex target once, and every deployment runs through the same reviewed pipeline.

---

## What you will learn from this topic
This section covers everything you need to deploy an agent to Google Agent Runtime through a Harness pipeline. You will learn how to:

- Register an agent service that points at your agent container image.
- Configure an environment with a Google Agent Runtime infrastructure definition.
- Build a pipeline with a canary execution that deploys the agent and shifts traffic to the new revision.

---

## What is supported

This release deploys a pre-built container image to Google Agent Runtime. The runtime pulls the agent image from Artifact Registry at deploy time. The canary deployment strategy is supported through the deploy and traffic-shift steps, with rollback that reverts traffic to the previous revision.

---

## Before you begin

- **Harness account with agent deployments enabled:** When the feature is enabled, **Agent Services** appears in the left navigation of the **Continuous Delivery & GitOps** module. For how to access or create a Harness account, go to [Getting started with Harness Platform](/docs/platform/get-started/onboarding-guide) to set up access.

    :::info Contact Harness support:

    If **Agent Services** does not appear, contact your account administrator or [Harness Support](mailto:support@harness.io) to enable `CDS_AGENT_RUNTIME_DEPLOYMENT`.

    :::

- **An agent container image:** Your agent must be packaged as a container image in an Artifact Registry repository that Vertex Agent Runtime can pull from. Go to [Deploy an agent (Google Cloud)](https://cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/deploy-an-agent) to review the container image format.
- **A GCP connector:** You need a Google Cloud connector whose service account has Vertex AI Agent Engine permissions. Go to [Google Cloud Platform (GCP) connector settings reference](/docs/platform/connectors/cloud-providers/ref-cloud-providers/gcs-connector-settings-reference) to create one.
- **A Kubernetes connector for the step group:** The deploy, traffic shift, and rollback steps run as container steps on a Kubernetes cluster, so you need a connector for the cluster that runs them.
- **Pipeline and entity permissions:** You need **View** and **Create/Edit** for [Services](/docs/platform/role-based-access-control/permissions-reference) and [Environments](/docs/platform/role-based-access-control/permissions-reference), and **View**, **Create/Edit**, and **Execute** for [Pipelines](/docs/platform/role-based-access-control/permissions-reference#pipelines). To get these, an administrator must assign you a role that includes them. Go to [RBAC in Harness](/docs/platform/role-based-access-control/rbac-in-harness) to understand roles.

---

## Create a deploy stage

To deploy an agent, create a pipeline and add a **Deploy** stage. Under **Deployment Type**, select **AI Agent Services**. This deployment type unlocks the agent service, the Google Agent Runtime infrastructure, and the agent deploy, traffic-shift, and rollback steps.

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/deployment-type.png')} width="50%" height="50%" alt="Stage deployment type selection with AI Agent Services selected" title="Click to view full size" />
</div>

After you select the deployment type, configure the stage in three steps: register the agent service, set up the environment, and build the canary execution.

---

## Next steps

Configure the stage in the following order. Each page walks you through one part of the deployment.

- **[Agent service](/docs/continuous-delivery/ai-agent-deployments/google-agent-runtime/agent-service):** Register the agent, choose Google Agent Runtime as the deploy target, and point it at the agent container image. The agent service is what the stage deploys.
- **[Environment](/docs/continuous-delivery/ai-agent-deployments/google-agent-runtime/environment):** Add an infrastructure definition that describes the Vertex project, region, and networking the agent deploys to.
- **[Canary deployment](/docs/continuous-delivery/ai-agent-deployments/google-agent-runtime/canary-deployment):** Build the pipeline execution that deploys the new revision and shifts traffic to it, with rollback if a step fails.
