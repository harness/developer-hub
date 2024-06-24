---
title: SAST scan setup
description: How to add a SAST scan to your pipeline
sidebar_label: SAST scan setup
sidebar_position: 10
---

<!-- https://www.harness.io/harness-devops-academy/what-is-static-application-security-testing-sast -->

A SAST scan is generally the first step to include in an STO pipeline. SAST scans are essential to shift-left security practices. Developers use SAST scans to address security issues early, before the application is deployed.

A SAST scan checks for any code that aligns with known [CVEs](https://cve.mitre.org/) and [CWEs](https://cwe.mitre.org/). STO integrates with [many open-source and commercial SAST scanners](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#code-repo-scanners). STO also includes a [built-in step](/docs/security-testing-orchestration/sto-techref-category/built-in/sast) for adding a SAST scan in just a few clicks.

The following video shows how to add a SAST scan to an STO pipeline, trigger the pipeline from GitHub, view the scan results, and remediate detected issues. 

<DocVideo src="https://www.youtube.com/watch?v=qFnS6X4d5Ro" />


### Benefits

Here are some important benefits of including SAST scans in your Harness pipelines:

- SAST scans enable developers to address security issues at the earliest stage of development.

- SAST help promote secure coding practices and foster a security-conscious mindset among developers.

- SAST scans are critical for helping organizations meet government regulations and industry standards for secure coding practices and application security. This ensures trust among customers, partners, and stakeholders.

- SAST scans enable you to analyze the source code, bytecode, or compiled version of an application without running it.

- SAST scans can analyze complex codebases and detect even the most obscure vulnerabilities.

- SAST scans can detect a wide range of security issues, including input validation errors, [cross-site scripting (XSS) vulnerabilities](https://cwe.mitre.org/data/definitions/79.html), [SQL injection flaws](https://cwe.mitre.org/data/definitions/89.html), [buffer overflows](https://cwe.mitre.org/data/definitions/119.html), [risky cryptographic algorithms](https://cwe.mitre.org/data/definitions/327.html) and more.


### Best practices

<!-- 
### Code security issues: examples

SAST scanners can detect issues such as:

- [SQL injections](https://cwe.mitre.org/data/definitions/89.html) that allow bad actors to insert malicious statements into SQL queries.
- [Cross-site scripting](https://cwe.mitre.org/data/definitions/79.html) that allows bad actors to introduce untrusted data in requests to a web application.
- [Broken or risky cryptographic algorithms](https://cwe.mitre.org/data/definitions/327.html) that allow bad actors to expose sensitive information, modify data, and spoof identities.
- [Buffer overrun issues](https://cwe.mitre.org/data/definitions/119.html) that allow bad actors that allow bad actors to run malicious code, access sensitive information, and crash applications. 

-->








