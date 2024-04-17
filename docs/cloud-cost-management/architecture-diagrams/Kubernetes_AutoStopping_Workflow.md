---
title: Kubernetes AutoStopping Workflow
description: Kubernetes AutoStopping Workflow
sidebar_label: Kubernetes AutoStopping Workflow
---

<DocImage path={require('./static/Kubernetes_AutoStopping_Workflow.png')} width="90%" height="90%" title="Click to view full size image" />

Just like the diagram shows, Kubernetes AutoStopping is a smart way to manage how programs run. It uses a special tool called an Envoy-based router to control how data moves around. This router is like a traffic director, making sure everything flows smoothly. Let's delve into its workings in more detail.

Here's a breakdown of how it works:

1. **Envoy-Based Router:** This tool sits in the traffic path, watching how data moves through the Kubernetes cluster.

2. **Integration with Existing Ingress:** It's smartly connected to the existing traffic routes, guiding data through the AutoStopping router for analysis.

3. **AutoStopping Controller:** This is like the brain of the operation. It watches the traffic patterns and decides how programs should run based on what it sees.

4. **Deployment of AutoStopping Configuration:** When you turn on AutoStopping, it starts a process where the AutoStopping router, AutoStopping Controller, and other tools are set up inside the Kubernetes cluster.

5. **Essential Tools and Configuration Maps:** Alongside AutoStopping, there are important tools and maps that help keep everything organized and working well, ensuring the AutoStopping system runs smoothly.


