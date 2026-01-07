---
title: Modeling Releases
slug: /release-orchestration/releases/modeling-releases
description: Learn how to create and model releases from processes
sidebar_position: 2
---

Modeling releases is how you connect a **process blueprint** to a **release instance**, decide when it should run, provide the necessary inputs, and configure ownership. This transforms an abstract workflow definition into a concrete, executable release plan.

## Create a Release from a Process

Creating a release involves selecting a process template and configuring it for a specific execution:

### Step 1: Select a Process
Choose the process that defines the workflow for this release:
- **Standard Release Process**: For regular, planned deployments
- **Hotfix Release Process**: For emergency fixes with streamlined validation
- **Feature Release Process**: For gradual feature rollouts
- **System Release Process**: For coordinated multi-service deployments

The process defines the phases, activities, dependencies, and approval gates that the release will execute.

### Step 2: Link the Process to the Release
The release inherits the structure from the process:
- All phases from the process
- All activities within those phases
- Dependency relationships between phases and activities
- Approval requirements and validation gates
- Timeout and retry configurations

The process remains unchanged; the release is an instance that executes using that blueprint.

### Step 3: Review and Confirm Owners
Phase owners are typically defined in the process (especially when using AI-based process creation):
- **Development Team**: Owns Build and Integration phases
- **QA Team**: Owns Testing and Validation phases
- **Operations Team**: Owns Deployment phases
- **Security Team**: Owns Security Scanning and Compliance phases

Confirm that ownership is appropriate for this specific release, and adjust if needed (for example, a hotfix release might have different owners than a standard release).

### Step 4: Provide Release Metadata
Configure release-specific information:
- **Release Name**: Descriptive name (for example, "Payment Service v2.1.3 - Production")
- **Description**: Purpose and scope of the release
- **Tags**: Labels for filtering and reporting (for example, "production", "security-patch", "service:payments")
- **Version**: Software version being released (if applicable)

## Release Groups and Cadence

Releases can be configured to execute on various schedules based on organizational needs and deployment strategies:

### On-Demand Releases
Execute immediately when triggered:
- **Use Case**: Hotfixes, customer-specific deployments, feature releases when ready
- **Characteristics**: No fixed schedule; triggered manually by Release Manager
- **Benefits**: Maximum flexibility; respond to urgent needs

**Example**: A critical security vulnerability is discovered; a hotfix release is created and executed immediately.

### Scheduled Releases
Execute at a specific date and time:
- **Use Case**: Planned production deployments, maintenance windows, coordinated multi-team releases
- **Characteristics**: Fixed start time; execution begins automatically at the scheduled time
- **Benefits**: Predictable release windows; enables coordination and preparation

**Example**: Production deployment scheduled for Friday, April 18, 2025 at 2:00 PM UTC during a planned maintenance window.

### Recurring Releases (Release Groups)
Create a release group that automatically generates releases on a recurring cadence:
- **Use Case**: Weekly releases, monthly updates, quarterly platform releases
- **Characteristics**: Automatically creates new release instances based on the cadence
- **Benefits**: Reduced manual effort; consistent release rhythm; predictable planning

**Release Group Configuration**:
- **Cadence**: How often releases are generated (Weekly, Monthly, Quarterly, Custom)
- **Start Date**: When the recurring schedule begins
- **Duration**: How long each release runs (for example, 2 days, 1 week)
- **Process**: The process blueprint used for all generated releases
- **Inputs**: Default inputs applied to all releases (can be overridden per instance)

**Example from Harness**:
- **Release Group**: "Weekly Production Release"
- **Cadence**: Every Thursday
- **Duration**: 2 days (Thursday and Friday)
- **Process**: "System Release Train" process
- **Generated Releases**: Week 15 Release, Week 16 Release, Week 17 Release, etc.

Each generated release executes using the same process structure but can have different inputs (different services, versions, or configurations).

### Release Group Benefits

**Automation**: Releases are created automatically; no manual setup each week/month.

**Consistency**: Same process structure for every release; reduces variability and errors.

**Predictability**: Stakeholders know when releases will occur; can plan accordingly.

**Calendar Visibility**: All recurring releases appear on the release calendar; easy to visualize conflicts and plan capacity.

## Release Calendar

The Release Calendar provides a centralized, visual view of all releases across your organization.

### Accessing the Release Calendar

1. Open the **Release Orchestration** module in Harness
2. Navigate to **Release Calendar** in the left navigation
3. Select the time view: Day, Week, Month, or Quarter
4. Filter by services, environments, teams, or tags (optional)

### Calendar Features

**Visual Timeline**: Releases displayed on a calendar grid, showing:
- Release name and status
- Start and end dates
- Color coding by status (Running, Success, Failed, Scheduled)
- Overlapping releases highlighted to identify conflicts

**Filtering and Search**:
- Filter by services, environments, or pipelines
- Search by release name or tags
- Show/hide completed releases
- Focus on specific teams or projects

**Release Details**: Click on any release to view:
- Linked process and phases
- Current execution status
- Inputs and variables
- Phase and activity owners
- Execution history and timeline

### Using the Release Calendar

