---
title: Troubleshoot SSL in STO
description: Troubleshoot certificate issues when running STO scans.
sidebar_position: 60
redirect_from:
  - /docs/security-testing-orchestration/use-sto/set-up-sto-pipelines/add-custom-certs/ssl-troubleshooting-in-sto
---

If you're having issues [running STO scans with custom
SSL certificates](/docs/security-testing-orchestration/use-sto/secure-sto-pipelines/ssl-setup-in-sto), try the following:

- Run your pipeline in Debug mode and check for log messages such as **`unable to get local issuer certificate`**.

- In some cases, a scan might report that a certificate is invalid when in fact the root cause is not related to SSL. For example, the certificates might have an invalid domain defined. To determine if the root cause is SSL-related, you might try running a scan with SSL verification disabled temporarily. 

  You'll need to disable verification in both the Harness pipeline and the external scanner. Note that not all scan tools support this option. 

  -  For information about disabling SSL verification in the scanner, go to the external scanner documentation. If the scanner includes a CLI option for this, you can use `tool_args` in your step to run a scan with this option turned off. For example, you can run a [Black Duck Hub](/docs/security-testing-orchestration/sto-techref-category/black-duck-hub-scanner-reference#settings) scan with this setting: `tool_args : --blackduck.trust.cert=TRUE`
 
  - If you're using a scanner-specific step, such as Aqua Trivy or Mend, uncheck **Enforce SSL** in the configuration palette. 

  - If you're using a **Custom Scan** step, add this setting: `bypass_ssl_check : true`
