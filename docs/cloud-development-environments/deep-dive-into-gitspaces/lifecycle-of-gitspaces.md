---
title: Lifecycle of Gitspaces
description: Different states and actions of a Gitspace 
sidebar_position: 2
sidebar_label: Lifecycle of Gitspaces
redirect_from:
  - /docs/cloud-development-environments/deep-dive-into-gitspaces/lifecycle-of-gitspaces
---

:::info

Harness CDE is now available in public beta. To enable it on your account, contact your sales representative or reach out to the team at cde-interest@harness.io

:::

This guide will take you through the different states and actions a Gitspace can exist in.

Watch this video to understand the lifecycle of Gitspaces in action:
[![Lifecycle of Gitspaces](https://markdown-videos-api.jorgenkh.no/url?url=https%3A%2F%2Fyoutu.be%2FNKyFKUBJdzY%3Fsi%3DhLjUc034BBtyxXZa)](https://youtu.be/NKyFKUBJdzY?si=hLjUc034BBtyxXZa)


The CDE control plane is responsible for managing the lifecycle of a Gitspace. Your gitspace will keep running while you are using it in your IDE, but will time out after a period of inactivity. 

## Stopping a Gitspace
Click on “Stop Gitspace” from either the Harness UI or the Gitspaces VS code extension. 
The CDE control plane stops the container. 
The VM for the specific gitspace can be suspended /spun down which in turn stops the gitspace. 

## Restarting a Gitspace
You can also restart the gitspace directly from the Harness UI or the Gitspaces VS code extension. In that case, the CDE control plane will restart the VM and the gitspace will be back up and running. 

## Deleting a Gitspace
Click on “Delete Gitspace” from the Harness UI.
The CDE control plane stops the container (in case it's already running). 
It deletes the container, VM and the associated storage, effectively deleting the gitspace. 
