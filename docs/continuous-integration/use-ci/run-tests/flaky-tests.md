---
title: Flaky Tests
description: Use Test Analysis Plugin to manage flaky tests
sidebar_position: 40
canonical_url: https://www.harness.io/blog/continuous-integration-testing
---



## Manage Flaky Tests

The [Test Analysis Plugin](https://github.com/harness-community/parse-test-reports/blob/main/README.md) is designed to enhance test reporting capabilities within the Harness CI pipeline. It processes JUnit XML test reports, allowing for the management of flaky tests through a quarantine list. By leveraging the `fail_on_quarantine` setting, the plugin can determine whether to fail the pipeline based on tests that are not present in a specified quarantine list.

**How it works**

1. Set the failure strategy of the step that runs the tests to ignore failures. 
2. Use the plugin in a subsequent Plugin step to scan the test report directories set in the plugin, and fail the build if any failures are found.


### Usage example 

Below is an example configuration for using the Test Analysis Plugin with `fail_on_quarantine` set to `true`, to consider flaky tests.


```yaml
- step:
    type: Plugin
    name: Test Analysis Plugin
    identifier: Plugin_1
    spec:
      connectorRef: Plugins_Docker_Hub_Connector
      image: plugins/test-analysis:latest
      settings:
        test_globs: folder1/*.xml, folder2/*.xml # path(s) including the JUnit tests results to parse
        quarantine_file: quarantinelist.yaml # Public URL or local path to the quarantine file
        fail_on_quarantine: true # enable flaky tests mode 
- step:
    identifier: verify_output_variables
    type: Run
    name: Verify Output Variables
    spec:
      shell: Sh
      command: |- #Print the output variables exposed by this plugin
        #!/bin/sh
        echo "Test Analysis Plugin Results:"
        echo "Total Tests: <+steps.Plugin_1.output.outputVariables.TOTAL_TESTS>"
        echo "Passed Tests: <+steps.Plugin_1.output.outputVariables.PASSED_TESTS>"
        echo "Failed Tests: <+steps.Plugin_1.output.outputVariables.FAILED_TESTS>"
        echo "Skipped Tests: <+steps.Plugin_1.output.outputVariables.SKIPPED_TESTS>"
        echo "Error Tests: <+steps.Plugin_1.output.outputVariables.ERROR_TESTS>"
```


### Plugin Input Settings

 * `test_globs`: Path(s) including the JUnit test results to parse (e.g., folder1/*.xml, folder2/*.xml).
 * `quarantine_file`: Public URL or local path to the quarantine file (e.g., quarantinelist.yaml).
 * `fail_on_quarantine`: Enables flaky tests mode (e.g., true to activate the quarantine logic).

When `fail_on_quarantine` is set to `false` or omitted, the plugin scans the directories specified by input globs for JUnit XML test reports, and will exit with status 1 if it finds any test failures. See more in [Parse JUnit tests results](http://localhost:3000/docs/continuous-integration/use-ci/run-tests/viewing-tests#parse-junit-tests-results)   


### Quarantine List Format

The quarantine list should be structured in YAML format as follows. This list contains tests that are known to be flaky and should not cause the pipeline to fail.


```yaml
quarantine_tests:
  - classname: JUnitXmlReporter.helper
    name: TestOne
    start_date: 2024-01-01
    end_date: 2025-12-31
    meta:
  - classname: JUnitXmlReporter.constructor
    name: TestTwo
    start_date: 2023-05-01
    end_date: 2025-11-30
    meta:
  # Additional entries...
```

#### Quarantine List Fields
Each entry in the quarantine list includes the following fields:

* `classname`: The fully qualified name of the test class.
* `name`: The name of the specific test method.
* `start_date`: The date from which the test is considered flaky. It should be formatted as YYYY-MM-DD. This is an optional field. 
* `end_date`: The date until which the test is considered flaky. It should also be formatted as YYYY-MM-DD. This is an optional field. 
* `meta`: This field is meant for any additional metadata that the customer may wish to include, such as notes or comments about the test. This field is ignored by the plugin's processing logic, meaning it does not affect the functionality of the quarantine mechanism. This is an optional field. 

If `start_date` and `end_date` are provided, if a test listed in the quarantine list fails but the failure occurs outside of the defined date range, the plugin will treat this as a failure and fail the step accordingly. This ensures that only tests recognized as flaky during their specified period will not impact the CI process negatively

A sample quarantine file can be found at the following URL: [Quarantine List Example](https://github.com/harness-community/parse-test-reports/blob/main/quarantinelist.yaml).

### Plugin Output Variables
The plugin will publish the following output variables:

* TOTAL_TEST_COUNT: Total number of tests run, including all individual test cases.
* FAIL_COUNT: Number of tests that failed.
* PASS_COUNT: Number of successful tests.
* SKIPPED_COUNT: Number of tests that were skipped.
* ERROR_COUNT: Number of tests that encountered errors.

If multiple XML files are parsed, the counts for these output variables will be aggregated across all files.


