---
title: Overview
slug: /release-orchestration/releases/overview
description: Learn about releases and how they represent planned deployments
sidebar_position: 1
---

Releases represent software delivery executed using a process. A release is the instantiation of a process blueprint with concrete inputs, connecting the abstract workflow to real-world deployment activities across services, environments, and teams.

## What is a Release?

A **release** is an instance of a process—a runnable execution of a predefined workflow with specific inputs and configurations. While a process defines *how* releases should be executed (the phases, activities, and dependencies), a release defines *what* is being delivered and *when* it should happen.

Think of it this way:
- **Process**: The blueprint or template (for example, "Weekly Production Release Process")
- **Release**: The actual execution of that blueprint (for example, "Week 15 Production Release - Services A, B, C")

A release includes:
- **Process**: The process template it's based on, which defines the structure, phases, and activities
- **Inputs**: Specific values for process inputs (services, versions, environments, configurations)
- **Variables**: Release-specific variable values that control behavior at runtime
- **Schedule**: When the release should execute (immediate, scheduled, or recurring)
- **Status**: Current execution status (Not Started, Running, Completed, Failed)
- **Ownership**: Team or individuals responsible for managing the release
- **Audit Trail**: Complete history of execution, approvals, changes, and outcomes

## Why Releases Matter

Releases bridge the gap between abstract process definitions and concrete software delivery:

**End-to-End Visibility**: Releases provide a single source of truth for what's being deployed, where it's going, and what stage it's in. Stakeholders can track progress in real-time without chasing updates across multiple tools or chat channels.

**Governance and Auditability**: Every release execution is tracked with full evidence trails—who approved what, when activities executed, what inputs were provided, and what the outcomes were. This satisfies regulatory requirements and simplifies compliance audits.

**Coordination Across Teams**: Releases make handoffs explicit. Development, QA, Security, and Operations teams all work within the same release context, reducing coordination overhead and miscommunication.

**Predictability and Planning**: By modeling releases on a calendar with defined cadences, teams can plan ahead, avoid conflicts, and coordinate dependencies across multiple services and systems.

**Traceability**: Releases link commits, builds, artifacts, tests, approvals, and deployments into one coherent record, answering questions like "What's deployed in production?" or "Which commits are in this staging deployment?" instantly.

## Release Execution

Releases are created from processes and can be executed in several ways to accommodate different organizational needs and release strategies:

### Scheduled Execution
Releases configured to execute at a specific date and time based on business cadence:
- **Weekly releases**: For example, every Thursday at 2:00 PM for production deployments
- **Monthly releases**: For example, first Monday of each month for system-wide updates
- **Custom schedules**: Any cadence that matches your organizational rhythm

Scheduled execution enables predictable release windows, better resource planning, and reduced conflicts across teams.

### Pre-Execution
Execute a release before its scheduled time when circumstances require it:
- **Early deployments**: Push critical features or fixes ahead of schedule
- **Testing and validation**: Run through the release process in advance to identify issues
- **Coordination with external events**: Align with customer announcements or partner integrations

Pre-execution preserves the same audit trail, approvals, and governance as scheduled execution.

### On-Demand Execution
Trigger releases immediately when needed:
- **Hotfix releases**: Emergency deployments for critical production issues
- **Feature releases**: Deploy when a feature is ready, not tied to a fixed schedule
- **Customer-specific releases**: Deploy to specific customer environments on request

### Process Integration
Once releases are connected with processes, software delivery becomes:
- **Automated**: Activities execute automatically based on the process definition
- **Visible**: All stakeholders see the same real-time view of progress
- **Auditable**: Every action, approval, and change is tracked for compliance
- **Governed**: Required checkpoints, approvals, and validations are enforced

The release calendar provides consolidated visualization of all releases across the organization, helping teams coordinate, avoid conflicts, and plan capacity.

## Release Types and Use Cases

Different release types serve different purposes:

### Standard Release
Regular, planned deployments following a defined cadence:
- **Example**: Weekly production release every Thursday
- **Characteristics**: Follows complete process with all validation phases
- **Use Case**: Routine feature deployments, scheduled updates

