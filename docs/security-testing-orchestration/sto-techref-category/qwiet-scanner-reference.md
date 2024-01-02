---
title: Qwiet AI (formerly ShiftLeft) scanner reference for STO
description: Repository scans with Qwiet
sidebar_label: Qwiet AI (formerly ShiftLeft) scanner reference
sidebar_position: 330
---

You can set up Qwiet scans using a Security step: create a CI Build or Security Tests stage, add a Security step, and then add the `setting:value` pairs as specified below.

## Important notes for running Qwiet scans in STO




### Docker-in-Docker requirements


import StoDinDRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/dind-bg-step.md';


<StoDinDRequirements />

### Root access requirements


import StoRootRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/root-access-requirements.md';


<StoRootRequirements />

### For more information


import StoMoreInfo from '/docs/security-testing-orchestration/sto-techref-category/shared/_more-information.md';


<StoMoreInfo />

## Security step settings for Qwiet scans in STO

### Target and variant


import StoLegacyTargetAndVariant  from './shared/legacy/_sto-ref-legacy-target-and-variant.md';


<StoLegacyTargetAndVariant />

### Qwiet AI scan settings

* `product_name` = `shiftleft`:
* [`scan_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#scanner-categories) = `repository`
* [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods) = `orchestratedScan`, `dataLoad`, or `ingestionOnly`
* When [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods) is set to `orchestratedScan` or `dataLoad`:
  + `product_access_id`
  + `product_access_token`
  + `product_app_name`
  + `product_target_language`
* `product_config_name` = `default`
* `fail_on_severity` - See [Fail on Severity](#fail-on-severity).

### Ingestion file


import StoLegacyIngest from './shared/legacy/_sto-ref-legacy-ingest.md';


<StoLegacyIngest />

### Fail on Severity


import StoSettingFailOnSeverity from './shared/step_palette/_sto-ref-ui-fail-on-severity.md';

<StoSettingFailOnSeverity />
