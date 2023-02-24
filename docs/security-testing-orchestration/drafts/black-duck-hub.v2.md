---
title: Black Duck Hub scanner reference
description: All the available settings to configure individual scans.
sidebar_position: 300
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
import StoSettingCliFlags from './shared/_sto-ref-ui-cli-flags.md';
import StoSettingFailOnSeverity from './shared/_sto-ref-ui-fail-on-severity.md';
```



You can orchestrate Black Duck Hub scans and ingest scan results into your Harness pipelines. This topic describes the required and optional settings for setting up a Black Duck Hub scan. 

You can set up a Black Duck Hub scan in CI and SecurityTest stages. For some scanners, you can set up the scan in the UI. The following examples show the YAML fields to configure.

## Step Palette Configuration 
To set up a Black Duck Hub scan, add a Build (CI) or a SecurityTests stage to your pipeline. Then add a Black Duck Hub scan step to the stage and configure it as described below. 


<!-- 
<details>
    <summary>Step Palette</summary>

![](./static/step-palette-00.png) 

</details>

-->

<!-- ============================================================================= -->

<details><summary>Scan settings</summary>

#### Scan Mode

<StoSettingScanMode />
<StoSettingScanModeOrch />
<StoSettingScanModeData />
<StoSettingScanModeIngest />

#### Scan Configuration
<StoSettingProductConfigName />

</details>

<details>
<summary>Target Settings</summary>

#### Type
<StoSettingScanType />
<StoSettingScanTypeRepo />
<StoSettingScanTypeCont />

#### Name 
<StoSettingProductID />

#### Variant
<StoSettingTargetVariant  />

#### Workspace 
<StoSettingTargetWorkspace  />

#### Ingestion File
<StoSettingIngestionFile  />

</details>

<!-- ============================================================================= -->

<details><summary>Authentication Settings</summary>

#### Domain 
<StoSettingAuthDomain />

#### Enforce SSL
<StoSettingProductSSL />

#### API Version
<StoSettingApiVersion />

#### Type
<StoSettingAuthType />

<!-- 
#### Access ID (_orchestration_)
<StoSettingAuthAccessID />

-->

#### Access Token
<StoSettingAuthAccessToken />

</details>

<!-- ============================================================================= -->

<details><summary>Container Image settings</summary>

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


</details>

<!-- ============================================================================= -->

<details><summary>Scan Tool Settings</summary>

#### Project Name
<StoSettingToolProjectName />

#### Project Version
<StoSettingToolProjectVersion />

</details>

<!-- ============================================================================= -->

<details><summary>Instance settings</summary>

#### Domain
<StoSettingInstanceDomain />

#### Protocol
<StoSettingInstanceProtocol />

#### Port
<StoSettingInstancePort />

#### Path
<StoSettingInstancePath />

</details>


<!-- ============================================================================= -->

<!-- ============================================================================= -->

<details><summary>Log Level, CLI flags, and Fail on Severity</summary>

#### Log Level
<StoSettingLogLevel />

#### Additional CLI flags
<StoSettingCliFlags />

#### Fail on severity
<StoSettingFailOnSeverity />

</details>

## Legacy configuration

Optionally, you can set up a Black Duck Hub scan manually in a Security step. Enter the keys and values in the **Settings** fields as shown in the following YAML example. 

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
- step:
      type: BlackDuck
      name: step
      identifier: blackduck
      spec:
        mode: orchestration
        config: default # always set, cannot override
        target: 
          type: repository # repository|image
          name: <sto_plugin>
          variant: main|develop|feature/STO-213
          workspace: /harness
        
        # For image scan only
        image:
         type: docker_v2 # local_image|docker_v2|aws_ecr|jfrog_artifactory
         domain: hub.docker.io
         access_token: abc12345
         region: us-west-1   
        
        # Authentication Options
        auth:
          access_id: admin
          access_token: password
          type: apiKey # apiKey | usernamePassword
          version: "5.0.2"
          domain: https://custom-blackduck-domain.mycompany.com
          ssl: true
        
        tool:
          project_name: <bdh-project>
          project_version: <bdh-project-version>
        
        # ONLY IF scan_type == ingestionOnly
        ingestion:
          file: /shared/customer_artifacts/issues.json
        
        # ADVANCED OPTIONS
        advanced:
          log:
            level: INFO # INFO|DEBUG|WARNING|ERROR
            serializer: SIMPLE_ONPREM # SIMPLE|BASIC|BUNYAN|SIMPLE_ONPREM|ONPREM|        
          # ADVANCED OPTIONS - YAML ONLY
          args: 
            cli: "--version -test blah"
          fail_on_severity: Critical
```

