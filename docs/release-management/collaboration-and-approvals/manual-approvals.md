---
title: Capturing Sign-off and Approvals
slug: /release-orchestration/collaboration-and-approvals/manual-approvals
description: Learn about manual activities, approvals, and sign-offs in release processes
sidebar_position: 1
---

Manual activities and approvals are critical governance mechanisms in release orchestration, enabling human decision points, validation checkpoints, and evidence collection throughout the release lifecycle.

## What are Manual Activities?

Manual activities are activities that require human intervention to complete. Unlike automated activities that execute pipelines without human input, manual activities pause the release and wait for designated users to perform actions, provide approvals, or capture information.

Manual activities enable:
- **Approval Checkpoints**: Formal approval gates before critical phases like production deployment
- **Sign-offs**: QA sign-offs after testing, Operations sign-offs after deployment verification
- **Evidence Collection**: Capturing test results, screenshots, compliance documentation
- **Manual Verification**: Visual inspections, manual tests, or validations that cannot be automated
- **Information Capture**: Recording decisions, attaching documents, or linking to external tickets
- **Cross-Team Coordination**: Handoffs between teams with explicit acknowledgment

## Why Manual Activities Matter

While automation is desirable, certain steps require human judgment, expertise, or validation:

**Governance and Compliance**: Regulatory requirements often mandate human approvals and documented evidence for production changes. Manual activities provide auditable records of who approved what and when.

**Risk Management**: High-risk deployments benefit from human review before proceeding. Manual approvals enable experienced team members to assess readiness and abort if concerns arise.

**Cross-Functional Collaboration**: Releases involve multiple teams (Development, QA, Security, Operations). Manual activities enable explicit handoffs and coordination between teams.

**Flexibility**: Not everything can be automated. Manual activities accommodate tasks that require human judgment, external coordination, or access to systems outside the automation environment.

**Evidence and Auditability**: Manual activities capture evidence (test results, screenshots, approval justifications) that support compliance audits and post-release analysis.

## Manual Activity Execution Flow

When a manual activity is encountered during release execution, the following occurs:

### 1. Activity Activation
As the release progresses and reaches a manual activity:
- The manual activity transitions to **"On Hold"** or **"Waiting for Input"** state
- The release execution pauses at this activity
- Subsequent activities that depend on this manual activity are blocked from starting

### 2. Owner Notification
Designated owners are notified that their action is required:
- **Email Notifications**: Sent to configured email addresses
- **In-App Notifications**: Visible in the Harness UI
- **Notification Content**: Includes release name, activity name, required action, and a link to the activity

### 3. User Action
Assigned users access the manual activity and perform the required actions:
- **View Activity Details**: See activity description, instructions, and context
- **Provide Inputs**: Enter required information (text, numbers, selections)
- **Upload Evidence**: Attach files, screenshots, test results, or documentation
- **Add Comments**: Provide justifications, notes, or explanations
- **Approve or Reject**: Make the approval decision with reasoning

### 4. Activity Completion
Once the user completes the manual activity:
- The activity transitions to **"Completed"** (if approved) or **"Rejected/Failed"** (if rejected)
- The release execution resumes
- Dependent activities become unblocked and can proceed
- All inputs, evidence, and approvals are captured in the audit trail

### 5. Handling Rejections
If a manual activity is rejected:
- The phase containing the activity transitions to a failure state
- The release status may transition to Failed (depending on failure handling configuration)
- Release Manager or Phase Owner is notified
- Owner can retry, fix issues, or abort the release

## Types of Approvals in Release Orchestration

Different approval types serve different purposes in the release lifecycle. Based on industry best practices and regulatory requirements, releases may require various approval checkpoints:

### 1. Code Review Approval
**Purpose**: Ensures code quality and adherence to standards before inclusion in the release.

**What's Needed**: Integration with source control (GitHub, GitLab, Bitbucket), pull request status checks, reviewer assignment rules.

**Use Case**: All code changes must be peer-reviewed and approved before being included in the release build.

### 2. Build Verification Approval
**Purpose**: Gates the release until builds pass automated tests, security scans, and performance benchmarks.

**What's Needed**: CI pipeline test results, automated QA frameworks, security scanning tools (Snyk, SonarQube), performance benchmarks.

**Use Case**: Build must pass all quality gates before proceeding to deployment phases.

