---
title: BlackDuckHub Scanner Reference
description: All the available settings to configure individual scans.
sidebar_position: 200
---

# ALL SETTINGS

You can orchestrate Black Duck Open Hub scans and ingest scan results into your pipelines. This topics describes the required and optional settings for setting up a Black Duck Open Hub scan. 

You can set up a Black Duck Open Hub scan in CI and SecurityTest stages. For some scanners, you can set up the scan in the UI. The following examples show the YAML fields to configure.

## Setting up a scan step

<!-- ============================================================================= -->

### Using the Step Palette 

To set up a Black Duck Open Hub scan, add a Build (CI) or a SecurityTests stage to your pipeline. Then add a Black Duck Open Hub scan step to the stage and configure it as described below. 

<details>
    <summary>Step Palette</summary>

![](./static/step-palette-00.png) 

</details>

<!-- ============================================================================= 

### Security step settings 
To set up a Black Duck Open Hub scan, add a Build (CI) or a SecurityTests stage to your pipeline. Then add a Security scan step to the stage and configure it as described below. 

:::note
Add each setting to the *Settings* field in the Run step UI, or configure the pipeline YAML as shown in the following example. Refer to each section for the YAML keys to use. 
:::

<details>
    <summary>Configure a step in the UI</summary>

![](../sto-techref-category/static/security-step-settings-reference-00.png) 

</details>

<details>
    <summary>Configure a step in the pipeline YAML</summary>
            
        ```yaml

        - step:
            type: Security
            name: brakeman scan
            identifier: brakeman_scan
            spec:
            connectorRef: account.harnessImage
            privileged: true
            settings:
                policy_type: 
                scan_type: repository
                repository_project: TBD
                repository_branch: TBD
                product_name: brakeman
                product_config_name: brakeman-default
                fail_on_severity: HIGH
            imagePullPolicy: Always
            failureStrategies:
            - onFailure:
                errors:
                    - AllErrors
                action:
                    type: Ignore

        ```

</details>

<!-- ============================================================================= -->


## Scan settings

<details>
    <summary>Security step YAML keys</summary>
<table>
    <tr>
        <th> Setting </th>
        <th> CI Build stage </th>
        <th> Security Tests stage</th>
    </tr>
    <tr>
        <td><a href="#scan-mode">Scan Mode</a></td> 
        <td><code>policy_type</code></td>
        <td><code>mode</code></td>
    </tr>
    <tr>
        <td><a href="#scan-config">Scan Configuration</a></td> 
        <td><code>product_config_name</code></td>
        <td><code>config</code></td>
    </tr>
</table>
</details>

<!-- ============================================================================= -->

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

<!-- ============================================================================= -->
<a name="scan-config"></a>

### Scan Configuration

```mdx-code-block
import StoSettingProductConfigName from './shared/_sto-ref-ui-product-config-name.md';
```


<StoSettingProductConfigName />

## Target settings

<details>
    <summary>Security step YAML keys</summary>
<table>
    <tr>
        <th> Setting </th>
        <th> CI Build stage </th>
        <th> Security Tests stage</th>
    </tr>
    <tr>
        <td><a href="#target-type">Type</a></td> 
        <td><code>policy_type</code></td>
        <td><code>type</code></td>
    </tr>
     <tr>
        <td><a href="#target-name">Name</a></td> 
        <td><code>product_access_id</code></td>
        <td><code>name</code></td>
    </tr>
    <tr>
        <td><a href="#target-variant">Variant</a></td> 
        <td><code>TBD</code></td>
        <td><code>variant</code></td>
    </tr>
    <tr>
        <td><a href="#target-workspace">Workspace</a></td> 
        <td><code>TBD</code></td>
        <td><code>type</code></td>
    </tr>
</table>
</details>


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

<!-- ============================================================================= -->
<a name="target-name"></a>

### Name 

```mdx-code-block
import StoSettingProductID from './shared/_sto-ref-ui-prod-id.md';
```

<StoSettingProductID />

