---
title: STO for DevOps teams
description: Shift-left security features for DevOps teams
sidebar_position: 15
---

DevOps teams can use STO to 
- Run automated security scans at any point in the SDLC.
- Normalize and deduplicate results across multiple scanners.
- Set baselines such as the `main` branch or `latest` tag to identify downstream vs. upstream vulnerabilities.
- Selectively block pipelines based on detected vulnerabilities.
- Remediate vulnerabilities quickly and easily. 
- Auto-create Jira tickets and Slack/email notifications for detected vulnerabilities.

:::note

DevOps users need to have the **Security Testing Developer** role assigned to perform these actions. For more information, go to [Add Security Testing roles](/docs/security-testing-orchestration/get-started/onboarding-guide#add-security-testing-roles). 

:::


## Key features

### Shift-left automatic security scans

- **[Integration with 40+ scan tools](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#scanners-supported-by-sto)** including Wiz, Semgrep, SonarScanner, Snyk, and OWASP.
- **[Built-in open-source scanners](/docs/category/built-in-scan-steps)** You can add SAST, DAST, SCA, and container scans to your Harness pipelines in just a few clicks.
- **[SARIF support](/docs/security-testing-orchestration/orchestrate-and-ingest/ingestion-workflows/ingest-sarif-data)** You can easily ingest SARIF 2.1.0 data from any tool that supports this format.
- **[STO Custom JSON format](/docs/security-testing-orchestration/orchestrate-and-ingest/ingestion-workflows/ingesting-issues-from-other-scanners)** for unsupported scanners that cannot publish to SARIF.

### Block pipelines based on scan results

- **[Fail on severity](/docs/security-testing-orchestration/get-started/key-concepts/fail-pipelines-by-severity)** Every STO scan step has a Fail on Severity setting that fails the pipeline if the scan detected any issues at the selected severity or higher.
- **[Issue exemptions](/docs/security-testing-orchestration/exemptions/exemption-workflows)** Developers can request exemptions for specific issues to override the Fail by Severity setting. (Only SecOps users can approve exemptions.)
- **[Governance policies](/docs/security-testing-orchestration/policies/create-opa-policies)** You can write and enforce policies against your security tests and block your pipelines on policy violations. You can define policies based on issue severity, issue title, CVE age, reference ID, and number of occurrences. 

### Remediate vulnerabilities quickly and easily

- **[Security Tests UI](/docs/security-testing-orchestration/dashboards/view-scan-results)** where you can navigate, analyze, and remediate all detected vulnerabilities.
- **[Issue deduplication](/docs/security-testing-orchestration/get-started/your-first-sto-pipeline#fix-vulnerabilities)** STO aggregates, normalizes, deduplicates, and prioritizes vulnerabilities across scanners for fast remediation by developers. This ensures that each vulnerability is unique and includes all detected occurrences. 
- **[Streamlined remediation](/docs/security-testing-orchestration/dashboards/view-scan-results)** You can view detailed information for each vulnerability: severity, description, known remediations, and links to public information.
- **[AI Development Assistant (AIDA™)](/docs/security-testing-orchestration/remediations/ai-based-remediations)** that enables you to remediate issues quickly and easily.

### Auto-generate Jira tickets and Slack/email notifications based on scan results

- **[Create Jira tickets automatically](/docs/security-testing-orchestration/notifications/jira-integrations)** for issues detected by STO scans.
- **[Send notifications via Slack or email](/docs/security-testing-orchestration/notifications/slack-notifications)** when a pipeline fails due to STO scan results.


