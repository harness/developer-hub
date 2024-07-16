---
title: Gitleaks step configuration
description: Scan code repositories with Gitleaks.
sidebar_label: Gitleaks step configuration
sidebar_position: 200

---
<DocsTag   text="Code repo scanners"  backgroundColor= "#cbe2f9" textColor="#0b5cad" link="/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#code-repo-scanners"  />
<DocsTag  text="Orchestration" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/run-an-orchestrated-scan-in-sto"  />
<DocsTag  text="Ingestion" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/ingest-scan-results-into-an-sto-pipeline" />
<br/>
<br/>


You can scan your code repositories using [Gitleaks](https://github.com/gitleaks) and ingest your results into Harness STO. 

<!-- 

Gitleaks can publish results in [Static Analysis Results Interchange Format (SARIF)](https://docs.github.com/en/code-security/code-scanning/integrating-with-code-scanning/sarif-support-for-code-scanning), an open data format supported by many scan tools. 

For a description of the end-to-end workflow, go to [Ingest SARIF data](/docs/security-testing-orchestration/orchestrate-and-ingest/ingestion-workflows/ingest-sarif-data).

-->

## Important notes

This section describes recommended best practices and references to useful information. 

### Update your allowlist with inactive secrets

You can specify an allowlist of secrets that are inactive, rotated, deactivated, or false positives. Gitleaks ignores these secrets during a scan. Set up your allowlist in a [.gitleaks.toml file](https://github.com/gitleaks/gitleaks/blob/master/config/gitleaks.toml) and place it at the root of your repository. 

:::note

It is best practice to update your allowlist with secrets that are inactive, rotated, deactivated, or false positives. Otherwise, Gitleaks will continue to detect these secrets in your commit history even after they have been updated in your code.

:::

The following steps outline the recommended workflow:

1. Run a Gitleaks scan and review the detected passwords, tokens, and other secrets.

2. Rotate or deactivate all secrets that are currently active.

2. Compile a list of all secrets that are now inactive, rotated, deactivated, or false positives.

4. Update the allowlist in `.gitleaks.toml`  to include these secrets.

Harness recommends that you add your secrets as plain text to the `regexes` array, as shown in this example. This is the most reliable method to ensure that Gitleaks detects only active secrets when you run another scan. 

<details>

<summary>.gitleaks.toml example</summary>


```toml
title = "example gitleaks config"

[extend]
# useDefault will extend the base configuration with the default gitleaks config:
# https://github.com/zricethezav/gitleaks/blob/master/config/gitleaks.toml
useDefault = true

[allowlist]
# Recommended practice is to add your secrets to a regexes array, 
# not to a commits array.
regexTarget = "match"
description = "whitelist public and test secrets"
regexes = [
  '''1234567890abcdef1234567890abcdef''',
  '''abcdef1234567890abcdef1234567890''',
]

```

</details>

### Redact secrets

Harness recommends that you configure the Gitleaks step to [redact secrets in the log output](#additional-cli-flags). 

### Speed up your scans

To speed up your scan times, you can configure the Gitleaks step to [limit the number of commits to scan](#additional-cli-flags). By default, Gitleaks scans the entire commit history. 

### Write custom detection rules

You can also write your own [custom detection rules](https://github.com/gitleaks/gitleaks?tab=readme-ov-file#configuration).

  - For examples, go to the [default Gitleaks config](https://github.com/zricethezav/gitleaks/blob/master/config/gitleaks.toml).
  - If you want to contribute to the default configuration, go to the [Contributing guidelines](https://github.com/zricethezav/gitleaks/blob/master/README.md).
  - For information about advanced configurations, go to [Stop leaking secrets - configuration](https://blog.gitleaks.io/stop-leaking-secrets-configuration-2-3-aeed293b1fbf).


### For more information

import StoMoreInfo from '/docs/security-testing-orchestration/sto-techref-category/shared/_more-information.md';


<StoMoreInfo />



## Gitleaks step settings for STO scans

The recommended workflow is to add a GitLeaks step to a Security or Build stage and then configure it as described below.  


### Scan Mode


import StoSettingScanMode from './shared/step_palette/scan/_type.md';

import StoSettingScanModeOrch from './shared/step_palette/scan/mode/_orchestration.md';

import StoSettingScanModeIngest from './shared/step_palette/scan/mode/_ingestion.md';



<!-- StoSettingScanMode / -->
<StoSettingScanModeIngest />
<StoSettingScanModeOrch /> 


<!-- ============================================================================= -->
<a name="scan-config"></a>

### Scan Configuration


import StoSettingProductConfigName from './shared/step_palette/scan/_config-name.md';


<StoSettingProductConfigName />


### Target


#### Type

import StoSettingScanTypeRepo from './shared/step_palette/target/type/_repo.md';

<StoSettingScanTypeRepo />


#### Target and variant detection 

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

Use this field to run the [`gitleaks`](https://github.com/gitleaks/gitleaks) scanner with additional CLI flags such as: 

`--redact --log-opts="-n 1000" `

- `--redact` redacts secrets in the log output.

- `--log-opts` narrows the range of commits that Gitleaks scans in a Pull Request. For example, `-n 1000` limits the scan to the last 1000 commits. You can also scan a range of commits using a command such as: `tool_args : --log-opts=="--all commitA..commitF"`

import StoSettingCliFlagsCaution from '/docs/security-testing-orchestration/sto-techref-category/shared/step_palette/all/_cli-flags-caution.md';

<StoSettingCliFlagsCaution />


### Fail on Severity

import StoSettingFailOnSeverity from './shared/step_palette/all/_fail-on-severity.md';

<StoSettingFailOnSeverity />


### Settings

import StoSettingSettings from './shared/step_palette/all/_settings.md';

<StoSettingSettings />

You can also use this field to [speed up your Gitleaks scans](#speeding-up-gitleaks-scans).



### Additional Configuration

import ScannerRefAdditionalConfigs from './shared/_additional-config.md';

<ScannerRefAdditionalConfigs />


### Advanced settings

import ScannerRefAdvancedSettings from './shared/_advanced-settings.md';

<ScannerRefAdvancedSettings />
 

## Gitleaks step configuration example for STO

Here's an example of a configured Gitleaks step.

```yaml
- step:
    type: Gitleaks
    name: gitleaks
    identifier: gitleaks
    spec:
      mode: ingestion
      config: default
      target:
        name: nodegoat
        type: repository
        variant: dev
      advanced:
        log:
          level: debug
      ingestion:
        file: /path/of/file.sarif
    description: gitleaks step
```

## Gitleaks ingestion pipeline example for STO

The following pipeline shows an end-to-end ingestion workflow. The pipeline consists of a Build stage with two steps:

1. A Run step that sends a `gitleaks detect` command to the local Gitleaks container to scan the [codebase](/docs/continuous-integration/use-ci/codebase-configuration/create-and-configure-a-codebase/) specified for the pipeline. This command specifies the output file for the scan results: `/shared/scan_results/sarif_simple.sarif`. 

2. A Gitleaks step that auto-detects the data file type (SARIF) and then ingests and normalizes the data from the output file. 

![](./static/gitleaks-ingestion-example-pipeline.png)

```yaml

pipeline:
  projectIdentifier: STO
  orgIdentifier: default
  tags: {}
  stages:
    - stage:
        name: gitleaks-build-stage
        identifier: gitleaksbuildstage
        type: CI
        spec:
          cloneCodebase: true
          execution:
            steps:
              - stepGroup:
                  name: Ingestion Workflow with a runs step
                  identifier: Generation
                  steps:
                    - step:
                        type: Run
                        name: gitleaks
                        identifier: Run_1
                        spec:
                          connectorRef: CONTAINER_IMAGE_REGISTRY_CONNECTOR
                          image: zricethezav/gitleaks:latest
                          shell: Sh
                          command: |
                            gitleaks detect --source /harness --report-path /shared/scan_results/ingest-data.sarif --report-format 'sarif' --exit-code 0 --redact -v
                          resources:
                            limits:
                              memory: 2048Mi
                              cpu: 2000m
                        when:
                          stageStatus: Success
                    - step:
                        type: Gitleaks
                        name: gitleaks_ingest
                        identifier: gitleaks_ingest
                        spec:
                          mode: ingestion
                          config: default
                          target:
                            name: gitleaks-example
                            type: repository
                            variant: master
                          advanced:
                            log:
                              level: info
                          ingestion:
                            file: /shared/scan_results/ingest-data.sarif
          sharedPaths:
            - /shared/scan_results
          caching:
            enabled: false
            paths: []
          infrastructure:
            type: KubernetesDirect
            spec:
              connectorRef: K8S_DELEGATE_CONNECTOR
              namespace: harness-delegate-ng
              automountServiceAccountToken: true
              nodeSelector: {}
              os: Linux
  properties:
    ci:
      codebase:
        connectorRef: CODEBASE_CONNECTOR
        repoName: dvpwa
        build: <+input>
  identifier: Gitleaks_docsexample_INGESTION
  name: Gitleaks_docsexample_INGESTION


```

## Gitleaks orchestration pipeline example for STO

The following pipeline illustrates an orchestration workflow where the Gitleaks step scans the codebase and ingests the results in one step. 

![](./static/gitleaks-orchestration-example-pipeline.png)

```yaml

pipeline:
  projectIdentifier: STO
  orgIdentifier: default
  tags: {}
  stages:
    - stage:
        name: gitleaks-build-stage
        identifier: gitleaksbuildstage
        type: CI
        spec:
          cloneCodebase: true
          execution:
            steps:
              - stepGroup:
                  name: "STO Orchestration "
                  identifier: Orchestration
                  steps:
                    - step:
                        type: Gitleaks
                        name: gitleaks_orch
                        identifier: gitleaks_orch
                        spec:
                          mode: orchestration
                          config: default
                          target:
                            name: gitleaks-example
                            type: repository
                            variant: master
                          advanced:
                            log:
                              level: info
                          settings:
                            tool_args: "--log-opts=\"-n 1000\"`"
                          resources:
                            limits:
                              memory: 2048Mi
                              cpu: 2000m
          sharedPaths:
            - /shared/scan_results
          caching:
            enabled: false
            paths: []
          infrastructure:
            type: KubernetesDirect
            spec:
              connectorRef: K8S_DELEGATE_CONNECTOR
              namespace: harness-delegate-ng
              automountServiceAccountToken: true
              nodeSelector: \{}
              os: Linux
  properties:
    ci:
      codebase:
        connectorRef: CODEBASE_CONNECTOR
        repoName: dvpwa
        build: <+input>
  identifier: gitleaks_docs_example_ORCHESTRATION
  name: gitleaks_docs_example_ORCHESTRATION
```
