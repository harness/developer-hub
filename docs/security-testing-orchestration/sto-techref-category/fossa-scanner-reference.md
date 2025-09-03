---
title: Fossa step configuration
description: Scan code repositories with Fossa.
sidebar_label: Fossa step configuration
sidebar_position: 190
---

<DocsTag  text="Code repo scanners"  backgroundColor= "#cbe2f9" textColor="#0b5cad" link="/docs/security-testing-orchestration/whats-supported/scanners?view-by=target-type#code-repo-scanners"  />
<DocsTag  text="Ingestion" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/ingest-scan-results-into-an-sto-pipeline" /><br/>
<br/>

You can ingest scan results from [Fossa](https://www.fossa.com). For a description of the high-level workflow, go to [Run an ingestion scan in an STO Pipeline](/docs/security-testing-orchestration/get-started/key-concepts/ingest-scan-results-into-an-sto-pipeline).


import StoMoreInfo from '/docs/security-testing-orchestration/sto-techref-category/shared/more-information.md';


<StoMoreInfo />

## Fossa step settings for STO scans

The recommended workflow is to add a Fossa step to a Security Tests or CI Build stage and then configure it as described below. 


### Scan


<a name="scan-mode"></a>

#### Scan Mode


import StoSettingScanMode from './shared/step-palette/scan/type.md';

import StoSettingScanModeIngest from './shared/step-palette/scan/mode/ingestion.md';



<!-- StoSettingScanMode / -->
<StoSettingScanModeIngest />

#### Scan Configuration


import StoSettingProductConfigName from './shared/step-palette/scan/config-name.md';


<StoSettingProductConfigName />


### Target

<a name="target-type"></a>

#### Type

import StoSettingScanType from './shared/step-palette/scan/type.md';
import StoSettingScanTypeRepo     from './shared/step-palette/target/type/repo.md';
import StoSettingScanTypeCont from './shared/step-palette/target/type/image.md';

<StoSettingScanType />
<StoSettingScanTypeRepo />
<!-- StoSettingScanTypeCont / -->

#### Target and Variant Detection 

import StoSettingScanTypeAutodetectRepo from './shared/step-palette/target/auto-detect/code-repo.md';
import StoSettingScanTypeAutodetectNote from './shared/step-palette/target/auto-detect/note.md';

<StoSettingScanTypeAutodetectRepo/>
<StoSettingScanTypeAutodetectNote/>


#### Name 

import StoSettingTargetName from './shared/step-palette/target/name.md';

<StoSettingTargetName />


#### Variant

import StoSettingTargetVariant from './shared/step-palette/target/variant.md';

<StoSettingTargetVariant  />


#### Workspace (_repository_)

import StoSettingTargetWorkspace from './shared/step-palette/target/workspace.md';

<StoSettingTargetWorkspace  />


### Ingestion File

The Fossa JSON results file to ingest. 


### Log Level


import StoSettingLogLevel from './shared/step-palette/all/log-level.md';



<StoSettingLogLevel />



### Fail on Severity


import StoSettingFailOnSeverity from './shared/step-palette/all/fail-on-severity.md';


<StoSettingFailOnSeverity />




### Additional Configuration

import ScannerRefAdditionalConfigs from './shared/additional-config.md';

<ScannerRefAdditionalConfigs />


### Advanced settings

import ScannerRefAdvancedSettings from './shared/advanced-settings.md';

<ScannerRefAdvancedSettings />

## Proxy settings

import ProxySettings from './shared/proxy-settings.md';

<ProxySettings />

## YAML pipeline example

This pipeline pulls a Fossa JSON data file from a GitHub repo and then ingests it. 

![](./static/fossa-scan-pipeline.png)


```yaml
pipeline:
  name: smp-fossa
  identifier: fossastp
  projectIdentifier: STO
  orgIdentifier: default
  tags: {}
  stages:
    - stage:
        name: fossa-test
        identifier: fossatest
        type: SecurityTests
        spec:
          cloneCodebase: false
          execution:
            steps:
              - step:
                  type: Run
                  name: Pull File
                  identifier: Pull_File
                  spec:
                    connectorRef: CONTAINER_IMAGE_REGISTRY_CONNECTOR
                    image: alpine/curl
                    shell: Sh
                    command: |-
                      curl https://github.com/myorg/fossa-scans/latest.json > /harness/latest.json
                      cat /harness/latest.json
              - step:
                  type: Fossa
                  name: Fossa_1
                  identifier: Fossa_1
                  spec:
                    imagePullPolicy: Always
                    mode: ingestion
                    config: default
                    target:
                      type: repository
                      name: test
                      variant: test
                    ingestion:
                      file: /harness/latest.json
          infrastructure:
            type: KubernetesDirect
            spec:
              connectorRef: K8S_DELEGATE_CONNECTOR
              namespace: harness-delegate-ng
              automountServiceAccountToken: true
              nodeSelector: {}
              os: Linux

```
