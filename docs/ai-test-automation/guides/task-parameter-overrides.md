---
title: Setting Overrides for Task Parameters
description: Learn how to set parameter overrides at different levels for tasks in AI Test Automation
sidebar_label: Task Parameter Overrides
sidebar_position: 50
keywords:
  - task parameters
  - parameter overrides
  - test parameterization
  - environment overrides
  - test suite overrides
  - task defaults
  - AI Test Automation
  - test configuration
tags:
  - ait-tutorials
  - tasks
  - parameters
  - test-configuration
---

Tasks are reusable functions in AI Test Automation that often contain parameters to handle different scenarios, and understanding how to set parameter overrides allows you to run the same task with different values depending on the execution context such as the environment, test, or test suite. Parameter overrides provide flexibility in test execution by allowing you to define different parameter values for different contexts without modifying the task itself, which is particularly useful when running tests across multiple environments like staging and production, executing tests in different test suites with varying requirements, or needing test-specific parameter values while maintaining a common task definition.

## Override Resolution

AI Test Automation uses a combination-based override system where the more specific the combination of conditions, the higher the precedence, meaning that when a test executes, the system evaluates all configured overrides and selects the one with the highest number of matching conditions. Parameter overrides can be set at four base levels (Task Default, Environment, Test, Test Suite), but these levels can be combined to create more specific overrides such as Environment + Test, Environment + Test Suite, Test Suite + Test, or even Environment + Test Suite + Test.

The system doesn't use a strict top-down hierarchy but rather evaluates based on how specific the override is to the execution context, where an override that matches more conditions is considered more specific and takes precedence over one that matches fewer conditions, with each matching condition adding to the specificity score.

**Override Scope Levels:**

```
┌──────────────────────────────┐
│       Test Suite             │
└──────────────────────────────┘
              ↑
┌──────────────────────────────┐
│          Test                │
└──────────────────────────────┘
              ↑
┌──────────────────────────────┐
│       Environment            │
└──────────────────────────────┘
              ↑
┌──────────────────────────────┐
│          Task                │
└──────────────────────────────┘
```

This diagram shows the available scope levels, not a strict priority hierarchy. The actual resolution is based on **specificity**: when multiple conditions are combined (e.g., Environment + Test), the specificity increases, and the combined override takes precedence over individual conditions.

**Specificity Levels:**

| Level | Conditions Matched | Example | Specificity Score |
|-------|-------------------|---------|-------------------|
| Task Default | 0 | Default value for all | 0 |
| Environment Only | 1 | Staging environment | 1 |
| Test Only | 1 | TestA | 1 |
| Test Suite Only | 1 | Sample Test Suite | 1 |
| Environment + Test | 2 | Staging + TestA | 2 |
| Environment + Test Suite | 2 | Staging + Sample Test Suite | 2 |
| Test Suite + Test | 2 | Sample Test Suite + TestA | 2 |
| Environment + Test Suite + Test | 3 | Staging + Sample Test Suite + TestA | 3 |

**Important:** When a test-specific override (1 condition) and an environment-specific override (1 condition) both exist, the test-specific override wins because test values are intended to be specific to that particular test, whereas environment values impact multiple tests and are therefore considered broader and less specific to the individual test execution.

**Resolution Examples:**

| Override Configuration | Conditions | Value | Execution Context | Value Used | Reason |
|------------------------|-----------|-------|-------------------|------------|--------|
| Task Default | 0 | 100 | TestB in Production | 100 | No overrides match, uses task default |
| Environment = Staging | 1 | 150 | TestB in Staging | 150 | Environment condition matches |
| Test = TestA | 1 | 200 | TestA in Production | 200 | Test condition matches |
| Environment = Staging + Test = TestA | 2 | 400 | TestA in Staging | 400 | Both conditions match (most specific) |
| Environment = Staging | 1 | 150 | TestA in Staging | 400 | Overridden by more specific 2-condition match |
| Test = TestA | 1 | 200 | TestA in Staging | 400 | Overridden by more specific 2-condition match |

When TestA runs in Staging, the system finds three potential matches: the task default (100), the environment override (150), and the test override (200), but it selects the Environment + Test combination override (400) because it matches 2 conditions, making it more specific than any single-condition override.

## Setting Overrides

**Setting a Task Default:**

The task default is the base value used when no other overrides match.

1. Navigate to the task that contains the parameter
2. Open the parameter configuration
3. Edit the value directly in the parameter field (e.g., set `amount` to `99`)
4. Save the changes

:::important
To set a task-level default, simply edit the value directly in the parameters modal. **Do not** use the "+" button to add overrides and set all fields (environment, test, and test suite) to "default" - this does not create a task-level default.
:::

**Setting Overrides with the "+" Button:**

For all other override levels and combinations, use the "+" button in the parameter configuration:

1. Click the **"+"** button to add a new override
2. Select the combination of conditions from the dropdowns:
   - **Environment**: Choose a specific environment or leave as "Default"
   - **Test Suite**: Choose a specific test suite or leave as "Default"
   - **Test**: Choose a specific test or leave as "Default"
