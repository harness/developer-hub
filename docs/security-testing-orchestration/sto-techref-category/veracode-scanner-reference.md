---
title: Veracode scanner reference for STO
description: Scan code repositories with Veracode.
sidebar_label: Veracode scanner reference
sidebar_position: 410
helpdocs_topic_id: cy0deg32w9
helpdocs_category_id: m01pu2ubai
helpdocs_is_private: false
helpdocs_is_published: true
---

Veracode is a popular tool for scanning code repositories for security issues and vulnerabilities. Veracode performs dynamic (automated penetration test) and static (automated code review) code analysis and finds security vulnerabilities that include malicious code as well as the absence of functionality that can lead to security breaches.


## Important notes for running Veracode scans in STO 

* Before you can ingest scan results, you must perform all the Veracode prerequisites for the repo that you're scanning. If you're scanning a Java repo, for example, the Veracode documentation outlines the specific packaging and compilation requirements for scanning your Java applications.  
For specific requirements, got to the [Veracode docs](https://docs.veracode.com) and search for *Veracode Packaging Requirements*.
* You also need access credentials so that STO can communicate with your Veracode instance. Harness recommends using API keys, not usernames and passwords, for your Veracode integrations  
For instructions, go to the [Veracode docs](https://docs.veracode.com) and search for *Generate Veracode API Credentials*.  
Harness recommends you create [text secrets](/docs/platform/secrets/add-use-text-secrets) for your authentication credentials — password, API key, API secret key, etc. — and access your secrets using `<+secrets.getValue("my-secret")>`.
<!-- invalid links: The [Veracode - Automated Data Load](https://community.harness.io/t/veracode-automated-data-load/1066) and [Veracode - Activate Scenario](https://community.harness.io/t/veracode-activate-scenario/1067) blog posts include useful information about how to ingest Veracode scan results into Harness. -->

### Root access requirements 

import StoRootRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/root-access-requirements-no-dind.md';

<StoRootRequirements />

### For more information


import StoMoreInfo from '/docs/security-testing-orchestration/sto-techref-category/shared/_more-information.md';


<StoMoreInfo />

## Required Settings for Veracode scans in STO

To set up a Veracode scan, add a Security step to your pipeline and add the following settings:

* `product_name` = `veracode`
* `scan_type` = `repository`
* `policy_type` — STO supports the following scan policy types for Veracode:
	+ `orchestratedScan`  — A Security step in the pipeline runs the scan and ingests the results. This is the easiest to set up and supports scans with default or predefined settings. See [Run an Orchestration Scan in an STO Pipeline](../use-sto/orchestrate-and-ingest/run-an-orchestrated-scan-in-sto.md).
	+ `ingestionOnly` — Run the scan in a Run step, or outside the pipeline, and then ingest the results. This is useful for advanced workflows that address specific security needs. See [Ingest scan results into an STO pipeline](../use-sto/orchestrate-and-ingest/ingest-scan-results-into-an-sto-pipeline.md).
	+ `dataLoad` — A Security step downloads and ingests results from an external scanner.
* `product_config_name` = `default`
* `repository_project` — The name of the repo that gets scanned as shown in the Veracode UI. You use the [Codebase Config object](../../continuous-integration/use-ci/codebase-configuration/create-and-configure-a-codebase.md) in the Harness pipeline to determine the URL of the repo to scan.  
In most cases, this should match the repo name used in your Git provider.
* `repository_branch` — The branch that gets reported in STO for the ingested results. You can specify a hardcoded string or use the runtime variable [`<+codebase.branch>`](/docs/continuous-integration/use-ci/codebase-configuration/built-in-cie-codebase-variables-reference#manual-branch-build-expressions). This sets the branch based on the user input or trigger payload at runtime.  
     In most cases, this field should match the name of Git branch that is getting scanned.
* `fail_on_severity` - See [Fail on Severity](#fail-on-severity).
* `product_auth_type`
	+ `apiKey` — Recommended.  
	Go to the [Veracode docs](https://docs.veracode.com) and search for *Generate Veracode API Credentials*.
	+ `usernamePassword`— Not recommended.
* `product_access_id`
	+ For `usernamePassword` authentication, this is your username.
	+ For `apiKey` authorization, this is your API key.
* `product_access_token`
	+ For `usernamePassword` authentication, this is your password.
	+ For `apiKey` authorization, this is your API Secret key.
* `product_app_id`  — The Veracode GUID, separated with hyphens, for the target application.  

   To determine the App ID, go to the home page for the Veracode app with the results you want to scan. The App ID is the string immediately after the port number in the URL. Thus, for the following app, you would specify `1973759`.  
    
   `https://analysiscenter.veracode.com/auth/index.jsp#HomeAppProfile:88881:1973759` 

   <!-- invalid link: The [Veracode - Automated Data Load](https://community.harness.io/t/veracode-automated-data-load/1066) blog post describes in more detail how you can find your application IDs and project names. -->

###  Ingestion settings


import StoLegacyIngest from './shared/legacy/_sto-ref-legacy-ingest.md';


<StoLegacyIngest />

### Fail on Severity

import StoSettingFailOnSeverity from './shared/step_palette/all/_fail-on-severity.md';


<StoSettingFailOnSeverity />

## Veracode pipeline example (dataLoad)

The following pipeline example illustrates a dataLoad workflow to ingest data from Veracode. It consists of two steps: 

1. A Background step that runs a Docker-in-Docker service (required if you're using a Security step to configure your integration). 

2. A Security step that specifies the information needed to ingest the scan results from the Veracode server.

![](./static/veracode-pipeline-example.png)


```yaml

pipeline:
  allowStageExecutions: false
  projectIdentifier: YOUR_PROJECT_ID
  orgIdentifier: YOUR_HARNESS_ORG_ID
  tags: {}
  stages:
    - stage:
        name: scan1
        identifier: build
        type: SecurityTests
        spec:
          cloneCodebase: false
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
                  type: Background
                  name: dind-bg-step
                  identifier: dindbgstep
                  spec:
                    connectorRef: YOUR_CONTAINER_IMAGE_REGISTRY_CONNECTOR_ID
                    image: docker:dind
                    shell: Sh
                    entrypoint:
                      - dockerd
              - step:
                  type: Security
                  name: Veracode
                  identifier: bandit
                  spec:
                    privileged: true
                    settings:
                      policy_type: dataLoad
                      scan_type: repository
                      repository_project: YOUR_VERACODE_REPOSITORY_PROJECT
                      repository_branch: YOUR_VERACODE_REPOSITORY_BRANCH
                      product_name: veracode
                      product_config_name: veracode-agent
                      product_access_token: <+secrets.getValue("YOUR_VERACODE_TOKEN_SECRET")>
                      product_access_id: <+secrets.getValue("YOUR_VERACODE_ID")>
                      product_app_id: YOUR_VERACODE_PRODUCT_APP_ID
                      product_auth_type: apiKey
                    imagePullPolicy: Always
        variables: []
  identifier: Veracodedataloadexample
  name: Veracode-dataload-example



```