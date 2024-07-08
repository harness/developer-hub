---
title: Mend (formerly Whitesource) step configuration
description: Scan code repositories and container images with Mend.
sidebar_label: Mend step configuration
sidebar_position: 220
---

<DocsTag  text="Code repo scanners"  backgroundColor= "#cbe2f9" textColor="#0b5cad" link="/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#code-repo-scanners"  />
<DocsTag  text="Artifact scanners" backgroundColor= "#cbe2f9" textColor="#0b5cad" link="/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#artifact-scanners"  />
<DocsTag  text="Orchestration" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/run-an-orchestrated-scan-in-sto"  />
<DocsTag  text="Extraction" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/sto-workflows-overview#extraction-scans-in-sto" />
<DocsTag  text="Ingestion" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/ingest-scan-results-into-an-sto-pipeline" />
<br/>
<br/>

You can scan your code repositories, artifacts, and application instances using [Mend](https://www.mend.io). 


## Important notes for running Mend scans in STO

<!--

### Docker-in-Docker requirements

import StoDinDRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/dind-bg-step.md';

<StoDinDRequirements />

-->

### Root access requirements

import StoRootRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/root-access-requirements.md';

<StoRootRequirements />

### For more information

import StoMoreInfo from '/docs/security-testing-orchestration/sto-techref-category/shared/_more-information.md';

<StoMoreInfo />



## Mend step settings for STO scans

The recommended workflow is to add a Mend step to a Security or Build stage and then configure it as described below. 

### Scan


<a name="scan-mode"></a>

#### Scan Mode


import StoSettingScanMode from './shared/step_palette/scan/_type.md';

import StoSettingScanModeOrch  from './shared/step_palette/scan/mode/_orchestration.md';

import StoSettingScanModeData from './shared/step_palette/scan/mode/_extraction.md';
import StoSettingScanModeIngest from './shared/step_palette/scan/mode/_ingestion.md';



<!-- StoSettingScanMode / -->
<StoSettingScanModeOrch />
<StoSettingScanModeData />
<StoSettingScanModeIngest />

#### Scan Configuration


import StoSettingProductConfigName from './shared/step_palette/scan/_config-name.md';


<StoSettingProductConfigName />


### Target


#### Type

import StoSettingScanTypeRepo     from './shared/step_palette/target/type/_repo.md';
import StoSettingScanTypeCont from './shared/step_palette/target/type/_image.md';

<!-- StoSettingScanType / -->
<StoSettingScanTypeRepo />
<StoSettingScanTypeCont />


#### Target and variant detection 

import StoSettingScanTypeAutodetectRepo from './shared/step_palette/target/auto-detect/_code-repo.md';
import StoSettingScanTypeAutodetectContainer from './shared/step_palette/target/auto-detect/_container-image.md';
import StoSettingScanTypeAutodetectNote from './shared/step_palette/target/auto-detect/_note.md';

<StoSettingScanTypeAutodetectRepo/>
<StoSettingScanTypeAutodetectContainer/>
<StoSettingScanTypeAutodetectNote/>


#### Name 

import StoSettingTargetName from './shared/step_palette/target/_name.md';

<StoSettingTargetName />

#### Variant


import StoSettingTargetVariant from './shared/step_palette/target/_variant.md';



<StoSettingTargetVariant  />

#### Workspace (_repository_)


import StoSettingTargetWorkspace from './shared/step_palette/target/_workspace.md';



<StoSettingTargetWorkspace  />



### Ingestion File


import StoSettingIngestionFile from './shared/step_palette/ingest/_file.md';



<StoSettingIngestionFile  />

### Authentication

<!-- ============================================================================= -->
<a name="auth-domain"></a>

#### Domain

The fully-qualified URL to the scanner. The default is `https://saas.whitesourcesoftware.com/api`.

<!-- ============================================================================= -->
<a name="auth-enforce-ssl"></a>

#### Enforce SSL


import StoSettingProductSSL from './shared/step_palette/auth/_ssl.md';



<StoSettingProductSSL />

<!-- ============================================================================= 
<a name="auth-access-api-version"></a>


#### API Version


import StoSettingApiVersion from './shared/step_palette/auth/_api-version.md';



<StoSettingApiVersion />



<!-- ============================================================================= 
<a name="auth-type"></a>

#### Type


import StoSettingAuthType from './shared/step_palette/auth/_type.md';



<StoSettingAuthType />

<!-- ============================================================================= -->

#### Access Id

The user key for your Mend personal account: in the Mend UI, click the **Account Settings** button in the top right.

You should create a Harness text secret with your encrypted token and reference the secret using the format `<+secrets.getValue("my-mend-user-key")>`. For more information, go to [Add and Reference Text Secrets](/docs/platform/secrets/add-use-text-secrets).


<!-- ============================================================================= -->
<a name="auth-access-token"></a>

#### Access Token

The API key for your Mend organization. 

This field is required. If you want to run a scan in an organization other than the default organization for your account, generate an Access Token in that specific organization. In the Mend UI, go to **Integration** > **Organization** > **API Key**.

You should create a Harness text secret with your encrypted token and reference the secret using the format `<+secrets.getValue("my-mend-org-api-key")>`. For more information, go to [Add and Reference Text Secrets](/docs/platform/secrets/add-use-text-secrets).

### Scan Tool

<!-- ============================================================================= -->

#### Lookup Type

You can specify the Mend product or project **By Token** or **By Name**. 

#### Product Name / Token

The name or token of the  [Mend product](https://docs.mend.io/bundle/sca_user_guide/page/understanding_organizations__products_and_projects.html#Product) that you want to scan. 

This field is required for Orchestration and Extraction scans. 

#### Project Name / Token

The name or token of the [Mend project](https://docs.mend.io/bundle/sca_user_guide/page/understanding_organizations__products_and_projects.html#Project) that you want to scan. 

This field is required for Extraction scans. 


#### Include 

If you're running an orchestration scan on a code repository, you can use this setting to specify the files to include in the scan. By default, a Mend scan includes all files in the code repository. 

This setting corresponds to the [**Includes** configuration parameter](https://docs.mend.io/bundle/unified_agent/page/unified_agent_configuration_parameters.html#General) for the Mend United Agent. 

<!-- ============================================================================= -->
<a name="tool-exclude"></a>	

#### Exclude

If you're running an orchestration scan on a code repository, you can use this setting to specify the  specific files to exclude from the scan. By default, a Mend scan includes all files in the code repository. 

This setting corresponds to the [**excludes** configuration parameter](https://docs.mend.io/bundle/unified_agent/page/unified_agent_configuration_parameters.html#General) for the Mend United Agent. 

<!-- ============================================================================= -->

<!-- 

Excluding...I don't see this field in the step palette

#### Project Version


import StoSettingToolProjectVersion from './shared/step_palette/tool/project/_version.md';



<a name="product-project-version"></a>
<StoSettingToolProjectVersion />

-->

### Log Level


import StoSettingLogLevel from './shared/step_palette/all/_log-level.md';



<StoSettingLogLevel />

### Additional CLI flags

Use this field to run the [Mend Unified Agent](https://docs.mend.io/bundle/unified_agent/page/unified_agent_configuration_parameters.html#General) with additional flags. 

<!-- 

For example, you can save logs for STO-initiated scans in a separate folder on the Mend server like this: `log.files.path /tmp/sto_scan_logs`.

TBD This sounds like a reasonable use case, based on what I saw in the Mend docs, but I haven't tried it. Might be worth testing before adding to this topic. -->

import StoSettingCliFlagsCaution from '/docs/security-testing-orchestration/sto-techref-category/shared/step_palette/all/_cli-flags-caution.md';

<StoSettingCliFlagsCaution />




### Fail on Severity


import StoSettingFailOnSeverity from './shared/step_palette/all/_fail-on-severity.md';


<StoSettingFailOnSeverity />

### Settings

import StoSettingSettings from './shared/step_palette/all/_settings.md';

<StoSettingSettings />



### Additional Configuration

import ScannerRefAdditionalConfigs from './shared/_additional-config.md';

<ScannerRefAdditionalConfigs />


### Advanced settings

import ScannerRefAdvancedSettings from './shared/_advanced-settings.md';

<ScannerRefAdvancedSettings />




## Mend orchestration pipeline example

The following pipeline shows an end-to-end orchestration workflow. The Mend step includes the settings needed to run this specific scan: [`access_token`](#access-token), [`domain`](#domain), [`access_id`](#access-id), and [`product_name`](#product-name--token).

![](static/mend-orch-pipeline-example.png)

```yaml
pipeline:
  projectIdentifier: STO
  orgIdentifier: default
  tags: {}
  properties:
    ci:
      codebase:
        connectorRef: CODEBASE_CONNECTOR
        build: <+input>
  stages:
    - stage:
        name: mend
        identifier: mend
        type: SecurityTests
        spec:
          cloneCodebase: true
          infrastructure:
            type: KubernetesDirect
            spec:
              connectorRef: K8S_DELEGATE_CONNECTOR
              namespace: harness-delegate-ng
              automountServiceAccountToken: true
              nodeSelector: {}
              os: Linux
          execution:
            steps:
              - step:
                  type: Mend
                  name: mend_orch
                  identifier: mend_orch
                  spec:
                    mode: orchestration
                    config: default
                    target:
                      name: secrets
                      type: repository
                      variant: master
                    advanced:
                      log:
                        level: debug
                    resources:
                      limits:
                        memory: 1Gi
                    imagePullPolicy: Always
                    auth:
                      access_token: <+secrets.getValue("my-mend-organization-api-key")>
                      domain: https://saas.whitesourcesoftware.com/agent
                      ssl: true
                      access_id: <+secrets.getValue("my-mend-user-key")>
                    tool:
                      product_name: secretsrepo
          caching:
            enabled: false
          sharedPaths:
            - ""
        variables:
          - name: runner_tag
            type: String
            description: ""
            required: false
            value: latest
  identifier: mend_secrets
  name: mend - secrets

```
