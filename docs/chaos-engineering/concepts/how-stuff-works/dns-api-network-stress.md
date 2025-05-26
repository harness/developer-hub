---
title: DNS / API / Network Fault Workflow 
sidebar_label: DNS / API / Network Fault Workflow 
sidebar_position: 40
description: Understand how chaos is injected and the flow of control in DNS, API and network-related chaos experiments.
---

This topic describes the flow of control when you inject DNS chaos or API chaos or Network chaos into your application.

The diagram below describes the flow of control for DNS / API / Network chaos experiment. 

![generic pod fault flow](../static/how-stuff-works/network-fault-flow.png)


## Step 1: Fetch Target Container Info

The chaos helper pod retrieves the pod specification and identifies the containerID of the target application pod.

## Step 2. Retrieve Sandbox Container Information

- The helper pod fetches the **Sandbox Container's PID** corresponding to the target pod.
- The sandbox container PID will be used to access Linux namespaces (pid/net/mnt).

## Step 3. Derive the Required Network Namespace Path
- Using the PID, it constructs the **network namespace (net_ns) path** to modify network behavior.

## Step 4. Inject the Chaos Process
- The helper pod **enters the derived network namespace** and injects chaos.

Depending on the type of chaos fault, one of the following steps are followed.

---

### DNS Chaos
- Starts a **DNS query interceptor** within the network namespace.
- Redirects **traffic for matching domains** to the interceptor.
- Modifies the **resolve.conf file** inside the target container to manipulate DNS resolution.

### API / HTTP Chaos
- Creates a **proxy server** to simulate API failures.
- Uses **iptables rules** to redirect traffic from the target service to the proxy.
- Introduces **delays, failures, or modified responses** in API communication.

### Network Chaos (Packet and Traffic Manipulation)
- **Uses `netem` (Network Emulator)** to introduce latency, loss, corruption, or duplication in TCP/UDP traffic.
- Applies **Queuing Discipline (QoS)** to control packet flow.
- Redirects **TCP traffic** based on defined network rules.

---

## Step 5. Monitor and Validate Experiment Execution
- The injected chaos remains active for the **configured duration**.
- Observability tools log the network disruptions.
- Additional **probes** may be used to validate system health.

## Step 6. Rollback and Restore Normal Operations
- After the chaos duration ends, the injected fault is removed.
- Any modified **iptables, `netem` rules, or DNS configurations** are restored.
- System resilience metrics are collected and analyzed.
