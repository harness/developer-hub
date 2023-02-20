# ALL SETTINGS V2

You can ingest [ orchestrate $PRODUCT scans and ingest scan results | ingest results from $PRODUCT ] into your pipelines. This topics describes the required and optional settings for setting up a $PRODUCT scan. 

You can set up a $PRODUCT scan in CI and SecurityTest stages. For some scanners, you can set up the scan in the UI. The following examples show the YAML fields to configure.

<table>
    <tr>
        <th> Setting </th>
        <th> CI step key </th>
        <th> SecurityTests step key</th>
    </tr>
    <tr>
        <td><a href="#scan-mode">Scan Mode</a></td> 
        <td><code>policy_type</code></td>
        <td><code>mode</code></td>
    </tr>
    <tr>
        <td><a href="#scan-configuration">Scan Configuration</a></td> 
        <td><code>product_config_name</code></td>
        <td><code>config</code></td>
    </tr>
    <tr>
        <td><a href="#type">Type</a></td> 
        <td><code>scan_type</code></td>
        <td><code>type</code></td>
    </tr>
    <tr>
        <td><a href="#name">Name</a></td> 
        <td><code>product_access_id</code></td>
        <td><code>name</code></td>
    </tr>
    <tr>
        <td><a href="#variant">Variant</a></td> 
        <td><code>TBD</code></td>
        <td><code>variant</code></td>
    </tr>
    <tr>
        <td><a href="#workspace">Workspace</a></td> 
        <td><code>TBD</code></td>
        <td><code>workspace</code></td>
    </tr>
    <tr>
        <td><a href="#file">File</a></td> 
        <td><code>TBD</code></td>
        <td><code>file</code></td>
    </tr>
    <tr>
        <td><a href="#file">Type</a></td> 
        <td><code>TBD</code></td>
        <td><code>type</code></td>
    </tr>
    <tr>
        <td><a href="#file">File</a></td> 
        <td><code>TBD</code></td>
        <td><code>file</code></td>
    </tr>
    <tr>
        <td><a href="#file">File</a></td> 
        <td><code>TBD</code></td>
        <td><code>file</code></td>
    </tr>
    <tr>
        <td><a href="#file">File</a></td> 
        <td><code>TBD</code></td>
        <td><code>file</code></td>
    </tr>
    <tr>
        <td><a href="#file">File</a></td> 
        <td><code>TBD</code></td>
        <td><code>file</code></td>
    </tr>
</table>

### Scan Mode

```mdx-code-block
import StoSettingScanMode from './shared/_sto-ref-ui-scan-mode.md';
import StoSettingScanModeOrch from './shared/_sto-ref-ui-scan-mode-00-orchestrated.md';
import StoSettingScanModeData from './shared/_sto-ref-ui-scan-mode-01-dataload.md';
import StoSettingScanModeIngest from './shared/_sto-ref-ui-scan-mode-02-ingestonly.md';
```
<a name="scan-mode"></a>
<StoSettingScanMode />
<StoSettingScanModeOrch />
<StoSettingScanModeData />
<StoSettingScanModeIngest />


### Scan Configuration

```mdx-code-block
import StoSettingProductConfigName from './shared/_sto-ref-ui-product-config-name.md';
```

<StoSettingProductConfigName />

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

### Name 

```mdx-code-block
import StoSettingProductID from './shared/_sto-ref-ui-prod-id.md';
```

<a name="product-access-id"></a>
<StoSettingProductID />


### Variant

```mdx-code-block
import StoSettingTargetVariant from './shared/_sto-ref-ui-target-variant.md';
```

<StoSettingTargetVariant  />


### Workspace

```mdx-code-block
import StoSettingTargetWorkspace from './shared/_sto-ref-ui-target-workspace.md';
```

<StoSettingTargetWorkspace  />



## Ingestion settings


### File

```mdx-code-block
import StoSettingIngestionFile from './shared/_sto-ref-ui-ingestion-file.md';
```

<StoSettingIngestionFile  />


## Container Image settings

### Type  

```mdx-code-block
import StoSettingImageType from './shared/_sto-ref-ui-image-type.md';
```

<StoSettingImageType />

<!-- ============================================================================= -->

### Name

```mdx-code-block
import StoSettingImageName from './shared/_sto-ref-ui-image-name.md';
```

<StoSettingImageName />

<!-- ============================================================================= -->

### Domain


```mdx-code-block
import StoSettingImageDomain from './shared/_sto-ref-ui-image-domain.md';
```

<StoSettingImageDomain />

<!-- ============================================================================= -->

### Tag

```mdx-code-block
import StoSettingImageTag from './shared/_sto-ref-ui-image-tag.md';
```

<StoSettingImageTag />

<!-- ============================================================================= -->

### Access Id

```mdx-code-block
import StoSettingImageAccessID from './shared/_sto-ref-ui-image-access-id.md';
```

<a name="container-access-id"></a>
<StoSettingImageAccessID />

