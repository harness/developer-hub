---
title: Manual Activities
slug: /release-orchestration/activities/activity-types/manual-activities
description: Learn about manual activities and how to configure them for human intervention
sidebar_position: 2
---

Manual activities require human intervention and provide checkpoints where team members must perform actions, provide approvals, or complete tasks. These activities pause the release execution and wait for designated users to take action before proceeding.

## What are Manual Activities?

A manual activity is an activity where users can create tasks, record their inputs, and finalize their inputs in a manual fashion. Manual activities require human intervention and provide checkpoints where team members must perform actions, provide approvals, or complete tasks.

Manual activities enable human oversight at critical decision points where automated execution isn't appropriate. They support manual tasks that can't be automated, such as complex validations or decisions that require human judgment.

These activities also handle required sign-offs and approvals, code or configuration reviews, and allow users to record their inputs and finalize them manually. Users can provide sign-offs with QA inputs or other documentation, creating an audit trail of decisions and validations.

## Manual Activity Workflow

When a manual activity is encountered during release execution, the workflow follows a structured process. The activity enters a "waiting for input" or "on hold" state, pausing the release at that point. Notifications are sent to the activity owner or assigned users, alerting them that their action is required.

Users need to review the activity requirements, create tasks if needed, record their inputs, and finalize their inputs manually. Users can provide sign-offs, such as stating "I'm signing off this release with the QA inputs," recording QA inputs and test results, or providing approval comments that explain their decision.

Once inputs are finalized and sign-off is provided, the activity completes and the release continues to the next step.

## Types of Manual Activities

### Manual Tasks

Manual tasks require user action that can't be automated. These include manual data entry where users must input information, manual configuration changes that need human verification, and manual verification steps that require visual inspection or judgment.

Manual documentation tasks that need human review and completion are also part of this category.

### Approval Activities

Approval activities require explicit sign-off from designated approvers. These include deployment approvals where stakeholders must approve before deployments proceed, and release approvals for overall release go-ahead.

Change approvals for configuration or process changes, and go/no-go decisions where teams jointly decide whether to proceed with a release, are also common approval activity types.

### Review Activities

Review activities require human review and validation. These include code review checkpoints where developers must review code changes, and configuration review where settings must be validated.

Security review where security teams assess risks, and compliance review where compliance teams verify regulatory requirements are met, are also important review activity types.

### Testing Activities

Manual testing tasks require human testers to perform validation. These include user acceptance testing where end users validate functionality, and exploratory testing where testers manually explore the system.

Manual performance validation where teams verify performance characteristics, and manual integration checks where teams verify system integration points, are also common testing activities.

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

Provide detailed instructions that explain what needs to be done, why it's needed, what to check, and how to complete the activity.

Clear instructions reduce confusion and ensure users can complete manual activities efficiently without needing to ask questions or make assumptions about what's required.

### Appropriate Timeouts

Set reasonable timeouts that balance urgency with practicality. Timeouts shouldn't be too short, which forces rushed decisions, or too long, which blocks releases unnecessarily.

Consider time zones when setting deadlines, and account for weekends and holidays when releases might span non-business days.

### Owner Assignment

Assign appropriate owners who are the right person for the task, available during the release window, and have the necessary permissions to complete the activity.

It's also important to designate backup assignees who can step in if the primary owner is unavailable, preventing releases from stalling due to a single person's absence.

### Documentation

Document manual activities thoroughly, including their purpose and context, expected outcomes, common issues that arise, and escalation procedures for when things go wrong.

Good documentation helps users understand what they're approving or validating and provides guidance for handling edge cases or problems.

## Related Topics

- [Activities Overview](../activities-overview.md)
- [Automated Activities](./automated-activities.md)
- [Capturing Sign-off](../../collaboration-and-approvals/manual-approvals.md)

