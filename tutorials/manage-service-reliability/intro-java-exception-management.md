---
sidebar_position: 2
description: Introducing Error Tracking - how to identify all exceptions and fix them quickly.
keywords: [java exceptions, uncaught, swallowed exception, java errors, error tracking]
---

# Finding and Fixing Java Exceptions
Every Java program has them, this article describes the various types of exceptions you need to look out for and how to make sure that Java exceptions don't cause production issues.

## Background Information
What are exceptions? The easiest way to answer that question is to quote the [Oracle Java Documentation](https://docs.oracle.com/javase/tutorial/essential/exceptions/definition.html) - "An exception is an event, which occurs during the execution of a program, that disrupts the normal flow of the program's instructions.""

### 3 Types of Exceptions

_**Uncaught exceptions**_ are the exceptions that are not caught by the compiler but automatically caught and handled by the Java built-in exception handler.

_**Caught exceptions**_ are handled in code via the `try` and `catch` keywords.

```java
try {
  //  Block of code to try
}
catch(Exception e) {
  //  Block of code to handle errors
}
```

_**Swallowed exceptions**_ are caught in empty `catch` blocks. They don't show up in logs. These can be particularly nasty to identify and troubleshoot and are often the worst offenders of causing production incidents.


## A Repeatable Process for Dealing With Exceptions
You can't get rid of them all (nor should you) but you need to identify the problematic exceptions and prevent them from making into production where they can negatively impact users. This simple 3 step process can help you minimize the chance of unleashing bad exceptions on the end users. Follow this 3-step IRP (Identify, Resolve, Prevent) rule.

### Identify Critical Issues
Proactively identify runtime exceptions and slowdowns in every release – including issues that otherwise would be missed (see "Swallowed Exceptions" above). It's important to know when new releases introduce new, increasing or resurfaced exceptions.

### Resolve Using Complete Context
Reproduce any exception or slowdown with the complete source code, variables, DEBUG logs and environment state. This is difficult to do without using tooling that was created for this specific purpose (like Harness). When you have complete context for every exception you can fix them, even if they were never logged.

### Prevent Issues with Reliability Gates
Static analysis and testing can never uncover 100% of issues. Runtime code analysis identifies unknown issues, and prevents them from being deployed. You should automatically block unreliable software versions from being released by integrating Java exception tracking tooling with CI/CD pipelines.

### Integrated with CI/CD Pipelines or Standalone
Java exception tracking tooling can be used as a standalone capability or better yet, included as part of your CI/CD pipelines. Whenever code is exercised, you want to identify every exception and collected supporting details needed to fix them. This process can start as early as unit testing during CI and can continue through every other step of the software delivery lifecycle including in production.

Standalone exception tracking solutions can make it quicker to initially set up and get started tracking down and fixing exceptions. CI/CD integrated exception tracking solutions can take a little more time for initial setup but have greater potential for becoming a standard part of the software delivery process and adding more value to the organization overall.


## 2 Minute Demo Using Harness to IRP Java Exceptions
<!-- Video:
https://harness-1.wistia.com/medias/rpv5vwzpxz-->
<docvideo src="https://harness-1.wistia.com/medias/i6nqucdlv0" />


## Key Features of Java Exception Trackers
What are the important features that a Java exception tracking solution should have? Here's a short list.

### Code Fingerprinting
When the software analyzes code loaded into your JVM at runtime and assigns a unique fingerprint to each line of code. At runtime, exception tracking software should correlate each error and slowdown to its unique signature to identify anomalies and capture their complete state.

### Source Code & Variables
By analyzing and indexing the structure of the code, it's possible to collect the most relevant variable state information from running JVM whenever critical events take place. Data should be captured across the entire call stack up to 10 levels into heap.

### DEBUG/TRACE Logs
When implemented for speed, highly efficient cyclical in-memory buffers of log statements show you the DEBUG/TRACE state of your code at the moment of critical events, without increasing log verbosity or parsing log files from disk.

### Error Detection & Prioritization
Exception tracking software should correlate all code events at runtime to their unique fingerprint (even as code changes over time) to identify and prioritize new and spiking errors without relying on developer foresight to log and search for them.

### Host / Container State
Capture detailed system metrics (e.g. CPU, GC) of the host / container in which the code is executing, as well as complete snapshots of the JVM state (e.g. env vars, threading state) at the moment of critical errors and slowdowns. You might need this data to fix the exception.

### 256-bit AES Encryption
It's important that all source code and variable states collected are privately encrypted using a 256-bit AES Encryption key before leaving the production node. Secure all sensitive data at all times.

### PII (Personally Identifiable Information) Redaction
Secure all sensitive data at all times! Redact PII variable data before it leaves the user environment. Make sure variable state is redacted based on configurable variable value patterns and code symbology: variable, field and class names.


## Install the Harness Error Tracking Java Agent
There are multiple options for installing the Harness Java Exception Tracking Agent. Click the link below and follow the documentation for your preferred type of installation.

[Java Agent Installation Documentation](https://docs.harness.io/article/nx99xfcoxz-install-the-error-tracking-agent)

## 4-Step Interactive Walkthrough

The walkthrough below is the quickest way to see what Harness has to offer when it comes to Java exception tracking. There is not a self guided free trial today but that is in the works. For now you can [request a demo](https://www.harness.io/interest/error-tracking) and someone from Harness will contact you to show you the solution and get you set up with the software.

<div style={{ position: 'relative', paddingBottom: 'calc(52.1875% + 40px)', height: '0' }}><iframe src="https://demo.arcade.software/Lsj2sDDVCzMbQFnP7kvT?embed" frameborder="0" loading="lazy" webkitallowfullscreen mozallowfullscreen allowfullscreen style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }}></iframe></div>