<!-- ============================================================================= -->
<a name="target-variant"></a>

### Variant

```mdx-code-block
import StoSettingTargetVariant from './shared/_sto-ref-ui-target-variant.md';
```

<StoSettingTargetVariant  />

<!-- ============================================================================= -->
<a name="target-workspace"></a>

### Workspace

```mdx-code-block
import StoSettingTargetWorkspace from './shared/_sto-ref-ui-target-workspace.md';
```

<StoSettingTargetWorkspace  />


## Ingestion settings

<details>
    <summary>Security step YAML keys</summary>
<table>
    <tr>
        <th> Setting </th>
        <th> CI Build stage </th>
        <th> Security Tests stage</th>
    </tr>
    <tr>
        <td><a href="#ingestion-file">File</a></td> 
        <td><code></code>TBD</td>
        <td><code>file</code></td>
    </tr>
</table>
</details>

<!-- ============================================================================= -->
<a name="ingestion-file"></a>

### File

```mdx-code-block
import StoSettingIngestionFile from './shared/_sto-ref-ui-ingestion-file.md';
```

<StoSettingIngestionFile  />


## Container Image settings

<details>
    <summary>YAML keys</summary>
<table>
    <tr>
        <th> Setting </th>
        <th> CI step key </th>
        <th> SecurityTests step key</th>
    </tr>
    <tr>
        <td><a href="#container-type"></a>Type</td> 
        <td><code>container_type</code></td>
        <td><code>type</code></td>
    </tr>
     <tr>
        <td><a href="#container-name">Name</a></td> 
        <td><code>container_project</code></td>
        <td><code>name</code></td>
    </tr>
    <tr>
        <td><a href="#container-domain">Domain</a></td> 
        <td><code>container_domain</code></td>
        <td><code>domain</code></td>
    </tr>
    <tr>
        <td><a href="#container-tag">Tag</a></td> 
        <td><code>container_tag</code></td>
        <td><code>access_id</code></td>
    </tr>
     <tr>
        <td><a href="#container-access-id">Access Id</a></td> 
        <td><code>container_access_id</code></td>
        <td><code>name</code></td>
    </tr>
    <tr>
        <td><a href="#container-access-token">Access Token</a></td> 
        <td><code>container_access_token</code></td>
        <td><code>access_token</code></td>
    </tr>
    <tr>
        <td><a href="#container-region">Region</a></td> 
        <td><code>container_region</code></td>
        <td><code>region</code></td>
    </tr>
</table>

</details>

<!-- ============================================================================= -->
<a name="container-type"></a>

### Type  

```mdx-code-block
import StoSettingImageType from './shared/_sto-ref-ui-image-type.md';
```

<StoSettingImageType />

<!-- ============================================================================= -->
<a name="container-name"></a>

### Name

```mdx-code-block
import StoSettingImageName from './shared/_sto-ref-ui-image-name.md';
```

<StoSettingImageName />

<!-- ============================================================================= -->
<a name="container-domain"></a>

### Domain


```mdx-code-block
import StoSettingImageDomain from './shared/_sto-ref-ui-image-domain.md';
```

<StoSettingImageDomain />

<!-- ============================================================================= -->
<a name="container-tag"></a>

### Tag

```mdx-code-block
import StoSettingImageTag from './shared/_sto-ref-ui-image-tag.md';
```

<StoSettingImageTag />

<!-- ============================================================================= -->
<a name="container-access-id"></a>

### Access Id

```mdx-code-block
import StoSettingImageAccessID from './shared/_sto-ref-ui-image-access-id.md';
```

<StoSettingImageAccessID />

<!-- ============================================================================= -->
<a name="container-access-token"></a>

### Access Token 

```mdx-code-block
import StoSettingImageAccessToken from './shared/_sto-ref-ui-image-access-token.md';
```

<StoSettingImageAccessToken />

<!-- ============================================================================= -->
<a name="container-access-token"></a>

### Region  

```mdx-code-block
import StoSettingImageRegion from './shared/_sto-ref-ui-image-region.md';
```

