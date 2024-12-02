---
title: DAST built-in scanner step reference
description: Run automated DAST scans out of the box.
sidebar_position: 50
sidebar_label: DAST scan step reference 
---

You can use this step to add a built-in Zed Attack Proxy (ZAP) scan to detect vulnerabilities in your application instances. Built-in steps enable you to add scans quickly and with minimal configuration. These steps use scanners that are free to STO users and are ready to run as soon as you add them to your pipeline.

<DocImage path={require('../static/built-in-scan-steps.png')} width="50%" height="50%" title="Click to view full size image" />

:::note notes


- Currently only [Zed Attack Proxy (ZAP)](/docs/security-testing-orchestration/sto-techref-category/zap/zap-scanner-reference) scans are available for this step. 

- You must specify the [application domain](/docs/security-testing-orchestration/sto-techref-category/zap/zap-scanner-reference#domain) that you want to scan before you can add the step.

- The step detects your [target and variant](/docs/security-testing-orchestration/sto-techref-category/zap/zap-scanner-reference#target-and-variant-detectionn) automatically.

- All other settings such as **Log Level** and **Fail on Severity** are set to their defaults. 

- You can configure the ZAP step after you add it to your pipeline, but this is optional. 

:::