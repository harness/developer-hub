---
title: Test splitting for TI
description: Use test splitting (parallelism) to optimize TI
sidebar_position: 60
---

<!-- Test splitting for python requires `junit_family=xunit1` in the code repo's `pytest.ini` file, or `-o junit_family="xunit1"` in the Build Arguments. CI-9225 automatically includes the build argument, so manual inclusion is no longer required. However, if they use their own reporting (to be used elsewhere than Harness) in pytest.ini, it is overridden. I am not sure if this caveat needs to be documented yet. -->

You can enable [parallelism and test splitting](../speed-up-ci-test-pipelines-using-parallelism.md) in your **Run Tests** steps to further optimize test times.

With parallelism, you specify how you want Harness to divide the work for a step or stage. When you use parallelism and test splitting with [Test Intelligence](./set-up-test-intelligence.md), Harness divides the work after test selection. This means that your test execution time is reduced by both test selection and parallelism.

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
1. [Define a parallelism strategy.](#define-the-parallelism-strategy)
2. [Enable test splitting on the Run Tests step.](#enable-test-splitting-on-the-run-tests-step)
3. [Use an expression to differentiate report names for each run.](#differentiate-report-names)

### Define a parallelism strategy

Go to the pipeline where you want to enable parallelism for TI, and define a parallelism strategy on either the stage where you have the **Run Tests** step or on the **Run Tests** step itself. For example:

```yaml
        strategy:
          parallelism: 3 ## Set the number of groups to use for test splitting.
```

If you are using the Visual editor, **Parallelism** is found under **Looping Strategy** in the stage's or step's **Advanced** settings.

For more information about parallelism strategies and optimizing parallelism, go to [Split tests - Define a parallelism strategy](../speed-up-ci-test-pipelines-using-parallelism.md#define-a-parallelism-strategy) and [Split tests - Optimize parallelism](../speed-up-ci-test-pipelines-using-parallelism.md#optimize-parallelism).

:::caution

If you use step-level parallelism, you must ensure that your test runners won't interfere with each other because all parallel steps work in the same directory.

:::

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

Modify the **Report Paths** (`reports.paths`) value to include a [Harness expression](/docs/platform/Variables-and-Expressions/harness-variables), such as `<+strategy.iteration>`, to ensure there is a unique results file for each parallel run. For example:

```yaml
                       reports:
                         spec:
                           paths:
                             - "target/surefire-reports/result_<+strategy.iteration>.xml"
                         type: JUnit
```

You can also use environment variables and expressions to differentiate parallel runs in build logs.

1. Add two environment variables to the `step.spec`: `HARNESS_STAGE_INDEX: <+strategy.iteration>` and `HARNESS_STAGE_TOTAL: <+strategy.iterations>`.
2. Add a `preCommand` to echo the variables' values so you can easily see the values in build logs.

```yaml
              - step:
                  type: RunTests
                  identifier: Run_Tests_with_Intelligence
                  name: Run Tests with Intelligence
                  spec:
                    ...
                    envVariables: ## Optional environment variables to differentiate parallel runs.
                      HARNESS_STAGE_INDEX: <+strategy.iteration> # Index of current parallel run.
                      HARNESS_STAGE_TOTAL: <+strategy.iterations> # Total parallel runs.
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