### 3. Environment Readiness Approval
**Purpose**: Confirms target environments are provisioned, configured, and ready for deployment.

**What's Needed**: Infrastructure-as-Code (IaC) validation, environment health checks, configuration validation scripts.

**Use Case**: Production environment must be verified as healthy and ready before starting deployment.

### 4. Dependency Readiness Approval
**Purpose**: Validates that all dependent services, APIs, and third-party integrations are stable and available.

**What's Needed**: Service health dashboards, API monitoring tools, dependency mapping, automated status checks.

**Use Case**: Cannot deploy if dependent payment gateway API is experiencing outages.

### 5. Product Owner Approval
**Purpose**: Business-level checkpoint ensuring the release aligns with product goals and customer value.

**What's Needed**: Business requirements documentation, release notes, access to release scope in backlog tools (Jira, Aha!).

**Use Case**: Product owner verifies that planned features are complete and ready for customer release.

### 6. QA Sign-off
**Purpose**: QA team validates that testing is complete and quality standards are met.

**What's Needed**: Test execution results, bug reports, test coverage metrics, exploratory testing notes.

**Use Case**: QA lead signs off that all test cases passed and no critical bugs remain.

### 7. Security Approval
**Purpose**: Confirms all vulnerabilities are addressed and security requirements are met.

**What's Needed**: Vulnerability scan results, penetration testing reports, security sign-off checklist.

**Use Case**: Security team approves that no high-severity vulnerabilities exist in the release.

### 8. Change Advisory Board (CAB) Approval
**Purpose**: Formal governance checkpoint for risk review and compliance in ITIL-driven organizations.

**What's Needed**: Change request forms, CAB meeting schedule, risk and impact assessment reports.

**Use Case**: Major production changes require CAB review and approval before proceeding.

### 9. Regulatory / Compliance Approval
**Purpose**: Validates that the release meets legal and industry regulations.

**What's Needed**: Compliance documentation, legal review results, compliance audit logs.

**Use Case**: Healthcare application release must be HIPAA-compliant before deployment.

### 10. Operations / SRE Approval
**Purpose**: Confirms monitoring, alerting, rollback, and scaling strategies are ready.

**What's Needed**: Monitoring dashboards, rollback scripts, runbooks, incident response procedures.

**Use Case**: SRE team approves that observability and rollback mechanisms are in place.

### 11. Final Go/No-Go Approval
**Purpose**: Last checkpoint where stakeholders jointly decide to proceed, defer, or cancel.

**What's Needed**: Consolidated release readiness report, risk status summary, stakeholder meeting.

**Use Case**: Cross-functional team reviews all checkpoints and makes final deployment decision.

## Approval Requirements by Industry

Different industries have different approval requirements based on risk tolerance, regulatory environment, and operational maturity:

### Universal / General SaaS
- **Mandatory**: Code Review, Build Verification, Environment Readiness, Product Owner Approval, Final Go/No-Go
- **Recommended**: QA Sign-off, Security Approval, Operations Approval

### Regulated Industries (Banking, Healthcare, Government, Pharma)
- **Mandatory**: All approval types, especially CAB, Security, Regulatory/Compliance, Audit
- **Focus**: Heavy emphasis on documentation, evidence, and auditability

### High-Availability / Service-Critical (E-commerce, Gaming, Fintech)
- **Mandatory**: Environment Readiness, Dependency Readiness, Operations/SRE Approval, QA Sign-off
- **Focus**: Rollback readiness, monitoring, and minimizing downtime

## Configuring Manual Activities

Manual activities can be configured with various properties to control their behavior:

### Approval Configuration

**Approvers**: Designate who can approve the activity
- **Individual Users**: Specific named users
- **User Groups**: Teams or organizational groups
- **Roles**: Users with specific roles (for example, Release Manager, QA Lead)

**Minimum Approvals**: Define how many approvals are required
- Single approver (1 approval required)
- Majority (more than 50% of approvers)
- Unanimous (all approvers must approve)
- Custom threshold (for example, 3 out of 5 approvers)

**Approval Window**: Set time constraints
- **Deadline**: Latest time by which approval must be provided
- **Escalation**: Escalate to higher authority if deadline is missed
- **Auto-Reject**: Automatically reject if no response within timeframe

### Information Capture

