---
title: Aqua Trivy step configuration
description: Scan container images with  Aqua Trivy.
sidebar_position: 10
sidebar_label: Aqua Trivy step configuration
helpdocs_topic_id: 079248uzcu
helpdocs_category_id: m01pu2ubai
helpdocs_is_private: false
helpdocs_is_published: true
redirect_from:
  - /docs/security-testing-orchestration/sto-techref-category/aqua-trivy-scanner-reference
---

<DocsTag  text="Artifact scanners" backgroundColor= "#cbe2f9" textColor="#0b5cad" link="/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#artifact-scanners"  />
<DocsTag  text="Code repo scanners"  backgroundColor= "#cbe2f9" textColor="#0b5cad" link="/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#code-repo-scanners"  />
<DocsTag  text="Orchestration" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/run-an-orchestrated-scan-in-sto"  />
<DocsTag  text="Ingestion" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/ingest-scan-results-into-an-sto-pipeline" />
<br/>
<br/>

With Harness STO, you can use [Aqua Trivy](https://github.com/aquasecurity/trivy) to scan both:
- **[Container images](https://trivy.dev/latest/docs/target/container_image/)**
- **Code repositories** (via [Filesystem](https://trivy.dev/latest/docs/target/filesystem/) scanning)

When scanning code repositories, Trivy performs:
- **Secret Detection** – Identifies hardcoded secrets or sensitive information.
- **Software Composition Analysis (SCA)** – Detects vulnerabilities in open source dependencies.

You can perform these scans using [Orchestration](#scan-mode) or [Ingestion](#scan-mode) modes supported in STO. Follow the steps below for detailed configuration instructions for both scan modes.

:::info
- You can utilize custom STO scan images and pipelines to run scans as a non-root user. For more details, refer [Configure your pipeline to use STO images from private registry](/docs/security-testing-orchestration/use-sto/set-up-sto-pipelines/configure-pipeline-to-use-sto-images-from-private-registry).
- STO supports three different approaches for loading self-signed certificates. For more information, refer [Run STO scans with custom SSL certificates](/docs/security-testing-orchestration/use-sto/secure-sto-pipelines/ssl-setup-in-sto/#supported-workflows-for-adding-custom-ssl-certificates).


import StoMoreInfo from '/docs/security-testing-orchestration/sto-techref-category/shared/more-information.md';

<StoMoreInfo />
:::


## Aqua Trivy step settings

The recommended workflow is to add an AquaTrivy step to a Security Tests or CI Build stage and then configure it as described below.


### Scan


#### Scan Mode


import StoSettingScanMode from '../shared/step-palette/scan/type.md';

import StoSettingScanModeOrch from '../shared/step-palette/scan/mode/orchestration.md';

import StoSettingScanModeIngest from '../shared/step-palette/scan/mode/ingestion.md';


<!-- StoSettingScanMode / -->
<StoSettingScanModeOrch />
<StoSettingScanModeIngest />


#### Scan Configuration

import StoSettingProductConfigName from '../shared/step-palette/scan/config-name.md';

<StoSettingProductConfigName />

- **Default**: This option is used for container image scanning. It is automatically selected when you choose **Container Image** as the [Target Type](#target).

- **Filesystem**: This option is used for scanning code repositories. It is automatically selected when you choose **Repository** as the [Target Type](#target). This scan configuration maps to Aqua Trivy’s [Filesystem](https://trivy.dev/latest/docs/target/filesystem/) scan.

### Target


#### Type

import StoSettingScanTypeCont from '../shared/step-palette/target/type/image.md';

import StoSettingScanTypeRepo from '../shared/step-palette/target/type/repo.md';

<StoSettingScanTypeCont />

<StoSettingScanTypeRepo />

:::info
When you set the Target Type to **Repository**, the **[Scan Configuration](#scan-configuration)** field is automatically set to **Filesystem** and cannot be changed.
In the future, we plan to add more scan configurations specific to each Target Type.
:::

#### Target and Variant Detection 

import StoSettingScanTypeAutodetectContainer from '../shared/step-palette/target/auto-detect/container-image.md';
import StoSettingScanTypeAutodetectNote from '../shared/step-palette/target/auto-detect/note.md';

<StoSettingScanTypeAutodetectContainer/>
<StoSettingScanTypeAutodetectNote/>


#### Name 

import StoSettingTargetName from '../shared/step-palette/target/name.md';

<StoSettingTargetName />


#### Variant

import StoSettingTargetVariant from '../shared/step-palette/target/variant.md';

<StoSettingTargetVariant  />

#### Workspace
This field is visible only when you select **Repository** as the Target Type.

Use this field to specify an individual folder or file to scan. For example, if you want to scan a specific file like `/tmp/example/test.py`, set the workspace path to:  
`/harness/tmp/example/test.py`

### Container image


#### Type


import StoSettingImageType from '../shared/step-palette/image/type.md';



<StoSettingImageType />

#### Domain



import StoSettingImageDomain from '../shared/step-palette/image/domain.md';



<StoSettingImageDomain />

#### Name


import StoSettingImageName from '../shared/step-palette/image/name.md';



<StoSettingImageName />


#### Tag


import StoSettingImageTag from '../shared/step-palette/image/tag.md';

<StoSettingImageTag />

#### Access ID

import StoSettingImageAccessID from '../shared/step-palette/image/access-id.md';

<StoSettingImageAccessID />

#### Access Token


import StoSettingImageAccessToken from '../shared/step-palette/image/access-token.md';



<StoSettingImageAccessToken />


#### Region  


import StoSettingImageRegion from '../shared/step-palette/image/region.md';



<StoSettingImageRegion />




### Ingestion


<a name="ingestion-file"></a>

#### Ingestion File


import StoSettingIngestionFile from '../shared/step-palette/ingest/file.md';



<StoSettingIngestionFile  />



### Log Level

import StoSettingLogLevel from '../shared/step-palette/all/log-level.md';

<StoSettingLogLevel />


### Additional CLI flags

Use this field to run the [`trivy image`](https://aquasecurity.github.io/trivy/v0.49/docs/target/container_image/) scanner with flags such as:

`--ignore-unfixed --scanners vuln`

With these flags, the scanner reports only on vulnerabilities with known fixes. 

import StoSettingCliFlagsCaution from '../shared/step-palette/all/cli-flags-caution.md';

<StoSettingCliFlagsCaution />

<!-- 
<StoSettingCliFlags />

For example, you can customize the security issues to detect using the `scanners` argument. To scan vulnerabilities only, add `--scanners vuln` to this field.

-->


### Fail on Severity


import StoSettingFailOnSeverity from '../shared/step-palette/all/fail-on-severity.md';


<StoSettingFailOnSeverity />

### Settings

import StoSettingSettings from '../shared/step-palette/all/settings.md';

<StoSettingSettings />


### Additional Configuration

import ScannerRefAdditionalConfigs from '../shared/additional-config.md';

<ScannerRefAdditionalConfigs />


### Advanced settings

import ScannerRefAdvancedSettings from '../shared/advanced-settings.md';

<ScannerRefAdvancedSettings />

## Configure Aqua Trivy as a Built-in Scanner  

The Aqua Trivy scanner is available as a [built-in scanner](/docs/security-testing-orchestration/set-up-scans/built-in-scanners) in STO. Configuring it as a built-in scanner enables the step to automatically perform scans using the free version without requiring any licenses. Follow these steps to set it up:  

1. Search for **Container** in the step palette or navigate to the **Built-in Scanners** section and select the **Container** step.
2. Select **Aqua Trivy** from the list of scanners.  
3. Expand the **Additional CLI Flags** section if you want to configure optional CLI flags.
4. Configure the **Container Information** by setting the [Type](#type-1) and [Image](#container-image).
5. Click **Add Scanner** to save the configuration.  

The scanner will automatically use the free version, detect scan targets, and can be further configured by clicking on the step whenever needed.

## Proxy settings

import ProxySettings from '../shared/proxy-settings.md';

<ProxySettings />

## YAML pipeline example

Here's an example of the pipeline you created in this tutorial. If you copy this example, replace the placeholder values with appropriate values for your project and organization.

```yaml
pipeline:
  projectIdentifier: YOUR_PROJECT_ID
  orgIdentifier: YOUR_HARNESS_ORG_ID
  tags: {}
  stages:
    - stage:
        name: build
        identifier: build
        type: CI
        spec:
          cloneCodebase: false
          sharedPaths:
            - /var/run
            - /shared/scan_results
          execution:
            steps:
              - step:
                  type: AquaTrivy
                  name: AquaTrivy_1
                  identifier: AquaTrivy_1
                  spec:
                    mode: orchestration
                    config: default
                    target:
                      type: container
                      name: redhat/ubi8-minimal
                      variant: latest
                    advanced:
                      log:
                        level: info
                      args:
                        cli: "--scanners vuln"
                    privileged: true
                    image:
                      type: docker_v2
                      name: redhat/ubi8-minimal
                      domain: docker.io
                      tag: latest
                    sbom:
                      format: spdx-json
          platform:
            os: Linux
            arch: Amd64
          runtime:
            type: Cloud
            spec: {}
          caching:
            enabled: false
            paths: []
          slsa_provenance:
            enabled: false
        description: ""
  identifier: trivyorchestration
  name: trivy-orchestration



```