<StoSettingImageRegion />

## Authentication Settings
<details>
    <summary>Security step YAML keys</summary>
<table>
    <tr>
        <th> Setting </th>
        <th> CI Build stage </th>
        <th> Security Tests stage</th>
    </tr>
    <tr>
        <td><a href="#auth-access-id"></a>Access Id</td> 
        <td><code>product_access_id</code></td>
        <td><code>access_id</code></td>
    </tr>
     <tr>
        <td><a href="#auth-access-token">Access Token</a></td> 
        <td><code>product_access_token</code></td>
        <td><code>access_token</code></td>
    </tr>
    <tr>
        <td><a href="#auth-domain">Domain</a></td> 
        <td><code>product_domain</code></td>
        <td><code>domain</code></td>
    </tr>
    <tr>
        <td><a href="#auth-access-api-version">API Version</a></td> 
        <td><code>product_api_version</code></td>
        <td><code>version</code></td>
    </tr>
     <tr>
        <td><a href="#auth-type">Type</a></td> 
        <td><code>product_auth_type</code></td>
        <td><code>type</code></td>
    </tr>
    <tr>
        <td><a href="#auth-enforce-ssl">Enforce SSL</a></td> 
        <td><code>TBD</code></td>
        <td><code>ssl</code></td>
    </tr>
</table>
</details>

<!-- ============================================================================= -->
<a name="auth-access-id"></a>

### Access ID

```mdx-code-block
import StoSettingAuthAccessID from './shared/_sto-ref-ui-auth-access-id.md';
```

<StoSettingAuthAccessID />

<!-- ============================================================================= -->
<a name="auth-access-token"></a>

### Access Token

```mdx-code-block
import StoSettingAuthAccessToken from './shared/_sto-ref-ui-auth-access-token.md';
```


<StoSettingAuthAccessToken />

<!-- ============================================================================= -->
<a name="auth-domain"></a>

### Domain 

```mdx-code-block
import StoSettingAuthDomain from './shared/_sto-ref-ui-auth-domain.md';
```

<StoSettingAuthDomain />

<!-- ============================================================================= -->
<a name="auth-access-api-version"></a>

### API Version

```mdx-code-block
import StoSettingApiVersion from './shared/_sto-ref-ui-auth-api-version.md';
```

<StoSettingApiVersion />

<!-- ============================================================================= -->
<a name="auth-type"></a>

### Type

```mdx-code-block
import StoSettingAuthType from './shared/_sto-ref-ui-auth-type.md';
```

<StoSettingAuthType />

<!-- ============================================================================= -->
<a name="auth-enforce-ssl"></a>

### Enforce SSL

```mdx-code-block
import StoSettingProductSSL from './shared/_sto-ref-ui-auth-ssl.md';
```

<StoSettingProductSSL />

## Tool Settings

<details>
    <summary>Security step YAML keys</summary>
