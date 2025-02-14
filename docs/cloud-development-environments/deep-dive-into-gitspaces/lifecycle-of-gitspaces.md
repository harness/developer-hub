---
title: Understanding the Gitspace Lifecycle
description: Understand the stages in the life of a Gitspace.
sidebar_position: 2
sidebar_label: Gitspace Lifecycle
---

This guide explains the lifecycle of Gitspaces, detailing the different states a Gitspace can exist in and the actions associated with each state.

<img width="800" src="https://github.com/user-attachments/assets/e6a6f759-7165-4d09-9dc9-21cb6d5d3049"/>

Watch this video to understand the lifecycle of Gitspaces in action:

<iframe width="500" height="275" src="https://www.youtube.com/embed/NKyFKUBJdzY?si=amWv4T-FTmYJp5uD" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## States of a Gitspace
A Gitspace can be in one of the following three states:
- ```Active```: The Gitspace is running and ready for development 
- ```Stopped```: The Gitspace is stopped and can be restarted for development 
- ```Error```: System generated error state

The CDE control plane manages the Gitspace lifecycle. Your Gitspace will stay active while you’re working in your IDE, but it will automatically time out after a period of inactivity.

## Actions of a Gitspace

### Creating a Gitspace
Gitspaces can be created directly from the Harness UI. [Learn more about how you can create a Gitspace here](/docs/cloud-development-environments/introduction/quickstart-guide.md). 

When a user creates a Gitspace, a message is sent to the CDE control plane with all the required details to start the Gitspace. The CDE control plane resolves all the Gitspace details and provisions the VM as per the resource requirements. 

A dev container is created and spun up based on the configuration present in the devcontainer.json file. Once the Gitspace is created, the CDE control plane generates a Gitspace URL. 

### Stopping a Gitspace
You can stop a Gitspace by clicking on “Stop Gitspace” from either the Harness UI or the Gitspaces VS code extension. The CDE control plane stops the container. 

### Restarting a Gitspace
You can also restart the Gitspace directly from the Harness UI or the Gitspaces VS code extension.

In that case, the CDE control plane will restart the VM and the gitspace will be back up and running.

### Deleting a Gitspace
Click on “Delete Gitspace” from the Harness UI. 

The CDE control plane stops the container (in case it's already running). It deletes the container, VM and the associated storage, effectively deleting the gitspace.

Learn more about [Gitspace actions](/docs/cloud-development-environments/manage-gitspaces/existing-gitspaces) here. 