---
title: Scanner Setup Template 3 (TABS)
description: All the available settings to configure individual scans.
sidebar_position: 30
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

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
import StoSettingCliFlags from './shared/_sto-ref-ui-cli-flags.md';
```


# ALL SETTINGS

You can ingest [ orchestrate $PRODUCT scans and ingest scan results | ingest results from $PRODUCT ] into your pipelines. This topics describes the required and optional settings for setting up a $PRODUCT scan. 

You can set up a $PRODUCT scan in CI and SecurityTest stages. For some scanners, you can set up the scan in the UI. The following examples show the YAML fields to configure.

## Step Palette Configuration 
To set up a $PRODUCT scan, add a Build (CI) or a SecurityTests stage to your pipeline. Then add a $PRODUCT scan step to the stage and configure it as described below. 

<Tabs>
  
<TabItem value="scan" label="Scan" default>

#### Scan Mode

<StoSettingScanMode />
<StoSettingScanModeOrch />
<StoSettingScanModeData />
<StoSettingScanModeIngest />

#### Scan Configuration
<StoSettingProductConfigName />
  
</TabItem>

<TabItem value="target" label="Target" default>


#### Type
<StoSettingScanType />
<StoSettingScanTypeRepo />
<StoSettingScanTypeCont />
<StoSettingScanTypeInst />
<StoSettingScanTypeConfig />

#### Name 
<StoSettingProductID />

#### Variant
<StoSettingTargetVariant  />

#### Workspace (_repository_)
<StoSettingTargetWorkspace  />

#### Ingestion File (_ingestion_)
<StoSettingIngestionFile  />

</TabItem>

<TabItem value="auth" label="Authentication" default>

#### Domain (_extraction_)
<StoSettingAuthDomain />

#### Enforce SSL
<StoSettingProductSSL />

#### API Version
<StoSettingApiVersion />

#### Type
<StoSettingAuthType />

#### Access ID (_orchestration_)
<StoSettingAuthAccessID />

#### Access Token
<StoSettingAuthAccessToken />

</TabItem>

<TabItem value="cont" label="Image" default>

#### Type  (_orchestration_)
<StoSettingImageType />

#### Domain (_extraction_)
<StoSettingImageDomain />

#### Name
<StoSettingImageName />

#### Tag
<StoSettingImageTag />

#### Access Id
<StoSettingImageAccessID />

#### Access Token 
<StoSettingImageAccessToken />

#### Region  
<StoSettingImageRegion />

</TabItem>

<TabItem value="tool" label="Tool" default>

#### Project Name
<StoSettingToolProjectName />

#### Project Version
<StoSettingToolProjectVersion />

#### Include 
<StoSettingToolInclude />

#### Exclude
<StoSettingToolExclude />


#### Context Name
<StoSettingToolContext />


#### Context Name (images) 
<StoSettingToolImageName />

#### Team Name
<StoSettingToolProductTeamName  />

#### Port  
<StoSettingToolPort  />

#### Java Libraries
<StoSettingTooJavaLibraries  />

#### Java Binaries
<StoSettingToolJavaBinaries  />

#### Product Token  
<StoSettingToolProductToken  />

#### Name 
<StoSettingToolProductAccessID  />

#### Project Token
<StoSettingToolProductToken  />

#### Lookup Type
<StoSettingToolLookupType  />

</TabItem>

<TabItem value="inst" label="Instance" default>

#### Domain
<StoSettingInstanceDomain />

#### Protocol
<StoSettingInstanceProtocol />

#### Port
<StoSettingInstancePort />

#### Path
<StoSettingInstancePath />


</TabItem>

<TabItem value="misc" label="Misc" default>

#### Log Level
<StoSettingLogLevel />

#### Additional CLI flags
<StoSettingCliFlags />

#### Fail on severity
<StoSettingFailOnSeverity />

</TabItem>


</Tabs>

## Legacy configuration

Optionally, you can set up a $PRODUCT scan manually in a Security step. Enter the keys and values in the **Settings** fields as shown in the following YAML example. 

* `product_name` : `blackduckhub`
* `scan_type`
	+ accepted value(s): `repository`, `containerImage`
* `policy_type`
	+ accepted value(s): `orchestratedScan`, `ingestionOnly`
* When `policy_type` is set to `orchestratedScan`
	+ `product_domain`
	+ `product_auth_type`
		- accepted value(s): `usernamePassword`, `apiKey`
	+ `product_access_id`: api username
	+ `product_access_token` api password or api key
	+ `product_api_version`
	+ `product_project_name`
	+ `product_project_version`
* `product_config_name`
	+ Accepted values(s): `default`

## YAML example

The following YAML example shows a Bandit scan step. If you want to configure Bandit steps programmatically, the recommended practice is to set up one Bandit scanner using the [Step Palette](#step-palette-configuration) in the Harness UI. Then switch over to the YAML view in the Pipeline Editor, and copy and edit the YAML specification as needed.

```yaml

```