---
title: Anchore Enterprise step configuration
description: Scan container images with Anchore Enterprise.
sidebar_label: Anchore Enterprise step configuration
sidebar_position: 20
---

<DocsTag   text="Artifact scanners" backgroundColor= "#cbe2f9" textColor="#0b5cad" link="/docs/security-testing-orchestration/whats-supported/scanners?view-by=target-type#artifact-scanners"  />
<DocsTag  text="Orchestration" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/run-an-orchestrated-scan-in-sto"  />
<DocsTag  text="Extraction" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/extraction-scans" />
<DocsTag  text="Ingestion" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/ingest-scan-results-into-an-sto-pipeline" />
<br/>
<br/>

You can scan your container images with [Anchore Enterprise](https://docs.anchore.com/current/docs/).

## Important notes for running Anchore Enterprise scans in STO

### Anchore Enterprise requirements

- You must use the Anchore v2 API and Anchore Enterprise Server v5.0 or higher to run orchestration and extraction scans.

When you deploy an Anchore Enterprise server, expose port 8228. Harness uses this port to communicate with the server.

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

import StoMoreInfo from '/docs/security-testing-orchestration/sto-techref-category/shared/more-information.md';

<StoMoreInfo />


## Anchore Enterprise step settings in STO

The recommended workflow is to add an Anchore Enterprise step to a Build or Security stage and then configure it as described below. 

### Scan

<a name="scan-mode"></a>

#### Scan mode

import StoSettingScanModeOrch from './shared/step-palette/scan/mode/orchestration.md';
import StoSettingScanModeData from './shared/step-palette/scan/mode/extraction.md';
import StoSettingScanModeIngest from './shared/step-palette/scan/mode/ingestion.md';

<StoSettingScanModeOrch />
<StoSettingScanModeData />
<StoSettingScanModeIngest />


#### Scan configuration

import StoSettingProductConfigName from './shared/step-palette/scan/config-name.md';

<StoSettingProductConfigName />


### Target

#### Type

import StoSettingScanTypeCont     from './shared/step-palette/target/type/image.md';

<StoSettingScanTypeCont />


#### Target and Variant Detection 


import StoSettingScanTypeAutodetectContainer from './shared/step-palette/target/auto-detect/container-image.md';
import StoSettingScanTypeAutodetectNote from './shared/step-palette/target/auto-detect/note.md';

<StoSettingScanTypeAutodetectContainer/>
<StoSettingScanTypeAutodetectNote/>


#### Name 

import StoSettingTargetName from './shared/step-palette/target/name.md';

<StoSettingTargetName />



#### Variant

import StoSettingTargetVariant from './shared/step-palette/target/variant.md';

<StoSettingTargetVariant  />


### Container image


#### Type  (_orchestration_)

import StoSettingImageType from './shared/step-palette/image/type.md';

<StoSettingImageType />


#### Domain

import StoSettingImageDomain from './shared/step-palette/image/domain.md';

<StoSettingImageDomain />


#### Name

import StoSettingImageName from './shared/step-palette/image/name.md';

<StoSettingImageName />


#### Tag

import StoSettingImageTag from './shared/step-palette/image/tag.md';

<StoSettingImageTag />


#### Access ID

import StoSettingImageAccessID from './shared/step-palette/image/access-id.md';

<StoSettingImageAccessID />


#### Access Token

import StoSettingImageAccessToken from './shared/step-palette/image/access-token.md';

<StoSettingImageAccessToken />


### Ingestion File

import StoSettingIngestionFile from './shared/step-palette/ingest/file.md';

<StoSettingIngestionFile  />


### Authentication


#### Domain

The fully-qualified URL to the scanner API, for example `https://anchore.company.io/api` or `http://192.0.2.1:8228`.


#### Access ID

import StoSettingAuthAccessID from './shared/step-palette/auth/access-id.md';

<StoSettingAuthAccessID />

#### Access Token

import StoSettingAuthAccessToken from './shared/step-palette/auth/access-token.md';

<StoSettingAuthAccessToken />

### Scan Tool

#### Use Raw Scanner Severity

import ScannerProvidedSeverity from './shared/use-scanner-provided-severity.md';

<ScannerProvidedSeverity />

#### Image Name (*for **Extraction** Scan Mode*)

This field appears only when you select **Extraction** as the [Scan Mode](#scan-mode). The name of the image that you want to extract from Anchore. In Extraction mode, the image to scan must be located on the Anchore server. You should include both the image name and tag, for example, `ubuntu:20.04`.

### Log Level

import StoSettingLogLevel from './shared/step-palette/all/log-level.md';

<StoSettingLogLevel />


### Additional CLI flags

Use this field to run the [Anchore Enterprise CLI](https://docs.anchore.com/3.0/docs/using/cli_usage/images/) with flags such as `--force`. This flag resets the image analysis status to `not_analyzed`.  

import StoSettingCliFlagsCaution from '/docs/security-testing-orchestration/sto-techref-category/shared/step-palette/all/cli-flags-caution.md';

<StoSettingCliFlagsCaution />


### Fail on Severity

import StoSettingFailOnSeverity from './shared/step-palette/all/fail-on-severity.md';

<StoSettingFailOnSeverity />


### Settings

import StoSettingSettings from './shared/step-palette/all/settings.md';

<StoSettingSettings />


### Additional Configuration

import ScannerRefAdditionalConfigs from './shared/additional-config.md';

<ScannerRefAdditionalConfigs />


### Advanced settings

import ScannerRefAdvancedSettings from './shared/advanced-settings.md';

<ScannerRefAdvancedSettings />

## View Anchore policy failures
Anchore policy failures will appear in scan results as `Info` severity issues, with the issue type set to `EXTERNAL_POLICY`. Successfully passed policies will not be included in the scan results.  Additionally, you can apply an OPA policy to fail the pipeline based on the policy failures. This can be achieved using the [Security Tests - External Policy Failures](/docs/security-testing-orchestration/policies/create-opa-policies.md#block-the-pipeline-based-on-external-policy-failures) policy from the [security tests policy samples](/docs/security-testing-orchestration/policies/create-opa-policies.md#security-test-policy-samples).

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
  identifier: anchore_step-palette
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