**Typical Workflow**:

1. **Open Release Calendar**: Navigate to the calendar view
2. **Locate a Release**: Find the release on the calendar (by date, name, or filter)
3. **Review Release Details**: Click the release to see its linked process, inputs, and status
4. **Pre-Execute or Wait**: Choose to:
   - **Pre-execute**: Run the release before its scheduled time
   - **Wait**: Let it execute automatically at the scheduled time
5. **Monitor Execution**: Track progress through phases and activities in real-time

**Coordination and Planning**:
- **Identify Conflicts**: See overlapping releases that might compete for resources
- **Plan Capacity**: Understand how many releases are scheduled in a given period
- **Coordinate Across Teams**: Ensure dependent releases are sequenced correctly
- **Communicate Release Windows**: Share the calendar with stakeholders for visibility

**Example**: The Release Calendar shows:
- Week 15: "System Release" (Thursday-Friday)
- Week 15: "Payment Service Hotfix" (Wednesday, emergency)
- Week 16: "Feature Flag Rollout" (Monday-Tuesday)
- Week 16: "System Release" (Thursday-Friday)

This visibility helps teams avoid conflicts and coordinate dependencies.

## Pre-Execute a Release and Provide Inputs

When you pre-execute (or execute) a release, you provide the concrete inputs that control how the process executes.

### Input Store Concept

The **Input Store** is a collection of input sets for a process. A single process can have multiple input instances (different input sets), allowing you to execute the same process multiple times with different values.

**Benefits**:
- **Reusability**: Same process, different inputs for different releases
- **Flexibility**: Switch between input sets without modifying the process
- **Version Control**: Track input changes over time
- **Templating**: Create input templates for common scenarios (for example, "Production Inputs", "QA Inputs")

**Example**:
- Process: "Multi-Service Deployment"
- Input Set 1: Deploy services A, B, C to PROD1
- Input Set 2: Deploy services A, B, C to PROD2
- Input Set 3: Deploy services D, E, F to PROD1

Same process structure, different services and environments.

### Variable Mapping

Variable mapping simplifies input collection by enabling hierarchical variable scopes:

**Global Variables → Phase Variables → Activity Variables**

Users provide only the key inputs (global variables) at execution time. These global variables are mapped to phase and activity variables within the process definition.

**Example**:
- **Global Variable**: `releaseVersion = "2.1.3"`
- **Phase Variable** (Build Phase): `buildVersion = ${releaseVersion}`
- **Activity Variable** (Deploy Activity): `artifactTag = ${buildVersion}`

The user provides `releaseVersion` once; it cascades through the process automatically.

**Benefits**:
- **Simplified Input**: Users provide fewer inputs; less error-prone
- **Consistency**: Same value used consistently across phases and activities
- **Maintainability**: Change variable mapping in the process; no need to update inputs

### Defaults and Overrides

Variables can have default values that can be overridden per execution:

**Default Values**: Defined in the process or input set:
- `timeout = 30m`
- `retryCount = 3`
- `environment = "QA"`

**Overrides**: Provided at execution time:
- Override `environment` to `"PROD"` for a production release
- Override `timeout` to `60m` for a large deployment

This enables flexibility without requiring users to provide every input every time.

### Providing Inputs at Execution

**Step-by-Step**:

1. **Select Input Set**: Choose an existing input set from the Input Store, or create a new one
2. **Review Default Values**: See what values are pre-filled from the process or input set
3. **Provide Required Inputs**: Fill in mandatory inputs (marked with *)
4. **Override Optional Inputs**: Change any defaults if needed for this specific release
5. **Validate Inputs**: System validates inputs against expected types and constraints
6. **Confirm and Execute**: Review all inputs and start the release

**Input Types**:
- **String**: Text values (service names, versions, URLs)
- **Number**: Numeric values (timeouts, counts, thresholds)
- **Boolean**: True/false flags (enableMonitoring, skipTests)
- **List**: Arrays of values (list of services, list of environments)
- **Object**: Structured data (configuration objects, JSON payloads)

For detailed information on inputs and variables, refer to [Inputs and Variables Overview](../inputs-and-variables/overview.md).

## Release Lifecycle

At a high level, a release moves through several distinct lifecycle stages:

### 1. Draft (Not Started)
- **State**: Release is created but not yet finalized or active
- **Characteristics**: 
  - Can be edited freely (process, inputs, schedule, owners)
  - Not tracked or monitored
  - No activities have executed
  - Not visible in active execution views
- **Actions Available**: Edit, delete, finalize, activate
- **Use Case**: Planning, review, approval before committing to the release

### 2. Scheduled (Not Started)
- **State**: Release is finalized and scheduled but hasn't started yet
- **Characteristics**:
  - Waiting for scheduled start time
  - Appears on the release calendar
  - Inputs and configuration are locked
  - Ready to execute automatically at scheduled time
- **Actions Available**: Pre-execute, edit (limited), cancel
- **Use Case**: Planned releases waiting for their designated time window

### 3. Running (In Progress)
- **State**: Release is actively executing
- **Characteristics**:
  - At least one phase is executing
  - Activities are being processed according to dependencies
  - Status updates occur in real-time
  - Owners receive notifications for manual activities or failures
