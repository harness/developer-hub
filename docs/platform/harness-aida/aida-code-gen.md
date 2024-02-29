---
title: Generate code with AIDA
description: Intelligent code generation using Harness AIDA.
sidebar_position: 52
---

Code Generation with AIDA turbocharges your coding experience. This IDE extension amplifies developer productivity by leveraging the power of Harness AI Development Assistant (AIDA) to revolutionize the way you write code, tests, and comments.

Code Generation with AIDA gives you an intelligent assistant at your fingertips, ready to assist you in crafting high-quality code effortlessly. Harness AIDA seamlessly integrates with many popular IDEs, providing intelligent suggestions, generating code snippets, explaining existing code and even writing comprehensive tests to ensure the robustness of your applications.

With an advanced language model behind it, Harness AIDA goes beyond conventional code completion. It understands context, anticipates your coding needs, and produces not only syntactically correct code but also thoughtful comments and robust tests, making your codebase more readable and maintainable.

Whether you're a seasoned developer looking to speed up your workflow or a beginner seeking guidance, Harness AIDA IDE extensions are designed to enhance your coding journey. Embrace the future of software development with an IDE extension that empowers you to write better code, faster.

Code Generation with AIDA is an IDE plugin. It is currently in development. Check back soon for more details.

## Technical Framework of Harness Copilot

At the core of Harness Copilot's functionality is its sophisticated use of Large Language Models (LLMs), which are trained on vast datasets of code to understand and generate human-like code. These LLMs include but are not limited to OpenAI GPT models like GPT 3.5turbo and GPT 4.0. This allows Harness Copilot to offer contextually relevant code suggestions, explanations, and test generation.

### Integrated Development Environment (IDE) Extension

Harness Copilot functions as an extension for popular Integrated Development Environments (IDEs). This design choice ensures that developers can use Harness Copilot's features without leaving their familiar coding environment. The extension is built to be lightweight and responsive, providing suggestions in real-time as developers type. It supports a wide range of programming languages, making it versatile across different development contexts.

### Agent-based Context Collection

To provide relevant suggestions, Harness Copilot employs an agent-based approach for context collection. This involves analyzing the current codebase, open files, and cursor position to understand the developer's intent and the task at hand. By gathering this context, Harness Copilot can tailor its suggestions to fit the specific requirements of the code being written.

### Enriched Context through Static Code Analysis

Further enhancing its context-aware capabilities, Harness Copilot incorporates static code analysis to understand the structure and semantics of the code. This analysis allows Harness Copilot to identify contextually relevant code that may live far from the file that is currently being edited

### External Documentation Fetching (WIP)

Recognizing the importance of accurate documentation, Harness Copilot includes a feature to fetch relevant external documentation. Whether it's official language documentation, framework guides, or community-contributed notes, Harness Copilot can present this information directly within the IDE. This saves developers time and ensures that they have access to the information they need when they need it.

### Model-based Solution for Optimal Prompt Finding (WIP)

At the heart of Harness Copilot's effectiveness is its model-based approach for finding the optimal prompt for the LLM. By carefully crafting prompts based on the collected context and static analysis, Harness Copilot ensures that the suggestions provided are both relevant and accurate. This approach maximizes the utility of the LLM, enabling it to generate high-quality code completions and other development aids.
This technical framework sets Harness Copilot apart as a comprehensive tool that addresses the multifaceted challenges of software development. By leveraging AI in these innovative ways, Harness Copilot not only enhances developer productivity but also contributes to the creation of higher quality software.

## Usage and Implementation of Harness Copilot

Integrating Harness Copilot into the software development workflow is a straightforward process designed to minimize setup time and maximize efficiency. This section outlines the steps to implement Harness Copilot and demonstrates its practical use in everyday coding tasks.

### Setting Up the IDE Extension

The extension is currently only available to our alpha partners. To begin using Harness Copilot, developers first install the extension from their IDE's marketplace. This process is similar to adding any other IDE plugin, ensuring ease of adoption. Once installed, developers can configure the extension settings to tailor Harness Copilot's behavior to their preferences, such as specifying which programming languages to activate it for or adjusting the sensitivity of its suggestions.

### Securing API Access

Harness Copilot requires access to its AI model through Harness Gateway. This token ensures secure communication between the IDE extension and Harness Copilot's servers, safeguarding the code and the developer's intellectual property. The setup guide provides detailed instructions on obtaining and configuring the API token within the IDE.

### Real-world Coding Scenarios

With Harness Copilot activated, developers can start leveraging its features to streamline their coding tasks. For example, when writing new functions, Harness Copilot can suggest complete blocks of code that adhere to best practices, significantly reducing the time required to write boilerplate code. In debugging sessions, Harness Copilot can suggest potential fixes or even generate unit tests to cover edge cases that the developer might not have considered.

## Features

### Code Autocomplete

<!-- Video:
./static/code_generation_demo.mov-->
<DocVideo src="./static/code_generation_demo.mov" />

### Code Explanation and Comment Generation

<!-- Video:
./static/comment_gen_demo.mov-->
<DocVideo src="./static/comment_gen_demo.mov" />

### Test Generation

<!-- Video:
./static/test_generation_demo.mov-->
<DocVideo src="./static/test_generation_demo.mov" />

## Supported IDEs

Currently we support the following IDEs:

- VSCode (>= 1.86.0)

## Ongoing Improvements and Research Directions

Harness Copilot is in a constant state of evolution, with ongoing efforts to expand its capabilities and improve its performance. Some areas of focus include:

- Enhancing Contextual Awareness: By refining the models' understanding of code context, Harness Copilot aims to provide even more relevant and accurate suggestions.
- Support for More Languages and Frameworks: Expanding the range of programming languages and development frameworks that Harness Copilot supports is a priority, making it a more versatile tool for a broader audience.
- User Interface Improvements: Based on user feedback, the Harness Copilot team continually works on making the tool more intuitive and user-friendly.
- Code refactoring suggestions: Harness Copilot can identify opportunities to improve the code's efficiency or readability and suggest refactored versions. Additionally, for developers learning a new programming language or framework, Harness Copilot can act as an on-demand mentor, providing explanations and documentation for unfamiliar code constructs.

<!--


## Installation

It is very easy to get started with Harness AIDA.

1. Download the official extension from the marketplace of any supported IDE.
2. [Generate a Harness Personal Access Token.](/docs/platform/automation/api/add-and-manage-api-keys)
3. Add the token in the extension settings.

## Capabilities

### Code Generation

tbd

### Test Generation

tbd

### Comment Generation / Explain Code

tbd

### Generate Terraform configurations
-->
