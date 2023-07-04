---
title: Enable Test Intelligence
description: Reduce unit test time by running only relevant unit tests.
sidebar_position: 20
helpdocs_topic_id: 428cs02e6u
helpdocs_category_id: 29nai2tbs6
helpdocs_is_private: false
helpdocs_is_published: true
---

Test Intelligence (TI) improves unit test time by running only the unit tests required to confirm the quality of the code changes that triggered the build. To learn more about how Test Intelligence works, go to [Get started with Test Intelligence](../../ci-quickstarts/test-intelligence-concepts.md).

You must add the **Run Tests** step to a pipeline's **Build** stage to enable Test Intelligence on that pipeline. The **Run Tests** step executes one or more tests on a container image. The first time you enable Test Intelligence on a repo, you must use a webhook-based PR trigger to generate an initial call graph, which sets the baseline for intelligent test selection in future builds.

You can also [enable test splitting for Test Intelligence](#enable-parallelism-test-splitting-for-test-intelligence) to further optimize your tests.

## Requirements

To enable Test Intelligence, you need a CI pipeline with a **Build** stage that is connected to a supported codebase. If you haven't created a pipeline before, go to [CI pipeline creation overview](../prep-ci-pipeline-components.md).

:::info Supported codebases

Test Intelligence is available for the following codebases:

* Java
* Kotlin
* Scala
* C# .NET Core, <!--Framework, -->NUnit
  * Test Intelligence for .NET is behind the Feature Flag `TI_DOTNET`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.<!-- * Framework is supported on Windows [VM build infrastructures](/docs/category/set-up-vm-build-infrastructures/) only, and you must specify the [build environment](/docs/continuous-integration/use-ci/set-up-test-intelligence/configure-run-tests-step-settings#build-environment) in your pipeline's YAML. -->

:::

## Add the Run Tests step

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```
```mdx-code-block
<Tabs>
  <TabItem value="Visual" label="Visual">
```
Add the **Run Tests** step to the **Build** stage. To run tests with Test Intelligence, configure the step as follows:

* Provide a **Name**.
* Define one or more **Test Report Paths**. JUnit XML format is required. For details about formatting test reports, go to [Format test reports](./test-report-ref.md).
* Select **Run Only Selected Tests**.
* Specify the **Language**, **Build Tool**, **Build Arguments**, and other language- or tool-specific settings as described in the [Run Tests step settings reference](./configure-run-tests-step-settings.md).
* Specify the **Container Registry** and **Image**, if required by the build infrastructure.
* Specify other settings as necessary. For information about all **Run Tests** step settings, go to the [Run Tests step settings reference](./configure-run-tests-step-settings.md).

After adding the **Run Tests** step, make sure you [generate the initial call graph](#generate-the-initial-call-graph).

```mdx-code-block
  </TabItem>
  <TabItem value="YAML" label="YAML" default>
```

Add a `RunTests` step to your pipeline's `CI` stage. To run tests with Test Intelligence, configure the step as follows:

* `type: RunTests`
* `name:` Enter a name for the step.
* `reports:` Specify one or more report paths. JUnit XML format is required. For details about formatting test reports, go to [Format test reports](./test-report-ref.md).
* `runOnlySelectedTests: true`
* `language`, `buildTool`, `args`, and other language- or tool-specific settings as described in the [Run Tests step settings reference](./configure-run-tests-step-settings.md).
* `connectorRef` and `image`: Specify if required by the build infrastructure.
* Specify other settings as necessary. For information about all `RunTests` step settings, go to the [Run Tests step settings reference](./configure-run-tests-step-settings.md).

The following YAML example defines a `RunTests` step for Java with Maven.

```yaml
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
                                                - "target/surefire-reports/*.xml"
```

After adding the `RunTests` step, make sure you [generate the initial call graph](#generate-the-initial-call-graph).

```mdx-code-block
  </TabItem>
</Tabs>
```

<details>
<summary>Pipeline YAML example</summary>

The following YAML example shows a pipeline that runs tests with Test Intelligence.

```yaml
pipeline:
  name: Test Intelligence Demo
  identifier: testintelligencedemo
  projectIdentifier: [project-ID]
  orgIdentifier: default
  description: This pipeline demonstrates using Harness Test Intelligence to speed up Java Maven tests.
  properties:
    ci:
      codebase:
        build: <+input>
        connectorRef: [code-repo-connector-ID]
  stages:
    - stage:
        type: CI
        identifier: Build_and_Test
        name: Build and Test
        spec:
          cloneCodebase: true
          execution:
            steps:
              - step:
                  identifier: Run_Tests_with_Intelligence
                  name: Run Tests with Intelligence
                  spec:
                    args: test -Dmaven.test.failure.ignore=true -DfailIfNoTests=false -T 16C -fae
                    buildTool: Maven
                    envVariables:
                      HARNESS_STAGE_INDEX: <+strategy.iteration>
                      HARNESS_STAGE_TOTAL: <+strategy.iterations>
                    language: Java
                    preCommand: |-
                      echo $HARNESS_STAGE_INDEX
                      echo $HARNESS_STAGE_TOTAL
                    reports:
                      spec:
                        paths:
                          - "target/surefire-reports/*.xml"
                      type: JUnit
                    runOnlySelectedTests: true
                  type: RunTests
          platform:
            arch: Amd64
            os: Linux
          runtime:
            spec: {}
            type: Cloud
```

</details>

## Generate the initial call graph

The first time you enable Test Intelligence on a repo, you must run all tests to generate an initial call graph. This creates a baseline for test selection in future builds. To generate the initial call graph:

1. [Add a webhook trigger](../../../platform/11_Triggers/triggering-pipelines.md) to the pipeline that listens for PRs to be opened against the pipeline's codebase.
2. Open a PR against the pipeline's codebase. Make sure the build triggered by this PR runs all tests.
3. Wait while the pipeline executes. To monitor the build's progress, go to **Builds** and select the build that the PR started.
4. If the tests pass and the build succeeds, merge the PR.

## View test reports

To view the test report, go to the [Tests tab](./viewing-tests.md) on the [Build details page](../viewing-builds.md). The test report content is based on the tests you configured for the **Run Tests** step.

In order for the **Tests** tab to show tests, your test reports must be in JUnit XML format, because Harness parses test reports that are in JUnit XML format only. For more information about formatting unit test reports, go to [Format test reports](./test-report-ref.md).

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

The first time you enable Test Intelligence on a repo, you must use a webhook-based PR trigger to run all tests and [generate the initial call graph](#generate-the-initial-call-graph). This creates a baseline for test selection in future builds; therefore, the initial call graph is not particularly useful. In subsequent builds, the call graph shows information about tests selected by Test Intelligence for that run.

Select **Expand graph** to view the Test Intelligence Visualization, which shows why a specific test was selected and the reason behind every test selection. Purple nodes represent tests. Select any test (purple node) to see all the classes and methods covered by that test. Blue nodes represent changes to classes and methods that caused Test Intelligence to select that test.

![](./static/set-up-set-up-test-intelligence-531.png)

</details>

## Enable parallelism (test splitting) for Test Intelligence

Similar to how you can use `parallelism` and `split_tests` to [define test splitting in a Run step](/docs/platform/pipelines/speed-up-ci-test-pipelines-using-parallelism/#define-test-splitting), you can enable parallelism and test splitting in your Run Tests steps to further reduce the time required for your tests to run.

With parallelism alone, you specify how you want Harness to divide the work for a step or stage. When you use parallelism and test splitting with Test Intelligence, Harness divides the work after test selection. This means that your Run Tests execution time is reduced by both test selection and parallelism.

<details>
<summary>Test Intelligence with test splitting demonstration</summary>

Suppose you have a pipeline that runs 100 tests, and each test takes about one second to run. Here's how TI and parallelism can reduce your test times:

* By default, without TI or parallelism, all 100 tests run in sequence, taking 100 seconds.
* With TI, test selection reduces the number of tests based on the detected changes. Supposing only 20 out of the 100 tests are required, the build with TI runs 20 tests in sequence, taking 20 seconds. This reduces test run time by 80%.
* With TI and parallelism, the selected tests are divided into a number of workloads. Supposing a maximum of four workloads and 20 selected tests, the 20 tests are split into four concurrently-running groups. It takes only five seconds to run the tests, reducing test run time by 95% compared to the default.

</details>

To enable parallelism for Test Intelligence, you must set a parallelism `strategy` on either the Run Tests step or the stage where you have the Run Tests step, and you must add the `enableTestSplitting` parameter to your Run Tests step's `spec`. You can also add the optional parameter `testSplitStrategy`.

1. Go to the pipeline where you want to enable parallelism for Test Intelligence.
2. [Define the parallelism strategy](/docs/platform/Pipelines/speed-up-ci-test-pipelines-using-parallelism#define-the-parallelism-strategy) on either the stage where you have the Run Tests step or on the Run Tests step itself. You must include `strategy:parallelism`. Other options, such as `maxConcurrency` are optional. For example:

   ```yaml
        strategy:
          parallelism: 5
   ```

   You can do this in either the visual or YAML editor. In the visual editor, **Parallelism** is found under **Looping Strategy** in the stage's or step's **Advanced** settings.

   :::caution

   If you use step-level parallelism, you must ensure that your test runners won't interfere with each other, because all parallel steps work on the same directory.

   :::

3. Switch to the YAML editor, if you were not already using it.
4. Find the `RunTests` step, and then find the `spec` section.
5. Add the `enableTestSplitting` parameter and the optional `testSplitStrategy` parameter. You must set `enableTestSplitting` to `true`.

   The `testSplitStrategy` parameter is optional. If you include it, you can choose either `TestCount` or `ClassTiming`. Class timing uses test times from previous runs to determine how to split the test workload for the current build. Test count uses simple division to split the tests into workloads. The default is `ClassTiming` if you omit this parameter.

   The maximum number of workloads is determined by the parallelism `strategy` you specified on the step or stage. For example, if you set `parallelism: 5`, tests are split into a maximum of five workloads.

   Here is a truncated YAML example of a Run Tests step with `enableTestSplitting` and `testSplitStrategy`:

   ```yaml
   - step:
       type: RunTests
       name: Run Test With Intelligence
       identifier: run-tests-with-intelligence
       spec:
         enableTestSplitting: true
         testSplitStrategy: ClassTiming
   ```

6. Save and run your pipeline.

Note that while parallelism for Test Intelligence can improve the total time it takes to run all tests, some tests may still take a long time to run if, by their nature, they are intensive, long-running tests.

<details>
<summary>YAML example: Build stage with Test Intelligence and test splitting</summary>

```yaml
    - stage:
        type: CI
        identifier: Build_and_Test
        name: Build and Test
        spec:
          cloneCodebase: true
          execution:
            steps:
              - step:
                  identifier: Run_Tests_with_Intelligence
                  name: Run Tests with Intelligence
                  spec:
                    args: test -Dmaven.test.failure.ignore=true -DfailIfNoTests=false -T 16C -fae
                    buildTool: Maven
                    enableTestSplitting: true
                    envVariables:
                      HARNESS_STAGE_INDEX: <+strategy.iteration>
                      HARNESS_STAGE_TOTAL: <+strategy.iterations>
                    language: Java
                    preCommand: |-
                      echo $HARNESS_STAGE_INDEX
                      echo $HARNESS_STAGE_TOTAL
                    reports:
                      spec:
                        paths:
                          - "target/surefire-reports/*.xml"
                      type: JUnit
                    runOnlySelectedTests: true
                  type: RunTests
          platform:
            arch: Amd64
            os: Linux
          runtime:
            spec: {}
            type: Cloud
        strategy:
          parallelism: 3
```

</details>

## Ignore tests or files

If you want Test Intelligence to ignore certain tests or files, create a `.ticonfig.yaml` file in your codebase containing a list of tests and files to ignore, for example:

```yaml
config:
  ignore:
    - "README.md"
    - ".ticonfig.yaml"
    - "**/*.go"
    - "**/Dockerfile*"
    - "licenses/**/*"
    - "img/**/*"
```

## Troubleshooting

You may encounter the following issues when using Test Intelligence with Maven.

<details>
<summary>pom.xml includes argLine</summary>

If your `pom.xml` contains `argLine`, you must update the Java Agent as follows:

**Before:**

```
<argLine> something  
</argLine>
```

**After:**

```
<argLine> something -javaagent:/addon/bin/java-agent.jar=/addon/tmp/config.ini  
</argLine>
```

</details>

<details>
<summary>Jacoco/Surefire/Failsafe</summary>

If you're using Jacoco, Surefire, or Failsafe, make sure the `forkCount` is not set to `0`.

For example, the following configuration in `pom.xml` removes the `forkCount` setting and applies `useSystemClassLoader` as a workaround:

```
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-surefire-plugin</artifactId>
    <version>2.22.1</version>
    <configuration>
        <!--  <forkCount>0</forkCount> -->
        <useSystemClassLoader>false</useSystemClassLoader>
    </configuration>
</plugin>
```

</details>
