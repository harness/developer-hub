---
title: Speed up CI test pipelines using parallelism
description: Use parallelism to run tests in parallel.
# sidebar_position: 2
helpdocs_topic_id: kce8mgionj
helpdocs_category_id: kncngmy17o
helpdocs_is_private: false
helpdocs_is_published: true
---

To decrease test cycle time, utilize parallelism by dividing tests into multiple sets and running them in parallel. *Parallelism* is one of the [looping strategies](looping-strategies-matrix-repeat-and-parallelism.md) available in Harness pipelines. Whenever it's possible to divide the tasks of a particular step or stage into multiple sets and execute them concurrently, parallelism can be used to [speed things up](/docs/continuous-integration/use-ci/optimize-and-more/optimizing-ci-build-times.md).

## Key concepts: parallelism and test splitting

Most CI pipelines are set up to run tests with every new commit. When you [set up parallelism in a pipeline](#set-up-parallelism-in-a-pipeline), you must specify the following:

1. The [parallelism strategy](#define-the-parallelism-strategy), which determines the number of instances of a stage or step to execute
2. The strategy for splitting tests. How you do this depends on which step you're using to run tests:
   * If you're using the **Run Tests** step, you specify the `testSplitStrategy` to [enable test splitting for Test Intelligence](/docs/continuous-integration/use-ci/set-up-test-intelligence/#enable-parallelism-test-splitting-for-test-intelligence).
   * If you're using a **Run** step, you use the `split_tests` command along with test split strategies, such as `--split-by file_size` to [define test splitting](#define-test-splitting).

:::info

For more information about test splitting with Test Intelligence, go to [Enable Test Intelligence](/docs/continuous-integration/use-ci/set-up-test-intelligence).

:::

The diagram below demonstrates how parallelism can accelerate your CI pipelines. Upon implementing parallelism for the first time, the pipeline partitions tests based on file size and gathers timing statistics for all tests. Subsequently, tests are partitioned based on duration to further speed up the pipeline's execution. With every run, test partitioning is refined based on the most up-to-date timing data.

![Parallelism and test times.](./static/speed-up-ci-test-pipelines-using-parallelism-50.png)

## YAML stage with parallelism

Parallelism can be set at either the step level or stage level.

The following code snippet shows a YAML definition of a **Run** step that uses [pytest](https://docs.pytest.org/) to split tests into four test groups to be executed in parallel.

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
          connectorRef: $dockerhub_connector  
          image: python:latest  
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

## Important notes

* When using parallelism, it's important to take into account any resource limitations that exist in your build infrastructure. For more information, go to [Best Practices for Looping Strategies](best-practices-for-looping-strategies.md).
* You can apply a parallelism strategy to an entire stage or to individual steps within a stage.
* When implementing parallelism in a step rather than a stage, you must ensure that each test-group step generates a report with a unique filename to prevent conflicts. You can accomplish this by utilizing the `<+strategy.iteration>` variable, which represents the current test group run's index, ranging from `0` to `parallelism - 1`.
* To publish your test results, your output files must be in [JUnit](https://junit.org/junit5/) XML format. How you publish your test results depends on the specific language, test runner, and formatter used in your repo. For more information, go to the [Publish test reports section](#define-the-test-reports).
* If your stage utilizes Harness Cloud build infrastructure, you can directly call the `split_tests` binary from the **Run** step's `command`. For example, you would use `split_tests` instead of `/addon/bin/split_tests`.


## Set up parallelism in a pipeline

The process to set up parallelism in a pipeline is as follows:

1. Enable parallelism and specify the number of jobs to run in parallel. For more information, go to the [Define the parallelism strategy section](#define-the-parallelism-strategy).
2. Define the following environment variables within the stage or step where you declared the parallelism strategy:
	* `HARNESS_NODE_TOTAL = <+strategy.iterations>` — This specifies the total number of iterations in the current stage or step.
	* `HARNESS_NODE_INDEX = <+strategy.iteration>` — This specifies the index of the current test run, which ranges from `0` to `parallelism-1`. You can define and use these variables in the YAML editor as shown in the following snippet:

```yaml
- step:    
     ....  
     envVariables:   
          HARNESS_NODE_INDEX: <+strategy.iteration>   
          HARNESS_NODE_TOTAL: <+strategy.iterations>   
     command: |-   
          pip install -r requirements.txt   
          FILES=`/addon/bin/split_tests --glob "**/test_*.py" \  
                --split-by file_size \  
                --split-index ${HARNESS_NODE_INDEX} \  
                --split-total=${HARNESS_NODE_TOTAL}`   
          pytest -v --junitxml="result_${HARNESS_NODE_INDEX}.xml" $FILES   
          echo "$HARNESS_NODE_TOTAL runs using file list $FILES" 
```

To define these attributes in the Pipeline Studio, go to the step that implements the parallelism strategy. Then go to **Optional Configuration** > **Environment Variables**.

3. Set up the split\_tests command with the splitting criteria based on file size (`--split-by file_size`). Go to [Define test splitting](#define-test-splitting).
4. Define your test reports. Your reports must be in JUnit format. Go to [Publish test reports](#define-the-test-reports).
5. Run your Pipeline to make sure all your Steps complete successfully. You can see the parallel copies of your Step running in the Build UI.  

   ![Parallel steps in a build.](./static/speed-up-ci-test-pipelines-using-parallelism-51.png)

6. When the build finishes, go to the Tests tab and view your results. You can view results for each parallel run using the pull-down.  

   ![View results for individual runs.](./static/speed-up-ci-test-pipelines-using-parallelism-52.png)

7. Now that Harness has collected timing data, you can split your tests by time and reduce your build times further. Go to [Define test splitting](#define-test-splitting).

## Define the parallelism strategy

The `parallelism` value defines how many steps you want to run in parallel. In general, a higher value means a faster completion time for all tests. The primary restraint is the resource availability in your build infrastructure. The YAML definition looks like this:

```yaml
- step:  
      ...  
      strategy:  
        parallelism: 4
```

### Defining parallelism in the Pipeline UI

You can configure parallelism in the Pipeline Studio as well:

1. In the Pipeline Studio, open the Step or Stage where you run your Tests and click the **Advanced** tab.
2. Under **Looping Strategies**, select **Parallelism** and define your strategy.  

![Define parallelism in a Run step](./static/speed-up-ci-test-pipelines-using-parallelism-53.png)

[Parallelism Workflow](#set-up-parallelism-in-a-pipeline)

## Define test splitting

:::info

The following information applies to test splitting in a **Run** step. For information about test splitting with Test Intelligence (in a **Run Tests** step), go to [Enable Test Intelligence](/docs/continuous-integration/use-ci/set-up-test-intelligence).

:::

You use the `split_tests` CLI command to define the set of tests you want to run. In the **Command** field of the **Run** step where you run your tests, you need to do the following:

1. Configure the `split_tests` command to define how you want to split your tests. This command outputs a string of your test groups.
2. Run the test command with your test-groups string as input.

For example:

```
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

:::

The `split_tests` command creates a new set of test files that is ordered based on your splitting criteria. This command takes the following as inputs:

* The set of all the tests you want to run (`--glob` argument).
* The algorithm used to split the tests into groups (`--split-by` argument).
* The run index and total number of runs. You should set these to the environment attributes you defined previously (`--split-index ${HARNESS_NODE_INDEX}` and `--split-total ${HARNESS_NODE_TOTAL}`).

### Test splitting strategies

The `split_tests` command allows you to define the criteria for splitting tests.

Harness supports the following strategies:

* `--split-by file_size` - Split files into groups based on the size of individual files.  
The pipeline needs timing data from the previous run to split tests by time. If timing data isn't available, the pipeline splits tests using this option.
* `--split-by file_timing` — Split files into groups based on the test times of individual files. This is the default setting: `split_tests` uses the most recent timing data to ensure that all parallel test runs finish at approximately the same time.
* `--split-by test_count` — Split tests into groups based on the overall number of tests.
* `--split-by class_timing` — Split tests into groups based on the timing data for individual classes.
* `--split-by testcase_timing` — Split tests into groups based on the timing data for individual test cases.
* `--split-by testsuite_timing` — Split tests into groups based on the timing data for individual test suites.

### Specifying the tests to split

To split tests based on their run time, you must provide a list of file paths, classes, test cases, or test suites to include. For example, the following code snippet splits tests by time in a **Run** step. The `split_tests` command used in the code parses all matching test files based on the `--glob` option and splits them into separate lists based on `--split-by file_timing`. The number of lists created is determined by the `parallelism` setting. For example, if `parallelism` is set to 2, the command creates two separate lists of files that are evenly divided based on their testing time. The pipeline then creates two parallel steps that run tests for the files in each list.

```
pip install -r requirements.txt  
  
# Split by timing data  
FILES=`/addon/bin/split_tests --glob "**/test_*.py" --split-by file_timing`  
echo $FILES  
pytest -v --junitxml="result_${HARNESS_NODE_INDEX}.xml" $FILES
```

When the pipeline finishes a build, the `echo $FILES` output shows the files that got tested in each step. For example, one log contains the following:

```
+ FILES=test_file_1.py test_file_2.py test_file_6.py test_file_9.py test_file_10.py test_file_12.py test_file_13.py
```

Whereas another log contains:

```
+ FILES=test_file_3.py test_file_4.py test_file_5.py test_file_8.py test_file_11.py test_file_14.py
```

Note that this example applies to the `--split-by file_timing`option. In this case, you can use a glob expression to specify the set of elements that need to be split and tested. For class, test-case, or test-suite timing, you must provide a text file of the elements to split. If you want to split by Java-class timing, for example, you could specify the set of classes to split and test in a new-line-delineated string like this:

```
echo 'io.harness.jhttp.server.PathResolverTest\nio.harness.jhttp.processor.DirectoryIndexTest\nio.harness.jhttp.functional.HttpClientTest\nio.harness.jhttp.processor.ResourceNotFoundTest'> classnames.txt  
CLASSES=`/addon/bin/split_tests --split-by class_timing --file-path classnames.txt`
```

[Parallelism Workflow](#set-up-parallelism-in-a-pipeline)

## Publish test reports

The `report` section in the pipeline YAML defines how to publish your test reports. Here's an example:

```yaml
reports:   
   type: JUnit   
      spec:   
         paths: - "**/result_${HARNESS_NODE_INDEX}.xml"
```

To ensure that your test reports are correctly published and time-based test splitting works, you must do the following:

* Configure your test runner and formatter to publish your test reports in the [JUnit](https://junit.org/junit5/) XML format and include filenames in the XML output. For example, if you use `pytest`, you can set `junit_family=xunit1` in your code repo's `pytest.ini` file. Note that the exact setup and configuration requirements depend on the test runner that you use. Refer to your test runner's documentation to learn how to publish in the correct format.
* If you're implementing `parallelism` in a step, rather than a stage, ensure that each `test-group` step generates a report with a unique filename. You can achieve this using the `<+strategy.iteration>` variable, which represents the index of the current test run, in the range of `0` to `parallelism-1`.

You can configure test reporting options in the Pipeline Studio's YAML or Visual editors. In your pipeline, locate the **Run** or **Run Tests** step and specify the **Report Paths** field. In the Visual editor this field is located under **Optional Configuration**.

![Define Report Paths in a Run step](./static/speed-up-ci-test-pipelines-using-parallelism-54.png)

[Parallelism Workflow](#set-up-parallelism-in-a-pipeline)

## YAML pipeline example with parallelism

The following YAML example shows a full end-to-end pipeline with parallelism enabled.

:::tip

If your stage uses Harness Cloud build infrastructure, your Run step's `command` can use the `split_tests` binary directly. For example, you would use `split_tests` instead of `/addon/bin/split_tests`.

:::

<details>
<summary>Parallelism pipeline YAML example</summary>

```yaml
pipeline:  
    name: parallelism-for-docs-v6  
    identifier: parallelismfordocsv6  
    projectIdentifier: myproject  
    orgIdentifier: myorg  
    tags: {}  
    properties:  
        ci:  
            codebase:  
                connectorRef: $GITHUB_CONNECTOR  
                repoName: testing-flask-with-pytest  
                build: <+input>  
    stages:  
        - stage:  
              name: Build and Test  
              identifier: Build_and_Test  
              type: CI  
              spec:  
                  cloneCodebase: true  
                  infrastructure:  
                      type: KubernetesDirect  
                      spec:  
                          connectorRef: $HARNESS_K8S_DELEGATE_CONNECTOR  
                          namespace: harness-delegate-ng  
                          automountServiceAccountToken: true  
                          nodeSelector: {}  
                          os: Linux  
                  execution:  
                      steps:  
                          - step:  
                                type: Run  
                                name: Run Pytests  
                                identifier: Run_Pytests  
                                strategy:  
                                    parallelism: 4  
                                spec:  
                                    connectorRef: $DOCKERHUB_CONNECTOR  
                                    image: python:latest  
                                    shell: Sh  
                                    envVariables:  
                                        HARNESS_NODE_INDEX: <+strategy.iteration>  
                                        HARNESS_NODE_TOTAL: <+strategy.iterations>  
                                    command: |-  
                                        pip install -r requirements.txt  
                                        FILES=`/addon/bin/split_tests --glob "**/test_*.py" \  
                                               --split-by file_timing \  
                                               --split-index ${HARNESS_NODE_INDEX} \  
                                               --split-total=${HARNESS_NODE_TOTAL}`  
                                        echo $FILES  
                                        pytest -v --junitxml="result_${HARNESS_NODE_INDEX}.xml" $FILES  
                                    reports:  
                                        type: JUnit  
                                        spec:  
                                            paths:  
                                                - "**/result_${HARNESS_NODE_INDEX}.xml"  
                                failureStrategies: []
```

</details>

## See also

* [Optimize and enhance CI pipelines](/docs/continuous-integration/use-ci/optimize-and-more/optimizing-ci-build-times.md)
* [Looping Strategies Overview: Matrix, For Loop, and Parallelism](../8_Pipelines/looping-strategies-matrix-repeat-and-parallelism.md)
* [Best Practices for Looping Strategies](best-practices-for-looping-strategies.md)
* [Run a Stage or Step Multiple Times using a Matrix](run-a-stage-or-step-multiple-times-using-a-matrix.md)
