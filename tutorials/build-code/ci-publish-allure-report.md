# Publish allure report to artifact tab

In this tutorial, you will create a Harness CI pipeline for a Java maven application that does the following:
1. Runs maven test and generate allure report
2. Combine the allure report to a single html file
3. Publish the report to GCS and use static web hosting in GCS to display the allure report in artifact tab

:::note

Artifact tab publishing is supported in Kubernetes infrastructure only.

:::

## Pipeline

#### Step 1: Run maven test

Runs the tests present in maven project.

#### Step 2: Generate allure report

Generates the allure report using the `allure-results` generated as part of step 1. Allure tool is present in `solutis/allure:2.9.0` docker image used as part of the step.

#### Step 3: Combine allure report

Viewing an allure report in browser requires running a web server via `allure open` command. But this won't allow viewing the report after the CI pipeline is complete.

We will use [allure-combine](https://pypi.org/project/allure-combine/) tool to convert the allure report into a single HTML file. Running `allure-combine .` inside `allure-report` will generate `complete.html` file. This step uses `shubham149/allure-combine:latest` docker image with `allure-combine` tool present in it.

#### Step 4: Upload to GCS

Uploads the combined Allure HTML report to GCS. It is required to make the GCS bucket public in order to view the uploaded file directly in browser.

#### Step 5: Publish upload report url in artifact tab

`plugins/artifact-metadata-publisher` plugin adds the input urls to artifact tab in Harness UI.

We have provided URL of html file uploaded as part of step 4 to the plugin to show the report URL in artifacts tab. On clicking the URL in artifact tab, it displays the allure report in browser.

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
        connectorRef: Github
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
              - step:
                  type: Run
                  name: Run tests
                  identifier: tests
                  spec:
                    connectorRef: harnessImage
                    image: openjdk:11
                    shell: Sh
                    command: ./mvnw clean test site
              - step:
                  type: Run
                  name: allure
                  identifier: allure
                  spec:
                    connectorRef: harnessImage
                    image: solutis/allure:2.9.0
                    command: |
                      cd target
                      allure generate allure-results --clean -o allure-report
              - step:
                  type: Run
                  name: combine report
                  identifier: allure_combine
                  spec:
                    connectorRef: harnessImage
                    image: shubham149/allure-combine:latest
                    command: |
                      cd target/allure-report
                      allure-combine .
                      cd ../..
                      cp target/allure-report/complete.html .
              - step:
                  type: GCSUpload
                  name: upload-report
                  identifier: uploadreport
                  spec:
                    connectorRef: gcpconnector
                    bucket: demo-allure-report
                    sourcePath: target/allure-report/complete.html
                    target: <+pipeline.sequenceId>/index.html
              - step:
                  type: Plugin
                  name: publish metadata for allure report
                  identifier: publish_allure_report_metadata
                  spec:
                    connectorRef: harnessImage
                    image: plugins/artifact-metadata-publisher
                    settings:
                      file_urls: https://storage.googleapis.com/demo-allure-report/<+pipeline.sequenceId>/index.html
                      artifact_file: artifact.txt
          serviceDependencies: []
          infrastructure:
            type: KubernetesDirect
            spec:
              connectorRef: k8connector
              namespace: harness-delegate-prod
```