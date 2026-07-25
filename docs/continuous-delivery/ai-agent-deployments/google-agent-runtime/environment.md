---
title: Environment
sidebar_label: Environment
description: Configure the environment and infrastructure definition that target Google Agent Runtime for an agent deployment.
sidebar_position: 3
keywords:
  - agent infrastructure
  - infrastructure definition
  - google agent runtime infrastructure
  - psc networking
tags:
  - continuous-delivery
  - ai-agents
  - agent-deployments
---

import DocImage from '@site/src/components/DocImage';

The environment defines where an agent deploys. It groups your deployment targets, and its infrastructure definition describes the Google Agent Runtime target, such as the connector, project, region, and networking. This page shows you how to add a Google Agent Runtime infrastructure definition.

:::note

Agent deployments are behind the feature flag `CDS_AGENT_RUNTIME_DEPLOYMENT`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

:::

You need a registered agent service with **Google Agent Runtime** as its deploy target and a GCP connector with permission to deploy to Agent Runtime. For all prerequisites, go to [Before you begin](/docs/continuous-delivery/ai-agent-deployments/google-agent-runtime/overview#before-you-begin) on the overview. For how environments and infrastructure definitions work in CD, go to [Environment overview](/docs/continuous-delivery/x-platform-cd-features/environments/environment-overview).

---

## Create the environment

Create an environment for your agent deployments, or reuse an existing one. Set the environment type to **Production** or **Pre-Production** based on the target. Go to [Create environments](/docs/continuous-delivery/x-platform-cd-features/environments/create-environments) to add one.

---

## Add an infrastructure definition

The infrastructure definition describes the cloud target for one environment. In the environment, open the **Infrastructure Definitions** tab and select **Infrastructure Definition** to add one.

{/* IMAGE PLACEHOLDER: Environment Infrastructure Definitions tab listing the agent infrastructure (infra-definitions-list.png) */}

1. Enter a name for the infrastructure definition.
2. Set **Deployment Type** to **AI Agent Services**.
3. Under **Select Infrastructure Type**, select **Google Agent Runtime**.
4. Under **Cluster Details**, configure the connector and target. Go to [Configure the infrastructure](#configure-the-infrastructure) for the fields.
5. Select **Save**.

### Configure the infrastructure

The cluster details define the connector Harness uses and the Vertex target the agent deploys to. Configure the following fields:

- **Connector:** The GCP connector with permission to deploy to Agent Runtime.
- **Project:** The GCP project that hosts the agent runtime.
- **Region:** A region where Vertex Agent Runtime is available, for example `us-east1`.
- **Networking Type:** Select **None** for public access, or **PSC (Private Service Connect)** when the agent must reach private resources.

When you select **PSC (Private Service Connect)**, provide the **Network Attachment** and, optionally, one or more **DNS Peering** entries. Each DNS peering entry takes a **Domain**, which must end with a dot, a **Target Project**, and a **Target Network**.

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/infra-google-cluster.png')} width="50%" height="50%" alt="Edit Infrastructure panel for Google Agent Runtime showing connector, project, region, and networking type" title="Click to view full size" />
</div>

{/* IMAGE PLACEHOLDER: Infrastructure Details for Google Agent Runtime, PSC networking with Network Attachment and DNS Peering (infra-google-psc.png) */}

<details>
<summary>Google Agent Runtime infrastructure definition YAML</summary>

```yaml
infrastructureDefinition:
  name: GoogleAgentPlatform
  identifier: GoogleAgentPlatform
  orgIdentifier: default
  projectIdentifier: Demo
  environmentRef: Google_Agent_Platform
  deploymentType: AiAgent
  type: GoogleAgentRuntime
  spec:
    connectorRef: account.gcp_connector
    projectId: my-gcp-project
    location: us-east1
    networking:
      type: none
  allowSimultaneousDeployments: false
```

</details>

---

## Next steps

With the infrastructure defined, build the pipeline stage that wires the service, environment, and infrastructure together.

- [Canary deployment](/docs/continuous-delivery/ai-agent-deployments/google-agent-runtime/canary-deployment)
- [Agent service](/docs/continuous-delivery/ai-agent-deployments/google-agent-runtime/agent-service)
