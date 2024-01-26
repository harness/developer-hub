---
title: STO scanner template UI reference
description: All available UI settings for scanner templates.
sidebar_label: Scanner template UI reference
sidebar_position: 600
---


Some Security steps include a scanner template UI for setting up a scan. This topic describes the settings available in the UI. 

<!-- ============================================================================= -->






<!-- ============================================================================= -->

## Configuring an STO scanner template 
To set up a scan using the scanner template, add a SecurityTests or a CI Build stage to your pipeline. Then add a step for the scanner of interest and configure the step using the available options.

<details>
<summary>Scanner Template example</summary>

![](static/step-palette-00.png)

</details>


## Scan settings

<!-- ============================================================================= -->


### Scan Mode


import StoSettingScanMode from './shared/step_palette/scan/_type.md';

import StoSettingScanModeOrch from './shared/step_palette/scan/mode/_orchestration.md';
import StoSettingScanModeData from './shared/step_palette/scan/mode/_extraction.md';
import StoSettingScanModeIngest from './shared/step_palette/scan/mode/_ingestion.md';



<!-- StoSettingScanMode / -->
<StoSettingScanModeOrch />
<StoSettingScanModeData />
<StoSettingScanModeIngest />

<!-- ---------------------------------------------------------------------------- -->

<a name="scan-config"></a>

### Scan Configuration


import StoSettingProductConfigName from './shared/step_palette/scan/_config-name.md';


<StoSettingProductConfigName />

## Target Settings

<!-- ============================================================================= -->


<!-- ---------------------------------------------------------------------------- -->

<a name="target-type"></a>

### Type


import StoSettingScanType from './shared/step_palette/scan/_type.md';


import StoSettingScanTypeRepo     from './shared/step_palette/target/type/_repo.md';
import StoSettingScanTypeCont from './shared/step_palette/target/type/_image.md';
import StoSettingScanTypeInst     from './shared/step_palette/target/type/_app.md';
import StoSettingScanTypeConfig  from './shared/step_palette/target/type/_config.md';

<a name="scan-type"></a>
<StoSettingScanType />
<StoSettingScanTypeRepo />
<StoSettingScanTypeCont />
<StoSettingScanTypeInst />
<StoSettingScanTypeConfig />

<!-- ---------------------------------------------------------------------------- -->

<a name="target-name"></a>

### Name 

import StoSettingTargetName from './shared/step_palette/target/_name.md';


<StoSettingTargetName />


<!-- ---------------------------------------------------------------------------- -->

<a name="target-variant"></a>

### Variant


import StoSettingTargetVariant from './shared/step_palette/target/_variant.md';



<StoSettingTargetVariant  />


<!-- ---------------------------------------------------------------------------- -->

<a name="target-workspace"></a>

### Workspace (_repository_)


import StoSettingTargetWorkspace from './shared/step_palette/target/_variant.md';



<StoSettingTargetWorkspace  />

<!-- ============================================================================= -->

## Ingestion Settings

<!-- ============================================================================= -->

<!-- ---------------------------------------------------------------------------- -->
<a name="ingestion-file"></a>

### Ingestion File (_ingestion_)


import StoSettingIngestionFile from './shared/step_palette/ingest/_file.md';



<StoSettingIngestionFile  />

<!-- ============================================================================= -->


## Authentication Settings

<!-- ============================================================================= -->


<!-- ---------------------------------------------------------------------------- -->
<a name="auth-domain"></a>

### Domain (_extraction_)



import StoSettingAuthDomain from './shared/step_palette/auth/_domain.md';



<StoSettingAuthDomain />


<!-- ---------------------------------------------------------------------------- -->
<a name="auth-enforce-ssl"></a>

### Enforce SSL


import StoSettingProductSSL from './shared/step_palette/auth/_ssl.md';



<StoSettingProductSSL />


<!-- ---------------------------------------------------------------------------- -->
<a name="auth-access-api-version"></a>

### API Version


import StoSettingApiVersion from './shared/step_palette/auth/_api-version.md';



<StoSettingApiVersion />

<!-- ---------------------------------------------------------------------------- -->

<a name="auth-type"></a>

### Type


import StoSettingAuthType from './shared/step_palette/auth/_type.md';



<StoSettingAuthType />


<!-- ---------------------------------------------------------------------------- -->

<a name="auth-access-id"></a>

### Access ID (_orchestration_)


import StoSettingAuthAccessID from './shared/step_palette/auth/_access-id.md';



<StoSettingAuthAccessID />



<!-- ---------------------------------------------------------------------------- -->

<a name="auth-access-token"></a>

### Access Token


import StoSettingAuthAccessToken from './shared/step_palette/auth/_access-token.md';




<StoSettingAuthAccessToken />

<!-- ============================================================================= -->

Container Image settings


<!-- ============================================================================= -->
<a name="container-type"></a>

### Type  (_orchestration_)


import StoSettingImageType from './shared/step_palette/image/_type.md';



<StoSettingImageType />

<!-- ============================================================================= -->


<a name="container-domain"></a>

### Domain (_extraction_)



import StoSettingImageDomain from './shared/step_palette/image/_domain.md';



<StoSettingImageDomain />

<!-- ============================================================================= -->
<a name="container-name"></a>

### Name


import StoSettingImageName from './shared/step_palette/image/_name.md';



