---
title: Test Intelligence overview
description: Reduce unit test time by running only relevant unit tests.
sidebar_position: 10
helpdocs_topic_id: 428cs02e6u
helpdocs_category_id: 29nai2tbs6
helpdocs_is_private: false
helpdocs_is_published: true
redirect_from:
  - /docs/continuous-integration/use-ci/set-up-test-intelligence/set-up-test-intelligence
  - /docs/continuous-integration/use-ci/set-up-test-intelligence/
  - /docs/continuous-integration/use-ci/run-tests/set-up-test-intelligence
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import OutVar from '/docs/continuous-integration/shared/output-var.md';
```

:::info

Test Intelligence applies to unit testing only. For other types of tests, [use Run steps](../../run-ci-scripts/run-step-settings.md) to run tests.

:::

Testing is an important part of Continuous Integration (CI). Testing safeguards the quality of your product before shipping. However, test cycles often involve many tests, and it can take a significant amount of time for the tests to run. Additionally, the tests that run might be irrelevant to the code changes that triggered the build, and running all unit tests every time the code changes is expensive and time-consuming.

Harness Test Intelligence (TI) improves unit test time by running only the unit tests required to confirm the quality of the code changes that triggered the build. You can also use [parallelism (test splitting) with TI](./ti-test-splitting.md) to further optimize your test times.

## How does Test Intelligence work?

Test Intelligence uses *test selection* to run only those tests that are relevant to code changes. This includes changes to your software's code, as well as changes to your tests (new or modified tests). Instead of always running all unit tests, TI selects only the relevant subset of unit tests and skips the rest.

When you perform a pull request, TI uses the following metrics to select tests:

* **Changed code:** TI queries Git to learn exactly which code changed in a specific build. TI uses this data to select tests that are associated directly or indirectly with the source code changes. TI selects these tests as part of the subset of the tests run in the pipeline. TI skips tests that aren't needed because there were no relevant code change.
* **Changed tests:** When a test is changed, TI selects and runs that test, even if the code the test covers hasn't changed.
* **New tests:** When you add a new test, TI selects and runs that test. This ensures that the test is running successfully and also finds correlations between the new test and new/existing code.

TI is always up to date and syncs when you merge code to any branch.

After a build runs, TI gives you full visibility into which tests were selected and why. This can help you identify negative trends and gain insights to improve test quality and coverage. You can find the Test results and the TI call graph visualization on the **Build details** page. The call graph visualization shows the changed classes and methods that caused each test to be selected.

<!-- Video: Test Intelligence demo
https://www.loom.com/share/6f65a77dfdac42639eab745a0b391ce3?sid=9e25316e-b0cf-40b8-9917-39d299f58121-->
<docvideo src="https://www.loom.com/share/6f65a77dfdac42639eab745a0b391ce3?sid=9e25316e-b0cf-40b8-9917-39d299f58121" />

<details>
<summary>Test Intelligence architecture</summary>

Test Intelligence is comprised of a TI service, a Test Runner Agent, and the **Run Tests** step.

* **TI service:** The TI service manages the data about repositories, git-commit graphs, test results, and call graphs. When a build runs, TI service uses a list of added/modified files with the call graph to identify which tests to run.
  * The TI service can receive real-time Git webhook notifications for any commit or merge. The TI service pulls the Git commit-graph and other metadata from Git for test selection.
  * When the TI Test Runner Agent sends a call graph generated from a PR, the TI service keeps that data in a staging area in case the PR doesn't get merged into the target branch (such as `main`). Once the TI receives the merge notification from Git, it updates and inserts the partial call graph with the target branch's call graph.
* **Test Runner Agent:** The Test Runner Agent runs on the build infrastructure. It's responsible for communicating with the TI service. Whenever a **Run Tests** step initializes, the Test Runner Agent provides the TI service with the build number, commit-id, and other details, and the TI service returns the list of selected tests. The Test Runner Agent runs the selected tests. After all the tests run, the Agent parses the test results and uploads the results along with the newly-generated call graph.
* **Run Tests step:** While you can also run tests in a [Run step](../../run-ci-scripts/run-step-settings.md), to enable Test Intelligence, you must use the **Run Tests** step.
   * The **Run Tests** step is similar to the **Run** step, and it accepts additional test-specific information, such as the programming language of the source code being tested, build tools, and other parameters.
   * TI identifies the programming language and uses the **Run Tests** step to run the selected tests in that step's container. The **Run Tests** step, through the Test Runner Agent, parses the test results and returns the results to the TI service.

</details>

## Supported codebases for Test Intelligence

Test Intelligence is available for:

* [Java](./ti-for-java-kotlin-scala.md)
* [Kotlin](./ti-for-java-kotlin-scala.md)
* [Scala](./ti-for-java-kotlin-scala.md)
* [C#](./ti-for-csharp.md)
* [Python](./ti-for-python.md)
* [Ruby](./ti-for-ruby.md)

For other codebases, you can use [Run steps](../../run-ci-scripts/run-step-settings.md) to run tests.

## Enable Test Intelligence

Using TI doesn't require you to change your build and test processes. To enable TI, you must [use a supported codebase](#supported-codebases-for-test-intelligence), add a Run Tests step, and generate the initial call graph. Test selection is applied on subsequent runs after you generate the initial call graph. For instructions and more information, go to:

* [Enable TI for Java, Kotlin, or Scala](./ti-for-java-kotlin-scala.md)
* [Enable TI for C#](./ti-for-csharp.md)
* [Enable TI for Python](./ti-for-python.md)
* [Enable TI for Ruby](./ti-for-ruby.md)

After you've successfully enabled TI, you can further optimize test times by [enabling parallelism (test splitting) for TI](./ti-test-splitting.md). You can also configure TI to [ignore tests or files](#ignore-tests-or-files).

## Test splitting for Test Intelligence

You can use [test splitting with TI](./ti-test-splitting.md) to further reduce test times.

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

For information about test reports for Test Intelligence, go to [View tests](../viewing-tests.md).
