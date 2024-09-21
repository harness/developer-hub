---
title: Black Duck step configuration
description: Scan code repositories and container images with Black Duck.
sidebar_label: Black Duck step configuration
sidebar_position: 70
---

<DocsTag   text="Code repo scanners"  backgroundColor= "#cbe2f9" textColor="#0b5cad" link="/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#code-repo-scanners"  />
<DocsTag   text="Artifact scanners" backgroundColor= "#cbe2f9" textColor="#0b5cad" link="/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#artifact-scanners"  />
<DocsTag  text="Orchestration" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/run-an-orchestrated-scan-in-sto"  />
<DocsTag  text="Extraction" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/extraction-scans" />
<DocsTag  text="Ingestion" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/ingest-scan-results-into-an-sto-pipeline" />
<br/>
<br/>

You can scan your repositories and container images using [Black Duck Hub](https://sig-product-docs.synopsys.com/bundle/bd-hub/page/Welcome.html) and ingest the results into Harness STO. 

<!-- https://sig-product-docs.synopsys.com/bundle/bd-hub/page/Administration/Hub101.html -->

## Important notes for running Black Duck Hub scans in STO


- You need to add a [Docker-in-Docker background step](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#configuring-docker-in-docker-dind-for-your-pipeline) to scan container images on Kubernetes or Docker build infrastructures. 
  - Blackduck only supports scanning older images, so the Docker-in-Docker step must be compatible with the version mentioned in the [BDH support](https://community.synopsys.com/s/article/Black-Duck-docker-inspector-scan-Exception-thrown-while-getting-image-packages-null). If scanning a tar file, ensure it is generated using a Docker version that is compatible with this requirement.

- You need to run the scan step with root access if either of the following apply:

  - You need to add a Docker-in-Docker background step.

  - You need to add trusted certificates to your scan images at runtime. 

- You can set up your STO scan images and pipelines to run scans as non-root and establish trust for your own proxies using custom certificates. For more information, go to [Configure STO to Download Images from a Private Registry](/docs/security-testing-orchestration/use-sto/set-up-sto-pipelines/download-images-from-private-registry).

import StoMoreInfo from '/docs/security-testing-orchestration/sto-techref-category/shared/_more-information.md';

<StoMoreInfo />


## Black Duck Hub step settings for STO scans

The recommended workflow is to add a BlackDuck step to a Security or Build stage and then configure it as described below.


### Scan

#### Scan Mode

import StoSettingScanMode from './shared/step_palette/scan/_type.md';
import StoSettingScanModeOrch from './shared/step_palette/scan/mode/_orchestration.md';
import StoSettingScanModeDataload from './shared/step_palette/scan/mode/_extraction.md';
import StoSettingScanModeIngest from './shared/step_palette/scan/mode/_ingestion.md';

<!-- 
add Dataload support per DOC-2794 
-->

<!-- StoSettingScanMode / -->
<StoSettingScanModeOrch />
<StoSettingScanModeDataload />   
<StoSettingScanModeIngest />

<a name="scan-config"></a>

#### Scan Configuration

import StoSettingProductConfigName from './shared/step_palette/scan/_config-name.md';

<StoSettingProductConfigName />

### Target


#### Type

import StoSettingScanTypeRepo     from './shared/step_palette/target/type/_repo.md';
import StoSettingScanTypeCont from './shared/step_palette/target/type/_image.md';

<StoSettingScanTypeRepo />
<StoSettingScanTypeCont />


#### Target and Variant Detection 

import StoSettingScanTypeAutodetectRepo from './shared/step_palette/target/auto-detect/_code-repo.md';
import StoSettingScanTypeAutodetectContainer from './shared/step_palette/target/auto-detect/_container-image.md';
import StoSettingScanTypeAutodetectNote from './shared/step_palette/target/auto-detect/_note.md';

<StoSettingScanTypeAutodetectRepo/>
<StoSettingScanTypeAutodetectContainer/>
<StoSettingScanTypeAutodetectNote/>


#### Name 

import StoSettingTargetName from './shared/step_palette/target/_name.md';

<StoSettingTargetName />


#### Variant

import StoSettingTargetVariant from './shared/step_palette/target/_variant.md';

<StoSettingTargetVariant  />


#### Workspace

import StoSettingTargetWorkspace from './shared/step_palette/target/_workspace.md';

<StoSettingTargetWorkspace  />

### Container image


#### Type

The registry type where the image is stored: 

* **Docker v2** A registry that uses the Docker Registry v2 API such as [Docker Hub](https://docs.docker.com/registry/spec/api/), [Google Container Registry](https://cloud.google.com/container-registry), or [Google Artifact Registry](https://cloud.google.com/artifact-registry).

* **[AWS ECR](https://aws.amazon.com/ecr/)** 

* **[Jfrog Artifactory](https://jfrog.com/artifactory/)** 

* **Local Image in this Stage** Scan a local image built and stored within the context of the current stage (via `/var/run/docker.sock` registered as a stage level volume mount).

* **Local OCI/Docker archive in this Stage** Scan an OCI or Docker archive that has been created and stored within the current stage. The path to the archive can be specified via the workspace field, and ensure that the path to which the archive is saved is a shared volume mount.


#### Domain (_extraction_)

import StoSettingImageDomain from './shared/step_palette/image/_domain.md';

<StoSettingImageDomain />


#### Name

import StoSettingImageName from './shared/step_palette/image/_name.md';

<StoSettingImageName />


#### Tag

import StoSettingImageTag from './shared/step_palette/image/_tag.md';

<StoSettingImageTag />

### Ingestion


#### Ingestion File

import StoSettingIngestionFile from './shared/step_palette/ingest/_file.md';

<StoSettingIngestionFile  />

### Authentication

#### Domain

import StoSettingAuthDomain from './shared/step_palette/auth/_domain.md';

<StoSettingAuthDomain />


#### Enforce SSL

import StoSettingProductSSL from './shared/step_palette/auth/_ssl.md';

<StoSettingProductSSL />


#### API Version

import StoSettingApiVersion from './shared/step_palette/auth/_api-version.md';

<StoSettingApiVersion />


#### Type

import StoSettingAuthType from './shared/step_palette/auth/_type.md';

<StoSettingAuthType />


<!-- 

#### Access ID (_orchestration_)

import StoSettingAuthAccessID from './shared/step_palette/auth/_access-id.md';

<StoSettingAuthAccessID />

-->


#### Access Token

import StoSettingAuthAccessToken from './shared/step_palette/auth/_access-token.md';

<StoSettingAuthAccessToken />



### Scan Tool

#### Project Name

import StoSettingToolProjectName from './shared/step_palette/tool/project/_name.md';

<StoSettingToolProjectName />

#### Project Version

import StoSettingToolProjectVersion from './shared/step_palette/tool/project/_version.md';

<StoSettingToolProjectVersion />


### Log Level

import StoSettingLogLevel from './shared/step_palette/all/_log-level.md';

<StoSettingLogLevel />

### Additional CLI flags

Use this field to run the [`synopsis detect` scanner](https://blackducksoftware.github.io/synopsys-detect) with flags such as: 

`-detect.tools.excluded {DETECTOR, SIGNATURE}`

This string [excludes some detectors from a scan](https://community.synopsys.com/s/article/Allow-only-certain-Detect-tools-to-take-effect).

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

import ProxySettings from '/docs/security-testing-orchestration/sto-techref-category/shared/proxy-settings.md';

<ProxySettings />

## Troubleshooting Black Duck Hub

### Scan fails with message "Could not connect to addon client after max retries"

This message indicates that indicates that the container running the BlackDuck scan step is terminated abruptly due to insufficient resources. Harness recommends that you increase the resource allocation using an iterative approach: Run the scan again with `memory: 1Gi` and `cpu: "1.0"`, monitor the results, and adjust the resource allocation until the scanner runs successfully.

For more information, go to [Optimize STO pipelines](/docs/security-testing-orchestration/use-sto/set-up-sto-pipelines/optimize-sto-pipelines).