<table>
    <tr>
        <th> Setting </th>
        <th> CI Build stage </th>
        <th> Security Tests stage</th>
    </tr>
    <tr>
        <td><a href="#tool-include">Include</a></td> 
        <td><code>product_include</code></td>
        <td><code>include</code></td>
    </tr>
     <tr>
        <td><a href="#tool-exclude">Exclude</a></td> 
        <td><code>product_exclude</code></td>
        <td><code>exclude</code></td>
    </tr>
    <tr>
        <td><a href="#tool-context">Context</a></td> 
        <td><code>TBD</code></td>
        <td><code>context</code></td>
    </tr>
    <tr>
        <td><a href="#tool-context-image">Context (images)</a></td> 
        <td><code>product_image_name</code></td>
        <td><code>image_name</code></td>
    </tr>
     <tr>
        <td><a href="#tool-project-name">Project Name</a></td> 
        <td><code>product_project_name</code></td>
        <td><code>project_name</code></td>
    </tr>
    <tr>
        <td><a href="#tool-project-version">Project Version</a></td> 
        <td><code>product_project_version</code></td>
        <td><code>project_version</code></td>
    </tr>
    <tr>
        <td><a href="#tool-team-name">Team Name</a></td> 
        <td><code>product_team_name</code></td>
        <td><code>team_name</code></td>
    </tr>
     <tr>
        <td><a href="#tool-port">Port</a></td> 
        <td><code>TBD</code></td>
        <td><code>port</code></td>
    </tr>
    <tr>
        <td><a href="#tool-java-libraries">Java Libraries</a></td> 
        <td><code>product_java_libraries</code></td>
        <td><code>libraries</code></td>
    </tr>
    <tr>
        <td><a href="#tool-java-binaries">Java Binaries</a></td> 
        <td><code>product_java_binaries</code></td>
        <td><code>binaries</code></td>
    </tr>
     <tr>
        <td><a href="#tool-product-name">Product Token</a></td> 
        <td><code>TBD</code></td>
        <td><code>product_token</code></td>
    </tr>
    <tr>
        <td><a href="#tool-product-name">Project Name</a></td> 
        <td><code>product_access_id</code></td>
        <td><code>product_name</code></td>
    </tr>
     <tr>
        <td><a href="#tool-project-token">Project Token</a></td> 
        <td><code>TBD</code></td>
        <td><code>project_token</code></td>
    </tr>
     <tr>
        <td><a href="#tool-product-lookup">Product Lookup</a></td> 
        <td><code>product_lookup_type</code></td>
        <td><code>product-lookup</code></td>
    </tr>
</table>

</details>

<!-- ============================================================================= -->
<a name="tool-include"></a>	

### Include 

```mdx-code-block
import StoSettingToolInclude from './shared/_sto-ref-ui-tool-include.md';
```

<StoSettingToolInclude />

<!-- ============================================================================= -->
<a name="tool-exclude"></a>	

### Exclude

```mdx-code-block
import StoSettingToolExclude from './shared/_sto-ref-ui-tool-exclude.md';
```

<StoSettingToolExclude />

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

<!-- ============================================================================= -->
<a name="tool-project-name"></a>

### Project Name

```mdx-code-block
import StoSettingToolProjectName from './shared/_sto-ref-ui-tool-project-name.md';
```

<StoSettingToolProjectName />

<!-- ============================================================================= -->
<a name="tool-project-version"></a>

### Project Version

```mdx-code-block
import StoSettingToolProjectVersion from './shared/_sto-ref-ui-tool-project-version.md';
```

<a name="product-project-version"></a>
<StoSettingToolProjectVersion />

<!-- ============================================================================= -->
<a name="tool-team-name"></a>

### Team Name

```mdx-code-block
import StoSettingToolProductTeamName from './shared/_sto-ref-ui-tool-project-team.md';
```

<StoSettingToolProductTeamName  />

<!-- ============================================================================= -->
<a name="tool-port"></a>

### Port  


```mdx-code-block
import StoSettingToolPort from './shared/_sto-ref-ui-tool-port.md';
```

<StoSettingToolPort  />

<!-- ============================================================================= -->
<a name="tool-java-libraries"></a>

### Java Libraries

```mdx-code-block
import StoSettingTooJavaLibraries from './shared/_sto-ref-ui-tool-java-libraries.md';
```

<StoSettingTooJavaLibraries  />

<!-- ============================================================================= -->
<a name="tool-java-binaries"></a>

### Java Binaries


```mdx-code-block
import StoSettingToolJavaBinaries from './shared/_sto-ref-ui-tool-java-binaries.md';
```
<StoSettingToolJavaBinaries  />

<!-- ============================================================================= -->
<a name="tool-product-token"></a>

### Product Token  


```mdx-code-block
import StoSettingToolProductToken from './shared/_sto-ref-ui-tool-prod-token.md';
```

<StoSettingToolProductToken  />

<!-- ============================================================================= -->
<a name="tool-product-name"></a>

### Name 

```mdx-code-block
import StoSettingToolProductAccessID from './shared/_sto-ref-ui-tool-prod-name.md';
```
<StoSettingToolProductAccessID  />