<!-- ============================================================================= -->

### Access Token 

```mdx-code-block
import StoSettingImageAccessToken from './shared/_sto-ref-ui-image-access-token.md';
```

<a name="container-access-token"></a>
<StoSettingImageAccessToken />

<!-- ============================================================================= -->

### Region  

```mdx-code-block
import StoSettingImageRegion from './shared/_sto-ref-ui-image-region.md';
```

<StoSettingImageRegion />

## Authentication Settings

<!-- ============================================================================= -->

### Access ID


```mdx-code-block
import StoSettingAuthAccessID from './shared/_sto-ref-ui-auth-access-id.md';
```

<StoSettingAuthAccessID />

** --------------------------------------------------------------------------------------- **

### Access Token (`securityStepAuthAccessToken`) 

[`product_access_token`](#product-access-token)

```mdx-code-block
import StoSettingAuthAccessToken from './shared/_sto-ref-ui-auth-access-token.md';
```

<a name="product-access-token"></a>
<StoSettingAuthAccessToken />

** --------------------------------------------------------------------------------------- **

### Domain (`securityStepAuthDomain`) 

[`product_domain`](#product-domain)

```mdx-code-block
import StoSettingAuthDomain from './shared/_sto-ref-ui-auth-domain.md';
```

<a name="product-domain"></a>
<StoSettingAuthDomain />

** --------------------------------------------------------------------------------------- **

### API Version (`securityStepAuthVersion`) 

[`product_api_version`](#product-api-version)

```mdx-code-block
import StoSettingApiVersion from './shared/_sto-ref-ui-auth-api-version.md';
```

<a name="product-domain"></a>
<StoSettingApiVersion />

### Type (`securityStepAuthType`) 

[`product_auth_type`](#product-auth-type)

```mdx-code-block
import StoSettingAuthType from './shared/_sto-ref-ui-auth-type.md';
```

<a name="product-auth-type"></a>
<StoSettingAuthType />

** --------------------------------------------------------------------------------------- **

### Enforce SSL (`securityStepAuthSSL`) 

*** TBD what does this map to on [this page](https://developer.harness.io/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference)? **

[`product_enforce_ssl_TBD`](#product-enforce-ssl-TBD)

```mdx-code-block
import StoSettingProductSSL from './shared/_sto-ref-ui-auth-ssl.md';
```

<a name="pproduct-enforce-ssl-TBD"></a>
<StoSettingProductSSL />

## Tool


** --------------------------------------------------------------------------------------- **

### Include (`securityStepToolInclude`) 

[`product_include`](#product-include)

```mdx-code-block
import StoSettingToolInclude from './shared/_sto-ref-ui-tool-include.md';
```
<a name="product-include"></a>
<StoSettingToolInclude />

** --------------------------------------------------------------------------------------- **

### Exclude (`securityStepToolExclude`) 

[`product_exclude`](#product-exclude)

```mdx-code-block
import StoSettingToolExclude from './shared/_sto-ref-ui-tool-exclude.md';
```

<a name="product-exclude"></a>
<StoSettingToolExclude />

** --------------------------------------------------------------------------------------- **

### Context Name (`securityStepToolContext`) 

*** TBD what does this map to on [this page](https://developer.harness.io/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference)? **

[`product_context_TBD`](#product-context)

```mdx-code-block
import StoSettingToolContext from './shared/_sto-ref-ui-tool-context.md';
```

<a name="product-context"></a>
<StoSettingToolContext />

** --------------------------------------------------------------------------------------- **

### Context Name (`securityStepToolImageName`) 

*** TBD what does this map to on [this page](https://developer.harness.io/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference)? **

[`product_image_name_TBD`](#product-image-name)

```mdx-code-block
import StoSettingToolImageName from './shared/_sto-ref-ui-tool-context-image.md';
```

<a name="product-image-name"></a>
<StoSettingToolImageName />

** --------------------------------------------------------------------------------------- **

### Project Name (`securityStepToolProjectName`) 

[`product_project_name`](#product-project-name)

```mdx-code-block
import StoSettingToolProjectName from './shared/_sto-ref-ui-tool-project-name.md';
```

<a name="product-project-name"></a>
<StoSettingToolProjectName />

** --------------------------------------------------------------------------------------- **

### Project Version (`securityStepToolProjectVersion`) 

[`product_project_version`](#product-project-version)

```mdx-code-block
import StoSettingToolProjectVersion from './shared/_sto-ref-ui-tool-project-version.md';
```

<a name="product-project-version"></a>
<StoSettingToolProjectVersion />

** --------------------------------------------------------------------------------------- **

### Team Name (`securityStepToolTeamName`) 

[`product_team_name`](#product-team-name)

```mdx-code-block
import StoSettingToolProductTeamName from './shared/_sto-ref-ui-tool-project-team.md';
```

<a name="product-team-name"></a>
<StoSettingToolProductTeamName  />

** --------------------------------------------------------------------------------------- **

### Port (`securityStepToolPort`) 

[`product_port_TBD`](#product-port-TBD)

```mdx-code-block
import StoSettingToolPort from './shared/_sto-ref-ui-tool-port.md';
```

<a name="product-port-TBD"></a>
<StoSettingToolPort  />

** --------------------------------------------------------------------------------------- **

### Java Libraries (`securityStepToolJavaLibraries`) 

[`product_java_libraries`](#product-java-libraries)

```mdx-code-block
import StoSettingTooJavaLibraries from './shared/_sto-ref-ui-tool-java-libraries.md';
```

<a name="product-java-libraries"></a>
<StoSettingTooJavaLibraries  />

** --------------------------------------------------------------------------------------- **

### Java Binaries (`securityStepToolJavaBinaries`) 

[`product_java_binaries`](#product-java-binaries)

```mdx-code-block
import StoSettingToolJavaBinaries from './shared/_sto-ref-ui-tool-java-binaries.md';
```

<a name="product-java-binaries"></a>
<StoSettingToolJavaBinaries  />

** --------------------------------------------------------------------------------------- **

### Product Token (`securityStepToolProductToken`) 

[`product_access_token`](#product-access-token)

```mdx-code-block
import StoSettingToolProductToken from './shared/_sto-ref-ui-tool-prod-token.md';
```

<a name="product-access-token"></a>
<StoSettingToolProductToken  />

** --------------------------------------------------------------------------------------- **

### Name (`securityStepToolProductName`) 

[`product_access_id`](#product-access-id)

```mdx-code-block
import StoSettingToolProductAccessID from './shared/_sto-ref-ui-tool-prod-name.md';
```

<a name="product-access-id"></a>
<StoSettingToolProductAccessID  />

** --------------------------------------------------------------------------------------- **

### Project Token (`securityStepToolProjectToken`) 

[`product_access_token`](#product-access-token)

```mdx-code-block
import toSettingToolProductToken from './shared/_sto-ref-ui-tool-prod-token.md';
```

<a name="product-access-token"></a>
<StoSettingToolProductToken  />

** --------------------------------------------------------------------------------------- **

### Lookup Type (`toolProductLookupType`) 

[`product_lookup_type-TBD`](#product-lookup-type-TBD)

```mdx-code-block
import StoSettingToolLookupType from './shared/_sto-ref-ui-tool-prod-lookup-type.md';
```

<a name="product-lookup-type-TBD"></a>
<StoSettingToolLookupType  />

## Instance 

** --------------------------------------------------------------------------------------- **

### Domain (`securityStepInstanceDomain`)

[`instance_domain`](#instance-domain)

```mdx-code-block
import StoSettingInstanceDomain from './shared/_sto-ref-ui-instance-domain.md';
```

<a name="#instance-domain"></a>
<StoSettingInstanceDomain />

** --------------------------------------------------------------------------------------- **

### Protocol (`securityStepInstanceProtocol`)

[`instance_protocol`](#instance-protocol)

```mdx-code-block
import StoSettingInstanceProtocol from './shared/_sto-ref-ui-instance-protocol.md';
```

<a name="#instance-protocol"></a>
<StoSettingInstanceProtocol />

** --------------------------------------------------------------------------------------- **

### Port (`securityStepInstancePort`)

[`instance_port`](#instance-port)

```mdx-code-block
import StoSettingInstancePort from './shared/_sto-ref-ui-instance-port.md';
```

<a name="#instance-port"></a>
<StoSettingInstancePort />

** --------------------------------------------------------------------------------------- **

### Path (`securityStepInstancePath`)

[`instance_path`](#instance-path)

```mdx-code-block
import StoSettingInstancePath from './shared/_sto-ref-ui-instance-path.md';
```

<a name="#instance-path"></a>
<StoSettingInstancePath />

## Log 

** --------------------------------------------------------------------------------------- **

### Log Level (`securityStepLogLevel`)

[`log_level_TBD`](#log-level-TBD)

```mdx-code-block
import StoSettingLogLevel from './shared/_sto-ref-ui-log-level.md';
```

<a name="#log-level-TBD"></a>
<SStoSettingLogLevel />

## Args 

** --------------------------------------------------------------------------------------- **

### Additional CLI flags (`securityStepArgsCli`)

[`tool_args`](#tool-args)

```mdx-code-block
import StoSettingCliFlags from './shared/_sto-ref-ui-log-level.md';
```

<a name="#tool-args"></a>
<StoSettingCliFlags />

## Additional Configuration

** --------------------------------------------------------------------------------------- **

### Fail on severity (`failOnSeverity`)

[`fail_on_severity`](#fail-on-severity)

```mdx-code-block
import StoSettingFailOnSeverity from './shared/_sto-ref-ui-fail-on-severity.md';
```

<a name="#fail-on-severity"></a>
<StoSettingFailOnSeverity />

























