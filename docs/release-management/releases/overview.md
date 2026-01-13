---
title: Overview
slug: /release-orchestration/releases/overview
description: Learn about releases and how they represent planned deployments
sidebar_position: 1
---

Releases represent software delivery executed using a process. A release is the instantiation of a process blueprint with concrete inputs, connecting the abstract workflow to real-world deployment activities across services, environments, and teams.

## What is a Release?

A **release** is an instance of a process—a runnable execution of a predefined workflow with specific inputs and configurations. While a process defines *how* releases should be executed (the phases, activities, and dependencies), a release defines *what* is being delivered and *when* it should happen.

Think of it this way: a Process is the blueprint or template, like "Weekly Production Release Process," while a Release is the actual execution of that blueprint, such as "Week 15 Production Release - Services A, B, C."

A release includes several key components. The process template it's based on defines the structure, phases, and activities that will execute. Specific values for process inputs include services, versions, environments, and configurations that make this release unique.

Release-specific variable values control behavior at runtime, allowing the same process to behave differently based on the release context. The schedule determines when the release should execute, whether immediately, at a scheduled time, or as part of a recurring cadence.

The current execution status shows where the release stands, from Not Started through Running to Completed or Failed. Ownership designates the team or individuals responsible for managing the release, and the audit trail provides a complete history of execution, approvals, changes, and outcomes.

## Why Releases Matter

Releases bridge the gap between abstract process definitions and concrete software delivery, providing several key benefits that make software delivery more manageable and reliable.

Releases provide end-to-end visibility by serving as a single source of truth for what's being deployed, where it's going, and what stage it's in. Stakeholders can track progress in real-time without chasing updates across multiple tools or chat channels, giving everyone the same view of release status.

Every release execution is tracked with full evidence trails that record who approved what, when activities executed, what inputs were provided, and what the outcomes were. This governance and auditability satisfies regulatory requirements and simplifies compliance audits by providing complete documentation of every decision and action.

Releases make handoffs explicit, enabling better coordination across teams. Development, QA, Security, and Operations teams all work within the same release context, reducing coordination overhead and miscommunication. Everyone knows what stage the release is in and what their team needs to do next.

By modeling releases on a calendar with defined cadences, teams gain predictability and planning capabilities. They can plan ahead, avoid conflicts, and coordinate dependencies across multiple services and systems, making release management more strategic and less reactive.

Releases provide complete traceability by linking commits, builds, artifacts, tests, approvals, and deployments into one coherent record. This answers questions like "What's deployed in production?" or "Which commits are in this staging deployment?" instantly, without requiring investigation across multiple systems.

## Release Execution

Releases are created from processes and can be executed in several ways to accommodate different organizational needs and release strategies:

### Scheduled Execution

Releases can be configured to execute at a specific date and time based on business cadence. This includes weekly releases, such as every Thursday at 2:00 PM for production deployments, monthly releases like the first Monday of each month for system-wide updates, or custom schedules that match your organizational rhythm.

Scheduled execution enables predictable release windows, better resource planning, and reduced conflicts across teams.

### Pre-Execution

You can execute a release before its scheduled time when circumstances require it. This is useful for early deployments when you need to push critical features or fixes ahead of schedule, for testing and validation where you run through the release process in advance to identify issues, or for coordination with external events like customer announcements or partner integrations.

Pre-execution preserves the same audit trail, approvals, and governance as scheduled execution, so you don't lose compliance benefits when you need to move faster.

### On-Demand Execution

Releases can be triggered immediately when needed, without waiting for a scheduled time. This works well for hotfix releases that address emergency deployments for critical production issues, feature releases where you deploy when a feature is ready rather than being tied to a fixed schedule, or customer-specific releases where you deploy to specific customer environments on request.

### Process Integration

Once releases are connected with processes, software delivery becomes automated as activities execute automatically based on the process definition. All stakeholders see the same real-time view of progress, making delivery visible across the organization.

Every action, approval, and change is tracked for compliance, ensuring full auditability. Required checkpoints, approvals, and validations are enforced, providing governance that ensures releases follow defined processes.

The release calendar provides consolidated visualization of all releases across the organization, helping teams coordinate, avoid conflicts, and plan capacity.

## Release Types and Use Cases

