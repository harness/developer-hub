---
sidebar_position: 2
description: Introducing Error Tracking - how to identify all exceptions and fix them quickly.
keywords: [java exceptions, uncaught, swallowed exception, java errors, error tracking]
---

# Finding and fixing Java exceptions

This tutorial discusses different types of Java exceptions that you come across and how to fix them.


## What are exceptions?

According to [Oracle Java Documentation](https://docs.oracle.com/javase/tutorial/essential/exceptions/definition.html), *"An exception is an event, which occurs during the execution of a program, that disrupts the normal flow of the program's instructions."*


## Types of exceptions

Following are the types of Java exceptions:

- **Uncaught exceptions** - Exceptions that the compiler does not catch. Instead, the built-in exception handler in Java automatically catches and handles them.

- **Caught exceptions** - Exceptions that are handled in code via the `try` and `catch` keywords.


  ```
  try {
    //  Block of code to try
  }
  catch(Exception e) {
    //  Block of code to handle errors
  }
  ```


- **Swallowed exceptions** - Exceptions that are caught in empty `catch` blocks. They don't show up in logs. They are difficult to identify and troubleshoot, resulting in production incidents.


## Dealing with exceptions – a repeatable process

Even though it is difficult to remove all the exceptions, it is important to identify the problematic exceptions and prevent them from escaping into production as they can negatively impact the users. You can use a three-step process to identify, resolve, and prevent bad exceptions.


### Identify critical issues

Proactively identify runtime exceptions and slowdowns in every release including issues that swallowed exceptions. It's important to know when the new releases introduce new, increasing, or resurfaced exceptions.

### Resolve using complete context

Reproduce any exception or slowdown with the complete source code, variables, DEBUG logs, and environment state. You need purpose-built tools such as Harness Java Exception Tracker to do this. After you get the context, fix all the exceptions, even if they are not logged.

### Prevent exceptions using a Java Exception Tracker

You need to identify the exceptions every time the code is checked in and collect the logs required to fix the exceptions. However, static analysis and testing do not detect all the issues. You can use a Java Exception Tracker to perform runtime code analysis that identifies unknown issues and prevents them from being deployed.

Set up reliability gates by integrating a Java Exception Tracker with your CI/CD pipelines. This automatically blocks deployment of unreliable software versions. Implement this throughout the software delivery life cycle, starting from unit testing to production.

You can use the Java Exception Tracker as a standalone application or integrate it with your CI/CD pipelines. It is easy to set up and get started with standalone Java Exception Trackers. CI/CD-integrated Java exception tools are complex and take more time to install, but they have the potential to become an integral part of your software delivery process.


## Key features of a Java Exception Tracker

It is critical to have the right Java Exception Tracker so that the exceptions don’t skip through your software delivery life cycle. Your Java Exception Tracker should have the following features.


### Code fingerprinting

The Java Exception Tracker should have the ability to analyze the code loaded into your Java Virtual Machine (JVM) during runtime and assign a unique fingerprint to each line in the code. At runtime, the tracker should correlate each error, drill down to its unique signature, identify anomalies, and capture the complete state.


### Source code and variables

The tracker should have the ability to analyze and index the code structure. This helps you collect data on the most relevant variable state from the running JVM when an event occurs. The tracker should capture data across the call stack up to 10 levels into heap.


### DEBUG/TRACE logs

The tracker should have highly efficient cyclical in-memory buffers to store log statements and display the DEBUG/TRACE state of your code during the critical events, without increasing log verbosity or parsing log files from disk.

 
### Error detection and prioritization

The Java Exception Tracker should have the capability to correlate all the code events at runtime to their unique fingerprint, even as code changes over time. It should identify and prioritize new and spiking errors without relying on the developer’s foresight to log and search them.


### Host/Container state

The tracker should capture detailed system metrics, such as CPU, GC, and so on, of the host or container in which the code is executing. It should also capture complete snapshots of the JVM state, such as env vars and threading state, in the event of critical errors and slowdown.


### 256-bit AES encryption

The tracker should have the ability to privately encrypt all the source code and the collected variable states using a 256-bit AES Encryption key before they leave the production node. 


### Personally Identifiable Information (PII) redaction​

You must always secure sensitive data at all times. The Java Exception Tracker should provide you the ability to redact the PII variable data before it leaves the user environment. You should ensure that the variable state is redacted based on the configurable variable value patterns and code symbology, such as variable, field, and class names.


## Demo - identify, resolve, and prevent Java exceptions

Here is a demo that shows you how to identify, resolve, and prevent Java exceptions using the Harness Error Tracking Java Agent.

<!-- Video:
https://harness-1.wistia.com/medias/rpv5vwzpxz-->
<docvideo src="https://harness-1.wistia.com/medias/i6nqucdlv0" />


## Harness Error Tracking Java Agent

Here is an interactive video that demonstrates the capabilities of the Harness Error Tracking Java Agent. Select the glowing circle to see the capabilities. To learn more about the Harness Error Tracking Java Agent and request a detailed demo, contact [Harness](https://www.harness.io/interest/error-tracking).

<div style={{ position: 'relative', paddingBottom: 'calc(52.1875% + 40px)', height: '0' }}><iframe src="https://demo.arcade.software/Lsj2sDDVCzMbQFnP7kvT?embed" frameborder="0" loading="lazy" webkitallowfullscreen mozallowfullscreen allowfullscreen style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }}></iframe></div>


## Install Harness Error Tracking Java Agent

You can install the Harness Java Exception Tracking Agent in multiple ways. For more information, go to [Java Agent Installation Documentation](https://docs.harness.io/article/nx99xfcoxz-install-the-error-tracking-agent).