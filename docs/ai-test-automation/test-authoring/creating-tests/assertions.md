---
title: Assertions
description: Assertions
sidebar_position: 30
tags:
  - ai-test-automation
  - assertions
  - testing
  - validation
  - harness
keywords:
  - harness ai test automation assertions
  - no code test assertions guide
  - visual and functional assertions
  - assertion best practices harness
  - automated testing validation rules
---
## Overview

Assertions are critical components of effective testing. They make tests robust and provide the proper way to determine whether your application is working as expected. Harness AI Test Automation (AIT) supports a variety of assertions that help validate different aspects of your application's behavior.

This section describes each type of assertion available in Harness AIT.

<DocImage
  path={require('./static/all-assertion.png')}
  alt="Assert Script Success"
  title="Click to view full size image"
  width="50%"
/>

## Supported Assertions

### Text Exists

Verifies if specific text exists in the application. This assertion is useful for verifying that a specific element is present on the page. You can use parameters to make the assertion dynamic.

**Advanced Options**

- Pick Target Element: Select the element to assert on.



<br/>

### Text Not Exists
Verifies if specific text does not exist in the application. This assertion is useful for verifying that a specific element is not present on the page. You can use parameters to make the assertion dynamic.

**Advanced Options**

- Pick Target Element: Select the element to assert on.


<br/>

### Script Success

Runs a custom script as part of test execution.

| Options | Description |
|---------|-------------|
| **Script Type** | choose between JavaScript or Puppeteer |
| **Specify number of attempts** | Number of attempts to run the script |
| **Specify interval between retries in milliseconds** | Interval between retries in milliseconds, this code will be executed as the body of an async function and is expected to return type true for success.|
| **Specify the script or choose a template** | You can provide an inline script or choose a template such as clicking an element by XPath, writing text to an element by XPath, looking up an XPath and performing actions on the matched element, calling an API and operating on the response, or sending data to an API. |

<DocImage
  path={require('./static/script-success.png')}
  alt="Assert Script Success"
  title="Click to view full size image"
  width="50%"
  height="50%"
/>

Harness AIT supports two types of scripts:

- **JavaScript** - Use when you want to write a script based on data displayed in your browser. For example, find and delete an element based on a specific string.

- **Puppeteer** - Use when you need to access data outside the browser. For example, verify whether the size of a file downloaded by a Click is greater than 0 bytes.

### Wait for Text

Verifies if specific text exists within a time limit. A popular assertion that checks whether text exists within a specified wait time. Allows multiple retries after a specified wait time. Can assert on text embedded in other elements like buttons.

| Options | Description |
|---------|-------------|
| **Text** | Provide the text to wait for. This will wait for the text to be present in the document or the selected target element. |
|**Present**| Boolean flag to determine whether the text should exist or not |


**Advanced Options**
- Maximum time to wait in ms : Maximum time for which the test would wait for the text to be present or not.
- Reload after attempts : Number of times the test would reload the page before giving up.
- Retry delay in milliseconds : Time in milliseconds between retries.
- Pick Target Element : Select the element to assert on.


<DocImage
  path={require('./static/waitfortext.png')}
  alt="Assert Script Success"
  title="Click to view full size image"
  width="50%"
/>

### Wait for Question
Verifies if a specific question is being asked. This assertion is useful for verifying that a specific question is being asked. Make sure that the question is ended with a question mark.

- **Question** : Enter a question that evaluates to true or false. 

**Advanced Options**
- Maximum time to wait in ms : Maximum time for which the test would wait for the question to be asked.
- Reload after attempts : Number of times the test would reload the page before giving up.
- Retry delay in milliseconds : Time in milliseconds between retries.

<DocImage
  path={require('./static/question-asked.png')}
  alt="Assert Script Success"
  title="Click to view full size image"
  width="50%"
/>


### User Question

Uses AI to verify user questions about the current page. Uses AI to verify questions about specific pages (e.g., "Am I on the dashboard page?"). Harness AI evaluates the question and returns True or False.

- **Question** : Input your question (ensure it can be answered with True or False) |

**Advanced Options**
- Use page html as context : If true, the AI will look at the HTML structure of the page otherwise it will focus only on the text content of the page
- Disable AI code generation for this assertion : This will cause Copilot to rely solely on visual inspection. Use this option if there are issues with the reliability of the generated code

<DocImage
  path={require('./static/user-question.png')}
  alt="Assert Script Success"
  title="Click to view full size image"
  width="50%"
/>

### URL

Verifies if the current URL matches expected criteria. Asserts that the test is on the desired URL.

- **Expected URL** : Enter the URL to assert on.

**Advanced Options**

- Assertion Type: This can be any one of these types: `REGEX`, `EQUALS`, `NOT_EQUALS`, `CONTAINS`, `NOT_CONTAINS` for matching the URL.


<DocImage
  path={require('./static/assert-url.png')}
  alt="Assert URL"
  title="Click to view full size image"
  width="50%"
/>

### Object Property

This assertion verifies that a selected element’s property matches an expected value. First, choose the target element, then pick a property type and provide the expected value.

- Property types include: readable text, attribute value, CSS style, and all text content.
- Available properties vary by the element’s class/type.

<DocImage
  path={require('./static/object-property.png')}
  alt="Assert Script Success"
  title="Click to view full size image"
  width="50%"
/>

### Visual Assert

Validates that visual elements display correctly. Used for verifying logos, charts, and other visual components with the same input data. When creating this assertion, select a specific area in the app.

| Options | Description |
|---------|-------------|
| **Target** | Please select a region that you want to visually assert. Harness AI QA Assistant will visually assert this region matches the screen shot |
| **Maximum Number of Pixel Differences Allowed** | Maximum Number of Pixel Differences Allowed while comparing generated screenshot with the stored screenshot. 200 by default |

**Advanced Options**

- Sensitivity: Matching sensitivity (0-1], smaller values make comparison more sensitive. 0.1 by default


<DocImage
  path={require('./static/visual-assert.png')}
  alt="Assert Script Success"
  title="Click to view full size image"
  width="50%"
/>





### Object is Visible

Asserts the existence of a specific object, simply select the object to assert on and it will verify if the object is visible.

### Object is Clickable

Verifies if a specific object can be clicked. Simply select the object to assert on and it will verify if the object is clickable.

### Object is Not Clickable

Verifies if a specific object cannot be clicked. Simply select the object to assert on and it will verify if the object is not clickable.

### File Downloaded

Verifies if a specific file is downloaded. 

| Options | Description |
|---------|-------------|
| **File Name** | Exact or partial file name to verify (supports simple patterns if available). |
| **Minimum file size in bytes** | Assert that the file is at least this size (helps avoid empty/truncated downloads). |
| **Maximum file size in bytes** | Assert that the file does not exceed this size (catches unexpectedly large files). |
| **Exact file size in bytes** | Assert an exact size when the artifact size is deterministic. Leave blank if using min/max. |
| **MIME type** | Assert the content type reported by the browser/server. |

<DocImage
  path={require('./static/file-downloaded.png')}
  alt="Assert Script Success"
  title="Click to view full size image"
  width="50%"
/>