<!-- ============================================================================= -->
<a name="tool-project-token"></a>

### Project Token

```mdx-code-block
import toSettingToolProductToken from './shared/_sto-ref-ui-tool-prod-token.md';
```

<StoSettingToolProductToken  />

<!-- ============================================================================= -->
<a name="tool-product-lookup-type"></a>

### Lookup Type

```mdx-code-block
import StoSettingToolLookupType from './shared/_sto-ref-ui-tool-prod-lookup-type.md';
```
<StoSettingToolLookupType  />

## Instance Settings

<details>
    <summary>Security step YAML keys</summary>
<table>
    <tr>
        <th> Setting </th>
        <th> CI Build stage </th>
        <th> Security Tests stage</th>
    </tr>
    <tr>
        <td><a href="#instance-domain"></a>Domain</td> 
        <td><code>instance_domain</code></td>
        <td><code>domain</code></td>
    </tr>
     <tr>
        <td><a href="#instance-protocol">Protocol</a></td> 
        <td><code>instance_protocol</code></td>
        <td><code>protocol</code></td>
    </tr>
    <tr>
        <td><a href="#instance-port">Port</a></td> 
        <td><code>instance_port</code></td>
        <td><code>port</code></td>
    </tr>
    <tr>
        <td><a href="#instance-path">Path</a></td> 
        <td><code>instance_path</code></td>
        <td><code>path</code></td>
    </tr>
</table>

</details>


<!-- ============================================================================= -->
<a name="instance-domain"></a>

### Domain

```mdx-code-block
import StoSettingInstanceDomain from './shared/_sto-ref-ui-instance-domain.md';
```
<StoSettingInstanceDomain />

<!-- ============================================================================= -->
<a name="instance-protocol"></a>

### Protocol

```mdx-code-block
import StoSettingInstanceProtocol from './shared/_sto-ref-ui-instance-protocol.md';
```

<StoSettingInstanceProtocol />

<!-- ============================================================================= -->
<a name="instance-port"></a>

### Port

```mdx-code-block
import StoSettingInstancePort from './shared/_sto-ref-ui-instance-port.md';
```

<StoSettingInstancePort />

<!-- ============================================================================= -->
<a name="instance-path"></a>

### Path

```mdx-code-block
import StoSettingInstancePath from './shared/_sto-ref-ui-instance-path.md';
```

<StoSettingInstancePath />


<!-- ============================================================================= -->

## Logging, CLI Flags, and Fail on Severity

<details>
    <summary>Security step YAML keys</summary>
<table>
    <tr>
        <th> Setting </th>
        <th> CI Build stage </th>
        <th> Security Tests stage</th>
    </tr>
    <tr>
        <td><a href="#log-level"></a>Log Level</td> 
        <td><code>TBD</code></td>
        <td><code>level</code></td>
    </tr>
    <tr>
        <td><a href="#cli-flags"></a>Additional CLI Flags</td> 
        <td><code>tool_args</code></td>
        <td><code>cli</code></td>
    </tr>
    <tr>
        <td><a href="#cli-flags"></a>Fail on Severity</td> 
        <td><code>fail_on_severity</code></td>
        <td><code>fail_on_severity</code></td>
    </tr>
</table>

</details>


<!-- ============================================================================= -->
<a name="log-level"></a>

### Log Level

```mdx-code-block
import StoSettingLogLevel from './shared/_sto-ref-ui-log-level.md';
```

<StoSettingLogLevel />


<!-- ============================================================================= -->
<a name="cli-flags"></a>

### Additional CLI flags

```mdx-code-block
import StoSettingCliFlags from './shared/_sto-ref-ui-cli-flags.md';
```

<StoSettingCliFlags />

<!-- ============================================================================= -->
<a name="fail-on-severity"></a>

### Fail on severity

```mdx-code-block
import StoSettingFailOnSeverity from './shared/_sto-ref-ui-fail-on-severity.md';
```
<StoSettingFailOnSeverity />

























