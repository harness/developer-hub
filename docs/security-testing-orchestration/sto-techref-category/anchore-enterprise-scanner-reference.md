---
title: Anchore Enterprise scanner reference for STO
description: Scan container images with Anchore Enterprise.
sidebar_label: Anchore Enterprise scanner reference
sidebar_position: 20
---

You can scan your repositories and other components used in your code with [Anchore Enterprise](https://docs.anchore.com/current/docs/), a scanner that provides visibility into supply chain security risks. 

## Important notes for running Anchore Enterprise scans in STO

### All data ingestion methods are supported

You can run Orchestration, Extraction, and Ingestion workflows with Anchore Enterprise. This topic includes an [Orchestration pipeline example](#anchore-enterprise-orchestration-example) below.

### Scans in air-gapped environments are supported

You can run Anchore Enterprise scans in air-gapped environments. For more information, go to the Anchore Enterprise documentation:

- [Running Anchore Enterprise in an Air-Gapped Environment](https://docs.anchore.com/3.0/docs/overview/air_gapped)
- [Anchore Enterprise Feeds](https://docs.anchore.com/current/docs/overview/feeds)


### Docker-in-Docker requirements


import StoDinDRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/dind-bg-step.md';


<StoDinDRequirements />

:::note
For Orchestrated and Extraction scans, you might want to increase the resource limits for your Docker-in-Docker background step. This can speed up your scan times, especially for large scans. For more information, go to [Optimize STO pipelines](/docs/security-testing-orchestration/use-sto/set-up-sto-pipelines/optimize-sto-pipelines).
:::


### Root access requirements


import StoRootRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/root-access-requirements.md';


<StoRootRequirements />

### For more information


import StoMoreInfo from '/docs/security-testing-orchestration/sto-techref-category/shared/_more-information.md';


<StoMoreInfo />

<!-- step-palette -->

## Anchore Enterprise step settings in STO

The recommended workflow is add an Anchore Enterprise step to a Security Tests or CI Build stage and then configure it as described below. 

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


#### Detect target and variant 


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


### Container Image


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

For Extraction scans, the name of the image that you want to extract from Anchore. 


### Log Level, CLI flags, and Fail on Severity

#### Log Level

import StoSettingLogLevel from './shared/step_palette/all/_log-level.md';

<StoSettingLogLevel />


#### Additional CLI flags

You can use this field to run the [Anchore Enterprise CLI](https://docs.anchore.com/3.0/docs/using/cli_usage/images/) with specific command-line arguments. For example, add `--force` to reset the image analysis status to `not_analyzed`.  


#### Fail on Severity

import StoSettingFailOnSeverity from './shared/step_palette/all/_fail-on-severity.md';

<StoSettingFailOnSeverity />


### Settings

You can use this field to provide environment variables to be used during the execution of the step. 


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

<!--  /step-palette -->

<!-- STO-7187 remove legacy configs for scanners with step palettes

## Security step settings for Anchore Enterprise scans in STO (legacy)

:::note
You can set up Anchore Enterprise scans using a Security step, but this is a legacy functionality. Harness recommends that you use an [Anchore Enterprise step](#anchore-enterprise-step-settings-in-sto) instead.
:::

To configure an Anchore Enterprise scan in a Security step, add the following to **Settings**: 

* `product_name` : `anchore`
* [`scan_type`](#scanner-categories) : `containerImage`
* `product_config_name` = `default`

* [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods) : `orchestratedScan`, `dataLoad`, or `ingestionOnly`. 
* When [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods) is set to `orchestratedScan` or `dataLoad`:
	+ `product_domain` : The fully-qualified URL to the scanner API, for example `https://anchore.company.io/api` or `http://192.0.2.1:8228`.
	+ `product_access_id` : Username to log in to the scanner.
	+ `product_access_token` : The access token to log in to the scanner. In most cases this is a password or an API key. 
	  You should create a Harness text secret with your encrypted token and reference the secret using the format `<+secrets.getValue("project.container-access-id")>`. For more information, go to [Add and Reference Text Secrets](/docs/platform/secrets/add-use-text-secrets).
* When [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods) is set to `dataLoad`:
	+ `product_image_name` : The name of the image that you want to extract from Anchore.
* When [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods) is set to `orchestratedScan`:
	+ `container_project` — The image owner and project, for example `harness/delegate`

* [`fail_on_severity`](#fail-on-severity)
+ `tool_args`
	You can use this field to run the [Anchore Enterprise CLI](https://docs.anchore.com/3.0/docs/using/cli_usage/images/) with specific command-line arguments. For example, add `tool_args` : `--force` to reset the image analysis status to `not_analyzed`.  


### Container image (required)

* `container_type`
	+ accepted value(s): `local_image`, `docker_v2`, `jfrog_artifactory`, `aws_ecr`
		- for `container_type` set to `local`
			* `None`
		- for `container_type` set to `docker_v2`
			* `container_access_id`: Username
			* `container_access_token`: Password/Token
		- for `container_type` set to `jfrog_artifactory`
			* `container_access_id`: Username
			* `container_access_token`: Password/Token
		- for `container_type` set to `aws_ecr`
			* `container_access_id`: Username
			* `container_access_token`: Password/Token
			* `container_region`: AWS default region
* `container_domain` :  The image owner and project, for example `harness/delegate`

### Target and variant (required)


import StoLegacyTargetAndVariant  from './shared/legacy/_sto-ref-legacy-target-and-variant.md';


<StoLegacyTargetAndVariant />

### Ingestion file (required for ingestion workflows)


import StoLegacyIngest from './shared/legacy/_sto-ref-legacy-ingest.md';


<StoLegacyIngest />


### Fail on Severity

import StoSettingFailOnSeverity from './shared/step_palette/all/_fail-on-severity.md';

<StoSettingFailOnSeverity />



-->

## Anchore Enterprise orchestration example

This example uses a Security step in Orchestration mode to scan a repository. The pipeline has one SecurityTests stage with two steps:

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

<!-- hiding this example, since it uses the old-style Security step rather than the scanner template 

## Anchore Enterprise dataLoad example

This example uses a Security step in Orchestration mode to scan a repository. The pipeline has one SecurityTests stage with two steps:

1. A Background step that runs Docker-in-Docker. This is [required](#docker-in-docker-requirements) to scan container images.
2. A Security step that does the following:

   1. Extracts the `owasp/nettacker:latest` image from Anchore Enterprise.
   2. Logs in to the Anchore Enterprise API based on the `product_domain`, `product_access_id`, `product_access_token` settings.
   3. Scans the extracted image.
   4. Deduplicates and normalizes the scan data and ingests it into STO. 

Note that in this example, the resource limages for the Security step are increased to ensure that the container used to run the scan has enough memory and CPU.

```yaml

pipeline:
  allowStageExecutions: false
  projectIdentifier: STO
  orgIdentifier: default
  identifier: anchore_dataload
  name: anchore dataload
  tags: {}
  stages:
    - stage:
        name: build
        identifier: build
        type: SecurityTests
        spec:
          cloneCodebase: false
          infrastructure:
            type: KubernetesDirect
            spec:
              connectorRef: YOUR_KUBERNETES_CLUSTER_CONNECTOR_ID
              namespace: harness-delegate-ng
              automountServiceAccountToken: true
              nodeSelector: {}
              containerSecurityContext:
                privileged: true
              os: Linux
          sharedPaths:
            - /var/run
            - /shared/scan_results
          execution:
            steps:
              - step:
                  type: Background
                  name: Background_1
                  identifier: Background_1
                  spec:
                    connectorRef: YOUR_DOCKER_CONNECTOR_ID
                    image: docker:dind
                    shell: Sh
                    privileged: true
                    entrypoint:
                      - dockerd
                    resources:
                      limits:
                        memory: 2048Mi
                        cpu: 1000m  
              - step:
                  type: Security
                  name: Security_1
                  identifier: Security_1
                  spec:
                    privileged: true
                    settings:
                      policy_type: dataLoad
                      scan_type: container
                      product_name: anchore
                      product_config_name: default
                      product_domain: https://anchore.myorg.org/api
                      product_access_id: jane.smith@myorg.org
                      product_access_token: <+secrets.getValue("anchoretoken")>
                      product_image_name: owasp/nettacker:latest
                      target_name: owasp/nettacker
                      target_variant: latest
                      LOG_LEVEL: debug
                    imagePullPolicy: Always
                    resources:
                      limits:
                        memory: 4Gi
                        cpu: 1000m
          caching:
            enabled: false
            paths: []
          slsa_provenance:
            enabled: false
        variables:
          - name: runner_tag
            type: String
            value: dev

```
-->

