---
title: Split tests (parallelism)
description: Split tests for any language. Use parallelism to improve test times.
sidebar_position: 40
helpdocs_topic_id: kce8mgionj
helpdocs_category_id: kncngmy17o
helpdocs_is_private: false
helpdocs_is_published: true
redirect_from:
  - /docs/platform/pipelines/speed-up-ci-test-pipelines-using-parallelism
  - /docs/continuous-integration/use-ci/optimize-and-more/speed-up-ci-test-pipelines-using-parallelism
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

With Harness CI, you can split tests for any language or test tool. This uses test splitting and the parallelism [looping strategy](/docs/platform/pipelines/looping-strategies/looping-strategies-matrix-repeat-and-parallelism) to improve test times.

When you [run tests in Harness CI](./run-tests-in-ci.md), you use **Run** and **Run Tests** steps. You can enable test splitting on either of these steps. To do this, you need to:

<!-- no toc -->
1. [Define a parallelism strategy.](#define-the-parallelism-strategy)
2. [Define a test splitting strategy.](#define-a-test-splitting-strategy)
3. Make sure your steps [produce test reports in JUnit XML format](#produce-test-reports).
4. [Run the pipeline and inspect the test results.](#run-the-pipeline-and-inspect-results)

<details>
<summary>Learn more about test splitting and parallelism</summary>

Most CI pipelines are set up to run tests for every new commit. By default, tests run sequentially. If there are a lot of tests to run, developers might have to wait longer than necessary for test results. Similarly, if there are frequent commits, your builds might start to queue due to [concurrency limits](/docs/continuous-integration/use-ci/optimize-and-more/queue-intelligence).

Test splitting and parallelism can decrease test cycle time by dividing tests into multiple groups and running the groups in parallel. You can configure test splitting by number of tests, test timing, file size, and so on.

For example, suppose you have a pipeline that runs 100 tests, and each test takes about one second to run. By default, all 100 tests run in sequence, taking 100 seconds. If you use test splitting to create four workloads with 25 tests each, the four groups run at the same time, and then it takes only 25 seconds to run all 100 tests. While a savings of 75 seconds doesn't seem like much for a single run, assuming a rate of 50 commits per week, this amounts to a savings of just over one hour per week.

```
( 75 seconds x 50 commits ) / 60 seconds = 62.5 minutes saved
```

Note that this example only calculates the runtime for the tests. Additional time can be required for other commands in your **Run** or **Run Tests** step, such as initializing the step, installing dependencies, and so on.

Time saved can improve over subsequent runs. If you use a test timing strategy to split tests, Harness must collect timing data during the first parallel run. Therefore, on the first parallel run, Harness needs to divide tests by file size or number of tests. Then, on the second run, Harness can use the timing data from the first run to split tests by test time. With each subsequent run, Harness further refines test splitting based on newer timing data.

<figure>

![](./static/speed-up-ci-test-pipelines-using-parallelism-50.png)

<figcaption>This diagram demonstrates how parallelism can accelerate your CI pipelines. Without parallelism, the tests run one after the other. With parallelism enabled, Harness first splits tests into four groups based on file size, already significantly reducing the overall run time. Using timing data collected in the first parallel run, subsequent runs split tests by test time, further optimizing run time. With each subsequent run, test partitioning is refined based on the newest timing data.</figcaption>
</figure>

Parallelism is one of the [looping strategies](/docs/platform/pipelines/looping-strategies/looping-strategies-matrix-repeat-and-parallelism) available in Harness pipelines, and parallelism isn't limited to splitting tests. You can use parallelism to [speed things up](../optimize-and-more/optimizing-ci-build-times.md) whenever it's possible to divide pipeline, step, or stage tasks into multiple sets and run them concurrently.

When using parallelism, it's important to take into account resource limitations that exist in your build infrastructure. For more information, go to [Best Practices for Looping Strategies](/docs/platform/pipelines/looping-strategies/best-practices-for-looping-strategies.md).

</details>

<details>
<summary>YAML example: Test splitting and parallelism on a Run step</summary>

This example shows test splitting and parallelism applied to a Run step in a stage that uses [Harness Cloud build infrastructure](../set-up-build-infrastructure/use-harness-cloud-build-infrastructure.md). For more YAML examples of test splitting, go to [YAML examples: Test splitting](#yaml-examples-test-splitting).

```yaml
              - step:
                  type: Run ## Test splitting can be applied to any Run or Run Tests steps where you run tests.
                  name: run pytest
                  identifier: run_pytest
                  strategy: ## This is the parallelism strategy for the step.
                    parallelism: 8 ## Tests are split into a maximum of 12 workloads.
                    maxConcurrency: 2 ## Optional. This setting limits the number of workloads that can run at once. In this case, no more than four workloads can run at once. The remaining 8 workloads are queued.
                  spec:
                    envVariables: ## These environment variables are used in the 'command' to differentiate the index values for parallel runs and individual Run steps within each parallel group.
                      HARNESS_NODE_INDEX: <+strategy.iteration>
                      HARNESS_NODE_TOTAL: <+strategy.iterations>
                    shell: Sh
                    command: |- ## Split tests commands are included alongside the regular test commands.
                      # Install dependencies.
                      pip install -r requirements.txt

                      # Define splitting strategy and generate a list of test groups.
                      FILES=`/addon/bin/split_tests --glob "**/test_*.py" --split-by file_timing --split-index ${HARNESS_NODE_INDEX} --split-total ${HARNESS_NODE_TOTAL}`
                      echo $FILES

                      # Run tests with the list of test groups as input and produce results in JUnit XML format.
                      pytest -v --junitxml="result_<+strategy.iteration>.xml" $FILES

                    reports:
                      type: JUnit
                      spec:
                        paths:
                          - "**/result_<+strategy.iteration>.xml" ## Using the expression '<+strategy.iteration>' in the file name ensures that the results of parallel runs don't overwrite each other.
```

</details>

This topic focuses on parallelism and test splitting in **Run** steps. For information about test splitting with Test Intelligence (in **Run Tests** steps), go to [Enable Test Intelligence](./set-up-test-intelligence).

## Define a parallelism strategy

In the context of test splitting, the `parallelism` strategy defines the number of workloads into which tests can be divided. Each parallel instance (or workload) is a duplicate of the step or stage where you've defined a parallelism strategy, but each instance runs different tests according to the [test splitting strategy](#define-a-test-splitting-strategy).

<details>
<summary>Learn more about parallel workloads</summary>

To demonstrate how tests are split into concurrent (parallel) workloads, assume that you use the `test_count` splitting strategy to divide 20 tests into four workloads. To tell Harness to create four workloads, you would set your parallelism strategy to `parallelism: 4`. Then use the `test_count` splitting strategy in your **Run** step's commands. When the pipeline runs, `test_count` uses simple division to split the 20 tests into four workloads; therefore, each parallel instance runs five different tests.

```
20 tests / 4 workloads = 5 tests per workload
```

Parallel instances are zero-indexed, resulting in the following breakdown:

* Instance 0 runs tests 1-5.
* Instance 1 runs tests 6-10.
* Instance 2 runs tests 11-15.
* Instance 3 runs tests 16-20.

The four instances run concurrently, but they might finish at different times depending on individual test times. This example used `test_count`, which simply divides the tests based on the total number of tests; therefore, the instances might not finish at the same time if some tests run longer than others. To achieve more equal run times, you can use more nuanced splitting strategies, such as file size or timing.

</details>

```mdx-code-block
<Tabs>
  <TabItem value="Visual" label="Visual editor">
```

Define the parallelism strategy on either the step or stage where your tests run.

1. Edit the step or stage where your tests run, and then select the **Advanced** tab.
2. Under **Looping Strategies**, select **Parallelism**.
3. Set the `parallelism` value to the number of workloads that you want to divide your tests into. For example, if you want to create four workloads, set `parallelism: 4`.

   ![Define parallelism in a Run step.](./static/speed-up-ci-test-pipelines-using-parallelism-53.png)

4. Optional: Define `maxConcurrency`. This is a strategy to [optimize parallelism](#optimize-parallelism).

   ```yaml
   parallelism: 8
   maxConcurrency: 2
   ```

5. Add the following environment variables to the same step or stage where you defined the parallelism strategy:

   * `HARNESS_NODE_TOTAL: <+strategy.iterations>` - This variable specifies the total number of parallel instances.
   * `HARNESS_NODE_INDEX: <+strategy.iteration>` - This variable specifies the index value of the currently-running parallel instance. Parallel instances are zero-indexed, so this value ranges from `0` to `parallelism-1`.

   Stage variables are declared on the **Overview** tab under **Advanced**. Step environment variables are declared in the step settings under **Optional Configuration**.

   You'll use these variables when you [define a test splitting strategy](#define-a-test-splitting-strategy) to create commands that can be used for all parallel instances.

   ```yaml
   FILES=`/addon/bin/split_tests --glob "**/test_*.py" --split-by file_timing \
      --split-index ${HARNESS_NODE_INDEX} \
      --split-total ${HARNESS_NODE_TOTAL}`
   echo $FILES
   ```

   You can also use them to create helpful step logs to help you differentiate parallel instances, such as `echo "${HARNESS_NODE_INDEX} of ${HARNESS_NODE_TOTAL}"`.

```mdx-code-block
  </TabItem>
  <TabItem value="YAML" label="YAML editor" default>
```

1. Use `strategy.parallelism` to define a parallelism strategy on either the step or stage where your tests run.

   * `strategy`: Declares a looping strategy
   * `parallelism`: Specify the number of workloads that you want to divide your tests into. For example, if you want to create four workloads, set `parallelism: 4`.
   * `maxConcurrency`: Optional strategy to [optimize parallelism](#optimize-parallelism).

   This example shows parallelism applied to a Run step. For more YAML examples, go to [YAML examples: Test splitting](#yaml-examples-test-splitting).

   ```yaml
                 - step:
                     type: Run
                     name: tests
                     identifier: tests
                     strategy: ## Declares a looping strategy.
                       parallelism: 8 ## Specify the number of workloads. This example creates 12 workloads.
                       maxConcurrency: 2 ## Optional. Limit the number of workloads that can run at once.
                     spec:
                       ...
   ```

2. Add the following environment variables to the same step or stage where you defined the parallelism strategy:

   * `HARNESS_NODE_TOTAL: <+strategy.iterations>` - This variable specifies the total number of parallel instances.
   * `HARNESS_NODE_INDEX: <+strategy.iteration>` - This variable specifies the index value of the currently-running parallel instance. Parallel instances are zero-indexed, so this value ranges from `0` to `parallelism-1`.

   This example shows these environment variables declared on a step. To declare them on a stage, add them to the [stage variables](/docs/platform/pipelines/add-a-stage/#stage-variables).

   ```yaml
                 - step:
                     type: Run
                     name: tests
                     identifier: tests
                     ...
                     spec:
                       envVariables:
                         HARNESS_NODE_INDEX: <+strategy.iteration>
                         HARNESS_NODE_TOTAL: <+strategy.iterations>
                       ...
   ```

   You'll use these variables when you [define a test splitting strategy](#define-a-test-splitting-strategy) to create commands that can be used for all parallel instances.

   ```yaml
   FILES=`/addon/bin/split_tests --glob "**/test_*.py" --split-by file_timing \
      --split-index ${HARNESS_NODE_INDEX} \
      --split-total ${HARNESS_NODE_TOTAL}`
   echo $FILES
   ```

   You can also use them to create helpful step logs to help you differentiate parallel instances, such as `echo "${HARNESS_NODE_INDEX} of ${HARNESS_NODE_TOTAL}"`.

```mdx-code-block
  </TabItem>
</Tabs>
```

### Optimize parallelism

In general, a higher `parallelism` value means a faster pipeline run time, because the tests can be divided into more parallel instances. However, this depends on your test suite and resource limitations in your build infrastructure. For example, if you try to run 10 groups of tests, but your build infrastructure can't handle 10 parallel instances, the pipeline can fail or take longer than expected.

To optimize your parallelism strategy:

* Try different parallelism values to determine your infrastructure's limits.
   * It's important to understand that parallelism impacts [resource allocation](/docs/continuous-integration/use-ci/set-up-build-infrastructure/resource-limits) for each stage in the pipeline. A stage with five sequential steps can require fewer resources than a stage with running five parallel instances of one step, because the second stage has to run all five instances at once.
* Use `maxConcurrency` to control the flow of parallel instances and avoid overtaxing infrastructure resources. Concurrency limits the number of parallel instances that can run at once and queues additional instances.
   * For example, if you set `parallelism: 12`, Harness attempts to run 12 instances of the step at once. If you set `parallelism: 12` and `maxConcurrency: 3`, Harness generates 12 instances of the step, but only runs three instances at a time. The remaining nine instances are queued, and the queued instances start running as space clears in the concurrency limit (when prior instances finish).
   * Concurrency allows you to divide tests into more workloads without overloading your system resources.
   * Keep in mind that there are resource requirements for generating parallel instances (even if they are not all running at the same time) and handling queues. Try different combinations of `parallelism` and `maxConcurrency` values to determine your ideal configuration.
* Review the [Best practices for looping strategies](/docs/platform/pipelines/looping-strategies/best-practices-for-looping-strategies.md), including [how to calculate ideal concurrency](/docs/platform/pipelines/looping-strategies/best-practices-for-looping-strategies#how-to-calculate-ideal-concurrency).

## Define a test splitting strategy



 How you do this depends on which step runs your tests:
   * **Run step:** Use the `split_tests` command along with test split strategies, such as `--split-by file_size`.
   * **Run Tests step:** Specify `testSplitStrategy` to [enable test splitting for Test Intelligence](/docs/continuous-integration/use-ci/run-tests/set-up-test-intelligence.md#enable-parallelism-test-splitting-for-test-intelligence).


   x. Set up the `split_tests` command with the splitting criteria based on file size (`--split-by file_size`).



:::info

The following information applies to test splitting in a **Run** step. For information about test splitting with Test Intelligence (in a **Run Tests** step), go to [Enable Test Intelligence](./set-up-test-intelligence).

:::




You use the `split_tests` CLI command to define the set of tests you want to run. In the **Command** field of the **Run** step where you run your tests, you need to do the following:

1. Configure the `split_tests` command to define how you want to split your tests. This command outputs a string of your test groups.
2. Run the test command with your test-groups string as input.

For example:

```shell
# Generate a new set of grouped test files and output the file list to a string...  
FILES=`/addon/bin/split_tests --glob "**/test_*.py" \  
          --split-by file_time \  
          --split-index ${HARNESS_NODE_INDEX} \  
          --split-total=${HARNESS_NODE_TOTAL}` 
echo $FILES  
# example output: test_api_2.py test_api_4.py test_api_6.py  
  
# Then use the $FILES list as input to the test command--in this case, pytest:  
pytest -v --junitxml="result_${HARNESS_NODE_INDEX}.xml" $FILES 
```

:::tip

If your stage uses Harness Cloud build infrastructure, your Run step's `command` can call the `split_tests` binary directly. For example, you would use `./split_tests` instead of `/addon/bin/split_tests`.

If your stage utilizes Harness Cloud build infrastructure, you can directly call the `split_tests` binary from the **Run** step's `command`. For example, you would use `split_tests` instead of `/addon/bin/split_tests`.

:::

The `split_tests` command creates a new set of test files that is ordered based on your splitting criteria. This command takes the following as inputs:

* The set of all the tests you want to run (`--glob` argument).
* The algorithm used to split the tests into groups (`--split-by` argument).
* The run index and total number of runs. You should set these to the environment attributes you defined previously (`--split-index ${HARNESS_NODE_INDEX}` and `--split-total ${HARNESS_NODE_TOTAL}`).

### Test splitting strategies

The `split_tests` command allows you to define the criteria for splitting tests.

Harness supports the following strategies:

* `--split-by file_size` - Split files into groups based on the size of individual files.
* `--split-by file_timing` (Default) — Split files into groups based on the test times of individual files. `split_tests` uses the most recent timing data to ensure that all parallel test runs finish at approximately the same time. The pipeline needs timing data from the previous run to split tests by time. If timing data isn't available, `split_tests` falls back to `--split-by file_size`.
* `--split-by test_count` — Split tests into groups based on the overall number of tests.
* `--split-by class_timing` — Split tests into groups based on the timing data for individual classes. The pipeline needs timing data from the previous run to split tests by time. If timing data isn't available, `split_tests` falls back to `--split-by file_size`.
* `--split-by testcase_timing` — Split tests into groups based on the timing data for individual test cases. The pipeline needs timing data from the previous run to split tests by time. If timing data isn't available, `split_tests` falls back to `--split-by file_size`.
* `--split-by testsuite_timing` — Split tests into groups based on the timing data for individual test suites. The pipeline needs timing data from the previous run to split tests by time. If timing data isn't available, `split_tests` falls back to `--split-by file_size`.

### Specifying the tests to split

To split tests based on their run time, you must provide a list of file paths, classes, test cases, or test suites to include. For example, the following code snippet splits tests by time in a **Run** step. The `split_tests` command used in the code parses all matching test files based on the `--glob` option and splits them into separate lists based on `--split-by file_timing`. The number of lists created is determined by the `parallelism` setting. For example, if `parallelism` is set to 2, the command creates two separate lists of files that are evenly divided based on their testing time. The pipeline then creates two parallel steps that run tests for the files in each list.

```shell
pip install -r requirements.txt  
  
# Split by timing data  
FILES=`/addon/bin/split_tests --glob "**/test_*.py" --split-by file_timing`  
echo $FILES  
pytest -v --junitxml="result_${HARNESS_NODE_INDEX}.xml" $FILES
```

When the pipeline finishes a build, the `echo $FILES` output shows the files that got tested in each step. For example, one log contains the following:

```shell
+ FILES=test_file_1.py test_file_2.py test_file_6.py test_file_9.py test_file_10.py test_file_12.py test_file_13.py
```

Whereas another log contains:

```shell
+ FILES=test_file_3.py test_file_4.py test_file_5.py test_file_8.py test_file_11.py test_file_14.py
```

Note that this example applies to the `--split-by file_timing`option. In this case, you can use a glob expression to specify the set of elements that need to be split and tested. For class, test-case, or test-suite timing, you must provide a text file of the elements to split. If you want to split by Java-class timing, for example, you could specify the set of classes to split and test in a new-line-delineated string like this:

```shell
echo 'io.harness.jhttp.server.PathResolverTest\nio.harness.jhttp.processor.DirectoryIndexTest\nio.harness.jhttp.functional.HttpClientTest\nio.harness.jhttp.processor.ResourceNotFoundTest'> classnames.txt  
CLASSES=`/addon/bin/split_tests --split-by class_timing --file-path classnames.txt`
```






## Produce test reports

Generate test reports and use an [expression](/docs/platform/Variables-and-Expressions/harness-variables) to create uniquely named results files for each run.

Define your test reports. Your reports must be in JUnit XML format. For more information, go to [Publish test reports](#publish-test-reports).


  :::caution

  When implementing parallelism in a step rather than a stage, you must ensure that each test-group step generates a report with a unique filename to prevent conflicts. You can accomplish this by utilizing the `<+strategy.iteration>` [expression](/docs/platform/variables-and-expressions/harness-variables) in your `reports.paths`. This expression represents the test group's parallel run index, ranging from `0` to `parallelism - 1`.

  :::



To publish your test results in the Harness UI, your test results files must be in [JUnit](https://junit.org/junit5/) XML format. How you publish your test results depends on the specific language, test runner, and formatter used in your repo. For more information, to go [Format test reports](./test-report-ref.md).


The `report` section in the pipeline YAML defines how to publish your test reports. Here's an example:

```yaml
reports:   
   type: JUnit   
      spec:   
         paths: - "**/result_${HARNESS_NODE_INDEX}.xml" ##Use this variable to generate uniquely-named results files for each parallel instance. Without a differentiating identifier, the results files overwrite each other.
```




To ensure that your test reports are correctly published and time-based test splitting works, you must do the following:

* Configure your test runner and formatter to publish your test reports in the [JUnit](https://junit.org/junit5/) XML format and include file names in the XML output.
   * For example, if you use `pytest`, you can set `junit_family=xunit1` in your code repo's `pytest.ini` file, or you can include `-o junit_family="xunit1"` in the step's `command`.
   * The exact setup and configuration requirements depend on the test runner that you use. Refer to your test runner's documentation to learn how to publish in the correct format.
   * For more information, go to [Format test reports](./test-report-ref).
* If you're implementing `parallelism` in a step, rather than a stage, ensure that each `test-group` step generates a report with a unique filename. You can achieve this using the `<+strategy.iteration>` variable, which represents the index of the current test run, in the range of `0` to `parallelism-1`.

You can configure test reporting options in the Pipeline Studio's YAML or Visual editors. In your pipeline, locate the **Run** or **Run Tests** step and specify the **Report Paths** field. In the Visual editor this field is located under **Optional Configuration**.

![Define Report Paths in a Run step](./static/speed-up-ci-test-pipelines-using-parallelism-54.png)


## YAML examples: Test splitting

The following YAML example shows a full end-to-end pipeline with parallelism enabled.

:::tip

If your stage uses Harness Cloud build infrastructure, your Run step's `command` can use the `split_tests` binary directly. For example, you would use `split_tests` instead of `/addon/bin/split_tests`.

:::

<details>
<summary>Parallelism pipeline YAML example</summary>

<!-- cloud version, not calling env vars in junit paths-->

```yaml
pipeline:
  name: pytest_split_test
  identifier: pytest_split_test
  projectIdentifier: default
  orgIdentifier: default
  tags: {}
  properties:
    ci:
      codebase:
        connectorRef: YOUR_CODEBASE_CONNECTOR_ID
        repoName: YOUR_CODE_REPO_NAME
        build: <+input>
  stages:
    - stage:
        name: pytest
        identifier: pytest
        description: ""
        type: CI
        spec:
          cloneCodebase: true
          platform:
            os: Linux
            arch: Amd64
          runtime:
            type: Cloud
            spec: {}
          execution:
            steps:
              - step:
                  type: Run
                  name: run pytest
                  identifier: run_pytest
                  spec:
                    shell: Sh
                    command: |-
                      pip install -r requirements.txt  
                      # Define splitting strategy and generate a list of test groups  
                      FILES=`/addon/bin/split_tests --glob "**/test_*.py" --split-by file_timing --split-index ${HARNESS_NODE_INDEX} --split-total ${HARNESS_NODE_TOTAL}`  
                      echo $FILES  
                      # Run tests with the test-groups string as input  
                      pytest -v --junitxml="result_<+strategy.iteration>.xml" $FILES  
                    reports:
                      type: JUnit
                      spec:
                        paths:
                          - "**/result_<+strategy.iteration>.xml"
                    envVariables:
                      HARNESS_NODE_INDEX: <+strategy.iteration>
                      HARNESS_NODE_TOTAL: <+strategy.iterations>
                  strategy:
                    parallelism: 4
                    maxConcurrency: 2
```

<!-- refreshed, k8s -->

```yaml
pipeline:
  name: pytest_split_test
  identifier: pytest_split_test
  projectIdentifier: default
  orgIdentifier: default
  tags: {}
  properties:
    ci:
      codebase:
        connectorRef: YOUR_CODEBASE_CONNECTOR_ID
        repoName: YOUR_CODE_REPO_NAME
        build: <+input>
  stages:
    - stage:
        name: pytest
        identifier: pytest
        description: ""
        type: CI
        spec:
          cloneCodebase: true
          execution:
            steps:
              - step:
                  type: Run
                  name: run pytest
                  identifier: run_pytest
                  spec:
                    connectorRef: YOUR_DOCKER_CONNECTOR_ID
                    image: python:latest
                    shell: Sh
                    command: |-
                      pip install -r requirements.txt  
                      # Define splitting strategy and generate a list of test groups  
                      FILES=`/addon/bin/split_tests --glob "**/test_*.py" --split-by file_timing --split-index ${HARNESS_NODE_INDEX} --split-total ${HARNESS_NODE_TOTAL}`  
                      echo $FILES  
                      # Run tests with the test-groups string as input  
                      pytest -v --junitxml="result_${HARNESS_NODE_INDEX}.xml" $FILES  
                    reports:
                      type: JUnit
                      spec:
                        paths:
                          - "**/result_${HARNESS_NODE_INDEX}.xml"
                    envVariables:
                      HARNESS_NODE_INDEX: <+strategy.iteration>
                      HARNESS_NODE_TOTAL: <+strategy.iterations>
                  strategy:
                    parallelism: 4
                    maxConcurrency: 2
          infrastructure:
            type: KubernetesDirect
            spec:
              connectorRef: YOUR_K8S_CLUSTER_CONNECTOR_ID
              namespace: YOUR_K8S_NAMESPACE
              automountServiceAccountToken: true
              nodeSelector: {}
              os: Linux
```

</details>


### Example: Parallelism strategy on Run step

Parallelism can be set at either the step level or stage level.

The following YAML example shows a **Run** step that uses [pytest](https://docs.pytest.org/) and splits tests into four parallel test groups.

```yaml
# Use "run" step type  
- step:  
      type: Run     
      name: Run Pytests  
      identifier: Run_Pytests  
      # Enable parallelism strategy   
      strategy:             
          parallelism: 4   # Number of parallel runs
          maxConcurrency: 2 # (optional) Limit the number of parallel runs
      spec:  
          connectorRef: $dockerhub_connector  ## Not required for all build infra.
          image: python:latest  ## Not required for all build infra.
          shell: Sh  
          # Store the current index and total runs in environment variables  
          envVariables:    
              HARNESS_NODE_INDEX: <+strategy.iteration>  # index of current run  
              HARNESS_NODE_TOTAL: <+strategy.iterations> # total runs  
          command: |-  
              pip install -r requirements.txt  
              # Define splitting strategy and generate a list of test groups  
              FILES=`/addon/bin/split_tests --glob "**/test_*.py" \  
                     --split-by file_timing \  
                     --split-index ${HARNESS_NODE_INDEX} \  
                     --split-total ${HARNESS_NODE_TOTAL}`  
              echo $FILES  
              # Run tests with the test-groups string as input  
              pytest -v --junitxml="result_<+strategy.iteration>.xml" $FILES  
         # Publish JUnit test reports to Harness   
         reports:    
              type: JUnit   
              spec:  
                  paths:   # Generate unique report for each iteration  
                      - "**/result_<+strategy.iteration>.xml"   
      failureStrategies: []
```

<!-- Updated, Cloud version -->
```yaml
              - step:
                  type: Run
                  name: run pytest
                  identifier: run_pytest
                  spec:
                    shell: Sh
                    command: |-
                      pip install -r requirements.txt  
                      # Define splitting strategy and generate a list of test groups  
                      FILES=`/addon/bin/split_tests --glob "**/test_*.py" --split-by file_timing --split-index ${HARNESS_NODE_INDEX} --split-total ${HARNESS_NODE_TOTAL}`  
                      echo $FILES  
                      # Run tests with the test-groups string as input  
                      pytest -v --junitxml="result_<+strategy.iteration>.xml" $FILES  
                    reports:
                      type: JUnit
                      spec:
                        paths:
                          - "**/result_<+strategy.iteration>.xml"
                    envVariables:
                      HARNESS_NODE_INDEX: <+strategy.iteration>
                      HARNESS_NODE_TOTAL: <+strategy.iterations>
                  strategy:
                    parallelism: 4
                    maxConcurrency: 2
```

### Language/tool examples

<!-- Run steps on Format Test Reports, language guides, and Code Coverage pages. Add looping strategy & split commands -->

* Go - Use [`go list ./...`](https://pkg.go.dev/cmd/go#hdr-List_packages_or_modules) to glob Golang packages and split tests.
* Java - Maven, Gradle
* JavaScript - ESLint, Jest, Karma, Mocha
* PHP - [phpunit-finder](https://github.com/previousnext/phpunit-finder) can help split tests by getting a list of test filenames.
* Python - pytest
* Ruby - Cucumber, Minitest, RSpec
* C/C++ - CTest
* C# - .NET Core, NUnit
* Clojure - Kaocha, Clojure.test




[Playwright:](https://github.com/microsoft/playwright)

[docs](https://playwright.dev/docs/ci#ci-configurations)

* Specify a playwright image.
* Use sharding to split tests.

```shell
SHARD="$((${HARNESS_NODE_INDEX}+1))"; npx playwright test -- --shard=${SHARD}/${HARNESS_NODE_TOTAL}
```


## Run the pipeline and inspect results

5. Run your pipeline:
   1. Make sure all your steps complete successfully. You can see the parallel copies of your step running on the [Build details page](../viewing-builds).

   ![Parallel steps in a build.](./static/speed-up-ci-test-pipelines-using-parallelism-51.png)

   2. When the build finishes, go to the **Tests** tab and [view your results](./viewing-tests). You can view results for each parallel run using the pull-down.

   ![View results for individual runs.](./static/speed-up-ci-test-pipelines-using-parallelism-52.png)

   3. Initial vs subsequent runs: Harness collects timing data during the first run with test splitting and parallelism. Once Harness has the timing data, subsequent runs can [use test splitting options based on timing](#test-splitting-strategies) to further reduce test times.
