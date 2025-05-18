---
title: Conditionals
description: Conditionals
sidebar_position: 25
---
## Overview

Conditionals allow users to define different execution paths in a test based on specified conditions. A test can use a combination of IF, ELSE IF, ELSE, and END IF statements to create branching logic in your test flows.

If an IF statement doesn't have a corresponding END IF, the user cannot save the test. Such errors are highlighted in red to help identify missing closing statements.

## Conditional Statements

### IF / ELSE IF

Used to create conditional branches in test execution.

| Feature | Description |
|---------|-------------|
| **Description** | Takes custom JavaScript as input that must evaluate to TRUE or FALSE. If the condition returns true, subsequent steps in the test block are executed. |
| **Parameter options** | Custom Script |
| **Advanced options** | None |
| **Return value** | TRUE or FALSE |

<DocImage
  path={require('./static/if.png')}
  alt="IF conditional"
  title="Click to view full size image"
  width={400}
  height={800}
/>

### ELSE

Creates an alternative execution path.

| Feature | Description |
|---------|-------------|
| **Description** | Used to create an alternative path for test execution when the preceding IF or ELSE IF conditions evaluate to FALSE |
| **Parameter options** | None |
| **Advanced options** | None |
| **Return value** | None |

### END IF

Closes a conditional block.

| Feature | Description |
|---------|-------------|
| **Description** | Used to end a conditional block, marking the conclusion of IF/ELSE IF/ELSE statements |
| **Parameter options** | None |
| **Advanced options** | None |
| **Return value** | None |
