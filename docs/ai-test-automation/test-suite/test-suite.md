---
title: Test Suites
description: Group and run multiple tests together for efficient batch execution
sidebar_position: 10
keywords:
  - test suite creation
  - batch test execution
  - parallel test running
tags:
  - test-suites
  - automation
  - execution
---


Test Suites allow you to group multiple tests together and run them as a single batch. This is particularly useful for:

- **CI/CD integration**: Automate test execution in your deployment pipelines
- **Regression testing**: Run comprehensive test sets to validate application changes
- **Organized testing**: Group related tests by feature, module, or test type
- **Parallel execution**: Run multiple tests simultaneously to reduce overall execution time

---

## Creating a Test Suite

You can create a new test suite primarily using two methods:

#### Method 1: From the Tests Page

This is the most common way to create a test suite when you already know which tests you want to group together:

1. Navigate to the **Tests** tab in your project
2. Select one or more tests using the checkboxes
3. Click **Add to Suite** at the bottom of the page
4. In the dialog that appears:
   - **Create a new suite**: Enter a name for your new test suite
   - **Add to existing suite**: Select an existing suite from the dropdown
5. Click **Create** or **Add** to confirm

<DocImage
  path={require('./static/test-suite-creation.png')}
  alt="Test Suite Creation"
  title="Click to view full size image"
  width="70%"
/>

#### Method 2: Direct Creation

Alternatively, you can create an empty test suite first and add tests later:

1. Navigate to the **Test Suites** tab from the left navigation
2. Click **Create new suite** button
3. Provide the following details:
   - **Suite name**: A descriptive name for your test suite
   - **Description** (optional): Additional context about the suite's purpose
4. Click **Create**
5. Once created, you can add tests by clicking **Add tests** within the suite

<DocImage
  path={require('./static/create-test-suite.png')}
  alt="Create Test Suite"
  title="Click to view full size image"
  width="70%"
/>

---

## Managing Test Suite Configuration

<DocImage
  path={require('./static/test-suite.png')}
  alt="Test Suite"
  title="Click to view full size image"
  width="70%"
/>


### Tests Tab

View and manage all tests included in the suite:
- **Add tests**: Click **Add tests** to include additional tests
- **Remove tests**: Select tests and remove them from the suite
- **Reorder tests**: Change test execution sequence
- **View test details**: Click on any test to see its configuration

#### Sequencing and Parallel Execution

**Understanding Sequence Numbers**

By default, all tests in a suite have a sequence number of **50**, meaning they can run in any order (parallel execution).

To control execution order:
1. Go to the **Tests** tab in your suite
2. Click the pencil icon next to **SEQ NO**
3. Assign sequence numbers:
   - **Lower numbers run first** (e.g., 10 runs before 20)
   - **Same numbers run in parallel** (e.g., all tests with 50 run together)
   - **Higher numbers run later** (e.g., 100 runs after 50)

**Example sequencing strategy:**
- **Sequence 10**: Setup/prerequisite tests
- **Sequence 50**: Main functional tests (run in parallel)
- **Sequence 100**: Cleanup/teardown tests

:::info Negative Sequence Numbers
Tests can have a negative sequence number (e.g., **-10**). The negative sign indicates that if the test fails, the test suite will abort. This is typically used for setup tests where subsequent tests cannot proceed if the setup fails.
:::

**Maximum Parallel Executions**

Control how many tests run simultaneously:
1. In the suite details page, find **Maximum number of parallel test executions**
2. Click the edit icon
3. Set your desired value (default is **100**)
4. Lower values reduce resource usage but increase total execution time

<DocImage
  path={require('./static/test-suite-sequencing.png')}
  alt="Test Suite Sequencing"
  title="Click to view full size image"
  width="70%"
/>


### Parameters Tab

The **Parameters** tab provides an overview of the test parameters defined for each environment. You can use it to inspect the key-value pairs associated with a specific test and switch between environments to see how the configuration varies.

Selecting an environment updates the displayed parameter values accordingly. This helps users verify environment-specific configurations without editing them.

#### Example

| **Field**       | **Description**                                                  |
| --------------- | ---------------------------------------------------------------- |
| **Test Name**   | Displays the selected test for which parameters are being viewed |
| **Name**        | Parameter key or variable name                                   |
| **Value**       | Value assigned to the parameter key                              |
| **Environment** | Environment selector to switch parameter views                   |



<DocImage
  path={require('./static/parameter.png')}
  alt="Parameters Tab"
  title="Click to view full size image"
  width="70%"
/>



### Run History Tab

Track all past executions of your test suite:
- View execution timestamp
- Check status (Completed, Failed, Running)
- Review duration and test results
- Click on any run to see detailed results


#### **Re-run Test Suite and Tests**

You can re-run test suites or individual tests:

**Quick Access Method:**
1. From the **Test Suites** list page, locate your test suite
2. Click on the **Last Run** column for that test suite
3. This takes you directly to the details page where you can:
   - **Re-run test suite**: Re-execute the entire test suite
   - **Run failed tests**: Quickly re-run only the tests that failed
   - **Select individual tests**: Choose specific tests to re-run by selecting them from the list

>**From Run History Tab:**
>>1. Navigate to the **Run History** tab within a test suite
>>2. Click on a test run to open its details page
>>3. In the **Details** tab, you have the same re-run options as above

This allows you to efficiently debug and validate fixes without running the entire suite every time.

<DocImage
  path={require('./static/rerun-test-suite.png')}
  alt="ReRun Test Suite"
  title="Click to view full size image"
  width="70%"
/>



### Settings Tab

Configure suite-level settings including scheduling and notifications.

#### Scheduling and Notifications

##### Scheduling Test Runs


1. In the **Scheduling** section, enter a cron expression
2. Save your configuration

**Example cron expressions:**
- `0 4 * * *` - Run daily at 4:00 AM UTC
- `0 0 * * 1` - Run every Monday at midnight UTC
- `0 */6 * * *` - Run every 6 hours

Use [crontab.guru](https://crontab.guru/) to create and validate cron expressions.

##### Setting Up Notifications

Get notified when test suite execution completes:

1. In the **Notification** section, configure notification channels:
   - **Slack**: Enter your Slack channel name
   - **Email**: Enter email addresses (comma-separated)
2. Save your configuration

You'll receive notifications after every scheduled or manual execution.

<DocImage
  path={require('./static/test-suite-schedule.png')}
  alt="Test Suite Schedule"
  title="Click to view full size image"
  width="70%"
/>

---

## Test Execution

### Running a Test Suite

1. Navigate to your Test Suite
2. Click **Run suite** in the top-right corner
3. Select the target environment
4. Review and modify parameters if needed
5. Click **Run** to start execution

Tests in the suite run with default parameters and can be bulk edited before execution.

<DocImage
  path={require('./static/run-test-suite.png')}
  alt="Run Test Suite"
  title="Click to view full size image"
  width="70%"
/>

### Execution Behavior

- Tests run in parallel by default (up to the configured maximum)
- Tests with the same sequence number run in parallel
- Tests with different sequence numbers run in order
- Failed tests don't block other tests from running



####  Video Tutorial

Watch this overview of Test Suites in Harness AI Test Automation:

<iframe src="https://www.loom.com/embed/82b37c54cbb24b4db74f926c0f719e7a" width="960" height="540" frameborder="0" allowfullscreen></iframe>

