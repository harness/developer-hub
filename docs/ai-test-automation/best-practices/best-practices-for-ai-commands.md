---
title: Best Practices for AI Commands
description: Learn how to write effective AI commands for test automation
sidebar_position: 10
keywords:
  - AI command types
  - test automation best-practices
  - assertion writing guidelines
  - command syntax examples
  - task workflow automation
  - data extraction techniques
tags:
  - ai-commands
  - assertions
  - automation
  - best-practices
  - testing
  - workflows
---

# Best Practices for AI Command Types

This guide outlines the four primary AI command types in our testing framework. Each section provides clear examples of what works and what doesn't, helping you write more effective test automation.

---

## AI Assertion

**Purpose:** Verify that the application is in the expected state at specific points in test execution.

AI Assertions check if specific conditions are true in the application's current state. They function as test validation points and always return a boolean result (true/false).

### When to use

- After navigation actions to confirm the correct page loaded
- Before critical actions to ensure preconditions are met
- After data operations to verify changes were applied correctly
- To check for the presence or absence of UI elements

### Writing effective assertions

| ✅ Do | ❌ Don't |
|-------|----------|
| **Use clear, binary questions**<br/>```Is the account balance displayed as $1,250.00?```<br/>*Simple yes/no question that's easy to evaluate* | **Ask vague or compound questions**<br/>```Is everything correct on the page?```<br/>*Too broad and checks multiple conditions* |
| **Include specific reference points**<br/>```In the confirmation dialog, is the deposit amount $100?```<br/>*Provides context since AI lacks step history* | **Assume context from previous steps**<br/>```Is the amount correct?```<br/>*AI doesn't know what "amount" or "correct" refers to* |
| **Test one condition per assertion**<br/>```Is the error message visible?```<br/>```Does the error message contain 'Invalid credentials'?```<br/>*Atomic assertions for better error isolation* | **Combine multiple checks**<br/>```Is the error message visible and does it say 'Invalid credentials'?```<br/>*Harder to debug which condition failed* |
| **Always end with a question mark**<br/>```Are there exactly 5 items in the shopping cart?```<br/>*Consistent format improves clarity* | **Use statements instead of questions**<br/>```There are 5 items in the cart```<br/>*Not clearly an assertion* |
| **Include both positive and negative checks**<br/>```Is the success message visible?```<br/>```Is the error message absent from the screen?```<br/>*Comprehensive test coverage* | **Only test for presence**<br/>```Is there a message?```<br/>*Doesn't verify the correct state* |

### Key guidelines

- **Formulate binary questions** that the AI can evaluate based solely on displayed information
- **Be specific** about expected values or states you're verifying
- **Use consistent formats** like "Is [expected condition] true?" for clearer assertions
- **Provide context** in each assertion since AI lacks memory of previous steps

---

## AI Command

**Purpose:** Manipulate the application interface by interacting with specific elements or controls.

AI Commands instruct the AI to perform **specific, discrete** actions within the application interface, similar to how a user would interact with UI elements.

### When to use

- For basic UI interactions like clicking, typing, selecting, and scrolling
- When you need precise control over individual steps in a workflow
- For test setup operations that prepare the application state
- To interact with specific UI components that require direct manipulation

### Writing effective commands

| ✅ Do | ❌ Don't |
|-------|----------|
| **Use descriptive references, not positions**<br/>```Click on the row where the status shows 'completed'```<br/>*Works even if row order changes* | **Rely on fixed positions**<br/>```Click on the third row```<br/>*Breaks when data changes* |
| **Include distinguishing characteristics**<br/>```Click the 'Submit' button with the green background in the payment form```<br/>*Precise targeting reduces ambiguity* | **Be vague about the target**<br/>```Click the button```<br/>*Multiple buttons may exist* |
| **Add sequencing hints when needed**<br/>```After the loading indicator disappears, click the 'Continue' button```<br/>*Handles timing issues gracefully* | **Ignore timing dependencies**<br/>```Click the 'Continue' button```<br/>*May fail if element isn't ready* |
| **Use semantic identifiers**<br/>```Click on the shopping cart icon```<br/>*Readable and maintainable* | **Reference technical selectors**<br/>```Click on element with ID 'btn-cart-123'```<br/>*Brittle and hard to understand* |
| **Specify exact input format**<br/>```Enter 'test@example.com' in the email field```<br/>```Type '(555) 123-4567' in the phone number field```<br/>*Clear expectations for data format* | **Be ambiguous about input**<br/>```Enter an email```<br/>*AI may not know the expected format* |
| **Identify items by content, not position**<br/>```Select the product with name 'Wireless Mouse'```<br/>*Resilient to list reordering* | **Use ordinal positions in lists**<br/>```Select the second product```<br/>*Fragile when list changes* |

### Key guidelines

- **Prepare for dynamic scenarios** by using content-based references rather than positions
- **Be precise and specific** about both the action and the target element
- **Include waiting conditions** when elements may not be immediately available
- **Consider edge cases** where elements might be conditionally present

---

## AI Task

**Purpose:** Execute complete user journeys or business workflows with a single instruction.

AI Tasks represent high-level business operations that may involve multiple steps and decisions. They operate at a higher abstraction level than individual commands.

### When to use

- For end-to-end workflow testing that mimics real user journeys
- When you want to abstract away implementation details
- For data setup that requires complex business operations
- To test complete business processes rather than individual UI interactions

### Writing effective tasks

