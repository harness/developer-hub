---
title: Self Hosted Gitspaces Architecture
description: Understand the stages in the life of a Gitspace.
sidebar_position: 3
sidebar_label: Self Hosted Gitspaces Architecture
---

This guide takes you through a detailed handbook of the underlying architecture of Self Hosted Gitspaces. 

## What are Self Hosted Gitspaces? 

### Self Hosted Gitspaces 
Self Hosted Gitspaces are on-demand remote development environments hosted in your own infrastructure. These environments come pre-configured with everything you need to start coding, with an added layer of security by putting you in **full control** of the infrastructure. This reduces the risk of external data exposure and eliminates the risk of your source code being cached or accessed in any third-party cloud services. 

### Self Hosted vs Harness Hosted Gitspaces 
Harness Hosted Gitspaces are different in a way that these environments are hosted and managed by Harness completely, reducing the user's autonomy and ownership. However as organizations scale and operate under stricter security standards, hosted Gitspaces can lead to some challenges with enterprise use-cases: 

- **Security & Data Sovereignty**: Loss of control over source code and developer data with Hosted Gitspaces

| **Use Case** | **Self Hosted Gitspaces** | **Harness Hosted Gitspaces** |
| ------------ | ------------------------- | -------------------- |
| **Infrastructure** | Customer's Infrastructure (managed by the customer) | Managed by Harness | 
| **Security & Compliance** | Customer retains complete control and ownership | Shared responsibility | 
| **Source Code** | Customer retains complete control over the source code | Stored in Harness | 
| **Data Residency** | Stored in Customer's Infrastructure | Stored in Harness Cloud |
| **Latency/Location** | Dependent on Customer Infrastructure | Only Specific Regions Available | 

## Key Concepts
1. Harness Control Plane
2. Delegate 
3. VM Runner
4. CDE Gateway

## Architecture of Self Hosted Gitspaces

### Components 
#### 1. Harness Control Plane 
#### 2. Customer's GCP Infrastructure
1. VM1: Used to host Delegate and Runner 
2. VM2: Used to host Gateway
3. VMs: Created for Gitspaces 

### Functions 

## Next Steps