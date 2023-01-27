---
sidebar_position: 120
description: Create a CI pipeline that runs a maven test and generates an allure report that you can view in the Harness UI.
keywords: [Hosted Build, Continuous Integration, Hosted, CI Tutorial, maven, Allure]
---

# Publish an allure report to the Artifacts tab 

This tutorial provides an example pipeline that builds a Java maven application and generates an allure report that you can view in the Harness UI. 

:::note

Artifact tab publishing is supported in Kubernetes infrastructure only.

:::

### Pipeline workflow 

This pipeline has five steps that do the following: 

1. Runs the Maven tests present in the project. 

2. Generates the allure report using the `allure-results` generated as part of step 1. The Allure tool is present in the `solutis/allure:2.9.0` docker image used as part of the step.

3. Combines the allure report to a single HTML file.
   
   Viewing an allure report in browser requires running a web server via `allure open` command. But this won't allow viewing the report after the CI pipeline is complete.

   We will use [allure-combine](https://pypi.org/project/allure-combine/) tool to convert the allure report into a single HTML file. Running `allure-combine .` inside `allure-report` will generate `complete.html` file. This step uses `shubham149/allure-combine:latest` docker image with `allure-combine` tool present in it.

4. Publishes the report to a  Google Cloud Storage (GCS) bucket.
 
5. Uses static web hosting in GCS to display the allure report in the **Artifacts** tab. 
   
   `plugins/artifact-metadata-publisher` plugin adds the input urls to artifact tab in Harness UI.


### Pipeline requirements

To run this pipeline in your project, do the following.

1. Create a file secret with your GCP authorization credentials. Do the following:

  a. Run this command on the VM:
    ```
    gcloud auth application-default login
    ```
    This creates the following credentials file:  
    `/home/$(whoami)/.config/gcloud/application_default_credentials.json`
   b. Create a [Harness secret](/docs/platform/security/add-file-secrets) for this file. 
<!-- 
   b. Create a [Harness secret](/docs/platform/6_Security/3-add-file-secrets) for this file. 
 -->

2. Create the following connectors if you don't have them:

   -  [GitHub Connector](/docs/platform/connectors/add-a-git-hub-connector)
   - [GCP Connector](/docs/platform/connectors/connect-to-google-cloud-platform-gcp) 
      Use the file secret you just created for the GCP credentials.
   - [Docker Hub Connector](/docs/platform/connectors/ref-cloud-providers/docker-registry-connector-settings-reference)  
      You can choose to download Harness images from the [Harness Image Registry](/docs/platform/connectors/connect-to-harness-container-image-registry-using-docker-connector) instead of Docker Hub.

<!-- 
   -  [GitHub Connector](/docs/platform/7_Connectors/add-a-git-hub-connector)
   - [GCP Connector](/docs/platform/7_Connectors/connect-to-google-cloud-platform-gcp) 
      Use the file secret you just created for the GCP credentials.
   - [Docker Hub Connector](/docs/platform/7_Connectors/ref-cloud-providers/docker-registry-connector-settings-reference)  
      You can choose to download Harness images from the [Harness Image Registry](/docs/platform/7_Connectors/connect-to-harness-container-image-registry-using-docker-connector) instead of Docker Hub.
-->

3.  Create a [publicly available bucket in GCS](https://cloud.google.com/storage/docs/access-control/making-data-public#objects) to store the report. 

4.  Update the report URL in steps 4 and 5 with your GCS bucket name ($GCS_BUCKET_NAME).

### Pipeline template

```yaml
pipeline:
  name: "allure test report publisher "
  identifier: allure_test_report_publisher
  projectIdentifier: AllureReport
  orgIdentifier: default
  tags: {}
  properties:
    ci:
      codebase:
        connectorRef: $GITHUB_CONNECTOR
        repoName: allure-examples/allure-testng-example
        build: <+input>
  stages:
    - stage:
        name: Allure test publisher
        identifier: allure_test_publisher
        type: CI
        spec:
          cloneCodebase: true
          execution:
            steps:
# STEP 1: run Maven tests
              - step:               
                  type: Run
                  name: Run tests
                  identifier: tests
                  spec:
                    connectorRef: $HARNESS_IMAGE_CONNECTOR
                    image: openjdk:11
                    shell: Sh
                    command: ./mvnw clean test site
# STEP 2: Generate allure report
              - step:               
                  type: Run
                  name: allure
                  identifier: allure
                  spec:
                    connectorRef: $HARNESS_IMAGE_CONNECTOR
                    image: solutis/allure:2.9.0
                    command: |
                      cd target
                      allure generate allure-results --clean -o allure-report
# STEP 3: Combine allure report 
              - step:               
                  type: Run
                  name: combine report
                  identifier: allure_combine
                  spec:
                    connectorRef: $HARNESS_IMAGE_CONNECTOR
                    image: shubham149/allure-combine:latest
                    command: |
                      cd target/allure-report
                      allure-combine .
                      cd ../..
                      cp target/allure-report/complete.html .
# STEP 4: Upload to GPS
              - step:                
                  type: GCSUpload
                  name: upload-report
                  identifier: uploadreport
                  spec:
                    connectorRef: $GCP_CONNECTOR
                    bucket: demo-allure-report
                    sourcePath: target/$GCS_BUCKET_NAME/complete.html
                    target: <+pipeline.sequenceId>/index.html
# STEP 5: Publish upload report url in artifact tab
               - step:                 
                  type: Plugin
                  name: publish metadata for allure report
                  identifier: publish_allure_report_metadata
                  spec:
                    connectorRef: $HARNESS_IMAGE_CONNECTOR
                    image: plugins/artifact-metadata-publisher
                    settings:
                      file_urls: https://storage.googleapis.com/$GCS_BUCKET_NAME/<+pipeline.sequenceId>/index.html
                      artifact_file: artifact.txt
          serviceDependencies: []
          infrastructure:
            type: KubernetesDirect
            spec:
              connectorRef: $KUBERNETES_DELEGATE_CONNECTOR
              namespace: harness-delegate-prod
```