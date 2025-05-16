---
title: Assertions
description: Assertions
sidebar_position: 30
---
## Overview

Assertions are critical components of effective testing. They make tests robust and provide the proper way to determine whether your application is working as expected. Harness AI Test Automation (AIT) supports a variety of assertions that help validate different aspects of your application's behavior.

This section describes each type of assertion available in Harness AIT.

## Supported Assertions

### Visual Assert

Used for ensuring visual elements display correctly.

| Feature | Description |
|---------|-------------|
| **Description** | Validates that visual elements display correctly. Used for verifying logos, charts, and other visual components with the same input data. When creating this assertion, select a specific area in the app. |
| **Parameter options** | None |
| **Advanced options** | Set a threshold that determines the sensitivity of comparison |
| **Return value** | True or False |

![](https://archbee-image-uploads.s3.amazonaws.com/TK24Pi0IzdXKBLm-pUBmm/BCl2tErCt7cE0tLaS0iBW_visual-assert.png)

### User Question

Uses AI to verify user questions about the current page.

| Feature | Description |
|---------|-------------|
| **Description** | Uses AI to verify questions about specific pages (e.g., "Am I on the dashboard page?"). Relicx AI evaluates the question and returns True or False. |
| **Parameter options** | Question: Input your question (ensure it can be answered with True or False) |
| **Advanced options** | None |
| **Return value** | True or False |

![](https://archbee-image-uploads.s3.amazonaws.com/TK24Pi0IzdXKBLm-pUBmm/cyvM5mKZNag6HqHd5VAw2_ai-question.png)

### Wait for Text

Verifies if specific text exists within a time limit.

| Feature | Description |
|---------|-------------|
| **Description** | A popular assertion that checks whether text exists within a specified wait time. Allows multiple retries after a specified wait time. Can assert on text embedded in other elements like buttons. |
| **Parameter options** | • Text: The string to look for Present: Boolean flag to determine whether the text should exist or not |
| **Advanced options** | • Maximum time to wait in ms: typically 30000• Reload attempts: typically 0• Retry delay in ms: typically 5000• Target picker: used to update the object |
| **Return value** | True or False |


![](https://archbee-image-uploads.s3.amazonaws.com/TK24Pi0IzdXKBLm-pUBmm/6ZaCLZ52EHtR4hTDTE2zj_waitfortext.png)

### Object is Visible

Verifies if a specific object is visible on the page.

| Feature | Description |
|---------|-------------|
| **Description** | Asserts the existence of a specific object |
| **Parameter options** | Target picker to select the object |
| **Advanced options** | None |
| **Return value** | True or False |

### Object is Clickable

Verifies if a specific object can be clicked.

| Feature | Description |
|---------|-------------|
| **Description** | Asserts whether an object is clickable |
| **Parameter options** | Target picker to select the object |
| **Advanced options** | None |
| **Return value** | True or False |

### Object is Not Clickable

Verifies if a specific object cannot be clicked.

| Feature | Description |
|---------|-------------|
| **Description** | Asserts whether an object is not clickable |
| **Parameter options** | Target picker to select the object |
| **Advanced options** | None |
| **Return value** | True or False |

### Script Success

Runs a custom script as part of test execution.

| Feature | Description |
|---------|-------------|
| **Description** | Allows users to run custom scripts during test execution |
| **Parameter options** | • Number of attempts: Usually 1• Time between retries in ms: Usually 0• Script content |
| **Advanced options** | None |
| **Script Type** | JavaScript or Puppeteer |
| **Return value** | True or False |

![](https://archbee-image-uploads.s3.amazonaws.com/TK24Pi0IzdXKBLm-pUBmm/_tLnb8grXngMP4DtRU4e5_assert-script-success-puppeteer.png)

Harness AIT supports two types of scripts:

- **JavaScript** - Use when you want to write a script based on data displayed in your browser. For example, find and delete an element based on a specific string.

- **Puppeteer** - Use when you need to access data outside the browser. For example, verify whether the size of a file downloaded by a Click is greater than 0 bytes.

### URL Assert

Verifies if the current URL matches expected criteria.

| Feature | Description |
|---------|-------------|
| **Description** | Asserts that the test is on the desired URL |
| **Parameter options** | Can match either the entire URL or part of it using different condition types |
| **Advanced options** | None |
| **Return value** | True or False |

![](https://archbee-image-uploads.s3.amazonaws.com/TK24Pi0IzdXKBLm-pUBmm/mcxa_aIo04_eZ3EOFjWGT_assert-url.png)