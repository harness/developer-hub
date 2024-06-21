---
title: STO workflows for blocking builds and PRs
description: How to stop builds and pull requests based on STO scan results.
sidebar_label: STO workflows for blocking builds and pull/merge requests
sidebar_position: 10
---

Harness STO has the following features that enable you to stop Harness pipelines and CI builds if your scan results match your failure criteria.

- [Fail on Severity](/docs/security-testing-orchestration/exemptions/exemption-workflows)

  Every STO scan step has a `fail_on_severity` setting that fails the step if a scan detects issues with the specified severity or higher. You can also create exemptions ("Ignore rules") for specific issues to override this behavior.

- [Governance policies](/docs/security-testing-orchestration/policies/create-opa-policies)

   You can use Harness Policy as Code to write and enforce policies against your security tests, and to block your pipelines if a security test has any issues that violate those policies. STO includes a set of predefined templates for blocking pipelines based on issue severity, reference ID, CVE age, title, and number of occurrences.

-  Git triggers 

   You can set up Git triggers for your STO pipeline that block external builds if the pipeline fails. This functionality supports workflows such as:

   - Trigger an STO pipeline that detects vulnerabilities and blocks merging when a pull request targets a protected branch and/or updates specific files in the repo.
   - Include a keyword in a review comment to trigger a new scan if a previous pipeline execution failed.
   - Set branch protection rules that block pull requests if the STO pipeline fails.

   The following topics provide hands-on examples:

   - [GitHub triggers to block pull requests](/docs/security-testing-orchestration/use-sto/stop-builds-based-on-scan-results/github-triggers)
   - [GitLab triggers to block merge requests](/docs/security-testing-orchestration/use-sto/stop-builds-based-on-scan-results/gitlab-triggers)
