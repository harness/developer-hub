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

<!-- ============================================================================= -->


```mdx-code-block
import StoScannerStepNotes from './shared/step_palette/_sto-palette-notes.md';
```

<StoScannerStepNotes />

<!-- ============================================================================= -->

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



## Authentication Settings

### Domain (_extraction_)


```mdx-code-block
import StoSettingAuthDomain from './shared/step_palette/_sto-ref-ui-auth-domain.md';
```

<StoSettingAuthDomain />

### Enforce SSL

```mdx-code-block
import StoSettingProductSSL from './shared/step_palette/_sto-ref-ui-auth-ssl.md';
```

<StoSettingProductSSL />


### API Version

```mdx-code-block
import StoSettingApiVersion from './shared/step_palette/_sto-ref-ui-auth-api-version.md';
```

<StoSettingApiVersion />

### Type

```mdx-code-block
import StoSettingAuthType from './shared/step_palette/_sto-ref-ui-auth-type.md';
```

<StoSettingAuthType />

### Access ID (_orchestration_)

```mdx-code-block
import StoSettingAuthAccessID from './shared/step_palette/_sto-ref-ui-auth-access-id.md';
```

<StoSettingAuthAccessID />


### Access Token

```mdx-code-block
import StoSettingAuthAccessToken from './shared/step_palette/_sto-ref-ui-auth-access-token.md';
```

<StoSettingAuthAccessToken />


## Container Image settings

### Type  (_orchestration_)

```mdx-code-block
import StoSettingImageType from './shared/step_palette/_sto-ref-ui-image-type.md';
```

<StoSettingImageType />


### Domain (_extraction_)


```mdx-code-block
import StoSettingImageDomain from './shared/step_palette/_sto-ref-ui-image-domain.md';
```

<StoSettingImageDomain />


### Name

```mdx-code-block
import StoSettingImageName from './shared/step_palette/_sto-ref-ui-image-name.md';
```

<StoSettingImageName />

### Tag

```mdx-code-block
import StoSettingImageTag from './shared/step_palette/_sto-ref-ui-image-tag.md';
```

<StoSettingImageTag />

<!-- ============================================================================= -->
<a name="container-access-id"></a>

### Access Id

```mdx-code-block
import StoSettingImageAccessID from './shared/step_palette/_sto-ref-ui-image-access-id.md';
```

<StoSettingImageAccessID />

<!-- ============================================================================= -->
<a name="container-access-token"></a>

### Access Token 

```mdx-code-block
import StoSettingImageAccessToken from './shared/step_palette/_sto-ref-ui-image-access-token.md';
```

<StoSettingImageAccessToken />

<!-- ============================================================================= -->
<a name="container-access-token"></a>

### Region  

```mdx-code-block
import StoSettingImageRegion from './shared/step_palette/_sto-ref-ui-image-region.md';
```

<StoSettingImageRegion />

## Scan Tool Settings


### Project Name

```mdx-code-block
import StoSettingToolProjectName from './shared/step_palette/_sto-ref-ui-tool-project-name.md';
```

<StoSettingToolProjectName />

<!-- ============================================================================= -->
<a name="tool-project-version"></a>

### Project Version

```mdx-code-block
import StoSettingToolProjectVersion from './shared/step_palette/_sto-ref-ui-tool-project-version.md';
```

<a name="product-project-version"></a>
<StoSettingToolProjectVersion />


<!-- ============================================================================= -->
<a name="tool-include"></a>	

### Include 

```mdx-code-block
import StoSettingToolInclude from './shared/step_palette/_sto-ref-ui-tool-include.md';
```

<StoSettingToolInclude />

<!-- ============================================================================= -->
<a name="tool-exclude"></a>	

### Exclude

```mdx-code-block
import StoSettingToolExclude from './shared/step_palette/_sto-ref-ui-tool-exclude.md';
```

<StoSettingToolExclude />

<!-- ============================================================================= -->
<a name="tool-context"></a>	

### Context Name

```mdx-code-block
import StoSettingToolContext from './shared/step_palette/_sto-ref-ui-tool-context.md';
```

<StoSettingToolContext />

<!-- ============================================================================= -->
<a name="tool-context-image"></a>

### Context Name (images) 

```mdx-code-block
import StoSettingToolImageName from './shared/step_palette/_sto-ref-ui-tool-context-image.md';
```

<StoSettingToolImageName />


<!-- ============================================================================= -->
<a name="tool-team-name"></a>

### Team Name

```mdx-code-block
import StoSettingToolProductTeamName from './shared/step_palette/_sto-ref-ui-tool-project-team.md';
```

<StoSettingToolProductTeamName  />

<!-- ============================================================================= -->
<a name="tool-port"></a>

### Port  


```mdx-code-block
import StoSettingToolPort from './shared/step_palette/_sto-ref-ui-tool-port.md';
```

<StoSettingToolPort  />

<!-- ============================================================================= -->
<a name="tool-java-libraries"></a>

### Java Libraries

```mdx-code-block
import StoSettingTooJavaLibraries from './shared/step_palette/_sto-ref-ui-tool-java-libraries.md';
```

<StoSettingTooJavaLibraries  />

<!-- ============================================================================= -->
<a name="tool-java-binaries"></a>

### Java Binaries


```mdx-code-block
import StoSettingToolJavaBinaries from './shared/step_palette/_sto-ref-ui-tool-java-binaries.md';
```
<StoSettingToolJavaBinaries  />

<!-- ============================================================================= -->
<a name="tool-product-token"></a>

### Product Token  


```mdx-code-block
import StoSettingToolProductToken from './shared/step_palette/_sto-ref-ui-tool-prod-token.md';
```

<StoSettingToolProductToken  />

<!-- ============================================================================= -->
<a name="tool-product-name"></a>

### Name 

```mdx-code-block
import StoSettingToolProductAccessID from './shared/step_palette/_sto-ref-ui-tool-prod-name.md';
```
<StoSettingToolProductAccessID  />

<!-- ============================================================================= -->
<a name="tool-project-token"></a>

### Project Token

```mdx-code-block
import toSettingToolProductToken from './shared/step_palette/_sto-ref-ui-tool-prod-token.md';
```

<StoSettingToolProductToken  />

<!-- ============================================================================= -->
<a name="tool-product-lookup-type"></a>

### Lookup Type

```mdx-code-block
import StoSettingToolLookupType from './shared/step_palette/_sto-ref-ui-tool-prod-lookup-type.md';
```
<StoSettingToolLookupType  />

## Instance settings

### Domain

```mdx-code-block
import StoSettingInstanceDomain from './shared/step_palette/_sto-ref-ui-instance-domain.md';
```
<StoSettingInstanceDomain />

<!-- ============================================================================= -->
<a name="instance-protocol"></a>

### Protocol

```mdx-code-block
import StoSettingInstanceProtocol from './shared/step_palette/_sto-ref-ui-instance-protocol.md';
```

<StoSettingInstanceProtocol />

<!-- ============================================================================= -->
<a name="instance-port"></a>

### Port

```mdx-code-block
import StoSettingInstancePort from './shared/step_palette/_sto-ref-ui-instance-port.md';
```

<StoSettingInstancePort />

<!-- ============================================================================= -->
<a name="instance-path"></a>

### Path

```mdx-code-block
import StoSettingInstancePath from './shared/step_palette/_sto-ref-ui-instance-path.md';
```

<StoSettingInstancePath />


<!-- ============================================================================= -->

<!-- ============================================================================= -->

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
