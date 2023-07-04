---
title: Get started with Test Intelligence
description: Reduce unit test time by running only relevant unit tests.

sidebar_position: 50
helpdocs_topic_id: vtu9k1dsfa
helpdocs_category_id: pjovrkldfq
helpdocs_is_private: false
helpdocs_is_published: true
---

Testing is an important part of Continuous Integration (CI). Testing safeguards the quality of your product before shipping. However, test cycles often involve many tests and it can take a significant amount of time for the tests to run. Additionally, the tests that run might be irrelevant to the code changes that triggered the build.

Harness Test Intelligence (TI) helps your test cycle move faster without compromising quality. TI dramatically improves test times by running only the unit tests required to confirm the quality of the code changes that triggered the pipeline. Instead of always running all unit tests, TI selects a subset of unit tests and skips the rest. Harness TI can also automatically split selected tests to run them in parallel.

You have full visibility into which tests were selected and why. Enabling TI doesn't require you to change build and test processes.

Test Intelligence is available for the following codebases:

* Java
* Kotlin
* Scala
* C# .NET Core, <!-- Framework, -->NUnit
  * Test Intelligence for .NET is behind the Feature Flag `TI_DOTNET`. Contact [Harness Support](mailto:support@harness.io) to enable the feature. <!-- * Framework is supported on Windows [VM build infrastructures](/docs/category/set-up-vm-build-infrastructures/) only. -->

:::info

Test Intelligence is for unit tests only.

:::

## Visual summary

The following video walks you through setting up Test Intelligence in a Harness CI pipeline. The TI section starts after the 11 minute mark in the video.

<!-- Video:
https://harness-1.wistia.com/medias/rpv5vwzpxz-->
<docvideo src="https://www.youtube.com/embed/eAtIO4bJ3No" />

<!-- div class="hd--embed" data-provider="YouTube" data-thumbnail="https://i.ytimg.com/vi/kZmOCLCpvmk/hqdefault.jpg"><iframe width=" 480" height="270" src="https://www.youtube.com/embed/eAtIO4bJ3No" frameborder="0" allowfullscreen="allowfullscreen"></iframe></div -->

## How does Test Intelligence work?

Running all unit tests every time the code changes is expensive and time-consuming. Test Intelligence builds software faster than a full build-and-test run by doing the following:

* Uses *test selection* to prioritize and run only those tests that are relevant to code changes. This includes changes to your software's code as well as changes to your tests (new or modified tests).
* Identifies negative trends and provides actionable insights to improve quality.
* Uses the call graph of the instrumented source code to ensure full accuracy.

:::tip

You can use [parallelism (test splitting) with Test Intelligence](/docs/continuous-integration/use-ci/set-up-test-intelligence/#enable-parallelism-for-test-intelligence) to further optimize your test times.

:::

## Test Intelligence components

Test Intelligence is comprised of a TI service, a Test Runner Agent, and the **Run Tests** step.
### Test Intelligence Service

Test Intelligence (TI) runs as a service, agnostic to the CI solution. The TI service manages the data about repositories, git-commit graphs, test results, and call graphs.

During a build, there is a selection phase where the TI service uses the list of added/modified files with the call graph to identify which tests to run.

The TI service can also receive real-time Git webhook notifications for any commit or merge. The TI service pulls the Git commit-graph and other metadata from Git for test selection and ordering. When the TI test runner agent sends a call graph generated from a PR, the TI service keeps that data in a staging area in case the PR doesn't get merged into the target branch (such as `main`). Once the TI receives the merge notification from Git, it updates and inserts the partial call graph with the target branch's call graph.

### Test Runner Agent

The Test Runner Agent runs on the build infrastructure. It's responsible for communicating with the TI service. Whenever a test step is about to execute, the Test Runner Agent provides the TI service with the build number, commit-id, and other details. The TI service returns the tests that are selected to run. The Test Runner Agent runs the tests with the instrumentation `ON`. After all the tests run, the Agent parses the test results and uploads the results along with the newly-generated call graph.

### Run Tests step

While you can [use a script in a Run step](../use-ci/run-ci-scripts/run-a-script-in-a-ci-stage.md) to run tests in a CI pipeline, to enable Test Intelligence, you must use the [Run Tests step](../use-ci/set-up-test-intelligence/configure-run-tests-step-settings.md). The **Run Tests** step is similar to the **Run** step, and it accepts additional test-specific information, such as the programming language of the source code being tested, build tools, and other parameters.

TI identifies the programming language and uses the **Run Tests** step to run the selected tests in the **Run Tests**  step container. The **Run Tests** step then parses test results and returns the results to the TI service.

## Synchronization and test selection

TI is always up to date and syncs when you merge code to any branch.

When you perform a pull request, TI determines which tests should be run based on the following metrics:

* Changed code: TI queries Git to learn exactly which code has changed in a specific build. TI uses this data to select tests that are associated directly, or indirectly, with the source code changes. TI selects these tests as part of the subset of the tests run in the pipeline. Lastly, TI skips tests that aren't needed because there was no relevant code change.
* Changed tests: When a test is changed, TI selects and runs that test, even if the code the test covers hasn't changed.
* New tests: If you add a new test, TI selects and runs that test. This ensures that the test is running successfully and also finds correlations between the new test and new/existing code.

## View test results and selection criteria

After each test cycle, you have full visibility into which tests were selected by TI and why. You can find the Test results and the Test Intelligence call graph visualization on the **Build details** page.

The visualization shows the changed classes and methods that caused each test to be selected.

For details about the test report contents and the call graph visualization, go to [View test reports](/docs/continuous-integration/use-ci/set-up-test-intelligence/#view-test-reports).

## What can you achieve with Test Intelligence?

We ran Test Intelligence on our biggest repository, Harness-Core. Here's what we achieved:

![](./static/test-intelligence-concepts-5012.png)

* PRs checked: 2,500
* Average UT time without TI: 43 minutes
* Average UT time with TI: 32 minutes
* Percentage of time saved with TI: 35%
* Person Days saved with TI: 66
* Yearly cost savings in USD: $600,000

Here's how Harness Test Intelligence performed with some popular open-source repositories:

| **Project name** | **Average test run time without TI** | **Average test run time with TI** |
| -- | -- | -- |
| Harness-Core | 43 mins | 32 mins |
| Incubator Pinot | 338 mins | 228 mins |
| Hudi | 58 mins | 43 mins |
| RocketMQ | 4.6 mins | 3.1 mins |
| Spring Cloud Alibaba | 0.744 mins | 0.59 mins |
| Incubator Shenyu | 1.16 min | 0.4 min |
| Sentinel | 1.90 min | 1 min |

## Try it yourself

For instructions, go to [Enable Test Intelligence](../use-ci/set-up-test-intelligence/set-up-test-intelligence.md).

Test Intelligence is also available as part of the [Harness CI free trial](https://www.harness.io/pricing?module=ci#).
