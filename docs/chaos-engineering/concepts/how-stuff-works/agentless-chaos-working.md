---
title: Agentless versus Agent-Based Models
sidebar_label: Agentless and Agent-based Models
sidebar_position: 1
---

This topic describes how the agent-based model works, its limitations, and how these limitations can be overcome using **Centralized Execution Plane** that uses an agentless model.

## Agent-Based Chaos Execution Model

To execute network and resource-related faults, chaos tools need access to the target system (or node) and temporarily reside within the target system. This is achieved using chaos agents that are installed within the target systems (for example, Kubernetes clusters).

### Challenges of the Agent-Based Model

- **Management Overhead**: As the number of target systems increases, so does the number of agents, leading to increased configuration and maintenance overhead.
- **Networking Constraints**: Agents must maintain continuous communication with the control plane to report agent health status, claiming fault injection tasks, polling user-initiated abort/stop signals, reporting progress of the faults, steaming logs & events, etc. This requires approvals for the network configuration changes to be made for individual target systems which may be a conflict with the SRE/SecOps teams.  
- **Resource Utilization**: Even when no experiments are running, agents consume resources (such as CPU, memory, ephemeral storage, pod IPs within the CIDR, metrics derived and stored, and so on), leading to idle-time resource wastage. Using automation to scale the actions is also considered an additional effort.

### Interaction with the Control Plane

Described below is how the control plane interacts with the agent-based model:

    - The control plane communicates with agents to schedule and execute chaos experiments.
    - Agents maintain a persistent connection to the control plane, continuously polling for new instructions.
    - Key communications include:
        - **Agent Health Checks**: Periodic heartbeats sent to the control plane to confirm the agent is online.
        - **Fault Execution**: The control plane sends instructions to the agent, specifying the type of fault to inject and the target system.
        - **Logs and Results**: The agent collects logs and telemetry from the target system and sends them back to the control plane.

The diagram has been described [here](/docs/chaos-engineering/concepts/explore-architecture#agentless-model).

## Agentless Chaos Execution Model
To mitigate the issues associated with the [agent-based chaos model](#agent-based-chaos-execution-model), Harness Chaos Engineering introduces **Centralized Execution Plane**, which is the **agentless** model. 

The agentless model leverages a lightweight orchestrator and a network proxy to efficiently scale experiments across target clusters.

It has the following characteristics:

- Set up with minimal effort on a centralized jump cluster with dual network access. 
- Helps initiate chaos against multiple target systems (or clusters) by launching just-in-time, transient chaos runners that reside with the application containers for the period of fault execution. 
- Routes all external traffic to the chaos control plane through a dedicated network node/jump cluster, so that the application clusters can be opened to the external world.

The diagram has been described [here](/docs/chaos-engineering/concepts/explore-architecture#agent-based-model).

### Interaction with the Control Plane

Described below is how the control plane interacts with the agent-less model:

    - The control plane communicates with the Delegate (not with the agents) to deploy Chaos Runners on the target system, schedule and execute chaos experiments.
    - The Delegate receives instructions from the control plane and, in response, launches short-lived Chaos Runners in the target environment.
    - The Chaos Runners execute the desired faults as specified by the control plane.
    - Chaos Runners stream log data, status, and metrics back to the control plane via the Delegate or **Harness Network Proxy (HNP)**.
   
The diagram below describes the functional flow of control in the centralized execution plane.

    ![](../static/how-stuff-works/cep.png)

### Advantages of the Agentless Model

- **Minimal Overhead**: These models don't need to maintain persistent agents on every target system. A single Delegate manages multiple clusters.
- **Reduced Networking Requirements**: Only the Delegate requires access to the control plane, reducing network exceptions and direct access to every cluster.
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

## Conclusion

The interaction between the **Control Plane** and **Execution Plane** differs between agent-based and agentless models. 

- In the **agent-based model**, control-plane-to-agent communications are persistent and direct. 

- In the **agentless model**, transient Chaos Runners are managed by a centralized Delegate. This results in better scalability, reduced networking overhead, and improved resource utilization. The agentless model better aligns with DevOps principles, enabling seamless chaos experimentation across multiple clusters and infrastructures as well as ensuring efficiency and reduced management overhead.