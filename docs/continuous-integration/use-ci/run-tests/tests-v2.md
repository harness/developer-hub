---
title: Test step
description: Use the Test step to run unit tests with or without Test Intelligence.
sidebar_position: 3
---

:::note

Currently, the Test step is behind the feature flag `CIE_ENABLE_RUNTEST_V2`. If the **Test** step is not available in your account, contact [Harness Support](mailto:support@harness.io) to enable the feature.

:::

You can use the **Run Intelligent Tests** step, also known as the **Test** step, to run unit tests with or without [Test Intelligence](./ti-overview.md) on Python, Ruby, Java, Kotlin, and Scala codebases.

<!-- Doesn't include C# yet. -->
<!-- Doesn't include java error tracking. -->

```yaml
- step:
    type: Test
    name: Intelligent Tests
    identifier: test
    spec:
      command: mvn test  # Required. All other settings are optional.
      shell: Python
      parallelism : 4
      connectorRef: account.harnessImage
      image: repo/image
      privileged: false
      intelligenceMode: true
      globs:
        - "some/glob/pattern"
      reports:
        - "**/*.xml"
      envVariables:
        aaa: "ddd"
        bbb: "ccc"
      outputVariables:
        - name: o1
        - name: o2
      imagePullPolicy: Always
      runAsUser: "2"
```

## Test step settings

### Command and Shell

### Parallelism (Test Splitting)

<!-- test splitting/parallelism - just add parallelism at step level. -->

### Container Registry and Image

### Intelligence Mode

### Test Globs

### Report Paths

### Environment Variables

### Output Variables

### Image Pull Policy

### Privileged Mode

### Run As User

### Timeout

## Troubleshoot Test Intelligence

Go to the [CI Knowledge Base](/kb/continuous-integration/continuous-integration-faqs) for questions and issues related to Test Intelligence, including:

* [Does Test Intelligence split tests? Can I use parallelism with Test Intelligence?](/kb/continuous-integration/continuous-integration-faqs/#does-test-intelligence-split-tests-why-would-i-use-test-splitting-with-test-intelligence)
* [Test Intelligence call graph is empty.](/kb/continuous-integration/continuous-integration-faqs/#on-the-tests-tab-the-test-intelligence-call-graph-is-empty-and-says-no-call-graph-is-created-when-all-tests-are-run)
* [Ruby Test Intelligence can't find rspec helper file.](/kb/continuous-integration/continuous-integration-faqs/#ruby-test-intelligence-cant-find-rspec-helper-file)
* [Test Intelligence fails due to Bazel not installed, but the container image has Bazel.](/kb/continuous-integration/continuous-integration-faqs/#test-intelligence-fails-due-to-bazel-not-installed-but-the-container-image-has-bazel)
* [Does Test Intelligence support dynamic code?](/kb/continuous-integration/continuous-integration-faqs/#does-test-intelligence-support-dynamic-code)
* [Errors when running TI on Python code.](/kb/continuous-integration/continuous-integration-faqs/#python-test-intelligence-errors)
