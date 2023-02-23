---
title: Scanner Setup Template 1a (Plain)
description: All the available settings to configure individual scans.
sidebar_position: 2
---


```mdx-code-block
import StoSettingScanMode from './shared/_sto-ref-ui-scan-mode.md';
import StoSettingScanModeOrch from './shared/_sto-ref-ui-scan-mode-00-orchestrated.md';
import StoSettingScanModeData from './shared/_sto-ref-ui-scan-mode-01-dataload.md';
import StoSettingScanModeIngest from './shared/_sto-ref-ui-scan-mode-02-ingestonly.md';
import StoSettingProductConfigName from './shared/_sto-ref-ui-product-config-name.md';
import StoSettingScanType from './shared/_sto-ref-ui-scan-type.md';
import StoSettingScanTypeRepo     from './shared/_sto-ref-ui-scan-type-00-repo.md';
import StoSettingScanTypeCont     from './shared/_sto-ref-ui-scan-type-01-container.md';
import StoSettingScanTypeInst     from './shared/_sto-ref-ui-scan-type-02-instance.md';
import StoSettingScanTypeConfig  from './shared/_sto-ref-ui-scan-type-03-config.md';
import StoSettingProductID from './shared/_sto-ref-ui-prod-id.md';
import StoSettingTargetVariant from './shared/_sto-ref-ui-target-variant.md';
import StoSettingTargetWorkspace from './shared/_sto-ref-ui-target-workspace.md';
import StoSettingIngestionFile from './shared/_sto-ref-ui-ingestion-file.md';
import StoSettingAuthDomain from './shared/_sto-ref-ui-auth-domain.md';
import StoSettingProductSSL from './shared/_sto-ref-ui-auth-ssl.md';
import StoSettingApiVersion from './shared/_sto-ref-ui-auth-api-version.md';
import StoSettingAuthType from './shared/_sto-ref-ui-auth-type.md';
import StoSettingAuthAccessID from './shared/_sto-ref-ui-auth-access-id.md';
import StoSettingAuthAccessToken from './shared/_sto-ref-ui-auth-access-token.md';
import StoSettingImageType from './shared/_sto-ref-ui-image-type.md';
import StoSettingImageDomain from './shared/_sto-ref-ui-image-domain.md';
import StoSettingImageName from './shared/_sto-ref-ui-image-name.md';
import StoSettingImageTag from './shared/_sto-ref-ui-image-tag.md';
import StoSettingImageAccessID from './shared/_sto-ref-ui-image-access-id.md';
import StoSettingImageAccessToken from './shared/_sto-ref-ui-image-access-token.md';
import StoSettingImageRegion from './shared/_sto-ref-ui-image-region.md';
import StoSettingToolProjectName from './shared/_sto-ref-ui-tool-project-name.md';
import StoSettingToolProjectVersion from './shared/_sto-ref-ui-tool-project-version.md';
import StoSettingToolInclude from './shared/_sto-ref-ui-tool-include.md';
import StoSettingToolExclude from './shared/_sto-ref-ui-tool-exclude.md';
import StoSettingToolContext from './shared/_sto-ref-ui-tool-context.md';
import StoSettingToolImageName from './shared/_sto-ref-ui-tool-context-image.md';
import StoSettingToolProductTeamName from './shared/_sto-ref-ui-tool-project-team.md';
import StoSettingToolPort from './shared/_sto-ref-ui-tool-port.md';
import StoSettingTooJavaLibraries from './shared/_sto-ref-ui-tool-java-libraries.md';
import StoSettingToolJavaBinaries from './shared/_sto-ref-ui-tool-java-binaries.md';
import StoSettingToolProductToken from './shared/_sto-ref-ui-tool-prod-token.md';
import StoSettingToolProductAccessID from './shared/_sto-ref-ui-tool-prod-name.md';
import toSettingToolProductToken from './shared/_sto-ref-ui-tool-prod-token.md';
import StoSettingToolLookupType from './shared/_sto-ref-ui-tool-prod-lookup-type.md';
import StoSettingInstanceDomain from './shared/_sto-ref-ui-instance-domain.md';
import StoSettingInstanceProtocol from './shared/_sto-ref-ui-instance-protocol.md';
import StoSettingInstancePort from './shared/_sto-ref-ui-instance-port.md';
import StoSettingInstancePath from './shared/_sto-ref-ui-instance-path.md';
import StoSettingLogLevel from './shared/_sto-ref-ui-log-level.md';
import StoSettingFailOnSeverity from './shared/_sto-ref-ui-fail-on-severity.md';
```


You can ingest [ orchestrate $PRODUCT scans and ingest scan results | ingest results from $PRODUCT ] into your pipelines. This topics describes the required and optional settings for setting up a $PRODUCT scan. 

You can set up a $PRODUCT scan in CI and SecurityTest stages. For some scanners, you can set up the scan in the UI. The following examples show the YAML fields to configure.