Different release types serve different purposes depending on your deployment needs and urgency.

### Standard Release

Standard releases are regular, planned deployments following a defined cadence, such as a weekly production release every Thursday. These releases follow the complete process with all validation phases, ensuring thorough testing and approval before deployment. They're ideal for routine feature deployments and scheduled updates where you have time to follow the full process.

### Hotfix Release

Hotfix releases handle emergency deployments for critical issues, like a security patch deployed immediately. These releases use a streamlined process with essential validation only, allowing you to move quickly while still maintaining necessary safety checks. They're used for production incidents and critical security vulnerabilities where speed is essential but some validation is still required.

### Feature Release

Feature releases focus on deploying specific features or capabilities, such as enabling a new feature flag for gradual rollout. These releases include feature-specific validation and monitoring to ensure the new capability works correctly. They're used for new product capabilities, A/B testing, and progressive delivery where you want to roll out features incrementally.

### System Release

System releases coordinate deployment across multiple services and environments, such as a quarterly platform upgrade affecting 50+ services. These releases involve multi-phase deployment over days or weeks, allowing you to roll out changes gradually and validate at each stage. They're used for major version upgrades, platform-wide changes, and infrastructure migrations where coordination across many components is essential.

## Release Components

A release consists of several interconnected components that work together to execute software delivery:

### Process

The process template the release is based on defines the release's structure, including the logical stages the release will progress through, such as Build, Test, Deploy, and Monitor. It specifies the activities within each phase, which might be automated pipelines, manual approvals, or subprocesses.

The process defines the execution order and relationships between phases and activities through dependencies. It establishes required checkpoints and approvals before proceeding to critical phases, and designates teams or individuals responsible for each phase.

The process remains unchanged across releases—it's the reusable blueprint that ensures consistency.

### Inputs

Concrete values provided when creating or executing the release make each release unique. These include service names that specify which services are included in this release, such as payment-service or user-service. Versions identify the artifact versions, build numbers, or commit SHAs to deploy.

Environments specify target environments like DEV, QA, UAT, PROD1, PROD2, or PROD3. Configuration values include environment-specific settings, feature flag states, and resource limits. Metadata captures release notes, ticket IDs, customer names, and rollback plans.

The same process executed with different inputs produces different releases, making inputs the key to release customization.

### Variables

Release-specific variable values control runtime behavior at different scopes. Global variables are available across the entire release, such as `releaseVersion` or `targetRegion`. Phase variables are scoped to specific phases, like `qaEnvironment` for the Testing phase. Activity variables are scoped to specific activities, such as `deploymentTimeout` for a deployment activity. Computed values are derived from other variables or activity outputs, like an artifact URL from build output. Variables enable flexible, reusable processes that adapt to different scenarios without code changes.

### Schedule

The schedule determines when and how the release should execute. Immediate execution starts the release now, while scheduled execution runs at a specific date and time, such as Friday, April 15, 2025 at 2:00 PM UTC.

Recurring releases are automatically generated on a recurring cadence via release groups, like every Thursday for 2 days. Calendar-based scheduling visualizes releases on the release calendar for coordination and conflict avoidance, helping teams see when releases are planned and avoid scheduling conflicts.

### Ownership and Collaboration

Clear ownership designates who is responsible for the release and its phases. The Release Manager coordinates the overall release, while Phase Owners are teams responsible for specific phases, such as Development for Build, QA for Testing, or Operations for Deployment.

Activity Owners are individuals responsible for specific activities, like specific approvers for production sign-off. Stakeholders are interested parties who receive notifications and can view progress.

This clear ownership enables accountability and streamlines coordination across teams.

## Release Status

Releases have statuses that reflect their execution state, providing immediate visibility into where the release stands:

### Status Lifecycle

Releases progress through several statuses during their lifecycle. When a release is in NotStarted state, it has been created but execution hasn't begun. It's waiting for the scheduled time or a manual trigger, and inputs may still be under review or adjustment. No phases or activities have executed yet.

A Running release has at least one phase actively executing. Activities are being processed according to dependencies, and teams are working through their assigned phases. The release may include activities waiting for approvals or manual input, but overall execution is progressing.

When a release is On Hold, it's paused waiting for manual intervention. This could be waiting for approvals, sign-offs, or additional inputs. Specific owners are notified to provide required information, and execution resumes once inputs are provided.

