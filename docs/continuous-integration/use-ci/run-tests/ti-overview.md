---
title: Test Intelligence (TI) overview
description: Reduce unit test time by running only relevant unit tests.
sidebar_position: 2
helpdocs_topic_id: 428cs02e6u
helpdocs_category_id: 29nai2tbs6
helpdocs_is_private: false
helpdocs_is_published: true
redirect_from:
  - /docs/continuous-integration/use-ci/set-up-test-intelligence/set-up-test-intelligence
  - /docs/continuous-integration/use-ci/set-up-test-intelligence/
  - /docs/continuous-integration/use-ci/run-tests/set-up-test-intelligence
  - /docs/continuous-integration/use-ci/run-tests/test-intelligence/set-up-test-intelligence
  - /docs/category/test-intelligence
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Testing is an important part of Continuous Integration (CI). Testing safeguards the quality of your product before shipping. However, test cycles often involve many tests, and it can take a significant amount of time for the tests to run. Additionally, the tests that run might be irrelevant to the code changes that triggered the build, and running all unit tests every time the code changes is expensive and time-consuming.

Harness Test Intelligence (TI) improves unit test time by running only the unit tests required to confirm the quality of the code changes that triggered the build. You can also use parallelism (test splitting) with TI to further optimize your test times.

You can used Test Intelligence with  **Python**, **Java** , **Ruby**, **C#**, **Kotlin**, or **Scala** programming languages

:::info

Test Intelligence applies to unit testing only. For other types of tests, [use Run steps](../run-step-settings.md).

:::

## How does Test Intelligence work?

Test Intelligence uses _test selection_ to run only those tests that are relevant to code changes. This includes changes to your software's code, as well as changes to your tests (new or modified tests). Instead of always running all unit tests, TI selects only the relevant subset of unit tests and skips the rest.

When you perform a pull request, TI uses the following metrics to select tests:

- **Changed code:** TI queries Git to learn exactly which code changed in a specific build. TI uses this data to select tests that are associated directly or indirectly with the source code changes. TI selects these tests as part of the subset of the tests run in the pipeline. TI skips tests that aren't needed because there were no relevant code change.
  - Changes to certain files, such as `build.gradle`, `pom.xml`, and so on, can cause TI to select all tests due to the potential broad impact of these files. If a certain file is not relevant to the code you want to test, you can configure TI to [ignore tests or files](#ignore-tests-or-files).
- **Changed tests:** When a test is changed, TI selects and runs that test, even if the code the test covers hasn't changed.
- **New tests:** When you add a new test, TI selects and runs that test. This ensures that the test is running successfully and also finds correlations between the new test and new/existing code.

TI is always up to date and syncs when you merge code to any branch.

After a build runs, TI gives you full visibility into which tests were selected and why. This can help you identify negative trends and gain insights to improve test quality and coverage. You can find the Test results and the TI call graph visualization on the **Build details** page. The call graph visualization shows the changed classes and methods that caused each test to be selected.

<details>
<summary>Test Intelligence architecture</summary>

Test Intelligence is comprised of a TI service, a Test Runner Agent, and the **Test** step.

- **TI service:** The TI service manages the data about repositories, git-commit graphs, test results, and call graphs. When a build runs, TI service uses a list of added/modified files with the call graph to identify which tests to run.
  - The TI service can receive real-time Git webhook notifications for any commit or merge. The TI service pulls the Git commit-graph and other metadata from Git for test selection.
  - When the TI Test Runner Agent sends a call graph generated from a PR, the TI service keeps that data in a staging area in case the PR doesn't get merged into the target branch (such as `main`). Once the TI receives the merge notification from Git, it updates and inserts the partial call graph with the target branch's call graph.
- **Test Runner Agent:** The Test Runner Agent runs on the build infrastructure. It's responsible for communicating with the TI service. Whenever a **Test** step initializes, the Test Runner Agent provides the TI service with the build number, commit-id, and other details, and the TI service returns the list of selected tests. The Test Runner Agent runs the selected tests. After all the tests run, the Agent parses the test results and uploads the results along with the newly-generated call graph.
- **Test step:** While you can also run tests in a [Run step](../run-step-settings.md), to enable Test Intelligence, you must use the **Test** step. TI identifies the programming language and uses the **Test** step to run the selected tests in that step's container. The **Test** step, through the Test Runner Agent, parses the test results and returns the results to the TI service.

</details>

## Enable Test Intelligence (TI)

We recommend using [ **Test**](./tests-v2.md) Step (Test Intelligence v2) to run your tests. This is a newer, simplified version of Test Intelligence, where you do not need to change your test commands - Test Intelligence will be automatically configured for you in runtime, making it easier to use.


For instructions on using the Test Intelligence (v2), go to: [Test Intelligence step](./tests-v2.md)

For instructions on using the Test Intelligence (v1), go to:

- [Enable TI with Run Tests step for C#](./tests-v1/ti-for-csharp.md)
- [Enable TI with Run Tests step for Java, Kotlin, or Scala](./tests-v1/ti-for-java-kotlin-scala.md)
- [Enable TI with Run Tests step for Python](./tests-v1/ti-for-python.md)
- [Enable TI with Run Tests step for Ruby](./tests-v1/ti-for-ruby.md)


## Ignore tests or files

If you want Test Intelligence to ignore certain tests or files, create a `.ticonfig.yaml` file in your codebase, and list the tests and files to ignore. For example:

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

## View test reports and test selection

Test results and test selection are reported on the **Tests** tab. The visualization call graph provides insights into why each test was selected. You can drill down into selected tests to examine selected classes/methods in more detail. For more information about test reports and test selection, go to [View tests](./viewing-tests.md).

## Troubleshoot Test Intelligence

Go to the [CI Knowledge Base](/kb/continuous-integration/continuous-integration-faqs) for questions and issues related to Test Intelligence, including:

* [Does Test Intelligence split tests? Can I use parallelism with Test Intelligence?](/kb/continuous-integration/continuous-integration-faqs/#does-test-intelligence-split-tests-why-would-i-use-test-splitting-with-test-intelligence)
* [Test Intelligence call graph is empty.](/kb/continuous-integration/continuous-integration-faqs/#on-the-tests-tab-the-test-intelligence-call-graph-is-empty-and-says-no-call-graph-is-created-when-all-tests-are-run)
* [Ruby Test Intelligence can't find rspec helper file.](/kb/continuous-integration/continuous-integration-faqs/#ruby-test-intelligence-cant-find-rspec-helper-file)
* [Test Intelligence fails due to Bazel not installed, but the container image has Bazel.](/kb/continuous-integration/continuous-integration-faqs/#test-intelligence-fails-due-to-bazel-not-installed-but-the-container-image-has-bazel)
* [Does Test Intelligence support dynamic code?](/kb/continuous-integration/continuous-integration-faqs/#does-test-intelligence-support-dynamic-code)
* [Errors when running TI on Python code.](/kb/continuous-integration/continuous-integration-faqs/#python-test-intelligence-errors)
* [Test Intelligence fails with error 'Unable to get changed files list'.](/kb/continuous-integration/continuous-integration-faqs/#test-intelligence-fails-with-error-unable-to-get-changed-files-list)