### Hotfix Release
Emergency deployments for critical issues:
- **Example**: Security patch deployed immediately
- **Characteristics**: Streamlined process with essential validation only
- **Use Case**: Production incidents, critical security vulnerabilities

### Feature Release
Deploying specific features or capabilities:
- **Example**: Enabling a new feature flag for gradual rollout
- **Characteristics**: Feature-specific validation and monitoring
- **Use Case**: New product capabilities, A/B testing, progressive delivery

### System Release
Coordinated deployment across multiple services and environments:
- **Example**: Quarterly platform upgrade affecting 50+ services
- **Characteristics**: Multi-phase deployment over days or weeks
- **Use Case**: Major version upgrades, platform-wide changes, infrastructure migrations

## Release Components

A release consists of several interconnected components that work together to execute software delivery:

### Process
The process template the release is based on defines the release's structure:
- **Phases**: The logical stages the release will progress through (Build, Test, Deploy, Monitor)
- **Activities**: The specific tasks within each phase (automated pipelines, manual approvals, subprocesses)
- **Dependencies**: The execution order and relationships between phases and activities
- **Approvals and Gates**: Required checkpoints before proceeding to critical phases
- **Owners**: Teams or individuals responsible for each phase

The process remains unchanged across releases—it's the reusable blueprint that ensures consistency.

### Inputs
Concrete values provided when creating or executing the release:
- **Service Names**: Which services are included in this release (for example, payment-service, user-service)
- **Versions**: Artifact versions, build numbers, or commit SHAs to deploy
- **Environments**: Target environments (DEV, QA, UAT, PROD1, PROD2, PROD3)
- **Configuration Values**: Environment-specific settings, feature flag states, resource limits
- **Metadata**: Release notes, ticket IDs, customer names, rollback plans

Inputs are what make each release unique—the same process executed with different inputs produces different releases.

### Variables
Release-specific variable values that control runtime behavior:
- **Global Variables**: Available across the entire release (for example, `releaseVersion`, `targetRegion`)
- **Phase Variables**: Scoped to specific phases (for example, `qaEnvironment` for the Testing phase)
- **Activity Variables**: Scoped to specific activities (for example, `deploymentTimeout` for a deployment activity)
- **Computed Values**: Derived from other variables or activity outputs (for example, artifact URL from build output)

Variables enable flexible, reusable processes that adapt to different scenarios without code changes.

### Schedule
When and how the release should execute:
- **Immediate Execution**: Start the release now
- **Scheduled Execution**: Execute at a specific date and time (for example, Friday, April 15, 2025 at 2:00 PM UTC)
- **Recurring Releases**: Automatically generated releases on a recurring cadence via release groups (for example, every Thursday for 2 days)
- **Calendar-Based Scheduling**: Visualized on the release calendar for coordination and conflict avoidance

### Ownership and Collaboration
Who is responsible for the release and its phases:
- **Release Manager**: Overall release coordinator
- **Phase Owners**: Teams responsible for specific phases (Development for Build, QA for Testing, Operations for Deployment)
- **Activity Owners**: Individuals responsible for specific activities (for example, specific approvers for production sign-off)
- **Stakeholders**: Interested parties who receive notifications and can view progress

Clear ownership enables accountability and streamlines coordination across teams.

## Release Status

Releases have statuses that reflect their execution state, providing immediate visibility into where the release stands:

### Status Lifecycle

**NotStarted (Draft or Scheduled)**
- Release has been created but execution hasn't begun
- Waiting for scheduled time or manual trigger
- Inputs may still be under review or adjustment
- No phases or activities have executed yet

**Running (In Progress)**
- At least one phase is actively executing
- Activities are being processed according to dependencies
- Teams are working through their assigned phases
- May include activities waiting for approvals or manual input

**On Hold (Input Required)**
- Release is paused waiting for manual intervention
- Could be waiting for approvals, sign-offs, or additional inputs
- Specific owners are notified to provide required information
- Execution resumes once inputs are provided

