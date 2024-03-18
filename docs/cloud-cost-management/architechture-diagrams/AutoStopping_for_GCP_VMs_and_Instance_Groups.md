---
title: AutoStopping for GCP VMs and Instance Groups
description: AutoStopping for GCP VMs and Instance Groups
sidebar_label: AutoStopping for GCP VMs and Instance Groups
---


<DocImage path={require('./static/AutoStopping_for_GCP_VMs_and_Instance_Groups.png')} width="90%" height="90%" title="Click to view full size image" />

This diagram illustrates how various computer services collaborate to implement an **AutoStopping feature** for Google Cloud Platform (GCP) virtual machines (VMs) and Instance Groups. The process involves deploying **custom Envoy-based proxy components** within the customer's infrastructure to facilitate seamless cooperation.

**Components and Workflow:**

1. **CCM Services:** These services collectively orchestrate the AutoStopping mechanism, serving as the central command for the automation process.

2. **Customer Infrastructure:** The customer's infrastructure forms the operational backdrop for AutoStopping activities. It encompasses GCP VMs and Instance Groups subject to AutoStopping directives defined by CCM.

3. **Custom Envoy-Based Proxy:** As part of the implementation process, bespoke Envoy-based proxy components are strategically installed within the customer's infrastructure. These proxies play a critical role in intercepting and managing traffic flow between end-users and the designated VMs/Instance Groups.

**Initiation Process:**

- **Deployment of Proxy Components:** During the initiation phase, custom Envoy-based proxy components are installed within the customer's infrastructure. This deployment marks a pivotal step in enabling communication between CCM and the customer's resources.

- **Interception of Proxy Traffic:** The installed proxy components intercept traffic flowing between end-users and the designated GCP VMs/Instance Groups. This interception point serves as a crucial juncture for implementing AutoStopping actions.

- **Rule Definition within CCM:** CCM is responsible for defining rules that govern AutoStopping via the proxy. These rules regulate the proxy's behavior, dictating when and how the AutoStopping mechanism should be activated.

**Execution of AutoStopping:**

In accordance with the defined directives, CCM orchestrates the execution of AutoStopping actions through the proxy. This involves making decisions based on variables such as user interactions, traffic patterns, or pre-established schedules.

Overall, this process ensures efficient management of GCP resources, optimizing usage and minimizing unnecessary expenses.