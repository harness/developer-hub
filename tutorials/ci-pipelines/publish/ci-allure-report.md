---
title: Artifacts tab
sidebar_position: 3
description: You can publish any URL to the Artifacts tab.
keywords: [Hosted Build, Continuous Integration, Hosted, CI Tutorial, maven, Allure]
slug: /ci-pipelines/publish/artifacts-tab
---

# Publish any URL to the Artifacts tab

<ctabanner
  buttonText="Learn More"
  title="Continue your learning journey."
  tagline="Take a Continuous Integration Certification today!"
  link="/certifications/continuous-integration"
  closable={true}
  target="_self"
/>

You can publish any URL to the **Artifacts** tab on the [Build details page](/docs/continuous-integration/use-ci/viewing-builds). This tutorial demonstrates how to do this by creating an example pipeline that builds a Java Maven application and generates an Allure Report that you can view in the Harness UI.

### Pipeline workflow 

This pipeline has five steps that do the following: 

1. Runs the Maven tests present in the project. 

2. Generates the Allure Report using the `allure-results` generated as part of step 1. The Allure tool is present in the `solutis/allure:2.9.0` Docker image used as part of the step.

3. Combines the Allure Report into a single HTML file.
   
   Viewing an Allure Report in a browser requires running a web server via the `allure open` command. But this won't allow viewing the report after the CI pipeline is complete.

   Use the [allure-combine](https://pypi.org/project/allure-combine/) tool to convert the Allure Report into a single HTML file. Running `allure-combine .` inside `allure-report` generates the `complete.html` file. This step uses the  `shubham149/allure-combine:latest` Docker image with the `allure-combine` tool present in it.

4. Publishes the report to a  Google Cloud Storage (GCS) bucket.
 
5. Uses static web hosting in GCS to display the Allure Report on the **Artifacts** tab. 
   
   The `plugins/artifact-metadata-publisher` plugin adds the input URLs to the **Artifacts** tab in the Harness UI.


### Pipeline requirements

To run this pipeline in your project, do the following.

1. Create a file secret with your GCP authorization credentials. Do the following:

  a. [Create a service account key](https://cloud.google.com/iam/docs/creating-managing-service-account-keys#creating) as described in the Google Cloud documentation. 

  b. Create a [Harness secret](/docs/platform/Secrets/add-file-secrets) for your key. 

1. Create the following connectors if you don't have them:

   - [GitHub Connector](/docs/platform/Connectors/Code-Repositories/ref-source-repo-provider/git-hub-connector-settings-reference)
   - [GCP Connector](/docs/platform/Connectors/Cloud-providers/connect-to-google-cloud-platform-gcp) 
      Use the file secret you just created for the GCP credentials.
   - [Docker Hub Connector](/docs/platform/Connectors/Cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference)  
      You can choose to download Harness images from the [Harness Image Registry](/docs/platform/Connectors/Artifact-Repositories/connect-to-harness-container-image-registry-using-docker-connector) instead of Docker Hub.

2.  Create a [publicly available bucket in GCS](https://cloud.google.com/storage/docs/access-control/making-data-public#objects) to store the report. 

3.  Update the report URL with your GCS bucket name. See `YOUR_GCS_BUCKET_NAME` in steps 4 and 5 in the YAML pipeline below.

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
        connectorRef: YOUR_GITHUB_CONNECTOR
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
                    connectorRef: YOUR_HARNESS_IMAGE_CONNECTOR
                    image: openjdk:11
                    shell: Sh
                    command: ./mvnw clean test site
# STEP 2: Generate allure report
              - step:               
                  type: Run
                  name: allure
                  identifier: allure
                  spec:
                    connectorRef: YOUR_HARNESS_IMAGE_CONNECTOR
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
                    connectorRef: YOUR_HARNESS_IMAGE_CONNECTOR
                    image: shubham149/allure-combine:latest
                    command: |
                      cd target/allure-report
                      allure-combine .
                      cd ../..
                      cp target/allure-report/complete.html .
# STEP 4: Upload to GCS
              - step:                
                  type: GCSUpload
                  name: upload-report
                  identifier: uploadreport
                  spec:
                    connectorRef: YOUR_GCP_CONNECTOR
                    bucket: demo-allure-report
                    sourcePath: target/YOUR_GCS_BUCKET_NAME/complete.html
                    target: <+pipeline.sequenceId>/index.html
# STEP 5: Publish upload report url in Artifacts tab
               - step:                 
                  type: Plugin
                  name: publish metadata for allure report
                  identifier: publish_allure_report_metadata
                  spec:
                    connectorRef: YOUR_HARNESS_IMAGE_CONNECTOR
                    image: plugins/artifact-metadata-publisher
                    settings:
                      file_urls: https://storage.googleapis.com/YOUR_GCS_BUCKET_NAME/<+pipeline.sequenceId>/index.html
                      artifact_file: artifact.txt
          infrastructure:
            type: KubernetesDirect
            spec:
              connectorRef: YOUR_KUBERNETES_DELEGATE_CONNECTOR
              namespace: harness-delegate-prod
```
