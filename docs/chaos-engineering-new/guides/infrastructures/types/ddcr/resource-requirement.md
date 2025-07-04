# Resource Requirements

## Overview
This document outlines the resource allocation and lifecycle of various chaos execution plane components. These components work together to facilitate service discovery and chaos experiments.

## Execution Plane Components and Behaviors

## Long Running Component
### Delegate
- **Lifecycle**: Long-running
- **Image**: harness/delegate
- **Resource Specifications**:
  - Limits:
    - Memory: 2Gi
  - Requests:
    - CPU: 1
    - Memory: 2Gi
- **Container**: Single container
- **Location**: Can be deployed on the same cluster or a separate cluster(Agentless Model)
- **Purpose**: It acts as a connector between the control plane and the execution environment, facilitating tasks such as installing discovery agent, chaos runner, etc.

**Note**: The Delegate is installed with these default resource requests and limits. However, these values can be configured based on the expected load on the Delegate. If your environment requires more resources due to higher workloads or complex operations, you can adjust these settings accordingly.

## Transient Components

### Discovery
Service discovery is responsible for identifying and tracking services within the Kubernetes cluster.
Discovery components will be scheduled/deployed on the cluster upon discovery agent creation or cron schedule. They will discover the resources, and once the discovery is completed, these components will be cleaned up from the cluster.

1. **service-discovery-lifecycle-agent**
   - **Image**: harness/service-discovery-collector
   - **Lifecycle**: Transient
   - **Resource Specifications**:
     - Limits:
       - CPU: 200m
       - Memory: 200Mi
     - Requests:
       - CPU: 50m
       - Memory: 50Mi
   - The service-discovery-lifecycle-agent is responsible for creating, monitoring, and deleting cluster and node agents within a Kubernetes environment.

2. **sd-cluster**
   - **Lifecycle**: Transient
   - **Containers**: 2
     1. log-watcher
        - **Image**: harness/chaos-log-watcher
     2. agent
        - **Image**: harness/service-discovery-collector
   - **Resource Specifications** (per container):
     - Limits:
       - CPU: 200m
       - Memory: 200Mi
     - Requests:
       - CPU: 50m
       - Memory: 50Mi
   - It discovers the Kubernetes services and workloads running in the cluster.

3. **sd-node**
   - **Lifecycle**: Transient
   - **Containers**: 2
     1. log-watcher
        - **Image**: harness/chaos-log-watcher
     2. agent
        - **Image**: harness/service-discovery-collector
   - **Resource Specifications** (per container):
     - Limits:
       - CPU: 200m
       - Memory: 200Mi
     - Requests:
       - CPU: 50m
       - Memory: 50Mi
   - It discovers the networking among the services/workloads within the cluster.

### Chaos
Chaos components will be scheduled/deployed on the cluster once an experiment is triggered. They will inject chaos, and after chaos completion, all components will be cleaned up.

1. **DDCI**
   - **Lifecycle**: Transient
   - **Image**: harness/chaos-ddcr
   - **Resource Specifications**:
     - Limits:
       - CPU: 100m
       - EPHEMERAL-STORAGE: 500Mi
       - Memory: 500Mi
     - Requests:
       - CPU: 50m
       - EPHEMERAL-STORAGE: 250Mi
       - Memory: 250Mi
   - DDCI manages chaos experiments in Kubernetes environments. It is responsible for handling the lifecycle of chaos experiments.

2. **Fault**
   - **Lifecycle**: Transient
   - **Containers**: 2
     1. log-watcher
        - **Image**: harness/chaos-log-watcher
     2. fault
        - **Image**: harness/chaos-ddcr-faults
   - **Resource Specifications**: Configurable by user
   - **Note**: Users can configure the resource requests and limits for the Fault pod through settings in Harness. There are no default values set.
   - Created for specific fault injection operations

## Resource Allocation
- The Delegate has a constant, defined resource limit and request as specified above.
- Transient pods (Discovery components, Chaos components) are allocated defined resources when they are created, as detailed in their respective sections.
- Resource consumption by transient pods is temporary and released upon pod deletion.

## Important Notes
- Only the Delegate runs continuously with a fixed resource allocation.
- All other pods are created on-demand, perform their designated tasks, and are then removed from the cluster.
- This approach ensures efficient resource utilization, as resources are only consumed when specific operations are in progress.