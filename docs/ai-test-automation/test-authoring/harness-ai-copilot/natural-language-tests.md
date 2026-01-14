---
title: Multi-Step AI Tasks - Natural Language Tests
description: Learn how to author multi-step AI tasks using natural language.
sidebar_label: Multi-Step - AI Tasks
sidebar_position: 40
tags:
  - ai-test-automation
  - intent-driven
  - natural-language
keywords:
  - Intent-Driven Testing
  - AI Test Automation
---

Multi-step AI tasks in Harness AI Test Automation let you describe complete business workflows in natural language. Instead of writing brittle scripts or selectors, you state the desired outcome and Copilot plans the sequence, locates elements, navigates the UI, and verifies results for you.
<!--
### How to author Harness AI tasks  during interactive authoring ?

Here we simply instruct Harness AI to perform a specific task and it figures out the required steps. Here in the example below we have asked Copilot to deposit $40 to the savings account&#x20;

<DocImage
  path={require('./static/copilot-step-ia-1.png')}
  alt="Copilot IA"
  title="Click to view full size image"
  width={800}
  height={600}
/>

The Copilot parses the steps and then performs the required action without any supervision. Once the task is done, Copilot returns back the control to the user and the user can either ask the Copilot to proceed or continue to author the test interactively.&#x20;

<DocImage
  path={require('./static/copilot-step-ia-2.png')}
  alt="Copilot IA"
  title="Click to view full size image"
  width={800}
  height={600}
/>

Here we see the steps on the left that Copilot had recorded to perform the task assigned "Deposit $40 to savings account"

Here is a recorded demonstration of how Copilot transfers money from Checking to Savings account

<iframe src="https://www.loom.com/embed/6f2da5b15d814df18d947dd14a09b60d?sid=5cc0d7ad-baf0-403a-a126-4b17dd599320" width="800" height="450" frameborder="0" allowfullscreen></iframe> -->

---

## What are Multi-Step AI Tasks?

Multi-step AI tasks represent high-level business operations that may involve multiple steps and decisions. They operate at a higher abstraction level than individual commands and let you describe the entire outcome you want, while Copilot figures out and executes the sequence of actions.

**Key characteristics:**

- Intent-driven end-to-end workflows
- Automatically decomposed into actionable steps
- Context-aware and resilient to UI changes
- Can include validation criteria and business rules

## Creating Multi-Step Tasks

To create a task, describe the complete business action and any important constraints or expected outcomes. Copilot plans the sequence and executes it for you.


<DocImage
  path={require('./static/multi-task.png')}
  alt="Multi-Task"
  title="Multi-Task"
/>

### Basic prompt structure

- Task intent: What business outcome do you want?  
- Context: Preconditions, page or account context, relevant entities  
- Acceptance criteria: How success should be verified

### Optional: Gherkin-format prompt

You don’t need a specific format, but for complex workflows you can use Gherkin (Given/When/Then) to clarify preconditions, actions, and expected outcomes.

```gherkin
Given I am on the jackets listing page
When I add a medium-sized dark navy zipped jacket priced between ₹3000 and ₹6000 to the cart
Then the cart should contain 1 item sized M-40 with a price in that range, and the checkout total should reflect the item price
```

## Best practices

- Author an intent-based action which clearly represents a complete business workflow with specific values. For example, use "Deposit $100 into Checking Account" instead of "Make a deposit".
- Make your actions specific while including contextual details that reduce ambiguity, such as preconditions, account types, or expected outcomes (for example, "Deposit $100 into Checking Account and verify the updated balance reflects the deposit").
- While prompts don't need to follow a specific format, structure complex workflows using Gherkin syntax (Given/When/Then) to clarify preconditions, actions, and expected outcomes.
- Break down complex business processes into a sequence of smaller, focused tasks that can be more easily understood and executed by the AI.
- Include relevant business rules or validation criteria that should be considered during task execution (for example, "Transfer $500 from Savings to Checking, ensuring sufficient funds are available in Savings").
- Consider providing examples of expected outputs to guide the AI's understanding.

---

## Example: Complete Multi-Step Task Scenario

Multi-step tasks can orchestrate complex business workflows by describing the desired outcome in natural language. Copilot then plans and executes the necessary steps autonomously, handling element location, navigation, and validation.

The example below demonstrates an e-commerce shopping workflow where Copilot adds a specific jacket to the cart based on detailed criteria. Instead of writing individual steps, you describe the complete business goal and Copilot figures out how to achieve it.

<DocImage
  path={require('./static/multi-task-example.png')}
  alt="Multi-Task Example"
  title="Multi-Task Example"
/>

**The task prompt:**

```
Add a medium-sized dark navy zipped jacket within the range of ₹3000 to ₹6000 to the cart.
```

This single natural language instruction encapsulates the entire workflow. Copilot interprets the requirements (color, style, size, price range) and autonomously executes the necessary steps.

**How Copilot executes the task:**

1. **Page readiness check** - Ensures the page is fully loaded and ready for interaction
2. **Product search** - Locates products matching the characteristics (dark navy, zipped, jacket) within the specified price range (₹3000–₹6000)
3. **Product selection** - Clicks the matching product card to open the detail page
4. **DOM stabilization** - Anchors the detail page DOM to ensure reliable element identification
5. **Size selection** - Selects size "M-40" (medium) from available options
6. **Add to cart** - Clicks the "Add to cart" button
7. **Verification** - Confirms the cart sidebar reflects the addition

The task demonstrates context-aware decision-making: Copilot understands that "medium-sized" maps to size M-40, identifies "dark navy" as a color filter, and validates that ₹5,499 falls within the ₹3000–₹6000 range.

**Result validation:**

The cart displays BAG (1) containing "LIGHT WINTER TRAVEL JACKET WIT" with SIZE: M-40 and price ₹5,499, with a checkout button showing the total ₹5,499. This confirms all task requirements were met: medium size, dark navy color, zipped jacket style, and price within the specified range.

Copilot signals task completion with "I am done with the task" and returns control to the user. The entire workflow (from product search to cart validation) executed without manual intervention or brittle selectors.

**Optional: Gherkin format for complex workflows**

For workflows requiring explicit preconditions and acceptance criteria, you can structure prompts using Gherkin syntax:

```gherkin
Given the jackets listing page is fully loaded
When I select a dark navy zipped jacket in the ₹3000–₹6000 price range and choose size M-40
Then the cart should show 1 item with SIZE: M-40 and the price within ₹3000–₹6000
```

This format clarifies the starting state, the action to perform, and the expected outcome, which can be helpful for complex multi-step scenarios or when collaborating with non-technical stakeholders.

---

## Next steps

- Learn about [Simple Steps - AI Actions](/docs/ai-test-automation/test-authoring/harness-ai-copilot/simple-step) for single, focused actions.
- Explore [Assertions and Validations](/docs/ai-test-automation/test-authoring/harness-ai-copilot/ai-assertions) to express business-level checks.
- Review the [Harness AI documentation category](/docs/category/harness-ai-1) for deeper capabilities.