<StoSettingImageName />

<!-- ============================================================================= -->


<a name="container-tag"></a>

### Tag


import StoSettingImageTag from './shared/step_palette/image/_tag.md';



<StoSettingImageTag />

<!-- ============================================================================= -->
<a name="container-access-id"></a>

### Access Id


import StoSettingImageAccessID from './shared/step_palette/image/_access-id.md';



<StoSettingImageAccessID />

<!-- ============================================================================= -->
<a name="container-access-token"></a>

### Access Token 


import StoSettingImageAccessToken from './shared/step_palette/image/_access-token.md';



<StoSettingImageAccessToken />

<!-- ============================================================================= -->
<a name="container-access-token"></a>

### Region  


import StoSettingImageRegion from './shared/step_palette/image/_region.md';



<StoSettingImageRegion />


<!-- ============================================================================= -->

## Scan Tool Settings

<!-- ============================================================================= -->
<a name="tool-project-name"></a>

### Project Name


import StoSettingToolProjectName from './shared/step_palette/tool/project/_name.md';



<StoSettingToolProjectName />

<!-- ============================================================================= -->
<a name="tool-project-version"></a>

### Project Version


import StoSettingToolProjectVersion from './shared/step_palette/tool/project/_version.md';



<a name="product-project-version"></a>
<StoSettingToolProjectVersion />


<!-- ============================================================================= -->
<a name="tool-include"></a>	

### Include 


import StoSettingToolInclude from './shared/step_palette/tool/_include.md';



<StoSettingToolInclude />

<!-- ============================================================================= -->
<a name="tool-exclude"></a>	

### Exclude


import StoSettingToolExclude from './shared/step_palette/tool/_exclude.md';



<StoSettingToolExclude />

<!-- ============================================================================= -->
<a name="tool-context"></a>	

### Context Name


import StoSettingToolContext from './shared/step_palette/tool/_context.md';



<StoSettingToolContext />

<!-- ============================================================================= -->
<a name="tool-context-image"></a>

### Context Name (images) 


import StoSettingToolImageName from './shared/step_palette/tool/_context-image.md';



<StoSettingToolImageName />


<!-- ============================================================================= -->
<a name="tool-team-name"></a>

### Team Name


import StoSettingToolProductTeamName from './shared/step_palette/tool/project/_team.md';



<StoSettingToolProductTeamName  />

<!-- ============================================================================= -->
<a name="tool-port"></a>

### Port  



import StoSettingToolPort from './shared/step_palette/tool/_port.md';



<StoSettingToolPort  />

<!-- ============================================================================= -->
<a name="tool-java-libraries"></a>

### Java Libraries


import StoSettingTooJavaLibraries from './shared/step_palette/tool/java/_libraries.md';



<StoSettingTooJavaLibraries  />

<!-- ============================================================================= -->
<a name="tool-java-binaries"></a>

### Java Binaries



import StoSettingToolJavaBinaries from './shared/step_palette/tool/java/_binaries.md';


<StoSettingToolJavaBinaries  />

<!-- ============================================================================= -->
<a name="tool-product-token"></a>

### Product Token  



import StoSettingToolProductToken from './shared/step_palette/tool/product/_token.md';



<StoSettingToolProductToken  />

<!-- ============================================================================= -->
<a name="tool-product-name"></a>

### Name 


import StoSettingToolProductAccessID from './shared/step_palette/tool/product/_name.md';


<StoSettingToolProductAccessID  />

<!-- ============================================================================= -->
<a name="tool-project-token"></a>

### Project Token


import toSettingToolProductToken from './shared/step_palette/tool/product/_token.md';



<StoSettingToolProductToken  />

<!-- ============================================================================= -->
<a name="tool-product-lookup-type"></a>

### Lookup Type


import StoSettingToolLookupType from './shared/step_palette/tool/product/_lookup-type.md';


<StoSettingToolLookupType  />

## Instance settings


<!-- ============================================================================= -->
<a name="instance-domain"></a>

### Domain


import StoSettingInstanceDomain from './shared/step_palette/instance/_domain.md';


<StoSettingInstanceDomain />

<!-- ============================================================================= -->
<a name="instance-protocol"></a>

### Protocol


import StoSettingInstanceProtocol from './shared/step_palette/instance/_protocol.md';



<StoSettingInstanceProtocol />

<!-- ============================================================================= -->
<a name="instance-port"></a>

### Port


import StoSettingInstancePort from './shared/step_palette/instance/_port.md';



<StoSettingInstancePort />

<!-- ============================================================================= -->
<a name="instance-path"></a>

### Path


import StoSettingInstancePath from './shared/step_palette/instance/_path.md';



<StoSettingInstancePath />

## Log Level, CLI flags, and Fail on Severity


<a name="log-level"></a>

### Log Level


import StoSettingLogLevel from './shared/step_palette/all/_log-level.md';



<StoSettingLogLevel />


<!-- ============================================================================= -->
<a name="cli-flags"></a>

### Additional CLI flags


import StoSettingCliFlags from './shared/step_palette/all/_cli-flags.md';



<StoSettingCliFlags />

<!-- ============================================================================= -->
<a name="fail-on-severity"></a>

### Fail on Severity



import StoSettingFailOnSeverity from './shared/step_palette/all/_fail-on-severity.md';


<StoSettingFailOnSeverity />

