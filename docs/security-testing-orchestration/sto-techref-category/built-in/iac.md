---
title: IaC built-in scanner step reference
description: Run automated IaC scans out of the box.
sidebar_position: 50
sidebar_label: IaC scan step reference 
---

You can use this step to add a built-in [Checkov](/docs/security-testing-orchestration/sto-techref-category/checkov-iac-scan) scan to detect vulnerabilities in your Infrastructure as Code files. Built-in steps enable you to add scans quickly and with minimal configuration. These steps use scanners that are free to STO users and are ready to run as soon as you add them to your pipeline.

<DocImage path={require('../static/built-in-scan-steps.png')} width="50%" height="50%" title="Click to view full size image" />

:::note notes


- Currently only [Checkov](/docs/security-testing-orchestration/sto-techref-category/checkov-iac-scan) scans are available for this step. 

- You may specify the [Additional CLI flags](/docs/security-testing-orchestration/sto-techref-category/checkov-iac-scan#additional-cli-flags) before you can add the step, you can also re-configure these flags after you add the scanner.

- All other settings such as **Log Level** and **Fail on Severity** are set to their defaults.

:::