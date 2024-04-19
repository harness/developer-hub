---
title: Generate code with AIDA
description: Intelligent code generation using Harness AIDA.
sidebar_position: 52
redirect_from:
  - /docs/platform/harness-aida/aida-overview/aida-code-gen
---

Code Generation with AIDA turbocharges your coding experience. This IDE extension amplifies developer productivity by leveraging the power of Harness AI Development Assistant (AIDA) to revolutionize the way you write code, tests, and comments.

Code Generation with AIDA gives you an intelligent assistant at your fingertips, ready to assist you in crafting high-quality code effortlessly. Harness AIDA seamlessly integrates with many popular IDEs, providing intelligent suggestions, generating code snippets, explaining existing code and even writing comprehensive tests to ensure the robustness of your applications.

With an advanced language model behind it, Harness AIDA goes beyond conventional code completion. It understands context, anticipates your coding needs, and produces not only syntactically correct code but also thoughtful comments and robust tests, making your codebase more readable and maintainable.

Whether you're a seasoned developer looking to speed up your workflow or a beginner seeking guidance, Harness AIDA IDE extensions are designed to enhance your coding journey. Embrace the future of software development with an IDE extension that empowers you to write better code, faster.

Code Generation with AIDA is an IDE plugin. It is currently in development. Check back soon for more details.

## Technical framework of Harness AIDA Code Assistant

At the core of Harness AIDA Code Assistant's functionality is its sophisticated use of Large Language Models (LLMs), which are trained on vast datasets of code to understand and generate human-like code. These LLMs include but are not limited to OpenAI GPT models like GPT 3.5turbo and GPT 4.0. This allows Harness AIDA Code Assistant to offer contextually relevant code suggestions, explanations, and test generation.

### Integrated Development Environment (IDE) extension

Harness AIDA Code Assistant functions as an extension for popular Integrated Development Environments (IDEs). This design choice ensures that developers can use Harness AIDA Code Assistant's features without leaving their familiar coding environment. The extension is built to be lightweight and responsive, providing suggestions in real-time as developers type. It supports a wide range of programming languages, making it versatile across different development contexts.

## Usage and implementation of Harness AIDA Code Assistant

Integrating Harness AIDA Code Assistant into the software development workflow is a straightforward process designed to minimize setup time and maximize efficiency. This section outlines the steps to implement Harness AIDA Code Assistant and demonstrates its practical use in everyday coding tasks.

### Setting up the IDE extension

The extension is currently only available to our alpha partners. To begin using Harness AIDA Code Assistant, developers first install the extension from their IDE's marketplace. This process is similar to adding any other IDE plugin, ensuring ease of adoption. Once installed, developers can configure the extension settings to tailor Harness AIDA Code Assistant's behavior to their preferences, such as specifying which programming languages to activate it for or adjusting the sensitivity of its suggestions.

### Securing API access

Harness AIDA Code Assistant requires access to its AI model through Harness Gateway. This token ensures secure communication between the IDE extension and Harness AIDA Code Assistant's servers, safeguarding the code and the developer's intellectual property. The setup guide provides detailed instructions on obtaining and configuring the API token within the IDE.

### Real-world coding scenarios

With Harness AIDA Code Assistant activated, developers can start leveraging its features to streamline their coding tasks. For example, when writing new functions, Harness AIDA Code Assistant can suggest complete blocks of code that adhere to best practices, significantly reducing the time required to write boilerplate code. In debugging sessions, Harness AIDA Code Assistant can suggest potential fixes or even generate unit tests to cover edge cases that the developer might not have considered.

## Features

### Code autocomplete

![An example of AIDA code autocompletion](./static/code_gen.gif)

### Code explanation and comment generation

![An example of AIDA comment generation](./static/comment_gen.gif)

### Test generation

![An example of AIDA test generation](./static/test_gen.gif)

## Supported IDEs

Currently we support the following IDEs:

- VSCode (>= 1.86.0)

## Ongoing improvements and research directions

Harness AIDA Code Assistant is in a constant state of evolution, with ongoing efforts to expand its capabilities and improve its performance. Some areas of focus include:

- Fetching external documentation: Whether it's official language documentation, framework guides, or community-contributed notes, Harness AIDA Code Assistant can present this information directly within the IDE. This saves developers time and ensures that they have access to the information they need when they need it.
- Enriched context through static code analysis: By analyzing the codebase's structure and semantics, Harness AIDA Code Assistant can provide more relevant and accurate suggestions.
- Agent-based context collection: This involves analyzing the current codebase, open files, and cursor position to understand the developer's intent and the task at hand. By gathering this context, Harness AIDA Code Assistant can tailor its suggestions to fit the specific requirements of the code being written.
- Enhancing Contextual Awareness: By refining the models' understanding of code context, Harness AIDA Code Assistant aims to provide even more relevant and accurate suggestions.
- Support for More Languages and Frameworks: Expanding the range of programming languages and development frameworks that Harness AIDA Code Assistant supports is a priority, making it a more versatile tool for a broader audience.
- User Interface Improvements: Based on user feedback, the Harness AIDA Code Assistant team continually works on making the tool more intuitive and user-friendly.
- Code refactoring suggestions: Harness AIDA Code Assistant can identify opportunities to improve the code's efficiency or readability and suggest refactored versions. Additionally, for developers learning a new programming language or framework, Harness AIDA Code Assistant can act as an on-demand mentor, providing explanations and documentation for unfamiliar code constructs.
- Model-based solution for optimal prompt finding: This approach maximizes the utility of the LLM, enabling it to generate high-quality code completions and other development aids.
