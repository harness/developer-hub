---
title: Activity Variables
slug: /release-orchestration/inputs-and-variables/variable-types/activity-variables
description: Learn about activity variables and how to scope variables to activities
sidebar_position: 3
---

Activity variables are inputs that are specific and local to a specific activity instance. They provide the most granular level of configuration in the variable hierarchy, allowing you to customize individual activities without affecting others.

This isolation makes them ideal for settings that are unique to a single activity's execution, such as deployment targets, notification channels, or activity-specific feature flags.

## What are Activity Variables?

Activity variables are scoped to the activity where they're defined, making them available only within that specific activity instance. They can inherit values from phase or global variables if those values aren't overridden at the activity level.

Each activity can have its own unique configuration, even when multiple activities use the same template. This makes activity variables the most specific variable scope available, providing the narrowest scope in the variable hierarchy.

## Examples

Activity variables are useful for configuration that's specific to a single activity's execution. Common examples include the image tag or artifact ID to deploy, the Jira project or issue type to be updated for a release, or the Slack channel to notify for this activity only.

The name of the feature flag in terms of functionality to be enabled for the feature is another common use case.

## Features

Each activity variable supports default and static values. When a variable is created, default values can be assigned to the activity. When a default value is assigned to the variable, the activity always gets executed with that value. When the value needs to be overridden, users can provide the value during execution.

## Usage

Activity variables allow you to customize the behavior of a reusable activity template per phase or per release. This means you can use the same activity template multiple times with different configurations, tailoring each instance to its specific context.

They also let you override default values defined in the template when needed, providing flexibility to adapt to different execution scenarios without modifying the underlying template.

## Defaults and overrides

Activity variables can have default values assigned when they're created, which provides a baseline configuration for the activity. These defaults ensure the activity can execute successfully even if no specific values are provided during release execution.

You can override them during execution when needed, allowing you to adapt to different scenarios or requirements without changing the activity definition.

### Variable Resolution

The system resolves variables in this order: activity variables are checked first, then phase variables, then global variables, and finally process defaults.

## Variable Isolation

### Activity Isolation

Variables are isolated per activity. Activity A has its own variables, and Activity B has its own variables. Variables don't share between activities, providing clear boundaries for variable scope.

## Best Practices

### Appropriate Scope

Use activity variables when the variable is only needed in the activity, for activity-specific configuration, for isolated activity logic, or when you need activity-specific defaults.

### Clear Naming

Use descriptive names that make it clear what the variable represents. For example, use `service_deployment_port` rather than a generic name like `port`.

## Related Topics

- [Inputs and Variables Overview](../overview.md)
- [Global Variables](./global-variables.md)
- [Phase Variables](./phase-variables.md)
- [Variable Mapping](../variable-mapping.md)

