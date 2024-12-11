---
title: Secrets Detection built-in scanner step reference
description: Run automated secrets-detection scans out of the box.
sidebar_position: 30
sidebar_label: Secrets Detection scan step reference 
---

You can use this step to add a built-in Gitleaks step to detect passwords and other secrets in your code repositories. Built-in steps enable you to add scans quickly and with minimal configuration. These steps use scanners that are free to STO users and are ready to run as soon as you add them to your pipeline.

<DocImage path={require('../static/built-in-scan-steps.png')} width="50%" height="50%" title="Click to view full size image" />

### Important notes

- Currently [Gitleaks](/docs/security-testing-orchestration/sto-techref-category/gitleaks-scanner-reference) scans are available for this step.

- The step detects your [target and variant](/docs/security-testing-orchestration/sto-techref-category/owasp-scanner-reference#target-and-variant-detection) automatically.

- All other settings such as **Log level** and **Fail on Severity** are set to their defaults. 

- You can configure the Gitleaks step after you add it to your pipeline, but this is optional. 