- **Actions Available**: Monitor, pause (limited scenarios), abort
- **Use Case**: Active software delivery in progress

### 4. On Hold (Waiting for Input)
- **State**: Release is paused, waiting for manual intervention
- **Characteristics**:
  - One or more manual activities require user input
  - Could be waiting for approvals, sign-offs, or additional inputs
  - Execution will resume once inputs are provided
  - Notifications sent to assigned owners
- **Actions Available**: Provide inputs, approve, reject, abort
- **Use Case**: Approval gates, sign-offs, manual validations

### 5. Completed (Finished)
- **State**: Release has finished execution
- **Characteristics**:
  - All phases and activities have reached a terminal state
  - Final status determined: Success, Failed, PartialSuccess, or Aborted
  - Complete audit trail available
  - Execution history preserved
- **Actions Available**: View history, generate reports, archive
- **Use Case**: Post-release analysis, compliance audits, retrospectives

**Substates within Completed**:
- **Success**: All required phases completed successfully
- **Failed**: Critical phase or activity failed; recovery was not successful
- **PartialSuccess**: Some phases succeeded, others failed or skipped
- **Aborted**: Manually stopped before completion

### Lifecycle Transitions

```
Draft → Scheduled → Running → Completed (Success)
  ↓         ↓          ↓  ↑
Delete  Pre-Execute  On Hold
                       ↓
                     Aborted
```

**Key Transition Points**:
- **Draft → Scheduled**: Finalize and set schedule
- **Draft → Running**: Activate immediately (on-demand)
- **Scheduled → Running**: Auto-activation at scheduled time
- **Running → On Hold**: Manual activity requires input
- **On Hold → Running**: Input provided, execution resumes
- **Running → Completed**: All phases finish
- **Running → Aborted**: Manual abort or critical failure

### Lifecycle Management

**During Execution**:
- Individual activities can pause waiting for input or sign-off (manual activity)
- Failed activities can be retried, ignored, or fixed without restarting the entire release
- Phases execute sequentially or in parallel based on dependencies

**Post-Execution**:
- Completed releases are retained for audit and analysis
- Archived after retention period (typically 1 year)
- Execution data can be used for metrics, dashboards, and reports

## Best Practices

### Name Releases Clearly
Use descriptive, structured names that communicate purpose and scope:
- **Recommended:** `payments-service-v1.2.3-production-deploy`
- **Recommended:** `week-15-system-release-april-2025`
- **Recommended:** `hotfix-security-cve-2025-1234`
- **Avoid:** `release-1`
- **Avoid:** `prod`

Include: service/component, version, environment, and purpose.

### Keep Inputs Minimal
Use variable mapping so users only provide key inputs at execution time:
- **Do**: Use global variables that cascade to phase and activity variables
- **Don't**: Require users to provide every activity-level variable
- **Example**: User provides `releaseVersion`; it automatically maps to `buildVersion`, `deployVersion`, `artifactTag`

Minimal inputs reduce errors and simplify the release creation process.

### Use Recurring Cadence When Appropriate
For predictable release patterns, use release groups:
- **Weekly production deployments**: Every Thursday
- **Monthly platform updates**: First Monday of each month
- **Quarterly security releases**: First week of January, April, July, October

Recurring releases reduce manual effort and improve predictability.

### Link to External Systems
Connect releases to external systems for complete traceability:
- **Ticket Systems**: Link to Jira, ServiceNow, or Asana tickets
- **Source Control**: Reference commit SHAs, pull requests, or branches
- **Documentation**: Link to release notes, runbooks, or architecture docs
- **Monitoring**: Link to dashboards, alerts, or observability tools

This provides context and enables quick navigation to related information.

### Document Release Context
Provide rich context in the release description:
- **Purpose**: What is being delivered and why
- **Scope**: Which services, environments, and features are included
- **Risks**: Known issues or areas requiring attention
- **Rollback Plan**: How to rollback if critical issues arise
- **Stakeholders**: Who needs to be informed or involved

This helps all participants understand the release and its implications.

### Review Before Execution
Before starting a release, review:
- **Process Structure**: Are phases and activities correct for this release?
- **Inputs**: Are all inputs provided and validated?
- **Ownership**: Are phase and activity owners aware and available?
- **Schedule**: Is the timing appropriate? Are there conflicts with other releases?
- **Dependencies**: Are dependent services or systems ready?

A final review prevents surprises during execution.

### Plan for Different Release Types
Model different processes for different release types:
- **Standard Process**: Full validation, all environments, complete testing
- **Hotfix Process**: Streamlined validation, expedited approvals, direct to production
- **Feature Process**: Feature flag enablement, gradual rollout, A/B testing
- **Rollback Process**: Reversal activities, validation, rollback testing

Don't force all releases through the same process; tailor the process to the release type.

## Related Topics

- [Releases Overview](./overview.md)
- [Inputs and Variables Overview](../inputs-and-variables/overview.md)
- [Release Calendar](../release-calendar/overview.md)
- [Executing a Release](../execution/executing-a-release.md)

