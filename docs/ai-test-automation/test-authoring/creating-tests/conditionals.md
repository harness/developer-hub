---
title: Conditionals
description: Conditionals
sidebar_position: 25
---
## Overview

Conditionals enable you to create dynamic test flows with different execution paths based on specified conditions. Harness AI Test Automation provides two types of control flow mechanisms:

**Conditional Branching**: Use IF, ELSE IF, ELSE, and END IF statements to build branching logic that executes different steps based on runtime conditions.

**Guaranteed Execution**: Use FINALLY blocks to ensure critical cleanup or verification steps always run at the end of a test, regardless of whether the test passes or fails.

<DocImage
  path={require('./static/conditionals.png')}
  alt="Conditionals"
  title="Click to view full size image"
/>

## Conditional Statements

### IF 

Creates conditional branches in test execution based on specified conditions.

| Feature | Description |
|---------|-------------|
| **Description** | Evaluates a condition that must return TRUE or FALSE. If the condition evaluates to true, the subsequent steps within the conditional block are executed. |
| **Parameter option - Question** | • **User question**: Prompts the user with a question during test execution<br/>• **Text exists**: Checks if specific text is present on the page<br/>• **Text does not exist**: Verifies that specific text is not present on the page<br/>• **Use custom script**: Accepts custom JavaScript that evaluates to TRUE or FALSE |
| **Advanced options** | • **Use page HTML as context**: When enabled, evaluates the condition against the page's HTML source<br/>• **Disable AI code generation for this assertion**: When enabled, causes Copilot to rely solely on visual inspection.  |
| **Return value** | TRUE or FALSE |

<DocImage
  path={require('./static/if-condition.png')}
  alt="IF conditional options"
  title="Click to view full size image"
/>

:::note Usage
Every IF block must be closed with an END IF statement. Tests with unclosed IF blocks cannot be saved.
:::


### ELSE

Creates an alternative execution path.

| Feature | Description |
|---------|-------------|
| **Description** | Used to create an alternative path for test execution when the preceding IF or ELSE IF conditions evaluate to FALSE |
| **Parameter options** | None |
| **Advanced options** | None |
| **Return value** | None |

:::note Usage
ELSE must be preceded by an IF or ELSE IF statement within the same conditional block.
:::

### ELSE IF
Creates an alternative execution path.

| Feature | Description |
|---------|-------------|
| **Description** | Evaluates an additional condition when the preceding IF or ELSE IF conditions evaluate to FALSE. If this condition returns true, the subsequent steps within this block are executed. |
| **Parameter option - Question** | • **User question**: Prompts the user with a question during test execution<br/>• **Text exists**: Checks if specific text is present on the page<br/>• **Text does not exist**: Verifies that specific text is not present on the page<br/>• **Use custom script**: Accepts custom JavaScript that evaluates to TRUE or FALSE |
| **Advanced options** | • **Use page HTML as context**: When enabled, evaluates the condition against the page's HTML source<br/>• **Disable AI code generation for this assertion**: When enabled, causes Copilot to rely solely on visual inspection. |
| **Return value** | TRUE or FALSE |

<DocImage
  path={require('./static/else-if-condition.png')}
  alt="ELSE IF conditional options"
  title="Click to view full size image"
/>

:::note Usage
ELSE IF must be preceded by an IF or another ELSE IF statement within the same conditional block.
:::

### END IF

Marks the end of a conditional block, completing the IF/ELSE IF/ELSE structure.

| Feature | Description |
|---------|-------------|
| **Description** | Used to end a conditional block, marking the conclusion of IF/ELSE IF/ELSE statements |
| **Parameter options** | None |
| **Advanced options** | None |
| **Return value** | None |

:::note Usage
END IF must be preceded by an IF, ELSE IF, or ELSE statement to close the conditional block.
:::




### FINALLY

Ensures critical cleanup or verification steps are always executed, regardless of test outcome.

| Feature | Description |
|---------|-------------|
| **Description** | Defines a block of steps that will always execute at the end of a test, whether the test passes or fails |
| **Parameter options** | None |
| **Advanced options** | None |
| **Return value** | None |

<DocImage
  path={require('./static/finally.png')}
  alt="FINALLY conditional"
  title="Click to view full size image"
/>


:::info

- **Scope**: Each test can have at most one FINALLY block
- **Can contain**: Any test steps, including IF/ELSE conditionals
- **Restrictions**: Cannot be nested inside conditional blocks or used within [tasks](/docs/ai-test-automation/test-authoring/creating-tests/tasks).

:::

>Use FINALLY blocks to ensure your test environment is always left in a clean state, even when unexpected failures occur. This helps maintain test reliability and prevents side effects that could impact subsequent test runs.