3. Enter the override value for this combination
4. Save the changes

**Common Override Combinations:**

**Environment-Only Override:**
- Environment: `Production`
- Test Suite: `Default`
- Test: `Default`
- Value: `150`

This sets the parameter value to `150` for all tests running in the Production environment.

**Test-Only Override:**
- Environment: `Default`
- Test Suite: `Default`
- Test: `Sample Tier Down Test`
- Value: `200`

This sets the parameter value to `200` whenever this specific test runs, regardless of environment or test suite.

**Environment + Test Override:**
- Environment: `Staging`
- Test Suite: `Default`
- Test: `Sample Tier Down Test`
- Value: `400`

This sets the parameter value to `400` only when this specific test runs in the Staging environment.

## Example: Deposit Amount

Let's walk through a real example using a deposit task with an `amount` parameter.

**Initial Configuration:**

**Task Default**: `amount = 100`

This means any test using this deposit task will use `100` as the default amount.

**Adding Environment Override:**

**Environment Override (Staging)**: `amount = 150`

Now, when tests run in the Staging environment, they use `150` instead of `100`. Tests in other environments still use `100`.

**Adding Test-Specific Override:**

**Test Override (Test A)**: `amount = 200`

Test A now uses `200` for the amount, **regardless of which environment it runs in**. Even if Test A runs in Staging (which has an environment override of `150`), it will still use `200` because test values are intended to be specific to that particular test, whereas environment values impact multiple tests and are therefore considered broader.

**Adding Combination Override:**

**Environment + Test Override (Staging + Test A)**: `amount = 400`

Now we have the most specific combination. When Test A runs in Staging, it uses `400`. When Test A runs in any other environment, it uses `200` (its test override). When other tests run in Staging, they use `150` (the environment override).

**Resolution Table:**

| Scenario | Environment | Test | Value Used | Reason |
|----------|-------------|------|------------|--------|
| Test B in Production | Production | Test B | `100` | Task default (no overrides match) |
| Test B in Staging | Staging | Test B | `150` | Environment override matches |
| Test A in Production | Production | Test A | `200` | Test override (more specific than environment) |
| Test A in Staging | Staging | Test A | `400` | Environment + Test combination (most specific) |

:::tip Understanding Precedence
Notice how Test A always uses at least `200`, even in Staging where the environment override is `150`. This is because test values are intended to be specific to that particular test, whereas environment values impact multiple tests. However, when both conditions match (Staging + Test A), the combination override of `400` wins because it matches 2 conditions, making it more specific than any single-condition override.
:::

## Best Practices

**Start with Sensible Task Defaults:** Set task defaults that work for the majority of your test scenarios to reduce the need for overrides and keep your configuration simple.

**Use Environment Overrides for Infrastructure Differences:** Environment overrides are ideal for values that change based on deployment environments, such as API endpoints, database connection strings, or environment-specific credentials.

**Apply Test Overrides for Unique Test Requirements:** When a specific test needs different data than the norm, use a test-specific override rather than modifying the task itself to keep the task reusable across other tests.

**Leverage Combinations for Complex Scenarios:** Use combination overrides (Environment + Test, Test Suite + Test, etc.) when you need fine-grained control over parameter values in specific contexts.

**Document Complex Configurations:** When you have multiple overrides for the same parameter, document them in a table showing which value is used in different scenarios to help with debugging and team understanding.

:::tip Keep It Simple
Start with fewer overrides and add more only when needed. Too many overrides can make the configuration difficult to understand and maintain.
:::

## Troubleshooting

**Override Not Taking Effect:**

**Verify the Combination**: Ensure all the conditions in your override match the actual test execution context. For example, if you set an override for "Staging + Test A", it will only apply when Test A runs in Staging.

**Check for More Specific Overrides**: A more specific combination might be taking precedence. Review all overrides for the parameter to identify which one matches most closely.

**Confirm Parameter Names**: Parameter names are case-sensitive. Ensure the parameter name in your override exactly matches the parameter name in the task.

**Task Default Not Working:**

**Verify Direct Edit**: Confirm you edited the value directly in the parameters modal, not through the "+" button.

**Check for Overrides**: Even a single override can supersede the task default. Review all overrides to see if any match your test execution context.

**Test in Isolation**: Try running the test without any environment or test suite context to see if the task default is applied.

**Understanding Which Override Applies:**

1. List all overrides for the parameter
2. Identify which conditions match your test execution context
3. Select the override with the most matching conditions
4. If no overrides match, the task default is used

## Related Resources

- [Tasks](/docs/ai-test-automation/test-authoring/creating-tests/tasks) - Learn how to create and manage reusable tasks
- [Setting Parameters in Tests](/docs/ai-test-automation/guides/set-parameters) - Understand different ways to set parameter values
- [Test Environments](/docs/ai-test-automation/test-environments/adding-application-environments) - Configure and manage test environments
