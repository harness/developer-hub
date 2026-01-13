---
title: Overview
sidebar_position: 1
---

:::info New Chaos Studio Feature
**Actions** are part of the enhanced **New Chaos Studio** experience. If you're an existing customer and want access to new features, contact your Harness support representative. For more details, see [New Chaos Studio Features](/docs/chaos-engineering#new-chaos-studio-features).
:::

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

### 3. Container Action

The **Container Action** allows you to execute commands inside a container during the experiment. This provides capabilities to:
- Execute commands in containerized environments
- Perform application-specific operations
- Run validation or diagnostic commands
- Implement custom setup or cleanup operations

**Key Features:**
- Execute commands inside containers
- Support for custom container images
- Flexible command and argument configuration
- Advanced configuration options for Kubernetes environments

## Action Configuration

### Infrastructure Type Support

Actions support different infrastructure types:
- **Kubernetes** - Actions can be executed in Kubernetes environments
- **Windows** - Actions can be configured for Windows infrastructure targets

### Action Execution

Actions are executed as part of the experiment workflow and can be:
- **Sequential** - Executed one after another in a defined order
- **Parallel** - Multiple actions can run simultaneously if configured


## Built-in Action Templates

Harness provides pre-built action templates to help you quickly integrate common operations into your chaos experiments. These templates are ready to use and can be customized to fit your specific requirements.

:::note
Currently, built-in templates are available for **Custom Script Actions** targeting **Kubernetes** infrastructure. Templates for other action types and platforms will be added in future releases.
:::

import ChaosFaults from '@site/src/components/ChaosEngineering/ChaosFaults';
import { actionTemplateCategories } from '../../content/actions/action-templates';

<ChaosFaults categories={actionTemplateCategories} />

## Next Steps

- [Create your first experiment with actions](/docs/chaos-engineering/guides/chaos-experiments/create-experiments)
- [Learn about Delay Actions](./delay-action)
- [Learn about Custom Script Actions](./custom-script-action)
- [Learn about Container Actions](./container-action)
- [Explore experiment timeline view](/docs/chaos-engineering/guides/chaos-experiments/timeline-view-experiments)
