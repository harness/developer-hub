---
title: Navigate Between Multiple URLs Using Parameters
description: Learn how to handle multi-tab workflows in Harness AI Test Automation by storing URLs in parameters and navigating between them.
sidebar_label: Navigate Multiple URLs
keywords:
  - Multi-tab workflows
  - URL navigation
  - Parameters
  - Custom scripts
tags:
  - ait-tutorials
  - navigation
  - parameters
sidebar_position: 1
---

When working with Harness AI Test Automation (AIT), you can efficiently navigate between multiple URLs by storing them in parameters. This powerful workaround allows you to maintain context across different pages and create sophisticated multi-page test workflows.

This guide shows you how to use parameters and custom scripts to store and navigate between different URLs during your test execution, enabling seamless multi-page testing scenarios.

---

#### How It Works

AI Test Automation focuses on the currently active tab, making it streamlined and efficient. To navigate between different pages in your test workflow, you can leverage parameters to store URLs. This approach gives you:

- Full control over navigation flow
- Ability to return to any previously visited page
- Clean, maintainable test scripts
- Flexibility to build complex multi-page scenarios

The solution is simple: **capture the current URL** before navigating away, store it in a parameter, and use that parameter to navigate back when needed.

<DocVideo src="https://youtu.be/9heJqBeFTuM" />

---

### Step 1: Store the Current URL in a Parameter

Before navigating to a new URL, you need to capture the current page's URL and store it in a parameter.

#### Use a Custom Script Action

1. In your test workflow, add a **Custom Script** action
2. Use the following JavaScript code to capture the current URL:

```javascript
window.location.href
```

3. Configure the action to store the result in a parameter (e.g., `ORIGINAL_URL`)

This captures the full URL of the current page and saves it for later use.

#### Example Configuration

- **Action Type**: Custom Script
- **Script**: `window.location.href`
- **Result Parameter**: `ORIGINAL_URL`

:::tip Why use window.location.href?
`window.location.href` is a JavaScript property that returns the complete URL of the current page, including the protocol, domain, path, and query parameters. This ensures you can navigate back to the exact same page state.
:::



### Step 2: Navigate to a New URL

After storing the original URL, you can now navigate to a different page. You have two options:

**Option 1: Use the Navigate To action**

1. Add a **Navigate To** user action
2. Enter the new URL you want to visit

For example:
```
https://example.com/new-page
```

**Option 2: Use natural language test authoring**

Simply describe the navigation in natural language, and AI Test Automation will handle it:

```
Go to the checkout page
Click on the "Products" link in the navigation menu
```

Whichever method you choose, once you're on the new page, the original page is no longer accessible. However, you have its URL stored in the `ORIGINAL_URL` parameter for later use.



### Step 3: Navigate Back Using the Stored Parameter

When you need to return to the original URL, use the **Navigate To** action again, but this time reference the parameter you created earlier.

1. Add another **Navigate To** user action
2. Use the parameter syntax to reference the stored URL:

```
${ORIGINAL_URL}
```

Harness AIT will automatically substitute the parameter value with the actual URL you stored earlier, taking you back to the original page.



