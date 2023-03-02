---
title: Enable Test Intelligence
description: Reduce test time by running only relevant tests.
sidebar_position: 10
helpdocs_topic_id: 428cs02e6u
helpdocs_category_id: 29nai2tbs6
helpdocs_is_private: false
helpdocs_is_published: true
---

Test Intelligence (TI) improves test time by running only the tests required to confirm the quality of the code changes that triggered the build. To learn more about how Test Intelligence works, go to [Test Intelligence Overview](../../ci-quickstarts/test-intelligence-concepts.md).

The **Run Tests** step executes one or more test on a container image. Adding the **Run Tests** step to a pipeline's **Build** stage enables Test Intelligence on that pipeline. The first time you enable Test Intelligence on a repo, you must use a webhook-based PR trigger to generate an initial call graph, which sets the baseline for intelligent test selection in future builds.

## Requirements

To enable Test Intelligence, you need a supported codebase and a CI pipeline with a **Build** stage that is connected to the codebase and build infrastructure.

<details>
<summary>Supported codebases</summary>

Test Intelligence is available for the following codebases:

* Java
* Kotlin
* .NET Core: Test Intelligence for .NET is behind the Feature Flag `TI_DOTNET`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.
* Scala

</details>

<details>
<summary>Add Build stage and connect codebase</summary>

Make sure you have a CI pipeline with a **Build** stage that is connected to your codebase.

If you haven't created a pipeline before, [Get started with the fastest CI on the planet](https://developer.harness.io/tutorials/build-code/fastest-ci).

To add a **Build** stage to an existing pipeline:
1. Go to the pipeline you want to edit.
2. In the Pipeline Studio, select **Add Stage**, and then select **Build**.
3. Enter a **Stage Name**, enable **Clone Codebase**, and then select **Set Up Stage**.

To check codebase configuration for existing pipelines, select **Codebase** while viewing the pipeline in the Pipeline Studio. For more information about codebase configuration, go to [Edit Codebase Configuration](../codebase-configuration/create-and-configure-a-codebase.md).

</details>

<details>
<summary>Define build infrastructure</summary>

1. In the Pipeline Studio, select the **Build** stage, and then select the **Infrastructure** tab.
2. Define the build farm for the codebase. For more information, go to [Set up build infrastructure](https://developer.harness.io/docs/category/set-up-build-infrastructure).

</details>

## Enable Test Intelligence

Use these steps to configure the **Run Tests** step and generate an initial call graph.

1. In the Pipeline Studio, select the **Build** stage, and then select the **Execution** tab.
2. Select **Add Step**, select **Add Step** again, and then select **Run Tests** from the **Step Library**.
3. At minimum, you must configure the following settings to enable Test Intelligence:
   * **Name**
   * **Container Registry**
   * **Image**
   * **Language**
   * **Build Tool**
   * **Build Arguments**
   * **Test Report Paths**
   * **Run Only Selected Tests**
   * **Packages:** Leave blank or provide a comma-separated list of source code package prefixes
   * **Test Annotations:** Leave blank or provide a comma-separated list of test annotations to use in unit testing. If you do not provide a list of test annotations, the default is `org.junit.Test, org.junit.jupiter.api.Test, org.testing.annotations.Test`.
   * **Namespaces:** For .NET C# only, supply a comma-separated list of namespace prefixes that you want to test.

   For more information about these settings, go to [Run Tests step settings](../../ci-technical-reference/configure-run-tests-step-settings.md).

<details>
<summary>YAML example</summary>

The following YAML example is for a pipeline that runs Test Intelligence on the Dubbo open-source project. You can use this YAML template to set up a pipeline with a Run Tests step. Make sure you complete the remaining steps in this procedure to generate the initial call graph.

```yaml
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

</details>

4. Select **Apply Changes** to save the step settings, and then select **Save** to save the pipeline.
5. The first time you enable Test Intelligence on a repo, you must run all tests to generate an initial call graph. This creates a baseline for test selection in future builds. To generate the initial call graph:
   1. [Add a webhook trigger](../../../platform/11_Triggers/triggering-pipelines.md) to the pipeline that listens for PRs to be opened against the pipeline's codebase.
   2. Open a PR against the pipeline's codebase. Make sure the build triggered by this PR runs all tests.
   3. Wait while the pipeline executes. To monitor the build's progress, go to **Builds** and select the build that the PR started.
   4. If the tests pass and the build succeeds, merge the PR.

## View test reports

To view the test report, go to the build details page and select **Tests**. The test report content is based on the tests you configured for the **Run Tests** step. In order for the **Tests** tab to show tests, your test reports must be in JUnit XML format. Harness parses test reports that are in JUnit XML format only.

![](./static/set-up-test-intelligence-03.png)

Expand the sections below to learn more about the test report contents.

<details>
<summary>Test Execution Overview</summary>

Provides an overview of **Total Tests**, number of **Selected Tests**, total **Duration** of all tests, and **Time Saved**.

**Duration** reflects the sum of CPU time taken for all tests to complete. The values are collected as-is from the JUnit report, and they don't correspond with wall-clock time. In contrast, the pipeline execution time is a measure of wall-clock time. Therefore, it is possible that the **Duration** may exceed the total pipeline execution time.

</details>

<details>
<summary>Test Execution Result</summary>

Graphical representation of successful and failed tests.

</details>

<details>
<summary>Test Selection Breakdown</summary>

Test Intelligence analyzes changes to source files and test files in the codebase and then runs only the tests that are relevant to the detected changes. This section reports how many tests ran based on the different the types of code changes included in this build:

* **Correlated with Code Changes**: The number of tests that ran due to changes in the codebase.
* **New Tests**: The number of tests that ran because they are new.
* **Updated Tests**: The number of tests that ran because there was a change to the actual test code or content.

</details>

<details>
<summary>Test Execution</summary>

Detailed list of all tests, including class methods and test methods.

Initially, the list shows only failed tests. To see all tests, toggle **Show all Tests**.

You can sort the list by failure rate, duration, and total tests. You can also expand test suites to see details about individual tests in that suite.

</details>

<details>
<summary>Call Graph</summary>

The first time you [Enable Test Intelligence](#enable-test-intelligence) on a repo, you must use a webhook-based PR trigger to run all tests and generate the initial call graph. This creates a baseline for test selection in future builds; therefore, the initial call graph is not particularly useful. In subsequent builds, the call graph shows information about tests selected by Test Intelligence for that run.

Select **Expand graph** to view the Test Intelligence Visualization, which shows why a specific test was selected and the reason behind every test selection. Purple nodes represent tests. Select any test (purple node) to see all the classes and methods covered by that test. Blue nodes represent changes to classes and methods that caused Test Intelligence to select that test.

![](./static/set-up-set-up-test-intelligence-531.png)

</details>