**Input Fields**: Define what information must be captured
- **Text Fields**: Comments, justifications, notes
- **File Uploads**: Screenshots, test results, compliance documents
- **Checkboxes**: Confirmation of specific conditions
- **Dropdown Selections**: Predefined options (for example, risk level, deployment strategy)

**Required vs. Optional**: Mark fields as mandatory or optional

**Validation Rules**: Enforce data quality
- Minimum text length for justifications
- Required file types for evidence
- Format validation for specific fields

### Notifications

**Notification Triggers**:
- When activity becomes active (awaiting approval)
- Reminder notifications if no action taken
- Escalation notifications if deadline approaches
- Completion notifications when approved or rejected

**Notification Channels**:
- Email
- Slack / Microsoft Teams integration
- In-app notifications
- SMS (for critical approvals)

### Audit and Evidence

**Automatic Capture**:
- Who approved or rejected
- When the action occurred
- What inputs were provided
- What evidence was attached
- IP address and session information (for compliance)

## Real-World Manual Activity Examples

### Example 1: QA Sign-off After Testing

**Context**: After deploying to QA environment and running automated tests, QA team must manually validate and sign off.

**Manual Activity Configuration**:
- **Name**: "QA Sign-off for Release 2.1.3"
- **Description**: "QA team validates that all test cases passed and no critical bugs exist"
- **Approvers**: QA Lead, Senior QA Engineers (minimum 1 approval required)
- **Required Inputs**:
  - Test execution summary (text)
  - Bug report link (text field)
  - Screenshot of test results (file upload, required)
  - Sign-off checkbox: "I confirm all critical tests passed"
- **Deadline**: 24 hours from activity start
- **Escalation**: Notify Release Manager if no response in 18 hours

**Execution Flow**:
1. Automated tests complete in QA environment
2. Manual activity "QA Sign-off" becomes active
3. QA team is notified via email and Slack
4. QA engineers perform manual exploratory testing
5. QA Lead uploads test summary and screenshots
6. QA Lead checks sign-off checkbox and approves
7. Release continues to Production deployment phase

### Example 2: Production Approval Gate

**Context**: Before deploying to production, multiple stakeholders must approve the go-ahead.

**Manual Activity Configuration**:
- **Name**: "Production Deployment Approval"
- **Description**: "Final approval gate before production deployment"
- **Approvers**: Product Owner, Engineering Manager, SRE Lead (unanimous approval required)
- **Required Inputs**:
  - Deployment risk assessment (dropdown: Low/Medium/High)
  - Rollback plan confirmation (checkbox)
  - Approval justification (text, minimum 50 characters)
- **Deadline**: 2 hours from activity start
- **Auto-Reject**: If deadline passed without approval, reject and notify Release Manager

**Execution Flow**:
1. Staging deployment and validation complete successfully
2. Manual activity "Production Deployment Approval" becomes active
3. All three approvers receive notifications
4. Product Owner reviews release notes and approves (Risk: Low)
5. Engineering Manager reviews code changes and approves
6. SRE Lead confirms monitoring and rollback readiness, approves
7. All approvals collected; release proceeds to production deployment

### Example 3: Security Compliance Review

**Context**: For regulated applications, security team must review and approve before production.

**Manual Activity Configuration**:
- **Name**: "Security Compliance Review"
- **Description**: "Security team reviews vulnerability scan results and approves release"
- **Approvers**: Security Team (minimum 1 approval required)
- **Required Inputs**:
  - Vulnerability scan report (file upload, required)
  - Remediation plan for any findings (text)
  - Compliance checklist (multiple checkboxes)
  - Security sign-off (checkbox: "No high-severity vulnerabilities remain")
- **Deadline**: 48 hours from activity start
- **Escalation**: Escalate to CISO if no response in 36 hours

**Execution Flow**:
1. Security scan pipeline completes
2. Manual activity "Security Compliance Review" becomes active
3. Security team receives notification with scan report link
4. Security engineer reviews scan results: 3 medium vulnerabilities found
5. Security engineer documents remediation plan: "Medium vulns acceptable for this release; fixes scheduled for next sprint"
6. Security engineer uploads compliance documentation
7. Security engineer completes checklist and approves
8. Release continues to deployment phases

## Monitoring Manual Activities

When monitoring a running release with manual activities:

