---
title: Snyk step configuration
description: Scan code repositories and container images with Snyk.
sidebar_label: Snyk step configuration
sidebar_position: 10
redirect_from:
  - /docs/security-testing-orchestration/sto-techref-category/snyk/snyk-scans
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

 
<DocsTag  text="Code repo scanners"  backgroundColor= "#cbe2f9" textColor="#0b5cad" link="/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#code-repo-scanners"  />
<DocsTag  text="Artifact scanners" backgroundColor= "#cbe2f9" textColor="#0b5cad" link="/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#artifact-scanners"  />
<DocsTag  text="Orchestration" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/run-an-orchestrated-scan-in-sto"  />
<DocsTag  text="Ingestion" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/ingest-scan-results-into-an-sto-pipeline" />
<br/>
<br/>

The Snyk step in Harness STO enables you to perform Snyk [Code](./snyk-code-scanning.md), [Open Source](./snyk-open-source.md), [Container](./snyk-open-source.md), and [IaC](./snyk-iac-scanning.md) scanning in both Orchestration and Ingestion modes of STO. This document will guide you through understanding the fields, configuring them, and providing any necessary information for setting up the step.

## Important notes for running Snyk scans in STO

<!--

You can configure the Snyk step to [show the original CVSS score](#show-the-original-cvss-score-when-snyk-overrode-it) when a Snyk security policy overrode the score for an issue. 

-->

### Root access requirements 

import StoRootRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/root-access-requirements-no-dind.md';

<StoRootRequirements />


### For more information


import StoMoreInfo from '/docs/security-testing-orchestration/sto-techref-category/shared/_more-information.md';


<StoMoreInfo />


## Snyk step settings for STO

It is recommended to add a Snyk step to the **Security** or **Build** stage and configure it as described below.


### Scan


<a name="scan-mode"></a>

#### Scan Mode


import StoSettingScanMode from '../shared/step_palette/scan/_type.md';

import StoSettingScanModeOrch  from '../shared/step_palette/scan/mode/_orchestration.md';
import StoSettingScanModeIngest from '../shared/step_palette/scan/mode/_ingestion.md';


<!-- StoSettingScanMode / -->
<StoSettingScanModeOrch />
<StoSettingScanModeIngest />

#### Scan Configuration


import StoSettingProductConfigName from '../shared/step_palette/scan/_config-name.md';


<StoSettingProductConfigName />


### Target

<a name="target-type"></a>

#### Type

import StoSettingScanType from '../shared/step_palette/scan/_type.md';

import StoSettingScanTypeRepo from '../shared/step_palette/target/type/_repo.md';
import StoSettingScanTypeCont from '../shared/step_palette/target/type/_image.md';


<a name="scan-type"></a>
<StoSettingScanType />
<StoSettingScanTypeRepo />
<StoSettingScanTypeCont />

#### Target and variant detection 

import StoSettingScanTypeAutodetectRepo from '../shared/step_palette/target/auto-detect/_code-repo.md';
import StoSettingScanTypeAutodetectContainer from '../shared/step_palette/target/auto-detect/_container-image.md';
import StoSettingScanTypeAutodetectNote from '../shared/step_palette/target/auto-detect/_note.md';

<StoSettingScanTypeAutodetectRepo/>
<StoSettingScanTypeAutodetectContainer/>
<StoSettingScanTypeAutodetectNote/>


#### Name 

import StoSettingTargetName from '../shared/step_palette/target/_name.md';

<StoSettingTargetName />

<a name="target-variant"></a>

#### Variant


import StoSettingTargetVariant from '../shared/step_palette/target/_variant.md';



<StoSettingTargetVariant  />

#### Workspace (_repository_)


import StoSettingTargetWorkspace from '../shared/step_palette/target/_workspace.md';


<StoSettingTargetWorkspace  />

### Container image


#### Type

import StoSettingImageType from '../shared/step_palette/image/_type.md';

<StoSettingImageType />


#### Domain

import StoSettingImageDomain from '../shared/step_palette/image/_domain.md';

<StoSettingImageDomain />


#### Name

import StoSettingImageName from '../shared/step_palette/image/_name.md';

<StoSettingImageName />


#### Tag

import StoSettingImageTag from '../shared/step_palette/image/_tag.md';

<StoSettingImageTag />


### Authentication


#### Access Token (_Orchestration scans_)

import StoSettingAuthAccessToken from '../shared/step_palette/auth/_access-token.md';

<StoSettingAuthAccessToken />


### Ingestion File

import StoSettingIngestionFile from '../shared/step_palette/ingest/_file.md';

<StoSettingIngestionFile  />

### Log Level

import StoSettingLogLevel from '../shared/step_palette/all/_log-level.md';

<StoSettingLogLevel />


### Additional CLI flags

<!-- https://harness.atlassian.net/browse/STO-6983 -->
<!-- https://harness.atlassian.net/browse/STO-7003 -->

Use this field to run the [Snyk scanner](https://docs.snyk.io/snyk-cli/cli-commands-and-options-summary) with additional flags such as:

`--all-projects --detection-depth=3`

With these flags, the Snyk step scans recursively down the repository tree to a depth of 3 folders. 

:::caution

- Passing CLI flags is an advanced feature. Some flags might not work in the context of STO. You should test your flags and arguments thoroughly before you use them in your production environment.  

- STO does not support [context-specific arguments](https://docs.snyk.io/snyk-cli/cli-commands-and-options-summary#less-than-context-specific_options-greater-than) or arguments that appear at the end of the command line, such as Maven or Gradle arguments.

:::


### Fail on Severity

import StoSettingFailOnSeverity from '../shared/step_palette/all/_fail-on-severity.md';

<StoSettingFailOnSeverity />

### Settings

import StoSettingSettings from '../shared/step_palette/all/_settings.md';

<StoSettingSettings />


### Show original issue severities overridden by Snyk security policies 

You can configure a Snyk step to show the original score when a [Snyk Enterprise security policy](https://docs.snyk.io/enterprise-configuration/policies/security-policies) overrode the severity for an issue coming from the `snyk` CLI. You can see this information in **Issue Details**.   

<DocImage path={require('../static/sto-7041-override-in-security-tests.png')} width="50%" height="50%" title="Snyk security override in Security Tests" />

<DocImage path={require('../static/sto-6927-override-popup-for-snyk.png')} width="50%" height="50%" title="Override for Snyk issue in Issue Details table" />

This feature is supported for `snyk container` and `snyk test` JSON output that properly reflects an override.
  
To enable this behavior, add the setting `ingest_tool_severity` and set it to `true` in the Snyk ingestion step. With this setting enabled, the Snyk step processes the relevant data for issues with overridden severities. 

  <Tabs>
     <TabItem value="Visual" label="Visual" default>

     <DocImage path={require('../static/sto-7041-add-setting-in-visual-editor.png')} width="40%" height="40%" title="Add ingest_tool_severity to Snyk ste" />

    </TabItem>
  
    <TabItem value="YAML" label="YAML">
      ``` yaml
      - step:
          type: Snyk
          spec:
            settings:
              ingest_tool_severity: "true"
      ```

    </TabItem>
    </Tabs>


### Additional Configuration

import ScannerRefAdditionalConfigs from '../shared/_additional-config.md';

<ScannerRefAdditionalConfigs />


### Advanced settings

import ScannerRefAdvancedSettings from '../shared/_advanced-settings.md';

<ScannerRefAdvancedSettings />


## Proxy settings

import ProxySettings from '../shared/proxy-settings.md';

<ProxySettings />