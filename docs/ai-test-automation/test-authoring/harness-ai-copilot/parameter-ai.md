---
title: Parameter Creation through AI
sidebar_label: Extraction - AI Parameters
sidebar_position: 50
description: Learn how to create and extract parameters using AI-driven parameterization.
tags:
  - ai-test-automation
  - intent-driven
  - natural-language
  - parameterization
keywords:
  - Intent-Driven Testing
  - AI Test Automation
  - Parameterized Tests
  - Data-Driven Testing
---

AI-driven parameter extraction in Harness AI Test Automation enables you to automatically capture dynamic data from your application and convert it into reusable parameters. Instead of manually identifying and extracting values, you describe what data you need in natural language, and the AI locates, extracts, and creates parameters that can be used throughout your test scenarios.

## What are AI Parameters?

AI parameters allow you to extract data from your application's UI and store it as test parameters without writing complex selectors or extraction logic. The AI understands the context of your request, locates the relevant data on the page, and creates named parameters with the extracted values that can be reused in subsequent test steps.

**Key characteristics:**

- **Natural language based** - Describe what data you want to extract in plain English
- **Context-aware extraction** - AI understands the application state and locates data intelligently
- **Automatic parameter creation** - Extracted values are automatically stored as reusable parameters
- **Dynamic value handling** - Works with data that changes between test runs (order IDs, timestamps, generated codes)

## Creating AI Parameters

To extract data and create parameters, describe what information you want to capture in natural language.

<DocImage
  path={require('./static/paramet-creation.png')}
  alt="Parameter Creation"
  title="Parameter Creation"
/>

Parameter creation follows a natural language pattern. You can describe what data you want to capture and the AI will locate it, extract the value, and create a parameter for you.

**Example prompts:**

- `Create a parameter of balance and set the value of the Standard account balance`
- `Extract the order ID as order_number`
- `Create a parameter called cart_total with the total price from the cart`
- `Extract the confirmation code displayed on the success page as confirmation_code`

Once a parameter is created, you can reference it in subsequent test steps using `{parameter_name}`. The AI automatically substitutes the parameter value when executing the test.

**How it works:**

When you provide a prompt like "Create a parameter of balance and set the value of the Standard account balance", the Copilot:
1. Analyzes the page to locate the Standard account balance
2. Extracts the value from that element
3. Creates a parameter named `balance` with the extracted value
4. Confirms completion with "I am done with the task"

The parameter is now available for use in any subsequent test steps as `{balance}`.


## Best practices

- Use descriptive parameter names that clearly indicate what data is stored (e.g., `user_email` instead of `param1`)
- Extract values as soon as they appear to avoid navigation issues
- Be specific in extraction prompts - provide context to help AI locate the correct data (e.g., "Extract the total price from the checkout summary" instead of just "Extract the price")
- Include validation steps to verify that extracted data meets expected criteria
- Consider scenarios where the data might not be present and handle them gracefully

## Next Steps

- Learn about [Simple Steps - AI Actions](/docs/ai-test-automation/test-authoring/harness-ai-copilot/simple-step) for basic interactions
- Explore [Multi-Step AI Tasks](/docs/ai-test-automation/test-authoring/harness-ai-copilot/natural-language-tests) for complex workflows
- Understand [AI Assertions](/docs/ai-test-automation/test-authoring/harness-ai-copilot/ai-assertions) to validate extracted parameters
- Review the [Harness AI documentation category](/docs/category/harness-ai-1) for comprehensive capabilities