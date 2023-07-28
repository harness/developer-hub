---
title: Enable Test Intelligence
description: Reduce unit test time by running only relevant unit tests.
sidebar_position: 20
helpdocs_topic_id: 428cs02e6u
helpdocs_category_id: 29nai2tbs6
helpdocs_is_private: false
helpdocs_is_published: true
---

:::info

Test Intelligence applies to unit testing only. For other types of tests, [use Run steps](../run-ci-scripts/run-step-settings.md) to run tests.

:::

Testing is an important part of Continuous Integration (CI). Testing safeguards the quality of your product before shipping. However, test cycles often involve many tests and it can take a significant amount of time for the tests to run. Additionally, the tests that run might be irrelevant to the code changes that triggered the build, and running all unit tests every time the code changes is expensive and time-consuming.

Harness Test Intelligence improves unit test time by running only the unit tests required to confirm the quality of the code changes that triggered the build. You can also use [parallelism (test splitting) with Test Intelligence](#enable-parallelism-test-splitting-for-test-intelligence) to further optimize your test times.

Using TI doesn't require you to change your build and test processes. To enable Test Intelligence, [add a Run Tests step](#add-the-run-tests-step) and [generate a call graph](#generate-the-initial-call-graph). The **Run Tests** step executes one or more tests on a container image. The first time you enable Test Intelligence on a repo, you must use a webhook-based PR trigger to generate an initial call graph, which sets the baseline for test selection in future builds.

<details>
<summary>Video summary</summary>

The following video walks you through setting up Test Intelligence in a Harness CI pipeline. The TI section starts after the 11 minute mark in the video.

<!-- Video:
https://harness-1.wistia.com/medias/rpv5vwzpxz-->
<docvideo src="https://www.youtube.com/embed/eAtIO4bJ3No" />

<!-- div class="hd--embed" data-provider="YouTube" data-thumbnail="https://i.ytimg.com/vi/kZmOCLCpvmk/hqdefault.jpg"><iframe width=" 480" height="270" src="https://www.youtube.com/embed/eAtIO4bJ3No" frameborder="0" allowfullscreen="allowfullscreen"></iframe></div -->

</details>

## How does Test Intelligence work?

Test Intelligence uses *test selection* to run only those tests that are relevant to code changes. This includes changes to your software's code as well as changes to your tests (new or modified tests). Instead of always running all unit tests, TI selects only the relevant subset of unit tests and skips the rest.

When you perform a pull request, TI uses the following metrics to select tests:

* **Changed code:** TI queries Git to learn exactly which code changed in a specific build. TI uses this data to select tests that are associated directly or indirectly with the source code changes. TI selects these tests as part of the subset of the tests run in the pipeline. TI skips tests that aren't needed because there were no relevant code change.
* **Changed tests:** When a test is changed, TI selects and runs that test, even if the code the test covers hasn't changed.
* **New tests:** When you add a new test, TI selects and runs that test. This ensures that the test is running successfully and also finds correlations between the new test and new/existing code.

TI is always up to date and syncs when you merge code to any branch.

After a build runs, Test Intelligence gives you full visibility into which tests were selected and why. This can help you identify negative trends and gain insights to improve test quality and coverage. You can find the Test results and the Test Intelligence call graph visualization on the **Build details** page. The call graph visualization shows the changed classes and methods that caused each test to be selected.

<!-- Test Intelligence architecture

Test Intelligence is comprised of a TI service, a Test Runner Agent, and the **Run Tests** step.

* **TI service:** The TI service manages the data about repositories, git-commit graphs, test results, and call graphs. When a build runs, TI service uses a list of added/modified files with the call graph to identify which tests to run.
  * The TI service can receive real-time Git webhook notifications for any commit or merge. The TI service pulls the Git commit-graph and other metadata from Git for test selection.
  * When the TI Test Runner Agent sends a call graph generated from a PR, the TI service keeps that data in a staging area in case the PR doesn't get merged into the target branch (such as `main`). Once the TI receives the merge notification from Git, it updates and inserts the partial call graph with the target branch's call graph.
* **Test Runner Agent:** The Test Runner Agent runs on the build infrastructure. It's responsible for communicating with the TI service. Whenever a **Run Tests** step initializes, the Test Runner Agent provides the TI service with the build number, commit-id, and other details, and the TI service returns the list of selected tests. The Test Runner Agent runs the selected tests. After all the tests run, the Agent parses the test results and uploads the results along with the newly-generated call graph.
* **Run Tests step:** While you can also run tests in a [Run step](../run-ci-scripts/run-step-settings.md), to enable Test Intelligence, you must use the **Run Tests** step.
   * The **Run Tests** step is similar to the **Run** step, and it accepts additional test-specific information, such as the programming language of the source code being tested, build tools, and other parameters.
   * TI identifies the programming language and uses the **Run Tests** step to run the selected tests in that step's container. The **Run Tests** step, through the Test Runner Agent, parses the test results and returns the results to the TI service.
-->

## Supported codebases

Test Intelligence supports the following codebases:

* Java
* Kotlin
* Scala
* C# (.NET Core, NUnit<!-- and Framework -->)

:::note

Currently, Test Intelligence for .NET is behind the feature flag `TI_DOTNET`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

<!-- Framework is supported on Windows [VM build infrastructures](/docs/category/set-up-vm-build-infrastructures/) only, and you must specify the [build environment](/docs/continuous-integration/use-ci/set-up-test-intelligence/configure-run-tests-step-settings#build-environment) in your pipeline's YAML. -->

:::

For unsupported codebases, [use Run steps](../run-ci-scripts/run-step-settings.md) to run tests.

## Add the Run Tests step

You need a [CI pipeline](../prep-ci-pipeline-components.md) with a [Build stage](../set-up-build-infrastructure/ci-stage-settings.md) where you'll add the **Run Tests** step. Your pipeline must be associated with a [supported codebase](#supported-codebases).

If you haven't created a pipeline before, try one of the [CI pipeline tutorials](../../ci-quickstarts/ci-pipeline-quickstart.md) or go to [CI pipeline creation overview](../prep-ci-pipeline-components.md).

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

## Enable parallelism (test splitting) for Test Intelligence

Similar to how you can use `parallelism` and `split_tests` to [define test splitting in a Run step](/docs/platform/pipelines/speed-up-ci-test-pipelines-using-parallelism/#define-test-splitting), you can enable parallelism and test splitting in your Run Tests steps to further reduce the time required for your tests to run.

With parallelism alone, you specify how you want Harness to divide the work for a step or stage. When you use parallelism and test splitting with Test Intelligence, Harness divides the work after test selection. This means that your Run Tests execution time is reduced by both test selection and parallelism.

<details>
<summary>Example: Time saved by combining Test Intelligence with test splitting</summary>

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

## View test reports

To view the test report, go to the [Tests tab](./viewing-tests.md) on the [Build details page](../viewing-builds.md). The test report content is based on the tests you configured for the **Run Tests** step.

![](./static/set-up-test-intelligence-03.png)

In order for the **Tests** tab to show tests, your test reports must be in JUnit XML format, because Harness parses test reports that are in JUnit XML format only. For more information about formatting unit test reports, go to [Format test reports](./test-report-ref.md).

### Test Execution Overview

This section provides an overview of **Total Tests**, number of **Selected Tests**, total **Duration** of all tests, and **Time Saved**.

**Duration** reflects the sum of CPU time taken for all tests to complete. The values are collected as-is from the JUnit report, and they don't correspond with wall-clock time. In contrast, the pipeline execution time is a measure of wall-clock time. Therefore, it is possible that the **Duration** may exceed the total pipeline execution time.

### Test Execution Result

This section provides a graphical representation of successful and failed tests.

### Test Selection Breakdown

Test Intelligence analyzes changes to source files and test files in the codebase and then runs only the tests that are relevant to the detected changes. This section reports how many tests ran based on the different the types of code changes included in this build:

* **Correlated with Code Changes**: The number of tests that ran due to changes in the codebase.
* **New Tests**: The number of tests that ran because they are new.
* **Updated Tests**: The number of tests that ran because there was a change to the actual test code or content.

### Test Execution

This section provides a detailed list of all tests, including class methods and test methods.

Initially, the list shows only failed tests. To see all tests, toggle **Show all Tests**.

You can sort the list by failure rate, duration, and total tests. You can also expand test suites to see details about individual tests in that suite.

### Call Graph

The first time you enable Test Intelligence on a repo, you must use a webhook-based PR trigger to run all tests and [generate the initial call graph](#generate-the-initial-call-graph). This creates a baseline for test selection in future builds; therefore, the initial call graph is not particularly useful. In subsequent builds, the call graph shows information about tests selected by Test Intelligence for that run.

Select **Expand graph** to view the Test Intelligence Visualization, which shows why a specific test was selected and the reason behind every test selection. Purple nodes represent tests. Select any test (purple node) to see all the classes and methods covered by that test. Blue nodes represent changes to classes and methods that caused Test Intelligence to select that test.

![](./static/set-up-set-up-test-intelligence-531.png)

## Troubleshooting

You might encounter these issues when using Test Intelligence.
### pom.xml with argLine

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

### Jacoco/Surefire/Failsafe

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
