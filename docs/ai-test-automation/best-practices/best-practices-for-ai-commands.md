---
title: Best Practices for all AI commands
description: How to use AI commands 
sidebar_position: 10
---

# Best Practices for AI Command Types 

This guide outlines the four primary AI command types used in our testing framework, along with detailed explanations and best practices for each type.

## AI Assertion

AI Assertions are verification commands that check if specific conditions are true in the application's current state. They function as test validation points and always return a boolean result (true/false).

**Purpose:** To verify that the application is in the expected state at specific points in test execution.

**Example:**

- "Am I on the home page?"  
- "Is the account balance displayed as $1,250.00?"  
- "Does the error message contain the text 'Invalid credentials'?"  
- "Are there exactly 5 items in the shopping cart?"

**When to use:**

- After navigation actions to confirm the correct page loaded  
- Before critical actions to ensure preconditions are met  
- After data operations to verify changes were applied correctly  
- To check for the presence or absence of UI elements

**Best Practices:**

- Always end your question with a question mark ("?") and use consistent formats like "Is \[expected condition\] true?" for clearer assertions  
- Formulate simple, binary (yes/no) questions that the AI can evaluate based solely on the information displayed  
- Since the AI lacks context from previous steps, include specific reference points (e.g., "In the confirmation dialog, is the deposit amount $100?")  
- Include both positive and negative assertions to ensure comprehensive test coverage (e.g., "Is the error message absent from the screen?")  
- Create atomic assertions that test only one condition per question for better error isolation  
- Avoid compound questions that check multiple conditions (use separate assertions instead)  
- Be specific about the expected values or states you're verifying

## AI Command

AI Commands instruct the AI to perform **specific, discrete** actions within the application interface, similar to how a user would interact with UI elements.

**Purpose:** To manipulate the application interface by interacting with specific elements or controls.

**Example:**

- "Pick a date two days in the future from the calendar"  
- "Click on the 'Submit' button at the bottom of the form"  
- "Enter '[test@example.com](mailto:test@example.com)' in the email field"  
- "Select 'California' from the state dropdown menu"  
- "Scroll down until the 'Load More' button is visible"

**When to use:**

- For basic UI interactions like clicking, typing, selecting, and scrolling  
- When you need precise control over individual steps in a workflow  
- For test setup operations that prepare the application state  
- To interact with specific UI components that require direct manipulation

**Best Practices:**

- Prepare for dynamic scenarios by using descriptive references rather than fixed positions (e.g., "Click on the row where the status first appears as 'completed'" instead of "Click on the third row")  
- Make commands precise and specific, including both the action and the expected target element with distinguishing characteristics (e.g., "Click the 'Submit' button with the green background in the payment form")  
- Since commands lack temporal awareness, include sequencing hints or waiting conditions when needed (e.g., "After the loading indicator disappears, click the 'Continue' button")  
- Use semantic identifiers instead of technical selectors when possible to improve test readability and maintenance (e.g., "Click on the shopping cart icon" rather than referencing element IDs)  
- Consider edge cases where elements might be conditionally present and provide fallback actions  
- For input fields, specify the exact format of data to be entered, including any special characters or formatting  
- When dealing with tables or lists, describe how to identify the target row or item based on its content rather than position

## AI Task

AI Tasks represent high-level business operations that may involve multiple steps and decisions. They operate at a higher abstraction level than individual commands.

**Purpose:** To execute complete user journeys or business workflows with a single instruction.

**Example:**

- "Deposit $100 into checking account"  
- "Purchase the cheapest available flight from New York to London for next Friday"  
- "Register a new user account with random valid information"  
- "Add three items to the cart and complete checkout with standard shipping"  
- "Search for and apply to jobs matching 'software engineer' with salary above $100k"

**When to use:**

- For end-to-end workflow testing that mimics real user journeys  
- When you want to abstract away implementation details  
- For data setup that requires complex business operations  
- To test complete business processes rather than individual UI interactions

**Best Practices:**

- Author an intent-based action which clearly represents a complete business workflow with specific values (e.g., "Deposit $100 into Checking Account" instead of "Make a deposit")  
- Make your actions specific while including contextual details that reduce ambiguity, such as preconditions, account types, or expected outcomes (e.g., "Deposit $100 into Checking Account and verify the updated balance reflects the deposit")  
- While prompts don't need to follow a specific format, structure complex workflows using Gherkin syntax (Given/When/Then) to clarify preconditions, actions, and expected outcomes  
- Break down complex business processes into a sequence of smaller, focused tasks that can be more easily understood and executed by the AI  
- Include relevant business rules or validation criteria that should be considered during task execution (e.g., "Transfer $500 from Savings to Checking, ensuring sufficient funds are available in Savings")  
- Consider providing examples of expected outputs to guide the AI's understanding  
- Specify how to handle expected variations or decision points in the workflow  
- Include success criteria so the AI knows when the task is complete  
- For data-intensive tasks, clearly specify what data should be used or how it should be generated

## AI Extract Data

AI Extract Data commands capture specific information from the application for storage and later use in test execution.

**Purpose:** To dynamically retrieve and store data from the application interface for verification or subsequent operations.

**Example:**

- "Create parameter NAME and assign the name of the user on the welcome message"

**When to use:**

- When you need to capture dynamic data generated during test execution  
- For retrieving values that need to be verified later in the test  
- To gather data needed for subsequent test steps  
- For comparing values across different parts of the application  
- To extract information for reporting or debugging purposes

**Best Practices:**

- Make commands precise and specific to the data you want the AI to extract  
- Make sure the data is in the viewport and legible to human eyes  
- When extracting from structured documents, mention the relevant headers or sections to help the AI focus on the right areas  
- Specify the format you expect the extracted data to be in (text, number, date, etc.)  
- Use descriptive parameter names that clearly indicate what data they contain  
- For tables or lists, clarify whether you want to extract a single value or multiple values  
- When extracting dates, numbers, or currency values, indicate if any formatting should be preserved or removed  
- Provide context on how to identify the correct data when similar items appear multiple times  
- Specify fallback behavior if the expected data cannot be found