A Success status means the release completed successfully. All required phases completed successfully, all critical activities passed, and optional activities may have been skipped or ignored. The release was delivered successfully to target environments.

A Failed release encountered a critical failure. At least one critical phase or activity failed, and recovery actions like retry or fix-and-continue were not successful. Rollback may be required, and the release requires investigation and remediation.

A PartialSuccess status indicates mixed outcomes. Some phases succeeded while others failed or were skipped. Non-critical failures were ignored to allow progression, so the release was delivered but with known limitations or missing components. These are documented for follow-up or future fixes.

An Aborted release was intentionally stopped before completion. This could be due to external factors, higher-priority issues, or a decision to defer. Aborted releases can be restarted or rescheduled as needed.

### Status Visibility

Status is visible at multiple levels to provide granular insight into release execution. The release level shows the overall status of the entire release, while the phase level shows the status of each logical stage like Build, Test, or Deploy. The activity level shows the status of each individual task within phases.

This hierarchical status tracking enables quick diagnosis: if a release is Failed, you can drill down to see which phase failed, and further down to identify the specific activity that encountered the issue.

## Release Creation Levels

Releases can be created at different organizational levels to match your structure and governance requirements:

### Account-Level Releases

Account-level releases are recommended for organizations with a smaller number of sub-organizations and similar release requirements. These releases apply across the entire account and all organizations, making them ideal for company-wide releases, platform updates, and shared infrastructure deployments.

They provide centralized control and coordination, and all organizations see and participate in the same release. If releases are created at the account level, organization-level releases should not be created to avoid conflicts.

For example, a quarterly platform release affecting all business units might require coordinated deployment across 20+ organizations.

### Organization-Level Releases

Organization-level releases work well for organizations with independent release requirements. These releases apply only within a specific organization, supporting organization-specific features, independent product lines, and regional deployments.

They provide organization autonomy while still adhering to account-level policies. Releases are only visible within the organization, and each organization can define its own release cadence and processes.

For example, an e-commerce organization might have a weekly feature release that's independent of other organizations' release schedules.

### Persona-Based Access

Release management supports different personas with varying levels of access. Account Release Managers can create, edit, and view releases at the account level. They manage the account-wide release calendar and coordination, and ensure compliance with organizational policies.

Organization Release Managers can create, edit, and view releases at the organization level. They manage organization-specific release schedules and coordinate with account-level releases.

Other personas who are viewers can view the release calendar and release configurations, but cannot create or edit releases. They receive notifications for releases they're involved in, keeping them informed without giving them modification rights.

## Release Activation and Draft State

Releases progress through states before they become active:

### Draft State

When a release is in draft state, it's being configured but not yet finalized. All release properties can be modified, including the process, inputs, schedule, and ownership. Activities are not being monitored or executed during this phase. This state is useful for planning, review, and approval before committing to the release execution.

### Activation

A release becomes active when all required inputs and configurations are provided and finalized. For scheduled releases, activation happens when the scheduled start time arrives. For non-scheduled releases, an Account or Organization Release Manager must explicitly activate it.

Once activated, the release starts tracking activities and execution. Status updates become visible to stakeholders, audit trails are generated for compliance, and notifications are sent to owners alerting them that the release has begun.

### Auto-Activation

If a release has a configured timeline, it automatically activates when the timeline becomes effective. This eliminates the need for manual intervention for scheduled releases, allowing releases to start automatically at their designated times without requiring someone to remember to activate them.

## Release Retention and Archiving

To maintain system performance and comply with data retention policies:

### Retention Policy

Releases older than one year are automatically archived by default, helping maintain system performance and comply with data retention policies. However, releases that are still active, even if older than one year, are retained to ensure active work isn't interrupted.

Retention aligns with pipeline and dashboard retention policies, providing consistent data management across the platform.

### Archiving Rules

Archived releases are no longer visible in the active release calendar but are retained for audit and historical analysis. If an archived release is deleted, all associated activities and execution history are also deleted, so deletion should be done carefully.

Archived releases can still be accessed through reporting and audit interfaces, allowing you to review historical release data when needed for compliance or analysis.

### Deletion Restrictions

