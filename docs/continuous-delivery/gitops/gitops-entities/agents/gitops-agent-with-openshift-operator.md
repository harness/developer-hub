---
title: Harness GitOps Agent Operator for OpenShift
description: This topic describes how to create a Harness GitOps Agent Operator for OpenShift.
sidebar_position: 7
redirect_from:
  - /docs/continuous-delivery/gitops/connect-and-manage/gitops-agent-with-openshift-operator
  - /docs/continuous-delivery/gitops/agents/gitops-agent-with-openshift-operator
---

# Harness GitOps Agent Operator for OpenShift

The Harness GitOps Agent Operator simplifies the installation and lifecycle management of the Harness GitOps Agent on Red Hat OpenShift. By installing it as a Red Hat–certified operator, you ensure that it meets strict security and quality standards, enabling safer and more efficient GitOps workflows in your enterprise environment.

:::note
Currently, this feature is behind the feature flag `CDS_GITOPS_OPERATOR`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.
:::

## Prerequisites
- **OpenShift Cluster**: You must have access to a functioning OpenShift cluster.  
- **Cluster Admin Privileges**: Ensure you have sufficient privileges to install Operators from the OperatorHub.  
- **Red Hat Container Catalog Access**: Confirm that your cluster has access to pull images from the Red Hat Ecosystem Catalog or the appropriate container registry.  
- **Argo CD** must be installed in the same namespace where the Harness GitOps Agent will be installed.

## Installing the Harness GitOps Agent Operator
Below is a high-level outline of how to install and configure the Harness GitOps Agent Operator through the OpenShift web console. (For CLI-based steps, consult the Harness GitOps documentation or Red Hat’s operator docs.)

1. **Access the OperatorHub**  
   - In the OpenShift web console, navigate to **Operators** → **OperatorHub**.  
   - Search for **Harness GitOps Operator**.

2. **Select the Operator**  
   - Click the **Harness GitOps Agent** tile.  
   - Review details such as version, provider (Harness), and description.

3. **Install the Operator**  
   - Choose the **Installation Mode** (e.g., install it cluster-wide).  
   - Select an **update channel** if applicable (e.g., “stable” or “latest”), and decide on the **approval strategy** (Automatic or Manual).  
   - Select the **version**.  
   - Click **Install** to start the operator installation.

4. **Verify Installation**  
   - After the installation is complete, go to the **Installed Operators**.  
   - In the **GitOps Agent** tab, you can create any number of agents by clicking on **Create Agent**.  
   - You can do this through a **YAML** or **Form** view. Select **YAML** for more direct control.

5. **Create and Configure the Agent**  
   - Now navigate to the Harness UI: **Deployments** → **GitOps** → **Settings** → **GitOps Agent**.  
   - Create a new GitOps Agent, providing all the necessary details like agent name, namespace, etc.  
   - Copy the operator YAML of the agent and paste it in the YAML section of the OpenShift cluster.  
   - Click **Create**.  
   - Your agent is now created. Under the **Conditions** section, you can see the status of the agent.

<details>
<summary>Sample YAML</summary>

Here is a sample operator YAML for your reference:

```yaml
apiVersion: gitops.harness.io/v1alpha1
kind: GitopsAgent
metadata:
  labels:
    app.kubernetes.io/managed-by: kustomize
    app.kubernetes.io/name: gitops-operator
  name: Agentname
  namespace: AgentNamespace
spec:
  identity:
    accountIdentifier: YourAccountIdentifier
    agentIdentifier: YourAgentIdentifier
    agentName: Agentname
    orgIdentifier: default
  logLevel: DEBUG
  replicas: 1
  networkPolicy:
    create: true
  secrets:
    agentSecret: YourAgentSecrets
  target:
    http: 'https://app.harness.io/gitops'
    protocol: HTTP1
```

</details>

