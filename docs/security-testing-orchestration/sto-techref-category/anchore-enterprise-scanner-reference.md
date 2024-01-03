---
title: Anchore Enterprise scanner reference for STO
description: Container scans with Anchore Enterprise
sidebar_label: Anchore Enterprise scanner reference
sidebar_position: 20
---

You can scan your repositories and other components used in your code with [Anchore Enterprise](https://docs.anchore.com/current/docs/), a scanner that provides visibility into supply chain security risks. 

## Important notes for running Anchore Enterprise scans in STO

### All data ingestion methods are supported

You can run Orchestration, Extraction, and Ingestion workflows with Anchore Enterprise. This topic includes an [`orchestratedScan` pipeline example](#anchore-enterprise-orchestration-example) and a [`dataLoad` pipeline example](#anchore-enterprise-dataload-example) below.

### Scans in air-gapped environments are supported

You can run Anchore Enterprise scans in air-gapped environments. For more information, go to the Anchore Enterprise documentation:

- [Running Anchore Enterprise in an Air-Gapped Environment](https://docs.anchore.com/3.0/docs/overview/air_gapped)
- [Anchore Enterprise Feeds](https://docs.anchore.com/current/docs/overview/feeds)


### Docker-in-Docker requirements


import StoDinDRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/dind-bg-step.md';


<StoDinDRequirements />

:::note
You might want to increase the resource limits for your Docker-in-Docker background step. This can speed up your scan times, especially for large scans. 

In the pipeline examples below, the Docker-in-Docker step has resource limits of 2048Mi and 1000m. 
:::


### Root access requirements


import StoRootRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/root-access-requirements.md';


<StoRootRequirements />

### For more information


import StoMoreInfo from '/docs/security-testing-orchestration/sto-techref-category/shared/_more-information.md';


<StoMoreInfo />

<!-- step-palette 

## Anchore Enterprise step configuration

The recommended workflow is add a Anchore Enterprise step to a Security Tests or CI Build stage and then configure it as described below. 

### Scan settings

<a name="scan-mode"></a>

#### Scan Mode


import StoSettingScanMode from './shared/step_palette/_sto-ref-ui-scan-mode.md';
import StoSettingScanModeOrch from './shared/step_palette//_sto-ref-ui-scan-mode-00-orchestrated.md';
import StoSettingScanModeData from './shared/step_palette/_sto-ref-ui-scan-mode-01-dataload.md';
import StoSettingScanModeIngest from './shared/step_palette/_sto-ref-ui-scan-mode-02-ingestonly.md';


<StoSettingScanMode />
<StoSettingScanModeOrch />
<StoSettingScanModeData />
<StoSettingScanModeIngest />


#### Scan Configuration


import StoSettingProductConfigName from './shared/step_palette/_sto-ref-ui-product-config-name.md';


<StoSettingProductConfigName />


### Target

#### Type


import StoSettingScanTypeCont     from './shared/step_palette/_sto-ref-ui-scan-type-01-container.md';


<a name="scan-type"></a>
<StoSettingScanTypeCont />

#### Name 


import StoSettingProductID from './shared/step_palette/_sto-ref-ui-prod-id.md';


<StoSettingProductID />

<a name="target-variant"></a>

#### Variant


import StoSettingTargetVariant from './shared/step_palette/_sto-ref-ui-target-variant.md';


<StoSettingTargetVariant  />

#### Workspace


import StoSettingTargetWorkspace from './shared/step_palette/_sto-ref-ui-target-workspace.md';


<StoSettingTargetWorkspace  />

### Container Image


<a name="container-type"></a>

#### Type  (_orchestration_)


import StoSettingImageType from './shared/step_palette/_sto-ref-ui-image-type.md';


<StoSettingImageType />




<a name="container-domain"></a>

#### Domain (_extraction_)



import StoSettingImageDomain from './shared/step_palette/_sto-ref-ui-image-domain.md';


<StoSettingImageDomain />


<a name="container-name"></a>

#### Name


import StoSettingImageName from './shared/step_palette/_sto-ref-ui-image-name.md';


<StoSettingImageName />




<a name="container-tag"></a>

#### Tag


import StoSettingImageTag from './shared/step_palette/_sto-ref-ui-image-tag.md';


<StoSettingImageTag />


#### Access ID


import StoSettingImageAccessID from './shared/step_palette/_sto-ref-ui-image-access-id.md';


<StoSettingImageAccessID />

#### Access Token


import StoSettingImageAccessToken from './shared/step_palette/_sto-ref-ui-image-access-token.md';


<StoSettingImageAccessToken />


### Ingestion File


import StoSettingIngestionFile from './shared/step_palette/_sto-ref-ui-ingestion-file.md';


<StoSettingIngestionFile  />


### Authentication


<a name="auth-domain"></a>

#### Domain

The fully-qualified URL to the scanner API, for example `https://anchore.company.io/api` or `http://192.0.2.1:8228`



<StoSettingAuthDomain />


#### Access ID


import StoSettingAuthAccessID from './shared/step_palette/_sto-ref-ui-auth-access-id.md';


<StoSettingAuthAccessID />



#### Access Token


import StoSettingAuthAccessToken from './shared/step_palette/_sto-ref-ui-auth-access-token.md';


<StoSettingAuthAccessToken />

### Scan Tool



#### Image Name

For Extraction scans, the name of the image that you want to extract from Anchore. 


### Log Level, CLI flags, and Fail on Severity

<a name="log-level"></a>

#### Log Level


import StoSettingLogLevel from './shared/step_palette/_sto-ref-ui-log-level.md';


<StoSettingLogLevel />

<a name="cli-flags"></a>

#### Additional CLI flags

You can use this field to run the Anchore Enterprise CLI with specific command-line arguments. For example, specify `tool_args` : `--force`. 

For specific information, go to the [Anchor Enterprise documentation](https://docs.anchore.com).


<a name="fail-on-severity"></a>

#### Fail on Severity


import StoSettingFailOnSeverity from './shared/step_palette/_sto-ref-ui-fail-on-severity.md';

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

* [Conditional Execution](/docs/platform/pipelines/w_pipeline-steps-reference/step-skip-condition-settings)
* [Failure Strategy](/docs/platform/pipelines/w_pipeline-steps-reference/step-failure-strategy-settings)
* [Looping Strategy](/docs/platform/pipelines/looping-strategies/looping-strategies-matrix-repeat-and-parallelism)
* [Policy Enforcement](/docs/platform/governance/Policy-as-code/harness-governance-overview)

<!--  /step-palette -->



## Security step settings for Anchore Enterprise scans in STO

<!-- step-palette -->
:::note
You need to use a Security step to set up an Anchore Enterprise integration. An Anchore Enterprise scanner template is under development and will be available soon. 
:::

/step-palette -->

To set up your Anchore Enterprise integration with a Security step, do the following: 

1. Create a CI Build or Security Tests stage
2. Add a Security step.
3. Add the following `setting:value` pairs to the Security step.


* `product_name` : `anchore`
* [`scan_type`](#scanner-categories) : `containerImage`
* `product_config_name` = `default`

* [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods) : `orchestratedScan`, `dataLoad`, or `ingestionOnly`. 
* When [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods) is set to `orchestratedScan` or `dataLoad`:
	+ `product_domain` : The fully-qualified URL to the scanner API, for example https://anchore.company.io/api or http://192.0.2.1:8228
	+ `product_access_id` : Username to log in to the scanner.
	+ `product_access_token` : The access token to log in to the scanner. In most cases this is a password or an API key. 
	  You should create a Harness text secret with your encrypted token and reference the secret using the format `<+secrets.getValue("project.container-access-id")>`. For more information, go to [Add and Reference Text Secrets](/docs/platform/secrets/add-use-text-secrets).
* When [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods) is set to `dataLoad`:
	+ `product_image_name` : The name of the image that you want to extract from Anchore.
* When [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods) is set to `orchestratedScan`:
	+ `container_project` — The image owner and project, for example `harness/delegate`

* [`fail_on_severity`](#fail-on-severity)
+ `tool_args`
	You can use this field to run the [Anchore Enterprise CLI](https://docs.anchore.com/current/docs/using/cli_usage/images/) with specific command-line arguments. For example, specify `tool_args` : `--force`. 


### Container image settings (required)

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

<!-- step-palette -->
### Fail on Severity


import StoSettingFailOnSeverity from './shared/step_palette/_sto-ref-ui-fail-on-severity.md';

<StoSettingFailOnSeverity />

<!-- /step-palette -->

## Anchore Enterprise orchestration example

This example uses a Security step in Orchestration mode to scan a repository. The pipeline has one SecurityTests stage with two steps:

1. A Background step that runs Docker-in-Docker. This is [required](#docker-in-docker-requirements) to scan container images.
2. A Security step that does the following:

   1. Extracts the `owasp/nettacker:latest` image from Anchore Enterprise.
   2. Logs in to the Anchore Enterprise API based on the `product_domain`, `product_access_id`, `product_access_token` settings.
   3. Launches an orchestrated scan of the `owasp/nettacker` project in Anchore Enterprise and gets the scan results from the Anchore server. 
   4. Deduplicates and normalizes the scan data and ingests it into STO.

<details>
<summary>Anchore Enterprise dataload ingestion pipeline example</summary>

```yaml

pipeline:
  allowStageExecutions: false
  projectIdentifier: STO
  orgIdentifier: default
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
              connectorRef: K8S_DELEGATE_CONNECTOR
              namespace: harness-delegate-ng
              automountServiceAccountToken: true
              nodeSelector: {}
              containerSecurityContext:
                privileged: true
              os: Linux
          sharedPaths:
            - /var/run
            - /shared/customer_artifacts
          execution:
            steps:
              - step:
                  type: Background
                  name: Background_1
                  identifier: Background_1
                  spec:
                    connectorRef: CONTAINER_IMAGE_REGISTRY_CONNECTOR
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
                      policy_type: orchestratedScan
                      scan_type: container
                      product_name: anchore
                      product_config_name: default
                      container_domain: docker.io
                      container_project: owasp/nettacker
                      container_tag: latest
                      product_domain: https://anchore.qa.harness.io/api
                      container_type: docker_v2
                      product_access_id: aubrey.klaft@harness.io
                      product_access_token: <+secrets.getValue("anchoretoken")>
                      LOG_LEVEL: debug
                    imagePullPolicy: Always
          caching:
            enabled: false
            paths: []
          slsa_provenance:
            enabled: false
        variables:
          - name: runner_tag
            type: String
            value: dev
  identifier: anchore_scan
  name: anchore scan



```

</details>

## Anchore Enterprise dataLoad example

This example uses a Security step in Orchestration mode to scan a repository. The pipeline has one SecurityTests stage with two steps:

1. A Background step that runs Docker-in-Docker. This is [required](#docker-in-docker-requirements) to scan container images.
2. A Security step that does the following:

   1. Extracts the `owasp/nettacker:latest` image from Anchore Enterprise.
   2. Logs in to the Anchore Enterprise API based on the `product_domain`, `product_access_id`, `product_access_token` settings.
   3. Scans the extracted image.
   4. Deduplicates and normalizes the scan data and ingests it into STO. 

Note that in this example, the resource limages for the Security step are increased to ensure that the container used to run the scan has enough memory and CPU.

<details>
<summary>Anchore Enterprise dataload ingestion pipeline example</summary>

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
              connectorRef: K8S_DELEGATE_CONNECTOR
              namespace: harness-delegate-ng
              automountServiceAccountToken: true
              nodeSelector: {}
              containerSecurityContext:
                privileged: true
              os: Linux
          sharedPaths:
            - /var/run
            - /shared/customer_artifacts
          execution:
            steps:
              - step:
                  type: Background
                  name: Background_1
                  identifier: Background_1
                  spec:
                    connectorRef: CONTAINER_IMAGE_REGISTRY_CONNECTOR
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

</details>

