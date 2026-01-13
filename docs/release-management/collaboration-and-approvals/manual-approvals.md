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

Release orchestration supports a wide range of approval checkpoints that align with different organizational needs, risk profiles, and regulatory requirements. These approvals serve as quality gates, governance checkpoints, and decision points throughout the release lifecycle. The specific approvals you implement depend on your industry, compliance needs, and operational maturity.

### Code Quality and Build Approvals

**Code Review Approval** ensures that only peer-reviewed code changes make it into the release. This gate requires verified peer review of all code changes before inclusion, enforcing coding standards and catching defects early in the process. To implement this, you'll need integration with your source control system (GitHub, GitLab, or Bitbucket), pull request status checks, and reviewer assignment rules that define who must approve changes.

**Build Verification Approval** gates the release until all builds pass automated tests, security scans, and performance benchmarks. This prevents faulty builds from moving forward by verifying functionality, security, and stability before deployment. Setting this up requires access to CI pipeline test results, automated QA frameworks, security scanning tools like Snyk or SonarQube, and performance benchmark data.

### Infrastructure and Dependency Approvals

**Environment Readiness Approval** confirms that target environments are provisioned, configured, and ready for deployment without blocking dependencies. This guarantees smooth deployment by ensuring environments are production-ready before the release begins. You'll need Infrastructure-as-Code (IaC) validation tools, environment health checks, and configuration validation scripts to support this approval.

**Dependency Readiness Approval** validates that all dependent services, APIs, and third-party integrations are stable and available for the release. This eliminates downtime risk by confirming that all system dependencies are healthy before rollout. Implementing this requires service health dashboards, API monitoring tools, dependency mapping capabilities, and automated status checks that can verify the health of external dependencies.

### Business and Product Approvals

**Product Owner Approval** provides a business-level checkpoint ensuring the release aligns with product goals, priorities, and customer value. This aligns releases with business strategy by requiring product owner sign-off before launch. To enable this, product owners need access to business requirements documentation, release notes, and visibility into the release scope through backlog tools like Jira or Aha!.

**Customer Readiness Approval** ensures that customer-facing assets such as documentation, training materials, and announcements are ready before release. This improves adoption by confirming customers are informed and equipped for upcoming changes. You'll need updated documentation, customer communication templates, and a training material readiness checklist to support this approval process.

### Quality Assurance Approval

**QA Sign-off** validates that testing is complete and quality standards are met before proceeding. The QA team confirms that all test cases passed, no critical bugs remain, and the release meets the defined quality bar. This requires test execution results, bug reports, test coverage metrics, and exploratory testing notes that demonstrate comprehensive validation.

### Security and Compliance Approvals

**Security Approval** confirms that all vulnerabilities are addressed and security requirements are met before moving to production. This safeguards systems by ensuring security compliance before any deployment. Security teams need vulnerability scan results, penetration testing reports, and a security sign-off checklist to make informed approval decisions.

**Regulatory and Compliance Approval** validates that the release meets all required legal and industry regulations, including audit logging requirements. This ensures releases are compliant with regulations like HIPAA, GDPR, or PCI-DSS from day one. Compliance teams require access to compliance documentation, legal review results, and compliance audit logs to provide this approval.

**Audit Approval** confirms that documentation, traceability, and evidence are in place for regulatory or internal audits. This maintains full release accountability by ensuring every change is fully documented and auditable. To support this, you'll need change logs, release documentation, and artifact traceability records that demonstrate complete documentation of the release process.

### Operations and Support Approvals

**Operations and SRE Approval** confirms that monitoring, alerting, rollback, and scaling strategies are set for the release. This improves reliability by ensuring operational readiness before changes hit production. SRE teams need monitoring dashboards, rollback scripts, runbooks, and incident response procedures to verify operational readiness.

**Support Team Approval** ensures that customer support is prepared with knowledge base updates, troubleshooting guides, and training before the release goes live. This delivers better customer experience by preparing support teams ahead of the release. Support teams require updated knowledge base articles, FAQs, internal training sessions, and escalation playbooks to be ready for customer inquiries.

### Governance and Risk Approvals

**Change Advisory Board (CAB) Approval** provides a formal governance checkpoint for risk review and compliance in ITIL-driven organizations. This reduces operational risk with formal, cross-functional oversight before high-impact changes. CAB processes require change request forms, CAB meeting schedules, and risk and impact assessment reports that enable informed decision-making.

**Risk Assessment Approval** analyzes operational, business, and customer risks associated with the release before execution. This minimizes disruptions by assessing and addressing risks before go-live. Risk assessment requires a risk matrix, impact assessment templates, and mitigation strategy documentation that helps stakeholders understand and address potential issues.

**Final Go/No-Go Approval** serves as the last checkpoint where stakeholders jointly decide to proceed, defer, or cancel the release. This provides a unified, cross-functional decision point before committing to launch. This final approval requires a consolidated release readiness report, risk status summary, and a stakeholder meeting where all parties can review the complete picture and make an informed decision together.

## Approval Requirements by Industry

The approval requirements you implement depend heavily on your industry's risk tolerance, regulatory environment, and operational maturity. What works for a small SaaS startup won't necessarily fit a healthcare organization subject to HIPAA regulations, and a fintech company handling financial transactions has different needs than a content platform.

For general SaaS companies, the core approvals typically include code review, build verification, environment readiness checks, product owner sign-off, and a final go/no-go decision. These provide essential quality gates without creating excessive overhead. Many teams also add QA sign-off, security approval, and operations approval as recommended practices that catch issues before they reach production.