| ✅ Do | ❌ Don't |
|-------|----------|
| **Write intent-based actions with specific values**<br/>```Deposit $100 into Checking Account```<br/>*Clear business workflow with concrete details* | **Be vague about the operation**<br/>```Make a deposit```<br/>*Missing critical details like amount and account* |
| **Include contextual details**<br/>```Transfer $500 from Savings to Checking, ensuring sufficient funds are available```<br/>*Reduces ambiguity with preconditions and business rules* | **Omit important context**<br/>```Transfer money between accounts```<br/>*Unclear which accounts and validation rules* |
| **Structure complex workflows with Gherkin**<br/>```Given I'm on the booking page```<br/>```When I search for flights from NYC to London```<br/>```Then select the cheapest option for next Friday```<br/>*Clear preconditions, actions, and outcomes* | **Write run-on instructions**<br/>```Go to booking page and search flights NYC to London next Friday and pick cheapest```<br/>*Hard to parse and understand* |
| **Break down into focused sub-tasks**<br/>```1. Add three items to cart```<br/>```2. Proceed to checkout```<br/>```3. Select standard shipping```<br/>```4. Complete payment```<br/>*Easier to understand and execute* | **Combine too many steps**<br/>```Add items, checkout, ship, and pay```<br/>*Overwhelming and prone to errors* |
| **Include success criteria**<br/>```Register a new user and verify the welcome email is sent```<br/>*AI knows when the task is complete* | **Leave completion ambiguous**<br/>```Register a user```<br/>*Unclear what constitutes success* |
| **Specify data requirements**<br/>```Create a new customer with email format: firstname.lastname@example.com```<br/>*Clear data generation rules* | **Assume data format**<br/>```Create a new customer```<br/>*AI may generate unsuitable data* |

### Key guidelines

- **Author intent-based actions** that clearly represent complete business workflows
- **Include contextual details** like preconditions, account types, or expected outcomes
- **Use Gherkin syntax** (Given/When/Then) for complex workflows to improve clarity
- **Break down complex processes** into smaller, focused tasks
- **Specify business rules** or validation criteria that should be considered
- **Define success criteria** so the AI knows when the task is complete

---

## AI Extract Data

**Purpose:** Dynamically retrieve and store data from the application interface for verification or subsequent operations.

AI Extract Data commands capture specific information from the application for storage and later use in test execution.

### When to use

- When you need to capture dynamic data generated during test execution
- For retrieving values that need to be verified later in the test
- To gather data needed for subsequent test steps
- For comparing values across different parts of the application
- To extract information for reporting or debugging purposes

### Writing effective extract commands

| ✅ Do | ❌ Don't |
|-------|----------|
| **Be precise about the data location**<br/>```Create parameter ORDER_ID and assign the order number from the confirmation message```<br/>*Specific location and clear parameter name* | **Be vague about where to find data**<br/>```Get the order number```<br/>*Unclear where to look and no parameter name* |
| **Specify the expected format**<br/>```Extract the total amount as a number without currency symbol and store in TOTAL```<br/>*Clear format expectations* | **Assume format handling**<br/>```Extract the total amount```<br/>*Unclear if "$1,234.56" or "1234.56" is expected* |
| **Use descriptive parameter names**<br/>```Create parameter USER_EMAIL and assign the email from the profile section```<br/>*Self-documenting parameter name* | **Use generic names**<br/>```Create parameter DATA1```<br/>*Unclear what the parameter contains* |
| **Provide context for identification**<br/>```Extract the price from the row where product name is 'Wireless Mouse'```<br/>*Handles multiple similar items* | **Assume uniqueness**<br/>```Extract the price```<br/>*May extract wrong value if multiple prices exist* |
| **Clarify single vs multiple values**<br/>```Extract all product names from the search results into PRODUCT_LIST```<br/>*Clear that multiple values are expected* | **Be ambiguous about quantity**<br/>```Extract product names```<br/>*Unclear if one or many values* |
| **Ensure data visibility**<br/>```Scroll to the footer, then extract the copyright year into YEAR```<br/>*Ensures data is in viewport* | **Extract from hidden areas**<br/>```Extract the copyright year```<br/>*May fail if footer isn't visible* |
| **Reference structural landmarks**<br/>```From the 'Order Summary' section under 'Shipping Address', extract the ZIP code```<br/>*Uses headers to guide extraction* | **Ignore document structure**<br/>```Extract the ZIP code```<br/>*Ambiguous in forms with multiple addresses* |
| **Specify fallback behavior**<br/>```Extract the discount amount, or set to 0 if no discount is applied```<br/>*Handles edge cases gracefully* | **Assume data always exists**<br/>```Extract the discount amount```<br/>*Fails when discount isn't present* |

### Key guidelines

- **Make commands precise and specific** to the data you want to extract
- **Ensure data is visible** in the viewport and legible before extraction
- **Use descriptive parameter names** that clearly indicate what data they contain
- **Specify the expected format** (text, number, date, etc.) and any formatting rules
- **Provide context** for identifying the correct data when similar items appear multiple times
- **Clarify single vs multiple values** when extracting from lists or tables
- **Reference structural landmarks** (headers, sections) in structured documents
- **Define fallback behavior** if the expected data cannot be found

---

## Summary

Effective AI commands share common characteristics:

- **Clarity**: Use precise language that leaves no room for ambiguity
- **Context**: Provide enough information since AI lacks memory of previous steps
- **Specificity**: Include concrete values, locations, and expected outcomes
- **Resilience**: Design commands that work even when the application state varies

By following these best practices, you'll create more reliable, maintainable, and effective test automation.

