---
title: Zed Attack Proxy (ZAP) Scanner Reference
description: ​Zed Attack Proxy (ZAP) is a free, open-source penetration tool for testing web applications. You can use ZAP to run penetration testing to simulate a malicious external attack and use the results to protect your app from unauthorized access and denial-of-service attack.
sidebar_position: 80
helpdocs_topic_id: m9494vxwac
helpdocs_category_id: m01pu2ubai
helpdocs_is_private: false
helpdocs_is_published: true
---

[Zed Attack Proxy (ZAP)](https://www.zaproxy.org/getting-started/) is a free, open-source penetration tool for testing web applications. ZAP runs as a “man-in-the-middle proxy” between the tester’s browser and the web app. You can use ZAP to run penetration testing to simulate a malicious external attack and use the results to protect your app from unauthorized access and denial-of-service attacks.

### Scan policy types

STO supports the following scan policy types for ZAP:

* `orchestratedScan`  — A Security step in the pipeline runs the scan and ingests the results. This is easier to set up and supports scans with default or predefined settings.
* `ingestionOnly` — Run the scan in a Run step, or outside the pipeline, and then ingest the results. This is useful for advanced workflows that address specific security needs. See [Ingest scan results into an STO pipeline](/docs/security-testing-orchestration/use-sto/ingest-scan-results-into-an-sto-pipeline.md).

### Required Settings

* `product_name` = `zap`
* `scan_type` = `instance`
* `product_config_name`— Specify one of the following:
	+ `standard` (scanMode = active, scanType = standard)
	+ `attack`(scanMode = active, scanType = attack)
	+ `quick`(scanMode = active, scanType = standard, quickMode = true)
* `instance_identifier`— The target Id that will appear in the **Test Targets** page of the Harness UI.
* `instance_environment` — The instance environment, such as `dev`, `qa`, `pre-qa`, or `prod`.
* `instance_domain` — The app domain to scan, for example `public-firing-range.appspot.com/`
* `instance_protocol` — The protocol of the site to scan. Generally this is `http` or `https`.
* `instance_type` = `website`

### Optional Settings

* `instance_path` — Specify if the app URL includes a path beyond the domain. If you want to scan `https://app.my-domain.com/myModule/myApp`, the instance path is `myModule/myApp`.
* `instance_port` — Specify if the site is accessed using a non-default port.

