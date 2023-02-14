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

To enable Test Intelligence, add a **Run Tests** step in a CI pipeline's **Build** stage.

## Requirements

To enable Test Intelligence, you need a supported codebase and a CI pipeline with a **Build** stage that is connected to the codebase and build infrastructure.

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```
```mdx-code-block
<Tabs>
  <TabItem value="codebase" label="Supported codebases" default>
```
Test Intelligence is available for the following codebases:

* Java
* Kotlin
* .NET Core: Test Intelligence for .NET is behind the Feature Flag `TI_DOTNET`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.
* Scala

```mdx-code-block
  </TabItem>
  <TabItem value="stage" label="Add build stage and connect codebase">
```

Make sure you have a CI pipeline with a **Build** stage that is connected to your codebase.

If you haven't created a pipeline before, [Get started with the fasted CI on the planet](https://developer.harness.io/tutorials/build-code/fastest-ci).

To add a **Build** stage to an existing pipeline:
1. Go to the pipeline you want to edit.
1. In the Pipeline Studio, select **Add Stage**, and then select **Build**.
2. Input a **Stage Name**, enable **Clone Codebase**, and then select **Set Up Stage**.

To check codebase configuration for existing pipelines, select **Codebase** while viewing the pipeline in the Pipeline Studio. For more information about codebase configuration, go to [Edit Codebase Configuration](../codebase-configuration/create-and-configure-a-codebase.md).

```mdx-code-block
  </TabItem>
  <TabItem value="infra" label="Define build infrastructure">
```

1. In the Pipeline Studio, select the **Build** stage, and then select the **Infrastructure** tab.
2. Define the build farm for the codebase. For more information, go to [Set up build infrastructure](https://developer.harness.io/docs/category/set-up-build-infrastructure).

```mdx-code-block
  </TabItem>
</Tabs>
```

## Enable Test Intelligence

The **Run Tests** step executes one or more commands on a container image. Adding this step to your pipeline's **Build** stage enables Test Intelligence.

1. In the Pipeline Studio, select the **Build** stage, and then select the **Execution** tab.
2. Select **Add Step**, select **Add Step** again, and then select **Run Tests** from the **Step Library**.
3. Configure the [Run Tests step settings](../../ci-technical-reference/configure-run-tests-step-settings.md) as follows:
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
5. Select **Apply Changes** to save the step settings, and then select **Save** to save the pipeline.
6. When you first enable Test Intelligence on a repo, you must run all tests to generate an initial call graph. This creates a baseline for test selection in future builds. To generate the initial call graph:
   1. [Add a webhook trigger](../../../platform/11_Triggers/triggering-pipelines.md) to the pipeline that listens for PR merge events.
   2. Open a PR against the pipeline's codebase. Make sure the build triggered by this PR runs all tests.
   3. Merge the PR.
   4. Wait while the pipeline executes. To monitor the build's progress, go to **Builds** and select the build that was started by the PR.

## View test reports

To view the test report, go to the build details page and select **Tests**. The test report content is based on the tests you configured for the **Run Tests** step. In order for the **Tests** tab to show tests, your test reports must be in JUnit XML format. Harness parses test reports that are in JUnit XML format only.

The test report is comprised of several sections.

![](./static/set-up-test-intelligence-03.png)

* **Test Execution Overview:** Overview of **Total Tests**, number of **Selected Tests**, total **Duration** of all tests, and **Time Saved**.
  * **Duration** reflects the sum of CPU time taken for all tests to complete. The values are collected as-is from the JUnit report, and they don't correspond with wall clock time. In contrast, the pipeline execution time is a measure of wall clock time. Therefore, it is possible that the **Duration** may exceed the total pipeline execution time.
* **Test Execution Result:** Graphical representation of successful and failed tests.
* **Test Selection Breakdown:** Test Intelligence analyzes changes to source files and test files in the codebase and then runs only those tests relevant to the detected changes. This section reports how many tests ran based on different the types of code changes included in this build.
  * **Correlated with Code Changes**: The number of tests that ran due to changes in the codebase.
  * **New Tests**: The number of tests that ran because they are new.
  * **Updated Tests**: The number of tests that ran because there was a change to the actual test code or content.
* **Test Execution:** Detailed list of all tests, including class methods and test methods.
  * Initially, the list shows only failed tests. To see all tests, toggle **Show all Tests**.
  * You can sort the list by failure rate, duration, and total tests. You can also expand test suites to see details about individual tests in that suite.
* **Call Graph:** The call graph is initially generated after completing the bootstrap. In subsequent builds, the test report shows stats corresponding to the tests selected by Test Intelligence for that run.
  * Select **Expand graph** to display the Test Intelligence Visualization, which shows why a specific test was selected and the reason behind every test selection.
  * Purple nodes represent tests. Select any test (purple node) to see all the classes and methods covered by that test.
  * Blue nodes represent changes to classes and methods that caused Test Intelligence to select that test.

![](./static/set-up-set-up-test-intelligence-531.png)

## YAML example

Here is an example of the YAML for a pipeline that runs Test Intelligence on the Dubbo open-source project. You can use this YAML template to configure a pipeline that uses Test Intelligence.

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