Releases cannot be deleted if they are currently active in Running or On Hold status, if they have tracked execution data and are within the retention period, or if they are referenced by other releases or reports. These restrictions prevent accidental deletion of important release data. Draft releases can be deleted at any time before activation, since they haven't started execution yet.

## Real-World Example: System Release at Harness

To illustrate how releases work in practice, consider the system release process used at Harness. This example shows how a complex, multi-week release unfolds with clear phases and ownership.

The release creation begins with a release group created with a weekly cadence starting every Monday. The release is linked to the "System Release Train" process, and all necessary inputs are configured, including services, environments, and build configurations.

During Week 1, the release focuses on QA validation. On Monday, the release activates and an automated branch cut job creates release branches and deploys to QA. From Tuesday through Thursday noon, the alpha fixes phase allows approved fixes from developers. On Thursday end of day, the QA sign-off phase requires stakeholder and QA approval before proceeding.

Week 2 handles the production rollout. On Friday morning, the beta rollout phase deploys to Prod 0 cluster for soak testing. From Monday through Friday, the beta fixes phase allows approved fixes during the soak period. The following Monday, Prod 1 deployment phase begins, followed by Prod 2 deployment on Wednesday, and Prod 3 deployment phase the following Monday completes the rollout.

If critical issues are discovered during this process, a separate hotfix release is created. This uses a streamlined "Hotfix Process" with essential validation only, is deployed between production rollout phases with sanity testing, and is fully tracked and auditable despite the expedited timeline.

This example demonstrates multi-week, multi-phase release execution with clear ownership at each phase. Development handles alpha fixes, QA provides sign-off, and Operations manages production deployments.

Automated and manual activities work together seamlessly, and the system provides flexibility to handle hotfixes without disrupting the main release. Complete visibility and audit trail are maintained across the entire lifecycle, ensuring full traceability of every decision and action.

## Best Practices

### Clear Release Naming

Use descriptive, consistent release names that include version, purpose, and target environment to eliminate ambiguity. Good examples include "Payment Service v2.1.3 - Production Deployment," "Week 15 System Release - April 2025," or "Hotfix: Security Patch CVE-2025-1234."

Avoid generic names like "Release 1" or "Prod Deploy" that don't provide enough context for stakeholders to understand what the release contains.

### Minimize Input Complexity

Keep inputs simple and focused to reduce the burden on users and minimize errors. Use variable mapping so users only provide essential inputs at execution time, with sensible defaults for non-critical variables.

Use Input Store to manage multiple input sets for the same process, and document what each input controls and when it's needed so users understand what they're providing.

### Leverage Recurring Cadence

Use release groups for predictable, recurring releases like weekly production releases every Thursday, monthly platform updates on the first Monday, or quarterly security patches. This reduces manual effort, improves predictability, and enables better planning by automating the creation of releases on a schedule.

### Establish Clear Ownership

Assign explicit owners for each release and phase to ensure accountability and streamline coordination. The Release Manager coordinates the overall release, phase owners handle their specific stages, and activity owners provide approvals and sign-offs. Document ownership in the release configuration so everyone knows who's responsible for what.

### Plan for Failure Scenarios

Design releases with failure handling in mind to ensure releases can recover from problems gracefully. Define rollback phases for critical deployments, specify which activities can be retried or ignored, and establish escalation paths for blocked releases.

Document recovery procedures for common failure scenarios. This preparation helps releases recover quickly when issues arise.

### Use the Release Calendar

Leverage the calendar for coordination across teams and releases. Visualize upcoming releases to identify conflicts before they happen, and coordinate with other teams' releases to avoid resource contention.

Plan capacity and resource allocation based on scheduled releases, and communicate release windows to stakeholders so everyone knows when changes are happening.

### Maintain Audit Trails

Ensure complete traceability by capturing all approvals with timestamps and approver names, and documenting any deviations from the standard process. Record reasons for retries, ignores, or aborts, and link to external tickets, commits, and incidents.

This comprehensive audit trail supports compliance requirements and helps teams learn from past releases.

## Related Topics

- [Modeling Releases](./modeling-releases.md)
- [Inputs and Variables Overview](../inputs-and-variables/overview.md)
- [Executing a release](../execution/executing-a-release.md)
- [Release Calendar](../release-calendar/overview.md)
- [Executing a release](../execution/executing-a-release.md)

