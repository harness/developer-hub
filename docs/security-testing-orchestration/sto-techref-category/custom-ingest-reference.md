---
title: Custom Ingest settings reference
description: ingest JSON or SARIF data from external scanners.
sidebar_position: 105
---

You can ingest results from any third-party scanner. Your results need to be in either [SARIF](https://docs.oasis-open.org/sarif/sarif/v2.1.0/sarif-v2.1.0.html) or [Harness Custom JSON](/docs/security-testing-orchestration/use-sto/orchestrate-and-ingest/ingesting-issues-from-other-scanners#json-data-format-reference) format.

For a full description of the workflow, go to [Ingest Results from Custom or Unsupported Scanners](/docs/security-testing-orchestration/use-sto/orchestrate-and-ingest/ingesting-issues-from-other-scanners.md).  

:::note
The Custom Ingest step is intended for scanners that have no supported integration in STO. Harness recommends that you always use the documented workflow for supported scanners. For a list of all STO-supported scanners, go to [Security Step Settings Reference](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference.md).
:::

<!--

Hiding notes added when Step Palettes were first introducted, per Rajiv 

```mdx-code-block
import StoScannerStepNotes from './shared/step_palette/_sto-palette-notes.md';
```

<StoScannerStepNotes />

-->

## Scan settings

### Scan Mode

```mdx-code-block
import StoSettingScanModeIngest from './shared/step_palette/_sto-ref-ui-scan-mode-02-ingestonly.md';
```

<StoSettingScanModeIngest />

<!-- ---------------------------------------------------------------------------- -->

<a name="scan-config"></a>

### Scan Configuration

```mdx-code-block
import StoSettingProductConfigName from './shared/step_palette/_sto-ref-ui-product-config-name.md';
```

<StoSettingProductConfigName />


## Target settings


### Type

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

### Name 

```mdx-code-block
import StoSettingProductID from './shared/step_palette/_sto-ref-ui-prod-id.md';
```

<StoSettingProductID />


<!-- ---------------------------------------------------------------------------- -->

<a name="target-variant"></a>

### Variant

```mdx-code-block
import StoSettingTargetVariant from './shared/step_palette/_sto-ref-ui-target-variant.md';
```

<StoSettingTargetVariant  />


<!-- ---------------------------------------------------------------------------- -->

<!-- a name="target-workspace"></a>

### Workspace (_repository_)

```mdx-code-block
import StoSettingTargetWorkspace from './shared/step_palette/_sto-ref-ui-target-workspace.md';
```

<StoSettingTargetWorkspace  / -->

<!-- ============================================================================= -->



## Ingestion Settings


### Ingestion File (_ingestion_)

```mdx-code-block
import StoSettingIngestionFile from './shared/step_palette/_sto-ref-ui-ingestion-file.md';
```

<StoSettingIngestionFile  />



## Log Level, CLI flags, and Fail on Severity


<a name="log-level"></a>

### Log Level

```mdx-code-block
import StoSettingLogLevel from './shared/step_palette/_sto-ref-ui-log-level.md';
```

<StoSettingLogLevel />


<!-- ============================================================================= -->
<a name="cli-flags"></a>

### Additional CLI flags

```mdx-code-block
import StoSettingCliFlags from './shared/step_palette/_sto-ref-ui-cli-flags.md';
```

<StoSettingCliFlags />

<!-- ============================================================================= -->
<a name="fail-on-severity"></a>

### Fail on Severity


```mdx-code-block
import StoSettingFailOnSeverity from './shared/step_palette/_sto-ref-ui-fail-on-severity.md';
```
<StoSettingFailOnSeverity />
