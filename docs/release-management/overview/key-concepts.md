---
title: Key Concepts
slug: /release-orchestration/overview/key-concepts
description: Learn the key concepts and terminology used in release orchestration
sidebar_position: 2
---

import DocImage from '@site/src/components/DocImage';

This topic covers the fundamental concepts and terminology used in Harness Release Orchestration.

## Release

A **release** represents a software delivery comprising different functions across teams, tools, and environments. Releases are modeled using processes that define the phases, activities, and dependencies required to complete the release.

<DocImage path={require('../static/release-sample.png')} title="Click to view full size image" />

Learn more: [Releases Overview](/docs/release-orchestration/releases/overview) | [Modeling Releases](/docs/release-orchestration/releases/modeling-releases)

## Process

A **process** is a reusable blueprint that defines the structure of a release. It consists of phases, activities, dependencies, inputs, and variables. Processes can be created manually or using AI-based process creation.

<DocImage path={require('../static/processes.png')} title="Click to view full size image" />

<DocImage path={require('../static/process-closeup.png')} title="Click to view full size image" />

Learn more: [Processes Overview](/docs/release-orchestration/processes/overview) | [Process Modeling](/docs/release-orchestration/processes/process-modeling) | [AI-Based Process Creation](/docs/release-orchestration/processes/ai-based-process-creation)

## Phases & Activities

A **phase** is a collection of activities which represents one logical group of functions. Phases are a logical grouping of activities within a release process. Phases represent major milestones or stages in the release lifecycle, such as "Planning and Coordination", "Testing and Validation", "Feature Flag Enablement", "Deployment", and "Monitoring". Phases can have dependencies on other phases.

An **activity** is a single unit of work within a phase. Activities can be of three types:

<DocImage path={require('../static/activities-and-phases.png')} title="Click to view full size image" />

- **Automated Activity**: An activity that encapsulates a pipeline. Th activity contains or references a Harness pipeline that executes automatically.

- **Manual Activity**: An activity where users can create tasks, record their actions, and finalize their actions in a manual fashion. Used for approvals, sign-offs, and manual verification steps.

- **Subprocess Activity**: An activity of process type, where a process can be referred within a process (called a subprocess).

Learn more: [Phases Overview](/docs/release-orchestration/phases/phases-overview) | [Activities Overview](/docs/release-orchestration/activities/activities-overview) | [Automated Activities](/docs/release-orchestration/activities/activity-types/automated-activities) | [Manual Activities](/docs/release-orchestration/activities/activity-types/manual-activities) | [Subprocess Activities](/docs/release-orchestration/activities/activity-types/subprocess-activities)

## Activity Store

The **activity store** contains a collection of reusable activities with inputs and outputs encapsulating the pipelines. Harness Release Orchestration provides activity stores where all the reusable activities pertaining to different processes can be modeled and selected. Activities can be reused across different processes, promoting consistency and reducing duplication.

<DocImage path={require('../static/activities-type-store.png')} title="Click to view full size image" />

Learn more: [Activity Store](/docs/release-orchestration/activities/activity-store) | [Reusable Activities](/docs/release-orchestration/activities/reusable-activities)

## Input Store

The **Input Store** is a collection of inputs for every process. There can be different sets of inputs for the same process, allowing you to execute the release multiple times with different sets of inputs. The Input Store holds the concrete values for:
- Process-level inputs
- Phase-level inputs
- Activity instance inputs within an execution
- Each process can posses multiple inputs instances

Input Store is a centralized place to manage the configuration inputs required to run your processes. Each automated activity needs to have an input set.

Process Input Set: A collection of activity input sets that apply across the entire release process

Activity Input Set: Defines the inputs needed for a specific activity within a phase of the process. Each activity must be linked to one input set for the process to run successfully.

<DocImage path={require('../static/inputstore-view.png')} title="Click to view full size image" />

Learn more: [Inputs and Variables Overview](/docs/release-orchestration/inputs-and-variables/overview)

## Release Group & Release Calendar

A **release group** is a collection of releases created and executed in a certain cadence.

The **release calendar** provides a visual representation of all planned and scheduled releases. It helps teams coordinate releases and avoid conflicts.

<DocImage path={require('../static/calendar.png')} title="Click to view full size image" />

Learn more: [Modeling Releases](/docs/release-orchestration/releases/modeling-releases)

## Variables

**Inputs** are parameters that are provided when creating or executing a process. **Variables** are values that can be used throughout the process and can be defined at different levels:
- **Global variables**: Available across the entire process
- **Phase variables**: Available within a specific phase
- **Activity variables**: Available within a specific activity

<DocImage path={require('../static/inputstore-variables.png')} title="Click to view full size image" />

Learn more: [Inputs and Variables Overview](/docs/release-orchestration/inputs-and-variables/overview) | [Global Variables](/docs/release-orchestration/inputs-and-variables/variable-types/global-variables) | [Phase Variables](/docs/release-orchestration/inputs-and-variables/variable-types/phase-variables) | [Activity Variables](/docs/release-orchestration/inputs-and-variables/variable-types/activity-variables)

## Process Execution

**Process Execution** refers to the actual running of a release. During execution, activities are executed according to their dependencies and configuration. The system tracks the status of each activity and the overall release progress.

Learn more: [Executing a release](/docs/release-orchestration/execution/executing-a-release) | [Activity Execution Flow](/docs/release-orchestration/execution/activity-execution-flow) | [Parallel vs Sequential Execution](/docs/release-orchestration/execution/parallel-vs-sequential-execution)

## Related Topics

- [Process Modeling](/docs/release-orchestration/processes/process-modeling)
- [Release Lifecycle](/docs/release-orchestration/releases/release-lifecycle)

