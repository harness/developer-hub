---
title: IaCM Architecture
description: A guide to Harness IaCM Architecture
sidebar_position: 15
sidebar_label: IaCM Architecture
---

import InteractiveIaCMArchitecture from "../components/interactive_architecture";

# IaCM Architecture

Infrastructure as Code Management architecture the following:

- **Control Plane:** handles resource definition and functionality config management.
- **Execution Plane:** based on definitions handles the running of tasks.
- **Reporting and Dashboards:** aggregations of system activity and changes.
- **Triggers:** Everything is driven through the API but multiple drivers: UI, git, CLI etc

The system is designed to be extensible with functionality being built through the combination of config and tasks executors. 

## IaCM-specific services

Harness Infrastructure as Code Management hosts its own service while integrating with Harness Platform Services and Harness CI Pipeline Services

IaCM utilizes three internal services:

### IaCM Server

### IaCM Pipeline Manager

### IaCM Plugin

## Interactive Diagram

<InteractiveIaCMArchitecture />



