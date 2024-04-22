---
title: Clair scanner reference for STO
description: Scan container images with Clair.
sidebar_label: Clair scanner reference
sidebar_position: 110
---

You can scan container images using [Clair](https://github.com/quay/clair), an open-source project for the static analysis of vulnerabilities in application containers. 

To set up a Clair scan:

1. Add a [Custom Scan](/docs/security-testing-orchestration/sto-techref-category/custom-scan-reference) step to a Build or Security stage.

2. Review the [Important notes for Custom Scan steps](/docs/security-testing-orchestration/sto-techref-category/custom-scan-reference#important-notes-for-custom-scan-steps) for additional requirements and relevant information.

   If you're using Kubernetes or Docker build infrastructure, add a [Docker-in-Docker background step](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#docker-in-docker-requirements-for-sto) to the stage. 

2. Add the following `key:value` pairs to **Settings**.


## Custom Scan step settings for Clair scans in STO


### Target and variant

import StoLegacyTargetAndVariant  from './shared/custom-scan/_target-variant.md';

<StoLegacyTargetAndVariant />


### Clair scan settings

* `product_name` = `docker-content-trust` (clair)
* [`scan_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#scanner-categories) :`containerImage`
* [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods) : `orchestratedScan` or `ingestionOnly`
* `product_url`
* `product_access_id`
* `product_access_token`
* `product_config_name` :  `default`
* `fail_on_severity` - See [Fail on Severity](#fail-on-severity).

### Container scan settings 

import StoLegacyContainer  from './shared/custom-scan/_container.md';

<StoLegacyContainer />


### Ingestion file 

import StoLegacyIngest from './shared/custom-scan/_ingestion-file.md'; 

<StoLegacyIngest />


### Fail on Severity

import StoSettingFailOnSeverity from './shared/custom-scan/_fail-on-severity.md';

<StoSettingFailOnSeverity />




