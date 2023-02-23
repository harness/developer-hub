---
title: Template Test C(Ignore)
description: All the available settings to configure individual scans.
sidebar_position: 130
---


You can ingest [ orchestrate $PRODUCT scans and ingest scan results | ingest results from $PRODUCT ] into your pipelines. This topics describes the required and optional settings for setting up a $PRODUCT scan. 

You can set up a $PRODUCT scan in CI and SecurityTest stages. For some scanners, you can set up the scan in the UI. The following examples show the YAML fields to configure.

# Step Palette Configuration 

To set up a $PRODUCT scan, add a Build (CI) or a SecurityTests stage to your pipeline. Then add a $PRODUCT scan step to the stage and configure it as described below. 

<a name="toc"></a>

<details>
    <summary>Step Palette</summary>

![](./static/step-palette-00.png) 

</details>



- [Step Palette Configuration](#step-palette-configuration)
  - [Step Parameters](#step-parameters)
    - [Scan Mode](#scan-mode)
    - [Scan Configuration](#scan-configuration)
  - [Target](#target)
    - [Type](#type)
    - [Name](#name)
    - [Variant](#variant)
    - [Workspace (_repository_)](#workspace-repository)
    - [Ingestion File (_ingestion_)](#ingestion-file-ingestion)
  - [Authentication](#authentication)
    - [Domain (_extraction_)](#domain-extraction)
    - [Enforce SSL](#enforce-ssl)
    - [API Version](#api-version)
    - [Type](#type-1)
    - [Access ID (_orchestration_)](#access-id-orchestration)
    - [Access Token](#access-token)
  - [Container Image](#container-image)
    - [Type  (_orchestration_)](#type--orchestration)
    - [Domain (_extraction_)](#domain-extraction-1)
    - [Name](#name-1)
    - [Tag](#tag)
    - [Access Id](#access-id)
    - [Access Token](#access-token-1)
    - [Region](#region)
  - [Scan Tool](#scan-tool)
    - [Project Name](#project-name)
    - [Project Version](#project-version)
    - [Include](#include)
    - [Exclude](#exclude)
    - [Context Name](#context-name)
    - [Context Name (images)](#context-name-images)
    - [Team Name](#team-name)
    - [Port](#port)
    - [Java Libraries](#java-libraries)
    - [Java Binaries](#java-binaries)
    - [Product Token](#product-token)
    - [Name](#name-2)
    - [Project Token](#project-token)
    - [Lookup Type](#lookup-type)
  - [Instance Settings](#instance-settings)
    - [Domain](#domain)
    - [Protocol](#protocol)
    - [Port](#port-1)
    - [Path](#path)
  - [Log Level](#log-level)
  - [Additional CLI flags](#additional-cli-flags)
  - [Fail on severity](#fail-on-severity)




<!-- ============================================================================= -->

## Step Parameters 

<a name="scan-mode"></a>

### Scan Mode

```mdx-code-block
import StoSettingScanMode from './shared/_sto-ref-ui-scan-mode.md';
import StoSettingScanModeOrch from './shared/_sto-ref-ui-scan-mode-00-orchestrated.md';
import StoSettingScanModeData from './shared/_sto-ref-ui-scan-mode-01-dataload.md';
import StoSettingScanModeIngest from './shared/_sto-ref-ui-scan-mode-02-ingestonly.md';
```

<StoSettingScanMode />
<StoSettingScanModeOrch />
<StoSettingScanModeData />
<StoSettingScanModeIngest />

[TOC &uarr;](#toc)

<!-- ============================================================================= -->
<a name="scan-config"></a>

### Scan Configuration

```mdx-code-block
import StoSettingProductConfigName from './shared/_sto-ref-ui-product-config-name.md';
```

<StoSettingProductConfigName />

[TOC &uarr;](#toc)

## Target


<!-- ============================================================================= -->
<a name="target-type"></a>

### Type

```mdx-code-block
import StoSettingScanType from './shared/_sto-ref-ui-scan-type.md';
import StoSettingScanTypeRepo     from './shared/_sto-ref-ui-scan-type-00-repo.md';
import StoSettingScanTypeCont     from './shared/_sto-ref-ui-scan-type-01-container.md';
import StoSettingScanTypeInst     from './shared/_sto-ref-ui-scan-type-02-instance.md';
import StoSettingScanTypeConfig  from './shared/_sto-ref-ui-scan-type-03-config.md';
```
<a name="scan-type"></a>
<StoSettingScanType />
<StoSettingScanTypeRepo />
<StoSettingScanTypeCont />
<StoSettingScanTypeInst />
<StoSettingScanTypeConfig />

[TOC &uarr;](#toc)

<!-- ============================================================================= -->
<a name="target-name"></a>

### Name 

```mdx-code-block
import StoSettingProductID from './shared/_sto-ref-ui-prod-id.md';
```

<StoSettingProductID />

[TOC &uarr;](#toc)

<!-- ============================================================================= -->
<a name="target-variant"></a>

### Variant

```mdx-code-block
import StoSettingTargetVariant from './shared/_sto-ref-ui-target-variant.md';
```

<StoSettingTargetVariant  />

[TOC &uarr;](#toc)

<!-- ============================================================================= -->
<a name="target-workspace"></a>

### Workspace (_repository_)

```mdx-code-block
import StoSettingTargetWorkspace from './shared/_sto-ref-ui-target-workspace.md';
```

<StoSettingTargetWorkspace  />

[TOC &uarr;](#toc)

<!-- ============================================================================= 

## Ingestion (_ingestion_)

<!-- ============================================================================= -->
<a name="ingestion-file"></a>

### Ingestion File (_ingestion_)

```mdx-code-block
import StoSettingIngestionFile from './shared/_sto-ref-ui-ingestion-file.md';
```

<StoSettingIngestionFile  />

[TOC &uarr;](#toc)

## Authentication

<!-- ============================================================================= -->
<a name="auth-domain"></a>

### Domain (_extraction_)


```mdx-code-block
import StoSettingAuthDomain from './shared/_sto-ref-ui-auth-domain.md';
```

<StoSettingAuthDomain />

[TOC &uarr;](#toc)

<!-- ============================================================================= -->
<a name="auth-enforce-ssl"></a>

### Enforce SSL

```mdx-code-block
import StoSettingProductSSL from './shared/_sto-ref-ui-auth-ssl.md';
```

<StoSettingProductSSL />

[TOC &uarr;](#toc)

<!-- ============================================================================= -->
<a name="auth-access-api-version"></a>

### API Version

```mdx-code-block
import StoSettingApiVersion from './shared/_sto-ref-ui-auth-api-version.md';
```

<StoSettingApiVersion />

[TOC &uarr;](#toc)

<!-- ============================================================================= -->
<a name="auth-type"></a>

### Type

```mdx-code-block
import StoSettingAuthType from './shared/_sto-ref-ui-auth-type.md';
```

<StoSettingAuthType />

[TOC &uarr;](#toc)

<!-- ============================================================================= -->

<a name="auth-access-id"></a>

### Access ID (_orchestration_)

```mdx-code-block
import StoSettingAuthAccessID from './shared/_sto-ref-ui-auth-access-id.md';
```

<StoSettingAuthAccessID />

[TOC &uarr;](#toc)

<!-- ============================================================================= -->
<a name="auth-access-token"></a>

### Access Token

```mdx-code-block
import StoSettingAuthAccessToken from './shared/_sto-ref-ui-auth-access-token.md';
```


<StoSettingAuthAccessToken />

[TOC &uarr;](#toc)




## Container Image 


<!-- ============================================================================= -->
<a name="container-type"></a>

### Type  (_orchestration_)

```mdx-code-block
import StoSettingImageType from './shared/_sto-ref-ui-image-type.md';
```

<StoSettingImageType />

[TOC &uarr;](#toc)

!-- ============================================================================= -->
<a name="container-domain"></a>

### Domain (_extraction_)


```mdx-code-block
import StoSettingImageDomain from './shared/_sto-ref-ui-image-domain.md';
```

<StoSettingImageDomain />

[TOC &uarr;](#toc)

<!-- ============================================================================= -->
<a name="container-name"></a>

### Name

```mdx-code-block
import StoSettingImageName from './shared/_sto-ref-ui-image-name.md';
```

<StoSettingImageName />

[TOC &uarr;](#toc)

<
<!-- ============================================================================= -->
<a name="container-tag"></a>

### Tag

```mdx-code-block
import StoSettingImageTag from './shared/_sto-ref-ui-image-tag.md';
```

<StoSettingImageTag />

[TOC &uarr;](#toc)

<!-- ============================================================================= -->
<a name="container-access-id"></a>

### Access Id

```mdx-code-block
import StoSettingImageAccessID from './shared/_sto-ref-ui-image-access-id.md';
```

<StoSettingImageAccessID />

[TOC &uarr;](#toc)

<!-- ============================================================================= -->
<a name="container-access-token"></a>

### Access Token 

```mdx-code-block
import StoSettingImageAccessToken from './shared/_sto-ref-ui-image-access-token.md';
```

<StoSettingImageAccessToken />

[TOC &uarr;](#toc)

<!-- ============================================================================= -->
<a name="container-access-token"></a>

### Region  

```mdx-code-block
import StoSettingImageRegion from './shared/_sto-ref-ui-image-region.md';
```

<StoSettingImageRegion />

[TOC &uarr;](#toc)

<!-- ============================================================================= -->


## Scan Tool

<!-- ============================================================================= -->
<a name="tool-project-name"></a>

### Project Name

```mdx-code-block
import StoSettingToolProjectName from './shared/_sto-ref-ui-tool-project-name.md';
```

<StoSettingToolProjectName />

[TOC &uarr;](#toc)

<!-- ============================================================================= -->
<a name="tool-project-version"></a>

### Project Version

```mdx-code-block
import StoSettingToolProjectVersion from './shared/_sto-ref-ui-tool-project-version.md';
```

<a name="product-project-version"></a>
<StoSettingToolProjectVersion />

[TOC &uarr;](#toc)

<!-- ============================================================================= -->
<a name="tool-include"></a>	

### Include 

```mdx-code-block
import StoSettingToolInclude from './shared/_sto-ref-ui-tool-include.md';
```

<StoSettingToolInclude />

[TOC &uarr;](#toc)

<!-- ============================================================================= -->
<a name="tool-exclude"></a>	

### Exclude

```mdx-code-block
import StoSettingToolExclude from './shared/_sto-ref-ui-tool-exclude.md';
```

<StoSettingToolExclude />

[TOC &uarr;](#toc)

<!-- ============================================================================= -->
<a name="tool-context"></a>	

### Context Name

```mdx-code-block
import StoSettingToolContext from './shared/_sto-ref-ui-tool-context.md';
```

<StoSettingToolContext />

<!-- ============================================================================= -->
<a name="tool-context-image"></a>

### Context Name (images) 

```mdx-code-block
import StoSettingToolImageName from './shared/_sto-ref-ui-tool-context-image.md';
```

<StoSettingToolImageName />

[TOC &uarr;](#toc)

<!-- ============================================================================= -->
<a name="tool-team-name"></a>

### Team Name

```mdx-code-block
import StoSettingToolProductTeamName from './shared/_sto-ref-ui-tool-project-team.md';
```

<StoSettingToolProductTeamName  />

[TOC &uarr;](#toc)

<!-- ============================================================================= -->
<a name="tool-port"></a>

### Port  


```mdx-code-block
import StoSettingToolPort from './shared/_sto-ref-ui-tool-port.md';
```

<StoSettingToolPort  />

[TOC &uarr;](#toc)

<!-- ============================================================================= -->
<a name="tool-java-libraries"></a>

### Java Libraries

```mdx-code-block
import StoSettingTooJavaLibraries from './shared/_sto-ref-ui-tool-java-libraries.md';
```

<StoSettingTooJavaLibraries  />

[TOC &uarr;](#toc)

<!-- ============================================================================= -->
<a name="tool-java-binaries"></a>

### Java Binaries


```mdx-code-block
import StoSettingToolJavaBinaries from './shared/_sto-ref-ui-tool-java-binaries.md';
```
<StoSettingToolJavaBinaries  />

[TOC &uarr;](#toc)

<!-- ============================================================================= -->
<a name="tool-product-token"></a>

### Product Token  


```mdx-code-block
import StoSettingToolProductToken from './shared/_sto-ref-ui-tool-prod-token.md';
```

<StoSettingToolProductToken  />

[TOC &uarr;](#toc)

<!-- ============================================================================= -->
<a name="tool-product-name"></a>

### Name 

```mdx-code-block
import StoSettingToolProductAccessID from './shared/_sto-ref-ui-tool-prod-name.md';
```
<StoSettingToolProductAccessID  />

[TOC &uarr;](#toc)

<!-- ============================================================================= -->
<a name="tool-project-token"></a>

### Project Token

```mdx-code-block
import toSettingToolProductToken from './shared/_sto-ref-ui-tool-prod-token.md';
```

<StoSettingToolProductToken  />

[TOC &uarr;](#toc)

<!-- ============================================================================= -->
<a name="tool-product-lookup-type"></a>

### Lookup Type

```mdx-code-block
import StoSettingToolLookupType from './shared/_sto-ref-ui-tool-prod-lookup-type.md';
```
<StoSettingToolLookupType  />

[TOC &uarr;](#toc)

## Instance Settings


<!-- ============================================================================= -->
<a name="instance-domain"></a>

### Domain

```mdx-code-block
import StoSettingInstanceDomain from './shared/_sto-ref-ui-instance-domain.md';
```
<StoSettingInstanceDomain />

[TOC &uarr;](#toc)

<!-- ============================================================================= -->
<a name="instance-protocol"></a>

### Protocol

```mdx-code-block
import StoSettingInstanceProtocol from './shared/_sto-ref-ui-instance-protocol.md';
```

<StoSettingInstanceProtocol />

[TOC &uarr;](#toc)

<!-- ============================================================================= -->
<a name="instance-port"></a>

### Port

```mdx-code-block
import StoSettingInstancePort from './shared/_sto-ref-ui-instance-port.md';
```

<StoSettingInstancePort />

[TOC &uarr;](#toc)

<!-- ============================================================================= -->
<a name="instance-path"></a>

### Path

```mdx-code-block
import StoSettingInstancePath from './shared/_sto-ref-ui-instance-path.md';
```

<StoSettingInstancePath />

[TOC &uarr;](#toc)


<!-- ============================================================================= -->

<!-- ============================================================================= -->
<a name="log-level"></a>

## Log Level

```mdx-code-block
import StoSettingLogLevel from './shared/_sto-ref-ui-log-level.md';
```

<StoSettingLogLevel />

[TOC &uarr;](#toc)


<!-- ============================================================================= -->
<a name="cli-flags"></a>

## Additional CLI flags

```mdx-code-block
import StoSettingCliFlags from './shared/_sto-ref-ui-cli-flags.md';
```

<StoSettingCliFlags />

[TOC &uarr;](#toc)

<!-- ============================================================================= -->
<a name="fail-on-severity"></a>

## Fail on severity

```mdx-code-block
import StoSettingFailOnSeverity from './shared/_sto-ref-ui-fail-on-severity.md';
```
<StoSettingFailOnSeverity />

[TOC &uarr;](#toc)

