**Success (Completed Successfully)**
- All required phases completed successfully
- All critical activities passed
- Optional activities may have been skipped or ignored
- Release delivered successfully to target environments

**Failed (Encountered Critical Failure)**
- At least one critical phase or activity failed
- Recovery actions (retry, fix-and-continue) were not successful
- Rollback may be required
- Requires investigation and remediation

**PartialSuccess (Mixed Outcomes)**
- Some phases succeeded while others failed or were skipped
- Non-critical failures were ignored to allow progression
- Release delivered but with known limitations or missing components
- Documented for follow-up or future fixes

**Aborted (Manually Stopped)**
- Release was intentionally stopped before completion
- Could be due to external factors, higher-priority issues, or decision to defer
- Can be restarted or rescheduled as needed

### Status Visibility

Status is visible at multiple levels:
- **Release Level**: Overall status of the entire release
- **Phase Level**: Status of each logical stage (Build, Test, Deploy)
- **Activity Level**: Status of each individual task within phases

This hierarchical status tracking enables quick diagnosis: if a release is Failed, you can drill down to see which phase failed, and further down to identify the specific activity that encountered the issue.

## Release Creation Levels

Releases can be created at different organizational levels to match your structure and governance requirements:

### Account-Level Releases
Recommended for organizations with a smaller number of sub-organizations and similar release requirements:
- **Scope**: Applies across the entire account and all organizations
- **Use Case**: Company-wide releases, platform updates, shared infrastructure deployments
- **Governance**: Centralized control and coordination
- **Visibility**: All organizations see and participate in the same release
- **Restriction**: If releases are created at the account level, organization-level releases should not be created to avoid conflicts

**Example**: A quarterly platform release affecting all business units, requiring coordinated deployment across 20+ organizations.

### Organization-Level Releases
For organizations with independent release requirements:
- **Scope**: Applies only within a specific organization
- **Use Case**: Organization-specific features, independent product lines, regional deployments
- **Governance**: Organization autonomy while adhering to account-level policies
- **Visibility**: Only visible within the organization
- **Flexibility**: Each organization can define its own release cadence and processes

**Example**: An e-commerce organization's weekly feature release, independent of other organizations' release schedules.

### Persona-Based Access
Release management supports different personas with varying levels of access:

**Account Release Manager**
- Can create, edit, and view releases at the account level
- Manages account-wide release calendar and coordination
- Ensures compliance with organizational policies

**Organization Release Manager**
- Can create, edit, and view releases at the organization level
- Manages organization-specific release schedules
- Coordinates with account-level releases

**Other Personas (Viewers)**
- Can view the release calendar and release configurations
- Cannot create or edit releases
- Receive notifications for releases they're involved in

## Release Activation and Draft State

Releases progress through states before they become active:

### Draft State
- **Definition**: Release is being configured but not yet finalized
- **Editable**: All release properties can be modified (process, inputs, schedule, ownership)
- **Not Tracked**: Activities are not being monitored or executed
- **Use Case**: Planning, review, and approval before commitment

### Activation
A release becomes active when:
- **Finalized**: All required inputs and configurations are provided
- **Timeline Effective**: The scheduled start time arrives (for scheduled releases)
- **Manually Activated**: An Account or Organization Release Manager explicitly activates it (for non-scheduled releases)

Once activated:
- The release starts tracking activities and execution
- Status updates become visible
- Audit trails are generated
- Notifications are sent to owners

### Auto-Activation
If a release has a configured timeline, it automatically activates when the timeline becomes effective, eliminating the need for manual intervention for scheduled releases.

## Release Retention and Archiving

To maintain system performance and comply with data retention policies:

### Retention Policy
- **Default Retention**: Releases older than one year are automatically archived
- **Active Releases**: Releases that are still active (even if older than one year) are retained
- **Data Alignment**: Retention aligns with pipeline and dashboard retention policies

