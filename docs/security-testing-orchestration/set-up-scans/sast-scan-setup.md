---
title: SAST scan setup
description: How to add a SAST scan to your pipeline
sidebar_label: SAST scan setup
sidebar_position: 10
---

<!-- https://www.harness.io/harness-devops-academy/what-is-static-application-security-testing-sast -->

A SAST scan is generally the first step to include in an STO pipeline. Developers use SAST scans to address security issues early, before the application is deployed.

A SAST scan checks for any code that aligns with known [CVEs](https://cve.mitre.org/) and [CWEs](https://cwe.mitre.org/). STO integrates with [many open-source and commercial SAST scanners](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#code-repo-scanners). STO also includes a [built-in step](/docs/security-testing-orchestration/sto-techref-category/built-in/sast) for adding a SAST scan with just a few clicks.

The following video shows how to add a SAST scan to an STO pipeline, trigger the pipeline from GitHub, view the scan results, and remediate detected issues. 

<DocVideo src="https://www.youtube.com/watch?v=qFnS6X4d5Ro" />


### Benefits

Here are some significant benefits of including SAST scans in your Harness pipelines:

- SAST scans enable developers to address security issues at the earliest stage of development.

- SAST scans enable you to analyze the source code, bytecode, or compiled version of an application without running it.

- SAST scans promote secure coding practices and foster a security-conscious mindset among developers.

- SAST scans are critical for helping organizations meet government regulations and industry standards for secure coding practices and application security. Addressing security scans early ensures trust among customers, partners, and stakeholders.

- SAST scans can analyze complex codebases and detect even the most obscure vulnerabilities.

- SAST scans can detect a wide range of security issues. Here are just a few common examples:

  - [cross-site scripting (XSS) vulnerabilities](https://cwe.mitre.org/data/definitions/79.html)
  - [SQL injection flaws](https://cwe.mitre.org/data/definitions/89.html)
  - [buffer overflows](https://cwe.mitre.org/data/definitions/119.html)
  - [risky cryptographic algorithms](https://cwe.mitre.org/data/definitions/327.html)


### Best practices

- You should include a SAST scan at the start of every CI build pipeline. 

- You can specify policies to fail the scan step if the scanner detects specific vulnerabilities. 

   STO supports two methods for specifying failure criteria: 

    - [Fail on Severity](/docs/security-testing-orchestration/get-started/key-concepts/fail-pipelines-by-severity) — Every scan step has a Fail on Severity setting that fails the step if the scan detects any issues with the specified severity or higher. 

    - [OPA policies](/docs/security-testing-orchestration/policies/create-opa-policies) — You can use Harness Policy as Code to write and enforce policies based on severity, reference ID, title, CVE age, STO output variables, and number of occurrences.

- You can also [request exemptions](/docs/security-testing-orchestration/exemptions/exemption-workflows) for specific vulnerabilities to allow your build pipelines to proceed even if these vulnerabilities are detected.

- You can include multiple SAST scan steps at the start of your pipeline. If you have a license for a commercial scanner, you can include your commercial scanner in addition to one or more open-source scanners.

   No single scan tool is guaranteed to detect all vulnerabilities. Commercial scan tools generally provide more extensive scanning functionality than free ones. 

- SAST scans are only one part of an overall security strategy. You should also run [container scans on your images](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#artifact-scanners) after building them and run [DAST scans on your running applications](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#artifact-scanners) after updating them. 

### Add a built-in SAST scanner

To add a built-in SAST step to your pipeline:

1. Add a Build or Security stage to your pipeline.
2. In **About your stage**, select the [code repo](/docs/continuous-integration/use-ci/codebase-configuration/create-and-configure-a-codebase/) you want to scan.
3. Select **Cloud** - **Linux** - **AMD64** for the infrastructure.
2. Add a Built-in SAST (free [Semgrep](/docs/security-testing-orchestration/sto-techref-category/semgrep/semgrep-scanner-reference)) step.

The step is preconfigured with all the correct settings as soon as you add it. You might want to configure the following settings:

    - [Fail on Severity](#fail-on-severity) — Stop the pipeline if the scan detects any issues at a specified severity or higher
    - [Log Level](#log-level) — Useful for debugging

4. Save the pipeline and run it.

5. When the pipeline finishes, you can troubleshoot and remediate your vulnerabilities in the [Security Tests](/docs/security-testing-orchestration/dashboards/view-scan-results) tab. 

### Trigger a SAST scan in Git 

You can easily [create Git triggers](/docs/security-testing-orchestration/use-sto/stop-builds-based-on-scan-results/github-triggers) to run STO pipelines and block pull requests based on scan results. 

1. In your Harness pipeline, select **Triggers** and create a new trigger: 

   1. In **Configuration**, select the Git connector, repo name, and event (**Pull Request**).
   2. Accept the default settings in **Condition** and **Settings**, then select **Create Trigger**. 

2. Go to your Git repo and file a new pull request. 

3. This should trigger a new execution of your pipeline. When the execution finishes, view the scan results. 