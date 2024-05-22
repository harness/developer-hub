---
title: Enable parallelism on a Run Tests step
description: You can enable parallelism on a Run Tests step.
sidebar_position: 60
redirect_from:
  - /docs/continuous-integration/use-ci/run-tests/test-intelligence/ti-test-splitting
---

<!-- Test splitting for python requires `junit_family=xunit1` in the code repo's `pytest.ini` file, or `-o junit_family="xunit1"` in the Build Arguments. CI-9225 automatically includes the build argument, so manual inclusion is no longer required. However, if they use their own reporting (to be used elsewhere than Harness) in pytest.ini, it is overridden. I am not sure if this caveat needs to be documented yet. -->

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::warning

<!-- Harness has begun deprecating the **Run Tests** step in favor of the new **Test** step. -->

While the **Run Tests** step remains backwards compatible until removal, Harness recommends [using the new **Test** step](../tests-v2.md) as soon as possible to take advanced of improved functionality and avoid service interruptions upon removal of the deprecated step.

To enable parallelism/test splitting in the **Test** step, refer to the [Test step documentation](../tests-v2.md).

:::

By default, Test Intelligence reduces test time by running only the necessary tests to validate your code changes. You can enable parallelism and test splitting in your **Run Tests** steps to further optimize test times.

:::warning Does this topic apply to you?

This topic explains test splitting/parallelism in **Run Tests** steps *only*.

For test splitting/parallelism in **Run** steps, go to [Split tests in Run steps](/docs/continuous-integration/use-ci/run-tests/speed-up-ci-test-pipelines-using-parallelism.md).

For test splitting/parallelism in **Test** steps, go to the [Test step documentation](../tests-v2.md).

:::

With parallelism, you specify how you want Harness to divide similar workloads. When you use parallelism and test splitting with [Test Intelligence](../ti-overview.md), Harness divides the work after test selection. This means that your test execution time is reduced by both test selection and parallelism.

<details>
<summary>Example: Time saved by combining TI with test splitting</summary>

Suppose you have a pipeline that runs 100 tests, and each test takes about one second to run. Here's how TI and parallelism can reduce your test times:

* By default, without TI or parallelism, all 100 tests run in sequence, taking 100 seconds.
* With TI, test selection reduces the number of tests based on the detected changes. Supposing only 20 out of the 100 tests are required, the build with TI runs 20 tests in sequence, taking 20 seconds. This reduces test run time by 80%.
* With TI and parallelism, the selected tests are divided into a number of workloads. Supposing a maximum of four workloads and 20 selected tests, the 20 tests are split into four concurrently-running groups. It takes only five seconds to run the tests, reducing test run time by 95% compared to the default.

</details>

Note that while parallelism for TI can improve the total time it takes to run all tests, some tests may still take a long time to run if, by their nature, they are intensive, long-running tests.

## Enable test splitting for TI

To enable test splitting for TI, you must:

<!-- no toc -->
1. [Define a parallelism strategy.](#define-a-parallelism-strategy)
2. [Enable test splitting on the Run Tests step.](#enable-test-splitting-on-the-run-tests-step)
3. [Use an expression to differentiate report names for each run.](#differentiate-report-names)

### Define a parallelism strategy

In the context of test splitting, the `parallelism` strategy defines the number of workloads into which tests can be divided. Each parallel instance (or workload) is a duplicate of the stage where you've defined a parallelism strategy, but each instance runs different tests.

<Tabs>
  <TabItem value="Visual" label="Visual editor">

Define the parallelism strategy on the stage with the **Run Tests** step.

:::warning

You can configure parallelism strategies on stages or steps.

**Harness recommends using stage-level parallelism for test splitting.**

If you use step-level parallelism, you must ensure that your test runners won't interfere with each other because all parallel steps work in the same directory.

:::

1. In your pipeline, select the stage where your tests run, and then select the **Advanced** tab.
2. Under **Looping Strategies**, select **Parallelism**.
3. Set the `parallelism` value to the number of workloads that you want to divide your tests into. For example, if you want to create four workloads, set `parallelism: 4`.

   ![Define parallelism in a Run step.](../static/speed-up-ci-test-pipelines-using-parallelism-53.png)

4. Optional: Define `maxConcurrency`. This is a strategy to [optimize parallelism](#optimize-parallelism).

   ```yaml
   parallelism: 8
   maxConcurrency: 2
   ```

</TabItem>
  <TabItem value="YAML" label="YAML editor" default>

Define the parallelism strategy (`strategy.parallelism`) on the stage with the `RunTests` step.

```yaml
       strategy: ## Declares a looping strategy.
         parallelism: 8 ## Specify the number of workloads. This example creates 8 workloads.
         maxConcurrency: 2 ## Optional setting to optimize parallelism. Limits the number of workloads that can run at once.
```

:::warning

You can configure parallelism strategies on stages or steps.

**Harness recommends using stage-level parallelism for test splitting.**

If you use step-level parallelism, you must ensure that your test runners won't interfere with each other because all parallel steps work in the same directory.

:::

</TabItem>
</Tabs>

#### Optimize parallelism

In general, a higher `parallelism` value means a faster pipeline run time, because the tests can be divided into more parallel instances. However, this depends on your test suite and resource limitations in your build infrastructure. For example, if you try to run 10 groups of tests, but your build infrastructure can't handle 10 parallel instances, the pipeline can fail or take longer than expected.

To optimize your parallelism strategy:

* Try different parallelism values to determine your infrastructure's limits. Parallelism impacts [resource allocation](/docs/continuous-integration/use-ci/set-up-build-infrastructure/resource-limits) for the pipeline. A pipeline with five sequential stages can require fewer resources than a pipeline running five parallel instances of a stage, because the second pipeline has to run all five instances at once.
* Use `maxConcurrency` to control the flow of parallel instances and avoid overtaxing infrastructure resources. Concurrency limits the number of parallel instances that can run at once and queues additional instances.
   * For example, if you set `parallelism: 12`, Harness attempts to run 12 instances of the stage at once. If you set `parallelism: 12` and `maxConcurrency: 3`, Harness generates 12 instances of the stage, but only runs three instances at a time. The remaining nine instances are queued, and the queued instances start running as space clears in the concurrency limit (when prior instances finish).
   * Concurrency allows you to divide tests into more workloads without overloading your system resources.
   * There are resource requirements to *generate* parallel instances (even if they are not all running at the same time) and handle queues. Try different combinations of `parallelism` and `maxConcurrency` values to determine your ideal configuration.
* Review the [Best practices for looping strategies](/docs/platform/pipelines/looping-strategies/best-practices-for-looping-strategies.md), including [how to calculate ideal concurrency](/docs/platform/pipelines/looping-strategies/best-practices-for-looping-strategies#how-to-calculate-ideal-concurrency).

### Enable Test Splitting on the Run Tests step

On the **Run Tests** step, set **Enable Test Splitting** (`enableTestSplitting: true`).

```yaml
              - step:
                  type: RunTests
                  identifier: Run_Tests_with_Intelligence
                  name: Run Tests with Intelligence
                  spec:
                    ...
                    enableTestSplitting: true ## Required to enable test splitting.
                    testSplitStrategy: ClassTiming ## Optional. Can be ClassTiming or TestCount. Default is ClassTiming.
                    ...
```

The **Test Split Strategy** is optional. The default test split strategy is class timing. If you would rather split tests by test count, you can set the **Test Split Strategy** to **Test Count**.

Class timing uses test times from previous runs to determine how to split the test workload for the current build. Test count uses simple division to split the tests into workloads. However, the maximum possible number of workloads is determined by the parallelism strategy you specified on the step or stage. For example, if you set `parallelism: 5`, then the tests are split into a maximum of five workloads.

### Differentiate report names

With stage-level parallelism, results files are automatically output as separate stage artifacts.

If you want the individual results files to have unique names, you can use an [expression](/docs/platform/variables-and-expressions/harness-variables) or variable in the results file name, such as `result_<+strategy.iteration>.xml` or `result_${HARNESS_NODE_INDEX}.xml`.

You might need to modify your test tool configurations to support this report naming convention, and you must modify the **Report Paths** (`reports.paths`) value to include the [Harness expression](/docs/platform/variables-and-expressions/harness-variables), such as `<+strategy.iteration>`. For example:

```yaml
                       reports:
                         spec:
                           paths:
                             - "target/surefire-reports/result_<+strategy.iteration>.xml"
                         type: JUnit
```

:::warning

**Harness recommends stage-level parallelism for test splitting.** However, if you [defined the parallelism strategy](#define-a-parallelism-strategy) on a step (instead of a stage), you *must* use an [expression](/docs/platform/variables-and-expressions/harness-variables) or variable in the results file name, such as `result_<+strategy.iteration>.xml` or `result_${HARNESS_NODE_INDEX}.xml`, to ensure each parallel instance produces a uniquely-named results file. If you don't use an expression or variable in the results file name, the files overwrite each other or fail due to same-name conflicts. How you enable this varies by language and test tool. For this reason, among others, **Harness recommends using stage-level parallelism for test splitting**.

<details>
<summary>Recommended maven-surefire-plugin and pom.xml modifications for step-level test splitting</summary>

The following modification is recommended when using test splitting in a Run Tests step with step-level `parallelism`. This modification is recommended because it doesn't change the default behavior and preserves the default test report directory. If you are using stage-level `parallelism`, this modification has no impact and isn't required.

The default maven-surefire-plugin configuration in `pom.xml` is as follows:

```
        <plugin>
          <artifactId>maven-surefire-plugin</artifactId>
          <version>2.22.1</version>
        </plugin>
```

When running tests, the default test reports (`*.xml`) are generated in `target/surefire-reports`:

```
<reportsDirectory default-value="${project.build.directory}/surefire-reports"/>
```

However, when you run a CI pipeline with test splitting enabled, all test reports are generated in one `surefire-reports` directory. As a result, the [Tests tab](/docs/continuous-integration/use-ci/viewing-builds.md#tests-tab) shows the same number of tests for all parallel runs.

This issue is only present in the [Build details UI](/docs/continuous-integration/use-ci/viewing-builds). In actuality, the tests are split.

To correct the UI issue, make the following changes to `pom.xml` and your Run Tests step:

1. Edit `pom.xml`:

   * Add a property:

   ```
     <properties>
       <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
       <maven.compiler.source>1.7</maven.compiler.source>
       <maven.compiler.target>1.7</maven.compiler.target>
	   <reportDir>target/surefire-reports</reportDir>
     </properties>
   ```

   * Edit the maven-surefile-plugin configuration:

   ```
       <plugin>
         <artifactId>maven-surefire-plugin</artifactId>
         <version>2.22.1</version>
	     <configuration>
	       <reportsDirectory>${reportDir}</reportsDirectory>
	     </configuration>
       </plugin>
   ```

2. In your CI pipeline, edit the **Run Tests** step.

   * Add the following to the step's build arguments:

   ```
   -DreportDir=reports-<+strategy.iteration> test
   ```

   * Declare the following in the step's report paths:

   ```
   **/reports-<+strategy.iteration>/*.xml
   ```

</details>

:::

### Differentiate parallel runs in logs

You can also use environment variables and expressions to differentiate parallel runs in build logs.

1. Add two stage variables:

   * `HARNESS_STAGE_INDEX: <+strategy.iteration>` - This is the index of the current parallel run.
   * `HARNESS_STAGE_TOTAL: <+strategy.iterations>` - This is the total parallel runs.

2. Add a `preCommand` to echo the variables' values so you can easily see the values in build logs.

```yaml
              - step:
                  type: RunTests
                  identifier: Run_Tests_with_Intelligence
                  name: Run Tests with Intelligence
                  spec:
                    ...
                    preCommand: |- ## Optional. Echo environment variables to differentiate parallel runs in build logs.
                      echo $HARNESS_STAGE_INDEX
                      echo $HARNESS_STAGE_TOTAL
                    ...
```

## YAML example: Test splitting for TI

This example shows a stage that uses Harness Cloud build infrastructure and runs Test Intelligence on a Java codebase. The parallelism strategy is set at the stage level.

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
                  type: RunTests
                  identifier: Run_Tests_with_Intelligence
                  name: Run Tests with Intelligence
                  spec:
                    language: Java ## Test splitting with TI is supported for all languages and tools that are supported by TI.
                    buildTool: Maven
                    envVariables: ## Optional environment variables to differentiate parallel runs.
                      HARNESS_STAGE_INDEX: <+strategy.iteration> # Index of current parallel run.
                      HARNESS_STAGE_TOTAL: <+strategy.iterations> # Total parallel runs.
                    preCommand: |- ## Optional. Echo environment variables to differentiate parallel runs in build logs.
                      echo $HARNESS_STAGE_INDEX
                      echo $HARNESS_STAGE_TOTAL
                    args: test
                    runOnlySelectedTests: true ## Enable TI.
                    enableTestSplitting: true ## Enable test splitting.
                    testSplitStrategy: ClassTiming ## Optional. Can be ClassTiming or TestCount. Default is ClassTiming.
                    postCommand: mvn package -DskipTests
                    reports:
                      spec:
                        paths:
                          - "target/surefire-reports/result_<+strategy.iteration>.xml" ## Use an expression to generate a unique results file for each parallel run.
                      type: JUnit
          platform:
            arch: Amd64
            os: Linux
          runtime:
            spec: {}
            type: Cloud
        strategy:
          parallelism: 3 ## Set the number of groups to use for test splitting.
```

:::tip

Harness supports [test splitting for any language](../speed-up-ci-test-pipelines-using-parallelism.md).

:::