**Release View**:
- Overall release status shows "On Hold" if any manual activity is awaiting approval
- Count of activities requiring input is displayed (for example, "2 activities require your input")
- Visual indicator highlights phases containing pending manual activities

**Phase View**:
- Phases containing manual activities show "Waiting for Approval" status
- Visual badge indicates how many approvals are pending
- Phase cannot complete until all manual activities within it are resolved

**Activity View**:
- Manual activity shows "On Hold" or "Awaiting Approval" status
- Displays who the approvers are and who has already approved
- Shows deadline or time remaining for approval
- Provides link to take action (approve, reject, provide inputs)

**Notifications Dashboard**:
- Centralized view of all pending approvals across all releases
- Filtered by user (shows only activities requiring your approval)
- Sorted by urgency (deadline approaching activities shown first)
- Quick action buttons to jump directly to the activity

## Best Practices

### Design Approval Gates Strategically
Place manual activities at critical decision points:
- **Recommended:** Before production deployment, after security scans, at environment transitions
- **Avoid:** After every minor step, creating unnecessary approval overhead

**Rationale**: Too many approval gates slow releases and create approval fatigue; place them only where human judgment truly adds value.

### Assign Clear Ownership
Designate specific approvers, not generic groups:
- **Recommended:** "Jane Smith (QA Lead)" or "SRE On-Call Team"
- **Avoid:** "Engineering" or "Operations"

**Rationale**: Clear ownership ensures accountability and reduces delays waiting for "someone" to approve.

### Set Realistic Deadlines
Define deadlines based on expected turnaround time:
- **Recommended:** QA Sign-off: 24 hours, Production Approval: 2 hours, CAB Review: 5 business days
- **Avoid:** All approvals: 1 hour (unrealistic for manual validation)

**Rationale**: Unrealistic deadlines lead to constant escalations or auto-rejections; base deadlines on actual team capacity.

### Require Meaningful Justifications
Don't accept empty or pro-forma approvals:
- **Recommended:** Require minimum text length for justifications; enforce evidence uploads
- **Avoid:** Allow single-click approvals with no context or reasoning

**Rationale**: Meaningful justifications provide audit trails and help teams learn from past decisions.

### Implement Escalation Paths
Define what happens when approvals are delayed:
- First reminder at 50% of deadline
- Escalation to manager at 75% of deadline
- Auto-reject or emergency escalation at 100% of deadline

**Rationale**: Clear escalation prevents releases from stalling indefinitely due to missed approvals.

### Capture Evidence for Compliance
For regulated industries, evidence is critical:
- Attach test results, scan reports, compliance checklists
- Capture approver identity, timestamp, IP address
- Store evidence immutably for audit purposes

**Rationale**: Regulatory audits require proof of approvals; capturing evidence at approval time is easier than reconstructing later.

### Balance Automation and Manual Oversight
Automate what can be automated; require manual approval only for judgment-based decisions:
- **Recommended:** Automate: Build verification, test execution, security scans, environment health checks
- **Recommended:** Manual: Production go/no-go, change risk assessment, compliance review
- **Avoid:** Manual: Verifying that tests passed (this should be automated)

**Rationale**: Manual activities are expensive (time, coordination); reserve them for decisions that truly require human expertise.

### Design for Remote and Asynchronous Work
Approvals may span time zones and work schedules:
- Provide complete context in activity description (no assumption of synchronous communication)
- Enable approvals from mobile devices
- Support delegation (if primary approver is unavailable, delegate to backup)

**Rationale**: Modern teams are distributed; approval workflows must accommodate asynchronous collaboration.

### Test Approval Workflows
Before using in production:
- Run approval activities in test releases
- Verify notifications are received and actionable
- Confirm evidence capture and audit trails work correctly

**Rationale**: Discovering broken approval workflows during a critical production release is costly; test early.

### Review and Optimize Regularly
Periodically review approval patterns:
- Identify frequently rejected approvals (may indicate upstream quality issues)
- Measure approval turnaround times (identify bottlenecks)
- Remove unnecessary approval gates (reduce approval fatigue)

**Rationale**: Approval workflows should evolve based on actual usage; what made sense initially may need adjustment as processes mature.

## Related Topics

- [Manual Activities](../activities/activity-types/manual-activities.md)
- [Executing a release](../execution/executing-a-release.md)
- [Error Handling](../execution/error-handling.md)

