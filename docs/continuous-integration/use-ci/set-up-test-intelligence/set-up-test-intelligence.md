---
title: Set up Test Intelligence
description: Test Intelligence improves test time by running only the tests required to confirm the quality of the code changes that triggered the build.
tags:
   - helpDocs
# sidebar_position: 2
helpdocs_topic_id: 428cs02e6u
helpdocs_category_id: 29nai2tbs6
helpdocs_is_private: false
helpdocs_is_published: true
---

Test Intelligence (TI) improves test time by running only the tests required to confirm the quality of the code changes that triggered the build. To learn more about how Test Intelligence works, go to [Test Intelligence Overview](../../ci-quickstarts/test-intelligence-concepts.md).

You can enable Test Intelligence by including a **Run Tests** step in your CI pipeline **Build** stages. This topic explains how to set up Test Intelligence in a Harness CI pipeline stage.

### Before you begin

You'll need a pipeline where you can enable Test Intelligence.

If you haven't created a pipeline before, try the [CI pipeline tutorial](../../ci-quickstarts/ci-pipeline-quickstart.md).

### Limitations

At this time, Test Intelligence supports the following codebases:

* Java
* Kotlin
* .NET Core
* Scala

Currently, Test Intelligence for .NET is behind the Feature Flag `TI_DOTNET`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

### Create the Build stage

Go to the pipeline where you want to enable Test Intelligence, and do one of the following:

* If the pipeline doesn't already have a **Build** stage:
   1. Select **Add Stage**, and then select **Build**.
   2. Input a **Stage Name**, enable **Clone Codebase**, and then select **Set Up Stage**.
* If the pipeline already has as **Build** stage, select **Codebase** to configure the pipeline's codebase settings.

For more information, go to [Edit Codebase Configuration](../codebase-configuration/create-and-configure-a-codebase.md).

### Define the build farm infrastructure

