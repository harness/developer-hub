---
title: Sysdig step configuration
description: Scan container images with Sysdig.
sidebar_label: Sysdig step configuration
sidebar_position: 395
---

<DocsTag   text="Artifact scanners" backgroundColor= "#cbe2f9" textColor="#0b5cad" link="/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#artifact-scanners"  />
<DocsTag  text="Orchestration" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/run-an-orchestrated-scan-in-sto"  />
<DocsTag  text="Ingestion" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/ingest-scan-results-into-an-sto-pipeline" />
<br/>
<br/>

You can scan container images using [Sysdig Vulnerability engine](https://docs.sysdig.com/en/docs/sysdig-secure/vulnerabilities/). Add a Sysdig step to a Build or Security stage and then configure it as described below. 


## Important notes for running Sysdig scans in STO

- You need to run the scan step with root access if either of the following apply:

  - You need to run a [Docker-in-Docker background service](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference/#configuring-docker-in-docker-dind-for-your-pipeline).

  - You need to add trusted certificates to your scan images at runtime. 

- You can set up your STO scan images and pipelines to run scans as non-root and establish trust for your own proxies using custom certificates. For more information, go to [Configure STO to Download Images from a Private Registry](/docs/security-testing-orchestration/use-sto/set-up-sto-pipelines/download-images-from-private-registry).


import StoMoreInfo from '/docs/security-testing-orchestration/sto-techref-category/shared/_more-information.md';

<StoMoreInfo />


## Sysdig step settings for STO scans

The recommended workflow is to add a Sysdig step to a Security or Build stage and then configure it as described below.


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


#### Target and Variant Detection 

import StoSettingScanTypeAutodetectContainer from './shared/step_palette/target/auto-detect/_container-image.md';
import StoSettingScanTypeAutodetectNote from './shared/step_palette/target/auto-detect/_note.md';

<StoSettingScanTypeAutodetectContainer/>
<StoSettingScanTypeAutodetectNote/>


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


### Ingestion File

import StoSettingIngestionFile from './shared/step_palette/ingest/_file.md';

<StoSettingIngestionFile  />


### Log Level

import StoSettingLogLevel from './shared/step_palette/all/_log-level.md';

<StoSettingLogLevel />

import StoSettingCliFlagsCaution from '/docs/security-testing-orchestration/sto-techref-category/shared/step_palette/all/_cli-flags-caution.md';

<StoSettingCliFlagsCaution />

### Fail on Severity

import StoSettingFailOnSeverity from './shared/step_palette/all/_fail-on-severity.md';

<StoSettingFailOnSeverity />


<!-- 
### Settings

You can add a `tool_args` setting to run the scanner with specific command-line arguments. For example, you can customize the security issues to detect using the scanners argument. To scan vulnerabilities only, specify `tool_args` = `--scanners vuln`. 

-->

### Additional Configuration

import ScannerRefAdditionalConfigs from './shared/_additional-config.md';

<ScannerRefAdditionalConfigs />


### Advanced settings

import ScannerRefAdvancedSettings from './shared/_advanced-settings.md';

<ScannerRefAdvancedSettings />

## Proxy settings

import ProxySettings from './shared/proxy-settings.md';

<ProxySettings />

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