Regulated industries like banking, healthcare, government, and pharmaceuticals face stricter requirements. These organizations typically need all approval types, with particular emphasis on Change Advisory Board (CAB) approval, security reviews, regulatory and compliance validation, and audit approvals. The focus here shifts heavily toward documentation, evidence collection, and maintaining full auditability of every decision and change.

High-availability and service-critical applications—think e-commerce platforms, gaming services, or fintech applications—prioritize approvals that ensure operational readiness. Environment readiness, dependency readiness, operations and SRE approval, and QA sign-off become mandatory because downtime directly impacts revenue and customer trust. These teams focus intensely on rollback readiness, comprehensive monitoring, and minimizing any potential service disruption.

## Configuring Manual Activities

When setting up manual activities, you have extensive configuration options that control how approvals work, what information gets captured, and how stakeholders are notified. These settings let you tailor the approval process to match your team's workflow and compliance requirements.

### Approval Configuration

The approval configuration determines who can approve activities and how many approvals are needed. You can designate approvers in several ways. Individual users work well when you need a specific person's sign-off, like a product owner or security lead. User groups are useful when any member of a team can approve, such as the SRE on-call rotation. Role-based approvers provide flexibility by assigning approvals to anyone with a specific role, like Release Manager or QA Lead, which helps when team members change but roles remain consistent.

You also need to define how many approvals are required before the activity can proceed. A single approver works for straightforward decisions where one person has the authority. Majority approval makes sense when you want input from multiple stakeholders but don't need complete consensus. Unanimous approval ensures everyone agrees, which is critical for high-risk changes. Custom thresholds give you fine-grained control, like requiring three out of five designated approvers to sign off.

Time constraints help prevent approvals from stalling releases indefinitely. You can set a deadline that defines the latest time by which approval must be provided. If that deadline is missed, you can configure escalation to notify a higher authority or automatically reject the activity to prevent the release from hanging in limbo.

### Information Capture

Manual activities can require approvers to provide specific information before they can approve or reject. This serves multiple purposes: it ensures approvers have reviewed the necessary context, creates an audit trail of decision-making, and captures evidence for compliance requirements.

Input fields come in several types. Text fields let approvers provide comments, justifications, or notes explaining their decision. File uploads enable attaching screenshots, test results, compliance documents, or any other evidence that supports the approval. Checkboxes provide simple confirmations of specific conditions, like "I confirm all critical tests passed." Dropdown selections offer predefined options for structured data, such as risk level assessments or deployment strategy choices.

You can mark fields as required or optional depending on how critical the information is. For compliance-heavy approvals, you might require evidence uploads, while simpler approvals might make comments optional. Validation rules help enforce data quality by requiring minimum text lengths for justifications, specifying required file types for evidence, or validating formats for specific fields like risk levels or ticket numbers.

### Notifications

Effective notification systems ensure that approvers know when their action is needed and that stakeholders stay informed about approval status. Notifications trigger at several key moments: when an activity becomes active and is awaiting approval, as reminders if no action has been taken, when deadlines are approaching, and when activities are completed (either approved or rejected).

You can deliver notifications through multiple channels to reach approvers wherever they work. Email notifications provide a reliable fallback that works across all devices and time zones. Slack and Microsoft Teams integrations bring approvals directly into team communication channels where people already spend their time. In-app notifications appear when users are actively working in the platform. For critical approvals that can't wait, SMS notifications ensure immediate awareness even when someone isn't checking email or chat.

### Audit and Evidence

For compliance and accountability, the system automatically captures comprehensive audit information for every approval decision. This includes who approved or rejected the activity, exactly when the action occurred, what inputs were provided, and what evidence files were attached. For organizations with strict compliance requirements, the system also captures IP addresses and session information that can be used to verify the authenticity of approvals during audits.

## Monitoring Manual Activities

When a release contains manual activities, you need clear visibility into what's waiting for approval and who needs to take action. The monitoring interface provides multiple views that help you track approval status at different levels of detail.

The release view gives you a high-level overview of the entire release. If any manual activity is awaiting approval, the overall release status shows "On Hold" so you immediately know the release is paused. The interface displays a count of activities requiring input, like "2 activities require your input," making it easy to see how many approval gates are pending. Visual indicators highlight which phases contain pending manual activities, helping you quickly identify where the release is waiting.

Drilling down into the phase view shows more detail about specific phases. Phases containing manual activities display a "Waiting for Approval" status, and a visual badge indicates exactly how many approvals are pending within that phase. This helps you understand whether you're waiting on one approval or multiple. The phase cannot complete until all manual activities within it are resolved, so the status accurately reflects the phase's true readiness.

The activity view provides the most detailed information about individual manual activities. Each activity shows its current status as "On Hold" or "Awaiting Approval," making it clear what action is needed. The view displays who the designated approvers are and which of them have already provided approval, so you can see if you're waiting on specific people. It also shows the deadline or time remaining for approval, helping you prioritize urgent approvals. Most importantly, it provides a direct link to take action, allowing approvers to approve, reject, or provide required inputs without navigating through multiple screens.

For approvers managing multiple releases, the notifications dashboard offers a centralized view of all pending approvals across all active releases. This view can be filtered to show only activities requiring your specific approval, so you don't have to sift through approvals assigned to others. The dashboard sorts approvals by urgency, with deadline-approaching activities shown first, ensuring you address time-sensitive approvals promptly. Quick action buttons let you jump directly to each activity, streamlining the approval workflow when you have multiple pending approvals.

## Related Topics

- [Manual Activities](../activities/activity-types/manual-activities.md)
- [Executing a release](../execution/executing-a-release.md)
- [Error Handling](../execution/error-handling.md)

