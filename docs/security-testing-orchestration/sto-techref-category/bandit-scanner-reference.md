---
title: Bandit step configuration
description: Scan code repositories with with Bandit.
sidebar_label: Bandit step configuration
sidebar_position: 60
helpdocs_topic_id: n3dcx6wzb3
helpdocs_category_id: m01pu2ubai
helpdocs_is_private: false
helpdocs_is_published: true
---

<DocsTag   text="Code repo scanners" backgroundColor= "#cbe2f9" textColor="#0b5cad"  link="/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#code-repo-scanners"  />
<DocsTag  text="Orchestration" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/run-an-orchestrated-scan-in-sto"  />
<DocsTag  text="Ingestion" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/ingest-scan-results-into-an-sto-pipeline" />
<br/>
<br/>

You can scan your code repositories using [Bandit](https://github.com/PyCQA/bandit) and ingest your results into Harness STO.


## Important notes for running Bandit scans in STO

### Root access requirements 

import StoRootRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/root-access-requirements-no-dind.md';

<StoRootRequirements />


### For more information


import StoMoreInfo from '/docs/security-testing-orchestration/sto-techref-category/shared/_more-information.md';


<StoMoreInfo />

## Bandit step settings for STO scans

The recommended workflow is to add a Bandit step to a Security or Build stage and then configure it as described below.

### Scan

#### Scan Mode

import StoSettingScanModeOrch from './shared/step_palette/scan/mode/_orchestration.md';
import StoSettingScanModeIngest from './shared/step_palette/scan/mode/_ingestion.md';

<StoSettingScanModeOrch />
<StoSettingScanModeIngest />


#### Scan Configuration

import StoSettingProductConfigName from './shared/step_palette/scan/_config-name.md';

<StoSettingProductConfigName />


### Target

#### Type

import StoSettingScanTypeRepo from './shared/step_palette/target/type/_repo.md';

<StoSettingScanTypeRepo />


#### Target and Variant Detection 

import StoSettingScanTypeAutodetectRepo from './shared/step_palette/target/auto-detect/_code-repo.md';
import StoSettingScanTypeAutodetectNote from './shared/step_palette/target/auto-detect/_note.md';

<StoSettingScanTypeAutodetectRepo/>
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


### Log Level

import StoSettingLogLevel from './shared/step_palette/all/_log-level.md';

<StoSettingLogLevel />


### Additional CLI flags

You can use this field to run the [`bandit` command](https://bandit.readthedocs.io/en/latest/config.html#bandit-settings) with specific command-line flags. For example, you can skip certain tests using  `-skip` followed by a list of test IDs: `-skip testID_1, testID_3, testID_5`.

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

## Proxy settings

import ProxySettings from './shared/proxy-settings.md';

<ProxySettings />

## YAML pipeline example

If you copy this example, replace the placeholder values with appropriate values for your project, organization, and connectors.

```yaml
pipeline:
  name: your-first-pipeline-v2
  identifier: yourfirstpipelinev2
  projectIdentifier: YOUR_HARNESS_PROJECT_ID
  orgIdentifier: YOUR_HARNESS_ORGANIZATION_ID
  tags: {}
  stages:
    - stage:
        name: bandit_repo_scan
        identifier: bandit_repo_scan
        description: ""
        type: SecurityTests
        spec:
          cloneCodebase: true
          platform:
            os: Linux
            arch: Amd64
          runtime:
            type: Cloud
            spec: {}
          execution:
            steps:
              - step:
                  type: Bandit
                  name: bandit_repo_scan
                  identifier: bandit_repo_scan
                  spec:
                    mode: orchestration
                    config: default
                    target:
                      name: <+input>
                      type: repository
                      variant: <+input>
                    advanced:
                      log:
                        level: info
                      fail_on_severity: critical
  properties:
    ci:
      codebase:
        connectorRef: YOUR_CODEBASE_CONNECTOR_ID
        repoName: <+input>
        build: <+input>
```


