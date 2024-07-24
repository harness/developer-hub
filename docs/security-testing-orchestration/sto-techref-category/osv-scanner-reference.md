---
title: Open Source Vulnerabilities (OSV) step configuration
description: Scan code repositories with OSV
sidebar_position: 285
sidebar_label: Open Source Vulnerabilities (OSV) step configuration
---

<DocsTag   text="Code repo scanners"  backgroundColor= "#cbe2f9" textColor="#0b5cad" link="/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#code-repo-scanners"  />
<DocsTag  text="Orchestration" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/run-an-orchestrated-scan-in-sto"  />
<DocsTag  text="Ingestion" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/ingest-scan-results-into-an-sto-pipeline" />
<br/>
<br/>

You can scan your code repositories using [Open Source Vulnerabilities (OSV)](https://google.github.io/osv-scanner/) and ingest your results into Harness STO. OSV supports a [variety of languages and lockfiles](https://google.github.io/osv-scanner/supported-languages-and-lockfiles).


## Important notes for running OSV scans in STO 

<!-- Currently, this integration supports the following:

- OSV SAST supports a [variety of languages and lockfiles](https://google.github.io/osv-scanner/supported-languages-and-lockfiles).
- OSV container image scans are currently limited to Debian-based images only.
- STO supports Ingestion mode only for this integration. 

-->


### Root access requirements 

import StoRootRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/root-access-requirements-no-dind.md';

<StoRootRequirements />


### For more information

import StoMoreInfo from '/docs/security-testing-orchestration/sto-techref-category/shared/_more-information.md';

<StoMoreInfo />


## OSV step settings for STO scans

The recommended workflow is to add an OSV step to a Security or Build stage and then configure it as described below. 

### Scan

#### Scan Mode

import StoSettingScanMode from './shared/step_palette/scan/_mode.md';
import StoSettingScanModeOrch from './shared/step_palette/scan/mode/_orchestration.md';
import StoSettingScanModeIngest from './shared/step_palette/scan/mode/_ingestion.md';

<StoSettingScanMode />
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

import StoSettingProductID from './shared/step_palette/target/_name.md';

<StoSettingProductID />


#### Variant

import StoSettingTargetVariant from './shared/step_palette/target/_variant.md';

<StoSettingTargetVariant  />


### Ingestion

#### Ingestion File

import StoSettingIngestionFile from './shared/step_palette/ingest/_file.md';

<StoSettingIngestionFile  />

### Log Level

import StoSettingLogLevel from './shared/step_palette/all/_log-level.md';

<StoSettingLogLevel />


### Additional CLI flags

Use this field to run the [`osv`](https://google.github.io/osv-scanner/usage/) scanner with flags such as:

`--lockfile=/path/to/your/package-lock.json --lockfile=/path/to/another/Cargo.lock
`

With these flags, the `osv` scanner scans vulnerabilities in the two specified lockfiles. 


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


## YAML pipeline example 

If you copy and paste the following example, make sure you update the placeholders for your project, Git connector, and build infrastructure.

```yaml
pipeline:
  projectIdentifier: YOUR_HARNESS_PROJECT
  orgIdentifier: default
  tags: {}
  properties:
    ci:
      codebase:
        connectorRef: YOUR_GITHUB_CONNECTOR
        repoName: <+stage.variables.GITHUB_REPO>
        build: <+input>
  stages:
    - stage:
        name: osv_scan
        identifier: osv_scan
        type: SecurityTests
        spec:
          cloneCodebase: true
          infrastructure:
            type: KubernetesDirect
            spec:
              connectorRef: YOUR_KUBERNETES_CLUSTER_CONNECTOR_ID
              namespace: YOUR_NAMESPACE
              automountServiceAccountToken: true
              nodeSelector: {}
              os: Linux
          sharedPaths:
            - /var/run
          execution:
            steps:
              - step:
                  type: OsvScanner
                  name: OsvScanner_1
                  identifier: OsvScanner_1
                  spec:
                    mode: orchestration
                    config: default
                    target:
                      type: repository
                      detection: manual
                      name: <+stage.variables.GITHUB_REPO>
                      variant: <+stage.variables.GITHUB_BRANCH>
                    advanced:
                      log:
                        level: info
                      fail_on_severity: medium
          slsa_provenance:
            enabled: false
          caching:
            enabled: false
            paths: []
        variables:
          - name: GITHUB_REPO
            type: String
            description: ""
            required: false
            value: <+input>
          - name: GITHUB_BRANCH
            type: String
            description: ""
            required: false
            value: <+input>
        when:
          pipelineStatus: Success
        description: ""
  identifier: osvnodegoat
  name: osv-nodegoat


```