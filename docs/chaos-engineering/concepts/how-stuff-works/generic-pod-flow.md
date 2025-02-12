---
title: Generic Pod Fault Workflow 
sidebar_label: Generic Pod Fault Workflow 
sidebar_position: 20
---

This topic describes the flow of control when you execute a generic Kubernetes pod experiment in Harness Chaos Engineering.

The diagram below describes the flow of control for a generic Kubernetes pod experiment. 

// ![generic pod flow](./static)

### Step 1: Design and Launch an Experiment

You (the user) define the chaos experiment in the Chaos Control Plane.
This includes configuring the fault type, duration, target application, and other parameters.

### Step 2. Chaos Agent Picks Experiment

The Chaos Agent (or Subscriber) detects the new experiment and claims it.

### Step 3. Apply Chaos Experiment
The agent applies the Custom Resource (CR) YAML, which includes:
    - SecurityContext requirements (permissions required for execution) 
    - Fault parameters (for example, pod delete, network latency) 
    - Application details (target app)

### Step 4. Controllers Create Helper Pods

The controllers watch the CR and create Just-In-Time (transient) Chaos Helper Pods on the same node as the target application container.

### Step 5. Helper Pod Injects Fault into Application

- The helper pod runs in the same namespace as the target application.
- It executes the chaos process (for example, deletes the pod or increases CPU usage).
- The required SecurityContext constraints (like PRIVILEGED, NET_ADMIN, and SYS_ADMIN) are mapped to the helper pod.

### Step 6. Target Application Experiences Chaos Impact

The target application container (inside the pod) is affected by the chaos fault.
The impact is contained within the target pod’s namespace, ensuring:
    - Other pods on the node remain unaffected.
    - Node-level services remain operational.

After the experiment duration completes, the helper pod is deleted.

