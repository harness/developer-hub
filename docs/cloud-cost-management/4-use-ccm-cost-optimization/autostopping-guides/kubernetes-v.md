---
title: Kubernetes Autostopping eBPF
description: Introduction to eBPF based Autostopping for Kubernetes.
sidebar_position: 30
redirect_from:
  - /docs/cloud-cost-management/getting-started-ccm/quick-start-guides/kubernetes-autostopping-traefik
  - /tutorials/cloud-costs/cloud-autostopping/kubernetes-autostopping-traefik
---

## Overview

Kubernetes Autostopping V2 is a complete re-architecture of the original Autostopping (V1) solution, aimed at reducing operational complexity, improving traffic detection, easy onboarding and enabling more efficient scaling for Kubernetes workloads.
In earlier version of AutoStopping, traffic was routed through an Envoy based router for both traffic detection and workload rewiring. In eBPF based AutoStopping, we’ve eliminated the router entirely, introduced Ingress-based rewiring, and built a new eBPF-powered Traffic Detection Agent for high-accuracy traffic monitoring and mapping cluster networking.
This change brings multi-workload support in a single rule, multiple traffic entry points per workload, and simpler, more scalable architecture.

## Key Changes from V1 to V2

### 1. Removal of Proxy Layer

**Earlier:**
- All incoming traffic flowed through a proxy.
- Proxy handled both traffic detection and rewiring to workloads.
- Rewiring to workloads was done once at setup; subsequent rewiring occurred only inside the proxy.

**eBPF based AutoStopping:**
- Proxy has been removed entirely.
- Rewiring is now done directly on the Ingress.
- Controller updates Ingress routes dynamically whenever workloads are stopped or started.
- V2 currently supports NGINX Ingress only.

### 2. New Traffic Detection Agent (eBPF-based)

**Why:** Without the router, we needed a new way to detect traffic without being in the direct data path.

**How it works:**
- Runs as a DaemonSet across all nodes in the cluster.
- Uses eBPF to monitor low-level network activity directly from the kernel.
- Detects when workloads receive traffic without introducing latency.

**Requirements:**
- Works only on node-based Kubernetes clusters (VM-based).
- Not supported on serverless or fully managed offerings like AWS Fargate or GCP Autopilot.
- Requires host-level access and elevated permissions in the deployment YAML.

### 3. Multiple Workloads per Autostopping Rule
**V1 Limitation:**
- Each Autostopping rule could only manage one workload.
- Example: For an application with 100 workloads, 100 separate rules were required for independent traffic-based scaling.

**V2 Improvement:**
- A single Autostopping rule can now manage multiple workloads that form a complete application.
- Traffic to any workload in the group will keep the entire application running.
- Greatly reduces configuration overhead and simplifies operations.

### 4. Multiple Traffic Entry Points
V2 supports defining multiple ingress routes for the same workload.

**This means:**
- Whether traffic comes via external.example.com or internal.example.com (or any other configured host/path), the application will start automatically.
- Useful for workloads accessed from multiple domains, subdomains, or ingress controllers.


## Technical Requirements

Feature | Requirement
--- | ---
Cluster Type | Node-based (VM) Kubernetes cluster
Ingress Controller Support | NGINX Ingress (others to be added later)
Traffic Detection | eBPF agent in node kernel
Permissions | Host-level access + elevated permissions for Traffic Detection Agent

## Migration for Existing Users

Upgrading to Autostopping V2 is designed to be frictionless for existing V1 users.

### Before You Upgrade

- Ensure the workloads managed by your V1 Autostopping rules are running at the time of upgrade. If workloads are stopped, they will not be considered by the migration process and will need to be recreated manually in V2.
- Confirm your cluster meets V2 requirements (NGINX Ingress, node-based cluster, eBPF support, elevated permissions).

### Upgrade Steps

- Install or upgrade to Autostopping Controller v2.0 in your cluster.
- The controller automatically:
    - Detects existing V1 rules.
    - Migrates them to V2 format.
    - Reconfigures Ingress rewiring and traffic detection to use the new architecture.
- No downtime is expected during migration, but incoming requests may be briefly queued if workloads are stopped and need to be restarted.

### Sample template:

  <DocImage path={require('./static/ebpf.png')} width="70%" height="70%" title="Click to view full size image" />>