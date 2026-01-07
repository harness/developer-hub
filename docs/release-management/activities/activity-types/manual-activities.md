---
title: Manual Activities
slug: /release-orchestration/activities/activity-types/manual-activities
description: Learn about manual activities and how to configure them for human intervention
sidebar_position: 2
---

Manual activities require human intervention and provide checkpoints where team members must perform actions, provide approvals, or complete tasks.

## What are Manual Activities?

A manual activity is an activity where users can create tasks, record their inputs, and finalize their inputs in a manual fashion. Manual activities require human intervention and provide checkpoints where team members must perform actions, provide approvals, or complete tasks.

Manual activities enable:
- **Human Oversight**: Critical decision points
- **Manual Tasks**: Actions that can't be automated
- **Approvals**: Required sign-offs
- **Reviews**: Code or configuration reviews
- **Input Recording**: Users can record their inputs and finalize them manually
- **Sign-offs**: Users can provide sign-offs with QA inputs or other documentation

## Manual Activity Workflow

When a manual activity is encountered during release execution:

1. **Activity Goes On Hold**: The activity enters a "waiting for input" or "on hold" state
2. **Notification Sent**: Notifications are sent to the activity owner or assigned users
3. **User Action Required**: Users need to:
   - Review the activity requirements
   - Create tasks if needed
   - Record their inputs
   - Finalize their inputs manually
4. **Sign-off**: Users can provide sign-offs, such as:
   - "I'm signing off this release with the QA inputs"
   - Record QA inputs and test results
   - Provide approval comments
5. **Completion**: Once inputs are finalized and sign-off is provided, the activity completes and the release continues

## Types of Manual Activities

### Manual Tasks
Tasks requiring user action:
- **Data Entry**: Manual data input
- **Configuration**: Manual configuration changes
- **Verification**: Manual verification steps
- **Documentation**: Manual documentation tasks

### Approval Activities
Activities requiring approval:
- **Deployment Approval**: Approve deployments
- **Release Approval**: Approve releases
- **Change Approval**: Approve changes
- **Go/No-Go Decisions**: Release go/no-go

### Review Activities
Activities requiring review:
- **Code Review**: Code review checkpoints
- **Configuration Review**: Configuration validation
- **Security Review**: Security assessment
- **Compliance Review**: Compliance validation

### Testing Activities
Manual testing tasks:
- **User Acceptance Testing**: UAT execution
- **Exploratory Testing**: Manual exploration
- **Performance Testing**: Manual performance validation
- **Integration Testing**: Manual integration checks

## Configuration

### Example (YAML)
This example shows a manual activity in a process, including a dependency on a prior activity.

```yaml
phase:
  id: build_phase
  name: Build Phase
  activities:
    - activity: ManualTest
      id: AutoIioo
      name: Auto_deploy
      description: doc
      depends-on:
        - AutoPipe12
```

## Approval Workflows

### Single Approval
One person must approve:
```yaml
activity:
  name: "Deployment Approval"
  type: "manual"
  approval_type: "single"
  approver: "${release_manager}"
```

### Multiple Approvals
Multiple people must approve:
```yaml
activity:
  name: "Release Approval"
  type: "manual"
  approval_type: "multiple"
  approvers:
    - "${release_manager}"
    - "${security_lead}"
    - "${operations_lead}"
  required_approvals: 2
```

### Sequential Approvals
Approvals in sequence:
```yaml
activity:
  name: "Cascading Approval"
  type: "manual"
  approval_type: "sequential"
  approvers:
    - "${team_lead}"
    - "${department_head}"
    - "${vp_engineering}"
```

## Notifications

### Assignment Notifications
Notify when assigned:
```yaml
activity:
  name: "Manual Task"
  type: "manual"
  notifications:
    on_assignment: true
    channels: ["email", "slack"]
```

### Reminder Notifications
Send reminders:
```yaml
activity:
  name: "Pending Approval"
  type: "manual"
  reminders:
    - after: "4 hours"
    - after: "12 hours"
    - after: "24 hours"
```

## Best Practices

### Clear Instructions
Provide detailed instructions:
- What needs to be done
- Why it's needed
- What to check
- How to complete

### Appropriate Timeouts
Set reasonable timeouts:
- Not too short: Rushed decisions
- Not too long: Blocking releases
- Consider time zones
- Account for weekends

### Owner Assignment
Assign appropriate owners:
- Right person for the task
- Available during release window
- Has necessary permissions
- Backup assignees

### Documentation
Document manual activities:
- Purpose and context
- Expected outcomes
- Common issues
- Escalation procedures

## Related Topics

- [Activities Overview](../activities-overview.md)
- [Automated Activities](./automated-activities.md)
- [Capturing Sign-off](../../collaboration-and-approvals/manual-approvals.md)

