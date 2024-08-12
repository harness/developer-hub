---
title: CodeQL step configuration
description: Scan code repositories with CodeQL.
sidebar_label: CodeQL step configuration
sidebar_position: 120
---

<DocsTag  text="Code repo scanners"  backgroundColor= "#cbe2f9" textColor="#0b5cad" link="/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#code-repo-scanners"  />
<DocsTag  text="Ingestion" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/ingest-scan-results-into-an-sto-pipeline" /><br/>
<br/>

You can ingest scan results from [CodeQL](https://codeql.github.com/) into Harness STO. The following steps outline the basic workflow:

1. Run a CodeQL scan, either externally or as part of a Run step, and publish the results to SARIF.

2. Add the SARIF data to your pipeline. If you ran the scan outside the pipeline, do the following:

   1. In the stage where you ingest the results, go to **Overview** > **Shared Paths** and create a folder under `/shared` such as `/shared/scan_results`.

   2. Use a Run step to add your scan results to the shared folder.

2. Use a [CodeQL](#codeql-step-configuration) step to ingest the results. 

   
This topic includes an [end-to-end YAML pipeline](#yaml-pipeline-example) that illustrates this workflow. 

## Important notes for running CodeQL scans in STO

### Root access requirements 

import StoRootRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/root-access-requirements-no-dind.md';

<StoRootRequirements />

### For more information

import StoMoreInfo from '/docs/security-testing-orchestration/sto-techref-category/shared/_more-information.md';

<StoMoreInfo />


## CodeQL step settings for STO scans

The recommended workflow is to add a CodeQL step to a Security or Build stage and then configure it as described below. 

### Scan 

### Scan mode

import StoSettingScanModeIngest from './shared/step_palette/scan/mode/_ingestion.md';

<StoSettingScanModeIngest />


#### Scan configuration

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


### Ingestion file

import StoSettingIngestionFile from './shared/step_palette/ingest/_file.md';

<StoSettingIngestionFile  />


### Log Level

import StoSettingLogLevel from './shared/step_palette/all/_log-level.md';

<StoSettingLogLevel />



### Additional CLI flags

Use this field to run the [CodeQL scanner binary](https://codeql.github.com/docs/) with additional flags. 

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


<!-- yaml pipeline example ----------------------------------------------------------------------------- -->


## CodeQL pipeline example

The following pipeline illustrates a simple ingestion scan. It consists of two steps.  A Run step generates an example CodeQL data file in SARIF format. A CodeQL step then ingests the data. 

![](./static/codeql-ingestion-pipeline-example.png)

```yaml

pipeline:
  projectIdentifier: STO
  orgIdentifier: default
  tags: {}
  stages:
    - stage:
        name: ingestion
        identifier: ingestion
        type: SecurityTests
        spec:
          cloneCodebase: false
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
                  type: Run
                  name: create codeql sarif
                  identifier: create_codeql_sarif
                  spec:
                    connectorRef: CONTAINER_IMAGE_REGISTRY_CONNECTOR
                    image: alpine
                    shell: Sh
                    command: |-
                      pwd
                      echo '{
                          "$schema": "",
                          "version": "sarif-2.1.0",
                          "runs": [
                            {
                              "tool": {
                                "driver": {
                                  "name": "CodeQL",
                                  "version": "2.5.7",
                                  "semanticVersion": "2.5.7+1234567890",
                                  "informationUri": "https://github.com/github/codeql",
                                  "properties": {
                                    "analysisTarget": "myproject",
                                    "analysisTimestamp": "2023-04-03T14:00:00Z",
                                    "analysisDuration": 120000,
                                    "query": "detect-external-libs.ql",
                                    "queryUrl": "https://github.com/github/codeql/blob/master/javascript/ql/src/semmle/javascript/Security/CWE/CWE-094/ExternalLibraries.ql"
                                  }
                                }
                              },
                              "results": [
                                {
                                  "ruleId": "js/detect-external-libs",
                                  "message": {
                                    "text": "The following external libraries were found: jQuery, Lodash"
                                  },
                                  "locations": [
                                    {
                                      "physicalLocation": {
                                        "artifactLocation": {
                                          "uri": "/path/to/myproject/js/script.js"
                                        },
                                        "region": {
                                          "startLine": 10,
                                          "startColumn": 1,
                                          "endLine": 10,
                                          "endColumn": 15
                                        }
                                      }
                                    }
                                  ],
                                  "level": "warning",
                                  "properties": {
                                    "severity": "high",
                                    "confidence": "medium"
                                  }
                                }
                              ]
                            }
                          ]
                        }'> codeql.sarif
                      ls
              - step:
                  type: CodeQL
                  name: CodeQL_1
                  identifier: CodeQL_1
                  spec:
                    mode: ingestion
                    config: default
                    target:
                      name: login_microservice
                      type: repository
                      variant: my_hotfix_branch
                    advanced:
                      log:
                        level: info
                      fail_on_severity: critical
                    ingestion:
                      file: /harness/codeql.sarif
          sharedPaths:
            - /var/run
            - /shared/scan_results/
  identifier: codeql_ingestion
  name: codeql ingestion 

```

<!-- END yaml pipeline example ----------------------------------------------------------------------------- -->

