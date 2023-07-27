---
title: AWS Security Hub scanner reference
description: Configuration scans with AWS Image scanner
sidebar_position: 40
---

You can scan your configurations using [AWS Security Hub](https://docs.aws.amazon.com/securityhub/latest/userguide/what-is-securityhub.html), which provides a comprehensive view of your security state in AWS and helps you check your environment against security industry standards and best practices. 

## Before you begin

### Docker-in-Docker requirements


```mdx-code-block
import StoDinDRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/dind-bg-step.md';
```

<StoDinDRequirements />


### Root access requirements 

```mdx-code-block
import StoRootRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/root-access-requirements.md';
```

<StoRootRequirements />

## AWS Security Hub step configuration

### Scan settings

#### Scan Mode

```mdx-code-block
import StoSettingScanMode from './shared/step_palette/_sto-ref-ui-scan-mode.md';
import StoSettingScanModeData from './shared/step_palette/_sto-ref-ui-scan-mode-01-dataload.md';
import StoSettingScanModeIngest from './shared/step_palette/_sto-ref-ui-scan-mode-02-ingestonly.md';
```

<StoSettingScanMode />
<StoSettingScanModeData />
<StoSettingScanModeIngest />

<!-- ---------------------------------------------------------------------------- -->

<a name="scan-config"></a>

#### Scan Configuration

```mdx-code-block
import StoSettingProductConfigName from './shared/step_palette/_sto-ref-ui-product-config-name.md';
```

<StoSettingProductConfigName />

### Target settings

<a name="target-type"></a>

#### Type

```mdx-code-block
import StoSettingScanType from './shared/step_palette/_sto-ref-ui-scan-type.md';
import StoSettingScanTypeRepo     from './shared/step_palette/_sto-ref-ui-scan-type-00-repo.md';
import StoSettingScanTypeCont     from './shared/step_palette/_sto-ref-ui-scan-type-01-container.md';
import StoSettingScanTypeInst     from './shared/step_palette/_sto-ref-ui-scan-type-02-instance.md';
import StoSettingScanTypeConfig  from './shared/step_palette/_sto-ref-ui-scan-type-03-config.md';
```
<a name="scan-type"></a>
<StoSettingScanType />
<StoSettingScanTypeRepo />
<StoSettingScanTypeCont />
<StoSettingScanTypeInst />
<StoSettingScanTypeConfig />

<!-- ---------------------------------------------------------------------------- -->

<a name="target-name"></a>

#### Name 

```mdx-code-block
import StoSettingProductID from './shared/step_palette/_sto-ref-ui-prod-id.md';
```

<StoSettingProductID />


<!-- ---------------------------------------------------------------------------- -->

<a name="target-variant"></a>

#### Variant

```mdx-code-block
import StoSettingTargetVariant from './shared/step_palette/_sto-ref-ui-target-variant.md';
```

<StoSettingTargetVariant  />

### Ingestion File 


```mdx-code-block
import StoSettingIngestionFile from './shared/step_palette/_sto-ref-ui-ingestion-file.md';
```

<StoSettingIngestionFile  />

### Authentication settings

#### Access ID 

```mdx-code-block
import StoSettingAuthAccessID from './shared/step_palette/_sto-ref-ui-auth-access-id.md';
```

<StoSettingAuthAccessID />

<!-- ---------------------------------------------------------------------------- -->

<a name="auth-access-token"></a>

#### Access Token

```mdx-code-block
import StoSettingAuthAccessToken from './shared/step_palette/_sto-ref-ui-auth-access-token.md';
```

<StoSettingAuthAccessToken />


#### Access Region


```mdx-code-block
import StoSettingAuthDomain from './shared/step_palette/_sto-ref-ui-auth-domain.md';
```

<StoSettingAuthDomain />


<!-- ---------------------------------------------------------------------------- -->
<a name="auth-enforce-ssl"></a>


### Log Level, CLI flags, and Fail on Severity

#### Log Level

```mdx-code-block
import StoSettingLogLevel from './shared/step_palette/_sto-ref-ui-log-level.md';
```

<StoSettingLogLevel />


<!-- ============================================================================= -->
<a name="cli-flags"></a>

#### Additional CLI flags

```mdx-code-block
import StoSettingCliFlags from './shared/step_palette/_sto-ref-ui-cli-flags.md';
```

<StoSettingCliFlags />

<!-- ============================================================================= -->
<a name="fail-on-severity"></a>

#### Fail on Severity


```mdx-code-block
import StoSettingFailOnSeverity from './shared/step_palette/_sto-ref-ui-fail-on-severity.md';
```

<StoSettingFailOnSeverity />



## Security step settings (*deprecated*)

You can set up an AWS Security Hub scan using a Security step: create a CI Build or Security Tests stage, add a Security step, and then add the `setting:value` pairs as specified below.


<!-- SECURITY STEP CONFIG DBOX --------------------------------------------------------------------------- -->


* `product_name` : `aws-security-hub`
* [`scan_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#scanner-categories) : `configuration`
* [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods) : `dataLoad` or `ingestionOnly`
* `product_config_name` : `default`
* `fail_on_severity` - See [Fail on Severity](#fail-on-severity).

#### Target and variant

```mdx-code-block
import StoLegacyTargetAndVariant  from './shared/legacy/_sto-ref-legacy-target-and-variant.md';
```

<StoLegacyTargetAndVariant />

#### Configuration settings

```mdx-code-block
import StoLegacyConfig from './shared/legacy/_sto-ref-legacy-config.md';
```

<StoLegacyConfig  />

#### Ingestion file

```mdx-code-block
import StoLegacyIngest from './shared/legacy/_sto-ref-legacy-ingest.md';
```

<StoLegacyIngest />


<!-- INSTANCES  --------------------------------------------------------------------------- -->