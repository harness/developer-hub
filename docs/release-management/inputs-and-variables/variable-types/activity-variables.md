---
title: Activity Variables
slug: /release-orchestration/inputs-and-variables/variable-types/activity-variables
description: Learn about activity variables and how to scope variables to activities
sidebar_position: 3
---

Activity variables are inputs that are specific and local to a specific activity instance.

## What are Activity Variables?

Activity variables are:
- **Activity-Scoped**: Available only in the activity
- **Inherited**: Can inherit from phase/global
- **Activity-Specific**: Unique to the activity
- **Most Specific**: Narrowest variable scope

## Examples

Following are examples of activity variables:

- **Image tag or artifact ID** to deploy
- **Jira project/issue type** to be updated for a release
- **Slack channel** to notify for this activity only
- **Name of the feature flag** in terms of functionality to be enabled for the feature

## Features

Each activity variable supports default and static values. When a variable is created, default values can be assigned to the activity. When a default value is assigned to the variable, the activity always gets executed with that value. When the value needs to be overridden, users can provide the value during execution.

## Usage

Activity variables allow you to:
- **Customize the behavior** of a reusable activity template per phase or per release
- **Override default values** defined in the template when needed

## Defaults and overrides

Activity variables can have default values. You can override them during execution when needed.

### Variable Resolution
Resolution order:
1. Activity variables
2. Phase variables
3. Global variables
4. Process defaults

## Variable Isolation

### Activity Isolation
Variables isolated per activity:
- **Activity A**: Has its own variables
- **Activity B**: Has its own variables
- **No Sharing**: Variables don't share
- **Clear Scope**: Clear boundaries

## Best Practices

### Appropriate Scope
Use activity variables when:
- Variable only needed in activity
- Activity-specific configuration
- Isolated activity logic
- Activity-specific defaults

### Clear Naming
Use descriptive names:
- **Recommended:** `service_deployment_port`
- **Avoid:** `port`

## Related Topics

- [Inputs and Variables Overview](../overview.md)
- [Global Variables](./global-variables.md)
- [Phase Variables](./phase-variables.md)
- [Variable Mapping](../variable-mapping.md)

