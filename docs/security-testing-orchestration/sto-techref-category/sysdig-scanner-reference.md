---
title: Sysdig scanner reference for STO
description: Scan container images with Sysdig.
sidebar_label: Sysdig scanner reference
sidebar_position: 395
---

You can scan container images using [Sysdig Vulnerability engine](https://docs.sysdig.com/en/docs/sysdig-secure/vulnerabilities/). Create a CI Build or Security Tests stage, add a Sysdig step, and then add the `setting:value` pairs as specified below.

## Important notes for running Sysdig scans in STO

### Docker-in-Docker requirements

import StoDinDRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/dind-bg-step.md';

<StoDinDRequirements />


### Root access requirements 

import StoRootRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/root-access-requirements.md';

<StoRootRequirements />


### For more information

import StoMoreInfo from '/docs/security-testing-orchestration/sto-techref-category/shared/_more-information.md';

<StoMoreInfo />


## Sysdig step settings for STO scans

The recommended workflow is add a Sysdig step to a Security Tests or CI Build stage and then configure it as described below.


### Scan


#### Scan Mode

<!--  import StoSettingScanMode from './shared/step_palette/scan/_type.md'; -->
import StoSettingScanModeOrch from './shared/step_palette/scan/mode/_orchestration.md';
import StoSettingScanModeIngest from './shared/step_palette/scan/mode/_ingestion.md';


<!-- StoSettingScanMode / -->
<StoSettingScanModeOrch />
<StoSettingScanModeIngest />


#### Scan Configuration

import StoSettingProductConfigName from './shared/step_palette/scan/_config-name.md';

<StoSettingProductConfigName />


### Target


#### Type

import StoSettingScanTypeCont from './shared/step_palette/target/type/_image.md';

<StoSettingScanTypeCont />


<!-- #### Detect target and variant 

import StoSettingScanTypeAutodetectContainer from './shared/step_palette/target/auto-detect/_container-image.md';
import StoSettingScanTypeAutodetectNote from './shared/step_palette/target/auto-detect/_note.md';

<StoSettingScanTypeAutodetectContainer/>
<StoSettingScanTypeAutodetectNote/       -->


#### Name 

import StoSettingTargetName from './shared/step_palette/target/_name.md';

<StoSettingTargetName />


#### Variant

import StoSettingTargetVariant from './shared/step_palette/target/_variant.md';

<StoSettingTargetVariant  />


### Container image

#### Type

import StoSettingImageType from './shared/step_palette/image/_type.md';

<StoSettingImageType />


#### Domain

import StoSettingImageDomain from './shared/step_palette/image/_domain.md';

<StoSettingImageDomain />


#### Name

import StoSettingImageName from './shared/step_palette/image/_name.md';

<StoSettingImageName />


#### Tag

import StoSettingImageTag from './shared/step_palette/image/_tag.md';

<StoSettingImageTag />


#### Access ID

import StoSettingImageAccessID from './shared/step_palette/image/_access-id.md';

<StoSettingImageAccessID />


#### Access Token

import StoSettingImageAccessToken from './shared/step_palette/image/_access-token.md';

<StoSettingImageAccessToken />


#### Region  

import StoSettingImageRegion from './shared/step_palette/image/_region.md';

<StoSettingImageRegion />


### Ingestion


#### Ingestion File

import StoSettingIngestionFile from './shared/step_palette/ingest/_file.md';

<StoSettingIngestionFile  />


### Log Level, CLI flags, and Fail on Severity



#### Log Level

import StoSettingLogLevel from './shared/step_palette/all/_log-level.md';

<StoSettingLogLevel />



#### Additional CLI flags

import StoSettingCliFlags from './shared/step_palette/all/_cli-flags.md';

<StoSettingCliFlags />


#### Fail on Severity

import StoSettingFailOnSeverity from './shared/step_palette/all/_fail-on-severity.md';

<StoSettingFailOnSeverity />

<!-- 
### Settings

You can add a `tool_args` setting to run the scanner with specific command-line arguments. For example, you can customize the security issues to detect using the scanners argument. To scan vulnerabilities only, specify `tool_args` = `--scanners vuln`. 

-->

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

## Sysdig pipeline examples

### Sysdig orchestration pipeline

If you copy this example, replace the placeholder values with appropriate values for your project, organization, connectors, and access token.

<details>

<summary>
YAML pipeline, Sysdig scan, Orchestration mode
</summary>

```yaml
pipeline:
  name: sysdig test
  identifier: sysdig_test
  projectIdentifier: default
  orgIdentifier: default
  tags: {}
  stages:
    - stage:
        name: scan
        identifier: scan
        type: SecurityTests
        spec:
          cloneCodebase: false
          execution:
            steps:
              - step:
                  type: Background
                  name: docker
                  identifier: docker
                  spec:
                    connectorRef: YOUR_DOCKER_CONNECTOR_ID
                    image: docker:dind
                    shell: Sh
                    privileged: true
                    resources:
                      limits:
                        memory: 2Gi
                        cpu: 1000m
              - step:
                  type: Sysdig
                  name: Sysdig_1
                  identifier: Sysdig_1
                  spec:
                    mode: orchestration
                    config: default
                    target:
                      name: nodegoat
                      type: container
                      variant: latest
                    advanced:
                      log:
                        level: debug
                    privileged: true
                    image:
                      type: docker_v2
                      name: vulnerables/web-dvwa
                      tag: latest
                    auth:
                      access_token: <+secrets.getValue("YOUR_SYSDIG_ACCESS_TOKEN_SECRET")>
                      domain: https://app.us4.sysdig.com
                    imagePullPolicy: Always
                    resources:
                      limits:
                        memory: 2Gi
                  failureStrategies:
                    - onFailure:
                        errors:
                          - AllErrors
                        action:
                          type: MarkAsSuccess
              - step:
                  type: Run
                  name: Run_1
                  identifier: Run_1
                  spec:
                    connectorRef: YOUR_DOCKER_CONNECTOR_ID
                    image: alpine
                    shell: Sh
                    command: cat /harness/scan-logs
                  failureStrategies:
                    - onFailure:
                        errors:
                          - AllErrors
                        action:
                          type: MarkAsSuccess
          sharedPaths:
            - /addon/results
            - /var/run
          infrastructure:
            type: KubernetesDirect
            spec:
              connectorRef: YOUR_KUBERNETES_CLUSTER_CONNECTOR_ID
              namespace: YOUR_NAMESPACE
              automountServiceAccountToken: true
              nodeSelector: {}
              os: Linux


```

</details>

### Sysdig ingestion pipeline

If you copy this example, replace the placeholder values with appropriate values for your project, organization, connectors, and access token.

<details>

<summary>
YAML pipeline, Sysdig scan, Ingestion mode
</summary>

```yaml

pipeline:
  projectIdentifier: YOUR_PROJECT_ID
  orgIdentifier: YOUR_HARNESS_ORG_ID
  tags: {}
  stages:
    - stage:
        name: sysdig_ingest_scan
        identifier: sysdig_ingest_scan
        type: CI
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
                  type: Run
                  name: Run_1
                  identifier: Run_1
                  spec:
                    shell: Sh
                    command: |-
                      # In this example, the codebase connector points to 
                      # https://github.com/GitHubGoneMad/sysdig-scans
                      cp /harness/sysdig-scan-results.json /shared/scan_results/
              - step:
                  type: Sysdig
                  name: Sysdig_1
                  identifier: Sysdig_1
                  spec:
                    mode: ingestion
                    config: default
                    target:
                      type: container
                      detection: manual
                      name: YOUR_CONTAINER_IMAGE_REPO/NAME
                      variant: YOUR_CONTAINER_IMAGE_NAME
                    advanced:
                      log:
                        level: info
                    privileged: false
                    ingestion:
                      file: /shared/scan_results/sysdig-scan-results.json
          sharedPaths:
            - /shared/scan_results/
  properties:
    ci:
      codebase:
        connectorRef: YOUR_CODE_REPO_CONNECTOR_ID
        repoName: YOUR_REPO_NAME
        build: <+input>
  identifier: sysdig_ingestion_test_v2
  name: sysdig_ingestion_test_v2



```

</details>



