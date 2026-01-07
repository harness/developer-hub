---
title: Activity Store
slug: /release-orchestration/activities/activity-store
description: Learn about the activity store and how to use reusable activities
sidebar_position: 2
---

The activity store is a centralized repository of reusable activities that can be used across multiple processes. It promotes consistency, reduces duplication, and accelerates process creation.

## What is the Activity Store?

Activity Store is a collection of activity templates. Each activity template abstracts the activity with the inputs required to achieve the function. Activities are stored as templates to support reuse and governance.

The Activity Store contains:

- **Reusable activity templates** (for example, planning, build, deploy, notify)
- **Inputs and outputs** that encapsulate underlying pipelines for automated activities

## Benefits

### Consistency
- Standardized activity implementations
 - Consistent behavior across processes
 - Reduced rework across teams

### Reusability
- Use activities in multiple processes
- Avoid recreating similar activities
- Share activities across teams

### Efficiency
- Faster process creation
- Pre-configured integrations
- Best practices built-in

## Activity Store Contents

### Standard Activities
Common activities provided by the platform:
- **CI/CD Integration**: Pipeline execution
- **Deployment Activities**: Environment deployments
- **Testing Activities**: Test execution
- **Notification Activities**: Alerts and notifications

### Custom Activities
Activities created by your organization:
- **Organization-Specific**: Internal tools and processes
- **Team-Specific**: Team workflows
- **Project-Specific**: Project requirements

### Activity Categories
Activities organized by category:
- **Deployment**: Deployment-related activities
- **Testing**: Testing and validation
- **Integration**: External system integration
- **Communication**: Notifications and alerts
- **Governance**: Approvals and compliance

## Using Activities from the Store

### Browsing Activities
1. Open the activity store
2. Browse by category
3. Search for specific activities
4. View activity details

### Adding to Process
1. Select activity from store
2. Add to phase
3. Configure activity settings
4. Set up dependencies

### Activity Configuration
Configure activities for your needs:
- **Inputs**: Provide required parameters
 - **Variables**: Set variable values
 - **Outputs**: Map activity outputs (when applicable)

## Creating Custom Activities

### When to Create
Create custom activities when:
- Standard activities don't meet needs
- Organization-specific requirements
- Reusable across multiple processes
- Complex configuration needed

### Activity Creation
1. Define activity purpose
2. Configure activity settings
3. Set up inputs and outputs
4. Publish to store

### Activity Sharing
Share activities with:
- **Organization**: All teams
- **Project**: Specific projects
- **Team**: Team members
- **Private**: Personal use

## Related Topics

- [Activities Overview](./activities-overview.md)
- [Automated Activities](./activity-types/automated-activities.md)
- [Manual Activities](./activity-types/manual-activities.md)
- [Reusable Activities](./reusable-activities.md)