1. Select your **Build** stage, and then select the **Infrastructure** tab.
2. Define the build farm for the codebase. For more information, go to [Set up build infrastructure](https://developer.harness.io/docs/category/set-up-build-infrastructure).

### Configure a Run Tests step

The **Run Tests** step executes one or more commands on a container image.

1. Go to the **Build** stage's **Execution** tab.
2. Select **Add Step**, select **Add Step** again, and then select **Run Tests** from the **Step Library**.
3. Complete the **Configure Run Tests Step** fields as follows:
   1. **Name**: Input a unique name for the step.
   2. **Description**: Input a description for the step.
   3. **Container Registry**: Select a container registry connector. This is the container registry, such as DockerHub, where Harness pulls the image on which it runs build commands. This is optional for stages that use Harness Cloud build infrastructure.
   4. **Image**: The name of the Docker image to use for running the build commands. Enter a Fully Qualified Image Name (FQIN) when using a private container registry. This is optional for stages that use Harness Cloud build infrastructure.
   5. **Language**: Select the source code language to build.
   6. **Build Tool**: Select the build automation tool. Supported tools vary by **Language**. For example, Harness supports [Bazel](https://bazel.build/), [Maven](https://maven.apache.org/), and [Gradle](https://gradle.org/) for **Java** and [NET CLI](https://docs.microsoft.com/en-us/dotnet/core/tools/) and [Nunit](https://nunit.org/) for **.NET:** .
   7. **Build Arguments**: Input the [arguments](../../ci-technical-reference/configure-run-tests-step-settings.md) for the build tool. These are used as input for the chosen build tool.
   8. **Test Report Paths**: Input one or more test report paths.
4. Expand **Additional Configuration** and complete these fields:
   1. **Packages**: Leave blank or provide a comma-separated list of source code package prefixes, such as `com.company., io.company.migrations`. If blank, Harness auto-detects the packages.
   2. **Test Annotations**: Provide a comma-separated list of test annotations used in unit testing. Any method with a specified annotation is treated as a test method. The defaults are: `org.junit.Test, org.junit.jupiter.api.Test, org.testing.annotations.Test`
   3. **Namespaces**: For .NET C# only, supply a comma-separated list of namespace prefixes that you want to test.
1. Select **Apply Changes** to save the step settings, and then select **Save** to save the pipeline.

![](./static/set-up-test-intelligence-02.png)

For more information about all **Run Tests** step settings, go to [Run Tests step settings](../../ci-technical-reference/configure-run-tests-step-settings.md).

### Perform the bootstrap

Bootstrapping generates the initial call graph for TI. Once the call graph is generated, TI can perform Test Selection.

To perform the bootstrap:
1. Add a webhook trigger to the pipeline. Webhook triggers start pipelines automatically in response to Git events. For instructions on configuring a webhook trigger, go to [Add a Trigger](../../../platform/11_Triggers/triggering-pipelines.md#step-1-add-a-trigger-to-a-pipeline).
2. Open a PR against the pipeline's codebase repo.

   :::caution

   Make sure that the build triggered by this PR runs all tests.

   :::

3. Merge the PR.

### View the test report

1. Wait while the pipeline executes. To monitor the build's progress, go to **Builds** and select the build that was started by the PR.
2. After the build succeeds, on the build details page, select **Tests**. **Tests** shows the test report for the test you configured for the **Run Tests** step. In order for the **Tests** tab to show tests, your test reports must be in JUnit XML format. Harness parses test reports that are in JUnit XML format only.

![](./static/set-up-test-intelligence-03.png)

The test report is comprised of the following sections:

#### Test Execution Overview

Displays an overview of **Total Tests**, number of **Selected Tests**, total **Duration** of all tests, and **Time Saved**.

**Duration** reflects the sum of CPU time taken for all tests to complete. The values are collected as-is from the JUnit report, and they don't correspond with wall clock time. In contrast, the pipeline execution time is a measure of wall clock time. Therefore, it is possible that the **Duration** may exceed the total pipeline execution time.

#### Test Execution Result

Displays a graphical representation of successful and failed tests.

#### Test Selection Breakdown

Test Intelligence makes decisions about which tests to run by assessing changes to source files and test files in the codebase.

- **Correlated with Code Changes**: The number of tests that Test Intelligence ran based on changes in the codebase
- **New Tests**: The number of tests that Test Intelligence ran because they are new
- **Updated Tests**: The number of tests that Test Intelligence ran because the tests themselves were changed

#### Test Execution

Displays the detailed list of all tests: class methods and test methods.

Initially, the list shows only failed tests. To see all tests, toggle **Show all Tests**.

You can sort the list by failure rate, duration, and total tests. You can also expand test suites to see details about individual tests in that suite.

#### Call Graph

A call graph is generated after completing the bootstrap.

In subsequent pipeline runs, the test report shows stats corresponding to the tests selected by Test Intelligence for that run.

Select **Expand graph** to display the Test Intelligence Visualization. Visualization shows why a specific test was selected and the reason behind every test selection. Purple nodes represent tests. Select any test (purple node) to see all the classes and methods covered by that test. Blue nodes represent changed classes and methods that caused Test Intelligence to select that test.

![](./static/set-up-set-up-test-intelligence-531.png)

### Reference: Test Intelligence pipeline configuration as code

This is a working example of Test Intelligence on the open-source project Dubbo. You can use this YAML template to configure a pipeline that uses Test Intelligence.

```
pipeline:
    name: ti-dubbo
    identifier: tidubbo
    properties:
        ci:
            codebase:
                connectorRef: account.howdi
                repoName: dubbo
                build: <+input>
    stages:
        - stage:
              name: unit-test
              identifier: unitteststi
              type: CI
              spec:
                  cloneCodebase: true
                  execution:
                      steps:
                          - step:
                                type: RunTests
                                name: runTestsWithIntelligence
                                identifier: runTestsWithIntelligence
                                spec:
                                    connectorRef: account.GCR
                                    image: maven:3-openjdk-8
                                    args: test -Dmaven.test.failure.ignore=true -DfailIfNoTests=false
                                    buildTool: Maven
                                    language: Java
                                    packages: org.apache.dubbo,com.alibaba.dubbo
                                    runOnlySelectedTests: true
                                    reports:
                                        type: JUnit
                                        spec:
                                            paths:
                                                - "**/*.xml"
                                    resources:
                                        limits:
                                            memory: 2Gi
                                            cpu: 2000m
                                timeout: 60m
                  serviceDependencies: []
                  infrastructure:
                      type: KubernetesDirect
                      spec:
                          connectorRef: Kubernetes_Quickstart
                          namespace: harness-delegate
              variables: []
    projectIdentifier: CI_Examples
    orgIdentifier: default
    description: TI for open source project dubbo
    tags: {}
```
### See also

* [Test Intelligence Concepts](../../ci-quickstarts/test-intelligence-concepts.md)
* [View Test Report](../view-your-builds/viewing-tests.md)

