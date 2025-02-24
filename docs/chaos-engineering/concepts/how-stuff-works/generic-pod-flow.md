---
title: Generic Pod Fault Workflow 
sidebar_label: Generic Pod Fault Workflow 
sidebar_position: 20
---

This topic describes the flow of control when you execute a generic Kubernetes pod experiment in Harness Chaos Engineering.

The diagram below describes the flow of control for a generic Kubernetes pod experiment. 

![generic pod fault flow](../static/how-stuff-works/generic-pod-fault-flow.png)

### Step 1: Design and Launch an Experiment

You (the user) define the chaos experiment in the Chaos Control Plane.
This includes configuring the fault type, duration, target application, and other parameters.

### Step 2. Chaos Agent Picks Experiment

The Chaos Agent (or Subscriber) detects the new experiment and claims it.

### Step 3. Apply Chaos Experiment

The agent/subscriber applies the Custom Resource (CR) YAML, which includes:
    - Security Context Constraints (permissions required for execution) 
    - Fault parameters (for example, pod delete, network latency) 
    - Application details (target app)

### Step 4. Controllers Create Helper Pods 

- The controllers watch the CR and create Just-In-Time (transient) chaos helper pods (if required) on the same node as the target application container.
- For chaos faults such as pod-level CPU/memory stress, and network disruptions, helper pods are created. However, for faults that rely on kube-api operations (such as pod-delete and pod-autoscaler), helper pods are not created.

### Step 5. Inject Fault into Application

- The helper pod runs in the same namespace as the target application and executes the chaos process (for example, increases CPU usage). Here, the Security Context Constraints (like `RUNASANY`, `PRIVILEGED`, `NET_ADMIN`, `SYS_ADMIN`, `ALLOW_HOSTPATH_MOUNT`, and `HOST_PID`, ) are mapped with the chaos Service Account.

### Step 6. Target Application Experiences Chaos Impact

The target application container (inside the pod) is affected by the chaos fault.
The impact is contained within the target pod’s namespace, ensuring:
    - Other pods on the node remain unaffected.
    - Node-level services remain operational.

In faults that don't use helper pods, chaos is usually reverted/removed automatically. 

In faults where helper pods are created, these pods are removed once the chaos duration is complete. By the end of this process, the subscriber sends back the results of the chaos experiment to the control plane and continues to poll for new experiment tasks.