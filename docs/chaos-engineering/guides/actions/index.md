---
title: Overview
sidebar_position: 1
---

This topic introduces **Actions** and demonstrates how you can use them to perform specific operations during your chaos experiments.

## What are Actions?

**Actions** are operations that can be executed during a chaos experiment to perform specific tasks or operations. Actions allow you to extend the capabilities of your chaos experiments beyond just fault injection by adding custom operations, delays, or scripts that can be executed at specific points during the experiment lifecycle.

Actions can be used to:
- Add delays between different phases of an experiment
- Execute custom scripts for setup, validation, or cleanup
- Perform specific operations that are required for your experiment workflow
- Implement custom logic that is specific to your application or infrastructure

## Types of Actions

Harness Chaos supports the following types of actions:

### 1. Delay Action

The **Delay Action** allows you to introduce a time delay during the experiment execution. This is useful when you need to:
- Wait for systems to stabilize after fault injection
- Create time gaps between different experiment phases
- Allow time for monitoring systems to capture metrics
- Simulate real-world scenarios where operations take time

**Key Features:**
- Configurable delay duration
- Can be placed at any point in the experiment workflow
- Helps in creating realistic experiment scenarios

### 2. Custom Script Action

The **Custom Script Action** allows you to execute custom scripts during the experiment. This provides flexibility to:
- Run custom validation logic
- Perform setup or cleanup operations
- Execute application-specific commands
- Integrate with external systems or APIs

**Key Features:**
- Support for custom script execution
- Flexible scripting capabilities
- Can be used for complex validation scenarios
- Enables integration with external tools and systems

## Action Configuration

### Infrastructure Type Support

Actions support different infrastructure types:
- **Kubernetes** - Actions can be executed in Kubernetes environments
- **Linux** - Actions can be configured for Linux infrastructure targets

### Action Execution

Actions are executed as part of the experiment workflow and can be:
- **Sequential** - Executed one after another in a defined order
- **Parallel** - Multiple actions can run simultaneously if configured


## Next Steps

- [Create your first experiment with actions](/docs/chaos-engineering/guides/chaos-experiments/create-experiments)
- [Learn about Delay Actions](./delay-action)
- [Learn about Custom Script Actions](./custom-script-action)
- [Explore experiment timeline view](/docs/chaos-engineering/guides/chaos-experiments/timeline-view-experiments)
