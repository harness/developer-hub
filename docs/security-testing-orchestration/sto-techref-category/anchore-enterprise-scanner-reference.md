---
title: Anchore Enterprise step configuration
description: Scan container images with Anchore Enterprise.
sidebar_label: Anchore Enterprise step configuration
sidebar_position: 20
---

<DocsTag   text="Artifact scanners" backgroundColor= "#cbe2f9" textColor="#0b5cad" link="/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#artifact-scanners"  />
<DocsTag  text="Orchestration" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/run-an-orchestrated-scan-in-sto"  />
<DocsTag  text="Extraction" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/extraction-scans" />
<DocsTag  text="Ingestion" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/ingest-scan-results-into-an-sto-pipeline" />
<br/>
<br/>

You can scan your container images with [Anchore Enterprise](https://docs.anchore.com/current/docs/).

## Important notes for running Anchore Enterprise scans in STO

### Anchore Enterprise requirements

- You must use the Anchore v2 API and Anchore Enterprise Server v5.0 or higher to run orchestration and extraction scans.

- When you're deploying an Anchore Enterprise server, expose port 8228. This is the port that Harness uses to communicate with the server.

### All data ingestion methods are supported

You can run Orchestration, Extraction, and Ingestion workflows with Anchore Enterprise. This topic includes an [Orchestration pipeline example](#anchore-enterprise-orchestration-example) below.

### Scans in air-gapped environments are supported

You can run Anchore Enterprise scans in air-gapped environments. For more information, go to the Anchore Enterprise documentation:

- [Running Anchore Enterprise in an Air-Gapped Environment](https://docs.anchore.com/3.0/docs/overview/air_gapped)
- [Anchore Enterprise Feeds](https://docs.anchore.com/current/docs/overview/feeds)

### Root access requirements

import StoRootRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/root-access-requirements.md';

<StoRootRequirements />

### For more information

import StoMoreInfo from '/docs/security-testing-orchestration/sto-techref-category/shared/_more-information.md';

<StoMoreInfo />


## Anchore Enterprise step settings in STO

The recommended workflow is to add an Anchore Enterprise step to a Build or Security stage and then configure it as described below. 

### Scan

<a name="scan-mode"></a>

#### Scan mode

import StoSettingScanModeOrch from './shared/step_palette/scan/mode/_orchestration.md';
import StoSettingScanModeData from './shared/step_palette/scan/mode/_extraction.md';
import StoSettingScanModeIngest from './shared/step_palette/scan/mode/_ingestion.md';

<StoSettingScanModeOrch />
<StoSettingScanModeData />
<StoSettingScanModeIngest />


#### Scan configuration

import StoSettingProductConfigName from './shared/step_palette/scan/_config-name.md';

<StoSettingProductConfigName />


### Target

#### Type

import StoSettingScanTypeCont     from './shared/step_palette/target/type/_image.md';

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


#### Type  (_orchestration_)

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


### Ingestion File

import StoSettingIngestionFile from './shared/step_palette/ingest/_file.md';

<StoSettingIngestionFile  />


### Authentication


#### Domain

The fully-qualified URL to the scanner API, for example `https://anchore.company.io/api` or `http://192.0.2.1:8228`.


#### Access ID

import StoSettingAuthAccessID from './shared/step_palette/auth/_access-id.md';

<StoSettingAuthAccessID />

#### Access Token

import StoSettingAuthAccessToken from './shared/step_palette/auth/_access-token.md';

<StoSettingAuthAccessToken />

### Scan Tool

#### Image Name

The name of the image that you want to extract from Anchore. In Extraction mode, the image to scan must be located on the Anchore server. You should include both the image name and tag, for example, `ubuntu:20.04`.


### Log Level

import StoSettingLogLevel from './shared/step_palette/all/_log-level.md';

<StoSettingLogLevel />


### Additional CLI flags

Use this field to run the [Anchore Enterprise CLI](https://docs.anchore.com/3.0/docs/using/cli_usage/images/) with flags such as `--force`. This flag resets the image analysis status to `not_analyzed`.  

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

## Anchore Enterprise orchestration example

This example uses an Anchore step in Orchestration mode to scan a repository. The pipeline has one Security stage with two steps:

1. A Background step that runs Docker-in-Docker. This is [required](#docker-in-docker-requirements) to scan container images.
2. An Anchore step that does the following:

   1. Extracts the `owasp/nettacker:latest` image from Anchore Enterprise.
   2. Logs in to the Anchore Enterprise API based on the `product_domain`, `product_access_id`, `product_access_token` settings.
   3. Launches an orchestration scan of the `owasp/nettacker` project in Anchore Enterprise and gets the scan results from the Anchore server. 
   4. Deduplicates and normalizes the scan data and ingests it into STO.

Note that in this example, the resource limits for the Docker-in-Docker step are increased to ensure that [the step has enough memory to store the scanned image](/docs/security-testing-orchestration/use-sto/set-up-sto-pipelines/optimize-sto-pipelines#increase-memorycpu-for-the-docker-in-docker-background-step).

<details>
<summary>Anchore Enterprise orchestration pipeline example</summary>

```yaml

pipeline:
  name: anchore step palette
  identifier: anchore_step_palette
  projectIdentifier: default
  orgIdentifier: default
  tags: {}
  stages:
    - stage:
        name: anchore
        identifier: anchore
        type: SecurityTests
        spec:
          cloneCodebase: false
          execution:
            steps:
              - step:
                  type: Background
                  name: docker_dind
                  identifier: docker_dind
                  spec:
                    connectorRef: YOUR_DOCKER_CONNECTOR_ID
                    image: docker:dind
                    shell: Sh
                    command: dockerd
                    privileged: true
                    resources:
                      limits:
                        memory: 2048Mi
                        cpu: 1000m
              - step:
                  type: Anchore
                  name: Anchore_1
                  identifier: Anchore_1
                  spec:
                    mode: orchestration
                    config: default
                    target:
                      name: owasp/nettacker
                      type: container
                      variant: latest
                    advanced:
                      log:
                        level: info
                      args:
                        cli: "--force"
                    privileged: true
                    image:
                      type: docker_v2
                      name: owasp/nettacker
                      tag: latest
                    auth:
                      access_token: <+secrets.getValue("YOUR_ACCESS_TOKEN_SECRET")>
                      access_id: <+secrets.getValue("YOUR_ACCESS_ID_SECRET")>
                      domain: YOUR_DOMAIN_URL
          infrastructure:
            type: KubernetesDirect
            spec:
              connectorRef: YOUR_KUBERNETES_CLUSTER_CONNECTOR_ID
              namespace: YOUR_KUBERNETES_NAMESPACE
              automountServiceAccountToken: true
              nodeSelector: {}
              os: Linux
          sharedPaths:
            - /var/run
          caching:
            enabled: false
            paths: []
          slsa_provenance:
            enabled: false

```

</details>



