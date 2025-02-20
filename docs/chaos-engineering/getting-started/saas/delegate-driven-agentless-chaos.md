---
title: Delegate-Driven Agentless Fault Injection
description: Use a Harness Delegate to execute an agentless model-based Kubernetes chaos fault.
sidebar_position: 10
---

This topic describes how you can use a Harness Delegate along with an agentless chaos execution model to execute a chaos fault on Kubernetes. 

## Before you begin, review the following:

* [Agentless Chaos Execution Model](/docs/chaos-engineering/concepts/how-stuff-works/agentless-chaos-working#agentless-chaos-execution-model)
* [Centralized Execution Plane](/docs/chaos-engineering/concepts/how-stuff-works/centralized-exec-plane)
* [Application Map](/docs/chaos-engineering/use-harness-ce/application-map#what-is-an-application-map)
* [Service Discovery](/docs/chaos-engineering/use-harness-ce/service-discovery)

## Install Delegate in your Infrastructure

### Step 1: Set up your target cluster 

a. In this step, set up your cluster (where Harness CE executes chaos experiments) with a dedicated namespace for Harness, and go to [Centralized Delegate](/docs/chaos-engineering/use-harness-ce/infrastructures/centralized-delegate) to perform the following steps.
	- Create a dedicated Namespace.
	- Create a service account in the dedicated namespace.
	- Create K8s RBACs and Role binding for Chaos runner pods.
	- Create a cluster role and cluster role binding for conducting service discovery and executing chaos experiments.
	- Create a K8s connector with cluster URL and service account token as authentication method.
	- Create an Infrastructure using the K8s connector.


### Step 2: Set Up a Discovery agent

b. Go to [Customize Discovery Agent](/docs/platform/service-discovery/#customize-discovery-agent), and specify the following:

	- **Environment** (that you created earlier for your target cluster)
	- **Infrastructure** (that you created earlier for your target cluster). 
	- Specify **Discovery Agent Name**. 
	- For the **Namespace**, provide the dedicated namespace you created in your target cluster for Harness. This is the namespace where Harness runs chaos runners, discovers services and executes chaos experiments.

		![create agent](./static/delegate-drive-agentless/create-agent-1.png)

c. Select one of the following based on your requirement.

	- **Namespace Selector**: Selects one or more namespaces based on [level selector](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/).
	- **Exclusion**: Select this option to avoid Harness from discovering certain namespaces. Provide the name of the namespaces to be excluded.
	- **Inclusion**: Select this option to allow Harness to discover specific namespaces. Provide the name of the namespaces to be included.

		![exclusion settings](./static/delegate-drive-agentless/exclusion-2.png)

d. If your cluster control plane node has a taint, **Add Node Selector** so that Harness launches its pod only on the worker nodes.

		![node selector](./static/delegate-drive-agentless/node-selector-3.png)

e. Populate the **Use this Service Account** field with the Service Account name that you created in the dedicated namespace in your target cluster for Harness.

		![service account](./static/delegate-drive-agentless/service-acc-4.png)

f. Click **Create New Discovery Agent** on the top right corner of the page.

### Step 3: Harness Discovers Services

The discovery agent may take some time to discover the microservices in your Kubernetes cluster. 

If the microservices in your system are communicating with each other, the agent will discover the connectivity between these microservices. Otherwise, no connectivity is discovered.

However, you can manually create network experiments and tag them to the relevant application map.

g. Once the services are discovered, the output appears similar to this.

		![services discovered](./static/delegate-drive-agentless/services-5.png)

### Step 4: Create Application Map

h. [Create an application map](/docs/chaos-engineering/use-harness-ce/application-map#create-an-application-map) from the discovery agent.

### Step 5: Harness Auto-Creates Experiments

i. Go to **Application Map** in **Project Settings**, and select the application map that you created earlier. It would look similar to the image below.

		![output](./static/delegate-drive-agentless/app-map-6.png)

j. In the above screen, click **Chaos Experiments** and choose one of **OnlyFew**, **Moderate** and **Maximum** to auto-create experiments. These options describes the number of chaos experiments that would be automatically created.

		![options](./static/delegate-drive-agentless/options.png)

k. Based on the option you select, Harness auto-creates the experiments for each discovered service that was selected in the application map. Refresh the page to see the auto-created experiments.

		![auto-create](./static/delegate-drive-agentless/auto-create-7.png)

## Troubleshooting

- Go to [Troubleshooting Discovery Agent](/docs/chaos-engineering/troubleshooting/#discovery-agent) in case your discovery agent is unable to discover services.	

