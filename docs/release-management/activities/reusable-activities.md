---
title: Reusable Activities
slug: /release-orchestration/activities/reusable-activities
description: Learn how to create and use reusable activities across multiple processes
sidebar_position: 4
---

Reusable activities are activities that can be used across multiple processes, promoting consistency and reducing duplication.

## What are Reusable Activities?

Reusable activities are activities that:
- **Can be shared** across multiple processes
- **Have consistent behavior** wherever used
- **Are centrally maintained** and updated
- **Promote standardization** across the organization

## Benefits

### Consistency
- Same activity behaves the same everywhere
- Standardized configurations
- Consistent error handling
- Uniform logging and monitoring

### Efficiency
- Create once, use many times
- Faster process creation
- Reduced configuration errors
- Less maintenance overhead

### Quality
- Well-tested activities
- Best practices built-in
- Centralized improvements

## Creating Reusable Activities

### Design for Reusability
When creating reusable activities:
- **Parameterize**: Use inputs and variables
- **Generalize**: Avoid hardcoded values
- **Document**: Clear purpose and usage
- **Test**: Thoroughly test before sharing

### Activity configuration
Reusable activities should be parameterized using inputs and variables so they can be used in different phases and processes.

### Sharing Options
Share activities with:
- **Organization**: All teams
- **Project**: Specific projects
- **Team**: Team members
- **Private**: Personal use

## Using Reusable Activities

### From Activity Store
1. Browse activity store
2. Search for activities
3. Select activity
4. Add to process
5. Configure inputs

### Configuration
When you add a reusable activity to a process, you provide the values required for that activity (for example, via global/phase/activity variables mapped through the process).

## Best Practices

### Parameterization
Make activities configurable:
- Use inputs for variable values
- Avoid hardcoded configurations
- Provide sensible defaults

### Documentation
Document activities clearly:
- Purpose and usage
- Required inputs
- Expected outputs
- Common configurations

### Testing
Test activities thoroughly:
- Unit testing
- Integration testing
- Edge case testing
- Failure scenario testing

### Maintenance
Maintain activities properly:
- Regular updates
- Bug fixes
- Performance improvements
- Security patches

## Related Topics

- [Activity Store](./activity-store.md)
- [Activities Overview](./activities-overview.md)
- [Process Modeling](../processes/process-modeling.md)

