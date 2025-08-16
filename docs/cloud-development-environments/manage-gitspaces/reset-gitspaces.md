---
title: Edit or Reset Gitspaces
description: Learn more about how you use the reset gitspaces integration to connect Harness to your privately-owned, on-prem assets. 
sidebar_position: 4
sidebar_label: Edit or Reset Gitspaces
---

This document will take you through the steps required to **edit** or **reset** your Gitspaces. There can be different situations and scenarios under which you'll need to either edit or reset the Gitspaces. The following sections will guide you through the process of editing and resetting your Gitspaces.

## Reset Gitspaces

Resetting your Gitspaces is a process that allows you to reset the state of your Gitspaces and revert the entire Gitspace configuration to fetch the latest changes from the original source. This process involves the following steps: 
- Resets the existing Gitspace `devcontainer` configuration and fetches the latest configuration from the source code repository.
- Rebuilds the Gitspace infrastructure to apply the latest changes. 
- Stores and reattaches the persistent disk changes to your Gitspace i.e. all your changes made in the Gitspace are preserved. 

This process is useful when you want to apply the latest changes made in your Gitspace configuration or your Gitspace infrastructure to your Gitspaces and reset the Gitspace to the latest state.

### Change of states
Gitspaces exist in different states throughout, moving from transient states to stable states. Go to [Lifecycle of Gitspaces](/docs/cloud-development-environments/deep-dive-into-gitspaces/lifecycle-of-gitspaces.md) to read more about the different states and processes involved. In case of resetting Gitspaces, there are a few things to note: 
- You can reset Gitspaces from **any state**. 
- Whenever you'll reset any Gitspace, the Gitspace state will change to `cleaning` and then to `uninitialized` state. This cleans up all the configuration, infrastructure, and resets the Gitspace to the latest state. 
- You'll have to **restart the Gitspace** to apply all the changes and use it. Go to [Start Gitspaces](/docs/cloud-development-environments/manage-gitspaces/existing-gitspaces.md) to learn more about restarting Gitspaces. 

### Steps to reset gitspaces

Follow the instructions below to reset any Gitspace: 

1. Go to the **Gitspaces Dashboard** screen in the **Cloud Development Environments** module in your Harness account. 
2. Select and go to the **Gitspace Details** UI for the Gitspace you want to reset. 
3. Go to **More Actions** and select **Reset Gitspace** -> **Reset**. 

## Edit Gitspaces