## Step Palette Configuration 

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
- [Ingestion (_ingestion_)](#ingestion-ingestion)
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
- [Log Level, CLI flags, and Fail on Severity](#log-level-cli-flags-and-fail-on-severity)
  - [Log Level](#log-level)
  - [Additional CLI flags](#additional-cli-flags)
  - [Fail on severity](#fail-on-severity)




<!-- ============================================================================= -->
## Step Parameters 


<a name="scan-mode"></a>
### Scan Mode
<StoSettingScanMode />
<StoSettingScanModeOrch />
<StoSettingScanModeData />
<StoSettingScanModeIngest />
[TOC &uarr;](#toc)

<a name="scan-config"></a>
### Scan Configuration
<StoSettingProductConfigName />
[TOC &uarr;](#toc)



<!-- ============================================================================= -->

## Target

<a name="target-type"></a>
### Type
<a name="scan-type"></a>
<StoSettingScanType />
<StoSettingScanTypeRepo />
<StoSettingScanTypeCont />
<StoSettingScanTypeInst />
<StoSettingScanTypeConfig />
[TOC &uarr;](#toc)

<a name="target-name"></a>
### Name 
<StoSettingProductID />
[TOC &uarr;](#toc)

<!-- ============================================================================= -->
<a name="target-variant"></a>
### Variant
<StoSettingTargetVariant  />
[TOC &uarr;](#toc)


<a name="target-workspace"></a>
### Workspace (_repository_)
<StoSettingTargetWorkspace  />
[TOC &uarr;](#toc)


<!-- ============================================================================= -->

## Ingestion (_ingestion_)

<a name="ingestion-file"></a>
### Ingestion File (_ingestion_)
<StoSettingIngestionFile  />
[TOC &uarr;](#toc)


<!-- ============================================================================= -->
## Authentication

<a name="auth-domain"></a>
### Domain (_extraction_)
<StoSettingAuthDomain />
[TOC &uarr;](#toc)


<a name="auth-enforce-ssl"></a>
### Enforce SSL
<StoSettingProductSSL />
[TOC &uarr;](#toc)


<a name="auth-access-api-version"></a>
### API Version
<StoSettingApiVersion />
[TOC &uarr;](#toc)


<a name="auth-type"></a>
### Type
<StoSettingAuthType />
[TOC &uarr;](#toc)


<a name="auth-access-id"></a>
### Access ID (_orchestration_)
<StoSettingAuthAccessID />
[TOC &uarr;](#toc)


<a name="auth-access-token"></a>
### Access Token
<StoSettingAuthAccessToken />
[TOC &uarr;](#toc)




## Container Image 

<!-- ============================================================================= -->
<a name="container-type"></a>
### Type  (_orchestration_)
<StoSettingImageType />
[TOC &uarr;](#toc)


<a name="container-domain"></a>
### Domain (_extraction_)
<StoSettingImageDomain />
[TOC &uarr;](#toc)


<a name="container-name"></a>
### Name
<StoSettingImageName />
[TOC &uarr;](#toc)


<a name="container-tag"></a>
### Tag
<StoSettingImageTag />
[TOC &uarr;](#toc)


<a name="container-access-id"></a>
### Access Id
<StoSettingImageAccessID />
[TOC &uarr;](#toc)


<a name="container-access-token"></a>
### Access Token 
<StoSettingImageAccessToken />
[TOC &uarr;](#toc)


<a name="container-access-token"></a>
### Region  
<StoSettingImageRegion />
[TOC &uarr;](#toc)

<!-- ============================================================================= -->
## Scan Tool


<a name="tool-project-name"></a>
### Project Name
<StoSettingToolProjectName />
[TOC &uarr;](#toc)

<a name="tool-project-version"></a>
### Project Version
<StoSettingToolProjectVersion />
[TOC &uarr;](#toc)


<a name="tool-include"></a>	
### Include 
<StoSettingToolInclude />
[TOC &uarr;](#toc)


<a name="tool-exclude"></a>	
### Exclude
<StoSettingToolExclude />
[TOC &uarr;](#toc)


<a name="tool-context"></a>	
### Context Name
<StoSettingToolContext />
[TOC &uarr;](#toc)

<a name="tool-context-image"></a>
### Context Name (images) 
<StoSettingToolImageName />
[TOC &uarr;](#toc)


<a name="tool-team-name"></a>
### Team Name
<StoSettingToolProductTeamName  />
[TOC &uarr;](#toc)


<a name="tool-port"></a>
### Port  
<StoSettingToolPort  />
[TOC &uarr;](#toc)


<a name="tool-java-libraries"></a>
### Java Libraries
<StoSettingTooJavaLibraries  />
[TOC &uarr;](#toc)


<a name="tool-java-binaries"></a>
### Java Binaries
<StoSettingToolJavaBinaries  />
[TOC &uarr;](#toc)


<a name="tool-product-token"></a>
### Product Token  
<StoSettingToolProductToken  />
[TOC &uarr;](#toc)


<a name="tool-product-name"></a>
### Name 
<StoSettingToolProductAccessID  />
[TOC &uarr;](#toc)


<a name="tool-project-token"></a>
### Project Token
<StoSettingToolProductToken  />
[TOC &uarr;](#toc)


<a name="tool-product-lookup-type"></a>
### Lookup Type
<StoSettingToolLookupType  />
[TOC &uarr;](#toc)


<!-- ============================================================================= -->
## Instance Settings


<a name="instance-domain"></a>
### Domain
<StoSettingInstanceDomain />
[TOC &uarr;](#toc)


<a name="instance-protocol"></a>
### Protocol
<StoSettingInstanceProtocol />
[TOC &uarr;](#toc)


<a name="instance-port"></a>
### Port
<StoSettingInstancePort />
[TOC &uarr;](#toc)


<a name="instance-path"></a>
### Path
<StoSettingInstancePath />
[TOC &uarr;](#toc)


<!-- ============================================================================= -->
## Log Level, CLI flags, and Fail on Severity 

<a name="log-level"></a>
### Log Level
<StoSettingLogLevel />
[TOC &uarr;](#toc)


<a name="cli-flags"></a>
### Additional CLI flags
<StoSettingCliFlags />
[TOC &uarr;](#toc)

<a name="fail-on-severity"></a>
###  Fail on severity
<StoSettingFailOnSeverity />
[TOC &uarr;](#toc)

























