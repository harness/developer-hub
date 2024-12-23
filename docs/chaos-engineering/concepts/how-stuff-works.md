---
title: How Stuff Works?
sidebar_label: How Stuff Works
sidebar_position: 6
description: Understand the interaction between execution and control plane for agent and agentless models in Harness Chaos Engineering.
---

This topic explores the basic differences between the agent-based and agentless models and how their respective components (control plane and execution plane) work together to achieve system resilience.

## Introduction

To implement chaos engineering, Harness CE provides two execution models: **Agent-Based** and **Agentless**. 
Each model facilitates the interaction between the **Execution Plane** and the **Control Plane** differently. 

### Key Definitions

- **Control Plane**: The system responsible for orchestrating, managing, and controlling the execution of chaos experiments.

- **Execution Plane**: The environment where chaos experiments are executed. This plane consists of the infrastructure where faults are injected and tested.

## Agent-Based Chaos Execution Model

Chaos agents are installed within the target systems (for example, Kubernetes clusters) where chaos experiments are executed.
These agents induce network disruptions, resource constraints, or application-level faults into the underlying infrastructure.

### Interaction with the Control Plane

The agent's responsibility in the model include:

    - Receive and execute fault instructions.
    - Monitor and report system behavior during and after the fault.
    - Send event logs, metrics, and status reports to the control plane.

Described below is how the control plane interacts with the agent-based model:

    - The control plane communicates with agents to schedule and execute chaos experiments.
    - Agents maintain a persistent connection to the control plane, continuously polling for new instructions.
    - Key communications include:
        - **Agent Health Checks**: Periodic heartbeats sent to the control plane to confirm the agent is online.
        - **Fault Execution**: The control plane sends instructions to the agent, specifying the type of fault to inject and the target system.
        - **Logs and Results**: The agent collects logs and telemetry from the target system and sends them back to the control plane.


### Challenges of the Agent Model

- **Management Overhead**: As the number of target systems increases, so does the number of agents, leading to increased configuration and maintenance overhead.
- **Networking Constraints**: Agents must maintain continuous communication with the control plane, often requiring firewall exceptions and network reconfigurations.
- **Resource Utilization**: Even when no experiments are running, agents consume resources, leading to idle-time resource wastage.


## Agentless Chaos Execution Model

**Centralized Execution Plane**
The agentless model introduces the concept of CEP (Centralized ExecutionPlane). With this, the model performs the following:

   - Instead of deploying persistent agents on target clusters, a **Harness Delegate** or **Jump Cluster** is configured as a central orchestrator.
   - **Harness Delegate**: Orchestrates the launch of transient Chaos Runners in the target systems.
   - The Delegate has access to multiple target clusters and is capable of launching transient **Chaos Runners** in the desired clusters, only for the duration of the chaos experiment.
   - **Chaos Runners**: Transient pods that inject faults, collect logs, and send results back to the Delegate.
   - **Harness Network Proxy (HNP)**: Optional component that aggregates network traffic from multiple Runners and relays it to the control plane.

### Interaction with the Control Plane

Described below is how the control plane interacts with the agent-less model:

    - The control plane communicates with the Delegate (not with the agents) to deploy Chaos Runners on the target system, schedule and execute chaos experiments.
    - The Delegate receives instructions from the control plane and, in response, launches short-lived Chaos Runners in the target environment.
    - The Chaos Runners execute the desired faults as specified by the control plane.
    - Chaos Runners stream log data, status, and metrics back to the control plane via the Delegate or **Harness Network Proxy (HNP)**.
   

### Advantages of the Agentless Model

- **Minimal Overhead**: No need to maintain persistent agents on every target system. A single Delegate can manage multiple clusters.
- **Reduced Networking Requirements**: Only the Delegate requires access to the control plane, reducing the need for network exceptions and direct access to every cluster.
- **Optimal Resource Utilization**: Chaos Runners are ephemeral and exist only during experiment execution, minimizing idle resource consumption.

---

## Component Comparison: Agent vs. Agentless

| **Aspect**                      | **Agent-Based Model**                                | **Agentless Model**                                  |
| ------------------------------- | ---------------------------------------------------- | ---------------------------------------------------- |
| **Execution Mechanism**         | Long-running agents on every target system           | Transient Chaos Runners launched on demand           |
| **Control-Plane Communication** | Direct, continuous agent-control plane communication | Indirect, via Delegate and HNP                       |
| **Resource Utilization**        | High due to persistent agents                        | Low, as Runners exist only during execution          |
| **Network Configuration**       | Requires open network access for each agent          | Only Delegate needs access to the control plane      |
| **Scalability**                 | Increases agent count with targets                   | Scales efficiently with Delegate + transient runners |
| **Management Overhead**         | High (requires managing multiple agents)             | Low (single Delegate controls all runners)           |

---

## Deployment Scope of Execution Components

| **Component**             | **Scope**                        | **Description**                                                          |
| ------------------------- | -------------------------------- | ------------------------------------------------------------------------ |
| **Delegate**              | Cluster-Wide or Namespace-Scoped | Launches Chaos Runners on demand                                         |
| **Chaos Runner**          | Cluster-Wide or Namespace-Scoped | Injects faults within its target namespace or across multiple namespaces |
| **Harness Network Proxy** | Centralized on Delegate          | Relays traffic from Runners to Control Plane                             |

:::tip
To customize permissions for:
- **Namespace-Scoped Permissions**: You can restrict Delegate and Chaos Runner permissions to specific namespaces by creating custom service accounts.
- **Role Binding**: You can bind service accounts to specific roles to control the blast radius of chaos execution.
:::

## Conclusion

The interaction between the **Control Plane** and **Execution Plane** differs between agent-based and agentless models. 

- In the **agent-based model**, control-plane-to-agent communications are persistent and direct. 

- In the **agentless model**, transient Chaos Runners are managed by a centralized Delegate. This results in better scalability, reduced networking overhead, and improved resource utilization. The agentless model better aligns with DevOps principles, enabling seamless chaos experimentation across multiple clusters and infrastructures as well as ensuring efficiency and reduced management overhead.