### Archiving Rules
- **Archived Releases**: No longer visible in the active release calendar but retained for audit and historical analysis
- **Data Deletion**: If an archived release is deleted, all associated activities and execution history are also deleted
- **Access**: Archived releases can be accessed through reporting and audit interfaces

### Deletion Restrictions
Releases cannot be deleted if:
- They are currently active (Running or On Hold)
- They have tracked execution data and are within the retention period
- They are referenced by other releases or reports

Draft releases can be deleted at any time before activation.

## Real-World Example: System Release at Harness

To illustrate how releases work in practice, consider the system release process used at Harness:

**Release Creation**
- A release group is created with a weekly cadence starting every Monday
- The release is linked to the "System Release Train" process
- All necessary inputs are configured (services, environments, build configurations)

**Week 1: QA Validation**
- **Monday**: Release activates; automated branch cut job creates release branches and deploys to QA
- **Tuesday - Thursday Noon**: Alpha fixes phase allows approved fixes from developers
- **Thursday EOD**: QA sign-off phase requires stakeholder and QA approval

**Week 2: Production Rollout**
- **Friday Morning**: Beta rollout phase deploys to Prod 0 cluster for soak testing
- **Monday - Friday**: Beta fixes phase allows approved fixes during soak period
- **Following Monday**: Prod 1 deployment phase
- **Wednesday**: Prod 2 deployment phase
- **Following Monday**: Prod 3 deployment phase completes the rollout

**Hotfix Handling**
- If critical issues are discovered, a separate hotfix release is created
- Uses a streamlined "Hotfix Process" with essential validation only
- Deployed between production rollout phases with sanity testing
- Fully tracked and auditable despite expedited timeline

This example demonstrates:
- Multi-week, multi-phase release execution
- Clear ownership at each phase (Development for alpha fixes, QA for sign-off, Operations for production deployments)
- Automated and manual activities working together
- Flexibility to handle hotfixes without disrupting the main release
- Complete visibility and audit trail across the entire lifecycle

## Best Practices

### Clear Release Naming
Use descriptive, consistent release names:
- **Recommended:** "Payment Service v2.1.3 - Production Deployment"
- **Recommended:** "Week 15 System Release - April 2025"
- **Recommended:** "Hotfix: Security Patch CVE-2025-1234"
- **Avoid:** "Release 1"
- **Avoid:** "Prod Deploy"

Include version, purpose, and target environment to eliminate ambiguity.

### Minimize Input Complexity
Keep inputs simple and focused:
- Use variable mapping so users only provide essential inputs at execution time
- Provide sensible defaults for non-critical variables
- Use Input Store to manage multiple input sets for the same process
- Document what each input controls and when it's needed

### Leverage Recurring Cadence
Use release groups for predictable, recurring releases:
- Weekly production releases every Thursday
- Monthly platform updates on the first Monday
- Quarterly security patches

This reduces manual effort, improves predictability, and enables better planning.

### Establish Clear Ownership
Assign explicit owners for each release and phase:
- Release Manager coordinates the overall release
- Phase owners handle their specific stages
- Activity owners provide approvals and sign-offs
- Document ownership in the release configuration

### Plan for Failure Scenarios
Design releases with failure handling in mind:
- Define rollback phases for critical deployments
- Specify which activities can be retried or ignored
- Establish escalation paths for blocked releases
- Document recovery procedures for common failure scenarios

### Use the Release Calendar
Leverage the calendar for coordination:
- Visualize upcoming releases to identify conflicts
- Coordinate with other teams' releases
- Plan capacity and resource allocation
- Communicate release windows to stakeholders

### Maintain Audit Trails
Ensure complete traceability:
- Capture all approvals with timestamps and approver names
- Document any deviations from the standard process
- Record reasons for retries, ignores, or aborts
- Link to external tickets, commits, and incidents

## Related Topics

- [Modeling Releases](./modeling-releases.md)
- [Inputs and Variables Overview](../inputs-and-variables/overview.md)
- [Executing a release](../execution/executing-a-release.md)
- [Release Calendar](../release-calendar/overview.md)
- [Executing a release](../execution/executing-a-release.md)

