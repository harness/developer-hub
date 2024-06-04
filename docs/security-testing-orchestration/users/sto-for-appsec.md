---
title: STO for Application Security teams
description: STO features for AppSec teams
sidebar_position: 20
---

Security engineers, information security officers, and other Application Security team members can use STO to 
- Write highly targeted OPA policies based on issue severity, issue title, CVE age, reference ID, and number of occurrences.
- Enforce these policies by blocking pipelines where scan results violate one or more policies.
- Approve Fail on Severity exemptions to unblock pipelines for specific vulnerabilities.
- Receive auto-generated Jira tickets and Slack/email notifications for detected vulnerabilities.
- View all vulnerabilities in your  `main` branches, `latest` tag images, and other baselines in a single dashboard. 
- View all vulnerabilities in your Harness organization in a single dashboard and drill down into vulnerabilities based on organization, project, date, target, scanner, and so on. 


:::note

DevOps users need to have the **Security Testing SecOps** role assigned to perform these actions. For more information, go to [Add Security Testing roles](/docs/security-testing-orchestration/get-started/onboarding-guide#add-security-testing-roles). 

:::


## Key features

### Block pipelines based on scan results

- **[Fail on severity](docs/security-testing-orchestration/get-started/key-concepts/fail-pipelines-by-severity)** Every STO scan step has a Fail on Severity setting that fails the pipeline if the scan detected any issues at the selected severity or higher.
- **[Issue exemptions](//docs/security-testing-orchestration/exemptions/exemption-workflows)** DevOps and SecOps can request exemptions for specific issues to override the Fail by Severity setting. Only SecOps users can approve exemptions.
- **[Enforce governance policies](/docs/security-testing-orchestration/policies/create-opa-policies)** You can write and enforce policies against your security tests and block your pipelines on policy violations. You can define policies based on issue severity, issue title, CVE age, reference ID, and number of occurrences. 

### View all vulnerabilities in unified dashboards

- **[Security Tests UI](/docs/security-testing-orchestration/dashboards/view-scan-results)** Every STO pipeline execution has a **Security Tests** tab where you can navigate, analyze, and remediate all vulnerabilities detected in a specific scan.
- **[STO Overview](docs/security-testing-orchestration/dashboards/sto-overview)** This dashboard enables you to see all detected issues in your `main` branches, `latest` images, and other target baselines. You can also quickly the distribution of your baseline vulnerabilities over time. 
- **[Security Tests Dashboard](/docs/security-testing-orchestration/dashboards/security-testing-dashboard)** This dashboard enables you to view, navigate, discover, and investigate detected vulnerabilities in your organization. You can drill down into specific issues by project, creation date, scanner, target, pipeline, severity, and so on.

### Get automatic notifications via Jira, Slack and email when vulnerabilities are detected

- **[Create Jira tickets automatically](/docs/security-testing-orchestration/use-sto/view-and-troubleshoot-vulnerabilities/jira-integrations)** for issues detected by STO scans.
- **[Send notifications via Slack or email](/docs/security-testing-orchestration/notifications/slack-notifications)** when a pipeline fails due to STO scan results.


