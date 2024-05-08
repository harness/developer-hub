---
title: Snyk scanner reference for STO
description: Scan code repositories and container images with Snyk.
sidebar_label: Snyk scanner reference
sidebar_position: 10
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


Harness STO supports the following scan modes for the following Snyk products:
- Snyk Open Source
  - [Snyk Open Source — orchestration mode](./snyk-scans.md#snyk-open-source-orchestration-example)
  - [Snyk Open Source — ingestion mode](./snyk-scans.md#snyk-open-source-ingestion-example)
- Snyk Code 
  - [Snyk Code — ingestion mode](snyk-scans.md#snyk-code-ingestion-example)
- Snyk Container
  - [Snyk Container — ingestion mode](./snyk-scans.md#snyk-container-ingestion-example)
- Snyk infrastructure as Code (currently in beta)
  - [Snyk infrastructure as Code — ingestion mode](./snyk-scans.md#snyk-infrastructure-as-code-ingestion-example)


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

The recommended workflow is add a Snyk step to a Security Tests or CI Build stage and then configure it as described below. You can also configure scans programmatically by copying, pasting, and editing the [YAML definition](#yaml-configuration). 


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

In the **Additional Configuration** settings, you can use the following options:

* [Privileged](/docs/continuous-integration/use-ci/manage-dependencies/background-step-settings#privileged)
* [Image Pull Policy](/docs/continuous-integration/use-ci/manage-dependencies/background-step-settings#image-pull-policy)
* [Run as User](/docs/continuous-integration/use-ci/manage-dependencies/background-step-settings#run-as-user)
* [Set Container Resources](/docs/continuous-integration/use-ci/manage-dependencies/background-step-settings#set-container-resources)


### Advanced settings

In the **Advanced** settings, you can use the following options:

* [Conditional Execution](/docs/platform/pipelines/step-skip-condition-settings)
* [Failure Strategy](/docs/platform/pipelines/failure-handling/define-a-failure-strategy-on-stages-and-steps)
* [Looping Strategy](/docs/platform/pipelines/looping-strategies/looping-strategies-matrix-repeat-and-parallelism)
* [Policy Enforcement](/docs/platform/governance/policy-as-code/harness-governance-overview)

<!-- STO-7187 remove legacy configs for scanners with step palettes

## Security step settings for Snyk scans in STO (legacy)

:::note
You can set up Snyk scans using a Security step, but this is a legacy functionality. Harness recommends that you use a [Snyk step](#snyk-step-settings-for-sto) instead.
:::

#### Target and variant


import StoLegacyTargetAndVariant  from '../shared/legacy/_sto-ref-legacy-target-and-variant.md';


<StoLegacyTargetAndVariant />

#### Snyk scan settings

* `product_name` = `snyk`:
* [`scan_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#scanner-categories) : `containerImage` or `repository`
* [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods)
	+ accepted value for `containerImage`: `ingestionOnly`
	+ accepted values for `repository`: `orchestratedScan`, `ingestionOnly`
* `product_access_token`
* `product_config_name` : `default`
* `snyk_api` :  URL to the Snyk instance, if you're using an on-prem installation.
* `fail_on_severity` - See [Fail on Severity](#fail-on-severity).

#### Container scan settings


import StoLegacyContainer from '../shared/legacy/_sto-ref-legacy-container.md';


<StoLegacyContainer />

#### Ingestion file


import StoLegacyIngest from '../shared/legacy/_sto-ref-legacy-ingest.md';


<StoLegacyIngest />

-->
