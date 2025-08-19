---
title: Zed Attack Proxy (ZAP) step configuration
description: Scan application instances with ​Zed Attack Proxy (ZAP).
sidebar_label: Zed Attack Proxy step configuration
sidebar_position: 10
helpdocs_topic_id: m9494vxwac
helpdocs_category_id: m01pu2ubai
helpdocs_is_private: false
helpdocs_is_published: true
---

<DocsTag   text="Instance scanners" backgroundColor= "#cbe2f9" textColor="#0b5cad" link="/docs/security-testing-orchestration/whats-supported/scanners?view-by=target-type#instance-scanners"/>
<DocsTag  text="Orchestration" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/run-an-orchestrated-scan-in-sto"  />
<DocsTag  text="Ingestion" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/ingest-scan-results-into-an-sto-pipeline" />
<br/>
<br/>

You can scan your application instances and ingest results from [Zed Attack Proxy (ZAP)](https://www.zaproxy.org). 

For an example workflow, go to the [DAST app scans using Zed Attack Proxy (ZAP) tutorial](/docs/security-testing-orchestration/sto-techref-category/zap/dast-scan-zap).

## Important notes for running ZAP scans in STO

- Harness STO currently supports the following ZAP features:

  - AJAX spidering with Firefox and Selenium. Other browsers such as Chrome are not currently supported.
  - [Script-based authentication](https://www.zaproxy.org/docs/desktop/start/features/authmethods/#scriptBased).
  - [Form-based authentication](https://www.zaproxy.org/docs/desktop/start/features/authmethods/#formBased).
  - [Script-based session management](https://www.zaproxy.org/docs/desktop/start/features/sessionmanagement/#sbsm) – ECMAScript / JavaScript using Nashorn engine.
    - Other languages such as Zest, Groovy, Python, etc. are not currently supported.

- ZAP is a highly configurable tool with many options. You should verify that your context file and your authentication and other scripts work as intended before adding them to your STO pipeline.

- Add the following shared paths (**Overview** > **Shared Paths**) to your scan stage and copy your ZAP scripts and files to these paths:

  - Copy hosts and urlFile files to:
     - `/shared/customer_artifacts/hosts/`
     - `/shared/customer_artifacts/urlFile/`
  - Copy context files to `/shared/customer_artifacts/context`.
    
  - You also need to specify the [Context name](#context-name) to use for the scan.
    - If you're including context, hosts, and/or urlFile files in the same pipeline, they all need to be set to the value passed for the context name. For example:
       - `/shared/customer_artifacts/context/sto.context`
       - `/shared/customer_artifacts/hosts/sto.context`
       - `/shared/customer_artifacts/urlFile/sto.context`  
   - Copy other scripts to `/shared/customer_artifacts/scripts/<script-type>/`.
     - Examples:
       - `/shared/customer_artifacts/scripts/session`
       - `/shared/customer_artifacts/scripts/authentication`
      - For other script paths, go to the [ZAP community-scripts repo](https://github.com/zaproxy/community-scripts/tree/main).


### Root access requirements 

import StoRootRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/root-access-requirements-no-dind.md';

<StoRootRequirements />

### For more information

import StoMoreInfo from '/docs/security-testing-orchestration/sto-techref-category/shared/more-information.md';

<StoMoreInfo />

## ZAP step settings for STO scans

The recommended workflow is to add a ZAP step to a Security Tests or CI Build stage and then configure it as described below. 

### Scan

<a name="scan-mode"></a>

#### Scan Mode

import StoSettingScanMode from '../shared/step-palette/scan/type.md';

import StoSettingScanModeOrch  from '../shared/step-palette/scan/mode/orchestration.md';

import StoSettingScanModeIngest from '../shared/step-palette/scan/mode/ingestion.md';


<!-- StoSettingScanMode / -->
<StoSettingScanModeOrch />
<StoSettingScanModeIngest />

#### Scan Configuration

import StoSettingProductConfigName from '../shared/step-palette/scan/config-name.md';

<StoSettingProductConfigName />

The following options are supported for Zap scans:

-  **Default** 

-  **Standard** `scanMode` = [`active`](https://www.zaproxy.org/docs/desktop/start/features/ascan/), `scanType` = [`standard`](https://www.zaproxy.org/docs/desktop/start/features/modes/)

-  **Attack**  `scanMode` = [`active`](https://www.zaproxy.org/docs/desktop/start/features/ascan/), `scanType` = [`attack`](https://www.zaproxy.org/docs/desktop/start/features/modes/)

-  **Quick**  `scanMode` = [`active`](https://www.zaproxy.org/docs/desktop/start/features/ascan/), `scanType` = [`standard`](https://www.zaproxy.org/docs/desktop/start/features/modes/),  `quickMode` = `true` 

   When Quick mode is enabled, the [Maximum depth to crawl](https://www.zaproxy.org/docs/desktop/addons/spider/options/#maximum-depth-to-crawl) is set to 1.


### Target

#### Type

import StoSettingScanTypeInst     from '../shared/step-palette/target/type/app.md';

<StoSettingScanTypeInst />


#### Target and variant detection 

import StoSettingScanTypeAutodetectApp from '../shared/step-palette/target/auto-detect/app-instance.md';

<StoSettingScanTypeAutodetectApp/>

#### Name 

import StoSettingTargetName from '../shared/step-palette/target/name.md';

<StoSettingTargetName />


#### Variant

import StoSettingTargetVariant from '../shared/step-palette/target/variant.md';

<StoSettingTargetVariant  />


#### Workspace

import StoSettingTargetWorkspace from '../shared/step-palette/target/workspace.md';

<StoSettingTargetWorkspace  />


### Instance

#### Domain

import StoSettingInstanceDomain from '../shared/step-palette/instance/domain.md';


<StoSettingInstanceDomain />

#### Protocol

import StoSettingInstanceProtocol from '../shared/step-palette/instance/protocol.md';


<StoSettingInstanceProtocol />

#### Port

import StoSettingInstancePort from '../shared/step-palette/instance/port.md';


<StoSettingInstancePort />

#### Path

import StoSettingInstancePath from '../shared/step-palette/instance/path.md';


<StoSettingInstancePath />

### Scan Tool

#### Context Name

The ZAP context file to use for the scan. You need to add the following shared path (**Overview** > **Shared Paths**) to the stage and copy your file to this path:
    - `/shared/customer_artifacts/context/`

<!-- :::note

This integration has the following known issue: The **Context Name** field in the ZAP step UI does not capture the specified context file. (STO-7287)
  - This issue will be fixed shortly.
  - As a workaround, you can specify the context file in the **Settings** field. Add a new setting with the following key-value pair: 
    - key = `product_context_name` 
    - value = `/shared/customer_artifacts/context/filename.context`

     <DocImage path={require('../static/sto-7287-zap-workaround.png')} width="50%" height="50%" title="Add setting to specify ZAP context file" />

:::

-->



#### Port

import StoScanToolPort from '../shared/step-palette/tool/port.md'

<StoScanToolPort  />

### Ingestion File

import StoSettingIngestionFile from '../shared/step-palette/ingest/file.md';


<StoSettingIngestionFile  />


### Log Level

import StoSettingLogLevel from '../shared/step-palette/all/log-level.md';


<StoSettingLogLevel />

<!--

### Additional CLI flags

NOT YET SUPPORTED https://harness.atlassian.net/browse/STO-7278?focusedCommentId=694683

Use this field to run the [`zap-cli`](https://github.com/Grunny/zap-cli) binary with additional CLI flags and arguments such as. For example, you could exclude certain URLs from the scan using a regular expression:

`quick-scan -r -e "https\:\/\/myonlineshoestore\.com\/*catalog\?category\=Accessories" `

This string uses a regular expression that specifies the URLs to exclude from a scan. 

import StoSettingCliFlagsCaution from '/docs/security-testing-orchestration/sto-techref-category/shared/step-palette/all/cli-flags-caution.md';

<StoSettingCliFlagsCaution />

-->


### Fail on Severity

import StoSettingFailOnSeverity from '../shared/step-palette/all/fail-on-severity.md';

<StoSettingFailOnSeverity />


### Settings

import StoSettingSettings from '../shared/step-palette/all/settings.md';

<StoSettingSettings />

### Additional Configuration

import ScannerRefAdditionalConfigs from '../shared/additional-config.md';

<ScannerRefAdditionalConfigs />


### Advanced settings

import ScannerRefAdvancedSettings from '../shared/advanced-settings.md';

<ScannerRefAdvancedSettings />

## Configure ZAP as a Built-in Scanner  

The ZAP scanner is available as a built-in scanner in STO. Configuring it as a built-in scanner enables the step to automatically perform scans using the free version without requiring any licenses. Follow these steps to set it up:  

1. Search for **DAST** in the step palette or navigate to the **Built-in Scanners** section and select the **DAST** step.
2. Select **Aqua Trivy** from the list of scanners.  
3. Expand the **Additional CLI Flags** section if you want to configure optional CLI flags.
4. Configure the **Domain Information** by setting the [Domain](#domain).
5. Click **Add Scanner** to save the configuration.  

The scanner will automatically use the free version, detect scan targets, and can be further configured by clicking on the step whenever needed.
